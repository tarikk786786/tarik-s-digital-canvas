import { WHATSAPP_URL } from "@/lib/contact-links";
import { SectionHead } from "./Capabilities";

interface PendingEvidenceProps {
  num: string;
  label: string;
  headline: string;
  note: string;
  sectionId?: string;
}

/**
 * Displayed in place of any section whose content is not yet verified.
 * Keeps the forensic case-file aesthetic without publishing unverified claims.
 */
export function PendingEvidence({
  num,
  label,
  headline,
  note,
  sectionId,
}: PendingEvidenceProps) {
  return (
    <section
      id={sectionId}
      className="border-b border-border py-24 md:py-32"
    >
      <div className="mx-auto max-w-[1600px] px-6 md:px-10">
        <SectionHead num={num} label={label}>
          {headline}
        </SectionHead>

        <div className="mt-16 grid gap-8 border border-dashed border-border-strong bg-surface/40 p-10 md:grid-cols-[auto_1fr_auto] md:items-center md:p-14">
          {/* Evidence tag */}
          <div className="flex flex-col gap-3">
            <span className="inline-flex w-fit items-center gap-2 border border-accent/60 bg-accent/5 px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.3em] text-accent">
              <span className="size-1.5 rounded-full bg-accent animate-pulse-dot" />
              Verification pending
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
              Evidence · sealed
            </span>
          </div>

          {/* Copy */}
          <p className="max-w-[62ch] text-base leading-relaxed text-muted-foreground text-pretty md:text-lg">
            {note}
          </p>

          {/* CTA */}
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 self-start border border-border-strong bg-background px-5 py-3 font-mono text-[10px] uppercase tracking-[0.25em] text-foreground transition-all hover:border-accent hover:text-accent md:self-center"
          >
            Request details
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
