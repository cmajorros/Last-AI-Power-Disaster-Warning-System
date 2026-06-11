import { currentUser } from "@/lib/auth";
import { ok } from "@/lib/api";
import {
  databaseMode,
  listAcknowledgments,
  listAlerts,
  listHazards,
  listNotificationLogs,
  listResponseNotes,
  listUsers,
  listVolunteers
} from "@/lib/store";
import type { Alert } from "@/lib/types";

export const runtime = "nodejs";

function visibleAlertsForRole(alerts: Alert[], role: string) {
  if (role === "volunteer" || role === "community_member") {
    return alerts.filter((alert) => alert.status === "Published");
  }
  return alerts;
}

export async function GET() {
  const [user, users, alerts, hazards, volunteers, notificationLogs, acknowledgments, responseNotes] =
    await Promise.all([
      currentUser(),
      listUsers(),
      listAlerts(),
      listHazards(),
      listVolunteers(),
      listNotificationLogs(),
      listAcknowledgments(),
      listResponseNotes()
    ]);

  const visibleAlerts = visibleAlertsForRole(alerts, user.role);
  const activeAlerts = visibleAlerts.filter(
    (alert) => !["Cancelled", "Closed"].includes(alert.status)
  );
  const delivered = notificationLogs.filter((log) => log.status === "Delivered").length;
  const failed = notificationLogs.filter((log) => log.status === "Failed").length;
  const totalPopulation = activeAlerts.reduce((sum, alert) => sum + alert.affectedPopulation, 0);

  return ok({
    user,
    users,
    alerts: visibleAlerts,
    hazards,
    volunteers,
    notificationLogs,
    acknowledgments,
    responseNotes,
    databaseMode: databaseMode(),
    stats: {
      activeAlerts: activeAlerts.length,
      affectedPopulation: totalPopulation,
      delivered,
      failed,
      acknowledgmentCount: acknowledgments.length,
      volunteerCount: volunteers.length,
      averageRainfall:
        hazards.length > 0
          ? Math.round(hazards.reduce((sum, item) => sum + item.rainfallLevel, 0) / hazards.length)
          : 0,
      maxRiverLevel:
        hazards.length > 0 ? Math.max(...hazards.map((item) => item.riverLevel)) : 0
    }
  });
}
