"use client";

import { useState } from "react";
import type { Savepoint, SavepointInput } from "@misscathy/types";
import { Field, EmptyState, inputClassName } from "./ui-helpers";

function parseLines(value: string) {
  return value
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

export function ContinuityCard({
  savepoints,
  onCreate
}: {
  savepoints: Savepoint[];
  onCreate: (input: SavepointInput) => Promise<void> | void;
}) {
  const [title, setTitle] = useState("");
  const [currentStatus, setCurrentStatus] = useState("");
  const [decisionsMadeText, setDecisionsMadeText] = useState("");
  const [openQuestionsText, setOpenQuestionsText] = useState("");
  const [nextStep, setNextStep] = useState("");
  const [continuitySummary, setContinuitySummary] = useState("");

  async function submit() {
    if (!title.trim()) return;
    await onCreate({
      title: title.trim(),
      currentStatus: currentStatus.trim(),
      decisionsMade: parseLines(decisionsMadeText),
      openQuestions: parseLines(openQuestionsText),
      nextStep: nextStep.trim(),
      continuitySummary: continuitySummary.trim()
    });

    setTitle("");
    setCurrentStatus("");
    setDecisionsMadeText("");
    setOpenQuestionsText("");
    setNextStep("");
    setContinuitySummary("");
  }

  return (
    <div className="space-y-4">
      <div className="grid gap-4 rounded-3xl border border-white/10 bg-black/20 p-5">
        <div className="text-lg font-semibold">Continuity / Savepoint</div>
        <p className="text-sm leading-6 text-slate-400">
          Capture current status, decisions made, open questions, and the next step so the project can resume cleanly.
        </p>

        <Field label="Savepoint title">
          <input className={inputClassName()} value={title} onChange={(event) => setTitle(event.target.value)} placeholder="What is this checkpoint called?" />
        </Field>

        <Field label="Current status">
          <textarea className={`${inputClassName()} min-h-24`} value={currentStatus} onChange={(event) => setCurrentStatus(event.target.value)} placeholder="What is true right now?" />
        </Field>

        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Decisions made" hint="One line per item">
            <textarea className={`${inputClassName()} min-h-24`} value={decisionsMadeText} onChange={(event) => setDecisionsMadeText(event.target.value)} placeholder="What has already been decided?" />
          </Field>
          <Field label="Open questions" hint="One line per item">
            <textarea className={`${inputClassName()} min-h-24`} value={openQuestionsText} onChange={(event) => setOpenQuestionsText(event.target.value)} placeholder="What still needs resolution?" />
          </Field>
        </div>

        <Field label="Next step">
          <input className={inputClassName()} value={nextStep} onChange={(event) => setNextStep(event.target.value)} placeholder="What should happen next?" />
        </Field>

        <Field label="Continuity summary">
          <textarea className={`${inputClassName()} min-h-24`} value={continuitySummary} onChange={(event) => setContinuitySummary(event.target.value)} placeholder="What should the future you know at a glance?" />
        </Field>

        <div className="flex justify-end">
          <button type="button" className="rounded-2xl bg-cyan-300 px-4 py-3 text-sm font-medium text-slate-950" onClick={() => void submit()}>
            Save savepoint
          </button>
        </div>
      </div>

      {savepoints.length ? (
        <div className="space-y-3">
          {savepoints.map((savepoint) => (
            <div key={savepoint.id} className="rounded-2xl border border-white/10 bg-black/20 p-4 text-sm leading-6 text-slate-300">
              <div className="font-medium text-white">{savepoint.title}</div>
              <div className="mt-2"><span className="font-medium text-white">Current status:</span> {savepoint.currentStatus}</div>
              <div className="mt-2"><span className="font-medium text-white">Decisions made:</span> {savepoint.decisionsMade.join(" • ") || "None listed"}</div>
              <div className="mt-2"><span className="font-medium text-white">Open questions:</span> {savepoint.openQuestions.join(" • ") || "None listed"}</div>
              <div className="mt-2"><span className="font-medium text-white">Next step:</span> {savepoint.nextStep}</div>
              <div className="mt-2"><span className="font-medium text-white">Summary:</span> {savepoint.continuitySummary}</div>
              <div className="mt-2 text-slate-500">{savepoint.updatedAt}</div>
            </div>
          ))}
        </div>
      ) : (
        <EmptyState
          title="No savepoints yet"
          description="Savepoints make continuity explicit so work can resume cleanly across sessions."
        />
      )}
    </div>
  );
}
