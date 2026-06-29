import assert from "node:assert/strict";
import fs from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const distDir = path.join(root, "dist");
const siteUrl = "https://fekitech.co.uk";
const publicRoutes = [
  "/",
  "/about",
  "/services",
  "/pricing",
  "/blog",
  "/contact",
  "/blog/why-most-businesses-are-not-profitable"
];
const expectedSeo = {
  "/": {
    title: "Fekitech | Business Transformation Company",
    description: "Fekitech helps business owners build organised, profitable businesses with better systems, clearer operations, improved performance, and ongoing expert support."
  },
  "/about": {
    title: "About Fekitech | Business Transformation Company",
    description: "Learn how Fekitech helps businesses become organised, data-driven, profitable, and scalable through clearer systems and expert advisory."
  },
  "/services": {
    title: "Business Transformation Services | Fekitech",
    description: "Explore Fekitech’s business transformation services for improving operations, systems, profitability, performance, and long-term business growth."
  },
  "/pricing": {
    title: "Business Transformation Packages | Fekitech Pricing",
    description: "View Fekitech’s business transformation packages designed to help businesses improve systems, operations, profitability, and scalable performance."
  },
  "/blog": {
    title: "Business Transformation Insights | Fekitech Blog",
    description: "Read practical insights on business transformation, operations, profitability, systems, customer growth, and performance improvement."
  },
  "/contact": {
    title: "Contact Fekitech | Business Transformation Support",
    description: "Contact Fekitech for business transformation support, operational improvement, better systems, and expert advisory for your business."
  },
  "/blog/why-most-businesses-are-not-profitable": {
    title: "Why Most Businesses Are Not Profitable | Fekitech",
    description: "Learn why businesses struggle with profitability and how structured systems, clearer operations, retention, and business transformation improve performance."
  }
};

function outputPathForRoute(route) {
  return route === "/"
    ? path.join(distDir, "index.html")
    : path.join(distDir, route.slice(1), "index.html");
}

function decodeHtml(value) {
  return value
    .replaceAll("&amp;", "&")
    .replaceAll("&quot;", '"')
    .replaceAll("&#39;", "'")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">");
}

function getTagValue(html, pattern, label) {
  const match = html.match(pattern);
  assert(match, `Missing ${label}`);
  return decodeHtml(match[1]);
}

function getPngDimensions(buffer) {
  const signature = buffer.subarray(0, 8).toString("hex");
  assert.equal(signature, "89504e470d0a1a0a", "OG image is not a valid PNG");
  return {
    width: buffer.readUInt32BE(16),
    height: buffer.readUInt32BE(20)
  };
}

function extractJsonLd(html) {
  return [...html.matchAll(/<script type="application\/ld\+json" data-seo-jsonld>([\s\S]*?)<\/script>/g)]
    .map((match) => JSON.parse(match[1]));
}

const routeHtml = new Map();
const titles = new Set();
const descriptions = new Set();

for (const route of publicRoutes) {
  const html = await fs.readFile(outputPathForRoute(route), "utf8");
  routeHtml.set(route, html);

  const title = getTagValue(html, /<title>([^<]+)<\/title>/, `${route} title`);
  const description = getTagValue(html, /<meta name="description" content="([^"]+)" \/>/, `${route} description`);
  const canonical = getTagValue(html, /<link rel="canonical" href="([^"]+)" \/>/, `${route} canonical`);
  const hreflang = getTagValue(html, /<link rel="alternate" href="([^"]+)" hreflang="en-GB" \/>/, `${route} en-GB hreflang`);
  const xDefault = getTagValue(html, /<link rel="alternate" href="([^"]+)" hreflang="x-default" \/>/, `${route} x-default hreflang`);
  const robots = getTagValue(html, /<meta name="robots" content="([^"]+)" \/>/, `${route} robots`);
  const ogUrl = getTagValue(html, /<meta property="og:url" content="([^"]+)" \/>/, `${route} og:url`);
  const ogImage = getTagValue(html, /<meta property="og:image" content="([^"]+)" \/>/, `${route} og:image`);
  const twitterImage = getTagValue(html, /<meta name="twitter:image" content="([^"]+)" \/>/, `${route} twitter:image`);

  assert.equal(title, expectedSeo[route].title, `${route} title mismatch`);
  assert.equal(description, expectedSeo[route].description, `${route} description mismatch`);
  assert.equal(canonical, `${siteUrl}${route}`, `${route} canonical mismatch`);
  assert.equal(hreflang, canonical, `${route} en-GB hreflang mismatch`);
  assert.equal(xDefault, canonical, `${route} x-default hreflang mismatch`);
  assert.equal(ogUrl, canonical, `${route} og:url mismatch`);
  assert.equal(ogImage, `${siteUrl}/og-image.png`, `${route} OG image mismatch`);
  assert.equal(twitterImage, ogImage, `${route} Twitter image mismatch`);
  assert.equal(robots, "index, follow", `${route} should be indexable`);
  assert(!html.includes("vercel.app"), `${route} contains a Vercel preview URL`);
  assert(!html.includes("https://www.fekitech.co.uk"), `${route} contains a www canonical URL`);
  assert(!html.includes("og-image.svg"), `${route} references an SVG social image`);
  const jsonLd = extractJsonLd(html);
  assert(jsonLd.length > 0, `${route} has no valid JSON-LD`);
  const graph = jsonLd.flatMap((entry) => entry["@graph"] || []);
  const schemaTypes = new Set(graph.flatMap((entry) => Array.isArray(entry["@type"]) ? entry["@type"] : [entry["@type"]]));
  for (const requiredType of ["Organization", "ProfessionalService", "LocalBusiness", "ContactPoint", "WebSite", "WebPage"]) {
    assert(schemaTypes.has(requiredType), `${route} is missing ${requiredType} schema`);
  }
  if (route !== "/") assert(schemaTypes.has("BreadcrumbList"), `${route} is missing BreadcrumbList schema`);
  if (route === "/services") assert(schemaTypes.has("Service"), "Services page is missing Service schema");
  if (route === "/pricing") assert(schemaTypes.has("OfferCatalog"), "Pricing page is missing OfferCatalog schema");
  if (route === "/blog/why-most-businesses-are-not-profitable") {
    assert(schemaTypes.has("BlogPosting"), "Blog article is missing BlogPosting schema");
    const article = graph.find((entry) => entry["@type"] === "BlogPosting");
    assert.equal(article.datePublished, "2026-06-18", "BlogPosting datePublished mismatch");
    assert.equal(article.dateModified, "2026-06-29", "BlogPosting dateModified mismatch");
  }

  for (const image of html.matchAll(/<img\b[^>]*>/g)) {
    assert(/\salt="[^"]*"/.test(image[0]), `${route} has an image without an alt attribute`);
    assert(/\swidth="[^"]+"/.test(image[0]), `${route} has an image without width`);
    assert(/\sheight="[^"]+"/.test(image[0]), `${route} has an image without height`);
  }

  for (const match of html.matchAll(/<a\b[^>]*href="https:\/\/(?:www\.)?(?:facebook|instagram|tiktok)\.com[^"]*"[^>]*>/g)) {
    assert(/target="_blank"/.test(match[0]), `${route} social link missing target blank`);
    assert(/rel="noopener noreferrer"/.test(match[0]), `${route} social link missing safe rel`);
    assert(/aria-label="Fekitech on /.test(match[0]) || />[^<]+<\/a>/.test(match[0]), `${route} social link missing accessible label`);
  }

  titles.add(title);
  descriptions.add(description);
}

assert.equal(titles.size, publicRoutes.length, "Public page titles must be unique");
assert.equal(descriptions.size, publicRoutes.length, "Public page descriptions must be unique");

const adminHtml = await fs.readFile(outputPathForRoute("/admin"), "utf8");
assert.match(adminHtml, /<meta name="robots" content="noindex, nofollow, noarchive" \/>/, "/admin is missing noindex/noarchive");

const robots = await fs.readFile(path.join(distDir, "robots.txt"), "utf8");
assert.equal(
  robots,
  `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`,
  "robots.txt content mismatch"
);

const sitemap = await fs.readFile(path.join(distDir, "sitemap.xml"), "utf8");
assert.match(sitemap, /^<\?xml version="1\.0" encoding="UTF-8"\?>/, "Sitemap XML declaration is missing");
assert.match(sitemap, /<urlset xmlns="http:\/\/www\.sitemaps\.org\/schemas\/sitemap\/0\.9">/, "Sitemap namespace is invalid");
const sitemapUrls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
assert.deepEqual(sitemapUrls, publicRoutes.map((route) => `${siteUrl}${route}`), "Sitemap routes mismatch");
assert(!sitemap.includes("/admin"), "Sitemap contains /admin");
assert(!sitemap.includes("/api/"), "Sitemap contains an API route");
for (const lastmod of sitemap.matchAll(/<lastmod>([^<]+)<\/lastmod>/g)) {
  assert(/^\d{4}-\d{2}-\d{2}$/.test(lastmod[1]), `Invalid sitemap lastmod: ${lastmod[1]}`);
}

const ogImage = await fs.readFile(path.join(distDir, "og-image.png"));
assert.deepEqual(getPngDimensions(ogImage), { width: 1200, height: 630 }, "OG image must be 1200x630");
const logoImage = await fs.readFile(path.join(distDir, "fekitech-logo-transparent-cropped.png"));
assert.deepEqual(getPngDimensions(logoImage), { width: 616, height: 646 }, "FekiTech logo dimensions mismatch");
for (const [route, html] of routeHtml) {
  assert(
    html.includes("/fekitech-logo-transparent-cropped.png"),
    `${route} does not reference the new FekiTech logo`
  );
  assert(!html.includes("/fekitech-logo.png"), `${route} still references the old FekiTech logo`);
}

const vercelConfig = JSON.parse(await fs.readFile(path.join(root, "vercel.json"), "utf8"));
const wwwRedirect = vercelConfig.redirects?.find((redirect) =>
  redirect.has?.some((condition) => condition.type === "host" && condition.value === "www.fekitech.co.uk")
);
assert(wwwRedirect, "www-to-apex redirect is missing");
assert.equal(wwwRedirect.destination, `${siteUrl}/:path*`, "www redirect destination mismatch");
assert.equal(wwwRedirect.statusCode, 301, "www redirect must use HTTP 301");
assert.equal(wwwRedirect.permanent, undefined, "www redirect must use statusCode instead of Vercel's 308 permanent option");
assert.equal(vercelConfig.trailingSlash, false, "Trailing slash normalization is missing");
const sitemapHeaders = vercelConfig.headers?.find((entry) => entry.source === "/sitemap.xml");
assert(
  sitemapHeaders?.headers?.some((header) => header.key === "Content-Type" && header.value.startsWith("application/xml")),
  "Sitemap XML Content-Type header is missing"
);
const adminHeaders = vercelConfig.headers?.filter((entry) => entry.source.startsWith("/admin")) || [];
assert(
  adminHeaders.length >= 2 && adminHeaders.every((entry) => entry.headers.some((header) => header.key === "X-Robots-Tag")),
  "Admin X-Robots-Tag coverage is incomplete"
);

const knownInternalRoutes = new Set([...publicRoutes, "/admin", "/audit"]);
for (const [route, html] of routeHtml) {
  for (const match of html.matchAll(/href="([^"]+)"/g)) {
    const href = decodeHtml(match[1]);
    if (/^(?:https?:|mailto:|tel:|#)/.test(href)) continue;
    const pathname = href.split(/[?#]/)[0].replace(/\/$/, "") || "/";
    const staticPath = pathname === "/" ? distDir : path.join(distDir, pathname.slice(1));
    const staticTargetExists = await fs.stat(staticPath).then(() => true).catch(() => false);
    if (staticTargetExists) continue;
    assert(knownInternalRoutes.has(pathname), `${route} contains a broken internal link: ${href}`);
  }
}

console.log(`SEO QA passed for ${publicRoutes.length} public routes.`);
