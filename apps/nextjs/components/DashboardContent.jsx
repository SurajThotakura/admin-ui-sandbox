"use client";

import { kpiCards } from "../data/mockData";
import KpiCard from "./KpiCard";
import TrafficChart from "./TrafficChart";
import SiteHealth from "./SiteHealth";
import TopProducts from "./TopProducts";
import RegionBreakdown from "./RegionBreakdown";
import RecentAlerts from "./RecentAlerts";

export default function DashboardContent() {
  return (
    <div className="flex flex-col gap-6 p-12">
      <div className="grid grid-cols-4 gap-4">
        {kpiCards.map((card, i) => (
          <KpiCard key={card.id} data={card} index={i} />
        ))}
      </div>
      <div className="grid grid-cols-2 gap-4">
        <TrafficChart />
        <SiteHealth />
      </div>
      <div className="grid grid-cols-[2fr_1fr] gap-4">
        <TopProducts />
        <RegionBreakdown />
      </div>
      <RecentAlerts />
    </div>
  );
}
