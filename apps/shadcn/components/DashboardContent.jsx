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
    <div className="dashboard">
      <div className="kpi-row">
        {kpiCards.map((card, i) => (
          <KpiCard key={card.id} data={card} index={i} />
        ))}
      </div>
      <div className="content-row">
        <TrafficChart />
        <SiteHealth />
      </div>
      <div className="content-row-wide">
        <TopProducts />
        <RegionBreakdown />
      </div>
      <RecentAlerts />
    </div>
  );
}
