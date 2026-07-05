#!/usr/bin/env node
/** Removes template footer credits: /term/* links + metrik.studio credit links. */
import { readFileSync, writeFileSync, readdirSync, statSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const PUB = join(dirname(fileURLToPath(import.meta.url)), "..", "public");

const patterns = [
  // /term/* subfooter list items (Changelog, Instructions, Licencing, Sample page)
  /<div role="listitem" class="subfooter-link-item w-dyn-item"><a href="\/term\/[^"]+"[^>]*>[^<]*<\/a><\/div>/g,
  // metrik.studio credit links (Made by Metrik, Webflow templates)
  /<a href="https:\/\/www\.metrik\.studio\/[^"]*"[^>]*>[^<]*<\/a>/g,
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

let changed = 0;
for (const file of walk(PUB)) {
  let html = readFileSync(file, "utf8");
  const before = html;
  for (const re of patterns) html = html.replace(re, "");
  if (html !== before) {
    writeFileSync(file, html, "utf8");
    changed++;
  }
}
console.log(`Removed footer credits from ${changed} pages.`);
