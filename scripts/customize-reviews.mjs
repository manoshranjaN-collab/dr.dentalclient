#!/usr/bin/env node
/** Replaces Lorem ipsum placeholder testimonials with real Google review quotes. */
import { readFileSync, writeFileSync, readdirSync, statSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const PUB = join(dirname(fileURLToPath(import.meta.url)), "..", "public");
const LOREM =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";

const QUOTES = [
  "Was guided by the doctor throughout and received amazing treatment!",
  "Staff is very accommodating and the office is fantastic and clean.",
  "Amazing place to get all your dentistry work done.",
  "Highly recommend Dr. Krinita Motwani for anyone looking for the best dental care in Mumbai.",
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

let i = 0;
let changed = 0;
for (const file of walk(PUB)) {
  let html = readFileSync(file, "utf8");
  if (!html.includes(LOREM)) continue;
  // Replace each occurrence with the next quote in rotation.
  let out = "";
  let rest = html;
  let idx;
  while ((idx = rest.indexOf(LOREM)) !== -1) {
    out += rest.slice(0, idx) + QUOTES[i % QUOTES.length];
    i++;
    rest = rest.slice(idx + LOREM.length);
  }
  out += rest;
  writeFileSync(file, out, "utf8");
  changed++;
}
console.log(`Replaced ${i} placeholder testimonials across ${changed} pages.`);
