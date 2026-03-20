import { demoHealth } from "@misscathy/core";
import { SectionCard } from "../../../components/section-card";

export default function HealthPage() {
  const followUp = demoHealth[0];

  return (
    <div className="grid gap-6 xl:grid-cols-[1fr_1fr]">
      <SectionCard title="Health Ops" description="Educational organization, triage-aware follow-through, and visit prep.">
        <div className="space-y-4 text-sm leading-6 text-slate-300">
          <div><span className="font-medium">Topic:</span> {followUp.title}</div>
          <div><span className="font-medium">Urgency level:</span> {followUp.urgencyLevel}</div>
          <div><span className="font-medium">Likely domain:</span> {followUp.likelyDomain}</div>
          <div><span className="font-medium">Care setting:</span> {followUp.careSetting}</div>
          <div><span className="font-medium">Next step:</span> {followUp.nextStep}</div>
        </div>
      </SectionCard>

      <SectionCard title="Safety boundary" description="Health support stays helpful without pretending to diagnose or prescribe.">
        <div className="space-y-3 text-sm leading-6 text-slate-300">
          {followUp.questionsToPrepare.map((question) => (
            <div key={question} className="rounded-2xl border border-white/10 bg-black/20 p-4">{question}</div>
          ))}
          <div className="rounded-2xl border border-amber-300/20 bg-amber-200/10 p-4 text-amber-50">
            {followUp.safetyNote}
          </div>
        </div>
      </SectionCard>
    </div>
  );
}
