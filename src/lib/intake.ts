import {
  hazardTypes,
  notificationChannels,
  severities,
  type AlertDraftProposal,
  type AlertInput,
  type HazardType,
  type IntakeAttachmentSummary,
  type IntakeSourceType,
  type NotificationChannel,
  type Severity
} from "./types";

type ResponsesContentPart =
  | { type: "input_text"; text: string }
  | { type: "input_image"; image_url: string }
  | { type: "input_file"; filename: string; file_data: string };

type PreparedAttachment = {
  summaries: IntakeAttachmentSummary[];
  contentParts: ResponsesContentPart[];
  extractedText: string[];
  qualityFlags: string[];
};

type IntakeAnalysisRequest = {
  sourceType: IntakeSourceType;
  sourceName?: string;
  rawText?: string;
  targetAudienceNotes?: string;
  files?: File[];
};

type OpenAiFlatResult = {
  hazardType?: string;
  severity?: string;
  location?: string;
  province?: string;
  district?: string;
  lat?: number;
  lng?: number;
  affectedPopulation?: number;
  predictedImpact?: string;
  recommendedAction?: string;
  startTime?: string;
  expectedDuration?: string;
  language?: string;
  communicationChannels?: string[];
  messageEn?: string;
  messageLo?: string;
  riskScore?: number;
  impactSummary?: string;
  routingGroups?: string[];
  suggestedChannels?: string[];
  qualityFlags?: string[];
  sourceSummary?: string;
  evidenceSummary?: string;
  targetAudienceSummary?: string;
  priorityGroups?: string[];
  confidence?: number;
};

const DEFAULT_MODEL = "gpt-4.1-mini";

const laosLocations = [
  {
    keys: ["vientiane", "vientiane capital", "pak ngum", "xaysetha", "sisattanak"],
    province: "Vientiane Capital",
    district: "Pak Ngum",
    location: "Pak Ngum riverbank villages",
    lat: 18.208,
    lng: 103.116
  },
  {
    keys: ["khammouane", "thakhek", "nam hinboun", "mekong"],
    province: "Khammouane",
    district: "Thakhek",
    location: "Thakhek Mekong river villages",
    lat: 17.4103,
    lng: 104.8307
  },
  {
    keys: ["luang prabang", "nam khan", "xieng ngeun"],
    province: "Luang Prabang",
    district: "Luang Prabang",
    location: "Nam Khan riverside communities",
    lat: 19.8833,
    lng: 102.1333
  },
  {
    keys: ["savannakhet", "kaysone", "kaysone phomvihane"],
    province: "Savannakhet",
    district: "Kaysone Phomvihane",
    location: "Kaysone Phomvihane low-lying villages",
    lat: 16.55,
    lng: 104.75
  },
  {
    keys: ["champasak", "pakse", "sekong"],
    province: "Champasak",
    district: "Pakse",
    location: "Pakse flood-prone neighborhoods",
    lat: 15.1202,
    lng: 105.7988
  },
  {
    keys: ["attapeu", "sanamxay", "sanam xay"],
    province: "Attapeu",
    district: "Sanamxay",
    location: "Sanamxay downstream villages",
    lat: 14.8147,
    lng: 106.8311
  }
];

const intakeSchema = {
  type: "object",
  additionalProperties: false,
  properties: {
    hazardType: { type: "string", enum: hazardTypes },
    severity: { type: "string", enum: severities },
    location: { type: "string" },
    province: { type: "string" },
    district: { type: "string" },
    lat: { type: "number" },
    lng: { type: "number" },
    affectedPopulation: { type: "number" },
    predictedImpact: { type: "string" },
    recommendedAction: { type: "string" },
    startTime: { type: "string" },
    expectedDuration: { type: "string" },
    language: { type: "string", enum: ["en", "lo"] },
    communicationChannels: { type: "array", items: { type: "string", enum: notificationChannels } },
    messageEn: { type: "string" },
    messageLo: { type: "string" },
    riskScore: { type: "number" },
    impactSummary: { type: "string" },
    routingGroups: { type: "array", items: { type: "string" } },
    suggestedChannels: { type: "array", items: { type: "string", enum: notificationChannels } },
    qualityFlags: { type: "array", items: { type: "string" } },
    sourceSummary: { type: "string" },
    evidenceSummary: { type: "string" },
    targetAudienceSummary: { type: "string" },
    priorityGroups: { type: "array", items: { type: "string" } },
    confidence: { type: "number" }
  },
  required: [
    "hazardType",
    "severity",
    "location",
    "province",
    "district",
    "lat",
    "lng",
    "affectedPopulation",
    "predictedImpact",
    "recommendedAction",
    "startTime",
    "expectedDuration",
    "language",
    "communicationChannels",
    "messageEn",
    "messageLo",
    "riskScore",
    "impactSummary",
    "routingGroups",
    "suggestedChannels",
    "qualityFlags",
    "sourceSummary",
    "evidenceSummary",
    "targetAudienceSummary",
    "priorityGroups",
    "confidence"
  ]
};

export async function analyzeIntake(request: IntakeAnalysisRequest): Promise<AlertDraftProposal> {
  const prepared = await prepareAttachments(request.files ?? []);
  const sourceName = request.sourceName?.trim() || sourceLabel(request.sourceType);
  const evidenceText = [request.rawText?.trim(), ...prepared.extractedText].filter(Boolean).join("\n\n");
  const fallback = deterministicProposal(
    {
      sourceType: request.sourceType,
      sourceName,
      rawText: evidenceText,
      targetAudienceNotes: request.targetAudienceNotes,
      attachments: prepared.summaries
    },
    prepared.qualityFlags
  );

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return {
      ...fallback,
      qualityFlags: unique([
        ...fallback.qualityFlags,
        "OPENAI_API_KEY is not configured; using deterministic demo extraction."
      ]),
      aiAssessment: {
        ...fallback.aiAssessment,
        qualityFlags: unique([
          ...(fallback.aiAssessment.qualityFlags ?? []),
          "OPENAI_API_KEY is not configured; using deterministic demo extraction."
        ])
      }
    };
  }

  try {
    const model = process.env.OPENAI_INTAKE_MODEL || DEFAULT_MODEL;
    const proposal = await callOpenAiIntake({
      model,
      apiKey,
      sourceType: request.sourceType,
      sourceName,
      rawText: evidenceText,
      targetAudienceNotes: request.targetAudienceNotes,
      attachments: prepared.summaries,
      contentParts: prepared.contentParts,
      fallback
    });
    return {
      ...proposal,
      qualityFlags: unique([...proposal.qualityFlags, ...prepared.qualityFlags]),
      aiAssessment: {
        ...proposal.aiAssessment,
        qualityFlags: unique([...(proposal.aiAssessment.qualityFlags ?? []), ...prepared.qualityFlags])
      }
    };
  } catch (openAiError) {
    const message = openAiError instanceof Error ? openAiError.message : "OpenAI request failed";
    return {
      ...fallback,
      qualityFlags: unique([...fallback.qualityFlags, `OpenAI intake failed: ${message}`]),
      aiAssessment: {
        ...fallback.aiAssessment,
        qualityFlags: unique([...(fallback.aiAssessment.qualityFlags ?? []), `OpenAI intake failed: ${message}`])
      }
    };
  }
}

function sourceLabel(sourceType: IntakeSourceType) {
  if (sourceType === "gmail") return "Gmail";
  if (sourceType === "other_email") return "Email";
  if (sourceType === "whatsapp_business") return "WhatsApp Business";
  return "Manual upload";
}

async function prepareAttachments(files: File[]): Promise<PreparedAttachment> {
  const summaries: IntakeAttachmentSummary[] = [];
  const contentParts: ResponsesContentPart[] = [];
  const extractedText: string[] = [];
  const qualityFlags: string[] = [];

  for (const file of files) {
    if (!file || file.size === 0) continue;
    const mime = file.type || "application/octet-stream";
    const lowerName = file.name.toLowerCase();
    const summary: IntakeAttachmentSummary = {
      name: file.name,
      type: mime,
      size: file.size,
      extractedAs: "metadata"
    };

    if (mime.startsWith("image/")) {
      if (file.size > 8 * 1024 * 1024) {
        summary.notes = "Image is larger than the MVP vision limit and was recorded as metadata only.";
        qualityFlags.push(`${file.name} was too large for OCR/vision extraction.`);
      } else {
        const fileData = await fileToDataUrl(file, mime);
        contentParts.push({ type: "input_image", image_url: fileData });
        summary.extractedAs = "vision";
        summary.notes = "Image/screenshot queued for OpenAI vision extraction.";
      }
    } else if (mime === "application/pdf" || lowerName.endsWith(".pdf")) {
      if (file.size > 16 * 1024 * 1024) {
        summary.notes = "PDF is larger than the MVP file limit and was recorded as metadata only.";
        qualityFlags.push(`${file.name} was too large for PDF extraction.`);
      } else {
        const fileData = await fileToDataUrl(file, "application/pdf");
        contentParts.push({ type: "input_file", filename: file.name, file_data: fileData });
        summary.extractedAs = "file";
        summary.notes = "PDF queued for OpenAI file extraction.";
      }
    } else if (mime.startsWith("text/") || /\.(txt|md|csv|json)$/i.test(file.name)) {
      const text = await file.text();
      const clipped = text.slice(0, 12_000);
      extractedText.push(`Attachment ${file.name}:\n${clipped}`);
      summary.extractedAs = "text";
      summary.notes = text.length > clipped.length ? "Text clipped to MVP analysis limit." : "Text extracted locally.";
    } else {
      summary.notes = "Unsupported document type for live extraction in the MVP; filename and metadata were included.";
      qualityFlags.push(`${file.name} needs a document converter or provider extraction before production use.`);
    }

    summaries.push(summary);
  }

  return { summaries, contentParts, extractedText, qualityFlags };
}

async function fileToDataUrl(file: File, mime: string) {
  const buffer = Buffer.from(await file.arrayBuffer());
  return `data:${mime};base64,${buffer.toString("base64")}`;
}

async function callOpenAiIntake({
  model,
  apiKey,
  sourceType,
  sourceName,
  rawText,
  targetAudienceNotes,
  attachments,
  contentParts,
  fallback
}: {
  model: string;
  apiKey: string;
  sourceType: IntakeSourceType;
  sourceName: string;
  rawText: string;
  targetAudienceNotes?: string;
  attachments: IntakeAttachmentSummary[];
  contentParts: ResponsesContentPart[];
  fallback: AlertDraftProposal;
}): Promise<AlertDraftProposal> {
  const prompt = buildOpenAiPrompt({
    sourceType,
    sourceName,
    rawText,
    targetAudienceNotes,
    attachments
  });

  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model,
      input: [
        {
          role: "user",
          content: [{ type: "input_text", text: prompt }, ...contentParts]
        }
      ],
      text: {
        format: {
          type: "json_schema",
          name: "laos_alert_intake",
          schema: intakeSchema,
          strict: false
        }
      }
    })
  });

  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    const apiMessage =
      typeof payload === "object" && payload && "error" in payload
        ? JSON.stringify((payload as { error: unknown }).error).slice(0, 240)
        : response.statusText;
    throw new Error(apiMessage || `HTTP ${response.status}`);
  }

  const outputText = extractResponseText(payload);
  const parsed = parseJson(outputText);
  return proposalFromFlatResult(parsed, fallback, true, model);
}

function buildOpenAiPrompt(input: {
  sourceType: IntakeSourceType;
  sourceName: string;
  rawText: string;
  targetAudienceNotes?: string;
  attachments: IntakeAttachmentSummary[];
}) {
  const attachmentSummary =
    input.attachments.length > 0
      ? input.attachments.map((file) => `${file.name} (${file.type}, ${file.extractedAs})`).join("; ")
      : "No attachments";

  return [
    "You are an emergency alert intake analyst for Lao PDR.",
    "Read the incoming source text and any attached images/PDFs. Extract disaster risk facts only; do not invent sensor data.",
    "Create a human-reviewable alert draft for Laos. The draft must be suitable for SMS/WhatsApp and must not publish automatically.",
    "Prioritize last-mile routing for elders, children, pregnant people, people with disabilities, schools, clinics, riverbank villages, and rescue/volunteer teams when evidence supports it.",
    "Return only JSON matching the provided schema.",
    "",
    `Source type: ${input.sourceType}`,
    `Source name: ${input.sourceName}`,
    `Reviewer routing notes: ${input.targetAudienceNotes || "None"}`,
    `Attachments: ${attachmentSummary}`,
    "",
    "Incoming text:",
    input.rawText || "No source text was provided; rely on attachments if present."
  ].join("\n");
}

function extractResponseText(payload: unknown): string {
  if (isRecord(payload) && typeof payload.output_text === "string") return payload.output_text;
  if (!isRecord(payload) || !Array.isArray(payload.output)) return "";

  const textParts: string[] = [];
  for (const item of payload.output) {
    if (!isRecord(item) || !Array.isArray(item.content)) continue;
    for (const content of item.content) {
      if (isRecord(content) && typeof content.text === "string") textParts.push(content.text);
    }
  }
  return textParts.join("\n");
}

function parseJson(text: string): OpenAiFlatResult {
  const clean = text.trim().replace(/^```json\s*/i, "").replace(/```$/i, "").trim();
  if (!clean) return {};
  try {
    return JSON.parse(clean) as OpenAiFlatResult;
  } catch {
    const match = clean.match(/\{[\s\S]*\}/);
    if (!match) return {};
    return JSON.parse(match[0]) as OpenAiFlatResult;
  }
}

function deterministicProposal(
  input: {
    sourceType: IntakeSourceType;
    sourceName: string;
    rawText: string;
    targetAudienceNotes?: string;
    attachments?: IntakeAttachmentSummary[];
  },
  extraFlags: string[] = []
): AlertDraftProposal {
  const text = input.rawText || "";
  const lower = text.toLowerCase();
  const location = laosLocations.find((item) => item.keys.some((key) => lower.includes(key))) ?? laosLocations[1];
  const hazardType = inferHazard(lower);
  const severity = inferSeverity(lower);
  const affectedPopulation = inferPopulation(lower);
  const channels = inferChannels(lower);
  const priorityGroups = inferPriorityGroups(`${lower} ${(input.targetAudienceNotes ?? "").toLowerCase()}`);
  const startTime = new Date(Date.now() + 2 * 60 * 60_000).toISOString();
  const impact = inferImpact(hazardType, location.location, affectedPopulation, text);
  const action = inferAction(hazardType, priorityGroups);
  const riskScore = severityToScore(severity, hazardType);
  const routingGroups = [
    `${location.province} emergency operations center`,
    `${location.district} village volunteer network`,
    "Health posts, schools, and rescue equipment focal points"
  ];
  const sourceSummary = `${sourceLabel(input.sourceType)} intake from ${input.sourceName}`;
  const evidenceSummary = summarizeEvidence(text, input.attachments ?? []);

  const alertInput: AlertInput = {
    hazardType,
    severity,
    location: location.location,
    province: location.province,
    district: location.district,
    lat: location.lat,
    lng: location.lng,
    affectedPopulation,
    predictedImpact: impact,
    recommendedAction: action,
    startTime,
    expectedDuration: severity === "Emergency" ? "6-12 hours" : "12 hours",
    language: "en",
    communicationChannels: channels
  };

  const messageEn = `${severity} ${hazardType} alert for ${alertInput.location}, ${alertInput.district}. ${impact} ${action}`;
  const messageLo = `ແຈ້ງເຕືອນ ${hazardType} ລະດັບ ${severity} ສໍາລັບ ${alertInput.location}, ${alertInput.district}. ${impact} ${action}`;
  const qualityFlags = unique([
    ...extraFlags,
    text.length < 40 ? "Source text is short; reviewer should confirm location and timing." : "",
    input.attachments?.some((file) => file.extractedAs === "metadata")
      ? "Some attachments were recorded as metadata only."
      : ""
  ]);

  return {
    alertInput,
    messageEn,
    messageLo,
    aiAssessment: {
      riskScore,
      riskLevel: severity,
      impactSummary: `${affectedPopulation.toLocaleString()} people may need early warning in ${location.district}, ${location.province}.`,
      routingGroups,
      suggestedChannels: channels,
      qualityFlags,
      translationConfidence: 0.72,
      generatedAt: new Date().toISOString()
    },
    sourceSummary,
    evidenceSummary,
    targetAudience: {
      summary: `Route to ${location.district} communities with priority for ${priorityGroups.join(", ")}.`,
      provinces: [location.province],
      districts: [location.district],
      priorityGroups,
      routingGroups,
      suggestedChannels: channels,
      reviewerNotes: input.targetAudienceNotes
    },
    confidence: qualityFlags.length > 0 ? 0.62 : 0.72,
    qualityFlags,
    usedOpenAi: false,
    createdAt: new Date().toISOString()
  };
}

function proposalFromFlatResult(
  result: OpenAiFlatResult,
  fallback: AlertDraftProposal,
  usedOpenAi: boolean,
  model?: string
): AlertDraftProposal {
  const alertInput: AlertInput = {
    hazardType: pickFrom(hazardTypes, result.hazardType, fallback.alertInput.hazardType),
    severity: pickFrom(severities, result.severity, fallback.alertInput.severity),
    location: nonEmpty(result.location, fallback.alertInput.location),
    province: nonEmpty(result.province, fallback.alertInput.province),
    district: nonEmpty(result.district, fallback.alertInput.district),
    lat: finiteNumber(result.lat, fallback.alertInput.lat),
    lng: finiteNumber(result.lng, fallback.alertInput.lng),
    affectedPopulation: Math.max(0, Math.round(finiteNumber(result.affectedPopulation, fallback.alertInput.affectedPopulation))),
    predictedImpact: nonEmpty(result.predictedImpact, fallback.alertInput.predictedImpact),
    recommendedAction: nonEmpty(result.recommendedAction, fallback.alertInput.recommendedAction),
    startTime: validDateString(result.startTime, fallback.alertInput.startTime),
    expectedDuration: nonEmpty(result.expectedDuration, fallback.alertInput.expectedDuration),
    language: result.language === "lo" ? "lo" : "en",
    communicationChannels: normalizeChannels(result.communicationChannels, fallback.alertInput.communicationChannels)
  };
  const suggestedChannels = normalizeChannels(result.suggestedChannels, alertInput.communicationChannels);
  const qualityFlags = unique([...arrayOfStrings(result.qualityFlags), ...fallback.qualityFlags]);
  const routingGroups = arrayOfStrings(result.routingGroups);
  const priorityGroups = arrayOfStrings(result.priorityGroups);

  return {
    alertInput: { ...alertInput, communicationChannels: suggestedChannels },
    messageEn: nonEmpty(result.messageEn, fallback.messageEn),
    messageLo: nonEmpty(result.messageLo, fallback.messageLo),
    aiAssessment: {
      riskScore: Math.max(0, Math.min(100, Math.round(finiteNumber(result.riskScore, fallback.aiAssessment.riskScore ?? 55)))),
      riskLevel: alertInput.severity,
      impactSummary: nonEmpty(result.impactSummary, fallback.aiAssessment.impactSummary ?? fallback.alertInput.predictedImpact),
      routingGroups: routingGroups.length > 0 ? routingGroups : fallback.aiAssessment.routingGroups,
      suggestedChannels,
      qualityFlags,
      translationConfidence: usedOpenAi ? 0.88 : fallback.aiAssessment.translationConfidence,
      generatedAt: new Date().toISOString()
    },
    sourceSummary: nonEmpty(result.sourceSummary, fallback.sourceSummary),
    evidenceSummary: nonEmpty(result.evidenceSummary, fallback.evidenceSummary),
    targetAudience: {
      summary: nonEmpty(result.targetAudienceSummary, fallback.targetAudience.summary),
      provinces: [alertInput.province],
      districts: [alertInput.district],
      priorityGroups: priorityGroups.length > 0 ? priorityGroups : fallback.targetAudience.priorityGroups,
      routingGroups: routingGroups.length > 0 ? routingGroups : fallback.targetAudience.routingGroups,
      suggestedChannels,
      reviewerNotes: fallback.targetAudience.reviewerNotes
    },
    confidence: Math.max(0, Math.min(1, finiteNumber(result.confidence, usedOpenAi ? 0.82 : fallback.confidence))),
    qualityFlags,
    usedOpenAi,
    model,
    createdAt: new Date().toISOString()
  };
}

function inferHazard(lower: string): HazardType {
  if (/(landslide|mudslide|slope|ດິນເຈື່ອນ)/i.test(lower)) return "Landslide risk";
  if (/(storm|wind|typhoon|ພາຍຸ)/i.test(lower)) return "Storm";
  if (/(rain|rainfall|ຝົນ)/i.test(lower)) return "Heavy rainfall";
  if (/(flood|river|overflow|ນໍ້າຖ້ວມ)/i.test(lower)) return "Flood";
  return "Severe weather";
}

function inferSeverity(lower: string): Severity {
  if (/(evacuat|trapped|urgent|emergency|collapsed|fatal|critical|ສຸກເສີນ)/i.test(lower)) return "Emergency";
  if (/(warning|danger|overflow|rising fast|blocked|ອັນຕະລາຍ)/i.test(lower)) return "Warning";
  if (/(watch|monitor|prepare|heavy rain|ກຽມພ້ອມ)/i.test(lower)) return "Watch";
  return "Watch";
}

function inferPopulation(lower: string) {
  const match = lower.match(/(\d{2,6})\s*(people|residents|households|ຄົນ|ຄົວເຮືອນ)?/i);
  if (!match) return 2500;
  const amount = Number(match[1]);
  return match[2]?.toLowerCase().includes("household") || match[2]?.includes("ຄົວ") ? amount * 5 : amount;
}

function inferChannels(lower: string): NotificationChannel[] {
  const channels = new Set<NotificationChannel>(["SMS", "WhatsApp", "In-app"]);
  if (lower.includes("email") || lower.includes("official")) channels.add("Email");
  return Array.from(channels);
}

function inferPriorityGroups(lower: string) {
  const groups = new Set<string>();
  if (/(elder|older|senior|ຜູ້ສູງອາຍຸ)/i.test(lower)) groups.add("older people");
  if (/(child|children|school|student|ເດັກ|ໂຮງຮຽນ)/i.test(lower)) groups.add("children and schools");
  if (/(pregnan|mother|ແມ່ຍິງຖືພາ)/i.test(lower)) groups.add("pregnant people");
  if (/(disabled|disability|wheelchair|ພິການ)/i.test(lower)) groups.add("people with disabilities");
  if (/(clinic|hospital|health|ສຸຂະພາບ|ໂຮງໝໍ)/i.test(lower)) groups.add("clinics and health volunteers");
  if (groups.size === 0) {
    groups.add("older people");
    groups.add("children and schools");
    groups.add("riverbank households");
  }
  return Array.from(groups);
}

function inferImpact(hazardType: HazardType, location: string, affectedPopulation: number, text: string) {
  const clipped = text.trim().replace(/\s+/g, " ").slice(0, 180);
  if (clipped.length > 60) {
    return `${affectedPopulation.toLocaleString()} people around ${location} may be affected. Evidence says: ${clipped}`;
  }
  if (hazardType === "Landslide risk") return `Slope movement may block roads and isolate households near ${location}.`;
  if (hazardType === "Storm") return `Strong wind and heavy rainfall may damage roofs, schools, and road access near ${location}.`;
  if (hazardType === "Heavy rainfall") return `Heavy rainfall may trigger flash flooding and unsafe river crossings near ${location}.`;
  return `Low-lying homes, schools, and roads near ${location} may flood quickly.`;
}

function inferAction(hazardType: HazardType, priorityGroups: string[]) {
  const priorityText = priorityGroups.length > 0 ? ` Prioritize ${priorityGroups.join(", ")}.` : "";
  if (hazardType === "Landslide risk") {
    return `Avoid steep slopes, keep away from blocked roads, and prepare evacuation to stable ground.${priorityText}`;
  }
  if (hazardType === "Storm") {
    return `Secure loose materials, charge phones, avoid river crossings, and wait for official or volunteer instructions.${priorityText}`;
  }
  return `Move people and valuables to higher ground, avoid flooded roads, and follow village volunteer instructions.${priorityText}`;
}

function summarizeEvidence(text: string, attachments: IntakeAttachmentSummary[]) {
  const base = text.trim()
    ? text.trim().replace(/\s+/g, " ").slice(0, 220)
    : "No text body supplied.";
  const attachmentText = attachments.length > 0 ? ` Attachments: ${attachments.map((file) => file.name).join(", ")}.` : "";
  return `${base}${attachmentText}`;
}

function severityToScore(severity: Severity, hazardType: HazardType) {
  const base: Record<Severity, number> = {
    Normal: 20,
    Watch: 46,
    Warning: 70,
    Emergency: 90
  };
  return Math.min(99, base[severity] + (hazardType === "Landslide risk" ? 6 : 0));
}

function pickFrom<T extends string>(values: readonly T[], value: unknown, fallback: T): T {
  return typeof value === "string" && values.includes(value as T) ? (value as T) : fallback;
}

function normalizeChannels(value: unknown, fallback: NotificationChannel[]): NotificationChannel[] {
  const values = Array.isArray(value) ? value : [];
  const channels = values.filter((item): item is NotificationChannel =>
    typeof item === "string" && notificationChannels.includes(item as NotificationChannel)
  );
  return channels.length > 0 ? unique(channels) : fallback;
}

function arrayOfStrings(value: unknown): string[] {
  return Array.isArray(value) ? value.filter((item): item is string => typeof item === "string" && item.trim().length > 0) : [];
}

function nonEmpty(value: unknown, fallback: string): string {
  return typeof value === "string" && value.trim().length > 0 ? value.trim() : fallback;
}

function finiteNumber(value: unknown, fallback: number): number {
  return typeof value === "number" && Number.isFinite(value) ? value : fallback;
}

function validDateString(value: unknown, fallback: string): string {
  if (typeof value !== "string") return fallback;
  const timestamp = Date.parse(value);
  return Number.isFinite(timestamp) ? new Date(timestamp).toISOString() : fallback;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function unique<T extends string>(values: T[]): T[] {
  return Array.from(new Set(values.filter((value) => value.trim().length > 0)));
}
