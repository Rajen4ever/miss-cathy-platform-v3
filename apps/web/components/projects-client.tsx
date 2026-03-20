"use client";

import { useEffect, useState } from "react";
import type { ProjectBrief, ProjectBriefInput } from "@misscathy/types";
import { createProject, listProjects } from "../lib/repositories";
import { SectionCard } from "./section-card";
import { ProjectBriefForm } from "./project-brief-form";
import { ProjectList } from "./project-list";

export function ProjectsClient() {
  const [projects, setProjects] = useState<ProjectBrief[]>([]);
  const [message, setMessage] = useState("Loading project briefs...");

  async function load() {
    const projectData = await listProjects();
    setProjects(projectData);
    setMessage(projectData.length ? "Live project briefs loaded." : "No project briefs yet. Create the first one.");
  }

  useEffect(() => {
    void load();
  }, []);

  async function handleCreate(input: ProjectBriefInput) {
    const response = await createProject(input);
    setMessage(response.ok ? "Project brief created." : response.error ?? "Unable to create project.");
    await load();
  }

  return (
    <div className="space-y-6">
      <SectionCard title="Project briefs" description="Create and maintain living briefs for the work Miss Cathy is driving.">
        <ProjectBriefForm onCreate={handleCreate} />
        <div className="mt-4 rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-slate-300">
          {message}
        </div>
      </SectionCard>

      <SectionCard title="All projects" description="Real project briefs with scope, risks, blockers, and next steps.">
        <ProjectList projects={projects} />
      </SectionCard>
    </div>
  );
}
