import "server-only";

import { createSupabaseServerClient } from "@/database/server";
import { adminSessionState } from "@/admin/session";
import { isRepairStage, type RepairStage } from "@/admin/repair-stages";

export type RepairMutationResult =
  | { ok: true }
  | { ok: false; reason: "unauthenticated" | "invalid" | "unavailable" | "not_pending" | "not_ready" };

export type RepairOrder = {
  id: string;
  stage: RepairStage;
  appointment: {
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
  };
};

export type CompletedRepairOrder = RepairOrder & {
  completedAt: string;
};

export type RepairStageEvent = {
  id: string;
  fromStage: RepairStage | null;
  toStage: RepairStage;
  enteredAt: string;
};

export type CompletedRepairDetail = {
  order: CompletedRepairOrder;
  events: RepairStageEvent[];
};

export type CompletedRepairLookup =
  | { state: "active"; status: "ready"; detail: CompletedRepairDetail }
  | { state: "active"; status: "missing" }
  | { state: "active"; status: "unavailable" }
  | { state: "anonymous" | "invalid"; status: "blocked" };

const repairOrderListLimit = 200;
const repairOrderSelection =
  "id, stage, appointment:appointments!repair_orders_appointment_id_fkey(appointment_date, appointment_time, customer_name, customer_phone, vehicle_make, vehicle_model, vehicle_year, license_plate, service_category, service_option)";
const completedRepairSelection =
  "id, stage, completed_at, appointment:appointments!repair_orders_appointment_id_fkey(appointment_date, appointment_time, customer_name, customer_phone, vehicle_make, vehicle_model, vehicle_year, license_plate, service_category, service_option)";

const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

function isUuid(value: string) {
  return uuidPattern.test(value);
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function readText(record: Record<string, unknown>, key: string) {
  const value = record[key];
  return typeof value === "string" ? value : null;
}

function readNullableText(record: Record<string, unknown>, key: string) {
  const value = record[key];
  if (value === null) return null;
  return typeof value === "string" ? value : undefined;
}

function readYear(value: unknown) {
  if (value === null) return null;
  return typeof value === "number" && Number.isFinite(value) ? value : undefined;
}

function readAppointment(value: unknown): RepairOrder["appointment"] | null {
  const source = Array.isArray(value) ? value[0] : value;
  if (!isRecord(source)) return null;
  const appointmentDate = readText(source, "appointment_date");
  const appointmentTime = readText(source, "appointment_time");
  const customerName = readText(source, "customer_name");
  const customerPhone = readText(source, "customer_phone");
  const vehicleMake = readText(source, "vehicle_make");
  const vehicleModel = readText(source, "vehicle_model");
  const serviceCategory = readText(source, "service_category");
  const vehicleYear = readYear(source.vehicle_year);
  const licensePlate = readNullableText(source, "license_plate");
  const serviceOption = readNullableText(source, "service_option");
  if (
    !appointmentDate ||
    !appointmentTime ||
    !customerName ||
    !customerPhone ||
    !vehicleMake ||
    !vehicleModel ||
    !serviceCategory ||
    vehicleYear === undefined ||
    licensePlate === undefined ||
    serviceOption === undefined
  ) {
    return null;
  }
  return {
    appointment_date: appointmentDate,
    appointment_time: appointmentTime,
    customer_name: customerName,
    customer_phone: customerPhone,
    vehicle_make: vehicleMake,
    vehicle_model: vehicleModel,
    vehicle_year: vehicleYear,
    license_plate: licensePlate,
    service_category: serviceCategory,
    service_option: serviceOption,
  };
}

function readRepairOrder(value: unknown): RepairOrder | null {
  if (!isRecord(value)) return null;
  const id = readText(value, "id");
  const stage = readText(value, "stage");
  if (!id || !isUuid(id) || !stage || !isRepairStage(stage)) return null;
  const appointment = readAppointment(value.appointment ?? value.appointments);
  if (!appointment) return null;
  return { id, stage, appointment };
}

function readRepairOrders(data: unknown): RepairOrder[] | null {
  if (!Array.isArray(data)) return null;
  const rows: RepairOrder[] = [];
  for (const item of data) {
    const row = readRepairOrder(item);
    if (!row) return null;
    rows.push(row);
  }
  return rows;
}

function readCompletedRepair(value: unknown): CompletedRepairOrder | null {
  const order = readRepairOrder(value);
  if (!order || !isRecord(value)) return null;
  const completedAt = readText(value, "completed_at");
  if (!completedAt) return null;
  return { ...order, completedAt };
}

function readCompletedRepairs(data: unknown): CompletedRepairOrder[] | null {
  if (!Array.isArray(data)) return null;
  const rows: CompletedRepairOrder[] = [];
  for (const item of data) {
    const row = readCompletedRepair(item);
    if (!row) return null;
    rows.push(row);
  }
  return rows;
}

function readStageEvent(value: unknown): RepairStageEvent | null {
  if (!isRecord(value)) return null;
  const id = readText(value, "id");
  const toStage = readText(value, "to_stage");
  const enteredAt = readText(value, "entered_at");
  if (!id || !isUuid(id) || !toStage || !isRepairStage(toStage) || !enteredAt) return null;
  const fromStage = readFromStage(value.from_stage);
  if (fromStage === undefined) return null;
  return {
    id,
    fromStage,
    toStage,
    enteredAt,
  };
}

function readFromStage(value: unknown): RepairStage | null | undefined {
  if (value === null) return null;
  if (typeof value === "string" && isRepairStage(value)) return value;
  return undefined;
}

function readStageEvents(data: unknown): RepairStageEvent[] | null {
  if (!Array.isArray(data)) return null;
  const events: RepairStageEvent[] = [];
  for (const item of data) {
    const event = readStageEvent(item);
    if (!event) return null;
    events.push(event);
  }
  return events;
}

export async function listRepairOrders() {
  const state = await adminSessionState();
  if (state !== "active") return { state, rows: [] as RepairOrder[] };

  try {
    const supabase = createSupabaseServerClient();
    const { data, error } = await supabase
      .from("repair_orders")
      .select(repairOrderSelection)
      .is("completed_at", null)
      .order("updated_at", { ascending: false })
      .limit(repairOrderListLimit);
    if (error) return { state, rows: null };
    return { state, rows: readRepairOrders(data) };
  } catch {
    return { state, rows: null };
  }
}

export async function acceptAppointment(target: string): Promise<RepairMutationResult> {
  const state = await adminSessionState();
  if (state !== "active") return { ok: false, reason: "unauthenticated" };
  if (!isUuid(target)) return { ok: false, reason: "invalid" };

  try {
    const supabase = createSupabaseServerClient();
    const { data, error } = await supabase.rpc("accept_appointment", { target });
    if (error) return { ok: false, reason: "unavailable" };
    if (data === null) return { ok: false, reason: "not_pending" };
    if (typeof data !== "string" || !isUuid(data)) return { ok: false, reason: "unavailable" };
    return { ok: true };
  } catch {
    return { ok: false, reason: "unavailable" };
  }
}

export async function updateRepairStage(orderId: string, stage: string): Promise<RepairMutationResult> {
  const state = await adminSessionState();
  if (state !== "active") return { ok: false, reason: "unauthenticated" };
  if (!isUuid(orderId) || !isRepairStage(stage)) return { ok: false, reason: "invalid" };

  try {
    const supabase = createSupabaseServerClient();
    const { data, error } = await supabase
      .from("repair_orders")
      .update({ stage })
      .eq("id", orderId)
      .neq("stage", stage)
      .is("completed_at", null)
      .select("id")
      .maybeSingle();
    if (error || !data) return { ok: false, reason: "unavailable" };
    return { ok: true };
  } catch {
    return { ok: false, reason: "unavailable" };
  }
}

export async function completeRepairOrder(orderId: string): Promise<RepairMutationResult> {
  const state = await adminSessionState();
  if (state !== "active") return { ok: false, reason: "unauthenticated" };
  if (!isUuid(orderId)) return { ok: false, reason: "invalid" };

  try {
    const supabase = createSupabaseServerClient();
    const { data, error } = await supabase.rpc("complete_repair_order", { target: orderId });
    if (error) return { ok: false, reason: "unavailable" };
    if (data === null) return { ok: false, reason: "not_ready" };
    if (typeof data !== "string" || !isUuid(data)) return { ok: false, reason: "unavailable" };
    return { ok: true };
  } catch {
    return { ok: false, reason: "unavailable" };
  }
}

export async function listCompletedRepairs() {
  const state = await adminSessionState();
  if (state !== "active") return { state, rows: [] as CompletedRepairOrder[] };

  try {
    const supabase = createSupabaseServerClient();
    const { data, error } = await supabase
      .from("repair_orders")
      .select(completedRepairSelection)
      .not("completed_at", "is", null)
      .order("completed_at", { ascending: false })
      .limit(repairOrderListLimit);
    if (error) return { state, rows: null };
    return { state, rows: readCompletedRepairs(data) };
  } catch {
    return { state, rows: null };
  }
}

export async function getCompletedRepair(orderId: string): Promise<CompletedRepairLookup> {
  const state = await adminSessionState();
  if (state !== "active") return { state, status: "blocked" };
  if (!isUuid(orderId)) return { state, status: "missing" };

  try {
    const supabase = createSupabaseServerClient();
    const { data, error } = await supabase
      .from("repair_orders")
      .select(completedRepairSelection)
      .eq("id", orderId)
      .not("completed_at", "is", null)
      .maybeSingle();
    if (error) return { state, status: "unavailable" };
    const order = data ? readCompletedRepair(data) : null;
    if (!data) return { state, status: "missing" };
    if (!order) return { state, status: "unavailable" };

    const eventsResult = await supabase
      .from("repair_order_events")
      .select("id, from_stage, to_stage, entered_at")
      .eq("repair_order_id", order.id)
      .order("entered_at", { ascending: true });
    if (eventsResult.error) return { state, status: "unavailable" };
    const events = readStageEvents(eventsResult.data);
    if (!events) return { state, status: "unavailable" };
    return { state, status: "ready", detail: { order, events } };
  } catch {
    return { state, status: "unavailable" };
  }
}
