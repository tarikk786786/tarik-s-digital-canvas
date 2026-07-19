import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Navigation } from "@/components/portfolio/Navigation";
import { Footer } from "@/components/portfolio/Footer";
import {
  SKILL_CATEGORIES,
  SKILL_MAP,
  SKILLS,
  CURRENT_LEARNING,
  type SkillCategoryId,
} from "@/content/skills";
import { WHATSAPP_URL } from "@/lib/contact-links";

export const Route = createFileRoute("/skills")({
  head: () => ({
    meta: [
      { title: "Capabilities — Tarik Islam" },
      {
        name: "description",
        content:
          "Capabilities across forensic science, AI, cybersecurity, and software — a multidisciplinary knowledge map, evidence-backed, no vanity percentages.",
      },
      { property: "og:title", content: "Capabilities — Tarik Islam" },
      {
        property: "og:description",
        content:
          "Multidisciplinary skill map: forensics, AI, security, software. Only claimed where evidence exists.",
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
  const [selected, setSelected] = useState<string | null>(null);

  const verifiedByCat = useMemo(() => {
    const map = new Map<SkillCategoryId, number>();
    for (const s of SKILLS) {
      if (!s.verified || !s.visible) continue;
      map.set(s.category, (map.get(s.category) ?? 0) + 1);
    }
    return map;
  }, []);

  const q = query.trim().toLowerCase();
  const visibleCats =
    active === "all"
      ? SKILL_CATEGORIES
      : SKILL_CATEGORIES.filter((c) => c.id === active);

  const totalCount = useMemo(
    () =>
      Object.values(SKILL_MAP).reduce(
        (n, subs) => n + subs.reduce((m, s) => m + s.items.length, 0),
        0,
      ),
    [],
  );

  return (
    <main className="min-h-dvh bg-background text-foreground">
      <Navigation />

      {/* Header */}
      <section className="mx-auto max-w-[1400px] px-6 pt-32 pb-12 md:px-10">
        <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-accent">
          Section · Capabilities Map
        </p>
        <h1 className="mt-4 font-display text-4xl leading-[1] tracking-tight md:text-6xl">
          Capabilities across science, security, AI, and software.
        </h1>
        <p className="mt-6 max-w-[70ch] text-base leading-relaxed text-muted-foreground text-pretty md:text-lg">
          A multidisciplinary skill set combining forensic investigation,
          artificial intelligence, cybersecurity, automation, software
          engineering, product development, and digital research. No percentage
          bars — proficiency is claimed only where a project, credential,
          research artifact, or coursework can back it.
        </p>

        <div className="mt-8 grid grid-cols-2 gap-4 border-y border-border py-5 md:grid-cols-4">
          <Stat k="Categories" v={SKILL_CATEGORIES.length.toString()} />
          <Stat k="Vocabulary" v={totalCount.toString()} />
          <Stat
            k="Verified claims"
            v={SKILLS.filter((s) => s.verified && s.visible).length
              .toString()
              .padStart(2, "0")}
          />
          <Stat k="Currently learning" v={CURRENT_LEARNING.length.toString().padStart(2, "0")} />
        </div>

        {/* Filters */}
        <div className="mt-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
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
          <label className="relative w-full md:w-72">
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

      {/* Clusters */}
      <section className="mx-auto max-w-[1400px] px-6 pb-24 md:px-10">
        <div className="grid gap-6 lg:grid-cols-2">
          {visibleCats.map((cat) => {
            const subs = SKILL_MAP[cat.id];
            const verifiedCount = verifiedByCat.get(cat.id) ?? 0;
            const filteredSubs = subs
              .map((sub) => ({
                ...sub,
                items: sub.items.filter((s) =>
                  q ? s.toLowerCase().includes(q) : true,
                ),
              }))
              .filter((sub) => sub.items.length > 0);

            return (
              <article
                key={cat.id}
                className="relative border border-border bg-surface/30 p-6 md:p-8"
              >
                <header className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4 border-b border-border pb-4">
                  <div className="min-w-0">
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

                <div className="mt-5 space-y-5">
                  {filteredSubs.length === 0 && (
                    <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                      No entries match this filter.
                    </p>
                  )}
                  {filteredSubs.map((sub) => (
                    <div key={sub.name}>
                      <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-accent/80">
                        {sub.name}
                      </p>
                      <ul className="mt-2 flex flex-wrap gap-1.5">
                        {sub.items.map((s) => {
                          const isVerified = SKILLS.some(
                            (v) => v.name === s && v.verified && v.visible,
                          );
                          return (
                            <li key={s}>
                              <button
                                onClick={() => setSelected(s)}
                                className={`border px-2 py-1 font-mono text-[10px] uppercase tracking-[0.18em] transition-colors ${
                                  isVerified
                                    ? "border-accent/60 bg-accent/10 text-accent hover:bg-accent/20"
                                    : "border-border/60 bg-background/60 text-foreground/80 hover:border-accent/50 hover:text-accent"
                                }`}
                              >
                                {s}
                                {isVerified && (
                                  <span className="ml-1.5 text-[8px]">●</span>
                                )}
                              </button>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  ))}
                </div>

                <p className="mt-6 font-mono text-[9px] uppercase tracking-[0.3em] text-muted-foreground">
                  Chips are vocabulary, not claims. A dot marks a{" "}
                  <span className="text-accent">verified skill</span> with
                  evidence attached.
                </p>
              </article>
            );
          })}
        </div>
      </section>

      {/* Currently learning */}
      <section className="mx-auto max-w-[1400px] px-6 pb-16 md:px-10">
        <div className="border border-border bg-surface/20 p-6 md:p-8">
          <div className="flex items-baseline justify-between gap-4 border-b border-border pb-3">
            <h2 className="font-mono text-[11px] uppercase tracking-[0.3em] text-foreground">
              Currently learning
            </h2>
            <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-muted-foreground">
              Separated from certified expertise
            </span>
          </div>
          {CURRENT_LEARNING.length === 0 ? (
            <p className="mt-4 max-w-[62ch] text-sm text-muted-foreground">
              Active learning tracks (e.g. Rust, advanced RAG evaluation) will
              appear here once they begin, with their source repository or
              coursework — never mixed with certified expertise.
            </p>
          ) : (
            <ul className="mt-4 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
              {CURRENT_LEARNING.map((c) => (
                <li
                  key={c.topic}
                  className="border border-border/60 bg-background/60 p-4"
                >
                  <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-accent">
                    {c.status.replace("-", " ")}
                    {c.since ? ` · ${c.since}` : ""}
                  </p>
                  <p className="mt-1 text-sm text-foreground">{c.topic}</p>
                  {c.note && (
                    <p className="mt-2 text-xs text-muted-foreground">{c.note}</p>
                  )}
                </li>
              ))}
            </ul>
          )}
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

      {selected && (
        <SkillDrawer name={selected} onClose={() => setSelected(null)} />
      )}

      <Footer />
    </main>
  );
}

function Stat({ k, v }: { k: string; v: string }) {
  return (
    <div>
      <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-muted-foreground">
        {k}
      </p>
      <p className="mt-1 font-display text-xl text-foreground">{v}</p>
    </div>
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

function SkillDrawer({
  name,
  onClose,
}: {
  name: string;
  onClose: () => void;
}) {
  const record = SKILLS.find((s) => s.name === name);
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Skill details for ${name}`}
      className="fixed inset-0 z-[80] flex items-end justify-center bg-background/70 backdrop-blur-md md:items-center"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-xl border border-border-strong bg-surface p-6 md:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-accent">
              Skill · Evidence panel
            </p>
            <h3 className="mt-2 font-display text-2xl leading-tight tracking-tight">
              {name}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="shrink-0 border border-border px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground hover:border-accent hover:text-accent"
            aria-label="Close"
          >
            Close ×
          </button>
        </div>

        <div className="mt-6 space-y-4 text-sm">
          {record ? (
            <>
              <Row k="Experience type" v={record.experienceType ?? "—"} />
              {record.level && <Row k="Level" v={record.level} />}
              {record.lastUsed && <Row k="Last used" v={record.lastUsed} />}
              {record.description && (
                <p className="text-muted-foreground text-pretty">
                  {record.description}
                </p>
              )}
              {record.relatedProjects && record.relatedProjects.length > 0 && (
                <div>
                  <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-muted-foreground">
                    Related projects
                  </p>
                  <ul className="mt-2 space-y-1 text-foreground">
                    {record.relatedProjects.map((p) => (
                      <li key={p}>· {p}</li>
                    ))}
                  </ul>
                </div>
              )}
              {record.evidenceUrls && record.evidenceUrls.length > 0 && (
                <div>
                  <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-muted-foreground">
                    Evidence
                  </p>
                  <ul className="mt-2 space-y-1">
                    {record.evidenceUrls.map((u) => (
                      <li key={u}>
                        <a
                          href={u}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-accent underline-offset-4 hover:underline"
                        >
                          {u}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </>
          ) : (
            <>
              <div className="border border-dashed border-border-strong bg-background/60 p-4">
                <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-accent">
                  Evidence pending
                </p>
                <p className="mt-2 text-muted-foreground text-pretty">
                  This entry is part of the capability vocabulary. It becomes a
                  claimed skill only after an evidence source — a project,
                  credential, research artifact, or coursework — is attached to
                  it. Nothing is auto-filled with a level or year.
                </p>
              </div>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-accent bg-accent/10 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.25em] text-accent hover:bg-accent/20"
              >
                Ask for evidence on {name}
              </a>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="grid grid-cols-[140px_minmax(0,1fr)] gap-3 border-b border-border/60 pb-2">
      <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-muted-foreground">
        {k}
      </p>
      <p className="text-foreground">{v}</p>
    </div>
  );
}
