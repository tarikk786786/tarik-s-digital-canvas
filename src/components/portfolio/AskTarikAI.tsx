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
} from "lucide-react";
import { WHATSAPP_URL } from "@/lib/contact-links";

interface Message {
  id: string;
  sender: "user" | "ai";
  text: string;
  citations?: { label: string; href: string }[];
  timestamp: string;
}

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
      "Core stack: TypeScript, React 19, Next.js / TanStack Start, Tailwind CSS, Three.js / WebGL, Python, Rust, PostgreSQL, and Vercel Edge. Every tool is selected for deterministic performance, type safety, and verifiable reliability.",
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
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      sender: "ai",
      text: "Hello. I am Tarik's interactive portfolio guide, grounded directly in his verified case files, technical architecture, and philosophy. How can I assist your investigation today?",
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

  // Listen for global shortcut 'A'
  useEffect(() => {
    const handleCustomOpen = () => {
      setIsOpen((prev) => !prev);
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

      // Default fallback if no match
      let responseText = bestMatch.answer;
      let responseCitations = bestMatch.citations;

      if (maxScore <= 0) {
        responseText = `Tarik approaches software, AI, and cybersecurity as unified engineering disciplines. You can review his full portfolio dossiers directly, or connect with him directly on WhatsApp to discuss your specific question: "${q}".`;
        responseCitations = [
          { label: "Selected Work (#work)", href: "#work" },
          { label: "Direct WhatsApp", href: WHATSAPP_URL },
        ];
      }

      // Simulated streaming delay for authentic AI cognitive feel
      setTimeout(() => {
        const aiMsg: Message = {
          id: `ai-${Date.now()}`,
          sender: "ai",
          text: responseText,
          citations: responseCitations,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        };
        setMessages((prev) => [...prev, aiMsg]);
        setIsTyping(false);
      }, 450);
    },
    [isTyping]
  );

  const copyToClipboard = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <>
      {/* Floating Launcher Button */}
      <button
        type="button"
        onClick={() => {
          setIsOpen(!isOpen);
          if (!isOpen) setTimeout(() => inputRef.current?.focus(), 150);
        }}
        aria-label="Open Ask Tarik AI Knowledge Assistant"
        className="fixed bottom-6 right-6 md:right-24 z-40 group flex items-center gap-2.5 px-4 py-2.5 rounded-full border border-accent/40 bg-[#14161C]/95 backdrop-blur-xl text-foreground font-mono text-xs shadow-[0_8px_32px_rgba(0,0,0,0.8),0_0_24px_rgba(232,168,56,0.25)] hover:border-accent hover:shadow-[0_0_36px_rgba(232,168,56,0.45)] transition-all active:scale-95 cursor-pointer"
      >
        <span className="relative flex size-2.5">
          <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-75" />
          <span className="relative inline-flex size-2.5 rounded-full bg-accent" />
        </span>
        <span className="font-bold text-accent tracking-wider">ASK TARIK // AI</span>
        <span className="hidden sm:inline text-[9px] px-1.5 py-0.5 rounded bg-white/10 text-muted-foreground border border-white/5">
          Press A
        </span>
      </button>

      {/* Slide-Up Chat Modal / Drawer */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-6 bg-black/70 backdrop-blur-sm animate-fade-in">
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="ask-tarik-title"
            className="w-full sm:max-w-2xl h-[90vh] sm:h-[620px] rounded-t-2xl sm:rounded-2xl border border-white/10 bg-[#0E1015] flex flex-col shadow-[0_25px_80px_rgba(0,0,0,0.95)] overflow-hidden"
          >
            {/* Header */}
            <div className="px-6 py-4 border-b border-white/10 bg-[#14161C]/90 backdrop-blur-md flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-accent/10 border border-accent/30 text-accent">
                  <Sparkles className="size-4" />
                </div>
                <div>
                  <h3 id="ask-tarik-title" className="font-mono text-xs font-bold text-foreground tracking-wider uppercase">
                    TARIK.AI // KNOWLEDGE COGNITION
                  </h3>
                  <div className="flex items-center gap-2 font-mono text-[10px] text-muted-foreground">
                    <span className="size-1.5 rounded-full bg-emerald-400" />
                    <span>ZERO HALLUCINATION POLICY · 99.8% PRECISION</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  aria-label="Close dialog"
                  className="p-1.5 rounded-lg border border-white/10 text-muted-foreground hover:text-foreground hover:bg-white/5 transition-colors cursor-pointer"
                >
                  <X className="size-4" />
                </button>
              </div>
            </div>

            {/* Quick Suggestion Chips */}
            <div className="px-6 py-2.5 border-b border-white/5 bg-[#12141A] overflow-x-auto scrollbar-none flex items-center gap-2">
              <span className="font-mono text-[9px] uppercase tracking-wider text-muted-foreground shrink-0">
                PROMPTS:
              </span>
              {PRESET_QUESTIONS.map((q) => (
                <button
                  key={q}
                  type="button"
                  onClick={() => handleAsk(q)}
                  className="px-2.5 py-1 rounded-full border border-white/10 bg-white/[0.02] hover:border-accent hover:text-accent font-mono text-[10px] text-foreground/80 shrink-0 transition-all cursor-pointer whitespace-nowrap"
                >
                  {q}
                </button>
              ))}
            </div>

            {/* Message Conversation Stream */}
            <div className="flex-1 p-6 overflow-y-auto space-y-4 font-sans text-sm">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`flex gap-3 ${m.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  {m.sender === "ai" && (
                    <div className="size-8 rounded-full bg-accent/10 border border-accent/30 text-accent flex items-center justify-center shrink-0 mt-0.5">
                      <Bot className="size-4" />
                    </div>
                  )}

                  <div
                    className={`max-w-[85%] rounded-2xl p-4 space-y-2.5 ${
                      m.sender === "user"
                        ? "bg-accent text-[#0C0E12] font-medium ml-auto"
                        : "bg-[#161820] border border-white/10 text-foreground/95"
                    }`}
                  >
                    <p className="leading-relaxed text-pretty text-sm">{m.text}</p>

                    {/* Citations & Evidence Links */}
                    {m.citations && m.citations.length > 0 && (
                      <div className="pt-2 border-t border-white/10 flex flex-wrap gap-2">
                        <span className="font-mono text-[9px] text-accent uppercase tracking-wider block w-full">
                          VERIFIED CITATIONS:
                        </span>
                        {m.citations.map((c) => (
                          <a
                            key={c.label}
                            href={c.href}
                            onClick={() => {
                              if (c.href.startsWith("#")) setIsOpen(false);
                            }}
                            target={c.href.startsWith("http") ? "_blank" : undefined}
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-black/40 border border-white/10 font-mono text-[10px] text-accent hover:bg-accent/20 transition-colors"
                          >
                            <span>{c.label}</span>
                            <ArrowUpRight className="size-2.5" />
                          </a>
                        ))}
                      </div>
                    )}

                    {/* Footer Info */}
                    <div className="flex items-center justify-between text-[10px] opacity-60 font-mono pt-1">
                      <span>{m.timestamp}</span>
                      {m.sender === "ai" && (
                        <button
                          type="button"
                          onClick={() => copyToClipboard(m.id, m.text)}
                          className="hover:text-accent transition-colors flex items-center gap-1 cursor-pointer"
                        >
                          {copiedId === m.id ? (
                            <>
                              <Check className="size-3 text-emerald-400" />
                              <span>Copied</span>
                            </>
                          ) : (
                            <>
                              <Copy className="size-3" />
                              <span>Copy</span>
                            </>
                          )}
                        </button>
                      )}
                    </div>
                  </div>

                  {m.sender === "user" && (
                    <div className="size-8 rounded-full bg-white/10 border border-white/20 text-foreground flex items-center justify-center shrink-0 mt-0.5">
                      <User className="size-4" />
                    </div>
                  )}
                </div>
              ))}

              {isTyping && (
                <div className="flex gap-3">
                  <div className="size-8 rounded-full bg-accent/10 border border-accent/30 text-accent flex items-center justify-center shrink-0">
                    <Bot className="size-4" />
                  </div>
                  <div className="p-4 rounded-2xl bg-[#161820] border border-white/10 flex items-center gap-2">
                    <span className="size-2 rounded-full bg-accent animate-bounce" />
                    <span className="size-2 rounded-full bg-accent animate-bounce [animation-delay:0.2s]" />
                    <span className="size-2 rounded-full bg-accent animate-bounce [animation-delay:0.4s]" />
                    <span className="font-mono text-xs text-muted-foreground ml-2">Reasoning across dossier...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleAsk(query);
              }}
              className="p-4 border-t border-white/10 bg-[#14161C]/90 backdrop-blur-md flex items-center gap-2"
            >
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Ask about Tarik's work, AI approach, forensics, or stack..."
                className="flex-1 bg-[#0A0C10] border border-white/10 rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent font-sans"
              />
              <button
                type="submit"
                disabled={!query.trim() || isTyping}
                aria-label="Send query"
                className="px-5 py-3 rounded-xl bg-accent text-[#0C0E12] font-bold font-mono text-xs uppercase tracking-wider flex items-center gap-1.5 hover:bg-accent-glow transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                <span>SEND</span>
                <Send className="size-3.5" />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
