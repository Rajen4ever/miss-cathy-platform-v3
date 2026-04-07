import type {
  BuilderBrief,
  BuilderBriefInput,
  CommandHistoryEntry,
  ConnectorRegistryItem,
  ContentPack,
  ContentPackInput,
  DashboardSummary,
  DecisionLog,
  DecisionLogInput,
  HealthFollowUp,
  HealthFollowUpInput,
  KnowledgeDocument,
  KnowledgeDocumentInput,
  ProjectBrief,
  ProjectBriefInput,
  Savepoint,
  SavepointInput,
  SessionUser,
  Task,
  TaskInput,
  MonitoringBrief,
  MonitoringBriefInput
} from "@misscathy/types";
import {
  computeDashboardSummary,
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

function toStringArray(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value.filter((item): item is string => typeof item === "string").map((item) => item.trim()).filter(Boolean);
  }
  return [];
}

function mapTask(row: any): Task {
  return {
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
    ownerDependency: row.owner_dependency,
    updatedAt: row.updated_at
  };
}

function mapProject(row: any): ProjectBrief {
  return {
    id: row.id,
    name: row.name,
    objective: row.objective,
    whyItMatters: row.why_it_matters,
    currentStatus: row.current_status,
    lifecycle: row.lifecycle,
    escalation: row.escalation,
    scope: toStringArray(row.scope),
    risks: toStringArray(row.risks),
    blockers: toStringArray(row.blockers),
    nextSteps: toStringArray(row.next_steps),
    updatedAt: row.updated_at
  };
}

function mapDecision(row: any): DecisionLog {
  return {
    id: row.id,
    projectId: row.project_id,
    decision: row.decision,
    context: row.context,
    chosenDirection: row.chosen_direction,
    why: row.why,
    risks: toStringArray(row.risks),
    revisitTrigger: row.revisit_trigger,
    createdAt: row.created_at
  };
}

function mapSavepoint(row: any): Savepoint {
  return {
    id: row.id,
    title: row.title,
    currentStatus: row.current_status,
    decisionsMade: toStringArray(row.decisions_made),
    openQuestions: toStringArray(row.open_questions),
    nextStep: row.next_step,
    continuitySummary: row.continuity_summary,
    updatedAt: row.updated_at
  };
}

function mapCommandHistory(row: any): CommandHistoryEntry {
  return {
    id: row.id,
    inputText: row.input_text,
    mode: row.mode,
    executionBand: row.execution_band,
    createdAt: row.created_at,
    resultJson: row.result_json ?? {}
  };
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
  return data.map(mapTask);
}

export async function createTask(input: TaskInput) {
  const supabase = getSupabaseBrowserClient();
  const ownerUserId = await requireUserId();
  if (!supabase || !ownerUserId) {
    return { ok: true, demo: true };
  }

  const { data, error } = await supabase
    .from("tasks")
    .insert({
      owner_user_id: ownerUserId,
      title: input.title,
      description: input.description,
      category: input.category,
      status: input.status,
      priority: input.priority,
      lifecycle: input.lifecycle,
      escalation: input.escalation,
      next_step: input.nextStep,
      owner_dependency: input.ownerDependency,
      due_at: input.dueAt || null,
      project_id: input.projectId || null
    })
    .select("*")
    .single();

  return { ok: !error, data: data ? mapTask(data) : undefined, error: error ? normalizeError(error) : undefined };
}

export async function updateTask(taskId: string, input: Partial<TaskInput>) {
  const supabase = getSupabaseBrowserClient();
  const ownerUserId = await requireUserId();
  if (!supabase || !ownerUserId) {
    return { ok: true, demo: true };
  }

  const updates: Record<string, unknown> = {};
  if (input.title !== undefined) updates.title = input.title;
  if (input.description !== undefined) updates.description = input.description;
  if (input.category !== undefined) updates.category = input.category;
  if (input.status !== undefined) updates.status = input.status;
  if (input.priority !== undefined) updates.priority = input.priority;
  if (input.lifecycle !== undefined) updates.lifecycle = input.lifecycle;
  if (input.escalation !== undefined) updates.escalation = input.escalation;
  if (input.nextStep !== undefined) updates.next_step = input.nextStep;
  if (input.ownerDependency !== undefined) updates.owner_dependency = input.ownerDependency;
  if (input.dueAt !== undefined) updates.due_at = input.dueAt || null;
  if (input.projectId !== undefined) updates.project_id = input.projectId || null;

  const { data, error } = await supabase
    .from("tasks")
    .update(updates)
    .eq("id", taskId)
    .eq("owner_user_id", ownerUserId)
    .select("*")
    .single();

  return { ok: !error, data: data ? mapTask(data) : undefined, error: error ? normalizeError(error) : undefined };
}

export async function completeTask(taskId: string) {
  return updateTask(taskId, {
    status: "Completed",
    lifecycle: "completed",
    escalation: "stable"
  });
}

export async function archiveTask(taskId: string) {
  return updateTask(taskId, {
    status: "Archived",
    lifecycle: "archived",
    escalation: "parked"
  });
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
  return data.map(mapProject);
}

export async function getProject(projectId: string): Promise<ProjectBrief | null> {
  const supabase = getSupabaseBrowserClient();
  const ownerUserId = await requireUserId();
  if (!supabase || !ownerUserId) {
    return demoProjects.find((project) => project.id === projectId) ?? null;
  }

  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("id", projectId)
    .eq("owner_user_id", ownerUserId)
    .single();

  if (error || !data) return null;
  return mapProject(data);
}

export async function createProject(input: ProjectBriefInput) {
  const supabase = getSupabaseBrowserClient();
  const ownerUserId = await requireUserId();
  if (!supabase || !ownerUserId) {
    return { ok: true, demo: true };
  }

  const { data, error } = await supabase
    .from("projects")
    .insert({
      owner_user_id: ownerUserId,
      name: input.name,
      objective: input.objective,
      why_it_matters: input.whyItMatters,
      current_status: input.currentStatus,
      lifecycle: input.lifecycle,
      escalation: input.escalation,
      scope: input.scope,
      risks: input.risks,
      blockers: input.blockers,
      next_steps: input.nextSteps
    })
    .select("*")
    .single();

  return { ok: !error, data: data ? mapProject(data) : undefined, error: error ? normalizeError(error) : undefined };
}

export async function updateProject(projectId: string, input: Partial<ProjectBriefInput>) {
  const supabase = getSupabaseBrowserClient();
  const ownerUserId = await requireUserId();
  if (!supabase || !ownerUserId) {
    return { ok: true, demo: true };
  }

  const updates: Record<string, unknown> = {};
  if (input.name !== undefined) updates.name = input.name;
  if (input.objective !== undefined) updates.objective = input.objective;
  if (input.whyItMatters !== undefined) updates.why_it_matters = input.whyItMatters;
  if (input.currentStatus !== undefined) updates.current_status = input.currentStatus;
  if (input.lifecycle !== undefined) updates.lifecycle = input.lifecycle;
  if (input.escalation !== undefined) updates.escalation = input.escalation;
  if (input.scope !== undefined) updates.scope = input.scope;
  if (input.risks !== undefined) updates.risks = input.risks;
  if (input.blockers !== undefined) updates.blockers = input.blockers;
  if (input.nextSteps !== undefined) updates.next_steps = input.nextSteps;

  const { data, error } = await supabase
    .from("projects")
    .update(updates)
    .eq("id", projectId)
    .eq("owner_user_id", ownerUserId)
    .select("*")
    .single();

  return { ok: !error, data: data ? mapProject(data) : undefined, error: error ? normalizeError(error) : undefined };
}

export async function listDecisionLogs(projectId?: string): Promise<DecisionLog[]> {
  const supabase = getSupabaseBrowserClient();
  const ownerUserId = await requireUserId();
  if (!supabase || !ownerUserId) return [];

  let query = supabase
    .from("decisions")
    .select("*")
    .eq("owner_user_id", ownerUserId)
    .order("created_at", { ascending: false });

  if (projectId) {
    query = query.eq("project_id", projectId);
  }

  const { data, error } = await query;
  if (error || !data) return [];
  return data.map(mapDecision);
}

export async function createDecisionLog(input: DecisionLogInput) {
  const supabase = getSupabaseBrowserClient();
  const ownerUserId = await requireUserId();
  if (!supabase || !ownerUserId) {
    return { ok: true, demo: true };
  }

  const { data, error } = await supabase
    .from("decisions")
    .insert({
      owner_user_id: ownerUserId,
      project_id: input.projectId || null,
      decision: input.decision,
      context: input.context,
      chosen_direction: input.chosenDirection,
      why: input.why,
      risks: input.risks,
      revisit_trigger: input.revisitTrigger
    })
    .select("*")
    .single();

  return { ok: !error, data: data ? mapDecision(data) : undefined, error: error ? normalizeError(error) : undefined };
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
  return data.map(mapSavepoint);
}

export async function createSavepoint(input: SavepointInput) {
  const supabase = getSupabaseBrowserClient();
  const ownerUserId = await requireUserId();
  if (!supabase || !ownerUserId) {
    return { ok: true, demo: true };
  }

  const { data, error } = await supabase
    .from("savepoints")
    .insert({
      owner_user_id: ownerUserId,
      title: input.title,
      current_status: input.currentStatus,
      decisions_made: input.decisionsMade,
      open_questions: input.openQuestions,
      next_step: input.nextStep,
      continuity_summary: input.continuitySummary
    })
    .select("*")
    .single();

  return { ok: !error, data: data ? mapSavepoint(data) : undefined, error: error ? normalizeError(error) : undefined };
}

export async function getDashboardSummary(): Promise<DashboardSummary> {
  const [tasks, projects] = await Promise.all([listTasks(), listProjects()]);
  return computeDashboardSummary(tasks, projects);
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


export async function createKnowledgeDocument(input: KnowledgeDocumentInput) {
  const supabase = getSupabaseBrowserClient();
  const ownerUserId = await requireUserId();
  if (!supabase || !ownerUserId) {
    return { ok: true, demo: true };
  }

  const { data, error } = await supabase
    .from("knowledge_documents")
    .insert({
      owner_user_id: ownerUserId,
      title: input.title,
      summary: input.summary,
      tags: input.tags,
      source_of_truth: input.sourceOfTruth,
      status: input.status
    })
    .select("*")
    .single();

  return {
    ok: !error,
    data: data
      ? {
          id: data.id,
          title: data.title,
          summary: data.summary,
          tags: data.tags ?? [],
          sourceOfTruth: data.source_of_truth,
          status: data.status,
          updatedAt: data.updated_at
        }
      : undefined,
    error: error ? normalizeError(error) : undefined
  };
}

export async function createContentPack(input: ContentPackInput) {
  const supabase = getSupabaseBrowserClient();
  const ownerUserId = await requireUserId();
  if (!supabase || !ownerUserId) {
    return { ok: true, demo: true };
  }

  const { data, error } = await supabase
    .from("content_packs")
    .insert({
      owner_user_id: ownerUserId,
      title: input.title,
      channel: input.channel,
      asset_type: input.assetType,
      goal: input.goal,
      hook: input.hook,
      repurposing_plan: input.repurposingPlan,
      publish_plan: input.publishPlan
    })
    .select("*")
    .single();

  return {
    ok: !error,
    data: data
      ? {
          id: data.id,
          title: data.title,
          channel: data.channel,
          assetType: data.asset_type,
          goal: data.goal,
          hook: data.hook,
          repurposingPlan: data.repurposing_plan ?? [],
          publishPlan: data.publish_plan
        }
      : undefined,
    error: error ? normalizeError(error) : undefined
  };
}

export async function createBuilderBrief(input: BuilderBriefInput) {
  const supabase = getSupabaseBrowserClient();
  const ownerUserId = await requireUserId();
  if (!supabase || !ownerUserId) {
    return { ok: true, demo: true };
  }

  const { data, error } = await supabase
    .from("builder_briefs")
    .insert({
      owner_user_id: ownerUserId,
      name: input.name,
      product_goal: input.productGoal,
      user_flow: input.userFlow,
      stack_choice: input.stackChoice,
      next_step: input.nextStep
    })
    .select("*")
    .single();

  return {
    ok: !error,
    data: data
      ? {
          id: data.id,
          name: data.name,
          productGoal: data.product_goal,
          userFlow: data.user_flow ?? [],
          stackChoice: data.stack_choice ?? [],
          nextStep: data.next_step
        }
      : undefined,
    error: error ? normalizeError(error) : undefined
  };
}

export async function createHealthFollowUp(input: HealthFollowUpInput) {
  const supabase = getSupabaseBrowserClient();
  const ownerUserId = await requireUserId();
  if (!supabase || !ownerUserId) {
    return { ok: true, demo: true };
  }

  const { data, error } = await supabase
    .from("health_follow_ups")
    .insert({
      owner_user_id: ownerUserId,
      title: input.title,
      urgency_level: input.urgencyLevel,
      likely_domain: input.likelyDomain,
      care_setting: input.careSetting,
      questions_to_prepare: input.questionsToPrepare,
      safety_note: input.safetyNote,
      next_step: input.nextStep
    })
    .select("*")
    .single();

  return {
    ok: !error,
    data: data
      ? {
          id: data.id,
          title: data.title,
          urgencyLevel: data.urgency_level,
          likelyDomain: data.likely_domain,
          careSetting: data.care_setting,
          questionsToPrepare: data.questions_to_prepare ?? [],
          safetyNote: data.safety_note,
          nextStep: data.next_step
        }
      : undefined,
    error: error ? normalizeError(error) : undefined
  };
}

export async function createMonitoringBrief(input: MonitoringBriefInput) {
  const supabase = getSupabaseBrowserClient();
  const ownerUserId = await requireUserId();
  if (!supabase || !ownerUserId) {
    return { ok: true, demo: true };
  }

  const { data, error } = await supabase
    .from("monitoring_briefs")
    .insert({
      owner_user_id: ownerUserId,
      topic: input.topic,
      why_it_matters: input.whyItMatters,
      latest_change: input.latestChange,
      risk_level: input.riskLevel,
      recommended_move: input.recommendedMove
    })
    .select("*")
    .single();

  return {
    ok: !error,
    data: data
      ? {
          id: data.id,
          topic: data.topic,
          whyItMatters: data.why_it_matters,
          latestChange: data.latest_change,
          riskLevel: data.risk_level,
          recommendedMove: data.recommended_move
        }
      : undefined,
    error: error ? normalizeError(error) : undefined
  };
}

export async function listCommandHistory(limit = 12): Promise<CommandHistoryEntry[]> {
  const supabase = getSupabaseBrowserClient();
  const ownerUserId = await requireUserId();
  if (!supabase || !ownerUserId) return [];

  const { data, error } = await supabase
    .from("command_history")
    .select("*")
    .eq("owner_user_id", ownerUserId)
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error || !data) return [];
  return data.map(mapCommandHistory);
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
