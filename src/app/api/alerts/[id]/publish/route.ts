import { buildNotificationLogs } from "@/lib/notifications";
import { error, ok, requirePermission } from "@/lib/api";
import {
  addNotificationLogs,
  getAlertById,
  listUsers,
  listVolunteers,
  updateAlert
} from "@/lib/store";

export const runtime = "nodejs";

export async function POST(_: Request, { params }: { params: { id: string } }) {
  const auth = await requirePermission("publish_alert");
  if (!auth.allowed) return auth.response;

  const alert = await getAlertById(params.id);
  if (!alert) return error("Alert not found", 404);
  if (alert.status !== "Approved") {
    return error("Alert must be approved before publishing", 409);
  }

  const publishedAt = new Date().toISOString();
  const updated = await updateAlert(alert.id, { status: "Published", publishedAt }, auth.user.id);
  if (!updated) return error("Alert not found", 404);

  const [volunteers, users] = await Promise.all([listVolunteers(), listUsers()]);
  const logs = buildNotificationLogs(updated, volunteers, users);
  await addNotificationLogs(logs, auth.user.id);

  return ok({ alert: updated, notificationLogs: logs });
}
