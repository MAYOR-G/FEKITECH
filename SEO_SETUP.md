# Fekitech SEO Setup

## Primary Domain

Set one primary canonical domain:

```bash
NEXT_PUBLIC_SITE_URL=https://fekitech.vercel.app
```

When the custom domain is ready, change only this value:

```bash
NEXT_PUBLIC_SITE_URL=https://fekitech.com
```

All canonical URLs, sitemap URLs, Open Graph URLs, Twitter URLs, and JSON-LD URLs are generated from this value.

## Alternate Domains

Optional alternate domains can be listed here:

```bash
NEXT_PUBLIC_ALTERNATE_DOMAINS=https://www.fekitech.com,https://fekitech.co.uk,https://www.fekitech.co.uk
```

Only the primary `NEXT_PUBLIC_SITE_URL` should be indexed. Configure redirects at the hosting/domain level so every alternate domain redirects to the primary domain. Do this in Vercel domain settings or redirect rules after the final primary domain is chosen.

## Google Search Console

After deployment:

1. Verify the primary domain in Google Search Console.
2. Submit `/sitemap.xml`.
3. Request indexing for the homepage.
4. Keep alternate domains redirected to the primary domain.
