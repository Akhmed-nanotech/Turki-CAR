import { content } from "@/content/site";
import type { WorkshopServiceId } from "@/content/site";
import {
  bookingStartTimes,
  calendarDate,
  isClosedBookingDate,
  isPastWorkshopBooking,
} from "@/booking/schedule";

const serviceOptions = new Map<WorkshopServiceId, ReadonlySet<string>>(
  content.en.services.items.map((item) => [item.id, new Set(item.options.map((option) => option.id))]),
);

export type BookingSubmission = {
  customerName: string;
  customerPhone: string;
  vehicle: string;
  serviceCategory: string;
  serviceOption: string;
  appointmentDate: string;
  appointmentTime: string;
};

function text(value: unknown) {
  return typeof value === "string" ? value.trim() : null;
}

function within(value: string, min: number, max: number) {
  return value.length >= min && value.length <= max;
}

/**
 * Server-side check for one diagnostic booking.
 * Lengths match the appointments table. Hours and Friday come from the provisional settings.
 */
export function parseBookingSubmission(input: unknown, now = new Date()): BookingSubmission | null {
  if (!input || typeof input !== "object" || Array.isArray(input)) {
    return null;
  }
  const body = input as Record<string, unknown>;
  const customerName = text(body.customerName);
  const customerPhone = text(body.customerPhone);
  const vehicle = text(body.vehicle);
  const serviceCategory = text(body.serviceCategory);
  const serviceOption = text(body.serviceOption);
  const appointmentDate = text(body.appointmentDate);
  const appointmentTime = text(body.appointmentTime);

  if (
    !customerName ||
    !customerPhone ||
    !vehicle ||
    !serviceCategory ||
    !serviceOption ||
    !appointmentDate ||
    !appointmentTime
  ) {
    return null;
  }
  if (!within(customerName, 1, 200) || !within(customerPhone, 6, 40) || !within(vehicle, 1, 80)) {
    return null;
  }
  if (!within(serviceCategory, 1, 80) || !within(serviceOption, 1, 120)) {
    return null;
  }
  if (!serviceOptions.get(serviceCategory as WorkshopServiceId)?.has(serviceOption)) {
    return null;
  }
  if (!calendarDate(appointmentDate) || isClosedBookingDate(appointmentDate)) {
    return null;
  }
  if (!bookingStartTimes.includes(appointmentTime) || isPastWorkshopBooking(appointmentDate, appointmentTime, now)) {
    return null;
  }

  return {
    customerName,
    customerPhone,
    vehicle,
    serviceCategory,
    serviceOption,
    appointmentDate,
    appointmentTime,
  };
}
