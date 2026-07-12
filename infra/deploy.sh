#!/usr/bin/env bash
# Deploy the static site to S3 + CloudFront (private bucket, OAC).
# NOTHING here runs automatically — you invoke it explicitly, and it prints a plan
# and pauses before the two mutating steps (stack deploy, S3 sync + invalidation).
#
# Prereqns: `npm run build` has produced site/out/ (with out/_headers containing the
# generated CSP), AWS CLI v2, and a profile that can manage CFN/S3/CloudFront.
#
# Usage:
#   AWS_PROFILE=<profile> AWS_REGION=us-east-1 ./infra/deploy.sh <stack-name> [domains] [acm-arn]
#
# [domains] is comma-separated for multiple names, e.g. "joshikunal.com,www.joshikunal.com".
# The ACM cert (us-east-1) must cover EVERY name. Custom-domain args are optional; omit them
# to deploy on the *.cloudfront.net URL first. DNS is NOT managed here — after deploy, alias
# EACH name to the DistributionDomainName output (the script prints the handoff values).
set -euo pipefail

STACK="${1:?usage: deploy.sh <stack-name> [domains] [acm-arn]}"
# --- Config (pass as args or export these; nothing account-specific is hardcoded) ---
#   DOMAINS  : comma-separated CNAMEs, e.g. "example.com,www.example.com" (optional).
#   ACM_ARN  : us-east-1 ACM cert ARN covering every name in DOMAINS (required if DOMAINS set).
#   BUCKET   : origin bucket name (optional; the stack auto-names one if omitted).
DOMAINS="${2:-${SITE_DOMAINS:-}}"
ACM_ARN="${3:-${SITE_ACM_ARN:-}}"
BUCKET_NAME="${SITE_BUCKET_NAME:-}"
REGION="${AWS_REGION:-us-east-1}"
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
TEMPLATE="$ROOT/infra/cloudfront-s3-site.yaml"
OUT_DIR="$ROOT/site/out"
HEADERS_FILE="$OUT_DIR/_headers"

# CloudFront + ACM-for-CloudFront must be us-east-1.
if [[ "$REGION" != "us-east-1" ]]; then
  echo "ERROR: this stack must deploy in us-east-1 (CloudFront/ACM requirement). Got: $REGION" >&2
  exit 1
fi

[[ -d "$OUT_DIR" ]] || { echo "ERROR: $OUT_DIR not found — run 'npm run build' in site/ first." >&2; exit 1; }

# --- Extract the exact CSP the build generated so CloudFront serves the SAME policy
#     as the _headers file did (single source of truth = the build).
if [[ -f "$HEADERS_FILE" ]]; then
  CSP="$(grep -i 'Content-Security-Policy:' "$HEADERS_FILE" | head -1 | sed -E 's/^[[:space:]]*Content-Security-Policy:[[:space:]]*//')"
else
  CSP=""
fi
[[ -n "$CSP" ]] || echo "WARN: no CSP found in $HEADERS_FILE — the template default (hash-free) will be used." >&2

# --- Identity check (honor your hygiene rule: show who we are before mutating) ---
echo "=== Deploy plan ==="
echo "  Stack:    $STACK"
echo "  Region:   $REGION   Profile: ${AWS_PROFILE:-<default chain>}"
echo "  Bucket:   ${BUCKET_NAME:-<auto-named>}"
echo "  Domain(s):${DOMAINS:-<cloudfront default>}"
echo "  Cert:     ${ACM_ARN:-<none>}"
echo "  Identity:"; aws sts get-caller-identity --output table
echo "  CSP (first 90 chars): ${CSP:0:90}..."
echo
read -r -p "Proceed with 'cloudformation deploy' for stack '$STACK'? [y/N] " ok
[[ "$ok" == "y" || "$ok" == "Y" ]] || { echo "Aborted."; exit 0; }

# --- Build parameter overrides ---
PARAMS=()
[[ -n "$BUCKET_NAME" ]] && PARAMS+=("BucketName=$BUCKET_NAME")
# CommaDelimitedList: pass the value UN-escaped as one Key=Value token (each PARAMS[] entry
# is already a single argv element, so the shell won't word-split it). CloudFormation splits
# on the commas itself. Do NOT backslash-escape — a literal "\," reaches CloudFront as an
# invalid CNAME character (this exact bug rolled back the first deploy).
[[ -n "$DOMAINS" ]] && PARAMS+=("DomainNames=$DOMAINS")
[[ -n "$ACM_ARN" ]] && PARAMS+=("AcmCertificateArn=$ACM_ARN")
[[ -n "$CSP"     ]] && PARAMS+=("ContentSecurityPolicy=$CSP")

aws cloudformation deploy \
  --region "$REGION" \
  --stack-name "$STACK" \
  --template-file "$TEMPLATE" \
  --no-fail-on-empty-changeset \
  ${PARAMS:+--parameter-overrides "${PARAMS[@]}"}

BUCKET="$(aws cloudformation describe-stacks --region "$REGION" --stack-name "$STACK" \
  --query "Stacks[0].Outputs[?OutputKey=='BucketName'].OutputValue" --output text)"
DIST_ID="$(aws cloudformation describe-stacks --region "$REGION" --stack-name "$STACK" \
  --query "Stacks[0].Outputs[?OutputKey=='DistributionId'].OutputValue" --output text)"
SITE_URL="$(aws cloudformation describe-stacks --region "$REGION" --stack-name "$STACK" \
  --query "Stacks[0].Outputs[?OutputKey=='SiteUrl'].OutputValue" --output text)"

echo
echo "Stack ready. Bucket=$BUCKET  Distribution=$DIST_ID"
read -r -p "Sync site/out/ to s3://$BUCKET and invalidate CloudFront? [y/N] " ok2
[[ "$ok2" == "y" || "$ok2" == "Y" ]] || { echo "Skipped upload. Stack exists; re-run to upload."; exit 0; }

# --- Upload: long-cache the fingerprinted assets, no-cache the HTML so deploys show immediately ---
# 1) Immutable hashed assets (Next puts them under _next/ with content hashes):
aws s3 sync "$OUT_DIR" "s3://$BUCKET" --profile "${AWS_PROFILE:-default}" \
  --delete \
  --exclude "*.html" --exclude "_headers" \
  --cache-control "public,max-age=31536000,immutable"
# 2) HTML + anything else: short cache so new deploys are picked up.
aws s3 sync "$OUT_DIR" "s3://$BUCKET" --profile "${AWS_PROFILE:-default}" \
  --exclude "*" --include "*.html" \
  --cache-control "public,max-age=60,must-revalidate"
# Note: _headers is intentionally NOT uploaded — CloudFront serves headers via the
# Response Headers Policy, so the file would just be dead weight in the bucket.

aws cloudfront create-invalidation --distribution-id "$DIST_ID" --paths "/*" \
  --profile "${AWS_PROFILE:-default}" --output table

echo
echo "Done. Site: $SITE_URL"

# --- DNS handoff (DNS is NOT managed by this stack) ---
if [[ -n "$DOMAINS" ]]; then
  DIST_DOMAIN="$(aws cloudformation describe-stacks --region "$REGION" --stack-name "$STACK" \
    --query "Stacks[0].Outputs[?OutputKey=='DistributionDomainName'].OutputValue" --output text)"
  CF_ZONE="$(aws cloudformation describe-stacks --region "$REGION" --stack-name "$STACK" \
    --query "Stacks[0].Outputs[?OutputKey=='CloudFrontHostedZoneId'].OutputValue" --output text)"
  echo
  echo "=== DNS (create these yourself — not managed by the stack) ==="
  echo "  Alias target : $DIST_DOMAIN"
  echo "  Hosted zone  : $CF_ZONE   (CloudFront's fixed alias zone id)"
  echo "  Create a Route 53 ALIAS A (and AAAA) record for EACH name below:"
  IFS=',' read -ra _names <<< "$DOMAINS"
  for _n in "${_names[@]}"; do echo "    - $_n"; done
  echo "  Non-Route-53 provider: CNAME each name to $DIST_DOMAIN"
  echo "  (an APEX domain can't CNAME — use a Route 53 alias, or your provider's ALIAS/ANAME.)"
fi
