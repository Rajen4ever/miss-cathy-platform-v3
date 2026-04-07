"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import type { KnowledgeDocument, KnowledgeDocumentInput } from "@misscathy/types";
import { createKnowledgeDocument, listKnowledge } from "../lib/repositories";
import { EmptyState, Field, inputClassName } from "./ui-helpers";
import { SectionCard } from "./section-card";

function parseTags(value: string) {
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

export function KnowledgeClient() {
  const searchParams = useSearchParams();
  const initialSelection = searchParams.get("document");
  const [items, setItems] = useState<KnowledgeDocument[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(initialSelection);
  const [message, setMessage] = useState("Loading knowledge...");
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<KnowledgeDocumentInput>({
    title: "",
    summary: "",
    tags: [],
    sourceOfTruth: true,
    status: "active"
  });
  const [tagsText, setTagsText] = useState("");

  async function load() {
    const data = await listKnowledge();
    setItems(data);
    const preferredId =
      data.find((item) => item.id === initialSelection)?.id ??
      data.find((item) => item.title === initialSelection)?.id ??
      data[0]?.id ??
      null;
    setSelectedId((current) => current ?? preferredId);
    setMessage(data.length ? "Knowledge loaded." : "No documents yet. Add the first source-of-truth note.");
  }

  useEffect(() => {
    void load();
  }, [initialSelection]);

  const selected = useMemo(
    () => items.find((item) => item.id === selectedId) ?? items[0] ?? null,
    [items, selectedId]
  );

  async function handleCreate() {
    if (!form.title.trim()) return;
    const response = await createKnowledgeDocument({
      ...form,
      title: form.title.trim(),
      summary: form.summary.trim(),
      tags: parseTags(tagsText)
    });
    setMessage(response.ok ? "Knowledge document saved." : response.error ?? "Unable to save knowledge document.");
    if (response.ok) {
      setForm({ title: "", summary: "", tags: [], sourceOfTruth: true, status: "active" });
      setTagsText("");
      setOpen(false);
      await load();
    }
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
      <SectionCard title="Knowledge Hub" description="Source-of-truth files, briefs, and continuity notes that should stay reusable.">
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="text-sm text-slate-400">{message}</div>
            <button type="button" className="badge" onClick={() => setOpen((value) => !value)}>
              {open ? "Close" : "New document"}
            </button>
          </div>

          {open ? (
            <div className="grid gap-4 rounded-3xl border border-white/10 bg-black/20 p-4">
              <Field label="Title">
                <input className={inputClassName()} value={form.title} onChange={(event) => setForm({ ...form, title: event.target.value })} />
              </Field>
              <Field label="Summary">
                <textarea className={`${inputClassName()} min-h-24`} value={form.summary} onChange={(event) => setForm({ ...form, summary: event.target.value })} />
              </Field>
              <Field label="Tags" hint="Comma separated">
                <input className={inputClassName()} value={tagsText} onChange={(event) => setTagsText(event.target.value)} placeholder="core, product, handoff" />
              </Field>
              <div className="grid gap-4 md:grid-cols-2">
                <Field label="Status">
                  <select className={inputClassName()} value={form.status} onChange={(event) => setForm({ ...form, status: event.target.value as "active" | "archived" })}>
                    <option value="active">active</option>
                    <option value="archived">archived</option>
                  </select>
                </Field>
                <label className="flex items-end gap-3 text-sm text-slate-300">
                  <input type="checkbox" checked={form.sourceOfTruth} onChange={(event) => setForm({ ...form, sourceOfTruth: event.target.checked })} />
                  Mark as source of truth
                </label>
              </div>
              <div className="flex justify-end gap-3">
                <button type="button" className="badge" onClick={() => setOpen(false)}>Cancel</button>
                <button type="button" className="rounded-2xl bg-cyan-300 px-4 py-3 text-sm font-medium text-slate-950" onClick={() => void handleCreate()}>
                  Save document
                </button>
              </div>
            </div>
          ) : null}

          {items.length ? (
            <div className="space-y-3">
              {items.map((document) => (
                <button
                  key={document.id}
                  type="button"
                  onClick={() => setSelectedId(document.id)}
                  className={`w-full rounded-2xl border p-4 text-left transition ${
                    selected?.id === document.id
                      ? "border-cyan-300/30 bg-cyan-300/10"
                      : "border-white/10 bg-black/20 hover:bg-white/5"
                  }`}
                >
                  <div className="flex flex-wrap items-center gap-2">
                    <div className="font-medium text-white">{document.title}</div>
                    {document.sourceOfTruth ? <span className="badge border-cyan-300/30 bg-cyan-300/10 text-cyan-100">Source of truth</span> : null}
                  </div>
                  <p className="mt-2 text-sm leading-6 text-slate-300">{document.summary}</p>
                </button>
              ))}
            </div>
          ) : (
            <EmptyState
              title="No knowledge documents yet"
              description="Add the first source-of-truth note, operating manual, or working brief."
            />
          )}
        </div>
      </SectionCard>

      <SectionCard title={selected?.title ?? "Document detail"} description="Open a document on the left to inspect the current detail.">
        {selected ? (
          <div className="space-y-4 text-sm leading-6 text-slate-300">
            <div className="flex flex-wrap gap-2">
              <span className="badge">{selected.status}</span>
              {selected.sourceOfTruth ? <span className="badge border-cyan-300/30 bg-cyan-300/10 text-cyan-100">Source of truth</span> : null}
            </div>
            <p>{selected.summary}</p>
            <div>
              <div className="font-medium text-white">Tags</div>
              <div className="mt-2 flex flex-wrap gap-2">
                {selected.tags.length ? selected.tags.map((tag) => <span key={tag} className="badge">{tag}</span>) : <span className="text-slate-500">No tags</span>}
              </div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/20 p-4 text-slate-400">
              Last updated: {selected.updatedAt}
            </div>
          </div>
        ) : (
          <EmptyState
            title="No document selected"
            description="Choose a document from the left column to see its detail."
          />
        )}
      </SectionCard>
    </div>
  );
}
