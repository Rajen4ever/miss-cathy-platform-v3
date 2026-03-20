import { demoSavepoints } from "@misscathy/core";
import { SectionCard } from "../../../components/section-card";

export default function ArchivePage() {
  return (
    <SectionCard title="Archive" description="Completed work and continuity history stay accessible without cluttering the active dashboard.">
      <div className="space-y-4">
        {demoSavepoints.map((item) => (
          <div key={item.id} className="rounded-2xl border border-white/10 bg-black/20 p-4 text-sm leading-6 text-slate-300">
            <div className="font-medium">{item.title}</div>
            <p className="mt-2">{item.currentStatus}</p>
            <p className="mt-2 text-cyan-100">Next retained step: {item.nextStep}</p>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}
