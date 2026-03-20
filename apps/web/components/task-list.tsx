"use client";

import { useMemo, useState } from "react";
import type { DashboardCategory, EscalationState, LifecycleState, Task, TaskInput } from "@misscathy/types";
import { Field, EmptyState, inputClassName } from "./ui-helpers";

const lifecycleOptions: Array<LifecycleState | "all"> = ["all", "idea", "planning", "active", "waiting", "at_risk", "review", "completed", "archived"];
const escalationOptions: Array<EscalationState | "all"> = ["all", "critical", "attention_needed", "stable", "parked"];
const categoryOptions: Array<DashboardCategory | "all"> = ["all", "strategic", "operational", "personal", "health", "learning", "finance", "admin", "waiting_on", "someday"];

export function TaskList({
  tasks,
  onUpdate,
  onComplete,
  onArchive
}: {
  tasks: Task[];
  onUpdate: (taskId: string, input: Partial<TaskInput>) => Promise<void> | void;
  onComplete: (taskId: string) => Promise<void> | void;
  onArchive: (taskId: string) => Promise<void> | void;
}) {
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const [lifecycle, setLifecycle] = useState<LifecycleState | "all">("all");
  const [escalation, setEscalation] = useState<EscalationState | "all">("all");
  const [category, setCategory] = useState<DashboardCategory | "all">("all");
  const [showArchived, setShowArchived] = useState(false);

  const filtered = useMemo(() => {
    return tasks.filter((task) => {
      if (!showArchived && task.lifecycle === "archived") return false;
      if (lifecycle !== "all" && task.lifecycle !== lifecycle) return false;
      if (escalation !== "all" && task.escalation !== escalation) return false;
      if (category !== "all" && task.category !== category) return false;
      return true;
    });
  }, [tasks, lifecycle, escalation, category, showArchived]);

  if (!tasks.length) {
    return (
      <EmptyState
        title="No tasks yet"
        description="Create the first task and Miss Cathy will start generating live dashboard counts."
      />
    );
  }

  return (
    <div className="space-y-4">
      <div className="grid gap-4 rounded-3xl border border-white/10 bg-black/20 p-4 md:grid-cols-4">
        <Field label="Lifecycle">
          <select className={inputClassName()} value={lifecycle} onChange={(event) => setLifecycle(event.target.value as LifecycleState | "all")}>
            {lifecycleOptions.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </Field>

        <Field label="Escalation">
          <select className={inputClassName()} value={escalation} onChange={(event) => setEscalation(event.target.value as EscalationState | "all")}>
            {escalationOptions.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </Field>

        <Field label="Category">
          <select className={inputClassName()} value={category} onChange={(event) => setCategory(event.target.value as DashboardCategory | "all")}>
            {categoryOptions.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </Field>

        <label className="flex items-end gap-3 text-sm text-slate-300">
          <input type="checkbox" checked={showArchived} onChange={(event) => setShowArchived(event.target.checked)} />
          Show archived
        </label>
      </div>

      <div className="space-y-4">
        {filtered.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            editing={editingTaskId === task.id}
            onEditToggle={() => setEditingTaskId((current) => current === task.id ? null : task.id)}
            onUpdate={onUpdate}
            onComplete={onComplete}
            onArchive={onArchive}
          />
        ))}
      </div>
    </div>
  );
}

function TaskCard({
  task,
  editing,
  onEditToggle,
  onUpdate,
  onComplete,
  onArchive
}: {
  task: Task;
  editing: boolean;
  onEditToggle: () => void;
  onUpdate: (taskId: string, input: Partial<TaskInput>) => Promise<void> | void;
  onComplete: (taskId: string) => Promise<void> | void;
  onArchive: (taskId: string) => Promise<void> | void;
}) {
  const [form, setForm] = useState<Partial<TaskInput>>({
    title: task.title,
    description: task.description,
    category: task.category,
    status: task.status,
    priority: task.priority,
    lifecycle: task.lifecycle,
    escalation: task.escalation,
    nextStep: task.nextStep,
    ownerDependency: task.ownerDependency ?? "",
    dueAt: task.dueAt ?? "",
    projectId: task.projectId ?? ""
  });

  async function save() {
    await onUpdate(task.id, form);
    onEditToggle();
  }

  return (
    <div className="rounded-3xl border border-white/10 bg-black/20 p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="text-lg font-semibold">{task.title}</div>
          <div className="mt-1 text-sm text-slate-400">
            {task.status} • {task.lifecycle} • {task.escalation} • {task.category}
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="badge">{task.priority}/10</span>
          <button type="button" className="badge" onClick={onEditToggle}>{editing ? "Close" : "Edit"}</button>
          {task.lifecycle !== "completed" ? (
            <button type="button" className="badge" onClick={() => void onComplete(task.id)}>Complete</button>
          ) : null}
          {task.lifecycle !== "archived" ? (
            <button type="button" className="badge" onClick={() => void onArchive(task.id)}>Archive</button>
          ) : null}
        </div>
      </div>

      <p className="mt-4 text-sm leading-6 text-slate-300">{task.description || "No description yet."}</p>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-black/20 p-4 text-sm text-slate-300">
          <div className="font-medium text-white">Next step</div>
          <p className="mt-2">{task.nextStep || "Add a next step."}</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-black/20 p-4 text-sm text-slate-300">
          <div className="font-medium text-white">Dependency</div>
          <p className="mt-2">{task.ownerDependency || "No dependency captured."}</p>
        </div>
      </div>

      {editing ? (
        <div className="mt-4 grid gap-4 rounded-3xl border border-white/10 bg-white/5 p-4 md:grid-cols-2">
          <Field label="Title">
            <input className={inputClassName()} value={form.title ?? ""} onChange={(event) => setForm({ ...form, title: event.target.value })} />
          </Field>
          <Field label="Status">
            <input className={inputClassName()} value={form.status ?? ""} onChange={(event) => setForm({ ...form, status: event.target.value })} />
          </Field>
          <Field label="Description">
            <textarea className={`${inputClassName()} min-h-28`} value={form.description ?? ""} onChange={(event) => setForm({ ...form, description: event.target.value })} />
          </Field>
          <div className="grid gap-4">
            <Field label="Next step">
              <input className={inputClassName()} value={form.nextStep ?? ""} onChange={(event) => setForm({ ...form, nextStep: event.target.value })} />
            </Field>
            <Field label="Dependency / blocker owner">
              <input className={inputClassName()} value={form.ownerDependency ?? ""} onChange={(event) => setForm({ ...form, ownerDependency: event.target.value })} />
            </Field>
          </div>
          <Field label="Lifecycle">
            <select className={inputClassName()} value={form.lifecycle ?? task.lifecycle} onChange={(event) => setForm({ ...form, lifecycle: event.target.value as LifecycleState })}>
              {lifecycleOptions.filter((option): option is LifecycleState => option !== "all").map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </Field>
          <Field label="Escalation">
            <select className={inputClassName()} value={form.escalation ?? task.escalation} onChange={(event) => setForm({ ...form, escalation: event.target.value as EscalationState })}>
              {escalationOptions.filter((option): option is EscalationState => option !== "all").map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </Field>
          <Field label="Category">
            <select className={inputClassName()} value={form.category ?? task.category} onChange={(event) => setForm({ ...form, category: event.target.value as DashboardCategory })}>
              {categoryOptions.filter((option): option is DashboardCategory => option !== "all").map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </Field>
          <Field label="Priority score (1-10)">
            <input type="number" min={1} max={10} className={inputClassName()} value={form.priority ?? task.priority} onChange={(event) => setForm({ ...form, priority: Number(event.target.value) || 1 })} />
          </Field>
          <Field label="Due at">
            <input type="datetime-local" className={inputClassName()} value={(form.dueAt ?? "").toString()} onChange={(event) => setForm({ ...form, dueAt: event.target.value })} />
          </Field>
          <div className="md:col-span-2 flex justify-end gap-3">
            <button type="button" className="badge" onClick={onEditToggle}>Cancel</button>
            <button type="button" className="rounded-2xl bg-cyan-300 px-4 py-3 text-sm font-medium text-slate-950" onClick={() => void save()}>
              Save changes
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
