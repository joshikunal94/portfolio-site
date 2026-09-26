# site — joshikunal.com

Next.js 14 (App Router) personal site, built as a **static export** (`output: 'export'`) and served
by **Cloudflare Workers (static assets)**. Single page, self-hosted fonts, no third-party trackers.

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
Content-Security-Policy into `out/_headers`. Cloudflare reads `_headers` directly from the assets
directory, so the served CSP always matches the build — no separate header config to keep in sync.

## Deploy

Deploys are Git-driven via Cloudflare Workers Builds:

- push to `main` → production build → https://joshikunal.com
- push to any other branch → preview build with its own URL

Build settings live in the repo: `wrangler.jsonc` (assets dir, 404 handling), `.node-version`.
Cloudflare runs `npm run build` then `npx wrangler deploy` from this directory.

To dry-run locally what Cloudflare will do:

```bash
npm ci && npm run build && npx wrangler deploy --dry-run
```

## Layout

- `app/` — routes, layout, global styles, self-hosted fonts.
- `components/` — UI components.
- `lib/content.ts` — all site copy (single source of truth for text).
- `public/` — static assets, `robots.txt`, `sitemap.xml`, `llms.txt`, résumé PDF, `_headers`.
- `scripts/gen-csp.mjs` — post-build CSP generator.
- `wrangler.jsonc` — Cloudflare Workers static-assets config.
