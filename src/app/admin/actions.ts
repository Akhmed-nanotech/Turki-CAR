"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { isSameOriginRequest } from "@/admin/credentials";
import { clearAdminSession, signInAdmin } from "@/admin/session";

export async function login(formData: FormData) {
  const password = formData.get("password");
  const result = await signInAdmin(await headers(), typeof password === "string" ? password : "");
  if (result === "accepted") redirect("/admin");
  redirect(`/admin?e=${result}`);
}

export async function logout() {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host");
  if (isSameOriginRequest(requestHeaders.get("origin"), host)) {
    await clearAdminSession();
  }
  redirect("/admin");
}
