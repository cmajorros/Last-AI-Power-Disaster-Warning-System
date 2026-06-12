export type Language = "en" | "lo";

export type Role =
  | "meteorological_officer"
  | "emergency_response"
  | "cso_coordinator"
  | "volunteer"
  | "community_member";

export type HazardType =
  | "Flood"
  | "Heavy rainfall"
  | "Storm"
  | "Landslide risk"
  | "Severe weather"
  | "Other government-approved hazard";

export type Severity = "Normal" | "Watch" | "Warning" | "Emergency";

export type AlertStatus =
  | "Draft"
  | "AI Generated"
  | "Under Review"
  | "Approved"
  | "Published"
  | "Cancelled"
  | "Updated"
  | "Closed";

export type NotificationChannel = "SMS" | "WhatsApp" | "Email" | "In-app";

export type IntakeSourceType = "gmail" | "other_email" | "whatsapp_business" | "manual_upload";

export type DisseminationMethod =
  | "Village loudspeaker"
  | "Door-to-door"
  | "Community radio"
  | "Local announcement";

export interface User {
  id: string;
  name: string;
  email: string;
  phoneLast4: string;
  role: Role;
  province: string;
  district: string;
  languagePreference: Language;
  twoFactorEnabled: boolean;
}

export interface Alert {
  id: string;
  hazardType: HazardType;
  severity: Severity;
  status: AlertStatus;
  location: string;
  province: string;
  district: string;
  lat: number;
  lng: number;
  affectedPopulation: number;
  predictedImpact: string;
  recommendedAction: string;
  startTime: string;
  expectedDuration: string;
  language: Language;
  communicationChannels: NotificationChannel[];
  messageEn: string;
  messageLo: string;
  aiAssessment: AiAssessment;
  createdBy: string;
  approvedBy?: string | null;
  publishedAt?: string | null;
  updatedAt: string;
}

export interface AiAssessment {
  riskScore?: number;
  riskLevel?: Severity;
  impactSummary?: string;
  routingGroups?: string[];
  suggestedChannels?: NotificationChannel[];
  qualityFlags?: string[];
  translationConfidence?: number;
  generatedAt?: string;
}

export interface IntakeAttachmentSummary {
  name: string;
  type: string;
  size: number;
  extractedAs: "vision" | "file" | "text" | "metadata";
  notes?: string;
}

export interface TargetAudiencePlan {
  summary: string;
  provinces: string[];
  districts: string[];
  priorityGroups: string[];
  routingGroups: string[];
  suggestedChannels: NotificationChannel[];
  reviewerNotes?: string;
}

export interface AlertIntakeInput {
  sourceType: IntakeSourceType;
  sourceName: string;
  rawText: string;
  targetAudienceNotes?: string;
  attachments?: IntakeAttachmentSummary[];
}

export interface AlertDraftProposal {
  alertInput: AlertInput;
  messageEn: string;
  messageLo: string;
  aiAssessment: AiAssessment;
  sourceSummary: string;
  evidenceSummary: string;
  targetAudience: TargetAudiencePlan;
  confidence: number;
  qualityFlags: string[];
  usedOpenAi: boolean;
  model?: string;
  createdAt: string;
}

export interface HazardData {
  id: string;
  source: string;
  hazardType: HazardType;
  rainfallLevel: number;
  riverLevel: number;
  location: string;
  province: string;
  district: string;
  lat: number;
  lng: number;
  riskClassification: Severity;
  timestamp: string;
}

export interface Volunteer {
  id: string;
  name: string;
  phoneLast4: string;
  whatsappEnabled: boolean;
  village: string;
  district: string;
  province: string;
  languagePreference: Language;
  active: boolean;
}

export interface NotificationLog {
  id: string;
  alertId: string;
  recipientId: string;
  recipientType: "volunteer" | "official" | "community_member";
  channel: NotificationChannel;
  status: "Queued" | "Sent" | "Delivered" | "Failed";
  sentAt: string;
  deliveredAt?: string | null;
  failedReason?: string | null;
}

export interface Acknowledgment {
  id: string;
  alertId: string;
  userId: string;
  status: "Pending" | "Acknowledged" | "Disseminated" | "Unable to reach";
  disseminationMethod: DisseminationMethod;
  notes: string;
  timestamp: string;
}

export interface ResponseNote {
  id: string;
  alertId: string;
  userId: string;
  note: string;
  createdAt: string;
}

export interface AuditLog {
  id: string;
  actorId: string;
  action: string;
  entityType: string;
  entityId: string;
  metadata: Record<string, unknown>;
  createdAt: string;
}

export interface AlertInput {
  hazardType: HazardType;
  severity: Severity;
  location: string;
  province: string;
  district: string;
  lat: number;
  lng: number;
  affectedPopulation: number;
  predictedImpact: string;
  recommendedAction: string;
  startTime: string;
  expectedDuration: string;
  language: Language;
  communicationChannels: NotificationChannel[];
}

export interface VolunteerInput {
  name: string;
  phone: string;
  whatsappEnabled: boolean;
  village: string;
  district: string;
  province: string;
  languagePreference: Language;
}

export const roles: Role[] = [
  "meteorological_officer",
  "emergency_response",
  "cso_coordinator",
  "volunteer",
  "community_member"
];

export const hazardTypes: HazardType[] = [
  "Flood",
  "Heavy rainfall",
  "Storm",
  "Landslide risk",
  "Severe weather",
  "Other government-approved hazard"
];

export const severities: Severity[] = ["Normal", "Watch", "Warning", "Emergency"];

export const alertStatuses: AlertStatus[] = [
  "Draft",
  "AI Generated",
  "Under Review",
  "Approved",
  "Published",
  "Cancelled",
  "Updated",
  "Closed"
];

export const notificationChannels: NotificationChannel[] = ["SMS", "WhatsApp", "Email", "In-app"];

export const intakeSourceTypes: IntakeSourceType[] = [
  "gmail",
  "other_email",
  "whatsapp_business",
  "manual_upload"
];

export const disseminationMethods: DisseminationMethod[] = [
  "Village loudspeaker",
  "Door-to-door",
  "Community radio",
  "Local announcement"
];
