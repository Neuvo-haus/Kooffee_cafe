create extension if not exists "pgcrypto";

create table if not exists public.reservations (
  id uuid primary key default gen_random_uuid(),
  customer_name text not null,
  email text not null,
  phone text not null,
  party_size integer not null check (party_size between 1 and 12),
  requested_date date not null,
  requested_time time not null,
  occasion text not null default '',
  notes text not null default '',
  status text not null default 'pending' check (status in ('pending', 'confirmed', 'declined', 'cancelled')),
  staff_notes text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.testimonials (
  id uuid primary key default gen_random_uuid(),
  customer_name text not null,
  rating integer not null check (rating between 1 and 5),
  message text not null check (char_length(message) >= 20),
  source text not null default 'Website submission',
  status text not null default 'pending' check (status in ('pending', 'approved', 'rejected', 'archived')),
  is_featured boolean not null default false,
  consent_to_publish boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.reservations enable row level security;
alter table public.testimonials enable row level security;

drop policy if exists "Public can create pending reservations" on public.reservations;
create policy "Public can create pending reservations"
on public.reservations
for insert
to anon
with check (
  status = 'pending'
  and party_size between 1 and 12
  and requested_time >= time '07:00'
  and requested_time <= time '21:00'
);

drop policy if exists "Public can create pending testimonials" on public.testimonials;
create policy "Public can create pending testimonials"
on public.testimonials
for insert
to anon
with check (
  status = 'pending'
  and consent_to_publish = true
  and rating between 1 and 5
  and char_length(message) >= 20
);

drop policy if exists "Public can read approved testimonials" on public.testimonials;
create policy "Public can read approved testimonials"
on public.testimonials
for select
to anon
using (status = 'approved');

create index if not exists reservations_status_requested_at_idx
on public.reservations (status, requested_date, requested_time);

create index if not exists testimonials_public_idx
on public.testimonials (status, is_featured desc, created_at desc);
