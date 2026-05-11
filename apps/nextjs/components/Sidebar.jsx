"use client";

import { useAuth0 } from "@auth0/auth0-react";
import {
  LayoutDashboard,
  Package,
  Settings,
  Users,
  Bell,
  LogIn,
  LogOut,
} from "lucide-react";

const navItems = [
  { section: "Overview" },
  { id: "dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { section: "Management" },
  { id: "products", icon: Package, label: "Products" },
  { section: "System" },
  { id: "team", icon: Users, label: "Team" },
  { id: "notifications", icon: Bell, label: "Notifications" },
  { id: "settings", icon: Settings, label: "Settings" },
];

export default function Sidebar({ activePage, onNavigate }) {
  const { isAuthenticated, isLoading, user, loginWithRedirect, logout } = useAuth0();

  const initials = user?.name
    ? user.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
    : "?";

  return (
    <aside className="sidebar">
      {/* Stripe overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background:
            "repeating-linear-gradient(0deg, transparent, transparent 48px, rgba(255,255,255,0.02) 48px, rgba(255,255,255,0.02) 49px)",
        }}
      />

      {/* Logo */}
      <div
        style={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          gap: 16,
          padding: 24,
          borderBottom: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <div
          style={{
            width: 42,
            height: 42,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "var(--color-accent)",
            color: "var(--color-primary-deep)",
            fontFamily: "var(--font-display)",
            fontWeight: 800,
            fontSize: 18,
            letterSpacing: "-0.5px",
            flexShrink: 0,
          }}
        >
          AS
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize: 17,
              letterSpacing: "0.5px",
              lineHeight: 1.2,
            }}
          >
            Admin Sandbox
          </span>
          <span
            style={{
              fontSize: 11,
              opacity: 0.5,
              textTransform: "uppercase",
              letterSpacing: "1.5px",
              marginTop: 2,
            }}
          >
            Admin Portal
          </span>
        </div>
      </div>

      {/* Nav */}
      <nav
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          gap: 2,
          padding: "16px 8px",
          overflowY: "auto",
        }}
      >
        {navItems.map((item, i) => {
          if (item.section) {
            return (
              <div
                key={i}
                style={{
                  fontSize: 10,
                  textTransform: "uppercase",
                  letterSpacing: 2,
                  opacity: 0.35,
                  fontWeight: 600,
                  padding: "16px 16px 8px",
                }}
              >
                {item.section}
              </div>
            );
          }
          const Icon = item.icon;
          const isActive = activePage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              style={{
                position: "relative",
                display: "flex",
                alignItems: "center",
                gap: 16,
                width: "100%",
                textAlign: "left",
                padding: "10px 16px",
                fontSize: 14,
                fontWeight: 500,
                color: isActive ? "white" : "rgba(255,255,255,0.65)",
                background: isActive ? "rgba(255,219,0,0.12)" : "transparent",
                border: "none",
                cursor: "pointer",
                transition: "all 0.15s ease",
                fontFamily: "var(--font-body)",
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.color = "white";
                  e.currentTarget.style.background = "rgba(255,255,255,0.08)";
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.color = "rgba(255,255,255,0.65)";
                  e.currentTarget.style.background = "transparent";
                }
              }}
            >
              {isActive && (
                <div
                  style={{
                    position: "absolute",
                    left: 0,
                    top: 0,
                    bottom: 0,
                    width: 4,
                    background: "var(--color-accent)",
                  }}
                />
              )}
              <Icon style={{ width: 18, height: 18, flexShrink: 0, opacity: isActive ? 1 : 0.8 }} />
              {item.label}
            </button>
          );
        })}
      </nav>

      {/* Footer */}
      <div
        style={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          gap: 16,
          padding: "16px 24px",
          borderTop: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        {isLoading ? (
          <span style={{ fontSize: 12, opacity: 0.5 }}>Loading...</span>
        ) : isAuthenticated && user ? (
          <>
            {user.picture ? (
              <img
                src={user.picture}
                alt={user.name || "User"}
                style={{
                  width: 34,
                  height: 34,
                  objectFit: "cover",
                  flexShrink: 0,
                }}
              />
            ) : (
              <div
                style={{
                  width: 34,
                  height: 34,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "rgba(255,255,255,0.12)",
                  fontFamily: "var(--font-display)",
                  fontWeight: 700,
                  fontSize: 13,
                  color: "var(--color-accent)",
                  flexShrink: 0,
                }}
              >
                {initials}
              </div>
            )}
            <div style={{ display: "flex", flexDirection: "column", minWidth: 0, flex: 1 }}>
              <span
                style={{
                  fontSize: 13,
                  fontWeight: 600,
                  color: "white",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {user.name || "User"}
              </span>
              <span style={{ fontSize: 11, opacity: 0.45 }}>{user.email}</span>
            </div>
            <button
              onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
              title="Log out"
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "rgba(255,255,255,0.5)",
                padding: 4,
                display: "flex",
                alignItems: "center",
                flexShrink: 0,
              }}
              onMouseEnter={(e) => { e.currentTarget.style.color = "white"; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(255,255,255,0.5)"; }}
            >
              <LogOut style={{ width: 16, height: 16 }} />
            </button>
          </>
        ) : (
          <button
            onClick={() => loginWithRedirect()}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              width: "100%",
              padding: "8px 0",
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "rgba(255,255,255,0.65)",
              fontSize: 14,
              fontWeight: 500,
              fontFamily: "var(--font-body)",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.color = "white"; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(255,255,255,0.65)"; }}
          >
            <LogIn style={{ width: 18, height: 18 }} />
            Sign in
          </button>
        )}
      </div>
    </aside>
  );
}
