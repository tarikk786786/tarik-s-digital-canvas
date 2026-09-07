import { GITHUB_URL } from "@/lib/contact-links";

export function Footer() {
  return (
    <footer className="border-t border-border bg-background py-8">
      <div className="mx-auto flex max-w-[1600px] flex-col items-start justify-between gap-4 px-6 font-mono text-[10px] uppercase tracking-[0.2em] md:flex-row md:items-center md:px-10">
        <p className="text-muted-foreground">
          © 2026 Tarik Islam. Built with forensic precision.
        </p>

        <div className="flex flex-wrap items-center gap-6">
          <a
            href="/privacy"
            className="text-muted-foreground transition-colors hover:text-accent"
          >
            Privacy
          </a>
          <a
            href="/accessibility"
            className="text-muted-foreground transition-colors hover:text-accent"
          >
            Accessibility
          </a>
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground transition-colors hover:text-accent"
          >
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}
