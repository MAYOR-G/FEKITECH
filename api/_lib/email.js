import { escapeHtml } from "./http.js";

const resendEndpoint = "https://api.resend.com/emails";
const fallbackWebsiteUrl = "https://fekitech.co.uk";
const fallbackCompanyName = "Fekitech";

function getSenderEmail() {
  return process.env.RESEND_FROM_EMAIL || "info@contact.fekitech.co.uk";
}

function trimTrailingSlash(value) {
  return String(value || "").trim().replace(/\/+$/, "");
}

function getWebsiteUrl() {
  return trimTrailingSlash(process.env.WEBSITE_URL || process.env.NEXT_PUBLIC_SITE_URL || process.env.VITE_SITE_URL || fallbackWebsiteUrl);
}

function getCompanyName() {
  return process.env.COMPANY_NAME || fallbackCompanyName;
}

function getSupportEmail() {
  return process.env.SUPPORT_EMAIL || process.env.RESEND_FROM_EMAIL || getSenderEmail();
}

function getLogoUrl() {
  const configuredLogoUrl = process.env.EMAIL_LOGO_URL;
  if (configuredLogoUrl && !configuredLogoUrl.endsWith("/fekitech-logo.png")) {
    return configuredLogoUrl;
  }
  return `${getWebsiteUrl()}/fekitech-logo-transparent-cropped.png`;
}

function formatGreeting(name) {
  return name ? `Hi ${name},` : "Hello,";
}

function formatPlainText({ greeting, intro, message, companyName, websiteUrl, supportEmail }) {
  return [
    greeting,
    "",
    intro,
    "",
    message,
    "",
    "Best regards,",
    `${companyName} Team`,
    "",
    `${companyName}`,
    websiteUrl,
    supportEmail,
    "",
    "You received this email because you contacted us through our website."
  ].join("\n");
}

export async function sendEmail({ to, subject, html, text, replyTo }) {
  if (!process.env.RESEND_API_KEY) {
    throw new Error("RESEND_API_KEY is required.");
  }

  const response = await fetch(resendEndpoint, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      from: getSenderEmail(),
      to,
      subject,
      html,
      text,
      ...(replyTo ? { reply_to: replyTo } : {})
    })
  });

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`Resend email failed: ${detail}`);
  }

  return response.json();
}

export function contactNotificationEmail({ name, email, subject, message, meta }) {
  const rows = [
    ["Name", name],
    ["Email", email],
    ["Subject", subject],
    ["Company", meta.company],
    ["Website or social", meta.website],
    ["Business size", meta.businessSize],
    ["Main challenge", meta.challenge],
    ["Submitted", meta.submittedAt ? new Date(meta.submittedAt).toLocaleString("en-GB", { dateStyle: "medium", timeStyle: "short", timeZone: "Europe/London" }) : ""]
  ].filter(([, value]) => value);

  const htmlRows = rows
    .map(([label, value]) => `<tr><td style="padding:6px 14px 6px 0;color:#64748b;">${escapeHtml(label)}</td><td style="padding:6px 0;color:#0f172a;font-weight:600;">${escapeHtml(value)}</td></tr>`)
    .join("");

  const textRows = rows.map(([label, value]) => `${label}: ${value}`).join("\n");

  return {
    subject: `New Fekitech enquiry: ${subject}`,
    html: `
      <div style="font-family:Arial,sans-serif;line-height:1.6;color:#0f172a;">
        <h2 style="margin:0 0 16px;">New Fekitech contact message</h2>
        <table style="border-collapse:collapse;margin-bottom:18px;">${htmlRows}</table>
        <h3 style="margin:20px 0 8px;">Message</h3>
        <p style="white-space:pre-wrap;margin:0;padding:16px;border-radius:12px;background:#f8fafc;">${escapeHtml(message)}</p>
      </div>
    `,
    text: `New Fekitech contact message\n\n${textRows}\n\nMessage:\n${message}`
  };
}

export function adminReplyEmail({ message, recipientName = "", subject = "" }) {
  const companyName = getCompanyName();
  const websiteUrl = getWebsiteUrl();
  const supportEmail = getSupportEmail();
  const logoUrl = getLogoUrl();
  const greeting = formatGreeting(recipientName);
  const intro = "Thank you for reaching out. Here is our response to your message.";
  const emailSubject = subject || `Re: Your message to ${companyName}`;
  const currentYear = new Date().getFullYear();

  return {
    subject: emailSubject,
    html: `
      <!doctype html>
      <html lang="en">
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>${escapeHtml(emailSubject)}</title>
        </head>
        <body style="margin:0;padding:0;background:#f4f7fb;color:#101828;font-family:Arial,Helvetica,sans-serif;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="width:100%;background:#f4f7fb;margin:0;padding:28px 14px;">
            <tr>
              <td align="center">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="width:100%;max-width:640px;margin:0 auto;">
                  <tr>
                    <td style="padding:0 0 18px;text-align:center;">
                      <img src="${escapeHtml(logoUrl)}" width="58" height="58" alt="${escapeHtml(companyName)} logo" style="display:inline-block;width:58px;height:58px;border-radius:14px;background:#05070a;object-fit:contain;">
                    </td>
                  </tr>
                  <tr>
                    <td style="overflow:hidden;border-radius:24px;background:#070b12;box-shadow:0 24px 70px rgba(7,11,18,0.18);">
                      <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                        <tr>
                          <td style="padding:28px 30px;background:linear-gradient(135deg,#07111d 0%,#092c55 58%,#2b145f 100%);">
                            <p style="margin:0 0 8px;color:#7fc7ff;font-size:12px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;">${escapeHtml(companyName)}</p>
                            <h1 style="margin:0;color:#ffffff;font-size:24px;line-height:1.25;font-weight:800;">Response From ${escapeHtml(companyName)}</h1>
                          </td>
                        </tr>
                        <tr>
                          <td style="padding:30px;background:#ffffff;">
                            <p style="margin:0 0 14px;color:#111827;font-size:16px;line-height:1.65;">${escapeHtml(greeting)}</p>
                            <p style="margin:0 0 22px;color:#344054;font-size:16px;line-height:1.7;">${escapeHtml(intro)}</p>
                            <div style="margin:0 0 24px;padding:22px;border:1px solid #e5eaf2;border-radius:18px;background:#f8fbff;color:#172033;font-size:16px;line-height:1.75;white-space:pre-wrap;">${escapeHtml(message)}</div>
                            <p style="margin:0;color:#344054;font-size:16px;line-height:1.7;">Best regards,<br><strong style="color:#101828;">${escapeHtml(companyName)} Team</strong></p>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:22px 10px 0;text-align:center;color:#667085;font-size:12px;line-height:1.7;">
                      <p style="margin:0 0 6px;font-weight:700;color:#344054;">${escapeHtml(companyName)}</p>
                      <p style="margin:0;">
                        <a href="${escapeHtml(websiteUrl)}" style="color:#0b5bdc;text-decoration:none;">${escapeHtml(websiteUrl.replace(/^https?:\/\//, ""))}</a>
                        <span style="color:#98a2b3;"> | </span>
                        <a href="mailto:${escapeHtml(supportEmail)}" style="color:#0b5bdc;text-decoration:none;">${escapeHtml(supportEmail)}</a>
                      </p>
                      <p style="margin:8px 0 0;color:#98a2b3;">You received this email because you contacted us through our website.</p>
                      <p style="margin:6px 0 0;color:#98a2b3;">&copy; ${currentYear} ${escapeHtml(companyName)}. All rights reserved.</p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </body>
      </html>
    `,
    text: formatPlainText({ greeting, intro, message, companyName, websiteUrl, supportEmail })
  };
}
