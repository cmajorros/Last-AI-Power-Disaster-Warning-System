import { buildAiDraft } from "@/lib/ai";
import { error, ok, requirePermission } from "@/lib/api";
import { getAlertById, listHazards, updateAlert } from "@/lib/store";

export const runtime = "nodejs";

export async function POST(_: Request, { params }: { params: { id: string } }) {
  const auth = await requirePermission("draft_with_ai");
  if (!auth.allowed) return auth.response;

  const [alert, hazards] = await Promise.all([getAlertById(params.id), listHazards()]);
  if (!alert) return error("Alert not found", 404);

  const draft = buildAiDraft(alert, hazards);
  const updated = await updateAlert(
    alert.id,
    {
      messageEn: draft.messageEn,
      messageLo: draft.messageLo,
      aiAssessment: draft.assessment,
      communicationChannels: draft.assessment.suggestedChannels ?? alert.communicationChannels,
      severity: draft.assessment.riskLevel ?? alert.severity,
      status: "AI Generated"
    },
    auth.user.id
  );

  return ok({ alert: updated, draft });
}
