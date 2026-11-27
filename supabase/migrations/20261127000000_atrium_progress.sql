create table public.atrium_progress (
  user_id uuid primary key references auth.users (id) on delete cascade,
  progress jsonb not null check (jsonb_typeof(progress) = 'object'),
  version bigint not null check (version > 0)
);

alter table public.atrium_progress enable row level security;
revoke all on public.atrium_progress from public, anon, authenticated;
grant select, insert, update on public.atrium_progress to authenticated;

create policy "Read own learning progress"
  on public.atrium_progress for select to authenticated
  using ((select auth.uid()) = user_id);

create policy "Create own learning progress"
  on public.atrium_progress for insert to authenticated
  with check ((select auth.uid()) = user_id);

create policy "Update own learning progress"
  on public.atrium_progress for update to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);
