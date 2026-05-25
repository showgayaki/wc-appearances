alter table public.regular_programs
  rename column station_name to media_name;

alter table public.extra_programs
  rename column station_name to media_name;
