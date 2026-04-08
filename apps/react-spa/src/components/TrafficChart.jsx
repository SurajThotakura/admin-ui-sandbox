import { trafficData } from '../data/mockData';

export default function TrafficChart() {
  const maxPageViews = Math.max(...trafficData.map((d) => d.pageViews));

  return (
    <div className="card animate-in stagger-5">
      <div className="card-header">
        <div>
          <div className="card-title">Weekly Activity</div>
          <div className="card-subtitle">Users & page views — last 7 days</div>
        </div>
        <button className="card-action">View details</button>
      </div>
      <div className="traffic-chart">
        <div className="chart-bars">
          {trafficData.map((d, i) => (
            <div key={i} className="chart-bar-group">
              <div className="chart-bar-stack">
                <div
                  className="chart-bar visitors"
                  style={{ height: `${(d.visitors / maxPageViews) * 100}%` }}
                  title={`${(d.visitors / 1000).toFixed(0)}K visitors`}
                />
                <div
                  className="chart-bar pageviews"
                  style={{ height: `${(d.pageViews / maxPageViews) * 100}%` }}
                  title={`${(d.pageViews / 1000).toFixed(0)}K page views`}
                />
              </div>
              <span className="chart-bar-label">{d.day}</span>
            </div>
          ))}
        </div>
        <div className="chart-legend">
          <div className="chart-legend-item">
            <div className="chart-legend-dot" style={{ background: 'var(--primary)' }} />
            Visitors
          </div>
          <div className="chart-legend-item">
            <div className="chart-legend-dot" style={{ background: 'var(--accent)' }} />
            Page Views
          </div>
        </div>
      </div>
    </div>
  );
}
