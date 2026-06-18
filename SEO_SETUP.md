# FekiTech SEO Setup

## Primary Domain

The canonical production domain is fixed in the SEO configuration:

```txt
https://fekitech.co.uk
```

Canonical URLs, sitemap URLs, Open Graph URLs, Twitter image URLs, and JSON-LD URLs cannot be changed by preview or deployment environment variables.

`vercel.json` redirects every `www.fekitech.co.uk` path to the matching non-www path with HTTP 301.

## Google Search Console

After deployment:

1. Verify the primary domain in Google Search Console.
2. Submit `/sitemap.xml`.
3. Request indexing for the homepage.
4. Inspect all seven public sitemap URLs.
