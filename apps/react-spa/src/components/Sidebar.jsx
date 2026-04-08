import {
  LayoutDashboard,
  Package,
  Settings,
  Users,
  Bell,
} from 'lucide-react';

const navItems = [
  { section: 'Overview' },
  { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { section: 'Management' },
  { id: 'products', icon: Package, label: 'Products' },
  { section: 'System' },
  { id: 'team', icon: Users, label: 'Team' },
  { id: 'notifications', icon: Bell, label: 'Notifications' },
  { id: 'settings', icon: Settings, label: 'Settings' },
];

export default function Sidebar({ activePage, onNavigate }) {
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <div className="sidebar-logo-mark">AS</div>
        <div className="sidebar-logo-text">
          <span>Admin Sandbox</span>
          <span>Admin Portal</span>
        </div>
      </div>

      <nav className="sidebar-nav">
        {navItems.map((item, i) => {
          if (item.section) {
            return (
              <div key={i} className="sidebar-section-label">
                {item.section}
              </div>
            );
          }
          const Icon = item.icon;
          const isActive = activePage === item.id;
          return (
            <button
              key={item.id}
              className={`sidebar-link${isActive ? ' active' : ''}`}
              onClick={() => onNavigate(item.id)}
            >
              <Icon />
              {item.label}
            </button>
          );
        })}
      </nav>

      <div className="sidebar-footer">
        <div className="sidebar-avatar">JD</div>
        <div className="sidebar-user-info">
          <span>Jane Doe</span>
          <span>jane@acme.io</span>
        </div>
      </div>
    </aside>
  );
}
