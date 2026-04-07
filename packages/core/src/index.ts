import type {
  ActionPack,
  AppSnapshot,
  BuilderBrief,
  CommandResult,
  ConnectorRegistryItem,
  ContentPack,
  DashboardSummary,
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
    title: "Build the real Task + Project OS",
    description: "Replace placeholder navigation with a true user-scoped execution system backed by Supabase.",
    status: "In Progress",
    nextStep: "Ship task CRUD, live dashboard counts, and project briefs.",
    priority: 10,
    lifecycle: "active",
    escalation: "attention_needed",
    category: "operational",
    dueAt: null,
    ownerDependency: "Code + schema work",
    updatedAt: "2026-03-20T15:45:00.000Z"
  },
  {
    id: "task-2",
    title: "Create first live project brief",
    description: "Use project briefs as the living brief layer for execution, continuity, and decision tracking.",
    status: "Ready",
    nextStep: "Create a product brief for Miss Cathy Task + Project OS.",
    priority: 9,
    lifecycle: "planning",
    escalation: "stable",
    category: "strategic",
    dueAt: null,
    ownerDependency: "Signed-in user action",
    updatedAt: "2026-03-20T15:30:00.000Z"
  },
  {
    id: "task-3",
    title: "Capture the next 3 moves",
    description: "Keep immediate action explicit so the dashboard drives follow-through.",
    status: "Ready",
    nextStep: "Review top priorities and commit the next step for each.",
    priority: 8,
    lifecycle: "active",
    escalation: "stable",
    category: "operational",
    dueAt: null,
    ownerDependency: "Operator review",
    updatedAt: "2026-03-20T15:15:00.000Z"
  }
];

export const demoProjects: ProjectBrief[] = [
  {
    id: "project-1",
    name: "Miss Cathy Task + Project OS",
    objective: "Turn the live site into a real execution operating system instead of a visual shell.",
    whyItMatters: "This is the backbone that makes every other Miss Cathy module operational and accountable.",
    currentStatus: "Source of truth is locked. Real data model and UI workflows are the next build layer.",
    lifecycle: "active",
    escalation: "attention_needed",
    scope: ["Dashboard counts", "Task CRUD", "Project briefs", "Decision logs", "Continuity/savepoints"],
    risks: ["Scope creep", "Placeholder UI drifting away from live data", "Migration mismatch"],
    blockers: ["Need exact implementation pass in the live repo", "Need careful user-scoped Supabase wiring"],
    nextSteps: ["Add repositories", "Ship task form and live list", "Ship project detail flow", "Verify on public site"],
    updatedAt: "2026-03-20T15:50:00.000Z"
  }
];

export const demoSavepoints: Savepoint[] = [
  {
    id: "savepoint-1",
    title: "Miss Cathy live build checkpoint",
    currentStatus: "Website is live. Auth works. Real operational backbone is now under construction.",
    decisionsMade: [
      "Website is the full command center",
      "No fake modules will be passed off as complete",
      "Task + Project OS is the first real functional layer"
    ],
    openQuestions: [
      "Which module should follow Task + Project OS: Knowledge Hub or Health Ops?",
      "Which Android flows should be mirrored first?"
    ],
    nextStep: "Build task CRUD and live dashboard summaries.",
    continuitySummary: "Miss Cathy is now being realigned to the original export purpose: a working modular AI operating system.",
    updatedAt: "2026-03-20T16:00:00.000Z"
  }
];

export const demoKnowledge: KnowledgeDocument[] = [
  {
    id: "knowledge-1",
    title: "Miss Cathy Core Operating Manual",
    summary: "Mission, preservation rule, truthfulness boundaries, roles, and execution doctrine.",
    tags: ["core", "operating-manual"],
    sourceOfTruth: true,
    status: "active",
    updatedAt: "2026-03-18T12:00:00.000Z"
  },
  {
    id: "knowledge-2",
    title: "Website + Android Product Draft",
    summary: "Product direction, surfaces, module scope, delivery order, and implementation notes for the website and Android build.",
    tags: ["product", "website", "android"],
    sourceOfTruth: true,
    status: "active",
    updatedAt: "2026-03-21T09:30:00.000Z"
  }
];

export const demoContent: ContentPack[] = [
  {
    id: "content-1",
    title: "Launch Miss Cathy explainer",
    channel: "website",
    assetType: "landing copy",
    goal: "Explain the product clearly",
    hook: "A real operating system for execution, continuity, and truthful action.",
    repurposingPlan: ["FAQ", "social post", "app store copy"],
    publishPlan: "Update after Task + Project OS goes live."
  }
];

export const demoBuilder: BuilderBrief[] = [
  {
    id: "builder-1",
    name: "Task + Project OS build",
    productGoal: "Convert the live website into a real operating backbone.",
    userFlow: ["Sign in", "Create task", "Create project", "Track next steps", "Review dashboard"],
    stackChoice: ["Next.js", "Supabase", "pnpm monorepo"],
    nextStep: "Implement repositories and CRUD UI."
  }
];

export const demoHealth: HealthFollowUp[] = [
  {
    id: "health-1",
    title: "Health Ops module placeholder",
    urgencyLevel: 2,
    likelyDomain: "general",
    careSetting: "educational",
    questionsToPrepare: ["What are the active symptoms?", "What follow-up is due?"],
    safetyNote: "Educational support only. Escalate urgent symptoms immediately.",
    nextStep: "Build after Task + Project OS and Knowledge Hub."
  }
];

export const demoMonitoring: MonitoringBrief[] = [
  {
    id: "monitoring-1",
    topic: "Miss Cathy live build",
    whyItMatters: "The live site must evolve from shell to real operating system.",
    latestChange: "Auth and user display are live; operational layers are next.",
    riskLevel: "high",
    recommendedMove: "Implement Task + Project OS in the live repo now."
  }
];

export const demoConnectors: ConnectorRegistryItem[] = [
  {
    id: "connector-1",
    connectorName: "Supabase",
    connectorFamily: "backend",
    connectorType: "native",
    status: "active_connected",
    connectedService: "Supabase",
    supportedActions: ["auth", "database", "storage"],
    inputRequirements: ["Project URL", "Publishable key", "Secret key"],
    confirmationPolicy: "No extra confirmation for reads; confirm destructive writes.",
    permissionScope: "Configured for Miss Cathy live project.",
    executionBoundary: "Database and auth only.",
    fallbackPath: "Demo mode when env is absent.",
    lastVerified: "2026-03-20",
    notes: "Primary backend for web and Android.",
    truthfulBand: "direct"
  },
  {
    id: "connector-2",
    connectorName: "Vercel",
    connectorFamily: "deployment",
    connectorType: "git-linked",
    status: "active_connected",
    connectedService: "Vercel",
    supportedActions: ["deploy web"],
    inputRequirements: ["GitHub repo", "Environment variables"],
    confirmationPolicy: "Production deploys happen from Git pushes.",
    permissionScope: "Website only.",
    executionBoundary: "Web deployment pipeline.",
    fallbackPath: "Local dev via pnpm.",
    lastVerified: "2026-03-20",
    notes: "Current public site host.",
    truthfulBand: "connector"
  },
  {
    id: "connector-3",
    connectorName: "Google Play",
    connectorFamily: "distribution",
    connectorType: "handoff-only",
    status: "handoff_only",
    connectedService: "Play Console",
    supportedActions: ["publish android bundle"],
    inputRequirements: ["AAB", "Store listing assets"],
    confirmationPolicy: "Manual console approval required.",
    permissionScope: "Android publishing.",
    executionBoundary: "Cannot publish without real console access.",
    fallbackPath: "Prepare launch pack and handoff.",
    lastVerified: "2026-03-18",
    notes: "Not yet live.",
    truthfulBand: "handoff"
  },
  {
    id: "connector-4",
    connectorName: "GitHub",
    connectorFamily: "source-control",
    connectorType: "git",
    status: "active_connected",
    connectedService: "GitHub",
    supportedActions: ["push code", "auto deploy trigger"],
    inputRequirements: ["Local repo", "Auth"],
    confirmationPolicy: "Commit then push.",
    permissionScope: "Miss Cathy repository.",
    executionBoundary: "User-controlled outside this chat.",
    fallbackPath: "Zip handoff.",
    lastVerified: "2026-03-20",
    notes: "Backs Vercel production site.",
    truthfulBand: "connector"
  }
];

export const demoReminders: ReminderItem[] = [
  {
    id: "reminder-1",
    title: "Review Focus Now",
    body: "Check the top priority tasks and update the next step.",
    remindAt: "2026-03-21T09:00:00.000Z",
    status: "scheduled"
  }
];

export function buildAppSnapshot(): AppSnapshot {
  return {
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
}

export function computeDashboardSummary(tasks: Task[], projects: ProjectBrief[]): DashboardSummary {
  const activeTasks = tasks.filter((task) => task.lifecycle !== "completed" && task.lifecycle !== "archived");
  const focusNow = [...activeTasks]
    .sort((left, right) => {
      const escalationScore = (value: Task["escalation"]) =>
        value === "critical" ? 4 : value === "attention_needed" ? 3 : value === "stable" ? 2 : 1;
      const byEscalation = escalationScore(right.escalation) - escalationScore(left.escalation);
      if (byEscalation !== 0) return byEscalation;
      const byPriority = right.priority - left.priority;
      if (byPriority !== 0) return byPriority;
      return (right.updatedAt ?? "").localeCompare(left.updatedAt ?? "");
    })
    .slice(0, 5);

  const nextMoves = [...activeTasks]
    .filter((task) => task.nextStep.trim().length > 0)
    .sort((left, right) => right.priority - left.priority)
    .slice(0, 3);

  const risks = [
    ...tasks
      .filter((task) => task.lifecycle === "at_risk" || ["critical", "attention_needed"].includes(task.escalation))
      .map((task) => ({
        id: task.id,
        title: task.title,
        type: "task" as const,
        detail: `${task.lifecycle} • ${task.escalation}`
      })),
    ...projects
      .filter((project) => project.lifecycle === "at_risk" || ["critical", "attention_needed"].includes(project.escalation))
      .map((project) => ({
        id: project.id,
        title: project.name,
        type: "project" as const,
        detail: `${project.lifecycle} • ${project.escalation}`
      }))
  ].slice(0, 6);

  return {
    focusNowCount: focusNow.length,
    inProgressCount: tasks.filter((task) => task.lifecycle === "active").length,
    blockedCount: tasks.filter((task) => task.lifecycle === "waiting" || ["critical", "attention_needed"].includes(task.escalation)).length,
    waitingOnCount: tasks.filter((task) => task.lifecycle === "waiting").length,
    risksCount: risks.length,
    projectCount: projects.filter((project) => project.lifecycle !== "archived").length,
    focusNow,
    nextMoves,
    risks
  };
}

function inferModeFromInput(input: string): Mode {
  const value = input.toLowerCase();
  if (value.includes("health")) return "health";
  if (value.includes("builder") || value.includes("mvp") || value.includes("prd") || value.includes("architecture")) return "builder";
  if (value.includes("content") || value.includes("caption") || value.includes("script") || value.includes("publish")) return "content";
  if (value.includes("monitor") || value.includes("watchlist") || value.includes("briefing")) return "monitoring";
  if (value.includes("knowledge") || value.includes("manual") || value.includes("savepoint") || value.includes("archive")) return "knowledge";
  if (value.includes("research") || value.includes("verify")) return "research";
  if (value.includes("review") || value.includes("audit")) return "review";
  if (value.includes("plan") || value.includes("option")) return "planning";
  return "execution";
}

function inferExecutionBandFromInput(input: string): ExecutionBand {
  const value = input.toLowerCase();
  if (value.includes("handoff")) return "handoff";
  if (value.includes("deploy") || value.includes("publish") || value.includes("send") || value.includes("vercel")) return "connector";
  if (value.includes("recommend") || value.includes("if access is not available") || value.includes("without access")) return "recommendation";
  return "direct";
}

function inferTargetPath(input: string): string | undefined {
  const value = input.toLowerCase();
  if (value.includes("dashboard")) return "/dashboard";
  if (value.includes("focus now")) return "/dashboard?panel=focus";
  if (value.includes("next 3 moves")) return "/dashboard?panel=next-moves";
  if (value.includes("task")) return "/tasks";
  if (value.includes("project")) return "/projects";
  if (value.includes("knowledge")) return "/knowledge";
  if (value.includes("operating manual")) return "/knowledge?document=knowledge-1";
  if (value.includes("product draft")) return "/knowledge?document=knowledge-2";
  if (value.includes("archive")) return "/archive";
  if (value.includes("latest savepoint")) return "/archive?savepoint=savepoint-1";
  if (value.includes("content")) return "/content";
  if (value.includes("builder")) return "/builder";
  if (value.includes("health")) return "/health";
  if (value.includes("connector")) return "/connectors";
  if (value.includes("monitor")) return "/monitoring";
  return undefined;
}

export function buildCommandResult(input: string): CommandResult {
  const mode = inferModeFromInput(input);
  const executionBand = inferExecutionBandFromInput(input);
  const targetPath = inferTargetPath(input);
  const value = input.trim();

  const sections = [
    {
      title: "Current status",
      body:
        executionBand === "direct"
          ? "This command can be handled directly in the live workspace without overstating outside access."
          : executionBand === "connector"
            ? "This command points to a connected-system path. Real execution still depends on configured access and confirmation where required."
            : executionBand === "handoff"
              ? "This command should produce a handoff-ready pack rather than pretending direct execution."
              : "This command stays in recommendation mode because direct access is missing or intentionally not assumed."
    },
    {
      title: "What this command implies",
      body:
        targetPath
          ? `The strongest next move is to open ${targetPath} and continue from the relevant live module.`
          : "The strongest next move is to turn this into a specific module action, artifact, or decision."
    }
  ];

  const actionPack: ActionPack | undefined =
    executionBand === "connector" || executionBand === "handoff"
      ? {
          objective: value,
          targetService: value.toLowerCase().includes("vercel") ? "Vercel" : "External connector",
          connectorState: executionBand === "connector" ? "available_but_unconfigured" : "handoff_only",
          requiredInputs: executionBand === "connector"
            ? ["Verified account access", "Required deployment fields", "Approval before write"]
            : ["Target service", "Manual execution owner", "Review before send"],
          preparedPayload:
            executionBand === "connector"
              ? "Prepare deployment target, environment variables, git branch, and approval state before executing."
              : "Prepare a handoff brief with target environment, exact objective, and manual execution steps.",
          confirmationNeeded: true,
          manualStep:
            executionBand === "connector"
              ? "Confirm connector access or switch to a manual deployment runbook."
              : "Send the handoff pack to the execution owner.",
          nextStep:
            executionBand === "connector"
              ? "Verify access, then draft the deployment action."
              : "Generate the final handoff pack."
        }
      : undefined;

  return {
    mode,
    executionBand,
    headline: value || "Route the next command.",
    sections,
    nextStep:
      targetPath
        ? `Open ${targetPath} and continue from the live module.`
        : executionBand === "recommendation"
          ? "Turn this into a recommendation or runbook with explicit assumptions."
          : "Continue from the active module and capture the next step.",
    targetPath,
    actionPack
  };
}
