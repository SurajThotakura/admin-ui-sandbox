"use client";

import { useState } from "react";
import "./globals.css";
import Sidebar from "../components/Sidebar";
import TopBar from "../components/TopBar";
import DashboardContent from "../components/DashboardContent";
import ProductsPage from "../components/ProductsPage";

export default function RootLayout({ children }) {
  const [activePage, setActivePage] = useState("dashboard");

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
      </body>
    </html>
  );
}
