"use client";

import { trafficData } from "../data/mockData";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardAction } from "./ui/card";

export default function TrafficChart() {
  const maxPageViews = Math.max(...trafficData.map((d) => d.pageViews));

  return (
    <Card className="animate-slide-up opacity-0" style={{ animationDelay: "0.25s", animationFillMode: "forwards" }}>
      <CardHeader>
        <div>
          <CardTitle>Weekly Activity</CardTitle>
          <CardDescription>Users & page views — last 7 days</CardDescription>
        </div>
        <CardAction>View details</CardAction>
      </CardHeader>

      <CardContent>
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
              <span className="text-[11px] font-semibold text-center" style={{ color: "var(--color-gray-400)" }}>
                {d.day}
              </span>
            </div>
          ))}
        </div>

        <div className="flex gap-6 pt-4 mt-4 border-t" style={{ borderColor: "var(--color-sand-100)" }}>
          <div className="flex items-center gap-2 text-xs" style={{ color: "var(--color-gray-500)" }}>
            <div className="w-2.5 h-2.5" style={{ background: "var(--color-primary)" }} />
            Visitors
          </div>
          <div className="flex items-center gap-2 text-xs" style={{ color: "var(--color-gray-500)" }}>
            <div className="w-2.5 h-2.5" style={{ background: "var(--color-accent)" }} />
            Page Views
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
