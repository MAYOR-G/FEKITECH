import { methodNotAllowed, sendJson } from "./_lib/http.js";

export default function handler(req, res) {
  if (req.method !== "GET") {
    return methodNotAllowed(res, ["GET"]);
  }

  return sendJson(res, 200, {
    siteKey: process.env.CLOUDFLARE_TURNSTILE_SITE_KEY || ""
  });
}
