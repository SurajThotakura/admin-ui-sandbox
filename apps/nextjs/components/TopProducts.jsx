"use client";

import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { topProducts } from "../data/mockData";

function TrendIcon({ trend }) {
  const style = { display: "inline-flex", marginLeft: 6 };
  if (trend === "up") return <span style={{ ...style, color: "var(--color-status-good)" }}><TrendingUp size={13} /></span>;
  if (trend === "down") return <span style={{ ...style, color: "var(--color-status-critical)" }}><TrendingDown size={13} /></span>;
  return <span style={{ ...style, color: "var(--color-gray-300)" }}><Minus size={13} /></span>;
}

export default function TopProducts() {
  return (
    <div className="card" style={{ animation: "slideUp 0.5s ease forwards", animationDelay: "0.3s", opacity: 0 }}>
      <div className="card-header">
        <div>
          <div className="card-title">Top Products</div>
          <div className="card-subtitle">By page views this week</div>
        </div>
        <button className="card-action">All products</button>
      </div>
      <div style={{ padding: "16px 24px 24px" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={{ fontSize: 10, fontWeight: 600, textTransform: "uppercase", letterSpacing: "1.5px", color: "var(--color-gray-300)", textAlign: "left", padding: "8px 0", borderBottom: "1px solid var(--color-sand-100)", width: 36 }}>#</th>
              <th style={{ fontSize: 10, fontWeight: 600, textTransform: "uppercase", letterSpacing: "1.5px", color: "var(--color-gray-300)", textAlign: "left", padding: "8px 0", borderBottom: "1px solid var(--color-sand-100)" }}>Product</th>
              <th style={{ fontSize: 10, fontWeight: 600, textTransform: "uppercase", letterSpacing: "1.5px", color: "var(--color-gray-300)", textAlign: "left", padding: "8px 0", borderBottom: "1px solid var(--color-sand-100)" }}>Views</th>
              <th style={{ fontSize: 10, fontWeight: 600, textTransform: "uppercase", letterSpacing: "1.5px", color: "var(--color-gray-300)", textAlign: "right", padding: "8px 0", borderBottom: "1px solid var(--color-sand-100)" }}>Conv. Rate</th>
            </tr>
          </thead>
          <tbody>
            {topProducts.map((p) => (
              <tr
                key={p.rank}
                style={{ transition: "background 0.15s" }}
                onMouseEnter={(e) => e.currentTarget.style.background = "var(--color-sand-50)"}
                onMouseLeave={(e) => e.currentTarget.style.background = ""}
              >
                <td style={{ padding: "10px 0", borderBottom: "1px solid var(--color-sand-100)", fontSize: 13, verticalAlign: "middle" }}>
                  <div
                    style={{
                      width: 24,
                      height: 24,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontFamily: "var(--font-display)",
                      fontWeight: 700,
                      fontSize: 11,
                      background: p.rank <= 3 ? "var(--color-accent-pale)" : "var(--color-sand-100)",
                      color: p.rank <= 3 ? "var(--color-gray-700)" : "var(--color-gray-400)",
                    }}
                  >
                    {p.rank}
                  </div>
                </td>
                <td style={{ padding: "10px 0", borderBottom: "1px solid var(--color-sand-100)", verticalAlign: "middle" }}>
                  <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, color: "var(--color-gray-800)", fontSize: 14 }}>
                    {p.name}
                  </div>
                  <div style={{ fontSize: 11, color: "var(--color-gray-300)", marginTop: 1 }}>{p.category}</div>
                </td>
                <td style={{ padding: "10px 0", borderBottom: "1px solid var(--color-sand-100)", fontSize: 13, fontVariantNumeric: "tabular-nums", verticalAlign: "middle" }}>
                  {p.views}
                </td>
                <td style={{ padding: "10px 0", borderBottom: "1px solid var(--color-sand-100)", textAlign: "right", fontWeight: 600, fontVariantNumeric: "tabular-nums", fontSize: 13, verticalAlign: "middle" }}>
                  {p.conversions}
                  <TrendIcon trend={p.trend} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
