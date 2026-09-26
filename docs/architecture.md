# Architecture

## Stack

- **Framework:** Next.js 14 (App Router), static export (`output: 'export'`, `trailingSlash: true`).
- **Styling:** Tailwind CSS; motion via GSAP.
- **Fonts:** self-hosted (`next/font/local`, `display: swap`) — no third-party font CDN.
- **Output:** static HTML/CSS/JS in `site/out/`.

## Hosting

```
GitHub (main) ──webhook──▶ Cloudflare Workers Builds ──▶ Worker static assets ──▶ joshikunal.com
```

- **Cloudflare Workers (static assets):** `site/wrangler.jsonc` points `assets.directory` at `./out`.
  There is no Worker script — Cloudflare serves the files from its edge.
- **Routing:** `html_handling: auto-trailing-slash` serves `/path/` → `path/index.html` and redirects
  `/path/index.html` → `/path/`. `not_found_handling: 404-page` serves `out/404.html` with a 404 status.
- **Headers:** `out/_headers` (generated at build) is applied by Cloudflare — CSP, HSTS,
  `X-Frame-Options: DENY`, `Referrer-Policy`, `Permissions-Policy`, nosniff.
- **TLS:** Cloudflare-managed certificate for `joshikunal.com` + `www`, auto-renewed.
  *Always Use HTTPS* and *Minimum TLS 1.2* are set at the zone level.
- **DNS:** the `joshikunal.com` zone is on Cloudflare; the apex and `www` are custom domains on the
  Worker. Registrar is separate (GoDaddy).

## Deploy flow

1. Push to `main` → Workers Builds clones the repo, root dir `/site`, Node from `.node-version`.
2. `npm run build` → `next build` + `scripts/gen-csp.mjs`.
3. `npx wrangler deploy` uploads `out/` (only changed files) and makes it live.
4. Any other branch gets a preview deployment with its own URL.

## Content Security Policy

CSP is generated at build time by `site/scripts/gen-csp.mjs`, which SHA-256-hashes every inline
`<script>` in the exported HTML and writes the policy to `out/_headers`. Because Cloudflare applies
`_headers` from the same build output, the served CSP can never drift from the deployed HTML.

## Caching

Cloudflare caches static assets at the edge with content-hash based ETags; HTML is served
`max-age=0, must-revalidate` so a new deploy is visible immediately. No manual invalidation step.
