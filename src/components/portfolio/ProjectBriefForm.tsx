import { useState, useEffect } from "react";
import { Check, X, Send, Copy, ArrowRight, ArrowLeft, Sparkles, MessageSquare } from "lucide-react";
import { soundEngine } from "@/lib/sound-engine";
import { WHATSAPP_URL } from "@/lib/contact-links";

const DOMAINS = [
  { id: "ai", label: "AI Product Studio", desc: "Autonomous agents, RAG, neural pipelines, LLM interfaces" },
  { id: "cyber", label: "Cybersecurity & Forensics", desc: "Zero Trust, STRIDE threat modeling, digital evidence triage" },
  { id: "web", label: "Full-Stack Web Platform", desc: "React 19, Three.js 3D, TypeScript, ultra-fast cloud deployment" },
  { id: "advisory", label: "Technical Advisory / 0→1", desc: "Architectural strategy, venture prototyping, feasibility audit" },
];

const STAGES = [
  { id: "concept", label: "Early Concept (0 → 1)", desc: "From idea to working production-grade prototype" },
  { id: "scaling", label: "Scaling Existing System", desc: "Performance optimization, refactoring, hardening" },
  { id: "audit", label: "Security & Code Audit", desc: "Vulnerability analysis, chain-of-custody verification" },
  { id: "custom", label: "Bespoke Venture Build", desc: "Dedicated execution squad via Dezo.in" },
];

const TIMELINES = [
  { id: "q3_2026", label: "Q3 2026 Engagement", desc: "Standard upcoming selective intake" },
  { id: "urgent", label: "Urgent Priority Sprint", desc: "Time-critical delivery or crisis response" },
  { id: "exploratory", label: "Exploratory / Discovery", desc: "Initial feasibility assessment and dialogue" },
];

export function ProjectBriefForm() {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [selectedDomain, setSelectedDomain] = useState(DOMAINS[0]);
  const [selectedStage, setSelectedStage] = useState(STAGES[0]);
  const [selectedTimeline, setSelectedTimeline] = useState(TIMELINES[0]);
  const [clientName, setClientName] = useState("");
  const [clientContact, setClientContact] = useState("");
  const [projectNotes, setProjectNotes] = useState("");
  const [briefId, setBriefId] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleOpen = () => {
      setIsOpen(true);
      soundEngine.playClick();
      if (!briefId) {
        setBriefId(`TB-2026-${Math.random().toString(36).substring(2, 6).toUpperCase()}`);
      }
    };
    window.addEventListener("tarik:open-project-brief", handleOpen);
    return () => window.removeEventListener("tarik:open-project-brief", handleOpen);
  }, [briefId]);

  if (!isOpen) return null;

  const generateBriefMarkdown = () => {
    return `### TARIK ISLAM // STRUCTURED ENGAGEMENT BRIEF [${briefId}]
- **Domain:** ${selectedDomain.label}
- **Stage:** ${selectedStage.label}
- **Timeline:** ${selectedTimeline.label}
- **Client/Contact:** ${clientName || "Undisclosed"} (${clientContact || "WhatsApp/Email"})
- **Scope / Problem Statement:** ${projectNotes || "To be clarified during initial technical briefing."}
- **Status:** Pending Technical Review by Tarik Islam
- **Generated:** ${new Date().toISOString()}`;
  };

  const copyBrief = () => {
    navigator.clipboard.writeText(generateBriefMarkdown());
    setCopied(true);
    soundEngine.playClick();
    setTimeout(() => setCopied(false), 2000);
  };

  const sendWhatsApp = () => {
    const text = encodeURIComponent(
      `Hello Tarik, I generated a Project Brief on your Digital Canvas:\n\n*Brief ID:* ${briefId}\n*Domain:* ${selectedDomain.label}\n*Stage:* ${selectedStage.label}\n*Timeline:* ${selectedTimeline.label}\n*Name:* ${clientName}\n*Contact:* ${clientContact}\n*Notes:* ${projectNotes || "None"}`
    );
    window.open(`https://wa.me/919114411026?text=${text}`, "_blank");
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Project Brief Builder"
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-[#050608]/85 backdrop-blur-md"
      onClick={() => setIsOpen(false)}
    >
      <div
        className="w-full max-w-xl rounded-xl border border-white/10 bg-[#0A0D12] shadow-[0_25px_70px_rgba(0,0,0,0.85)] p-6 space-y-6 font-mono select-none"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-2">
            <Sparkles className="size-4 text-[#62E6FF]" />
            <span className="text-xs font-bold uppercase tracking-widest text-[#62E6FF]">
              ENGAGEMENT BRIEF INTAKE // STEP 0{step} OF 04
            </span>
          </div>
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="p-1 rounded hover:bg-white/10 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
          >
            <X className="size-4" />
          </button>
        </div>

        {/* Step 1: Domain */}
        {step === 1 && (
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-bold text-foreground">Select Primary System Domain</h4>
              <p className="text-xs text-muted-foreground">What core technical discipline anchors your project?</p>
            </div>
            <div className="space-y-2">
              {DOMAINS.map((dom) => (
                <button
                  key={dom.id}
                  type="button"
                  onClick={() => {
                    setSelectedDomain(dom);
                    soundEngine.playClick();
                  }}
                  className={`w-full p-3 rounded-lg border text-left transition-all cursor-pointer ${
                    selectedDomain.id === dom.id
                      ? "border-[#62E6FF] bg-[#62E6FF]/10 text-foreground shadow-[0_0_16px_rgba(98,230,255,0.15)]"
                      : "border-white/5 bg-white/[0.02] text-muted-foreground hover:border-white/20"
                  }`}
                >
                  <p className="text-xs font-bold text-foreground">{dom.label}</p>
                  <p className="text-[11px] text-muted-foreground mt-0.5">{dom.desc}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Stage */}
        {step === 2 && (
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-bold text-foreground">Select System Maturity</h4>
              <p className="text-xs text-muted-foreground">Where does this project currently stand?</p>
            </div>
            <div className="space-y-2">
              {STAGES.map((stg) => (
                <button
                  key={stg.id}
                  type="button"
                  onClick={() => {
                    setSelectedStage(stg);
                    soundEngine.playClick();
                  }}
                  className={`w-full p-3 rounded-lg border text-left transition-all cursor-pointer ${
                    selectedStage.id === stg.id
                      ? "border-[#62E6FF] bg-[#62E6FF]/10 text-foreground shadow-[0_0_16px_rgba(98,230,255,0.15)]"
                      : "border-white/5 bg-white/[0.02] text-muted-foreground hover:border-white/20"
                  }`}
                >
                  <p className="text-xs font-bold text-foreground">{stg.label}</p>
                  <p className="text-[11px] text-muted-foreground mt-0.5">{stg.desc}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 3: Timeline */}
        {step === 3 && (
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-bold text-foreground">Engagement Horizon & Timeline</h4>
              <p className="text-xs text-muted-foreground">When are you targeting deployment or kickoff?</p>
            </div>
            <div className="space-y-2">
              {TIMELINES.map((tml) => (
                <button
                  key={tml.id}
                  type="button"
                  onClick={() => {
                    setSelectedTimeline(tml);
                    soundEngine.playClick();
                  }}
                  className={`w-full p-3 rounded-lg border text-left transition-all cursor-pointer ${
                    selectedTimeline.id === tml.id
                      ? "border-[#62E6FF] bg-[#62E6FF]/10 text-foreground shadow-[0_0_16px_rgba(98,230,255,0.15)]"
                      : "border-white/5 bg-white/[0.02] text-muted-foreground hover:border-white/20"
                  }`}
                >
                  <p className="text-xs font-bold text-foreground">{tml.label}</p>
                  <p className="text-[11px] text-muted-foreground mt-0.5">{tml.desc}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 4: Details & Summary */}
        {step === 4 && (
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-bold text-foreground">Coordinates & Scope Notes</h4>
              <p className="text-xs text-muted-foreground">Brief ID: {briefId}</p>
            </div>
            <div className="space-y-3">
              <div>
                <label className="block text-[10px] uppercase text-muted-foreground mb-1">Your Name / Organization</label>
                <input
                  type="text"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  placeholder="e.g. Elena Vance / Aegis Dynamics"
                  className="w-full px-3 py-2 rounded bg-white/[0.03] border border-white/10 text-xs text-foreground focus:outline-none focus:border-[#62E6FF]"
                />
              </div>
              <div>
                <label className="block text-[10px] uppercase text-muted-foreground mb-1">Email / Phone / Telegram</label>
                <input
                  type="text"
                  value={clientContact}
                  onChange={(e) => setClientContact(e.target.value)}
                  placeholder="e.g. elena@aegis.com or +1 (555) 019-2834"
                  className="w-full px-3 py-2 rounded bg-white/[0.03] border border-white/10 text-xs text-foreground focus:outline-none focus:border-[#62E6FF]"
                />
              </div>
              <div>
                <label className="block text-[10px] uppercase text-muted-foreground mb-1">Project Notes / Core Challenge</label>
                <textarea
                  rows={3}
                  value={projectNotes}
                  onChange={(e) => setProjectNotes(e.target.value)}
                  placeholder="Describe your technical requirements, goals, or questions..."
                  className="w-full px-3 py-2 rounded bg-white/[0.03] border border-white/10 text-xs text-foreground focus:outline-none focus:border-[#62E6FF]"
                />
              </div>
            </div>
          </div>
        )}

        {/* Navigation Controls */}
        <div className="flex items-center justify-between border-t border-white/10 pt-4 text-xs">
          {step > 1 ? (
            <button
              type="button"
              onClick={() => {
                setStep((prev) => prev - 1);
                soundEngine.playClick();
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded hover:bg-white/10 text-muted-foreground transition-colors cursor-pointer"
            >
              <ArrowLeft className="size-3.5" /> Back
            </button>
          ) : (
            <div />
          )}

          {step < 4 ? (
            <button
              type="button"
              onClick={() => {
                setStep((prev) => prev + 1);
                soundEngine.playClick();
              }}
              className="flex items-center gap-1.5 px-4 py-2 rounded bg-[#62E6FF] text-[#050608] font-bold hover:bg-[#A5F3FC] transition-all cursor-pointer"
            >
              Next Step <ArrowRight className="size-3.5" />
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={copyBrief}
                className="flex items-center gap-1.5 px-3 py-2 rounded border border-white/15 hover:bg-white/5 text-foreground transition-colors cursor-pointer"
              >
                {copied ? <Check className="size-3.5 text-[#6EE7B7]" /> : <Copy className="size-3.5" />}
                <span>{copied ? "Copied" : "Copy"}</span>
              </button>
              <button
                type="button"
                onClick={sendWhatsApp}
                className="flex items-center gap-1.5 px-4 py-2 rounded bg-emerald-500 text-[#050608] font-bold hover:bg-emerald-400 transition-all cursor-pointer shadow-[0_0_16px_rgba(16,185,129,0.3)]"
              >
                <MessageSquare className="size-3.5" />
                <span>Send via WhatsApp</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
