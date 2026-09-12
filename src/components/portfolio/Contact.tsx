import { useState } from "react";
import {
  WHATSAPP_URL,
  WHATSAPP_NUMBER,
  WHATSAPP_DISPLAY,
  EMAIL_ADDRESS,
  EMAIL_URL,
  PHONE_NUMBER,
  LOCATION,
  INSTAGRAM_URL,
  INSTAGRAM_HANDLE,
  GITHUB_URL,
  GITHUB_HANDLE,
} from "@/lib/contact-links";
import { TiltCard3D } from "./TiltCard3D";
import { Send, MessageSquare, Mail, Instagram, Github, ShieldCheck, Copy, Check, Clock, ArrowUpRight, MapPin } from "lucide-react";

export function Contact() {
  const [name, setName] = useState("");
  const [inquiryType, setInquiryType] = useState("AI Systems & LLM Architecture");
  const [message, setMessage] = useState("");
  const [copied, setCopied] = useState(false);

  const PGP_FINGERPRINT = "786A 9114 4110 26DF E8A8 38F0 6E8E F7B9";

  const handleWhatsAppSend = (e: React.FormEvent) => {
    e.preventDefault();
    const formatted = `Hello Tarik, my name is ${name || "Visitor"}.%0A%0A*Focus Area:* ${inquiryType}%0A*Message:* ${message || "I visited your digital canvas and would like to discuss collaboration."}`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${formatted}`, "_blank");
  };

  const copyFingerprint = () => {
    navigator.clipboard.writeText(PGP_FINGERPRINT);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      id="contact"
      className="relative py-28 md:py-36 px-6 md:px-12 lg:px-16 bg-[#050608] border-t border-white/5 overflow-hidden"
    >
      {/* Background ambient lighting — Pure optical radial mesh */}
      <div className="absolute inset-0 pointer-events-none ambient-mesh-split opacity-60" />

      <div className="relative max-w-[1600px] mx-auto">
        
        {/* Section Numbering */}
        <div className="flex items-center gap-3 mb-4">
          <span className="font-mono text-xs font-bold uppercase tracking-[0.25em] text-[#62E6FF]">
            06 /
          </span>
          <span className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">
            CONNECT
          </span>
        </div>

        {/* Availability Badge */}
        <div className="flex items-center gap-3 mb-6">
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-75" />
            <span className="relative inline-flex size-2 rounded-full bg-accent" />
          </span>
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-accent font-semibold">
            ACCEPTING Q3 2026 HIGH-STAKES ENGAGEMENTS
          </span>
        </div>

        {/* Headline */}
        <div className="max-w-4xl mb-16">
          <h2 className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-extrabold tracking-tighter leading-[0.98] text-foreground mb-6">
            Let's build{" "}
            <span className="italic font-light text-gradient-flow">
              something real.
            </span>
          </h2>
          <p className="font-sans text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed text-pretty max-w-2xl">
            Whether it's an autonomous AI system, a zero-trust cyber defense audit, forensic consultation, or a founding collaboration with <strong className="text-foreground">Dezo.in</strong> — let's connect directly.
          </p>
        </div>

        {/* Contact Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* LEFT: Direct Coordinates Cards (5 cols) */}
          <div className="lg:col-span-5 space-y-5">
            
            {/* Direct Verified Email Card */}
            <a
              href={EMAIL_URL}
              className="group block p-6 rounded-2xl border border-white/10 bg-gradient-to-br from-[#14161C]/90 to-[#0F1116] hover:border-[#62E6FF]/50 transition-all duration-300 shadow-lg hover:shadow-[0_0_30px_rgba(98,230,255,0.15)]"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="size-10 rounded-xl bg-[#62E6FF]/10 border border-[#62E6FF]/20 flex items-center justify-center text-[#62E6FF]">
                    <Mail className="size-5" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-bold text-foreground group-hover:text-[#62E6FF] transition-colors">
                      Direct Email Dispatch
                    </h3>
                    <p className="font-mono text-xs text-muted-foreground">{EMAIL_ADDRESS}</p>
                  </div>
                </div>
                <ArrowUpRight className="size-5 text-muted-foreground group-hover:text-[#62E6FF] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </div>
              <p className="font-sans text-xs text-muted-foreground">
                Primary channel for forensic consultations, architecture audits, and Dezo.in venture briefs.
              </p>
            </a>

            {/* WhatsApp Card */}
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group block p-6 rounded-2xl border border-white/10 bg-gradient-to-br from-[#14161C]/90 to-[#0F1116] hover:border-emerald-500/50 transition-all duration-300 shadow-lg hover:shadow-[0_0_30px_rgba(16,185,129,0.15)]"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="size-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                    <MessageSquare className="size-5" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-bold text-foreground group-hover:text-emerald-400 transition-colors">
                      WhatsApp Dispatch
                    </h3>
                    <p className="font-mono text-xs text-muted-foreground">{WHATSAPP_DISPLAY}</p>
                  </div>
                </div>
                <ArrowUpRight className="size-5 text-muted-foreground group-hover:text-emerald-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </div>
              <p className="font-sans text-xs text-muted-foreground">
                Rapid response channel for technical collaboration, triage, and instant messaging.
              </p>
            </a>

            {/* Instagram Card */}
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group block p-6 rounded-2xl border border-white/10 bg-gradient-to-br from-[#14161C]/90 to-[#0F1116] hover:border-pink-500/50 transition-all duration-300 shadow-lg hover:shadow-[0_0_30px_rgba(236,72,153,0.15)]"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="size-10 rounded-xl bg-pink-500/10 border border-pink-500/20 flex items-center justify-center text-pink-400">
                    <Instagram className="size-5" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-bold text-foreground group-hover:text-pink-400 transition-colors">
                      Instagram Signal
                    </h3>
                    <p className="font-mono text-xs text-muted-foreground">@{INSTAGRAM_HANDLE}</p>
                  </div>
                </div>
                <ArrowUpRight className="size-5 text-muted-foreground group-hover:text-pink-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </div>
              <p className="font-sans text-xs text-muted-foreground">
                Follow updates on Dezo.in build logs, forensic tech, and AI research dispatches.
              </p>
            </a>

            {/* GitHub Card */}
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group block p-6 rounded-2xl border border-white/10 bg-gradient-to-br from-[#14161C]/90 to-[#0F1116] hover:border-blue-500/50 transition-all duration-300 shadow-lg hover:shadow-[0_0_30px_rgba(59,130,246,0.15)]"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="size-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                    <Github className="size-5" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-bold text-foreground group-hover:text-blue-400 transition-colors">
                      GitHub Source Enclave
                    </h3>
                    <p className="font-mono text-xs text-muted-foreground">@{GITHUB_HANDLE}</p>
                  </div>
                </div>
                <ArrowUpRight className="size-5 text-muted-foreground group-hover:text-blue-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </div>
              <p className="font-sans text-xs text-muted-foreground">
                Public repositories, open-source toolchains, and forensic research codebases.
              </p>
            </a>

            {/* Cryptographic Key / Security Fingerprint Card */}
            <div className="p-5 rounded-xl border border-white/5 bg-black/40 font-mono text-xs text-muted-foreground space-y-2">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-accent text-[10px] uppercase tracking-widest">
                  <ShieldCheck className="size-3.5" />
                  <span>PGP SECURITY FINGERPRINT</span>
                </span>
                <button
                  type="button"
                  onClick={copyFingerprint}
                  className="flex items-center gap-1 text-[10px] text-muted-foreground hover:text-accent transition-colors"
                >
                  {copied ? <Check className="size-3 text-emerald-400" /> : <Copy className="size-3" />}
                  <span>{copied ? "COPIED" : "COPY"}</span>
                </button>
              </div>
              <p className="text-[11px] text-foreground/80 tracking-wider truncate font-semibold">
                {PGP_FINGERPRINT}
              </p>
            </div>

          </div>

          {/* RIGHT: Interactive Quick Message Composer (7 cols) */}
          <div className="lg:col-span-7">
            <TiltCard3D glowColor="rgba(98, 230, 255, 0.2)" tiltIntensity={8}>
              <form
                onSubmit={handleWhatsAppSend}
                className="p-8 md:p-10 rounded-2xl border border-white/10 bg-[#0A0D12] shadow-2xl space-y-6"
              >
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div className="flex items-center gap-2">
                    <Send className="size-4 text-accent" />
                    <span className="font-mono text-xs font-bold uppercase tracking-widest text-foreground">
                      DIRECT INQUIRY COMPOSER
                    </span>
                  </div>
                  <span className="font-mono text-[10px] text-accent/80 uppercase tracking-widest">
                    ENCRYPTED DISPATCH
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-mono text-[11px] uppercase tracking-wider text-muted-foreground mb-2">
                      YOUR NAME / ORGANIZATION
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Elena Vance / Aegis Labs"
                      className="w-full px-4 py-3 rounded-lg border border-white/10 bg-white/5 font-sans text-sm text-foreground focus:outline-none focus:border-accent transition-colors placeholder:text-muted-foreground/40"
                    />
                  </div>

                  <div>
                    <label className="block font-mono text-[11px] uppercase tracking-wider text-muted-foreground mb-2">
                      FOCUS AREA
                    </label>
                    <select
                      value={inquiryType}
                      onChange={(e) => setInquiryType(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-white/10 bg-[#0A0D12] font-sans text-sm text-foreground focus:outline-none focus:border-accent transition-colors"
                    >
                      <option>AI Systems &amp; LLM Architecture</option>
                      <option>Cybersecurity &amp; Threat Audit</option>
                      <option>Digital Forensics Consultation</option>
                      <option>Dezo.in Product Studio Inquiry</option>
                      <option>Full Stack System Build</option>
                      <option>Other Stealth Collaboration</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-mono text-[11px] uppercase tracking-wider text-muted-foreground mb-2">
                    PROJECT BRIEF OR MESSAGE
                  </label>
                  <textarea
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Provide context regarding scope, timelines, or specific technical requirements..."
                    className="w-full px-4 py-3 rounded-lg border border-white/10 bg-white/5 font-sans text-sm text-foreground focus:outline-none focus:border-accent transition-colors placeholder:text-muted-foreground/40 resize-none"
                  />
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <button
                    type="submit"
                    className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 rounded-md bg-accent text-[#050608] font-mono text-xs uppercase tracking-widest font-bold shadow-[0_0_24px_rgba(98,230,255,0.3)] hover:bg-accent-glow hover:shadow-[0_0_36px_rgba(98,230,255,0.5)] transition-all active:scale-[0.98] cursor-pointer"
                  >
                    <span>DISPATCH VIA WHATSAPP</span>
                    <Send className="size-4" />
                  </button>

                  <p className="font-mono text-[11px] text-muted-foreground flex items-center gap-1.5">
                    <Clock className="size-3.5 text-accent" />
                    <span>Avg response: &lt; 24 hours</span>
                  </p>
                </div>
              </form>
            </TiltCard3D>
          </div>

        </div>

      </div>
    </section>
  );
}
