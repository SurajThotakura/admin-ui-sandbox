"use client";

import { trafficData } from "../data/mockData";

export default function TrafficChart() {
  const maxPageViews = Math.max(...trafficData.map((d) => d.pageViews));

  return (
    <div className="card" style={{ animation: "slideUp 0.5s ease forwards", animationDelay: "0.25s", opacity: 0 }}>
      <div className="card-header">
        <div>
          <div className="card-title">Weekly Activity</div>
          <div className="card-subtitle">Users & page views — last 7 days</div>
        </div>
        <button className="card-action">View details</button>
      </div>
      <div style={{ padding: "16px 24px 24px" }}>
        <div style={{ display: "flex", alignItems: "flex-end", gap: 8, height: 180, paddingTop: 16 }}>
          {trafficData.map((d, i) => (
            <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 8, height: "100%" }}>
              <div style={{ flex: 1, width: "100%", display: "flex", alignItems: "flex-end", gap: 3, justifyContent: "center" }}>
                <div
                  style={{
                    width: 16,
                    height: `${(d.visitors / maxPageViews) * 100}%`,
                    background: "var(--color-primary)",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                  }}
                  title={`${(d.visitors / 1000).toFixed(0)}K visitors`}
                />
                <div
                  style={{
                    width: 16,
                    height: `${(d.pageViews / maxPageViews) * 100}%`,
                    background: "var(--color-accent)",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                  }}
                  title={`${(d.pageViews / 1000).toFixed(0)}K page views`}
                />
              </div>
              <span style={{ fontSize: 11, fontWeight: 600, color: "var(--color-gray-400)", textAlign: "center" }}>
                {d.day}
              </span>
            </div>
          ))}
        </div>
        <div
          style={{
            display: "flex",
            gap: 24,
            paddingTop: 16,
            borderTop: "1px solid var(--color-sand-100)",
            marginTop: 16,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: "var(--color-gray-500)" }}>
            <div style={{ width: 10, height: 10, background: "var(--color-primary)" }} />
            Visitors
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: "var(--color-gray-500)" }}>
            <div style={{ width: 10, height: 10, background: "var(--color-accent)" }} />
            Page Views
          </div>
        </div>
      </div>
    </div>
  );
}
