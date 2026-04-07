"use client";

import { useEffect, useMemo, useState } from "react";
import type { MonitoringBrief, MonitoringBriefInput } from "@misscathy/types";
import { createMonitoringBrief, listMonitoring } from "../lib/repositories";
import { EmptyState, Field, inputClassName } from "./ui-helpers";
import { SectionCard } from "./section-card";

function normalizeRiskLevel(value: string): MonitoringBriefInput["riskLevel"] {
  if (value === "low" || value === "high") return value;
  return "moderate";
}

export function MonitoringClient() {
  const [items, setItems] = useState<MonitoringBrief[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [message, setMessage] = useState("Loading monitoring briefs...");
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<MonitoringBriefInput>({
    topic: "",
    whyItMatters: "",
    latestChange: "",
    riskLevel: "moderate",
    recommendedMove: ""
  });

  async function load() {
    const data = await listMonitoring();
    setItems(data);
    setSelectedId((current) => current ?? data[0]?.id ?? null);
    setMessage(data.length ? "Monitoring briefs loaded." : "No monitoring briefs yet. Create the first one.");
  }

  useEffect(() => {
    void load();
  }, []);

  const selected = useMemo(() => items.find((item) => item.id === selectedId) ?? items[0] ?? null, [items, selectedId]);

  async function handleCreate() {
    if (!form.topic.trim()) return;
    const response = await createMonitoringBrief({
      topic: form.topic.trim(),
      whyItMatters: form.whyItMatters.trim(),
      latestChange: form.latestChange.trim(),
      riskLevel: normalizeRiskLevel(form.riskLevel),
      recommendedMove: form.recommendedMove.trim()
    });
    setMessage(response.ok ? "Monitoring brief saved." : response.error ?? "Unable to save monitoring brief.");
    if (response.ok) {
      setForm({ topic: "", whyItMatters: "", latestChange: "", riskLevel: "moderate", recommendedMove: "" });
      setOpen(false);
      await load();
    }
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
      <SectionCard title="Monitoring + Intelligence" description="Track what changed, why it matters, what risk it creates, and what move should follow.">
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="text-sm text-slate-400">{message}</div>
            <button type="button" className="badge" onClick={() => setOpen((value) => !value)}>
              {open ? "Close" : "New monitoring brief"}
            </button>
          </div>

          {open ? (
            <div className="grid gap-4 rounded-3xl border border-white/10 bg-black/20 p-4">
              <Field label="Topic">
                <input className={inputClassName()} value={form.topic} onChange={(event) => setForm({ ...form, topic: event.target.value })} />
              </Field>
              <Field label="Why it matters">
                <textarea className={`${inputClassName()} min-h-24`} value={form.whyItMatters} onChange={(event) => setForm({ ...form, whyItMatters: event.target.value })} />
              </Field>
              <Field label="Latest change">
                <textarea className={`${inputClassName()} min-h-24`} value={form.latestChange} onChange={(event) => setForm({ ...form, latestChange: event.target.value })} />
              </Field>
              <Field label="Risk level">
                <select
                  className={inputClassName()}
                  value={form.riskLevel}
                  onChange={(event) => setForm({ ...form, riskLevel: normalizeRiskLevel(event.target.value) })}
                >
                  <option value="low">Low</option>
                  <option value="moderate">Moderate</option>
                  <option value="high">High</option>
                </select>
              </Field>
              <Field label="Recommended move">
                <textarea className={`${inputClassName()} min-h-24`} value={form.recommendedMove} onChange={(event) => setForm({ ...form, recommendedMove: event.target.value })} />
              </Field>
              <div className="flex justify-end gap-3">
                <button type="button" className="badge" onClick={() => setOpen(false)}>Cancel</button>
                <button type="button" className="rounded-2xl bg-cyan-300 px-4 py-3 text-sm font-medium text-slate-950" onClick={() => void handleCreate()}>
                  Save monitoring brief
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
                  <div className="font-medium text-white">{item.topic}</div>
                  <div className="mt-1 text-sm text-slate-400">Risk: {item.riskLevel}</div>
                  <p className="mt-2 text-sm leading-6 text-slate-300">{item.latestChange}</p>
                </button>
              ))}
            </div>
          ) : (
            <EmptyState
              title="No monitoring briefs yet"
              description="Create the first monitoring brief so watchlists and change tracking become a real module."
            />
          )}
        </div>
      </SectionCard>

      <SectionCard title={selected?.topic ?? "Monitoring detail"} description="Select a monitoring brief to inspect the current signal and recommended move.">
        {selected ? (
          <div className="space-y-4 text-sm leading-6 text-slate-300">
            <div><span className="font-medium text-white">Why it matters:</span> {selected.whyItMatters}</div>
            <div><span className="font-medium text-white">Latest change:</span> {selected.latestChange}</div>
            <div><span className="font-medium text-white">Risk level:</span> {selected.riskLevel}</div>
            <div className="rounded-2xl border border-cyan-300/20 bg-cyan-300/10 p-4 text-cyan-100">
              Recommended move: {selected.recommendedMove}
            </div>
          </div>
        ) : (
          <EmptyState
            title="No monitoring brief selected"
            description="Choose a monitoring brief from the left column to inspect its detail."
          />
        )}
      </SectionCard>
    </div>
  );
}
