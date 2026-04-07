"use client";

import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import type { CommandHistoryEntry, CommandResult } from "@misscathy/types";
import { buildCommandResult } from "@misscathy/core";
import { listCommandHistory, saveCommandHistory } from "../lib/repositories";

const quickCommands = [
  "Show my dashboard",
  "Show focus now",
  "Show next 3 moves",
  "Open the Miss Cathy Core Operating Manual",
  "Open the Website + Android Product Draft",
  "Open the latest savepoint from archive",
  "Deploy the Miss Cathy website live to Vercel",
  "Create a handoff to deploy the Miss Cathy website live to Vercel",
  "Recommend how to deploy the Miss Cathy website if Vercel access is not available"
];

export function CommandConsole() {
  const [input, setInput] = useState("Show my dashboard");
  const [result, setResult] = useState<CommandResult>(() => buildCommandResult("Show my dashboard"));
  const [saved, setSaved] = useState("Not saved yet.");
  const [history, setHistory] = useState<CommandHistoryEntry[]>([]);

  async function loadHistory() {
    const entries = await listCommandHistory();
    setHistory(entries);
  }

  useEffect(() => {
    void loadHistory();
  }, []);

  async function routeCommand(commandText: string) {
    const nextResult = buildCommandResult(commandText);
    setInput(commandText);
    setResult(nextResult);
    const response = await saveCommandHistory(commandText, nextResult.mode, nextResult.executionBand, nextResult);
    setSaved(response.ok ? "Command history stored." : response.error ?? "Save failed.");
    await loadHistory();
  }

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    await routeCommand(input);
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-5 xl:grid-cols-[0.9fr_1.1fr]">
        <form onSubmit={onSubmit} className="panel p-5">
          <div className="text-lg font-semibold">Auto Command</div>
          <p className="mt-2 text-sm leading-6 text-slate-400">
            Route short commands into truthful execution bands and preserve history across refresh when the signed-in database is available.
          </p>

          <textarea
            value={input}
            onChange={(event) => setInput(event.target.value)}
            className="mt-4 min-h-[180px] w-full rounded-3xl border border-white/10 bg-black/20 p-4 outline-none"
          />

          <button className="mt-4 rounded-2xl bg-cyan-300 px-4 py-3 font-medium text-slate-950">
            Route command
          </button>

          <div className="mt-3 text-sm text-slate-400">{saved}</div>

          <div className="mt-5">
            <div className="text-sm font-medium text-white">Quick commands</div>
            <div className="mt-3 flex flex-wrap gap-2">
              {quickCommands.map((command) => (
                <button
                  key={command}
                  type="button"
                  className="badge text-left"
                  onClick={() => void routeCommand(command)}
                >
                  {command}
                </button>
              ))}
            </div>
          </div>
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
            {result.targetPath ? (
              <div className="mt-4">
                <Link href={result.targetPath} className="badge border-cyan-300/30 bg-cyan-300/10 text-cyan-100">
                  Open target
                </Link>
              </div>
            ) : null}
          </div>

          {result.actionPack ? (
            <div className="mt-4 rounded-2xl border border-amber-300/20 bg-amber-200/10 p-4">
              <div className="font-medium text-amber-100">Action Pack</div>
              <p className="mt-2 text-sm leading-6 text-amber-50">{result.actionPack.preparedPayload}</p>
              <div className="mt-2 text-sm leading-6 text-amber-50">Manual step: {result.actionPack.manualStep}</div>
            </div>
          ) : null}
        </div>
      </div>

      <div className="panel p-5">
        <div className="text-lg font-semibold">Recent command history</div>
        <p className="mt-2 text-sm leading-6 text-slate-400">
          Latest saved commands for the signed-in user. When storage is unavailable, this section stays empty instead of faking persistence.
        </p>

        {history.length ? (
          <div className="mt-4 space-y-3">
            {history.map((entry) => (
              <button
                key={entry.id}
                type="button"
                onClick={() => void routeCommand(entry.inputText)}
                className="w-full rounded-2xl border border-white/10 bg-black/20 p-4 text-left hover:bg-white/5"
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="font-medium text-white">{entry.inputText}</div>
                  <div className="flex flex-wrap gap-2">
                    <span className="badge">{entry.mode}</span>
                    <span className="badge">{entry.executionBand}</span>
                  </div>
                </div>
                <div className="mt-2 text-sm text-slate-400">{entry.createdAt}</div>
              </button>
            ))}
          </div>
        ) : (
          <div className="mt-4 rounded-3xl border border-dashed border-white/10 bg-black/20 p-6 text-sm text-slate-400">
            No saved command history yet.
          </div>
        )}
      </div>
    </div>
  );
}
