import { createFileRoute, Link } from "@tanstack/react-router";
import { Navigation } from "@/components/portfolio/Navigation";
import { Footer } from "@/components/portfolio/Footer";
import { CERTIFICATIONS, CERT_ISSUERS } from "@/content/skills";
import { WHATSAPP_URL } from "@/lib/contact-links";

export const Route = createFileRoute("/certifications")({
  head: () => ({
    meta: [
      { title: "Credentials — Tarik Islam" },
      {
        name: "description",
        content:
          "Verified credentials and continuous learning. Only owner-approved certifications are published.",
      },
      { property: "og:title", content: "Credentials — Tarik Islam" },
      {
        property: "og:description",
        content: "Evidence-backed credentials and current learning.",
      },
      { property: "og:url", content: "/certifications" },
    ],
    links: [{ rel: "canonical", href: "/certifications" }],
  }),
  component: CertificationsPage,
});

function CertificationsPage() {
  const verified = CERTIFICATIONS.filter(
    (c) => c.visible && c.status === "verified",
  );
  const inProgress = CERTIFICATIONS.filter(
    (c) => c.visible && c.status === "in-progress",
  );

  return (
    <main className="min-h-dvh bg-background text-foreground">
      <Navigation />

      <section className="mx-auto max-w-[1400px] px-6 pt-32 pb-16 md:px-10">
        <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-accent">
          Vault · Credentials & Continuous Learning
        </p>
        <h1 className="mt-4 font-display text-4xl leading-[1] tracking-tight md:text-6xl">
          Credentials, verified before published.
        </h1>
        <p className="mt-6 max-w-[70ch] text-base leading-relaxed text-muted-foreground text-pretty md:text-lg">
          Only credentials personally owned by Tarik Islam and confirmed against
          issuer records appear on this page. Nothing is inferred from a course
          list. Nothing is faked with generic seals.
        </p>

        <p className="mt-6 inline-flex items-center gap-2 border border-border-strong bg-surface/50 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
          <span className="size-1.5 rounded-full bg-accent animate-pulse-dot" />
          Only verified & owner-approved credentials are displayed publicly.
        </p>
      </section>

      {/* Verified */}
      <section className="mx-auto max-w-[1400px] px-6 pb-16 md:px-10">
        <h2 className="font-mono text-[11px] uppercase tracking-[0.3em] text-foreground">
          Verified · {verified.length.toString().padStart(2, "0")}
        </h2>

        {verified.length === 0 ? (
          <div className="mt-6 border border-dashed border-border-strong bg-surface/40 p-10">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">
              Vault sealed · Verification in progress
            </p>
            <p className="mt-4 max-w-[62ch] text-base leading-relaxed text-muted-foreground text-pretty">
              Certificates are being verified against issuer records and cleaned
              of private information (student IDs, signatures, personal
              addresses) before publication. No placeholder credential will be
              shown here in the meantime.
            </p>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-3 border border-accent bg-accent/10 px-5 py-3 font-mono text-[10px] uppercase tracking-[0.25em] text-accent hover:bg-accent/20"
            >
              Request verified credentials
              <span>→</span>
            </a>
          </div>
        ) : (
          <ul className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {verified.map((c) => (
              <li
                key={c.id}
                className="border border-border bg-surface/40 p-6"
              >
                <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-accent">
                  Verified · {c.issuer}
                </p>
                <h3 className="mt-2 text-lg font-semibold leading-tight">
                  {c.name}
                </h3>
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

      {/* Currently learning */}
      <section className="mx-auto max-w-[1400px] px-6 pb-16 md:px-10">
        <h2 className="font-mono text-[11px] uppercase tracking-[0.3em] text-foreground">
          Currently learning
        </h2>
        {inProgress.length === 0 ? (
          <p className="mt-4 max-w-[62ch] text-sm text-muted-foreground">
            Active learning tracks will appear here once they begin, clearly
            separated from certified expertise.
          </p>
        ) : (
          <ul className="mt-4 grid gap-3 md:grid-cols-2">
            {inProgress.map((c) => (
              <li key={c.id} className="border border-border/60 bg-background/60 p-4">
                <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-muted-foreground">
                  In progress · {c.issuer}
                </p>
                <p className="mt-1 text-sm text-foreground">{c.name}</p>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Issuer index */}
      <section className="mx-auto max-w-[1400px] px-6 pb-16 md:px-10">
        <h2 className="font-mono text-[11px] uppercase tracking-[0.3em] text-foreground">
          Recognized issuers · filter vocabulary
        </h2>
        <p className="mt-3 max-w-[70ch] text-sm text-muted-foreground">
          Listed as filters only. Presence here does not imply an owned
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
            <li>• Private identifiers (student ID, signatures, personal address, private contact) are redacted before preview.</li>
            <li>• Expired credentials remain listed with clear "expired" state and original dates.</li>
            <li>• "In progress" tracks are never displayed as certified.</li>
            <li>• Issuer logos are shown only when their brand terms permit.</li>
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
