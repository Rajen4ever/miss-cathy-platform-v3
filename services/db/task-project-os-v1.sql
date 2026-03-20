-- Miss Cathy Task + Project OS v1
-- Safe migration for the live Miss Cathy project.
-- Run this after the base schema if you want stronger project/task continuity support.

alter table if exists tasks
  add column if not exists completed_at timestamptz,
  add column if not exists archived_at timestamptz;

create index if not exists tasks_owner_lifecycle_idx on tasks (owner_user_id, lifecycle, priority desc);
create index if not exists tasks_owner_project_idx on tasks (owner_user_id, project_id);
create index if not exists projects_owner_updated_idx on projects (owner_user_id, updated_at desc);
create index if not exists decisions_owner_project_idx on decisions (owner_user_id, project_id, created_at desc);
create index if not exists savepoints_owner_updated_idx on savepoints (owner_user_id, updated_at desc);
