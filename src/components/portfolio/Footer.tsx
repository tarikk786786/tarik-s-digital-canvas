import { GITHUB_URL, INSTAGRAM_URL, WHATSAPP_URL } from "@/lib/contact-links";

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface/40 py-10">
      <div className="mx-auto flex max-w-[1600px] flex-col items-start justify-between gap-6 px-6 md:flex-row md:items-center md:px-10">
        <div className="flex items-center gap-4">
          <span className="grid size-8 place-items-center rounded-full border border-border-strong bg-background font-mono text-[11px] font-semibold tracking-[0.15em] text-accent transition-all duration-500 hover:border-accent hover:shadow-[0_0_20px_-4px_var(--accent)]">
            TI
          </span>


          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
            © {new Date().getFullYear()} Tarik Islam · All protocols reserved
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-6">
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground hover:text-accent"
          >
            GitHub
          </a>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground hover:text-accent"
          >
            Instagram
          </a>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground hover:text-accent"
          >
            WhatsApp
          </a>
        </div>

        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
          Built with quiet obsession.
        </p>
      </div>
    </footer>
  );
}
