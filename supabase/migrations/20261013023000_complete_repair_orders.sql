-- Record explicit vehicle handover without adding a stage.
-- completed_at stays null until an order already at delivery is completed.
-- A completed order cannot leave delivery, and completion cannot be combined
-- with the update that first moves the order there.

alter table public.repair_orders
  add column completed_at timestamp with time zone;

alter table public.repair_orders
  add constraint repair_orders_completed_at_delivery
  check (completed_at is null or stage = 'delivery');

create or replace function public.record_repair_stage()
returns trigger
language plpgsql
security invoker
set search_path = pg_catalog, public
as $$
begin
  if tg_when = 'BEFORE' then
    if tg_op = 'UPDATE' then
      if old.completed_at is not null and new.stage is distinct from old.stage then
        raise exception 'completed repair order cannot change stage'
          using errcode = 'check_violation';
      end if;

      if new.completed_at is distinct from old.completed_at
        and not (
          old.completed_at is null
          and new.completed_at is not null
          and old.stage = 'delivery'
          and new.stage is not distinct from old.stage
        ) then
        raise exception 'repair order completion is not allowed'
          using errcode = 'check_violation';
      end if;

      if new.stage is distinct from old.stage then
        new.updated_at := pg_catalog.now();
      end if;
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

-- Complete one order already waiting at delivery. A second call, or a call
-- for any other stage, updates no row and returns null. The stage does not
-- change, so the existing trigger writes no history event.
create function public.complete_repair_order(target uuid)
returns uuid
language plpgsql
security invoker
set search_path = pg_catalog, public
as $$
declare
  completed_id uuid;
begin
  update public.repair_orders
  set completed_at = pg_catalog.now(),
      updated_at = pg_catalog.now()
  where id = target
    and stage = 'delivery'
    and completed_at is null
  returning id into completed_id;

  if not found then
    return null;
  end if;

  return completed_id;
end;
$$;

revoke all on function public.complete_repair_order(uuid) from public, anon, authenticated;
grant execute on function public.complete_repair_order(uuid) to service_role;
