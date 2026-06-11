import { error, ok, requirePermission } from "@/lib/api";
import { getAlertById, updateAlert } from "@/lib/store";

export const runtime = "nodejs";

export async function POST(_: Request, { params }: { params: { id: string } }) {
  const auth = await requirePermission("approve_alert");
  if (!auth.allowed) return auth.response;

  const alert = await getAlertById(params.id);
  if (!alert) return error("Alert not found", 404);
  if (!["AI Generated", "Under Review", "Updated"].includes(alert.status)) {
    return error("Alert must be AI Generated, Under Review, or Updated before approval", 409);
  }

  const updated = await updateAlert(
    alert.id,
    { status: "Approved", approvedBy: auth.user.id },
    auth.user.id
  );
  return ok({ alert: updated });
}
