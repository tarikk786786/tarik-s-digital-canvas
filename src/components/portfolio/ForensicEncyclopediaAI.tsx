import { useState, useMemo, useEffect } from "react";
import {
  BookOpen,
  Search,
  Brain,
  Cpu,
  ShieldAlert,
  HardDrive,
  Network,
  Smartphone,
  Fingerprint,
  Scale,
  Sparkles,
  Terminal,
  Key,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Copy,
  Check,
  Hash,
  Activity,
  Layers,
  FileSearch,
  ExternalLink,
} from "lucide-react";
import {
  FORENSIC_ENCYCLOPEDIA,
  FORENSIC_DOMAINS_MAP,
  FORENSIC_CASE_SCENARIOS,
  type ForensicArticle,
  type ForensicDomainId,
} from "@/content/forensic-encyclopedia";
import { soundEngine } from "@/lib/sound-engine";

export function ForensicEncyclopediaAI() {
  const [activeTab, setActiveTab] = useState<"ai-copilot" | "encyclopedia" | "cases" | "calculator">("ai-copilot");
  const [selectedDomain, setSelectedDomain] = useState<ForensicDomainId | "all">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedArticleId, setSelectedArticleId] = useState<string>("mft-usn-journal");

  // AI Copilot Query State
  const [copilotQuery, setCopilotQuery] = useState("How to detect anti-forensic timestomping in $MFT?");
  const [isInferring, setIsInferring] = useState(false);
  const [inferenceResult, setInferenceResult] = useState<{
    query: string;
    standard: string;
    targetPaths: string[];
    cliRecipe: string;
    reasoning: string[];
    verdict: string;
  } | null>(null);

  // Live Entropy & Hash Calculator State
  const [sampleInput, setSampleInput] = useState("FORENSIC_EVIDENCE_SAMPLE_BITSTREAM_ISO_27037");
  const [calculatedSha256, setCalculatedSha256] = useState("");
  const [calculatedEntropy, setCalculatedEntropy] = useState<number>(0);
  const [copiedHash, setCopiedHash] = useState(false);

  // Real Web Crypto SHA-256 and Shannon Entropy calculation
  useEffect(() => {
    async function computeCrypto() {
      if (!sampleInput) {
        setCalculatedSha256("e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855");
        setCalculatedEntropy(0);
        return;
      }

      // SHA-256 via Web Crypto API
      const encoder = new TextEncoder();
      const data = encoder.encode(sampleInput);
      const hashBuffer = await crypto.subtle.digest("SHA-256", data);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
      setCalculatedSha256(hashHex);

      // Shannon Entropy Calculation (H = -sum(p * log2(p)))
      const freqs: Record<number, number> = {};
      for (const byte of data) {
        freqs[byte] = (freqs[byte] || 0) + 1;
      }
      let entropy = 0;
      for (const byte in freqs) {
        const p = freqs[byte] / data.length;
        entropy -= p * Math.log2(p);
      }
      setCalculatedEntropy(Number(entropy.toFixed(3)));
    }

    computeCrypto();
  }, [sampleInput]);

  // Handle preset queries for the AI Copilot
  const handleRunQuery = (queryText: string) => {
    soundEngine.playClick();
    setCopilotQuery(queryText);
    setIsInferring(true);

    setTimeout(() => {
      setIsInferring(false);
      if (queryText.toLowerCase().includes("timestomp") || queryText.toLowerCase().includes("mft")) {
        setInferenceResult({
          query: queryText,
          standard: "ISO/IEC 27037 §6 / NIST SP 800-86 §3.2",
          targetPaths: ["C:\\$MFT", "C:\\$Extend\\$UsnJrnl:$J", "C:\\$LogFile"],
          cliRecipe: "MFTECmd.exe -f C:\\$MFT --csv ./triage/ --csvf mft_analysis.csv",
          reasoning: [
            "1. Extract the raw 1,024-byte MFT record for the suspect file using an active hardware write-blocker.",
            "2. Read $STANDARD_INFORMATION attribute timestamps (Modified, Accessed, Created, Born).",
            "3. Cross-examine against the $FILE_NAME attribute timestamps stored in attribute 0x30.",
            "4. Anti-forensic utility (e.g. Timestomp) modifies $STANDARD_INFO in user mode, but Windows kernel restricts non-driver modification of $FILE_NAME.",
            "5. Divergence > 5 seconds between $SI and $FN confirms deliberate anti-forensic falsification.",
          ],
          verdict: "EVIDENTIARY TAMPER CONFIRMED. $SI timestamp forged; $FN reveals authentic inception.",
        });
      } else if (queryText.toLowerCase().includes("whatsapp") || queryText.toLowerCase().includes("sqlite")) {
        setInferenceResult({
          query: queryText,
          standard: "ISO/IEC 27037 §6.5 (Mobile Database Carving)",
          targetPaths: [
            "/data/data/com.whatsapp/databases/msgstore.db",
            "/data/data/com.whatsapp/databases/msgstore.db-wal",
          ],
          cliRecipe: "python3 sqlparse_wal.py -d msgstore.db -w msgstore.db-wal --carve-deleted -o output.json",
          reasoning: [
            "1. SQLite Write-Ahead Log (WAL) holds transaction frames before permanent disk checkpointing.",
            "2. When a suspect hits 'Delete for Me', SQLite marks cell pointers as free/unallocated but leaves binary string payloads intact.",
            "3. Carve variable-length text records searching for phone number regex `^\\+[1-9]\\d{1,14}$` and Unix epoch millisecond integers.",
            "4. Reconstruct chat threads by linking `message_row_id` to `jid_row_id` from the cached index frames.",
          ],
          verdict: "DELETED ARTIFACTS CARVED. 14 purged messages recovered with intact UTC timestamps.",
        });
      } else if (queryText.toLowerCase().includes("ram") || queryText.toLowerCase().includes("cobalt") || queryText.toLowerCase().includes("memory")) {
        setInferenceResult({
          query: queryText,
          standard: "RFC 3227 (Order of Volatility) / MITRE ATT&CK T1055",
          targetPaths: ["/dev/shm/memdump.raw", "Memory VAD Tree"],
          cliRecipe: "vol.py -f memdump.raw windows.malfind.Malfind --pid 4108",
          reasoning: [
            "1. Volatile memory triage must take precedence over disk imaging to preserve ephemeral crypto keys and sockets.",
            "2. Execute `windows.malfind` to scan Process Virtual Address Descriptor (VAD) nodes for `PAGE_EXECUTE_READWRITE` permissions.",
            "3. Inspect disassembly headers: unbacked memory containing `4D 5A` (MZ header) indicates in-memory reflective DLL injection.",
            "4. Extract Cobalt Strike configuration metadata (sleep time, jitter, C2 domain) via YARA signature scanning.",
          ],
          verdict: "PROCESS HOLLOWING DETECTED. Injected beacon in svchost.exe (PID 4108) isolated.",
        });
      } else {
        setInferenceResult({
          query: queryText,
          standard: "ISO/IEC 27037 & Daubert Legal Benchmark",
          targetPaths: ["Target Bitstream Image", "Case Evidence Manifest"],
          cliRecipe: "autopsy --case-analysis --investigate-vector auto",
          reasoning: [
            "1. Establish physical and digital chain of custody with dual SHA-256 and BLAKE3 hashing.",
            "2. Validate all analysis against scientific benchmarks with known potential error rates (< 0.05%).",
            "3. Correlate temporal timeline across OS event logs, memory artifacts, and network PCAPs.",
            "4. Assemble court-ready expert witness affidavit under Federal Rule of Evidence 702.",
          ],
          verdict: "FORENSIC METHODOLOGY VERIFIED. Evidence chain unbroken and mathematically sound.",
        });
      }
    }, 450);
  };

  // Run initial query on mount
  useEffect(() => {
    handleRunQuery("How to detect anti-forensic timestomping in $MFT?");
  }, []);

  // Filtered encyclopedia articles
  const filteredArticles = useMemo(() => {
    return FORENSIC_ENCYCLOPEDIA.filter((art) => {
      const matchesDomain = selectedDomain === "all" || art.domain === selectedDomain;
      const matchesSearch =
        searchQuery.trim() === "" ||
        art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        art.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        art.tag.toLowerCase().includes(searchQuery.toLowerCase()) ||
        art.standard.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesDomain && matchesSearch;
    });
  }, [selectedDomain, searchQuery]);

  const activeArticle = useMemo(() => {
    return (
      FORENSIC_ENCYCLOPEDIA.find((a) => a.id === selectedArticleId) ||
      filteredArticles[0] ||
      FORENSIC_ENCYCLOPEDIA[0]
    );
  }, [selectedArticleId, filteredArticles]);

  const copyHash = () => {
    soundEngine.playClick();
    navigator.clipboard.writeText(calculatedSha256);
    setCopiedHash(true);
    setTimeout(() => setCopiedHash(false), 2000);
  };

  return (
    <section
      id="forensic-encyclopedia"
      className="relative py-28 md:py-36 px-6 md:px-12 lg:px-16 border-b border-white/5 bg-[#050608] overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 size-[44rem] rounded-full blur-3xl opacity-10 bg-radial from-[#62E6FF]/15 to-transparent pointer-events-none" />
      <div className="absolute bottom-10 right-10 size-[32rem] rounded-full blur-3xl opacity-10 bg-radial from-[#9B8CFF]/15 to-transparent pointer-events-none" />

      <div className="relative max-w-[1600px] mx-auto space-y-12">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="font-mono text-xs font-bold uppercase tracking-[0.25em] text-[#62E6FF]">
                04 /
              </span>
              <span className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">
                INTELLIGENCE CODEX
              </span>
            </div>
            <h2 className="font-display text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-foreground leading-[1.05]">
              AI Forensic Encyclopedia <br className="hidden sm:block" />
              <span className="italic font-light text-gradient-flow">
                Digital &amp; Physical Evidence Compendium
              </span>
            </h2>
            <p className="mt-4 font-sans text-sm sm:text-base text-muted-foreground max-w-3xl leading-relaxed">
              Synthesized by Tarik Islam at the junction of <strong className="text-foreground font-semibold">Forensic Science (B.Sc, M.Sc)</strong> and <strong className="text-[#62E6FF] font-semibold">Cybersecurity &amp; AI (MCA, M.Tech)</strong>. Explore filesystem mechanics, volatile RAM triage, mobile SQLite carving, physical dactyloscopy, and court-admissible custody standards with an interactive AI reasoning engine.
            </p>
          </div>

          {/* Module Navigation Tabs */}
          <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-xl border border-white/10 bg-[#0A0D12] backdrop-blur-md font-mono text-[11px] uppercase tracking-wider self-start lg:self-end shrink-0">
            {[
              { id: "ai-copilot", label: "AI REASONING COPILOT", icon: Brain },
              { id: "encyclopedia", label: "ENCYCLOPEDIA CODEX", icon: BookOpen },
              { id: "cases", label: "TRIAGE SCENARIOS", icon: ShieldAlert },
              { id: "calculator", label: "HASH & ENTROPY LAB", icon: Hash },
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => {
                    soundEngine.playClick();
                    setActiveTab(tab.id as any);
                  }}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all cursor-pointer ${
                    activeTab === tab.id
                      ? "bg-[#62E6FF] text-[#050608] font-bold shadow-[0_0_16px_rgba(98,230,255,0.35)]"
                      : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                  }`}
                >
                  <Icon className="size-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* TAB 1: AI FORENSIC REASONING COPILOT */}
        {activeTab === "ai-copilot" && (
          <div className="space-y-8 animate-fade-in">
            {/* Query Formulation Card */}
            <div className="p-6 md:p-8 rounded-2xl border border-white/10 bg-gradient-to-br from-[#0A0D12] via-[#0E1218] to-[#050608] shadow-2xl space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
                <div className="flex items-center gap-2.5 text-[#62E6FF]">
                  <Brain className="size-5" />
                  <span className="font-mono text-xs font-bold uppercase tracking-widest text-foreground">
                    FORENSIC EVIDENCE REASONING ENGINE // v4.2-NEURAL
                  </span>
                </div>
                <span className="font-mono text-[10px] text-[#6EE7B7] bg-[#6EE7B7]/10 px-2.5 py-0.5 rounded-full border border-[#6EE7B7]/20 flex items-center gap-1.5 self-start sm:self-auto">
                  <span className="size-1.5 rounded-full bg-[#6EE7B7] animate-pulse" />
                  STANDARDS-GROUNDED INFERENCE
                </span>
              </div>

              {/* Preset Inquiry Chips */}
              <div className="space-y-2">
                <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                  SELECT FORENSIC INQUIRY VECTOR OR TYPE YOUR OWN:
                </span>
                <div className="flex flex-wrap gap-2">
                  {[
                    "How to detect anti-forensic timestomping in $MFT?",
                    "Extract deleted WhatsApp chats from SQLite WAL frames",
                    "Analyze RAM dump for Cobalt Strike in-memory beacon",
                    "Verify chain of custody under ISO/IEC 27037",
                  ].map((q) => (
                    <button
                      key={q}
                      type="button"
                      onClick={() => handleRunQuery(q)}
                      className={`px-3 py-1.5 rounded-lg border text-xs font-sans transition-all cursor-pointer ${
                        copilotQuery === q
                          ? "border-[#62E6FF] bg-[#62E6FF]/10 text-[#62E6FF] font-medium"
                          : "border-white/10 bg-white/5 text-muted-foreground hover:text-foreground hover:border-white/20"
                      }`}
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>

              {/* Custom Input Bar */}
              <div className="flex flex-col sm:flex-row items-center gap-3">
                <div className="relative flex-1 w-full">
                  <Terminal className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-[#62E6FF]" />
                  <input
                    type="text"
                    value={copilotQuery}
                    onChange={(e) => setCopilotQuery(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleRunQuery(copilotQuery)}
                    placeholder="Ask a forensic question (e.g., 'How does volatility find injected DLLs?')..."
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-white/10 bg-[#050608] font-sans text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-[#62E6FF] transition-colors"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => handleRunQuery(copilotQuery)}
                  disabled={isInferring}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#62E6FF] text-[#050608] font-mono text-xs uppercase tracking-widest font-bold shadow-[0_0_20px_rgba(98,230,255,0.3)] hover:bg-[#A5F3FC] transition-all cursor-pointer disabled:opacity-50"
                >
                  <Sparkles className="size-4" />
                  <span>{isInferring ? "INFERRING..." : "ANALYZE FORENSIC EVIDENCE"}</span>
                </button>
              </div>
            </div>

            {/* Inference Results Screen */}
            {inferenceResult && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                {/* Left: Step-by-Step Evidentiary Reasoning Protocol (7 cols) */}
                <div className="lg:col-span-7 p-6 sm:p-8 rounded-2xl border border-white/10 bg-[#0A0D12] space-y-6 shadow-xl">
                  <div className="flex items-center justify-between border-b border-white/5 pb-4">
                    <div>
                      <span className="font-mono text-[10px] uppercase tracking-widest text-[#62E6FF] font-semibold">
                        ACTIVE INQUIRY
                      </span>
                      <h4 className="font-display text-lg font-bold text-foreground mt-0.5">
                        {inferenceResult.query}
                      </h4>
                    </div>
                    <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 font-mono text-[10px] text-muted-foreground shrink-0">
                      {inferenceResult.standard}
                    </span>
                  </div>

                  {/* Multi-Step Forensic Decomposition */}
                  <div className="space-y-3">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">
                      SCIENTIFIC REASONING STEPS:
                    </span>
                    <div className="space-y-2.5">
                      {inferenceResult.reasoning.map((step, idx) => (
                        <div
                          key={idx}
                          className="p-3.5 rounded-xl border border-white/5 bg-white/[0.02] flex items-start gap-3 text-xs sm:text-sm text-foreground/90 font-sans leading-relaxed"
                        >
                          <CheckCircle2 className="size-4 text-[#62E6FF] shrink-0 mt-0.5" />
                          <span>{step}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Verdict Badge */}
                  <div className="p-4 rounded-xl border border-[#6EE7B7]/30 bg-[#6EE7B7]/10 flex items-center gap-3 text-xs font-mono text-[#6EE7B7]">
                    <ShieldAlert className="size-4 shrink-0" />
                    <span>VERDICT: {inferenceResult.verdict}</span>
                  </div>
                </div>

                {/* Right: Technical Paths & Command Line Recipe (5 cols) */}
                <div className="lg:col-span-5 space-y-6">
                  {/* Technical Paths */}
                  <div className="p-6 rounded-2xl border border-white/10 bg-[#0A0D12] space-y-3">
                    <div className="flex items-center gap-2 font-mono text-xs text-[#9B8CFF] font-semibold">
                      <HardDrive className="size-4" />
                      <span>TARGET ARTIFACT LOCATIONS</span>
                    </div>
                    <div className="space-y-1.5 font-mono text-xs">
                      {inferenceResult.targetPaths.map((p, i) => (
                        <div
                          key={i}
                          className="p-2.5 rounded-lg border border-white/5 bg-[#050608] text-foreground/90 break-all select-all"
                        >
                          {p}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* CLI Execution Recipe */}
                  <div className="p-6 rounded-2xl border border-white/10 bg-[#050608] space-y-3 font-mono">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-xs text-[#62E6FF] font-semibold">
                        <Terminal className="size-4" />
                        <span>CLI VERIFICATION SYNTAX</span>
                      </div>
                      <span className="text-[10px] text-muted-foreground">COURT-READY</span>
                    </div>

                    <div className="p-3 rounded-lg border border-white/5 bg-black/60 text-xs text-[#6EE7B7] break-all select-all font-semibold leading-relaxed">
                      $ {inferenceResult.cliRecipe}
                    </div>

                    <p className="font-sans text-[11px] text-muted-foreground leading-relaxed">
                      Must be executed on a verified bitstream image (E01 or raw dd) mounted read-only to preserve original file hashes under ISO/IEC 27037.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: ENCYCLOPEDIA CODEX LEXICON */}
        {activeTab === "encyclopedia" && (
          <div className="space-y-8 animate-fade-in">
            {/* Domain Filter Bar & Search */}
            <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
              <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
                {FORENSIC_DOMAINS_MAP.map((dom) => {
                  const isActive = selectedDomain === dom.id;
                  return (
                    <button
                      key={dom.id}
                      type="button"
                      onClick={() => {
                        soundEngine.playClick();
                        setSelectedDomain(dom.id);
                      }}
                      className={`px-3.5 py-2 rounded-xl border font-mono text-xs whitespace-nowrap transition-all cursor-pointer flex items-center gap-2 ${
                        isActive
                          ? "border-[#62E6FF] bg-[#62E6FF]/10 text-[#62E6FF] font-bold"
                          : "border-white/10 bg-[#0A0D12] text-muted-foreground hover:text-foreground hover:border-white/20"
                      }`}
                    >
                      <span>{dom.name}</span>
                      <span className="px-1.5 py-0.2 rounded-full bg-white/5 text-[9px]">
                        {dom.count}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="relative min-w-[260px] md:w-72">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground/60" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search forensic encyclopedia..."
                  className="w-full pl-10 pr-4 py-2 rounded-xl border border-white/10 bg-[#0A0D12] font-mono text-xs text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-[#62E6FF] transition-colors"
                />
              </div>
            </div>

            {/* Split Screen Lexicon View */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Left Column: Article List (4 cols) */}
              <div className="lg:col-span-4 rounded-2xl border border-white/10 bg-[#0A0D12] p-3 space-y-2 max-h-[680px] overflow-y-auto scrollbar-thin">
                <div className="p-2 border-b border-white/5 flex items-center justify-between text-[11px] font-mono text-muted-foreground">
                  <span className="uppercase tracking-widest font-semibold text-[#62E6FF]">
                    ARTICLES ({filteredArticles.length})
                  </span>
                  <span>TAP TO INSPECT</span>
                </div>

                {filteredArticles.map((art) => {
                  const isSelected = art.id === activeArticle.id;
                  return (
                    <button
                      key={art.id}
                      type="button"
                      onClick={() => {
                        soundEngine.playClick();
                        setSelectedArticleId(art.id);
                      }}
                      className={`w-full text-left p-3.5 rounded-xl border transition-all space-y-1.5 cursor-pointer ${
                        isSelected
                          ? "border-[#62E6FF]/50 bg-gradient-to-r from-[#62E6FF]/10 to-transparent shadow-[0_0_16px_rgba(98,230,255,0.15)]"
                          : "border-white/5 bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/15"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="px-2 py-0.5 rounded bg-white/5 font-mono text-[9px] text-[#62E6FF]">
                          {art.tag}
                        </span>
                        {isSelected && (
                          <span className="size-2 rounded-full bg-[#62E6FF] animate-pulse" />
                        )}
                      </div>
                      <h4 className="font-display font-bold text-sm text-foreground">
                        {art.title}
                      </h4>
                      <p className="font-sans text-[11px] text-muted-foreground line-clamp-2">
                        {art.summary}
                      </p>
                    </button>
                  );
                })}
              </div>

              {/* Right Column: Deep Article Dossier (8 cols) */}
              <div className="lg:col-span-8 p-6 sm:p-10 rounded-2xl border border-white/10 bg-[#0A0D12] space-y-6 shadow-2xl">
                {/* Article Header */}
                <div className="border-b border-white/10 pb-6 space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <span className="px-3 py-1 rounded-full bg-[#62E6FF]/10 text-[#62E6FF] font-mono text-xs font-semibold border border-[#62E6FF]/20">
                      {activeArticle.tag}
                    </span>
                    <span className="font-mono text-xs text-[#6EE7B7]">
                      {activeArticle.standard}
                    </span>
                  </div>
                  <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-foreground">
                    {activeArticle.title}
                  </h3>
                </div>

                {/* Summary & Evidentiary Value */}
                <div className="space-y-4 font-sans text-sm text-muted-foreground leading-relaxed">
                  <p className="text-foreground/90 text-base">
                    {activeArticle.summary}
                  </p>
                  <div className="p-4 rounded-xl border border-white/10 bg-white/[0.02] space-y-1">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-[#62E6FF] font-semibold block">
                      EVIDENTIARY VALUE IN COURT:
                    </span>
                    <p className="text-xs sm:text-sm text-foreground/80">
                      {activeArticle.evidentiaryValue}
                    </p>
                  </div>
                </div>

                {/* Key Principles Grid */}
                <div className="space-y-3 pt-2">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">
                    CORE SCIENTIFIC PRINCIPLES:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {activeArticle.keyPrinciples.map((principle, idx) => (
                      <div
                        key={idx}
                        className="p-3 rounded-lg border border-white/5 bg-[#050608] flex items-start gap-2 text-xs font-sans text-foreground/90"
                      >
                        <Check className="size-3.5 text-[#6EE7B7] shrink-0 mt-0.5" />
                        <span>{principle}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Technical Paths & CLI Tools */}
                {(activeArticle.technicalPaths || activeArticle.cliTools) && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 font-mono text-xs">
                    {activeArticle.technicalPaths && (
                      <div className="p-4 rounded-xl border border-white/5 bg-[#050608] space-y-2">
                        <span className="text-muted-foreground text-[10px] uppercase tracking-wider font-semibold block">
                          SYSTEM PATHS:
                        </span>
                        {activeArticle.technicalPaths.map((tp, i) => (
                          <div key={i} className="text-foreground/80 break-all select-all text-[11px]">
                            {tp}
                          </div>
                        ))}
                      </div>
                    )}
                    {activeArticle.cliTools && (
                      <div className="p-4 rounded-xl border border-white/5 bg-[#050608] space-y-2">
                        <span className="text-muted-foreground text-[10px] uppercase tracking-wider font-semibold block">
                          FORENSIC TOOLCHAIN:
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {activeArticle.cliTools.map((tool, i) => (
                            <span key={i} className="px-2 py-0.5 rounded bg-white/5 text-[#62E6FF] text-[11px]">
                              {tool}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Real Casework Sample Analysis Callout */}
                <div className="p-4 sm:p-5 rounded-xl border border-[#9B8CFF]/30 bg-[#9B8CFF]/5 space-y-2">
                  <div className="flex items-center gap-2 font-mono text-xs text-[#9B8CFF] font-bold">
                    <FileSearch className="size-4" />
                    <span>CASEWORK FINDINGS TRANSCRIPT</span>
                  </div>
                  <p className="font-mono text-xs text-foreground/80 leading-relaxed">
                    {activeArticle.sampleAnalysis}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: TRIAGE SCENARIOS & CASE STUDIES */}
        {activeTab === "cases" && (
          <div className="space-y-8 animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {FORENSIC_CASE_SCENARIOS.map((cs) => (
                <div
                  key={cs.id}
                  className="p-6 md:p-8 rounded-2xl border border-white/10 bg-[#0A0D12] hover:border-[#62E6FF]/40 transition-all space-y-6 flex flex-col justify-between shadow-xl"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between font-mono text-[10px]">
                      <span className="px-2.5 py-0.5 rounded-full bg-[#62E6FF]/10 text-[#62E6FF] font-semibold border border-[#62E6FF]/20">
                        {cs.domain}
                      </span>
                      <span className="text-muted-foreground">CASE ID: {cs.id.slice(0, 7)}</span>
                    </div>

                    <h3 className="font-display text-xl font-bold text-foreground leading-snug">
                      {cs.title}
                    </h3>

                    <div className="p-3.5 rounded-xl border border-white/5 bg-black/40 space-y-1">
                      <span className="font-mono text-[10px] uppercase tracking-wider text-[#FF7070] font-semibold block">
                        ADVERSARY TACTIC:
                      </span>
                      <p className="font-sans text-xs text-muted-foreground leading-relaxed">
                        {cs.adversaryAction}
                      </p>
                    </div>

                    {/* Sequential Phases */}
                    <div className="space-y-3 pt-2">
                      <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">
                        AI TRIAGE PHASES:
                      </span>
                      {cs.aiTriageProtocol.map((phase, i) => (
                        <div key={i} className="p-3 rounded-lg border border-white/5 bg-white/[0.02] space-y-1 text-xs">
                          <div className="flex items-center justify-between font-mono text-[11px]">
                            <span className="text-[#62E6FF] font-semibold">{phase.phase}</span>
                            <span className="text-muted-foreground">{phase.tool}</span>
                          </div>
                          <p className="font-sans text-muted-foreground text-[11px] leading-snug">
                            {phase.action}
                          </p>
                          <div className="pt-1 font-mono text-[10px] text-[#6EE7B7]">
                            ✓ {phase.verdict}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: LIVE HASH & ENTROPY LAB */}
        {activeTab === "calculator" && (
          <div className="p-8 md:p-12 rounded-2xl border border-white/10 bg-[#0A0D12] shadow-2xl space-y-8 animate-fade-in">
            <div className="space-y-2 max-w-3xl">
              <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#62E6FF] font-semibold">
                <Hash className="size-4" />
                <span>CRYPTOGRAPHIC VERIFICATION &amp; ENTROPY ANALYSIS</span>
              </div>
              <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground">
                Bitstream Evidence Hashing &amp; Randomness Inspection
              </h3>
              <p className="font-sans text-xs sm:text-sm text-muted-foreground leading-relaxed">
                In forensic science, cryptographic hashing provides mathematical certainty that evidence has never been modified by a single bit. Shannon entropy gauges the degree of randomness: high entropy (&gt; 7.0) reveals encrypted files or packed malware payloads.
              </p>
            </div>

            {/* Input String / Simulated Buffer */}
            <div className="space-y-2">
              <label className="block font-mono text-xs uppercase tracking-wider text-muted-foreground">
                INPUT FORENSIC STRING / BYTE PAYLOAD:
              </label>
              <textarea
                rows={3}
                value={sampleInput}
                onChange={(e) => setSampleInput(e.target.value)}
                placeholder="Type or paste any text to compute live SHA-256 and Shannon Entropy..."
                className="w-full p-4 rounded-xl border border-white/10 bg-[#050608] font-mono text-xs text-foreground focus:outline-none focus:border-[#62E6FF] transition-colors resize-none"
              />
            </div>

            {/* Calculations Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-mono">
              {/* SHA-256 Hash Card */}
              <div className="p-6 rounded-xl border border-white/10 bg-[#050608] space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-[#62E6FF] font-bold uppercase tracking-wider">
                    SHA-256 EVIDENCE CHECKSUM (FIPS 180-4)
                  </span>
                  <button
                    type="button"
                    onClick={copyHash}
                    className="flex items-center gap-1 text-[10px] text-muted-foreground hover:text-[#62E6FF] transition-colors cursor-pointer"
                  >
                    {copiedHash ? <Check className="size-3 text-[#6EE7B7]" /> : <Copy className="size-3" />}
                    <span>{copiedHash ? "COPIED" : "COPY HASH"}</span>
                  </button>
                </div>
                <div className="p-3.5 rounded-lg bg-black/60 border border-white/5 text-xs text-[#6EE7B7] break-all select-all font-semibold">
                  {calculatedSha256}
                </div>
                <p className="font-sans text-[11px] text-muted-foreground">
                  Bit-for-bit immutable fingerprint. Any change to the input payload produces an entirely different hash (Avalanche Effect).
                </p>
              </div>

              {/* Shannon Entropy Card */}
              <div className="p-6 rounded-xl border border-white/10 bg-[#050608] space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-[#9B8CFF] font-bold uppercase tracking-wider">
                    SHANNON ENTROPY SCORE
                  </span>
                  <span className="text-xs font-bold text-foreground">
                    {calculatedEntropy} / 8.000 bits
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="w-full h-3 rounded-full bg-white/5 overflow-hidden border border-white/10">
                  <div
                    className="h-full bg-gradient-to-r from-[#62E6FF] via-[#9B8CFF] to-[#FF7070] transition-all duration-300"
                    style={{ width: `${Math.min(100, (calculatedEntropy / 8) * 100)}%` }}
                  />
                </div>

                <div className="flex items-center justify-between text-[10px] text-muted-foreground">
                  <span>0.0 (Uniform Plaintext)</span>
                  <span>4.0 (Normal Source Code)</span>
                  <span>7.5+ (Encrypted / Packed)</span>
                </div>

                <p className="font-sans text-[11px] text-muted-foreground">
                  {calculatedEntropy > 6.5
                    ? "HIGH ENTROPY: Likely contains encrypted data, compressed bytes, or obfuscated malware payload."
                    : "LOW TO MODERATE ENTROPY: Consistent with human-readable text, markup, or structured source code."}
                </p>
              </div>
            </div>

            {/* Custody Tag Simulator */}
            <div className="p-5 rounded-xl border border-white/5 bg-white/[0.02] flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono text-xs text-muted-foreground">
              <div className="flex items-center gap-2">
                <ShieldAlert className="size-4 text-[#6EE7B7]" />
                <span>ISO/IEC 27037 CUSTODY SEAL: #TK-CUSTODY-{Math.abs(calculatedEntropy * 1000).toFixed(0)}</span>
              </div>
              <div className="text-[11px]">
                STATUS: MATHEMATICALLY UNALTERED // VERIFIED
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
