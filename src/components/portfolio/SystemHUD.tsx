import { useState, useEffect } from "react";
import { Volume2, VolumeX, Eye, Terminal, Search, Code2 } from "lucide-react";
import { soundEngine } from "@/lib/sound-engine";
import { getDirectorMode, setDirectorMode, DirectorMode } from "@/lib/director-mode";

const CHAPTERS = [
  { id: "top", num: "01", label: "IDENTITY" },
  { id: "journey", num: "02", label: "EXPLORATION" },
  { id: "how-i-build", num: "03", label: "SYSTEMS" },
  { id: "work", num: "04", label: "WORK" },
  { id: "showroom", num: "05", label: "LAB" },
  { id: "contact", num: "06", label: "CONNECT" },
];

export function SystemHUD() {
  const [currentChapter, setCurrentChapter] = useState(CHAPTERS[0]);
  const [soundOn, setSoundOn] = useState(false);
  const [directorMode, setMode] = useState<DirectorMode>("experience");

  useEffect(() => {
    setSoundOn(soundEngine.isEnabled());
    setMode(getDirectorMode());

    const handleSoundChange = (e: Event) => {
      const custom = e as CustomEvent<{ enabled: boolean }>;
      setSoundOn(custom.detail?.enabled ?? soundEngine.isEnabled());
    };

    const handleModeChange = (e: Event) => {
      const custom = e as CustomEvent<{ mode: DirectorMode }>;
      setMode(custom.detail?.mode ?? getDirectorMode());
    };

    window.addEventListener("tarik:sound-state-change", handleSoundChange);
    window.addEventListener("tarik:director-mode-change", handleModeChange);

    // Track scroll position to update chapters
    const handleScroll = () => {
      const scrollY = window.scrollY + window.innerHeight * 0.35;
      for (let i = CHAPTERS.length - 1; i >= 0; i--) {
        const el = document.getElementById(CHAPTERS[i].id);
        if (el && el.offsetTop <= scrollY) {
          setCurrentChapter(CHAPTERS[i]);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("tarik:sound-state-change", handleSoundChange);
      window.removeEventListener("tarik:director-mode-change", handleModeChange);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleSound = () => {
    const next = soundEngine.toggle();
    setSoundOn(next);
  };

  const cycleMode = () => {
    const modes: DirectorMode[] = ["experience", "minimal", "performance"];
    const nextIdx = (modes.indexOf(directorMode) + 1) % modes.length;
    const next = modes[nextIdx];
    setDirectorMode(next);
    setMode(next);
    soundEngine.playClick();
  };

  const openTerminal = () => {
    window.dispatchEvent(new CustomEvent("tarik:open-terminal"));
    soundEngine.playClick();
  };

  const openEngineInspector = () => {
    window.dispatchEvent(new CustomEvent("tarik:open-engine-inspector"));
    soundEngine.playClick();
  };

  const openCommandPalette = () => {
    window.dispatchEvent(new CustomEvent("tarik:open-command-palette"));
    soundEngine.playClick();
  };

  return (
    <aside
      aria-label="System Heads-Up Display"
      className="fixed bottom-0 inset-x-0 z-40 hidden md:flex items-center justify-between px-6 py-2.5 bg-[#050608]/90 border-t border-white/[0.08] backdrop-blur-md text-foreground font-mono text-[11px] select-none"
    >
      {/* Left: System Online & Progression */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-[#6EE7B7] opacity-75" />
            <span className="relative inline-flex size-2 rounded-full bg-[#6EE7B7]" />
          </span>
          <span className="text-[#6EE7B7] font-bold uppercase tracking-widest">SYSTEM ONLINE</span>
        </div>

        <span className="text-white/20">/</span>

        <div className="flex items-center gap-1.5 text-foreground">
          <span className="text-[#62E6FF] font-bold">{currentChapter.num}</span>
          <span className="text-muted-foreground">/</span>
          <span className="text-muted-foreground">06</span>
          <span className="ml-2 font-bold tracking-wider text-foreground">{currentChapter.label}</span>
        </div>
      </div>

      {/* Right: Interactive System Toggles */}
      <div className="flex items-center gap-3.5 text-muted-foreground">
        {/* Audio Toggle */}
        <button
          type="button"
          onClick={toggleSound}
          className="flex items-center gap-1.5 hover:text-[#62E6FF] transition-colors cursor-pointer"
          title="Toggle Synthesized Audio Feedback"
        >
          {soundOn ? <Volume2 className="size-3.5 text-[#62E6FF]" /> : <VolumeX className="size-3.5" />}
          <span>AUDIO: {soundOn ? "ON" : "OFF"}</span>
        </button>

        <span className="text-white/10">|</span>

        {/* Director Mode */}
        <button
          type="button"
          onClick={cycleMode}
          className="flex items-center gap-1.5 hover:text-[#62E6FF] transition-colors cursor-pointer uppercase"
          title="Cycle Experience Mode: Experience (Full 3D) / Minimal / Performance"
        >
          <Eye className="size-3.5 text-[#9B8CFF]" />
          <span>MODE: {directorMode.slice(0, 4)}</span>
        </button>

        <span className="text-white/10">|</span>

        {/* Engine Inspector */}
        <button
          type="button"
          onClick={openEngineInspector}
          className="flex items-center gap-1 hover:text-[#62E6FF] transition-colors cursor-pointer"
          title="Inspect Architecture Engine (E)"
        >
          <Code2 className="size-3.5 text-[#62E6FF]" />
          <span>ENGINE [E]</span>
        </button>

        <span className="text-white/10">|</span>

        {/* Terminal Shortcut */}
        <button
          type="button"
          onClick={openTerminal}
          className="flex items-center gap-1 hover:text-[#62E6FF] transition-colors cursor-pointer"
          title="Open Cyber Terminal (~)"
        >
          <Terminal className="size-3.5" />
          <span>SHELL [~]</span>
        </button>

        <span className="text-white/10">|</span>

        {/* Command Search */}
        <button
          type="button"
          onClick={openCommandPalette}
          className="flex items-center gap-1 hover:text-[#62E6FF] transition-colors cursor-pointer"
          title="Search Command Palette (Ctrl/Cmd + K)"
        >
          <Search className="size-3.5" />
          <span>SEARCH [⌘K]</span>
        </button>
      </div>
    </aside>
  );
}
