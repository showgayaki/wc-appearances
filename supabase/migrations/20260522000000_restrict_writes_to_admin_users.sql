create table if not exists public.admin_users (
  user_id uuid primary key references auth.users (id) on delete cascade,
  created_at timestamptz not null default now()
);

alter table public.admin_users enable row level security;

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.admin_users
    where user_id = auth.uid()
  );
$$;

revoke all on function public.is_admin() from public;
grant execute on function public.is_admin() to anon, authenticated;

drop policy if exists "regular programs are writable by authenticated users" on public.regular_programs;
drop policy if exists "regular programs are writable by admin users" on public.regular_programs;
create policy "regular programs are writable by admin users"
on public.regular_programs for all
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "guest programs are writable by authenticated users" on public.guest_programs;
drop policy if exists "guest programs are writable by admin users" on public.guest_programs;
create policy "guest programs are writable by admin users"
on public.guest_programs for all
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "post headers are writable by authenticated users" on public.post_headers;
drop policy if exists "post headers are writable by admin users" on public.post_headers;
create policy "post headers are writable by admin users"
on public.post_headers for all
using (public.is_admin())
with check (public.is_admin());
