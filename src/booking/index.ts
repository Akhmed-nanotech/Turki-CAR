/**
 * Booking types and the provisional service catalog.
 * Date and time rules live in src/booking/schedule.ts.
 * The public form saves through src/app/api/appointments/route.ts.
 */
export type {
  Appointment,
  AppointmentPhase,
  AppointmentStatus,
  BookingSource,
  SchedulingMode,
  Service,
  ServiceCategory,
} from "@/types/entities";

export { demoServices } from "@/config/business-settings";
