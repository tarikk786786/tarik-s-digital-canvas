import { createFileRoute, Link } from "@tanstack/react-router";
import { Navigation } from "@/components/portfolio/Navigation";
import { Footer } from "@/components/portfolio/Footer";

interface PolicyPageProps {
  title: string;
  intro: string;
  sections: { heading: string; body: string }[];
}

export function PolicyPage({ title, intro, sections }: PolicyPageProps) {
  return (
    <main className="min-h-dvh bg-background text-foreground">
      <Navigation />
      <article className="mx-auto max-w-3xl px-6 pt-32 pb-24 md:px-10">
        <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-accent">
          Protocol
        </p>
        <h1 className="mt-4 font-display text-4xl leading-tight tracking-tight md:text-5xl">
          {title}
        </h1>
        <p className="mt-6 max-w-[62ch] text-base leading-relaxed text-muted-foreground text-pretty">
          {intro}
        </p>

        <div className="mt-12 space-y-10">
          {sections.map((s) => (
            <section key={s.heading}>
              <h2 className="font-mono text-[11px] uppercase tracking-[0.3em] text-foreground">
                {s.heading}
              </h2>
              <p className="mt-3 max-w-[62ch] text-sm leading-relaxed text-muted-foreground text-pretty">
                {s.body}
              </p>
            </section>
          ))}
        </div>

        <Link
          to="/"
          className="mt-16 inline-block border border-border-strong bg-background px-5 py-3 font-mono text-[10px] uppercase tracking-[0.25em] text-foreground hover:border-accent hover:text-accent"
        >
          ← Back home
        </Link>
      </article>
      <Footer />
    </main>
  );
}

// -----------------------------------------------------------------
// Route stubs: /privacy /accessibility /security wired via separate files.
// -----------------------------------------------------------------
export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy — Tarik Islam" },
      { name: "description", content: "How this site handles data and visitor privacy." },
      { property: "og:title", content: "Privacy — Tarik Islam" },
      { property: "og:url", content: "/privacy" },
    ],
    links: [{ rel: "canonical", href: "/privacy" }],
  }),
  component: () => (
    <PolicyPage
      title="Privacy"
      intro="This site is intentionally minimal. It does not fingerprint visitors, sell data, or run invasive tracking."
      sections={[
        {
          heading: "What is collected",
          body: "Only what is required to operate the site and respond to your messages. No third-party ad networks. No hidden trackers.",
        },
        {
          heading: "Forms and contact",
          body: "When you send a message through the contact form or WhatsApp, that message is used only to reply to you.",
        },
        {
          heading: "Your rights",
          body: "You can request deletion of any data associated with a message you sent by contacting Tarik directly.",
        },
      ]}
    />
  ),
});
