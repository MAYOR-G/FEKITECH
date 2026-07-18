# Fekitech SEO implementation changelog

Date: 18 July 2026

## Subsequent owner-directed restoration

The original homepage metrics section, review marquee, testimonial portraits and About page wording were restored exactly from the repository baseline at the owner's request. The Contact hero's two explanatory paragraphs were removed, the Birmingham address `10 Brindley Place, Birmingham, B1 2JB` was added to Contact, Footer, schema and chatbot contact information, and the Services label in desktop/mobile navigation now links directly to `/services` while retaining access to the service submenu.

The restored numerical outcomes and testimonials were not independently verified during the SEO audit. Their publication is recorded here as an explicit owner-directed decision.

## URLs protected

No established indexable URL was renamed or removed. Homepage, About, Services, Pricing, Contact, all 12 service pages and all six original article URLs remain in place. The profitability article retained its title, H1, core explanation and URL.

`/blog/all` was the only duplicate route consolidated. It is removed from prerendering and the sitemap and configured to return a 301 to `/blog`. `/audit` continues to return a configured 301 to `/contact`.

## Pages and metadata changed

- `/`: unsupported numerical proof and unverified testimonial content removed; value proposition and audit CTAs clarified; established title/H1/URL retained.
- `/about`: factual operating focus and a three-step working method added.
- `/services`: explanatory intro plus contextual guide links added; all service cards retained.
- `/pricing`: software subscriptions, transformation packages and bespoke scope separated in visible copy; schema uses the same pricing source.
- `/blog`: stable collection H1 and description; all eight articles now linked on one crawlable index.
- `/contact`: title, description, H1, form guidance and CTA aligned to “Book a Free Business Audit”.
- Existing BI, AI-agent, website-automation and profitability articles: targeted answer/context sections and internal links added; URLs preserved.

## New articles (exactly two)

1. `/blog/kpi-dashboard-software-small-business`
   - Published/modified: 18 July 2026
   - Decision-led spreadsheet vs SaaS vs BI/custom-build comparison
   - Internal links to BI architecture, the BI/KPI guide, profitability and Contact
   - Sources: Microsoft support and ICO guidance
   - Feature image: `/kpi-dashboard-software-small-business.webp`

2. `/blog/ai-agent-vs-workflow-automation-small-business`
   - Published/modified: 18 July 2026
   - Rules-based automation vs AI agent comparison, control matrix and pilot framework
   - Internal links to AI-agent, workflow, process-optimisation and digital-transformation pages
   - Sources: ICO, NCSC and GOV.UK guidance
   - Feature image: `/ai-agent-vs-workflow-automation-small-business.webp`

Both use truthful organisation authorship, visible dates, unique descriptive alt text, five visible FAQs, BlogPosting/BreadcrumbList schema and no FAQPage rich-result markup.

## Technical and schema changes

- Removed meta keywords everywhere.
- Simplified JSON-LD to verified entities and route-appropriate page types.
- Removed unsupported FAQPage, VideoObject, LocalBusiness and ProfessionalService assertions.
- Corrected BlogPosting `mainEntityOfPage`, added article social dates/section, and sourced Service/Offer data from visible records.
- Removed sitemap priority values and the duplicate route; every sitemap URL has a manually controlled lastmod.
- Synchronized `public` and `dist` robots output.
- Added global security headers, report-only CSP, hashed-asset caching and a useful 404.
- Updated chatbot source knowledge so removed claims are not repeated in responses.

## Image changes

- Generated two distinct, text-free editorial feature images and converted them to 1376×768 WebP at approximately 68–73 kB.
- Converted the homepage transformation illustration from a large PNG request to a 768×768 WebP at approximately 58 kB.
- Preserved explicit dimensions, responsive layout and descriptive alt text.

## Validation

- Production build: passed.
- SEO QA: passed for 26 public routes.
- Exactly one H1 per public route: passed.
- Unique title and description per public route: passed.
- Canonical, robots, Open Graph/Twitter, JSON-LD and sitemap assertions: passed.
- All article routes listed from `/blog`: passed.
- Internal generated-HTML link existence: passed.
- Images include alt, width and height: passed.
- `/admin` remains noindex/noarchive and excluded from the sitemap.
- Desktop browser smoke checks on Home, Services, Blog, Contact and both new articles found one visible H1, no horizontal document overflow, no broken images, no missing image dimensions and no console errors.
- Narrow 390×844 checks confirmed the homepage, Blog, Contact and both new article heroes fit the viewport, retain readable hierarchy and expose the intended H1/CTA. Contact intro/form contrast was strengthened after the first visual pass.

Deployment verification still required: confirm the live `www` and `/blog/all` 301s, new response headers, new sitemap submission/processing, and live Core Web Vitals after the deployment has collected field data.
