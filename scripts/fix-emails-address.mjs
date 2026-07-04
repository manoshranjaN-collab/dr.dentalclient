#!/usr/bin/env node
/** Replaces any leftover *@klaas.com emails and injects the real clinic address. */
import { readFileSync, writeFileSync, readdirSync, statSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const PUB = join(dirname(fileURLToPath(import.meta.url)), "..", "public");
const EMAIL = "smileenquiries@drkrinitamotwani.com";

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

// Inject an Address block right before the "Email" contact block on clinic/contact pages.
const EMAIL_BLOCK =
  '<div class="clinic-content-block-2"><p class="clinic-2-text-1">Email<br/></p>';
const ADDRESS_BLOCK =
  '<div class="clinic-content-block-2"><p class="clinic-2-text-1">Address<br/></p>' +
  '<p class="clinic-2-text-1 is-2nd">Simran Plaza, 403, Junction of 3rd &amp; 4th Road, Khar West, Mumbai, Maharashtra 400052</p></div>' +
  EMAIL_BLOCK;

let emailPages = 0;
let addrCount = 0;
for (const file of walk(PUB)) {
  let html = readFileSync(file, "utf8");
  const before = html;
  // 1. Any *@klaas.com (mailto + visible text) -> real email.
  html = html.replace(/[a-zA-Z0-9._-]+@klaas\.com/g, EMAIL);
  // 2. Inject address before each Email contact block (once per block).
  if (html.includes(EMAIL_BLOCK) && !html.includes("Junction of 3rd")) {
    html = html.split(EMAIL_BLOCK).join(ADDRESS_BLOCK);
    addrCount++;
  }
  if (html !== before) {
    writeFileSync(file, html, "utf8");
    emailPages++;
  }
}
console.log(`Updated ${emailPages} pages; injected address on ${addrCount}.`);
