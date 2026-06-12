"use client";

import { FormEvent, useCallback, useEffect, useMemo, useState } from "react";
import { Bot, Check, FilePenLine, Inbox, Radio, Save, Send, Sparkles, UploadCloud, XCircle } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { useLanguage } from "@/components/LanguageProvider";
import { EmptyState, SeverityPill, StatusPill, classNames, formatDate } from "@/components/ui";
import {
  hazardTypes,
  notificationChannels,
  severities,
  type Alert,
  type AlertDraftProposal,
  type AlertInput,
  type IntakeSourceType,
  type NotificationChannel
} from "@/lib/types";

const defaultForm: AlertInput = {
  hazardType: "Flood",
  severity: "Watch",
  location: "Mekong river villages",
  province: "Khammouane",
  district: "Thakhek",
  lat: 17.4103,
  lng: 104.8307,
  affectedPopulation: 6400,
  predictedImpact: "Low-lying homes, schools, and market roads may experience flooding within six hours.",
  recommendedAction: "Move people and valuables to higher ground and follow village volunteer instructions.",
  startTime: new Date(Date.now() + 60 * 60_000).toISOString().slice(0, 16),
  expectedDuration: "12 hours",
  language: "en",
  communicationChannels: ["SMS", "WhatsApp", "In-app"]
};

export function AlertsPage() {
  const { t, language } = useLanguage();
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [selectedId, setSelectedId] = useState("");
  const [form, setForm] = useState<AlertInput>(defaultForm);
  const [messageEn, setMessageEn] = useState("");
  const [messageLo, setMessageLo] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState("");
  const [intakeSourceType, setIntakeSourceType] = useState<IntakeSourceType>("gmail");
  const [intakeSourceName, setIntakeSourceName] = useState("Gmail: flood-monitoring@village.la");
  const [intakeText, setIntakeText] = useState(
    "Subject: Urgent flood observation in Thakhek\nVillage volunteers report fast rising Mekong water near schools and the morning market. Several elderly residents and children may need transport to higher ground before nightfall."
  );
  const [targetAudienceNotes, setTargetAudienceNotes] = useState(
    "Prioritize elders, children, schools, clinics, rescue boats, and village loudspeaker volunteers."
  );
  const [intakeFiles, setIntakeFiles] = useState<File[]>([]);
  const [intakeProposal, setIntakeProposal] = useState<AlertDraftProposal | null>(null);

  const selected = useMemo(() => alerts.find((alert) => alert.id === selectedId) ?? alerts[0], [alerts, selectedId]);

  const refresh = useCallback(async () => {
    const response = await fetch("/api/alerts");
    const payload = await response.json();
    if (!response.ok) {
      setError(payload.error || "Could not load alerts");
      return;
    }
    setAlerts(payload.alerts);
    setSelectedId((current) => current || payload.alerts[0]?.id || "");
  }, []);

  useEffect(() => {
    refresh();
    window.addEventListener("laos-session-changed", refresh);
    return () => window.removeEventListener("laos-session-changed", refresh);
  }, [refresh]);

  useEffect(() => {
    if (!selected) return;
    setMessageEn(selected.messageEn);
    setMessageLo(selected.messageLo);
  }, [selected]);

  function updateForm<K extends keyof AlertInput>(key: K, value: AlertInput[K]) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  function toggleChannel(channel: NotificationChannel) {
    setForm((current) => ({
      ...current,
      communicationChannels: current.communicationChannels.includes(channel)
        ? current.communicationChannels.filter((item) => item !== channel)
        : [...current.communicationChannels, channel]
    }));
  }

  async function analyzeIntake() {
    setError("");
    setBusy("intake");
    const formData = new FormData();
    formData.set("sourceType", intakeSourceType);
    formData.set("sourceName", intakeSourceName);
    formData.set("rawText", intakeText);
    formData.set("targetAudienceNotes", targetAudienceNotes);
    intakeFiles.forEach((file) => formData.append("attachments", file));

    const response = await fetch("/api/intake/analyze", {
      method: "POST",
      body: formData
    });
    const payload = await response.json();
    setBusy("");
    if (!response.ok) {
      setError(payload.error || "Could not analyze intake");
      return;
    }
    setIntakeProposal(payload.proposal);
  }

  function applyIntakeProposal() {
    if (!intakeProposal) return;
    setForm({
      ...intakeProposal.alertInput,
      startTime: toDateTimeLocal(intakeProposal.alertInput.startTime)
    });
  }

  async function createAlertFromIntake() {
    if (!intakeProposal) return;
    setError("");
    setBusy("intake-create");
    const proposalForCreate: AlertDraftProposal = {
      ...intakeProposal,
      alertInput: form,
      targetAudience: {
        ...intakeProposal.targetAudience,
        reviewerNotes: targetAudienceNotes,
        suggestedChannels: form.communicationChannels
      },
      aiAssessment: {
        ...intakeProposal.aiAssessment,
        suggestedChannels: form.communicationChannels
      }
    };
    const response = await fetch("/api/intake/create-alert", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        proposal: proposalForCreate,
        reviewerRoutingNotes: targetAudienceNotes,
        communicationChannels: form.communicationChannels
      })
    });
    const payload = await response.json();
    setBusy("");
    if (!response.ok) {
      setError(payload.error || "Could not create alert from intake");
      return;
    }
    setAlerts((current) => [payload.alert, ...current.filter((alert) => alert.id !== payload.alert.id)]);
    setSelectedId(payload.alert.id);
  }

  async function createAlert(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setBusy("create");
    const response = await fetch("/api/alerts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });
    const payload = await response.json();
    setBusy("");
    if (!response.ok) {
      setError(payload.error || "Could not create alert");
      return;
    }
    setAlerts((current) => [payload.alert, ...current]);
    setSelectedId(payload.alert.id);
  }

  async function runAction(action: "ai-draft" | "review" | "approve" | "publish") {
    if (!selected) return;
    setError("");
    setBusy(action);
    const response = await fetch(`/api/alerts/${selected.id}/${action}`, { method: "POST" });
    const payload = await response.json();
    setBusy("");
    if (!response.ok) {
      setError(payload.error || `Could not ${action}`);
      return;
    }
    updateAlertInList(payload.alert);
  }

  async function saveMessages(status?: Alert["status"]) {
    if (!selected) return;
    setError("");
    setBusy("save");
    const response = await fetch(`/api/alerts/${selected.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messageEn, messageLo, status })
    });
    const payload = await response.json();
    setBusy("");
    if (!response.ok) {
      setError(payload.error || "Could not save alert");
      return;
    }
    updateAlertInList(payload.alert);
  }

  function updateAlertInList(alert: Alert) {
    setAlerts((current) => current.map((item) => (item.id === alert.id ? alert : item)));
    setSelectedId(alert.id);
  }

  return (
    <AppShell>
      <div className="grid gap-6 xl:grid-cols-[0.9fr_1.2fr]">
        <section className="space-y-4">
          <section className="rounded-lg border border-gov-line bg-white p-4 shadow-panel">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-bold text-gov-ink">{t("aiIntake")}</h3>
              <Inbox className="h-5 w-5 text-slate-500" aria-hidden />
            </div>
            <div className="grid gap-3">
              <div className="grid gap-3 md:grid-cols-2">
                <label className="text-sm font-semibold text-slate-600">
                  {t("intakeSource")}
                  <select
                    value={intakeSourceType}
                    onChange={(event) => setIntakeSourceType(event.target.value as IntakeSourceType)}
                    className="mt-1 w-full rounded-md border border-gov-line px-3 py-2"
                  >
                    <option value="gmail">Gmail</option>
                    <option value="other_email">Other email</option>
                    <option value="whatsapp_business">WhatsApp Business</option>
                    <option value="manual_upload">Upload/manual</option>
                  </select>
                </label>
                <label className="text-sm font-semibold text-slate-600">
                  {t("sourceReference")}
                  <input
                    value={intakeSourceName}
                    onChange={(event) => setIntakeSourceName(event.target.value)}
                    className="mt-1 w-full rounded-md border border-gov-line px-3 py-2"
                  />
                </label>
              </div>
              <TextareaField label={t("incomingText")} value={intakeText} onChange={setIntakeText} />
              <TextareaField
                label={t("reviewerRoutingNotes")}
                value={targetAudienceNotes}
                onChange={setTargetAudienceNotes}
              />
              <label className="text-sm font-semibold text-slate-600">
                {t("attachments")}
                <input
                  type="file"
                  multiple
                  accept="image/*,.pdf,.txt,.md,.csv,.json"
                  onChange={(event) => setIntakeFiles(Array.from(event.target.files ?? []))}
                  className="mt-1 w-full rounded-md border border-gov-line px-3 py-2 text-sm file:mr-3 file:rounded-md file:border-0 file:bg-slate-100 file:px-3 file:py-2 file:text-sm file:font-bold file:text-gov-ink"
                />
              </label>
              {intakeFiles.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {intakeFiles.map((file) => (
                    <span key={`${file.name}-${file.size}`} className="rounded-md bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-600">
                      {file.name}
                    </span>
                  ))}
                </div>
              ) : null}
              <button
                type="button"
                onClick={analyzeIntake}
                className="inline-flex items-center justify-center gap-2 rounded-md bg-blue-700 px-4 py-3 text-sm font-bold text-white"
                disabled={busy === "intake"}
              >
                <Sparkles className="h-4 w-4" aria-hidden />
                {t("analyzeIntake")}
              </button>
            </div>
          </section>

          {intakeProposal ? (
            <section className="rounded-lg border border-gov-line bg-white p-4 shadow-panel">
              <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                <h3 className="text-lg font-bold text-gov-ink">{t("targetAudience")}</h3>
                <span className="rounded-md bg-slate-100 px-2 py-1 text-xs font-bold text-slate-600">
                  {intakeProposal.usedOpenAi ? "OpenAI" : "Demo fallback"} · {Math.round(intakeProposal.confidence * 100)}%
                </span>
              </div>
              <div className="space-y-3 text-sm text-slate-700">
                <div>
                  <p className="text-xs font-bold uppercase text-slate-500">{t("sourceSummary")}</p>
                  <p className="mt-1">{intakeProposal.sourceSummary}</p>
                </div>
                <div>
                  <p className="text-xs font-bold uppercase text-slate-500">{t("evidenceSummary")}</p>
                  <p className="mt-1">{intakeProposal.evidenceSummary}</p>
                </div>
                <div className="grid gap-3 md:grid-cols-2">
                  <div className="rounded-lg border border-gov-line p-3">
                    <p className="text-xs font-bold uppercase text-slate-500">{t("routingGroups")}</p>
                    <p className="mt-1">{intakeProposal.targetAudience.routingGroups.join(", ")}</p>
                  </div>
                  <div className="rounded-lg border border-gov-line p-3">
                    <p className="text-xs font-bold uppercase text-slate-500">{t("suggestedChannels")}</p>
                    <p className="mt-1">{intakeProposal.targetAudience.suggestedChannels.join(", ")}</p>
                  </div>
                </div>
                {intakeProposal.qualityFlags.length > 0 ? (
                  <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-3">
                    <p className="text-xs font-bold uppercase text-yellow-700">{t("qualityFlags")}</p>
                    <p className="mt-1 text-yellow-800">{intakeProposal.qualityFlags.join(", ")}</p>
                  </div>
                ) : null}
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={applyIntakeProposal}
                  className="inline-flex items-center gap-2 rounded-md bg-slate-700 px-4 py-2 text-sm font-bold text-white"
                >
                  <UploadCloud className="h-4 w-4" aria-hidden />
                  {t("applyToForm")}
                </button>
                <button
                  type="button"
                  onClick={createAlertFromIntake}
                  className="inline-flex items-center gap-2 rounded-md bg-red-700 px-4 py-2 text-sm font-bold text-white"
                  disabled={busy === "intake-create"}
                >
                  <Send className="h-4 w-4" aria-hidden />
                  {t("createFromIntake")}
                </button>
              </div>
            </section>
          ) : null}

          <form onSubmit={createAlert} className="rounded-lg border border-gov-line bg-white p-4 shadow-panel">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-bold text-gov-ink">{t("createAlert")}</h3>
              <FilePenLine className="h-5 w-5 text-slate-500" aria-hidden />
            </div>
            <div className="grid gap-3">
              <label className="text-sm font-semibold text-slate-600">
                {t("hazardType")}
                <select
                  value={form.hazardType}
                  onChange={(event) => updateForm("hazardType", event.target.value as AlertInput["hazardType"])}
                  className="mt-1 w-full rounded-md border border-gov-line px-3 py-2"
                >
                  {hazardTypes.map((type) => (
                    <option key={type}>{type}</option>
                  ))}
                </select>
              </label>
              <div className="grid gap-3 md:grid-cols-2">
                <label className="text-sm font-semibold text-slate-600">
                  {t("severity")}
                  <select
                    value={form.severity}
                    onChange={(event) => updateForm("severity", event.target.value as AlertInput["severity"])}
                    className="mt-1 w-full rounded-md border border-gov-line px-3 py-2"
                  >
                    {severities.map((severity) => (
                      <option key={severity}>{severity}</option>
                    ))}
                  </select>
                </label>
                <label className="text-sm font-semibold text-slate-600">
                  {t("affectedPopulation")}
                  <input
                    type="number"
                    value={form.affectedPopulation}
                    onChange={(event) => updateForm("affectedPopulation", Number(event.target.value))}
                    className="mt-1 w-full rounded-md border border-gov-line px-3 py-2"
                  />
                </label>
              </div>
              <label className="text-sm font-semibold text-slate-600">
                {t("location")}
                <input
                  value={form.location}
                  onChange={(event) => updateForm("location", event.target.value)}
                  className="mt-1 w-full rounded-md border border-gov-line px-3 py-2"
                />
              </label>
              <div className="grid gap-3 md:grid-cols-2">
                <label className="text-sm font-semibold text-slate-600">
                  {t("province")}
                  <input
                    value={form.province}
                    onChange={(event) => updateForm("province", event.target.value)}
                    className="mt-1 w-full rounded-md border border-gov-line px-3 py-2"
                  />
                </label>
                <label className="text-sm font-semibold text-slate-600">
                  {t("district")}
                  <input
                    value={form.district}
                    onChange={(event) => updateForm("district", event.target.value)}
                    className="mt-1 w-full rounded-md border border-gov-line px-3 py-2"
                  />
                </label>
              </div>
              <TextareaField
                label={t("predictedImpact")}
                value={form.predictedImpact}
                onChange={(value) => updateForm("predictedImpact", value)}
              />
              <TextareaField
                label={t("recommendedAction")}
                value={form.recommendedAction}
                onChange={(value) => updateForm("recommendedAction", value)}
              />
              <div className="grid gap-3 md:grid-cols-2">
                <label className="text-sm font-semibold text-slate-600">
                  {t("startTime")}
                  <input
                    type="datetime-local"
                    value={form.startTime}
                    onChange={(event) => updateForm("startTime", event.target.value)}
                    className="mt-1 w-full rounded-md border border-gov-line px-3 py-2"
                  />
                </label>
                <label className="text-sm font-semibold text-slate-600">
                  {t("expectedDuration")}
                  <input
                    value={form.expectedDuration}
                    onChange={(event) => updateForm("expectedDuration", event.target.value)}
                    className="mt-1 w-full rounded-md border border-gov-line px-3 py-2"
                  />
                </label>
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-600">{t("channels")}</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {notificationChannels.map((channel) => (
                    <button
                      key={channel}
                      type="button"
                      onClick={() => toggleChannel(channel)}
                      className={classNames(
                        "rounded-md border px-3 py-2 text-sm font-bold",
                        form.communicationChannels.includes(channel)
                          ? "border-gov-ink bg-gov-ink text-white"
                          : "border-gov-line bg-white text-slate-700"
                      )}
                    >
                      {channel}
                    </button>
                  ))}
                </div>
              </div>
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 rounded-md bg-red-700 px-4 py-3 text-sm font-bold text-white"
                disabled={busy === "create"}
              >
                <Send className="h-4 w-4" aria-hidden />
                {t("createAlert")}
              </button>
            </div>
          </form>

          <section className="rounded-lg border border-gov-line bg-white p-4 shadow-panel">
            <h3 className="mb-3 text-lg font-bold text-gov-ink">{t("alerts")}</h3>
            <div className="space-y-2">
              {alerts.length === 0 ? (
                <EmptyState label={t("noData")} />
              ) : (
                alerts.map((alert) => (
                  <button
                    key={alert.id}
                    type="button"
                    onClick={() => setSelectedId(alert.id)}
                    className={classNames(
                      "w-full rounded-lg border p-3 text-left",
                      selected?.id === alert.id ? "border-gov-ink bg-slate-100" : "border-gov-line bg-white"
                    )}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="font-bold text-gov-ink">{alert.location}</span>
                      <StatusPill status={alert.status} />
                    </div>
                    <p className="mt-1 text-sm text-slate-600">{alert.hazardType} · {formatDate(alert.startTime)}</p>
                  </button>
                ))
              )}
            </div>
          </section>
        </section>

        <section className="rounded-lg border border-gov-line bg-white p-4 shadow-panel">
          {error ? <div className="mb-4 rounded-md border border-red-200 bg-red-50 p-3 text-sm font-semibold text-red-700">{error}</div> : null}
          {!selected ? (
            <EmptyState label={t("noData")} />
          ) : (
            <div className="space-y-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-slate-500">{selected.id}</p>
                  <h3 className="text-2xl font-bold text-gov-ink">{selected.location}</h3>
                  <p className="mt-1 text-sm text-slate-600">{selected.district}, {selected.province}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <SeverityPill severity={selected.severity} />
                  <StatusPill status={selected.status} />
                </div>
              </div>

              <div className="grid gap-3 md:grid-cols-3">
                <div className="rounded-lg border border-gov-line p-3">
                  <p className="text-xs font-bold uppercase text-slate-500">{t("riskClassification")}</p>
                  <p className="mt-1 text-xl font-bold text-gov-ink">{selected.aiAssessment.riskScore ?? "-"} / 100</p>
                </div>
                <div className="rounded-lg border border-gov-line p-3">
                  <p className="text-xs font-bold uppercase text-slate-500">{t("affectedPopulation")}</p>
                  <p className="mt-1 text-xl font-bold text-gov-ink">{selected.affectedPopulation.toLocaleString()}</p>
                </div>
                <div className="rounded-lg border border-gov-line p-3">
                  <p className="text-xs font-bold uppercase text-slate-500">{t("channels")}</p>
                  <p className="mt-1 text-sm font-semibold text-slate-700">{selected.communicationChannels.join(", ")}</p>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <label className="text-sm font-semibold text-slate-600">
                  {t("englishMessage")}
                  <textarea
                    value={messageEn}
                    onChange={(event) => setMessageEn(event.target.value)}
                    className="mt-1 min-h-44 w-full rounded-md border border-gov-line px-3 py-2 text-sm"
                    lang="en"
                  />
                </label>
                <label className="text-sm font-semibold text-slate-600">
                  {t("laoMessage")}
                  <textarea
                    value={messageLo}
                    onChange={(event) => setMessageLo(event.target.value)}
                    className="mt-1 min-h-44 w-full rounded-md border border-gov-line px-3 py-2 text-sm"
                    lang="lo"
                  />
                </label>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                <div className="rounded-lg border border-gov-line p-3">
                  <p className="text-sm font-bold text-slate-600">{t("routingGroups")}</p>
                  <p className="mt-2 text-sm text-slate-700">{selected.aiAssessment.routingGroups?.join(", ") || "-"}</p>
                </div>
                <div className="rounded-lg border border-gov-line p-3">
                  <p className="text-sm font-bold text-slate-600">{t("suggestedChannels")}</p>
                  <p className="mt-2 text-sm text-slate-700">{selected.aiAssessment.suggestedChannels?.join(", ") || "-"}</p>
                </div>
                <div className="rounded-lg border border-gov-line p-3">
                  <p className="text-sm font-bold text-slate-600">{t("qualityFlags")}</p>
                  <p className="mt-2 text-sm text-slate-700">{selected.aiAssessment.qualityFlags?.join(", ") || t("auditReady")}</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => runAction("ai-draft")}
                  className="inline-flex items-center gap-2 rounded-md bg-blue-700 px-4 py-2 text-sm font-bold text-white"
                  disabled={busy === "ai-draft"}
                >
                  <Bot className="h-4 w-4" aria-hidden />
                  {t("generateDraft")}
                </button>
                <button
                  type="button"
                  onClick={() => saveMessages()}
                  className="inline-flex items-center gap-2 rounded-md bg-slate-700 px-4 py-2 text-sm font-bold text-white"
                  disabled={busy === "save"}
                >
                  <Save className="h-4 w-4" aria-hidden />
                  {t("save")}
                </button>
                <button
                  type="button"
                  onClick={() => runAction("review")}
                  className="inline-flex items-center gap-2 rounded-md bg-yellow-600 px-4 py-2 text-sm font-bold text-white"
                >
                  <FilePenLine className="h-4 w-4" aria-hidden />
                  {t("sendForReview")}
                </button>
                <button
                  type="button"
                  onClick={() => runAction("approve")}
                  className="inline-flex items-center gap-2 rounded-md bg-green-700 px-4 py-2 text-sm font-bold text-white"
                >
                  <Check className="h-4 w-4" aria-hidden />
                  {t("approve")}
                </button>
                <button
                  type="button"
                  onClick={() => runAction("publish")}
                  className="inline-flex items-center gap-2 rounded-md bg-red-700 px-4 py-2 text-sm font-bold text-white"
                >
                  <Radio className="h-4 w-4" aria-hidden />
                  {t("publish")}
                </button>
                <button
                  type="button"
                  onClick={() => saveMessages("Closed")}
                  className="inline-flex items-center gap-2 rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-bold text-slate-700"
                >
                  <XCircle className="h-4 w-4" aria-hidden />
                  {t("close")}
                </button>
              </div>
              <p className="text-xs font-semibold text-slate-500">
                {language === "lo" ? selected.messageLo || selected.messageEn : selected.messageEn || selected.messageLo}
              </p>
            </div>
          )}
        </section>
      </div>
    </AppShell>
  );
}

function TextareaField({
  label,
  value,
  onChange
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="text-sm font-semibold text-slate-600">
      {label}
      <textarea
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="mt-1 min-h-24 w-full rounded-md border border-gov-line px-3 py-2"
      />
    </label>
  );
}

function toDateTimeLocal(value: string) {
  const timestamp = Date.parse(value);
  if (!Number.isFinite(timestamp)) return value.slice(0, 16);
  const date = new Date(timestamp);
  date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
  return date.toISOString().slice(0, 16);
}
