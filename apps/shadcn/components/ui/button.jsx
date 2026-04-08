import { cva } from "class-variance-authority";
import { cn } from "../../lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-1.5 whitespace-nowrap font-semibold transition-all duration-150 cursor-pointer disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "border-none text-white",
        outline: "border bg-white",
        ghost: "border-none bg-transparent",
        danger: "border",
        text: "bg-transparent border-none",
      },
      size: {
        default: "h-10 px-4 text-[13px]",
        sm: "h-8 px-3 text-xs",
        icon: "h-[30px] w-[30px] p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export function Button({ className, variant, size, style, ...props }) {
  const variantStyles = {
    default: {
      background: "var(--color-primary)",
      fontFamily: "var(--font-body)",
    },
    outline: {
      color: "var(--color-gray-600)",
      borderColor: "var(--color-sand-200)",
      fontFamily: "var(--font-body)",
    },
    ghost: {
      color: "var(--color-gray-500)",
      fontFamily: "var(--font-body)",
    },
    danger: {
      color: "var(--color-status-critical)",
      borderColor: "var(--color-status-critical-bg)",
      background: "white",
      fontFamily: "var(--font-body)",
    },
    text: {
      color: "var(--color-gray-400)",
      fontFamily: "var(--font-body)",
    },
  };

  return (
    <button
      className={cn(buttonVariants({ variant, size }), className)}
      style={{ ...variantStyles[variant || "default"], ...style }}
      {...props}
    />
  );
}
