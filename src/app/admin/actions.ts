"use server";

import { refresh, revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { isSameOriginRequest } from "@/admin/credentials";
import { acceptAppointment, completeRepairOrder, updateRepairStage } from "@/admin/repairs";
import { adminSessionState, clearAdminSession, signInAdmin } from "@/admin/session";

export type AdminMutationReason =
  | "rejected"
  | "unauthenticated"
  | "invalid"
  | "unavailable"
  | "not_pending"
  | "not_ready";

export type AdminMutationResult = { ok: true } | { ok: false; reason: AdminMutationReason };

function allowsMutation(requestHeaders: Headers) {
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host");
  return isSameOriginRequest(requestHeaders.get("origin"), host);
}

function refreshAdmin() {
  revalidatePath("/admin");
  revalidatePath("/admin/pipeline");
  revalidatePath("/admin/history");
  refresh();
}

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

async function authorizedMutation(): Promise<AdminMutationResult | null> {
  const requestHeaders = await headers();
  if (!allowsMutation(requestHeaders)) return { ok: false, reason: "rejected" };
  if ((await adminSessionState()) !== "active") return { ok: false, reason: "unauthenticated" };
  return null;
}

export async function acceptBooking(formData: FormData): Promise<AdminMutationResult> {
  const blocked = await authorizedMutation();
  if (blocked) return blocked;
  const appointmentId = formData.get("appointmentId");
  if (typeof appointmentId !== "string") return { ok: false, reason: "invalid" };
  const result = await acceptAppointment(appointmentId);
  if (result.ok) refreshAdmin();
  return result;
}

export async function changeRepairStage(formData: FormData): Promise<AdminMutationResult> {
  const blocked = await authorizedMutation();
  if (blocked) return blocked;
  const orderId = formData.get("orderId");
  const stage = formData.get("stage");
  if (typeof orderId !== "string" || typeof stage !== "string") return { ok: false, reason: "invalid" };
  const result = await updateRepairStage(orderId, stage);
  if (result.ok) refreshAdmin();
  return result;
}

export async function markRepairDelivered(formData: FormData): Promise<AdminMutationResult> {
  const blocked = await authorizedMutation();
  if (blocked) return blocked;
  const orderId = formData.get("orderId");
  if (typeof orderId !== "string") return { ok: false, reason: "invalid" };
  const result = await completeRepairOrder(orderId);
  if (result.ok) refreshAdmin();
  return result;
}
