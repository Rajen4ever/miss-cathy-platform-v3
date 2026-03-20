import { demoContent } from "@misscathy/core";
import { SectionCard } from "../../../components/section-card";

export default function ContentPage() {
  const pack = demoContent[0];

  return (
    <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
      <SectionCard title="Content Studio" description="Idea-to-publish operating layer.">
        <div className="space-y-4 text-sm leading-6 text-slate-300">
          <div><span className="font-medium">Title:</span> {pack.title}</div>
          <div><span className="font-medium">Channel:</span> {pack.channel}</div>
          <div><span className="font-medium">Asset type:</span> {pack.assetType}</div>
          <div><span className="font-medium">Goal:</span> {pack.goal}</div>
          <div><span className="font-medium">Hook:</span> {pack.hook}</div>
          <div><span className="font-medium">Publish plan:</span> {pack.publishPlan}</div>
        </div>
      </SectionCard>

      <SectionCard title="Repurposing plan" description="One asset should branch into multiple surfaces.">
        <ul className="space-y-3 text-sm leading-6 text-slate-300">
          {pack.repurposingPlan.map((item) => <li key={item} className="rounded-2xl border border-white/10 bg-black/20 p-4">{item}</li>)}
        </ul>
      </SectionCard>
    </div>
  );
}
