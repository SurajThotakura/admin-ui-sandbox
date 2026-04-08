"use client";

import { recentAlerts } from "../data/mockData";
import { Card, CardHeader, CardTitle, CardDescription, CardAction } from "./ui/card";

const dotColors = {
  warning: "var(--color-status-warning)",
  info: "var(--color-status-info)",
  critical: "var(--color-status-critical)",
  success: "var(--color-status-success)",
};

export default function RecentAlerts() {
  return (
    <Card className="animate-slide-up opacity-0" style={{ animationDelay: "0.4s", animationFillMode: "forwards" }}>
      <CardHeader>
        <div>
          <CardTitle>Recent Alerts</CardTitle>
          <CardDescription>Latest system notifications</CardDescription>
        </div>
        <CardAction>View all</CardAction>
      </CardHeader>

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
    </Card>
  );
}
