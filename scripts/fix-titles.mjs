#!/usr/bin/env node
/** Cleans the leftover "Webflow HTML website template" title suffix. */
import { readFileSync, writeFileSync, readdirSync, statSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const PUB = join(dirname(fileURLToPath(import.meta.url)), "..", "public");
const SUFFIX = "Dr. Krinita Motwani | Best Dentist & Dental Clinic in Mumbai";

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

let changed = 0;
for (const file of walk(PUB)) {
  let html = readFileSync(file, "utf8");
  const before = html;
  html = html.replace(/<title>([^<]*)<\/title>/i, (_m, t) => {
    // Keep the page label (e.g. "Contact 1", "About 1"); drop the boilerplate.
    let label = t
      .replace(/\s*[|:]\s*Dr\. Krinita Motwani.*$/i, "")
      .replace(/\s*[-|:]\s*Webflow HTML website template\s*$/i, "")
      .trim();
    const title =
      label && !/^dr\. krinita motwani/i.test(label)
        ? `${label} | ${SUFFIX}`
        : SUFFIX;
    return `<title>${title}</title>`;
  });
  if (html !== before) {
    writeFileSync(file, html, "utf8");
    changed++;
  }
}
console.log(`Fixed titles on ${changed} pages.`);
