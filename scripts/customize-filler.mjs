#!/usr/bin/env node
/** Replaces all remaining Lorem ipsum filler text with on-brand clinic copy. */
import { readFileSync, writeFileSync, readdirSync, statSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const PUB = join(dirname(fileURLToPath(import.meta.url)), "..", "public");

const COPY = [
  "At Dr. Krinita Motwani's Multispeciality Dental Clinic, we combine advanced cosmetic dentistry with a gentle, personalised approach for a confident, healthy smile.",
  "From routine cleanings to complete smile makeovers, our Khar West clinic offers a full range of dental treatments under one roof.",
  "Our experienced team uses modern technology and premium materials to deliver comfortable, world-class dental care in Mumbai.",
  "We believe great dentistry is about more than healthy teeth \u2014 it\u2019s about creating smiles you love to share.",
  "Rated 4.9 on Google by over 409 patients, we are trusted as one of the best dental clinics in Mumbai.",
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

// Match a Lorem ipsum text node (up to the next tag).
const re = /Lorem ipsum[^<]*/g;
let i = 0;
let changed = 0;
for (const file of walk(PUB)) {
  let html = readFileSync(file, "utf8");
  if (!/Lorem ipsum/.test(html)) continue;
  html = html.replace(re, () => COPY[i++ % COPY.length]);
  writeFileSync(file, html, "utf8");
  changed++;
}
console.log(`Replaced ${i} filler blocks across ${changed} pages.`);
