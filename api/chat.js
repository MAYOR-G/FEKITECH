import { buildChatSystemPrompt } from "../lib/chatbot/system-prompt.js";
import { retrieveContext } from "../lib/chatbot/retrieval.js";
import { cleanString, getClientIp, methodNotAllowed, readJson } from "./_lib/http.js";

const requestBuckets = new Map();
const maxRequests = 10;
const windowMs = 10 * 60 * 1000;

function checkRateLimit(ip) {
  const now = Date.now();
  const bucket = requestBuckets.get(ip) || [];
  const recent = bucket.filter((timestamp) => now - timestamp < windowMs);
  if (recent.length >= maxRequests) return false;
  recent.push(now);
  requestBuckets.set(ip, recent);
  return true;
}
// This in-memory limiter is lightweight for Vercel functions. For production
// abuse protection across warm/cold instances, use a persistent limiter such as
// Upstash Redis or another shared store.

function normaliseMessages(messages = []) {
  return messages
    .filter((message) => ["user", "assistant"].includes(message.role))
    .slice(-6)
    .map((message) => ({
      role: message.role,
      content: cleanString(message.content, 900)
    }))
    .filter((message) => message.content);
}

function writeText(res, text) {
  res.write(text);
}

function getInstantAnswer(query = "") {
  const lower = query.toLowerCase();

  if (/\b(contact|email|phone|address|book|consultation|free call|audit request|hire|quote)\b/.test(lower)) {
    return `**You can contact Fekitech directly here:**

- **Phone:** +447352364942
- **Email:** [info@contact.fekitech.co.uk](mailto:info@contact.fekitech.co.uk)
- **Address:** 71-75, Shelton Street, Covent Garden, London, United Kingdom, WC2H 9JQ

You can also use the contact page to submit an audit request or book a free call.`;
  }

  if (/\b(what does fekitech do|what do you do|about fekitech)\b/.test(lower)) {
    return `**Fekitech helps businesses become easier to run, improve, and scale.**

- **Business transformation:** improves operations, structure, systems, and performance.
- **Automation:** reduces manual work, paperwork, repeated admin, and workflow delays.
- **Digital systems:** builds practical tools such as websites, web apps, dashboards, and software.
- **AI solutions:** creates customised AI agents and chatbot-style tools for business needs.
- **Business visibility:** helps owners track performance, profitability, customers, and operations.

The best next step is to contact Fekitech or book a free call so the team can understand your business.`;
  }

  if (/\b(list|services|offer|service list)\b/.test(lower)) {
    return `**Fekitech services include:**

- **Business structure design:** roles, workflows, ownership, and operating structure.
- **Digital transformation:** practical systems that reduce manual work and improve execution.
- **Business intelligence:** dashboards, reporting, and performance visibility.
- **Process optimisation:** better workflows, fewer bottlenecks, and clearer handoffs.
- **Workflow automation:** systems that reduce repetitive admin and paperwork.
- **AI agents and chatbots:** customised AI tools for enquiries, tasks, and support.
- **Software and web apps:** custom tools, websites, mobile apps, and business applications.
- **Profitability improvement:** identifying waste, revenue leakage, and operational gaps.

You can contact Fekitech to discuss which service fits your business.`;
  }

  if (/\b(website|web app|web application|site)\b/.test(lower)) {
    return `**Yes, Fekitech can support website and web app projects.**

- **Website development:** building business websites that support trust, enquiries, and growth.
- **Website automation:** adding forms, booking flows, analytics, and lead capture.
- **Business systems:** connecting the website to better follow-up, operations, and visibility.

The best next step is to contact Fekitech so the team can understand what your website needs to do.`;
  }

  if (/\b(automate|automation|manual|paperwork|admin|workflow)\b/.test(lower)) {
    return `**Yes, Fekitech helps businesses reduce manual work through automation.**

- **Workflow automation:** removes repeated admin tasks and slow handoffs.
- **Process improvement:** maps how work happens and fixes bottlenecks.
- **Website automation:** captures enquiries, routes information, and supports follow-up.
- **AI support:** uses customised AI agents where they fit the business need.

You can submit an audit request so Fekitech can review what is slowing your business down.`;
  }

  if (/\b(ai chatbot|chatbot|ai agent|ai agents)\b/.test(lower)) {
    return `**Yes, Fekitech builds customised AI agents and chatbot-style solutions.**

- **Customer enquiries:** help answer common questions and capture useful details.
- **Internal tasks:** reduce repeated admin and support day-to-day workflows.
- **Decision support:** improve access to business information where the right data exists.

Contact Fekitech to discuss the type of AI assistant your business needs.`;
  }

  if (/\b(seo|geo|aeo|ai search|google|rank|leads)\b/.test(lower)) {
    return `**Yes, Fekitech can support SEO-related website improvements when they fit the project.**

- **SEO structure:** clearer pages, headings, metadata, and internal links.
- **Content support:** blog and service-page structure around real customer questions.
- **AI-search readiness:** clearer answers, FAQs, and structured business information.
- **Lead generation:** better website flow, forms, and conversion paths.

For exact SEO scope, contact Fekitech so the team can review your website and goals.`;
  }

  return "";
}

function getResponseStyleInstruction(query = "") {
  const asksForList = /\b(list|services|steps|options|examples|what do you offer|what does fekitech do|breakdown)\b/i.test(query);
  if (!asksForList) {
    return "Answer with 2 to 5 concise sentences. Use short paragraphs. Use bold text only for the main point.";
  }

  return `Use this exact response style for the answer:

**Short answer first.**

- Use one item per line.
- Use clean Markdown bullets or numbering.
- Use this format: "- **Item name:** short explanation".
- Keep the list to the most relevant 5 to 8 items unless the user asks for every detail.
- Do not place list items in one paragraph.
- Do not use slashes to separate items.
- End with one short CTA when relevant.`;
}

async function streamOpenRouter({ res, messages, contextChunks }) {
  const apiKey = process.env.OPENROUTER_API_KEY;
  const model = process.env.OPENROUTER_MODEL || "openrouter/free";
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://fekitech.co.uk";

  if (!apiKey) {
    writeText(res, "I can help with Fekitech services, business systems, automation, and contact details, but the AI service is not configured yet. Please add OPENROUTER_API_KEY on the server to enable live chat responses.");
    return;
  }

  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "HTTP-Referer": siteUrl,
      "X-Title": "Fekitech Assistant"
    },
    body: JSON.stringify({
      model,
      // Try other free OpenRouter models later by changing OPENROUTER_MODEL,
      // for example: nvidia/nemotron-3-super-120b-a12b:free
      temperature: 0.25,
      max_tokens: 680,
      top_p: 0.85,
      stream: true,
      messages: [
        { role: "system", content: buildChatSystemPrompt(contextChunks) },
        { role: "system", content: getResponseStyleInstruction(messages[messages.length - 1]?.content || "") },
        ...messages
      ]
    })
  });

  if (!response.ok || !response.body) {
    throw new Error("OpenRouter request failed.");
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split("\n");
    buffer = lines.pop() || "";

    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed.startsWith("data:")) continue;
      const data = trimmed.slice(5).trim();
      if (data === "[DONE]") return;
      try {
        const parsed = JSON.parse(data);
        const token = parsed.choices?.[0]?.delta?.content || "";
        if (token) writeText(res, token);
      } catch {
        // Ignore malformed stream frames.
      }
    }
  }
}

export default async function handler(req, res) {
  if (req.method === "GET") {
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.setHeader("Cache-Control", "no-store");
    return res.end(JSON.stringify({
      status: "ok",
      service: "Fekitech chat API",
      message: "Use POST /api/chat with a messages array to chat with the Fekitech Assistant.",
      aiConfigured: Boolean(process.env.OPENROUTER_API_KEY)
    }));
  }

  if (req.method === "OPTIONS") {
    res.setHeader("Allow", "GET, POST, OPTIONS");
    res.statusCode = 204;
    return res.end();
  }

  if (req.method !== "POST") {
    return methodNotAllowed(res, ["GET", "POST", "OPTIONS"]);
  }

  res.setHeader("Content-Type", "text/plain; charset=utf-8");
  res.setHeader("Cache-Control", "no-store");
  res.setHeader("X-Accel-Buffering", "no");

  try {
    const ip = getClientIp(req);
    if (!checkRateLimit(ip)) {
      res.statusCode = 429;
      return res.end("You’ve reached the chat limit for now. Please try again shortly or contact Fekitech directly.");
    }

    const body = await readJson(req);
    const messages = normaliseMessages(body.messages);
    const latestUserMessage = [...messages].reverse().find((message) => message.role === "user");

    if (!latestUserMessage) {
      res.statusCode = 400;
      return res.end("Please send a message to start the conversation.");
    }

    const instantAnswer = getInstantAnswer(latestUserMessage.content);
    if (instantAnswer) {
      return res.end(instantAnswer);
    }

    const contextChunks = await retrieveContext(latestUserMessage.content, { limit: 5, topK: 10 });
    await streamOpenRouter({ res, messages, contextChunks });
    return res.end();
  } catch {
    res.statusCode = 200;
    res.end("I’m having trouble connecting to the assistant right now. You can still contact Fekitech directly at info@contact.fekitech.co.uk or call +447352364942.");
  }
}
