import { siteHealthMetrics } from '../data/mockData';

const barWidths = {
  '99.97%': 99.97,
  '1.8s': 64,
  '0.12%': 96,
  '94.2%': 94.2,
  '142ms': 82,
  '68.4%': 31.6,
};

export default function SiteHealth() {
  return (
    <div className="card animate-in stagger-5">
      <div className="card-header">
        <div>
          <div className="card-title">Site Health</div>
          <div className="card-subtitle">Performance & reliability metrics</div>
        </div>
        <button className="card-action">Details</button>
      </div>
      <div className="health-grid">
        {siteHealthMetrics.map((m, i) => (
          <div key={i} className="health-item">
            <span className="health-item-label">{m.label}</span>
            <span className={`health-item-value ${m.status}`}>{m.value}</span>
            <div className="health-item-bar">
              <div
                className={`health-item-bar-fill ${m.status}`}
                style={{ width: `${barWidths[m.value] || 50}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
