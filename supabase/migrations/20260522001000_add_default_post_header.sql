alter table public.post_headers
add column if not exists is_default boolean not null default false;

create or replace function public.ensure_single_default_post_header()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if new.is_default then
    update public.post_headers
    set is_default = false
    where id <> new.id
      and is_default = true;
  end if;

  return new;
end;
$$;

drop trigger if exists post_headers_ensure_single_default on public.post_headers;
create trigger post_headers_ensure_single_default
before insert or update of is_default on public.post_headers
for each row execute function public.ensure_single_default_post_header();

create unique index if not exists post_headers_only_one_default
on public.post_headers (is_default)
where is_default = true;
