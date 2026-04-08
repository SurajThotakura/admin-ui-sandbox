"use client";

import { TrendingUp, TrendingDown } from "lucide-react";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";

export default function KpiCard({ data, index }) {
  const isPositive = data.change > 0;
  const maxVal = Math.max(...data.sparkline);

  return (
    <Card
      className="flex flex-col gap-4 p-6 animate-slide-up opacity-0"
      style={{
        animationDelay: `${(index + 1) * 0.05}s`,
        animationFillMode: "forwards",
      }}
    >
      <div className="flex items-center justify-between">
        <span
          className="text-xs font-semibold uppercase tracking-[1px]"
          style={{ color: "var(--color-gray-400)" }}
        >
          {data.label}
        </span>
        <span
          className="text-xs font-semibold px-2 py-0.5 flex items-center gap-[3px]"
          style={{
            background: isPositive ? "var(--color-status-good-bg)" : "var(--color-status-critical-bg)",
            color: isPositive ? "var(--color-status-good)" : "var(--color-status-critical)",
          }}
        >
          {isPositive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
          {isPositive ? "+" : ""}{data.change}%
        </span>
      </div>

      <div
        className="text-[32px] font-bold leading-none tracking-tight"
        style={{ fontFamily: "var(--font-display)", color: "var(--color-gray-800)" }}
      >
        {data.value}
      </div>

      <div className="text-[11px]" style={{ color: "var(--color-gray-300)" }}>
        {data.period}
      </div>

      <div className="h-9 flex items-end gap-[3px] mt-auto">
        {data.sparkline.map((val, i) => (
          <div
            key={i}
            className="flex-1 min-h-1 transition-colors duration-200"
            style={{
              height: `${(val / maxVal) * 100}%`,
              background:
                i === data.sparkline.length - 1
                  ? "var(--color-primary)"
                  : "var(--color-sand-200)",
            }}
          />
        ))}
      </div>
    </Card>
  );
}
