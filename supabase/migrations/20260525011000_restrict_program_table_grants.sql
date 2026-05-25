revoke all privileges on table public.regular_programs from anon, authenticated;
revoke all privileges on table public.extra_programs from anon, authenticated;
revoke all privileges on table public.post_headers from anon, authenticated;

grant select on table public.regular_programs to anon, authenticated;
grant select on table public.extra_programs to anon, authenticated;
grant select on table public.post_headers to anon, authenticated;

grant insert, update, delete on table public.regular_programs to authenticated;
grant insert, update, delete on table public.extra_programs to authenticated;
grant insert, update, delete on table public.post_headers to authenticated;
