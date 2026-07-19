import { useEffect, useState } from "react";
import { getConsent } from "@/lib/consent";
import { readVisitorContext } from "@/lib/visitor-context";
import { track } from "@/lib/analytics";

// Small welcome-back chip. Only renders when:
// - personalization consent is on
// - visitor.returning is true
// - not previously dismissed this session
export function ReturningVisitorCard() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = getConsent();
    if (!consent.personalization) return;
    const ctx = readVisitorContext();
    if (!ctx.returning) return;
    if (window.sessionStorage.getItem("ti.returning.dismissed") === "1") return;
    setVisible(true);
    if (consent.analytics) track("returning_visit", { device: ctx.device });
  }, []);

  if (!visible) return null;

  return (
    <div
      role="status"
      className="fixed bottom-4 left-4 z-40 max-w-xs border border-accent/40 bg-background/85 px-4 py-3 shadow-lg backdrop-blur"
    >
      <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-accent">
        Welcome back
      </p>
      <p className="mt-1 text-xs text-muted-foreground">
        Picking up where you left off. Reset your path anytime from{" "}
        <a href="/privacy-controls" className="underline hover:text-accent">
          Privacy Controls
        </a>
        .
      </p>
      <button
        type="button"
        onClick={() => {
          window.sessionStorage.setItem("ti.returning.dismissed", "1");
          setVisible(false);
        }}
        className="mt-2 font-mono text-[9px] uppercase tracking-[0.25em] text-muted-foreground hover:text-foreground"
      >
        Dismiss
      </button>
    </div>
  );
}
