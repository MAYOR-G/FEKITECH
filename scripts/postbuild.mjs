import fs from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";

const root = process.cwd();
const distDir = path.join(root, "dist");
const templatePath = path.join(distDir, "index.html");

function outputPathForRoute(route) {
  if (route === "/") {
    return templatePath;
  }
  return path.join(distDir, route.replace(/^\//, ""), "index.html");
}

function getBuiltAssetTags(template) {
  const head = template.match(/<head>([\s\S]*?)<\/head>/)?.[1] || "";
  return (head.match(/<(?:script|link)\b(?=[^>]*(?:\/assets\/|rel="(?:stylesheet|modulepreload)"))[\s\S]*?(?:<\/script>|\/?>)/g) || []).join("\n    ");
}

function injectHead(template, route, headTags) {
  const assetTags = getBuiltAssetTags(template);
  const baseHead = [
    '<meta charset="UTF-8" />',
    '<meta name="viewport" content="width=device-width, initial-scale=1.0" />',
    '<meta name="robots" content="index, follow" />',
    '<link rel="icon" type="image/png" href="/fekitech-logo.png" />',
    '<link rel="apple-touch-icon" href="/fekitech-logo.png" />',
    headTags,
    assetTags
  ].filter(Boolean).join("\n    ");

  return template.replace(/<head>[\s\S]*?<\/head>/, `<head>\n    ${baseHead}\n  </head>`);
}

function injectRoot(template, route, appHtml) {
  const rootHtml = `<div id="root" data-pathname="${route}">${appHtml}</div>`;
  return template.replace('<div id="root"></div>', rootHtml);
}

async function writeRoute(route, template, render, getHeadTags) {
  const appHtml = render(route);
  const html = injectRoot(injectHead(template, route, getHeadTags(route)), route, appHtml);
  const outputPath = outputPathForRoute(route);
  await fs.mkdir(path.dirname(outputPath), { recursive: true });
  await fs.writeFile(outputPath, html);
}

async function main() {
  const template = await fs.readFile(templatePath, "utf8");
  const serverEntry = await import(pathToFileURL(path.join(root, "dist-ssr", "entry-server.js")));

  await Promise.all(serverEntry.sitemapRoutes.map((route) => writeRoute(route, template, serverEntry.render, serverEntry.getHeadTags)));
  await fs.writeFile(path.join(distDir, "robots.txt"), serverEntry.getRobotsTxt());
  await fs.writeFile(path.join(distDir, "sitemap.xml"), serverEntry.getSitemapXml());
  await fs.rm(path.join(root, "dist-ssr"), { recursive: true, force: true });
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
