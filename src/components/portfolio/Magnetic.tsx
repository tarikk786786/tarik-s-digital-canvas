import { useRef, type ReactNode, type MouseEvent } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "motion/react";

interface MagneticProps {
  children: ReactNode;
  href?: string;
  className?: string;
  strength?: number;
  "data-cursor"?: string;
  onClick?: () => void;
  ariaLabel?: string;
}

/**
 * Magnetic pointer-follow wrapper. Elements gently lean toward the cursor,
 * with spring physics + reduced-motion opt-out. Anchor by default so it
 * works as a hero CTA; renders as a plain container when no href is given.
 */
export function Magnetic({
  children,
  href,
  className,
  strength = 22,
  onClick,
  ariaLabel,
  ...rest
}: MagneticProps) {
  const ref = useRef<HTMLAnchorElement | HTMLDivElement | null>(null);
  const reduce = useReducedMotion();

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 250, damping: 20, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 250, damping: 20, mass: 0.4 });

  const handleMove = (e: MouseEvent<HTMLElement>) => {
    if (reduce || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const relX = e.clientX - (rect.left + rect.width / 2);
    const relY = e.clientY - (rect.top + rect.height / 2);
    x.set((relX / rect.width) * strength);
    y.set((relY / rect.height) * strength);
  };
  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  const commonProps = {
    ref: ref as never,
    onMouseMove: handleMove,
    onMouseLeave: handleLeave,
    onClick,
    className,
    style: { x: sx, y: sy },
    "data-cursor": rest["data-cursor"],
    "aria-label": ariaLabel,
  };

  if (href) {
    return (
      <motion.a href={href} {...commonProps}>
        {children}
      </motion.a>
    );
  }
  return <motion.div {...commonProps}>{children}</motion.div>;
}
