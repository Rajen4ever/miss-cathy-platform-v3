import { SectionCard } from "../../../components/section-card";

export default function SettingsPage() {
  return (
    <div className="grid gap-6 xl:grid-cols-[1fr_1fr]">
      <SectionCard title="Profile + privacy" description="Keep the operating system personalized without overstating memory or access.">
        <ul className="space-y-3 text-sm leading-6 text-slate-300">
          <li className="rounded-2xl border border-white/10 bg-black/20 p-4">Display name and role label</li>
          <li className="rounded-2xl border border-white/10 bg-black/20 p-4">Dashboard defaults and command style</li>
          <li className="rounded-2xl border border-white/10 bg-black/20 p-4">Archive and retention preferences</li>
        </ul>
      </SectionCard>

      <SectionCard title="Notifications + domains" description="High-signal reminders only.">
        <ul className="space-y-3 text-sm leading-6 text-slate-300">
          <li className="rounded-2xl border border-white/10 bg-black/20 p-4">Daily dashboard nudge</li>
          <li className="rounded-2xl border border-white/10 bg-black/20 p-4">Task / follow-up reminders</li>
          <li className="rounded-2xl border border-white/10 bg-black/20 p-4">Health reminders with clear labeling and easy snooze</li>
        </ul>
      </SectionCard>
    </div>
  );
}
