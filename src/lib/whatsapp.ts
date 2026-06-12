import type { Alert } from "./types";

export type WhatsAppSendResult = {
  attempted: boolean;
  delivered: boolean;
  providerMessageId?: string;
  error?: string;
};

export function hasLiveWhatsAppConfig() {
  return Boolean(
    process.env.WHATSAPP_BUSINESS_TOKEN &&
      process.env.WHATSAPP_PHONE_NUMBER_ID &&
      process.env.WHATSAPP_TEST_RECIPIENT
  );
}

export async function sendLiveWhatsAppAlert(alert: Alert): Promise<WhatsAppSendResult> {
  const token = process.env.WHATSAPP_BUSINESS_TOKEN;
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;
  const recipient = normalizePhone(process.env.WHATSAPP_TEST_RECIPIENT);

  if (!token || !phoneNumberId || !recipient) {
    return {
      attempted: false,
      delivered: false,
      error: "Missing WHATSAPP_BUSINESS_TOKEN, WHATSAPP_PHONE_NUMBER_ID, or WHATSAPP_TEST_RECIPIENT"
    };
  }

  const graphVersion = process.env.WHATSAPP_GRAPH_API_VERSION || "v23.0";
  const url = `https://graph.facebook.com/${graphVersion}/${phoneNumberId}/messages`;
  const body = buildMessageBody(recipient, alert);

  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  });

  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    return {
      attempted: true,
      delivered: false,
      error: providerError(payload, response.statusText)
    };
  }

  return {
    attempted: true,
    delivered: true,
    providerMessageId: extractMessageId(payload)
  };
}

function buildMessageBody(recipient: string, alert: Alert) {
  const templateName = process.env.WHATSAPP_ALERT_TEMPLATE_NAME;
  if (templateName) {
    return {
      messaging_product: "whatsapp",
      to: recipient,
      type: "template",
      template: {
        name: templateName,
        language: { code: process.env.WHATSAPP_TEMPLATE_LANGUAGE || "en_US" },
        components: [
          {
            type: "body",
            parameters: [
              { type: "text", text: alert.severity },
              { type: "text", text: alert.hazardType },
              { type: "text", text: alert.location },
              { type: "text", text: alert.recommendedAction.slice(0, 900) }
            ]
          }
        ]
      }
    };
  }

  return {
    messaging_product: "whatsapp",
    to: recipient,
    type: "text",
    text: {
      preview_url: false,
      body: formatWhatsAppAlert(alert)
    }
  };
}

function formatWhatsAppAlert(alert: Alert) {
  const message = alert.messageEn || alert.messageLo;
  const fallback = `${alert.severity} ${alert.hazardType} alert for ${alert.location}, ${alert.district}, ${alert.province}. ${alert.predictedImpact} ${alert.recommendedAction}`;
  return (message || fallback).slice(0, 3500);
}

function normalizePhone(value: string | undefined) {
  if (!value) return "";
  return value.replace(/[^\d]/g, "");
}

function providerError(payload: unknown, fallback: string) {
  if (isRecord(payload) && isRecord(payload.error)) {
    const message = typeof payload.error.message === "string" ? payload.error.message : "";
    const code = typeof payload.error.code === "number" ? ` code ${payload.error.code}` : "";
    return `${message}${code}`.trim() || fallback;
  }
  return fallback;
}

function extractMessageId(payload: unknown) {
  if (!isRecord(payload) || !Array.isArray(payload.messages)) return undefined;
  const first = payload.messages[0];
  return isRecord(first) && typeof first.id === "string" ? first.id : undefined;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}
