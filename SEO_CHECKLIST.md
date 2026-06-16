# FekiTech SEO Checklist

Production domain: `https://fekitech.co.uk`

## Crawl URLs

- Sitemap: `https://fekitech.co.uk/sitemap.xml`
- Robots: `https://fekitech.co.uk/robots.txt`
- Google verification file: `https://fekitech.co.uk/googlef2b6d249050ab8fb.html`

## Sitemap Pages

The sitemap includes only public, indexable pages:

- `https://fekitech.co.uk/`
- `https://fekitech.co.uk/about`
- `https://fekitech.co.uk/services`
- `https://fekitech.co.uk/pricing`
- `https://fekitech.co.uk/blog`
- `https://fekitech.co.uk/contact`
- `https://fekitech.co.uk/blog/why-most-businesses-are-not-profitable`

Excluded from sitemap:

- `/admin`
- `/api/*`
- Google verification file
- Non-canonical `/audit`

## Robots.txt

Expected content:

```txt
User-agent: *
Allow: /

Sitemap: https://fekitech.co.uk/sitemap.xml
```

`/admin` is excluded from indexing through page-level robots metadata: `noindex, nofollow, noarchive`.

## Titles And Meta Descriptions

| Page | Title | Meta Description |
| --- | --- | --- |
| `/` | FekiTech \| Business Operations & Performance Systems for Local Businesses | FekiTech transforms local businesses by improving performance across operations, people, systems, and profitability. |
| `/about` | About FekiTech \| Business Operations & Performance Systems | Learn how FekiTech helps local businesses improve operations, people, systems, performance visibility, and profitability. |
| `/services` | FekiTech Services \| Business Operations, Systems & Performance Improvement | Explore FekiTech services for improving business structure, operations, automation, performance visibility, and profitability. |
| `/pricing` | FekiTech Pricing \| Business Transformation Package | View FekiTech’s business transformation package for local businesses that want stronger operations, better systems, and improved profitability. |
| `/blog` | FekiTech Blog \| Business Growth, Operations & Profitability Insights | Read practical insights from FekiTech on business operations, profitability, performance systems, and scalable growth for local businesses. |
| `/contact` | Contact FekiTech \| Book a Business Strategy Call | Contact FekiTech to book a strategy call and improve your business operations, systems, performance, and profitability. |
| `/blog/why-most-businesses-are-not-profitable` | Why Most Businesses Are Not Profitable \| FekiTech | Learn why businesses struggle with profitability and how structured operations, systems, visibility, and retention improve performance. |

## Structured Data

JSON-LD added/generated:

- `LocalBusiness`
- `Organization`
- `WebSite`
- `BreadcrumbList` on public inner pages
- `Service` schema on `/services`
- `OfferCatalog` schema on `/pricing`
- `BlogPosting` schema on `/blog/why-most-businesses-are-not-profitable`

Current verified business details used:

- Name: `FekiTech`
- Website: `https://fekitech.co.uk`
- Email: `info@contact.fekitech.co.uk`
- Phone: `+447352364942`
- Address: `71-75, Shelton Street, Covent Garden, London, United Kingdom, WC2H 9JQ`
- Logo: `https://fekitech.co.uk/fekitech-logo.png`
- Social links: Facebook, Instagram, TikTok

## Google Search Console

Completed:

- HTML verification file added to `public/googlef2b6d249050ab8fb.html`.

After deployment:

1. Open `https://fekitech.co.uk/googlef2b6d249050ab8fb.html`.
2. Confirm the verification text loads.
3. Click **Verify** in Google Search Console.
4. Submit `https://fekitech.co.uk/sitemap.xml`.
5. Use URL Inspection for the homepage and request indexing.

## Bing Webmaster Tools

To complete:

1. Add `https://fekitech.co.uk`.
2. Import from Google Search Console or verify manually.
3. Submit `https://fekitech.co.uk/sitemap.xml`.
4. Inspect the homepage and key service/contact URLs.

## Manual SEO Tasks Still Needed

- Test Open Graph preview with LinkedIn, Facebook, and X/Twitter card validators.
- Test JSON-LD with Google Rich Results Test and Schema Markup Validator.
- Check live HTTP headers for `/sitemap.xml` after deployment.
- Confirm Google can fetch pages without Turnstile, authentication, or redirect issues.
- Submit sitemap in Google Search Console and Bing Webmaster Tools.
- Monitor Search Console coverage and page indexing status for crawl errors.

## Suggested Next Content Topics

- How local businesses can improve profitability with better operations.
- Why manual workflows reduce business performance.
- How business intelligence helps owners make better decisions.
- The role of automation in scaling a local service business.
- How to build a business operating system for predictable growth.
