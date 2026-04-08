"use client";

import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { topProducts } from "../data/mockData";

function TrendIcon({ trend }) {
  if (trend === "up")
    return (
      <span className="inline-flex ml-1.5" style={{ color: "var(--color-status-good)" }}>
        <TrendingUp size={13} />
      </span>
    );
  if (trend === "down")
    return (
      <span className="inline-flex ml-1.5" style={{ color: "var(--color-status-critical)" }}>
        <TrendingDown size={13} />
      </span>
    );
  return (
    <span className="inline-flex ml-1.5" style={{ color: "var(--color-gray-300)" }}>
      <Minus size={13} />
    </span>
  );
}

export default function TopProducts() {
  return (
    <div
      className="bg-white relative overflow-hidden animate-slide-up opacity-0"
      style={{
        boxShadow: "0 0 0 1px var(--color-sand-200)",
        animationDelay: "0.3s",
        animationFillMode: "forwards",
      }}
    >
      <div
        className="absolute top-0 left-0 bottom-0 w-[3px] opacity-0 hover:opacity-100 transition-opacity duration-200 pointer-events-none"
        style={{ background: "var(--color-accent)" }}
      />

      <div className="flex items-center justify-between p-6 pb-0">
        <div>
          <div
            className="text-base font-bold tracking-tight"
            style={{ fontFamily: "var(--font-display)", color: "var(--color-gray-800)" }}
          >
            Top Products
          </div>
          <div className="text-xs mt-0.5" style={{ color: "var(--color-gray-300)" }}>
            By page views this week
          </div>
        </div>
        <button
          className="text-xs font-semibold px-2.5 py-1 transition-colors duration-150 cursor-pointer border-none bg-transparent"
          style={{ color: "var(--color-primary)", fontFamily: "var(--font-body)" }}
        >
          All products
        </button>
      </div>

      <div className="px-6 pb-6 pt-4">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th
                className="text-[10px] font-semibold uppercase tracking-[1.5px] text-left py-2 border-b"
                style={{ color: "var(--color-gray-300)", borderColor: "var(--color-sand-100)", width: 36 }}
              >
                #
              </th>
              <th
                className="text-[10px] font-semibold uppercase tracking-[1.5px] text-left py-2 border-b"
                style={{ color: "var(--color-gray-300)", borderColor: "var(--color-sand-100)" }}
              >
                Product
              </th>
              <th
                className="text-[10px] font-semibold uppercase tracking-[1.5px] text-left py-2 border-b"
                style={{ color: "var(--color-gray-300)", borderColor: "var(--color-sand-100)" }}
              >
                Views
              </th>
              <th
                className="text-[10px] font-semibold uppercase tracking-[1.5px] text-right py-2 border-b"
                style={{ color: "var(--color-gray-300)", borderColor: "var(--color-sand-100)" }}
              >
                Conv. Rate
              </th>
            </tr>
          </thead>
          <tbody>
            {topProducts.map((p) => (
              <tr
                key={p.rank}
                className="transition-colors duration-150 hover:bg-sand-50"
              >
                <td className="py-2.5 border-b text-[13px]" style={{ borderColor: "var(--color-sand-100)" }}>
                  <div
                    className="w-6 h-6 flex items-center justify-center text-[11px] font-bold"
                    style={{
                      fontFamily: "var(--font-display)",
                      background: p.rank <= 3 ? "var(--color-accent-pale)" : "var(--color-sand-100)",
                      color: p.rank <= 3 ? "var(--color-gray-700)" : "var(--color-gray-400)",
                    }}
                  >
                    {p.rank}
                  </div>
                </td>
                <td className="py-2.5 border-b" style={{ borderColor: "var(--color-sand-100)" }}>
                  <div
                    className="text-sm font-bold"
                    style={{ fontFamily: "var(--font-display)", color: "var(--color-gray-800)" }}
                  >
                    {p.name}
                  </div>
                  <div className="text-[11px] mt-px" style={{ color: "var(--color-gray-300)" }}>
                    {p.category}
                  </div>
                </td>
                <td
                  className="py-2.5 border-b text-[13px] tabular-nums"
                  style={{ borderColor: "var(--color-sand-100)" }}
                >
                  {p.views}
                </td>
                <td
                  className="py-2.5 border-b text-right font-semibold tabular-nums text-[13px]"
                  style={{ borderColor: "var(--color-sand-100)" }}
                >
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
