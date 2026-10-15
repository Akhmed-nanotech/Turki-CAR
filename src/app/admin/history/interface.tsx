"use client";

import Link from "next/link";
import { isRepairStage, type RepairStage } from "@/admin/repair-stages";
import {
  AdminHeader,
  AdminScreen,
  clockTime,
  formatAdminDateTime,
  serviceLabel,
  useAdminLocale,
  useAdminTitle,
  vehicleLabel,
  type AdminLocale,
  type AdminServiceItem,
} from "../interface";

export type HistoryOrder = {
  id: string;
  completedAt: string;
  appointment: {
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
  };
};

export type HistoryEvent = {
  id: string;
  fromStage: RepairStage | null;
  toStage: RepairStage;
  enteredAt: string;
};

const stageLabels = {
  ar: {
    diagnosis: "التشخيص",
    customer_approval: "موافقة العميل",
    parts_ordering: "طلب قطع الغيار",
    repair: "الإصلاح",
    washing: "الغسيل",
    delivery: "التسليم",
  },
  en: {
    diagnosis: "Diagnosis",
    customer_approval: "Customer approval",
    parts_ordering: "Parts ordering",
    repair: "Repair",
    washing: "Washing",
    delivery: "Delivery",
  },
} satisfies Record<AdminLocale, Record<RepairStage, string>>;

const copy = {
  ar: {
    title: "سجل الإصلاح",
    loadError: "تعذر تحميل سجل الإصلاح.",
    empty: "لا توجد سيارات مسلّمة حتى الآن.",
    pastEnd: "لا توجد سيارات أقدم في السجل.",
    backToStart: "العودة إلى بداية السجل",
    previous: "السابق",
    next: "التالي",
    missing: "لم يتم العثور على هذا الإصلاح المكتمل.",
    emptyEvents: "لا توجد أحداث مراحل مسجّلة.",
    back: "العودة إلى السجل",
    view: "عرض السجل",
    handedOver: "وقت التسليم",
    stages: "سجل المراحل",
    entered: (label: string) => `الدخول إلى ${label}`,
    moved: (from: string, to: string) => `من ${from} إلى ${to}`,
    fields: {
      name: "الاسم",
      phone: "الهاتف",
      vehicle: "السيارة",
      service: "الخدمة",
      appointment: "الموعد",
    },
    columns: ["الاسم", "الهاتف", "السيارة", "الخدمة", "الموعد", "وقت التسليم", "السجل"],
    dateLocale: "ar-SA",
  },
  en: {
    title: "Repair history",
    loadError: "The repair history could not be loaded.",
    empty: "No vehicles have been handed over yet.",
    pastEnd: "No older completed repairs.",
    backToStart: "Back to the start of history",
    previous: "Previous",
    next: "Next",
    missing: "This completed repair was not found.",
    emptyEvents: "No stage events were recorded.",
    back: "Back to history",
    view: "View history",
    handedOver: "Handed over",
    stages: "Stage history",
    entered: (label: string) => `Entered ${label}`,
    moved: (from: string, to: string) => `${from} to ${to}`,
    fields: {
      name: "Name",
      phone: "Phone",
      vehicle: "Vehicle",
      service: "Service",
      appointment: "Appointment",
    },
    columns: ["Name", "Phone", "Vehicle", "Service", "Appointment", "Handed over", "History"],
    dateLocale: "en-GB",
  },
} as const;

const panel = "rounded-2xl border border-line bg-raised shadow-[0_18px_40px_rgb(0_0_0/0.38)]";

function stageName(locale: AdminLocale, stage: string) {
  return isRepairStage(stage) ? stageLabels[locale][stage] : stage;
}

function eventLabel(locale: AdminLocale, event: HistoryEvent) {
  const text = copy[locale];
  const to = stageName(locale, event.toStage);
  if (event.fromStage === null) return text.entered(to);
  return text.moved(stageName(locale, event.fromStage), to);
}

const quietButton =
  "inline-flex min-h-11 items-center justify-center rounded-lg border border-line bg-surface px-4 text-sm text-ink transition-colors hover:border-[#4a535e]";

export function HistoryInterface({
  services,
  timeZone,
  rows,
  previousHref = null,
  nextHref = null,
  pastEnd = false,
}: {
  services: Record<AdminLocale, AdminServiceItem[]>;
  timeZone: string;
  rows: HistoryOrder[] | null;
  previousHref?: string | null;
  nextHref?: string | null;
  pastEnd?: boolean;
}) {
  const locale = useAdminLocale();
  const text = copy[locale];
  useAdminTitle(text.title);

  return (
    <AdminScreen locale={locale}>
      <AdminHeader locale={locale} title={text.title} />
      {rows === null ? (
        <p className="mt-6 rounded-lg border border-[#6a3038] bg-[#2a1518] px-4 py-3 text-sm text-[#ffd5d8]" role="alert">
          {text.loadError}
        </p>
      ) : pastEnd ? (
        <div className={`${panel} mt-6 px-4 py-8 text-sm text-muted`}>
          <p>{text.pastEnd}</p>
          <Link href="/admin/history" className={`${quietButton} mt-4`}>
            {text.backToStart}
          </Link>
        </div>
      ) : rows.length === 0 ? (
        <p className={`${panel} mt-6 px-4 py-8 text-sm text-muted`}>{text.empty}</p>
      ) : (
        <div className={`${panel} mt-6 overflow-x-auto`}>
          <table className="w-full min-w-[64rem] border-collapse text-start text-sm leading-6">
            <thead className="bg-[#10141a] text-muted">
              <tr>
                {text.columns.map((label) => (
                  <th key={label} className="px-4 py-3 text-start font-medium">
                    {label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => {
                const appointment = row.appointment;
                return (
                  <tr key={row.id} className="border-t border-line align-top">
                    <td className="px-4 py-4 font-medium text-ink">{appointment.customer_name}</td>
                    <td className="px-4 py-4 text-ink tabular-nums" dir="ltr">
                      {appointment.customer_phone}
                    </td>
                    <td className="px-4 py-4 text-muted">{vehicleLabel(appointment)}</td>
                    <td className="px-4 py-4 text-muted">
                      {serviceLabel(services[locale], appointment.service_category, appointment.service_option)}
                    </td>
                    <td className="px-4 py-4 text-ink tabular-nums">
                      {appointment.appointment_date} {clockTime(appointment.appointment_time)}
                    </td>
                    <td className="px-4 py-4 text-ink tabular-nums">
                      {formatAdminDateTime(row.completedAt, text.dateLocale, timeZone)}
                    </td>
                    <td className="px-4 py-4">
                      <Link
                        href={`/admin/history/${row.id}`}
                        className="inline-flex min-h-11 items-center text-sm text-ink underline decoration-line underline-offset-4"
                      >
                        {text.view}
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
      {previousHref || nextHref ? (
        <div className="mt-4 flex flex-wrap gap-2">
          {previousHref ? (
            <Link href={previousHref} className={quietButton}>
              {text.previous}
            </Link>
          ) : null}
          {nextHref ? (
            <Link href={nextHref} className={quietButton}>
              {text.next}
            </Link>
          ) : null}
        </div>
      ) : null}
    </AdminScreen>
  );
}

export function HistoryDetail({
  services,
  timeZone,
  status,
  detail,
}: {
  services: Record<AdminLocale, AdminServiceItem[]>;
  timeZone: string;
  status: "ready" | "missing" | "error";
  detail?: { order: HistoryOrder; events: HistoryEvent[] };
}) {
  const locale = useAdminLocale();
  const text = copy[locale];
  useAdminTitle(text.title);
  const order = status === "ready" ? detail?.order : undefined;

  return (
    <AdminScreen locale={locale}>
      <AdminHeader locale={locale} title={text.title} />
      <p className="mt-6">
        <Link href="/admin/history" className="text-sm text-muted underline decoration-line underline-offset-4">
          {text.back}
        </Link>
      </p>
      {status === "error" || (status === "ready" && !order) ? (
        <p className="mt-4 rounded-lg border border-[#6a3038] bg-[#2a1518] px-4 py-3 text-sm text-[#ffd5d8]" role="alert">
          {text.loadError}
        </p>
      ) : status === "missing" || !order || !detail ? (
        <p className={`${panel} mt-4 px-4 py-8 text-sm text-muted`}>{text.missing}</p>
      ) : (
        <section className={`${panel} mt-4 p-4 sm:p-6`}>
          <h2 className="text-xl font-medium text-ink">{order.appointment.customer_name}</h2>
          <dl className="mt-4 grid gap-3 text-sm leading-6 sm:grid-cols-2">
            <DetailField label={text.fields.phone} value={order.appointment.customer_phone} ltr />
            <DetailField label={text.fields.vehicle} value={vehicleLabel(order.appointment)} />
            <DetailField
              label={text.fields.service}
              value={serviceLabel(services[locale], order.appointment.service_category, order.appointment.service_option)}
            />
            <DetailField
              label={text.fields.appointment}
              value={`${order.appointment.appointment_date} ${clockTime(order.appointment.appointment_time)}`}
            />
            <DetailField label={text.handedOver} value={formatAdminDateTime(order.completedAt, text.dateLocale, timeZone)} />
          </dl>
          <h3 className="mt-8 text-base font-medium text-ink">{text.stages}</h3>
          {detail.events.length === 0 ? (
            <p className="mt-3 text-sm text-muted">{text.emptyEvents}</p>
          ) : (
            <ol className="mt-3 grid gap-2">
              {detail.events.map((event) => (
                <li key={event.id} className="rounded-xl border border-line bg-surface px-4 py-3">
                  <p className="text-sm text-ink">{eventLabel(locale, event)}</p>
                  <p className="mt-1 text-sm tabular-nums text-muted">
                    {formatAdminDateTime(event.enteredAt, text.dateLocale, timeZone)}
                  </p>
                </li>
              ))}
            </ol>
          )}
        </section>
      )}
    </AdminScreen>
  );
}

function DetailField({ label, value, ltr = false }: { label: string; value: string; ltr?: boolean }) {
  return (
    <div>
      <dt className="text-muted">{label}</dt>
      <dd className="text-ink" dir={ltr ? "ltr" : undefined}>
        {value}
      </dd>
    </div>
  );
}
