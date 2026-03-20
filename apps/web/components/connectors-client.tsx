"use client";

import { useEffect, useState } from "react";
import type { ConnectorRegistryItem } from "@misscathy/types";
import { listConnectors } from "../lib/repositories";
import { SectionCard } from "./section-card";

export function ConnectorsClient() {
  const [connectors, setConnectors] = useState<ConnectorRegistryItem[]>([]);

  useEffect(() => {
    void listConnectors().then(setConnectors);
  }, []);

  return (
    <SectionCard title="Connector Center" description="Every connector is labeled with truthful state, approval boundary, and fallback path.">
      <div className="space-y-4">
        {connectors.map((connector) => (
          <div key={connector.id} className="rounded-3xl border border-white/10 bg-black/20 p-5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <div className="text-lg font-semibold">{connector.connectorName}</div>
                <div className="mt-1 text-sm text-slate-400">{connector.connectorFamily} • {connector.connectorType}</div>
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="badge">{connector.status}</span>
                <span className="badge">{connector.truthfulBand}</span>
              </div>
            </div>

            <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-4 text-sm leading-6 text-slate-300">
              <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                <div className="font-medium">Supported actions</div>
                <div className="mt-2">{connector.supportedActions.join(" • ")}</div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                <div className="font-medium">Input requirements</div>
                <div className="mt-2">{connector.inputRequirements.join(" • ")}</div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                <div className="font-medium">Confirmation</div>
                <div className="mt-2">{connector.confirmationPolicy}</div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                <div className="font-medium">Fallback</div>
                <div className="mt-2">{connector.fallbackPath}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}
