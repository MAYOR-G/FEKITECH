const fallbackSiteUrl = "https://fekitech.co.uk";

export function absoluteUrl(path = "/") {
  const normalisedPath = path.startsWith("/") ? path : `/${path}`;
  return `${siteConfig.siteUrl}${normalisedPath}`;
}

export const siteConfig = {
  siteName: "Fekitech",
  siteUrl: fallbackSiteUrl,
  defaultTitle: "Fekitech | Business Transformation Company",
  defaultDescription:
    "Fekitech helps business owners build organised, profitable businesses with better systems, clearer operations, improved performance, and ongoing expert support.",
  ogImage: "/og-image.png",
  ogImageAlt: "Fekitech business transformation company helping owners improve systems and profitability",
  logo: "/fekitech-logo-transparent-cropped.png",
  email: "info@fekitech.co.uk",
  contactEmail: "info@contact.fekitech.co.uk",
  phone: "+447352364942",
  address: "71-75, Shelton Street, Covent Garden, London, United Kingdom, WC2H 9JQ",
  sameAs: [
    "https://www.facebook.com/profile.php?id=61590753470491",
    "https://www.instagram.com/fekitech/",
    "https://www.tiktok.com/@fekitech"
  ],
  // Add real LinkedIn, YouTube, and X/Twitter URLs here when available.
  // They are intentionally not rendered or added to schema until real URLs exist.
  pendingSocialProfiles: {
    linkedIn: "",
    youtube: "",
    x: ""
  },
  keywords: [
    "business transformation company",
    "business transformation services",
    "business consulting",
    "business systems",
    "operational improvement",
    "profitability improvement",
    "process improvement",
    "business advisory",
    "performance improvement",
    "local business growth",
    "scalable business operations"
  ]
};

export const pageSeo = {
  "/": {
    title: "Fekitech | Business Transformation Company",
    description:
      "Fekitech helps business owners build organised, profitable businesses with better systems, clearer operations, improved performance, and ongoing expert support.",
    canonicalPath: "/",
    priority: 1,
    lastModified: "2026-06-29",
    keywords: ["business transformation company", "local business growth", "business systems", "profitability improvement"]
  },
  "/about": {
    title: "About Fekitech | Business Transformation Company",
    description:
      "Learn how Fekitech helps businesses become organised, data-driven, profitable, and scalable through clearer systems and expert advisory.",
    canonicalPath: "/about",
    priority: 0.8,
    lastModified: "2026-06-29",
    keywords: ["about Fekitech", "business transformation company", "business advisory", "organised businesses"]
  },
  "/services": {
    title: "Business Transformation Services | Fekitech",
    description:
      "Explore Fekitech’s business transformation services for improving operations, systems, profitability, performance, and long-term business growth.",
    canonicalPath: "/services",
    priority: 0.9,
    lastModified: "2026-06-29",
    keywords: ["business transformation services", "operational improvement", "process improvement", "business consulting"]
  },
  "/pricing": {
    title: "Business Transformation Packages | Fekitech Pricing",
    description:
      "View Fekitech’s business transformation packages designed to help businesses improve systems, operations, profitability, and scalable performance.",
    canonicalPath: "/pricing",
    priority: 0.8,
    lastModified: "2026-06-29",
    keywords: ["business transformation packages", "business consulting pricing", "business systems pricing", "Fekitech pricing"]
  },
  "/blog": {
    title: "Business Transformation Insights | Fekitech Blog",
    description:
      "Read practical insights on business transformation, operations, profitability, systems, customer growth, and performance improvement.",
    canonicalPath: "/blog",
    priority: 0.7,
    lastModified: "2026-06-29",
    keywords: ["business transformation blog", "business operations insights", "profitability insights", "process improvement"]
  },
  "/blog/why-most-businesses-are-not-profitable": {
    title: "Why Most Businesses Are Not Profitable | Fekitech",
    description:
      "Learn why businesses struggle with profitability and how structured systems, clearer operations, retention, and business transformation improve performance.",
    canonicalPath: "/blog/why-most-businesses-are-not-profitable",
    priority: 0.7,
    lastModified: "2026-06-29",
    datePublished: "2026-06-18",
    keywords: ["business profitability", "business systems", "customer retention", "business transformation"]
  },
  "/contact": {
    title: "Contact Fekitech | Business Transformation Support",
    description:
      "Contact Fekitech for business transformation support, operational improvement, better systems, and expert advisory for your business.",
    canonicalPath: "/contact",
    priority: 0.8,
    lastModified: "2026-06-29",
    keywords: ["contact Fekitech", "business transformation support", "business advisory", "operational improvement"]
  },
  "/audit": {
    title: "Contact Fekitech | Business Transformation Support",
    description:
      "Contact Fekitech for business transformation support, operational improvement, better systems, and expert advisory for your business.",
    canonicalPath: "/contact",
    priority: 0
  },
  "/admin": {
    title: "Fekitech Admin",
    description: "Secure Fekitech admin dashboard.",
    canonicalPath: "/admin",
    priority: 0
  }
};

export const sitemapRoutes = ["/", "/about", "/services", "/pricing", "/blog", "/contact", "/blog/why-most-businesses-are-not-profitable"];
export const prerenderRoutes = [...sitemapRoutes, "/admin"];

export function getSeo(pathname = "/") {
  return pageSeo[pathname] || pageSeo["/"];
}

export function getCanonicalUrl(pathname = "/") {
  return absoluteUrl(getSeo(pathname).canonicalPath);
}
