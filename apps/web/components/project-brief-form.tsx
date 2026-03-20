"use client";

import { useState } from "react";
import type { EscalationState, LifecycleState, ProjectBriefInput } from "@misscathy/types";
import { Field, inputClassName } from "./ui-helpers";

const lifecycles: LifecycleState[] = ["idea", "planning", "active", "waiting", "at_risk", "review", "completed", "archived"];
const escalations: EscalationState[] = ["critical", "attention_needed", "stable", "parked"];

const initialProject: ProjectBriefInput = {
  name: "",
  objective: "",
  whyItMatters: "",
  currentStatus: "",
  lifecycle: "planning",
  escalation: "stable",
  scope: [],
  risks: [],
  blockers: [],
  nextSteps: []
};

function parseLines(value: string) {
  return value
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

export function ProjectBriefForm({
  onCreate
}: {
  onCreate: (input: ProjectBriefInput) => Promise<void> | void;
}) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState(initialProject.name);
  const [objective, setObjective] = useState(initialProject.objective);
  const [whyItMatters, setWhyItMatters] = useState(initialProject.whyItMatters);
  const [currentStatus, setCurrentStatus] = useState(initialProject.currentStatus);
  const [lifecycle, setLifecycle] = useState<LifecycleState>(initialProject.lifecycle);
  const [escalation, setEscalation] = useState<EscalationState>(initialProject.escalation);
  const [scopeText, setScopeText] = useState("");
  const [risksText, setRisksText] = useState("");
  const [blockersText, setBlockersText] = useState("");
  const [nextStepsText, setNextStepsText] = useState("");

  async function submit() {
    if (!name.trim()) return;
    await onCreate({
      name: name.trim(),
      objective: objective.trim(),
      whyItMatters: whyItMatters.trim(),
      currentStatus: currentStatus.trim(),
      lifecycle,
      escalation,
      scope: parseLines(scopeText),
      risks: parseLines(risksText),
      blockers: parseLines(blockersText),
      nextSteps: parseLines(nextStepsText)
    });

    setName("");
    setObjective("");
    setWhyItMatters("");
    setCurrentStatus("");
    setLifecycle("planning");
    setEscalation("stable");
    setScopeText("");
    setRisksText("");
    setBlockersText("");
    setNextStepsText("");
    setOpen(false);
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="text-lg font-semibold">New project brief</div>
          <p className="mt-1 text-sm leading-6 text-slate-400">
            Keep the project objective, current status, risks, and next steps in one living brief.
          </p>
        </div>
        <button
          type="button"
          className="rounded-2xl bg-cyan-300 px-4 py-3 text-sm font-medium text-slate-950"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? "Close" : "New project"}
        </button>
      </div>

      {open ? (
        <div className="grid gap-4 rounded-3xl border border-white/10 bg-black/20 p-5 md:grid-cols-2">
          <Field label="Project name">
            <input className={inputClassName()} value={name} onChange={(event) => setName(event.target.value)} placeholder="Project name" />
          </Field>

          <Field label="Current status">
            <input className={inputClassName()} value={currentStatus} onChange={(event) => setCurrentStatus(event.target.value)} placeholder="Where this stands right now" />
          </Field>

          <Field label="Objective">
            <textarea className={`${inputClassName()} min-h-28`} value={objective} onChange={(event) => setObjective(event.target.value)} placeholder="What this project must achieve" />
          </Field>

          <Field label="Why it matters">
            <textarea className={`${inputClassName()} min-h-28`} value={whyItMatters} onChange={(event) => setWhyItMatters(event.target.value)} placeholder="Why this deserves attention" />
          </Field>

          <Field label="Lifecycle">
            <select className={inputClassName()} value={lifecycle} onChange={(event) => setLifecycle(event.target.value as LifecycleState)}>
              {lifecycles.map((value) => (
                <option key={value} value={value}>{value}</option>
              ))}
            </select>
          </Field>

          <Field label="Escalation">
            <select className={inputClassName()} value={escalation} onChange={(event) => setEscalation(event.target.value as EscalationState)}>
              {escalations.map((value) => (
                <option key={value} value={value}>{value}</option>
              ))}
            </select>
          </Field>

          <Field label="Scope" hint="One line per item">
            <textarea className={`${inputClassName()} min-h-28`} value={scopeText} onChange={(event) => setScopeText(event.target.value)} placeholder="Website dashboard&#10;Task CRUD&#10;Project detail page" />
          </Field>

          <Field label="Risks" hint="One line per item">
            <textarea className={`${inputClassName()} min-h-28`} value={risksText} onChange={(event) => setRisksText(event.target.value)} placeholder="Scope creep&#10;Migration mismatch" />
          </Field>

          <Field label="Blockers" hint="One line per item">
            <textarea className={`${inputClassName()} min-h-28`} value={blockersText} onChange={(event) => setBlockersText(event.target.value)} placeholder="Waiting on review&#10;Need final schema check" />
          </Field>

          <Field label="Next steps" hint="One line per item">
            <textarea className={`${inputClassName()} min-h-28`} value={nextStepsText} onChange={(event) => setNextStepsText(event.target.value)} placeholder="Ship dashboard counts&#10;Add project detail view" />
          </Field>

          <div className="md:col-span-2 flex justify-end gap-3">
            <button type="button" className="badge" onClick={() => setOpen(false)}>Cancel</button>
            <button type="button" className="rounded-2xl bg-cyan-300 px-4 py-3 text-sm font-medium text-slate-950" onClick={() => void submit()}>
              Save project
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
