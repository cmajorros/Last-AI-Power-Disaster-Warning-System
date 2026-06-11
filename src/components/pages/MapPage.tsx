"use client";

import { useCallback, useEffect, useState } from "react";
import { AppShell } from "@/components/AppShell";
import { HazardMap } from "@/components/HazardMap";
import { useLanguage } from "@/components/LanguageProvider";
import { EmptyState, SeverityPill, formatDate } from "@/components/ui";
import type { Alert, HazardData } from "@/lib/types";

interface MapPayload {
  alerts: Alert[];
  hazards: HazardData[];
}

export function MapPage() {
  const { t } = useLanguage();
  const [data, setData] = useState<MapPayload | null>(null);

  const refresh = useCallback(async () => {
    const response = await fetch("/api/dashboard");
    const payload = await response.json();
    if (response.ok) setData({ alerts: payload.alerts, hazards: payload.hazards });
  }, []);

  useEffect(() => {
    refresh();
    window.addEventListener("laos-session-changed", refresh);
    return () => window.removeEventListener("laos-session-changed", refresh);
  }, [refresh]);

  return (
    <AppShell>
      {!data ? (
        <EmptyState label="Loading map" />
      ) : (
        <div className="space-y-6">
          <HazardMap alerts={data.alerts} hazards={data.hazards} tall />
          <section className="grid gap-4 md:grid-cols-3">
            {data.hazards.map((hazard) => (
              <div key={hazard.id} className="rounded-lg border border-gov-line bg-white p-4 shadow-panel">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-bold text-gov-ink">{hazard.location}</h3>
                    <p className="mt-1 text-sm text-slate-500">{hazard.district}, {hazard.province}</p>
                  </div>
                  <SeverityPill severity={hazard.riskClassification} />
                </div>
                <div className="mt-4 grid gap-3 text-sm">
                  <div className="rounded-md bg-blue-50 p-3">
                    <p className="font-semibold text-blue-700">{t("rainfallLevel")}</p>
                    <p className="mt-1 text-xl font-bold text-gov-ink">{hazard.rainfallLevel} mm</p>
                  </div>
                  <div className="rounded-md bg-slate-100 p-3">
                    <p className="font-semibold text-slate-600">{t("riverLevel")}</p>
                    <p className="mt-1 text-xl font-bold text-gov-ink">{hazard.riverLevel} m</p>
                    <p className="mt-1 text-slate-500">{formatDate(hazard.timestamp)}</p>
                  </div>
                </div>
              </div>
            ))}
          </section>
        </div>
      )}
    </AppShell>
  );
}
