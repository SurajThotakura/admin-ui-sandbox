"use client";

import {
  LayoutDashboard,
  Package,
  Settings,
  Users,
  Bell,
} from "lucide-react";
import { Button } from "./ui/button";

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
  return (
    <aside
      className="fixed top-0 left-0 bottom-0 w-[260px] flex flex-col overflow-hidden z-[100]"
      style={{ background: "var(--color-primary-deep)", color: "white" }}
    >
      {/* Stripe overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "repeating-linear-gradient(0deg, transparent, transparent 48px, rgba(255,255,255,0.02) 48px, rgba(255,255,255,0.02) 49px)",
        }}
      />

      {/* Logo */}
      <div className="relative flex items-center gap-4 px-6 py-6 border-b border-white/[0.08]">
        <div
          className="w-[42px] h-[42px] flex items-center justify-center shrink-0 text-lg font-extrabold tracking-tight"
          style={{
            background: "var(--color-accent)",
            color: "var(--color-primary-deep)",
            fontFamily: "var(--font-display)",
          }}
        >
          AS
        </div>
        <div className="flex flex-col">
          <span
            className="text-[17px] font-bold leading-tight tracking-wide"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Admin Sandbox
          </span>
          <span className="text-[11px] opacity-50 uppercase tracking-[1.5px] mt-0.5">
            Admin Portal
          </span>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 flex flex-col gap-0.5 p-4 px-2 overflow-y-auto">
        {navItems.map((item, i) => {
          if (item.section) {
            return (
              <div
                key={i}
                className="text-[10px] uppercase tracking-[2px] opacity-35 font-semibold px-4 pt-4 pb-2"
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
              className={`
                relative flex items-center gap-4 w-full text-left px-4 py-2.5
                text-sm font-medium cursor-pointer transition-all duration-150
                border-none bg-transparent
                ${isActive ? "text-white bg-[rgba(255,219,0,0.12)]" : "text-white/65 hover:text-white hover:bg-white/[0.08]"}
              `}
              style={{ fontFamily: "var(--font-body)" }}
            >
              {isActive && (
                <div
                  className="absolute left-0 top-0 bottom-0 w-1"
                  style={{ background: "var(--color-accent)" }}
                />
              )}
              <Icon className="w-[18px] h-[18px] shrink-0" style={{ opacity: isActive ? 1 : 0.8 }} />
              {item.label}
            </button>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="relative flex items-center gap-4 px-6 py-4 border-t border-white/[0.08]">
        <div
          className="w-[34px] h-[34px] flex items-center justify-center shrink-0 text-[13px] font-bold bg-white/12"
          style={{ color: "var(--color-accent)", fontFamily: "var(--font-display)" }}
        >
          JD
        </div>
        <div className="flex flex-col min-w-0">
          <span className="text-[13px] font-semibold text-white truncate">Jane Doe</span>
          <span className="text-[11px] opacity-45">jane@acme.io</span>
        </div>
      </div>
    </aside>
  );
}
