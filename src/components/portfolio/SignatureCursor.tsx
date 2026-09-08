import { useEffect, useState, useRef } from "react";

export function SignatureCursor() {
  const [enabled, setEnabled] = useState(false);
  const [cursorText, setCursorText] = useState("");
  const [isHovered, setIsHovered] = useState(false);
  const [isPointerDown, setIsPointerDown] = useState(false);

  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);

  // Mouse coords
  const mousePos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    // Only enable on desktop pointer devices
    if (typeof window === "undefined") return;
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    const isReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!isFinePointer || isReducedMotion) {
      setEnabled(false);
      return;
    }

    setEnabled(true);

    const onMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }

      // Detect interactive targets
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactive = target.closest("a, button, [role='button'], input, textarea, [data-cursor]");
      if (interactive) {
        setIsHovered(true);
        const customLabel = interactive.getAttribute("data-cursor");
        if (customLabel) {
          setCursorText(customLabel.toUpperCase());
        } else if (interactive.tagName === "BUTTON" || interactive.tagName === "A") {
          setCursorText("");
        }
      } else {
        setIsHovered(false);
        setCursorText("");
      }
    };

    const onMouseDown = () => setIsPointerDown(true);
    const onMouseUp = () => setIsPointerDown(false);

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);

    // Smooth lerp loop for outer ring
    const render = () => {
      const lerpFactor = 0.18;
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * lerpFactor;
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * lerpFactor;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0)`;
      }

      rafId.current = requestAnimationFrame(render);
    };

    rafId.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  if (!enabled) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden select-none">
      {/* Inner Precision Dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 -ml-1 -mt-1 size-2 rounded-full bg-[#62E6FF] shadow-[0_0_8px_rgba(98,230,255,0.9)] transition-opacity duration-150 will-change-transform"
        style={{
          opacity: isPointerDown ? 0.4 : 1,
        }}
      />

      {/* Outer Reactive Ring */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 flex items-center justify-center rounded-full border transition-all duration-200 will-change-transform ${
          isHovered
            ? "border-[#62E6FF]/80 bg-[#62E6FF]/10 scale-125 shadow-[0_0_20px_rgba(98,230,255,0.25)]"
            : "border-white/20 bg-transparent scale-100"
        } ${
          cursorText
            ? "px-3 py-1 -ml-8 -mt-4 h-8 w-auto rounded-full"
            : isHovered
            ? "-ml-5 -mt-5 size-10"
            : "-ml-3 -mt-3 size-6"
        }`}
      >
        {cursorText && (
          <span className="font-mono text-[9px] uppercase tracking-widest text-[#62E6FF] font-bold whitespace-nowrap px-1">
            {cursorText}
          </span>
        )}
      </div>
    </div>
  );
}
