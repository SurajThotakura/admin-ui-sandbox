import { recentAlerts } from '../data/mockData';

export default function RecentAlerts() {
  return (
    <div className="card animate-in stagger-8">
      <div className="card-header">
        <div>
          <div className="card-title">Recent Alerts</div>
          <div className="card-subtitle">Latest system notifications</div>
        </div>
        <button className="card-action">View all</button>
      </div>
      <div className="alerts-list">
        {recentAlerts.map((a) => (
          <div key={a.id} className="alert-item">
            <div className={`alert-dot ${a.type}`} />
            <div className="alert-content">
              <div className="alert-message">{a.message}</div>
              <div className="alert-time">{a.time}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
