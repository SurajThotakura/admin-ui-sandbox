import { cva } from "class-variance-authority";
import { cn } from "../../lib/utils";

const badgeVariants = cva(
  "inline-block text-[11px] font-semibold px-2.5 py-[3px] capitalize",
  {
    variants: {
      variant: {
        active: "",
        draft: "",
        discontinued: "",
        good: "",
        warning: "",
        critical: "",
        info: "",
      },
    },
    defaultVariants: {
      variant: "active",
    },
  }
);

const variantStyles = {
  active: { background: "var(--color-status-good-bg)", color: "var(--color-status-good)" },
  draft: { background: "var(--color-sand-100)", color: "var(--color-gray-400)" },
  discontinued: { background: "var(--color-status-critical-bg)", color: "var(--color-status-critical)" },
  good: { background: "var(--color-status-good-bg)", color: "var(--color-status-good)" },
  warning: { background: "var(--color-status-warning-bg)", color: "var(--color-status-warning)" },
  critical: { background: "var(--color-status-critical-bg)", color: "var(--color-status-critical)" },
  info: { background: "var(--color-status-info-bg)", color: "var(--color-status-info)" },
};

export function Badge({ className, variant, ...props }) {
  return (
    <span
      className={cn(badgeVariants({ variant }), className)}
      style={variantStyles[variant || "active"]}
      {...props}
    />
  );
}
