#!/usr/bin/env node
/** Localizes url(...) assets referenced inside the downloaded Webflow CSS. */
import { readFileSync, writeFileSync, mkdirSync, existsSync, readdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const OUT = join(ROOT, "public", "klaas");
const cssDir = join(OUT, "wf", "633daa121f1308def083b05d", "css");
const cssFile = join(cssDir, readdirSync(cssDir).find((f) => f.endsWith(".css")));

let css = readFileSync(cssFile, "utf8");
const HOST = "https://cdn.prod.website-files.com/";
const urls = new Set();
let m;
const re = new RegExp(HOST.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "([^)\"'\\s]+)", "g");
while ((m = re.exec(css))) urls.add(m[1].split("?")[0]);

console.log(`Localizing ${urls.size} CSS assets...`);
for (const rest of urls) {
  const disk = join(OUT, "wf", rest);
  if (!existsSync(disk)) {
    mkdirSync(dirname(disk), { recursive: true });
    const res = await fetch(HOST + rest);
    if (res.ok) writeFileSync(disk, Buffer.from(await res.arrayBuffer()));
    else console.warn(`  ! ${res.status} ${rest}`);
  }
}
css = css.replace(re, (_f, rest) => `/klaas/wf/${rest.split("?")[0]}`);
writeFileSync(cssFile, css, "utf8");
console.log("Rewrote CSS to local asset paths.");
