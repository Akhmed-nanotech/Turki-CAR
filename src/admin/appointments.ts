import "server-only";

import { createSupabaseServerClient } from "@/database/server";
import { adminSessionState } from "@/admin/session";
import { keysetQuery, shapeListedPage, type PageCursor, type PageDirection } from "@/admin/list-page";

export type DiagnosticAppointment = {
  id: string;
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
  status: string;
  created_at: string;
};

export type AppointmentQueue = "pending" | "accepted";

const columns =
  "id, appointment_date, appointment_time, customer_name, customer_phone, vehicle_make, vehicle_model, vehicle_year, license_plate, service_category, service_option, status, created_at";

export async function listDiagnosticAppointments(request: {
  queue: AppointmentQueue;
  direction: PageDirection | null;
  cursor: PageCursor | null;
}) {
  const state = await adminSessionState();
  if (state !== "active") return { state, rows: [] as DiagnosticAppointment[], hasPrevious: false, hasNext: false };

  const page = keysetQuery("created_at", request.direction, request.cursor);
  const supabase = createSupabaseServerClient();
  let query = supabase.from("appointments").select(columns).eq("status", request.queue);
  if (page.filter) query = query.or(page.filter);
  const { data, error } = await query
    .order("created_at", { ascending: page.ascending })
    .order("id", { ascending: page.ascending })
    .limit(page.limit);

  if (error || !Array.isArray(data)) return { state, rows: null, hasPrevious: false, hasNext: false };
  const shaped = shapeListedPage(data as DiagnosticAppointment[], request.direction);
  return { state, rows: shaped.rows, hasPrevious: shaped.hasPrevious, hasNext: shaped.hasNext };
}
