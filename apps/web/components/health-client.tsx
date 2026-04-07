"use client";

import { useEffect, useMemo, useState } from "react";
import type { HealthFollowUp, HealthFollowUpInput } from "@misscathy/types";
import { createHealthFollowUp, listHealth } from "../lib/repositories";
import { EmptyState, Field, inputClassName } from "./ui-helpers";
import { SectionCard } from "./section-card";

function parseLines(value: string) {
  return value
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

export function HealthClient() {
  const [items, setItems] = useState<HealthFollowUp[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [message, setMessage] = useState("Loading health follow-ups...");
  const [open, setOpen] = useState(false);
  const [questionsText, setQuestionsText] = useState("");
  const [form, setForm] = useState<HealthFollowUpInput>({
    title: "",
    urgencyLevel: 2,
    likelyDomain: "",
    careSetting: "educational",
    questionsToPrepare: [],
    safetyNote: "",
    nextStep: ""
  });

  async function load() {
    const data = await listHealth();
    setItems(data);
    setSelectedId((current) => current ?? data[0]?.id ?? null);
    setMessage(data.length ? "Health follow-ups loaded." : "No health follow-ups yet. Add the first educational record.");
  }

  useEffect(() => {
    void load();
  }, []);

  const selected = useMemo(() => items.find((item) => item.id === selectedId) ?? items[0] ?? null, [items, selectedId]);

  async function handleCreate() {
    if (!form.title.trim()) return;
    const response = await createHealthFollowUp({
      ...form,
      title: form.title.trim(),
      likelyDomain: form.likelyDomain.trim(),
      careSetting: form.careSetting.trim(),
      questionsToPrepare: parseLines(questionsText),
      safetyNote: form.safetyNote.trim(),
      nextStep: form.nextStep.trim()
    });
    setMessage(response.ok ? "Health follow-up saved." : response.error ?? "Unable to save health follow-up.");
    if (response.ok) {
      setForm({ title: "", urgencyLevel: 2, likelyDomain: "", careSetting: "educational", questionsToPrepare: [], safetyNote: "", nextStep: "" });
      setQuestionsText("");
      setOpen(false);
      await load();
    }
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
      <SectionCard title="Health Ops" description="Educational care navigation, visit prep, and follow-up organization with clear safety boundaries.">
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="text-sm text-slate-400">{message}</div>
            <button type="button" className="badge" onClick={() => setOpen((value) => !value)}>
              {open ? "Close" : "New follow-up"}
            </button>
          </div>

          {open ? (
            <div className="grid gap-4 rounded-3xl border border-white/10 bg-black/20 p-4">
              <Field label="Title">
                <input className={inputClassName()} value={form.title} onChange={(event) => setForm({ ...form, title: event.target.value })} />
              </Field>
              <div className="grid gap-4 md:grid-cols-2">
                <Field label="Urgency level">
                  <select className={inputClassName()} value={form.urgencyLevel} onChange={(event) => setForm({ ...form, urgencyLevel: Number(event.target.value) as 1 | 2 | 3 | 4 })}>
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                  </select>
                </Field>
                <Field label="Likely domain">
                  <input className={inputClassName()} value={form.likelyDomain} onChange={(event) => setForm({ ...form, likelyDomain: event.target.value })} placeholder="general, cardio, neuro" />
                </Field>
              </div>
              <Field label="Care setting">
                <input className={inputClassName()} value={form.careSetting} onChange={(event) => setForm({ ...form, careSetting: event.target.value })} placeholder="educational, clinic follow-up" />
              </Field>
              <Field label="Questions to prepare" hint="One line per item">
                <textarea className={`${inputClassName()} min-h-24`} value={questionsText} onChange={(event) => setQuestionsText(event.target.value)} />
              </Field>
              <Field label="Safety note">
                <textarea className={`${inputClassName()} min-h-24`} value={form.safetyNote} onChange={(event) => setForm({ ...form, safetyNote: event.target.value })} />
              </Field>
              <Field label="Next step">
                <textarea className={`${inputClassName()} min-h-24`} value={form.nextStep} onChange={(event) => setForm({ ...form, nextStep: event.target.value })} />
              </Field>
              <div className="flex justify-end gap-3">
                <button type="button" className="badge" onClick={() => setOpen(false)}>Cancel</button>
                <button type="button" className="rounded-2xl bg-cyan-300 px-4 py-3 text-sm font-medium text-slate-950" onClick={() => void handleCreate()}>
                  Save follow-up
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
                  <div className="mt-1 text-sm text-slate-400">Urgency {item.urgencyLevel} • {item.careSetting}</div>
                  <p className="mt-2 text-sm leading-6 text-slate-300">{item.nextStep}</p>
                </button>
              ))}
            </div>
          ) : (
            <EmptyState
              title="No health follow-ups yet"
              description="Add a health follow-up only for educational support, care navigation, or visit prep."
            />
          )}
        </div>
      </SectionCard>

      <SectionCard title={selected?.title ?? "Health detail"} description="Select a record to inspect the current care setting, questions, safety note, and next step.">
        {selected ? (
          <div className="space-y-4 text-sm leading-6 text-slate-300">
            <div><span className="font-medium text-white">Urgency level:</span> {selected.urgencyLevel}</div>
            <div><span className="font-medium text-white">Likely domain:</span> {selected.likelyDomain}</div>
            <div><span className="font-medium text-white">Care setting:</span> {selected.careSetting}</div>
            <div>
              <div className="font-medium text-white">Questions to prepare</div>
              <div className="mt-2 space-y-2">
                {selected.questionsToPrepare.length ? selected.questionsToPrepare.map((item) => (
                  <div key={item} className="rounded-2xl border border-white/10 bg-black/20 p-3">{item}</div>
                )) : <div className="text-slate-500">No questions yet.</div>}
              </div>
            </div>
            <div className="rounded-2xl border border-amber-300/20 bg-amber-200/10 p-4 text-amber-50">
              {selected.safetyNote}
            </div>
            <div className="rounded-2xl border border-cyan-300/20 bg-cyan-300/10 p-4 text-cyan-100">
              Next step: {selected.nextStep}
            </div>
          </div>
        ) : (
          <EmptyState
            title="No health record selected"
            description="Choose a health follow-up from the left column to inspect its detail."
          />
        )}
      </SectionCard>
    </div>
  );
}
