"use client";

import { siteHealthMetrics } from "../data/mockData";

const barWidths = {
  "99.97%": 99.97,
  "1.8s": 64,
  "0.12%": 96,
  "94.2%": 94.2,
  "142ms": 82,
  "68.4%": 31.6,
};

const statusColor = {
  good: "var(--color-status-good)",
  warning: "var(--color-status-warning)",
  critical: "var(--color-status-critical)",
};

export default function SiteHealth() {
  return (
    <div
      className="bg-white relative overflow-hidden animate-slide-up opacity-0"
      style={{
        boxShadow: "0 0 0 1px var(--color-sand-200)",
        animationDelay: "0.25s",
        animationFillMode: "forwards",
      }}
    >
      <div
        className="absolute top-0 left-0 bottom-0 w-[3px] opacity-0 hover:opacity-100 transition-opacity duration-200 pointer-events-none"
        style={{ background: "var(--color-accent)" }}
      />

      <div className="flex items-center justify-between p-6 pb-0">
        <div>
          <div
            className="text-base font-bold tracking-tight"
            style={{ fontFamily: "var(--font-display)", color: "var(--color-gray-800)" }}
          >
            Site Health
          </div>
          <div className="text-xs mt-0.5" style={{ color: "var(--color-gray-300)" }}>
            Performance & reliability metrics
          </div>
        </div>
        <button
          className="text-xs font-semibold px-2.5 py-1 transition-colors duration-150 cursor-pointer border-none bg-transparent"
          style={{ color: "var(--color-primary)", fontFamily: "var(--font-body)" }}
        >
          Details
        </button>
      </div>

      <div className="grid grid-cols-2 gap-2 p-4 px-6 pb-6">
        {siteHealthMetrics.map((m, i) => (
          <div
            key={i}
            className="flex flex-col gap-1 p-4 transition-transform duration-150"
            style={{ background: "var(--color-sand-50)" }}
          >
            <span
              className="text-[11px] font-semibold uppercase tracking-[0.5px]"
              style={{ color: "var(--color-gray-400)" }}
            >
              {m.label}
            </span>
            <span
              className="text-[22px] font-bold tracking-tight"
              style={{ fontFamily: "var(--font-display)", color: statusColor[m.status] }}
            >
              {m.value}
            </span>
            <div className="h-[3px] mt-1 overflow-hidden" style={{ background: "var(--color-sand-200)" }}>
              <div
                className="h-full transition-[width] duration-1000"
                style={{
                  width: `${barWidths[m.value] || 50}%`,
                  background: statusColor[m.status],
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
