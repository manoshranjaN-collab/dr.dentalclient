#!/usr/bin/env node
/**
 * Self-hosts the Google Fonts (Gilda Display + Inter) used by the page so there
 * is no JS-driven font loader, no FOUT, and no external request — giving fast,
 * consistent first paint and stable animation trigger positions.
 */
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const OUT = join(ROOT, "public", "klaas", "fonts");
mkdirSync(OUT, { recursive: true });

const GF =
  "https://fonts.googleapis.com/css2?family=Gilda+Display&family=Inter:wght@200;300;400;500;600;700;800&display=swap";

// Modern UA => woff2 responses.
const UA =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36";

let css = await (await fetch(GF, { headers: { "User-Agent": UA } })).text();

const fontUrls = [...css.matchAll(/url\((https:\/\/fonts\.gstatic\.com\/[^)]+)\)/g)].map(
  (m) => m[1]
);
console.log(`Downloading ${fontUrls.length} font files...`);

let i = 0;
for (const url of new Set(fontUrls)) {
  const name = url.split("/").pop().split("?")[0];
  const res = await fetch(url, { headers: { "User-Agent": UA } });
  writeFileSync(join(OUT, name), Buffer.from(await res.arrayBuffer()));
  css = css.split(url).join(`/klaas/fonts/${name}`);
  i++;
}
writeFileSync(join(OUT, "fonts.css"), css, "utf8");
console.log(`Saved ${i} fonts + fonts.css`);

// --- Rewrite the HTML: drop the JS webfont loader, add local font stylesheet ---
const HTML = join(ROOT, "public", "klaas-home.html");
let html = readFileSync(HTML, "utf8");

// Remove the WebFont loader <script> and the webfont.js include.
html = html.replace(
  /<script[^>]*src="https:\/\/ajax\.googleapis\.com\/ajax\/libs\/webfont[^"]*"[^>]*><\/script>/,
  ""
);
html = html.replace(
  /<script[^>]*>\s*WebFont\.load\([\s\S]*?\);\s*<\/script>/,
  ""
);

// Inject local font stylesheet right before </head>.
if (!html.includes("/klaas/fonts/fonts.css")) {
  html = html.replace(
    "</head>",
    '<link rel="stylesheet" href="/klaas/fonts/fonts.css"/></head>'
  );
}
writeFileSync(HTML, html, "utf8");
console.log("Rewrote HTML: removed JS font loader, added local fonts.css");
