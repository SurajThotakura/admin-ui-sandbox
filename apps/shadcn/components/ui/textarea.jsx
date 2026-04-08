import { cn } from "../../lib/utils";

export function Textarea({ className, ...props }) {
  return (
    <textarea
      className={cn(
        "min-h-[80px] px-4 py-2 border text-[13px] outline-none resize-y transition-all duration-150 w-full",
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
