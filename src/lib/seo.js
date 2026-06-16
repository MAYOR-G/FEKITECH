import { absoluteUrl, getCanonicalUrl, getSeo, pageSeo, prerenderRoutes, siteConfig, sitemapRoutes } from "./site.js";

export { sitemapRoutes } from "./site.js";
export { prerenderRoutes } from "./site.js";

const serviceItems = [
  ["Business Structure Design", "We define roles, responsibilities, workflows, ownership, and decision rhythms so the business can operate with clarity."],
  ["Digital Transformation", "We implement practical digital systems that reduce manual work, improve execution speed, and support better management."],
  ["Business Intelligence Architecture", "We design reporting systems, dashboards, and performance signals around the numbers leaders actually need."],
  ["Process Optimisation and Automation", "We map, simplify, and automate repeated workflows so teams spend less time on friction and more time on value."],
  ["Customer Retention Systems", "We improve follow-up, communication, customer experience, and feedback loops so customers stay longer."],
  ["Profitability Improvement", "We identify operational gaps, revenue leakage, cost waste, and margin pressure across the business."],
  ["Company Customised AI Agents", "We build AI agents tailored to your business that automate tasks, handle enquiries, and improve decision-making across your operations."],
  ["Workflow Automations (Operation Acceleration)", "We design and implement automation systems that remove manual work, speed up processes, and improve overall business efficiency."],
  ["Training (Staff, Personal & Career Development)", "We provide training programs to improve staff performance, develop individual skills, and support long-term career growth."],
  ["Software Development / Apps", "We create custom software and mobile/web applications designed to solve specific business problems and improve productivity."],
  ["Startup Mentorship", "We guide startups with strategy, product development, and business growth support to help them launch and scale successfully."],
  ["Career Development and Job Success", "We help you go from CV to job offer with a complete career system. We improve your CV, write strong personal statements, and create tailored cover letters to get more interviews. We build a focused job search strategy, provide interview coaching to improve your performance, and support you in negotiating better job offers."]
];

const pricingOffers = [
  ["Starter Plan", "19", "GBP", "For small businesses starting out"],
  ["Pro Plan", "49", "GBP", "For growing service businesses"],
  ["Business Plan", "99", "GBP", "For agencies & high-volume businesses"],
  ["Agency / White Label", "199", "GBP", "For agencies reselling FekiTech"],
  ["Starter Package", "500", "GBP", "Business audit + structure review"],
  ["Growth Package", "2000", "GBP", "Systems + digital transformation setup"],
  ["FOS Implementation (Main Offer)", "5000", "GBP", "Full business operating system build"],
  ["Enterprise (Custom)", undefined, "GBP", "Full transformation + ongoing support"]
];

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function escapeScript(value) {
  return JSON.stringify(value).replaceAll("</", "<\\/");
}

function upsertMeta(selector, create) {
  let element = document.head.querySelector(selector);
  if (!element) {
    element = create();
    document.head.appendChild(element);
  }
  return element;
}

function setMetaContent(selector, attributes) {
  const element = upsertMeta(selector, () => document.createElement("meta"));
  Object.entries(attributes).forEach(([key, value]) => element.setAttribute(key, value));
}

function setLink(selector, attributes) {
  const element = upsertMeta(selector, () => document.createElement("link"));
  Object.entries(attributes).forEach(([key, value]) => element.setAttribute(key, value));
}

export function getStructuredData(pathname = "/") {
  const canonical = getCanonicalUrl(pathname);
  const organizationId = `${siteConfig.siteUrl}/#organization`;
  const websiteId = `${siteConfig.siteUrl}/#website`;
  const graph = [
    {
      "@type": "Organization",
      "@id": organizationId,
      name: siteConfig.siteName,
      url: siteConfig.siteUrl,
      logo: absoluteUrl(siteConfig.logo),
      email: siteConfig.email,
      telephone: siteConfig.phone,
      address: {
        "@type": "PostalAddress",
        streetAddress: "71-75, Shelton Street, Covent Garden",
        addressLocality: "London",
        postalCode: "WC2H 9JQ",
        addressCountry: "GB"
      },
      sameAs: siteConfig.sameAs
    },
    {
      "@type": "WebSite",
      "@id": websiteId,
      name: siteConfig.siteName,
      url: siteConfig.siteUrl,
      publisher: { "@id": organizationId }
    }
  ];

  if (pathname === "/services") {
    graph.push(
      ...serviceItems.map(([name, description]) => ({
        "@type": "Service",
        name,
        description,
        provider: { "@id": organizationId },
        url: canonical
      }))
    );
  }

  if (pathname === "/pricing") {
    graph.push({
      "@type": "OfferCatalog",
      name: "Fekitech pricing",
      url: canonical,
      itemListElement: pricingOffers.map(([name, price, priceCurrency, description]) => ({
        "@type": "Offer",
        name,
        description,
        url: canonical,
        ...(price ? { price, priceCurrency } : {}),
        seller: { "@id": organizationId }
      }))
    });
  }

  if (pathname === "/blog/why-most-businesses-are-not-profitable") {
    const seo = getSeo(pathname);
    graph.push({
      "@type": "BlogPosting",
      headline: seo.title,
      description: seo.description,
      url: canonical,
      mainEntityOfPage: canonical,
      inLanguage: "en-GB",
      publisher: { "@id": organizationId }
    });
  }

  return {
    "@context": "https://schema.org",
    "@graph": graph
  };
}

export function getHeadTags(pathname = "/") {
  const seo = getSeo(pathname);
  const canonical = getCanonicalUrl(pathname);
  const image = absoluteUrl(siteConfig.ogImage);
  const structuredData = getStructuredData(pathname);

  return [
    `<title>${escapeHtml(seo.title)}</title>`,
    `<meta name="description" content="${escapeHtml(seo.description)}" />`,
    `<link rel="canonical" href="${escapeHtml(canonical)}" />`,
    `<meta property="og:type" content="${pathname.startsWith("/blog/why-") ? "article" : "website"}" />`,
    `<meta property="og:site_name" content="${escapeHtml(siteConfig.siteName)}" />`,
    `<meta property="og:title" content="${escapeHtml(seo.title)}" />`,
    `<meta property="og:description" content="${escapeHtml(seo.description)}" />`,
    `<meta property="og:url" content="${escapeHtml(canonical)}" />`,
    `<meta property="og:image" content="${escapeHtml(image)}" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${escapeHtml(seo.title)}" />`,
    `<meta name="twitter:description" content="${escapeHtml(seo.description)}" />`,
    `<meta name="twitter:image" content="${escapeHtml(image)}" />`,
    `<script type="application/ld+json" data-seo-jsonld>${escapeScript(structuredData)}</script>`
  ].join("\n    ");
}

export function applySeo(pathname = "/") {
  const seo = getSeo(pathname);
  const canonical = getCanonicalUrl(pathname);
  const image = absoluteUrl(siteConfig.ogImage);
  const robots = pathname === "/admin" ? "noindex, nofollow" : "index, follow";

  document.title = seo.title;
  setMetaContent('meta[name="robots"]', { name: "robots", content: robots });
  setMetaContent('meta[name="description"]', { name: "description", content: seo.description });
  setLink('link[rel="canonical"]', { rel: "canonical", href: canonical });
  setMetaContent('meta[property="og:type"]', { property: "og:type", content: pathname.startsWith("/blog/why-") ? "article" : "website" });
  setMetaContent('meta[property="og:site_name"]', { property: "og:site_name", content: siteConfig.siteName });
  setMetaContent('meta[property="og:title"]', { property: "og:title", content: seo.title });
  setMetaContent('meta[property="og:description"]', { property: "og:description", content: seo.description });
  setMetaContent('meta[property="og:url"]', { property: "og:url", content: canonical });
  setMetaContent('meta[property="og:image"]', { property: "og:image", content: image });
  setMetaContent('meta[property="og:image:width"]', { property: "og:image:width", content: "1200" });
  setMetaContent('meta[property="og:image:height"]', { property: "og:image:height", content: "630" });
  setMetaContent('meta[name="twitter:card"]', { name: "twitter:card", content: "summary_large_image" });
  setMetaContent('meta[name="twitter:title"]', { name: "twitter:title", content: seo.title });
  setMetaContent('meta[name="twitter:description"]', { name: "twitter:description", content: seo.description });
  setMetaContent('meta[name="twitter:image"]', { name: "twitter:image", content: image });

  let jsonLd = document.head.querySelector('script[type="application/ld+json"][data-seo-jsonld]');
  if (!jsonLd) {
    jsonLd = document.createElement("script");
    jsonLd.type = "application/ld+json";
    jsonLd.dataset.seoJsonld = "true";
    document.head.appendChild(jsonLd);
  }
  jsonLd.textContent = JSON.stringify(getStructuredData(pathname));
}

export function getSitemapXml(lastmod = new Date().toISOString()) {
  const entries = sitemapRoutes
    .map((route) => {
      const seo = pageSeo[route];
      return `  <url>
    <loc>${escapeHtml(absoluteUrl(route))}</loc>
    <lastmod>${lastmod}</lastmod>
    <priority>${seo?.priority ?? 0.7}</priority>
  </url>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries}
</urlset>
`;
}

export function getRobotsTxt() {
  return `User-agent: *
Allow: /
Disallow: /admin
Disallow: /api/

Sitemap: ${absoluteUrl("/sitemap.xml")}
`;
}
