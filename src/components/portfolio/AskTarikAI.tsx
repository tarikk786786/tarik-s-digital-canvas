import { useState, useRef, useEffect, useCallback } from "react";
import {
  Sparkles,
  X,
  Send,
  ArrowUpRight,
  Bot,
  User,
  Check,
  Copy,
  Terminal,
  Zap,
  CornerDownLeft,
  ChevronRight,
  Compass,
} from "lucide-react";
import { WHATSAPP_URL } from "@/lib/contact-links";
import { soundEngine } from "@/lib/sound-engine";

export type Persona = "founder" | "developer" | "recruiter" | "beginner";

interface Message {
  id: string;
  sender: "user" | "ai";
  text: string;
  persona?: Persona;
  citations?: { label: string; href: string }[];
  timestamp: string;
}

const PERSONA_CONFIG: Record<Persona, { label: string; hint: string }> = {
  developer: { label: "Developer", hint: "Code architecture, stack trade-offs & technical rigor" },
  founder: { label: "Founder", hint: "0→1 velocity, product studio & business defensibility" },
  recruiter: { label: "Recruiter", hint: "Verified competencies, track record & leadership" },
  beginner: { label: "Beginner", hint: "Clear plain English analogies without cryptic jargon" },
};

const PRESET_QUESTIONS = [
  "What does Tarik build?",
  "Explain his Forensic + AI approach",
  "What is Dezo.in?",
  "What technologies does he use?",
  "What is his Operating System?",
  "How can we collaborate?",
];

// Verified Knowledge Base Entries for Deterministic RAG Matching
const KNOWLEDGE_BASE = [
  {
    keywords: ["who", "about", "tarik", "background", "bio", "identity", "multidisciplinary"],
    answer:
      "Tarik Islam is a multidisciplinary technologist, forensic scientist, cybersecurity engineer, AI systems builder, and founder of Dezo.in. He approaches software with an evidence-first mindset: question assumptions, verify truth through data, and engineer resilient systems that withstand scrutiny.",
    citations: [
      { label: "Inspect Who I Am (#about)", href: "#about" },
      { label: "View Timeline (#journey)", href: "#journey" },
    ],
  },
  {
    keywords: ["build", "product", "do", "what", "experience", "screens", "software"],
    answer:
      "Tarik builds high-performance digital products at the seam of AI, cybersecurity, and full-stack craft. Flagship works include Dezo.in (AI product studio), Aegis-DF (digital forensics & chain-of-custody engine), ThreatLens (AI threat detection dashboard), and this portfolio itself (built with TanStack Start, React 19, and Three.js).",
    citations: [
      { label: "Selected Work (#work)", href: "#work" },
      { label: "Digital Showroom (#showroom)", href: "#showroom" },
    ],
  },
  {
    keywords: ["forensic", "forensics", "evidence", "investigate", "crime", "chain of custody", "autopsy"],
    answer:
      "Forensic science is foundational to Tarik's methodology. He holds deep expertise across 7 forensic domains including Digital Forensics (memory autopsy, bitstream acquisition, SHA-512 verification), DNA & Serology, Questioned Documents, and Ballistics. His core axiom: 'Never assume when you can investigate.'",
    citations: [
      { label: "Forensic Domains Atlas (#domains)", href: "#domains" },
      { label: "Live Telemetry Scanner", href: "#top" },
    ],
  },
  {
    keywords: ["ai", "artificial intelligence", "agents", "llm", "rag", "neural", "models"],
    answer:
      "Tarik views AI not as a gimmick, but as an active reasoning layer. He engineers autonomous agent workflows, hybrid RAG systems (BM25 sparse + dense cross-encoder reranking), and neural inference pipelines that combine high velocity with strict source grounding to prevent hallucinations.",
    citations: [
      { label: "How I Build Lab (#how-i-build)", href: "#how-i-build" },
      { label: "Vision & Ambition (#vision)", href: "#vision" },
    ],
  },
  {
    keywords: ["cybersecurity", "security", "zero trust", "threat", "defense", "stride", "penetration"],
    answer:
      "In cybersecurity, Tarik applies Zero-Trust Architecture and STRIDE threat modeling. Systems are built under the assumption that networks are adversarial: strict authentication, immutable audit trails, cryptographic data isolation, and real-time behavioral anomaly scoring.",
    citations: [
      { label: "Capabilities Matrix (#capabilities)", href: "#capabilities" },
      { label: "Certifications (/certifications)", href: "/certifications" },
    ],
  },
  {
    keywords: ["dezo", "dezo.in", "company", "studio", "venture", "startup"],
    answer:
      "Dezo.in is Tarik's AI-native product studio. It operates at the intersection of intelligence, security, and human-centered design — translating forensic rigor into scalable consumer and enterprise software.",
    citations: [
      { label: "Dezo.in Section (#dezo)", href: "#dezo" },
      { label: "Visit Dezo.in (External)", href: "https://dezo.in" },
    ],
  },
  {
    keywords: ["operating system", "os", "methodology", "process", "loop", "routine", "kernel"],
    answer:
      "Tarik's Operating System is a deterministic 6-stage compounding cycle: RESEARCH (Understand the problem) → BUILD (Turn ideas into reality) → TEST (Find what breaks) → LEARN (Understand why) → IMPROVE (Make the next version better) → REPEAT.",
    citations: [
      { label: "Execution & Operating System (#execution)", href: "#execution" },
    ],
  },
  {
    keywords: ["tech", "stack", "tools", "languages", "code", "react", "typescript", "python", "rust"],
    answer:
      "Core stack: TypeScript, React 19, Next.js / TanStack Start, Tailwind CSS v4, Three.js / WebGL, Python, Rust, PostgreSQL, and Vercel Edge. Every tool is selected for deterministic performance, type safety, and verifiable reliability.",
    citations: [
      { label: "Technology Universe (#how-i-build)", href: "#how-i-build" },
      { label: "Skills Inventory (/skills)", href: "/skills" },
    ],
  },
  {
    keywords: ["contact", "hire", "collaborate", "work with", "reach", "email", "whatsapp", "idea"],
    answer:
      "Tarik is currently accepting selective engagements for Q3 2026. You can reach out directly via WhatsApp (+91 91144 11026), explore his work on GitHub (@tarikk786786), or connect via Instagram (@tarik_islam_786).",
    citations: [
      { label: "Contact Deck (#contact)", href: "#contact" },
      { label: "Direct WhatsApp Message", href: WHATSAPP_URL },
    ],
  },
];

export function AskTarikAI() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [persona, setPersona] = useState<Persona>("developer");
  const [activeSection, setActiveSection] = useState("Dossier Overview");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      sender: "ai",
      text: "Hello. I am Tarik's interactive portfolio guide, grounded directly in his verified case files, technical architecture, and philosophy. Choose an audience lens above and ask anything about his work.",
      citations: [
        { label: "Overview (#about)", href: "#about" },
        { label: "Execution Engine (#execution)", href: "#execution" },
      ],
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ]);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Auto scroll to bottom of chat
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen, isTyping]);

  // Track currently active section in page
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["contact", "showroom", "work", "how-i-build", "journey", "about", "top"];
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.45 && rect.bottom >= 100) {
            setActiveSection(id.toUpperCase());
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Listen for global shortcut
  useEffect(() => {
    const handleCustomOpen = () => {
      setIsOpen((prev) => !prev);
      soundEngine.playClick();
      setTimeout(() => inputRef.current?.focus(), 150);
    };
    window.addEventListener("tarik:open-ask-ai", handleCustomOpen);
    return () => window.removeEventListener("tarik:open-ask-ai", handleCustomOpen);
  }, []);

  const handleAsk = useCallback(
    (questionText: string) => {
      const q = questionText.trim();
      if (!q || isTyping) return;

      const userMsg: Message = {
        id: `user-${Date.now()}`,
        sender: "user",
        text: q,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      setMessages((prev) => [...prev, userMsg]);
      setQuery("");
      setIsTyping(true);
      soundEngine.playClick();

      // Semantic matching algorithm
      const lowerQ = q.toLowerCase();
      let bestMatch = KNOWLEDGE_BASE[0];
      let maxScore = -1;

      for (const entry of KNOWLEDGE_BASE) {
        let score = 0;
        for (const kw of entry.keywords) {
          if (lowerQ.includes(kw)) score += 1;
        }
        if (score > maxScore) {
          maxScore = score;
          bestMatch = entry;
        }
      }

      let baseText = bestMatch.answer;
      let responseCitations = bestMatch.citations;

      if (maxScore <= 0) {
        baseText = `Tarik approaches software, AI, and cybersecurity as unified engineering disciplines. You can review his full dossiers directly, or connect with him on WhatsApp to discuss: "${q}".`;
        responseCitations = [
          { label: "Selected Work (#work)", href: "#work" },
          { label: "Direct WhatsApp", href: WHATSAPP_URL },
        ];
      }

      // Modulate response based on selected Persona
      let modulatedText = baseText;
      if (persona === "developer") {
        modulatedText += " [Technical Architecture]: Core engineering utilizes React 19, TanStack Start, TypeScript strictness, custom Three.js WebGL shaders, and cryptographic auditability.";
      } else if (persona === "founder") {
        modulatedText += " [Venture Perspective]: Built for 0→1 execution velocity, defensible IP, high unit economics, and solving genuine market pain points via Dezo.in.";
      } else if (persona === "recruiter") {
        modulatedText += " [Competency Audit]: Verified background combining forensic precision, incident response security, autonomous AI development, and cross-functional team delivery.";
      } else if (persona === "beginner") {
        modulatedText += " [In Plain English]: Think of it like a digital detective who doesn't just find clues, but actually builds the tools and AI to keep computer systems safe.";
      }

      setTimeout(() => {
        const aiMsg: Message = {
          id: `ai-${Date.now()}`,
          sender: "ai",
          text: modulatedText,
          persona,
          citations: responseCitations,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        };
        setMessages((prev) => [...prev, aiMsg]);
        setIsTyping(false);
        soundEngine.playAiChime();
      }, 400);
    },
    [isTyping, persona]
  );

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    soundEngine.playClick();
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <>
      {/* Floating Ask Tarik AI Pill */}
      <div className="fixed bottom-6 left-6 z-40">
        <button
          type="button"
          onClick={() => {
            setIsOpen((prev) => !prev);
            soundEngine.playClick();
          }}
          className="group flex items-center gap-3 px-4 py-2.5 rounded-full bg-[#0A0D12]/90 hover:bg-[#11151C] border border-[#9B8CFF]/40 shadow-[0_0_24px_rgba(155,140,255,0.25)] text-foreground backdrop-blur-xl transition-all hover:scale-105 active:scale-95 cursor-pointer"
        >
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-[#9B8CFF] opacity-75" />
            <span className="relative inline-flex size-2 rounded-full bg-[#9B8CFF]" />
          </span>
          <Bot className="size-4 text-[#9B8CFF]" />
          <span className="font-mono text-xs uppercase tracking-widest text-[#9B8CFF] font-bold">
            {isOpen ? "CLOSE AI" : "ASK TARIK AI"}
          </span>
        </button>
      </div>

      {/* AI Assistant Modal */}
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Ask Tarik AI Guide"
          className="fixed bottom-20 left-4 right-4 md:right-auto md:left-6 z-50 w-auto md:w-[480px] h-[580px] max-h-[85vh] flex flex-col rounded-xl border border-white/10 bg-[#0A0D12]/95 backdrop-blur-2xl shadow-[0_25px_70px_rgba(0,0,0,0.85)] overflow-hidden font-mono text-xs animate-fade-in"
        >
          {/* Header */}
          <div className="px-4 py-3 border-b border-white/10 bg-white/[0.02] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bot className="size-4 text-[#9B8CFF]" />
              <div>
                <p className="font-bold text-foreground text-xs">ASK TARIK AI // KNOWLEDGE ENGINE</p>
                <p className="text-[10px] text-muted-foreground flex items-center gap-1">
                  <Compass className="size-3 text-[#62E6FF]" />
                  <span>Context: {activeSection}</span>
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="p-1 rounded hover:bg-white/10 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            >
              <X className="size-4" />
            </button>
          </div>

          {/* Persona Lens Switcher */}
          <div className="px-3 py-2 border-b border-white/5 bg-black/20 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            <span className="text-[9px] uppercase tracking-wider text-muted-foreground shrink-0">LENS:</span>
            {(["developer", "founder", "recruiter", "beginner"] as Persona[]).map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => {
                  setPersona(p);
                  soundEngine.playClick();
                }}
                className={`px-2.5 py-1 rounded text-[10px] uppercase tracking-wider font-bold transition-all shrink-0 cursor-pointer ${
                  persona === p
                    ? "bg-[#9B8CFF] text-[#050608] shadow-[0_0_12px_rgba(155,140,255,0.4)]"
                    : "bg-white/5 text-muted-foreground hover:text-foreground"
                }`}
                title={PERSONA_CONFIG[p].hint}
              >
                {PERSONA_CONFIG[p].label}
              </button>
            ))}
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex flex-col ${m.sender === "user" ? "items-end" : "items-start"} space-y-1`}
              >
                <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
                  <span>{m.sender === "user" ? "YOU" : "TARIK.AI"}</span>
                  {m.persona && (
                    <span className="text-[#9B8CFF] font-bold uppercase tracking-wider">[{m.persona}]</span>
                  )}
                  <span>{m.timestamp}</span>
                </div>
                <div
                  className={`max-w-[85%] p-3 rounded-lg leading-relaxed ${
                    m.sender === "user"
                      ? "bg-[#62E6FF]/10 text-foreground border border-[#62E6FF]/30"
                      : "bg-white/[0.03] text-foreground/90 border border-white/5"
                  }`}
                >
                  <p>{m.text}</p>
                  {m.citations && (
                    <div className="mt-3 pt-2 border-t border-white/10 flex flex-wrap gap-2 text-[10px]">
                      {m.citations.map((c) => (
                        <a
                          key={c.label}
                          href={c.href}
                          onClick={() => {
                            if (c.href.startsWith("#")) {
                              setIsOpen(false);
                            }
                          }}
                          className="inline-flex items-center gap-1 text-[#62E6FF] hover:underline"
                        >
                          {c.label} <ArrowUpRight className="size-3" />
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="text-[#9B8CFF] text-xs animate-pulse flex items-center gap-1.5">
                <Bot className="size-3.5" />
                <span>Grounded RAG synthesis in progress...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Preset Questions Bar */}
          <div className="px-3 py-1.5 border-t border-white/5 bg-white/[0.01] flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            <span className="text-[9px] uppercase tracking-wider text-muted-foreground shrink-0">SUGGEST:</span>
            {PRESET_QUESTIONS.map((q) => (
              <button
                key={q}
                type="button"
                onClick={() => handleAsk(q)}
                className="px-2 py-0.5 rounded bg-white/5 hover:bg-white/10 text-muted-foreground hover:text-foreground text-[10px] whitespace-nowrap transition-colors shrink-0 cursor-pointer"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Input Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleAsk(query);
            }}
            className="flex items-center gap-2 p-3 border-t border-white/10 bg-white/[0.02]"
          >
            <ChevronRight className="size-4 text-[#9B8CFF] shrink-0 animate-pulse" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Inquire about architecture, stack, or experience..."
              className="flex-1 bg-transparent text-xs text-foreground focus:outline-none placeholder:text-muted-foreground/50 font-mono"
            />
            <button
              type="submit"
              disabled={isTyping || !query.trim()}
              className="p-1.5 rounded bg-[#9B8CFF] text-[#050608] hover:bg-[#C4B5FD] transition-colors disabled:opacity-30 cursor-pointer"
            >
              <CornerDownLeft className="size-3.5 font-bold" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
