"use client";

import { Check } from "lucide-react";

export function Checkbox({ checked, onChange, indeterminate }) {
  return (
    <div
      className="w-[18px] h-[18px] flex items-center justify-center cursor-pointer shrink-0 transition-all duration-150 border-2"
      style={{
        background: checked ? "var(--color-primary)" : "white",
        borderColor: checked
          ? "var(--color-primary)"
          : indeterminate
          ? "var(--color-primary)"
          : "var(--color-sand-300)",
        color: "white",
      }}
      onClick={onChange}
      role="checkbox"
      aria-checked={indeterminate ? "mixed" : checked}
    >
      {checked && <Check size={12} strokeWidth={3} />}
      {indeterminate && !checked && (
        <div className="w-2 h-0.5" style={{ background: "var(--color-primary)" }} />
      )}
    </div>
  );
}
