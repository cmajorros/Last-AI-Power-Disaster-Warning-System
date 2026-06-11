import { ok, requirePermission } from "@/lib/api";
import {
  listAcknowledgments,
  listAlerts,
  listNotificationLogs,
  listResponseNotes,
  listVolunteers
} from "@/lib/store";

export const runtime = "nodejs";

export async function GET() {
  const auth = await requirePermission("view_reports");
  if (!auth.allowed) return auth.response;

  const [alerts, logs, acknowledgments, volunteers, responseNotes] = await Promise.all([
    listAlerts(),
    listNotificationLogs(),
    listAcknowledgments(),
    listVolunteers(),
    listResponseNotes()
  ]);

  const deliveryByChannel = logs.reduce<Record<string, { total: number; failed: number; delivered: number }>>(
    (acc, log) => {
      acc[log.channel] ??= { total: 0, failed: 0, delivered: 0 };
      acc[log.channel].total += 1;
      if (log.status === "Failed") acc[log.channel].failed += 1;
      if (log.status === "Delivered") acc[log.channel].delivered += 1;
      return acc;
    },
    {}
  );

  const coverageByProvince = volunteers.reduce<Record<string, number>>((acc, volunteer) => {
    acc[volunteer.province] = (acc[volunteer.province] ?? 0) + 1;
    return acc;
  }, {});

  return ok({
    reports: {
      alertDelivery: deliveryByChannel,
      volunteerAcknowledgment: {
        totalVolunteers: volunteers.length,
        acknowledgments: acknowledgments.length,
        rate: volunteers.length ? Math.round((acknowledgments.length / volunteers.length) * 100) : 0
      },
      areaCoverage: coverageByProvince,
      failedNotifications: logs.filter((log) => log.status === "Failed"),
      responseActivity: responseNotes,
      alertCount: alerts.length
    }
  });
}
