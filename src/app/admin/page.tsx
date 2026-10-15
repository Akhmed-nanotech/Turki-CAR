import { connection } from "next/server";
import { redirect } from "next/navigation";
import { listDiagnosticAppointments, type AppointmentQueue } from "@/admin/appointments";
import { appointmentListHref, decodePageCursor, isPageCursor, type PageDirection } from "@/admin/list-page";
import { demoBusinessSettings } from "@/config/business-settings";
import { content } from "@/content/site";
import { AdminInterface, type AdminServiceItem } from "./interface";

export const dynamic = "force-dynamic";
export const revalidate = 0;
export const runtime = "nodejs";

export const metadata = {
  title: "طلبات الحجز",
  robots: { index: false, follow: false },
};

function serviceCatalog(locale: "ar" | "en"): AdminServiceItem[] {
  return content[locale].services.items.map((item) => ({
    id: item.id,
    title: item.title,
    options: item.options.map((option) => ({ id: option.id, label: option.label })),
  }));
}

const services = {
  ar: serviceCatalog("ar"),
  en: serviceCatalog("en"),
};

function one(value: string | string[] | undefined) {
  return typeof value === "string" ? value : null;
}

export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<{ e?: string | string[]; queue?: string | string[]; after?: string | string[]; before?: string | string[] }>;
}) {
  await connection();
  const params = await searchParams;
  const queue: AppointmentQueue = one(params.queue) === "accepted" ? "accepted" : "pending";
  const after = one(params.after);
  const before = one(params.before);
  const direction: PageDirection | null = after && !before ? "after" : before && !after ? "before" : null;
  const cursor = direction ? decodePageCursor(after ?? before ?? "") : null;
  const result = await listDiagnosticAppointments({
    queue,
    direction: cursor ? direction : null,
    cursor,
  });
  if (result.state === "invalid") redirect("/admin/session");
  const timeZone = demoBusinessSettings.schedule.timeZone;
  if (result.state !== "active") {
    const errorCode = params.e;
    return (
      <AdminInterface
        services={services}
        timeZone={timeZone}
        signedIn={false}
        errorCode={typeof errorCode === "string" ? errorCode : undefined}
      />
    );
  }
  const rows = result.rows;
  const first = rows?.[0];
  const last = rows && rows.length > 0 ? rows[rows.length - 1] : undefined;
  const previousCursor = first ? { at: first.created_at, id: first.id } : null;
  const nextCursor = last ? { at: last.created_at, id: last.id } : null;
  return (
    <AdminInterface
      services={services}
      timeZone={timeZone}
      signedIn
      rows={rows}
      queue={queue}
      pastEnd={Boolean(cursor) && Array.isArray(rows) && rows.length === 0}
      previousHref={
        result.hasPrevious && previousCursor && isPageCursor(previousCursor)
          ? appointmentListHref(queue, { direction: "before", cursor: previousCursor })
          : null
      }
      nextHref={
        result.hasNext && nextCursor && isPageCursor(nextCursor)
          ? appointmentListHref(queue, { direction: "after", cursor: nextCursor })
          : null
      }
    />
  );
}
