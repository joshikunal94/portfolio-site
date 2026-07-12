#!/usr/bin/env node
/**
 * Postbuild: rewrite out/_headers so the CSP script-src lists a sha256 hash for
 * every inline <script> Next.js emits into the exported HTML.
 *
 * Why: the site ships a strict CSP (script-src 'self', NO 'unsafe-inline').
 * Next.js's static export inlines its hydration payload as inline <script>
 * tags. Under the strict CSP a host that enforces it (Cloudflare Pages) would
 * block those scripts and React would never hydrate (the carousel freezes).
 * Allow-listing each script by content hash keeps the CSP strict while letting
 * exactly Next's own inline scripts run. Hashes change per build (buildId is
 * baked into the content), so this runs automatically after every `next build`.
 */
import { readdirSync, readFileSync, writeFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { createHash } from 'node:crypto';

const OUT = 'out';
const HEADERS = join(OUT, '_headers');

// Collect sha256 of every inline (no src=) <script> across all exported HTML.
const inlineRe = /<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/g;
const hashes = new Set();

function walk(dir) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    const s = statSync(p);
    if (s.isDirectory()) walk(p);
    else if (name.endsWith('.html')) {
      const html = readFileSync(p, 'utf8');
      let m;
      while ((m = inlineRe.exec(html)) !== null) {
        const body = m[1];
        if (body.length === 0) continue; // empty <script></script> needs no hash
        const digest = createHash('sha256').update(body, 'utf8').digest('base64');
        hashes.add(`'sha256-${digest}'`);
      }
    }
  }
}

walk(OUT);

const scriptSrc = ["'self'", ...hashes].join(' ');

// Rebuild _headers with the computed script-src. Everything else stays fixed.
const headers = `/*
  Content-Security-Policy: default-src 'self'; script-src ${scriptSrc}; style-src 'self' 'unsafe-inline'; img-src 'self'; font-src 'self'; connect-src 'self'; frame-ancestors 'none'; base-uri 'self'; form-action 'self'
  Strict-Transport-Security: max-age=31536000; includeSubDomains
  X-Content-Type-Options: nosniff
  Referrer-Policy: no-referrer
  X-Frame-Options: DENY
  Permissions-Policy: camera=(), microphone=(), geolocation=()
`;

writeFileSync(HEADERS, headers);
console.log(`[gen-csp] wrote ${HEADERS} with ${hashes.size} inline-script hash(es)`);
