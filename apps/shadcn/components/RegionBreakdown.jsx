"use client";

import { regionData } from "../data/mockData";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardAction } from "./ui/card";

export default function RegionBreakdown() {
  return (
    <Card className="animate-slide-up opacity-0" style={{ animationDelay: "0.35s", animationFillMode: "forwards" }}>
      <CardHeader>
        <div>
          <CardTitle>Revenue by Region</CardTitle>
          <CardDescription>Distribution across regions</CardDescription>
        </div>
        <CardAction>All markets</CardAction>
      </CardHeader>

      <CardContent className="flex flex-col gap-2 px-6 pb-6">
        {regionData.map((r, i) => (
          <div key={i} className="flex items-center gap-4">
            <span className="text-[13px] font-medium w-[120px] shrink-0" style={{ color: "var(--color-gray-600)" }}>
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
      </CardContent>
    </Card>
  );
}
