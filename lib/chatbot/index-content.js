import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createChunks, chunkMarkdownSections, dedupeChunks } from "./chunking.js";
import { upsertChunks } from "./vector-store.js";
import { blogPosts } from "../../src/blogPosts.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, "../..");

async function readIfExists(filePath) {
  try {
    return await fs.readFile(filePath, "utf8");
  } catch {
    return "";
  }
}

function serviceChunks() {
  const services = [
    ["Business Structure Design", "We define roles, responsibilities, workflows, ownership, and decision rhythms so the business can operate with clarity."],
    ["Digital Transformation", "We implement practical digital systems that reduce manual work, improve execution speed, and support better management."],
    ["Business Intelligence Architecture", "We design reporting systems, dashboards, and performance signals around the numbers leaders actually need."],
    ["Process Optimisation and Automation", "We map, simplify, and automate repeated workflows so teams spend less time on friction and more time on value."],
    ["Customer Retention Systems", "We improve follow-up, communication, customer experience, and feedback loops so customers stay longer."],
    ["Profitability Improvement", "We identify operational gaps, revenue leakage, cost waste, and margin pressure across the business."],
    ["Company Customised AI Agents", "We build AI agents tailored to your business that automate tasks, handle enquiries, and improve decision-making across your operations."],
    ["Workflow Automations (Operation Acceleration)", "We design and implement automation systems that remove manual work, speed up processes, and improve overall business efficiency."],
    ["Website Development and Website Automation", "Fekitech supports web applications, mobile applications, website widget embeds, website automation, lead capture, forms, booking flows, analytics, and conversion-focused digital systems where they fit the business need."],
    ["SEO, GEO and AI-Search Support for Websites", "Fekitech can support SEO structure, metadata, internal linking, blog formatting, and AI-search friendly content when those needs are part of a website, digital transformation, or business-growth system."],
    ["Training (Staff, Personal & Career Development)", "We provide training programs to improve staff performance, develop individual skills, and support long-term career growth."],
    ["Software Development / Apps", "We create custom software and mobile/web applications designed to solve specific business problems and improve productivity."],
    ["Startup Mentorship", "We guide startups with strategy, product development, and business growth support to help them launch and scale successfully."],
    ["Career Development and Job Success", "We help you go from CV to job offer with a complete career system, including CV improvement, personal statements, cover letters, job search strategy, interview coaching, and offer negotiation support."]
  ];

  return services.flatMap(([title, text]) =>
    createChunks([`${title}\n${text}`], {
      sourceType: "service",
      title,
      slug: "/services",
      url: "https://fekitech.co.uk/services",
      sectionHeading: title,
      priority: 0.82
    })
  );
}

function pageChunks() {
  const pages = [
    {
      title: "Homepage",
      slug: "/",
      text: `Built For Local Businesses
Run Your Business, Not Paperwork.
	Fekitech combines custom software, intelligent automation and practical business-systems consultancy to help businesses improve the way work is organised and managed.
Fekitech transforms businesses through business audits, gap diagnosis, transformation roadmaps, smart business systems, performance scaling, and long-term strategic support.`
    },
    {
      title: "About Fekitech",
      slug: "/about",
	      text: `Fekitech helps small and growing businesses improve operations through business systems, digital transformation, workflow automation, business intelligence and practical software.
Fekitech helps organisations move away from manual processes, disconnected tools, and inefficient workflows by building integrated digital systems that improve how they operate day to day.
The mission is to help businesses become structured, data-driven, and high-performing organisations built on clarity, systems, and sustainable growth.`
    },
    {
      title: "Pricing",
      slug: "/pricing",
      text: `Small Business Operating System Package: Starter Plan GBP 19/month, Pro Plan GBP 49/month, Business Plan GBP 99/month, Agency / White Label GBP 199/month.
Business Transformation Package: Starter Package from GBP 500 to GBP 1,500; Growth Package from GBP 2,000 to GBP 5,000; FOS Implementation from GBP 5,000 to GBP 25,000+; Enterprise custom pricing.
Other services pricing is bespoke and tailor-made.`
    },
    {
      title: "Contact Fekitech",
      slug: "/contact",
      sourceType: "contact",
      text: `Contact Fekitech for business transformation support.
Phone: +447352364942.
Email: info@contact.fekitech.co.uk.
Address: 71-75, Shelton Street, Covent Garden, London, United Kingdom, WC2H 9JQ.
Birmingham address: 10 Brindley Place, Birmingham, B1 2JB.
Visitors can use the contact form to submit an audit request with full name, email address, company name, website or social link, business size, main challenge, and a message.
	The primary contact action is Book a Free Business Audit.`
    }
  ];

  return pages.flatMap((page) =>
    createChunks([page.text], {
      sourceType: page.sourceType || "page",
      title: page.title,
      slug: page.slug,
      url: `https://fekitech.co.uk${page.slug === "/" ? "" : page.slug}`,
      sectionHeading: page.title,
      priority: page.sourceType === "contact" ? 1 : 0.72
    })
  );
}

function faqChunks() {
  const faqs = [
	    ["What does Fekitech actually build?", "Business systems that may include dashboards, workflows, automation, reporting and practical custom software."],
	    ["How fast can we see results?", "Timing depends on the current process, data, integrations and agreed scope. A business audit is used to identify a proportionate first step before implementation timing is agreed."],
	    ["Is this only for large companies?", "No. Fekitech works with small and growing businesses that need clearer structure, systems and operating visibility."],
    ["Do you replace our current tools?", "Only when needed. The goal is to connect, redesign, and improve the operating system around your business."],
    ["Can you support implementation?", "Yes. Implementation scope and pricing are agreed after the business audit, based on the workflow, systems, integrations and support required."]
  ];

  return faqs.flatMap(([question, answer]) =>
    createChunks([`${question}\n${answer}`], {
      sourceType: "faq",
      title: question,
      slug: "/",
      sectionHeading: "FAQ",
      priority: 0.66
    })
  );
}

function blogChunks() {
  return blogPosts.flatMap((post) => {
    const introChunks = createChunks([[post.h1, post.lead, ...post.intro].join("\n")], {
      sourceType: "blog",
      title: post.title,
      slug: post.slug,
      url: `https://fekitech.co.uk${post.slug}`,
      sectionHeading: "Introduction",
      date: post.datePublished,
      priority: 0.56
    });

    const sectionChunks = post.sections.flatMap((section) => {
      const tableText = section.table
        ? [
            section.table.headers.join(" | "),
            ...section.table.rows.map((row) => row.join(" | "))
          ].join("\n")
        : "";
      return createChunks([[section.heading, ...(section.body || []), ...(section.bullets || []), tableText].filter(Boolean).join("\n")], {
        sourceType: "blog",
        title: post.title,
        slug: post.slug,
        url: `https://fekitech.co.uk${post.slug}`,
        sectionHeading: section.heading,
        date: post.datePublished,
        priority: 0.56
      });
    });

    const faqPostChunks = post.faqs.flatMap((faq) =>
      createChunks([`${faq.question}\n${faq.answer}`], {
        sourceType: "faq",
        title: post.title,
        slug: post.slug,
        url: `https://fekitech.co.uk${post.slug}`,
        sectionHeading: faq.question,
        date: post.datePublished,
        priority: 0.62
      })
    );

    return [...introChunks, ...sectionChunks, ...faqPostChunks];
  });
}

export async function buildChatbotChunks() {
  const knowledgePath = path.join(projectRoot, "data", "fekitech-knowledge.txt");
  const knowledgeText = await readIfExists(knowledgePath);

  const knowledgeChunks = chunkMarkdownSections(knowledgeText, {
    sourceType: "company_knowledge",
    title: "Fekitech Company Knowledge Base",
    slug: "/data/fekitech-knowledge.txt",
    priority: 0.92
  });

  return dedupeChunks([
    ...knowledgeChunks,
    ...serviceChunks(),
    ...pageChunks(),
    ...faqChunks(),
    ...blogChunks()
  ]);
}

export async function indexChatbotContent() {
  const chunks = await buildChatbotChunks();
  return upsertChunks(chunks);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  indexChatbotContent()
    .then((result) => {
      console.log(`Indexed ${result.count} chatbot chunks using ${result.mode}.`);
    })
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
}
