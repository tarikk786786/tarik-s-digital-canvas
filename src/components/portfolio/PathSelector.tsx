import { useEffect, useState } from "react";
import { getSavedPath, savePath, type VisitorPath } from "@/lib/visitor-context";

interface Option {
  id: VisitorPath;
  label: string;
  hint: string;
}

const OPTIONS: Option[] = [
  { id: "hiring", label: "I'm hiring", hint: "Résumé · experience · availability" },
  { id: "product", label: "Website or SaaS", hint: "Product engineering · Dezo.in" },
  { id: "ai", label: "AI system", hint: "Assistants · pipelines · agents" },
  { id: "automation", label: "Automation", hint: "Workflows · integrations" },
  { id: "cyber", label: "Cybersecurity", hint: "Defensive engineering · audits" },
  { id: "forensics", label: "Forensic science", hint: "Research · methodology" },
  { id: "dezo", label: "About Dezo.in", hint: "Founder log · charter" },
  { id: "collaborate", label: "Collaborate", hint: "Research · open source" },
  { id: "exploring", label: "Just exploring", hint: "No agenda · no pressure" },
];

export function PathSelector() {
  const [active, setActive] = useState<VisitorPath | null>(null);

  useEffect(() => {
    setActive(getSavedPath());
  }, []);

  function choose(p: VisitorPath) {
    savePath(p);
    setActive(p);
  }

  return (
    <section
      aria-label="Choose your path"
      className="mx-auto mt-12 max-w-5xl px-6 md:px-10"
    >
      <div className="flex items-baseline justify-between gap-4">
        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">
          Choose your path
        </p>
        {active ? (
          <button
            onClick={() => {
              try {
                window.localStorage.removeItem("ti.path.v1");
              } catch {
                // ignore
              }
              setActive(null);
            }}
            className="font-mono text-[9px] uppercase tracking-[0.25em] text-muted-foreground hover:text-accent"
          >
            Reset
          </button>
        ) : null}
      </div>

      <p className="mt-2 max-w-[60ch] text-sm text-muted-foreground">
        Optional. Helps surface the most relevant projects and services. Nothing
        is sent anywhere.
      </p>

      <div className="mt-6 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {OPTIONS.map((o) => {
          const selected = active === o.id;
          return (
            <button
              key={o.id}
              type="button"
              onClick={() => choose(o.id)}
              aria-pressed={selected}
              data-cursor={o.label.toLowerCase()}
              className={[
                "group text-left border px-4 py-3 transition-all",
                selected
                  ? "border-accent bg-accent/10"
                  : "border-border hover:border-accent/60 hover:bg-accent/5",
              ].join(" ")}
            >
              <div className="flex items-center justify-between gap-2">
                <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-foreground">
                  {o.label}
                </span>
                <span
                  className={[
                    "size-1.5 rounded-full transition-colors",
                    selected ? "bg-accent" : "bg-border group-hover:bg-accent/60",
                  ].join(" ")}
                />
              </div>
              <p className="mt-1 text-xs text-muted-foreground">{o.hint}</p>
            </button>
          );
        })}
      </div>
    </section>
  );
}
