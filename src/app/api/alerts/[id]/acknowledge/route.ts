import { currentUser } from "@/lib/auth";
import { error, ok, parseBody, requirePermission } from "@/lib/api";
import { getAlertById, upsertAcknowledgment } from "@/lib/store";
import type { Acknowledgment } from "@/lib/types";

export const runtime = "nodejs";

export async function POST(request: Request, { params }: { params: { id: string } }) {
  const auth = await requirePermission("acknowledge_alert");
  if (!auth.allowed) return auth.response;

  const alert = await getAlertById(params.id);
  if (!alert) return error("Alert not found", 404);

  const body = await parseBody<Partial<Acknowledgment> & { userId?: string }>(request);
  const user = await currentUser();
  const ack = await upsertAcknowledgment({
    alertId: alert.id,
    userId: body.userId || user.id,
    status: body.status ?? "Acknowledged",
    disseminationMethod: body.disseminationMethod ?? "Village loudspeaker",
    notes: body.notes ?? ""
  });

  return ok({ acknowledgment: ack });
}
