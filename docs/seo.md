# SEO

The site is a pre-rendered static export, so all content (name, headings, summary) is in the raw
HTML — no client-render indexing problem. On-site SEO surface:

## Metadata (`site/app/layout.tsx`)

- `metadataBase` + `alternates.canonical` → canonical `https://joshikunal.com/`.
- Open Graph (`og:type/url/site_name/title/description`) and Twitter (`summary`) tags.
- JSON-LD `Person` schema with `name`, `url`, `jobTitle`, `email`, and `sameAs`
  (GitHub + LinkedIn). `sameAs` is the primary entity signal for a name query — keep it in sync
  with the profiles that link back to the site.

## Crawl files (`site/public/`)

- `robots.txt` — allow all, points to the sitemap.
- `sitemap.xml` — single URL; bump `<lastmod>` on meaningful content changes.
- `llms.txt` — plain-text summary for AI crawlers (name, roles, expertise, links).

## Off-site (not in this repo, but the higher-leverage half)

- **Google Search Console:** verify the domain (DNS TXT), submit `sitemap.xml`, request indexing.
- **Bidirectional `sameAs`:** put `joshikunal.com` in the website field of LinkedIn, GitHub,
  Credly, etc. — the reverse links are what make the entity association count.
- **Distinctive content** (e.g. technical write-ups / tools under the same domain) builds topical
  authority and earns real backlinks — the durable way to rank for a competitive personal name.

## Notes

- CSP includes a hash for the inline JSON-LD script; it's generated automatically (see
  [`architecture.md`](architecture.md)).
- Ranking for a common name is an entity-recognition problem, not a keyword one — consistency across
  profiles + genuine backlinks + time matter more than on-page tweaks.
