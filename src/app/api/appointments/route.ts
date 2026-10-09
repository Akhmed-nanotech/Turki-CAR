import { parseBookingSubmission } from "@/booking/request";
import { createSupabaseServerClient } from "@/database/server";

export const runtime = "nodejs";

const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

function isUuid(value: unknown): value is string {
  return typeof value === "string" && uuidPattern.test(value);
}

export async function POST(request: Request) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return Response.json({ error: "invalid" }, { status: 400 });
  }

  const submission = parseBookingSubmission(payload);
  if (!submission) {
    return Response.json({ error: "invalid" }, { status: 400 });
  }

  try {
    const supabase = createSupabaseServerClient();
    // The form still collects one vehicle description. Make and model are both
    // required, so that description is stored in both columns until the form splits them.
    const { data, error } = await supabase
      .from("appointments")
      .insert({
        customer_name: submission.customerName,
        customer_phone: submission.customerPhone,
        vehicle_make: submission.vehicle,
        vehicle_model: submission.vehicle,
        vehicle_year: null,
        license_plate: null,
        service_category: submission.serviceCategory,
        service_option: submission.serviceOption,
        appointment_date: submission.appointmentDate,
        appointment_time: submission.appointmentTime,
        status: "pending",
        booking_source: "website",
      })
      .select("id")
      .single();

    if (error || !isUuid(data?.id)) {
      return Response.json({ error: "unavailable" }, { status: 500 });
    }

    return Response.json({ id: data.id }, { status: 201 });
  } catch {
    return Response.json({ error: "unavailable" }, { status: 500 });
  }
}
