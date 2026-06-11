"use client";

import { useCallback, useEffect, useState } from "react";
import { AppShell } from "@/components/AppShell";
import { useLanguage } from "@/components/LanguageProvider";
import { EmptyState, LogStatus, MetricCard } from "@/components/ui";
import type { NotificationLog, ResponseNote } from "@/lib/types";

interface ReportsPayload {
  reports: {
    alertDelivery: Record<string, { total: number; failed: number; delivered: number }>;
    volunteerAcknowledgment: {
      totalVolunteers: number;
      acknowledgments: number;
      rate: number;
    };
    areaCoverage: Record<string, number>;
    failedNotifications: NotificationLog[];
    responseActivity: ResponseNote[];
    alertCount: number;
  };
}

export function ReportsPage() {
  const { t } = useLanguage();
  const [data, setData] = useState<ReportsPayload | null>(null);
  const [error, setError] = useState("");

  const refresh = useCallback(async () => {
    setError("");
    const response = await fetch("/api/reports");
    const payload = await response.json();
    if (!response.ok) {
      setError(payload.error || "Reports unavailable");
      setData(null);
      return;
    }
    setData(payload);
  }, []);

  useEffect(() => {
    refresh();
    window.addEventListener("laos-session-changed", refresh);
    return () => window.removeEventListener("laos-session-changed", refresh);
  }, [refresh]);

  return (
    <AppShell>
      {error ? <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm font-semibold text-red-700">{error}</div> : null}
      {!data ? (
        <EmptyState label={error || "Loading reports"} />
      ) : (
        <div className="space-y-6">
          <section className="grid gap-4 md:grid-cols-4">
            <MetricCard label={t("alerts")} value={data.reports.alertCount} tone="slate" />
            <MetricCard label={t("volunteerAcknowledgment")} value={`${data.reports.volunteerAcknowledgment.rate}%`} detail={`${data.reports.volunteerAcknowledgment.acknowledgments}/${data.reports.volunteerAcknowledgment.totalVolunteers}`} tone="green" />
            <MetricCard label={t("failedNotifications")} value={data.reports.failedNotifications.length} tone={data.reports.failedNotifications.length ? "red" : "green"} />
            <MetricCard label={t("areaCoverage")} value={Object.keys(data.reports.areaCoverage).length} tone="blue" />
          </section>

          <section className="grid gap-6 xl:grid-cols-2">
            <div className="rounded-lg border border-gov-line bg-white p-4 shadow-panel">
              <h3 className="text-lg font-bold text-gov-ink">{t("deliveryStatus")}</h3>
              <div className="mt-4 overflow-x-auto">
                <table className="min-w-full text-left text-sm">
                  <thead className="bg-slate-100 text-xs font-bold uppercase text-slate-600">
                    <tr>
                      <th className="px-4 py-3">Channel</th>
                      <th className="px-4 py-3">Delivered</th>
                      <th className="px-4 py-3">Failed</th>
                      <th className="px-4 py-3">Total</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gov-line">
                    {Object.entries(data.reports.alertDelivery).map(([channel, item]) => (
                      <tr key={channel}>
                        <td className="px-4 py-3 font-bold text-gov-ink">{channel}</td>
                        <td className="px-4 py-3 text-green-700">{item.delivered}</td>
                        <td className="px-4 py-3 text-red-700">{item.failed}</td>
                        <td className="px-4 py-3 text-slate-600">{item.total}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="rounded-lg border border-gov-line bg-white p-4 shadow-panel">
              <h3 className="text-lg font-bold text-gov-ink">{t("areaCoverage")}</h3>
              <div className="mt-4 space-y-3">
                {Object.entries(data.reports.areaCoverage).map(([province, count]) => (
                  <div key={province}>
                    <div className="mb-1 flex items-center justify-between text-sm font-semibold">
                      <span>{province}</span>
                      <span>{count}</span>
                    </div>
                    <div className="h-3 rounded bg-slate-100">
                      <div className="h-3 rounded bg-blue-700" style={{ width: `${Math.min(100, count * 28)}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="rounded-lg border border-gov-line bg-white p-4 shadow-panel">
            <h3 className="text-lg font-bold text-gov-ink">{t("failedNotifications")}</h3>
            <div className="mt-4 grid gap-3">
              {data.reports.failedNotifications.length === 0 ? (
                <EmptyState label={t("noData")} />
              ) : (
                data.reports.failedNotifications.map((log) => (
                  <div key={log.id} className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-gov-line p-3">
                    <div>
                      <p className="font-bold text-gov-ink">{log.alertId} · {log.channel}</p>
                      <p className="text-sm text-slate-500">{log.failedReason}</p>
                    </div>
                    <LogStatus log={log} />
                  </div>
                ))
              )}
            </div>
          </section>

          <section className="rounded-lg border border-gov-line bg-white p-4 shadow-panel">
            <h3 className="text-lg font-bold text-gov-ink">{t("responseActivity")}</h3>
            <div className="mt-4 grid gap-3">
              {data.reports.responseActivity.map((note) => (
                <div key={note.id} className="rounded-lg border border-gov-line p-3">
                  <p className="font-semibold text-gov-ink">{note.note}</p>
                  <p className="mt-1 text-sm text-slate-500">{note.alertId}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      )}
    </AppShell>
  );
}
