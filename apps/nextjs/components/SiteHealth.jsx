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
    <div className="card" style={{ animation: "slideUp 0.5s ease forwards", animationDelay: "0.25s", opacity: 0 }}>
      <div className="card-header">
        <div>
          <div className="card-title">Site Health</div>
          <div className="card-subtitle">Performance & reliability metrics</div>
        </div>
        <button className="card-action">Details</button>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 8,
          padding: "16px 24px 24px",
        }}
      >
        {siteHealthMetrics.map((m, i) => (
          <div
            key={i}
            style={{
              padding: 16,
              background: "var(--color-sand-50)",
              display: "flex",
              flexDirection: "column",
              gap: 4,
            }}
          >
            <span
              style={{
                fontSize: 11,
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.5px",
                color: "var(--color-gray-400)",
              }}
            >
              {m.label}
            </span>
            <span
              style={{
                fontFamily: "var(--font-display)",
                fontSize: 22,
                fontWeight: 700,
                letterSpacing: "-0.5px",
                color: statusColor[m.status],
              }}
            >
              {m.value}
            </span>
            <div style={{ height: 3, background: "var(--color-sand-200)", marginTop: 4, overflow: "hidden" }}>
              <div
                style={{
                  height: "100%",
                  width: `${barWidths[m.value] || 50}%`,
                  background: statusColor[m.status],
                  transition: "width 1s ease",
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
