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
    <header
      className="flex items-center justify-between px-12 py-6 border-b-2 sticky top-0 z-50"
      style={{
        borderColor: "var(--color-sand-200)",
        background: "rgba(253, 251, 247, 0.85)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
      }}
    >
      <div>
        <h1
          className="text-2xl font-bold tracking-tight leading-tight"
          style={{ fontFamily: "var(--font-display)", color: "var(--color-gray-800)" }}
        >
          {info.title}
        </h1>
        <p className="text-[13px] mt-0.5" style={{ color: "var(--color-gray-400)" }}>
          {info.subtitle}
        </p>
      </div>
      <div className="flex items-center gap-4">
        <div
          className="flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold"
          style={{
            background: "var(--color-status-good-bg)",
            color: "var(--color-status-good)",
          }}
        >
          <span
            className="w-[7px] h-[7px] animate-pulse-glow"
            style={{ background: "var(--color-status-good)" }}
          />
          All Systems Operational
        </div>
        {activePage === "dashboard" && (
          <button
            className="flex items-center gap-2 px-3.5 py-[7px] text-[13px] font-medium border cursor-pointer transition-colors duration-150 hover:border-gray-300"
            style={{
              background: "white",
              borderColor: "var(--color-sand-200)",
              color: "var(--color-gray-600)",
              fontFamily: "var(--font-body)",
            }}
          >
            <CalendarDays className="w-[15px] h-[15px] opacity-50" />
            Last 7 days
          </button>
        )}
      </div>
    </header>
  );
}
