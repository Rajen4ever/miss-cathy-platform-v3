import { Suspense } from "react";
import { ArchiveClient } from "../../../components/archive-client";

export default function ArchivePage() {
  return (
    <Suspense fallback={<div className="text-sm text-slate-400">Loading archive...</div>}>
      <ArchiveClient />
    </Suspense>
  );
}
