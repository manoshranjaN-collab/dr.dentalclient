#!/usr/bin/env node
/**
 * Localizes every remote asset referenced by public/klaas-home.html so the
 * clone loads fast and animates consistently with zero external requests.
 *
 * - Downloads all Webflow CDN + cloudfront assets (CSS, JS, images) into
 *   public/klaas/ preserving path structure.
 * - Rewrites the HTML to reference the local copies.
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const HTML = join(ROOT, "public", "klaas-home.html");
const OUT = join(ROOT, "public", "klaas");

const HOSTS = {
  "https://cdn.prod.website-files.com/": "wf/",
  "https://d3e54v103j8qbb.cloudfront.net/": "cf/",
};

let html = readFileSync(HTML, "utf8");

// Collect candidate URLs from src, href, and srcset attributes.
const urls = new Set();
const attrRe = /(?:src|href)="([^"]+)"/g;
const srcsetRe = /srcset="([^"]+)"/g;
let m;
while ((m = attrRe.exec(html))) urls.add(m[1]);
while ((m = srcsetRe.exec(html))) {
  for (const part of m[1].split(",")) {
    const u = part.trim().split(/\s+/)[0];
    if (u) urls.add(u);
  }
}

function localFor(url) {
  for (const [host, prefix] of Object.entries(HOSTS)) {
    if (url.startsWith(host)) {
      const rest = url.slice(host.length).split("?")[0];
      return { local: `/klaas/${prefix}${rest}`, disk: join(OUT, prefix + rest) };
    }
  }
  return null;
}

const toFetch = [];
for (const url of urls) {
  const target = localFor(url);
  if (target) toFetch.push({ url: url.split("?")[0], ...target });
}

console.log(`Localizing ${toFetch.length} assets...`);

let done = 0;
async function grab({ url, disk }) {
  if (existsSync(disk)) {
    done++;
    return;
  }
  mkdirSync(dirname(disk), { recursive: true });
  const res = await fetch(url);
  if (!res.ok) {
    console.warn(`  ! ${res.status} ${url}`);
    return;
  }
  const buf = Buffer.from(await res.arrayBuffer());
  writeFileSync(disk, buf);
  done++;
  if (done % 25 === 0) console.log(`  ${done}/${toFetch.length}`);
}

// Batched parallel downloads (8 at a time).
for (let i = 0; i < toFetch.length; i += 8) {
  await Promise.all(toFetch.slice(i, i + 8).map(grab));
}
console.log(`Downloaded ${done} assets.`);

// Rewrite the HTML: replace both hosts with local prefixes, strip query strings
// on the CDN asset URLs so they resolve to the downloaded files.
for (const [host, prefix] of Object.entries(HOSTS)) {
  const re = new RegExp(
    host.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "([^\"'\\s)]+)",
    "g"
  );
  html = html.replace(re, (_full, rest) => `/klaas/${prefix}${rest.split("?")[0]}`);
}
writeFileSync(HTML, html, "utf8");
console.log("Rewrote public/klaas-home.html to local asset paths.");
