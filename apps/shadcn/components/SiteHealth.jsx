"use client";

import { siteHealthMetrics } from "../data/mockData";
import { Card, CardHeader, CardTitle, CardDescription, CardAction } from "./ui/card";

const barWidths = {
  "99.97%": 99.97, "1.8s": 64, "0.12%": 96,
  "94.2%": 94.2, "142ms": 82, "68.4%": 31.6,
};

const statusColor = {
  good: "var(--color-status-good)",
  warning: "var(--color-status-warning)",
  critical: "var(--color-status-critical)",
};

export default function SiteHealth() {
  return (
    <Card className="animate-slide-up opacity-0" style={{ animationDelay: "0.25s", animationFillMode: "forwards" }}>
      <CardHeader>
        <div>
          <CardTitle>Site Health</CardTitle>
          <CardDescription>Performance & reliability metrics</CardDescription>
        </div>
        <CardAction>Details</CardAction>
      </CardHeader>

      <div className="grid grid-cols-2 gap-2 p-4 px-6 pb-6">
        {siteHealthMetrics.map((m, i) => (
          <div key={i} className="flex flex-col gap-1 p-4 transition-transform duration-150" style={{ background: "var(--color-sand-50)" }}>
            <span className="text-[11px] font-semibold uppercase tracking-[0.5px]" style={{ color: "var(--color-gray-400)" }}>
              {m.label}
            </span>
            <span className="text-[22px] font-bold tracking-tight" style={{ fontFamily: "var(--font-display)", color: statusColor[m.status] }}>
              {m.value}
            </span>
            <div className="h-[3px] mt-1 overflow-hidden" style={{ background: "var(--color-sand-200)" }}>
              <div className="h-full transition-[width] duration-1000" style={{ width: `${barWidths[m.value] || 50}%`, background: statusColor[m.status] }} />
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
