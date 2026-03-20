import Link from "next/link";
import type { Task } from "@misscathy/types";
import { EmptyState } from "./ui-helpers";

export function NextMovesList({ tasks }: { tasks: Task[] }) {
  if (!tasks.length) {
    return (
      <EmptyState
        title="No next moves yet"
        description="Add a clear next step to your tasks and Miss Cathy will surface the top three moves."
      />
    );
  }

  return (
    <div className="space-y-3">
      {tasks.map((task, index) => (
        <div key={task.id} className="rounded-2xl border border-white/10 bg-black/20 p-4 text-sm leading-6 text-slate-300">
          <div className="font-medium text-white">{index + 1}. {task.title}</div>
          <div className="mt-2">Next: {task.nextStep}</div>
          <div className="mt-2 text-xs uppercase tracking-[0.16em] text-slate-500">
            {task.priority}/10 priority • {task.lifecycle}
          </div>
        </div>
      ))}
      <div className="pt-1 text-right">
        <Link href="/tasks" className="badge">Update tasks</Link>
      </div>
    </div>
  );
}
