import { CalendarDays } from 'lucide-react';

const pageInfo = {
  dashboard: {
    title: 'Dashboard',
    subtitle: 'Overview of platform activity and system health',
  },
  products: {
    title: 'Products',
    subtitle: 'Manage catalog listings, pricing, and availability',
  },
  team: {
    title: 'Team',
    subtitle: 'Manage team members, roles, and permissions',
  },
  notifications: {
    title: 'Notifications',
    subtitle: 'System alerts and activity feed',
  },
  settings: {
    title: 'Settings',
    subtitle: 'Organization preferences and configuration',
  },
};

export default function TopBar({ activePage }) {
  const info = pageInfo[activePage] || pageInfo.dashboard;

  return (
    <header className="top-bar">
      <div className="top-bar-left">
        <h1>{info.title}</h1>
        <p>{info.subtitle}</p>
      </div>
      <div className="top-bar-right">
        <div className="top-bar-badge">
          <span className="pulse-dot" />
          All Systems Operational
        </div>
        {activePage === 'dashboard' && (
          <button className="top-bar-period">
            <CalendarDays />
            Last 7 days
          </button>
        )}
      </div>
    </header>
  );
}
