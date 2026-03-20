import Link from "next/link";
import { moduleCatalog } from "@misscathy/core";
import { ModuleCard } from "../components/module-card";

export default function LandingPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-8 lg:px-6">
      <section className="panel overflow-hidden p-8 shadow-panel lg:p-12">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <div className="badge border-cyan-300/30 bg-cyan-300/10 text-cyan-100">Miss Cathy • Website + Android</div>
            <h1 className="mt-6 max-w-4xl text-4xl font-semibold tracking-tight lg:text-6xl">
              A real operating system for planning, execution, continuity, content, builder work, health follow-through, and truthful action.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300 lg:text-lg">
              Premium command center on web. Fast operational companion on Android. Additive upgrades only.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/dashboard" className="rounded-2xl bg-cyan-300 px-5 py-3 font-medium text-slate-950">Open workspace</Link>
              <Link href="/sign-in" className="rounded-2xl border border-white/10 px-5 py-3 font-medium hover:bg-white/5">Sign in</Link>
              <Link href="/sign-up" className="rounded-2xl border border-white/10 px-5 py-3 font-medium hover:bg-white/5">Create account</Link>
            </div>
          </div>

          <div className="space-y-4">
            <div className="rounded-3xl border border-white/10 bg-black/25 p-5">
              <div className="kicker">Quality goal</div>
              <div className="mt-2 text-2xl font-semibold">10/10 product standard</div>
              <p className="mt-2 text-sm leading-6 text-slate-300">Strong architecture, practical UX, truthful boundaries, moderate complexity.</p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-black/25 p-5">
              <div className="kicker">Truthfulness</div>
              <div className="mt-2 text-lg font-semibold">No fake memory, autonomy, deployment, payment, or clinical authority.</div>
            </div>
            <div className="rounded-3xl border border-white/10 bg-black/25 p-5">
              <div className="kicker">Launch loop</div>
              <div className="mt-2 text-lg font-semibold">Dashboard → Command → Execute → Savepoint → Reminder</div>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {moduleCatalog.slice(0, 8).map((module) => (
          <ModuleCard
            key={module.slug}
            title={module.title}
            description={module.description}
            href={`/${module.slug}`}
          />
        ))}
      </section>
    </main>
  );
}
