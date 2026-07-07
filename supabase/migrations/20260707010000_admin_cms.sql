create extension if not exists "pgcrypto";

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create table if not exists public.admin_profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid unique references auth.users(id) on delete cascade,
  email text not null,
  display_name text not null default '',
  role text not null check (role in ('owner', 'editor')),
  status text not null default 'active' check (status in ('active', 'disabled')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.admin_profiles
alter column user_id drop not null;

create unique index if not exists admin_profiles_email_key
on public.admin_profiles (email);

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.admin_profiles
    where (
        user_id = auth.uid()
        or lower(email) = lower(auth.jwt() ->> 'email')
      )
      and status = 'active'
      and role in ('owner', 'editor')
  );
$$;

create or replace function public.is_owner()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.admin_profiles
    where (
        user_id = auth.uid()
        or lower(email) = lower(auth.jwt() ->> 'email')
      )
      and status = 'active'
      and role = 'owner'
  );
$$;

create table if not exists public.menu_categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  description text not null default '',
  sort_order integer not null default 0,
  status text not null default 'draft' check (status in ('draft', 'published', 'archived')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.menu_items (
  id uuid primary key default gen_random_uuid(),
  category_id uuid not null references public.menu_categories(id) on delete cascade,
  name text not null,
  description text not null default '',
  price_inr integer not null check (price_inr >= 0),
  dietary_tags text[] not null default '{}',
  image_url text not null default '',
  is_available boolean not null default true,
  sort_order integer not null default 0,
  status text not null default 'draft' check (status in ('draft', 'published', 'archived')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.moment_categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  sort_order integer not null default 0,
  status text not null default 'published' check (status in ('draft', 'published', 'archived')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.media_assets (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  alt_text text not null,
  caption text not null default '',
  category_id uuid references public.moment_categories(id) on delete set null,
  storage_path text not null default '',
  public_url text not null default '',
  sort_order integer not null default 0,
  status text not null default 'draft' check (status in ('draft', 'published', 'archived')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.homepage_sections (
  id uuid primary key default gen_random_uuid(),
  key text not null unique,
  eyebrow text not null default '',
  title text not null default '',
  body text not null default '',
  data jsonb not null default '{}'::jsonb,
  status text not null default 'draft' check (status in ('draft', 'published', 'archived')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.cafe_content (
  id uuid primary key default gen_random_uuid(),
  key text not null unique,
  eyebrow text not null default '',
  title text not null default '',
  body text not null default '',
  data jsonb not null default '{}'::jsonb,
  status text not null default 'draft' check (status in ('draft', 'published', 'archived')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.site_settings (
  id uuid primary key default gen_random_uuid(),
  key text not null unique,
  value jsonb not null default '{}'::jsonb,
  status text not null default 'published' check (status in ('draft', 'published', 'archived')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.content_revisions (
  id uuid primary key default gen_random_uuid(),
  entity_table text not null,
  entity_id uuid not null,
  snapshot jsonb not null,
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now()
);

create table if not exists public.audit_log (
  id uuid primary key default gen_random_uuid(),
  actor_id uuid references auth.users(id) on delete set null,
  action text not null,
  entity_table text not null,
  entity_id uuid,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

alter table public.admin_profiles enable row level security;
alter table public.menu_categories enable row level security;
alter table public.menu_items enable row level security;
alter table public.moment_categories enable row level security;
alter table public.media_assets enable row level security;
alter table public.homepage_sections enable row level security;
alter table public.cafe_content enable row level security;
alter table public.site_settings enable row level security;
alter table public.content_revisions enable row level security;
alter table public.audit_log enable row level security;

drop policy if exists "Admins can read reservations" on public.reservations;
create policy "Admins can read reservations" on public.reservations for select to authenticated using (public.is_admin());
drop policy if exists "Admins can update reservations" on public.reservations;
create policy "Admins can update reservations" on public.reservations for update to authenticated using (public.is_admin()) with check (public.is_admin());

drop policy if exists "Admins can read testimonials" on public.testimonials;
create policy "Admins can read testimonials" on public.testimonials for select to authenticated using (public.is_admin());
drop policy if exists "Admins can update testimonials" on public.testimonials;
create policy "Admins can update testimonials" on public.testimonials for update to authenticated using (public.is_admin()) with check (public.is_admin());
drop policy if exists "Admins can delete testimonials" on public.testimonials;
create policy "Admins can delete testimonials" on public.testimonials for delete to authenticated using (public.is_admin());

drop policy if exists "Admins can read admin profiles" on public.admin_profiles;
create policy "Admins can read admin profiles" on public.admin_profiles for select to authenticated using (public.is_admin());
drop policy if exists "Owners can manage admin profiles" on public.admin_profiles;
create policy "Owners can manage admin profiles" on public.admin_profiles for all to authenticated using (public.is_owner()) with check (public.is_owner());

drop policy if exists "Public can read published menu categories" on public.menu_categories;
create policy "Public can read published menu categories" on public.menu_categories for select to anon using (status = 'published');
drop policy if exists "Admins can manage menu categories" on public.menu_categories;
create policy "Admins can manage menu categories" on public.menu_categories for all to authenticated using (public.is_admin()) with check (public.is_admin());

drop policy if exists "Public can read published menu items" on public.menu_items;
create policy "Public can read published menu items" on public.menu_items for select to anon using (status = 'published' and is_available = true);
drop policy if exists "Admins can manage menu items" on public.menu_items;
create policy "Admins can manage menu items" on public.menu_items for all to authenticated using (public.is_admin()) with check (public.is_admin());

drop policy if exists "Public can read published moment categories" on public.moment_categories;
create policy "Public can read published moment categories" on public.moment_categories for select to anon using (status = 'published');
drop policy if exists "Admins can manage moment categories" on public.moment_categories;
create policy "Admins can manage moment categories" on public.moment_categories for all to authenticated using (public.is_admin()) with check (public.is_admin());

drop policy if exists "Public can read published media assets" on public.media_assets;
create policy "Public can read published media assets" on public.media_assets for select to anon using (status = 'published');
drop policy if exists "Admins can manage media assets" on public.media_assets;
create policy "Admins can manage media assets" on public.media_assets for all to authenticated using (public.is_admin()) with check (public.is_admin());

drop policy if exists "Public can read published homepage sections" on public.homepage_sections;
create policy "Public can read published homepage sections" on public.homepage_sections for select to anon using (status = 'published');
drop policy if exists "Admins can manage homepage sections" on public.homepage_sections;
create policy "Admins can manage homepage sections" on public.homepage_sections for all to authenticated using (public.is_admin()) with check (public.is_admin());

drop policy if exists "Public can read published cafe content" on public.cafe_content;
create policy "Public can read published cafe content" on public.cafe_content for select to anon using (status = 'published');
drop policy if exists "Admins can manage cafe content" on public.cafe_content;
create policy "Admins can manage cafe content" on public.cafe_content for all to authenticated using (public.is_admin()) with check (public.is_admin());

drop policy if exists "Public can read published site settings" on public.site_settings;
create policy "Public can read published site settings" on public.site_settings for select to anon using (status = 'published');
drop policy if exists "Admins can manage site settings" on public.site_settings;
create policy "Admins can manage site settings" on public.site_settings for all to authenticated using (public.is_admin()) with check (public.is_admin());

drop policy if exists "Admins can read content revisions" on public.content_revisions;
create policy "Admins can read content revisions" on public.content_revisions for select to authenticated using (public.is_admin());
drop policy if exists "Admins can create content revisions" on public.content_revisions;
create policy "Admins can create content revisions" on public.content_revisions for insert to authenticated with check (public.is_admin());

drop policy if exists "Admins can read audit log" on public.audit_log;
create policy "Admins can read audit log" on public.audit_log for select to authenticated using (public.is_admin());
drop policy if exists "Admins can create audit log" on public.audit_log;
create policy "Admins can create audit log" on public.audit_log for insert to authenticated with check (public.is_admin());

do $$
declare
  table_name text;
begin
  foreach table_name in array array[
    'admin_profiles',
    'menu_categories',
    'menu_items',
    'moment_categories',
    'media_assets',
    'homepage_sections',
    'cafe_content',
    'site_settings',
    'reservations',
    'testimonials'
  ]
  loop
    execute format('drop trigger if exists set_%I_updated_at on public.%I', table_name, table_name);
    execute format('create trigger set_%I_updated_at before update on public.%I for each row execute function public.set_updated_at()', table_name, table_name);
  end loop;
end $$;

insert into public.moment_categories (name, slug, sort_order, status)
values
  ('Fam Visits', 'fam-visits', 10, 'published'),
  ('Quiet Afternoons', 'quiet-afternoons', 20, 'published'),
  ('Conversations', 'conversations', 30, 'published'),
  ('Film Discussions', 'film-discussions', 40, 'published')
on conflict (slug) do nothing;

insert into storage.buckets (id, name, public)
values ('kooffee-media', 'kooffee-media', true)
on conflict (id) do nothing;

drop policy if exists "Public can read Kooffee media" on storage.objects;
create policy "Public can read Kooffee media"
on storage.objects for select
to anon
using (bucket_id = 'kooffee-media');

drop policy if exists "Admins can manage Kooffee media" on storage.objects;
create policy "Admins can manage Kooffee media"
on storage.objects for all
to authenticated
using (bucket_id = 'kooffee-media' and public.is_admin())
with check (bucket_id = 'kooffee-media' and public.is_admin());

create index if not exists menu_categories_public_idx on public.menu_categories (status, sort_order);
create index if not exists menu_items_public_idx on public.menu_items (status, is_available, sort_order);
create index if not exists media_assets_public_idx on public.media_assets (status, sort_order);
create index if not exists audit_log_recent_idx on public.audit_log (created_at desc);
