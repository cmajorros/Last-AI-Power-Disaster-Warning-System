import { error, ok, parseBody, requirePermission } from "@/lib/api";
import { createAlert, updateAlert } from "@/lib/store";
import { notificationChannels, type AlertDraftProposal, type NotificationChannel } from "@/lib/types";

export const runtime = "nodejs";

type CreateFromIntakeBody = {
  proposal?: AlertDraftProposal;
  reviewerRoutingNotes?: string;
  communicationChannels?: NotificationChannel[];
};

export async function POST(request: Request) {
  const auth = await requirePermission("create_alert");
  if (!auth.allowed) return auth.response;

  const body = await parseBody<CreateFromIntakeBody>(request);
  const proposal = body.proposal;
  if (!proposal?.alertInput?.location || !proposal.alertInput.predictedImpact) {
    return error("Missing AI intake proposal");
  }

  const reviewerChannels = normalizeChannels(body.communicationChannels, proposal.alertInput.communicationChannels);
  const alert = await createAlert(
    {
      ...proposal.alertInput,
      communicationChannels: reviewerChannels
    },
    auth.user.id
  );

  const reviewerNote = body.reviewerRoutingNotes?.trim();
  const routingGroups = proposal.targetAudience.routingGroups.length
    ? proposal.targetAudience.routingGroups
    : proposal.aiAssessment.routingGroups ?? [];
  const qualityFlags = [
    ...proposal.qualityFlags,
    ...(reviewerNote ? [`Reviewer routing note: ${reviewerNote}`] : [])
  ];

  const updated = await updateAlert(
    alert.id,
    {
      status: "AI Generated",
      messageEn: proposal.messageEn,
      messageLo: proposal.messageLo,
      communicationChannels: reviewerChannels,
      aiAssessment: {
        ...proposal.aiAssessment,
        routingGroups,
        suggestedChannels: reviewerChannels,
        qualityFlags,
        generatedAt: new Date().toISOString()
      }
    },
    auth.user.id
  );

  return ok({ alert: updated ?? alert, proposal }, { status: 201 });
}

function normalizeChannels(value: unknown, fallback: NotificationChannel[]): NotificationChannel[] {
  const channels = Array.isArray(value)
    ? value.filter((item): item is NotificationChannel =>
        typeof item === "string" && notificationChannels.includes(item as NotificationChannel)
      )
    : [];
  return channels.length > 0 ? Array.from(new Set(channels)) : fallback;
}
