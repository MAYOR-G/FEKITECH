import { contactNotificationEmail, sendEmail } from "./_lib/email.js";
import { cleanString, getClientIp, isEmail, methodNotAllowed, readJson, sendJson } from "./_lib/http.js";
import { storeMessage } from "./_lib/db.js";

const requestBuckets = new Map();
const maxRequests = 5;
const windowMs = 10 * 60 * 1000;
const turnstileVerifyUrl = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

function checkRateLimit(ip) {
  const now = Date.now();
  const bucket = requestBuckets.get(ip) || [];
  const recent = bucket.filter((timestamp) => now - timestamp < windowMs);
  if (recent.length >= maxRequests) {
    return false;
  }
  recent.push(now);
  requestBuckets.set(ip, recent);
  return true;
}

async function verifyTurnstile(token, ip) {
  const secret = process.env.CLOUDFLARE_TURNSTILE_SECRET_KEY;
  if (!secret || !token) {
    return false;
  }

  const formData = new URLSearchParams();
  formData.set("secret", secret);
  formData.set("response", token);
  if (ip && ip !== "unknown") {
    formData.set("remoteip", ip);
  }

  const response = await fetch(turnstileVerifyUrl, {
    method: "POST",
    body: formData
  });

  if (!response.ok) {
    return false;
  }

  const result = await response.json();
  return Boolean(result.success);
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return methodNotAllowed(res, ["POST"]);
  }

  try {
    const ip = getClientIp(req);
    if (!checkRateLimit(ip)) {
      return sendJson(res, 429, { error: "Too many submissions. Please try again later." });
    }

    const body = await readJson(req);
    const name = cleanString(body.name || body.fullName, 120);
    const email = cleanString(body.email, 160).toLowerCase();
    const subject = cleanString(body.subject || body.challenge || "Fekitech enquiry", 160);
    const message = cleanString(body.message, 5000);
    const turnstileToken = cleanString(body.turnstileToken, 4096);
    const meta = {
      company: cleanString(body.company, 160),
      website: cleanString(body.website, 240),
      businessSize: cleanString(body.businessSize || body.size, 80),
      challenge: cleanString(body.challenge, 160),
      submittedAt: new Date().toISOString(),
      ip,
      userAgent: cleanString(req.headers["user-agent"], 240)
    };

    if (name.length < 2 || !isEmail(email) || subject.length < 2 || message.length < 10) {
      return sendJson(res, 400, { error: "Please provide a valid name, email, subject, and message." });
    }

    const turnstilePassed = await verifyTurnstile(turnstileToken, ip);
    if (!turnstilePassed) {
      return sendJson(res, 400, { error: "Security verification failed. Please complete the check and try again." });
    }

    await storeMessage({ senderEmail: email, senderName: name, subject, message, meta });

    const notification = contactNotificationEmail({ name, email, subject, message, meta });
    await sendEmail({
      to: (process.env.CONTACT_NOTIFICATION_EMAILS || "info@contact.fekitech.co.uk,couragechidoka@gmail.com,fekitech01@gmail.com")
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),
      replyTo: email,
      ...notification
    });

    return sendJson(res, 200, { ok: true, message: "Your message has been received. The Fekitech team will follow up shortly." });
  } catch (error) {
    console.error(error);
    return sendJson(res, error.statusCode || 500, { error: "Something went wrong. Please try again or email info@contact.fekitech.co.uk." });
  }
}
