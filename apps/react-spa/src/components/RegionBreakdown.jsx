import { regionData } from '../data/mockData';

export default function RegionBreakdown() {
  return (
    <div className="card animate-in stagger-7">
      <div className="card-header">
        <div>
          <div className="card-title">Revenue by Region</div>
          <div className="card-subtitle">Distribution across regions</div>
        </div>
        <button className="card-action">All markets</button>
      </div>
      <div className="region-list">
        {regionData.map((r, i) => (
          <div key={i} className="region-item">
            <span className="region-name">{r.region}</span>
            <div className="region-bar-track">
              <div
                className="region-bar-fill"
                style={{ width: `${r.share * 4}%` }}
              />
            </div>
            <span className="region-share">{r.share}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}
