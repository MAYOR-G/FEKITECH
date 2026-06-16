import crypto from "node:crypto";

const cookieName = "fekitech_admin_session";
const maxAgeSeconds = 60 * 60 * 8;

function base64url(value) {
  return Buffer.from(value)
    .toString("base64")
    .replaceAll("+", "-")
    .replaceAll("/", "_")
    .replaceAll("=", "");
}

function sign(value) {
  if (!process.env.SESSION_SECRET) {
    throw new Error("SESSION_SECRET is required.");
  }
  return base64url(crypto.createHmac("sha256", process.env.SESSION_SECRET).update(value).digest());
}

function sha256(value) {
  return crypto.createHash("sha256").update(String(value)).digest();
}

export function verifyPassword(password) {
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword) {
    throw new Error("ADMIN_PASSWORD is required.");
  }
  return crypto.timingSafeEqual(sha256(password), sha256(adminPassword));
}

export function createSessionToken(email) {
  const payload = base64url(JSON.stringify({ email, expiresAt: Date.now() + maxAgeSeconds * 1000 }));
  return `${payload}.${sign(payload)}`;
}

export function verifySessionToken(token) {
  if (!token || !token.includes(".")) return null;
  const parts = token.split(".");
  if (parts.length !== 2) return null;

  const payload = parts[0];
  const expected = sign(payload);
  const provided = parts[1];
  const expectedBuffer = Buffer.from(expected);
  const providedBuffer = Buffer.from(provided);

  if (expectedBuffer.length !== providedBuffer.length || !crypto.timingSafeEqual(expectedBuffer, providedBuffer)) {
    return null;
  }

  const session = JSON.parse(Buffer.from(payload.replaceAll("-", "+").replaceAll("_", "/"), "base64").toString("utf8"));
  if (!session.expiresAt || session.expiresAt < Date.now()) {
    return null;
  }
  return session;
}

function getCookie(req, name) {
  const cookieHeader = req.headers.cookie || "";
  return cookieHeader
    .split(";")
    .map((part) => part.trim())
    .find((part) => part.startsWith(`${name}=`))
    ?.slice(name.length + 1);
}

export function requireAdmin(req) {
  const payload = verifySessionToken(getCookie(req, cookieName));
  if (!payload || payload.email !== process.env.ADMIN_EMAIL) {
    const error = new Error("Authentication required.");
    error.statusCode = 401;
    throw error;
  }
  return payload;
}

export function sessionCookie(req, token) {
  const host = req.headers.host || "";
  const secure = host.includes("localhost") || host.includes("127.0.0.1") ? "" : " Secure;";
  return `${cookieName}=${token}; HttpOnly;${secure} SameSite=Lax; Path=/; Max-Age=${maxAgeSeconds}`;
}

export function clearSessionCookie(req) {
  const host = req.headers.host || "";
  const secure = host.includes("localhost") || host.includes("127.0.0.1") ? "" : " Secure;";
  return `${cookieName}=; HttpOnly;${secure} SameSite=Lax; Path=/; Max-Age=0`;
}
