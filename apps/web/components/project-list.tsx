import Link from "next/link";
import type { ProjectBrief } from "@misscathy/types";
import { EmptyState } from "./ui-helpers";

export function ProjectList({ projects }: { projects: ProjectBrief[] }) {
  if (!projects.length) {
    return (
      <EmptyState
        title="No projects yet"
        description="Create the first project brief and Miss Cathy will keep the living brief visible."
      />
    );
  }

  return (
    <div className="space-y-4">
      {projects.map((project) => (
        <div key={project.id} className="rounded-3xl border border-white/10 bg-black/20 p-5">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <div className="text-lg font-semibold">{project.name}</div>
              <div className="mt-1 text-sm text-slate-400">
                {project.lifecycle} • {project.escalation}
              </div>
            </div>
            <Link href={`/projects/${project.id}`} className="badge">Open brief</Link>
          </div>

          <p className="mt-4 text-sm leading-6 text-slate-300">{project.objective}</p>

          <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <ProjectFact label="Current status" value={project.currentStatus} />
            <ProjectFact label="Scope" value={project.scope.join(" • ") || "No scope yet"} />
            <ProjectFact label="Risks" value={project.risks.join(" • ") || "No risks yet"} />
            <ProjectFact label="Next steps" value={project.nextSteps.join(" • ") || "No next steps yet"} />
          </div>
        </div>
      ))}
    </div>
  );
}

function ProjectFact({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/20 p-4 text-sm leading-6 text-slate-300">
      <div className="font-medium text-white">{label}</div>
      <div className="mt-2">{value}</div>
    </div>
  );
}
