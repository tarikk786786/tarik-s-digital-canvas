import { type ReactNode } from "react";

/**
 * Clean page container without artificial blur filters that can cause rendering issues.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  return <div className="w-full">{children}</div>;
}
