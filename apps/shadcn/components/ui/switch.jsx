"use client";

export function Switch({ checked, onCheckedChange, label }) {
  return (
    <label className="inline-flex items-center gap-2 cursor-pointer">
      <div
        className="w-9 h-5 relative shrink-0 transition-colors duration-200"
        style={{ background: checked ? "var(--color-primary)" : "var(--color-sand-300)" }}
        onClick={() => onCheckedChange?.(!checked)}
        role="switch"
        aria-checked={checked}
      >
        <div
          className="absolute top-0.5 left-0.5 w-4 h-4 bg-white transition-transform duration-200"
          style={{
            transform: checked ? "translateX(16px)" : "translateX(0)",
            transitionTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)",
          }}
        />
      </div>
      {label && (
        <span
          className="text-[13px] font-medium select-none whitespace-nowrap"
          style={{ color: "var(--color-gray-600)" }}
        >
          {label}
        </span>
      )}
    </label>
  );
}
