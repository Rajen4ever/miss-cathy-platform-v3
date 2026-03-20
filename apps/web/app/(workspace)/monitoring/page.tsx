import { demoMonitoring } from "@misscathy/core";
import { SectionCard } from "../../../components/section-card";

export default function MonitoringPage() {
  const item = demoMonitoring[0];

  return (
    <SectionCard title="Monitoring + Intelligence" description="Watch what changed, why it matters, and what move it implies.">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4 text-sm leading-6 text-slate-300">
        <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
          <div className="font-medium">Topic</div>
          <p className="mt-2">{item.topic}</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
          <div className="font-medium">Why it matters</div>
          <p className="mt-2">{item.whyItMatters}</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
          <div className="font-medium">Latest change</div>
          <p className="mt-2">{item.latestChange}</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
          <div className="font-medium">Recommended move</div>
          <p className="mt-2">{item.recommendedMove}</p>
        </div>
      </div>
    </SectionCard>
  );
}
