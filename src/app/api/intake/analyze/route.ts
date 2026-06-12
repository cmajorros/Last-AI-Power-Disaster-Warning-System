import { error, ok, requirePermission } from "@/lib/api";
import { analyzeIntake } from "@/lib/intake";
import type { IntakeSourceType } from "@/lib/types";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const auth = await requirePermission("draft_with_ai");
  if (!auth.allowed) return auth.response;

  const formData = await request.formData().catch(() => null);
  if (!formData) return error("Expected multipart form data");

  const sourceType = readString(formData, "sourceType") as IntakeSourceType;
  if (!["gmail", "other_email", "whatsapp_business", "manual_upload"].includes(sourceType)) {
    return error("Unsupported intake source");
  }

  const proposal = await analyzeIntake({
    sourceType,
    sourceName: readString(formData, "sourceName"),
    rawText: readString(formData, "rawText"),
    targetAudienceNotes: readString(formData, "targetAudienceNotes"),
    files: formData.getAll("attachments").filter(isFileWithContent)
  });

  return ok({ proposal });
}

function readString(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value : "";
}

function isFileWithContent(value: FormDataEntryValue): value is File {
  return typeof value !== "string" && value.size > 0;
}
