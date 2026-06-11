import {
  AlertTriangle,
  CheckCircle2,
  Clock3,
  RadioTower,
  ShieldAlert,
  XCircle
} from "lucide-react";
import type { AlertStatus, NotificationLog, Severity } from "@/lib/types";

export function classNames(...items: Array<string | false | null | undefined>) {
  return items.filter(Boolean).join(" ");
}

export function severityClasses(severity: Severity) {
  switch (severity) {
    case "Emergency":
      return "border-red-200 bg-red-50 text-red-800";
    case "Warning":
      return "border-orange-200 bg-orange-50 text-orange-800";
    case "Watch":
      return "border-yellow-200 bg-yellow-50 text-yellow-800";
    default:
      return "border-green-200 bg-green-50 text-green-800";
  }
}

export function severityMarker(severity: Severity) {
  switch (severity) {
    case "Emergency":
      return "bg-severity-emergency";
    case "Warning":
      return "bg-severity-warning";
    case "Watch":
      return "bg-severity-watch";
    default:
      return "bg-severity-normal";
  }
}

export function statusClasses(status: AlertStatus) {
  switch (status) {
    case "Published":
      return "border-green-200 bg-green-50 text-green-800";
    case "Approved":
      return "border-blue-200 bg-blue-50 text-blue-800";
    case "Under Review":
    case "AI Generated":
      return "border-yellow-200 bg-yellow-50 text-yellow-800";
    case "Cancelled":
    case "Closed":
      return "border-slate-200 bg-slate-100 text-slate-700";
    default:
      return "border-slate-200 bg-white text-slate-700";
  }
}

export function Pill({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={classNames("inline-flex items-center rounded border px-2 py-1 text-xs font-semibold", className)}>
      {children}
    </span>
  );
}

export function SeverityPill({ severity }: { severity: Severity }) {
  return <Pill className={severityClasses(severity)}>{severity}</Pill>;
}

export function StatusPill({ status }: { status: AlertStatus }) {
  return <Pill className={statusClasses(status)}>{status}</Pill>;
}

export function LogStatus({ log }: { log: NotificationLog }) {
  const statusClass =
    log.status === "Delivered"
      ? "text-green-700"
      : log.status === "Failed"
        ? "text-red-700"
        : "text-slate-700";
  const Icon = log.status === "Delivered" ? CheckCircle2 : log.status === "Failed" ? XCircle : Clock3;
  return (
    <span className={classNames("inline-flex items-center gap-1 text-sm font-semibold", statusClass)}>
      <Icon className="h-4 w-4" aria-hidden />
      {log.status}
    </span>
  );
}

export function MetricCard({
  label,
  value,
  detail,
  tone = "slate"
}: {
  label: string;
  value: string | number;
  detail?: string;
  tone?: "red" | "green" | "yellow" | "blue" | "slate";
}) {
  const Icon = tone === "red" ? ShieldAlert : tone === "yellow" ? AlertTriangle : tone === "green" ? CheckCircle2 : RadioTower;
  const color =
    tone === "red"
      ? "text-red-700 bg-red-50"
      : tone === "yellow"
        ? "text-yellow-800 bg-yellow-50"
        : tone === "green"
          ? "text-green-700 bg-green-50"
          : tone === "blue"
            ? "text-blue-700 bg-blue-50"
            : "text-slate-700 bg-slate-100";
  return (
    <div className="rounded-lg border border-gov-line bg-white p-4 shadow-panel">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-slate-600">{label}</p>
          <p className="mt-2 text-3xl font-bold text-gov-ink">{value}</p>
        </div>
        <span className={classNames("rounded-md p-2", color)}>
          <Icon className="h-5 w-5" aria-hidden />
        </span>
      </div>
      {detail ? <p className="mt-3 text-sm text-slate-500">{detail}</p> : null}
    </div>
  );
}

export function EmptyState({ label }: { label: string }) {
  return (
    <div className="rounded-lg border border-dashed border-slate-300 bg-white p-6 text-center text-sm text-slate-500">
      {label}
    </div>
  );
}

export function formatDate(value?: string | null) {
  if (!value) return "-";
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit"
  }).format(new Date(value));
}

export function formatNumber(value: number) {
  return new Intl.NumberFormat("en").format(value);
}
