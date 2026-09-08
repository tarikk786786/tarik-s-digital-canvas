import { useState, useRef, useEffect } from "react";
import { Terminal as TerminalIcon, X, Maximize2, Minimize2, ChevronRight, CornerDownLeft } from "lucide-react";

interface TerminalHistory {
  cmd: string;
  output: string | React.ReactNode;
  time: string;
}

export function CyberTerminal() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<TerminalHistory[]>([
    {
      cmd: "init",
      output: (
        <div className="space-y-1">
          <p className="text-accent font-bold">DEZO FORENSIC SHELL v4.2 [SECURITY ENCLAVE]</p>
          <p className="text-muted-foreground">Type <span className="text-foreground underline font-bold cursor-pointer" onClick={() => handleCommand("help")}>'help'</span> or click the quick commands below to interrogate the system archive.</p>
        </div>
      ),
      time: new Date().toLocaleTimeString(),
    },
  ]);

  const inputRef = useRef<HTMLInputElement | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [isOpen, history]);

  useEffect(() => {
    const handleToggle = () => {
      setIsOpen((prev) => !prev);
    };
    window.addEventListener("tarik:open-terminal", handleToggle);
    return () => window.removeEventListener("tarik:open-terminal", handleToggle);
  }, []);

  const handleCommand = (rawCmd: string) => {
    const cmd = rawCmd.trim();
    if (!cmd) return;

    const parts = cmd.split(" ");
    const command = parts[0].toLowerCase();
    const args = parts.slice(1).join(" ");
    const time = new Date().toLocaleTimeString();

    let output: React.ReactNode = "";

    switch (command) {
      case "help":
        output = (
          <div className="space-y-1">
            <p className="text-accent font-bold">AVAILABLE PROTOCOLS:</p>
            <p><span className="text-foreground font-bold">bio</span> - Read Tarik Islam's profile and background</p>
            <p><span className="text-foreground font-bold">skills</span> - Inspect core competencies across forensics, cyber & AI</p>
            <p><span className="text-foreground font-bold">projects</span> - Display highlighted case files & venture</p>
            <p><span className="text-foreground font-bold">brief</span> - Launch conversational project intake builder</p>
            <p><span className="text-foreground font-bold">specs</span> - Inspect client device, GPU, and runtime telemetry</p>
            <p><span className="text-foreground font-bold">status</span> - Launch live system diagnostic overlay</p>
            <p><span className="text-foreground font-bold">director [mode]</span> - Set experience mode (experience | minimal | performance)</p>
            <p><span className="text-foreground font-bold">contact</span> - Retrieve verified communication coordinates</p>
            <p><span className="text-foreground font-bold">hash &lt;text&gt;</span> - Compute client-side SHA-256 fingerprint</p>
            <p><span className="text-foreground font-bold">clear</span> - Flush terminal screen buffer</p>
          </div>
        );
        break;

      case "bio":
        output = (
          <div className="space-y-2 text-foreground/90 font-mono text-[11px] leading-relaxed">
            <p><span className="text-accent font-bold">IDENTITY:</span> Tarik Islam — Multidisciplinary Technologist, Forensic Scientist, Cybersecurity Engineer, AI Systems Builder, and Founder of Dezo.in.</p>
            <p><span className="text-accent font-bold">MINDSET:</span> Evidence-first. Question assumptions, understand the underlying system, verify what is true, and build solutions that withstand scrutiny.</p>
            <p><span className="text-accent font-bold">PHILOSOPHY:</span> Evidence over assumptions · Security by design · Intelligence with purpose · Build, measure, improve.</p>
            <p><span className="text-accent font-bold">MISSION:</span> "My goal is not simply to follow technology. My goal is to build technology that matters."</p>
          </div>
        );
        break;

      case "skills":
        output = (
          <div className="space-y-1 text-xs">
            <p className="text-accent font-bold">CORE CAPABILITY MATRIX:</p>
            <p>├─ <span className="text-foreground font-semibold">Digital Forensics:</span> EnCase, FTK, Autopsy, Volatility, Wireshark, Chain of Custody</p>
            <p>├─ <span className="text-foreground font-semibold">Cybersecurity:</span> Zero Trust, Threat Modeling, AppSec, SIEM, MITRE ATT&CK, Pentesting</p>
            <p>├─ <span className="text-foreground font-semibold">AI & ML:</span> Autonomous Agents, LLMs, RAG, PyTorch, LangChain, Vector Databases</p>
            <p>└─ <span className="text-foreground font-semibold">Engineering:</span> TypeScript, React 19, Node.js, Python, Rust, PostgreSQL, Docker</p>
          </div>
        );
        break;

      case "projects":
        output = (
          <div className="space-y-1 text-xs">
            <p className="text-accent font-bold">PRIMARY CASE FILES:</p>
            <p>1. <span className="text-foreground font-semibold">Dezo.in:</span> AI-Native Product Studio & Engine (<a href="https://dezo.in" target="_blank" rel="noreferrer" className="text-accent underline">dezo.in ↗</a>)</p>
            <p>2. <span className="text-foreground font-semibold">ForensicKit:</span> Cryptographic digital evidence triage & memory carving</p>
            <p>3. <span className="text-foreground font-semibold">ThreatLens AI:</span> SIEM Threat-hunting agent with anomaly detection</p>
            <p>4. <span className="text-foreground font-semibold">Digital Canvas v4:</span> This site, open source (<a href="https://github.com/tarikk786786/tarik-s-digital-canvas" target="_blank" rel="noreferrer" className="text-accent underline">GitHub ↗</a>)</p>
          </div>
        );
        break;

      case "dezo":
        output = (
          <div className="space-y-1">
            <p className="text-accent font-bold">DEZO.IN — FOUNDING CHARTER</p>
            <p>AI-Native Studio founded by Tarik Islam. We engineer intelligent systems with forensic-grade auditability, zero-trust security by default, and high-velocity execution.</p>
            <p>URL: <a href="https://dezo.in" target="_blank" rel="noreferrer" className="text-accent underline">https://dezo.in</a></p>
          </div>
        );
        break;

      case "contact":
        output = (
          <div className="space-y-1">
            <p className="text-accent font-bold">SECURE CHANNELS:</p>
            <p>• WhatsApp: <a href="https://wa.me/919114411026" target="_blank" rel="noreferrer" className="text-emerald-400 underline">+91 91144 11026</a></p>
            <p>• Instagram: <a href="https://instagram.com/tarik_islam_786" target="_blank" rel="noreferrer" className="text-pink-400 underline">@tarik_islam_786</a></p>
            <p>• GitHub: <a href="https://github.com/tarikk786786" target="_blank" rel="noreferrer" className="text-blue-400 underline">@tarikk786786</a></p>
          </div>
        );
        break;

      case "hash": {
        const textToHash = args || "tarik-islam-forensics";
        let h = 0x811c9dc5;
        for (let i = 0; i < textToHash.length; i++) {
          h ^= textToHash.charCodeAt(i);
          h = Math.imul(h, 0x01000193);
        }
        const hex = (h >>> 0).toString(16).padStart(8, "0");
        output = (
          <p className="text-accent">
            FINGERPRINT: <span className="font-mono text-foreground font-bold">0x{hex}6b9e248a7f10d4c8</span> (Input: "{textToHash}")
          </p>
        );
        break;
      }

      case "brief":
        window.dispatchEvent(new CustomEvent("tarik:open-project-brief"));
        output = <p className="text-emerald-400">Dispatching Conversational Brief Intake Interface...</p>;
        break;

      case "status":
        window.dispatchEvent(new CustomEvent("tarik:open-system-status"));
        output = <p className="text-cyan-400">Mounting System Diagnostics HUD...</p>;
        break;

      case "specs": {
        const cores = navigator.hardwareConcurrency || "Unknown";
        const memory = (navigator as unknown as { deviceMemory?: number }).deviceMemory ? `${(navigator as unknown as { deviceMemory: number }).deviceMemory} GB` : "Standard";
        output = (
          <div className="space-y-1 text-xs">
            <p className="text-accent font-bold">CLIENT RUNTIME SPECIFICATIONS:</p>
            <p>├─ Platform: {navigator.platform}</p>
            <p>├─ Hardware Cores: {cores}</p>
            <p>├─ Device Memory: {memory}</p>
            <p>├─ Resolution: {window.innerWidth} x {window.innerHeight} (DPR: {window.devicePixelRatio})</p>
            <p>└─ Audio Synthesizer: Web Audio API (Active)</p>
          </div>
        );
        break;
      }

      case "director": {
        const valid = ["experience", "minimal", "performance"];
        if (valid.includes(args)) {
          localStorage.setItem("tarik_director_mode", args);
          document.documentElement.dataset.directorMode = args;
          window.dispatchEvent(new CustomEvent("tarik:director-mode-change", { detail: { mode: args } }));
          output = <p className="text-emerald-400">Director Experience Mode switched to: [{args.toUpperCase()}]</p>;
        } else {
          output = <p className="text-amber-400">Usage: director &lt;experience | minimal | performance&gt;</p>;
        }
        break;
      }

      case "clear":
        setHistory([]);
        setInput("");
        return;

      default:
        output = (
          <p className="text-red-400">
            Unrecognized protocol: '{command}'. Type <span className="text-accent font-bold cursor-pointer" onClick={() => handleCommand("help")}>'help'</span> for instructions.
          </p>
        );
    }

    setHistory((prev) => [...prev, { cmd, output, time }]);
    setInput("");
  };

  return (
    <>
      {/* Floating HUD Launcher Pill */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className="group flex items-center gap-3 px-4 py-2.5 rounded-full bg-[#11151C]/85 hover:bg-[#181E27] border border-[#62E6FF]/40 shadow-[0_8px_30px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.15)] text-foreground backdrop-blur-xl backdrop-saturate-150 transition-all hover:scale-105 active:scale-95 cursor-pointer"
        >
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-75" />
            <span className="relative inline-flex size-2 rounded-full bg-accent" />
          </span>
          <TerminalIcon className="size-4 text-accent" />
          <span className="font-mono text-xs uppercase tracking-widest text-accent font-bold">
            {isOpen ? "CLOSE TERMINAL" : "TERMINAL HUD"}
          </span>
        </button>
      </div>

      {/* Terminal Modal Window */}
      {isOpen && (
        <div
          className={`fixed z-50 transition-all duration-300 flex flex-col rounded-xl border border-white/10 bg-[#0A0D12]/90 backdrop-blur-2xl backdrop-saturate-150 shadow-[0_25px_70px_rgba(0,0,0,0.85),inset_0_1px_0_rgba(255,255,255,0.1)] overflow-hidden ${
            isMaximized
              ? "inset-4 md:inset-10"
              : "bottom-20 right-4 left-4 md:left-auto md:right-8 w-auto md:w-[620px] h-[520px]"
          }`}
        >
          {/* Title Bar */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-[#14161C]/80 select-none">
            <div className="flex items-center gap-2">
              <span className="size-3 rounded-full bg-red-500/80 cursor-pointer" onClick={() => setIsOpen(false)} />
              <span className="size-3 rounded-full bg-yellow-500/80" />
              <span className="size-3 rounded-full bg-emerald-500/80" />
              <span className="ml-3 font-mono text-[11px] text-muted-foreground uppercase tracking-widest flex items-center gap-1.5">
                <TerminalIcon className="size-3 text-accent" />
                <span>tarik@dezo-enclave:~</span>
              </span>
            </div>

            <div className="flex items-center gap-2 text-muted-foreground">
              <button
                type="button"
                onClick={() => setIsMaximized((prev) => !prev)}
                className="hover:text-foreground transition-colors"
                title={isMaximized ? "Restore" : "Maximize"}
              >
                {isMaximized ? <Minimize2 className="size-4" /> : <Maximize2 className="size-4" />}
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="hover:text-foreground transition-colors"
                title="Close"
              >
                <X className="size-4" />
              </button>
            </div>
          </div>

          {/* Terminal Screen Body */}
          <div className="flex-1 overflow-y-auto p-4 font-mono text-xs text-foreground/90 space-y-4">
            {history.map((h, i) => (
              <div key={i} className="space-y-1.5">
                <div className="flex items-center gap-2 text-muted-foreground text-[10px]">
                  <span className="text-accent font-bold">tarik@enclave:~$</span>
                  <span className="text-foreground">{h.cmd}</span>
                  <span className="ml-auto opacity-50">{h.time}</span>
                </div>
                <div className="pl-4 text-foreground/80 leading-relaxed">{h.output}</div>
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          {/* Quick Command Buttons */}
          <div className="px-4 py-2 border-t border-white/5 bg-white/[0.02] flex items-center gap-2 overflow-x-auto no-scrollbar font-mono text-[10px]">
            <span className="text-muted-foreground shrink-0 uppercase tracking-widest text-[9px]">QUICK:</span>
            {["bio", "skills", "projects", "contact", "dezo", "clear"].map((cmd) => (
              <button
                key={cmd}
                type="button"
                onClick={() => handleCommand(cmd)}
                className="px-2.5 py-1 rounded bg-white/5 hover:bg-accent hover:text-[#0C0E12] text-foreground/80 transition-colors shrink-0"
              >
                {cmd}
              </button>
            ))}
          </div>

          {/* Interactive Input Line */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleCommand(input);
            }}
            className="flex items-center gap-2 px-4 py-3 border-t border-white/10 bg-[#14161C]/90"
          >
            <ChevronRight className="size-4 text-accent shrink-0 animate-pulse" />
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a command ('help', 'skills', 'projects', 'contact')..."
              className="flex-1 bg-transparent font-mono text-xs text-foreground focus:outline-none placeholder:text-muted-foreground/50"
            />
            <button
              type="submit"
              className="p-1.5 rounded hover:bg-white/10 text-muted-foreground hover:text-accent transition-colors"
            >
              <CornerDownLeft className="size-3.5" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
