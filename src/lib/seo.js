import { absoluteUrl, getCanonicalUrl, getSeo, pageSeo, prerenderRoutes, siteConfig, sitemapRoutes } from "./site.js";
import { getBlogPost } from "../blogPosts.js";
import { getServicePage, servicePages } from "../serviceData.js";
import { pricingOffers } from "../pricingData.js";

export { sitemapRoutes } from "./site.js";
export { prerenderRoutes } from "./site.js";

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

function getBreadcrumbItems(pathname) {
  if (pathname === "/") {
    return [];
  }

  const labels = {
    "/about": "About",
    "/services": "Services",
    "/pricing": "Pricing",
    "/blog": "Blog",
    "/contact": "Contact"
  };

  const service = getServicePage(pathname);
  if (service) {
    return [
      { name: "Home", item: absoluteUrl("/") },
      { name: "Services", item: absoluteUrl("/services") },
      { name: service.title, item: getCanonicalUrl(pathname) }
    ];
  }

  const blogPost = getBlogPost(pathname);
  if (blogPost) {
    return [
      { name: "Home", item: absoluteUrl("/") },
      { name: "Blog", item: absoluteUrl("/blog") },
      { name: blogPost.title, item: getCanonicalUrl(pathname) }
    ];
  }

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
  const contactPointId = `${siteConfig.siteUrl}/#contact-point`;
  const websiteId = `${siteConfig.siteUrl}/#website`;
  const seo = getSeo(pathname);
  const realSocialProfiles = siteConfig.sameAs.filter(Boolean);
  const pageType = pathname === "/about"
    ? "AboutPage"
    : pathname === "/contact"
      ? "ContactPage"
      : pathname === "/blog"
        ? "CollectionPage"
        : "WebPage";
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
      telephone: siteConfig.phone,
      address: [
        {
          "@type": "PostalAddress",
          streetAddress: "71-75, Shelton Street, Covent Garden",
          addressLocality: "London",
          postalCode: "WC2H 9JQ",
          addressCountry: "GB"
        },
        {
          "@type": "PostalAddress",
          streetAddress: "10 Brindley Place",
          addressLocality: "Birmingham",
          postalCode: "B1 2JB",
          addressCountry: "GB"
        }
      ],
      areaServed: { "@type": "Country", name: "United Kingdom" },
      knowsAbout: [
        "Business transformation",
        "Business systems",
        "Workflow automation",
        "Business intelligence",
        "Process optimisation",
        "Practical software"
      ],
      contactPoint: { "@id": contactPointId },
      sameAs: realSocialProfiles
    },
    {
      "@type": "ContactPoint",
      "@id": contactPointId,
      contactType: "business enquiries",
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
      "@type": pageType,
      "@id": `${canonical}#webpage`,
      url: canonical,
      name: seo.title,
      description: seo.description,
      isPartOf: { "@id": websiteId },
      inLanguage: "en-GB",
      about: { "@id": organizationId }
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
      ...servicePages.map((serviceItem) => ({
        "@type": "Service",
        "@id": `${absoluteUrl(`/services/${serviceItem.slug}`)}#service`,
        name: serviceItem.title,
        description: serviceItem.shortDescription,
        provider: { "@id": organizationId },
        serviceType: serviceItem.title,
        areaServed: { "@type": "Country", name: "United Kingdom" },
        url: absoluteUrl(`/services/${serviceItem.slug}`)
      }))
    );
  }

  const service = getServicePage(pathname);
  if (service) {
    graph.push({
      "@type": "Service",
      "@id": `${canonical}#service`,
      name: service.title,
      description: service.heroSummary,
      serviceType: service.title,
      provider: { "@id": organizationId },
      areaServed: { "@type": "Country", name: "United Kingdom" },
      url: canonical,
      mainEntityOfPage: { "@id": `${canonical}#webpage` }
    });
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
        seller: { "@id": organizationId }
      }))
    });
  }

  const blogPost = getBlogPost(pathname);
  if (blogPost) {
    graph.push({
      "@type": "BlogPosting",
      "@id": `${canonical}#article`,
      headline: blogPost.h1 || seo.title,
      description: seo.description,
      url: canonical,
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": `${canonical}#webpage`
      },
      isPartOf: { "@id": websiteId },
      inLanguage: "en-GB",
      image: absoluteUrl(blogPost.featuredImage || siteConfig.ogImage),
      articleSection: blogPost.category || "Business transformation",
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
  const image = absoluteUrl(seo.image || siteConfig.ogImage);
  const imageAlt = seo.imageAlt || siteConfig.ogImageAlt;
  const imageType = seo.imageType || "image/png";
  const imageWidth = String(seo.imageWidth || 1200);
  const imageHeight = String(seo.imageHeight || 630);
  const structuredData = getStructuredData(pathname);
  const robots = pathname === "/admin" ? "noindex, nofollow, noarchive" : "index, follow";
  const blogPost = getBlogPost(pathname);

  return [
    `<title>${escapeHtml(seo.title)}</title>`,
    `<meta name="robots" content="${robots}" />`,
    `<meta name="description" content="${escapeHtml(seo.description)}" />`,
    `<link rel="canonical" href="${escapeHtml(canonical)}" />`,
    `<link rel="alternate" href="${escapeHtml(canonical)}" hreflang="en-GB" />`,
    `<link rel="alternate" href="${escapeHtml(canonical)}" hreflang="x-default" />`,
    `<meta property="og:type" content="${blogPost ? "article" : "website"}" />`,
    `<meta property="og:locale" content="en_GB" />`,
    `<meta property="og:site_name" content="${escapeHtml(siteConfig.siteName)}" />`,
    `<meta property="og:title" content="${escapeHtml(seo.title)}" />`,
    `<meta property="og:description" content="${escapeHtml(seo.description)}" />`,
    `<meta property="og:url" content="${escapeHtml(canonical)}" />`,
    `<meta property="og:image" content="${escapeHtml(image)}" />`,
    `<meta property="og:image:type" content="${escapeHtml(imageType)}" />`,
    `<meta property="og:image:width" content="${escapeHtml(imageWidth)}" />`,
    `<meta property="og:image:height" content="${escapeHtml(imageHeight)}" />`,
    `<meta property="og:image:alt" content="${escapeHtml(imageAlt)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${escapeHtml(seo.title)}" />`,
    `<meta name="twitter:description" content="${escapeHtml(seo.description)}" />`,
    `<meta name="twitter:image" content="${escapeHtml(image)}" />`,
    `<meta name="twitter:image:alt" content="${escapeHtml(imageAlt)}" />`,
    ...(blogPost
      ? [
          `<meta property="article:published_time" content="${escapeHtml(seo.datePublished)}" />`,
          `<meta property="article:modified_time" content="${escapeHtml(seo.lastModified)}" />`,
          `<meta property="article:section" content="${escapeHtml(blogPost.category || "Business transformation")}" />`
        ]
      : []),
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
  const image = absoluteUrl(seo.image || siteConfig.ogImage);
  const imageAlt = seo.imageAlt || siteConfig.ogImageAlt;
  const imageType = seo.imageType || "image/png";
  const imageWidth = String(seo.imageWidth || 1200);
  const imageHeight = String(seo.imageHeight || 630);
  const robots = pathname === "/admin" ? "noindex, nofollow, noarchive" : "index, follow";
  const blogPost = getBlogPost(pathname);

  document.title = seo.title;
  setMetaContent('meta[name="robots"]', { name: "robots", content: robots });
  setMetaContent('meta[name="description"]', { name: "description", content: seo.description });
  setLink('link[rel="canonical"]', { rel: "canonical", href: canonical });
  setLink('link[rel="alternate"][hreflang="en-GB"]', { rel: "alternate", href: canonical, hreflang: "en-GB" });
  setLink('link[rel="alternate"][hreflang="x-default"]', { rel: "alternate", href: canonical, hreflang: "x-default" });
  setMetaContent('meta[property="og:type"]', { property: "og:type", content: blogPost ? "article" : "website" });
  setMetaContent('meta[property="og:locale"]', { property: "og:locale", content: "en_GB" });
  setMetaContent('meta[property="og:site_name"]', { property: "og:site_name", content: siteConfig.siteName });
  setMetaContent('meta[property="og:title"]', { property: "og:title", content: seo.title });
  setMetaContent('meta[property="og:description"]', { property: "og:description", content: seo.description });
  setMetaContent('meta[property="og:url"]', { property: "og:url", content: canonical });
  setMetaContent('meta[property="og:image"]', { property: "og:image", content: image });
  setMetaContent('meta[property="og:image:type"]', { property: "og:image:type", content: imageType });
  setMetaContent('meta[property="og:image:width"]', { property: "og:image:width", content: imageWidth });
  setMetaContent('meta[property="og:image:height"]', { property: "og:image:height", content: imageHeight });
  setMetaContent('meta[property="og:image:alt"]', { property: "og:image:alt", content: imageAlt });
  setMetaContent('meta[name="twitter:card"]', { name: "twitter:card", content: "summary_large_image" });
  setMetaContent('meta[name="twitter:title"]', { name: "twitter:title", content: seo.title });
  setMetaContent('meta[name="twitter:description"]', { name: "twitter:description", content: seo.description });
  setMetaContent('meta[name="twitter:image"]', { name: "twitter:image", content: image });
  setMetaContent('meta[name="twitter:image:alt"]', { name: "twitter:image:alt", content: imageAlt });
  if (blogPost) {
    setMetaContent('meta[property="article:published_time"]', { property: "article:published_time", content: seo.datePublished });
    setMetaContent('meta[property="article:modified_time"]', { property: "article:modified_time", content: seo.lastModified });
    setMetaContent('meta[property="article:section"]', { property: "article:section", content: blogPost.category || "Business transformation" });
  }

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
      const seo = pageSeo[route] || getSeo(route);
      return `  <url>
    <loc>${escapeHtml(absoluteUrl(route))}</loc>
    <lastmod>${seo.lastModified}</lastmod>
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

# Allow AI Search Engines and Chatbots explicitly
User-agent: GPTBot
Allow: /

User-agent: OAI-SearchBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: PerplexityBot
Allow: /

# Block bulk training/dataset crawlers
User-agent: CCBot
Disallow: /

User-agent: Bytespider
Disallow: /

Sitemap: ${absoluteUrl("/sitemap.xml")}
`;
}
