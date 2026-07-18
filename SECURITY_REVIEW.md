# Fekitech light security review

Review date: 18 July 2026

This is a light application-security review for the SEO/content release, not a penetration test or legal compliance opinion.

## Controls verified in source

- Turnstile secret verification occurs server-side.
- Contact input lengths, email format and body size are bounded.
- Database calls use parameterised queries and email HTML is escaped.
- Secrets are loaded from server-side environment variables; no committed secret value was found in the targeted scan.
- Admin cookies are HTTP-only, secure outside localhost and SameSite=Lax.
- Admin data responses require a signed session and use no-store caching.
- Public form copy now tells visitors not to submit credentials or unnecessary sensitive personal information.

## Changes made

- Added HSTS, `X-Content-Type-Options`, `X-Frame-Options`, strict-origin referrer policy and a restrictive Permissions Policy.
- Added CSP in report-only mode with the current Turnstile and R2 dependencies allowed. Enforcement should follow only after reviewing real violation reports.
- Added long immutable caching for hashed `/assets/*` output.
- Replaced the JavaScript-redirect 404 with a useful, noindex navigation page.
- Removed unsupported claims and schema that could misrepresent evidence or eligibility.
- `npm audit --omit=dev` reached the npm advisory service and reported zero known production vulnerabilities across 67 production dependencies (18 July 2026). This is a point-in-time advisory check, not proof that the application is vulnerability-free.

## Outstanding risks and owner actions

| Priority | Finding | Required action |
|---|---|---|
| High | Admin login has no persistent serverless throttling or MFA. | Choose a durable rate-limit store and an MFA/identity approach; do not rely only on process memory. |
| High | Contact/chat abuse controls are process-local in serverless execution. | Add a shared limiter keyed conservatively, monitor false positives, and retain Turnstile. |
| High | IP address and user agent are stored with enquiries, but no approved privacy/retention notice exists. | Obtain controller, purpose, lawful-basis, processor, retention and rights text from the owner/legal adviser before publishing a privacy page. |
| Medium | Default notification configuration includes personal Gmail recipients. | Replace with approved controlled business mailboxes in deployment environment variables. |
| Medium | CSP is report-only. | Deploy, collect/review violations, adjust deliberately, then enforce if application flows remain intact. |
| Medium | The remote R2 video lacks a cache policy and is served from a human-readable unversioned URL. | Publish an optimised versioned asset and set explicit cache headers at R2/CDN level. |
| Medium | `www` returned 200 during the live audit despite the configured redirect. | Verify Vercel domain assignment and redirect behaviour after deployment. |

Do not fabricate a privacy policy, retention period, service guarantee or security certification. Those require approved business facts.
