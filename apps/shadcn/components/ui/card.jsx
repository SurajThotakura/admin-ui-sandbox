import { cn } from "../../lib/utils";

export function Card({ className, children, ...props }) {
  return (
    <div
      className={cn("bg-white relative overflow-hidden group", className)}
      style={{ boxShadow: "0 0 0 1px var(--color-sand-200)" }}
      {...props}
    >
      {/* Hover accent bar */}
      <div
        className="absolute top-0 left-0 bottom-0 w-[3px] opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10"
        style={{ background: "var(--color-accent)" }}
      />
      {children}
    </div>
  );
}

export function CardHeader({ className, children, ...props }) {
  return (
    <div className={cn("flex items-center justify-between p-6 pb-0", className)} {...props}>
      {children}
    </div>
  );
}

export function CardTitle({ className, children, ...props }) {
  return (
    <div
      className={cn("text-base font-bold tracking-tight", className)}
      style={{ fontFamily: "var(--font-display)", color: "var(--color-gray-800)" }}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardDescription({ className, children, ...props }) {
  return (
    <div
      className={cn("text-xs mt-0.5", className)}
      style={{ color: "var(--color-gray-300)" }}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardContent({ className, children, ...props }) {
  return (
    <div className={cn("p-6 pt-4", className)} {...props}>
      {children}
    </div>
  );
}

export function CardAction({ className, children, ...props }) {
  return (
    <button
      className={cn(
        "text-xs font-semibold px-2.5 py-1 transition-colors duration-150 cursor-pointer border-none bg-transparent",
        className
      )}
      style={{ color: "var(--color-primary)", fontFamily: "var(--font-body)" }}
      {...props}
    >
      {children}
    </button>
  );
}
