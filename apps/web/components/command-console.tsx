"use client";

import { FormEvent, useState } from "react";
import { buildCommandResult } from "@misscathy/core";
import { saveCommandHistory } from "../lib/repositories";

export function CommandConsole() {
  const [input, setInput] = useState("Build the next launch plan for Miss Cathy and tell me the truthful execution boundary.");
  const [result, setResult] = useState(() => buildCommandResult(input));
  const [saved, setSaved] = useState("Not saved yet.");

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    const nextResult = buildCommandResult(input);
    setResult(nextResult);
    const response = await saveCommandHistory(input, nextResult.mode, nextResult.executionBand, nextResult);
    setSaved(response.ok ? "Command history stored (or demo fallback used)." : response.error ?? "Save failed.");
  }

  return (
    <div className="grid gap-5 xl:grid-cols-[0.9fr_1.1fr]">
      <form onSubmit={onSubmit} className="panel p-5">
        <div className="text-lg font-semibold">Auto Command</div>
        <p className="mt-2 text-sm leading-6 text-slate-400">
          Route short commands into research, planning, execution, review, content, builder, health, monitoring, or knowledge mode.
        </p>

        <textarea
          value={input}
          onChange={(event) => setInput(event.target.value)}
          className="mt-4 min-h-[220px] w-full rounded-3xl border border-white/10 bg-black/20 p-4 outline-none"
        />

        <button className="mt-4 rounded-2xl bg-cyan-300 px-4 py-3 font-medium text-slate-950">
          Route command
        </button>

        <div className="mt-3 text-sm text-slate-400">{saved}</div>
      </form>

      <div className="panel p-5">
        <div className="flex flex-wrap gap-2">
          <span className="badge">Mode: {result.mode}</span>
          <span className="badge">Execution: {result.executionBand}</span>
        </div>
        <div className="mt-4 text-2xl font-semibold">{result.headline}</div>
        <div className="mt-5 space-y-4">
          {result.sections.map((section) => (
            <div key={section.title} className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <div className="font-medium">{section.title}</div>
              <p className="mt-2 text-sm leading-6 text-slate-300">{section.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-4 rounded-2xl border border-cyan-300/20 bg-cyan-300/10 p-4">
          <div className="font-medium">Next step</div>
          <p className="mt-2 text-sm leading-6 text-cyan-100">{result.nextStep}</p>
        </div>

        {result.actionPack ? (
          <div className="mt-4 rounded-2xl border border-amber-300/20 bg-amber-200/10 p-4">
            <div className="font-medium text-amber-100">Action Pack</div>
            <p className="mt-2 text-sm leading-6 text-amber-50">{result.actionPack.preparedPayload}</p>
          </div>
        ) : null}
      </div>
    </div>
  );
}
