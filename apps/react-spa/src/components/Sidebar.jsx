import { useAuth0 } from '@auth0/auth0-react';
import {
  LayoutDashboard,
  Package,
  Settings,
  Users,
  Bell,
  LogIn,
  LogOut,
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
  const { isAuthenticated, isLoading, user, loginWithRedirect, logout } = useAuth0();

  const initials = user?.name
    ? user.name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)
    : '?';

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
        {isLoading ? (
          <span className="sidebar-loading">Loading...</span>
        ) : isAuthenticated && user ? (
          <>
            {user.picture ? (
              <img
                src={user.picture}
                alt={user.name || 'User'}
                className="sidebar-avatar-img"
              />
            ) : (
              <div className="sidebar-avatar">{initials}</div>
            )}
            <div className="sidebar-user-info">
              <span>{user.name || 'User'}</span>
              <span>{user.email}</span>
            </div>
            <button
              onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
              title="Log out"
              className="sidebar-logout-btn"
            >
              <LogOut size={16} />
            </button>
          </>
        ) : (
          <button
            onClick={() => loginWithRedirect()}
            className="sidebar-login-btn"
          >
            <LogIn size={18} />
            Sign in
          </button>
        )}
      </div>
    </aside>
  );
}
