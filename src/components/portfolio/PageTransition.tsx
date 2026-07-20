import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { useRouterState } from "@tanstack/react-router";
import { type ReactNode } from "react";

/**
 * Wraps route content in a soft fade/slide transition on navigation.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  const { location } = useRouterState();
  const reduce = useReducedMotion();
  const key = location.pathname;

  if (reduce) return <>{children}</>;

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={key}
        initial={{ opacity: 0, y: 12, filter: "blur(6px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        exit={{ opacity: 0, y: -8, filter: "blur(4px)" }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
