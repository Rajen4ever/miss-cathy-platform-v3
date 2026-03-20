import type { ConnectorRegistryItem, Task } from "@misscathy/types";
import { demoConnectors, demoTasks } from "@misscathy/core";
import { supabase } from "./supabase";

export async function currentUserId() {
  if (!supabase) return null;
  const { data } = await supabase.auth.getUser();
  return data.user?.id ?? null;
}

export async function listTasks(): Promise<Task[]> {
  const ownerUserId = await currentUserId();
  if (!supabase || !ownerUserId) return demoTasks;

  const { data, error } = await supabase
    .from("tasks")
    .select("*")
    .eq("owner_user_id", ownerUserId)
    .order("priority", { ascending: false });

  if (error || !data) return demoTasks;

  return data.map((row) => ({
    id: row.id,
    title: row.title,
    description: row.description,
    status: row.status,
    nextStep: row.next_step,
    priority: row.priority,
    lifecycle: row.lifecycle,
    escalation: row.escalation,
    category: row.category,
    dueAt: row.due_at,
    projectId: row.project_id,
    ownerDependency: row.owner_dependency
  }));
}

export async function listConnectors(): Promise<ConnectorRegistryItem[]> {
  const ownerUserId = await currentUserId();
  if (!supabase || !ownerUserId) return demoConnectors;

  const { data, error } = await supabase
    .from("connector_registry")
    .select("*")
    .or(`owner_user_id.eq.${ownerUserId},is_template.eq.true`);

  if (error || !data) return demoConnectors;

  return data.map((row) => ({
    id: row.id,
    connectorName: row.connector_name,
    connectorFamily: row.connector_family,
    connectorType: row.connector_type,
    status: row.status,
    connectedService: row.connected_service,
    supportedActions: row.supported_actions ?? [],
    inputRequirements: row.input_requirements ?? [],
    confirmationPolicy: row.confirmation_policy,
    permissionScope: row.permission_scope,
    executionBoundary: row.execution_boundary,
    fallbackPath: row.fallback_path,
    lastVerified: row.last_verified ?? "",
    notes: row.notes,
    truthfulBand: row.truthful_band
  }));
}
