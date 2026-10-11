import { connection } from "next/server";
import { redirect } from "next/navigation";
import { listDiagnosticAppointments } from "@/admin/appointments";
import { demoBusinessSettings } from "@/config/business-settings";
import { content } from "@/content/site";
import { login, logout } from "./actions";

export const dynamic = "force-dynamic";
export const revalidate = 0;
export const runtime = "nodejs";

export const metadata = {
  title: "طلبات الحجز",
  robots: { index: false, follow: false },
};

const loginMessages: Record<string, string> = {
  denied: "كلمة المرور غير صحيحة.",
  rejected: "تم رفض طلب تسجيل الدخول.",
  unavailable: "تسجيل الدخول غير متاح.",
};

export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<{ e?: string | string[] }>;
}) {
  await connection();
  const result = await listDiagnosticAppointments();
  if (result.state === "invalid") redirect("/admin/session");
  if (result.state !== "active") {
    const errorCode = (await searchParams).e;
    const message = typeof errorCode === "string" ? loginMessages[errorCode] : undefined;
    return <LoginForm message={message} />;
  }
  return <AppointmentList rows={result.rows} />;
}

function LoginForm({ message }: { message?: string }) {
  return (
    <main className="mx-auto flex min-h-svh w-full max-w-md items-center px-5 py-10">
      <form action={login} className="glass w-full rounded-3xl p-6" lang="ar" dir="rtl">
        <h1 className="text-xl font-semibold text-ink">طلبات الحجز</h1>
        <label className="mt-5 block">
          <span className="mb-1 block text-sm text-muted">كلمة المرور</span>
          <input
            name="password"
            type="password"
            autoComplete="current-password"
            required
            dir="ltr"
            className="min-h-12 w-full rounded-xl border border-white/15 bg-black/40 px-3 text-base text-ink outline-none"
          />
        </label>
        {message ? (
          <p className="mt-3 text-sm text-accent" role="alert">
            {message}
          </p>
        ) : null}
        <button
          type="submit"
          className="mt-5 min-h-12 w-full rounded-full bg-accent px-5 text-sm font-semibold text-on-accent"
        >
          تسجيل الدخول
        </button>
      </form>
    </main>
  );
}

function AppointmentList({
  rows,
}: {
  rows: Awaited<ReturnType<typeof listDiagnosticAppointments>>["rows"];
}) {
  return (
    <main className="mx-auto w-full max-w-6xl px-5 py-8" lang="ar" dir="rtl">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-2xl font-semibold text-ink">طلبات الحجز</h1>
        <form action={logout}>
          <button
            type="submit"
            className="inline-flex min-h-11 items-center rounded-full border border-white/15 px-4 text-sm text-ink"
          >
            تسجيل الخروج
          </button>
        </form>
      </div>
      {rows === null ? (
        <p className="mt-6 text-sm text-accent" role="alert">
          تعذر تحميل قائمة الحجوزات.
        </p>
      ) : rows.length === 0 ? (
        <p className="mt-6 text-sm text-muted">لا توجد طلبات حجز حتى الآن.</p>
      ) : (
        <div className="mt-6 overflow-x-auto rounded-3xl border border-white/10">
          <table className="w-full min-w-[52rem] border-collapse text-start text-sm">
            <thead className="bg-black/40 text-muted">
              <tr>
                {["التاريخ", "الوقت", "الاسم", "الهاتف", "السيارة", "الخدمة", "الحالة", "تاريخ الإنشاء"].map((label) => (
                  <th key={label} className="px-3 py-3 font-medium">
                    {label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.id} className="border-t border-white/10 align-top">
                  <td className="px-3 py-3 text-ink">{row.appointment_date}</td>
                  <td className="px-3 py-3 text-ink">{clockTime(row.appointment_time)}</td>
                  <td className="px-3 py-3 text-ink">{row.customer_name}</td>
                  <td className="px-3 py-3 text-ink" dir="ltr">
                    {row.customer_phone}
                  </td>
                  <td className="px-3 py-3 text-ink">{vehicleLabel(row)}</td>
                  <td className="px-3 py-3 text-ink">{serviceLabel(row.service_category, row.service_option)}</td>
                  <td className="px-3 py-3 text-ink">{statusLabel(row.status)}</td>
                  <td className="px-3 py-3 text-ink">{createdLabel(row.created_at)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}

function clockTime(value: string) {
  return /^\d{2}:\d{2}/.test(value) ? value.slice(0, 5) : value;
}

function vehicleLabel(row: {
  vehicle_make: string;
  vehicle_model: string;
  vehicle_year: number | null;
  license_plate: string | null;
}) {
  const description = row.vehicle_make === row.vehicle_model ? row.vehicle_make : `${row.vehicle_make} ${row.vehicle_model}`;
  const details = [row.vehicle_year, row.license_plate].filter((item) => item !== null && item !== "");
  return details.length > 0 ? `${description} (${details.join(", ")})` : description;
}

function statusLabel(status: string) {
  return status === "pending" ? "قيد الانتظار" : status;
}

function serviceLabel(category: string, option: string | null) {
  const item = content.ar.services.items.find((service) => service.id === category);
  const categoryLabel = item?.title ?? category;
  if (!option) return categoryLabel;
  const optionLabel = item?.options.find((choice) => choice.id === option)?.label ?? option;
  return `${categoryLabel} — ${optionLabel}`;
}

function createdLabel(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat("ar-SA", {
    timeZone: demoBusinessSettings.schedule.timeZone,
    numberingSystem: "latn",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).format(date);
}
