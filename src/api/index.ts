/**
 * Future HTTP API. Handlers are not implemented.
 * When they are added, they belong in src/app/api as Next.js route handlers
 * and should read settings from src/config/business-settings.ts.
 */
export type { Appointment, BusinessSettings, Client, Service, Vehicle } from "@/types/entities";

export { demoBusinessSettings, demoServices } from "@/config/business-settings";
