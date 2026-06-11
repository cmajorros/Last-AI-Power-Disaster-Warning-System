import { error, ok, parseBody, requirePermission } from "@/lib/api";
import { getAlertById, updateAlert } from "@/lib/store";
import type { Alert } from "@/lib/types";

export const runtime = "nodejs";

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const alert = await getAlertById(params.id);
  if (!alert) return error("Alert not found", 404);
  return ok({ alert });
}

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  const auth = await requirePermission("review_alert");
  if (!auth.allowed) return auth.response;

  const body = await parseBody<Partial<Alert>>(request);
  const allowedPatch: Partial<Alert> = {
    hazardType: body.hazardType,
    severity: body.severity,
    status: body.status,
    location: body.location,
    province: body.province,
    district: body.district,
    affectedPopulation: body.affectedPopulation,
    predictedImpact: body.predictedImpact,
    recommendedAction: body.recommendedAction,
    startTime: body.startTime,
    expectedDuration: body.expectedDuration,
    language: body.language,
    communicationChannels: body.communicationChannels,
    messageEn: body.messageEn,
    messageLo: body.messageLo,
    aiAssessment: body.aiAssessment
  };

  const cleanPatch = Object.fromEntries(
    Object.entries(allowedPatch).filter(([, value]) => value !== undefined)
  ) as Partial<Alert>;
  const alert = await updateAlert(params.id, cleanPatch, auth.user.id);
  if (!alert) return error("Alert not found", 404);
  return ok({ alert });
}
