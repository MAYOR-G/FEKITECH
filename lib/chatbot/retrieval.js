import { queryVectorStore } from "./vector-store.js";

const INTENT_TERMS = {
  contact: ["contact", "email", "phone", "location", "address", "call"],
  booking: ["book", "booking", "consultation", "strategy call", "audit", "quote", "hire", "work with"],
  services: ["service", "services", "offer", "help", "do"],
  pricing: ["price", "pricing", "cost", "package", "plan", "subscription"],
  fos: ["fos", "operating system", "fekitech operating system", "business operating system"],
  websites: ["website", "websites", "web app", "apps", "software"],
  automation: ["automation", "automate", "workflow", "manual", "paperwork", "admin"],
  ai: ["ai", "chatbot", "agent", "agents", "enquiries"],
  seo: ["seo", "geo", "aeo", "ai search", "search optimization", "search optimisation", "leads", "rank", "google"],
  transformation: ["business transformation", "systems", "operations", "scale", "growth", "profitability"],
  blog: ["why", "how", "learn", "article", "blog", "explain"]
};

const PRIORITY_BY_SOURCE = {
  contact: 1,
  company_knowledge: 0.92,
  service: 0.82,
  page: 0.72,
  faq: 0.66,
  blog: 0.56
};

export function detectIntent(query = "") {
  const lower = query.toLowerCase();
  return Object.entries(INTENT_TERMS)
    .filter(([, terms]) => terms.some((term) => lower.includes(term)))
    .map(([intent]) => intent);
}

function sourceBoost(chunk, intents) {
  const sourceType = chunk.metadata?.sourceType;
  let boost = PRIORITY_BY_SOURCE[sourceType] ?? 0.45;

  if ((intents.includes("contact") || intents.includes("booking")) && sourceType === "contact") boost += 1.2;
  if ((intents.includes("pricing")) && /pricing|package|plan/i.test(`${chunk.metadata?.title} ${chunk.content}`)) boost += 0.8;
  if ((intents.includes("fos")) && /fos|operating system/i.test(`${chunk.metadata?.title} ${chunk.content}`)) boost += 0.85;
  if ((intents.includes("websites")) && /website|web application|software|apps/i.test(`${chunk.metadata?.title} ${chunk.content}`)) boost += 0.7;
  if ((intents.includes("automation")) && /automation|workflow|manual|paperwork/i.test(`${chunk.metadata?.title} ${chunk.content}`)) boost += 0.7;
  if ((intents.includes("ai")) && /AI|agent|chatbot|enquiries/i.test(`${chunk.metadata?.title} ${chunk.content}`)) boost += 0.7;
  if ((intents.includes("seo")) && /SEO|GEO|AEO|AI-search|metadata|internal linking|leads|website/i.test(`${chunk.metadata?.title} ${chunk.content}`)) boost += 0.7;
  if (intents.includes("blog") && sourceType === "blog") boost += 0.45;

  return boost;
}

function keywordBoost(query, chunk) {
  const lower = query.toLowerCase();
  const haystack = `${chunk.content || ""} ${chunk.metadata?.title || ""} ${chunk.metadata?.sectionHeading || ""}`.toLowerCase();
  const exactTerms = [
    "contact",
    "email",
    "phone",
    "book",
    "consultation",
    "strategy call",
    "website",
    "automation",
    "chatbot",
    "ai",
    "business systems",
    "operations",
    "fos",
    "pricing",
    "seo",
    "geo",
    "aeo",
    "leads"
  ];

  return exactTerms.reduce((boost, term) => {
    return lower.includes(term) && haystack.includes(term) ? boost + 0.25 : boost;
  }, 0);
}

export async function retrieveContext(query, options = {}) {
  const intents = detectIntent(query);
  const semanticMatches = await queryVectorStore(query, options.topK || 14);
  const extraMatches =
    intents.includes("contact") || intents.includes("booking")
      ? await queryVectorStore(`${query} contact email phone book consultation audit`, options.topK || 14)
      : [];
  const byId = new Map();
  [...semanticMatches, ...extraMatches].forEach((chunk) => {
    if (!byId.has(chunk.id) || Number(chunk.score || 0) > Number(byId.get(chunk.id).score || 0)) {
      byId.set(chunk.id, chunk);
    }
  });
  const scored = [...byId.values()].map((chunk) => ({
    ...chunk,
    finalScore: Number(chunk.score || 0) + sourceBoost(chunk, intents) + keywordBoost(query, chunk)
  }));

  return scored
    .sort((a, b) => b.finalScore - a.finalScore)
    .slice(0, options.limit || 8);
}
