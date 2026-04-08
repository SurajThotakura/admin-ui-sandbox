"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

export function Dialog({ open, onOpenChange, children }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  if (!open || !mounted) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[300] flex items-center justify-center animate-fade-in"
      style={{ background: "rgba(26, 23, 20, 0.45)" }}
      onClick={() => onOpenChange(false)}
    >
      <div
        className="bg-white w-full max-w-[520px] max-h-[calc(100vh-80px)] overflow-y-auto animate-slide-up"
        style={{ boxShadow: "0 0 0 1px var(--color-sand-200)" }}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>,
    document.body
  );
}

export function DialogHeader({ children, onClose }) {
  return (
    <div
      className="flex items-center justify-between p-6 border-b"
      style={{ borderColor: "var(--color-sand-100)" }}
    >
      {children}
      {onClose && (
        <button
          type="button"
          className="flex items-center justify-center w-8 h-8 border-none bg-transparent cursor-pointer transition-all duration-150"
          style={{ color: "var(--color-gray-400)" }}
          onClick={onClose}
        >
          <X size={18} />
        </button>
      )}
    </div>
  );
}

export function DialogTitle({ children }) {
  return (
    <h2
      className="text-lg font-bold tracking-tight"
      style={{ fontFamily: "var(--font-display)", color: "var(--color-gray-800)" }}
    >
      {children}
    </h2>
  );
}

export function DialogBody({ children }) {
  return (
    <div className="flex flex-col gap-4 p-6">
      {children}
    </div>
  );
}

export function DialogFooter({ children }) {
  return (
    <div
      className="flex items-center justify-end gap-2 px-6 py-4 border-t"
      style={{ borderColor: "var(--color-sand-100)" }}
    >
      {children}
    </div>
  );
}
