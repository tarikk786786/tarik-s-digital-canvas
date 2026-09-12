import { useState, useEffect } from "react";
import {
  Search,
  Terminal,
  Bot,
  FileText,
  Briefcase,
  ExternalLink,
  Code,
  Shield,
  Activity,
  Layers,
  Sparkles,
  Volume2,
  Eye,
} from "lucide-react";
import { soundEngine } from "@/lib/sound-engine";
import { getDirectorMode, setDirectorMode } from "@/lib/director-mode";
import { WHATSAPP_URL } from "@/lib/contact-links";

interface CommandItem {
  id: string;
  category: "Navigation" | "Actions" | "Case Files" | "System";
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  action: () => void;
  badge?: string;
}

export function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    // Listen for Cmd+K / Ctrl+K
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && (e.key === "k" || e.key === "K")) {
        e.preventDefault();
        setIsOpen((prev) => !prev);
        soundEngine.playClick();
      }
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };

    const handleCustomOpen = () => {
      setIsOpen(true);
      soundEngine.playClick();
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("tarik:open-command-palette", handleCustomOpen);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("tarik:open-command-palette", handleCustomOpen);
    };
  }, [isOpen]);

  const navigateTo = (hash: string) => {
    setIsOpen(false);
    soundEngine.playNavigation();
    const el = document.querySelector(hash);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    } else {
      window.location.hash = hash;
    }
  };

  const COMMANDS: CommandItem[] = [
    // Navigation
    {
      id: "nav-about",
      category: "Navigation",
      title: "Identity // Who I Am",
      subtitle: "Forensic scientist, cybersecurity engineer & AI builder profile",
      icon: <Layers className="size-4 text-[#62E6FF]" />,
      action: () => navigateTo("#about"),
      badge: "01",
    },
    {
      id: "nav-journey",
      category: "Navigation",
      title: "Exploration // Personal Journey",
      subtitle: "Evolution from forensic evidence to intelligent digital systems",
      icon: <Activity className="size-4 text-[#62E6FF]" />,
      action: () => navigateTo("#journey"),
      badge: "02",
    },
    {
      id: "nav-how-i-build",
      category: "Navigation",
      title: "Systems // Living Lab & Tech",
      subtitle: "Architecture, engineering tools, and digital laboratory",
      icon: <Code className="size-4 text-[#62E6FF]" />,
      action: () => navigateTo("#how-i-build"),
      badge: "03",
    },
    {
      id: "nav-work",
      category: "Navigation",
      title: "Work // Selected Case Files",
      subtitle: "Dezo.in, ForensicKit, ThreatLens, and open source projects",
      icon: <Briefcase className="size-4 text-[#62E6FF]" />,
      action: () => navigateTo("#work"),
      badge: "04",
    },
    {
      id: "nav-find-details",
      category: "Navigation",
      title: "Find Details // Embedded Public Intelligence",
      subtitle: "Search people, organizations, websites, companies and public evidence",
      icon: <Search className="size-4 text-[#62E6FF]" />,
      action: () => {
        setIsOpen(false);
        window.location.href = "/find-someone";
      },
      badge: "LAB",
    },
    {
      id: "nav-showroom",
      category: "Navigation",
      title: "Lab // Digital Showroom & SEO",
      subtitle: "Production screens, performance metrics, and search architecture",
      icon: <Sparkles className="size-4 text-[#62E6FF]" />,
      action: () => navigateTo("#showroom"),
      badge: "05",
    },
    {
      id: "nav-contact",
      category: "Navigation",
      title: "Connect // Direct Engagement",
      subtitle: "Start a conversation, structured brief, or Q3 2026 inquiry",
      icon: <FileText className="size-4 text-[#62E6FF]" />,
      action: () => navigateTo("#contact"),
      badge: "06",
    },

    // Actions & Tools
    {
      id: "act-ai",
      category: "Actions",
      title: "/ask — Ask Tarik AI Guide",
      subtitle: "Deterministic knowledge assistant with 4 persona modes",
      icon: <Bot className="size-4 text-[#9B8CFF]" />,
      action: () => {
        setIsOpen(false);
        window.dispatchEvent(new CustomEvent("tarik:open-ask-ai"));
      },
      badge: "AI",
    },
    {
      id: "act-terminal",
      category: "Actions",
      title: "/terminal — Launch Cyber-Forensic Shell",
      subtitle: "Direct CLI enclave with commands, telemetry, and diagnostics",
      icon: <Terminal className="size-4 text-[#62E6FF]" />,
      action: () => {
        setIsOpen(false);
        window.dispatchEvent(new CustomEvent("tarik:open-terminal"));
      },
      badge: "~",
    },
    {
      id: "act-brief",
      category: "Actions",
      title: "/brief — Configure Project Intake Brief",
      subtitle: "4-step structured scope builder with WhatsApp & markdown export",
      icon: <FileText className="size-4 text-[#6EE7B7]" />,
      action: () => {
        setIsOpen(false);
        window.dispatchEvent(new CustomEvent("tarik:open-project-brief"));
      },
      badge: "LEAD",
    },
    {
      id: "act-status",
      category: "Actions",
      title: "/status — View System Diagnostics",
      subtitle: "Inspect WebGL 2.0 GPU, live FPS, memory heap, and SSR health",
      icon: <Shield className="size-4 text-[#62E6FF]" />,
      action: () => {
        setIsOpen(false);
        window.dispatchEvent(new CustomEvent("tarik:open-system-status"));
      },
      badge: "LIVE",
    },
    {
      id: "act-mode",
      category: "Actions",
      title: "/mode — Cycle Experience Mode",
      subtitle: "Toggle between Experience (3D), Minimal (Clean), and Performance",
      icon: <Eye className="size-4 text-[#9B8CFF]" />,
      action: () => {
        const cur = getDirectorMode();
        const next =
          cur === "experience" ? "minimal" : cur === "minimal" ? "performance" : "experience";
        setDirectorMode(next);
        setIsOpen(false);
        soundEngine.playClick();
      },
      badge: "EXP",
    },
    {
      id: "act-sound",
      category: "Actions",
      title: "/sound — Toggle Synthesized Audio",
      subtitle: "Switch browser Web Audio micro-feedback on or off",
      icon: <Volume2 className="size-4 text-[#62E6FF]" />,
      action: () => {
        soundEngine.toggle();
        setIsOpen(false);
      },
      badge: "AUDIO",
    },

    // External
    {
      id: "ext-resume",
      category: "Case Files",
      title: "Verified Dossier / Resume PDF",
      subtitle: "Download official technical resume and verified track record",
      icon: <ExternalLink className="size-4 text-muted-foreground" />,
      action: () => window.open("/resume.pdf", "_blank"),
      badge: "PDF ↗",
    },
    {
      id: "ext-whatsapp",
      category: "Case Files",
      title: "Direct WhatsApp Message",
      subtitle: "Encrypted direct communication channel (+91 91144 11026)",
      icon: <ExternalLink className="size-4 text-emerald-400" />,
      action: () => window.open(WHATSAPP_URL, "_blank"),
      badge: "CHAT ↗",
    },
    {
      id: "ext-github",
      category: "Case Files",
      title: "GitHub Repository & Commits",
      subtitle: "Open source software, commit timeline, and source repositories",
      icon: <ExternalLink className="size-4 text-blue-400" />,
      action: () => window.open("https://github.com/tarikk786786", "_blank"),
      badge: "CODE ↗",
    },
  ];

  const filtered = COMMANDS.filter(
    (c) =>
      c.title.toLowerCase().includes(query.toLowerCase()) ||
      c.subtitle.toLowerCase().includes(query.toLowerCase()) ||
      c.category.toLowerCase().includes(query.toLowerCase()),
  );

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Command Palette"
      className="fixed inset-0 z-[9999] flex items-start justify-center pt-20 px-4 bg-[#050608]/80 backdrop-blur-md backdrop-saturate-150"
      onClick={() => setIsOpen(false)}
    >
      <div
        className="w-full max-w-2xl rounded-xl border border-white/10 bg-[#0A0D12] shadow-[0_25px_70px_rgba(0,0,0,0.85)] overflow-hidden animate-fade-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Header Line */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-white/10 bg-white/[0.02]">
          <Search className="size-4 text-[#62E6FF] shrink-0" />
          <input
            autoFocus
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a command or search (e.g. 'work', 'ai', 'brief', 'status')..."
            className="flex-1 bg-transparent font-mono text-sm text-foreground focus:outline-none placeholder:text-muted-foreground/50"
          />
          <kbd className="hidden sm:inline-flex px-2 py-0.5 rounded bg-white/5 border border-white/10 font-mono text-[10px] text-muted-foreground">
            ESC
          </kbd>
        </div>

        {/* Command Items List */}
        <div className="max-h-[380px] overflow-y-auto p-2 space-y-1 font-mono">
          {filtered.length === 0 ? (
            <div className="py-8 text-center text-muted-foreground text-xs">
              No matching commands found for "{query}".
            </div>
          ) : (
            filtered.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={item.action}
                className="w-full flex items-center justify-between p-2.5 rounded-lg hover:bg-white/[0.05] text-left transition-colors group cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded bg-white/[0.03] border border-white/5 group-hover:border-[#62E6FF]/30 transition-colors">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-foreground group-hover:text-[#62E6FF] transition-colors">
                      {item.title}
                    </p>
                    <p className="text-[11px] text-muted-foreground line-clamp-1">
                      {item.subtitle}
                    </p>
                  </div>
                </div>
                {item.badge && (
                  <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[9px] uppercase tracking-wider text-muted-foreground group-hover:text-[#62E6FF] group-hover:border-[#62E6FF]/30 transition-colors">
                    {item.badge}
                  </span>
                )}
              </button>
            ))
          )}
        </div>

        {/* Footer Shortcut Bar */}
        <div className="px-4 py-2 border-t border-white/5 bg-white/[0.01] flex items-center justify-between font-mono text-[10px] text-muted-foreground">
          <span>Navigate with mouse or keyboard</span>
          <span className="text-[#62E6FF]">DEZO.IN ENCLAVE</span>
        </div>
      </div>
    </div>
  );
}
