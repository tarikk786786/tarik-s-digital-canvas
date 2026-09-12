import { useState, useEffect } from "react";
import {
  Search,
  Sparkles,
  SlidersHorizontal,
  Shield,
  ArrowRight,
  User,
  Building2,
  Globe,
  FileText,
  GitFork,
  Image as ImageIcon,
  Upload,
} from "lucide-react";
import { detectQueryType } from "@/lib/find-someone/scoring";
import { INTENT_OPTIONS, SAMPLE_QUERIES } from "@/content/demo-investigation";
import { soundEngine } from "@/lib/sound-engine";
import type { QueryType, SearchIntent } from "@/lib/find-someone/types";

interface SearchInterfaceProps {
  onSearch: (query: string, intent: SearchIntent) => void;
  isSearching: boolean;
  onOpenFilters: () => void;
  activeQuery: string;
  currentIntent: SearchIntent;
  onIntentChange: (intent: SearchIntent) => void;
}

export function SearchInterface({
  onSearch,
  isSearching,
  onOpenFilters,
  activeQuery,
  currentIntent,
  onIntentChange,
}: SearchInterfaceProps) {
  const [inputVal, setInputVal] = useState(activeQuery || "Rahul Kumar Odisha");
  const [detectedType, setDetectedType] = useState<QueryType>("person");

  useEffect(() => {
    const detected = detectQueryType(inputVal);
    setDetectedType(detected);
  }, [inputVal]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim()) return;
    soundEngine.playClick();
    onSearch(inputVal.trim(), currentIntent);
  };

  const handleSelectSample = (sample: string, type: string) => {
    setInputVal(sample);
    let targetIntent: SearchIntent = "person";
    if (type === "company") targetIntent = "company";
    else if (type === "website") targetIntent = "website";
    else if (type === "document") targetIntent = "document";
    onIntentChange(targetIntent);
    soundEngine.playClick();
    onSearch(sample, targetIntent);
  };

  const currentIntentConfig =
    INTENT_OPTIONS.find((i) => i.id === currentIntent) || INTENT_OPTIONS[0];

  return (
    <div className="relative mx-auto max-w-4xl space-y-6 text-center">
      {/* Top Console Branding Pill */}
      <div className="inline-flex items-center gap-2 rounded-full border border-[#62E6FF]/30 bg-[#62E6FF]/10 px-4 py-1.5 font-mono text-[11px] font-bold text-[#62E6FF] shadow-[0_0_20px_rgba(98,230,255,0.2)]">
        <Sparkles className="size-3.5" />
        <span>TARIKISLAM.IN // INTELLIGENCE CONSOLE</span>
      </div>

      {/* Main Headline & Experience Philosophy */}
      <div className="space-y-2.5">
        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-foreground leading-[1.08]">
          Find the public <br />
          <span className="bg-gradient-to-r from-[#62E6FF] via-[#9B8CFF] to-amber-300 bg-clip-text text-transparent">
            information trail.
          </span>
        </h1>
        <p className="mx-auto max-w-2xl font-sans text-sm sm:text-base text-muted-foreground leading-relaxed">
          Search people, organizations, websites, companies and public evidence across the open web.
          Input anything you already know — the console automatically determines relevant public
          sources and verifies evidence.
        </p>
      </div>

      {/* Intent Switcher Mode Bar */}
      <div className="flex flex-wrap items-center justify-center gap-1.5 p-1 rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-md max-w-3xl mx-auto">
        {INTENT_OPTIONS.map((opt) => {
          const isSelected = currentIntent === opt.id;
          return (
            <button
              key={opt.id}
              type="button"
              onClick={() => {
                onIntentChange(opt.id as SearchIntent);
                soundEngine.playClick();
              }}
              className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 font-mono text-[11px] transition-all cursor-pointer ${
                isSelected
                  ? "bg-[#62E6FF] text-[#050608] font-bold shadow-[0_0_16px_rgba(98,230,255,0.35)]"
                  : "text-muted-foreground hover:text-white hover:bg-white/5"
              }`}
            >
              {opt.id === "person" && <User className="size-3" />}
              {opt.id === "company" && <Building2 className="size-3" />}
              {opt.id === "website" && <Globe className="size-3" />}
              {opt.id === "evidence" && <FileText className="size-3" />}
              {opt.id === "connections" && <GitFork className="size-3" />}
              {opt.id === "document" && <Upload className="size-3" />}
              {opt.id === "image" && <ImageIcon className="size-3" />}
              <span>{opt.label}</span>
            </button>
          );
        })}
      </div>

      {/* Universal Search Bar */}
      <form onSubmit={handleSubmit} className="relative mx-auto max-w-3xl">
        <div className="relative flex items-center rounded-2xl border-2 border-white/15 bg-[#0A0D12]/95 p-2 shadow-[0_16px_50px_rgba(0,0,0,0.8),0_0_30px_rgba(98,230,255,0.1)] backdrop-blur-2xl focus-within:border-[#62E6FF] transition-all">
          <div className="grid size-11 place-items-center rounded-xl bg-white/5 text-[#62E6FF] shrink-0 ml-1">
            <Search className="size-5" />
          </div>

          <input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder={currentIntentConfig.placeholder}
            className="w-full bg-transparent px-3 py-2 text-sm sm:text-base text-foreground placeholder:text-muted-foreground/40 focus:outline-none font-sans"
          />

          {/* Intelligent Router Detected Classification */}
          <div className="hidden md:flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 font-mono text-[10px] text-muted-foreground shrink-0 mr-2">
            <span>Detected:</span>
            <span className="font-bold text-[#62E6FF] uppercase">{detectedType}</span>
          </div>

          {/* Filter toggle */}
          <button
            type="button"
            onClick={onOpenFilters}
            className="grid size-10 place-items-center rounded-xl border border-white/10 bg-white/5 text-muted-foreground hover:text-white hover:border-white/20 transition-all shrink-0 mr-2 cursor-pointer"
            title="Configure advanced search parameters"
          >
            <SlidersHorizontal className="size-4" />
          </button>

          {/* Submit CTA */}
          <button
            type="submit"
            disabled={isSearching}
            className="flex items-center gap-2 rounded-xl bg-[#62E6FF] px-5 py-3 font-mono text-xs uppercase tracking-wider font-bold text-[#050608] hover:bg-[#62E6FF]/90 transition-all shadow-[0_0_20px_rgba(98,230,255,0.4)] shrink-0 cursor-pointer disabled:opacity-50"
          >
            <span>{isSearching ? "ANALYZING..." : "INVESTIGATE"}</span>
            <ArrowRight className="size-3.5" />
          </button>
        </div>

        {/* Console Safety & Separation Notice */}
        <div className="mt-3 flex flex-wrap items-center justify-between gap-2 px-2 text-[11px] font-mono text-muted-foreground">
          <span className="text-muted-foreground/70">{currentIntentConfig.description}</span>
          <div className="flex items-center gap-1 text-[#6EE7B7]">
            <Shield className="size-3 text-[#6EE7B7]" />
            <span>Lawful Public Intelligence Only</span>
          </div>
        </div>
      </form>

      {/* Suggested Quick Inquiries */}
      <div className="pt-2">
        <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground block mb-2">
          Try querying:
        </span>
        <div className="flex flex-wrap justify-center gap-2">
          {SAMPLE_QUERIES.map((sq) => (
            <button
              key={sq.label}
              type="button"
              onClick={() => handleSelectSample(sq.query, sq.type)}
              className="rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1 font-mono text-[11px] text-muted-foreground hover:border-[#62E6FF]/40 hover:text-white transition-all cursor-pointer"
            >
              "{sq.label}"
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
