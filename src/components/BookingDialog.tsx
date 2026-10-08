"use client";

import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import { demoBusinessSettings } from "@/config/business-settings";
import type { SiteCopy } from "@/content/site";

type BookingCopy = SiteCopy["services"]["booking"];

const bookingStartTimes = createBookingStartTimes(
  demoBusinessSettings.schedule.openingTime,
  demoBusinessSettings.schedule.closingTime,
  demoBusinessSettings.schedule.bookingBufferMinutes,
);

function minutesFromClock(value: string) {
  const [hours, minutes] = value.split(":").map(Number);
  return hours * 60 + minutes;
}

function clockFromMinutes(total: number) {
  const hours = Math.floor(total / 60);
  const minutes = total % 60;
  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
}

/** Start times only. A slot must finish by closing, so 22:00 is not selectable. */
function createBookingStartTimes(opening: string, closing: string, intervalMinutes: number) {
  const start = minutesFromClock(opening);
  const end = minutesFromClock(closing);
  const slots: string[] = [];
  for (let minute = start; minute + intervalMinutes <= end; minute += intervalMinutes) {
    slots.push(clockFromMinutes(minute));
  }
  return slots;
}

export function BookingDialog({
  category,
  option,
  copy,
  onClose,
}: {
  category: string;
  option: string;
  copy: BookingCopy;
  onClose: () => void;
}) {
  const titleId = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [vehicle, setVehicle] = useState("");
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const previous = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const field = panelRef.current?.querySelector<HTMLElement>("input");
    (field ?? panelRef.current?.querySelector<HTMLElement>("button"))?.focus();

    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
        return;
      }
      if (event.key !== "Tab" || !panelRef.current) {
        return;
      }
      const focusable = [...panelRef.current.querySelectorAll<HTMLElement>("button, input, textarea, select")].filter(
        (element) => !element.hidden,
      );
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (!first || !last) {
        return;
      }
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKey);
      previous?.focus();
    };
  }, [onClose]);

  function confirmBooking(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!date || !bookingStartTimes.includes(time) || !name.trim() || !phone.trim() || !vehicle.trim()) {
      setError(copy.missing);
      return;
    }
    setError("");
    setSubmitted(true);
  }

  return (
    <div className="booking-layer fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:p-6">
      <button
        type="button"
        className="absolute inset-0 bg-black/65"
        aria-label={copy.close}
        onClick={onClose}
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="booking-panel glass relative max-h-[92vh] w-full max-w-md overflow-y-auto rounded-t-3xl p-5 sm:rounded-3xl sm:p-6"
      >
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-sm text-muted">{category}</p>
            <h3 id={titleId} className="mt-1 text-xl font-semibold text-ink">
              {option}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-white/15 text-sm text-ink"
          >
            {copy.close}
          </button>
        </div>

        {submitted ? (
          <div className="mt-5">
            <p className="text-sm font-medium text-accent">{copy.summary}</p>
            <dl className="mt-3 space-y-2 text-sm">
              <SummaryRow label={copy.date} value={date} />
              <SummaryRow label={copy.time} value={time} ltr />
              <SummaryRow label={copy.name} value={name} />
              <SummaryRow label={copy.phone} value={phone} ltr />
              <SummaryRow label={copy.vehicle} value={vehicle} />
            </dl>
          </div>
        ) : (
          <form className="mt-5 space-y-3" onSubmit={confirmBooking}>
            <p className="text-sm text-muted">{copy.title}</p>
            <Field label={copy.date} value={date} type="date" onChange={setDate} />
            <TimeSlotField label={copy.time} value={time} slots={bookingStartTimes} onChange={setTime} />
            <Field label={copy.name} value={name} type="text" onChange={setName} autoComplete="name" />
            <Field
              label={copy.phone}
              value={phone}
              type="tel"
              onChange={setPhone}
              autoComplete="tel"
              ltr
            />
            <Field label={copy.vehicle} value={vehicle} type="text" onChange={setVehicle} />
            {error ? (
              <p className="text-sm text-accent" role="alert">
                {error}
              </p>
            ) : null}
            <button type="submit" className="min-h-12 w-full rounded-full bg-accent px-5 text-sm font-semibold text-on-accent transition duration-200 hover:bg-accent-strong active:translate-y-px motion-reduce:transition-none">
              {copy.confirm}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  type,
  onChange,
  autoComplete,
  ltr = false,
}: {
  label: string;
  value: string;
  type: string;
  onChange: (value: string) => void;
  autoComplete?: string;
  ltr?: boolean;
}) {
  const id = useId();
  return (
    <label htmlFor={id} className="block">
      <span className="mb-1 block text-sm text-muted">{label}</span>
      <input
        id={id}
        type={type}
        value={value}
        autoComplete={autoComplete}
        dir={ltr || type === "date" || type === "time" || type === "tel" ? "ltr" : undefined}
        onChange={(event) => onChange(event.target.value)}
        className="min-h-12 w-full rounded-xl border border-white/15 bg-black/40 px-3 text-base text-ink outline-none"
      />
    </label>
  );
}

function TimeSlotField({
  label,
  value,
  slots,
  onChange,
}: {
  label: string;
  value: string;
  slots: readonly string[];
  onChange: (value: string) => void;
}) {
  const id = useId();
  return (
    <label htmlFor={id} className="block">
      <span className="mb-1 block text-sm text-muted">{label}</span>
      <select
        id={id}
        value={value}
        dir="ltr"
        onChange={(event) => onChange(event.target.value)}
        className="min-h-12 w-full appearance-none rounded-xl border border-white/15 bg-black/40 bg-[length:0.7rem] bg-[position:right_0.85rem_center] bg-no-repeat pe-10 ps-3 text-base text-ink outline-none [color-scheme:dark]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 8'%3E%3Cpath fill='%23f5f6f8' d='M1.2 1.4 6 6.2 10.8 1.4'/%3E%3C/svg%3E\")",
        }}
      >
        <option value="" />
        {slots.map((slot) => (
          <option key={slot} value={slot}>
            {slot}
          </option>
        ))}
      </select>
    </label>
  );
}

function SummaryRow({ label, value, ltr = false }: { label: string; value: string; ltr?: boolean }) {
  return (
    <div className="flex items-baseline justify-between gap-4">
      <dt className="text-muted">{label}</dt>
      <dd className="text-end text-ink" dir={ltr ? "ltr" : undefined}>
        {value}
      </dd>
    </div>
  );
}
