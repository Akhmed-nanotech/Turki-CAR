import "server-only";

import { cookies } from "next/headers";
import {
  ADMIN_COOKIE,
  SESSION_TTL_MS,
  isSameOriginRequest,
  passwordsMatch,
  readAdminSession,
  signAdminSession,
  usableAdminSecrets,
} from "@/admin/credentials";

function cookieOptions() {
  return {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/admin",
    maxAge: SESSION_TTL_MS / 1000,
  };
}

function adminSecrets() {
  return usableAdminSecrets(
    process.env.ADMIN_PASSWORD ?? "",
    process.env.ADMIN_SESSION_SECRET ?? "",
    process.env.SUPABASE_SECRET_KEY ?? "",
    process.env.SUPABASE_URL ?? "",
  );
}

export async function adminSessionState() {
  const jar = await cookies();
  const token = jar.get(ADMIN_COOKIE)?.value;
  if (!token) return "anonymous" as const;
  const secrets = adminSecrets();
  if (!secrets || !readAdminSession(secrets.sessionSecret, token)) return "invalid" as const;
  return "active" as const;
}

export async function clearAdminSession() {
  const jar = await cookies();
  jar.delete({
    name: ADMIN_COOKIE,
    path: "/admin",
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });
}

/**
 * There is no shared store for login attempts, and the forwarded client address
 * is not a verified identity. This function does not enforce a distributed
 * login limit. Origin, password, and session checks are the access controls.
 */
export async function signInAdmin(requestHeaders: Headers, password: string) {
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host");
  if (!isSameOriginRequest(requestHeaders.get("origin"), host)) return "rejected" as const;

  const secrets = adminSecrets();
  if (!secrets) return "unavailable" as const;
  if (password.length > 256 || !passwordsMatch(secrets.password, password)) return "denied" as const;

  const jar = await cookies();
  jar.set(ADMIN_COOKIE, signAdminSession(secrets.sessionSecret), cookieOptions());
  return "accepted" as const;
}
