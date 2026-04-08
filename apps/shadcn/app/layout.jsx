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
        <div
          className="min-h-screen relative"
          style={{
            background: `
              repeating-linear-gradient(90deg, transparent, transparent 120px, rgba(212,199,176,0.07) 120px, rgba(212,199,176,0.07) 121px),
              repeating-linear-gradient(0deg, transparent, transparent 240px, rgba(212,199,176,0.05) 240px, rgba(212,199,176,0.05) 241px),
              linear-gradient(180deg, var(--color-sand-50) 0%, var(--color-sand-100) 100%)
            `,
          }}
        >
          <Sidebar activePage={activePage} onNavigate={setActivePage} />
          <main className="ml-[260px] min-h-screen">
            <TopBar activePage={activePage} />
            {activePage === "dashboard" && <DashboardContent />}
            {activePage === "products" && <ProductsPage />}
            {activePage === "team" && (
              <div className="p-12 animate-slide-up" style={{ animationFillMode: "forwards" }}>
                <p>Team management coming soon.</p>
              </div>
            )}
            {activePage === "notifications" && (
              <div className="p-12 animate-slide-up" style={{ animationFillMode: "forwards" }}>
                <p>Notifications coming soon.</p>
              </div>
            )}
            {activePage === "settings" && (
              <div className="p-12 animate-slide-up" style={{ animationFillMode: "forwards" }}>
                <p>Settings page content goes here.</p>
              </div>
            )}
          </main>
        </div>
      </body>
    </html>
  );
}
