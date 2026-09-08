import { createFileRoute, Link } from "@tanstack/react-router";
import { Navigation } from "@/components/portfolio/Navigation";
import { Footer } from "@/components/portfolio/Footer";
import { PROFILE } from "@/lib/profile";
import {
  EMAIL_ADDRESS,
  EMAIL_URL,
  PHONE_NUMBER,
  LOCATION,
  WHATSAPP_URL,
  GITHUB_URL,
} from "@/lib/contact-links";
import {
  Printer,
  Mail,
  Phone,
  MapPin,
  GraduationCap,
  Award,
  CheckCircle2,
  FileCheck,
  Code2,
  Shield,
  Briefcase,
  ArrowLeft,
  ExternalLink,
  Sparkles,
  FlaskConical,
  Fingerprint,
  Dna,
  FileSearch,
  ShieldAlert,
  Terminal,
  Search,
} from "lucide-react";
import {
  FORENSIC_SPECIALTIES,
  WHY_I_CHOSE_TECH,
} from "@/content/forensic-specialties";

export const Route = createFileRoute("/resume")({
  head: () => ({
    meta: [
      { title: "Official Résumé — Tarik Islam | Forensic Scientist & Cyber Engineer" },
      {
        name: "description",
        content:
          "Official curriculum vitae of Tarik Islam — B.Sc & M.Sc Forensic Science, MCA, M.Tech Cybersecurity & AI. CEH, CHFI, OSCP certified practitioner, specialized in Forensic Toxicology, Dactyloscopy, Serology, and AI systems engineering.",
      },
      { property: "og:title", content: "Official Résumé — Tarik Islam" },
      {
        property: "og:description",
        content: "Academic qualifications, forensic specialties, certifications, and engineering profile.",
      },
      { property: "og:url", content: "/resume" },
    ],
    links: [{ rel: "canonical", href: "/resume" }],
  }),
  component: ResumePage,
});

function ResumePage() {
  const handlePrint = () => {
    window.print();
  };

  return (
    <main className="min-h-dvh bg-[#050608] text-foreground print:bg-white print:text-black">
      <div className="print:hidden">
        <Navigation />
      </div>

      <div className="mx-auto max-w-5xl px-6 pt-32 pb-24 md:px-10 print:p-0 print:pt-6">
        {/* Top Control Bar (Hidden on Print) */}
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4 print:hidden">
          <Link
            to="/"
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="size-4" />
            <span>RETURN TO PORTFOLIO</span>
          </Link>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-[#62E6FF]/40 bg-[#62E6FF]/10 hover:bg-[#62E6FF]/20 text-[#62E6FF] font-mono text-xs uppercase tracking-widest font-bold transition-all shadow-[0_0_15px_rgba(98,230,255,0.2)] cursor-pointer"
            >
              <Printer className="size-4" />
              <span>PRINT / SAVE PDF</span>
            </button>

            <a
              href={EMAIL_URL}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 text-xs font-mono uppercase tracking-widest text-foreground transition-all"
            >
              <Mail className="size-4 text-[#62E6FF]" />
              <span>EMAIL TARIK</span>
            </a>

            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-emerald-500/30 bg-emerald-500/10 hover:bg-emerald-500/20 text-xs font-mono uppercase tracking-widest text-emerald-400 transition-all"
            >
              <Phone className="size-4" />
              <span>WHATSAPP</span>
            </a>
          </div>
        </div>

        {/* Paper Document Container (Print & Screen Optimized) */}
        <article className="rounded-2xl border border-white/10 bg-[#0A0D12] p-8 md:p-14 shadow-2xl space-y-12 print:border-none print:shadow-none print:bg-white print:p-0">
          {/* Header Section */}
          <header className="border-b border-white/10 pb-8 print:border-black/20 print:pb-6">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
              <div>
                <div className="flex items-center gap-3">
                  <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-foreground print:text-black">
                    {PROFILE.name}
                  </h1>
                  <span className="print:hidden px-3 py-1 rounded-full bg-[#6EE7B7]/10 text-[#6EE7B7] text-xs font-mono font-semibold border border-[#6EE7B7]/30">
                    CURRICULUM VITAE
                  </span>
                </div>
                <p className="mt-2 font-mono text-sm md:text-base text-[#62E6FF] font-semibold print:text-black">
                  {PROFILE.identity}
                </p>
                <p className="mt-1 font-sans text-xs sm:text-sm text-muted-foreground print:text-neutral-700">
                  {PROFILE.primaryRole}
                </p>
              </div>

              {/* Coordinates Block */}
              <div className="space-y-1.5 font-mono text-xs text-muted-foreground print:text-black self-start">
                <div className="flex items-center gap-2">
                  <Mail className="size-3.5 text-[#62E6FF] print:text-black" />
                  <a href={`mailto:${EMAIL_ADDRESS}`} className="hover:text-[#62E6FF] print:no-underline">
                    {EMAIL_ADDRESS}
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="size-3.5 text-[#62E6FF] print:text-black" />
                  <span>{PHONE_NUMBER}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="size-3.5 text-[#62E6FF] print:text-black" />
                  <span>{LOCATION}</span>
                </div>
                <div className="flex items-center gap-2 pt-1">
                  <ExternalLink className="size-3.5 text-[#62E6FF] print:text-black" />
                  <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className="hover:text-foreground">
                    github.com/{PROFILE.name.toLowerCase().replace(/\s+/g, "")}
                  </a>
                </div>
              </div>
            </div>
          </header>

          {/* Professional Summary */}
          <section className="space-y-3">
            <h2 className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-[0.25em] text-[#62E6FF] print:text-black">
              <Briefcase className="size-4" />
              <span>PROFESSIONAL SUMMARY</span>
            </h2>
            <p className="font-sans text-sm md:text-base text-foreground/90 leading-relaxed print:text-black">
              {PROFILE.professionalSummary}
            </p>
          </section>

          {/* Why I Chose Tech Narrative Feature */}
          <section className="p-6 rounded-2xl border border-[#62E6FF]/25 bg-white/[0.02] print:border print:border-neutral-300 print:bg-neutral-50 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-[0.25em] text-[#62E6FF] print:text-black">
                <Search className="size-4" />
                <span>INVESTIGATIVE ORIGIN: WHY I CHOSE TECH</span>
              </h2>
              <span className="font-mono text-[10px] text-muted-foreground print:text-neutral-600">
                SCIENTIFIC CURIOSITY &rarr; DIGITAL SYSTEMS
              </span>
            </div>
            <p className="font-sans text-sm text-foreground/90 leading-relaxed print:text-black">
              My transition into technology was driven by an instinctive passion for research and scientific investigation. In forensic laboratories, I learned empirical rigor — isolating toxic compounds on a GC-MS, analyzing microscopic fingerprint minutiae, and following strict chains of custody. As critical societal infrastructure, financial transactions, and adversarial conflicts migrated into cyberspace, I realized that the greatest investigative frontier was software and artificial intelligence.
            </p>
            <p className="font-sans text-xs sm:text-sm text-muted-foreground print:text-neutral-700 leading-relaxed">
              In tech, investigation transforms from post-mortem documentation into active creation. I engineer resilient zero-trust architectures, build AI reasoning agents that see what others miss, and apply the exact evidentiary standards of a forensic scientist to production software engineering.
            </p>
          </section>

          {/* Academic Qualifications & Degrees */}
          <section className="space-y-5">
            <div className="flex items-center justify-between">
              <h2 className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-[0.25em] text-[#62E6FF] print:text-black">
                <GraduationCap className="size-4" />
                <span>ACADEMIC DEGREES &amp; SCIENTIFIC QUALIFICATIONS</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {PROFILE.education.map((edu, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-xl border border-white/5 bg-white/[0.02] print:border print:border-neutral-300 print:bg-neutral-50 flex flex-col justify-between space-y-3"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-mono text-[10px] text-[#62E6FF] print:text-black font-semibold">
                        0{idx + 1} // {edu.level.toUpperCase()}
                      </span>
                      <span className="px-2 py-0.5 rounded bg-white/5 print:bg-neutral-200 font-mono text-[10px] text-[#6EE7B7] print:text-black font-semibold">
                        {edu.status.toUpperCase()}
                      </span>
                    </div>

                    <h3 className="font-display font-bold text-lg text-foreground print:text-black mt-1">
                      {edu.degree} — {edu.field}
                    </h3>

                    <p className="font-sans text-xs text-muted-foreground print:text-neutral-700 mt-2 leading-relaxed">
                      {edu.highlights}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-white/5 print:border-neutral-200">
                    <div className="flex flex-wrap gap-1">
                      {edu.competencies.map((comp, cIdx) => (
                        <span
                          key={cIdx}
                          className="px-2 py-0.5 rounded bg-white/5 print:bg-neutral-200 font-mono text-[10px] text-foreground/80 print:text-black"
                        >
                          {comp}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Forensic Science Specialties */}
          <section className="space-y-5">
            <div className="flex items-center justify-between">
              <h2 className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-[0.25em] text-[#62E6FF] print:text-black">
                <FlaskConical className="size-4" />
                <span>FORENSIC SCIENCE SPECIALTIES &amp; LABORATORY MASTERY</span>
              </h2>
              <span className="font-mono text-[10px] text-muted-foreground print:text-neutral-600">
                COURT-ADMISSIBLE RIGOR
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {FORENSIC_SPECIALTIES.map((spec) => (
                <div
                  key={spec.id}
                  className="p-4 rounded-xl border border-white/5 bg-white/[0.02] print:border print:border-neutral-300 space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-display font-bold text-sm text-foreground print:text-black">
                      {spec.title}
                    </h3>
                    <span className="font-mono text-[9px] uppercase tracking-wider text-[#62E6FF] print:text-black">
                      {spec.category}
                    </span>
                  </div>
                  <p className="font-sans text-xs text-muted-foreground print:text-neutral-700 leading-relaxed">
                    {spec.summary}
                  </p>
                  <div className="pt-2 border-t border-white/5 print:border-neutral-200">
                    <span className="font-mono text-[10px] text-foreground/80 print:text-black block mb-1">
                      Key Instruments: {spec.instrumentation.slice(0, 2).join(", ")}
                    </span>
                    <span className="font-mono text-[9px] text-[#6EE7B7] print:text-black">
                      Standard: {spec.legalEvidentiaryStandard.split("&")[0]}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Certifications Featured on Resume */}
          <section className="space-y-4">
            <h2 className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-[0.25em] text-[#6EE7B7] print:text-black">
              <FileCheck className="size-4" />
              <span>PRIMARY PROFESSIONAL CERTIFICATIONS</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {PROFILE.resumeCertifications.map((cert) => (
                <div
                  key={cert.code}
                  className="p-4 rounded-xl border border-[#6EE7B7]/20 bg-[#6EE7B7]/5 print:border print:border-neutral-300 print:bg-white space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-base font-bold text-[#6EE7B7] print:text-black">
                      {cert.code}
                    </span>
                    <CheckCircle2 className="size-4 text-[#6EE7B7] print:text-black" />
                  </div>
                  <h4 className="font-display font-bold text-sm text-foreground print:text-black">
                    {cert.name}
                  </h4>
                  <p className="font-mono text-[11px] text-muted-foreground print:text-neutral-600">
                    Issuer: {cert.issuer}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Specialized Technical Training */}
          <section className="space-y-4">
            <h2 className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-[0.25em] text-[#9B8CFF] print:text-black">
              <Award className="size-4" />
              <span>SPECIALIZED TECHNICAL &amp; ADVANCED COMPUTING TRACKS</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-sans text-xs">
              {PROFILE.technicalTraining.map((t, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl border border-white/5 bg-white/[0.02] print:border print:border-neutral-300 space-y-1"
                >
                  <h4 className="font-display font-bold text-foreground print:text-black">{t.domain}</h4>
                  <p className="text-muted-foreground print:text-neutral-700 leading-relaxed text-[11px]">{t.focus}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Technical Skills & Languages Split */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-2">
            {/* Programming Languages */}
            <div className="space-y-3">
              <h2 className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-[0.25em] text-[#62E6FF] print:text-black">
                <Code2 className="size-4" />
                <span>PROGRAMMING LANGUAGES</span>
              </h2>
              <div className="flex flex-wrap gap-2">
                {PROFILE.programmingLanguages.map((lang) => (
                  <span
                    key={lang}
                    className="px-3 py-1.5 rounded-lg border border-white/10 bg-white/5 print:border print:border-neutral-300 font-mono text-xs text-foreground print:text-black font-semibold"
                  >
                    {lang}
                  </span>
                ))}
              </div>
            </div>

            {/* Core Competencies */}
            <div className="space-y-3">
              <h2 className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-[0.25em] text-[#62E6FF] print:text-black">
                <Shield className="size-4" />
                <span>CORE COMPETENCY DOMAINS</span>
              </h2>
              <div className="flex flex-wrap gap-2 font-mono text-xs">
                {[
                  "Cybersecurity & Ethical Hacking",
                  "Digital Forensics & Incident Response",
                  "AI Systems & Autonomous Reasoning",
                  "Forensic Toxicology & Chemical Profiling",
                  "Biometric Dactyloscopy & AFIS",
                  "Full Stack Web & Edge Architecture",
                  "OSINT & Reconnaissance Toolchains",
                ].map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 rounded-lg border border-white/10 bg-white/5 print:border print:border-neutral-300 text-foreground print:text-black"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </section>

          {/* Strengths & Working Principles */}
          <section className="space-y-3 pt-2">
            <h2 className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-[0.25em] text-[#F6C85F] print:text-black">
              <Sparkles className="size-4" />
              <span>CORE STRENGTHS &amp; ATTRIBUTES</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-sans text-xs">
              {PROFILE.strengths.map((str, i) => (
                <div
                  key={i}
                  className="p-3.5 rounded-xl border border-white/5 bg-white/[0.02] print:border print:border-neutral-300 flex items-start gap-2.5 text-foreground/90 print:text-black"
                >
                  <CheckCircle2 className="size-3.5 text-[#6EE7B7] print:text-black shrink-0 mt-0.5" />
                  <span>{str}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Formal Declaration Block */}
          <footer className="pt-8 border-t border-white/10 print:border-black/20 space-y-6">
            <div className="space-y-2 font-sans text-xs text-muted-foreground print:text-neutral-700 leading-relaxed">
              <p className="font-mono text-[10px] uppercase tracking-widest text-[#62E6FF] print:text-black font-semibold">
                FORMAL DECLARATION
              </p>
              <p>
                I hereby declare that all the information provided above is true and authentic to the best of my knowledge and belief. Academic degrees, forensic competencies, and professional credentials represent authentic multidisciplinary qualifications.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 font-mono text-xs pt-4">
              <div className="space-y-1 text-muted-foreground print:text-neutral-700">
                <p>Location: <strong className="text-foreground print:text-black">Bhubaneswar, India</strong></p>
                <p>Author: <strong className="text-foreground print:text-black">Tarik Islam</strong></p>
              </div>

              <div className="text-left sm:text-right space-y-1">
                <div className="font-display font-bold text-2xl text-foreground print:text-black italic">
                  Tarik Islam
                </div>
                <p className="text-[10px] text-muted-foreground print:text-neutral-600 uppercase tracking-widest">
                  AUTHOR SIGNATURE SEAL // VERIFIED
                </p>
              </div>
            </div>
          </footer>
        </article>
      </div>

      <div className="print:hidden">
        <Footer />
      </div>
    </main>
  );
}
