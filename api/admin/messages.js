import { requireAdmin } from "../_lib/auth.js";
import { getConversations, getThread } from "../_lib/db.js";
import { cleanString, methodNotAllowed, sendJson } from "../_lib/http.js";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return methodNotAllowed(res, ["GET"]);
  }

  try {
    requireAdmin(req);
    const email = cleanString(req.query?.email, 160);
    if (email) {
      return sendJson(res, 200, { messages: await getThread(email) });
    }
    return sendJson(res, 200, { conversations: await getConversations() });
  } catch (error) {
    console.error(error);
    return sendJson(res, error.statusCode || 500, { error: error.statusCode === 401 ? "Authentication required." : "Unable to load messages." });
  }
}
