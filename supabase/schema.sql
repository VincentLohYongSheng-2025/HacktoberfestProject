-- PREPARED ONLY. Not applied. Local demo is the active storage implementation.
-- Future Supabase adapter must use authenticated clients; do not bypass RLS.
create table public.pilotbridge_workspaces (
 owner_id uuid primary key references auth.users(id) on delete cascade,
 revision integer not null default 1 check(revision>0),
 state jsonb not null default '{}'::jsonb check(jsonb_typeof(state)='object'),
 updated_at timestamptz not null default now()
);
alter table public.pilotbridge_workspaces enable row level security;
revoke all on public.pilotbridge_workspaces from anon;
grant select,insert,update on public.pilotbridge_workspaces to authenticated;
create policy owner_read on public.pilotbridge_workspaces for select to authenticated using ((select auth.uid())=owner_id);
create policy owner_insert on public.pilotbridge_workspaces for insert to authenticated with check ((select auth.uid())=owner_id);
create policy owner_update on public.pilotbridge_workspaces for update to authenticated using ((select auth.uid())=owner_id) with check ((select auth.uid())=owner_id);
-- Operator updates must go through an authenticated server authorisation layer.
-- This proposed workspace schema is not a replacement for tested production tables.
