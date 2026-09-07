import { type ReactNode } from "react";

/**
 * Clean reveal wrapper without artificial blur filters.
 * Ensures all text and content remain 100% crisp and readable immediately.
 */
export function Reveal({
  children,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  return <div className={`w-full ${className}`}>{children}</div>;
}
