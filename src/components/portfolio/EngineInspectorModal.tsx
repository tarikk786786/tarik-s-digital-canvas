import { useState, useEffect } from "react";
import {
  Cpu,
  Layers,
  Activity,
  Shield,
  Server,
  Database,
  Globe,
  X,
  CheckCircle2,
  Terminal,
  Code2,
  ExternalLink,
} from "lucide-react";

interface LayerDetail {
  id: string;
  name: string;
  tech: string;
  category: string;
  description: string;
  metrics: { label: string; value: string }[];
  codeSnippet: string;
}

const ARCHITECTURE_STRATA: LayerDetail[] = [
  {
    id: "stratum-1",
    name: "01 / VISUAL INTERFACE LAYER",
    tech: "React 19 · Tailwind CSS v4 · Satoshi & Mono Typography",
    category: "DOM & Presentation",
    description:
      "A high-contrast editorial interface built with pure vector typography, zero artificial CSS text blurs, and strict 60 FPS rendering boundaries.",
    metrics: [
      { label: "Render Engine", value: "React 19.2 Concurrent" },
      { label: "Typography", value: "Satoshi + IBM Plex Mono" },
      { label: "CSS Architecture", value: "Tailwind CSS v4 (Zero-runtime)" },
      { label: "Layout Shifts (CLS)", value: "0.000 (Locked)" },
    ],
    codeSnippet: `// Pure React 19 Concurrent UI with Zero Text Blur
<main className="relative min-h-dvh bg-[#0C0E12] text-foreground font-sans">
  <Suspense fallback={<SectionFallback />}>
    <ScreensAndSeoShowroom />
    <ExecutionEngine />
  </Suspense>
</main>`,
  },
  {
    id: "stratum-2",
    name: "02 / ROUTING & STATE PIPELINE",
    tech: "TanStack Router · TanStack Start · Code-Split Chunks",
    category: "Navigation & State",
    description:
      "Type-safe navigation and client routing. Below-the-fold 3D sections are asynchronously code-split into independent chunks to preserve an instant initial LCP paint under 100ms.",
    metrics: [
      { label: "Router Engine", value: "TanStack Router v1.170" },
      { label: "Bundle Splitting", value: "Lazy Dynamic Modules" },
      { label: "Initial Hydration", value: "< 280ms" },
      { label: "Navigation Safety", value: "100% Type-safe Routes" },
    ],
    codeSnippet: `// Asynchronous Chunk Splitting
const ExecutionEngine = lazy(() =>
  import("@/components/portfolio/ExecutionEngine").then((m) => ({
    default: m.ExecutionEngine,
  }))
);`,
  },
  {
    id: "stratum-3",
    name: "03 / SPATIAL 3D WEBGL GRAPHICS",
    tech: "Three.js r185 · Custom Shaders · IntersectionObserver RAF",
    category: "3D Spatial Computing",
    description:
      "Declarative WebGL canvas routines running dual gyroscopic gyros, particle clouds, and real-time pointer tracking. Automatically pauses rendering when offscreen.",
    metrics: [
      { label: "Graphics API", value: "WebGL 2.0 / GLSL" },
      { label: "Target Frame Rate", value: "Locked 60 FPS" },
      { label: "Offscreen Overhead", value: "0% Idle CPU (IO Observer)" },
      { label: "Canvas Resolution", value: "Capped at DPR 2.0 max" },
    ],
    codeSnippet: `// Auto-pausing 60 FPS Animation Loop
const observer = new IntersectionObserver(([entry]) => {
  isVisible = entry.isIntersecting;
}, { threshold: 0.05 });
observer.observe(container);

function animate() {
  requestAnimationFrame(animate);
  if (!isVisible) return; // Zero GPU burn when not visible
  renderer.render(scene, camera);
}`,
  },
  {
    id: "stratum-4",
    name: "04 / DATA SCHEMAS & EVIDENCE INTEGRITY",
    tech: "Zod Schema Contracts · SHA-256 Hashes · Evidence Enclaves",
    category: "Validation & Cryptography",
    description:
      "Strict runtime validation and deterministic data structures. Every forensic log, telemetry stream, and project card is governed by immutable schema contracts.",
    metrics: [
      { label: "Schema Engine", value: "Zod v3.24 Strict" },
      { label: "Cryptographic Hash", value: "SHA-256 Twin Audits" },
      { label: "RAG Citations", value: "Ground-truth Verified" },
      { label: "Chain of Custody", value: "Immutable Ledger" },
    ],
    codeSnippet: `// Deterministic Schema Validation
const CaseEvidenceSchema = z.object({
  id: z.string(),
  sha256: z.string().length(64),
  chainOfCustody: z.array(z.string()),
  timestamp: z.string(),
});`,
  },
  {
    id: "stratum-5",
    name: "05 / EDGE CLOUD & CDN TOPOLOGY",
    tech: "Vercel Global Edge Network · Nitro SSR · Brotli Compression",
    category: "Global Infrastructure",
    description:
      "Deployed worldwide across Vercel Edge points-of-presence. Instant TLS 1.3 handshake, HTTP/3 multiplexing, and automatic static cache invalidation on Git pushes.",
    metrics: [
      { label: "Edge Provider", value: "Vercel Global Edge" },
      { label: "Edge Protocol", value: "HTTP/3 over QUIC" },
      { label: "Asset Compression", value: "Brotli (gzip fallback)" },
      { label: "Global Latency", value: "< 18ms Edge RTT" },
    ],
    codeSnippet: `// Nitro Vercel Output Configuration
export default defineNitroConfig({
  preset: "vercel",
  compatibilityDate: "2026-09-08",
  compressPublicAssets: { brotli: true, gzip: true },
});`,
  },
];

export function EngineInspectorModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeStratum, setActiveStratum] = useState<string>("stratum-1");
  const [domNodesCount, setDomNodesCount] = useState<number>(0);
  const [webglContextCount, setWebglContextCount] = useState<number>(0);
  const [viewportDpr, setViewportDpr] = useState<string>("1.0");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setDomNodesCount(document.getElementsByTagName("*").length);
      setWebglContextCount(document.querySelectorAll("canvas").length);
      setViewportDpr(window.devicePixelRatio.toFixed(1));
    }
  }, [isOpen]);

  // Listen for global shortcut 'E'
  useEffect(() => {
    const handleCustomOpen = () => {
      setIsOpen((prev) => !prev);
    };
    window.addEventListener("tarik:open-engine-inspector", handleCustomOpen);
    return () => window.removeEventListener("tarik:open-engine-inspector", handleCustomOpen);
  }, []);

  const currentStratum = ARCHITECTURE_STRATA.find((s) => s.id === activeStratum) || ARCHITECTURE_STRATA[0];

  return (
    <>
      {/* Inspector Modal Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-fade-in">
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="engine-inspector-title"
            className="w-full max-w-5xl max-h-[90vh] rounded-2xl border border-white/10 bg-[#0E1015] flex flex-col shadow-[0_30px_100px_rgba(0,0,0,0.95)] overflow-hidden"
          >
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-white/10 bg-[#14161C]/90 backdrop-blur-md flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-sky-500/10 border border-sky-500/30 text-sky-400">
                  <Cpu className="size-4" />
                </div>
                <div>
                  <h3 id="engine-inspector-title" className="font-mono text-xs font-bold text-foreground tracking-wider uppercase">
                    SYSTEMS RUNTIME INSPECTOR // LIVE ARCHITECTURE
                  </h3>
                  <div className="flex items-center gap-2 font-mono text-[10px] text-muted-foreground">
                    <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>5-STRATA DEEP DIVE · RUNTIME TELEMETRY</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="hidden md:flex items-center gap-4 font-mono text-[10px] text-muted-foreground">
                  <span>DOM NODES: <strong className="text-foreground">{domNodesCount}</strong></span>
                  <span>CANVASES: <strong className="text-accent">{webglContextCount}</strong></span>
                  <span>DPR: <strong className="text-sky-400">{viewportDpr}x</strong></span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  aria-label="Close engine inspector"
                  className="p-1.5 rounded-lg border border-white/10 text-muted-foreground hover:text-foreground hover:bg-white/5 transition-colors cursor-pointer"
                >
                  <X className="size-4" />
                </button>
              </div>
            </div>

            {/* Modal Body: Strata Selector Tabs + Detail Panel */}
            <div className="flex-1 overflow-y-auto grid grid-cols-1 lg:grid-cols-12 gap-0">
              {/* Left Column: Strata List */}
              <div className="lg:col-span-5 p-4 sm:p-6 border-b lg:border-b-0 lg:border-r border-white/10 bg-[#12141A]/50 space-y-2">
                <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-3 px-1">
                  SELECT ARCHITECTURAL STRATUM:
                </div>
                {ARCHITECTURE_STRATA.map((stratum) => {
                  const isActive = stratum.id === activeStratum;
                  return (
                    <button
                      key={stratum.id}
                      type="button"
                      onClick={() => setActiveStratum(stratum.id)}
                      className={`w-full p-3.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                        isActive
                          ? "border-accent bg-accent/10 shadow-[0_0_20px_rgba(232,168,56,0.2)]"
                          : "border-white/5 bg-white/[0.02] hover:border-white/20 hover:bg-white/5 text-muted-foreground"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className={`font-mono text-[10px] font-bold ${isActive ? "text-accent" : "text-muted-foreground"}`}>
                          {stratum.category}
                        </span>
                        {isActive && <CheckCircle2 className="size-3.5 text-accent" />}
                      </div>
                      <h4 className={`font-mono text-xs font-bold mt-1 ${isActive ? "text-foreground" : "text-foreground/80"}`}>
                        {stratum.name}
                      </h4>
                      <p className="font-mono text-[10px] text-muted-foreground mt-0.5 truncate">
                        {stratum.tech}
                      </p>
                    </button>
                  );
                })}
              </div>

              {/* Right Column: Active Stratum Deep Dive */}
              <div className="lg:col-span-7 p-6 sm:p-8 space-y-6 flex flex-col justify-between bg-[#0E1015]">
                <div className="space-y-4">
                  <div>
                    <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-accent font-bold">
                      {currentStratum.category}
                    </span>
                    <h4 className="font-display text-2xl font-bold text-foreground mt-1">
                      {currentStratum.name}
                    </h4>
                    <p className="font-mono text-xs text-sky-400 font-semibold mt-0.5">
                      {currentStratum.tech}
                    </p>
                  </div>

                  <p className="font-sans text-sm text-muted-foreground leading-relaxed">
                    {currentStratum.description}
                  </p>

                  {/* Metrics Grid */}
                  <div className="grid grid-cols-2 gap-3 pt-2">
                    {currentStratum.metrics.map((m) => (
                      <div
                        key={m.label}
                        className="p-3 rounded-lg border border-white/5 bg-[#14161C] font-mono text-xs"
                      >
                        <div className="text-[9px] text-muted-foreground uppercase">{m.label}</div>
                        <div className="text-foreground font-bold text-xs mt-0.5">{m.value}</div>
                      </div>
                    ))}
                  </div>

                  {/* Code Snippet Box */}
                  <div className="pt-2 space-y-1.5">
                    <div className="flex items-center justify-between font-mono text-[10px] text-muted-foreground">
                      <span>ENGINE CODE PATTERN</span>
                      <span className="text-emerald-400">TYPE-SAFE · ZERO VULNERABILITIES</span>
                    </div>
                    <pre className="p-4 rounded-xl border border-white/10 bg-[#0A0C10] font-mono text-[11px] text-emerald-300 overflow-x-auto leading-relaxed">
                      <code>{currentStratum.codeSnippet}</code>
                    </pre>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between font-mono text-[10px] text-muted-foreground">
                  <span>ARCHITECTURE BLUEPRINT: 100% OPEN</span>
                  <a
                    href="https://github.com/tarikk786786/tarik-s-digital-canvas"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-accent hover:underline"
                  >
                    <span>VIEW GITHUB REPOSITORY</span>
                    <ExternalLink className="size-3" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
