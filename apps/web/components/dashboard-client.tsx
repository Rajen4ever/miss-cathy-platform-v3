"use client";

import { useEffect, useState } from "react";
import type { DashboardSummary } from "@misscathy/types";
import { getDashboardSummary, listProjects } from "../lib/repositories";
import { SectionCard } from "./section-card";
import { DashboardSummaryCards } from "./dashboard-summary-cards";
import { FocusNowList } from "./focus-now-list";
import { NextMovesList } from "./next-moves-list";
import { EmptyState } from "./ui-helpers";
import Link from "next/link";

export function DashboardClient() {
  const [summary, setSummary] = useState<DashboardSummary | null>(null);
  const [projectNames, setProjectNames] = useState<string[]>([]);

  useEffect(() => {
    async function load() {
      const [dashboardSummary, projects] = await Promise.all([
        getDashboardSummary(),
        listProjects()
      ]);

      setSummary(dashboardSummary);
      setProjectNames(projects.map((project) => project.name));
    }

    void load();
  }, []);

  if (!summary) {
    return (
      <SectionCard title="Command Center" description="Loading live task and project data.">
        <div className="text-sm text-slate-300">Loading...</div>
      </SectionCard>
    );
  }

  return (
    <div className="space-y-6">
      <DashboardSummaryCards summary={summary} />

      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <SectionCard title="Focus Now" description="Real top priorities generated from your live task data.">
          <FocusNowList tasks={summary.focusNow} />
        </SectionCard>

        <SectionCard title="Next 3 Moves" description="Top actionable tasks with a real next step.">
          <NextMovesList tasks={summary.nextMoves} />
        </SectionCard>
      </div>

      <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <SectionCard title="Risks" description="Tasks and projects that need attention.">
          {summary.risks.length ? (
            <div className="space-y-3">
              {summary.risks.map((item) => (
                <div key={`${item.type}-${item.id}`} className="rounded-2xl border border-white/10 bg-black/20 p-4 text-sm leading-6 text-slate-300">
                  <div className="font-medium text-white">{item.title}</div>
                  <div className="mt-2 text-slate-400">{item.type} • {item.detail}</div>
                </div>
              ))}
            </div>
          ) : (
            <EmptyState
              title="No active risks"
              description="When a task or project moves into at-risk or attention-needed state, it will appear here."
            />
          )}
        </SectionCard>

        <SectionCard title="Live project portfolio" description="Project briefs currently in the system.">
          {projectNames.length ? (
            <div className="space-y-3">
              {projectNames.map((name) => (
                <div key={name} className="rounded-2xl border border-white/10 bg-black/20 p-4 text-sm leading-6 text-slate-300">
                  {name}
                </div>
              ))}
            </div>
          ) : (
            <EmptyState
              title="No live projects"
              description="Create the first project brief to start turning Miss Cathy into a real operating system."
              action={<Link href="/projects" className="badge">Open projects</Link>}
            />
          )}

          <div className="mt-4 flex flex-wrap gap-3">
            <Link href="/tasks" className="badge">Open tasks</Link>
            <Link href="/projects" className="badge">Open projects</Link>
          </div>
        </SectionCard>
      </div>
    </div>
  );
}
