import { randomUUID } from "crypto";
import type { Alert, NotificationLog, User, Volunteer } from "./types";

function notificationId() {
  return `log-${randomUUID().slice(0, 8)}`;
}

export function buildNotificationLogs(alert: Alert, volunteers: Volunteer[], users: User[]): NotificationLog[] {
  const now = new Date();
  const logs: NotificationLog[] = [];
  const districtVolunteers = volunteers.filter(
    (volunteer) => volunteer.district === alert.district || volunteer.province === alert.province
  );
  const officials = users.filter((user) => user.role === "emergency_response" || user.role === "cso_coordinator");

  for (const volunteer of districtVolunteers) {
    for (const channel of alert.communicationChannels.filter((channel) => channel === "SMS" || channel === "WhatsApp")) {
      const canSendWhatsapp = channel !== "WhatsApp" || volunteer.whatsappEnabled;
      const delivered = canSendWhatsapp && volunteer.phoneLast4 !== "2003";
      logs.push({
        id: notificationId(),
        alertId: alert.id,
        recipientId: volunteer.id,
        recipientType: "volunteer",
        channel,
        status: delivered ? "Delivered" : "Failed",
        sentAt: now.toISOString(),
        deliveredAt: delivered ? new Date(now.getTime() + 90_000).toISOString() : null,
        failedReason: delivered ? null : channel === "WhatsApp" ? "WhatsApp unavailable" : "Carrier timeout"
      });
    }
  }

  for (const official of officials) {
    const channel = alert.communicationChannels.includes("Email") ? "Email" : "In-app";
    logs.push({
      id: notificationId(),
      alertId: alert.id,
      recipientId: official.id,
      recipientType: "official",
      channel,
      status: "Delivered",
      sentAt: now.toISOString(),
      deliveredAt: new Date(now.getTime() + 30_000).toISOString(),
      failedReason: null
    });
  }

  return logs;
}
