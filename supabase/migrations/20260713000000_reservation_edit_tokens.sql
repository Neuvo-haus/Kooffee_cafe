create extension if not exists "pgcrypto";

alter table public.reservations
add column if not exists edit_token_hash text,
add column if not exists edit_token_created_at timestamptz not null default now();

create index if not exists reservations_edit_token_hash_idx
on public.reservations (edit_token_hash)
where edit_token_hash is not null;

create or replace function public.hash_reservation_edit_token(token text)
returns text
language sql
stable
as $$
  select encode(digest(coalesce(token, ''), 'sha256'), 'hex')
$$;

create or replace function public.request_reservation_edit_token_hash()
returns text
language plpgsql
stable
as $$
declare
  request_headers json;
  raw_token text;
begin
  begin
    request_headers := nullif(current_setting('request.headers', true), '')::json;
  exception
    when others then
      request_headers := '{}'::json;
  end;

  raw_token := coalesce(nullif(request_headers ->> 'x-reservation-edit-token', ''), '');
  return public.hash_reservation_edit_token(raw_token);
end;
$$;

create or replace function public.enforce_reservation_customer_edit_limits()
returns trigger
language plpgsql
as $$
begin
  if auth.role() = 'anon'
    and old.edit_token_hash is not null
    and old.edit_token_hash = public.request_reservation_edit_token_hash()
  then
    if old.status <> 'pending' then
      raise exception 'Reservation is no longer editable.';
    end if;

    if new.status = 'pending' then
      if new.customer_name is distinct from old.customer_name
        or new.email is distinct from old.email
        or new.staff_notes is distinct from old.staff_notes
        or new.edit_token_hash is distinct from old.edit_token_hash
        or new.edit_token_created_at is distinct from old.edit_token_created_at
      then
        raise exception 'Customer edits cannot change reservation identity fields.';
      end if;
    elsif new.status = 'cancelled' then
      if new.customer_name is distinct from old.customer_name
        or new.email is distinct from old.email
        or new.phone is distinct from old.phone
        or new.party_size is distinct from old.party_size
        or new.requested_date is distinct from old.requested_date
        or new.requested_time is distinct from old.requested_time
        or new.occasion is distinct from old.occasion
        or new.notes is distinct from old.notes
        or new.staff_notes is distinct from old.staff_notes
        or new.edit_token_hash is distinct from old.edit_token_hash
        or new.edit_token_created_at is distinct from old.edit_token_created_at
      then
        raise exception 'Customer cancellation can only change reservation status.';
      end if;
    else
      raise exception 'Unsupported customer reservation status change.';
    end if;
  end if;

  return new;
end;
$$;

drop trigger if exists enforce_reservation_customer_edit_limits on public.reservations;
create trigger enforce_reservation_customer_edit_limits
before update on public.reservations
for each row
execute function public.enforce_reservation_customer_edit_limits();

drop policy if exists "Customers can read reservation by edit token" on public.reservations;
create policy "Customers can read reservation by edit token"
on public.reservations
for select
to anon
using (
  edit_token_hash is not null
  and edit_token_hash = public.request_reservation_edit_token_hash()
);

drop policy if exists "Customers can update pending reservation by edit token" on public.reservations;
create policy "Customers can update pending reservation by edit token"
on public.reservations
for update
to anon
using (
  status = 'pending'
  and edit_token_hash is not null
  and edit_token_hash = public.request_reservation_edit_token_hash()
)
with check (
  edit_token_hash is not null
  and edit_token_hash = public.request_reservation_edit_token_hash()
  and status in ('pending', 'cancelled')
  and party_size between 1 and 12
  and requested_time >= time '07:00'
  and requested_time <= time '21:00'
);

drop policy if exists "Admins can read reservations" on public.reservations;
create policy "Admins can read reservations"
on public.reservations
for select
to authenticated
using (public.is_admin());

drop policy if exists "Admins can update reservations" on public.reservations;
create policy "Admins can update reservations"
on public.reservations
for update
to authenticated
using (public.is_admin())
with check (public.is_admin());
