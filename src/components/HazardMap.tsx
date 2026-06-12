"use client";

import type { Alert, HazardData, Severity } from "@/lib/types";
import { useLanguage } from "./LanguageProvider";
import { SeverityPill, classNames, severityMarker } from "./ui";

const laosBounds = {
  west: 100,
  south: 13,
  east: 108,
  north: 23
};

const nasaSatelliteUrl =
  "https://gibs.earthdata.nasa.gov/wms/epsg4326/best/wms.cgi?SERVICE=WMS&VERSION=1.1.1&REQUEST=GetMap&LAYERS=VIIRS_SNPP_CorrectedReflectance_TrueColor&STYLES=&SRS=EPSG:4326&BBOX=100,13,108,23&WIDTH=1280&HEIGHT=900&FORMAT=image/jpeg";

function position(lat: number, lng: number) {
  const x = Math.min(94, Math.max(6, ((lng - laosBounds.west) / (laosBounds.east - laosBounds.west)) * 100));
  const y = Math.min(94, Math.max(6, ((laosBounds.north - lat) / (laosBounds.north - laosBounds.south)) * 100));
  return { x, y };
}

function Marker({
  lat,
  lng,
  severity,
  label
}: {
  lat: number;
  lng: number;
  severity: Severity;
  label: string;
}) {
  const { x, y } = position(lat, lng);
  return (
    <div
      className="absolute -translate-x-1/2 -translate-y-1/2"
      style={{ left: `${x}%`, top: `${y}%` }}
      title={label}
    >
      <span className={classNames("block h-4 w-4 rounded-full border-2 border-white shadow-lg", severityMarker(severity))} />
      <span className="absolute left-4 top-1/2 min-w-28 -translate-y-1/2 rounded bg-white px-2 py-1 text-xs font-semibold text-slate-700 shadow">
        {label}
      </span>
    </div>
  );
}

export function HazardMap({
  alerts,
  hazards,
  tall = false
}: {
  alerts: Alert[];
  hazards: HazardData[];
  tall?: boolean;
}) {
  const { t } = useLanguage();
  const visibleAlerts = alerts.filter((alert) => alert.status !== "Closed" && alert.status !== "Cancelled");

  return (
    <section className="rounded-lg border border-gov-line bg-white shadow-panel">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gov-line p-4">
        <div>
          <h3 className="text-lg font-bold text-gov-ink">{t("hazardMap")}</h3>
          <p className="text-sm text-slate-500">
            NASA GIBS VIIRS/SNPP true-color · {hazards.length} stations · {visibleAlerts.length} alert zones
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {(["Normal", "Watch", "Warning", "Emergency"] as Severity[]).map((severity) => (
            <SeverityPill key={severity} severity={severity} />
          ))}
        </div>
      </div>
      <div className={classNames("relative overflow-hidden rounded-b-lg bg-slate-900", tall ? "h-[620px]" : "h-[430px]")}>
        <img
          src={nasaSatelliteUrl}
          alt="NASA GIBS satellite view over Laos"
          className="absolute inset-0 h-full w-full object-fill"
        />
        <div className="absolute inset-0 bg-slate-950/10" />
        <svg className="absolute inset-0 h-full w-full opacity-80" viewBox="0 0 360 520" role="img" aria-label="Laos operational map">
          <path
            d="M171 26 C207 54 213 87 194 111 C228 131 239 163 215 189 C253 219 258 252 232 283 C260 314 266 346 244 379 C228 405 227 443 206 478 C187 505 151 493 151 455 C151 422 129 405 112 380 C92 350 102 319 130 291 C101 261 92 225 117 193 C91 167 86 130 112 104 C135 81 139 49 171 26 Z"
            fill="rgba(219, 234, 254, 0.18)"
            stroke="rgba(255, 255, 255, 0.92)"
            strokeWidth="3"
          />
          <path d="M123 106 C151 128 186 128 214 151" stroke="rgba(255,255,255,0.72)" strokeWidth="2" fill="none" />
          <path d="M116 195 C151 211 192 211 232 239" stroke="rgba(255,255,255,0.72)" strokeWidth="2" fill="none" />
          <path d="M132 292 C161 319 207 323 246 350" stroke="rgba(255,255,255,0.72)" strokeWidth="2" fill="none" />
          <path d="M151 454 C166 421 190 397 244 379" stroke="rgba(255,255,255,0.72)" strokeWidth="2" fill="none" />
          <text x="184" y="87" textAnchor="middle" className="fill-white text-sm font-bold">
            Luang Prabang
          </text>
          <text x="166" y="195" textAnchor="middle" className="fill-white text-sm font-bold">
            Vientiane
          </text>
          <text x="196" y="320" textAnchor="middle" className="fill-white text-sm font-bold">
            Savannakhet
          </text>
          <text x="194" y="445" textAnchor="middle" className="fill-white text-sm font-bold">
            Champasak
          </text>
        </svg>
        <a
          href="https://nasa-gibs.github.io/gibs-api-docs/access-basics/"
          target="_blank"
          rel="noreferrer"
          className="absolute bottom-3 left-3 rounded bg-white/90 px-2 py-1 text-xs font-bold text-slate-700 shadow"
        >
          NASA GIBS
        </a>

        {hazards.map((hazard) => (
          <Marker
            key={hazard.id}
            lat={hazard.lat}
            lng={hazard.lng}
            severity={hazard.riskClassification}
            label={`${hazard.location}: ${hazard.rainfallLevel} mm`}
          />
        ))}
        {visibleAlerts.map((alert) => (
          <Marker
            key={alert.id}
            lat={alert.lat}
            lng={alert.lng}
            severity={alert.severity}
            label={`${alert.id} · ${alert.district}`}
          />
        ))}
      </div>
    </section>
  );
}
