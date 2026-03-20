import Link from "next/link";
import { moduleCatalog } from "@misscathy/core";

export function Sidebar() {
  return (
    <aside className="hidden w-72 shrink-0 lg:block">
      <div className="sticky top-6 panel p-5">
        <div className="text-xl font-semibold">Miss Cathy</div>
        <p className="mt-2 text-sm leading-6 text-slate-400">
          Personal AI chief-of-staff OS. Premium, truthful, dashboard-first.
        </p>

        <nav className="mt-6 space-y-1">
          {moduleCatalog.map((item) => (
            <Link
              key={item.slug}
              href={`/${item.slug}`}
              className="block rounded-2xl px-3 py-2 text-sm text-slate-300 hover:bg-white/5 hover:text-white"
            >
              {item.title}
            </Link>
          ))}
        </nav>

        <div className="mt-6 rounded-2xl border border-cyan-300/20 bg-cyan-300/10 p-4 text-sm text-cyan-100">
          No fake memory. No fake autonomy. No fake connector execution.
        </div>
      </div>
    </aside>
  );
}
