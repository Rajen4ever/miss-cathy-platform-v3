"use client";

import { useEffect, useMemo, useState } from "react";
import type { ContentPack, ContentPackInput } from "@misscathy/types";
import { createContentPack, listContent } from "../lib/repositories";
import { EmptyState, Field, inputClassName } from "./ui-helpers";
import { SectionCard } from "./section-card";

function parseLines(value: string) {
  return value
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

export function ContentClient() {
  const [items, setItems] = useState<ContentPack[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [message, setMessage] = useState("Loading content packs...");
  const [open, setOpen] = useState(false);
  const [repurposingText, setRepurposingText] = useState("");
  const [form, setForm] = useState<ContentPackInput>({
    title: "",
    channel: "",
    assetType: "",
    goal: "",
    hook: "",
    repurposingPlan: [],
    publishPlan: ""
  });

  async function load() {
    const data = await listContent();
    setItems(data);
    setSelectedId((current) => current ?? data[0]?.id ?? null);
    setMessage(data.length ? "Content packs loaded." : "No content packs yet. Create the first one.");
  }

  useEffect(() => {
    void load();
  }, []);

  const selected = useMemo(() => items.find((item) => item.id === selectedId) ?? items[0] ?? null, [items, selectedId]);

  async function handleCreate() {
    if (!form.title.trim()) return;
    const response = await createContentPack({
      ...form,
      title: form.title.trim(),
      channel: form.channel.trim(),
      assetType: form.assetType.trim(),
      goal: form.goal.trim(),
      hook: form.hook.trim(),
      repurposingPlan: parseLines(repurposingText),
      publishPlan: form.publishPlan.trim()
    });
    setMessage(response.ok ? "Content pack saved." : response.error ?? "Unable to save content pack.");
    if (response.ok) {
      setForm({ title: "", channel: "", assetType: "", goal: "", hook: "", repurposingPlan: [], publishPlan: "" });
      setRepurposingText("");
      setOpen(false);
      await load();
    }
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
      <SectionCard title="Content Studio" description="Idea-to-publish operating layer with reusable content packs.">
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="text-sm text-slate-400">{message}</div>
            <button type="button" className="badge" onClick={() => setOpen((value) => !value)}>
              {open ? "Close" : "New content pack"}
            </button>
          </div>

          {open ? (
            <div className="grid gap-4 rounded-3xl border border-white/10 bg-black/20 p-4">
              <Field label="Title">
                <input className={inputClassName()} value={form.title} onChange={(event) => setForm({ ...form, title: event.target.value })} />
              </Field>
              <div className="grid gap-4 md:grid-cols-2">
                <Field label="Channel">
                  <input className={inputClassName()} value={form.channel} onChange={(event) => setForm({ ...form, channel: event.target.value })} placeholder="website, x, linkedin" />
                </Field>
                <Field label="Asset type">
                  <input className={inputClassName()} value={form.assetType} onChange={(event) => setForm({ ...form, assetType: event.target.value })} placeholder="landing copy, post, script" />
                </Field>
              </div>
              <Field label="Goal">
                <textarea className={`${inputClassName()} min-h-24`} value={form.goal} onChange={(event) => setForm({ ...form, goal: event.target.value })} />
              </Field>
              <Field label="Hook">
                <textarea className={`${inputClassName()} min-h-24`} value={form.hook} onChange={(event) => setForm({ ...form, hook: event.target.value })} />
              </Field>
              <Field label="Repurposing plan" hint="One line per item">
                <textarea className={`${inputClassName()} min-h-24`} value={repurposingText} onChange={(event) => setRepurposingText(event.target.value)} />
              </Field>
              <Field label="Publish plan">
                <textarea className={`${inputClassName()} min-h-24`} value={form.publishPlan} onChange={(event) => setForm({ ...form, publishPlan: event.target.value })} />
              </Field>
              <div className="flex justify-end gap-3">
                <button type="button" className="badge" onClick={() => setOpen(false)}>Cancel</button>
                <button type="button" className="rounded-2xl bg-cyan-300 px-4 py-3 text-sm font-medium text-slate-950" onClick={() => void handleCreate()}>
                  Save content pack
                </button>
              </div>
            </div>
          ) : null}

          {items.length ? (
            <div className="space-y-3">
              {items.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setSelectedId(item.id)}
                  className={`w-full rounded-2xl border p-4 text-left transition ${
                    selected?.id === item.id ? "border-cyan-300/30 bg-cyan-300/10" : "border-white/10 bg-black/20 hover:bg-white/5"
                  }`}
                >
                  <div className="font-medium text-white">{item.title}</div>
                  <div className="mt-1 text-sm text-slate-400">{item.channel} • {item.assetType}</div>
                  <p className="mt-2 text-sm leading-6 text-slate-300">{item.goal}</p>
                </button>
              ))}
            </div>
          ) : (
            <EmptyState
              title="No content packs yet"
              description="Create the first content pack so content planning becomes a real operating surface."
            />
          )}
        </div>
      </SectionCard>

      <SectionCard title={selected?.title ?? "Content detail"} description="Select a pack on the left to inspect the current hook, goal, and publish plan.">
        {selected ? (
          <div className="space-y-4 text-sm leading-6 text-slate-300">
            <div><span className="font-medium text-white">Channel:</span> {selected.channel}</div>
            <div><span className="font-medium text-white">Asset type:</span> {selected.assetType}</div>
            <div><span className="font-medium text-white">Goal:</span> {selected.goal}</div>
            <div><span className="font-medium text-white">Hook:</span> {selected.hook}</div>
            <div>
              <div className="font-medium text-white">Repurposing plan</div>
              <div className="mt-2 space-y-2">
                {selected.repurposingPlan.length ? selected.repurposingPlan.map((item) => (
                  <div key={item} className="rounded-2xl border border-white/10 bg-black/20 p-3">{item}</div>
                )) : <div className="text-slate-500">No repurposing plan yet.</div>}
              </div>
            </div>
            <div className="rounded-2xl border border-cyan-300/20 bg-cyan-300/10 p-4 text-cyan-100">
              Publish plan: {selected.publishPlan || "No publish plan yet."}
            </div>
          </div>
        ) : (
          <EmptyState
            title="No content pack selected"
            description="Choose a content pack from the left column to inspect its detail."
          />
        )}
      </SectionCard>
    </div>
  );
}
