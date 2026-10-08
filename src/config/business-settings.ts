import type { BusinessSettings, Service } from "@/types/entities";

/**
 * Provisional Demo 2.0 defaults. Change workshop capacity, staff, and hours here only.
 * These values are not shown on the public website.
 */
export const demoBusinessSettings: BusinessSettings = {
  schedule: {
    openingTime: "08:30",
    closingTime: "22:00",
    closedWeekdays: ["friday"],
    bookingBufferMinutes: 20,
  },
  capacity: {
    maxVehiclesSimultaneously: 10,
  },
  staffCountByResource: {
    engine: 2,
    suspension: 2,
    auto_electrician: 2,
    detailing: 4,
    inspection: 2,
  },
  intakeDurationMinutes: 30,
};

/**
 * Booking catalog. The public site still uses its own marketing copy.
 * Durations stay null until the workshop sets a standard length.
 * Intake visits use BusinessSettings.intakeDurationMinutes instead.
 * requiredResourceType is a starting assignment; staff can change it on an appointment after intake.
 */
export const demoServices: Service[] = [
  {
    id: "pre-purchase-inspection",
    category: "pre_purchase_inspection",
    scheduling: "fixed",
    requiredResourceType: "inspection",
    defaultDurationMinutes: null,
  },
  {
    id: "mechanical-repair",
    category: "mechanical_repair",
    scheduling: "intake",
    requiredResourceType: "engine",
    defaultDurationMinutes: null,
  },
  {
    id: "ac-repair",
    category: "ac_repair",
    scheduling: "intake",
    requiredResourceType: "auto_electrician",
    defaultDurationMinutes: null,
  },
  {
    id: "oil-and-fluids",
    category: "oil_and_fluids",
    scheduling: "fixed",
    requiredResourceType: "engine",
    defaultDurationMinutes: null,
  },
  {
    id: "detailing",
    category: "detailing",
    scheduling: "fixed",
    requiredResourceType: "detailing",
    defaultDurationMinutes: null,
  },
  {
    id: "wheel-repair",
    category: "wheel_repair",
    scheduling: "intake",
    requiredResourceType: "suspension",
    defaultDurationMinutes: null,
  },
];
