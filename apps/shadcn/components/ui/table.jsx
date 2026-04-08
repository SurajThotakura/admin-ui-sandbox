import { cn } from "../../lib/utils";

export function Table({ className, children, ...props }) {
  return (
    <table className={cn("w-full border-collapse", className)} {...props}>
      {children}
    </table>
  );
}

export function TableHeader({ className, children, ...props }) {
  return <thead className={className} {...props}>{children}</thead>;
}

export function TableBody({ className, children, ...props }) {
  return <tbody className={className} {...props}>{children}</tbody>;
}

export function TableRow({ className, selected, children, ...props }) {
  return (
    <tr
      className={cn("transition-colors duration-100", className)}
      style={{ background: selected ? "var(--color-primary-light)" : undefined }}
      {...props}
    >
      {children}
    </tr>
  );
}

export function TableHead({ className, children, ...props }) {
  return (
    <th
      className={cn(
        "text-left px-3 py-3 text-[10px] font-semibold uppercase tracking-[1.5px] whitespace-nowrap",
        className
      )}
      style={{ background: "var(--color-sand-50)", color: "var(--color-gray-300)" }}
      {...props}
    >
      {children}
    </th>
  );
}

export function TableCell({ className, children, ...props }) {
  return (
    <td
      className={cn("px-3 py-3 border-b text-[13px]", className)}
      style={{ borderColor: "var(--color-sand-100)" }}
      {...props}
    >
      {children}
    </td>
  );
}
