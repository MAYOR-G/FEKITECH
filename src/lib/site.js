const fallbackSiteUrl = "https://fekitech.co.uk";

export function absoluteUrl(path = "/") {
  const normalisedPath = path.startsWith("/") ? path : `/${path}`;
  return `${siteConfig.siteUrl}${normalisedPath}`;
}

export const siteConfig = {
  siteName: "FekiTech",
  siteUrl: fallbackSiteUrl,
  defaultTitle: "FekiTech | Business Operations Systems for Local Businesses",
  defaultDescription:
    "FekiTech transforms organisations by improving performance across operations, people, systems, and profitability.",
  ogImage: "/og-image.png",
  ogImageAlt: "FekiTech business operations and performance systems",
  logo: "/fekitech-logo.png",
  email: "info@fekitech.co.uk",
  phone: "+447352364942",
  address: "71-75, Shelton Street, Covent Garden, London, United Kingdom, WC2H 9JQ",
  sameAs: [
    "https://www.facebook.com/profile.php?id=61590753470491",
    "https://www.instagram.com/fekitech/",
    "https://www.tiktok.com/@fekitech"
  ]
};

export const pageSeo = {
  "/": {
    title: "FekiTech | Business Operations Systems for Local Businesses",
    description:
      "FekiTech transforms organisations by improving performance across operations, people, systems, and profitability.",
    canonicalPath: "/",
    priority: 1,
    lastModified: "2026-06-18"
  },
  "/about": {
    title: "About FekiTech | Better Operations, Systems & Profitability",
    description:
      "Learn how FekiTech transforms organisations through stronger operations, people, systems, performance visibility, and profitability.",
    canonicalPath: "/about",
    priority: 0.8,
    lastModified: "2026-06-18"
  },
  "/services": {
    title: "Business Operations & Performance Services | FekiTech",
    description:
      "Explore FekiTech services for business structure, operations, automation, performance visibility, and profitability improvement.",
    canonicalPath: "/services",
    priority: 0.9,
    lastModified: "2026-06-18"
  },
  "/pricing": {
    title: "FekiTech Pricing | Business Transformation Package",
    description:
      "View FekiTech’s business transformation package for local businesses that want better systems, stronger operations, and improved profitability.",
    canonicalPath: "/pricing",
    priority: 0.8,
    lastModified: "2026-06-18"
  },
  "/blog": {
    title: "FekiTech Blog | Operations, Growth & Profitability Insights",
    description:
      "Read practical insights on business operations, profitability, performance systems, and scalable growth for local businesses.",
    canonicalPath: "/blog",
    priority: 0.7,
    lastModified: "2026-06-18"
  },
  "/blog/why-most-businesses-are-not-profitable": {
    title: "Why Most Businesses Are Not Profitable | FekiTech",
    description:
      "Learn why businesses struggle with profitability and how structured operations, systems, visibility, and retention improve performance.",
    canonicalPath: "/blog/why-most-businesses-are-not-profitable",
    priority: 0.7,
    lastModified: "2026-06-18"
  },
  "/contact": {
    title: "Contact FekiTech | Book a Business Strategy Call",
    description:
      "Book a strategy call with FekiTech to improve your business operations, systems, performance, and profitability.",
    canonicalPath: "/contact",
    priority: 0.8,
    lastModified: "2026-06-18"
  },
  "/audit": {
    title: "Contact FekiTech | Book a Business Strategy Call",
    description:
      "Contact FekiTech to book a strategy call and improve your business operations, systems, performance, and profitability.",
    canonicalPath: "/contact",
    priority: 0
  },
  "/admin": {
    title: "FekiTech Admin",
    description: "Secure FekiTech admin dashboard.",
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
