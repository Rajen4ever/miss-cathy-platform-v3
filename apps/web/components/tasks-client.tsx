"use client";

import { useEffect, useState } from "react";
import type { Task } from "@misscathy/types";
import { listTasks } from "../lib/repositories";
import { SectionCard } from "./section-card";

export function TasksClient() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    void listTasks().then(setTasks);
  }, []);

  return (
    <SectionCard title="Task + Project OS" description="Live repository view with truthful fallback.">
      <div className="space-y-4">
        {tasks.map((task) => (
          <div key={task.id} className="rounded-3xl border border-white/10 bg-black/20 p-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <div className="text-lg font-semibold">{task.title}</div>
                <div className="mt-1 text-sm text-slate-400">{task.status} • {task.lifecycle} • {task.escalation}</div>
              </div>
              <span className="badge">{task.priority}/10</span>
            </div>
            <p className="mt-4 text-sm leading-6 text-slate-300">{task.description}</p>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-black/20 p-4 text-sm text-slate-300">
                <div className="font-medium">Next step</div>
                <p className="mt-2">{task.nextStep}</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/20 p-4 text-sm text-slate-300">
                <div className="font-medium">Dependency</div>
                <p className="mt-2">{task.ownerDependency}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}
