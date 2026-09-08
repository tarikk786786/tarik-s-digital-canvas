import { useMemo, useState } from "react";
import {
  Search,
  Dna,
  FlaskConical,
  Fingerprint,
  FileSearch,
  Microscope,
  Terminal,
  Scale,
  ShieldAlert,
} from "lucide-react";
import {
  FORENSIC_CATEGORIES,
  TOTAL_DOMAINS,
  type ForensicCategoryId,
} from "@/content/forensic-domains";

const ICONS: Record<ForensicCategoryId, React.ComponentType<{ className?: string }>> = {
  core: Dna,
  "crime-scene": ShieldAlert,
  pattern: Fingerprint,
  documents: FileSearch,
  trace: Microscope,
  digital: Terminal,
  specialized: Scale,
};

export function ForensicDomains({ embedded = false }: { embedded?: boolean } = {}) {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState<ForensicCategoryId | "all">("all");

  const q = query.trim().toLowerCase();

  const filtered = useMemo(() => {
    return FORENSIC_CATEGORIES.filter((c) => active === "all" || c.id === active)
      .map((c) => ({
        ...c,
        items: q ? c.items.filter((i) => i.toLowerCase().includes(q)) : c.items,
      }))
      .filter((c) => c.items.length > 0);
  }, [active, q]);

  const matchCount = filtered.reduce((n, c) => n + c.items.length, 0);

  const content = (
    <div className={embedded ? "w-full" : "container"}>
      {/* Header */}
      {!embedded ? (
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <div className="mb-4 flex items-center gap-3">
              <span className="h-px w-8 bg-accent/60" />
              <span className="font-mono text-[11px] uppercase tracking-[0.28em] text-accent">
                Section 03b · Domain Atlas
              </span>
            </div>
            <h2 className="text-balance text-4xl font-medium leading-[1.05] tracking-tight md:text-6xl">
              Forensic science domains{" "}
              <span className="text-muted-foreground">
                &amp; areas of expertise.
              </span>
            </h2>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
              A curated atlas of {TOTAL_DOMAINS} recognized forensic disciplines
              across seven domains. Empirical areas of knowledge and practice.
            </p>
          </div>

          {/* Search */}
          <div className="w-full md:w-80">
            <label className="relative block">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search 100+ disciplines…"
                className="h-12 w-full rounded-full border border-border/60 bg-background/40 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground/70 backdrop-blur-xl outline-none transition-colors focus:border-accent/60 focus:ring-2 focus:ring-accent/20"
              />
            </label>
            <p className="mt-2 pl-2 font-mono text-[10px] uppercase tracking-[0.24em] text-muted-foreground">
              {matchCount} / {TOTAL_DOMAINS} matches
            </p>
          </div>
        </div>
      ) : (
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
          <div>
            <h3 className="font-display text-xl font-bold text-foreground">
              Forensic Science Knowledge Atlas
            </h3>
            <p className="font-sans text-xs text-muted-foreground mt-1">
              Curated taxonomy of {TOTAL_DOMAINS} disciplines across 7 core forensic domains.
            </p>
          </div>
          <div className="w-full sm:w-72">
            <label className="relative block">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search disciplines…"
                className="h-10 w-full rounded-full border border-white/10 bg-[#0A0D12] pl-9 pr-4 text-xs text-foreground placeholder:text-muted-foreground/70 outline-none focus:border-accent"
              />
            </label>
          </div>
        </div>
      )}

      {/* Category chips */}
        <div className="mt-12 flex flex-wrap gap-2">
          <Chip active={active === "all"} onClick={() => setActive("all")}>
            All Domains
            <span className="ml-2 font-mono text-[10px] text-muted-foreground">
              {TOTAL_DOMAINS}
            </span>
          </Chip>
          {FORENSIC_CATEGORIES.map((c) => {
            const Icon = ICONS[c.id];
            return (
              <Chip
                key={c.id}
                active={active === c.id}
                onClick={() => setActive(c.id)}
              >
                <Icon className="mr-2 h-3.5 w-3.5" />
                {c.short}
                <span className="ml-2 font-mono text-[10px] text-muted-foreground">
                  {c.items.length}
                </span>
              </Chip>
            );
          })}
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="mt-16 rounded-2xl border border-border/50 bg-background/30 p-12 text-center backdrop-blur-xl">
            <FlaskConical className="mx-auto mb-4 h-8 w-8 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">
              No disciplines match{" "}
              <span className="text-foreground">"{query}"</span>.
            </p>
          </div>
        ) : (
          <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {filtered.map((c, idx) => {
              const Icon = ICONS[c.id];
              return (
                <article
                  key={c.id}
                  style={{ animationDelay: `${idx * 0.06}s` }}
                  className="group relative animate-fade-in overflow-hidden rounded-2xl border border-border/50 bg-gradient-to-br from-background/70 via-background/40 to-background/20 p-7 backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 hover:border-accent/40 hover:shadow-[0_20px_60px_-20px_color-mix(in_oklab,var(--accent)_35%,transparent)]"
                >
                  {/* Ambient glow */}
                  <div
                    aria-hidden
                    className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
                    style={{
                      background:
                        "radial-gradient(circle, color-mix(in oklab, var(--accent) 45%, transparent), transparent 70%)",
                    }}
                  />
                  {/* Grid lines */}
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 opacity-[0.04]"
                    style={{
                      backgroundImage:
                        "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
                      backgroundSize: "32px 32px",
                    }}
                  />

                  <header className="relative flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <span className="grid h-10 w-10 place-items-center rounded-xl border border-accent/30 bg-accent/10 text-accent transition-transform duration-500 group-hover:rotate-6 group-hover:scale-110">
                        <Icon className="h-5 w-5" />
                      </span>
                      <div>
                        <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-muted-foreground">
                          Domain · {String(idx + 1).padStart(2, "0")}
                        </p>
                        <h3 className="text-lg font-medium leading-tight text-foreground">
                          {c.label}
                        </h3>
                      </div>
                    </div>
                    <span className="rounded-full border border-border/60 bg-background/60 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                      {c.items.length}
                    </span>
                  </header>

                  <p className="relative mt-4 text-sm leading-relaxed text-muted-foreground">
                    {c.blurb}
                  </p>

                  <ul className="relative mt-5 flex flex-wrap gap-1.5">
                    {c.items.map((item) => (
                      <li
                        key={item}
                        className="rounded-md border border-border/40 bg-background/40 px-2.5 py-1 text-[12px] text-foreground/85 transition-colors hover:border-accent/50 hover:bg-accent/10 hover:text-foreground"
                      >
                        {highlight(item, q)}
                      </li>
                    ))}
                  </ul>

                  <footer className="relative mt-6 flex items-center justify-between border-t border-border/40 pt-4">
                    <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-muted-foreground">
                      Area of knowledge
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-accent/80">
                      Not a credential
                    </span>
                  </footer>
                </article>
              );
            })}
          </div>
        )}

        {/* Disclaimer */}
        <p className="mx-auto mt-14 max-w-3xl text-center text-xs leading-relaxed text-muted-foreground">
          Disciplines listed above represent recognized areas of forensic science
          and domains of practice. They are not statements of personal
          certification, qualification, or achievement. Verified credentials are
          published separately under{" "}
          <a href="/certifications" className="story-link text-foreground">
            Credentials
          </a>
          .
        </p>
    </div>
  );

  if (embedded) {
    return content;
  }

  return (
    <section id="domains" className="relative py-28 md:py-36">
      {content}
    </section>
  );
}

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "inline-flex items-center rounded-full border px-4 py-2 text-xs font-medium backdrop-blur-xl transition-all duration-300",
        active
          ? "border-accent/60 bg-accent/15 text-foreground shadow-[0_0_0_1px_color-mix(in_oklab,var(--accent)_30%,transparent)]"
          : "border-border/50 bg-background/40 text-muted-foreground hover:border-border hover:text-foreground",
      ].join(" ")}
    >
      {children}
    </button>
  );
}

function highlight(text: string, q: string) {
  if (!q) return text;
  const i = text.toLowerCase().indexOf(q);
  if (i < 0) return text;
  return (
    <>
      {text.slice(0, i)}
      <mark className="bg-accent/25 text-foreground rounded px-0.5">
        {text.slice(i, i + q.length)}
      </mark>
      {text.slice(i + q.length)}
    </>
  );
}
