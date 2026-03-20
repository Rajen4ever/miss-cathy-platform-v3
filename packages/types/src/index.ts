export type LifecycleState =
  | "idea"
  | "planning"
  | "active"
  | "waiting"
  | "at_risk"
  | "review"
  | "completed"
  | "archived";

export type EscalationState = "critical" | "attention_needed" | "stable" | "parked";

export type DashboardCategory =
  | "strategic"
  | "operational"
  | "personal"
  | "health"
  | "learning"
  | "finance"
  | "admin"
  | "waiting_on"
  | "someday";

export type Mode =
  | "research"
  | "planning"
  | "execution"
  | "review"
  | "content"
  | "builder"
  | "health"
  | "monitoring"
  | "knowledge";

export type ExecutionBand = "direct" | "connector" | "handoff" | "recommendation";

export type ConnectorStatus =
  | "active_connected"
  | "available_but_unconfigured"
  | "handoff_only"
  | "unavailable";

export interface DashboardItem {
  id: string;
  title: string;
  status: string;
  nextStep: string;
  priority: number;
  lifecycle: LifecycleState;
  escalation: EscalationState;
  category: DashboardCategory;
}

export interface Task extends DashboardItem {
  description: string;
  dueAt?: string | null;
  projectId?: string | null;
  ownerDependency?: string;
}

export interface ProjectBrief {
  id: string;
  name: string;
  objective: string;
  whyItMatters: string;
  currentStatus: string;
  lifecycle: LifecycleState;
  escalation: EscalationState;
  scope: string[];
  risks: string[];
  blockers: string[];
  nextSteps: string[];
}

export interface DecisionLog {
  id: string;
  projectId?: string | null;
  decision: string;
  context: string;
  chosenDirection: string;
  why: string;
  risks: string[];
  revisitTrigger: string;
  createdAt: string;
}

export interface Savepoint {
  id: string;
  title: string;
  currentStatus: string;
  decisionsMade: string[];
  openQuestions: string[];
  nextStep: string;
  continuitySummary: string;
  updatedAt: string;
}

export interface KnowledgeDocument {
  id: string;
  title: string;
  summary: string;
  tags: string[];
  sourceOfTruth: boolean;
  status: "active" | "archived";
  updatedAt: string;
}

export interface ContentPack {
  id: string;
  title: string;
  channel: string;
  assetType: string;
  goal: string;
  hook: string;
  repurposingPlan: string[];
  publishPlan: string;
}

export interface BuilderBrief {
  id: string;
  name: string;
  productGoal: string;
  userFlow: string[];
  stackChoice: string[];
  nextStep: string;
}

export interface HealthFollowUp {
  id: string;
  title: string;
  urgencyLevel: 1 | 2 | 3 | 4;
  likelyDomain: string;
  careSetting: string;
  questionsToPrepare: string[];
  safetyNote: string;
  nextStep: string;
}

export interface MonitoringBrief {
  id: string;
  topic: string;
  whyItMatters: string;
  latestChange: string;
  riskLevel: "low" | "moderate" | "high";
  recommendedMove: string;
}

export interface ReminderItem {
  id: string;
  title: string;
  body: string;
  remindAt: string;
  status: "scheduled" | "sent" | "cancelled";
}

export interface ConnectorRegistryItem {
  id: string;
  connectorName: string;
  connectorFamily: string;
  connectorType: string;
  status: ConnectorStatus;
  connectedService: string;
  supportedActions: string[];
  inputRequirements: string[];
  confirmationPolicy: string;
  permissionScope: string;
  executionBoundary: string;
  fallbackPath: string;
  lastVerified: string;
  notes: string;
  truthfulBand: ExecutionBand;
}

export interface ActionPack {
  objective: string;
  targetService: string;
  connectorState: ConnectorStatus;
  requiredInputs: string[];
  preparedPayload: string;
  confirmationNeeded: boolean;
  manualStep: string;
  nextStep: string;
}

export interface CommandSection {
  title: string;
  body: string;
}

export interface CommandResult {
  mode: Mode;
  executionBand: ExecutionBand;
  headline: string;
  sections: CommandSection[];
  nextStep: string;
  actionPack?: ActionPack;
}

export interface SessionUser {
  id: string;
  email: string;
  displayName?: string | null;
}

export interface AppSnapshot {
  tasks: Task[];
  projects: ProjectBrief[];
  savepoints: Savepoint[];
  knowledge: KnowledgeDocument[];
  content: ContentPack[];
  builder: BuilderBrief[];
  health: HealthFollowUp[];
  monitoring: MonitoringBrief[];
  connectors: ConnectorRegistryItem[];
  reminders: ReminderItem[];
}
