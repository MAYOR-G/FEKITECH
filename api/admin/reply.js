import { requireAdmin } from "../_lib/auth.js";
import { getThread, storeMessage } from "../_lib/db.js";
import { adminReplyEmail, sendEmail } from "../_lib/email.js";
import { cleanString, isEmail, methodNotAllowed, readJson, sendJson } from "../_lib/http.js";

function cleanReplyMessage(value, maxLength = 5000) {
  return String(value || "")
    .replace(/\r\n/g, "\n")
    .replace(/\r/g, "\n")
    .trim()
    .slice(0, maxLength);
}

function getRecipientName(messages) {
  const inboundMessage = [...messages].reverse().find((message) => message.direction !== "admin" && message.name);
  if (!inboundMessage || inboundMessage.name === inboundMessage.email) {
    return "";
  }
  return inboundMessage.name;
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return methodNotAllowed(res, ["POST"]);
  }

  try {
    requireAdmin(req);
    const body = await readJson(req);
    const email = cleanString(body.email, 160).toLowerCase();
    const message = cleanReplyMessage(body.message, 5000);
    const subject = cleanString(body.subject, 160);

    if (!isEmail(email) || message.length < 2) {
      return sendJson(res, 400, { error: "Please provide a valid recipient and reply message." });
    }

    const existingThread = await getThread(email);
    const recipientName = getRecipientName(existingThread);
    const replyEmail = adminReplyEmail({ message, recipientName, subject });

    await sendEmail({
      to: email,
      ...replyEmail
    });

    await storeMessage({
      senderEmail: email,
      senderName: "Fekitech",
      subject: replyEmail.subject,
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
