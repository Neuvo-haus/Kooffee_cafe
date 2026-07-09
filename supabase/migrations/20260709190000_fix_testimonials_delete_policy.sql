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

grant usage on schema public to authenticated;
grant select, delete on public.testimonials to authenticated;

alter table public.testimonials enable row level security;

drop policy if exists "Admins can delete testimonials" on public.testimonials;
create policy "Admins can delete testimonials"
on public.testimonials
for delete
to authenticated
using (public.is_admin());
