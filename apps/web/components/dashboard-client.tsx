"use client";

import { useEffect, useState } from "react";
import type { ConnectorRegistryItem, ProjectBrief, Task } from "@misscathy/types";
import { listConnectors, listProjects, listTasks } from "../lib/repositories";
import { SectionCard } from "./section-card";
import { StatChip } from "./stat-chip";

export function DashboardClient() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [projects, setProjects] = useState<ProjectBrief[]>([]);
  const [connectors, setConnectors] = useState<ConnectorRegistryItem[]>([]);

  useEffect(() => {
    async function load() {
      const [taskData, projectData, connectorData] = await Promise.all([
        listTasks(),
        listProjects(),
        listConnectors()
      ]);
      setTasks(taskData);
      setProjects(projectData);
      setConnectors(connectorData);
    }

    void load();
  }, []);

  const blocked = tasks.filter((task) => task.escalation === "attention_needed" || task.lifecycle === "at_risk").length;

  return (
    <div className="space-y-6">
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatChip label="Focus Now" value={tasks.length} />
        <StatChip label="Blocked" value={blocked} />
        <StatChip label="Projects" value={projects.length} />
        <StatChip label="Connectors" value={connectors.length} />
      </section>

      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <SectionCard title="Focus Now" description="Live repository view with demo fallback when env or session is unavailable.">
          <div className="space-y-3">
            {tasks.map((task) => (
              <div key={task.id} className="rounded-2xl border border-white/10 bg-black/20 p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="font-medium">{task.title}</div>
                  <span className="badge">{task.priority}/10</span>
                </div>
                <p className="mt-2 text-sm leading-6 text-slate-300">{task.description}</p>
                <div className="mt-3 text-sm text-cyan-100">Next: {task.nextStep}</div>
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Next 3 Moves" description="Kept explicit to maintain low friction.">
          <div className="space-y-3 text-sm leading-6 text-slate-300">
            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">1. Verify sign-in and user bootstrap.</div>
            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">2. Confirm connector registry templates are visible.</div>
            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">3. Validate Android local reminders and push-token registration.</div>
          </div>
        </SectionCard>
      </div>
    </div>
  );
}
