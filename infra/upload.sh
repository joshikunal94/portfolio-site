#!/usr/bin/env bash
# Upload the built static site to the origin S3 bucket.
# Decoupled from deploy.sh so it can run WHILE the CloudFront distribution is still
# provisioning (the bucket is created early; the distribution takes longer). Safe to
# re-run any time to push a new build. Optionally invalidates CloudFront if a stack is given.
#
# Usage:
#   AWS_PROFILE=<profile> AWS_REGION=us-east-1 ./infra/upload.sh <bucket> [stack-for-invalidation]
#
# Bucket is required (pass as arg or export SITE_BUCKET_NAME). Nothing is hardcoded.
set -euo pipefail

BUCKET="${1:-${SITE_BUCKET_NAME:?usage: upload.sh <bucket> [stack-for-invalidation] (or export SITE_BUCKET_NAME)}}"
STACK="${2:-}"                         # optional: if set, create a CloudFront invalidation after upload
REGION="${AWS_REGION:-us-east-1}"
PROFILE="${AWS_PROFILE:-default}"
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
OUT_DIR="$ROOT/site/out"

[[ -d "$OUT_DIR" ]] || { echo "ERROR: $OUT_DIR not found — run 'npm run build' in site/ first." >&2; exit 1; }
aws s3api head-bucket --profile "$PROFILE" --region "$REGION" --bucket "$BUCKET" >/dev/null 2>&1 \
  || { echo "ERROR: bucket s3://$BUCKET not reachable (created yet? right profile?)." >&2; exit 1; }

echo "Uploading $OUT_DIR -> s3://$BUCKET  (profile=$PROFILE region=$REGION)"

# 1) Immutable, content-hashed assets: long cache. --size-only avoids needless re-uploads.
#    Root txt/xml (robots, sitemap, llms.txt) are mutable, not content-hashed — short cache below.
aws s3 sync "$OUT_DIR" "s3://$BUCKET" --profile "$PROFILE" \
  --delete \
  --exclude "*.html" --exclude "_headers" \
  --exclude "robots.txt" --exclude "sitemap.xml" --exclude "llms.txt" \
  --cache-control "public,max-age=31536000,immutable"

# 2) HTML + mutable root files: short cache so new deploys show quickly
#    (CloudFront also honors the invalidation below).
aws s3 sync "$OUT_DIR" "s3://$BUCKET" --profile "$PROFILE" \
  --exclude "*" --include "*.html" \
  --include "robots.txt" --include "sitemap.xml" --include "llms.txt" \
  --cache-control "public,max-age=60,must-revalidate"

# _headers is intentionally NOT uploaded — headers come from the CloudFront Response Headers Policy.
echo "Upload complete."

if [[ -n "$STACK" ]]; then
  DIST_ID="$(aws cloudformation describe-stacks --profile "$PROFILE" --region "$REGION" --stack-name "$STACK" \
    --query "Stacks[0].Outputs[?OutputKey=='DistributionId'].OutputValue" --output text 2>/dev/null || true)"
  if [[ -n "$DIST_ID" && "$DIST_ID" != "None" ]]; then
    echo "Invalidating CloudFront distribution $DIST_ID ..."
    aws cloudfront create-invalidation --profile "$PROFILE" --distribution-id "$DIST_ID" --paths "/*" --output table
  else
    echo "No DistributionId output on stack '$STACK' yet — skip invalidation (fine if distribution still creating)."
  fi
fi
