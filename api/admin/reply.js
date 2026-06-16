import { requireAdmin } from "../_lib/auth.js";
import { getThread, storeMessage } from "../_lib/db.js";
import { sendEmail } from "../_lib/email.js";
import { cleanString, escapeHtml, isEmail, methodNotAllowed, readJson, sendJson } from "../_lib/http.js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return methodNotAllowed(res, ["POST"]);
  }

  try {
    requireAdmin(req);
    const body = await readJson(req);
    const email = cleanString(body.email, 160).toLowerCase();
    const message = cleanString(body.message, 5000);
    const subject = cleanString(body.subject || "Re: Your FekiTech enquiry", 160);

    if (!isEmail(email) || message.length < 2) {
      return sendJson(res, 400, { error: "Please provide a valid recipient and reply message." });
    }

    await sendEmail({
      to: email,
      subject,
      html: `
        <div style="font-family:Arial,sans-serif;line-height:1.6;color:#0f172a;">
          <p style="white-space:pre-wrap;margin:0;">${escapeHtml(message)}</p>
        </div>
      `,
      text: message
    });

    await storeMessage({
      senderEmail: email,
      senderName: "FekiTech",
      subject,
      message,
      direction: "admin",
      meta: { repliedBy: process.env.ADMIN_EMAIL }
    });

    return sendJson(res, 200, { ok: true, messages: await getThread(email) });
  } catch (error) {
    console.error(error);
    return sendJson(res, error.statusCode || 500, { error: error.statusCode === 401 ? "Authentication required." : "Unable to send reply." });
  }
}
