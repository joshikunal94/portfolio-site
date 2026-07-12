# Architecture

## Stack

- **Framework:** Next.js 14 (App Router), static export (`output: 'export'`, `trailingSlash: true`).
- **Styling:** Tailwind CSS; motion via GSAP.
- **Fonts:** self-hosted (`next/font/local`, `display: swap`) — no third-party font CDN.
- **Output:** static HTML/CSS/JS in `site/out/`.

## Hosting

```
Browser ──HTTPS──▶ CloudFront ──OAC (SigV4)──▶ S3 (private bucket)
```

- **S3:** private bucket, Block Public Access on, no website endpoint. Reachable only via CloudFront.
- **CloudFront:** OAC to the bucket; bucket policy scopes `s3:GetObject` to this one distribution.
- **CloudFront Function** (viewer-request) rewrites `/` and `/path/` to `…/index.html` (a REST/OAC
  origin does not auto-serve index documents).
- **Response Headers Policy** serves the security headers (CSP, HSTS, `X-Frame-Options: DENY`,
  `Referrer-Policy`, `Permissions-Policy`, nosniff).
- **404/403** map to `/404.html`.

Full resource list and deploy steps: [`../infra/README.md`](../infra/README.md).

## Content Security Policy

CSP is generated at build time by `site/scripts/gen-csp.mjs`, which SHA-256-hashes every inline
`<script>` in the exported HTML and writes the policy to `out/_headers`. The deploy script extracts
that exact CSP and passes it to the CloudFront Response Headers Policy, so the served CSP always
matches the build.

> **Gotcha:** any change that alters inline scripts (page/layout changes, added JSON-LD, etc.)
> produces new hashes. Re-run the stack deploy so the CloudFront CSP is updated too — uploading new
> HTML alone will leave a stale CSP that blocks the new scripts.

## Caching

- Fingerprinted assets under `_next/static/`: `max-age=31536000, immutable`.
- HTML and mutable root files (`robots.txt`, `sitemap.xml`, `llms.txt`): `max-age=60, must-revalidate`.
- Deploys run a CloudFront invalidation (`/*`) so changes appear within a minute or two.
