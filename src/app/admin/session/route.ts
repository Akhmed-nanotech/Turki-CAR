import { redirect } from "next/navigation";
import { adminSessionState, clearAdminSession } from "@/admin/session";

export const dynamic = "force-dynamic";
export const revalidate = 0;
export const runtime = "nodejs";

/** Clears an invalid cookie so the login page can render. A valid session is left unchanged. */
export async function GET() {
  if ((await adminSessionState()) === "invalid") {
    await clearAdminSession();
  }
  redirect("/admin");
}
