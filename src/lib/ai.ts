import type { Alert, AlertInput, AiAssessment, HazardData, NotificationChannel, Severity } from "./types";

const severityBase: Record<Severity, number> = {
  Normal: 18,
  Watch: 42,
  Warning: 68,
  Emergency: 88
};

const laoHazardNames: Record<string, string> = {
  Flood: "ນ້ຳຖ້ວມ",
  "Heavy rainfall": "ຝົນຕົກໜັກ",
  Storm: "ພາຍຸ",
  "Landslide risk": "ຄວາມສ່ຽງດິນເຈື່ອນ",
  "Severe weather": "ອາກາດຮ້າຍແຮງ",
  "Other government-approved hazard": "ໄພຕາມການອະນຸມັດຂອງລັດ"
};

function scoreToSeverity(score: number): Severity {
  if (score >= 82) return "Emergency";
  if (score >= 62) return "Warning";
  if (score >= 35) return "Watch";
  return "Normal";
}

function pickHazard(input: AlertInput | Alert) {
  return laoHazardNames[input.hazardType] ?? "ໄພພິບັດ";
}

function qualityFlags(input: AlertInput | Alert, hazard?: HazardData): string[] {
  const flags: string[] = [];
  if (!input.predictedImpact || input.predictedImpact.length < 35) {
    flags.push("Predicted impact needs more operational detail");
  }
  if (!input.recommendedAction || input.recommendedAction.length < 25) {
    flags.push("Recommended action is too brief for public release");
  }
  if (!input.communicationChannels.includes("SMS")) {
    flags.push("SMS is recommended for last-mile reach");
  }
  if (!hazard) {
    flags.push("No matching hazard sensor was found for this district");
  }
  return flags;
}

function recommendedChannels(input: AlertInput | Alert): NotificationChannel[] {
  const base = new Set<NotificationChannel>(input.communicationChannels);
  base.add("SMS");
  if (input.severity === "Warning" || input.severity === "Emergency") {
    base.add("WhatsApp");
    base.add("In-app");
  }
  if (input.severity === "Emergency") base.add("Email");
  return Array.from(base);
}

export function buildAiDraft(input: AlertInput | Alert, hazards: HazardData[]): {
  messageEn: string;
  messageLo: string;
  assessment: AiAssessment;
} {
  const matchingHazard = hazards.find(
    (hazard) => hazard.district === input.district || hazard.province === input.province
  );
  const rainfallBoost = matchingHazard ? Math.min(16, matchingHazard.rainfallLevel / 10) : 4;
  const riverBoost = matchingHazard ? Math.min(12, matchingHazard.riverLevel) : 3;
  const riskScore = Math.min(99, Math.round(severityBase[input.severity] + rainfallBoost + riverBoost));
  const riskLevel = scoreToSeverity(riskScore);
  const channels = recommendedChannels(input);
  const flags = qualityFlags(input, matchingHazard);
  const impactSummary = `${input.affectedPopulation.toLocaleString()} people may be affected in ${input.district}, ${input.province}. ${input.predictedImpact}`;

  const messageEn = `${input.severity} ${input.hazardType} alert for ${input.location}, ${input.district}. ${input.predictedImpact} ${input.recommendedAction} Expected duration: ${input.expectedDuration}.`;
  const messageLo = `ແຈ້ງເຕືອນລະດັບ ${input.severity} ສຳລັບ${pickHazard(input)} ທີ່ ${input.location}, ${input.district}. ${input.predictedImpact} ${input.recommendedAction} ໄລຍະເວລາຄາດໝາຍ: ${input.expectedDuration}.`;

  return {
    messageEn,
    messageLo,
    assessment: {
      riskScore,
      riskLevel,
      impactSummary,
      routingGroups: [
        `${input.province} emergency response unit`,
        `${input.district} CSO volunteer network`,
        `${input.location} village leaders`
      ],
      suggestedChannels: channels,
      qualityFlags: flags,
      translationConfidence: flags.length > 0 ? 0.78 : 0.88,
      generatedAt: new Date().toISOString()
    }
  };
}
