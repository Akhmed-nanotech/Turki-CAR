/**
 * Demo 2.0 domain types. No persistence or booking behavior lives here.
 * Add a service category by extending ServiceCategory and the catalog in
 * src/config/business-settings.ts.
 */

export type Weekday =
  | "sunday"
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday";

export type ResourceType =
  | "engine"
  | "suspension"
  | "auto_electrician"
  | "detailing"
  | "inspection";

export type ServiceCategory =
  | "pre_purchase_inspection"
  | "mechanical_repair"
  | "ac_repair"
  | "oil_and_fluids"
  | "detailing"
  | "wheel_repair";

/** Fixed visits have a known length. Intake visits are a first look; staff set the repair length later. */
export type SchedulingMode = "fixed" | "intake";

export type AppointmentStatus =
  | "requested"
  | "confirmed"
  | "checked_in"
  | "in_progress"
  | "completed"
  | "cancelled";

export type BookingSource = "website" | "phone" | "admin";

/** Intake is the first visit. Work is the repair time assigned after diagnosis. */
export type AppointmentPhase = "intake" | "work";

export interface Client {
  id: string;
  name: string;
  phone: string;
  email: string | null;
}

export interface Vehicle {
  id: string;
  clientId: string;
  make: string;
  model: string;
  year: number | null;
  plateNumber: string | null;
}

export interface Service {
  id: string;
  category: ServiceCategory;
  scheduling: SchedulingMode;
  requiredResourceType: ResourceType;
  /**
   * Length in minutes for a fixed service.
   * Null for intake services: the first appointment uses BusinessSettings.intakeDurationMinutes,
   * and staff fill Appointment.actualDurationMinutes after diagnosis.
   */
  defaultDurationMinutes: number | null;
}

export interface Appointment {
  id: string;
  clientId: string;
  vehicleId: string;
  serviceId: string;
  /** ISO 8601 start instant. */
  startsAt: string;
  status: AppointmentStatus;
  source: BookingSource;
  phase: AppointmentPhase;
  requiredResourceType: ResourceType;
  estimatedDurationMinutes: number;
  /** Null until staff change the duration after diagnosis. */
  actualDurationMinutes: number | null;
}

export interface Resource {
  id: string;
  type: ResourceType;
  name: string;
  active: boolean;
}

export interface BusinessSettings {
  schedule: {
    /** 24-hour HH:mm */
    openingTime: string;
    /** 24-hour HH:mm */
    closingTime: string;
    closedWeekdays: Weekday[];
    bookingBufferMinutes: number;
    /** IANA name for the workshop clock, such as Asia/Riyadh. */
    timeZone: string;
  };
  capacity: {
    maxVehiclesSimultaneously: number;
  };
  staffCountByResource: Record<ResourceType, number>;
  /** Length of the first visit when the customer is not asked to estimate the repair. */
  intakeDurationMinutes: number;
}
