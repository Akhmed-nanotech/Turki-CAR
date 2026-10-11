"use client";

import { useEffect, useSyncExternalStore } from "react";
import { login, logout } from "./actions";

export type AdminServiceItem = {
  id: string;
  title: string;
  options: { id: string; label: string }[];
};

export type AdminAppointmentRow = {
  id: string;
  appointment_date: string;
  appointment_time: string;
  customer_name: string;
  customer_phone: string;
  vehicle_make: string;
  vehicle_model: string;
  vehicle_year: number | null;
  license_plate: string | null;
  service_category: string;
  service_option: string | null;
  status: string;
  created_at: string;
};

type AdminLocale = "ar" | "en";

type AdminInterfaceProps = {
  services: Record<AdminLocale, AdminServiceItem[]>;
  timeZone: string;
  signedIn: boolean;
  errorCode?: string;
  rows?: AdminAppointmentRow[] | null;
};

const STORAGE_KEY = "turki-admin-locale";

const copy = {
  ar: {
    title: "طلبات الحجز",
    password: "كلمة المرور",
    signIn: "تسجيل الدخول",
    logOut: "تسجيل الخروج",
    loadError: "تعذر تحميل قائمة الحجوزات.",
    empty: "لا توجد طلبات حجز حتى الآن.",
    pending: "قيد الانتظار",
    columns: ["التاريخ", "الوقت", "الاسم", "الهاتف", "السيارة", "الخدمة", "الحالة", "تاريخ الإنشاء"],
    messages: {
      denied: "كلمة المرور غير صحيحة.",
      rejected: "تم رفض طلب تسجيل الدخول.",
      unavailable: "تسجيل الدخول غير متاح.",
    },
    createdLocale: "ar-SA",
  },
  en: {
    title: "Booking requests",
    password: "Password",
    signIn: "Sign in",
    logOut: "Log out",
    loadError: "The booking list could not be loaded.",
    empty: "No booking requests yet.",
    pending: "Pending",
    columns: ["Date", "Time", "Name", "Phone", "Vehicle", "Service", "Status", "Created"],
    messages: {
      denied: "The password was not accepted.",
      rejected: "The sign-in request was rejected.",
      unavailable: "Sign-in is unavailable.",
    },
    createdLocale: "en-GB",
  },
} as const;

let current: AdminLocale = "ar";
let hydrated = false;
const listeners = new Set<() => void>();

function readStored(): AdminLocale {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "ar" || stored === "en") return stored;
  } catch {
    // Keep Arabic when storage is unavailable.
  }
  return "ar";
}

function emit() {
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSnapshot(): AdminLocale {
  return current;
}

function getServerSnapshot(): AdminLocale {
  return "ar";
}

function setAdminLocale(next: AdminLocale) {
  current = next;
  hydrated = true;
  try {
    window.localStorage.setItem(STORAGE_KEY, next);
  } catch {
    // The language still changes for this visit.
  }
  emit();
}

function useAdminLocale() {
  const locale = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  useEffect(() => {
    if (!hydrated) {
      hydrated = true;
      const stored = readStored();
      if (stored !== current) {
        current = stored;
        emit();
      }
    }
  }, []);

  return locale;
}

function loginMessage(locale: AdminLocale, errorCode?: string) {
  if (errorCode !== "denied" && errorCode !== "rejected" && errorCode !== "unavailable") return undefined;
  return copy[locale].messages[errorCode];
}

export function AdminInterface({ services, timeZone, signedIn, errorCode, rows = null }: AdminInterfaceProps) {
  const locale = useAdminLocale();
  const text = copy[locale];

  useEffect(() => {
    const applyTitle = () => {
      if (document.title !== text.title) document.title = text.title;
    };
    applyTitle();
    const titleEl = document.querySelector("title");
    if (!titleEl) return;
    const observer = new MutationObserver(applyTitle);
    observer.observe(titleEl, { childList: true, characterData: true, subtree: true });
    return () => observer.disconnect();
  }, [text.title]);

  return (
    <div lang={locale} dir={locale === "ar" ? "rtl" : "ltr"}>
      {signedIn ? (
        <AppointmentList locale={locale} rows={rows} services={services[locale]} timeZone={timeZone} />
      ) : (
        <LoginForm message={loginMessage(locale, errorCode)} locale={locale} />
      )}
    </div>
  );
}

function LanguageSwitcher({ locale }: { locale: AdminLocale }) {
  return (
    <div className="flex items-center gap-2">
      {(["ar", "en"] as const).map((choice) => (
        <button
          key={choice}
          type="button"
          aria-pressed={locale === choice}
          onClick={() => setAdminLocale(choice)}
          className={`inline-flex min-h-11 items-center rounded-full border border-white/15 px-4 text-sm text-ink ${locale === choice ? "font-semibold" : ""}`}
        >
          {choice === "ar" ? "العربية" : "EN"}
        </button>
      ))}
    </div>
  );
}

function LoginForm({ message, locale }: { message?: string; locale: AdminLocale }) {
  const text = copy[locale];
  return (
    <main className="mx-auto flex min-h-svh w-full max-w-md flex-col justify-center px-5 py-10">
      <div className="mb-4 flex justify-end">
        <LanguageSwitcher locale={locale} />
      </div>
      <form action={login} className="glass w-full rounded-3xl p-6">
        <h1 className="text-xl font-semibold text-ink">{text.title}</h1>
        <label className="mt-5 block">
          <span className="mb-1 block text-sm text-muted">{text.password}</span>
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
          {text.signIn}
        </button>
      </form>
    </main>
  );
}

function AppointmentList({
  locale,
  rows,
  services,
  timeZone,
}: {
  locale: AdminLocale;
  rows: AdminAppointmentRow[] | null;
  services: AdminServiceItem[];
  timeZone: string;
}) {
  const text = copy[locale];
  return (
    <main className="mx-auto w-full max-w-6xl px-5 py-8">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-2xl font-semibold text-ink">{text.title}</h1>
        <div className="flex items-center gap-2">
          <LanguageSwitcher locale={locale} />
          <form action={logout}>
            <button
              type="submit"
              className="inline-flex min-h-11 items-center rounded-full border border-white/15 px-4 text-sm text-ink"
            >
              {text.logOut}
            </button>
          </form>
        </div>
      </div>
      {rows === null ? (
        <p className="mt-6 text-sm text-accent" role="alert">
          {text.loadError}
        </p>
      ) : rows.length === 0 ? (
        <p className="mt-6 text-sm text-muted">{text.empty}</p>
      ) : (
        <div className="mt-6 overflow-x-auto rounded-3xl border border-white/10">
          <table className="w-full min-w-[52rem] border-collapse text-start text-sm">
            <thead className="bg-black/40 text-muted">
              <tr>
                {text.columns.map((label) => (
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
                  <td className="px-3 py-3 text-ink">{serviceLabel(services, row.service_category, row.service_option)}</td>
                  <td className="px-3 py-3 text-ink">{statusLabel(row.status, text.pending)}</td>
                  <td className="px-3 py-3 text-ink">{createdLabel(row.created_at, text.createdLocale, timeZone)}</td>
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

function vehicleLabel(row: Pick<AdminAppointmentRow, "vehicle_make" | "vehicle_model" | "vehicle_year" | "license_plate">) {
  const description = row.vehicle_make === row.vehicle_model ? row.vehicle_make : `${row.vehicle_make} ${row.vehicle_model}`;
  const details = [row.vehicle_year, row.license_plate].filter((item) => item !== null && item !== "");
  return details.length > 0 ? `${description} (${details.join(", ")})` : description;
}

function statusLabel(status: string, pendingLabel: string) {
  return status === "pending" ? pendingLabel : status;
}

function serviceLabel(services: AdminServiceItem[], category: string, option: string | null) {
  const item = services.find((service) => service.id === category);
  const categoryLabel = item?.title ?? category;
  if (!option) return categoryLabel;
  const optionLabel = item?.options.find((choice) => choice.id === option)?.label ?? option;
  return `${categoryLabel} — ${optionLabel}`;
}

function createdLabel(value: string, locale: "ar-SA" | "en-GB", timeZone: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat(locale, {
    timeZone,
    numberingSystem: "latn",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).format(date);
}
