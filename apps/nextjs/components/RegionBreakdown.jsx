"use client";

import { regionData } from "../data/mockData";

export default function RegionBreakdown() {
  return (
    <div
      className="bg-white relative overflow-hidden animate-slide-up opacity-0"
      style={{
        boxShadow: "0 0 0 1px var(--color-sand-200)",
        animationDelay: "0.35s",
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
            Revenue by Region
          </div>
          <div className="text-xs mt-0.5" style={{ color: "var(--color-gray-300)" }}>
            Distribution across regions
          </div>
        </div>
        <button
          className="text-xs font-semibold px-2.5 py-1 transition-colors duration-150 cursor-pointer border-none bg-transparent"
          style={{ color: "var(--color-primary)", fontFamily: "var(--font-body)" }}
        >
          All markets
        </button>
      </div>

      <div className="flex flex-col gap-2 px-6 pb-6 pt-4">
        {regionData.map((r, i) => (
          <div key={i} className="flex items-center gap-4">
            <span
              className="text-[13px] font-medium w-[120px] shrink-0"
              style={{ color: "var(--color-gray-600)" }}
            >
              {r.region}
            </span>
            <div className="flex-1 h-[22px] overflow-hidden" style={{ background: "var(--color-sand-100)" }}>
              <div
                className="h-full transition-[width] duration-1000"
                style={{
                  width: `${r.share * 4}%`,
                  background: i === 0 ? "var(--color-accent)" : "var(--color-primary)",
                }}
              />
            </div>
            <span
              className="text-xs font-bold w-10 text-right tabular-nums"
              style={{ fontFamily: "var(--font-display)", color: "var(--color-gray-500)" }}
            >
              {r.share}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
