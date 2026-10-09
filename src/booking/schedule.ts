import { demoBusinessSettings } from "@/config/business-settings";
import type { Weekday } from "@/types/entities";

const weekdayNames = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
] as const satisfies readonly Weekday[];

const datePattern = /^(\d{4})-(\d{2})-(\d{2})$/;

export const bookingStartTimes = createBookingStartTimes(
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
export function createBookingStartTimes(opening: string, closing: string, intervalMinutes: number) {
  const start = minutesFromClock(opening);
  const end = minutesFromClock(closing);
  const slots: string[] = [];
  for (let minute = start; minute + intervalMinutes <= end; minute += intervalMinutes) {
    slots.push(clockFromMinutes(minute));
  }
  return slots;
}

/** Local calendar date as YYYY-MM-DD. Avoids UTC shifting the day. */
export function localDateInputValue(now = new Date()) {
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function calendarDate(value: string) {
  const match = datePattern.exec(value);
  if (!match) {
    return null;
  }
  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  const date = new Date(year, month - 1, day);
  if (date.getFullYear() !== year || date.getMonth() !== month - 1 || date.getDate() !== day) {
    return null;
  }
  return { weekday: weekdayNames[date.getDay()] };
}

export function isClosedBookingDate(value: string) {
  const date = calendarDate(value);
  if (!date) {
    return false;
  }
  return demoBusinessSettings.schedule.closedWeekdays.includes(date.weekday);
}

export function isPastBookingDate(value: string, today = localDateInputValue()) {
  return value !== "" && value < today;
}

/** A start time has passed only when the chosen day is today on the workshop clock. */
export function isPastBookingTime(date: string, time: string, now = new Date()) {
  const clock = workshopClock(now);
  if (date !== clock.date || !time) {
    return false;
  }
  const [hours, minutes] = time.split(":").map(Number);
  const slotStart = new Date(2000, 0, 1, hours, minutes, 0, 0);
  const current = new Date(2000, 0, 1, clock.hours, clock.minutes, clock.seconds, 0);
  return slotStart.getTime() < current.getTime();
}

export function workshopClock(now = new Date(), timeZone = demoBusinessSettings.schedule.timeZone) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h23",
  }).formatToParts(now);
  const read = (type: Intl.DateTimeFormatPartTypes) => parts.find((part) => part.type === type)?.value ?? "";
  let hours = Number(read("hour"));
  if (hours === 24) {
    hours = 0;
  }
  return {
    date: `${read("year")}-${read("month")}-${read("day")}`,
    hours,
    minutes: Number(read("minute")),
    seconds: Number(read("second")),
  };
}

/** Past dates and times follow the workshop clock, not the server's UTC clock. */
export function isPastWorkshopBooking(date: string, time: string, now = new Date()) {
  const clock = workshopClock(now);
  return isPastBookingDate(date, clock.date) || isPastBookingTime(date, time, now);
}
