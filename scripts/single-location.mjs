#!/usr/bin/env node
/** Reduce "How to find us" to a single Khar West, Mumbai location and remove
 *  leftover foreign template addresses site-wide. */
import { readFileSync, writeFileSync, readdirSync, statSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const PUB = join(dirname(fileURLToPath(import.meta.url)), "..", "public");
const REAL_ADDR =
  "Simran Plaza, 403, Junction of 3rd &amp; 4th Road, Khar West, Mumbai, Maharashtra 400052";

// --- 1. Contact page: keep only the first clinic card, drop the rest ---
const contactFile = join(PUB, "contact.html");
let html = readFileSync(contactFile, "utf8");

const tagRe = /<(\/?)div\b[^>]*>/g;
function itemBounds(str) {
  const bounds = [];
  const startRe = /<div role="listitem" class="clinic-2-item w-dyn-item">/g;
  let m;
  while ((m = startRe.exec(str))) {
    const s = m.index;
    tagRe.lastIndex = s;
    let depth = 0,
      t;
    while ((t = tagRe.exec(str))) {
      depth += t[1] ? -1 : 1;
      if (depth === 0) {
        bounds.push([s, tagRe.lastIndex]);
        break;
      }
    }
  }
  return bounds;
}

const items = itemBounds(html);
if (items.length > 1) {
  // Remove items 2..n (from start of item[1] to end of last item).
  const from = items[1][0];
  const to = items[items.length - 1][1];
  html = html.slice(0, from) + html.slice(to);
}
// Fix the single remaining card: name + bogus street subtitle.
html = html
  .replace(/<p class="clinic-2-name">[^<]*<\/p>/, '<p class="clinic-2-name">Khar West, Mumbai</p>')
  .replace(
    /785 Merritt Island Causeway, New York, United States/g,
    "Simran Plaza, 403, Khar West, Mumbai 400052"
  );
writeFileSync(contactFile, html, "utf8");
console.log(`Contact: reduced ${items.length} locations to 1 (Khar West, Mumbai).`);

// --- 2. Site-wide: replace leftover foreign template addresses ---
const FOREIGN = [
  "785 Merritt Island Causeway, New York, United States",
  "Learmonth Terrace 5AR, London, United Kingdom",
  "Dorstener Strasse 425, Berlin, Germany",
];
function walk(d) {
  const out = [];
  for (const n of readdirSync(d)) {
    if (n === "klaas") continue;
    const p = join(d, n);
    if (statSync(p).isDirectory()) out.push(...walk(p));
    else if (n.endsWith(".html")) out.push(p);
  }
  return out;
}
let cleaned = 0;
for (const file of walk(PUB)) {
  let h = readFileSync(file, "utf8");
  const before = h;
  for (const f of FOREIGN) h = h.split(f).join("Simran Plaza, 403, Khar West, Mumbai 400052");
  if (h !== before) {
    writeFileSync(file, h, "utf8");
    cleaned++;
  }
}
console.log(`Cleaned foreign addresses on ${cleaned} pages.`);
