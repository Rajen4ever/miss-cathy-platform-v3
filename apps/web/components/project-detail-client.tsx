"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { DecisionLog, DecisionLogInput, ProjectBrief, ProjectBriefInput, Savepoint, SavepointInput } from "@misscathy/types";
import { createDecisionLog, createSavepoint, getProject, listDecisionLogs, listSavepoints, updateProject } from "../lib/repositories";
import { SectionCard } from "./section-card";
import { DecisionLogForm } from "./decision-log-form";
import { ContinuityCard } from "./continuity-card";
import { Field, inputClassName } from "./ui-helpers";

function toLines(values: string[]) {
  return values.join("\n");
}

function parseLines(value: string) {
  return value
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

export function ProjectDetailClient({ projectId }: { projectId: string }) {
  const [project, setProject] = useState<ProjectBrief | null>(null);
  const [decisions, setDecisions] = useState<DecisionLog[]>([]);
  const [savepoints, setSavepoints] = useState<Savepoint[]>([]);
  const [message, setMessage] = useState("Loading project brief...");
  const [scopeText, setScopeText] = useState("");
  const [risksText, setRisksText] = useState("");
  const [blockersText, setBlockersText] = useState("");
  const [nextStepsText, setNextStepsText] = useState("");

  async function load() {
    const [projectData, decisionData, savepointData] = await Promise.all([
      getProject(projectId),
      listDecisionLogs(projectId),
      listSavepoints()
    ]);

    setProject(projectData);
    setDecisions(decisionData);
    setSavepoints(savepointData);
    setScopeText(projectData ? toLines(projectData.scope) : "");
    setRisksText(projectData ? toLines(projectData.risks) : "");
    setBlockersText(projectData ? toLines(projectData.blockers) : "");
    setNextStepsText(projectData ? toLines(projectData.nextSteps) : "");
    setMessage(projectData ? "Live project brief loaded." : "Project not found.");
  }

  useEffect(() => {
    void load();
  }, [projectId]);

  if (!project) {
    return (
      <SectionCard title="Project brief" description="Open a project from the projects page.">
        <div className="space-y-4 text-sm leading-6 text-slate-300">
          <div>{message}</div>
          <Link href="/projects" className="badge">Back to projects</Link>
        </div>
      </SectionCard>
    );
  }

  async function saveProject() {
    const input: Partial<ProjectBriefInput> = {
      name: project.name,
      objective: project.objective,
      whyItMatters: project.whyItMatters,
      currentStatus: project.currentStatus,
      lifecycle: project.lifecycle,
      escalation: project.escalation,
      scope: parseLines(scopeText),
      risks: parseLines(risksText),
      blockers: parseLines(blockersText),
      nextSteps: parseLines(nextStepsText)
    };
    const response = await updateProject(project.id, input);
    setMessage(response.ok ? "Project updated." : response.error ?? "Unable to update project.");
    await load();
  }

  async function handleDecision(input: DecisionLogInput) {
    const response = await createDecisionLog(input);
    setMessage(response.ok ? "Decision log saved." : response.error ?? "Unable to save decision log.");
    await load();
  }

  async function handleSavepoint(input: SavepointInput) {
    const response = await createSavepoint(input);
    setMessage(response.ok ? "Savepoint saved." : response.error ?? "Unable to save savepoint.");
    await load();
  }

  return (
    <div className="space-y-6">
      <SectionCard title={project.name} description={project.objective}>
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Project name">
            <input className={inputClassName()} value={project.name} onChange={(event) => setProject({ ...project, name: event.target.value })} />
          </Field>

          <Field label="Current status">
            <input className={inputClassName()} value={project.currentStatus} onChange={(event) => setProject({ ...project, currentStatus: event.target.value })} />
          </Field>

          <Field label="Objective">
            <textarea className={`${inputClassName()} min-h-28`} value={project.objective} onChange={(event) => setProject({ ...project, objective: event.target.value })} />
          </Field>

          <Field label="Why it matters">
            <textarea className={`${inputClassName()} min-h-28`} value={project.whyItMatters} onChange={(event) => setProject({ ...project, whyItMatters: event.target.value })} />
          </Field>

          <Field label="Scope" hint="One line per item">
            <textarea className={`${inputClassName()} min-h-28`} value={scopeText} onChange={(event) => setScopeText(event.target.value)} />
          </Field>

          <Field label="Risks" hint="One line per item">
            <textarea className={`${inputClassName()} min-h-28`} value={risksText} onChange={(event) => setRisksText(event.target.value)} />
          </Field>

          <Field label="Blockers" hint="One line per item">
            <textarea className={`${inputClassName()} min-h-28`} value={blockersText} onChange={(event) => setBlockersText(event.target.value)} />
          </Field>

          <Field label="Next steps" hint="One line per item">
            <textarea className={`${inputClassName()} min-h-28`} value={nextStepsText} onChange={(event) => setNextStepsText(event.target.value)} />
          </Field>
        </div>

        <div className="mt-4 flex flex-wrap justify-between gap-3">
          <div className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-slate-300">
            {message}
          </div>
          <div className="flex gap-3">
            <Link href="/projects" className="badge">Back to projects</Link>
            <button type="button" className="rounded-2xl bg-cyan-300 px-4 py-3 text-sm font-medium text-slate-950" onClick={() => void saveProject()}>
              Save project
            </button>
          </div>
        </div>
      </SectionCard>

      <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
        <SectionCard title="Decision log" description="Capture why a direction was chosen so future changes stay grounded.">
          <DecisionLogForm projectId={project.id} decisions={decisions} onCreate={handleDecision} />
        </SectionCard>

        <SectionCard title="Continuity / savepoints" description="Keep current status, open questions, and next step visible.">
          <ContinuityCard savepoints={savepoints} onCreate={handleSavepoint} />
        </SectionCard>
      </div>
    </div>
  );
}
