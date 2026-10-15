import { connection } from "next/server";
import { redirect } from "next/navigation";
import { listRepairOrders } from "@/admin/repairs";
import { decodePageCursor, isPageCursor, pipelineListHref, type PageDirection } from "@/admin/list-page";
import { demoBusinessSettings } from "@/config/business-settings";
import { content } from "@/content/site";
import { AdminInterface, type AdminServiceItem } from "../interface";
import { PipelineInterface } from "./interface";

export const dynamic = "force-dynamic";
export const revalidate = 0;
export const runtime = "nodejs";

export const metadata = {
  title: "مسار الإصلاح",
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

export default async function PipelinePage({
  searchParams,
}: {
  searchParams: Promise<{ e?: string | string[]; after?: string | string[]; before?: string | string[] }>;
}) {
  await connection();
  const params = await searchParams;
  const after = one(params.after);
  const before = one(params.before);
  const direction: PageDirection | null = after && !before ? "after" : before && !after ? "before" : null;
  const cursor = direction ? decodePageCursor(after ?? before ?? "") : null;
  const result = await listRepairOrders({ direction: cursor ? direction : null, cursor });
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
  const previousCursor = first?.updatedAt ? { at: first.updatedAt, id: first.id } : null;
  const nextCursor = last?.updatedAt ? { at: last.updatedAt, id: last.id } : null;
  return (
    <PipelineInterface
      services={services}
      rows={rows}
      pastEnd={Boolean(cursor) && Array.isArray(rows) && rows.length === 0}
      previousHref={
        result.hasPrevious && previousCursor && isPageCursor(previousCursor)
          ? pipelineListHref({ direction: "before", cursor: previousCursor })
          : null
      }
      nextHref={
        result.hasNext && nextCursor && isPageCursor(nextCursor)
          ? pipelineListHref({ direction: "after", cursor: nextCursor })
          : null
      }
    />
  );
}
