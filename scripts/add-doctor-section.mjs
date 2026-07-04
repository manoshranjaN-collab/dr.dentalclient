#!/usr/bin/env node
/** Inserts a "Meet Dr. Krinita Motwani" team/bio section into the homepage. */
import { readFileSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const PUB = join(dirname(fileURLToPath(import.meta.url)), "..", "public");
const file = join(PUB, "index.html");
const ARROW =
  "/klaas/wf/633daa121f1308def083b05d/634b07f56668dd28b880b46b_arrow-icon-tan.svg";
const DOC_IMG = "/klaas/drk/dr-krinita.jpg";

const SECTION = `<section id="the-team" class="section"><div class="container"><div class="padding"><style>
.drk-bio-grid{display:grid;grid-template-columns:0.85fr 1.15fr;gap:4em;align-items:center}
.drk-bio-grid ._3d-block{width:100%;max-width:26em;margin:0 auto}
.drk-bio-img{width:100%;height:auto;aspect-ratio:7/8;object-fit:cover;object-position:top center;border-radius:1em;display:block}
.drk-bio-eyebrow{letter-spacing:.25em;text-transform:uppercase;color:var(--tan);font-weight:600;font-size:.8em;margin:0 0 1em}
.drk-bio-role{opacity:.7;margin:.4em 0 1.4em;font-weight:500}
.drk-bio-grid p.drk-bio-para{opacity:.8;line-height:1.7em;margin-bottom:1.1em;max-width:40em}
@media screen and (max-width:767px){.drk-bio-grid{grid-template-columns:1fr;gap:2em}.drk-bio-grid ._3d-block{max-width:22em}}
</style><div class="drk-bio-grid"><div class="_3d-block"><div class="image-animation-trigger _3d-for-image"><div class="animation-color-bg is-linen"></div><img src="${DOC_IMG}" alt="Dr. Krinita Motwani - Best Dentist in Mumbai" class="drk-bio-img"/></div></div><div><p class="drk-bio-eyebrow">Our Team</p><h2 class="heading is-medium-title">Dr. Krinita Motwani</h2><p class="drk-bio-role">Best Dentist in Mumbai &middot; Celebrity Cosmetic Dentist &middot; BDS, Government Dental College</p><p class="drk-bio-para">You will be pleased to meet a young, vibrant, and enthusiastic person who is recognised as a celebrity dentist in Mumbai, successfully running the best dental clinic in Mumbai. Dr. Krinita has always been very creative, with a passion for painting, cooking, and playing the violin, and she pays extreme importance and attention to detail. Being a health enthusiast, she indulges in regular exercise and maintains excellent eating habits.</p><p class="drk-bio-para">Dr. Krinita acquired her degree of &ldquo;Bachelors in Dental Surgery&rdquo; in 2002 from Government Dental College, Mumbai, one of the most recognised institutions for dentistry in India. As the best dentist in Mumbai, she combines her creativity and dedication to offer top-notch dental care.</p><a href="/about-1" class="button w-inline-block"><div class="text-for-button">Know More</div><img src="${ARROW}" loading="lazy" alt="" class="icon-for-button"/><div class="button-bg"></div></a></div></div></div></div></section>`;

let html = readFileSync(file, "utf8");
if (html.includes('id="the-team"')) {
  console.log("Team section already present — skipping.");
} else {
  const anchor = '<section id="gallery"';
  const i = html.indexOf(anchor);
  if (i === -1) throw new Error("gallery section not found");
  html = html.slice(0, i) + SECTION + html.slice(i);
  writeFileSync(file, html, "utf8");
  console.log("Inserted 'Meet Dr. Krinita Motwani' section before the gallery.");
}
