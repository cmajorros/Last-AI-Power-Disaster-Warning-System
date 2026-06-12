import { error, ok, parseBody, requirePermission } from "@/lib/api";
import { hasGmailConfig, readLatestGmailMessage } from "@/lib/gmail";
import { analyzeIntake } from "@/lib/intake";
import { createAlert, updateAlert } from "@/lib/store";

export const runtime = "nodejs";

type GmailPollBody = {
  targetAudienceNotes?: string;
};

export async function POST(request: Request) {
  const auth = await requirePermission("create_alert");
  if (!auth.allowed) return auth.response;
  if (!hasGmailConfig()) {
    return error("Gmail OAuth is not configured. Set GMAIL_CLIENT_ID, GMAIL_CLIENT_SECRET, and GMAIL_REFRESH_TOKEN.");
  }

  const body = await parseBody<GmailPollBody>(request);
  const gmail = await readLatestGmailMessage();
  const rawText = [
    gmail.from ? `From: ${gmail.from}` : "",
    gmail.subject ? `Subject: ${gmail.subject}` : "",
    gmail.date ? `Date: ${gmail.date}` : "",
    gmail.snippet ? `Snippet: ${gmail.snippet}` : "",
    gmail.text
  ]
    .filter(Boolean)
    .join("\n");

  const proposal = await analyzeIntake({
    sourceType: "gmail",
    sourceName: gmail.from || "Gmail mailbox",
    rawText,
    targetAudienceNotes:
      body.targetAudienceNotes ||
      "Create a reviewer-controlled alert draft and prioritize vulnerable people, schools, clinics, rescue teams, and equipment routing."
  });

  const alert = await createAlert(proposal.alertInput, auth.user.id);
  const updated = await updateAlert(
    alert.id,
    {
      status: "AI Generated",
      messageEn: proposal.messageEn,
      messageLo: proposal.messageLo,
      aiAssessment: proposal.aiAssessment,
      communicationChannels: proposal.alertInput.communicationChannels
    },
    auth.user.id
  );

  return ok({
    alert: updated ?? alert,
    proposal,
    gmail: {
      id: gmail.id,
      threadId: gmail.threadId,
      from: gmail.from,
      subject: gmail.subject,
      date: gmail.date,
      attachments: gmail.attachments
    }
  });
}
