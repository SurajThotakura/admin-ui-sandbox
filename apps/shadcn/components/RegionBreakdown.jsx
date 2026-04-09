"use client";

import { regionData } from "../data/mockData";

export default function RegionBreakdown() {
  return (
    <div className="card" style={{ animation: "slideUp 0.5s ease forwards", animationDelay: "0.35s", opacity: 0 }}>
      <div className="card-header">
        <div>
          <div className="card-title">Revenue by Region</div>
          <div className="card-subtitle">Distribution across regions</div>
        </div>
        <button className="card-action">All markets</button>
      </div>
      <div style={{ padding: "16px 24px 24px", display: "flex", flexDirection: "column", gap: 8 }}>
        {regionData.map((r, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <span style={{ fontSize: 13, fontWeight: 500, color: "var(--color-gray-600)", width: 120, flexShrink: 0 }}>{r.region}</span>
            <div style={{ flex: 1, height: 22, background: "var(--color-sand-100)", overflow: "hidden", position: "relative" }}>
              <div style={{ height: "100%", width: `${r.share * 4}%`, background: i === 0 ? "var(--color-accent)" : "var(--color-primary)", transition: "width 1s ease" }} />
            </div>
            <span style={{ fontSize: 12, fontWeight: 700, fontFamily: "var(--font-display)", color: "var(--color-gray-500)", width: 40, textAlign: "right", fontVariantNumeric: "tabular-nums" }}>{r.share}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}
