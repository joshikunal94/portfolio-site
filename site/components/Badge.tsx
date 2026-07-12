import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface BadgeProps {
  children: ReactNode;
  className?: string;
}

export function Badge({ children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-block px-3 py-1 text-xs font-mono uppercase tracking-wide",
        "rounded-md border border-[rgba(15,23,42,0.08)] bg-slate-50 text-[#5A6B80]",
        className
      )}
    >
      {children}
    </span>
  );
}
