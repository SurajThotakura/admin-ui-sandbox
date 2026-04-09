"use client";

import { TrendingUp, TrendingDown } from "lucide-react";

export default function KpiCard({ data, index }) {
  const isPositive = data.change > 0;
  const maxVal = Math.max(...data.sparkline);

  return (
    <div
      className="card"
      style={{
        padding: 24,
        display: "flex",
        flexDirection: "column",
        gap: 16,
        animation: `slideUp 0.5s ease forwards`,
        animationDelay: `${(index + 1) * 0.05}s`,
        opacity: 0,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span
          style={{
            fontSize: 12,
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: 1,
            color: "var(--color-gray-400)",
          }}
        >
          {data.label}
        </span>
        <span
          style={{
            fontSize: 12,
            fontWeight: 600,
            padding: "2px 8px",
            display: "flex",
            alignItems: "center",
            gap: 3,
            background: isPositive ? "var(--color-status-good-bg)" : "var(--color-status-critical-bg)",
            color: isPositive ? "var(--color-status-good)" : "var(--color-status-critical)",
          }}
        >
          {isPositive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
          {isPositive ? "+" : ""}{data.change}%
        </span>
      </div>

      <div
        style={{
          fontFamily: "var(--font-display)",
          fontSize: 32,
          fontWeight: 700,
          color: "var(--color-gray-800)",
          letterSpacing: "-1px",
          lineHeight: 1,
        }}
      >
        {data.value}
      </div>

      <div style={{ fontSize: 11, color: "var(--color-gray-300)" }}>{data.period}</div>

      <div style={{ height: 36, display: "flex", alignItems: "flex-end", gap: 3, marginTop: "auto" }}>
        {data.sparkline.map((val, i) => (
          <div
            key={i}
            style={{
              flex: 1,
              minHeight: 4,
              height: `${(val / maxVal) * 100}%`,
              background: i === data.sparkline.length - 1 ? "var(--color-primary)" : "var(--color-sand-200)",
              transition: "background 0.2s",
            }}
          />
        ))}
      </div>
    </div>
  );
}
