# Fekitech SEO keyword-to-page map

Created: 18 July 2026

This map assigns one primary page to each important query cluster before metadata or copy changes. Commercial pages explain the service; guides answer informational or comparison intent and link back to the relevant commercial page.

| Query cluster | Primary page | Intent | Supporting pages | Cannibalisation guardrail |
|---|---|---|---|---|
| Fekitech; business transformation company; business systems for profitable growth | `/` | Brand/navigation and broad commercial | `/about`, `/services` | Keep the homepage broad; do not turn it into a list of every target keyword. |
| Business transformation services; business operating systems; business systems for small businesses | `/services` | Commercial overview | `/services/business-structure-design`, `/services/digital-transformation`, profitability guide | Services owns the broad offer; detail pages own their named disciplines. |
| Business transformation packages; Fekitech pricing; business systems pricing | `/pricing` | Transactional/commercial | `/services`, `/contact` | Keep product subscription plans visibly separate from consulting packages and bespoke services. |
| About Fekitech; business transformation company UK | `/about` | Brand/trust | `/services`, `/blog`, `/contact` | Do not make About compete for a specific service query. |
| Contact Fekitech; book a free business audit | `/contact` | Conversion/navigation | `/services`, `/pricing` | Use one truthful audit journey; do not alternate with a non-existent free trial. |
| Fekitech business insights; business systems blog; automation and profitability guides | `/blog` | Informational collection | Every published article | `/blog/all` redirects here; the index keeps a stable collection H1. |
| Digital transformation for small and growing businesses | `/services/digital-transformation` | Commercial | Services, website automation guide, AI-vs-workflow guide | The service page owns implementation; articles own education/comparison. |
| Process optimisation; business process automation | `/services/process-optimisation-and-automation` | Commercial | Services, website automation guide, AI-vs-workflow guide | Do not make the workflow-automation page a duplicate; this page owns process design plus automation. |
| Workflow automation for small business; small-business automation services | `/services/workflow-automations` | Commercial | Website automation guide, AI-vs-workflow guide | The page owns delivery; the guide owns technology choice. |
| Website automation services; website automation for small businesses | `/blog/website-automation-small-businesses` | Informational with commercial pathway | Workflow Automation, Digital Transformation, Software Development, AI-vs-workflow guide | Preserve the guide intent; do not make it a generic workflow service page. |
| AI agents for small business; AI agent for small business; practical AI agents | `/blog/ai-agents-for-small-business` | Informational | Company Customised AI Agents, Workflow Automation, AI-vs-workflow guide | The article explains AI agents; the service page owns bespoke implementation. |
| Company-customised AI agents; business AI-agent services | `/services/company-customised-ai-agents` | Commercial | AI Agents guide, AI-vs-workflow guide | Avoid repeating the article's broad education; focus the service on scope, controls and delivery. |
| AI agent vs workflow automation; when to use AI agents; AI automation for small business | `/blog/ai-agent-vs-workflow-automation-small-business` | Informational comparison with commercial relevance | AI Agents guide, Website Automation guide, AI/Workflow/Digital Transformation service pages | This page owns the comparison; it must not become another general AI-agent definition guide. |
| Business intelligence for small business; small business KPI dashboard; business intelligence KPIs | `/blog/business-intelligence-small-business-kpi-dashboard` | Informational | Business Intelligence Architecture, KPI software decision guide | The guide owns KPI architecture education; the service page owns implementation. |
| Business intelligence architecture; KPI dashboard development UK | `/services/business-intelligence-architecture` | Commercial | BI/KPI guide, KPI software decision guide | Use “development UK” only in genuine delivery context; do not turn the service into a software list. |
| KPI dashboard software for small business; best KPI software; buy vs build KPI dashboard | `/blog/kpi-dashboard-software-small-business` | Commercial investigation/decision support | BI/KPI guide, Business Intelligence Architecture, Contact | The new guide owns buy/build/spreadsheet selection; no “top ten” list. |
| Customer retention strategy for small business | `/blog/customer-retention-strategy-small-business` | Informational | Customer Retention Systems, profitability guide | Article owns lifecycle guidance; service owns implementation. |
| Customer retention systems | `/services/customer-retention-systems` | Commercial | Retention guide, profitability guide | Keep service delivery distinct from the strategy guide. |
| Why businesses are not profitable; profitability improvement | `/blog/why-most-businesses-are-not-profitable` for the question; `/services/profitability-improvement` for the service | Informational / commercial | Pricing, BI guide, retention guide, workflow pages, two new guides | Preserve the ranking article and add varied contextual links; do not merge it into the service page. |
| Business website cost UK | `/blog/how-much-does-a-business-website-cost-uk` | Commercial investigation | Software Development, Website Automation guide, Pricing | Do not invent market price ranges; use verified quote factors and visible Fekitech pricing only. |
| Software and app development | `/services/software-development-apps` | Commercial | Website cost guide, Website Automation guide | Keep the page broader than websites while linking to relevant website education. |

## Required topic-cluster relationships

- `/services` → BI article → KPI software article
- `/services` → AI Agents article ↔ AI Agent vs Workflow Automation article
- `/services` → Website Automation article ↔ AI Agent vs Workflow Automation article
- BI article ↔ KPI software article
- Profitability article → Services, BI, Workflow Automation, Customer Retention and both new articles
- Every article → its closest commercial service
- `/blog` → every published article with a real `<a href>`

Anchors should vary naturally and describe the destination. Repeated “click here”, excessive exact-match anchors and mass footer linking are excluded.
