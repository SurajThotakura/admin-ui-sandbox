"use client";

import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import "./globals.css";
import Auth0ProviderWrapper from "../components/Auth0ProviderWrapper";
import Sidebar from "../components/Sidebar";
import TopBar from "../components/TopBar";
import DashboardContent from "../components/DashboardContent";
import ProductsPage from "../components/ProductsPage";

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

function AuthenticatedApp() {
  const [activePage, setActivePage] = useState("dashboard");
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
        {activePage === "dashboard" && <DashboardContent />}
        {activePage === "products" && <ProductsPage />}
        {activePage === "team" && (
          <div style={{ padding: 48, animation: "slideUp 0.4s ease forwards" }}>
            <p>Team management coming soon.</p>
          </div>
        )}
        {activePage === "notifications" && (
          <div style={{ padding: 48, animation: "slideUp 0.4s ease forwards" }}>
            <p>Notifications coming soon.</p>
          </div>
        )}
        {activePage === "settings" && (
          <div style={{ padding: 48, animation: "slideUp 0.4s ease forwards" }}>
            <p>Settings page content goes here.</p>
          </div>
        )}
      </main>
    </div>
  );
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,200..800&family=Instrument+Sans:ital,wght@0,400..700;1,400..700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Auth0ProviderWrapper>
          <AuthenticatedApp />
        </Auth0ProviderWrapper>
      </body>
    </html>
  );
}
