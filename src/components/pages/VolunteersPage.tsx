"use client";

import { FormEvent, useCallback, useEffect, useMemo, useState } from "react";
import { CheckCircle2, Plus, RadioTower } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { useLanguage } from "@/components/LanguageProvider";
import { EmptyState, StatusPill, classNames } from "@/components/ui";
import {
  disseminationMethods,
  type Acknowledgment,
  type Alert,
  type DisseminationMethod,
  type Volunteer,
  type VolunteerInput
} from "@/lib/types";

interface VolunteerPayload {
  alerts: Alert[];
  volunteers: Volunteer[];
  acknowledgments: Acknowledgment[];
}

const blankVolunteer: VolunteerInput = {
  name: "",
  phone: "+85620",
  whatsappEnabled: true,
  village: "",
  district: "",
  province: "",
  languagePreference: "lo"
};

export function VolunteersPage() {
  const { t } = useLanguage();
  const [data, setData] = useState<VolunteerPayload | null>(null);
  const [form, setForm] = useState<VolunteerInput>(blankVolunteer);
  const [alertId, setAlertId] = useState("");
  const [method, setMethod] = useState<DisseminationMethod>("Village loudspeaker");
  const [notes, setNotes] = useState("");
  const [error, setError] = useState("");

  const refresh = useCallback(async () => {
    setError("");
    const response = await fetch("/api/dashboard");
    const payload = await response.json();
    if (!response.ok) {
      setError(payload.error || "Could not load volunteers");
      return;
    }
    setData({
      alerts: payload.alerts,
      volunteers: payload.volunteers,
      acknowledgments: payload.acknowledgments
    });
    setAlertId((current) => current || payload.alerts.find((alert: Alert) => alert.status === "Published")?.id || payload.alerts[0]?.id || "");
  }, []);

  useEffect(() => {
    refresh();
    window.addEventListener("laos-session-changed", refresh);
    return () => window.removeEventListener("laos-session-changed", refresh);
  }, [refresh]);

  const activeAlert = useMemo(() => data?.alerts.find((alert) => alert.id === alertId), [alertId, data]);

  function updateForm<K extends keyof VolunteerInput>(key: K, value: VolunteerInput[K]) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  async function addVolunteer(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    const response = await fetch("/api/volunteers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });
    const payload = await response.json();
    if (!response.ok) {
      setError(payload.error || "Could not add volunteer");
      return;
    }
    setForm(blankVolunteer);
    refresh();
  }

  async function acknowledge(volunteer: Volunteer, status: Acknowledgment["status"]) {
    if (!alertId) return;
    setError("");
    const response = await fetch(`/api/alerts/${alertId}/acknowledge`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: volunteer.id,
        status,
        disseminationMethod: method,
        notes
      })
    });
    const payload = await response.json();
    if (!response.ok) {
      setError(payload.error || "Could not acknowledge alert");
      return;
    }
    refresh();
  }

  const ackFor = (volunteerId: string) =>
    data?.acknowledgments.find((ack) => ack.alertId === alertId && ack.userId === volunteerId);

  return (
    <AppShell>
      {error ? <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm font-semibold text-red-700">{error}</div> : null}
      {!data ? (
        <EmptyState label="Loading volunteers" />
      ) : (
        <div className="grid gap-6 xl:grid-cols-[0.85fr_1.25fr]">
          <section className="rounded-lg border border-gov-line bg-white p-4 shadow-panel">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-bold text-gov-ink">{t("addVolunteer")}</h3>
              <Plus className="h-5 w-5 text-slate-500" aria-hidden />
            </div>
            <form onSubmit={addVolunteer} className="grid gap-3">
              <label className="text-sm font-semibold text-slate-600">
                {t("user")}
                <input
                  value={form.name}
                  onChange={(event) => updateForm("name", event.target.value)}
                  className="mt-1 w-full rounded-md border border-gov-line px-3 py-2"
                  required
                />
              </label>
              <label className="text-sm font-semibold text-slate-600">
                {t("phone")}
                <input
                  value={form.phone}
                  onChange={(event) => updateForm("phone", event.target.value)}
                  className="mt-1 w-full rounded-md border border-gov-line px-3 py-2"
                />
              </label>
              <div className="grid gap-3 md:grid-cols-3">
                <label className="text-sm font-semibold text-slate-600">
                  {t("village")}
                  <input
                    value={form.village}
                    onChange={(event) => updateForm("village", event.target.value)}
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
                <label className="text-sm font-semibold text-slate-600">
                  {t("province")}
                  <input
                    value={form.province}
                    onChange={(event) => updateForm("province", event.target.value)}
                    className="mt-1 w-full rounded-md border border-gov-line px-3 py-2"
                  />
                </label>
              </div>
              <label className="inline-flex items-center gap-2 text-sm font-semibold text-slate-700">
                <input
                  type="checkbox"
                  checked={form.whatsappEnabled}
                  onChange={(event) => updateForm("whatsappEnabled", event.target.checked)}
                  className="h-4 w-4"
                />
                {t("whatsapp")}
              </label>
              <button className="inline-flex items-center justify-center gap-2 rounded-md bg-gov-ink px-4 py-3 text-sm font-bold text-white">
                <Plus className="h-4 w-4" aria-hidden />
                {t("addVolunteer")}
              </button>
            </form>
          </section>

          <section className="rounded-lg border border-gov-line bg-white p-4 shadow-panel">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <div>
                <h3 className="text-lg font-bold text-gov-ink">{t("volunteerAcknowledgment")}</h3>
                {activeAlert ? (
                  <div className="mt-1 flex flex-wrap items-center gap-2 text-sm text-slate-500">
                    <span>{activeAlert.location}</span>
                    <StatusPill status={activeAlert.status} />
                  </div>
                ) : null}
              </div>
              <select
                value={alertId}
                onChange={(event) => setAlertId(event.target.value)}
                className="rounded-md border border-gov-line px-3 py-2 text-sm"
              >
                {data.alerts.map((alert) => (
                  <option key={alert.id} value={alert.id}>
                    {alert.id} · {alert.location}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4 grid gap-3 md:grid-cols-[220px_1fr]">
              <select
                value={method}
                onChange={(event) => setMethod(event.target.value as DisseminationMethod)}
                className="rounded-md border border-gov-line px-3 py-2 text-sm"
              >
                {disseminationMethods.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
              <input
                value={notes}
                onChange={(event) => setNotes(event.target.value)}
                placeholder={t("notes")}
                className="rounded-md border border-gov-line px-3 py-2 text-sm"
              />
            </div>
            <div className="grid gap-3">
              {data.volunteers.map((volunteer) => {
                const ack = ackFor(volunteer.id);
                return (
                  <div key={volunteer.id} className="rounded-lg border border-gov-line p-4">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <p className="font-bold text-gov-ink">{volunteer.name}</p>
                        <p className="mt-1 text-sm text-slate-500">
                          {volunteer.village}, {volunteer.district} · ****{volunteer.phoneLast4}
                        </p>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <span
                          className={classNames(
                            "rounded border px-2 py-1 text-xs font-bold",
                            volunteer.whatsappEnabled ? "border-green-200 bg-green-50 text-green-700" : "border-slate-200 bg-slate-100 text-slate-600"
                          )}
                        >
                          {t("whatsapp")}
                        </span>
                        <span className="rounded border border-gov-line px-2 py-1 text-xs font-bold text-slate-600">
                          {ack?.status ?? "Pending"}
                        </span>
                      </div>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() => acknowledge(volunteer, "Acknowledged")}
                        className="inline-flex items-center gap-2 rounded-md bg-green-700 px-3 py-2 text-sm font-bold text-white"
                      >
                        <CheckCircle2 className="h-4 w-4" aria-hidden />
                        {t("acknowledgment")}
                      </button>
                      <button
                        type="button"
                        onClick={() => acknowledge(volunteer, "Disseminated")}
                        className="inline-flex items-center gap-2 rounded-md bg-blue-700 px-3 py-2 text-sm font-bold text-white"
                      >
                        <RadioTower className="h-4 w-4" aria-hidden />
                        {t("dissemination")}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        </div>
      )}
    </AppShell>
  );
}
