import { error, ok, parseBody, requirePermission } from "@/lib/api";
import { analyzeIntake } from "@/lib/intake";

export const runtime = "nodejs";

type GmailIntakeBody = {
  from?: string;
  subject?: string;
  body?: string;
  snippet?: string;
  targetAudienceNotes?: string;
};

export async function POST(request: Request) {
  const auth = await requirePermission("draft_with_ai");
  if (!auth.allowed) return auth.response;

  const body = await parseBody<GmailIntakeBody>(request);
  const rawText = [
    body.from ? `From: ${body.from}` : "",
    body.subject ? `Subject: ${body.subject}` : "",
    body.snippet ? `Snippet: ${body.snippet}` : "",
    body.body ?? ""
  ]
    .filter(Boolean)
    .join("\n");

  if (!rawText.trim()) return error("Missing Gmail message content");

  const proposal = await analyzeIntake({
    sourceType: "gmail",
    sourceName: body.from || "Gmail message",
    rawText,
    targetAudienceNotes: body.targetAudienceNotes
  });

  return ok({ proposal });
}
