import { useEffect, useRef, useState, useCallback } from "react";
import * as THREE from "three";
import {
  Zap,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ArrowUpRight,
  Cpu,
  Shield,
  Sparkles,
  Layers,
  Activity,
  Compass,
  Flame,
  Terminal,
  Play,
  Pause,
  Wrench,
  Search,
  FlaskConical,
  TrendingUp,
  Boxes,
} from "lucide-react";
import { WHATSAPP_URL } from "@/lib/contact-links";

// --- Data Constants ---
const JOURNEY_STEPS = [
  {
    phase: "LEARN",
    subtitle: "Acquire & Ingest",
    description: "Dig into the first principles. Read specifications, RFCs, source code, and whitepapers. Never assume when you can investigate.",
    telemetry: "Ingestion: 100% · Cognitive Buffer: Active",
    color: "#38BDF8",
  },
  {
    phase: "BUILD",
    subtitle: "Prototype & Manifest",
    description: "Turn abstract models into concrete, working software. Move from napkin architecture to deterministic execution.",
    telemetry: "Compilation: Clean · Artifacts Shipped",
    color: "#E8A838",
  },
  {
    phase: "TEST",
    subtitle: "Stress & Break",
    description: "Subject systems to edge conditions, fuzzing, adversarial inputs, and unexpected telemetry. Find where assumptions collapse.",
    telemetry: "Fuzz Cycles: 10,000+ · Edge Coverage: 98.4%",
    color: "#F43F5E",
  },
  {
    phase: "FAIL",
    subtitle: "Capture Anomaly",
    description: "Not every experiment survives. A failure is not a setback — it is raw, unfiltered diagnostic data revealing systemic truth.",
    telemetry: "Telemetry State: Anomaly Logged · Zero Panic",
    color: "#FB923C",
  },
  {
    phase: "UNDERSTAND",
    subtitle: "Autopsy & Root Cause",
    description: "Perform forensic root-cause analysis. Why did the memory spike? Why did the vector drift? Demystify every failure.",
    telemetry: "Trace Depth: L7 Down to Metal · RCA Documented",
    color: "#A855F7",
  },
  {
    phase: "IMPROVE",
    subtitle: "Harden & Elevate",
    description: "Reinforce the architecture. Apply zero-trust defenses, optimize latency, eliminate regressions, and prepare the next cycle.",
    telemetry: "Resilience: +45% · Delta Recorded",
    color: "#10B981",
  },
];

const WHAT_I_DO_PILLARS = [
  {
    title: "BUILD",
    badge: "01 / PRODUCT",
    quote: "I turn ideas into functional digital products and experiences.",
    details: "Translating ambiguous problems into production-grade systems with clean architectural boundaries, intuitive interfaces, and rock-solid reliability.",
    icon: Wrench,
    accent: "text-amber-400",
    border: "group-hover:border-amber-500/40",
    bg: "from-amber-500/10 via-transparent to-transparent",
    deliverables: ["Full-Stack Web Platforms", "Autonomous AI Agents", "Micro-SaaS Architectures"],
  },
  {
    title: "EXPLORE",
    badge: "02 / HORIZON",
    quote: "I investigate technologies, systems and emerging possibilities.",
    details: "Peeling back the layers of novel AI models, bleeding-edge protocols, zero-knowledge proofs, and spatial computing to see what is genuinely viable.",
    icon: Compass,
    accent: "text-sky-400",
    border: "group-hover:border-sky-500/40",
    bg: "from-sky-500/10 via-transparent to-transparent",
    deliverables: ["Emerging LLM Paradigms", "Zero-Trust Infrastructures", "Hardware-Software Interfaces"],
  },
  {
    title: "SOLVE",
    badge: "03 / SYSTEM",
    quote: "I break complicated problems into systems that can actually be understood and built.",
    details: "Refactoring chaos into modular clarity. Decoupling monolithic confusion into deterministic pipelines, structured schemas, and audit-ready workflows.",
    icon: Cpu,
    accent: "text-emerald-400",
    border: "group-hover:border-emerald-500/40",
    bg: "from-emerald-500/10 via-transparent to-transparent",
    deliverables: ["Complex Data Pipelines", "Threat Elimination Systems", "Multi-Agent Coordination"],
  },
  {
    title: "EXPERIMENT",
    badge: "04 / LAB",
    quote: "I prototype ideas before deciding what they can become.",
    details: "Rapid iteration through functional MVPs. Testing hypothesis in real runtime environments before committing organizational or computational capital.",
    icon: FlaskConical,
    accent: "text-purple-400",
    border: "group-hover:border-purple-500/40",
    bg: "from-purple-500/10 via-transparent to-transparent",
    deliverables: ["Proof of Concept Engines", "Heuristic Stress Tests", "Benchmarked AI Workflows"],
  },
  {
    title: "EVOLVE",
    badge: "05 / GROWTH",
    quote: "I keep improving the system, the product and myself.",
    details: "Continuous compounding. No system is ever finished. Daily code commits, rigorous post-mortems, and an unending hunger for mastery.",
    icon: TrendingUp,
    accent: "text-pink-400",
    border: "group-hover:border-pink-500/40",
    bg: "from-pink-500/10 via-transparent to-transparent",
    deliverables: ["Algorithmic Optimization", "Zero-Debt Refactoring", "Continuous Knowledge Ingestion"],
  },
];

const FAILURE_DATA_LOGS = [
  {
    id: "ANOMALY-409",
    anomaly: "State Desync in Distributed Edge Cache",
    breakdown: "Optimistic concurrency collision under 2,400 rps burst.",
    dataExtracted: "Edge memory regions lack monotonic vector clocks.",
    hardenedOutcome: "Implemented deterministic CRDT state synchronization & signed mutation logs.",
    gain: "Zero collision rate · 99.999% consistency",
    status: "RESOLVED & HARDENED",
  },
  {
    id: "ANOMALY-503",
    anomaly: "High-Frequency WebGL RAF Memory Leak",
    breakdown: "Geometry buffers reallocated inside render loop during viewport resize.",
    dataExtracted: "Garbage collection stalls cause 42ms frame drops on low-tier mobile GPUs.",
    hardenedOutcome: "Constructed pre-allocated static typed array pools with automatic context disposal.",
    gain: "Locked 60 FPS · 0MB memory drift",
    status: "RESOLVED & HARDENED",
  },
  {
    id: "ANOMALY-301",
    anomaly: "Vector Drift in Unstructured RAG Pipeline",
    breakdown: "Semantic search returned false confidence on ambiguous forensic documents.",
    dataExtracted: "Cosine similarity alone fails on technical legal terms with identical embeddings.",
    hardenedOutcome: "Engineered dual-pass hybrid search (BM25 sparse + dense cross-encoder reranker).",
    gain: "100% precision · 0 hallucinated citations",
    status: "RESOLVED & HARDENED",
  },
  {
    id: "ANOMALY-204",
    anomaly: "Race Condition on Biometric Evidence Ingestion",
    breakdown: "Concurrent uploads caused partial byte lock before SHA-256 calculation.",
    dataExtracted: "File streams require atomic file descriptor isolation before hashing.",
    hardenedOutcome: "Engineered cryptographic pipe queue verifying dual SHA-256/SHA-512 before commit.",
    gain: "Court-admissible integrity guaranteed",
    status: "RESOLVED & HARDENED",
  },
];

const OS_ROUTINES = [
  {
    command: "RESEARCH()",
    title: "Understand the problem.",
    log: "tarik.os.research: Deep domain decomposition. Mapping threat vectors, edge bounds, user constraints, and existing prior art.",
    metric: "Insight Depth: Maximal",
  },
  {
    command: "BUILD()",
    title: "Turn the idea into reality.",
    log: "tarik.os.build: Scaffold architecture. Implement zero-trust boundaries, schema validation, and responsive interactive surfaces.",
    metric: "Latency: Sub-millisecond",
  },
  {
    command: "TEST()",
    title: "Find what breaks.",
    log: "tarik.os.test: Execute fuzzing matrix. Inject adversarial payloads, simulate dropped connections, and profile GPU bottlenecks.",
    metric: "Stress Load: 10x Nominal",
  },
  {
    command: "LEARN()",
    title: "Understand why.",
    log: "tarik.os.learn: Root-cause extraction. Dissect logs, stack traces, and runtime metrics to understand exact physical & logical failure modes.",
    metric: "Diagnostic Signal: Clean",
  },
  {
    command: "IMPROVE()",
    title: "Make the next version better.",
    log: "tarik.os.improve: Refactor codebase. Remove friction points, harden security policies, and benchmark performance gains.",
    metric: "Quality Delta: +32%",
  },
  {
    command: "REPEAT()",
    title: "Execute the endless loop.",
    log: "tarik.os.repeat: Advance sequence pointer. The loop never stops. New problems, new systems, continuous compounding.",
    metric: "Infinite Runtime",
  },
];

const EVOLUTION_VECTORS = [
  {
    domain: "Artificial Intelligence",
    from: "Static rule heuristics",
    to: "Autonomous multi-agent reasoners & RAG synthesis",
    status: "ACCELERATING",
  },
  {
    domain: "Cybersecurity & Defenses",
    from: "Perimeter firewalls & reactive patches",
    to: "Zero-trust verification & deterministic hardware attestation",
    status: "CRITICAL",
  },
  {
    domain: "Software Architecture",
    from: "Monolithic bloated stacks",
    to: "Edge-native, type-safe, sub-millisecond micro-engines",
    status: "COMPOUNDING",
  },
  {
    domain: "Creation & Tooling",
    from: "Manual repetitive coding",
    to: "Architect-level systems engineering & high-leverage workflows",
    status: "PARADIGM SHIFT",
  },
];

export function ExecutionEngine() {
  // State for Journey loop
  const [activeJourneyStep, setActiveJourneyStep] = useState(0);
  const [isJourneyPlaying, setIsJourneyPlaying] = useState(true);

  // State for Failure Data
  const [activeFailureLog, setActiveFailureLog] = useState(0);

  // State for OS Terminal
  const [activeOsIndex, setActiveOsIndex] = useState(0);
  const [osRunning, setOsRunning] = useState(false);
  const [osConsoleLogs, setOsConsoleLogs] = useState<string[]>([
    "tarik.os: Kernel initialized v6.2.0-prod",
    "tarik.os: Ready for execution commands.",
  ]);

  // State for Curiosity Cycles
  const [curiosityCycles, setCuriosityCycles] = useState(14820);
  const [uptimeSeconds, setUptimeSeconds] = useState(0);

  // 3D Three.js Ref
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [reactorSpeedMode, setReactorSpeedMode] = useState<"NOMINAL" | "ACCELERATED" | "DIAGNOSTIC">("NOMINAL");

  // Auto-play Journey loop
  useEffect(() => {
    if (!isJourneyPlaying) return;
    const interval = setInterval(() => {
      setActiveJourneyStep((prev) => (prev + 1) % JOURNEY_STEPS.length);
    }, 3800);
    return () => clearInterval(interval);
  }, [isJourneyPlaying]);

  // Curiosity Uptime Counter
  useEffect(() => {
    const timer = setInterval(() => {
      setUptimeSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Run OS Cycle
  const triggerOsRoutine = useCallback((index: number) => {
    setActiveOsIndex(index);
    setOsRunning(true);
    const routine = OS_ROUTINES[index];
    setOsConsoleLogs((prev) => [
      ...prev.slice(-6),
      `> EXECUTE: ${routine.command}`,
      routine.log,
      `✓ COMPLETE: ${routine.metric}`,
    ]);
    setTimeout(() => {
      setOsRunning(false);
    }, 600);
  }, []);

  // Three.js Execution Turbine Reactor Setup
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);
    camera.position.set(0, 0, 8.5);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

    const resize = () => {
      if (!container) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    resize();
    window.addEventListener("resize", resize);

    // Geometry: Central Reactor Core
    const coreGroup = new THREE.Group();
    scene.add(coreGroup);

    // 1. Central Octahedron Core Crystal
    const coreGeo = new THREE.OctahedronGeometry(1.2, 0);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0xe8a838,
      wireframe: true,
      roughness: 0.2,
      metalness: 0.8,
      emissive: 0x926514,
      emissiveIntensity: 0.8,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    coreGroup.add(coreMesh);

    // 2. Inner Solid Glow Sphere
    const innerGeo = new THREE.IcosahedronGeometry(0.7, 2);
    const innerMat = new THREE.MeshStandardMaterial({
      color: 0xfff0b3,
      emissive: 0xe8a838,
      emissiveIntensity: 0.6,
      roughness: 0.5,
      metalness: 0.1,
    });
    const innerMesh = new THREE.Mesh(innerGeo, innerMat);
    coreGroup.add(innerMesh);

    // 3. Concentric Gyroscopic Rings
    const ringGeo1 = new THREE.TorusGeometry(2.0, 0.025, 16, 100);
    const ringMat1 = new THREE.MeshBasicMaterial({ color: 0x38bdf8, wireframe: true, opacity: 0.6, transparent: true });
    const ring1 = new THREE.Mesh(ringGeo1, ringMat1);
    coreGroup.add(ring1);

    const ringGeo2 = new THREE.TorusGeometry(2.6, 0.02, 16, 100);
    const ringMat2 = new THREE.MeshBasicMaterial({ color: 0xe8a838, wireframe: true, opacity: 0.5, transparent: true });
    const ring2 = new THREE.Mesh(ringGeo2, ringMat2);
    ring2.rotation.x = Math.PI / 3;
    coreGroup.add(ring2);

    const ringGeo3 = new THREE.TorusGeometry(3.2, 0.015, 16, 100);
    const ringMat3 = new THREE.MeshBasicMaterial({ color: 0x10b981, wireframe: true, opacity: 0.4, transparent: true });
    const ring3 = new THREE.Mesh(ringGeo3, ringMat3);
    ring3.rotation.y = Math.PI / 4;
    coreGroup.add(ring3);

    // 4. Orbital Particles (Failure-to-Data Ingestion)
    const particleCount = 120;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const colorPalette = [
      new THREE.Color(0xe8a838), // Gold
      new THREE.Color(0x38bdf8), // Sky
      new THREE.Color(0x10b981), // Emerald
      new THREE.Color(0xf43f5e), // Rose (Failure)
      new THREE.Color(0xa855f7), // Purple
    ];

    for (let i = 0; i < particleCount; i++) {
      const radius = 2.0 + Math.random() * 2.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);

      const chosenColor = colorPalette[Math.floor(Math.random() * colorPalette.length)];
      colors[i * 3] = chosenColor.r;
      colors[i * 3 + 1] = chosenColor.g;
      colors[i * 3 + 2] = chosenColor.b;
    }

    particleGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    particleGeo.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.08,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
    });
    const particleCloud = new THREE.Points(particleGeo, particleMat);
    coreGroup.add(particleCloud);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0xe8a838, 3, 20);
    pointLight1.position.set(4, 4, 6);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x38bdf8, 2, 20);
    pointLight2.position.set(-4, -4, 4);
    scene.add(pointLight2);

    // Interactive Drag
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;

    const onPointerDown = (e: PointerEvent) => {
      isDragging = true;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };
    const onPointerMove = (e: PointerEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - prevMouseX;
      const deltaY = e.clientY - prevMouseY;
      coreGroup.rotation.y += deltaX * 0.008;
      coreGroup.rotation.x += deltaY * 0.008;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };
    const onPointerUp = () => {
      isDragging = false;
    };

    canvas.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);

    // Animation Loop with IntersectionObserver
    let animationFrameId: number;
    let isVisible = true;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible = entry.isIntersecting;
        });
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      if (!isVisible) return;

      const elapsed = clock.getElapsedTime();
      let speedMultiplier = 1.0;
      if (reactorSpeedMode === "ACCELERATED") speedMultiplier = 3.0;
      if (reactorSpeedMode === "DIAGNOSTIC") speedMultiplier = 0.4;

      if (!isDragging) {
        coreGroup.rotation.y += 0.006 * speedMultiplier;
        coreGroup.rotation.x += 0.003 * speedMultiplier;
      }

      ring1.rotation.x += 0.012 * speedMultiplier;
      ring1.rotation.y += 0.008 * speedMultiplier;
      ring2.rotation.y += 0.01 * speedMultiplier;
      ring2.rotation.z += 0.007 * speedMultiplier;
      ring3.rotation.z += 0.008 * speedMultiplier;
      ring3.rotation.x += 0.005 * speedMultiplier;

      // Pulse Core
      const pulse = Math.sin(elapsed * 2.5 * speedMultiplier) * 0.15 + 1.0;
      coreMesh.scale.set(pulse, pulse, pulse);

      // Rotate Particles
      particleCloud.rotation.y -= 0.004 * speedMultiplier;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      observer.disconnect();
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      renderer.dispose();
      coreGeo.dispose();
      coreMat.dispose();
      innerGeo.dispose();
      innerMat.dispose();
      ringGeo1.dispose();
      ringMat1.dispose();
      ringGeo2.dispose();
      ringMat2.dispose();
      ringGeo3.dispose();
      ringMat3.dispose();
      particleGeo.dispose();
      particleMat.dispose();
    };
  }, [reactorSpeedMode]);

  return (
    <section
      id="execution"
      aria-label="Part 6: Execution & Operating System"
      className="relative w-full py-28 md:py-36 px-6 md:px-12 lg:px-16 border-b border-white/5 bg-[#0C0E12] overflow-hidden select-none"
    >
      {/* Ambient background glows */}
      <div className="absolute top-0 right-1/4 size-[44rem] rounded-full blur-3xl opacity-15 bg-radial from-amber-500/20 via-amber-500/5 to-transparent pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/6 size-[40rem] rounded-full blur-3xl opacity-10 bg-radial from-sky-500/20 via-sky-500/5 to-transparent pointer-events-none" />
      <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />

      <div className="relative max-w-[1600px] mx-auto z-10 space-y-24">
        {/* ============================================================ */}
        {/* 1. HEADER / OPENING: EXECUTION                               */}
        {/* ============================================================ */}
        <div>
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs font-bold uppercase tracking-[0.25em] text-accent">06 /</span>
              <span className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">
                EXECUTION & OPERATING SYSTEM
              </span>
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/[0.02] font-mono text-[10px] text-muted-foreground">
              <span className="size-1.5 rounded-full bg-accent animate-pulse" />
              <span>THE DIFFERENCE IS BUILDING</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
            <div className="lg:col-span-8 space-y-4">
              <h2 className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-extrabold tracking-tight text-foreground leading-[1.02]">
                Ideas are easy. <br />
                <span className="italic font-light text-gradient-flow">Execution is the difference.</span>
              </h2>
              <p className="font-sans text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-3xl font-normal leading-relaxed pt-2">
                Everything I've learned, researched and experimented with eventually comes down to one thing:{" "}
                <strong className="text-accent font-semibold underline underline-offset-8 decoration-accent/40">
                  building.
                </strong>
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col gap-3 font-mono text-xs">
              <div className="p-4 rounded-xl border border-white/10 bg-[#14161C]/80 backdrop-blur-md">
                <div className="text-muted-foreground text-[10px] uppercase tracking-wider mb-1">EXECUTION LATENCY</div>
                <div className="text-xl font-bold text-accent font-display">T-0 DETERMINISTIC</div>
                <div className="text-[11px] text-muted-foreground mt-1">From napkin hypothesis to shipped production software</div>
              </div>
              <div className="p-4 rounded-xl border border-white/10 bg-[#14161C]/80 backdrop-blur-md">
                <div className="text-muted-foreground text-[10px] uppercase tracking-wider mb-1">CORE MANDATE</div>
                <div className="text-base font-bold text-emerald-400 font-mono">BUILD · LEARN · EVOLVE</div>
              </div>
            </div>
          </div>
        </div>

        {/* ============================================================ */}
        {/* 2. 3D INTERACTIVE EXECUTION TURBINE / HEX REACTOR            */}
        {/* ============================================================ */}
        <div className="rounded-2xl border border-white/10 bg-gradient-to-b from-[#14161C] to-[#0E1015] p-6 md:p-8 backdrop-blur-2xl shadow-2xl relative overflow-hidden">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-5 mb-6">
            <div>
              <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-accent mb-1">
                <Cpu className="size-3.5" />
                <span>SPATIAL EXECUTION ENGINE · WEBGL REACTOR</span>
              </div>
              <h3 className="font-display font-bold text-xl md:text-2xl text-foreground">
                The Continuous Execution Turbine
              </h3>
            </div>

            {/* Reactor Mode Buttons */}
            <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-wider bg-white/[0.03] border border-white/10 p-1.5 rounded-lg">
              <span className="text-muted-foreground px-2 hidden sm:inline">STATE:</span>
              {(["NOMINAL", "ACCELERATED", "DIAGNOSTIC"] as const).map((mode) => (
                <button
                  key={mode}
                  type="button"
                  onClick={() => setReactorSpeedMode(mode)}
                  className={`px-3 py-1 rounded transition-all cursor-pointer font-bold ${
                    reactorSpeedMode === mode
                      ? "bg-accent text-[#0C0E12] shadow-[0_0_12px_rgba(232,168,56,0.35)]"
                      : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                  }`}
                >
                  {mode}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* 3D Canvas Box */}
            <div
              ref={containerRef}
              className="lg:col-span-7 relative w-full aspect-square md:aspect-[16/10] max-h-[480px] rounded-xl bg-black/60 border border-white/10 flex items-center justify-center overflow-hidden group cursor-grab active:cursor-grabbing"
            >
              <canvas ref={canvasRef} className="w-full h-full" />
              
              {/* Overlay HUD Telemetry */}
              <div className="absolute top-3 left-3 z-10 px-2.5 py-1 rounded bg-[#0C0E12]/80 border border-white/10 font-mono text-[9px] text-accent backdrop-blur-md flex items-center gap-1.5">
                <span className="size-1.5 rounded-full bg-accent animate-ping" />
                <span>REACTOR CORE ACTIVE · 60 FPS</span>
              </div>

              <div className="absolute bottom-3 left-3 z-10 px-3 py-1.5 rounded bg-[#0C0E12]/80 border border-white/10 font-mono text-[9px] text-muted-foreground backdrop-blur-md">
                <span>DRAG TO ROTATE 360° · REAL-TIME SPATIAL MESH</span>
              </div>

              <div className="absolute top-3 right-3 z-10 px-2.5 py-1 rounded bg-[#0C0E12]/80 border border-white/10 font-mono text-[9px] text-emerald-400 backdrop-blur-md">
                INPUT: IDEAS → OUTPUT: CODE
              </div>
            </div>

            {/* Turbine Description & Living Axiom */}
            <div className="lg:col-span-5 space-y-5">
              <div className="p-5 rounded-xl border border-white/10 bg-white/[0.02]">
                <div className="text-xs font-mono text-accent uppercase tracking-wider mb-2 flex items-center gap-2">
                  <Flame className="size-3.5" />
                  <span>ENERGY CONVERSION LAW</span>
                </div>
                <p className="font-sans text-sm md:text-base text-foreground/90 leading-relaxed">
                  An idea carries zero mass until converted into working code. The Execution Turbine consumes uncertainty, tests assumptions against bare metal, and discharges resilient products.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 font-mono text-xs">
                <div className="p-3.5 rounded-xl border border-white/10 bg-white/[0.02]">
                  <div className="text-[9px] text-muted-foreground uppercase">Core Crystal</div>
                  <div className="text-sm font-bold text-accent">Octahedron Core</div>
                  <div className="text-[10px] text-muted-foreground mt-0.5">Dual gyroscopic rings</div>
                </div>
                <div className="p-3.5 rounded-xl border border-white/10 bg-white/[0.02]">
                  <div className="text-[9px] text-muted-foreground uppercase">Data Particles</div>
                  <div className="text-sm font-bold text-sky-400">120 Orbital Units</div>
                  <div className="text-[10px] text-muted-foreground mt-0.5">Continuous ingestion</div>
                </div>
              </div>

              <div className="p-4 rounded-xl border border-emerald-500/20 bg-emerald-500/5 font-mono text-xs text-emerald-400 flex items-center justify-between">
                <span>SYSTEM HEALTH: 100% OPERATIONAL</span>
                <CheckCircle2 className="size-4" />
              </div>
            </div>
          </div>
        </div>

        {/* ============================================================ */}
        {/* 3. MY JOURNEY: THE CONTINUOUS LOOP                           */}
        {/* ============================================================ */}
        <div className="space-y-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-[0.25em] text-accent mb-2">
                <Sparkles className="size-3.5" />
                <span>MY JOURNEY & METHODOLOGY</span>
              </div>
              <h3 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-foreground tracking-tight">
                I learn by doing.
              </h3>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setIsJourneyPlaying(!isJourneyPlaying)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-white/10 bg-white/5 hover:border-accent hover:text-accent font-mono text-xs uppercase tracking-wider transition-all cursor-pointer"
              >
                {isJourneyPlaying ? <Pause className="size-3.5" /> : <Play className="size-3.5" />}
                <span>{isJourneyPlaying ? "PAUSE LOOP" : "RESUME LOOP"}</span>
              </button>
            </div>
          </div>

          <p className="font-sans text-base sm:text-lg md:text-xl text-muted-foreground max-w-4xl leading-relaxed">
            I explore new technologies, build prototypes, test ideas, make mistakes, understand what went wrong and keep improving.{" "}
            <strong className="text-foreground font-semibold">Every project becomes another layer of experience.</strong>
          </p>

          {/* Loop Bar: LEARN → BUILD → TEST → FAIL → UNDERSTAND → IMPROVE */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {JOURNEY_STEPS.map((step, idx) => {
              const isActive = activeJourneyStep === idx;
              return (
                <button
                  key={step.phase}
                  type="button"
                  onClick={() => {
                    setActiveJourneyStep(idx);
                    setIsJourneyPlaying(false);
                  }}
                  className={`p-4 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                    isActive
                      ? "border-accent bg-accent/10 shadow-[0_0_24px_rgba(232,168,56,0.2)] scale-[1.02]"
                      : "border-white/10 bg-[#14161C]/60 hover:border-white/20 hover:bg-[#14161C]"
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono text-[10px] text-muted-foreground font-bold">0{idx + 1}</span>
                    <span
                      className="size-2 rounded-full transition-all"
                      style={{ backgroundColor: isActive ? step.color : "#4B5563" }}
                    />
                  </div>
                  <div>
                    <h4
                      className="font-mono text-sm md:text-base font-bold tracking-wider"
                      style={{ color: isActive ? step.color : "#F3F4F6" }}
                    >
                      {step.phase}
                    </h4>
                    <p className="font-mono text-[10px] text-muted-foreground mt-0.5">{step.subtitle}</p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Step Deep-Dive Card */}
          <div className="p-6 md:p-8 rounded-2xl border border-white/10 bg-[#14161C]/90 backdrop-blur-xl">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4 mb-4">
              <div className="flex items-center gap-3">
                <span
                  className="font-mono text-xl font-bold"
                  style={{ color: JOURNEY_STEPS[activeJourneyStep].color }}
                >
                  PHASE 0{activeJourneyStep + 1} // {JOURNEY_STEPS[activeJourneyStep].phase}
                </span>
                <span className="text-white/20">/</span>
                <span className="font-mono text-xs text-muted-foreground uppercase tracking-wider">
                  {JOURNEY_STEPS[activeJourneyStep].subtitle}
                </span>
              </div>
              <div className="font-mono text-xs text-muted-foreground">
                {JOURNEY_STEPS[activeJourneyStep].telemetry}
              </div>
            </div>
            <p className="font-sans text-base sm:text-lg text-foreground/90 leading-relaxed max-w-4xl">
              {JOURNEY_STEPS[activeJourneyStep].description}
            </p>
          </div>
        </div>

        {/* ============================================================ */}
        {/* 4. WHAT I DO: 5 PILLARS OF ACTION                            */}
        {/* ============================================================ */}
        <div className="space-y-8">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-[0.25em] text-accent mb-2">
              <Boxes className="size-3.5" />
              <span>CORE CAPACITIES IN ACTION</span>
            </div>
            <h3 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-foreground tracking-tight">
              What I Do
            </h3>
            <p className="font-sans text-base sm:text-lg text-muted-foreground mt-2 max-w-3xl">
              Five distinct action vectors where theory ceases and tangible systems begin.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {WHAT_I_DO_PILLARS.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={pillar.title}
                  className={`group relative p-7 rounded-2xl border border-white/10 bg-[#14161C]/80 hover:bg-[#14161C] transition-all duration-300 flex flex-col justify-between ${pillar.border}`}
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                        {pillar.badge}
                      </span>
                      <div className={`p-2.5 rounded-lg bg-white/5 ${pillar.accent}`}>
                        <Icon className="size-5" />
                      </div>
                    </div>

                    <div>
                      <h4 className="font-display font-extrabold text-2xl text-foreground group-hover:text-accent transition-colors">
                        {pillar.title}
                      </h4>
                      <p className={`font-mono text-xs font-semibold mt-1 ${pillar.accent}`}>
                        {pillar.quote}
                      </p>
                    </div>

                    <p className="font-sans text-sm text-muted-foreground leading-relaxed">
                      {pillar.details}
                    </p>
                  </div>

                  <div className="mt-6 pt-5 border-t border-white/10 space-y-2">
                    <span className="font-mono text-[9px] uppercase tracking-wider text-muted-foreground block">
                      VERIFIED OUTPUTS:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {pillar.deliverables.map((item) => (
                        <span
                          key={item}
                          className="px-2 py-0.5 rounded bg-white/[0.04] border border-white/5 font-mono text-[9px] text-foreground/80"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ============================================================ */}
        {/* 5. FAILURE IS DATA: THE ANOMALY-TO-INSIGHT ENGINE             */}
        {/* ============================================================ */}
        <div className="rounded-2xl border border-white/10 bg-gradient-to-b from-[#14161C] to-[#0E1015] p-8 md:p-10 backdrop-blur-2xl shadow-2xl space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-5 space-y-4">
              <div className="flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-[0.25em] text-rose-400">
                <AlertTriangle className="size-3.5" />
                <span>FORENSIC DIAGNOSTIC TRUTH</span>
              </div>
              <h3 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-foreground tracking-tight">
                Failure is Data.
              </h3>
              <div className="space-y-2 text-muted-foreground font-sans text-sm md:text-base leading-relaxed">
                <p>Not every experiment works.</p>
                <p>Not every idea survives.</p>
                <p>Not every implementation is perfect.</p>
                <p className="text-foreground font-semibold pt-1">
                  But every failure gives me information.
                </p>
              </div>

              {/* 5 Resolution Steps */}
              <div className="pt-3 flex flex-wrap items-center gap-2 font-mono text-xs">
                {["Attempt.", "Analyze.", "Research.", "Iterate.", "Build again."].map((step) => (
                  <span
                    key={step}
                    className="px-2.5 py-1 rounded bg-white/[0.04] border border-white/10 font-bold text-accent"
                  >
                    {step}
                  </span>
                ))}
              </div>
              <p className="font-mono text-xs text-accent font-semibold pt-1">
                That process is where real progress happens.
              </p>
            </div>

            {/* Interactive Failure Matrix */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-3 font-mono text-xs text-muted-foreground">
                <span>SELECT ANOMALY DOSSIER:</span>
                <span className="text-accent">FORENSIC RCA RECORD</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {FAILURE_DATA_LOGS.map((log, idx) => (
                  <button
                    key={log.id}
                    type="button"
                    onClick={() => setActiveFailureLog(idx)}
                    className={`p-3 rounded-lg border text-left font-mono transition-all cursor-pointer ${
                      activeFailureLog === idx
                        ? "border-rose-500/60 bg-rose-500/10 text-rose-400 shadow-[0_0_16px_rgba(244,63,94,0.25)]"
                        : "border-white/10 bg-white/[0.02] text-muted-foreground hover:border-white/20"
                    }`}
                  >
                    <div className="text-[10px] font-bold">{log.id}</div>
                    <div className="text-[9px] truncate mt-0.5">{log.status}</div>
                  </button>
                ))}
              </div>

              {/* Selected Dossier Detail */}
              <div className="p-6 rounded-xl border border-white/10 bg-[#0C0E12] font-mono text-xs space-y-4">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <div className="text-foreground font-bold text-sm">
                    {FAILURE_DATA_LOGS[activeFailureLog].anomaly}
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    {FAILURE_DATA_LOGS[activeFailureLog].status}
                  </span>
                </div>

                <div className="space-y-2">
                  <div className="text-muted-foreground">
                    <span className="text-rose-400 font-bold">[BREAKDOWN]:</span> {FAILURE_DATA_LOGS[activeFailureLog].breakdown}
                  </div>
                  <div className="text-muted-foreground">
                    <span className="text-sky-400 font-bold">[EXTRACTED DATA]:</span> {FAILURE_DATA_LOGS[activeFailureLog].dataExtracted}
                  </div>
                  <div className="text-muted-foreground">
                    <span className="text-accent font-bold">[HARDENED OUTCOME]:</span> {FAILURE_DATA_LOGS[activeFailureLog].hardenedOutcome}
                  </div>
                </div>

                <div className="pt-3 border-t border-white/10 flex items-center justify-between text-emerald-400 font-bold">
                  <span>NET GAIN:</span>
                  <span>{FAILURE_DATA_LOGS[activeFailureLog].gain}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ============================================================ */}
        {/* 6. MY OPERATING SYSTEM (KERNEL CONSOLE)                      */}
        {/* ============================================================ */}
        <div className="space-y-8">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-[0.25em] text-accent mb-2">
              <Terminal className="size-3.5" />
              <span>THE REPEATABLE KERNEL</span>
            </div>
            <h3 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-foreground tracking-tight">
              My Operating System
            </h3>
            <p className="font-sans text-base sm:text-lg text-muted-foreground mt-2 max-w-3xl">
              A 6-stage deterministic state machine powering every project, line of code, and architectural decision.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Clickable Routine Triggers */}
            <div className="lg:col-span-6 space-y-3">
              {OS_ROUTINES.map((routine, idx) => {
                const isActive = activeOsIndex === idx;
                return (
                  <button
                    key={routine.command}
                    type="button"
                    onClick={() => triggerOsRoutine(idx)}
                    className={`w-full p-4 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                      isActive
                        ? "border-accent bg-accent/10 shadow-[0_0_20px_rgba(232,168,56,0.15)]"
                        : "border-white/10 bg-[#14161C]/60 hover:border-white/20 hover:bg-[#14161C]"
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-xs font-bold text-accent">{routine.command}</span>
                        <span className="font-sans font-bold text-sm text-foreground">{routine.title}</span>
                      </div>
                      <div className="font-mono text-[11px] text-muted-foreground">{routine.metric}</div>
                    </div>
                    <ArrowRight className={`size-4 transition-transform ${isActive ? "text-accent translate-x-1" : "text-muted-foreground"}`} />
                  </button>
                );
              })}
            </div>

            {/* Interactive Terminal Screen */}
            <div className="lg:col-span-6 rounded-2xl border border-white/10 bg-[#0A0C10] p-6 font-mono text-xs flex flex-col justify-between shadow-2xl">
              <div>
                <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4 text-muted-foreground text-[10px]">
                  <div className="flex items-center gap-2">
                    <span className="size-2 rounded-full bg-rose-500" />
                    <span className="size-2 rounded-full bg-amber-500" />
                    <span className="size-2 rounded-full bg-emerald-500" />
                    <span className="ml-2 font-bold text-foreground">TARIK.OS TERMINAL</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`size-1.5 rounded-full ${osRunning ? "bg-accent animate-ping" : "bg-emerald-400"}`} />
                    <span>{osRunning ? "RUNNING ROUTINE..." : "KERNEL IDLE"}</span>
                  </div>
                </div>

                <div className="space-y-2.5 min-h-[200px]">
                  {osConsoleLogs.map((log, i) => (
                    <div
                      key={i}
                      className={`leading-relaxed ${
                        log.startsWith(">")
                          ? "text-accent font-bold"
                          : log.startsWith("✓")
                          ? "text-emerald-400"
                          : "text-muted-foreground"
                      }`}
                    >
                      {log}
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-muted-foreground text-[10px]">
                <span>COMMAND SHORTCUT: CLICK ANY ROUTINE</span>
                <span>STATUS: ACTIVE DISPATCH</span>
              </div>
            </div>
          </div>
        </div>

        {/* ============================================================ */}
        {/* 7. STAY CURIOUS: THE RELENTLESS CYCLE                         */}
        {/* ============================================================ */}
        <div className="p-8 md:p-12 rounded-2xl border border-accent/30 bg-radial from-accent/10 via-[#14161C]/90 to-[#0C0E12] backdrop-blur-2xl shadow-[0_0_60px_rgba(232,168,56,0.15)] relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-accent/40 bg-accent/10 font-mono text-xs uppercase tracking-[0.25em] text-accent font-bold">
                <span className="size-2 rounded-full bg-accent animate-ping" />
                <span>UNYIELDING OPERATING PRINCIPLE</span>
              </div>

              <h3 className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold text-foreground tracking-tight leading-[1.05]">
                Stay Curious.
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 font-mono text-xs">
                {[
                  "Learn something.",
                  "Build something.",
                  "Break something.",
                  "Understand why.",
                  "Build it better.",
                  "Repeat.",
                ].map((mantra, idx) => (
                  <div
                    key={mantra}
                    className="p-3 rounded-lg border border-white/10 bg-white/[0.02] font-semibold text-foreground flex items-center gap-2"
                  >
                    <span className="text-accent font-bold">0{idx + 1}.</span>
                    <span>{mantra}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-4 p-6 rounded-xl border border-white/10 bg-[#0C0E12]/80 backdrop-blur-md space-y-4 font-mono text-xs">
              <div className="text-muted-foreground text-[10px] uppercase tracking-wider">CURIOSITY CYCLES LOGGED</div>
              <div className="text-3xl sm:text-4xl font-extrabold text-accent font-display">
                {curiosityCycles.toLocaleString()}
              </div>
              <div className="text-[11px] text-muted-foreground">
                Uptime: {Math.floor(uptimeSeconds / 60)}m {uptimeSeconds % 60}s · Continuous compounding
              </div>
              <button
                type="button"
                onClick={() => setCuriosityCycles((c) => c + 1)}
                className="w-full py-2.5 rounded bg-accent/20 hover:bg-accent hover:text-[#0C0E12] border border-accent/40 text-accent font-bold uppercase tracking-wider transition-all cursor-pointer"
              >
                + INCREMENT CYCLE
              </button>
            </div>
          </div>
        </div>

        {/* ============================================================ */}
        {/* 8. THIS ISN'T THE FINISH LINE & 9. THE NEXT CHAPTER          */}
        {/* ============================================================ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* This Isn't The Finish Line */}
          <div className="lg:col-span-6 p-8 rounded-2xl border border-white/10 bg-[#14161C]/80 backdrop-blur-xl flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-sky-400 font-semibold">
                <Activity className="size-3.5" />
                <span>DYNAMIC HORIZON</span>
              </div>
              <h3 className="font-display text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
                This isn't the finish line.
              </h3>
              <div className="space-y-1.5 font-sans text-sm md:text-base text-muted-foreground">
                <p>Technology keeps changing.</p>
                <p>AI keeps evolving.</p>
                <p>Software keeps evolving.</p>
                <p>Security keeps evolving.</p>
                <p>The way we create keeps evolving.</p>
              </div>
              <h4 className="font-display text-2xl font-bold text-accent pt-2">So am I.</h4>
              <p className="font-sans text-sm md:text-base text-foreground/90 leading-relaxed">
                My goal isn't simply to keep up with technology. <br />
                <strong className="text-foreground font-semibold">
                  It's to understand it deeply enough to build what comes next.
                </strong>
              </p>
            </div>

            {/* Evolution Velocity Ticker */}
            <div className="space-y-2 pt-4 border-t border-white/10 font-mono text-xs">
              {EVOLUTION_VECTORS.map((v) => (
                <div key={v.domain} className="p-2.5 rounded bg-white/[0.02] border border-white/5 flex items-center justify-between">
                  <div>
                    <span className="text-foreground font-semibold">{v.domain}: </span>
                    <span className="text-muted-foreground">{v.to}</span>
                  </div>
                  <span className="text-[9px] px-1.5 py-0.5 rounded bg-sky-500/10 text-sky-400 font-bold shrink-0 ml-2">
                    {v.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* The Next Chapter: CREATE SOMETHING THAT MATTERS */}
          <div className="lg:col-span-6 p-8 rounded-2xl border border-white/10 bg-[#14161C]/80 backdrop-blur-xl flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-accent font-semibold">
                <Sparkles className="size-3.5" />
                <span>MULTIDISCIPLINARY CONVERGENCE</span>
              </div>
              <h3 className="font-display text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
                The Next Chapter
              </h3>

              {/* Discipline Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 font-mono text-xs text-foreground/90">
                {["AI.", "Cybersecurity.", "Digital products.", "Software.", "Research.", "Entrepreneurship."].map((disc) => (
                  <div key={disc} className="p-3 rounded-lg border border-white/5 bg-white/[0.02] font-semibold text-center">
                    {disc}
                  </div>
                ))}
              </div>

              <div className="pt-2 text-muted-foreground font-sans text-sm md:text-base">
                Different disciplines. <br />
                <span className="text-foreground font-semibold">One direction:</span>
              </div>

              <div className="p-6 rounded-xl border border-accent/40 bg-accent/10 shadow-[0_0_30px_rgba(232,168,56,0.2)] text-center">
                <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent font-bold mb-1">
                  THE SINGULAR VECTOR
                </div>
                <h4 className="font-display text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
                  CREATE SOMETHING THAT MATTERS.
                </h4>
              </div>
            </div>

            <div className="p-4 rounded-xl border border-white/5 bg-white/[0.02] font-mono text-[11px] text-muted-foreground text-center">
              EVIDENCE OVER ASSUMPTIONS · SECURITY BY DESIGN · COGNITION WITH PURPOSE
            </div>
          </div>
        </div>

        {/* ============================================================ */}
        {/* 10. HAVE AN IDEA? & SIGNATURE MONUMENT                       */}
        {/* ============================================================ */}
        <div className="p-8 md:p-14 rounded-3xl border border-white/10 bg-gradient-to-b from-[#14161C] via-[#0E1015] to-[#0A0C10] backdrop-blur-2xl shadow-2xl text-center space-y-8 relative overflow-hidden">
          <div className="max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-accent/40 bg-accent/10 font-mono text-xs uppercase tracking-[0.25em] text-accent font-bold">
              <span>CALL TO ACTION</span>
            </div>

            <h3 className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold text-foreground tracking-tight">
              Have an idea?
            </h3>

            <p className="font-display text-2xl sm:text-3xl font-light italic text-muted-foreground">
              Let's turn it into something real.
            </p>

            <div className="pt-4 flex flex-wrap items-center justify-center gap-4 font-mono text-xs uppercase tracking-[0.2em]">
              <a
                href="#work"
                className="inline-flex items-center gap-2.5 px-8 py-4 rounded-md bg-accent text-[#0C0E12] font-bold shadow-[0_0_30px_rgba(232,168,56,0.35)] hover:bg-accent-glow hover:shadow-[0_0_45px_rgba(232,168,56,0.55)] transition-all active:scale-[0.98] cursor-pointer"
              >
                <span>EXPLORE MY WORK</span>
                <ArrowRight className="size-4" />
              </a>

              <a
                href="#contact"
                className="inline-flex items-center gap-2.5 px-8 py-4 rounded-md border border-white/20 bg-white/5 hover:border-accent hover:bg-accent/10 text-foreground transition-all active:scale-[0.98] cursor-pointer"
              >
                <span>START A CONVERSATION</span>
                <ArrowUpRight className="size-4" />
              </a>

              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-4 rounded-md border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 transition-all font-mono text-xs cursor-pointer"
              >
                <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>DIRECT WHATSAPP</span>
              </a>
            </div>
          </div>

          {/* Monumental Typographic Signature */}
          <div className="pt-12 border-t border-white/10 space-y-3">
            <h1 className="font-display text-6xl sm:text-8xl md:text-9xl lg:text-[10.5rem] font-extrabold tracking-tighter text-foreground leading-none drop-shadow-[0_0_80px_rgba(232,168,56,0.2)]">
              TARIK
            </h1>
            <h4 className="font-mono text-base sm:text-xl md:text-2xl uppercase tracking-[0.35em] text-accent font-bold">
              BUILD. LEARN. EVOLVE.
            </h4>
            <div className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest pt-2">
              TARIK ISLAM · MULTIDISCIPLINARY TECHNOLOGIST · INDIA (UTC +05:30)
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
