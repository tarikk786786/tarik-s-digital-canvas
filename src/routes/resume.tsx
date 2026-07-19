import { createFileRoute, Link } from "@tanstack/react-router";
import { Navigation } from "@/components/portfolio/Navigation";
import { Footer } from "@/components/portfolio/Footer";
import { PROFILE } from "@/lib/profile";
import { WHATSAPP_URL, GITHUB_URL, INSTAGRAM_URL } from "@/lib/contact-links";

export const Route = createFileRoute("/resume")({
  head: () => ({
    meta: [
      { title: "Résumé — Tarik Islam" },
      {
        name: "description",
        content:
          "Interactive résumé for Tarik Islam — forensic scientist, cybersecurity engineer, AI developer, and founder of Dezo.in.",
      },
      { property: "og:title", content: "Résumé — Tarik Islam" },
      { property: "og:description", content: "Interactive résumé — verified content only." },
      { property: "og:url", content: "/resume" },
    ],
    links: [{ rel: "canonical", href: "/resume" }],
  }),
  component: ResumePage,
});

function ResumePage() {
  return (
    <main className="min-h-dvh bg-background text-foreground">
      <Navigation />
      <section className="mx-auto max-w-4xl px-6 pt-32 pb-24 md:px-10">
        <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-accent">
          Résumé · Interactive
        </p>
        <h1 className="mt-4 font-display text-5xl leading-[0.95] tracking-tight md:text-6xl">
          {PROFILE.name}
        </h1>
        <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
          {PROFILE.primaryRole} · {PROFILE.location} · {PROFILE.timezone}
        </p>

        <div className="mt-10 border border-dashed border-border-strong bg-surface/40 p-8">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">
            Verification pending
          </p>
          <p className="mt-4 max-w-[62ch] text-base leading-relaxed text-muted-foreground text-pretty">
            The full résumé — education, roles with real dates, certifications, and
            selected projects — is being prepared from verified records. A downloadable
            PDF will publish here once the source content is confirmed.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-accent bg-accent/10 px-5 py-3 font-mono text-[10px] uppercase tracking-[0.25em] text-accent hover:bg-accent/20"
            >
              Request current CV
            </a>
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-border-strong bg-background px-5 py-3 font-mono text-[10px] uppercase tracking-[0.25em] text-foreground hover:border-accent hover:text-accent"
            >
              GitHub
            </a>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-border-strong bg-background px-5 py-3 font-mono text-[10px] uppercase tracking-[0.25em] text-foreground hover:border-accent hover:text-accent"
            >
              Instagram
            </a>
            <Link
              to="/"
              className="border border-border bg-transparent px-5 py-3 font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground hover:text-foreground"
            >
              ← Back home
            </Link>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
