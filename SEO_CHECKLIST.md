# FekiTech SEO Checklist

Production domain: `https://fekitech.co.uk`

Last implementation review: `2026-06-18`

## Crawl Endpoints

- Sitemap: `https://fekitech.co.uk/sitemap.xml`
- Robots: `https://fekitech.co.uk/robots.txt`
- Google verification file: `https://fekitech.co.uk/googlef2b6d249050ab8fb.html`
- Social preview image: `https://fekitech.co.uk/og-image.png`

The sitemap and robots endpoints are generated during `npm run build`. Vercel sets the sitemap response to `Content-Type: application/xml; charset=utf-8` and robots to `text/plain; charset=utf-8`.

## Indexed Public Pages

- `https://fekitech.co.uk/`
- `https://fekitech.co.uk/about`
- `https://fekitech.co.uk/services`
- `https://fekitech.co.uk/pricing`
- `https://fekitech.co.uk/blog`
- `https://fekitech.co.uk/contact`
- `https://fekitech.co.uk/blog/why-most-businesses-are-not-profitable`

Each page is prerendered to route-specific HTML and includes `index, follow`.

## Excluded From Indexing

- `/admin` — excluded from the sitemap and protected by `noindex, nofollow, noarchive` HTML metadata plus an `X-Robots-Tag` response header.
- `/api/*` — excluded from the sitemap and routed only to Vercel functions.
- `/audit` — permanently redirects to canonical `/contact`.
- Unknown/private routes — no longer rewrite to homepage HTML.

## Metadata

| Page | SEO Title | Meta Description |
| --- | --- | --- |
| `/` | FekiTech \| Business Operations Systems for Local Businesses | FekiTech transforms organisations by improving performance across operations, people, systems, and profitability. |
| `/about` | About FekiTech \| Better Operations, Systems & Profitability | Learn how FekiTech transforms organisations through stronger operations, people, systems, performance visibility, and profitability. |
| `/services` | Business Operations & Performance Services \| FekiTech | Explore FekiTech services for business structure, operations, automation, performance visibility, and profitability improvement. |
| `/pricing` | FekiTech Pricing \| Business Transformation Package | View FekiTech’s business transformation package for local businesses that want better systems, stronger operations, and improved profitability. |
| `/blog` | FekiTech Blog \| Operations, Growth & Profitability Insights | Read practical insights on business operations, profitability, performance systems, and scalable growth for local businesses. |
| `/contact` | Contact FekiTech \| Book a Business Strategy Call | Book a strategy call with FekiTech to improve your business operations, systems, performance, and profitability. |
| `/blog/why-most-businesses-are-not-profitable` | Why Most Businesses Are Not Profitable \| FekiTech | Learn why businesses struggle with profitability and how structured operations, systems, visibility, and retention improve performance. |

Every public page also has matching Open Graph and Twitter/X title, description, URL, and PNG image metadata.

## Canonical URL Rules

- Canonicals always use `https://fekitech.co.uk`.
- Each public page self-canonicalizes.
- Preview domains, Vercel domains, old domains, and `www` URLs are not accepted from environment variables.
- `https://www.fekitech.co.uk/:path*` redirects with HTTP 301 to `https://fekitech.co.uk/:path*`.
- Trailing-slash variants redirect to the canonical non-trailing-slash URL.
- Trailing query strings remain separate from the canonical URL.

## Open Graph Image

- Path: `/og-image.png`
- Format: PNG
- Dimensions: `1200x630`
- SVG is not used for Open Graph or Twitter/X metadata.
- The image is metadata-only and does not alter visible website media.

## Structured Data

JSON-LD generated on public pages:

- `Organization`
- `LocalBusiness`
- `ContactPoint`
- `WebSite`
- `BreadcrumbList` on public subpages
- `Service` entities on `/services`
- `OfferCatalog` with visible pricing/ranges on `/pricing`
- `BlogPosting` on `/blog/why-most-businesses-are-not-profitable`

Business details used:

- Name: `FekiTech`
- Domain: `https://fekitech.co.uk`
- Email: `info@fekitech.co.uk`
- Phone: `+447352364942`
- Address: `71-75, Shelton Street, Covent Garden, London, United Kingdom, WC2H 9JQ`
- Logo: `https://fekitech.co.uk/fekitech-logo-transparent-cropped.png`
- Existing social profiles: Facebook, Instagram, TikTok

## Performance Fixes

- Converted the existing large internal JPEG/PNG images to visually equivalent WebP assets while retaining the original files as source assets.
- Reduced the seven converted assets from approximately `5.9 MB` to approximately `0.75 MB`.
- Preserved image dimensions and existing layout.
- Kept below-the-fold images lazy-loaded.
- Kept the hero/LCP media eager and added high fetch priority for its poster/fallback image.
- Kept the hero video, placement, autoplay behavior, and visible design unchanged.
- Added homepage preconnects for the existing R2 video and Pexels image origins.
- Removed the catch-all homepage rewrite so crawlers receive route-specific prerendered HTML.

## Automated QA

Run:

```bash
npm run build
npm run seo:check
```

The QA script verifies public route metadata, unique titles/descriptions, canonicals, robots directives, sitemap membership and dates, JSON-LD parsing, image alt/dimensions, internal links, OG PNG dimensions, Vercel headers, and the permanent www redirect configuration.

## Google Search Console Steps Completed

- Google HTML verification file is present in `public/googlef2b6d249050ab8fb.html`.
- Sitemap and robots files are generated and ready for submission.
- Canonical and indexability checks are automated.

External account steps still required after deployment:

1. Confirm `https://fekitech.co.uk/googlef2b6d249050ab8fb.html` loads.
2. Verify the domain property in Google Search Console.
3. Submit `https://fekitech.co.uk/sitemap.xml`.
4. Inspect and request indexing for all seven public URLs.
5. Monitor Page Indexing and Core Web Vitals reports after Google recrawls.

## Bing Webmaster Tools Steps To Complete

1. Add `https://fekitech.co.uk`.
2. Import the verified site from Google Search Console or verify manually.
3. Submit `https://fekitech.co.uk/sitemap.xml`.
4. Inspect the homepage, Services, Pricing, Blog, and Contact URLs.
5. Monitor crawl errors and indexed page counts.

## Manual SEO Tasks Still Needed

- Deploy the changes to Vercel.
- Confirm the live `www` host returns a permanent redirect after deployment.
- Run Google Rich Results Test and Schema Markup Validator against the deployed pages.
- Test the deployed PNG with LinkedIn, Facebook, and X/Twitter card validators.
- Submit the sitemap in Google Search Console and Bing Webmaster Tools.
- Review Search Console indexing and Core Web Vitals after enough field data is available.
- Update each route’s `lastModified` value in `src/lib/site.js` whenever its public content or metadata materially changes.

## Final Implementation Constraints

- No visible page copy, sections, layout, spacing, animations, footer content, or visual styling were changed.
- No visible image or video was removed.
- Existing visible images were only served in a smaller WebP format.
