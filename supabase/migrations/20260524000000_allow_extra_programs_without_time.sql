alter table public.extra_programs
  alter column start_time drop not null,
  alter column end_time drop not null,
  add column if not exists title_suffix text;
