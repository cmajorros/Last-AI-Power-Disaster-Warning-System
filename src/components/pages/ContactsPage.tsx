"use client";

import { useCallback, useEffect, useState } from "react";
import { Mail, Phone, Smartphone } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { useLanguage } from "@/components/LanguageProvider";
import { roleNames } from "@/lib/i18n";
import { EmptyState } from "@/components/ui";
import type { User, Volunteer } from "@/lib/types";

interface ContactsPayload {
  users: User[];
  volunteers: Volunteer[];
}

export function ContactsPage() {
  const { t, language } = useLanguage();
  const [data, setData] = useState<ContactsPayload | null>(null);

  const refresh = useCallback(async () => {
    const response = await fetch("/api/dashboard");
    const payload = await response.json();
    if (response.ok) setData({ users: payload.users, volunteers: payload.volunteers });
  }, []);

  useEffect(() => {
    refresh();
    window.addEventListener("laos-session-changed", refresh);
    return () => window.removeEventListener("laos-session-changed", refresh);
  }, [refresh]);

  return (
    <AppShell>
      {!data ? (
        <EmptyState label="Loading contacts" />
      ) : (
        <div className="grid gap-6 xl:grid-cols-2">
          <section className="rounded-lg border border-gov-line bg-white p-4 shadow-panel">
            <h3 className="text-lg font-bold text-gov-ink">{t("officialDirectory")}</h3>
            <div className="mt-4 space-y-3">
              {data.users.map((user) => (
                <div key={user.id} className="rounded-lg border border-gov-line p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-bold text-gov-ink">{user.name}</p>
                      <p className="mt-1 text-sm text-slate-500">{roleNames[user.role][language]}</p>
                    </div>
                    <span className="rounded border border-gov-line px-2 py-1 text-xs font-bold text-slate-600">
                      {user.province}
                    </span>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-3 text-sm text-slate-600">
                    <span className="inline-flex items-center gap-1"><Mail className="h-4 w-4" aria-hidden />{user.email}</span>
                    <span className="inline-flex items-center gap-1"><Phone className="h-4 w-4" aria-hidden />****{user.phoneLast4}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-lg border border-gov-line bg-white p-4 shadow-panel">
            <h3 className="text-lg font-bold text-gov-ink">{t("villageVolunteerNetwork")}</h3>
            <div className="mt-4 space-y-3">
              {data.volunteers.map((volunteer) => (
                <div key={volunteer.id} className="rounded-lg border border-gov-line p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-bold text-gov-ink">{volunteer.name}</p>
                      <p className="mt-1 text-sm text-slate-500">{volunteer.village}, {volunteer.district}</p>
                    </div>
                    <span className="rounded border border-gov-line px-2 py-1 text-xs font-bold text-slate-600">
                      {volunteer.province}
                    </span>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-3 text-sm text-slate-600">
                    <span className="inline-flex items-center gap-1"><Phone className="h-4 w-4" aria-hidden />****{volunteer.phoneLast4}</span>
                    <span className="inline-flex items-center gap-1"><Smartphone className="h-4 w-4" aria-hidden />{volunteer.whatsappEnabled ? t("allowed") : t("restricted")}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      )}
    </AppShell>
  );
}
