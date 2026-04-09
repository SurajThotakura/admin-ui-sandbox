"use client";

import { CalendarDays } from "lucide-react";

const pageInfo = {
  dashboard: {
    title: "Dashboard",
    subtitle: "Overview of platform activity and system health",
  },
  products: {
    title: "Products",
    subtitle: "Manage catalog listings, pricing, and availability",
  },
  team: {
    title: "Team",
    subtitle: "Manage team members, roles, and permissions",
  },
  notifications: {
    title: "Notifications",
    subtitle: "System alerts and activity feed",
  },
  settings: {
    title: "Settings",
    subtitle: "Organization preferences and configuration",
  },
};

export default function TopBar({ activePage }) {
  const info = pageInfo[activePage] || pageInfo.dashboard;

  return (
    <header className="top-bar">
      <div>
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: 24,
            fontWeight: 700,
            color: "var(--color-gray-800)",
            letterSpacing: "-0.3px",
            lineHeight: 1.2,
          }}
        >
          {info.title}
        </h1>
        <p style={{ fontSize: 13, color: "var(--color-gray-400)", marginTop: 2 }}>
          {info.subtitle}
        </p>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "6px 14px",
            background: "var(--color-status-good-bg)",
            color: "var(--color-status-good)",
            fontSize: 12,
            fontWeight: 600,
          }}
        >
          <span
            style={{
              width: 7,
              height: 7,
              background: "var(--color-status-good)",
              animation: "pulse-glow 2s ease-in-out infinite",
            }}
          />
          All Systems Operational
        </div>
        {activePage === "dashboard" && (
          <button
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "7px 14px",
              background: "white",
              border: "1px solid var(--color-sand-200)",
              fontSize: 13,
              fontWeight: 500,
              color: "var(--color-gray-600)",
              cursor: "pointer",
              fontFamily: "var(--font-body)",
              transition: "border-color 0.15s",
            }}
          >
            <CalendarDays style={{ width: 15, height: 15, opacity: 0.5 }} />
            Last 7 days
          </button>
        )}
      </div>
    </header>
  );
}
