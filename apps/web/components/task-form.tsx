"use client";

import { useMemo, useState } from "react";
import type { DashboardCategory, EscalationState, LifecycleState, ProjectBrief, TaskInput } from "@misscathy/types";
import { Field, inputClassName } from "./ui-helpers";

const categories: DashboardCategory[] = ["strategic", "operational", "personal", "health", "learning", "finance", "admin", "waiting_on", "someday"];
const lifecycles: LifecycleState[] = ["idea", "planning", "active", "waiting", "at_risk", "review", "completed", "archived"];
const escalations: EscalationState[] = ["critical", "attention_needed", "stable", "parked"];

const initialTask: TaskInput = {
  title: "",
  description: "",
  category: "operational",
  status: "Open",
  priority: 5,
  lifecycle: "planning",
  escalation: "stable",
  nextStep: "",
  ownerDependency: "",
  dueAt: "",
  projectId: ""
};

export function TaskForm({
  onCreate,
  projects
}: {
  onCreate: (input: TaskInput) => Promise<void> | void;
  projects: ProjectBrief[];
}) {
  const [form, setForm] = useState<TaskInput>(initialTask);
  const [open, setOpen] = useState(false);

  const projectOptions = useMemo(() => [{ id: "", name: "No linked project" }, ...projects.map((project) => ({ id: project.id, name: project.name }))], [projects]);

  async function submit() {
    if (!form.title.trim()) return;
    await onCreate({
      ...form,
      title: form.title.trim(),
      description: form.description.trim(),
      nextStep: form.nextStep.trim(),
      ownerDependency: form.ownerDependency.trim(),
      dueAt: form.dueAt || null,
      projectId: form.projectId || null
    });
    setForm(initialTask);
    setOpen(false);
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="text-lg font-semibold">Quick add task</div>
          <p className="mt-1 text-sm leading-6 text-slate-400">
            Keep the next step explicit so the dashboard stays operational.
          </p>
        </div>
        <button
          type="button"
          className="rounded-2xl bg-cyan-300 px-4 py-3 text-sm font-medium text-slate-950"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? "Close" : "New task"}
        </button>
      </div>

      {open ? (
        <div className="grid gap-4 rounded-3xl border border-white/10 bg-black/20 p-5 md:grid-cols-2">
          <Field label="Title">
            <input className={inputClassName()} value={form.title} onChange={(event) => setForm({ ...form, title: event.target.value })} placeholder="What needs to happen?" />
          </Field>

          <Field label="Project link">
            <select className={inputClassName()} value={form.projectId ?? ""} onChange={(event) => setForm({ ...form, projectId: event.target.value })}>
              {projectOptions.map((option) => (
                <option key={option.id} value={option.id}>{option.name}</option>
              ))}
            </select>
          </Field>

          <Field label="Description">
            <textarea className={`${inputClassName()} min-h-28`} value={form.description} onChange={(event) => setForm({ ...form, description: event.target.value })} placeholder="Context, details, and what good looks like." />
          </Field>

          <div className="grid gap-4">
            <Field label="Next step">
              <input className={inputClassName()} value={form.nextStep} onChange={(event) => setForm({ ...form, nextStep: event.target.value })} placeholder="What should happen next?" />
            </Field>

            <Field label="Dependency / blocker owner">
              <input className={inputClassName()} value={form.ownerDependency} onChange={(event) => setForm({ ...form, ownerDependency: event.target.value })} placeholder="Who or what does this depend on?" />
            </Field>
          </div>

          <Field label="Category">
            <select className={inputClassName()} value={form.category} onChange={(event) => setForm({ ...form, category: event.target.value as DashboardCategory })}>
              {categories.map((category) => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </Field>

          <Field label="Status">
            <input className={inputClassName()} value={form.status} onChange={(event) => setForm({ ...form, status: event.target.value })} placeholder="Open / In Progress / Waiting..." />
          </Field>

          <Field label="Lifecycle">
            <select className={inputClassName()} value={form.lifecycle} onChange={(event) => setForm({ ...form, lifecycle: event.target.value as LifecycleState })}>
              {lifecycles.map((lifecycle) => (
                <option key={lifecycle} value={lifecycle}>{lifecycle}</option>
              ))}
            </select>
          </Field>

          <Field label="Escalation">
            <select className={inputClassName()} value={form.escalation} onChange={(event) => setForm({ ...form, escalation: event.target.value as EscalationState })}>
              {escalations.map((escalation) => (
                <option key={escalation} value={escalation}>{escalation}</option>
              ))}
            </select>
          </Field>

          <Field label="Priority score (1-10)">
            <input type="number" min={1} max={10} className={inputClassName()} value={form.priority} onChange={(event) => setForm({ ...form, priority: Number(event.target.value) || 1 })} />
          </Field>

          <Field label="Due at">
            <input type="datetime-local" className={inputClassName()} value={form.dueAt ?? ""} onChange={(event) => setForm({ ...form, dueAt: event.target.value })} />
          </Field>

          <div className="md:col-span-2 flex justify-end gap-3">
            <button type="button" className="badge" onClick={() => setOpen(false)}>Cancel</button>
            <button type="button" className="rounded-2xl bg-cyan-300 px-4 py-3 text-sm font-medium text-slate-950" onClick={() => void submit()}>
              Save task
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
