#!/usr/bin/env node
/**
 * Deep content customization using verified info for
 * "Dr Krinita Motwani's Multispeciality Dental Clinic" (Khar West, Mumbai).
 * Only real, verifiable data from the site + Google Business Profile is used.
 */
import { readFileSync, writeFileSync, readdirSync, statSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const PUB = join(dirname(fileURLToPath(import.meta.url)), "..", "public");
const ADDRESS =
  "Simran Plaza, 403, Junction of 3rd &amp; 4th Road, Khar West, Mumbai, Maharashtra 400052";
const HOURS = "Monday - Saturday: 9 A.M. onwards (by appointment)";

// Applied to every page — exact-string, order-sensitive replacements.
const GLOBAL = [
  // Clinic name / slogan
  ["Dental Clinic, Mumbai", "Multispeciality Dental Clinic"],

  // Real service names (visible labels; URL slugs stay the same so links work)
  ["Dental hygiene", "Oral Prophylaxis"],
  ["Dental fillings", "Dental Restorations"],
  ["Dental crowns", "Dental Crowns"],
  ["Dental bridges", "Dental Implants"],
  ["Fixed braces", "Invisible Braces"],
  ["Teeth whitening", "Zoom Teeth Whitening"],
  ["White fillings", "Dental Bonding"],
  ["Cosmetic dentures", "Porcelain Veneers"],
  ["Lingual braces", "Single Sitting Root Canal"],
  ["Invisible braces", "Smile Makeover"],

  // Hours + contact
  ["Monday - Friday 9 A.M. - 5 P.M.", `${HOURS} · ${ADDRESS}`],

  // About copy (real About text from the clinic)
  [
    "We are passionate about helping people smile and live healthily",
    "We believe dental care is about more than healthy teeth \u2014 it\u2019s about creating confident smiles.",
  ],
  [
    "First-class dental treatment options to meet your needs",
    "A full range of treatments under one roof \u2014 from cleanings to complete smile makeovers.",
  ],
  [
    "High-quality and affordable dental care services",
    "Premium cosmetic dentistry with a gentle, personalised approach.",
  ],

  // Stats -> real Google numbers
  ['class="grid-7-text-3">30+</p>', 'class="grid-7-text-3">4.9</p>'],
  ['class="grid-7-text-3">20K</p>', 'class="grid-7-text-3">409+</p>'],
  ['class="grid-7-text-3">8+ </p>', 'class="grid-7-text-3">10+ </p>'],
  ["expert members", "Google rating"],
  ["successful treatments", "Google reviews"],
  ["high-quality clinics", "dental services"],

  // Know-how highlight -> Google rating
  [
    '<span class="opacity-70">We have Over </span>20 years<span class="opacity-70"> of experience</span>',
    '<span class="opacity-70">Rated </span>4.9 \u2605<span class="opacity-70"> on Google (409 reviews)</span>',
  ],

  // Contact tagline
  [
    "We are passionate about helping people smile.",
    "Creating confident smiles in Khar West, Mumbai.",
  ],
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
  for (const [from, to] of GLOBAL) html = html.split(from).join(to);
  if (html !== before) {
    writeFileSync(file, html, "utf8");
    changed++;
  }
}
console.log(`Content-customized ${changed} pages.`);
