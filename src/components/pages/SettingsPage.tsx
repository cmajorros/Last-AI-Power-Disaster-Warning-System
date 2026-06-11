"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { AppShell } from "@/components/AppShell";
import { useLanguage } from "@/components/LanguageProvider";
import { roleNames } from "@/lib/i18n";
import { EmptyState } from "@/components/ui";
import type { Role, User } from "@/lib/types";

interface SettingsPayload {
  user: User;
  users: User[];
  permissionsByRole: Record<Role, string[]>;
  databaseMode: string;
}

const permissionLabels = [
  "view_dashboard",
  "create_alert",
  "draft_with_ai",
  "review_alert",
  "approve_alert",
  "publish_alert",
  "view_delivery",
  "manage_volunteers",
  "acknowledge_alert",
  "view_reports",
  "add_response_note"
];

export function SettingsPage() {
  const { t, language } = useLanguage();
  const [data, setData] = useState<SettingsPayload | null>(null);

  const refresh = useCallback(async () => {
    const response = await fetch("/api/session");
    const payload = await response.json();
    if (response.ok) setData(payload);
  }, []);

  useEffect(() => {
    refresh();
    window.addEventListener("laos-session-changed", refresh);
    return () => window.removeEventListener("laos-session-changed", refresh);
  }, [refresh]);

  const roles = useMemo(() => (data ? Object.keys(data.permissionsByRole) as Role[] : []), [data]);

  return (
    <AppShell>
      {!data ? (
        <EmptyState label="Loading settings" />
      ) : (
        <div className="space-y-6">
          <section className="grid gap-4 md:grid-cols-3">
            <div className="rounded-lg border border-gov-line bg-white p-4 shadow-panel">
              <p className="text-sm font-semibold text-slate-500">{t("user")}</p>
              <p className="mt-2 text-xl font-bold text-gov-ink">{data.user.name}</p>
            </div>
            <div className="rounded-lg border border-gov-line bg-white p-4 shadow-panel">
              <p className="text-sm font-semibold text-slate-500">{t("role")}</p>
              <p className="mt-2 text-xl font-bold text-gov-ink">{roleNames[data.user.role][language]}</p>
            </div>
            <div className="rounded-lg border border-gov-line bg-white p-4 shadow-panel">
              <p className="text-sm font-semibold text-slate-500">{t("databaseMode")}</p>
              <p className="mt-2 text-xl font-bold text-gov-ink">{data.databaseMode}</p>
            </div>
          </section>

          <section className="rounded-lg border border-gov-line bg-white p-4 shadow-panel">
            <h3 className="text-lg font-bold text-gov-ink">{t("permission")}</h3>
            <div className="mt-4 overflow-x-auto">
              <table className="min-w-full text-left text-sm">
                <thead className="bg-slate-100 text-xs font-bold uppercase text-slate-600">
                  <tr>
                    <th className="px-4 py-3">{t("permission")}</th>
                    {roles.map((role) => (
                      <th key={role} className="px-4 py-3">{roleNames[role][language]}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gov-line">
                  {permissionLabels.map((permission) => (
                    <tr key={permission}>
                      <td className="px-4 py-3 font-bold text-gov-ink">{permission.replaceAll("_", " ")}</td>
                      {roles.map((role) => {
                        const allowed = data.permissionsByRole[role].includes(permission);
                        return (
                          <td key={`${role}-${permission}`} className="px-4 py-3">
                            <span className={allowed ? "font-bold text-green-700" : "font-bold text-slate-400"}>
                              {allowed ? t("allowed") : t("restricted")}
                            </span>
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      )}
    </AppShell>
  );
}
