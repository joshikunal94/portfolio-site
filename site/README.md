# site — joshikunal.com

Next.js 14 (App Router) personal site, built as a **static export** (`output: 'export'`) and served
from S3 + CloudFront. Single page, self-hosted fonts, no third-party trackers.

## Develop

```bash
npm install
npm run dev        # http://localhost:3000
```

## Build

```bash
npm run build      # next build → out/, then scripts/gen-csp.mjs writes out/_headers
```

`gen-csp.mjs` hashes every inline `<script>` in the exported HTML and writes a
Content-Security-Policy into `out/_headers`. That CSP is the single source of truth — the deploy
step feeds it into the CloudFront Response Headers Policy (see [`../infra/`](../infra/)).

## Layout

- `app/` — routes, layout, global styles, self-hosted fonts.
- `components/` — UI components.
- `lib/content.ts` — all site copy (single source of truth for text).
- `public/` — static assets, `robots.txt`, `sitemap.xml`, `llms.txt`, résumé PDF.
- `scripts/gen-csp.mjs` — post-build CSP generator.
