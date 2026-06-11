import { randomUUID } from "crypto";
import { Pool } from "pg";
import { createDemoStore, type DemoStore } from "./demo-data";
import type {
  Acknowledgment,
  Alert,
  AlertInput,
  AlertStatus,
  AuditLog,
  HazardData,
  NotificationLog,
  ResponseNote,
  User,
  Volunteer,
  VolunteerInput
} from "./types";

declare global {
  // eslint-disable-next-line no-var
  var __laosAlertStore: DemoStore | undefined;
  // eslint-disable-next-line no-var
  var __laosAlertPool: Pool | undefined;
}

const databaseUrl = process.env.DATABASE_URL;

function getMemoryStore(): DemoStore {
  globalThis.__laosAlertStore ??= createDemoStore();
  return globalThis.__laosAlertStore;
}

function getPool(): Pool | null {
  if (!databaseUrl) return null;
  globalThis.__laosAlertPool ??= new Pool({ connectionString: databaseUrl });
  return globalThis.__laosAlertPool;
}

function id(prefix: string) {
  return `${prefix}-${randomUUID().slice(0, 8)}`;
}

function asIso(value: string | Date | null | undefined): string | null {
  if (!value) return null;
  return value instanceof Date ? value.toISOString() : new Date(value).toISOString();
}

function rowToUser(row: Record<string, unknown>): User {
  return {
    id: String(row.id),
    name: String(row.name),
    email: String(row.email),
    phoneLast4: String(row.phone_last4 ?? ""),
    role: row.role as User["role"],
    province: String(row.province ?? ""),
    district: String(row.district ?? ""),
    languagePreference: row.language_preference as User["languagePreference"],
    twoFactorEnabled: Boolean(row.two_factor_enabled)
  };
}

function rowToAlert(row: Record<string, unknown>): Alert {
  return {
    id: String(row.id),
    hazardType: row.hazard_type as Alert["hazardType"],
    severity: row.severity as Alert["severity"],
    status: row.status as AlertStatus,
    location: String(row.location),
    province: String(row.province),
    district: String(row.district),
    lat: Number(row.lat),
    lng: Number(row.lng),
    affectedPopulation: Number(row.affected_population),
    predictedImpact: String(row.predicted_impact),
    recommendedAction: String(row.recommended_action),
    startTime: asIso(row.start_time as string | Date) ?? new Date().toISOString(),
    expectedDuration: String(row.expected_duration),
    language: row.language as Alert["language"],
    communicationChannels: (row.communication_channels ?? []) as Alert["communicationChannels"],
    messageEn: String(row.message_en ?? ""),
    messageLo: String(row.message_lo ?? ""),
    aiAssessment: (row.ai_assessment ?? {}) as Alert["aiAssessment"],
    createdBy: String(row.created_by),
    approvedBy: row.approved_by ? String(row.approved_by) : null,
    publishedAt: asIso(row.published_at as string | Date | null),
    updatedAt: asIso(row.updated_at as string | Date) ?? new Date().toISOString()
  };
}

function rowToHazard(row: Record<string, unknown>): HazardData {
  return {
    id: String(row.id),
    source: String(row.source),
    hazardType: row.hazard_type as HazardData["hazardType"],
    rainfallLevel: Number(row.rainfall_level),
    riverLevel: Number(row.river_level),
    location: String(row.location),
    province: String(row.province),
    district: String(row.district),
    lat: Number(row.lat),
    lng: Number(row.lng),
    riskClassification: row.risk_classification as HazardData["riskClassification"],
    timestamp: asIso(row.timestamp as string | Date) ?? new Date().toISOString()
  };
}

function rowToVolunteer(row: Record<string, unknown>): Volunteer {
  return {
    id: String(row.id),
    name: String(row.name),
    phoneLast4: String(row.phone_last4),
    whatsappEnabled: Boolean(row.whatsapp_enabled),
    village: String(row.village),
    district: String(row.district),
    province: String(row.province),
    languagePreference: row.language_preference as Volunteer["languagePreference"],
    active: Boolean(row.active)
  };
}

function rowToNotification(row: Record<string, unknown>): NotificationLog {
  return {
    id: String(row.id),
    alertId: String(row.alert_id),
    recipientId: String(row.recipient_id),
    recipientType: row.recipient_type as NotificationLog["recipientType"],
    channel: row.channel as NotificationLog["channel"],
    status: row.status as NotificationLog["status"],
    sentAt: asIso(row.sent_at as string | Date) ?? new Date().toISOString(),
    deliveredAt: asIso(row.delivered_at as string | Date | null),
    failedReason: row.failed_reason ? String(row.failed_reason) : null
  };
}

function rowToAck(row: Record<string, unknown>): Acknowledgment {
  return {
    id: String(row.id),
    alertId: String(row.alert_id),
    userId: String(row.user_id),
    status: row.status as Acknowledgment["status"],
    disseminationMethod: row.dissemination_method as Acknowledgment["disseminationMethod"],
    notes: String(row.notes ?? ""),
    timestamp: asIso(row.timestamp as string | Date) ?? new Date().toISOString()
  };
}

function rowToResponseNote(row: Record<string, unknown>): ResponseNote {
  return {
    id: String(row.id),
    alertId: String(row.alert_id),
    userId: String(row.user_id),
    note: String(row.note),
    createdAt: asIso(row.created_at as string | Date) ?? new Date().toISOString()
  };
}

export function databaseMode() {
  return databaseUrl ? "postgres-postgis" : "memory-demo";
}

export async function listUsers(): Promise<User[]> {
  const pool = getPool();
  if (!pool) return getMemoryStore().users;

  const result = await pool.query("SELECT * FROM users ORDER BY role, name");
  return result.rows.map(rowToUser);
}

export async function getUserById(userId: string): Promise<User | null> {
  const pool = getPool();
  if (!pool) return getMemoryStore().users.find((user) => user.id === userId) ?? null;

  const result = await pool.query("SELECT * FROM users WHERE id = $1", [userId]);
  return result.rows[0] ? rowToUser(result.rows[0]) : null;
}

export async function listAlerts(): Promise<Alert[]> {
  const pool = getPool();
  if (!pool) {
    return [...getMemoryStore().alerts].sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
  }

  const result = await pool.query(
    `SELECT *, ST_Y(geom) AS lat, ST_X(geom) AS lng
     FROM alerts
     ORDER BY updated_at DESC`
  );
  return result.rows.map(rowToAlert);
}

export async function getAlertById(alertId: string): Promise<Alert | null> {
  const pool = getPool();
  if (!pool) return getMemoryStore().alerts.find((alert) => alert.id === alertId) ?? null;

  const result = await pool.query(
    "SELECT *, ST_Y(geom) AS lat, ST_X(geom) AS lng FROM alerts WHERE id = $1",
    [alertId]
  );
  return result.rows[0] ? rowToAlert(result.rows[0]) : null;
}

export async function createAlert(input: AlertInput, actorId: string): Promise<Alert> {
  const alert: Alert = {
    id: id("ALT"),
    ...input,
    status: "Draft",
    messageEn: "",
    messageLo: "",
    aiAssessment: {},
    createdBy: actorId,
    approvedBy: null,
    publishedAt: null,
    updatedAt: new Date().toISOString()
  };

  const pool = getPool();
  if (!pool) {
    getMemoryStore().alerts.unshift(alert);
    await addAuditLog(actorId, "alert.created", "alert", alert.id, { status: alert.status });
    return alert;
  }

  const result = await pool.query(
    `INSERT INTO alerts (
      id, hazard_type, severity, status, location, province, district, geom,
      affected_population, predicted_impact, recommended_action, start_time,
      expected_duration, language, communication_channels, message_en, message_lo,
      ai_assessment, created_by, approved_by, published_at, updated_at
    )
    VALUES (
      $1, $2, $3, $4, $5, $6, $7,
      ST_SetSRID(ST_Point($8, $9), 4326),
      $10, $11, $12, $13, $14, $15, $16, '', '', '{}'::jsonb, $17, null, null, now()
    )
    RETURNING *, ST_Y(geom) AS lat, ST_X(geom) AS lng`,
    [
      alert.id,
      alert.hazardType,
      alert.severity,
      alert.status,
      alert.location,
      alert.province,
      alert.district,
      alert.lng,
      alert.lat,
      alert.affectedPopulation,
      alert.predictedImpact,
      alert.recommendedAction,
      alert.startTime,
      alert.expectedDuration,
      alert.language,
      alert.communicationChannels,
      actorId
    ]
  );
  await addAuditLog(actorId, "alert.created", "alert", alert.id, { status: alert.status });
  return rowToAlert(result.rows[0]);
}

export async function updateAlert(
  alertId: string,
  patch: Partial<Alert>,
  actorId: string
): Promise<Alert | null> {
  const pool = getPool();
  if (!pool) {
    const alert = getMemoryStore().alerts.find((item) => item.id === alertId);
    if (!alert) return null;
    Object.assign(alert, patch, { updatedAt: new Date().toISOString() });
    await addAuditLog(actorId, "alert.updated", "alert", alertId, { fields: Object.keys(patch) });
    return alert;
  }

  const fields: string[] = [];
  const values: unknown[] = [];
  const add = (column: string, value: unknown) => {
    values.push(value);
    fields.push(`${column} = $${values.length}`);
  };

  if (patch.hazardType) add("hazard_type", patch.hazardType);
  if (patch.severity) add("severity", patch.severity);
  if (patch.status) add("status", patch.status);
  if (patch.location) add("location", patch.location);
  if (patch.province) add("province", patch.province);
  if (patch.district) add("district", patch.district);
  if (typeof patch.affectedPopulation === "number") add("affected_population", patch.affectedPopulation);
  if (patch.predictedImpact) add("predicted_impact", patch.predictedImpact);
  if (patch.recommendedAction) add("recommended_action", patch.recommendedAction);
  if (patch.startTime) add("start_time", patch.startTime);
  if (patch.expectedDuration) add("expected_duration", patch.expectedDuration);
  if (patch.language) add("language", patch.language);
  if (patch.communicationChannels) add("communication_channels", patch.communicationChannels);
  if (typeof patch.messageEn === "string") add("message_en", patch.messageEn);
  if (typeof patch.messageLo === "string") add("message_lo", patch.messageLo);
  if (patch.aiAssessment) add("ai_assessment", JSON.stringify(patch.aiAssessment));
  if (Object.prototype.hasOwnProperty.call(patch, "approvedBy")) add("approved_by", patch.approvedBy ?? null);
  if (Object.prototype.hasOwnProperty.call(patch, "publishedAt")) add("published_at", patch.publishedAt ?? null);
  add("updated_at", new Date().toISOString());

  values.push(alertId);
  const result = await pool.query(
    `UPDATE alerts SET ${fields.join(", ")}
     WHERE id = $${values.length}
     RETURNING *, ST_Y(geom) AS lat, ST_X(geom) AS lng`,
    values
  );
  await addAuditLog(actorId, "alert.updated", "alert", alertId, { fields: Object.keys(patch) });
  return result.rows[0] ? rowToAlert(result.rows[0]) : null;
}

export async function listHazards(): Promise<HazardData[]> {
  const pool = getPool();
  if (!pool) return getMemoryStore().hazards;

  const result = await pool.query(
    "SELECT *, ST_Y(geom) AS lat, ST_X(geom) AS lng FROM hazard_data ORDER BY timestamp DESC"
  );
  return result.rows.map(rowToHazard);
}

export async function listVolunteers(): Promise<Volunteer[]> {
  const pool = getPool();
  if (!pool) return getMemoryStore().volunteers;

  const result = await pool.query("SELECT * FROM volunteers WHERE active = true ORDER BY province, district, name");
  return result.rows.map(rowToVolunteer);
}

export async function addVolunteer(input: VolunteerInput, actorId: string): Promise<Volunteer> {
  const volunteer: Volunteer = {
    id: id("vol"),
    name: input.name,
    phoneLast4: input.phone.slice(-4),
    whatsappEnabled: input.whatsappEnabled,
    village: input.village,
    district: input.district,
    province: input.province,
    languagePreference: input.languagePreference,
    active: true
  };

  const pool = getPool();
  if (!pool) {
    getMemoryStore().volunteers.unshift(volunteer);
    await addAuditLog(actorId, "volunteer.created", "volunteer", volunteer.id, { province: volunteer.province });
    return volunteer;
  }

  const result = await pool.query(
    `INSERT INTO volunteers (
      id, name, phone_ciphertext, phone_last4, whatsapp_enabled, village, district,
      province, assigned_area, language_preference, active
    )
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, null, $9, true)
    RETURNING *`,
    [
      volunteer.id,
      volunteer.name,
      `demo:encrypted:${input.phone}`,
      volunteer.phoneLast4,
      volunteer.whatsappEnabled,
      volunteer.village,
      volunteer.district,
      volunteer.province,
      volunteer.languagePreference
    ]
  );
  await addAuditLog(actorId, "volunteer.created", "volunteer", volunteer.id, { province: volunteer.province });
  return rowToVolunteer(result.rows[0]);
}

export async function listNotificationLogs(alertId?: string): Promise<NotificationLog[]> {
  const pool = getPool();
  if (!pool) {
    const logs = getMemoryStore().notificationLogs;
    return alertId ? logs.filter((log) => log.alertId === alertId) : logs;
  }

  const result = await pool.query(
    `SELECT * FROM notification_logs
     ${alertId ? "WHERE alert_id = $1" : ""}
     ORDER BY sent_at DESC`,
    alertId ? [alertId] : []
  );
  return result.rows.map(rowToNotification);
}

export async function addNotificationLogs(logs: NotificationLog[], actorId: string): Promise<NotificationLog[]> {
  if (logs.length === 0) return [];

  const pool = getPool();
  if (!pool) {
    getMemoryStore().notificationLogs.unshift(...logs);
    await addAuditLog(actorId, "notifications.dispatched", "alert", logs[0].alertId, {
      count: logs.length
    });
    return logs;
  }

  for (const log of logs) {
    await pool.query(
      `INSERT INTO notification_logs (
        id, alert_id, recipient_id, recipient_type, channel, status, sent_at, delivered_at, failed_reason
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      ON CONFLICT (id) DO NOTHING`,
      [
        log.id,
        log.alertId,
        log.recipientId,
        log.recipientType,
        log.channel,
        log.status,
        log.sentAt,
        log.deliveredAt,
        log.failedReason
      ]
    );
  }
  await addAuditLog(actorId, "notifications.dispatched", "alert", logs[0].alertId, { count: logs.length });
  return logs;
}

export async function listAcknowledgments(alertId?: string): Promise<Acknowledgment[]> {
  const pool = getPool();
  if (!pool) {
    const acknowledgments = getMemoryStore().acknowledgments;
    return alertId ? acknowledgments.filter((ack) => ack.alertId === alertId) : acknowledgments;
  }

  const result = await pool.query(
    `SELECT * FROM acknowledgments
     ${alertId ? "WHERE alert_id = $1" : ""}
     ORDER BY timestamp DESC`,
    alertId ? [alertId] : []
  );
  return result.rows.map(rowToAck);
}

export async function upsertAcknowledgment(input: Omit<Acknowledgment, "id" | "timestamp">): Promise<Acknowledgment> {
  const ack: Acknowledgment = {
    id: id("ack"),
    ...input,
    timestamp: new Date().toISOString()
  };

  const pool = getPool();
  if (!pool) {
    const store = getMemoryStore();
    const existing = store.acknowledgments.find(
      (item) => item.alertId === input.alertId && item.userId === input.userId
    );
    if (existing) {
      Object.assign(existing, ack, { id: existing.id });
      return existing;
    }
    store.acknowledgments.unshift(ack);
    return ack;
  }

  const result = await pool.query(
    `INSERT INTO acknowledgments (
      id, alert_id, user_id, status, dissemination_method, notes, timestamp
    )
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    ON CONFLICT (alert_id, user_id)
    DO UPDATE SET status = EXCLUDED.status,
      dissemination_method = EXCLUDED.dissemination_method,
      notes = EXCLUDED.notes,
      timestamp = EXCLUDED.timestamp
    RETURNING *`,
    [
      ack.id,
      ack.alertId,
      ack.userId,
      ack.status,
      ack.disseminationMethod,
      ack.notes,
      ack.timestamp
    ]
  );
  return rowToAck(result.rows[0]);
}

export async function listResponseNotes(alertId?: string): Promise<ResponseNote[]> {
  const pool = getPool();
  if (!pool) {
    const notes = getMemoryStore().responseNotes;
    return alertId ? notes.filter((note) => note.alertId === alertId) : notes;
  }

  const result = await pool.query(
    `SELECT * FROM response_notes
     ${alertId ? "WHERE alert_id = $1" : ""}
     ORDER BY created_at DESC`,
    alertId ? [alertId] : []
  );
  return result.rows.map(rowToResponseNote);
}

export async function addResponseNote(alertId: string, userId: string, note: string): Promise<ResponseNote> {
  const responseNote: ResponseNote = {
    id: id("note"),
    alertId,
    userId,
    note,
    createdAt: new Date().toISOString()
  };

  const pool = getPool();
  if (!pool) {
    getMemoryStore().responseNotes.unshift(responseNote);
    return responseNote;
  }

  const result = await pool.query(
    `INSERT INTO response_notes (id, alert_id, user_id, note, created_at)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING *`,
    [responseNote.id, responseNote.alertId, responseNote.userId, responseNote.note, responseNote.createdAt]
  );
  return rowToResponseNote(result.rows[0]);
}

export async function addAuditLog(
  actorId: string,
  action: string,
  entityType: string,
  entityId: string,
  metadata: Record<string, unknown> = {}
): Promise<AuditLog> {
  const audit: AuditLog = {
    id: id("audit"),
    actorId,
    action,
    entityType,
    entityId,
    metadata,
    createdAt: new Date().toISOString()
  };

  const pool = getPool();
  if (!pool) return audit;

  await pool.query(
    `INSERT INTO audit_logs (id, actor_id, action, entity_type, entity_id, metadata, created_at)
     VALUES ($1, $2, $3, $4, $5, $6, $7)`,
    [audit.id, audit.actorId, audit.action, audit.entityType, audit.entityId, JSON.stringify(audit.metadata), audit.createdAt]
  );
  return audit;
}
