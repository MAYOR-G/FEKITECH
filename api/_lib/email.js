import { escapeHtml } from "./http.js";

const resendEndpoint = "https://api.resend.com/emails";

function getSenderEmail() {
  return process.env.RESEND_FROM_EMAIL || "info@fekitech.co.uk";
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
    subject: `New FekiTech enquiry: ${subject}`,
    html: `
      <div style="font-family:Arial,sans-serif;line-height:1.6;color:#0f172a;">
        <h2 style="margin:0 0 16px;">New FekiTech contact message</h2>
        <table style="border-collapse:collapse;margin-bottom:18px;">${htmlRows}</table>
        <h3 style="margin:20px 0 8px;">Message</h3>
        <p style="white-space:pre-wrap;margin:0;padding:16px;border-radius:12px;background:#f8fafc;">${escapeHtml(message)}</p>
      </div>
    `,
    text: `New FekiTech contact message\n\n${textRows}\n\nMessage:\n${message}`
  };
}
