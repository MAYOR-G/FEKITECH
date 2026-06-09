const fallbackSiteUrl = "https://fekitech.vercel.app";

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
  siteName: "Fekitech",
  siteUrl: normaliseSiteUrl(getEnvValue("NEXT_PUBLIC_SITE_URL") || getEnvValue("VITE_SITE_URL")),
  alternateDomains: (getEnvValue("NEXT_PUBLIC_ALTERNATE_DOMAINS") || "")
    .split(",")
    .map((domain) => domain.trim())
    .filter(Boolean)
    .map((domain) => normaliseSiteUrl(domain)),
  defaultTitle: "Fekitech | Business Transformation and Operating Systems for Scalable Growth",
  defaultDescription:
    "Fekitech helps businesses build structure, improve profitability, implement digital transformation, and scale with the Fekitech Operating System.",
  ogImage: "/og-image.svg",
  logo: "/fekitech-logo.png",
  email: "info@fekitech.com",
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
    title: siteConfig.defaultTitle,
    description: siteConfig.defaultDescription,
    canonicalPath: "/",
    priority: 1
  },
  "/about": {
    title: "About Fekitech | Business Transformation and Operating Systems",
    description:
      "Learn how Fekitech helps organisations become structured, data-driven, profitable, and scalable through business operating systems.",
    canonicalPath: "/about",
    priority: 0.8
  },
  "/services": {
    title: "Business Transformation Services | Fekitech",
    description:
      "Explore Fekitech services for business structure, digital transformation, business intelligence, automation, retention, profitability, AI agents, software, training, mentorship, and career support.",
    canonicalPath: "/services",
    priority: 0.9
  },
  "/pricing": {
    title: "Fekitech Pricing | Business Operating System and Transformation Packages",
    description:
      "View Fekitech pricing for small business operating system plans and business transformation packages.",
    canonicalPath: "/pricing",
    priority: 0.8
  },
  "/blog": {
    title: "Fekitech Blog | Business Systems, Profitability and Automation",
    description:
      "Read Fekitech insights on business structure, profitability, systems, automation, and digital transformation.",
    canonicalPath: "/blog",
    priority: 0.7
  },
  "/blog/why-most-businesses-are-not-profitable": {
    title: "Why Most Businesses Are Not Profitable And How to Fix It with Structured Systems",
    description:
      "Most businesses struggle with low profitability and poor customer retention due to weak systems and structure. Learn how to fix it using digital transformation and business operating systems.",
    canonicalPath: "/blog/why-most-businesses-are-not-profitable",
    priority: 0.7
  },
  "/contact": {
    title: "Contact Fekitech | Book a Free Business Audit",
    description:
      "Contact Fekitech to book a free business audit and discover how to improve profitability, structure, and business performance.",
    canonicalPath: "/contact",
    priority: 0.8
  },
  "/audit": {
    title: "Contact Fekitech | Book a Free Business Audit",
    description:
      "Contact Fekitech to book a free business audit and discover how to improve profitability, structure, and business performance.",
    canonicalPath: "/contact",
    priority: 0
  }
};

export const sitemapRoutes = ["/", "/about", "/services", "/pricing", "/blog", "/contact", "/blog/why-most-businesses-are-not-profitable"];

export function getSeo(pathname = "/") {
  return pageSeo[pathname] || pageSeo["/"];
}

export function getCanonicalUrl(pathname = "/") {
  return absoluteUrl(getSeo(pathname).canonicalPath);
}
