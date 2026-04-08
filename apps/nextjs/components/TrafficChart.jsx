"use client";

import { trafficData } from "../data/mockData";

export default function TrafficChart() {
  const maxPageViews = Math.max(...trafficData.map((d) => d.pageViews));

  return (
    <div
      className="bg-white relative overflow-hidden animate-slide-up opacity-0"
      style={{
        boxShadow: "0 0 0 1px var(--color-sand-200)",
        animationDelay: "0.25s",
        animationFillMode: "forwards",
      }}
    >
      {/* Hover accent bar */}
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
            Weekly Activity
          </div>
          <div className="text-xs mt-0.5" style={{ color: "var(--color-gray-300)" }}>
            Users & page views — last 7 days
          </div>
        </div>
        <button
          className="text-xs font-semibold px-2.5 py-1 transition-colors duration-150 cursor-pointer border-none bg-transparent hover:bg-primary-light"
          style={{ color: "var(--color-primary)", fontFamily: "var(--font-body)" }}
        >
          View details
        </button>
      </div>

      <div className="p-6 pt-4">
        <div className="flex items-end gap-2 h-[180px] pt-4">
          {trafficData.map((d, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-2 h-full">
              <div className="flex-1 w-full flex items-end gap-[3px] justify-center">
                <div
                  className="w-4 cursor-pointer transition-all duration-300 hover:brightness-110"
                  style={{
                    height: `${(d.visitors / maxPageViews) * 100}%`,
                    background: "var(--color-primary)",
                  }}
                  title={`${(d.visitors / 1000).toFixed(0)}K visitors`}
                />
                <div
                  className="w-4 cursor-pointer transition-all duration-300 hover:brightness-110"
                  style={{
                    height: `${(d.pageViews / maxPageViews) * 100}%`,
                    background: "var(--color-accent)",
                  }}
                  title={`${(d.pageViews / 1000).toFixed(0)}K page views`}
                />
              </div>
              <span
                className="text-[11px] font-semibold text-center"
                style={{ color: "var(--color-gray-400)" }}
              >
                {d.day}
              </span>
            </div>
          ))}
        </div>

        <div
          className="flex gap-6 pt-4 mt-4 border-t"
          style={{ borderColor: "var(--color-sand-100)" }}
        >
          <div className="flex items-center gap-2 text-xs" style={{ color: "var(--color-gray-500)" }}>
            <div className="w-2.5 h-2.5" style={{ background: "var(--color-primary)" }} />
            Visitors
          </div>
          <div className="flex items-center gap-2 text-xs" style={{ color: "var(--color-gray-500)" }}>
            <div className="w-2.5 h-2.5" style={{ background: "var(--color-accent)" }} />
            Page Views
          </div>
        </div>
      </div>
    </div>
  );
}
