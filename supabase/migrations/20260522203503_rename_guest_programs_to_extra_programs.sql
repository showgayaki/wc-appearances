alter table if exists public.guest_programs
rename to extra_programs;

alter trigger guest_programs_set_updated_at on public.extra_programs
rename to extra_programs_set_updated_at;

alter policy "guest programs are publicly readable"
on public.extra_programs
rename to "extra programs are publicly readable";

alter policy "guest programs are writable by admin users"
on public.extra_programs
rename to "extra programs are writable by admin users";
