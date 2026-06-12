import { error, ok, parseBody } from "@/lib/api";
import { analyzeIntake } from "@/lib/intake";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const mode = url.searchParams.get("hub.mode");
  const token = url.searchParams.get("hub.verify_token");
  const challenge = url.searchParams.get("hub.challenge");
  const expectedToken = process.env.WHATSAPP_WEBHOOK_VERIFY_TOKEN;

  if (mode === "subscribe" && challenge && expectedToken && token === expectedToken) {
    return new Response(challenge, { status: 200 });
  }

  return error("WhatsApp webhook verification failed", 403);
}

export async function POST(request: Request) {
  const expectedToken = process.env.WHATSAPP_WEBHOOK_VERIFY_TOKEN;
  if (expectedToken && request.headers.get("x-webhook-token") !== expectedToken) {
    return error("Invalid WhatsApp webhook token", 401);
  }

  const payload = await parseBody<unknown>(request);
  const rawText = extractWhatsAppText(payload);
  if (!rawText.trim()) {
    return ok({
      received: true,
      note: "WhatsApp webhook received, but no text/caption content was available. Media download requires Meta Graph API credentials."
    });
  }

  const proposal = await analyzeIntake({
    sourceType: "whatsapp_business",
    sourceName: "WhatsApp Business webhook",
    rawText,
    targetAudienceNotes: "Route by extracted Lao province/district and prioritize vulnerable groups mentioned in the message."
  });

  return ok({ received: true, proposal });
}

function extractWhatsAppText(payload: unknown): string {
  const lines: string[] = [];
  walk(payload, (value) => {
    if (!isRecord(value)) return;
    const type = typeof value.type === "string" ? value.type : "";
    if (type === "text" && isRecord(value.text) && typeof value.text.body === "string") {
      lines.push(value.text.body);
    }
    if ((type === "image" || type === "document") && isRecord(value[type])) {
      const media = value[type];
      if (typeof media.caption === "string") lines.push(media.caption);
      if (typeof media.id === "string") {
        lines.push(`[WhatsApp ${type} media id ${media.id}; download via Meta Graph API before production OCR.]`);
      }
    }
  });
  return lines.join("\n");
}

function walk(value: unknown, visit: (value: unknown) => void) {
  visit(value);
  if (Array.isArray(value)) {
    value.forEach((item) => walk(item, visit));
    return;
  }
  if (!isRecord(value)) return;
  Object.values(value).forEach((item) => walk(item, visit));
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}
