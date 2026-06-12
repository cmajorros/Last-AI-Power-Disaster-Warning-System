"use client";

import type { Acknowledgment, Alert, NotificationLog, User, Volunteer } from "@/lib/types";
import { useLanguage } from "./LanguageProvider";
import { EmptyState, LogStatus, StatusPill, formatDate } from "./ui";

export function NotificationTable({
  logs,
  alerts,
  volunteers = [],
  users = []
}: {
  logs: NotificationLog[];
  alerts: Alert[];
  volunteers?: Volunteer[];
  users?: User[];
}) {
  const { t } = useLanguage();
  const alertName = (alertId: string) => alerts.find((alert) => alert.id === alertId)?.location ?? alertId;
  const recipientName = (log: NotificationLog) => {
    const volunteer = volunteers.find((item) => item.id === log.recipientId);
    if (volunteer) return `${volunteer.name} · ****${volunteer.phoneLast4}`;
    const user = users.find((item) => item.id === log.recipientId);
    if (user) return `${user.name} · ****${user.phoneLast4}`;
    return `${log.recipientType} · ${log.recipientId}`;
  };

  if (logs.length === 0) return <EmptyState label={t("noData")} />;

  return (
    <div className="overflow-hidden rounded-lg border border-gov-line bg-white">
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-slate-100 text-xs font-bold uppercase text-slate-600">
            <tr>
              <th className="px-4 py-3">Alert</th>
              <th className="px-4 py-3">Recipient</th>
              <th className="px-4 py-3">Channel</th>
              <th className="px-4 py-3">{t("status")}</th>
              <th className="px-4 py-3">Time</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gov-line">
            {logs.slice(0, 12).map((log) => (
              <tr key={log.id}>
                <td className="px-4 py-3 font-semibold text-gov-ink">{alertName(log.alertId)}</td>
                <td className="px-4 py-3 text-slate-600">{recipientName(log)}</td>
                <td className="px-4 py-3 text-slate-600">{log.channel}</td>
                <td className="px-4 py-3">
                  <LogStatus log={log} />
                  {log.failedReason ? <p className="mt-1 text-xs text-red-700">{log.failedReason}</p> : null}
                </td>
                <td className="px-4 py-3 text-slate-600">{formatDate(log.sentAt)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function AcknowledgmentTable({
  acknowledgments,
  volunteers,
  users,
  alerts
}: {
  acknowledgments: Acknowledgment[];
  volunteers: Volunteer[];
  users: User[];
  alerts: Alert[];
}) {
  const { t } = useLanguage();
  const recipientName = (id: string) =>
    volunteers.find((volunteer) => volunteer.id === id)?.name ?? users.find((user) => user.id === id)?.name ?? id;
  const alertName = (id: string) => alerts.find((alert) => alert.id === id)?.location ?? id;

  if (acknowledgments.length === 0) return <EmptyState label={t("noData")} />;

  return (
    <div className="overflow-hidden rounded-lg border border-gov-line bg-white">
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-slate-100 text-xs font-bold uppercase text-slate-600">
            <tr>
              <th className="px-4 py-3">Alert</th>
              <th className="px-4 py-3">{t("volunteers")}</th>
              <th className="px-4 py-3">{t("status")}</th>
              <th className="px-4 py-3">{t("dissemination")}</th>
              <th className="px-4 py-3">{t("notes")}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gov-line">
            {acknowledgments.map((ack) => (
              <tr key={ack.id}>
                <td className="px-4 py-3 font-semibold text-gov-ink">{alertName(ack.alertId)}</td>
                <td className="px-4 py-3 text-slate-600">{recipientName(ack.userId)}</td>
                <td className="px-4 py-3">
                  <span className="font-semibold text-green-700">{ack.status}</span>
                </td>
                <td className="px-4 py-3 text-slate-600">{ack.disseminationMethod}</td>
                <td className="px-4 py-3 text-slate-600">{ack.notes || "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function AlertMiniList({ alerts }: { alerts: Alert[] }) {
  if (alerts.length === 0) return <EmptyState label="No active alerts" />;
  return (
    <div className="space-y-3">
      {alerts.slice(0, 5).map((alert) => (
        <div key={alert.id} className="rounded-lg border border-gov-line bg-white p-4">
          <div className="flex flex-wrap items-start justify-between gap-2">
            <div>
              <h4 className="font-bold text-gov-ink">{alert.location}</h4>
              <p className="mt-1 text-sm text-slate-600">{alert.hazardType} · {alert.district}, {alert.province}</p>
            </div>
            <StatusPill status={alert.status} />
          </div>
          <p className="mt-3 text-sm text-slate-700">{alert.messageEn || alert.predictedImpact}</p>
        </div>
      ))}
    </div>
  );
}
