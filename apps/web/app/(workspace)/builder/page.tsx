import { demoBuilder } from "@misscathy/core";
import { SectionCard } from "../../../components/section-card";

export default function BuilderPage() {
  const brief = demoBuilder[0];

  return (
    <div className="grid gap-6 xl:grid-cols-[1fr_1fr]">
      <SectionCard title="Builder Studio" description={brief.productGoal}>
        <div className="space-y-4 text-sm leading-6 text-slate-300">
          <div><span className="font-medium">User flow:</span> {brief.userFlow.join(" → ")}</div>
          <div><span className="font-medium">Stack:</span> {brief.stackChoice.join(" • ")}</div>
          <div><span className="font-medium">Next step:</span> {brief.nextStep}</div>
        </div>
      </SectionCard>

      <SectionCard title="Build output" description="The repo already includes web + mobile scaffolds, repositories, schema, and runbooks.">
        <ul className="space-y-3 text-sm leading-6 text-slate-300">
          <li className="rounded-2xl border border-white/10 bg-black/20 p-4">Next.js App Router website</li>
          <li className="rounded-2xl border border-white/10 bg-black/20 p-4">Expo Router Android app</li>
          <li className="rounded-2xl border border-white/10 bg-black/20 p-4">Supabase auth + repository wiring</li>
          <li className="rounded-2xl border border-white/10 bg-black/20 p-4">Reminder flow + connector registry</li>
        </ul>
      </SectionCard>
    </div>
  );
}
