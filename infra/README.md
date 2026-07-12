# Infra — S3 + CloudFront (private bucket, OAC)

Static hosting for the site, built to demonstrate the security posture the site claims:
**no public S3, no S3 website endpoint** — the bucket is reachable *only* through CloudFront via
Origin Access Control (OAC), with a least-privilege bucket policy scoped to the one distribution.

## Files
- `cloudfront-s3-site.yaml` — CloudFormation template (all resources).
- `deploy.sh` — plan → confirm → deploy stack → confirm → upload + invalidate. Nothing runs
  unattended; it prints identity and pauses before each mutating step.
- `upload.sh` — re-upload a new build to the origin bucket (+ optional invalidation), decoupled
  from `deploy.sh` so it can run without touching the stack.

## What the template creates
| Resource | Why |
|---|---|
| Private S3 bucket | Block Public Access ON, SSE-S3, versioned, ACLs disabled, **no** website config |
| Bucket policy | Allows `s3:GetObject` **only** from this CloudFront distribution's OAC (SourceArn-scoped); denies non-TLS |
| Origin Access Control | Modern OAC (not legacy OAI); SigV4, always-sign |
| Response Headers Policy | CSP + HSTS + nosniff + `X-Frame-Options: DENY` + `Referrer-Policy: no-referrer` + `Permissions-Policy` |
| Cache Policy | Brotli/Gzip; cache-by-URL only (no cookies/query/headers) |
| CloudFront Function (viewer-request) | Rewrites `/` and `/path/` → `…/index.html` — **required** for a REST/OAC origin |
| Distribution | HTTPS-only (redirect), HTTP/2+3, IPv6, TLSv1.2_2021, `/404.html` on 403/404 |

**DNS is intentionally NOT in this stack.** It commonly lives in a different account / hosted
zone / permission boundary (and an apex zone may be managed elsewhere entirely). Inputs are
`DomainNames` (comma-separated — e.g. apex + `www`) + `AcmCertificateArn`; the stack wires the
CloudFront aliases + viewer cert, and you create a DNS record per name separately (see "Wire up
DNS" below).

> ⚠️ **The ACM cert must cover EVERY name in `DomainNames`.** A cert for the apex alone will not
> validate `www` — request one cert listing both names, or an apex + wildcard SAN, in **us-east-1**,
> before deploying with the domains set.

## Three CloudFront gotchas this template handles (so you don't get surprised)
1. **`_headers` is a Cloudflare Pages feature — CloudFront ignores it.** Security headers are served
   via the **Response Headers Policy** instead. `deploy.sh` reads the exact CSP (with the script
   hashes `gen-csp.mjs` generated) out of `site/out/_headers` and passes it to the stack, so the
   policy stays in sync with the build — CSP's single source of truth remains the build, not this file.
2. **OAC/REST origin does NOT auto-serve `index.html`** for `/` or sub-paths (the legacy S3 *website*
   endpoint did; a private OAC origin does not). The bundled CloudFront Function fixes that.
3. **ACM cert must be in us-east-1** for CloudFront, regardless of bucket region. The template and
   `deploy.sh` both enforce/deploy in us-east-1.

## Deploy (all approval-gated)
```bash
cd site && npm run build      # produces out/ + generated CSP
# 1) First, on the default CloudFront domain (no custom domain yet):
AWS_PROFILE=<profile> AWS_REGION=us-east-1 ../infra/deploy.sh <stack-name>
# 2) Later, with custom domains (apex + www). Comma-separated; needs an ACM cert in
#    us-east-1 covering BOTH names. DNS is separate:
AWS_PROFILE=<profile> AWS_REGION=us-east-1 ../infra/deploy.sh <stack-name> "example.com,www.example.com" <acm-arn-us-east-1>
```

### Wire up DNS (separate, after the stack exists — one record per name)
The stack outputs everything you need; `deploy.sh` also prints these when domains are set:
- `DistributionDomainName` — the `d….cloudfront.net` alias target
- `CloudFrontHostedZoneId` — `Z2FDTNDATAQYW2` (CloudFront's fixed alias zone, same everywhere)

In Route 53 (in whichever account owns the zone), create an **ALIAS A** (and **AAAA**) record for
**each** name pointing at `DistributionDomainName` with hosted-zone `Z2FDTNDATAQYW2`. One batch can
do all names:
```bash
aws route53 change-resource-record-sets --hosted-zone-id <YOUR_ZONE_ID> --change-batch '{
  "Changes":[
    {"Action":"UPSERT","ResourceRecordSet":{"Name":"example.com","Type":"A",
      "AliasTarget":{"HostedZoneId":"Z2FDTNDATAQYW2","DNSName":"<DistributionDomainName>","EvaluateTargetHealth":false}}},
    {"Action":"UPSERT","ResourceRecordSet":{"Name":"www.example.com","Type":"A",
      "AliasTarget":{"HostedZoneId":"Z2FDTNDATAQYW2","DNSName":"<DistributionDomainName>","EvaluateTargetHealth":false}}}
  ]}'
```
On a non-Route-53 provider, add a **CNAME** for each name to `DistributionDomainName` — except an
**apex** domain can't CNAME; use a Route 53 alias or your provider's ALIAS/ANAME equivalent. The ACM
cert's DNS validation records (also outside this stack) must exist before the cert issues.

## Security notes
- Use a **scoped, least-privilege deploy role** (CloudFormation + this stack's S3/CloudFront/ACM
  actions only) rather than a broad admin/automation role — matching the posture the site describes.
- **`DeletionPolicy: Retain`** on the bucket is intentional (don't lose content on stack delete).
  Flip to `Delete` if you want teardown to remove it.
