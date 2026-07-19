import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Navigation } from "@/components/portfolio/Navigation";
import { Footer } from "@/components/portfolio/Footer";
import {
  clearPersonalization,
  getConsent,
  setConsent,
  subscribe,
  type ConsentCategory,
  type ConsentState,
} from "@/lib/consent";

export const Route = createFileRoute("/privacy-controls")({
  head: () => ({
    meta: [
      { title: "Privacy controls — Tarik Islam" },
      {
        name: "description",
        content:
          "Review and control the optional signals used on tarikislam.in — analytics, personalization, session replay, and communication.",
      },
      { name: "robots", content: "noindex,follow" },
      { property: "og:title", content: "Privacy controls — Tarik Islam" },
    ],
    links: [{ rel: "canonical", href: "/privacy-controls" }],
  }),
  component: PrivacyControls,
});

interface Row {
  id: ConsentCategory;
  title: string;
  body: string;
  retention: string;
  locked?: boolean;
}

const ROWS: Row[] = [
  {
    id: "essential",
    title: "Essential",
    body: "Required for the site to load, remember your consent choices, and process a message you voluntarily send. Cannot be turned off.",
    retention: "Session · consent choice kept locally",
    locked: true,
  },
  {
    id: "analytics",
    title: "Analytics",
    body: "Aggregate, anonymous counts of which pages are viewed. No fingerprinting, no cross-site tracking, no ad networks. Raw IP is never stored.",
    retention: "Aggregate only · no individual profile",
  },
  {
    id: "personalization",
    title: "Personalization",
    body: "Lets the site read approximate country (from your connection) and remember which path you picked, so the greeting and suggestions stay relevant.",
    retention: "Local to this browser · cleared on request",
  },
  {
    id: "replay",
    title: "Session replay",
    body: "Off by default. Even when enabled, every input, chat message, and personal detail is masked; admin, auth, and payment routes are blocked.",
    retention: "14 days maximum when enabled",
  },
  {
    id: "communication",
    title: "Communication",
    body: "Enables optional widgets like live chat. Turning it off hides those surfaces entirely.",
    retention: "Only when you send a message",
  },
];

function PrivacyControls() {
  const [state, setState] = useState<ConsentState>(() => getConsent());

  useEffect(() => subscribe(setState), []);

  return (
    <main className="min-h-dvh bg-background text-foreground">
      <Navigation />
      <article className="mx-auto max-w-3xl px-6 pt-32 pb-24 md:px-10">
        <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-accent">
          Protocol · Privacy controls
        </p>
        <h1 className="mt-4 font-display text-4xl leading-tight tracking-tight md:text-5xl">
          You decide what gets used.
        </h1>
        <p className="mt-6 max-w-[62ch] text-base leading-relaxed text-muted-foreground text-pretty">
          Nothing here identifies you personally. All optional signals are off
          until you enable them. Rejecting them is exactly as easy as accepting.
        </p>

        <div className="mt-12 space-y-4">
          {ROWS.map((row) => {
            const on = state[row.id];
            return (
              <div
                key={row.id}
                className="border border-border-strong bg-background/60 p-5"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="font-mono text-[11px] uppercase tracking-[0.3em] text-foreground">
                      {row.title}
                    </h2>
                    <p className="mt-2 max-w-[58ch] text-sm leading-relaxed text-muted-foreground text-pretty">
                      {row.body}
                    </p>
                    <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground/70">
                      Retention · {row.retention}
                    </p>
                  </div>

                  <button
                    role="switch"
                    aria-checked={on}
                    aria-label={`${row.title} — ${on ? "on" : "off"}`}
                    disabled={row.locked}
                    onClick={() => setConsent({ [row.id]: !on } as Partial<ConsentState>)}
                    className={[
                      "relative h-6 w-11 shrink-0 rounded-full border transition-colors",
                      on
                        ? "border-accent bg-accent"
                        : "border-border-strong bg-background",
                      row.locked ? "opacity-50 cursor-not-allowed" : "cursor-pointer",
                    ].join(" ")}
                  >
                    <span
                      className={[
                        "absolute top-0.5 size-4 rounded-full bg-background shadow transition-transform",
                        on
                          ? "translate-x-[22px] bg-accent-foreground"
                          : "translate-x-0.5",
                      ].join(" ")}
                    />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-10 flex flex-wrap gap-3">
          <button
            onClick={() => {
              clearPersonalization();
              setState(getConsent());
            }}
            className="border border-border-strong bg-background px-5 py-3 font-mono text-[10px] uppercase tracking-[0.25em] text-foreground hover:border-accent hover:text-accent"
          >
            Clear local personalization
          </button>
          <Link
            to="/privacy"
            className="border border-border-strong bg-background px-5 py-3 font-mono text-[10px] uppercase tracking-[0.25em] text-foreground hover:border-accent hover:text-accent"
          >
            Read full privacy notice
          </Link>
        </div>

        <Link
          to="/"
          className="mt-16 inline-block font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground hover:text-accent"
        >
          ← Back home
        </Link>
      </article>
      <Footer />
    </main>
  );
}
