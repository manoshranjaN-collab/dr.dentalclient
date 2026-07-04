#!/usr/bin/env node
/** Removes the Webflow-template "Template" mega-dropdown and the "Overview"
 *  nav link from every page's navigation. */
import { readFileSync, writeFileSync, readdirSync, statSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const PUB = join(dirname(fileURLToPath(import.meta.url)), "..", "public");

const DROPDOWN_START =
  '<div data-hover="true" data-delay="0" class="dropdown-link w-dropdown"><div class="dropdown-toggle w-dropdown-toggle"><p class="menu-link-title">Template</p>';
const OVERVIEW_LINK =
  '<a href="/template-overview" class="nav-link-2 w-inline-block"><p class="menu-link-title">Overview</p></a>';

const tagRe = /<(\/?)(?:div|nav)\b[^>]*>/g;

function removeBalanced(html, startMarker) {
  const start = html.indexOf(startMarker);
  if (start === -1) return html;
  tagRe.lastIndex = start;
  let depth = 0;
  let end = -1;
  let m;
  while ((m = tagRe.exec(html))) {
    depth += m[1] === "/" ? -1 : 1;
    if (depth === 0) {
      end = tagRe.lastIndex;
      break;
    }
  }
  if (end === -1) return html;
  return html.slice(0, start) + html.slice(end);
}

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
  html = removeBalanced(html, DROPDOWN_START);
  html = html.split(OVERVIEW_LINK).join("");
  if (html !== before) {
    writeFileSync(file, html, "utf8");
    changed++;
  }
}
console.log(`Removed Template dropdown + Overview link from ${changed} pages.`);
