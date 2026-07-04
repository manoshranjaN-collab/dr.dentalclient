#!/usr/bin/env node
/**
 * Full-site mirror of klaas-dentist-template.webflow.io.
 * - BFS-crawls all internal pages.
 * - Saves each page as public/<slug>.html.
 * - Downloads every CDN asset (CSS, JS, images) into public/klaas/ (deduped).
 * - Rewrites asset URLs -> local, strips the JS font loader, injects local fonts.
 * - Leaves internal links as clean paths (served via afterFiles rewrite).
 */
import {
  readFileSync,
  writeFileSync,
  mkdirSync,
  existsSync,
} from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const PUB = join(ROOT, "public");
const OUT = join(PUB, "klaas");
const BASE = "https://klaas-dentist-template.webflow.io";
const UA =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36";

const HOSTS = {
  "https://cdn.prod.website-files.com/": "wf/",
  "https://d3e54v103j8qbb.cloudfront.net/": "cf/",
};

const MAX_PAGES = 80;

// --- helpers ---
const assetUrls = new Set();

function collectAssets(html) {
  const add = (u) => {
    const clean = u.split("?")[0];
    for (const host of Object.keys(HOSTS))
      if (clean.startsWith(host)) assetUrls.add(clean);
  };
  for (const m of html.matchAll(/(?:src|href)="([^"]+)"/g)) add(m[1]);
  for (const m of html.matchAll(/srcset="([^"]+)"/g))
    for (const part of m[1].split(","))
      if (part.trim()) add(part.trim().split(/\s+/)[0]);
}

function localizeAssetUrls(text) {
  for (const [host, prefix] of Object.entries(HOSTS)) {
    const re = new RegExp(
      host.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "([^\"'\\s)]+)",
      "g"
    );
    text = text.replace(re, (_f, rest) => `/klaas/${prefix}${rest.split("?")[0]}`);
  }
  return text;
}

function slugFor(pathname) {
  let p = pathname.replace(/^\/+/, "").replace(/\/+$/, "");
  if (p === "" || p === "/") return "index";
  return p;
}

function extractLinks(html) {
  const links = new Set();
  for (const m of html.matchAll(/href="([^"]+)"/g)) {
    let href = m[1];
    if (href.startsWith(BASE)) href = href.slice(BASE.length) || "/";
    if (!href.startsWith("/")) continue; // external / mailto / tel / #
    if (href.startsWith("//")) continue;
    href = href.split("#")[0].split("?")[0];
    if (!href) continue;
    if (/\.(css|js|png|jpe?g|svg|avif|webp|gif|ico|xml|json|txt|pdf)$/i.test(href))
      continue;
    links.add(href);
  }
  return [...links];
}

// --- crawl ---
const queue = ["/"];
const seen = new Set();
const pages = new Map(); // slug -> html

while (queue.length && pages.size < MAX_PAGES) {
  const path = queue.shift();
  if (seen.has(path)) continue;
  seen.add(path);
  try {
    const res = await fetch(BASE + path, { headers: { "User-Agent": UA } });
    if (!res.ok) {
      console.warn(`  ! ${res.status} ${path}`);
      continue;
    }
    const ct = res.headers.get("content-type") || "";
    if (!ct.includes("text/html")) continue;
    const html = await res.text();
    pages.set(slugFor(path), html);
    collectAssets(html);
    for (const link of extractLinks(html))
      if (!seen.has(link) && !queue.includes(link)) queue.push(link);
    console.log(`  page ${pages.size}: ${path}`);
  } catch (e) {
    console.warn(`  ! error ${path}: ${e.message}`);
  }
}
console.log(`Crawled ${pages.size} pages. Assets to fetch: ${assetUrls.size}`);

// --- download assets ---
function diskFor(url) {
  for (const [host, prefix] of Object.entries(HOSTS))
    if (url.startsWith(host)) {
      // Decode percent-escapes (e.g. %20) so the on-disk filename matches what
      // the browser looks for after the server decodes the request URL.
      const rest = decodeURIComponent(url.slice(host.length).split("?")[0]);
      return join(OUT, prefix + rest);
    }
  return null;
}
const list = [...assetUrls];
let done = 0;
async function grab(url) {
  const disk = diskFor(url);
  if (!disk) return;
  if (existsSync(disk)) {
    done++;
    return;
  }
  try {
    const res = await fetch(url, { headers: { "User-Agent": UA } });
    if (!res.ok) {
      console.warn(`  ! ${res.status} ${url}`);
      return;
    }
    mkdirSync(dirname(disk), { recursive: true });
    writeFileSync(disk, Buffer.from(await res.arrayBuffer()));
    done++;
    if (done % 50 === 0) console.log(`  assets ${done}/${list.length}`);
  } catch (e) {
    console.warn(`  ! ${url}: ${e.message}`);
  }
}
for (let i = 0; i < list.length; i += 10)
  await Promise.all(list.slice(i, i + 10).map(grab));
console.log(`Downloaded ${done}/${list.length} assets.`);

// --- write pages with localized assets + local fonts ---
const FONT_LINK = '<link rel="stylesheet" href="/klaas/fonts/fonts.css"/>';
for (const [slug, rawHtml] of pages) {
  let html = localizeAssetUrls(rawHtml);
  html = html.replace(
    /<script[^>]*src="https:\/\/ajax\.googleapis\.com\/ajax\/libs\/webfont[^"]*"[^>]*><\/script>/,
    ""
  );
  html = html.replace(
    /<script[^>]*>\s*WebFont\.load\([\s\S]*?\);\s*<\/script>/,
    ""
  );
  if (!html.includes("/klaas/fonts/fonts.css"))
    html = html.replace("</head>", FONT_LINK + "</head>");
  const file = join(PUB, slug + ".html");
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, html, "utf8");
}
console.log(`Wrote ${pages.size} page files to public/.`);
console.log("Pages:", [...pages.keys()].join(", "));
