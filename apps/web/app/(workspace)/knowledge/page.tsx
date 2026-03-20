import { demoKnowledge, demoSavepoints } from "@misscathy/core";
import { SectionCard } from "../../../components/section-card";

export default function KnowledgePage() {
  return (
    <div className="grid gap-6 xl:grid-cols-[1fr_0.9fr]">
      <SectionCard title="Knowledge Hub" description="Source-of-truth files, briefs, and continuity layers.">
        <div className="space-y-4">
          {demoKnowledge.map((document) => (
            <div key={document.id} className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <div className="flex flex-wrap items-center gap-2">
                <div className="font-medium">{document.title}</div>
                {document.sourceOfTruth ? <span className="badge border-cyan-300/30 bg-cyan-300/10 text-cyan-100">Source of truth</span> : null}
              </div>
              <p className="mt-2 text-sm leading-6 text-slate-300">{document.summary}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {document.tags.map((tag) => <span key={tag} className="badge">{tag}</span>)}
              </div>
            </div>
          ))}
        </div>
      </SectionCard>

      <SectionCard title="Latest savepoint" description="Continuity record ready for resume.">
        <div className="space-y-3 text-sm leading-6 text-slate-300">
          <div className="font-medium">{demoSavepoints[0].title}</div>
          <p>{demoSavepoints[0].continuitySummary}</p>
          <p><span className="font-medium">Next:</span> {demoSavepoints[0].nextStep}</p>
        </div>
      </SectionCard>
    </div>
  );
}
