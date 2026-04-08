"use client";

import { recentAlerts } from "../data/mockData";

const dotColors = {
  warning: "var(--color-status-warning)",
  info: "var(--color-status-info)",
  critical: "var(--color-status-critical)",
  success: "var(--color-status-success)",
};

export default function RecentAlerts() {
  return (
    <div
      className="bg-white relative overflow-hidden animate-slide-up opacity-0"
      style={{
        boxShadow: "0 0 0 1px var(--color-sand-200)",
        animationDelay: "0.4s",
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
            Recent Alerts
          </div>
          <div className="text-xs mt-0.5" style={{ color: "var(--color-gray-300)" }}>
            Latest system notifications
          </div>
        </div>
        <button
          className="text-xs font-semibold px-2.5 py-1 transition-colors duration-150 cursor-pointer border-none bg-transparent"
          style={{ color: "var(--color-primary)", fontFamily: "var(--font-body)" }}
        >
          View all
        </button>
      </div>

      <div className="flex flex-col gap-2 px-6 pb-6 pt-2">
        {recentAlerts.map((a) => (
          <div
            key={a.id}
            className="flex gap-4 p-4 cursor-pointer transition-all duration-150"
            style={{ background: "var(--color-sand-50)" }}
          >
            <div
              className={`w-2 h-2 shrink-0 mt-[5px] ${a.type === "critical" ? "animate-pulse-glow" : ""}`}
              style={{ background: dotColors[a.type] }}
            />
            <div className="flex-1 min-w-0">
              <div className="text-[13px] leading-[1.4]" style={{ color: "var(--color-gray-700)" }}>
                {a.message}
              </div>
              <div className="text-[11px] mt-0.5" style={{ color: "var(--color-gray-300)" }}>
                {a.time}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
