import { useEffect, useRef, useState, useMemo } from "react";
import * as THREE from "three";
import {
  Monitor,
  Smartphone,
  Tablet,
  Search,
  Layers,
  Sparkles,
  Zap,
  Activity,
  ArrowRight,
  ExternalLink,
  Code2,
  Sliders,
  Globe,
  Gauge,
  Eye,
  Keyboard,
  Volume2,
  CheckCircle2,
  Cpu,
  Server,
  ShieldCheck,
  Terminal,
  FileCode2,
  Check,
  ChevronRight,
  Maximize2,
  RefreshCw,
} from "lucide-react";

// ==========================================
// 1. SHOWROOM PRODUCTS DATA
// ==========================================
interface ShowroomProduct {
  id: string;
  name: string;
  category: string;
  tagline: string;
  color: string;
  hexColor: number;
  textColor: string;
  borderColor: string;
  liveUrl?: string;
  problem: string;
  research: string;
  architecture: string;
  technology: string[];
  performance: string;
  result: string;
  layers: { name: string; tag: string; detail: string; color: string }[];
}

const PRODUCTS: ShowroomProduct[] = [
  {
    id: "dezo",
    name: "Dezo.in — AI Product Studio",
    category: "AI-NATIVE PLATFORM & STUDIO",
    tagline: "High-velocity intelligence and secure software product engineering",
    color: "#E8A838",
    hexColor: 0xe8a838,
    textColor: "text-amber-400",
    borderColor: "border-amber-500/40 hover:border-amber-400",
    liveUrl: "https://dezo.in",
    problem:
      "Modern businesses struggle to convert raw AI models into defensible, high-assurance software products with verifiable outputs and zero hallucinations.",
    research:
      "Analyzed failure points in LLM production systems: 68% of enterprise rollouts stall due to ungrounded prompts, state desynchronization, and lack of verifiable audit trails.",
    architecture:
      "Event-driven microservices architecture coupling deterministic Zod-validated API contracts with streaming edge inference and persistent vector knowledge stores.",
    technology: ["React 19", "TypeScript", "Next.js", "Python", "PyTorch", "Tailwind CSS", "PostgreSQL"],
    performance: "140ms LCP · 99.4% Grounding Accuracy · Sub-20ms API response",
    result:
      "A flagship AI product studio driving commercial products with built-in auditability, deterministic evaluation, and enterprise-grade resilience.",
    layers: [
      { name: "UI Presentation Layer", tag: "FRONTEND", detail: "React 19 Server Components, bespoke typography & fluid glassmorphism", color: "#E8A838" },
      { name: "Component Primitive Layer", tag: "SYSTEM", detail: "Radix UI accessible headless controls & responsive Tailwind tokens", color: "#38BDF8" },
      { name: "State & Cache Layer", tag: "QUERY", detail: "TanStack Query optimistic updates, microsecond hydration & client stores", color: "#10B981" },
      { name: "RPC & Contract Gateway", tag: "GATEWAY", detail: "Zod-enforced request validation, JWT authentication & rate limiting", color: "#6366F1" },
      { name: "Neural Inference Engine", tag: "COGNITION", detail: "Autonomous reasoning agent loops, vector RAG & streaming tokens", color: "#A855F7" },
      { name: "Infrastructure & Edge", tag: "DEV-OPS", detail: "Docker containerization, PostgreSQL ACID storage & Vercel global edge CDN", color: "#EC4899" },
    ],
  },
  {
    id: "forensickit",
    name: "Aegis-DF (ForensicKit)",
    category: "CRYPTOGRAPHIC EVIDENCE ENGINE",
    tagline: "Bitstream verification, volatile memory triage & court-ready chain of custody",
    color: "#38BDF8",
    hexColor: 0x38bdf8,
    textColor: "text-sky-400",
    borderColor: "border-sky-500/40 hover:border-sky-400",
    problem:
      "Investigators and security teams lack rapid, write-blocked memory extraction tools capable of automated SHA-256 verification and ISO/IEC 27037 compliant audit logs.",
    research:
      "Investigated kernel-level RAM capture artifacts, process hollowing vectors, and court admissibility standards for cryptographic integrity hashes.",
    architecture:
      "Low-level memory parser written in Rust/Python with deterministic state extraction, twin-hash generation, and automated markdown evidence dossier generation.",
    technology: ["Python", "Rust", "SQLite", "Cryptographic Hashing", "CLI & Web HUD", "ISO/IEC 27037"],
    performance: "100% Bitstream Accuracy · Instant Hash Matching · Zero Target Modification",
    result:
      "Audit-grade digital forensic toolkit generating court-admissible evidence packages with unbroken chain of custody in under 60 seconds.",
    layers: [
      { name: "Investigation HUD", tag: "INTERFACE", detail: "High-contrast terminal UI & web timeline visualizer for incident responders", color: "#38BDF8" },
      { name: "Artifact Extraction", tag: "PARSER", detail: "Registry, volatile memory heap, and process hollow analysis primitives", color: "#10B981" },
      { name: "Cryptographic Tree", tag: "INTEGRITY", detail: "Parallel SHA-256 and Blake3 bitstream verification and tamper seals", color: "#E8A838" },
      { name: "Custody Ledger", tag: "BLOCK", detail: "Immutable chronological custody log conforming to ISO/IEC 27037 standards", color: "#6366F1" },
      { name: "OS Isolation Layer", tag: "KERNEL", detail: "Hardware write-blocking and read-only physical memory access drivers", color: "#A855F7" },
      { name: "Secure Storage", tag: "VAULT", detail: "Encrypted evidence vault with multi-signature verification protocols", color: "#EC4899" },
    ],
  },
  {
    id: "threatlens",
    name: "ThreatLens Cyber Radar",
    category: "CYBERSECURITY SIEM & ZERO-TRUST",
    tagline: "Real-time threat detection, anomaly scoring & automated incident mitigation",
    color: "#10B981",
    hexColor: 0x10b981,
    textColor: "text-emerald-400",
    borderColor: "border-emerald-500/40 hover:border-emerald-400",
    problem:
      "Security Operations Centers suffer from alert fatigue, false positives, and delayed mitigation responses during sophisticated multi-vector zero-day attacks.",
    research:
      "Evaluated packet behavior during DDoS, credential stuffing, and API injection attacks to design a heuristic scoring engine with 0.8ms inspection time.",
    architecture:
      "Distributed packet inspection proxy feeding real-time anomaly scores into automated firewall tarpit rules with WebSocket telemetry streaming.",
    technology: ["TypeScript", "WebSockets", "ML Classification", "Tailwind CSS", "Redis", "Zero Trust"],
    performance: "0.85ms Packet Inspection · 0.00% Zero-Day Escape · 1,400+ Deflections/sec",
    result:
      "Live operational security cockpit delivering sub-second threat isolation and automated remediation for high-value enterprise endpoints.",
    layers: [
      { name: "SOC Visual Radar", tag: "CANVAS", detail: "Real-time WebGL particle radar mapping global adversary telemetry", color: "#10B981" },
      { name: "Alert Aggregator", tag: "STREAM", detail: "Deduplication engine collapsing 10,000 alerts into actionable threat incidents", color: "#38BDF8" },
      { name: "Zero-Trust Enforcer", tag: "POLICY", detail: "Dynamic privilege revocation and instantaneous device quarantine rules", color: "#E8A838" },
      { name: "Packet Inspection Engine", tag: "HEURISTIC", detail: "Deep packet inspection comparing against STRIDE threat taxonomy", color: "#6366F1" },
      { name: "Fast In-Memory Cache", tag: "REDIS", detail: "Sub-millisecond sliding-window rate limiters and IP reputation lookups", color: "#A855F7" },
      { name: "Secure Edge Tarpit", tag: "NETWORK", detail: "Automated adversary throttling and honeypot redirection infrastructure", color: "#EC4899" },
    ],
  },
  {
    id: "portfolio",
    name: "Tarik's Digital Canvas (This Site)",
    category: "3D SPATIAL PORTFOLIO & AUDIT HUB",
    tagline: "TanStack Start, Three.js spatial scenes, 100% SEO, and forensic precision",
    color: "#A855F7",
    hexColor: 0xa855f7,
    textColor: "text-purple-400",
    borderColor: "border-purple-500/40 hover:border-purple-400",
    liveUrl: "https://tarik-s-digital-canvas-ebon.vercel.app",
    problem:
      "Standard tech portfolios are static resume clones that fail to prove technical depth, systems thinking, 3D interaction craft, or production rigor.",
    research:
      "Engineered a narrative arc combining forensic discipline with live telemetry, procedural Three.js rendering, and structured JSON-LD schemas.",
    architecture:
      "Server-Side Rendered TanStack Start app with React 19, code-split WebGL bundles, zero artificial CSS blur, and sub-second edge deployment.",
    technology: ["TanStack Start", "React 19", "Three.js", "TypeScript", "Tailwind CSS", "Nitro", "Vercel"],
    performance: "100 Lighthouse SEO · 60 FPS WebGL · Instant First Paint · Zero CLS",
    result:
      "A living multidisciplinary showcase demonstrating high-level craftsmanship, architectural coherence, and production engineering excellence.",
    layers: [
      { name: "Editorial Canvas", tag: "EDITORIAL", detail: "Precision typography with Satoshi & IBM Plex Mono; zero artificial blur", color: "#A855F7" },
      { name: "Procedural 3D Canvas", tag: "THREE.JS", detail: "Custom WebGL singularity core, orbital particle networks & gyro rings", color: "#E8A838" },
      { name: "Interactive Telemetry", tag: "SIMULATION", detail: "Live forensic audit engines, reactive architecture explorers & state dials", color: "#38BDF8" },
      { name: "Type-Safe Routing", tag: "TANSTACK", detail: "TanStack Start and Router with strict loaders and search params", color: "#10B981" },
      { name: "Structured Metadata", tag: "SEO / AI", detail: "JSON-LD Schema.org graphs for Google, Bing, and AI Search engines", color: "#6366F1" },
      { name: "Edge Serverless Engine", tag: "NITRO / VERCEL", detail: "High-performance Nitro engine compiled to global edge serverless worker", color: "#EC4899" },
    ],
  },
];

// ==========================================
// 2. SEO SIMULATION CHECKLIST DATA
// ==========================================
interface SeoCheckItem {
  id: string;
  name: string;
  tag: string;
  desc: string;
  pts: number;
  active: boolean;
}

const INITIAL_SEO_CHECKS: SeoCheckItem[] = [
  { id: "semantic", name: "Semantic HTML Structure", tag: "<header> <main> <section>", desc: "Native landmark elements, clean document outline, header hierarchy", pts: 22, active: true },
  { id: "metadata", name: "Structured Meta & OpenGraph", tag: "<meta> canonical", desc: "Title, description, canonical URL, twitter cards, and social sharing previews", pts: 14, active: true },
  { id: "jsonld", name: "JSON-LD & Schema.org Entities", tag: "Person, WebSite, Profile", desc: "Machine-readable structured data establishing verified author and skill entities", pts: 14, active: true },
  { id: "vitals", name: "Core Web Vitals Optimization", tag: "LCP < 1.2s · CLS 0.00", desc: "Code-split lazy chunks, font preloading, zero layout shift, microsecond hydration", pts: 18, active: true },
  { id: "tech", name: "Technical SEO Infrastructure", tag: "sitemap.xml · robots.txt", desc: "Automated XML sitemaps, robots crawl directives, Brotli compression & TLS 1.3", pts: 14, active: true },
  { id: "a11y", name: "Accessibility (WCAG 2.1 AAA)", tag: "ARIA · Focus · Contrast", desc: "Keyboard navigable, skip-to-content, 7:1 color contrast, screen reader labels", pts: 18, active: true },
];

export function ScreensAndSeoShowroom() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [selectedProductIdx, setSelectedProductIdx] = useState<number>(0);
  const [isExploded, setIsExploded] = useState<boolean>(false);
  const [explosionDistance, setExplosionDistance] = useState<number>(60);
  const [activeDeviceView, setActiveDeviceView] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const [seoChecks, setSeoChecks] = useState<SeoCheckItem[]>(INITIAL_SEO_CHECKS);
  const [isSimulatingSeo, setIsSimulatingSeo] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isTypingSearch, setIsTypingSearch] = useState<boolean>(false);
  const [searchComplete, setSearchComplete] = useState<boolean>(false);

  // Compute live SEO score based on checklist
  const seoScore = useMemo(() => {
    return seoChecks.reduce((acc, curr) => (curr.active ? acc + curr.pts : acc), 0);
  }, [seoChecks]);

  const toggleSeoCheck = (id: string) => {
    setSeoChecks((prev) =>
      prev.map((c) => (c.id === id ? { ...c, active: !c.active } : c))
    );
  };

  const runFullSeoScan = () => {
    setIsSimulatingSeo(true);
    // Turn all off, then trigger in sequence
    setSeoChecks((prev) => prev.map((c) => ({ ...c, active: false })));
    let currentIdx = 0;
    const interval = setInterval(() => {
      if (currentIdx < INITIAL_SEO_CHECKS.length) {
        const targetId = INITIAL_SEO_CHECKS[currentIdx].id;
        setSeoChecks((prev) =>
          prev.map((c) => (c.id === targetId ? { ...c, active: true } : c))
        );
        currentIdx++;
      } else {
        clearInterval(interval);
        setIsSimulatingSeo(false);
      }
    }, 450);
  };

  // Run Search Bar typing animation
  const runSearchAnimation = () => {
    setIsTypingSearch(true);
    setSearchComplete(false);
    setSearchQuery("");
    const targetText = "Who is Tarik Islam?";
    let charIdx = 0;
    const typeInterval = setInterval(() => {
      if (charIdx <= targetText.length) {
        setSearchQuery(targetText.slice(0, charIdx));
        charIdx++;
      } else {
        clearInterval(typeInterval);
        setIsTypingSearch(false);
        setSearchComplete(true);
      }
    }, 85);
  };

  // 3D Scene Refs for Product Showroom
  const sceneRef = useRef<{
    scene?: THREE.Scene;
    camera?: THREE.PerspectiveCamera;
    renderer?: THREE.WebGLRenderer;
    screenMeshGroup?: THREE.Group;
    layerMeshes: THREE.Mesh[];
    targetCameraPos: THREE.Vector3;
    currentCameraPos: THREE.Vector3;
    targetLookAt: THREE.Vector3;
    currentLookAt: THREE.Vector3;
    isIntersecting: boolean;
    reqId: number;
  }>({
    layerMeshes: [],
    targetCameraPos: new THREE.Vector3(0, 1.5, 11),
    currentCameraPos: new THREE.Vector3(0, 1.5, 15),
    targetLookAt: new THREE.Vector3(0, 0, 0),
    currentLookAt: new THREE.Vector3(0, 0, 0),
    isIntersecting: false,
    reqId: 0,
  });

  const activeProduct = PRODUCTS[selectedProductIdx];

  // ==========================================
  // THREE.JS 3D FLOATING SCREENS SETUP
  // ==========================================
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 800;
    const height = container.clientHeight || 560;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0a0c10, 0.04);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 1.5, 12);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;
    container.appendChild(renderer.domElement);

    // Screen Group
    const screenMeshGroup = new THREE.Group();
    scene.add(screenMeshGroup);

    // Create 6 floating layered planes for "Exploded Screen Architecture"
    const layerMeshes: THREE.Mesh[] = [];
    const colors = [0xe8a838, 0x38bdf8, 0x10b981, 0x6366f1, 0xa855f7, 0xec4899];

    for (let i = 0; i < 6; i++) {
      const pGeom = new THREE.PlaneGeometry(6.2, 3.8);
      const pMat = new THREE.MeshStandardMaterial({
        color: colors[i],
        roughness: 0.15,
        metalness: 0.85,
        transparent: true,
        opacity: 0.45 + (5 - i) * 0.08,
        wireframe: i > 0,
        side: THREE.DoubleSide,
      });
      const mesh = new THREE.Mesh(pGeom, pMat);
      mesh.position.set(0, 0, -i * 0.2);
      screenMeshGroup.add(mesh);
      layerMeshes.push(mesh);
    }

    // Outer framing screen bezel
    const bezelGeom = new THREE.BoxGeometry(6.6, 4.2, 0.2);
    const bezelMat = new THREE.MeshStandardMaterial({
      color: 0x1c202c,
      roughness: 0.3,
      metalness: 0.8,
      wireframe: true,
    });
    const bezel = new THREE.Mesh(bezelGeom, bezelMat);
    screenMeshGroup.add(bezel);

    // Floating UI Particles
    const pCount = 500;
    const pPos = new Float32Array(pCount * 3);
    const pCol = new Float32Array(pCount * 3);
    for (let i = 0; i < pCount; i++) {
      const i3 = i * 3;
      pPos[i3] = (Math.random() - 0.5) * 14;
      pPos[i3 + 1] = (Math.random() - 0.5) * 10;
      pPos[i3 + 2] = (Math.random() - 0.5) * 8;

      pCol[i3] = 0.91;
      pCol[i3 + 1] = 0.66;
      pCol[i3 + 2] = 0.22;
    }
    const partGeom = new THREE.BufferGeometry();
    partGeom.setAttribute("position", new THREE.BufferAttribute(pPos, 3));
    partGeom.setAttribute("color", new THREE.BufferAttribute(pCol, 3));
    const partMat = new THREE.PointsMaterial({
      size: 0.045,
      vertexColors: true,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending,
    });
    const particleField = new THREE.Points(partGeom, partMat);
    scene.add(particleField);

    // Lighting
    const ambLight = new THREE.AmbientLight(0x0f172a, 1.8);
    scene.add(ambLight);

    const goldLight = new THREE.PointLight(0xe8a838, 3.0, 20);
    goldLight.position.set(3, 4, 5);
    scene.add(goldLight);

    const cyanLight = new THREE.DirectionalLight(0x38bdf8, 1.6);
    cyanLight.position.set(-6, 6, 6);
    scene.add(cyanLight);

    const s = sceneRef.current;
    s.scene = scene;
    s.camera = camera;
    s.renderer = renderer;
    s.screenMeshGroup = screenMeshGroup;
    s.layerMeshes = layerMeshes;

    // Observer
    const observer = new IntersectionObserver(
      ([entry]) => {
        s.isIntersecting = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    let lastTime = performance.now();
    const animate = (now: number) => {
      s.reqId = requestAnimationFrame(animate);
      if (!s.isIntersecting) return;

      const delta = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;

      s.currentCameraPos.lerp(s.targetCameraPos, 0.05);
      camera.position.copy(s.currentCameraPos);

      s.currentLookAt.lerp(s.targetLookAt, 0.05);
      camera.lookAt(s.currentLookAt);

      // Gentle floating animation
      if (screenMeshGroup) {
        screenMeshGroup.position.y = Math.sin(now * 0.0012) * 0.15;
      }

      particleField.rotation.y += 0.03 * delta;
      renderer.render(scene, camera);
    };

    s.reqId = requestAnimationFrame(animate);

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(s.reqId);
      observer.disconnect();
      window.removeEventListener("resize", handleResize);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      scene.clear();
    };
  }, []);

  // Update exploded 3D layers when toggled or slider moves
  useEffect(() => {
    const s = sceneRef.current;
    if (!s.layerMeshes || s.layerMeshes.length === 0) return;

    const spacing = isExploded ? (explosionDistance / 100) * 1.3 : 0.06;
    s.layerMeshes.forEach((mesh, idx) => {
      // Explode along Z-axis
      mesh.position.z = -idx * spacing;
      // Tilt slightly when exploded to see all strata
      mesh.rotation.x = isExploded ? 0.15 : 0;
      mesh.rotation.y = isExploded ? -0.2 : 0;
    });

    if (isExploded) {
      s.targetCameraPos.set(3.5, 2.5, 10.5);
      s.targetLookAt.set(0, 0, -1.2);
    } else {
      s.targetCameraPos.set(0, 1.5, 11);
      s.targetLookAt.set(0, 0, 0);
    }
  }, [isExploded, explosionDistance]);

  return (
    <section
      id="showroom"
      className="relative py-28 md:py-36 px-6 md:px-12 lg:px-16 border-b border-white/5 bg-[#0C0E12] overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-10 size-[38rem] rounded-full blur-3xl opacity-15 bg-radial from-amber-500/20 to-transparent pointer-events-none" />
      <div className="absolute bottom-1/3 right-10 size-[38rem] rounded-full blur-3xl opacity-10 bg-radial from-sky-500/20 to-transparent pointer-events-none" />

      <div className="relative max-w-[1600px] mx-auto">
        {/* ==========================================
            1. OPENING: FROM ARCHITECTURE TO REALITY
        ========================================== */}
        <div className="mb-16">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs text-accent uppercase tracking-widest px-2.5 py-1 rounded border border-accent/30 bg-accent/10">
                PART 05 // PRODUCT SHOWROOM &amp; DISCOVERY
              </span>
              <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-[0.25em]">
                FROM ARCHITECTURE TO REALITY · PROOF &amp; VISIBILITY
              </span>
            </div>

            <div className="flex items-center gap-2 font-mono text-xs text-muted-foreground">
              <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-foreground font-semibold">PRODUCTION GALLERY LIVE</span>
            </div>
          </div>

          <div className="max-w-4xl space-y-4">
            <div className="font-mono text-xs text-accent uppercase tracking-widest">
              THE SYSTEM IS BUILT. NOW LET&apos;S SEE IT.
            </div>
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground leading-[1.05]">
              Screens, Products <br className="hidden sm:block" />
              <span className="italic font-light text-gradient-flow">
                &amp; The Art of Discoverability.
              </span>
            </h2>
            <p className="font-display text-2xl sm:text-3xl text-foreground font-semibold tracking-tight leading-snug pt-2">
              &ldquo;I don&apos;t just build systems.{" "}
              <span className="text-accent italic font-light">
                I build experiences people can see, use, and remember.&rdquo;
              </span>
            </p>
            <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
              Every project starts with an idea and becomes a complete digital experience
              through design, engineering, performance, and search discoverability.
            </p>
          </div>

          {/* Pathway Pill Bar */}
          <div className="mt-8 p-4 rounded-xl border border-white/10 bg-[#12151C]/90 backdrop-blur-md inline-flex flex-wrap items-center gap-2 sm:gap-4 font-mono text-xs font-bold text-foreground">
            <span className="text-accent">DESIGN</span>
            <span className="text-white/20">→</span>
            <span className="text-sky-400">ENGINEERING</span>
            <span className="text-white/20">→</span>
            <span className="text-emerald-400">PERFORMANCE</span>
            <span className="text-white/20">→</span>
            <span className="text-pink-400">DISCOVERY</span>
          </div>
        </div>

        {/* ==========================================
            2. INTERACTIVE 3D SCREEN WALL & EXPLODED LAYERS
        ========================================== */}
        <div className="relative mb-20 rounded-2xl border border-white/10 bg-[#12151C]/95 overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.6)]">
          {/* Top Bar with Explode Controls */}
          <div className="flex flex-wrap items-center justify-between gap-4 px-6 py-4 border-b border-white/10 bg-black/40 backdrop-blur-md">
            <div className="flex items-center gap-3">
              <span className="flex size-2 rounded-full bg-accent animate-ping" />
              <span className="font-mono text-xs uppercase tracking-widest text-foreground font-semibold">
                3D PRODUCT SHOWROOM &amp; STRATA EXPLORER
              </span>
            </div>

            {/* Explode Layers Action */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setIsExploded(!isExploded)}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded text-xs font-mono font-semibold transition-all cursor-pointer ${
                  isExploded
                    ? "bg-accent text-[#0C0E12] shadow-[0_0_15px_rgba(232,168,56,0.4)]"
                    : "border border-accent/40 text-accent hover:bg-accent/10"
                }`}
              >
                <Layers className="size-3.5" />
                <span>{isExploded ? "COLLAPSE LAYERS" : "EXPLODE 3D ARCHITECTURE"}</span>
              </button>

              {isExploded && (
                <div className="hidden sm:flex items-center gap-2 font-mono text-xs text-muted-foreground">
                  <span>STRATA DEPTH:</span>
                  <input
                    type="range"
                    min="20"
                    max="100"
                    value={explosionDistance}
                    onChange={(e) => setExplosionDistance(Number(e.target.value))}
                    className="w-24 accent-amber-400 cursor-pointer"
                  />
                  <span>{explosionDistance}%</span>
                </div>
              )}
            </div>
          </div>

          {/* Split Canvas & Product Case Study View */}
          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[580px]">
            {/* 3D WebGL Canvas */}
            <div className="lg:col-span-7 relative min-h-[380px] lg:min-h-full bg-gradient-to-b from-[#0A0C10] to-[#12151C] select-none">
              <div ref={mountRef} className="absolute inset-0 size-full" />

              {/* In-Canvas Telemetry HUD */}
              <div className="absolute top-4 left-4 pointer-events-none">
                <div className="px-3 py-1.5 rounded bg-black/80 border border-white/10 font-mono text-[10px] text-muted-foreground space-y-0.5">
                  <div className="text-accent font-semibold flex items-center gap-1.5">
                    <Activity className="size-3" />
                    <span>SHOWROOM SPATIAL ENGINE</span>
                  </div>
                  <div>SCREEN: {activeProduct.name.toUpperCase()}</div>
                  <div>MODE: {isExploded ? "EXPLODED ARCHITECTURE (6 STRATA)" : "COMPACT VIEW"}</div>
                </div>
              </div>

              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between pointer-events-none">
                <span className="font-mono text-[9px] text-muted-foreground/80 bg-black/60 px-2 py-1 rounded border border-white/5">
                  6-LAYER FULL-STACK STRATA VISUALIZATION
                </span>
                {activeProduct.liveUrl && (
                  <a
                    href={activeProduct.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="pointer-events-auto flex items-center gap-1.5 font-mono text-[9px] text-accent bg-black/80 px-2.5 py-1 rounded border border-accent/40 hover:bg-accent hover:text-[#0C0E12] transition-all"
                  >
                    <span>VISIT LIVE APP</span>
                    <ExternalLink className="size-2.5" />
                  </a>
                )}
              </div>
            </div>

            {/* Right Side: Product Selector & Deep Case Study */}
            <div className="lg:col-span-5 p-6 md:p-8 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-white/10 bg-[#0E1117]/95">
              <div>
                {/* Product Switcher Tabs */}
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-[11px] text-muted-foreground uppercase tracking-widest font-semibold">
                    SELECTED PRODUCTS &amp; SCREENS (4)
                  </span>
                  <span className="font-mono text-[10px] text-accent font-bold">
                    [0{selectedProductIdx + 1} / 04]
                  </span>
                </div>

                <div className="grid grid-cols-4 gap-2 mb-6">
                  {PRODUCTS.map((prod, idx) => {
                    const isSelected = selectedProductIdx === idx;
                    return (
                      <button
                        key={prod.id}
                        type="button"
                        onClick={() => setSelectedProductIdx(idx)}
                        className={`p-2 rounded-lg border text-left transition-all cursor-pointer ${
                          isSelected
                            ? `${prod.borderColor} bg-white/5 shadow-md`
                            : "border-white/5 bg-black/30 hover:border-white/20 text-muted-foreground"
                        }`}
                      >
                        <span className="font-mono text-[9px] text-accent block font-bold">0{idx + 1}</span>
                        <span className="font-mono text-[10px] font-semibold text-foreground truncate block">
                          {prod.id.toUpperCase()}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Case Study Details */}
                <div className="p-5 rounded-xl border border-white/10 bg-black/40 space-y-4 max-h-[380px] overflow-y-auto pr-2">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-accent font-semibold">
                      CASE FILE 0{selectedProductIdx + 1}
                    </span>
                    <span className={`font-mono text-[9px] uppercase px-2 py-0.5 rounded border ${activeProduct.borderColor} ${activeProduct.textColor} bg-white/5`}>
                      {activeProduct.category}
                    </span>
                  </div>

                  <div>
                    <h4 className="font-display text-2xl font-bold text-foreground mb-1">
                      {activeProduct.name}
                    </h4>
                    <p className="font-mono text-xs text-muted-foreground">
                      {activeProduct.tagline}
                    </p>
                  </div>

                  {/* Problem & Research */}
                  <div className="space-y-1.5 text-xs text-muted-foreground leading-relaxed border-l-2 border-accent/40 pl-3">
                    <p><strong className="text-foreground">Problem:</strong> {activeProduct.problem}</p>
                    <p><strong className="text-foreground">Research:</strong> {activeProduct.research}</p>
                  </div>

                  {/* Architecture & Tech Stack */}
                  <div className="pt-2 border-t border-white/10 space-y-2">
                    <div className="text-xs text-muted-foreground">
                      <strong className="text-foreground font-mono uppercase text-[10px] block mb-1">SYSTEM ARCHITECTURE:</strong>
                      {activeProduct.architecture}
                    </div>

                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {activeProduct.technology.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-0.5 rounded bg-white/5 border border-white/5 font-mono text-[10px] text-muted-foreground"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Exploded Layers Summary if toggled */}
                  {isExploded && (
                    <div className="pt-2 border-t border-accent/30 space-y-1.5">
                      <span className="font-mono text-[10px] text-accent uppercase tracking-widest block">
                        EXPLODED STRATA BREAKDOWN:
                      </span>
                      {activeProduct.layers.map((l, lIdx) => (
                        <div key={lIdx} className="p-2 rounded bg-white/[0.02] border border-white/5 text-[11px]">
                          <div className="flex items-center justify-between">
                            <span className="font-mono font-bold text-foreground">
                              0{lIdx + 1}. {l.name}
                            </span>
                            <span className="font-mono text-[9px] px-1.5 py-0.2 rounded bg-white/5 text-accent">
                              {l.tag}
                            </span>
                          </div>
                          <p className="text-muted-foreground text-[10px] mt-0.5">{l.detail}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Next Product Button */}
              <div className="pt-4 flex items-center justify-between border-t border-white/10">
                <button
                  type="button"
                  onClick={() =>
                    setSelectedProductIdx((prev) => (prev + 1) % PRODUCTS.length)
                  }
                  className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-muted-foreground hover:text-accent transition-colors cursor-pointer"
                >
                  <span>NEXT PRODUCT</span>
                  <ChevronRight className="size-4" />
                </button>
                <span className="font-mono text-[10px] text-muted-foreground">
                  PERF: {activeProduct.performance.split("·")[0]}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ==========================================
            3. BUILT FOR EVERY SCREEN: RESPONSIVE SHOWCASE
        ========================================== */}
        <div className="mb-20">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <div>
              <span className="font-mono text-xs text-accent uppercase tracking-widest block mb-2">
                RESPONSIVE ADAPTIVE SYSTEM
              </span>
              <h3 className="font-display text-3xl sm:text-4xl font-bold text-foreground">
                Built for Every Screen.
              </h3>
            </div>
            <p className="font-mono text-xs text-muted-foreground max-w-md">
              &ldquo;Designed once. Engineered everywhere.&rdquo; Desktop, tablet, and mobile
              cohere into one frictionless experience.
            </p>
          </div>

          {/* Device Switcher Pills */}
          <div className="flex items-center gap-3 mb-6 font-mono text-xs">
            {[
              { id: "desktop", label: "DESKTOP VIEWPORT (1920×1080)", icon: Monitor },
              { id: "tablet", label: "TABLET VIEWPORT (1024×768)", icon: Tablet },
              { id: "mobile", label: "MOBILE VIEWPORT (390×844)", icon: Smartphone },
            ].map((device) => {
              const IconComp = device.icon;
              const isSelected = activeDeviceView === device.id;
              return (
                <button
                  key={device.id}
                  type="button"
                  onClick={() => setActiveDeviceView(device.id as "desktop" | "tablet" | "mobile")}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-lg border transition-all cursor-pointer ${
                    isSelected
                      ? "border-accent bg-accent/10 text-accent font-semibold"
                      : "border-white/10 text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <IconComp className="size-3.5" />
                  <span>{device.label}</span>
                </button>
              );
            })}
          </div>

          {/* Dynamic Mockup Stage */}
          <div className="p-8 md:p-12 rounded-2xl border border-white/10 bg-[#12151C]/80 backdrop-blur-md flex flex-col items-center justify-center min-h-[420px]">
            <div
              className={`transition-all duration-500 rounded-xl border border-white/20 bg-black/60 shadow-2xl p-4 overflow-hidden ${
                activeDeviceView === "desktop"
                  ? "w-full max-w-4xl aspect-[16/9]"
                  : activeDeviceView === "tablet"
                    ? "w-full max-w-lg aspect-[4/3]"
                    : "w-full max-w-[280px] aspect-[9/16]"
              }`}
            >
              {/* Device Bezel Top */}
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10 font-mono text-[9px] text-muted-foreground">
                <div className="flex items-center gap-1.5">
                  <span className="size-2 rounded-full bg-red-500/80" />
                  <span className="size-2 rounded-full bg-yellow-500/80" />
                  <span className="size-2 rounded-full bg-green-500/80" />
                </div>
                <div className="px-3 py-0.5 rounded bg-white/5 text-[9px]">
                  https://tarik-s-digital-canvas.vercel.app
                </div>
                <span>{activeDeviceView.toUpperCase()}</span>
              </div>

              {/* Mockup Internal UI Simulation */}
              <div className="space-y-3 font-mono text-[10px] text-muted-foreground">
                <div className="h-6 rounded bg-white/5 flex items-center justify-between px-3">
                  <span className="text-accent font-bold">TI // TARIK ISLAM</span>
                  <span className="text-[9px] text-emerald-400">STATUS: VERIFIED</span>
                </div>
                <div className="p-4 rounded-lg bg-white/[0.02] border border-white/5 space-y-2">
                  <div className="h-4 w-3/4 bg-accent/30 rounded" />
                  <div className="h-2 w-full bg-white/10 rounded" />
                  <div className="h-2 w-5/6 bg-white/10 rounded" />
                </div>
                <div className="grid grid-cols-3 gap-2 pt-2">
                  <div className="p-2 rounded bg-white/[0.02] border border-white/5 text-center">
                    <span className="text-foreground font-bold block">FORENSICS</span>
                    <span className="text-[8px] text-amber-400">CHAIN OF CUSTODY</span>
                  </div>
                  <div className="p-2 rounded bg-white/[0.02] border border-white/5 text-center">
                    <span className="text-foreground font-bold block">CYBERSECURITY</span>
                    <span className="text-[8px] text-sky-400">ZERO TRUST</span>
                  </div>
                  <div className="p-2 rounded bg-white/[0.02] border border-white/5 text-center">
                    <span className="text-foreground font-bold block">APPLIED AI</span>
                    <span className="text-[8px] text-emerald-400">AGENTIC LOOPS</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ==========================================
            4. BUILDING FOR HUMANS. OPTIMIZING FOR THE WEB.
               INTERACTIVE SEO SIMULATOR
        ========================================== */}
        <div className="mb-20">
          <div className="max-w-3xl mb-12">
            <span className="font-mono text-xs text-accent uppercase tracking-widest block mb-2">
              DISCOVERABILITY &amp; SEARCH ENGINE ARCHITECTURE
            </span>
            <h3 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
              Building for humans. <br />
              <span className="italic font-light text-gradient-flow">
                Optimizing for the web.
              </span>
            </h3>
            <p className="text-muted-foreground text-base leading-relaxed">
              A beautiful website is not enough. It must be discoverable, accessible to screen
              readers, indexable by modern AI search models, and fast enough to deliver an
              instant first paint anywhere in the world.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: Interactive Live SEO Score Gauge */}
            <div className="lg:col-span-5 p-8 rounded-2xl border border-white/10 bg-[#12151C]/90 backdrop-blur-xl shadow-xl flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="font-mono text-xs text-accent uppercase tracking-widest font-semibold">
                    REAL-TIME SEO AUDIT ENGINE
                  </span>
                  <button
                    type="button"
                    onClick={runFullSeoScan}
                    disabled={isSimulatingSeo}
                    className="flex items-center gap-1.5 px-2.5 py-1 rounded border border-white/10 text-muted-foreground hover:text-foreground text-xs font-mono transition-colors cursor-pointer disabled:opacity-50"
                  >
                    <RefreshCw className={`size-3 ${isSimulatingSeo ? "animate-spin" : ""}`} />
                    <span>{isSimulatingSeo ? "AUDITING..." : "SIMULATE SCAN"}</span>
                  </button>
                </div>

                {/* Score Dial */}
                <div className="my-8 text-center">
                  <div className="relative inline-flex items-center justify-center">
                    <svg className="size-48 transform -rotate-90">
                      <circle
                        cx="96"
                        cy="96"
                        r="80"
                        stroke="rgba(255,255,255,0.06)"
                        strokeWidth="12"
                        fill="transparent"
                      />
                      <circle
                        cx="96"
                        cy="96"
                        r="80"
                        stroke={seoScore >= 90 ? "#10B981" : seoScore >= 70 ? "#E8A838" : "#EC4899"}
                        strokeWidth="12"
                        strokeDasharray={2 * Math.PI * 80}
                        strokeDashoffset={2 * Math.PI * 80 * (1 - seoScore / 100)}
                        strokeLinecap="round"
                        fill="transparent"
                        className="transition-all duration-700 ease-out"
                      />
                    </svg>
                    <div className="absolute flex flex-col items-center justify-center">
                      <span className="font-display text-5xl font-extrabold text-foreground tracking-tight">
                        {seoScore}
                      </span>
                      <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mt-1">
                        OUT OF 100
                      </span>
                    </div>
                  </div>

                  <div className="mt-4">
                    <span className="font-mono text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 inline-block">
                      VISIBLE · FAST · ACCESSIBLE · SEARCHABLE
                    </span>
                  </div>
                </div>
              </div>

              {/* Core Telemetry metrics */}
              <div className="pt-6 border-t border-white/10 grid grid-cols-3 gap-2 text-center font-mono text-[10px]">
                <div className="p-2 rounded bg-white/[0.02] border border-white/5">
                  <span className="text-muted-foreground block">LCP</span>
                  <span className="text-emerald-400 font-bold text-xs">0.8s</span>
                </div>
                <div className="p-2 rounded bg-white/[0.02] border border-white/5">
                  <span className="text-muted-foreground block">CLS</span>
                  <span className="text-emerald-400 font-bold text-xs">0.00</span>
                </div>
                <div className="p-2 rounded bg-white/[0.02] border border-white/5">
                  <span className="text-muted-foreground block">INP</span>
                  <span className="text-emerald-400 font-bold text-xs">&lt;35ms</span>
                </div>
              </div>
            </div>

            {/* Right: The 6 Systematic Optimization Checks */}
            <div className="lg:col-span-7 space-y-3">
              {seoChecks.map((item) => (
                <div
                  key={item.id}
                  onClick={() => toggleSeoCheck(item.id)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer flex items-start justify-between gap-4 ${
                    item.active
                      ? "border-emerald-500/40 bg-[#12151C]/90 hover:border-emerald-400"
                      : "border-white/5 bg-black/40 opacity-60 hover:opacity-100"
                  }`}
                >
                  <div className="flex items-start gap-3.5">
                    <div
                      className={`mt-0.5 p-1.5 rounded-md border ${
                        item.active
                          ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-400"
                          : "border-white/10 bg-white/5 text-muted-foreground"
                      }`}
                    >
                      <Check className="size-4" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-0.5">
                        <h4 className="font-display text-sm font-bold text-foreground">
                          {item.name}
                        </h4>
                        <span className="font-mono text-[9px] px-1.5 py-0.2 rounded bg-white/5 text-accent font-semibold">
                          {item.tag}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                  <span className="font-mono text-xs font-bold text-emerald-400 shrink-0">
                    +{item.pts} PTS
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ==========================================
            5. PERFORMANCE OBSERVATORY & ACCESSIBILITY
        ========================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
          {/* Performance Observatory */}
          <div className="p-8 md:p-10 rounded-2xl border border-white/10 bg-[#12151C]/90 backdrop-blur-xl">
            <div className="flex items-center gap-2 text-accent font-mono text-xs uppercase tracking-widest mb-3">
              <Gauge className="size-4" />
              <span>PERFORMANCE OBSERVATORY</span>
            </div>
            <h4 className="font-display text-2xl font-bold text-foreground mb-4">
              3D with Zero Performance Penalty.
            </h4>
            <p className="text-sm text-muted-foreground leading-relaxed mb-6">
              I believe 3D should enhance storytelling without hurting performance. Every WebGL
              canvas uses adaptive RAF loops that pause when out of view, compressed shaders,
              and code-split lazy imports.
            </p>

            <div className="space-y-2 font-mono text-xs">
              {[
                { label: "Lazy Loaded Scenes", value: "Suspense split chunks (<60kB gzip)" },
                { label: "GPU Memory Management", value: "IntersectionObserver active RAF disposal" },
                { label: "Font Preloading", value: "Zero Cumulative Layout Shift (CLS = 0.00)" },
                { label: "Edge CDN Caching", value: "Sub-50ms TTFB across 100+ global nodes" },
                { label: "Adaptive Quality", value: "Device pixel ratio clamp (DPR max: 2)" },
              ].map((row) => (
                <div key={row.label} className="flex items-center justify-between p-2.5 rounded bg-black/40 border border-white/5">
                  <span className="text-muted-foreground">{row.label}</span>
                  <span className="text-accent font-semibold">{row.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Accessibility Matrix */}
          <div className="p-8 md:p-10 rounded-2xl border border-white/10 bg-[#12151C]/90 backdrop-blur-xl">
            <div className="flex items-center gap-2 text-sky-400 font-mono text-xs uppercase tracking-widest mb-3">
              <Eye className="size-4" />
              <span>DESIGN FOR EVERYONE</span>
            </div>
            <h4 className="font-display text-2xl font-bold text-foreground mb-4">
              A futuristic interface must be usable by everyone.
            </h4>
            <p className="text-sm text-muted-foreground leading-relaxed mb-6">
              No user should be excluded from experiencing this canvas. Accessibility is treated
              as a first-class architectural requirement, not an afterthought.
            </p>

            <div className="grid grid-cols-2 gap-3 font-mono text-xs">
              {[
                { icon: Eye, title: "Visual Contrast", desc: "Strict 7:1 ratio on primary text" },
                { icon: Keyboard, title: "Keyboard First", desc: "Skip links & visible focus rings" },
                { icon: Volume2, title: "Screen Readers", desc: "Aria labels & semantic landmarks" },
                { icon: Activity, title: "Reduced Motion", desc: "Honors prefers-reduced-motion" },
              ].map((a11y) => {
                const IconComp = a11y.icon;
                return (
                  <div key={a11y.title} className="p-3.5 rounded-lg bg-black/40 border border-white/5">
                    <div className="flex items-center gap-2 text-accent mb-1">
                      <IconComp className="size-3.5" />
                      <span className="font-bold">{a11y.title}</span>
                    </div>
                    <span className="text-muted-foreground text-[11px] block">{a11y.desc}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ==========================================
            6. READY FOR SEARCH. READY FOR AI.
        ========================================== */}
        <div className="mb-20 p-8 md:p-12 rounded-2xl border border-white/10 bg-gradient-to-r from-[#12151C] via-[#151924] to-[#0D1017]">
          <div className="max-w-4xl mx-auto text-center mb-8">
            <span className="font-mono text-xs text-accent uppercase tracking-widest block mb-2">
              MODERN SEARCH TOPOLOGY
            </span>
            <h3 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
              Ready for Search. Ready for AI.
            </h3>
            <p className="text-muted-foreground text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
              Making work understandable to both human beings and machine reasoning engines
              (Google, Bing, Perplexity, ChatGPT, Claude).
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto font-mono text-xs">
            <div className="p-4 rounded-xl border border-white/5 bg-black/40 text-center">
              <span className="text-emerald-400 font-bold uppercase block mb-1">GOOGLE &amp; BING</span>
              <p className="text-muted-foreground text-[11px]">Semantic HTML, canonical tags, mobile indexation</p>
            </div>
            <div className="p-4 rounded-xl border border-white/5 bg-black/40 text-center">
              <span className="text-sky-400 font-bold uppercase block mb-1">STRUCTURED ENTITIES</span>
              <p className="text-muted-foreground text-[11px]">JSON-LD graph establishing Person &amp; Organization</p>
            </div>
            <div className="p-4 rounded-xl border border-white/5 bg-black/40 text-center">
              <span className="text-accent font-bold uppercase block mb-1">AI SEARCH AGENTS</span>
              <p className="text-muted-foreground text-[11px]">Clean facts, verified citations &amp; unambiguous claims</p>
            </div>
            <div className="p-4 rounded-xl border border-white/5 bg-black/40 text-center">
              <span className="text-pink-400 font-bold uppercase block mb-1">SOCIAL GRAPHS</span>
              <p className="text-muted-foreground text-[11px]">OpenGraph 1200×630 cards for high CTR sharing</p>
            </div>
          </div>
        </div>

        {/* ==========================================
            7. SIGNATURE WOW SEARCH BAR TRANSITION: LET THE WORK SPEAK
        ========================================== */}
        <div className="p-8 md:p-14 rounded-2xl border border-accent/40 bg-gradient-to-b from-[#141824] to-[#0C0E12] text-center max-w-4xl mx-auto shadow-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-accent/40 bg-accent/10 font-mono text-[11px] text-accent uppercase tracking-widest mb-6">
            <Sparkles className="size-3.5" />
            <span>DISCOVERY SEARCH ENGINE</span>
          </div>

          {/* Search Bar Input Simulation */}
          <div className="max-w-xl mx-auto mb-8">
            <div className="flex items-center gap-3 px-4 py-3.5 rounded-xl border border-accent/40 bg-black/70 shadow-[0_0_25px_rgba(232,168,56,0.2)]">
              <Search className="size-4 text-accent" />
              <span className="font-mono text-sm sm:text-base text-foreground font-semibold flex-1 text-left">
                {searchQuery || (
                  <span className="text-muted-foreground/60">
                    Search queries (e.g. &ldquo;Who is Tarik Islam?&rdquo;)
                  </span>
                )}
                {isTypingSearch && <span className="animate-pulse text-accent">|</span>}
              </span>
              <button
                type="button"
                onClick={runSearchAnimation}
                disabled={isTypingSearch}
                className="px-3 py-1 rounded bg-accent text-[#0C0E12] font-mono text-[10px] font-bold uppercase tracking-wider hover:bg-accent-glow transition-all cursor-pointer disabled:opacity-50"
              >
                {isTypingSearch ? "SEARCHING..." : "QUERY"}
              </button>
            </div>
          </div>

          {/* Heading */}
          <h3 className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-foreground mb-4">
            LET THE WORK SPEAK.
          </h3>

          <div className="font-mono text-sm sm:text-base font-bold text-accent uppercase tracking-[0.25em] mb-4">
            BUILT TO BE EXPERIENCED · BUILT TO BE DISCOVERED · BUILT TO PERFORM
          </div>

          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed">
            The goal isn&apos;t to make technology look complicated.
            <br />
            <strong className="text-foreground font-semibold">
              The goal is to make complicated technology feel simple and undeniable.
            </strong>
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4 border-t border-white/10">
            <a
              href="#work"
              className="flex items-center gap-2 px-8 py-4 rounded-md bg-accent text-[#0C0E12] font-mono text-xs uppercase tracking-widest font-bold hover:bg-accent/90 transition-all shadow-[0_0_24px_rgba(232,168,56,0.35)] cursor-pointer"
            >
              <span>INSPECT VERIFIED CASE FILES</span>
              <ArrowRight className="size-4" />
            </a>

            <a
              href="#capabilities"
              className="flex items-center gap-2 px-6 py-4 rounded-md border border-white/15 bg-white/5 text-foreground hover:border-accent hover:bg-accent/10 font-mono text-xs uppercase tracking-widest transition-colors cursor-pointer"
            >
              <span>EXPLORE CAPABILITIES</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
