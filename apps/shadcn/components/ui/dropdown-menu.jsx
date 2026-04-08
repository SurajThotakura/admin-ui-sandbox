"use client";

import { useState } from "react";
import { Check, ChevronDown } from "lucide-react";

export function DropdownSelect({ value, options, onChange, placeholder, variant }) {
  const [open, setOpen] = useState(false);
  const isForm = variant === "form";

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={`flex items-center gap-2 border cursor-pointer transition-all duration-150 whitespace-nowrap justify-between ${
          isForm ? "bg-white h-10 w-full" : "min-w-[140px]"
        }`}
        style={{
          padding: "7px 12px",
          background: isForm ? "white" : "var(--color-sand-50)",
          borderColor: "var(--color-sand-200)",
          fontFamily: "var(--font-body)",
          fontSize: "13px",
          fontWeight: 500,
          color: "var(--color-gray-600)",
        }}
      >
        <span style={{ color: !value ? "var(--color-gray-300)" : undefined }}>
          {value || placeholder}
        </span>
        <ChevronDown
          size={14}
          className={`transition-transform duration-200 shrink-0 ${open ? "rotate-180" : ""}`}
          style={{ color: "var(--color-gray-300)" }}
        />
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-[200]" onClick={() => setOpen(false)} />
          <div
            className="absolute top-[calc(100%+4px)] left-0 min-w-full z-[201] p-1 animate-dropdown-in"
            style={{ background: "white", border: "1px solid var(--color-sand-200)" }}
          >
            {options.map((opt) => (
              <button
                key={opt}
                type="button"
                className="flex items-center gap-2 w-full px-2.5 py-2 border-none text-left text-[13px] cursor-pointer whitespace-nowrap transition-colors duration-100"
                style={{
                  background: opt === value ? "var(--color-primary-light)" : "none",
                  color: opt === value ? "var(--color-primary)" : "var(--color-gray-600)",
                  fontFamily: "var(--font-body)",
                  fontWeight: opt === value ? 600 : 400,
                }}
                onClick={() => { onChange(opt); setOpen(false); }}
              >
                {opt}
                {opt === value && <Check size={14} />}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export function ActionMenu({ trigger, items }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <div onClick={() => setOpen(!open)}>{trigger}</div>
      {open && (
        <>
          <div className="fixed inset-0 z-[200]" onClick={() => setOpen(false)} />
          <div
            className="absolute top-[calc(100%+4px)] right-0 min-w-[160px] z-[201] p-1 animate-dropdown-in"
            style={{ background: "white", border: "1px solid var(--color-sand-200)" }}
          >
            {items.map((item, i) => {
              if (item.separator) {
                return <div key={i} className="h-px my-1" style={{ background: "var(--color-sand-100)" }} />;
              }
              return (
                <button
                  key={i}
                  className="flex items-center gap-2 w-full px-2.5 py-2 border-none bg-transparent text-left text-[13px] cursor-pointer whitespace-nowrap transition-colors duration-100"
                  style={{
                    color: item.danger ? "var(--color-status-critical)" : "var(--color-gray-600)",
                    fontFamily: "var(--font-body)",
                  }}
                  onClick={() => { item.onClick?.(); setOpen(false); }}
                >
                  {item.icon && <span style={{ opacity: 0.6 }}>{item.icon}</span>}
                  {item.label}
                </button>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
