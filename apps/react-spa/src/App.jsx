import { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import './styles.css';
import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';
import KpiCard from './components/KpiCard';
import TrafficChart from './components/TrafficChart';
import TopProducts from './components/TopProducts';
import SiteHealth from './components/SiteHealth';
import RegionBreakdown from './components/RegionBreakdown';
import RecentAlerts from './components/RecentAlerts';
import SettingsPage from './components/SettingsPage';
import ProductsPage from './components/ProductsPage';
import TeamPage from './components/TeamPage';
import NotificationsPage from './components/NotificationsPage';
import { kpiCards } from './data/mockData';

function DashboardContent() {
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

function LoginScreen() {
  const { loginWithRedirect } = useAuth0();

  return (
    <div className="auth-login-screen">
      <div className="auth-login-card">
        <div className="auth-login-logo">
          <div className="sidebar-logo-mark">AS</div>
          <div className="auth-login-logo-text">
            <span>Admin Sandbox</span>
            <span>Admin Portal</span>
          </div>
        </div>
        <h1 className="auth-login-title">Sign in to continue</h1>
        <p className="auth-login-message">
          You must be authenticated to access this dashboard.
        </p>
        <button className="auth-login-btn" onClick={() => loginWithRedirect()}>
          Sign In
        </button>
      </div>
    </div>
  );
}

function LoadingScreen() {
  return (
    <div className="auth-login-screen">
      <div className="auth-login-card">
        <div className="auth-login-logo">
          <div className="sidebar-logo-mark">AS</div>
        </div>
        <p className="auth-login-message">Loading...</p>
      </div>
    </div>
  );
}

function App() {
  const [activePage, setActivePage] = useState('dashboard');
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (!isAuthenticated) {
    return <LoginScreen />;
  }

  return (
    <div className="app-wrapper">
      <Sidebar activePage={activePage} onNavigate={setActivePage} />
      <main className="main-content">
        <TopBar activePage={activePage} />
        {activePage === 'dashboard' && <DashboardContent />}
        {activePage === 'products' && <ProductsPage />}
        {activePage === 'team' && <TeamPage />}
        {activePage === 'notifications' && <NotificationsPage />}
        {activePage === 'settings' && <SettingsPage />}
      </main>
    </div>
  );
}

export default App;
