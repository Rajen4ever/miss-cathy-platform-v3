import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function ModuleCard(props: { title: string; description: string; href: string }) {
  return (
    <Link href={props.href} className="panel block p-5 hover:border-cyan-300/30 hover:bg-white/[0.06]">
      <div className="text-lg font-semibold">{props.title}</div>
      <p className="mt-2 text-sm leading-6 text-slate-400">{props.description}</p>
      <div className="mt-4 inline-flex items-center gap-2 text-sm text-cyan-200">
        Open module <ArrowRight className="h-4 w-4" />
      </div>
    </Link>
  );
}
