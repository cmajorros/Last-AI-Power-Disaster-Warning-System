import { error, ok, requirePermission } from "@/lib/api";
import { getAlertById, updateAlert } from "@/lib/store";

export const runtime = "nodejs";

export async function POST(_: Request, { params }: { params: { id: string } }) {
  const auth = await requirePermission("review_alert");
  if (!auth.allowed) return auth.response;

  const alert = await getAlertById(params.id);
  if (!alert) return error("Alert not found", 404);

  const updated = await updateAlert(alert.id, { status: "Under Review" }, auth.user.id);
  return ok({ alert: updated });
}
