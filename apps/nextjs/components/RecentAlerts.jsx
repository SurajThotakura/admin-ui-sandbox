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
    <div className="card" style={{ animation: "slideUp 0.5s ease forwards", animationDelay: "0.4s", opacity: 0 }}>
      <div className="card-header">
        <div>
          <div className="card-title">Recent Alerts</div>
          <div className="card-subtitle">Latest system notifications</div>
        </div>
        <button className="card-action">View all</button>
      </div>
      <div style={{ padding: "8px 24px 24px", display: "flex", flexDirection: "column", gap: 8 }}>
        {recentAlerts.map((a) => (
          <div
            key={a.id}
            style={{
              display: "flex",
              gap: 16,
              padding: 16,
              background: "var(--color-sand-50)",
              cursor: "pointer",
              transition: "transform 0.15s ease, box-shadow 0.15s ease",
            }}
          >
            <div
              style={{
                width: 8,
                height: 8,
                marginTop: 5,
                flexShrink: 0,
                background: dotColors[a.type],
                animation: a.type === "critical" ? "pulse-glow 1.5s ease-in-out infinite" : undefined,
              }}
            />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 13, color: "var(--color-gray-700)", lineHeight: 1.4 }}>{a.message}</div>
              <div style={{ fontSize: 11, color: "var(--color-gray-300)", marginTop: 2 }}>{a.time}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
