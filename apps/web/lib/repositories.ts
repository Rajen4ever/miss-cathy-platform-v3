import type {
  BuilderBrief,
  ConnectorRegistryItem,
  ContentPack,
  HealthFollowUp,
  KnowledgeDocument,
  MonitoringBrief,
  ProjectBrief,
  Savepoint,
  SessionUser,
  Task
} from "@misscathy/types";
import {
  demoBuilder,
  demoConnectors,
  demoContent,
  demoHealth,
  demoKnowledge,
  demoMonitoring,
  demoProjects,
  demoSavepoints,
  demoTasks
} from "@misscathy/core";
import { getSupabaseBrowserClient } from "./supabase/client";

function normalizeError(error: unknown) {
  return error instanceof Error ? error.message : "Unknown repository error";
}

async function requireUserId() {
  const supabase = getSupabaseBrowserClient();
  if (!supabase) return null;
  const { data } = await supabase.auth.getUser();
  return data.user?.id ?? null;
}

export async function getSessionUser(): Promise<SessionUser | null> {
  const supabase = getSupabaseBrowserClient();
  if (!supabase) {
    return {
      id: "demo-user",
      email: "demo@misscathy.local",
      displayName: "Demo Operator"
    };
  }
  const { data } = await supabase.auth.getUser();
  if (!data.user) return null;
  return {
    id: data.user.id,
    email: data.user.email ?? "",
    displayName: (data.user.user_metadata?.display_name as string | undefined) ?? null
  };
}

export async function signIn(email: string, password: string) {
  const supabase = getSupabaseBrowserClient();
  if (!supabase) {
    return { ok: true, demo: true };
  }
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  return { ok: !error, error: error ? normalizeError(error) : undefined };
}

export async function signUp(email: string, password: string, displayName: string) {
  const supabase = getSupabaseBrowserClient();
  if (!supabase) {
    return { ok: true, demo: true };
  }
  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { display_name: displayName } }
  });
  return { ok: !error, error: error ? normalizeError(error) : undefined };
}

export async function signOut() {
  const supabase = getSupabaseBrowserClient();
  if (!supabase) return;
  await supabase.auth.signOut();
}

export async function listTasks(): Promise<Task[]> {
  const supabase = getSupabaseBrowserClient();
  const ownerUserId = await requireUserId();
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

export async function listProjects(): Promise<ProjectBrief[]> {
  const supabase = getSupabaseBrowserClient();
  const ownerUserId = await requireUserId();
  if (!supabase || !ownerUserId) return demoProjects;

  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("owner_user_id", ownerUserId)
    .order("updated_at", { ascending: false });

  if (error || !data) return demoProjects;

  return data.map((row) => ({
    id: row.id,
    name: row.name,
    objective: row.objective,
    whyItMatters: row.why_it_matters,
    currentStatus: row.current_status,
    lifecycle: row.lifecycle,
    escalation: row.escalation,
    scope: row.scope ?? [],
    risks: row.risks ?? [],
    blockers: row.blockers ?? [],
    nextSteps: row.next_steps ?? []
  }));
}

export async function listSavepoints(): Promise<Savepoint[]> {
  const supabase = getSupabaseBrowserClient();
  const ownerUserId = await requireUserId();
  if (!supabase || !ownerUserId) return demoSavepoints;

  const { data, error } = await supabase
    .from("savepoints")
    .select("*")
    .eq("owner_user_id", ownerUserId)
    .order("updated_at", { ascending: false });

  if (error || !data) return demoSavepoints;

  return data.map((row) => ({
    id: row.id,
    title: row.title,
    currentStatus: row.current_status,
    decisionsMade: row.decisions_made ?? [],
    openQuestions: row.open_questions ?? [],
    nextStep: row.next_step,
    continuitySummary: row.continuity_summary,
    updatedAt: row.updated_at
  }));
}

export async function listKnowledge(): Promise<KnowledgeDocument[]> {
  const supabase = getSupabaseBrowserClient();
  const ownerUserId = await requireUserId();
  if (!supabase || !ownerUserId) return demoKnowledge;

  const { data, error } = await supabase
    .from("knowledge_documents")
    .select("*")
    .eq("owner_user_id", ownerUserId)
    .order("updated_at", { ascending: false });

  if (error || !data) return demoKnowledge;

  return data.map((row) => ({
    id: row.id,
    title: row.title,
    summary: row.summary,
    tags: row.tags ?? [],
    sourceOfTruth: row.source_of_truth,
    status: row.status,
    updatedAt: row.updated_at
  }));
}

export async function listContent(): Promise<ContentPack[]> {
  const supabase = getSupabaseBrowserClient();
  const ownerUserId = await requireUserId();
  if (!supabase || !ownerUserId) return demoContent;

  const { data, error } = await supabase
    .from("content_packs")
    .select("*")
    .eq("owner_user_id", ownerUserId)
    .order("updated_at", { ascending: false });

  if (error || !data) return demoContent;

  return data.map((row) => ({
    id: row.id,
    title: row.title,
    channel: row.channel,
    assetType: row.asset_type,
    goal: row.goal,
    hook: row.hook,
    repurposingPlan: row.repurposing_plan ?? [],
    publishPlan: row.publish_plan
  }));
}

export async function listBuilder(): Promise<BuilderBrief[]> {
  const supabase = getSupabaseBrowserClient();
  const ownerUserId = await requireUserId();
  if (!supabase || !ownerUserId) return demoBuilder;

  const { data, error } = await supabase
    .from("builder_briefs")
    .select("*")
    .eq("owner_user_id", ownerUserId)
    .order("updated_at", { ascending: false });

  if (error || !data) return demoBuilder;

  return data.map((row) => ({
    id: row.id,
    name: row.name,
    productGoal: row.product_goal,
    userFlow: row.user_flow ?? [],
    stackChoice: row.stack_choice ?? [],
    nextStep: row.next_step
  }));
}

export async function listHealth(): Promise<HealthFollowUp[]> {
  const supabase = getSupabaseBrowserClient();
  const ownerUserId = await requireUserId();
  if (!supabase || !ownerUserId) return demoHealth;

  const { data, error } = await supabase
    .from("health_follow_ups")
    .select("*")
    .eq("owner_user_id", ownerUserId)
    .order("updated_at", { ascending: false });

  if (error || !data) return demoHealth;

  return data.map((row) => ({
    id: row.id,
    title: row.title,
    urgencyLevel: row.urgency_level,
    likelyDomain: row.likely_domain,
    careSetting: row.care_setting,
    questionsToPrepare: row.questions_to_prepare ?? [],
    safetyNote: row.safety_note,
    nextStep: row.next_step
  }));
}

export async function listMonitoring(): Promise<MonitoringBrief[]> {
  const supabase = getSupabaseBrowserClient();
  const ownerUserId = await requireUserId();
  if (!supabase || !ownerUserId) return demoMonitoring;

  const { data, error } = await supabase
    .from("monitoring_briefs")
    .select("*")
    .eq("owner_user_id", ownerUserId)
    .order("updated_at", { ascending: false });

  if (error || !data) return demoMonitoring;

  return data.map((row) => ({
    id: row.id,
    topic: row.topic,
    whyItMatters: row.why_it_matters,
    latestChange: row.latest_change,
    riskLevel: row.risk_level,
    recommendedMove: row.recommended_move
  }));
}

export async function listConnectors(): Promise<ConnectorRegistryItem[]> {
  const supabase = getSupabaseBrowserClient();
  const ownerUserId = await requireUserId();
  if (!supabase || !ownerUserId) return demoConnectors;

  const { data, error } = await supabase
    .from("connector_registry")
    .select("*")
    .or(`owner_user_id.eq.${ownerUserId},is_template.eq.true`)
    .order("is_template", { ascending: false });

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

export async function saveCommandHistory(inputText: string, mode: string, executionBand: string, resultJson: unknown) {
  const supabase = getSupabaseBrowserClient();
  const ownerUserId = await requireUserId();
  if (!supabase || !ownerUserId) return { ok: true, demo: true };

  const { error } = await supabase.from("command_history").insert({
    owner_user_id: ownerUserId,
    input_text: inputText,
    mode,
    execution_band: executionBand,
    result_json: resultJson
  });

  return { ok: !error, error: error ? normalizeError(error) : undefined };
}
