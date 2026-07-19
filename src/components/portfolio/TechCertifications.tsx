import { useMemo, useState, type ReactNode } from "react";
import { Search, ShieldCheck, Clock3, Sparkles, ExternalLink, Award } from "lucide-react";
import {
  TECH_CERT_CATEGORIES,
  CERT_STATUS_LABEL,
  type CertStatus,
  type TechCert,
} from "@/content/tech-certifications";

const STATUS_STYLES: Record<CertStatus, { chip: string; ring: string; icon: ReactNode }> = {
  earned: {
    chip: "bg-emerald-500/15 text-emerald-300 border-emerald-400/30",
    ring: "from-emerald-400/30 via-emerald-400/5 to-transparent",
    icon: <ShieldCheck className="h-3.5 w-3.5" />,
  },
  "in-progress": {
    chip: "bg-amber-500/10 text-amber-200 border-amber-400/30",
    ring: "from-amber-400/25 via-amber-400/5 to-transparent",
    icon: <Sparkles className="h-3.5 w-3.5" />,
  },
  planned: {
    chip: "bg-white/5 text-muted-foreground border-white/10",
    ring: "from-white/10 via-white/0 to-transparent",
    icon: <Clock3 className="h-3.5 w-3.5" />,
  },
};

function CertCard({ cert }: { cert: TechCert }) {
  const s = STATUS_STYLES[cert.status];
  return (
    <article
      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.05] hover:shadow-[0_20px_60px_-20px_rgba(0,200,255,0.25)]"
    >
      <div
        className={`pointer-events-none absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity duration-500 group-hover:opacity-100 ${s.ring}`}
      />
      <div className="pointer-events-none absolute -inset-px rounded-2xl bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      <div className="relative flex items-start justify-between gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-gradient-to-br from-white/10 to-white/[0.02] text-primary shadow-inner">
          <Award className="h-5 w-5" />
        </div>
        <span
          className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider ${s.chip}`}
        >
          {s.icon}
          {CERT_STATUS_LABEL[cert.status]}
        </span>
      </div>

      <h3 className="relative mt-4 text-[15px] font-medium leading-snug tracking-tight text-foreground">
        {cert.name}
      </h3>
      <p className="relative mt-1 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
        {cert.issuer}
      </p>

      {cert.skills && cert.skills.length > 0 && (
        <div className="relative mt-4 flex flex-wrap gap-1.5">
          {cert.skills.slice(0, 4).map((sk) => (
            <span
              key={sk}
              className="rounded-md border border-white/10 bg-white/[0.03] px-2 py-0.5 text-[10px] text-muted-foreground"
            >
              {sk}
            </span>
          ))}
        </div>
      )}

      <div className="relative mt-4 flex items-center justify-between border-t border-white/5 pt-3 text-[11px] text-muted-foreground">
        <span className="font-mono">
          {cert.status === "earned" && cert.issueDate
            ? cert.issueDate
            : cert.status === "earned"
              ? "issued"
              : cert.status === "in-progress"
                ? "in progress"
                : "roadmap"}
        </span>
        {cert.verificationUrl ? (
          <a
            href={cert.verificationUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 text-primary hover:underline"
          >
            Verify <ExternalLink className="h-3 w-3" />
          </a>
        ) : (
          <span className="font-mono text-[10px] uppercase tracking-wider opacity-70">
            {cert.status === "earned" ? "credential pending" : "not yet claimed"}
          </span>
        )}
      </div>
    </article>
  );
}

export function TechCertifications() {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState<string>("all");

  const flat = useMemo(
    () =>
      TECH_CERT_CATEGORIES.flatMap((c) =>
        c.items.map((it) => ({ ...it, _cat: c.id, _catTitle: c.title }))
      ),
    []
  );

  const counts = useMemo(() => {
    const earned = flat.filter((c) => c.status === "earned").length;
    return { total: flat.length, earned };
  }, [flat]);

  const categories = useMemo(() => {
    const q = query.trim().toLowerCase();
    return TECH_CERT_CATEGORIES.map((cat) => ({
      ...cat,
      items: cat.items.filter((it) => {
        if (active !== "all" && cat.id !== active) return false;
        if (!q) return true;
        return (
          it.name.toLowerCase().includes(q) ||
          it.issuer.toLowerCase().includes(q) ||
          it.skills?.some((s) => s.toLowerCase().includes(q))
        );
      }),
    })).filter((c) => c.items.length > 0);
  }, [query, active]);

  return (
    <section id="tech-certifications" className="relative py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col gap-4">
          <span className="font-mono text-[11px] uppercase tracking-[0.24em] text-muted-foreground">
            § Credential Vault / Technology
          </span>
          <h2 className="max-w-3xl text-4xl font-light tracking-tight text-foreground md:text-5xl">
            Programming, Software Development{" "}
            <span className="italic text-primary">& Cybersecurity</span> Certifications
          </h2>
          <p className="max-w-2xl text-sm text-muted-foreground">
            A transparent map of technical credentials — earned, in progress, and on the
            roadmap. Each card declares its status openly. Nothing is claimed without a
            verifiable credential ID.
          </p>
          <div className="mt-2 flex flex-wrap items-center gap-3 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
            <span className="rounded-full border border-emerald-400/30 bg-emerald-500/10 px-2.5 py-1 text-emerald-300">
              {counts.earned} verified
            </span>
            <span className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1">
              {counts.total} tracked
            </span>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-3 md:flex-row md:items-center">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search certifications, issuers, or skills…"
              className="w-full rounded-xl border border-white/10 bg-white/[0.03] py-3 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary/40 focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <FilterChip active={active === "all"} onClick={() => setActive("all")} label="All" count={flat.length} />
          {TECH_CERT_CATEGORIES.map((c) => (
            <FilterChip
              key={c.id}
              active={active === c.id}
              onClick={() => setActive(c.id)}
              label={c.title}
              count={c.items.length}
            />
          ))}
        </div>

        <div className="mt-12 space-y-14">
          {categories.map((cat) => (
            <div key={cat.id}>
              <div className="mb-5 flex items-baseline justify-between gap-4 border-b border-white/5 pb-3">
                <div>
                  <h3 className="text-xl font-medium tracking-tight text-foreground">
                    {cat.title}
                  </h3>
                  <p className="mt-1 text-xs text-muted-foreground">{cat.blurb}</p>
                </div>
                <span className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                  {cat.items.length} tracked
                </span>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {cat.items.map((cert) => (
                  <CertCard key={`${cat.id}-${cert.name}`} cert={cert} />
                ))}
              </div>
            </div>
          ))}
          {categories.length === 0 && (
            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-8 text-center text-sm text-muted-foreground">
              No certifications match “{query}”.
            </div>
          )}
        </div>

        <p className="mt-14 max-w-3xl border-l-2 border-primary/30 pl-4 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
          Integrity note · Certifications are displayed exactly as verified. Items marked{" "}
          <span className="text-amber-200">Learning Path</span> or{" "}
          <span className="text-foreground/70">Planned</span> are not credentials — they
          are commitments on the roadmap. Verified badges and credential IDs are added
          only after issuance.
        </p>
      </div>
    </section>
  );
}

function FilterChip({
  active,
  onClick,
  label,
  count,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  count: number;
}) {
  return (
    <button
      onClick={onClick}
      className={`group inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs transition-all ${
        active
          ? "border-primary/40 bg-primary/10 text-primary shadow-[0_0_20px_-4px_hsl(var(--primary)/0.4)]"
          : "border-white/10 bg-white/[0.03] text-muted-foreground hover:border-white/20 hover:text-foreground"
      }`}
    >
      <span>{label}</span>
      <span className="font-mono text-[10px] opacity-70">{count}</span>
    </button>
  );
}
