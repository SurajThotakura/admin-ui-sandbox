import { cn } from "../../lib/utils";

export function Input({ className, ...props }) {
  return (
    <input
      className={cn(
        "h-10 px-4 border text-[13px] outline-none transition-all duration-150 w-full",
        "focus:border-primary focus:outline-2 focus:outline-primary focus:-outline-offset-1",
        className
      )}
      style={{
        borderColor: "var(--color-sand-200)",
        fontFamily: "var(--font-body)",
        color: "var(--color-gray-700)",
        background: "white",
      }}
      {...props}
    />
  );
}
