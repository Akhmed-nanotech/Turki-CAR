import "server-only";
import { createHash, createHmac, timingSafeEqual } from "node:crypto";

export const ADMIN_COOKIE = "turki_admin";
export const SESSION_TTL_MS = 12 * 60 * 60 * 1000;

export function usableAdminSecrets(
  password: string,
  sessionSecret: string,
  supabaseSecret: string,
  supabaseUrl: string,
) {
  if (!password || !sessionSecret) return null;
  const reused =
    password === sessionSecret ||
    password === supabaseSecret ||
    password === supabaseUrl ||
    sessionSecret === supabaseSecret ||
    sessionSecret === supabaseUrl;
  if (reused) return null;
  return { password, sessionSecret };
}

export function passwordsMatch(expected: string, given: string) {
  if (!expected || !given) return false;
  const left = createHash("sha256").update(expected).digest();
  const right = createHash("sha256").update(given).digest();
  return timingSafeEqual(left, right);
}

export function signAdminSession(secret: string, now = Date.now(), ttlMs = SESSION_TTL_MS) {
  const payload = Buffer.from(JSON.stringify({ exp: now + ttlMs }), "utf8").toString("base64url");
  const signature = createHmac("sha256", secret).update(payload).digest("base64url");
  return `${payload}.${signature}`;
}

export function readAdminSession(secret: string, token: string, now = Date.now()) {
  if (!secret || !token) return false;
  const separator = token.indexOf(".");
  if (separator <= 0 || separator !== token.lastIndexOf(".")) return false;
  const payload = token.slice(0, separator);
  const signature = token.slice(separator + 1);
  const expected = createHmac("sha256", secret).update(payload).digest("base64url");
  const actualBuffer = Buffer.from(signature);
  const expectedBuffer = Buffer.from(expected);
  if (actualBuffer.length !== expectedBuffer.length || !timingSafeEqual(actualBuffer, expectedBuffer)) {
    return false;
  }
  try {
    const body: unknown = JSON.parse(Buffer.from(payload, "base64url").toString("utf8"));
    return (
      !!body &&
      typeof body === "object" &&
      "exp" in body &&
      typeof body.exp === "number" &&
      Number.isFinite(body.exp) &&
      body.exp > now
    );
  } catch {
    return false;
  }
}

export function isSameOriginRequest(origin: string | null, host: string | null) {
  if (!origin || !host) return false;
  try {
    return new URL(origin).host === host.split(",")[0]?.trim();
  } catch {
    return false;
  }
}
