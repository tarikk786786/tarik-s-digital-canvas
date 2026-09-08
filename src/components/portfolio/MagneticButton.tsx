import { useRef, useState, ReactNode, MouseEvent } from "react";
import { soundEngine } from "@/lib/sound-engine";

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  variant?: "primary" | "secondary" | "glass";
  strength?: number;
  dataCursor?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

export function MagneticButton({
  children,
  className = "",
  onClick,
  variant = "primary",
  strength = 0.25,
  dataCursor,
  type = "button",
  disabled = false,
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPressed, setIsPressed] = useState(false);

  const handleMouseMove = (e: MouseEvent<HTMLButtonElement>) => {
    if (disabled) return;
    const btn = buttonRef.current;
    if (!btn) return;

    const rect = btn.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const deltaX = (e.clientX - centerX) * strength;
    const deltaY = (e.clientY - centerY) * strength;

    setPosition({ x: deltaX, y: deltaY });
  };

  const handleMouseEnter = () => {
    soundEngine.playHover();
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
    setIsPressed(false);
  };

  const handleMouseDown = () => {
    if (disabled) return;
    setIsPressed(true);
    soundEngine.playClick();
    if (typeof navigator !== "undefined" && "vibrate" in navigator) {
      try {
        navigator.vibrate(12);
      } catch {
        // Safe fallback
      }
    }
  };

  const handleMouseUp = () => {
    setIsPressed(false);
  };

  const variantStyles = {
    primary:
      "bg-[#62E6FF] text-[#050608] hover:bg-[#A5F3FC] font-bold shadow-[0_0_24px_rgba(98,230,255,0.35)] active:shadow-[0_0_12px_rgba(98,230,255,0.5)] border border-[#62E6FF]",
    secondary:
      "bg-white/[0.04] text-foreground hover:bg-white/[0.08] border border-white/15 hover:border-[#62E6FF]/50",
    glass:
      "tarik-glass text-foreground hover:border-[#62E6FF]/50 hover:bg-white/[0.06]",
  };

  return (
    <button
      ref={buttonRef}
      type={type}
      disabled={disabled}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      data-cursor={dataCursor}
      style={{
        transform: `translate3d(${position.x}px, ${position.y}px, 0) scale(${isPressed ? 0.96 : 1})`,
        transition: isPressed ? "transform 0.08s ease" : "transform 0.22s cubic-bezier(0.16, 1, 0.3, 1)",
      }}
      className={`group relative inline-flex items-center justify-center gap-2.5 px-6 py-3 rounded-lg font-mono text-xs uppercase tracking-[0.2em] select-none cursor-pointer transition-colors will-change-transform disabled:opacity-50 disabled:cursor-not-allowed ${variantStyles[variant]} ${className}`}
    >
      {children}
    </button>
  );
}
