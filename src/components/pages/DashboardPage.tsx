"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { MessageSquarePlus } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { AcknowledgmentTable, AlertMiniList, NotificationTable } from "@/components/DataTables";
import { HazardMap } from "@/components/HazardMap";
import { useLanguage } from "@/components/LanguageProvider";
import { EmptyState, MetricCard, SeverityPill, StatusPill, formatNumber } from "@/components/ui";
import type {
  Acknowledgment,
  Alert,
  HazardData,
  NotificationLog,
  ResponseNote,
  User,
  Volunteer
} from "@/lib/types";

interface DashboardData {
  users: User[];
  alerts: Alert[];
  hazards: HazardData[];
  volunteers: Volunteer[];
  notificationLogs: NotificationLog[];
  acknowledgments: Acknowledgment[];
  responseNotes: ResponseNote[];
  stats: {
    activeAlerts: number;
    affectedPopulation: number;
    delivered: number;
    failed: number;
    acknowledgmentCount: number;
    volunteerCount: number;
    averageRainfall: number;
    maxRiverLevel: number;
  };
}

export function DashboardPage() {
  const { t } = useLanguage();
  const [data, setData] = useState<DashboardData | null>(null);
  const [error, setError] = useState("");
  const [note, setNote] = useState("");
  const [noteAlertId, setNoteAlertId] = useState("");

  const refresh = useCallback(async () => {
    setError("");
    const response = await fetch("/api/dashboard");
    const payload = await response.json();
    if (!response.ok) {
      setError(payload.error || "Dashboard unavailable");
      return;
    }
    setData(payload);
    setNoteAlertId((current) => current || payload.alerts[0]?.id || "");
  }, []);

  useEffect(() => {
    refresh();
    window.addEventListener("laos-session-changed", refresh);
    return () => window.removeEventListener("laos-session-changed", refresh);
  }, [refresh]);

  const activeAlerts = useMemo(
    () => data?.alerts.filter((alert) => !["Closed", "Cancelled"].includes(alert.status)) ?? [],
    [data]
  );
  const topHazard = data?.hazards[0];

  async function addNote() {
    if (!noteAlertId || !note.trim()) return;
    const response = await fetch(`/api/alerts/${noteAlertId}/response-note`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ note })
    });
    const payload = await response.json();
    if (!response.ok) {
      setError(payload.error || "Could not add note");
      return;
    }
    setNote("");
    refresh();
  }

  return (
    <AppShell>
      {error ? <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm font-semibold text-red-700">{error}</div> : null}
      {!data ? (
        <EmptyState label="Loading dashboard" />
      ) : (
        <div className="space-y-6">
          <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <MetricCard
              label={t("activeAlerts")}
              value={data.stats.activeAlerts}
              detail={`${formatNumber(data.stats.affectedPopulation)} ${t("affectedPopulation").toLowerCase()}`}
              tone={data.stats.activeAlerts > 1 ? "red" : "yellow"}
            />
            <MetricCard
              label={t("rainfallLevel")}
              value={`${data.stats.averageRainfall} mm`}
              detail={topHazard ? `${topHazard.location} · ${topHazard.source}` : t("noData")}
              tone="blue"
            />
            <MetricCard
              label={t("riverLevel")}
              value={`${data.stats.maxRiverLevel.toFixed(1)} m`}
              detail={topHazard ? `${topHazard.district}, ${topHazard.province}` : t("noData")}
              tone="slate"
            />
            <MetricCard
              label={t("deliveryStatus")}
              value={`${data.stats.delivered}/${data.stats.delivered + data.stats.failed}`}
              detail={`${data.stats.failed} ${t("failedNotifications").toLowerCase()}`}
              tone={data.stats.failed > 0 ? "yellow" : "green"}
            />
          </section>

          <div className="grid gap-6 xl:grid-cols-[1.45fr_0.95fr]">
            <HazardMap alerts={data.alerts} hazards={data.hazards} />
            <section className="rounded-lg border border-gov-line bg-white p-4 shadow-panel">
              <div className="mb-4 flex items-center justify-between gap-3">
                <h3 className="text-lg font-bold text-gov-ink">{t("activeAlerts")}</h3>
                <span className="text-sm font-semibold text-slate-500">{activeAlerts.length}</span>
              </div>
              <AlertMiniList alerts={activeAlerts} />
            </section>
          </div>

          <div className="grid gap-6 xl:grid-cols-2">
            <section className="rounded-lg border border-gov-line bg-white p-4 shadow-panel">
              <h3 className="text-lg font-bold text-gov-ink">{t("aiAssistant")}</h3>
              <div className="mt-4 space-y-3">
                {activeAlerts.map((alert) => (
                  <div key={alert.id} className="rounded-lg border border-gov-line p-4">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div>
                        <p className="font-bold text-gov-ink">{alert.location}</p>
                        <p className="text-sm text-slate-500">{alert.aiAssessment.impactSummary || alert.predictedImpact}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <SeverityPill severity={alert.severity} />
                        <StatusPill status={alert.status} />
                      </div>
                    </div>
                    <div className="mt-3 grid gap-3 text-sm md:grid-cols-3">
                      <div>
                        <p className="font-semibold text-slate-500">{t("riskClassification")}</p>
                        <p className="font-bold text-gov-ink">{alert.aiAssessment.riskScore ?? "-"} / 100</p>
                      </div>
                      <div>
                        <p className="font-semibold text-slate-500">{t("routingGroups")}</p>
                        <p className="text-slate-700">{alert.aiAssessment.routingGroups?.slice(0, 2).join(", ") || "-"}</p>
                      </div>
                      <div>
                        <p className="font-semibold text-slate-500">{t("qualityFlags")}</p>
                        <p className="text-slate-700">{alert.aiAssessment.qualityFlags?.join(", ") || t("auditReady")}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-lg border border-gov-line bg-white p-4 shadow-panel">
              <h3 className="text-lg font-bold text-gov-ink">{t("responseActivity")}</h3>
              <div className="mt-4 flex flex-col gap-3">
                <select
                  value={noteAlertId}
                  onChange={(event) => setNoteAlertId(event.target.value)}
                  className="rounded-md border border-gov-line px-3 py-2 text-sm"
                >
                  {data.alerts.map((alert) => (
                    <option key={alert.id} value={alert.id}>
                      {alert.id} · {alert.location}
                    </option>
                  ))}
                </select>
                <textarea
                  value={note}
                  onChange={(event) => setNote(event.target.value)}
                  className="min-h-24 rounded-md border border-gov-line px-3 py-2 text-sm"
                  placeholder={t("notes")}
                />
                <button
                  type="button"
                  onClick={addNote}
                  className="inline-flex w-fit items-center gap-2 rounded-md bg-gov-ink px-4 py-2 text-sm font-bold text-white"
                >
                  <MessageSquarePlus className="h-4 w-4" aria-hidden />
                  {t("save")}
                </button>
              </div>
              <div className="mt-4 space-y-3">
                {data.responseNotes.length === 0 ? (
                  <EmptyState label={t("noData")} />
                ) : (
                  data.responseNotes.slice(0, 5).map((item) => (
                    <div key={item.id} className="rounded-lg border border-gov-line p-3 text-sm">
                      <p className="font-semibold text-gov-ink">{item.note}</p>
                      <p className="mt-1 text-slate-500">{item.alertId}</p>
                    </div>
                  ))
                )}
              </div>
            </section>
          </div>

          <section className="space-y-3">
            <h3 className="text-lg font-bold text-gov-ink">{t("recentLogs")}</h3>
            <NotificationTable logs={data.notificationLogs} alerts={data.alerts} />
          </section>

          <section className="space-y-3">
            <h3 className="text-lg font-bold text-gov-ink">{t("volunteerAcknowledgment")}</h3>
            <AcknowledgmentTable
              acknowledgments={data.acknowledgments}
              volunteers={data.volunteers}
              users={data.users}
              alerts={data.alerts}
            />
          </section>
        </div>
      )}
    </AppShell>
  );
}
