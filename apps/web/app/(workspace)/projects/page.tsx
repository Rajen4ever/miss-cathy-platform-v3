import { demoProjects, demoSavepoints } from "@misscathy/core";
import { SectionCard } from "../../../components/section-card";

export default function ProjectsPage() {
  const project = demoProjects[0];
  const savepoint = demoSavepoints[0];

  return (
    <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
      <SectionCard title={project.name} description={project.objective}>
        <div className="space-y-4 text-sm leading-6 text-slate-300">
          <div><span className="font-medium">Why it matters:</span> {project.whyItMatters}</div>
          <div><span className="font-medium">Current status:</span> {project.currentStatus}</div>
          <div><span className="font-medium">Scope:</span> {project.scope.join(" • ")}</div>
          <div><span className="font-medium">Risks:</span> {project.risks.join(" • ")}</div>
          <div><span className="font-medium">Blockers:</span> {project.blockers.join(" • ")}</div>
          <div><span className="font-medium">Next steps:</span> {project.nextSteps.join(" • ")}</div>
        </div>
      </SectionCard>

      <SectionCard title={savepoint.title} description="Continuity stays visible across sessions and modules.">
        <div className="space-y-4 text-sm leading-6 text-slate-300">
          <div><span className="font-medium">Current status:</span> {savepoint.currentStatus}</div>
          <div><span className="font-medium">Decisions made:</span> {savepoint.decisionsMade.join(" • ")}</div>
          <div><span className="font-medium">Open questions:</span> {savepoint.openQuestions.join(" • ")}</div>
          <div><span className="font-medium">Next step:</span> {savepoint.nextStep}</div>
          <div><span className="font-medium">Summary:</span> {savepoint.continuitySummary}</div>
        </div>
      </SectionCard>
    </div>
  );
}
