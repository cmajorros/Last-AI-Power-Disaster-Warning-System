"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import {
  BarChart3,
  Bell,
  ContactRound,
  Languages,
  LayoutDashboard,
  LogIn,
  Map,
  Settings,
  ShieldCheck,
  Users
} from "lucide-react";
import { roleNames } from "@/lib/i18n";
import type { Role, User } from "@/lib/types";
import { useLanguage } from "./LanguageProvider";
import { classNames } from "./ui";

interface SessionPayload {
  user: User;
  users: User[];
  databaseMode: string;
}

const navItems = [
  { href: "/", key: "dashboard", icon: LayoutDashboard },
  { href: "/alerts", key: "alerts", icon: Bell },
  { href: "/map", key: "map", icon: Map },
  { href: "/volunteers", key: "volunteers", icon: Users },
  { href: "/contacts", key: "contacts", icon: ContactRound },
  { href: "/reports", key: "reports", icon: BarChart3 },
  { href: "/settings", key: "settings", icon: Settings }
] as const;

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { language, setLanguage, t } = useLanguage();
  const [session, setSession] = useState<SessionPayload | null>(null);
  const [selectedUser, setSelectedUser] = useState("");
  const [mfaCode, setMfaCode] = useState("246810");
  const [message, setMessage] = useState("");

  useEffect(() => {
    let ignore = false;
    fetch("/api/session")
      .then((response) => response.json())
      .then((payload: SessionPayload) => {
        if (ignore) return;
        setSession(payload);
        setSelectedUser(payload.user.id);
      })
      .catch(() => setMessage("Session unavailable"));
    return () => {
      ignore = true;
    };
  }, []);

  const currentRole = session?.user.role;
  const title = useMemo(() => {
    const match = navItems.find((item) => item.href === pathname);
    return match ? t(match.key) : t("dashboard");
  }, [pathname, t]);

  async function switchUser() {
    setMessage("");
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: selectedUser, mfaCode })
    });
    const payload = await response.json();
    if (!response.ok) {
      setMessage(payload.error || "Login failed");
      return;
    }
    setSession((previous) => (previous ? { ...previous, user: payload.user } : previous));
    if (payload.user.languagePreference) setLanguage(payload.user.languagePreference);
    router.refresh();
    window.dispatchEvent(new Event("laos-session-changed"));
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <aside className="fixed inset-y-0 left-0 z-20 hidden w-72 border-r border-gov-line bg-white lg:block">
        <div className="flex h-20 items-center gap-3 border-b border-gov-line px-5">
          <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-red-700 text-white">
            <ShieldCheck className="h-6 w-6" aria-hidden />
          </span>
            <div>
              <p className="text-sm font-semibold text-slate-500">MVP</p>
              <h1 className="text-lg font-bold text-gov-ink">{t("appName")}</h1>
              <p className="mt-1 text-xs font-semibold text-slate-500">{t("countryContext")}</p>
            </div>
        </div>
        <nav className="space-y-1 px-3 py-4">
          {navItems.map((item) => {
            const active = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={classNames(
                  "flex items-center gap-3 rounded-md px-3 py-3 text-sm font-semibold",
                  active ? "bg-gov-ink text-white" : "text-slate-700 hover:bg-slate-100"
                )}
              >
                <Icon className="h-5 w-5" aria-hidden />
                {t(item.key)}
              </Link>
            );
          })}
        </nav>
      </aside>

      <div className="lg:pl-72">
        <header className="sticky top-0 z-10 border-b border-gov-line bg-white/95 backdrop-blur">
          <div className="flex min-h-20 flex-col gap-3 px-4 py-3 md:flex-row md:items-center md:justify-between lg:px-7">
            <div>
              <p className="text-sm font-semibold text-slate-500">{t("appName")}</p>
              <h2 className="text-2xl font-bold text-gov-ink">{title}</h2>
              <p className="mt-1 text-sm font-semibold text-slate-500">{t("countryContext")}</p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <div
                className="flex items-center gap-2 rounded-md border border-gov-line bg-white p-1"
                aria-label={t("language")}
              >
                <span className="hidden px-2 text-xs font-bold uppercase text-slate-500 sm:inline">
                  {t("language")} / ພາສາ
                </span>
                <button
                  type="button"
                  title="English"
                  onClick={() => setLanguage("en")}
                  className={classNames(
                    "flex items-center gap-1 rounded px-3 py-2 text-sm font-bold",
                    language === "en" ? "bg-gov-ink text-white" : "text-slate-700"
                  )}
                >
                  <Languages className="h-4 w-4" aria-hidden />
                  EN
                </button>
                <button
                  type="button"
                  title="Lao / ລາວ"
                  onClick={() => setLanguage("lo")}
                  className={classNames(
                    "rounded px-3 py-2 text-sm font-bold",
                    language === "lo" ? "bg-gov-ink text-white" : "text-slate-700"
                  )}
                >
                  LO ລາວ
                </button>
              </div>

              <select
                aria-label={t("signInAs")}
                value={selectedUser}
                onChange={(event) => setSelectedUser(event.target.value)}
                className="h-10 min-w-56 rounded-md border border-gov-line bg-white px-3 text-sm font-semibold text-slate-700"
              >
                {session?.users.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.name} · {roleNames[user.role as Role][language]}
                  </option>
                ))}
              </select>
              <input
                aria-label={t("mfaCode")}
                value={mfaCode}
                onChange={(event) => setMfaCode(event.target.value)}
                className="h-10 w-24 rounded-md border border-gov-line px-3 text-sm"
              />
              <button
                type="button"
                title={t("switchRole")}
                onClick={switchUser}
                className="inline-flex h-10 items-center gap-2 rounded-md bg-gov-ink px-3 text-sm font-bold text-white"
              >
                <LogIn className="h-4 w-4" aria-hidden />
                {t("switchRole")}
              </button>
            </div>
          </div>
          <div className="flex gap-2 overflow-x-auto border-t border-gov-line px-4 py-2 lg:hidden">
            {navItems.map((item) => {
              const active = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={classNames(
                    "inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-semibold",
                    active ? "bg-gov-ink text-white" : "bg-white text-slate-700"
                  )}
                >
                  <Icon className="h-4 w-4" aria-hidden />
                  {t(item.key)}
                </Link>
              );
            })}
          </div>
          {message ? <p className="border-t border-red-200 bg-red-50 px-4 py-2 text-sm font-semibold text-red-700">{message}</p> : null}
        </header>

        <main className="px-4 py-6 lg:px-7">
          <div className="mb-4 flex flex-wrap items-center gap-2 text-sm text-slate-600">
            {session?.user ? (
              <>
                <span className="rounded border border-gov-line bg-white px-3 py-1 font-semibold">
                  {t("user")}: {session.user.name}
                </span>
                <span className="rounded border border-gov-line bg-white px-3 py-1 font-semibold">
                  {t("role")}: {currentRole ? roleNames[currentRole][language] : "-"}
                </span>
                <span className="rounded border border-gov-line bg-white px-3 py-1 font-semibold">
                  {t("databaseMode")}: {session.databaseMode}
                </span>
                <span className="rounded border border-gov-line bg-white px-3 py-1 font-semibold">
                  Laos · Asia/Vientiane
                </span>
              </>
            ) : null}
          </div>
          {children}
        </main>
      </div>
    </div>
  );
}
