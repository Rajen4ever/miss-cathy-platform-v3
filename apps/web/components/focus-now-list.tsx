import Link from "next/link";
import type { Task } from "@misscathy/types";
import { EmptyState } from "./ui-helpers";

export function FocusNowList({ tasks }: { tasks: Task[] }) {
  if (!tasks.length) {
    return (
      <EmptyState
        title="No focus items yet"
        description="Create a task with a next step and it will appear here."
      />
    );
  }

  return (
    <div className="space-y-3">
      {tasks.map((task) => (
        <div key={task.id} className="rounded-2xl border border-white/10 bg-black/20 p-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="font-medium">{task.title}</div>
              <div className="mt-1 text-xs uppercase tracking-[0.18em] text-slate-500">
                {task.status} • {task.lifecycle} • {task.escalation}
              </div>
            </div>
            <span className="badge">{task.priority}/10</span>
          </div>
          <p className="mt-3 text-sm leading-6 text-slate-300">{task.description}</p>
          <div className="mt-3 rounded-2xl border border-cyan-300/15 bg-cyan-300/10 p-3 text-sm text-cyan-100">
            Next: {task.nextStep || "Add a next step"}
          </div>
          <div className="mt-3 text-right">
            <Link href="/tasks" className="badge">Open tasks</Link>
          </div>
        </div>
      ))}
    </div>
  );
}
