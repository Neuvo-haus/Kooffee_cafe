create unique index if not exists reservations_email_slot_unique
on public.reservations (lower(email), requested_date, requested_time)
where status in ('pending', 'confirmed');

create unique index if not exists testimonials_submitter_message_unique
on public.testimonials (lower(customer_name), md5(message))
where status in ('pending', 'approved');

do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conname = 'reservations_note_length_guard'
      and conrelid = 'public.reservations'::regclass
  ) then
    alter table public.reservations
    add constraint reservations_note_length_guard
    check (char_length(coalesce(notes, '')) <= 1000);
  end if;

  if not exists (
    select 1
    from pg_constraint
    where conname = 'testimonials_message_length_guard'
      and conrelid = 'public.testimonials'::regclass
  ) then
    alter table public.testimonials
    add constraint testimonials_message_length_guard
    check (char_length(message) between 20 and 1200);
  end if;
end $$;
