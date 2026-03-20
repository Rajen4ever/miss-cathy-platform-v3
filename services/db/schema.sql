create extension if not exists "pgcrypto";
create extension if not exists vector;

create type lifecycle_state as enum ('idea', 'planning', 'active', 'waiting', 'at_risk', 'review', 'completed', 'archived');
create type escalation_state as enum ('critical', 'attention_needed', 'stable', 'parked');
create type connector_status as enum ('active_connected', 'available_but_unconfigured', 'handoff_only', 'unavailable');
create type execution_band as enum ('direct', 'connector', 'handoff', 'recommendation');
create type document_status as enum ('active', 'archived');
create type reminder_status as enum ('scheduled', 'sent', 'cancelled');

create table if not exists profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null unique,
  display_name text,
  role_label text not null default 'Personal AI chief-of-staff OS',
  tagline text not null default 'Turn intent into execution.',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists projects (
  id uuid primary key default gen_random_uuid(),
  owner_user_id uuid not null references profiles(id) on delete cascade,
  name text not null,
  objective text not null,
  why_it_matters text not null,
  current_status text not null,
  lifecycle lifecycle_state not null default 'planning',
  escalation escalation_state not null default 'stable',
  scope jsonb not null default '[]'::jsonb,
  risks jsonb not null default '[]'::jsonb,
  blockers jsonb not null default '[]'::jsonb,
  next_steps jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists tasks (
  id uuid primary key default gen_random_uuid(),
  owner_user_id uuid not null references profiles(id) on delete cascade,
  project_id uuid references projects(id) on delete set null,
  title text not null,
  description text not null default '',
  category text not null default 'operational',
  status text not null default 'Open',
  priority integer not null default 5 check (priority between 1 and 10),
  lifecycle lifecycle_state not null default 'active',
  escalation escalation_state not null default 'stable',
  next_step text not null default '',
  owner_dependency text not null default '',
  due_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists decisions (
  id uuid primary key default gen_random_uuid(),
  owner_user_id uuid not null references profiles(id) on delete cascade,
  project_id uuid references projects(id) on delete set null,
  decision text not null,
  context text not null,
  chosen_direction text not null,
  why text not null,
  risks jsonb not null default '[]'::jsonb,
  revisit_trigger text not null default '',
  created_at timestamptz not null default now()
);

create table if not exists savepoints (
  id uuid primary key default gen_random_uuid(),
  owner_user_id uuid not null references profiles(id) on delete cascade,
  title text not null,
  current_status text not null,
  decisions_made jsonb not null default '[]'::jsonb,
  open_questions jsonb not null default '[]'::jsonb,
  next_step text not null,
  continuity_summary text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists knowledge_documents (
  id uuid primary key default gen_random_uuid(),
  owner_user_id uuid not null references profiles(id) on delete cascade,
  title text not null,
  summary text not null default '',
  tags text[] not null default '{}',
  source_of_truth boolean not null default false,
  status document_status not null default 'active',
  storage_path text,
  embedding vector(1536),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists content_packs (
  id uuid primary key default gen_random_uuid(),
  owner_user_id uuid not null references profiles(id) on delete cascade,
  title text not null,
  channel text not null,
  asset_type text not null,
  goal text not null,
  hook text not null default '',
  repurposing_plan jsonb not null default '[]'::jsonb,
  publish_plan text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists builder_briefs (
  id uuid primary key default gen_random_uuid(),
  owner_user_id uuid not null references profiles(id) on delete cascade,
  name text not null,
  product_goal text not null,
  user_flow jsonb not null default '[]'::jsonb,
  stack_choice jsonb not null default '[]'::jsonb,
  next_step text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists health_follow_ups (
  id uuid primary key default gen_random_uuid(),
  owner_user_id uuid not null references profiles(id) on delete cascade,
  title text not null,
  urgency_level int not null check (urgency_level between 1 and 4),
  likely_domain text not null,
  care_setting text not null,
  questions_to_prepare jsonb not null default '[]'::jsonb,
  safety_note text not null,
  next_step text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists monitoring_briefs (
  id uuid primary key default gen_random_uuid(),
  owner_user_id uuid not null references profiles(id) on delete cascade,
  topic text not null,
  why_it_matters text not null,
  latest_change text not null,
  risk_level text not null default 'moderate',
  recommended_move text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists connector_registry (
  id uuid primary key default gen_random_uuid(),
  owner_user_id uuid references profiles(id) on delete cascade,
  connector_name text not null,
  connector_family text not null,
  connector_type text not null,
  status connector_status not null default 'available_but_unconfigured',
  connected_service text not null default '',
  supported_actions jsonb not null default '[]'::jsonb,
  input_requirements jsonb not null default '[]'::jsonb,
  confirmation_policy text not null default '',
  permission_scope text not null default '',
  execution_boundary text not null default '',
  fallback_path text not null default '',
  last_verified date,
  notes text not null default '',
  truthful_band execution_band not null default 'connector',
  is_template boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists action_packs (
  id uuid primary key default gen_random_uuid(),
  owner_user_id uuid not null references profiles(id) on delete cascade,
  objective text not null,
  target_service text not null,
  connector_state connector_status not null,
  required_inputs jsonb not null default '[]'::jsonb,
  prepared_payload text not null,
  confirmation_needed boolean not null default true,
  manual_step text not null,
  next_step text not null,
  created_at timestamptz not null default now()
);

create table if not exists reminders (
  id uuid primary key default gen_random_uuid(),
  owner_user_id uuid not null references profiles(id) on delete cascade,
  title text not null,
  body text not null default '',
  remind_at timestamptz not null,
  status reminder_status not null default 'scheduled',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists device_push_tokens (
  id uuid primary key default gen_random_uuid(),
  owner_user_id uuid not null references profiles(id) on delete cascade,
  platform text not null,
  expo_push_token text not null unique,
  device_label text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists command_history (
  id uuid primary key default gen_random_uuid(),
  owner_user_id uuid not null references profiles(id) on delete cascade,
  input_text text not null,
  mode text not null,
  execution_band execution_band not null,
  result_json jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, display_name)
  values (new.id, coalesce(new.email, ''), new.raw_user_meta_data ->> 'display_name')
  on conflict (id) do update
  set email = excluded.email,
      display_name = coalesce(excluded.display_name, public.profiles.display_name),
      updated_at = now();
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute procedure public.handle_new_user();

create or replace function public.touch_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create or replace function public.enable_updated_at(table_name text)
returns void
language plpgsql
as $$
begin
  execute format('drop trigger if exists %I_updated_at on %I', table_name, table_name);
  execute format('create trigger %I_updated_at before update on %I for each row execute procedure public.touch_updated_at()', table_name, table_name);
end;
$$;

select public.enable_updated_at('profiles');
select public.enable_updated_at('projects');
select public.enable_updated_at('tasks');
select public.enable_updated_at('savepoints');
select public.enable_updated_at('knowledge_documents');
select public.enable_updated_at('content_packs');
select public.enable_updated_at('builder_briefs');
select public.enable_updated_at('health_follow_ups');
select public.enable_updated_at('monitoring_briefs');
select public.enable_updated_at('connector_registry');
select public.enable_updated_at('reminders');
select public.enable_updated_at('device_push_tokens');

create index if not exists idx_projects_owner on projects(owner_user_id);
create index if not exists idx_tasks_owner on tasks(owner_user_id);
create index if not exists idx_tasks_project on tasks(project_id);
create index if not exists idx_savepoints_owner on savepoints(owner_user_id);
create index if not exists idx_knowledge_owner on knowledge_documents(owner_user_id);
create index if not exists idx_knowledge_embedding on knowledge_documents using ivfflat (embedding vector_cosine_ops) with (lists = 100);
create index if not exists idx_connectors_owner on connector_registry(owner_user_id);
create index if not exists idx_reminders_owner on reminders(owner_user_id);
create index if not exists idx_push_tokens_owner on device_push_tokens(owner_user_id);

alter table profiles enable row level security;
alter table projects enable row level security;
alter table tasks enable row level security;
alter table decisions enable row level security;
alter table savepoints enable row level security;
alter table knowledge_documents enable row level security;
alter table content_packs enable row level security;
alter table builder_briefs enable row level security;
alter table health_follow_ups enable row level security;
alter table monitoring_briefs enable row level security;
alter table connector_registry enable row level security;
alter table action_packs enable row level security;
alter table reminders enable row level security;
alter table device_push_tokens enable row level security;
alter table command_history enable row level security;

create policy "profiles_select_own" on profiles
for select using (auth.uid() = id);

create policy "profiles_update_own" on profiles
for update using (auth.uid() = id);

create policy "profiles_insert_own" on profiles
for insert with check (auth.uid() = id);

create policy "user_owns_projects" on projects
for all using (auth.uid() = owner_user_id) with check (auth.uid() = owner_user_id);

create policy "user_owns_tasks" on tasks
for all using (auth.uid() = owner_user_id) with check (auth.uid() = owner_user_id);

create policy "user_owns_decisions" on decisions
for all using (auth.uid() = owner_user_id) with check (auth.uid() = owner_user_id);

create policy "user_owns_savepoints" on savepoints
for all using (auth.uid() = owner_user_id) with check (auth.uid() = owner_user_id);

create policy "user_owns_knowledge" on knowledge_documents
for all using (auth.uid() = owner_user_id) with check (auth.uid() = owner_user_id);

create policy "user_owns_content" on content_packs
for all using (auth.uid() = owner_user_id) with check (auth.uid() = owner_user_id);

create policy "user_owns_builder" on builder_briefs
for all using (auth.uid() = owner_user_id) with check (auth.uid() = owner_user_id);

create policy "user_owns_health" on health_follow_ups
for all using (auth.uid() = owner_user_id) with check (auth.uid() = owner_user_id);

create policy "user_owns_monitoring" on monitoring_briefs
for all using (auth.uid() = owner_user_id) with check (auth.uid() = owner_user_id);

create policy "user_owns_action_packs" on action_packs
for all using (auth.uid() = owner_user_id) with check (auth.uid() = owner_user_id);

create policy "user_owns_reminders" on reminders
for all using (auth.uid() = owner_user_id) with check (auth.uid() = owner_user_id);

create policy "user_owns_push_tokens" on device_push_tokens
for all using (auth.uid() = owner_user_id) with check (auth.uid() = owner_user_id);

create policy "user_owns_command_history" on command_history
for all using (auth.uid() = owner_user_id) with check (auth.uid() = owner_user_id);

create policy "user_owns_connector_entries" on connector_registry
for all using (
  owner_user_id is null and is_template = true
  or auth.uid() = owner_user_id
) with check (
  auth.uid() = owner_user_id
  or (owner_user_id is null and is_template = true)
);
