"use client";

import { useState } from "react";
import type { DecisionLog, DecisionLogInput } from "@misscathy/types";
import { Field, EmptyState, inputClassName } from "./ui-helpers";

function parseLines(value: string) {
  return value
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

export function DecisionLogForm({
  projectId,
  decisions,
  onCreate
}: {
  projectId: string;
  decisions: DecisionLog[];
  onCreate: (input: DecisionLogInput) => Promise<void> | void;
}) {
  const [decision, setDecision] = useState("");
  const [context, setContext] = useState("");
  const [chosenDirection, setChosenDirection] = useState("");
  const [why, setWhy] = useState("");
  const [risksText, setRisksText] = useState("");
  const [revisitTrigger, setRevisitTrigger] = useState("");

  async function submit() {
    if (!decision.trim()) return;
    await onCreate({
      projectId,
      decision: decision.trim(),
      context: context.trim(),
      chosenDirection: chosenDirection.trim(),
      why: why.trim(),
      risks: parseLines(risksText),
      revisitTrigger: revisitTrigger.trim()
    });
    setDecision("");
    setContext("");
    setChosenDirection("");
    setWhy("");
    setRisksText("");
    setRevisitTrigger("");
  }

  return (
    <div className="space-y-4">
      <div className="grid gap-4 rounded-3xl border border-white/10 bg-black/20 p-5 md:grid-cols-2">
        <Field label="Decision">
          <input className={inputClassName()} value={decision} onChange={(event) => setDecision(event.target.value)} placeholder="What was decided?" />
        </Field>
        <Field label="Chosen direction">
          <input className={inputClassName()} value={chosenDirection} onChange={(event) => setChosenDirection(event.target.value)} placeholder="What path are we taking?" />
        </Field>
        <Field label="Context">
          <textarea className={`${inputClassName()} min-h-28`} value={context} onChange={(event) => setContext(event.target.value)} placeholder="What was happening when this decision was made?" />
        </Field>
        <Field label="Why">
          <textarea className={`${inputClassName()} min-h-28`} value={why} onChange={(event) => setWhy(event.target.value)} placeholder="Why is this the right move?" />
        </Field>
        <Field label="Risks" hint="One line per item">
          <textarea className={`${inputClassName()} min-h-28`} value={risksText} onChange={(event) => setRisksText(event.target.value)} placeholder="Tradeoffs and watch-outs" />
        </Field>
        <Field label="Revisit trigger">
          <textarea className={`${inputClassName()} min-h-28`} value={revisitTrigger} onChange={(event) => setRevisitTrigger(event.target.value)} placeholder="When should this decision be revisited?" />
        </Field>
        <div className="md:col-span-2 flex justify-end">
          <button type="button" className="rounded-2xl bg-cyan-300 px-4 py-3 text-sm font-medium text-slate-950" onClick={() => void submit()}>
            Save decision
          </button>
        </div>
      </div>

      {decisions.length ? (
        <div className="space-y-3">
          {decisions.map((item) => (
            <div key={item.id} className="rounded-2xl border border-white/10 bg-black/20 p-4 text-sm leading-6 text-slate-300">
              <div className="font-medium text-white">{item.decision}</div>
              <div className="mt-2 text-slate-400">{item.createdAt}</div>
              <div className="mt-3"><span className="font-medium text-white">Direction:</span> {item.chosenDirection}</div>
              <div className="mt-2"><span className="font-medium text-white">Why:</span> {item.why}</div>
              <div className="mt-2"><span className="font-medium text-white">Risks:</span> {item.risks.join(" • ") || "None listed"}</div>
              <div className="mt-2"><span className="font-medium text-white">Revisit:</span> {item.revisitTrigger || "No trigger listed"}</div>
            </div>
          ))}
        </div>
      ) : (
        <EmptyState
          title="No decision logs yet"
          description="Capture the decision, why it was chosen, and what should trigger a revisit."
        />
      )}
    </div>
  );
}
