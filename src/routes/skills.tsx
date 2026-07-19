import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Navigation } from "@/components/portfolio/Navigation";
import { Footer } from "@/components/portfolio/Footer";
import {
  SKILL_CATEGORIES,
  SKILL_TAXONOMY,
  SKILLS,
  type SkillCategoryId,
} from "@/content/skills";
import { WHATSAPP_URL } from "@/lib/contact-links";

export const Route = createFileRoute("/skills")({
  head: () => ({
    meta: [
      { title: "Skills — Tarik Islam" },
      {
        name: "description",
        content:
          "Capabilities across forensic science, AI, cybersecurity, and software — organized by category, evidence-backed, no vanity percentages.",
      },
      { property: "og:title", content: "Capabilities — Tarik Islam" },
      {
        property: "og:description",
        content: "Multidisciplinary skill map: forensics, AI, security, product.",
      },
      { property: "og:url", content: "/skills" },
    ],
    links: [{ rel: "canonical", href: "/skills" }],
  }),
  component: SkillsPage,
});

function SkillsPage() {
  const [active, setActive] = useState<SkillCategoryId | "all">("all");
  const [query, setQuery] = useState("");

  const verifiedByCat = useMemo(() => {
    const map = new Map<SkillCategoryId, number>();
    for (const s of SKILLS) {
      if (!s.verified || !s.visible) continue;
      map.set(s.category, (map.get(s.category) ?? 0) + 1);
    }
    return map;
  }, []);

  const visibleCats = active === "all" ? SKILL_CATEGORIES : SKILL_CATEGORIES.filter((c) => c.id === active);

  const q = query.trim().toLowerCase();

  return (
    <main className="min-h-dvh bg-background text-foreground">
      <Navigation />

      {/* Header */}
      <section className="mx-auto max-w-[1400px] px-6 pt-32 pb-16 md:px-10">
        <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-accent">
          Section · Capabilities Map
        </p>
        <h1 className="mt-4 font-display text-4xl leading-[1] tracking-tight md:text-6xl">
          Capabilities across science, security, AI, and software.
        </h1>
        <p className="mt-6 max-w-[70ch] text-base leading-relaxed text-muted-foreground text-pretty md:text-lg">
          A multidisciplinary map combining forensic investigation, artificial
          intelligence, cybersecurity, automation, software engineering, product
          development, and digital research. No percentage bars — proficiency
          is claimed only where a project, credential, or coursework can back it.
        </p>

        {/* Filters */}
        <div className="mt-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap gap-2">
            <FilterChip active={active === "all"} onClick={() => setActive("all")}>
              All
            </FilterChip>
            {SKILL_CATEGORIES.map((c) => (
              <FilterChip
                key={c.id}
                active={active === c.id}
                onClick={() => setActive(c.id)}
              >
                {c.short}
              </FilterChip>
            ))}
          </div>
          <label className="relative w-full md:w-64">
            <span className="sr-only">Search skills</span>
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search skill…"
              className="w-full border border-border-strong bg-surface/50 px-3 py-2 font-mono text-[11px] uppercase tracking-[0.2em] text-foreground placeholder:text-muted-foreground focus:border-accent focus:outline-none"
            />
          </label>
        </div>
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-[1400px] px-6 pb-24 md:px-10">
        <div className="grid gap-6 lg:grid-cols-2">
          {visibleCats.map((cat) => {
            const items = (SKILL_TAXONOMY[cat.id] ?? []).filter((s) =>
              q ? s.toLowerCase().includes(q) : true,
            );
            const verifiedCount = verifiedByCat.get(cat.id) ?? 0;
            return (
              <article
                key={cat.id}
                className="border border-border bg-surface/30 p-6 md:p-8"
              >
                <header className="flex items-start justify-between gap-4 border-b border-border pb-4">
                  <div>
                    <p className="font-mono text-[9px] uppercase tracking-[0.35em] text-muted-foreground">
                      Cluster · {cat.short}
                    </p>
                    <h2 className="mt-1 font-display text-2xl leading-tight tracking-tight md:text-3xl">
                      {cat.label}
                    </h2>
                  </div>
                  <span
                    className={`shrink-0 border px-2 py-1 font-mono text-[9px] uppercase tracking-[0.25em] ${
                      verifiedCount > 0
                        ? "border-accent/60 bg-accent/10 text-accent"
                        : "border-border bg-background text-muted-foreground"
                    }`}
                  >
                    {verifiedCount > 0
                      ? `${verifiedCount} verified`
                      : "Verification pending"}
                  </span>
                </header>
                <p className="mt-4 text-sm text-muted-foreground text-pretty">
                  {cat.intent}
                </p>

                <ul className="mt-5 flex flex-wrap gap-2">
                  {items.map((s) => (
                    <li
                      key={s}
                      className="border border-border/60 bg-background/60 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-foreground/80"
                    >
                      {s}
                    </li>
                  ))}
                  {items.length === 0 && (
                    <li className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                      No skills match this filter.
                    </li>
                  )}
                </ul>

                <p className="mt-6 font-mono text-[9px] uppercase tracking-[0.3em] text-muted-foreground">
                  Chips are vocabulary, not claims. Each becomes a{" "}
                  <span className="text-accent">verified skill</span> only when
                  tied to a project, credential, or research artifact.
                </p>
              </article>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-[1400px] px-6 pb-24 md:px-10">
        <div className="flex flex-col items-start justify-between gap-6 border border-dashed border-border-strong bg-surface/40 p-8 md:flex-row md:items-center md:p-10">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">
              Evidence-first
            </p>
            <p className="mt-2 max-w-[62ch] text-base text-muted-foreground text-pretty">
              Want the verified proficiency ledger — projects, coursework, and
              credentials mapped per skill? Request it directly and I'll share
              the current version.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-accent bg-accent/10 px-5 py-3 font-mono text-[10px] uppercase tracking-[0.25em] text-accent hover:bg-accent/20"
            >
              Request evidence ledger
            </a>
            <Link
              to="/certifications"
              className="border border-border-strong bg-background px-5 py-3 font-mono text-[10px] uppercase tracking-[0.25em] text-foreground hover:border-accent hover:text-accent"
            >
              View credentials →
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

function FilterChip({
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
      onClick={onClick}
      className={`border px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.25em] transition-colors ${
        active
          ? "border-accent bg-accent/10 text-accent"
          : "border-border bg-transparent text-muted-foreground hover:border-border-strong hover:text-foreground"
      }`}
    >
      {children}
    </button>
  );
}
