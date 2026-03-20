"use client";

import { useEffect, useState } from "react";
import type { ProjectBrief, Task, TaskInput } from "@misscathy/types";
import { archiveTask, completeTask, createTask, listProjects, listTasks, updateTask } from "../lib/repositories";
import { SectionCard } from "./section-card";
import { TaskForm } from "./task-form";
import { TaskList } from "./task-list";

export function TasksClient() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [projects, setProjects] = useState<ProjectBrief[]>([]);
  const [message, setMessage] = useState("Loading tasks...");

  async function load() {
    const [taskData, projectData] = await Promise.all([listTasks(), listProjects()]);
    setTasks(taskData);
    setProjects(projectData);
    setMessage(taskData.length ? "Live task data loaded." : "No tasks yet. Create the first one.");
  }

  useEffect(() => {
    void load();
  }, []);

  async function handleCreate(input: TaskInput) {
    const response = await createTask(input);
    setMessage(response.ok ? "Task created." : response.error ?? "Unable to create task.");
    await load();
  }

  async function handleUpdate(taskId: string, input: Partial<TaskInput>) {
    const response = await updateTask(taskId, input);
    setMessage(response.ok ? "Task updated." : response.error ?? "Unable to update task.");
    await load();
  }

  async function handleComplete(taskId: string) {
    const response = await completeTask(taskId);
    setMessage(response.ok ? "Task completed." : response.error ?? "Unable to complete task.");
    await load();
  }

  async function handleArchive(taskId: string) {
    const response = await archiveTask(taskId);
    setMessage(response.ok ? "Task archived." : response.error ?? "Unable to archive task.");
    await load();
  }

  return (
    <div className="space-y-6">
      <SectionCard title="Task + Project OS" description="Create, update, complete, and archive real tasks backed by Supabase.">
        <TaskForm onCreate={handleCreate} projects={projects} />
        <div className="mt-4 rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-slate-300">
          {message}
        </div>
      </SectionCard>

      <SectionCard title="All tasks" description="User-scoped live task list with filters and inline editing.">
        <TaskList tasks={tasks} onUpdate={handleUpdate} onComplete={handleComplete} onArchive={handleArchive} />
      </SectionCard>
    </div>
  );
}
