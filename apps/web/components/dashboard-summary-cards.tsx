import type { DashboardSummary } from "@misscathy/types";
import { StatChip } from "./stat-chip";

export function DashboardSummaryCards({ summary }: { summary: DashboardSummary }) {
  return (
    <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-6">
      <StatChip label="Focus Now" value={summary.focusNowCount} />
      <StatChip label="In Progress" value={summary.inProgressCount} />
      <StatChip label="Blocked" value={summary.blockedCount} />
      <StatChip label="Waiting On" value={summary.waitingOnCount} />
      <StatChip label="Risks" value={summary.risksCount} />
      <StatChip label="Projects" value={summary.projectCount} />
    </section>
  );
}
