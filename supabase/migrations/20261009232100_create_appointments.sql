-- Initial diagnostic bookings.
-- Status, source, and service values stay open text so workshop rules can be
-- tightened later without rewriting the table.
-- Row Level Security is on and no policies are created, so the Data API
-- denies access for anon and authenticated roles. The server secret key
-- bypasses RLS and must stay off the browser.

create table public.appointments (
  id uuid primary key default gen_random_uuid(),
  customer_name text not null,
  customer_phone text not null,
  vehicle_make text not null,
  vehicle_model text not null,
  vehicle_year integer,
  license_plate text,
  service_category text not null,
  service_option text,
  appointment_date date not null,
  appointment_time time without time zone not null,
  status text not null default 'pending',
  booking_source text not null default 'website',
  created_at timestamp with time zone not null default now(),
  constraint appointments_customer_name_not_blank
    check (char_length(btrim(customer_name)) between 1 and 200),
  constraint appointments_customer_phone_not_blank
    check (char_length(btrim(customer_phone)) between 6 and 40),
  constraint appointments_vehicle_make_not_blank
    check (char_length(btrim(vehicle_make)) between 1 and 80),
  constraint appointments_vehicle_model_not_blank
    check (char_length(btrim(vehicle_model)) between 1 and 80),
  constraint appointments_vehicle_year_range
    check (vehicle_year is null or vehicle_year between 1886 and 2100),
  constraint appointments_license_plate_not_blank
    check (license_plate is null or char_length(btrim(license_plate)) between 1 and 20),
  constraint appointments_service_category_not_blank
    check (char_length(btrim(service_category)) between 1 and 80),
  constraint appointments_service_option_not_blank
    check (service_option is null or char_length(btrim(service_option)) between 1 and 120),
  constraint appointments_status_not_blank
    check (char_length(btrim(status)) between 1 and 40),
  constraint appointments_booking_source_not_blank
    check (char_length(btrim(booking_source)) between 1 and 40)
);

alter table public.appointments enable row level security;

revoke all on table public.appointments from public, anon, authenticated;
