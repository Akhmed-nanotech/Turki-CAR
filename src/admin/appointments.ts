import "server-only";

import { createSupabaseServerClient } from "@/database/server";
import { adminSessionState } from "@/admin/session";

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

const columns =
  "id, appointment_date, appointment_time, customer_name, customer_phone, vehicle_make, vehicle_model, vehicle_year, license_plate, service_category, service_option, status, created_at";

export async function listDiagnosticAppointments() {
  const state = await adminSessionState();
  if (state !== "active") return { state, rows: [] as DiagnosticAppointment[] };

  const supabase = createSupabaseServerClient();
  const { data, error } = await supabase
    .from("appointments")
    .select(columns)
    .order("created_at", { ascending: false })
    .limit(200);

  if (error || !Array.isArray(data)) return { state, rows: null };
  return { state, rows: data as DiagnosticAppointment[] };
}
