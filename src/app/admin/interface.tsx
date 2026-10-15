"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, useSyncExternalStore, useTransition, type ReactNode } from "react";
import { acceptBooking, login, logout } from "./actions";

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

export type AdminLocale = "ar" | "en";

type AdminInterfaceProps = {
  services: Record<AdminLocale, AdminServiceItem[]>;
  timeZone: string;
  signedIn: boolean;
  errorCode?: string;
  rows?: AdminAppointmentRow[] | null;
  queue?: "pending" | "accepted";
  previousHref?: string | null;
  nextHref?: string | null;
  pastEnd?: boolean;
};

const STORAGE_KEY = "turki-admin-locale";

const copy = {
  ar: {
    brand: "تركي كار",
    title: "طلبات الحجز",
    password: "كلمة المرور",
    signIn: "تسجيل الدخول",
    logOut: "تسجيل الخروج",
    loadError: "تعذر تحميل قائمة الحجوزات.",
    emptyPending: "لا توجد طلبات قيد الانتظار.",
    emptyAccepted: "لا توجد طلبات مقبولة.",
    pastEnd: "لا توجد طلبات أخرى في هذه القائمة.",
    backToStart: "العودة إلى البداية",
    previous: "السابق",
    next: "التالي",
    queuePending: "قيد الانتظار",
    queueAccepted: "تم القبول",
    pending: "قيد الانتظار",
    accepted: "تم القبول",
    accept: "قبول",
    action: "قبول",
    nav: { bookings: "طلبات الحجز", pipeline: "مسار الإصلاح", history: "سجل الإصلاح" },
    acceptMessages: {
      rejected: "تم رفض الطلب.",
      unauthenticated: "يلزم تسجيل الدخول.",
      invalid: "الطلب غير صالح.",
      unavailable: "تعذر قبول الحجز.",
      not_pending: "لم يعد هذا الحجز قيد الانتظار.",
      not_ready: "تعذر قبول الحجز.",
    },
    columns: ["التاريخ", "الوقت", "الاسم", "الهاتف", "السيارة", "الخدمة", "الحالة", "تاريخ الإنشاء"],
    messages: {
      denied: "كلمة المرور غير صحيحة.",
      rejected: "تم رفض طلب تسجيل الدخول.",
      unavailable: "تسجيل الدخول غير متاح.",
    },
    createdLocale: "ar-SA",
  },
  en: {
    brand: "Turki Car",
    title: "Booking requests",
    password: "Password",
    signIn: "Sign in",
    logOut: "Log out",
    loadError: "The booking list could not be loaded.",
    emptyPending: "No pending bookings.",
    emptyAccepted: "No accepted bookings.",
    pastEnd: "No further bookings in this list.",
    backToStart: "Back to the start",
    previous: "Previous",
    next: "Next",
    queuePending: "Pending",
    queueAccepted: "Accepted",
    pending: "Pending",
    accepted: "Accepted",
    accept: "Accept",
    action: "Accept",
    nav: { bookings: "Booking requests", pipeline: "Repair pipeline", history: "Repair history" },
    acceptMessages: {
      rejected: "The request was rejected.",
      unauthenticated: "Sign in to continue.",
      invalid: "The request was not valid.",
      unavailable: "The booking could not be accepted.",
      not_pending: "This booking is no longer pending.",
      not_ready: "The booking could not be accepted.",
    },
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

export function useAdminLocale() {
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

export function useAdminTitle(title: string) {
  useEffect(() => {
    const applyTitle = () => {
      if (document.title !== title) document.title = title;
    };
    applyTitle();
    const titleEl = document.querySelector("title");
    if (!titleEl) return;
    const observer = new MutationObserver(applyTitle);
    observer.observe(titleEl, { childList: true, characterData: true, subtree: true });
    return () => observer.disconnect();
  }, [title]);
}

const panel = "rounded-2xl border border-line bg-raised shadow-[0_18px_40px_rgb(0_0_0/0.38)]";
const primaryButton =
  "inline-flex min-h-11 items-center justify-center rounded-lg bg-accent px-4 text-sm font-medium text-on-accent transition-colors hover:bg-accent-strong disabled:cursor-not-allowed disabled:bg-[#5c3036] disabled:text-white/85";
const quietButton =
  "inline-flex min-h-11 items-center justify-center rounded-lg border border-line bg-surface px-4 text-sm text-ink transition-colors hover:border-[#4a535e] disabled:cursor-not-allowed disabled:text-faint";

export function AdminScreen({
  locale,
  wide = false,
  children,
}: {
  locale: AdminLocale;
  wide?: boolean;
  children: ReactNode;
}) {
  return (
    <div lang={locale} dir={locale === "ar" ? "rtl" : "ltr"} className="relative min-h-svh text-ink [color-scheme:dark]">
      <div className="pointer-events-none fixed inset-0 z-0 bg-[#07090d]/92" aria-hidden="true" />
      <div className={`relative z-10 mx-auto w-full px-4 py-6 sm:px-6 lg:px-8 ${wide ? "max-w-[100rem]" : "max-w-7xl"}`}>
        {children}
      </div>
    </div>
  );
}

export function AdminInterface({
  services,
  timeZone,
  signedIn,
  errorCode,
  rows = null,
  queue = "pending",
  previousHref = null,
  nextHref = null,
  pastEnd = false,
}: AdminInterfaceProps) {
  const locale = useAdminLocale();
  const text = copy[locale];
  useAdminTitle(text.title);

  return (
    <AdminScreen locale={locale}>
      {signedIn ? (
        <AppointmentList
          locale={locale}
          rows={rows}
          services={services[locale]}
          timeZone={timeZone}
          queue={queue}
          previousHref={previousHref}
          nextHref={nextHref}
          pastEnd={pastEnd}
        />
      ) : (
        <LoginForm message={loginMessage(locale, errorCode)} locale={locale} />
      )}
    </AdminScreen>
  );
}

function LanguageSwitcher({ locale }: { locale: AdminLocale }) {
  return (
    <div className="inline-flex rounded-lg border border-line bg-[#10141a] p-1">
      {(["ar", "en"] as const).map((choice) => (
        <button
          key={choice}
          type="button"
          aria-pressed={locale === choice}
          onClick={() => setAdminLocale(choice)}
          className={`inline-flex min-h-10 items-center rounded-md px-3 text-sm ${locale === choice ? "bg-surface text-ink shadow-[inset_0_-2px_0_var(--accent)]" : "text-muted"}`}
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
    <main className="mx-auto flex min-h-[calc(100svh-3rem)] w-full max-w-md flex-col justify-center">
      <div className="mb-4 flex justify-end">
        <LanguageSwitcher locale={locale} />
      </div>
      <form action={login} className={`${panel} w-full p-6 sm:p-8`}>
        <p className="text-sm text-muted">{text.brand}</p>
        <h1 className="mt-1 text-2xl font-semibold tracking-tight text-ink">{text.title}</h1>
        <label className="mt-6 block">
          <span className="mb-2 block text-sm text-muted">{text.password}</span>
          <input
            name="password"
            type="password"
            autoComplete="current-password"
            required
            dir="ltr"
            className="min-h-12 w-full rounded-lg border border-line bg-[#10141a] px-3 text-base text-ink outline-none"
          />
        </label>
        {message ? (
          <p className="mt-4 rounded-lg border border-[#6a3038] bg-[#2a1518] px-3 py-2 text-sm text-[#ffd5d8]" role="alert">
            {message}
          </p>
        ) : null}
        <button type="submit" className={`${primaryButton} mt-6 w-full`}>
          {text.signIn}
        </button>
      </form>
    </main>
  );
}

export function AdminHeader({ locale, title }: { locale: AdminLocale; title: string }) {
  const text = copy[locale];
  return (
    <header>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="min-w-0">
          <p className="text-sm text-muted">{text.brand}</p>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight text-ink sm:text-3xl">{title}</h1>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <LanguageSwitcher locale={locale} />
          <form action={logout}>
            <button type="submit" className={quietButton}>
              {text.logOut}
            </button>
          </form>
        </div>
      </div>
      <AdminNav locale={locale} />
    </header>
  );
}

function AdminNav({ locale }: { locale: AdminLocale }) {
  const pathname = usePathname();
  const text = copy[locale].nav;
  const links = [
    { href: "/admin", label: text.bookings, current: pathname === "/admin" },
    { href: "/admin/pipeline", label: text.pipeline, current: pathname === "/admin/pipeline" },
    {
      href: "/admin/history",
      label: text.history,
      current: pathname === "/admin/history" || pathname.startsWith("/admin/history/"),
    },
  ];
  return (
    <nav className="mt-6 flex gap-1 overflow-x-auto border-b border-line">
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          aria-current={link.current ? "page" : undefined}
          className={`inline-flex min-h-11 shrink-0 items-center border-b-2 px-3 text-sm ${link.current ? "border-accent text-ink" : "border-transparent text-muted"}`}
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
}

function AppointmentList({
  locale,
  rows,
  services,
  timeZone,
  queue,
  previousHref,
  nextHref,
  pastEnd,
}: {
  locale: AdminLocale;
  rows: AdminAppointmentRow[] | null;
  services: AdminServiceItem[];
  timeZone: string;
  queue: "pending" | "accepted";
  previousHref: string | null;
  nextHref: string | null;
  pastEnd: boolean;
}) {
  const text = copy[locale];
  const startHref = queue === "accepted" ? "/admin?queue=accepted" : "/admin";
  return (
    <section>
      <AdminHeader locale={locale} title={text.title} />
      <div className="mt-6 inline-flex rounded-lg border border-line bg-[#10141a] p-1">
        {(
          [
            ["pending", "/admin", text.queuePending],
            ["accepted", "/admin?queue=accepted", text.queueAccepted],
          ] as const
        ).map(([key, href, label]) => (
          <Link
            key={key}
            href={href}
            aria-current={queue === key ? "page" : undefined}
            className={`inline-flex min-h-10 items-center rounded-md px-3 text-sm ${queue === key ? "bg-surface text-ink shadow-[inset_0_-2px_0_var(--accent)]" : "text-muted"}`}
          >
            {label}
          </Link>
        ))}
      </div>
      {rows === null ? (
        <p className="mt-6 rounded-lg border border-[#6a3038] bg-[#2a1518] px-4 py-3 text-sm text-[#ffd5d8]" role="alert">
          {text.loadError}
        </p>
      ) : pastEnd ? (
        <div className={`${panel} mt-6 px-4 py-8 text-sm text-muted`}>
          <p>{text.pastEnd}</p>
          <Link href={startHref} className={`${quietButton} mt-4`}>
            {text.backToStart}
          </Link>
        </div>
      ) : rows.length === 0 ? (
        <p className={`${panel} mt-6 px-4 py-8 text-sm text-muted`}>
          {queue === "accepted" ? text.emptyAccepted : text.emptyPending}
        </p>
      ) : (
        <div className={`${panel} mt-6 overflow-x-auto`}>
          <table className="w-full min-w-[68rem] border-collapse text-start text-sm leading-6">
            <thead className="bg-[#10141a] text-muted">
              <tr>
                {text.columns.map((label) => (
                  <th key={label} className="px-4 py-3 text-start font-medium">
                    {label}
                  </th>
                ))}
                <th className="px-4 py-3 text-start font-medium">{text.action}</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.id} className="border-t border-line align-top">
                  <td className="px-4 py-4 text-ink tabular-nums">{row.appointment_date}</td>
                  <td className="px-4 py-4 text-ink tabular-nums">{clockTime(row.appointment_time)}</td>
                  <td className="px-4 py-4 font-medium text-ink">{row.customer_name}</td>
                  <td className="px-4 py-4 text-ink tabular-nums" dir="ltr">
                    {row.customer_phone}
                  </td>
                  <td className="px-4 py-4 text-muted">{vehicleLabel(row)}</td>
                  <td className="px-4 py-4 text-muted">{serviceLabel(services, row.service_category, row.service_option)}</td>
                  <td className="px-4 py-4">
                    <StatusBadge status={row.status} labels={text} />
                  </td>
                  <td className="px-4 py-4 text-muted tabular-nums">{createdLabel(row.created_at, text.createdLocale, timeZone)}</td>
                  <td className="px-4 py-4">
                    {row.status === "pending" ? <AcceptControl appointmentId={row.id} locale={locale} /> : null}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <PageLinks previousHref={previousHref} nextHref={nextHref} previousLabel={text.previous} nextLabel={text.next} />
    </section>
  );
}

function PageLinks({
  previousHref,
  nextHref,
  previousLabel,
  nextLabel,
}: {
  previousHref: string | null;
  nextHref: string | null;
  previousLabel: string;
  nextLabel: string;
}) {
  if (!previousHref && !nextHref) return null;
  return (
    <div className="mt-4 flex flex-wrap gap-2">
      {previousHref ? (
        <Link href={previousHref} className={quietButton}>
          {previousLabel}
        </Link>
      ) : null}
      {nextHref ? (
        <Link href={nextHref} className={quietButton}>
          {nextLabel}
        </Link>
      ) : null}
    </div>
  );
}

function AcceptControl({ appointmentId, locale }: { appointmentId: string; locale: AdminLocale }) {
  const text = copy[locale];
  const [failure, setFailure] = useState<string | null>(null);
  const [accepted, setAccepted] = useState(false);
  const [pending, startTransition] = useTransition();

  if (accepted) return <StatusBadge status="accepted" labels={text} />;

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        startTransition(async () => {
          const result = await acceptBooking(data);
          if (result.ok) {
            setAccepted(true);
            setFailure(null);
            return;
          }
          setFailure(text.acceptMessages[result.reason]);
        });
      }}
    >
      <input type="hidden" name="appointmentId" value={appointmentId} />
      <button type="submit" disabled={pending} className={primaryButton}>
        {text.accept}
      </button>
      {failure ? (
        <p className="mt-2 max-w-48 rounded-lg border border-[#6a3038] bg-[#2a1518] px-2 py-1 text-sm text-[#ffd5d8]" role="alert">
          {failure}
        </p>
      ) : null}
    </form>
  );
}

export function clockTime(value: string) {
  return /^\d{2}:\d{2}/.test(value) ? value.slice(0, 5) : value;
}

export function vehicleLabel(row: Pick<AdminAppointmentRow, "vehicle_make" | "vehicle_model" | "vehicle_year" | "license_plate">) {
  const description = row.vehicle_make === row.vehicle_model ? row.vehicle_make : `${row.vehicle_make} ${row.vehicle_model}`;
  const details = [row.vehicle_year, row.license_plate].filter((item) => item !== null && item !== "");
  return details.length > 0 ? `${description} (${details.join(", ")})` : description;
}

function StatusBadge({ status, labels }: { status: string; labels: { pending: string; accepted: string } }) {
  const tone =
    status === "pending"
      ? "border-[#6a5424] bg-[#2a2416] text-[#f6e7c1]"
      : status === "accepted"
        ? "border-[#3d6b54] bg-[#143026] text-[#d7efe4]"
        : "border-line bg-[#10141a] text-ink";
  return (
    <span className={`inline-flex items-center rounded-md border px-2 py-1 text-xs font-medium leading-5 ${tone}`}>
      {statusLabel(status, labels)}
    </span>
  );
}

function statusLabel(status: string, labels: { pending: string; accepted: string }) {
  if (status === "pending") return labels.pending;
  if (status === "accepted") return labels.accepted;
  return status;
}

export function serviceLabel(services: AdminServiceItem[], category: string, option: string | null) {
  const item = services.find((service) => service.id === category);
  const categoryLabel = item?.title ?? category;
  if (!option) return categoryLabel;
  const optionLabel = item?.options.find((choice) => choice.id === option)?.label ?? option;
  return `${categoryLabel} — ${optionLabel}`;
}

export function formatAdminDateTime(value: string, locale: "ar-SA" | "en-GB", timeZone: string) {
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

function createdLabel(value: string, locale: "ar-SA" | "en-GB", timeZone: string) {
  return formatAdminDateTime(value, locale, timeZone);
}
