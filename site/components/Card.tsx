import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
}

export function Card({ children, className }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-xl border border-[rgba(15,23,42,0.10)] bg-white/95 p-5 backdrop-blur-md supports-[backdrop-filter]:bg-white/[0.82] lg:p-6",
        "shadow-[0_1px_2px_rgba(15,23,42,0.04),0_8px_24px_-12px_rgba(15,23,42,0.12)]",
        "motion-safe:hover:shadow-[0_2px_4px_rgba(15,23,42,0.06),0_14px_32px_-14px_rgba(15,23,42,0.18)]",
        "motion-safe:hover:-translate-y-0.5 motion-safe:hover:border-[rgba(23,95,176,0.35)]",
        "motion-safe:transition-all motion-safe:duration-200",
        className
      )}
    >
      {children}
    </div>
  );
}

interface CardEyebrowProps {
  children: ReactNode;
  className?: string;
}

export function CardEyebrow({ children, className }: CardEyebrowProps) {
  return (
    <div
      className={cn(
        "font-mono text-[0.8rem] text-accent-bright uppercase tracking-wide mb-3",
        className
      )}
    >
      {children}
    </div>
  );
}

interface CardTitleProps {
  children: ReactNode;
  className?: string;
  as?: "h1" | "h2" | "h3";
}

export function CardTitle({ children, className, as = "h2" }: CardTitleProps) {
  const Component = as;
  return (
    <Component
      className={cn(
        "font-display font-semibold text-slate-900 text-xl lg:text-2xl mb-3",
        className
      )}
    >
      {children}
    </Component>
  );
}

interface CardContentProps {
  children: ReactNode;
  className?: string;
}

export function CardContent({ children, className }: CardContentProps) {
  return (
    <div className={cn("text-slate-700 space-y-3", className)}>{children}</div>
  );
}
