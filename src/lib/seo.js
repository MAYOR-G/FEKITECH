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
  { name: "Starter Plan", description: "For small businesses starting out", price: "19", unitText: "MONTH" },
  { name: "Pro Plan", description: "For growing service businesses", price: "49", unitText: "MONTH" },
  { name: "Business Plan", description: "For agencies & high-volume businesses", price: "99", unitText: "MONTH" },
  { name: "Agency / White Label", description: "For agencies reselling FekiTech", price: "199", unitText: "MONTH" },
  { name: "Starter Package", description: "Business audit + structure review", minPrice: "500", maxPrice: "1500" },
  { name: "Growth Package", description: "Systems + digital transformation setup", minPrice: "2000", maxPrice: "5000" },
  { name: "FOS Implementation (Main Offer)", description: "Full business operating system build", minPrice: "5000" },
  { name: "Enterprise (Custom)", description: "Full transformation + ongoing support" }
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

function compact(values) {
  return [...new Set(values.filter(Boolean))];
}

function getBreadcrumbItems(pathname) {
  if (pathname === "/") {
    return [];
  }

  const labels = {
    "/about": "About",
    "/services": "Services",
    "/pricing": "Pricing",
    "/blog": "Blog",
    "/contact": "Contact",
    "/blog/why-most-businesses-are-not-profitable": "Why Most Businesses Are Not Profitable"
  };

  if (!labels[pathname]) {
    return [];
  }

  const parentPath = pathname.startsWith("/blog/") ? "/blog" : null;
  return [
    { name: "Home", item: absoluteUrl("/") },
    ...(parentPath ? [{ name: labels[parentPath], item: absoluteUrl(parentPath) }] : []),
    { name: labels[pathname], item: getCanonicalUrl(pathname) }
  ];
}

export function getStructuredData(pathname = "/") {
  const canonical = getCanonicalUrl(pathname);
  const organizationId = `${siteConfig.siteUrl}/#organization`;
  const professionalServiceId = `${siteConfig.siteUrl}/#professional-service`;
  const contactPointId = `${siteConfig.siteUrl}/#contact-point`;
  const websiteId = `${siteConfig.siteUrl}/#website`;
  const seo = getSeo(pathname);
  const realSocialProfiles = siteConfig.sameAs.filter(Boolean);
  const graph = [
    {
      "@type": "Organization",
      "@id": organizationId,
      name: siteConfig.siteName,
      url: siteConfig.siteUrl,
      logo: absoluteUrl(siteConfig.logo),
      image: absoluteUrl(siteConfig.ogImage),
      description: siteConfig.defaultDescription,
      email: siteConfig.contactEmail,
      contactPoint: { "@id": contactPointId },
      sameAs: realSocialProfiles
    },
    {
      "@type": ["ProfessionalService", "LocalBusiness"],
      "@id": professionalServiceId,
      name: siteConfig.siteName,
      url: siteConfig.siteUrl,
      description: siteConfig.defaultDescription,
      image: absoluteUrl(siteConfig.ogImage),
      logo: absoluteUrl(siteConfig.logo),
      email: siteConfig.contactEmail,
      telephone: siteConfig.phone,
      priceRange: "Custom",
      address: {
        "@type": "PostalAddress",
        streetAddress: "71-75, Shelton Street, Covent Garden",
        addressLocality: "London",
        postalCode: "WC2H 9JQ",
        addressCountry: "GB"
      },
      areaServed: [
        { "@type": "Country", name: "United Kingdom" },
        { "@type": "Place", name: "Local businesses" }
      ],
      serviceType: [
        "Business transformation",
        "Business consulting",
        "Operational improvement",
        "Business systems advisory",
        "Profitability improvement",
        "Process improvement"
      ],
      parentOrganization: { "@id": organizationId },
      contactPoint: { "@id": contactPointId },
      sameAs: realSocialProfiles
    },
    {
      "@type": "ContactPoint",
      "@id": contactPointId,
      contactType: "business transformation support",
      email: siteConfig.contactEmail,
      telephone: siteConfig.phone,
      availableLanguage: ["English"],
      areaServed: "GB"
    },
    {
      "@type": "WebSite",
      "@id": websiteId,
      name: siteConfig.siteName,
      url: siteConfig.siteUrl,
      description: siteConfig.defaultDescription,
      inLanguage: "en-GB",
      publisher: { "@id": organizationId }
    },
    {
      "@type": "WebPage",
      "@id": `${canonical}#webpage`,
      url: canonical,
      name: seo.title,
      description: seo.description,
      isPartOf: { "@id": websiteId },
      inLanguage: "en-GB",
      about: { "@id": professionalServiceId }
    }
  ];

  const breadcrumbs = getBreadcrumbItems(pathname);
  if (breadcrumbs.length > 0) {
    graph.push({
      "@type": "BreadcrumbList",
      "@id": `${canonical}#breadcrumb`,
      itemListElement: breadcrumbs.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
        item: item.item
      }))
    });
  }

  if (pathname === "/services") {
    graph.push(
      ...serviceItems.map(([name, description]) => ({
        "@type": "Service",
        "@id": `${canonical}#${name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}`,
        name,
        description,
        provider: { "@id": professionalServiceId },
        serviceType: name,
        areaServed: { "@type": "Country", name: "United Kingdom" },
        url: canonical
      }))
    );
  }

  if (pathname === "/pricing") {
    graph.push({
      "@type": "OfferCatalog",
      "@id": `${canonical}#offer-catalog`,
      name: "Fekitech pricing",
      url: canonical,
      itemListElement: pricingOffers.map(({ name, description, price, unitText, minPrice, maxPrice }) => ({
        "@type": "Offer",
        name,
        description,
        url: canonical,
        ...(price || minPrice
          ? {
              priceSpecification: {
                "@type": "UnitPriceSpecification",
                priceCurrency: "GBP",
                ...(price ? { price } : {}),
                ...(unitText ? { unitText } : {}),
                ...(minPrice ? { minPrice } : {}),
                ...(maxPrice ? { maxPrice } : {})
              }
            }
          : {}),
        seller: { "@id": professionalServiceId }
      }))
    });
  }

  if (pathname === "/blog/why-most-businesses-are-not-profitable") {
    graph.push({
      "@type": "BlogPosting",
      "@id": `${canonical}#article`,
      headline: seo.title,
      description: seo.description,
      url: canonical,
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": canonical
      },
      isPartOf: { "@id": websiteId },
      inLanguage: "en-GB",
      image: absoluteUrl(siteConfig.ogImage),
      articleSection: "Business transformation",
      datePublished: seo.datePublished,
      dateModified: seo.lastModified,
      author: { "@id": organizationId },
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
  const robots = pathname === "/admin" ? "noindex, nofollow, noarchive" : "index, follow";
  const keywords = compact([...(siteConfig.keywords || []), ...(seo.keywords || [])]).join(", ");

  return [
    `<title>${escapeHtml(seo.title)}</title>`,
    `<meta name="robots" content="${robots}" />`,
    `<meta name="description" content="${escapeHtml(seo.description)}" />`,
    `<meta name="keywords" content="${escapeHtml(keywords)}" />`,
    `<link rel="canonical" href="${escapeHtml(canonical)}" />`,
    `<link rel="alternate" href="${escapeHtml(canonical)}" hreflang="en-GB" />`,
    `<link rel="alternate" href="${escapeHtml(canonical)}" hreflang="x-default" />`,
    `<meta property="og:type" content="${pathname.startsWith("/blog/why-") ? "article" : "website"}" />`,
    `<meta property="og:locale" content="en_GB" />`,
    `<meta property="og:site_name" content="${escapeHtml(siteConfig.siteName)}" />`,
    `<meta property="og:title" content="${escapeHtml(seo.title)}" />`,
    `<meta property="og:description" content="${escapeHtml(seo.description)}" />`,
    `<meta property="og:url" content="${escapeHtml(canonical)}" />`,
    `<meta property="og:image" content="${escapeHtml(image)}" />`,
    `<meta property="og:image:type" content="image/png" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta property="og:image:alt" content="${escapeHtml(siteConfig.ogImageAlt)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${escapeHtml(seo.title)}" />`,
    `<meta name="twitter:description" content="${escapeHtml(seo.description)}" />`,
    `<meta name="twitter:image" content="${escapeHtml(image)}" />`,
    `<meta name="twitter:image:alt" content="${escapeHtml(siteConfig.ogImageAlt)}" />`,
    ...(pathname === "/"
      ? [
          '<link rel="preload" as="image" href="/outcome-business-success.webp" fetchpriority="high" />',
          '<link rel="preconnect" href="https://pub-9f4f9c9b1b3e477aba4991ccfd92f1ae.r2.dev" crossorigin />',
          '<link rel="preconnect" href="https://images.pexels.com" crossorigin />'
        ]
      : []),
    `<script type="application/ld+json" data-seo-jsonld>${escapeScript(structuredData)}</script>`
  ].flat().join("\n    ");
}

export function applySeo(pathname = "/") {
  const seo = getSeo(pathname);
  const canonical = getCanonicalUrl(pathname);
  const image = absoluteUrl(siteConfig.ogImage);
  const robots = pathname === "/admin" ? "noindex, nofollow, noarchive" : "index, follow";
  const keywords = compact([...(siteConfig.keywords || []), ...(seo.keywords || [])]).join(", ");

  document.title = seo.title;
  setMetaContent('meta[name="robots"]', { name: "robots", content: robots });
  setMetaContent('meta[name="description"]', { name: "description", content: seo.description });
  setMetaContent('meta[name="keywords"]', { name: "keywords", content: keywords });
  setLink('link[rel="canonical"]', { rel: "canonical", href: canonical });
  setLink('link[rel="alternate"][hreflang="en-GB"]', { rel: "alternate", href: canonical, hreflang: "en-GB" });
  setLink('link[rel="alternate"][hreflang="x-default"]', { rel: "alternate", href: canonical, hreflang: "x-default" });
  setMetaContent('meta[property="og:type"]', { property: "og:type", content: pathname.startsWith("/blog/why-") ? "article" : "website" });
  setMetaContent('meta[property="og:locale"]', { property: "og:locale", content: "en_GB" });
  setMetaContent('meta[property="og:site_name"]', { property: "og:site_name", content: siteConfig.siteName });
  setMetaContent('meta[property="og:title"]', { property: "og:title", content: seo.title });
  setMetaContent('meta[property="og:description"]', { property: "og:description", content: seo.description });
  setMetaContent('meta[property="og:url"]', { property: "og:url", content: canonical });
  setMetaContent('meta[property="og:image"]', { property: "og:image", content: image });
  setMetaContent('meta[property="og:image:type"]', { property: "og:image:type", content: "image/png" });
  setMetaContent('meta[property="og:image:width"]', { property: "og:image:width", content: "1200" });
  setMetaContent('meta[property="og:image:height"]', { property: "og:image:height", content: "630" });
  setMetaContent('meta[property="og:image:alt"]', { property: "og:image:alt", content: siteConfig.ogImageAlt });
  setMetaContent('meta[name="twitter:card"]', { name: "twitter:card", content: "summary_large_image" });
  setMetaContent('meta[name="twitter:title"]', { name: "twitter:title", content: seo.title });
  setMetaContent('meta[name="twitter:description"]', { name: "twitter:description", content: seo.description });
  setMetaContent('meta[name="twitter:image"]', { name: "twitter:image", content: image });
  setMetaContent('meta[name="twitter:image:alt"]', { name: "twitter:image:alt", content: siteConfig.ogImageAlt });

  let jsonLd = document.head.querySelector('script[type="application/ld+json"][data-seo-jsonld]');
  if (!jsonLd) {
    jsonLd = document.createElement("script");
    jsonLd.type = "application/ld+json";
    jsonLd.dataset.seoJsonld = "true";
    document.head.appendChild(jsonLd);
  }
  jsonLd.textContent = JSON.stringify(getStructuredData(pathname));
}

export function getSitemapXml() {
  const entries = sitemapRoutes
    .map((route) => {
      const seo = pageSeo[route];
      return `  <url>
    <loc>${escapeHtml(absoluteUrl(route))}</loc>
    <lastmod>${seo.lastModified}</lastmod>
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

Sitemap: ${absoluteUrl("/sitemap.xml")}
`;
}
