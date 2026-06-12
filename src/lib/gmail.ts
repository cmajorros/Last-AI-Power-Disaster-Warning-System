export type GmailMessage = {
  id: string;
  threadId?: string;
  from: string;
  subject: string;
  date: string;
  snippet: string;
  text: string;
  attachments: Array<{ filename: string; mimeType: string; attachmentId?: string }>;
};

type GmailListResponse = {
  messages?: Array<{ id: string; threadId?: string }>;
};

type GmailPayloadPart = {
  partId?: string;
  mimeType?: string;
  filename?: string;
  headers?: Array<{ name: string; value: string }>;
  body?: {
    attachmentId?: string;
    data?: string;
  };
  parts?: GmailPayloadPart[];
};

type GmailGetResponse = {
  id: string;
  threadId?: string;
  snippet?: string;
  payload?: GmailPayloadPart;
};

export function hasGmailConfig() {
  return Boolean(
    (process.env.GMAIL_REFRESH_TOKEN || process.env.GMAIL_ACCESS_TOKEN) &&
      (process.env.GMAIL_ACCESS_TOKEN || (process.env.GMAIL_CLIENT_ID && process.env.GMAIL_CLIENT_SECRET))
  );
}

export async function readLatestGmailMessage(): Promise<GmailMessage> {
  const accessToken = await getGmailAccessToken();
  const query = process.env.GMAIL_QUERY || "newer_than:7d";
  const listUrl = new URL("https://gmail.googleapis.com/gmail/v1/users/me/messages");
  listUrl.searchParams.set("maxResults", "1");
  listUrl.searchParams.set("q", query);

  const listResponse = await gmailFetch<GmailListResponse>(listUrl, accessToken);
  const messageId = listResponse.messages?.[0]?.id;
  if (!messageId) {
    throw new Error(`No Gmail messages matched query: ${query}`);
  }

  const getUrl = new URL(`https://gmail.googleapis.com/gmail/v1/users/me/messages/${messageId}`);
  getUrl.searchParams.set("format", "full");
  const message = await gmailFetch<GmailGetResponse>(getUrl, accessToken);
  const headers = headersToRecord(message.payload?.headers ?? []);
  const parsed = parsePayload(message.payload);

  return {
    id: message.id,
    threadId: message.threadId,
    from: headers.from ?? "",
    subject: headers.subject ?? "",
    date: headers.date ?? "",
    snippet: message.snippet ?? "",
    text: parsed.text || message.snippet || "",
    attachments: parsed.attachments
  };
}

async function getGmailAccessToken() {
  if (process.env.GMAIL_ACCESS_TOKEN) return process.env.GMAIL_ACCESS_TOKEN;

  const clientId = process.env.GMAIL_CLIENT_ID;
  const clientSecret = process.env.GMAIL_CLIENT_SECRET;
  const refreshToken = process.env.GMAIL_REFRESH_TOKEN;
  if (!clientId || !clientSecret || !refreshToken) {
    throw new Error("Missing Gmail OAuth credentials");
  }

  const response = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      refresh_token: refreshToken,
      grant_type: "refresh_token"
    })
  });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok || !isRecord(payload) || typeof payload.access_token !== "string") {
    throw new Error(providerError(payload, response.statusText));
  }
  return payload.access_token;
}

async function gmailFetch<T>(url: URL, accessToken: string): Promise<T> {
  const response = await fetch(url, {
    headers: { Authorization: `Bearer ${accessToken}` }
  });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(providerError(payload, response.statusText));
  return payload as T;
}

function parsePayload(payload: GmailPayloadPart | undefined): {
  text: string;
  attachments: GmailMessage["attachments"];
} {
  if (!payload) return { text: "", attachments: [] };
  const textParts: string[] = [];
  const attachments: GmailMessage["attachments"] = [];

  function visit(part: GmailPayloadPart) {
    const filename = part.filename ?? "";
    if (filename) {
      attachments.push({
        filename,
        mimeType: part.mimeType ?? "application/octet-stream",
        attachmentId: part.body?.attachmentId
      });
    }

    if (!filename && part.body?.data && (part.mimeType === "text/plain" || part.mimeType === "text/html")) {
      const decoded = decodeBase64Url(part.body.data);
      textParts.push(part.mimeType === "text/html" ? stripHtml(decoded) : decoded);
    }

    part.parts?.forEach(visit);
  }

  visit(payload);
  return {
    text: textParts.join("\n\n").trim(),
    attachments
  };
}

function headersToRecord(headers: Array<{ name: string; value: string }>) {
  return Object.fromEntries(headers.map((header) => [header.name.toLowerCase(), header.value]));
}

function decodeBase64Url(value: string) {
  const padded = value.replace(/-/g, "+").replace(/_/g, "/").padEnd(Math.ceil(value.length / 4) * 4, "=");
  return Buffer.from(padded, "base64").toString("utf8");
}

function stripHtml(value: string) {
  return value
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function providerError(payload: unknown, fallback: string) {
  if (isRecord(payload) && isRecord(payload.error)) {
    const message = typeof payload.error.message === "string" ? payload.error.message : "";
    const description =
      typeof payload.error_description === "string" ? payload.error_description : "";
    return message || description || fallback;
  }
  if (isRecord(payload) && typeof payload.error_description === "string") return payload.error_description;
  return fallback;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}
