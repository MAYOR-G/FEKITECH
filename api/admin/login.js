import { cleanString, isEmail, methodNotAllowed, readJson, sendJson } from "../_lib/http.js";
import { createSessionToken, sessionCookie, verifyPassword } from "../_lib/auth.js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return methodNotAllowed(res, ["POST"]);
  }

  try {
    const body = await readJson(req);
    const email = cleanString(body.email, 160).toLowerCase();
    const password = String(body.password || "");

    if (!isEmail(email) || !password || email !== process.env.ADMIN_EMAIL) {
      return sendJson(res, 401, { error: "Invalid login details." });
    }

    const valid = await verifyPassword(password);
    if (!valid) {
      return sendJson(res, 401, { error: "Invalid login details." });
    }

    res.setHeader("Set-Cookie", sessionCookie(req, createSessionToken(email)));
    return sendJson(res, 200, { ok: true });
  } catch (error) {
    console.error(error);
    return sendJson(res, 500, { error: "Unable to log in right now." });
  }
}
