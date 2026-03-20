import type {
  ActionPack,
  AppSnapshot,
  BuilderBrief,
  CommandResult,
  ConnectorRegistryItem,
  ContentPack,
  ExecutionBand,
  HealthFollowUp,
  KnowledgeDocument,
  Mode,
  MonitoringBrief,
  ProjectBrief,
  ReminderItem,
  Savepoint,
  Task
} from "@misscathy/types";

export const moduleCatalog = [
  { slug: "dashboard", title: "Command Center", description: "Focus Now, In Progress, Blocked, Waiting On, Risks, and Next 3 Moves." },
  { slug: "tasks", title: "Task + Project OS", description: "Structured briefs, execution tracking, blockers, dependencies, and decisions." },
  { slug: "knowledge", title: "Knowledge Hub", description: "Source-of-truth files, savepoints, archive, and continuity layers." },
  { slug: "command", title: "Auto Command", description: "Short commands routed to truthful execution paths." },
  { slug: "content", title: "Content Studio", description: "Hooks, captions, scripts, repurposing, and publish planning." },
  { slug: "builder", title: "Builder Studio", description: "PRDs, feature maps, screen plans, architecture, and handoff packs." },
  { slug: "health", title: "Health Ops", description: "Educational triage support, visit prep, follow-up, and recovery tracking." },
  { slug: "connectors", title: "Connector Center", description: "Verified status, confirmation policy, execution boundaries, and fallback paths." },
  { slug: "monitoring", title: "Monitoring", description: "Watchlists, briefings, change tracking, and risk summaries." },
  { slug: "archive", title: "Archive", description: "Completed work, continuity history, and savepoint retention." },
  { slug: "settings", title: "Settings", description: "Profile, notification, privacy, and domain toggles." }
] as const;

export const demoTasks: Task[] = [
  {
    id: "task-1",
    title: "Wire live Supabase auth for web and Android",
    description: "Use email/password auth now, preserve room for magic links and social auth later.",
    status: "In Progress",
    nextStep: "Verify sign-in on web and Android with the same account.",
    priority: 10,
    lifecycle: "active",
    escalation: "attention_needed",
    category: "operational",
    dueAt: null,
    ownerDependency: "Requires Supabase project variables."
  },
  {
    id: "task-2",
    title: "Enable Android follow-up reminders",
    description: "Schedule local reminders now and store push tokens for later server delivery.",
    status: "Ready",
    nextStep: "Ask notification permission and schedule a test reminder.",
    priority: 9,
    lifecycle: "active",
    escalation: "stable",
    category: "health",
    dueAt: null,
    ownerDependency: "Requires physical Android device for push validation."
  },
  {
    id: "task-3",
    title: "Verify connector registry truthfulness",
    description: "Keep connector states explicit: active, unconfigured, handoff only, unavailable.",
    status: "Ready",
    nextStep: "Review starter registry and update verified dates after setup.",
    priority: 8,
    lifecycle: "active",
    escalation: "stable",
    category: "strategic",
    dueAt: null,
    ownerDependency: "Requires operator review."
  }
];

export const demoProjects: ProjectBrief[] = [
  {
    id: "project-1",
    name: "Miss Cathy Product Build",
    objective: "Ship a premium website + Android operating system with truthful boundaries.",
    whyItMatters: "Turns the knowledge pack into a practical daily command center.",
    currentStatus: "Core shell, repositories, reminders, and connector registry implemented.",
    lifecycle: "active",
    escalation: "stable",
    scope: ["Website command center", "Android companion app", "Supabase auth + data", "Connector registry", "Reminder flow"],
    risks: ["Credentials not yet attached", "Push delivery requires real device + notification credentials"],
    blockers: ["Supabase project creation is external", "Deployment credentials are external"],
    nextSteps: ["Run SQL schema", "Add env vars", "Verify auth", "Deploy web", "Build Android"]
  }
];

export const demoSavepoints: Savepoint[] = [
  {
    id: "savepoint-1",
    title: "Miss Cathy MVP complete scaffold",
    currentStatus: "Web + Android shells are in place with shared operating logic.",
    decisionsMade: [
      "Website is the full command center",
      "Android is optimized for dashboard, capture, command, and follow-through",
      "Truthful execution bands remain visible"
    ],
    openQuestions: [
      "Which connectors should move from unconfigured to active first?",
      "Will v1 use Expo Push or direct FCM for production delivery?"
    ],
    nextStep: "Create Supabase project and run schema.",
    continuitySummary: "All approved core elements preserved. Complexity is controlled through phased unlocks.",
    updatedAt: "2026-03-18T12:00:00.000Z"
  }
];

export const demoKnowledge: KnowledgeDocument[] = [
  {
    id: "knowledge-1",
    title: "Miss Cathy Core Operating Manual",
    summary: "Mission, preservation rule, truthfulness boundaries, roles, continuity model.",
    tags: ["core", "operating-system", "truthfulness"],
    sourceOfTruth: true,
    status: "active",
    updatedAt: "2026-03-18T12:00:00.000Z"
  },
  {
    id: "knowledge-2",
    title: "Website + Android Product Draft",
    summary: "Product brief, MVP scope, architecture direction, module list, release phases.",
    tags: ["product", "website", "android"],
    sourceOfTruth: true,
    status: "active",
    updatedAt: "2026-03-18T12:00:00.000Z"
  }
];

export const demoContent: ContentPack[] = [
  {
    id: "content-1",
    title: "Miss Cathy Launch Thread",
    channel: "X / Threads",
    assetType: "Launch post pack",
    goal: "Explain the product in a clear founder/operator voice.",
    hook: "From prompt pack to real operating system.",
    repurposingPlan: ["Convert to carousel", "Expand to landing page section", "Adapt into founder video script"],
    publishPlan: "Publish after web preview is live and Android screenshots are captured."
  }
];

export const demoBuilder: BuilderBrief[] = [
  {
    id: "builder-1",
    name: "Miss Cathy v1",
    productGoal: "Build a personal AI chief-of-staff platform for one user across web and Android.",
    userFlow: ["Open dashboard", "Review Focus Now", "Run command", "Save continuity", "Follow through via reminder"],
    stackChoice: ["Next.js App Router", "Expo Router", "Supabase", "Tailwind CSS"],
    nextStep: "Attach real env vars and deploy."
  }
];

export const demoHealth: HealthFollowUp[] = [
  {
    id: "health-1",
    title: "Follow-up review template",
    urgencyLevel: 2,
    likelyDomain: "Primary care / specialist follow-up",
    careSetting: "Routine follow-up",
    questionsToPrepare: ["What changed since the last visit?", "Which symptoms worsened or improved?", "Which records should be brought?"],
    safetyNote: "Educational organization only. Escalate to urgent care or emergency care for severe or red-flag symptoms.",
    nextStep: "Prepare visit brief and reminder."
  }
];

export const demoMonitoring: MonitoringBrief[] = [
  {
    id: "monitoring-1",
    topic: "Website + Android launch readiness",
    whyItMatters: "Prevents deployment drift and keeps quality bars visible.",
    latestChange: "Repositories, reminders, and connector registry were implemented in the scaffold.",
    riskLevel: "moderate",
    recommendedMove: "Complete credentials, staging test, and device validation."
  }
];

export const demoConnectors: ConnectorRegistryItem[] = [
  {
    id: "connector-1",
    connectorName: "Native Workspace Tools",
    connectorFamily: "Native",
    connectorType: "Built-in",
    status: "active_connected",
    connectedService: "Current workspace",
    supportedActions: ["Planning", "Code generation", "Artifacts", "Knowledge organization"],
    inputRequirements: ["Prompt", "Uploaded files"],
    confirmationPolicy: "Normal confirmation for destructive edits only.",
    permissionScope: "Current session tools only",
    executionBoundary: "Direct in-session execution",
    fallbackPath: "None required",
    lastVerified: "2026-03-18",
    notes: "Always available in the active session.",
    truthfulBand: "direct"
  },
  {
    id: "connector-2",
    connectorName: "Calendar / Task / Notes",
    connectorFamily: "Productivity",
    connectorType: "External connector",
    status: "available_but_unconfigured",
    connectedService: "Not configured",
    supportedActions: ["Create event", "Create task", "Append notes"],
    inputRequirements: ["Connector credentials", "Approval", "Required fields"],
    confirmationPolicy: "User confirmation required for writes.",
    permissionScope: "Depends on connected provider",
    executionBoundary: "Connector execution only after verified setup",
    fallbackPath: "Generate Action Pack",
    lastVerified: "2026-03-18",
    notes: "Starter registry entry only.",
    truthfulBand: "connector"
  },
  {
    id: "connector-3",
    connectorName: "Builder / Deployment",
    connectorFamily: "Engineering",
    connectorType: "External connector",
    status: "available_but_unconfigured",
    connectedService: "Not configured",
    supportedActions: ["Create repo", "Create preview deploy", "Update environment variables"],
    inputRequirements: ["Deployment platform access", "Repo access", "Approval"],
    confirmationPolicy: "Explicit approval required before any irreversible action.",
    permissionScope: "Deployment account specific",
    executionBoundary: "Connector or handoff only",
    fallbackPath: "Provide deployment runbook",
    lastVerified: "2026-03-18",
    notes: "Do not claim deployment unless actual integration exists.",
    truthfulBand: "connector"
  },
  {
    id: "connector-4",
    connectorName: "External AI Provider Handoff",
    connectorFamily: "AI",
    connectorType: "Handoff",
    status: "handoff_only",
    connectedService: "Manual handoff",
    supportedActions: ["Prompt transfer", "Model comparison", "External eval"],
    inputRequirements: ["Prompt pack", "Manual execution"],
    confirmationPolicy: "Manual only",
    permissionScope: "No direct access",
    executionBoundary: "Handoff-ready only",
    fallbackPath: "Copy-ready prompt pack",
    lastVerified: "2026-03-18",
    notes: "Prepared payload only; no direct execution.",
    truthfulBand: "handoff"
  }
];

export const demoReminders: ReminderItem[] = [
  {
    id: "reminder-1",
    title: "Review Focus Now",
    body: "Open Miss Cathy and execute the first next move.",
    remindAt: "2026-03-18T18:00:00.000Z",
    status: "scheduled"
  }
];

export const demoSnapshot: AppSnapshot = {
  tasks: demoTasks,
  projects: demoProjects,
  savepoints: demoSavepoints,
  knowledge: demoKnowledge,
  content: demoContent,
  builder: demoBuilder,
  health: demoHealth,
  monitoring: demoMonitoring,
  connectors: demoConnectors,
  reminders: demoReminders
};

const MODE_RULES: Array<{ mode: Mode; keywords: string[] }> = [
  { mode: "research", keywords: ["research", "find", "compare", "synopsis", "source"] },
  { mode: "planning", keywords: ["plan", "roadmap", "prioritize", "choose"] },
  { mode: "execution", keywords: ["build", "implement", "finish", "ship"] },
  { mode: "review", keywords: ["review", "retro", "diagnose", "audit"] },
  { mode: "content", keywords: ["caption", "hook", "script", "campaign", "post"] },
  { mode: "builder", keywords: ["website", "android", "database", "api", "screen", "app"] },
  { mode: "health", keywords: ["symptom", "report", "doctor", "recovery", "follow-up"] },
  { mode: "monitoring", keywords: ["watch", "monitor", "briefing", "risk"] },
  { mode: "knowledge", keywords: ["knowledge", "savepoint", "archive", "document"] }
];

export function routeMode(input: string): Mode {
  const normalized = input.toLowerCase();
  const match = MODE_RULES.find((rule) => rule.keywords.some((keyword) => normalized.includes(keyword)));
  return match?.mode ?? "execution";
}

export function truthfulExecutionBand(input: string): ExecutionBand {
  const normalized = input.toLowerCase();

  if (/(deploy|send|book|publish live|purchase|checkout|create repo|post to)/.test(normalized)) {
    return "connector";
  }
  if (/(handoff|copy this into|submit manually|manual step)/.test(normalized)) {
    return "handoff";
  }
  if (/(recommend|unsupported|not available|no access)/.test(normalized)) {
    return "recommendation";
  }
  return "direct";
}

export function buildActionPack(input: string): ActionPack {
  return {
    objective: input,
    targetService: "External service or connector",
    connectorState: "available_but_unconfigured",
    requiredInputs: ["Verified connector", "User confirmation", "Required fields"],
    preparedPayload: `Prepared payload for: ${input}`,
    confirmationNeeded: true,
    manualStep: "Open the target service, review the prepared payload, and confirm execution.",
    nextStep: "After configuration, re-run through the connector path."
  };
}

export function buildCommandResult(input: string): CommandResult {
  const mode = routeMode(input);
  const executionBand = truthfulExecutionBand(input);

  return {
    mode,
    executionBand,
    headline: "Miss Cathy routed the request into a truthful execution path.",
    sections: [
      {
        title: "Known Context",
        body: "The system preserves dashboard-first operation, continuity, connector honesty, health safety boundaries, and additive upgrades."
      },
      {
        title: "Mode",
        body: `The request maps to ${mode}.`
      },
      {
        title: "Execution Boundary",
        body:
          executionBand === "direct"
            ? "This work can be completed directly inside the product surfaces."
            : executionBand === "connector"
            ? "This work requires a verified external connector and approval-aware execution."
            : executionBand === "handoff"
            ? "This work is prepared as a handoff-ready package, not executed directly."
            : "This work is recommendation-only because the required access or capability is unavailable."
      }
    ],
    nextStep:
      executionBand === "direct"
        ? "Complete the work, then save a continuity record and next step."
        : "Review the action pack and complete the external step through a real connector or manual handoff.",
    actionPack: executionBand === "direct" ? undefined : buildActionPack(input)
  };
}

export function classifyPriorityLabel(priority: number): "Critical" | "High" | "Moderate" | "Low" {
  if (priority >= 9) return "Critical";
  if (priority >= 7) return "High";
  if (priority >= 5) return "Moderate";
  return "Low";
}
