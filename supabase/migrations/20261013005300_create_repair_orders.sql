-- Repair orders created when an admin accepts one website appointment.
-- The appointment row stays in place. History is written by the trigger,
-- in the same transaction as the order insert or stage change.
-- Row Level Security is on and no policies are created. The server secret
-- key bypasses RLS and must stay off the browser.

create table public.repair_orders (
  id uuid primary key default gen_random_uuid(),
  appointment_id uuid not null,
  stage text not null default 'diagnosis',
  accepted_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now(),
  constraint repair_orders_appointment_id_key unique (appointment_id),
  constraint repair_orders_appointment_id_fkey
    foreign key (appointment_id) references public.appointments (id) on delete restrict,
  constraint repair_orders_stage_known
    check (stage in (
      'diagnosis',
      'customer_approval',
      'parts_ordering',
      'repair',
      'washing',
      'delivery'
    ))
);

create table public.repair_order_events (
  id uuid primary key default gen_random_uuid(),
  repair_order_id uuid not null,
  from_stage text,
  to_stage text not null,
  entered_at timestamp with time zone not null default now(),
  constraint repair_order_events_repair_order_id_fkey
    foreign key (repair_order_id) references public.repair_orders (id) on delete restrict,
  constraint repair_order_events_from_stage_known
    check (from_stage is null or from_stage in (
      'diagnosis',
      'customer_approval',
      'parts_ordering',
      'repair',
      'washing',
      'delivery'
    )),
  constraint repair_order_events_to_stage_known
    check (to_stage in (
      'diagnosis',
      'customer_approval',
      'parts_ordering',
      'repair',
      'washing',
      'delivery'
    ))
);

alter table public.repair_orders enable row level security;
alter table public.repair_order_events enable row level security;

revoke all on table public.repair_orders from public, anon, authenticated;
revoke all on table public.repair_order_events from public, anon, authenticated;

grant select, insert, update on table public.repair_orders to service_role;
grant select, insert on table public.repair_order_events to service_role;

grant select (id, status), update (status)
  on table public.appointments to service_role;

-- BEFORE UPDATE changes updated_at before the row is stored.
-- AFTER INSERT or UPDATE writes history only after the new stage has
-- passed the check constraint. The parent row then exists, so the event
-- foreign key can refer to it.
create function public.record_repair_stage()
returns trigger
language plpgsql
security invoker
set search_path = pg_catalog, public
as $$
begin
  if tg_when = 'BEFORE' then
    if tg_op = 'UPDATE' and new.stage is distinct from old.stage then
      new.updated_at := pg_catalog.now();
    end if;
    return new;
  end if;

  if tg_op = 'INSERT' then
    insert into public.repair_order_events (repair_order_id, from_stage, to_stage)
    values (new.id, null, new.stage);
    return null;
  end if;

  if tg_op = 'UPDATE' and new.stage is distinct from old.stage then
    insert into public.repair_order_events (repair_order_id, from_stage, to_stage)
    values (new.id, old.stage, new.stage);
  end if;

  return null;
end;
$$;

create trigger repair_orders_set_updated_at
before update on public.repair_orders
for each row
execute function public.record_repair_stage();

create trigger repair_orders_record_stage
after insert or update on public.repair_orders
for each row
execute function public.record_repair_stage();

-- One transaction: mark the pending appointment accepted, then insert the
-- order. The insert trigger writes the initial diagnosis event. A second
-- call updates no row and returns null. A unique appointment id rolls the
-- whole function back if another insert wins.
create function public.accept_appointment(target uuid)
returns uuid
language plpgsql
security invoker
set search_path = pg_catalog, public
as $$
declare
  order_id uuid;
begin
  update public.appointments
  set status = 'accepted'
  where id = target
    and status = 'pending';

  if not found then
    return null;
  end if;

  insert into public.repair_orders (appointment_id)
  values (target)
  returning id into order_id;

  return order_id;
end;
$$;

revoke all on function public.record_repair_stage() from public, anon, authenticated;
revoke all on function public.accept_appointment(uuid) from public, anon, authenticated;

grant execute on function public.record_repair_stage() to service_role;
grant execute on function public.accept_appointment(uuid) to service_role;
