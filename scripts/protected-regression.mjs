import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const beforeDir = path.join(root, ".seo-audit", "protected-before");
const afterDir = path.join(root, ".seo-audit", "protected-after");
const protectedRoutes = ["home", "about", "pricing", "contact"];

function extractRoot(html) {
  const start = html.indexOf('<div id="root"');
  const end = html.indexOf("</body>", start);
  assert(start >= 0 && end > start, "Unable to find rendered root HTML");
  return html.slice(start, end).replace(/data-pathname="[^"]+"/g, "");
}

function extractVisibleText(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/g, " ")
    .replace(/<style[\s\S]*?<\/style>/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function digest(value) {
  return createHash("sha256").update(value).digest("hex");
}

for (const route of protectedRoutes) {
  const before = extractRoot(await fs.readFile(path.join(beforeDir, `${route}.html`), "utf8"));
  const after = extractRoot(await fs.readFile(path.join(afterDir, `${route}.html`), "utf8"));
  assert.equal(digest(after), digest(before), `${route} rendered root HTML changed`);
  assert.equal(digest(extractVisibleText(after)), digest(extractVisibleText(before)), `${route} visible text changed`);
  console.log(`${route}: rendered root and visible text unchanged`);
}
