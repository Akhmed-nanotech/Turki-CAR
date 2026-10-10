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
  title: "Booking requests",
  robots: { index: false, follow: false },
};

const loginMessages: Record<string, string> = {
  denied: "The password was not accepted.",
  rejected: "The sign-in request was rejected.",
  unavailable: "Sign-in is unavailable.",
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
      <form action={login} className="glass w-full rounded-3xl p-6" dir="ltr">
        <h1 className="text-xl font-semibold text-ink">Booking requests</h1>
        <label className="mt-5 block">
          <span className="mb-1 block text-sm text-muted">Password</span>
          <input
            name="password"
            type="password"
            autoComplete="current-password"
            required
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
          Sign in
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
    <main className="mx-auto w-full max-w-6xl px-5 py-8" dir="ltr">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-2xl font-semibold text-ink">Booking requests</h1>
        <form action={logout}>
          <button
            type="submit"
            className="inline-flex min-h-11 items-center rounded-full border border-white/15 px-4 text-sm text-ink"
          >
            Log out
          </button>
        </form>
      </div>
      {rows === null ? (
        <p className="mt-6 text-sm text-accent" role="alert">
          The booking list could not be loaded.
        </p>
      ) : rows.length === 0 ? (
        <p className="mt-6 text-sm text-muted">No booking requests yet.</p>
      ) : (
        <div className="mt-6 overflow-x-auto rounded-3xl border border-white/10">
          <table className="w-full min-w-[52rem] border-collapse text-left text-sm">
            <thead className="bg-black/40 text-muted">
              <tr>
                {["Date", "Time", "Name", "Phone", "Vehicle", "Service", "Status", "Created"].map((label) => (
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
                  <td className="px-3 py-3 text-ink">{row.status}</td>
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

function serviceLabel(category: string, option: string | null) {
  const item = content.en.services.items.find((service) => service.id === category);
  const categoryLabel = item?.title ?? category;
  if (!option) return categoryLabel;
  const optionLabel = item?.options.find((choice) => choice.id === option)?.label ?? option;
  return `${categoryLabel} — ${optionLabel}`;
}

function createdLabel(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat("en-GB", {
    timeZone: demoBusinessSettings.schedule.timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).format(date);
}
