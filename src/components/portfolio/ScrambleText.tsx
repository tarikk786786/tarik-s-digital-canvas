import { useState, useEffect, useRef, ElementType } from "react";

interface ScrambleTextProps {
  text: string;
  className?: string;
  as?: ElementType;
  scrambleDelay?: number;
  triggerOnScroll?: boolean;
}

const GLYPHS = "░▒▓█0123456789ABCDEF_//<>";

export function ScrambleText({
  text,
  className = "",
  as: Component = "span",
  scrambleDelay = 0,
  triggerOnScroll = true,
}: ScrambleTextProps) {
  const [displayText, setDisplayText] = useState(text);
  const [hasAnimated, setHasAnimated] = useState(false);
  const elementRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    // If reduced motion is requested, do not scramble
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplayText(text);
      return;
    }

    if (!triggerOnScroll) {
      runScramble();
      return;
    }

    const el = elementRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            setTimeout(() => runScramble(), scrambleDelay);
          }
        });
      },
      { threshold: 0.25 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [text, scrambleDelay, triggerOnScroll, hasAnimated]);

  const runScramble = () => {
    const original = text.split("");
    const length = original.length;
    let iteration = 0;
    const maxIterations = length * 3;

    const interval = setInterval(() => {
      setDisplayText(
        original
          .map((char, index) => {
            if (char === " " || char === "\n") return char;
            if (index < iteration / 3) {
              return original[index];
            }
            return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
          })
          .join("")
      );

      iteration++;
      if (iteration >= maxIterations) {
        clearInterval(interval);
        setDisplayText(text);
      }
    }, 25);
  };

  return (
    <Component ref={elementRef} className={className}>
      {displayText}
    </Component>
  );
}
