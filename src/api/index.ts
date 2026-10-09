/**
 * Shared API types.
 * The booking handler is src/app/api/appointments/route.ts.
 * It reads schedule rules from src/config/business-settings.ts.
 */
export type { Appointment, BusinessSettings, Client, Service, Vehicle } from "@/types/entities";

export { demoBusinessSettings, demoServices } from "@/config/business-settings";
