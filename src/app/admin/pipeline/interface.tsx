"use client";

import { useLayoutEffect, useRef, useState, useTransition, type ReactNode } from "react";
import { isRepairStage, repairStages, type RepairStage } from "@/admin/repair-stages";
import {
  AdminHeader,
  AdminScreen,
  clockTime,
  serviceLabel,
  useAdminLocale,
  useAdminTitle,
  vehicleLabel,
  type AdminLocale,
  type AdminServiceItem,
} from "../interface";
import { changeRepairStage } from "../actions";

export type PipelineOrder = {
  id: string;
  stage: RepairStage;
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
    title: "مسار الإصلاح",
    loadError: "تعذر تحميل مسار الإصلاح.",
    emptyStage: "لا توجد سيارات في هذه المرحلة.",
    moveTo: "نقل إلى",
    move: "نقل",
    moved: "تم النقل",
    confirmMove: (label: string) => `نقل هذا الطلب إلى ${label}؟`,
    fields: {
      name: "الاسم",
      phone: "الهاتف",
      vehicle: "السيارة",
      service: "الخدمة",
      appointment: "الموعد",
    },
    moveMessages: {
      rejected: "تم رفض الطلب.",
      unauthenticated: "يلزم تسجيل الدخول.",
      invalid: "المرحلة المختارة غير صالحة.",
      unavailable: "تعذر نقل الطلب.",
      not_pending: "تعذر نقل الطلب.",
    },
  },
  en: {
    title: "Repair pipeline",
    loadError: "The repair pipeline could not be loaded.",
    emptyStage: "No vehicles in this stage.",
    moveTo: "Move to",
    move: "Move",
    moved: "Moved",
    confirmMove: (label: string) => `Move this order to ${label}?`,
    fields: {
      name: "Name",
      phone: "Phone",
      vehicle: "Vehicle",
      service: "Service",
      appointment: "Appointment",
    },
    moveMessages: {
      rejected: "The request was rejected.",
      unauthenticated: "Sign in to continue.",
      invalid: "The selected stage is not valid.",
      unavailable: "The order could not be moved.",
      not_pending: "The order could not be moved.",
    },
  },
} as const;

export function PipelineInterface({
  services,
  rows,
}: {
  services: Record<AdminLocale, AdminServiceItem[]>;
  rows: PipelineOrder[] | null;
}) {
  const locale = useAdminLocale();
  const text = copy[locale];
  useAdminTitle(text.title);

  return (
    <AdminScreen locale={locale} wide>
      <AdminHeader locale={locale} title={text.title} />
      {rows === null ? (
        <p className="mt-6 rounded-lg border border-[#6a3038] bg-[#2a1518] px-4 py-3 text-sm text-[#ffd5d8]" role="alert">
          {text.loadError}
        </p>
      ) : (
        <StageBoard locale={locale}>
          <div className="flex w-max gap-4">
            {repairStages.map((stage) => {
              const orders = rows.filter((order) => order.stage === stage);
              return (
                <section
                  key={stage}
                  className={`flex min-h-64 w-80 shrink-0 flex-col rounded-2xl border border-line bg-raised shadow-[0_18px_40px_rgb(0_0_0/0.38)] ${orders.length > 0 ? "border-t-2 border-t-accent" : "border-t-2 border-t-line"}`}
                >
                  <header className="flex items-center justify-between gap-3 border-b border-line px-4 py-3">
                    <h2 className="text-base font-medium text-ink">{stageLabels[locale][stage]}</h2>
                    <span className="inline-flex min-w-7 items-center justify-center rounded-md bg-[#10141a] px-2 py-0.5 text-sm tabular-nums text-ink">
                      {orders.length}
                    </span>
                  </header>
                  {orders.length === 0 ? (
                    <p className="px-4 py-6 text-sm text-muted">{text.emptyStage}</p>
                  ) : (
                    <ul className="grid gap-3 p-3">
                      {orders.map((order) => (
                        <li key={order.id} className="rounded-xl border border-line bg-surface p-3">
                          <OrderCard order={order} locale={locale} services={services[locale]} />
                        </li>
                      ))}
                    </ul>
                  )}
                </section>
              );
            })}
          </div>
        </StageBoard>
      )}
    </AdminScreen>
  );
}

function StageBoard({ locale, children }: { locale: AdminLocale; children: ReactNode }) {
  const scroller = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const element = scroller.current;
    if (!element) return;
    const distance = element.scrollWidth - element.clientWidth;
    if (locale === "ar") {
      element.scrollLeft = distance;
      if (Math.abs(element.scrollLeft) < 1 && distance > 0) element.scrollLeft = -distance;
    } else {
      element.scrollLeft = 0;
    }
  }, [locale]);

  return (
    <div ref={scroller} className="mt-6 overflow-x-auto pb-3">
      {children}
    </div>
  );
}

function OrderCard({
  order,
  locale,
  services,
}: {
  order: PipelineOrder;
  locale: AdminLocale;
  services: AdminServiceItem[];
}) {
  const text = copy[locale];
  const appointment = order.appointment;
  const fields = [
    { label: text.fields.name, value: appointment.customer_name, ltr: false, primary: true },
    { label: text.fields.phone, value: appointment.customer_phone, ltr: true, primary: false },
    { label: text.fields.vehicle, value: vehicleLabel(appointment), ltr: false, primary: false },
    {
      label: text.fields.service,
      value: serviceLabel(services, appointment.service_category, appointment.service_option),
      ltr: false,
      primary: false,
    },
    {
      label: text.fields.appointment,
      value: `${appointment.appointment_date} ${clockTime(appointment.appointment_time)}`,
      ltr: false,
      primary: false,
    },
  ];

  return (
    <article>
      <dl className="grid gap-2 text-sm leading-5">
        {fields.map((field) => (
          <div key={field.label} className="grid grid-cols-[auto_1fr] gap-x-3">
            <dt className="text-muted">{field.label}</dt>
            <dd className={`min-w-0 ${field.primary ? "font-medium text-ink" : "text-ink"}`} dir={field.ltr ? "ltr" : undefined}>
              {field.value}
            </dd>
          </div>
        ))}
      </dl>
      <StageMove orderId={order.id} stage={order.stage} locale={locale} />
    </article>
  );
}

function StageMove({ orderId, stage, locale }: { orderId: string; stage: RepairStage; locale: AdminLocale }) {
  const text = copy[locale];
  const [failure, setFailure] = useState<string | null>(null);
  const [moved, setMoved] = useState(false);
  const [pending, startTransition] = useTransition();
  const choices = repairStages.filter((item) => item !== stage);

  if (moved) return <p className="mt-3 text-sm text-muted">{text.moved}</p>;

  return (
    <form
      className="mt-3 border-t border-line pt-3"
      onSubmit={(event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const selected = data.get("stage");
        if (typeof selected !== "string" || !isRepairStage(selected) || selected === stage) {
          setFailure(text.moveMessages.invalid);
          return;
        }
        if (!window.confirm(text.confirmMove(stageLabels[locale][selected]))) return;
        startTransition(async () => {
          const result = await changeRepairStage(data);
          if (result.ok) {
            setMoved(true);
            setFailure(null);
            return;
          }
          setFailure(text.moveMessages[result.reason]);
        });
      }}
    >
      <input type="hidden" name="orderId" value={orderId} />
      <label className="block text-sm text-muted" htmlFor={`stage-${orderId}`}>
        {text.moveTo}
      </label>
      <select
        id={`stage-${orderId}`}
        name="stage"
        required
        defaultValue=""
        disabled={pending}
        className="mt-1 min-h-11 w-full rounded-lg border border-line bg-[#10141a] px-3 text-sm text-ink disabled:cursor-not-allowed disabled:text-faint"
      >
        <option value="" disabled>
          {text.moveTo}
        </option>
        {choices.map((choice) => (
          <option key={choice} value={choice}>
            {stageLabels[locale][choice]}
          </option>
        ))}
      </select>
      <button
        type="submit"
        disabled={pending}
        className="mt-2 inline-flex min-h-11 w-full items-center justify-center rounded-lg bg-accent px-4 text-sm font-medium text-on-accent transition-colors hover:bg-accent-strong disabled:cursor-not-allowed disabled:bg-[#5c3036] disabled:text-white/85"
      >
        {text.move}
      </button>
      {failure ? (
        <p className="mt-2 rounded-lg border border-[#6a3038] bg-[#2a1518] px-2 py-1 text-sm text-[#ffd5d8]" role="alert">
          {failure}
        </p>
      ) : null}
    </form>
  );
}
