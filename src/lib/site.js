const fallbackSiteUrl = "https://fekitech.co.uk";

function getEnvValue(name) {
  const viteEnv = typeof import.meta !== "undefined" ? import.meta.env : undefined;
  return viteEnv?.[name] || globalThis.process?.env?.[name] || "";
}

export function trimTrailingSlash(value) {
  return value.replace(/\/+$/, "");
}

export function normaliseSiteUrl(value) {
  const url = trimTrailingSlash(String(value || fallbackSiteUrl).trim());
  return url || fallbackSiteUrl;
}

export function absoluteUrl(path = "/") {
  const normalisedPath = path.startsWith("/") ? path : `/${path}`;
  return `${siteConfig.siteUrl}${normalisedPath}`;
}

export const siteConfig = {
  siteName: "FekiTech",
  siteUrl: normaliseSiteUrl(getEnvValue("NEXT_PUBLIC_SITE_URL") || getEnvValue("VITE_SITE_URL")),
  alternateDomains: (getEnvValue("NEXT_PUBLIC_ALTERNATE_DOMAINS") || "")
    .split(",")
    .map((domain) => domain.trim())
    .filter(Boolean)
    .map((domain) => normaliseSiteUrl(domain)),
  defaultTitle: "FekiTech | Business Transformation and Operating Systems for Scalable Growth",
  defaultDescription:
    "Fekitech transforms organisations by improving performance across operations, people, systems, and profitability.",
  ogImage: "/og-image.svg",
  logo: "/fekitech-logo.png",
  email: "info@contact.fekitech.co.uk",
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
    title: "FekiTech | Business Operations & Performance Systems for Local Businesses",
    description:
      "FekiTech transforms local businesses by improving performance across operations, people, systems, and profitability.",
    canonicalPath: "/",
    priority: 1
  },
  "/about": {
    title: "About FekiTech | Business Operations & Performance Systems",
    description:
      "Learn how FekiTech helps local businesses improve operations, people, systems, performance visibility, and profitability.",
    canonicalPath: "/about",
    priority: 0.8
  },
  "/services": {
    title: "FekiTech Services | Business Operations, Systems & Performance Improvement",
    description:
      "Explore FekiTech services for improving business structure, operations, automation, performance visibility, and profitability.",
    canonicalPath: "/services",
    priority: 0.9
  },
  "/pricing": {
    title: "FekiTech Pricing | Business Transformation Package",
    description:
      "View FekiTech’s business transformation package for local businesses that want stronger operations, better systems, and improved profitability.",
    canonicalPath: "/pricing",
    priority: 0.8
  },
  "/blog": {
    title: "FekiTech Blog | Business Growth, Operations & Profitability Insights",
    description:
      "Read practical insights from FekiTech on business operations, profitability, performance systems, and scalable growth for local businesses.",
    canonicalPath: "/blog",
    priority: 0.7
  },
  "/blog/why-most-businesses-are-not-profitable": {
    title: "Why Most Businesses Are Not Profitable | FekiTech",
    description:
      "Learn why businesses struggle with profitability and how structured operations, systems, visibility, and retention improve performance.",
    canonicalPath: "/blog/why-most-businesses-are-not-profitable",
    priority: 0.7
  },
  "/contact": {
    title: "Contact FekiTech | Book a Business Strategy Call",
    description:
      "Contact FekiTech to book a strategy call and improve your business operations, systems, performance, and profitability.",
    canonicalPath: "/contact",
    priority: 0.8
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
