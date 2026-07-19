import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Navigation } from "@/components/portfolio/Navigation";
import { Footer } from "@/components/portfolio/Footer";
import {
  CERTIFICATIONS,
  CERT_ISSUERS,
  CERT_CATEGORIES,
} from "@/content/skills";
import { WHATSAPP_URL } from "@/lib/contact-links";

export const Route = createFileRoute("/certifications")({
  head: () => ({
    meta: [
      { title: "Credentials — Tarik Islam" },
      {
        name: "description",
        content:
          "Credentials and continuous learning — verified before published. Only owner-approved certifications appear.",
      },
      { property: "og:title", content: "Credentials — Tarik Islam" },
      {
        property: "og:description",
        content:
          "Evidence-backed credentials and current learning. Nothing fabricated, nothing implied.",
      },
      { property: "og:url", content: "/certifications" },
    ],
    links: [{ rel: "canonical", href: "/certifications" }],
  }),
  component: CertificationsPage,
});

type Tab = "all" | "verified" | "in-progress" | "expired";

function CertificationsPage() {
  const [tab, setTab] = useState<Tab>("all");
  const [category, setCategory] = useState<string>("all");
  const [issuer, setIssuer] = useState<string>("all");
  const [query, setQuery] = useState("");

  const visible = CERTIFICATIONS.filter((c) => c.visible && c.status !== "hidden");
  const verified = visible.filter((c) => c.status === "verified");
  const inProgress = visible.filter((c) => c.status === "in-progress");
  const expired = visible.filter((c) => c.status === "expired");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return visible.filter((c) => {
      if (tab !== "all" && c.status !== tab) return false;
      if (category !== "all" && c.category !== category) return false;
      if (issuer !== "all" && c.issuer !== issuer) return false;
      if (q && !`${c.name} ${c.issuer}`.toLowerCase().includes(q)) return false;
      return true;
    });
  }, [visible, tab, category, issuer, query]);

  return (
    <main className="min-h-dvh bg-background text-foreground">
      <Navigation />

      {/* Header */}
      <section className="mx-auto max-w-[1400px] px-6 pt-32 pb-12 md:px-10">
        <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-accent">
          Vault · Credentials & Continuous Learning
        </p>
        <h1 className="mt-4 font-display text-4xl leading-[1] tracking-tight md:text-6xl">
          Credentials, verified before published.
        </h1>
        <p className="mt-6 max-w-[70ch] text-base leading-relaxed text-muted-foreground text-pretty md:text-lg">
          Only credentials personally owned by Tarik Islam and confirmed against
          issuer records appear here. Nothing is inferred from a course list;
          nothing is faked with a generic seal.
        </p>

        <p className="mt-6 inline-flex items-center gap-2 border border-border-strong bg-surface/50 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
          <span className="size-1.5 rounded-full bg-accent animate-pulse-dot" />
          Only verified & owner-approved credentials are displayed publicly.
        </p>

        <div className="mt-8 grid grid-cols-2 gap-4 border-y border-border py-5 md:grid-cols-4">
          <Stat k="Verified" v={verified.length.toString().padStart(2, "0")} />
          <Stat k="In progress" v={inProgress.length.toString().padStart(2, "0")} />
          <Stat k="Expired" v={expired.length.toString().padStart(2, "0")} />
          <Stat k="Categories" v={CERT_CATEGORIES.length.toString()} />
        </div>
      </section>

      {/* Filters */}
      <section className="mx-auto max-w-[1400px] px-6 pb-6 md:px-10">
        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap gap-2">
            {(["all", "verified", "in-progress", "expired"] as Tab[]).map((t) => (
              <Chip key={t} active={tab === t} onClick={() => setTab(t)}>
                {t === "all" ? "All states" : t.replace("-", " ")}
              </Chip>
            ))}
          </div>

          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-wrap gap-2">
              <Chip active={category === "all"} onClick={() => setCategory("all")}>
                All categories
              </Chip>
              {CERT_CATEGORIES.map((c) => (
                <Chip
                  key={c}
                  active={category === c}
                  onClick={() => setCategory(c)}
                >
                  {c}
                </Chip>
              ))}
            </div>
            <label className="relative w-full md:w-72">
              <span className="sr-only">Search credentials</span>
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search credential…"
                className="w-full border border-border-strong bg-surface/50 px-3 py-2 font-mono text-[11px] uppercase tracking-[0.2em] text-foreground placeholder:text-muted-foreground focus:border-accent focus:outline-none"
              />
            </label>
          </div>

          <details className="group">
            <summary className="cursor-pointer font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground hover:text-accent">
              Filter by issuer ({issuer === "all" ? "any" : issuer}) ▾
            </summary>
            <div className="mt-3 flex flex-wrap gap-2">
              <Chip active={issuer === "all"} onClick={() => setIssuer("all")}>
                Any issuer
              </Chip>
              {CERT_ISSUERS.map((i) => (
                <Chip
                  key={i}
                  active={issuer === i}
                  onClick={() => setIssuer(i)}
                >
                  {i}
                </Chip>
              ))}
            </div>
          </details>
        </div>
      </section>

      {/* Results */}
      <section className="mx-auto max-w-[1400px] px-6 pb-16 md:px-10">
        {filtered.length === 0 ? (
          <div className="border border-dashed border-border-strong bg-surface/40 p-10">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">
              Vault sealed · Verification in progress
            </p>
            <p className="mt-4 max-w-[62ch] text-base leading-relaxed text-muted-foreground text-pretty">
              Certificates are being verified against issuer records and cleaned
              of private information (student IDs, signatures, personal
              addresses, private contact, QR codes) before publication. No
              placeholder credential will be shown here in the meantime.
            </p>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-3 border border-accent bg-accent/10 px-5 py-3 font-mono text-[10px] uppercase tracking-[0.25em] text-accent hover:bg-accent/20"
            >
              Request verified credentials →
            </a>
          </div>
        ) : (
          <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((c) => (
              <li
                key={c.id}
                className="group relative border border-border bg-surface/40 p-6 transition-colors hover:border-accent/60"
              >
                {/* Scan line on hover */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-x-0 top-0 h-16 opacity-0 mix-blend-screen transition-opacity group-hover:opacity-60"
                  style={{
                    background:
                      "linear-gradient(180deg, transparent, color-mix(in oklab, var(--accent) 50%, transparent), transparent)",
                  }}
                />
                <div className="flex items-center justify-between">
                  <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-accent">
                    {c.status === "verified" ? "Verified" : c.status.replace("-", " ")}
                    {" · "}
                    {c.issuer}
                  </p>
                  <span className="font-mono text-[9px] tracking-[0.2em] text-muted-foreground">
                    #{c.id.slice(0, 6).toUpperCase()}
                  </span>
                </div>
                <h3 className="mt-2 text-lg font-semibold leading-tight">
                  {c.name}
                </h3>
                {(c.issueDate || c.expiryDate) && (
                  <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                    {c.issueDate ?? "—"}
                    {c.expiryDate ? ` → ${c.expiryDate}` : ""}
                  </p>
                )}
                {c.credentialUrl && (
                  <a
                    href={c.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-block font-mono text-[10px] uppercase tracking-[0.25em] text-accent hover:underline"
                  >
                    Verify credential ↗
                  </a>
                )}
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Issuer & category vocabulary */}
      <section className="mx-auto max-w-[1400px] px-6 pb-16 md:px-10">
        <h2 className="font-mono text-[11px] uppercase tracking-[0.3em] text-foreground">
          Recognized issuers · filter vocabulary
        </h2>
        <p className="mt-3 max-w-[70ch] text-sm text-muted-foreground">
          Listed as filter labels only. Presence here does not imply an owned
          credential — a certificate publishes only after ownership is verified.
        </p>
        <ul className="mt-5 flex flex-wrap gap-2">
          {CERT_ISSUERS.map((i) => (
            <li
              key={i}
              className="border border-border/60 bg-background/60 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground"
            >
              {i}
            </li>
          ))}
        </ul>
      </section>

      {/* Verification policy */}
      <section className="mx-auto max-w-[1400px] px-6 pb-24 md:px-10">
        <div className="border border-border bg-surface/30 p-8 md:p-10">
          <h2 className="font-display text-2xl tracking-tight md:text-3xl">
            Verification policy
          </h2>
          <ul className="mt-5 space-y-3 text-sm text-muted-foreground">
            <li>• A credential publishes only after issuer verification.</li>
            <li>
              • Private identifiers — student ID, signatures, home address,
              personal QR codes, private phone or email — are redacted before
              preview.
            </li>
            <li>
              • Expired credentials remain listed with a clear "expired" state
              and their original dates.
            </li>
            <li>
              • "In progress" tracks are never displayed as certified.
            </li>
            <li>
              • Issuer logos are shown only when the brand terms permit.
            </li>
          </ul>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              to="/skills"
              className="border border-border-strong bg-background px-5 py-3 font-mono text-[10px] uppercase tracking-[0.25em] text-foreground hover:border-accent hover:text-accent"
            >
              ← Capabilities map
            </Link>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-accent bg-accent/10 px-5 py-3 font-mono text-[10px] uppercase tracking-[0.25em] text-accent hover:bg-accent/20"
            >
              Send certificate for verification
            </a>
          </div>
        </div>
      </section>

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
