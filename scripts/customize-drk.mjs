#!/usr/bin/env node
/**
 * Customizes the mirrored template for Dr. Krinita Motwani (cosmetic dentist,
 * Mumbai). Applies global brand/contact replacements across every page, plus
 * targeted homepage hero/section copy. Only touches visible text/attributes —
 * never the lowercase /klaas/ asset paths.
 */
import { readFileSync, writeFileSync, readdirSync, statSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const PUB = join(dirname(fileURLToPath(import.meta.url)), "..", "public");

// Global, unambiguous replacements applied to every page.
const GLOBAL = [
  ["clinic@klaas.com", "smileenquiries@drkrinitamotwani.com"],
  ["new.patients@klaas.com", "smileenquiries@drkrinitamotwani.com"],
  ["hello@klaas.com", "smileenquiries@drkrinitamotwani.com"],
  ["333 (55) 328 786", "+91 98202 80343"],
  ["Dentist template", "Dental Clinic, Mumbai"],
  ["Klaas - Dentist website Webflow template", "Dr. Krinita Motwani Dental Clinic, Mumbai"],
  // Brand name (capitalized only — never the lowercase /klaas/ paths).
  ["Klaas", "Dr. Krinita Motwani"],
  // Clinic city labels -> Mumbai localities.
  [">New York<", ">Bandra West<"],
  [">London<", ">Khar<"],
  [">Berlin<", ">Mumbai<"],
];

// Homepage-only copy edits (verbatim strings from the mirrored index.html).
const HOME = [
  ["Excellent dental services", "The best cosmetic dentist in Mumbai"],
  [
    "We offer dental services at a highly innovative level, with a guarantee for all treatments.",
    "Advanced aesthetic dentistry, smile makeovers, and premium dental care by Dr. Krinita Motwani — a celebrity cosmetic dentist in Mumbai.",
  ],
  [
    "We are excellent in dental care and treatments for all patients. We take care of you and your family.",
    "Personalised, world-class dental care in Mumbai — from smile makeovers and veneers to implants and invisible braces.",
  ],
];

function walk(dir) {
  const out = [];
  for (const name of readdirSync(dir)) {
    if (name === "klaas") continue; // skip the asset mirror
    const p = join(dir, name);
    const st = statSync(p);
    if (st.isDirectory()) out.push(...walk(p));
    else if (name.endsWith(".html")) out.push(p);
  }
  return out;
}

function applyAll(text, pairs) {
  for (const [from, to] of pairs) text = text.split(from).join(to);
  return text;
}

const files = walk(PUB);
let changed = 0;
for (const file of files) {
  let html = readFileSync(file, "utf8");
  const before = html;
  html = applyAll(html, GLOBAL);
  if (file === join(PUB, "index.html")) html = applyAll(html, HOME);
  if (html !== before) {
    writeFileSync(file, html, "utf8");
    changed++;
  }
}
console.log(`Customized ${changed}/${files.length} pages for Dr. Krinita Motwani.`);
