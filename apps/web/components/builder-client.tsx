"use client";

import { useEffect, useMemo, useState } from "react";
import type { BuilderBrief, BuilderBriefInput } from "@misscathy/types";
import { createBuilderBrief, listBuilder } from "../lib/repositories";
import { EmptyState, Field, inputClassName } from "./ui-helpers";
import { SectionCard } from "./section-card";

function parseLines(value: string) {
  return value
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

export function BuilderClient() {
  const [items, setItems] = useState<BuilderBrief[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [message, setMessage] = useState("Loading builder briefs...");
  const [open, setOpen] = useState(false);
  const [userFlowText, setUserFlowText] = useState("");
  const [stackChoiceText, setStackChoiceText] = useState("");
  const [form, setForm] = useState<BuilderBriefInput>({
    name: "",
    productGoal: "",
    userFlow: [],
    stackChoice: [],
    nextStep: ""
  });

  async function load() {
    const data = await listBuilder();
    setItems(data);
    setSelectedId((current) => current ?? data[0]?.id ?? null);
    setMessage(data.length ? "Builder briefs loaded." : "No builder briefs yet. Create the first one.");
  }

  useEffect(() => {
    void load();
  }, []);

  const selected = useMemo(() => items.find((item) => item.id === selectedId) ?? items[0] ?? null, [items, selectedId]);

  async function handleCreate() {
    if (!form.name.trim()) return;
    const response = await createBuilderBrief({
      ...form,
      name: form.name.trim(),
      productGoal: form.productGoal.trim(),
      userFlow: parseLines(userFlowText),
      stackChoice: parseLines(stackChoiceText),
      nextStep: form.nextStep.trim()
    });
    setMessage(response.ok ? "Builder brief saved." : response.error ?? "Unable to save builder brief.");
    if (response.ok) {
      setForm({ name: "", productGoal: "", userFlow: [], stackChoice: [], nextStep: "" });
      setUserFlowText("");
      setStackChoiceText("");
      setOpen(false);
      await load();
    }
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
      <SectionCard title="Builder Studio" description="Product specs, user flows, architecture notes, and the next build step.">
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="text-sm text-slate-400">{message}</div>
            <button type="button" className="badge" onClick={() => setOpen((value) => !value)}>
              {open ? "Close" : "New builder brief"}
            </button>
          </div>

          {open ? (
            <div className="grid gap-4 rounded-3xl border border-white/10 bg-black/20 p-4">
              <Field label="Brief name">
                <input className={inputClassName()} value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} />
              </Field>
              <Field label="Product goal">
                <textarea className={`${inputClassName()} min-h-24`} value={form.productGoal} onChange={(event) => setForm({ ...form, productGoal: event.target.value })} />
              </Field>
              <Field label="User flow" hint="One line per step">
                <textarea className={`${inputClassName()} min-h-24`} value={userFlowText} onChange={(event) => setUserFlowText(event.target.value)} />
              </Field>
              <Field label="Stack choice" hint="One line per item">
                <textarea className={`${inputClassName()} min-h-24`} value={stackChoiceText} onChange={(event) => setStackChoiceText(event.target.value)} />
              </Field>
              <Field label="Next step">
                <textarea className={`${inputClassName()} min-h-24`} value={form.nextStep} onChange={(event) => setForm({ ...form, nextStep: event.target.value })} />
              </Field>
              <div className="flex justify-end gap-3">
                <button type="button" className="badge" onClick={() => setOpen(false)}>Cancel</button>
                <button type="button" className="rounded-2xl bg-cyan-300 px-4 py-3 text-sm font-medium text-slate-950" onClick={() => void handleCreate()}>
                  Save builder brief
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
                  <div className="font-medium text-white">{item.name}</div>
                  <p className="mt-2 text-sm leading-6 text-slate-300">{item.productGoal}</p>
                </button>
              ))}
            </div>
          ) : (
            <EmptyState
              title="No builder briefs yet"
              description="Create the first builder brief so product planning becomes a real module instead of a static card."
            />
          )}
        </div>
      </SectionCard>

      <SectionCard title={selected?.name ?? "Builder detail"} description="Select a brief to inspect the current product goal, user flow, stack choice, and next step.">
        {selected ? (
          <div className="space-y-4 text-sm leading-6 text-slate-300">
            <div><span className="font-medium text-white">Product goal:</span> {selected.productGoal}</div>
            <div>
              <div className="font-medium text-white">User flow</div>
              <div className="mt-2 space-y-2">
                {selected.userFlow.length ? selected.userFlow.map((item, index) => (
                  <div key={`${item}-${index}`} className="rounded-2xl border border-white/10 bg-black/20 p-3">{index + 1}. {item}</div>
                )) : <div className="text-slate-500">No user flow yet.</div>}
              </div>
            </div>
            <div>
              <div className="font-medium text-white">Stack choice</div>
              <div className="mt-2 flex flex-wrap gap-2">
                {selected.stackChoice.length ? selected.stackChoice.map((item) => <span key={item} className="badge">{item}</span>) : <span className="text-slate-500">No stack choice yet.</span>}
              </div>
            </div>
            <div className="rounded-2xl border border-cyan-300/20 bg-cyan-300/10 p-4 text-cyan-100">
              Next step: {selected.nextStep || "No next step yet."}
            </div>
          </div>
        ) : (
          <EmptyState
            title="No builder brief selected"
            description="Choose a builder brief from the left column to inspect its detail."
          />
        )}
      </SectionCard>
    </div>
  );
}
