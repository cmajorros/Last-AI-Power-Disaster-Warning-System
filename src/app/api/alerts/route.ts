import { currentUser } from "@/lib/auth";
import { error, ok, parseBody, requirePermission } from "@/lib/api";
import { createAlert, listAlerts } from "@/lib/store";
import type { AlertInput } from "@/lib/types";

export const runtime = "nodejs";

export async function GET() {
  const user = await currentUser();
  const alerts = await listAlerts();
  if (user.role === "volunteer" || user.role === "community_member") {
    return ok({ alerts: alerts.filter((alert) => alert.status === "Published") });
  }
  return ok({ alerts });
}

export async function POST(request: Request) {
  const auth = await requirePermission("create_alert");
  if (!auth.allowed) return auth.response;

  const body = await parseBody<Partial<AlertInput>>(request);
  if (!body.hazardType || !body.location || !body.province || !body.district || !body.predictedImpact) {
    return error("Missing required alert fields");
  }

  const alert = await createAlert(
    {
      hazardType: body.hazardType,
      severity: body.severity ?? "Watch",
      location: body.location,
      province: body.province,
      district: body.district,
      lat: Number(body.lat ?? 17.4103),
      lng: Number(body.lng ?? 104.8307),
      affectedPopulation: Number(body.affectedPopulation ?? 0),
      predictedImpact: body.predictedImpact,
      recommendedAction: body.recommendedAction ?? "Follow official instructions.",
      startTime: body.startTime ?? new Date().toISOString(),
      expectedDuration: body.expectedDuration ?? "12 hours",
      language: body.language ?? "en",
      communicationChannels: body.communicationChannels ?? ["SMS", "WhatsApp", "In-app"]
    },
    auth.user.id
  );

  return ok({ alert }, { status: 201 });
}
