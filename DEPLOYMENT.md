# FekiTech Production Deployment

Main domain: `fekitech.co.uk`

Business sender email: `info@fekitech.co.uk`

Notification recipients:

- `info@fekitech.co.uk`
- `couragechidoka@gmail.com`
- `fekitech01@gmail.com`

## A. Vercel Setup

1. Open the FekiTech project in Vercel.
2. Go to **Settings -> Domains**.
3. Add `fekitech.co.uk`.
4. Add `www.fekitech.co.uk` if you want the `www` version to resolve too.
5. Vercel will show the required DNS records for the apex domain and `www`.
6. Copy the exact DNS records shown by Vercel. Vercel may show project-specific verification records, so do not rely only on generic examples.
7. Because the domain was purchased through Namecheap, add the DNS records in Namecheap unless nameservers have been moved elsewhere.

Namecheap DNS path:

1. Go to **Namecheap -> Domain List**.
2. Click **Manage** beside `fekitech.co.uk`.
3. Open **Advanced DNS**.
4. Add or update the Vercel DNS records.
5. Remove conflicting parking, forwarding, or redirect records if they stop the domain from resolving to Vercel.
6. Save and wait for DNS propagation.

Environment variables are added in **Vercel -> Project -> Settings -> Environment Variables**. Add them for Production, then redeploy the project.

## B. Database Setup

Use Neon Postgres through the Vercel Marketplace, or another Vercel-compatible Postgres provider.

Recommended Neon setup:

1. In Vercel, open **Integrations / Marketplace**.
2. Add **Neon Postgres** to the FekiTech project.
3. Connect the Neon database to the Vercel project.
4. Confirm `DATABASE_URL` is available in Vercel Environment Variables.
5. Redeploy the project after the variable is added.

The API creates the required table automatically on first contact form or admin use:

```sql
CREATE TABLE IF NOT EXISTS contact_messages (
  id TEXT PRIMARY KEY,
  sender_email TEXT NOT NULL,
  sender_name TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  direction TEXT NOT NULL DEFAULT 'inbound',
  meta JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

This single table stores both user submissions and admin replies. The `direction` field identifies `inbound` messages and `admin` replies, and messages are grouped by `sender_email` in the admin dashboard.

After deployment, submit a test contact form and confirm the message appears in `/admin`.

## C. 90-Day Auto Delete Setup

The cleanup route is:

```text
/api/cron/cleanup-messages
```

It deletes messages and replies older than 90 days.

Protection:

- Add `CRON_SECRET` in Vercel Environment Variables.
- The cleanup route requires `Authorization: Bearer CRON_SECRET`.
- Do not commit `CRON_SECRET` to GitHub.

The Vercel Cron Job is configured in `vercel.json`:

```json
{
  "crons": [
    {
      "path": "/api/cron/cleanup-messages",
      "schedule": "0 3 * * *"
    }
  ]
}
```

This runs once per day at 03:00 UTC.

To confirm it works:

1. Open the Vercel project.
2. Go to **Logs**.
3. Filter for `/api/cron/cleanup-messages`.
4. Confirm the route returns a JSON response with `ok: true` and a `deleted` count.

## D. Resend Setup

1. Open Resend.
2. Go to **Domains**.
3. Add `fekitech.co.uk`.
4. Resend will show DNS records for SPF, DKIM, and DMARC if required.
5. Copy all DNS records provided by Resend.
6. Add those records in **Namecheap -> Advanced DNS**.
7. Wait for Resend to verify the domain.
8. After verification, use `info@fekitech.co.uk` as the sender email.

Do not send production email from an unverified domain.

## E. Environment Variables

Add these in **Vercel -> Project -> Settings -> Environment Variables**:

```env
RESEND_API_KEY=
RESEND_FROM_EMAIL=info@fekitech.co.uk
CONTACT_NOTIFICATION_EMAILS=info@fekitech.co.uk,couragechidoka@gmail.com,fekitech01@gmail.com

ADMIN_EMAIL=fekitech01@gmail.com
ADMIN_PASSWORD=

SESSION_SECRET=
DATABASE_URL=
CRON_SECRET=

VITE_SITE_URL=https://fekitech.co.uk
```

Important:

- `ADMIN_PASSWORD` should be added only in Vercel Environment Variables.
- The admin password must not be committed to GitHub.
- `RESEND_API_KEY` must not be committed to GitHub.
- `SESSION_SECRET` should be a long random secret value.
- `CRON_SECRET` should be a long random secret value.
- After adding or changing environment variables, redeploy the Vercel project.

Generate long random secrets locally:

```bash
openssl rand -base64 48
```

## F. Admin Dashboard

Admin URL:

```text
https://fekitech.co.uk/admin
```

Login uses:

- `ADMIN_EMAIL`
- `ADMIN_PASSWORD`

The password check happens server-side. `ADMIN_PASSWORD` is never exposed to the frontend.

The admin session uses a signed `httpOnly` cookie with secure settings in production.

Admin features:

- View contact messages grouped by sender email.
- Newest conversations appear first.
- Open a full message thread from each sender.
- Reply directly to the sender.
- Replies are sent from `info@fekitech.co.uk` through Resend.
- Admin replies are stored in the same thread.
- Logout clears the session cookie.

## G. Final Production Checklist

- Domain is connected to Vercel.
- `www.fekitech.co.uk` is connected or redirected if needed.
- Namecheap DNS records match the exact records shown in Vercel.
- Database is connected and `DATABASE_URL` is present.
- Contact form submissions are stored.
- Messages auto-delete after 90 days.
- Vercel Cron Job runs once per day.
- Resend domain is verified.
- `info@fekitech.co.uk` can send emails.
- Contact form sends notifications to all three recipients.
- Contact messages appear in `/admin`.
- Admin can log in using environment variable credentials.
- Admin can reply from `info@fekitech.co.uk`.
- Messages from the same sender email appear as one thread.
- No secrets are hard-coded.
- No console errors.
- Forms work in production.
