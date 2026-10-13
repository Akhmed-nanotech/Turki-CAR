import { connection } from "next/server";
import { redirect } from "next/navigation";
import { getCompletedRepair } from "@/admin/repairs";
import { demoBusinessSettings } from "@/config/business-settings";
import { content } from "@/content/site";
import { AdminInterface, type AdminServiceItem } from "../../interface";
import { HistoryDetail } from "../interface";

export const dynamic = "force-dynamic";
export const revalidate = 0;
export const runtime = "nodejs";

export const metadata = {
  title: "سجل الإصلاح",
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

export default async function CompletedRepairPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ e?: string | string[] }>;
}) {
  await connection();
  const { id } = await params;
  const result = await getCompletedRepair(id);
  if (result.state === "invalid") redirect("/admin/session");
  const timeZone = demoBusinessSettings.schedule.timeZone;
  if (result.state !== "active") {
    const errorCode = (await searchParams).e;
    return (
      <AdminInterface
        services={services}
        timeZone={timeZone}
        signedIn={false}
        errorCode={typeof errorCode === "string" ? errorCode : undefined}
      />
    );
  }
  if (result.status === "ready") {
    return <HistoryDetail services={services} timeZone={timeZone} status="ready" detail={result.detail} />;
  }
  return <HistoryDetail services={services} timeZone={timeZone} status={result.status === "missing" ? "missing" : "error"} />;
}
