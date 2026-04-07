"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import type { Savepoint } from "@misscathy/types";
import { listSavepoints } from "../lib/repositories";
import { EmptyState } from "./ui-helpers";
import { SectionCard } from "./section-card";

export function ArchiveClient() {
  const searchParams = useSearchParams();
  const initialSelection = searchParams.get("savepoint");
  const [items, setItems] = useState<Savepoint[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(initialSelection);
  const [message, setMessage] = useState("Loading savepoints...");

  useEffect(() => {
    async function load() {
      const data = await listSavepoints();
      setItems(data);
      const preferredId =
        data.find((item) => item.id === initialSelection)?.id ??
        data.find((item) => item.title === initialSelection)?.id ??
        data[0]?.id ??
        null;
      setSelectedId((current) => current ?? preferredId);
      setMessage(data.length ? "Savepoints loaded." : "No savepoints yet. Create one from a project detail page.");
    }
    void load();
  }, [initialSelection]);

  const selected = useMemo(
    () => items.find((item) => item.id === selectedId) ?? items[0] ?? null,
    [items, selectedId]
  );

  return (
    <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
      <SectionCard title="Archive" description="Completed work and continuity checkpoints stay accessible without polluting the live dashboard.">
        <div className="space-y-4">
          <div className="text-sm text-slate-400">{message}</div>

          {items.length ? (
            <div className="space-y-3">
              {items.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setSelectedId(item.id)}
                  className={`w-full rounded-2xl border p-4 text-left transition ${
                    selected?.id === item.id
                      ? "border-cyan-300/30 bg-cyan-300/10"
                      : "border-white/10 bg-black/20 hover:bg-white/5"
                  }`}
                >
                  <div className="font-medium text-white">{item.title}</div>
                  <p className="mt-2 text-sm leading-6 text-slate-300">{item.currentStatus}</p>
                  <p className="mt-2 text-xs uppercase tracking-[0.16em] text-slate-500">
                    Next retained step: {item.nextStep}
                  </p>
                </button>
              ))}
            </div>
          ) : (
            <EmptyState
              title="No savepoints yet"
              description="Create a continuity checkpoint from a project detail page so archive history stays real."
              action={<Link href="/projects" className="badge">Open projects</Link>}
            />
          )}
        </div>
      </SectionCard>

      <SectionCard title={selected?.title ?? "Savepoint detail"} description="Select a savepoint on the left to inspect the exact continuity state.">
        {selected ? (
          <div className="space-y-4 text-sm leading-6 text-slate-300">
            <div>
              <div className="font-medium text-white">Current status</div>
              <p className="mt-2">{selected.currentStatus}</p>
            </div>
            <div>
              <div className="font-medium text-white">Decisions made</div>
              <div className="mt-2 space-y-2">
                {selected.decisionsMade.length ? selected.decisionsMade.map((item) => (
                  <div key={item} className="rounded-2xl border border-white/10 bg-black/20 p-3">{item}</div>
                )) : <div className="text-slate-500">No decisions captured.</div>}
              </div>
            </div>
            <div>
              <div className="font-medium text-white">Open questions</div>
              <div className="mt-2 space-y-2">
                {selected.openQuestions.length ? selected.openQuestions.map((item) => (
                  <div key={item} className="rounded-2xl border border-white/10 bg-black/20 p-3">{item}</div>
                )) : <div className="text-slate-500">No open questions captured.</div>}
              </div>
            </div>
            <div className="rounded-2xl border border-cyan-300/20 bg-cyan-300/10 p-4 text-cyan-100">
              Next step: {selected.nextStep}
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <div className="font-medium text-white">Continuity summary</div>
              <p className="mt-2">{selected.continuitySummary}</p>
              <div className="mt-3 text-slate-500">Updated: {selected.updatedAt}</div>
            </div>
          </div>
        ) : (
          <EmptyState
            title="No savepoint selected"
            description="Choose a savepoint from the archive list to inspect its retained detail."
          />
        )}
      </SectionCard>
    </div>
  );
}
