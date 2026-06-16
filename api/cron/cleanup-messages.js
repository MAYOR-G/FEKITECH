import { deleteMessagesOlderThan } from "../_lib/db.js";
import { methodNotAllowed, sendJson } from "../_lib/http.js";

function isAuthorised(req) {
  const expected = process.env.CRON_SECRET;
  if (!expected) return false;
  const header = req.headers.authorization || "";
  return header === `Bearer ${expected}`;
}

export default async function handler(req, res) {
  if (req.method !== "GET" && req.method !== "POST") {
    return methodNotAllowed(res, ["GET", "POST"]);
  }

  if (!isAuthorised(req)) {
    return sendJson(res, 401, { error: "Unauthorized cleanup request." });
  }

  try {
    const deleted = await deleteMessagesOlderThan(90);
    return sendJson(res, 200, { ok: true, deleted });
  } catch (error) {
    console.error(error);
    return sendJson(res, 500, { error: "Unable to run cleanup." });
  }
}
