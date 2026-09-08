import { useEffect, useRef, useState, useMemo } from "react";
import * as THREE from "three";
import {
  Cpu,
  Brain,
  ShieldCheck,
  Search,
  Globe,
  Layers,
  Sparkles,
  Zap,
  Activity,
  ArrowRight,
  RotateCcw,
  Terminal,
  ShieldAlert,
  Database,
  Server,
  Code2,
  Lock,
  GitBranch,
  RefreshCw,
  Box,
  Fingerprint,
  ChevronRight,
  CheckCircle2,
  XCircle,
  Play,
  Pause,
  Monitor,
  Maximize2,
} from "lucide-react";
import photoLab from "@/assets/tarik-photo-lab.jpg";

// ==========================================
// 1. TECHNOLOGY STACK CLUSTERS DATA
// ==========================================
interface TechCluster {
  id: string;
  category: string;
  code: string;
  tagline: string;
  color: string;
  hexColor: number;
  textColor: string;
  borderColor: string;
  icon: React.ComponentType<{ className?: string }>;
  corePurpose: string;
  technologies: { name: string; level: string; desc: string }[];
  connectedTo: string[];
}

const TECH_CLUSTERS: TechCluster[] = [
  {
    id: "ai",
    category: "AI & Intelligence",
    code: "LAYER // 01 · COGNITION",
    tagline: "Intelligence with Purpose & Grounded Reasoning",
    color: "#10B981",
    hexColor: 0x10b981,
    textColor: "text-emerald-400",
    borderColor: "border-emerald-500/40 hover:border-emerald-400",
    icon: Brain,
    corePurpose:
      "Engineering agentic workflows, deterministic RAG retrieval, and fine-tuned neural models that reason on verifiable data rather than synthetic hallucinations.",
    technologies: [
      { name: "Python", level: "Primary", desc: "Core language for ML research, pipeline automation & agentic runtime" },
      { name: "AI / ML & PyTorch", level: "Deep", desc: "Neural network architectures, model fine-tuning & evaluation" },
      { name: "LLMs & Prompt Engineering", level: "Production", desc: "Structured reasoning loops, function calling & tool use" },
      { name: "Computer Vision", level: "Applied", desc: "Feature extraction, biometric matching & evidentiary imaging" },
      { name: "Autonomous Agents", level: "Advanced", desc: "Multi-agent orchestration, state machines & self-reflection" },
      { name: "Vector Synthesis & RAG", level: "Production", desc: "High-dimensional vector embeddings, hybrid search & reranking" },
    ],
    connectedTo: ["fullstack", "cybersecurity", "forensics"],
  },
  {
    id: "cybersecurity",
    category: "Cybersecurity",
    code: "LAYER // 02 · DEFENSE",
    tagline: "Security by Design & Zero Trust Bedrock",
    color: "#38BDF8",
    hexColor: 0x38bdf8,
    textColor: "text-sky-400",
    borderColor: "border-sky-500/40 hover:border-sky-400",
    icon: ShieldCheck,
    corePurpose:
      "Architecting defensive systems that anticipate adversary movements, enforce zero-trust isolation at every boundary, and maintain cryptographic integrity.",
    technologies: [
      { name: "Zero Trust Architecture", level: "Bedrock", desc: "Never trust, always verify — mutual TLS, strict ACLs & identity barriers" },
      { name: "Threat Modeling (STRIDE)", level: "Architectural", desc: "Systematic attack surface analysis before writing the first line of code" },
      { name: "Network & Packet Analysis", level: "Deep", desc: "Wireshark, deep packet inspection & anomaly classification" },
      { name: "AppSec & Vulnerability Audit", level: "Continuous", desc: "OWASP Top 10 mitigation, static analysis & pen testing" },
      { name: "Cryptographic Protocols", level: "Rigorous", desc: "End-to-end encryption, SHA-256 signatures & key lifecycle management" },
      { name: "Secure Authentication", level: "Hardened", desc: "OAuth2, WebAuthn/Passkeys, session isolation & MFA" },
    ],
    connectedTo: ["ai", "fullstack", "infra", "forensics"],
  },
  {
    id: "fullstack",
    category: "Full-Stack Engineering",
    code: "LAYER // 03 · STRUCTURE",
    tagline: "Deterministic Systems, Fluid Interfaces & 0→1 Craft",
    color: "#F6C85F",
    hexColor: 0xf6c85f,
    textColor: "text-amber-400",
    borderColor: "border-amber-500/40 hover:border-amber-400",
    icon: Code2,
    corePurpose:
      "Crafting production software platforms with end-to-end type safety, sub-millisecond execution, and clean architectural boundaries that scale smoothly.",
    technologies: [
      { name: "TypeScript / JavaScript", level: "Native", desc: "Strict type safety from database schemas to client components" },
      { name: "React 19 & Next.js", level: "Advanced", desc: "Server Components, concurrent rendering & optimal hydration" },
      { name: "Node.js & Edge Runtimes", level: "High Scale", desc: "Event-driven asynchronous services, worker pools & serverless functions" },
      { name: "REST & GraphQL APIs", level: "Contract-Driven", desc: "Zod-validated endpoints, idempotent mutations & deterministic responses" },
      { name: "PostgreSQL & SQLite", level: "Relational", desc: "ACID compliance, indexed queries, migrations & connection pooling" },
      { name: "TanStack Router & Query", level: "Modern", desc: "Type-safe routing, proactive cache management & optimistic UI" },
    ],
    connectedTo: ["ai", "cybersecurity", "creative3d", "infra"],
  },
  {
    id: "creative3d",
    category: "3D & Creative Engineering",
    code: "LAYER // 04 · INTERACTION",
    tagline: "Living WebGL Shaders, Procedural Canvases & Spatial UI",
    color: "#A855F7",
    hexColor: 0xa855f7,
    textColor: "text-purple-400",
    borderColor: "border-purple-500/40 hover:border-purple-400",
    icon: Box,
    corePurpose:
      "Translating complex mathematical topologies, evidence telemetry, and product narratives into high-performance 60 FPS spatial graphics.",
    technologies: [
      { name: "Three.js", level: "Core", desc: "Custom scenes, particle buffers, dynamic lights & camera choreographies" },
      { name: "WebGL & GLSL Shaders", level: "Low-Level", desc: "Hardware-accelerated vertex and fragment shaders for physics & aura" },
      { name: "React Three Fiber", level: "Declarative", desc: "Componentized 3D rendering with reactive state synchronization" },
      { name: "Real-Time Visualizations", level: "Telemetry", desc: "Biometric HUDs, particle networks & spatial graph topologies" },
      { name: "60 FPS Optimization", level: "Rigorous", desc: "Draw-call reduction, geometry instancing & GPU memory cleanup" },
    ],
    connectedTo: ["fullstack", "ai"],
  },
  {
    id: "forensics",
    category: "Digital Forensics",
    code: "LAYER // 05 · EVIDENCE",
    tagline: "Evidence Over Assumptions & Chain-of-Custody Rigor",
    color: "#6EE7B7",
    hexColor: 0x6ee7b7,
    textColor: "text-emerald-300",
    borderColor: "border-emerald-400/40 hover:border-emerald-300",
    icon: Search,
    corePurpose:
      "Applying the scientific method to digital artifacts: bit-for-bit acquisition, cryptographic verification, timeline correlation, and reproducible proof.",
    technologies: [
      { name: "Digital Evidence Acquisition", level: "Forensic", desc: "Write-blocked physical imaging, volatile memory dumps & live triage" },
      { name: "Chain-of-Custody Tracking", level: "Immutable", desc: "Court-ready custody logs, custody hashes & tamper-evident storage" },
      { name: "Memory & Artifact Autopsy", level: "Investigative", desc: "Volatiles analysis, process hollow detection & root-cause autopsies" },
      { name: "Cryptographic Hash Audits", level: "Mathematical", desc: "SHA-256 / SHA-512 bitstream verification and integrity seals" },
      { name: "Forensic Tooling & CLI", level: "Specialized", desc: "Autopsy, Volatility, FTK Imager, ExifTool & custom Python scripts" },
    ],
    connectedTo: ["cybersecurity", "ai"],
  },
  {
    id: "infra",
    category: "Infrastructure & Cloud",
    code: "LAYER // 06 · EXECUTION",
    tagline: "Automated Pipelines, Edge Distribution & Resilience",
    color: "#FF7070",
    hexColor: 0xff7070,
    textColor: "text-pink-400",
    borderColor: "border-pink-500/40 hover:border-pink-400",
    icon: Server,
    corePurpose:
      "Automating the pathway from local source code to global zero-downtime deployment with deterministic reproducibility and telemetry monitoring.",
    technologies: [
      { name: "Git & GitHub Workflows", level: "Standard", desc: "Branching strategies, automated review gates & protected main branch" },
      { name: "Docker & Containerization", level: "Isolated", desc: "Reproducible microservices, multi-stage builds & container isolation" },
      { name: "CI / CD Pipelines", level: "Automated", desc: "GitHub Actions, automated test runners, linting & deployment triggers" },
      { name: "Vercel & Edge CDN", level: "Global", desc: "Instant worldwide asset distribution, serverless routes & instant rollbacks" },
      { name: "Observability & Logging", level: "Telemetry", desc: "Real-time error tracking, synthetic monitoring & health probes" },
    ],
    connectedTo: ["fullstack", "cybersecurity"],
  },
];

// ==========================================
// 2. LIVE ARCHITECTURE SIMULATION DATA
// ==========================================
type SimulationMode = "ai" | "cyber" | "fullstack" | "forensics" | "cloud";

interface ArchitectureStep {
  title: string;
  tag: string;
  desc: string;
  status: "idle" | "active" | "complete";
}

const ARCHITECTURE_FLOWS: Record<
  SimulationMode,
  {
    title: string;
    category: string;
    tagline: string;
    color: string;
    accent: string;
    steps: ArchitectureStep[];
    telemetry: { label: string; value: string }[];
  }
> = {
  ai: {
    title: "AI Neural Reasoning & Retrieval Loop",
    category: "AI RETRIEVAL & REASONING",
    tagline: "Source-grounded RAG with deterministic tool execution and self-correction",
    color: "#10B981",
    accent: "text-emerald-400",
    steps: [
      { title: "USER INTENT", tag: "INGEST", desc: "Parse raw query, extract semantic entities and constraints", status: "complete" },
      { title: "EMBEDDING & RETRIEVAL", tag: "VECTOR", desc: "High-dimensional cosine search across verified knowledge chunks", status: "complete" },
      { title: "SOURCE GROUNDING", tag: "VERIFY", desc: "Correlate citations, eliminate hallucinations before model prompt", status: "active" },
      { title: "REASONING & INFERENCE", tag: "LLM CORE", desc: "Structured multi-step chain-of-thought with function calling", status: "idle" },
      { title: "VERIFIED OUTPUT", tag: "DELIVER", desc: "Stream type-safe structured JSON with citations to client", status: "idle" },
    ],
    telemetry: [
      { label: "Retrieval", value: "Source-Grounded" },
      { label: "Architecture", value: "RAG Pipeline" },
      { label: "Validation", value: "Citation-Verified" },
      { label: "Output Format", value: "Structured JSON" },
    ],
  },
  cyber: {
    title: "Zero-Trust Threat Defense Engine",
    category: "SECURITY & ZERO-TRUST",
    tagline: "Continuous cryptographic verification and active packet deflection",
    color: "#38BDF8",
    accent: "text-sky-400",
    steps: [
      { title: "PACKET INGESTION", tag: "GATEWAY", desc: "Inspect TLS handshake, TLS fingerprint and IP reputation", status: "complete" },
      { title: "IDENTITY & ACL CHECK", tag: "AUTH", desc: "Validate cryptographic JWT claim and device attestation", status: "complete" },
      { title: "HEURISTIC ANOMALY SCAN", tag: "DEFENSE", desc: "Deep packet inspection against known attack vectors & rate limits", status: "active" },
      { title: "POLICY DECISION", tag: "ISOLATION", desc: "Allow verified packet or deflect adversary with silent tarpit", status: "idle" },
      { title: "SECURE DATA VAULT", tag: "CIPHER", desc: "Deliver decrypted payload inside isolated memory enclave", status: "idle" },
    ],
    telemetry: [
      { label: "Policy", value: "Zero-Trust" },
      { label: "Inspection", value: "Deep Packet" },
      { label: "Response", value: "Auto-Isolate" },
      { label: "Trust Model", value: "Verify Always" },
    ],
  },
  fullstack: {
    title: "Full-Stack Deterministic Pipeline",
    category: "END-TO-END REACT 19 ARCHITECTURE",
    tagline: "Microsecond hydration, strict type contracts, and ACID database transactions",
    color: "#F6C85F",
    accent: "text-amber-400",
    steps: [
      { title: "USER INTERFACE", tag: "CLIENT", desc: "React 19 Server Components with optimistic UI and immediate paint", status: "complete" },
      { title: "EDGE ROUTING", tag: "GLOBAL", desc: "TanStack Router validates search params & pre-fetches data", status: "complete" },
      { title: "API GATEWAY", tag: "RPC / REST", desc: "Zod-validated payload contract with rate limiting & audit logs", status: "active" },
      { title: "BUSINESS LOGIC", tag: "CORE", desc: "Deterministic state transitions and asynchronous job queues", status: "idle" },
      { title: "PERSISTENCE & RESPONSE", tag: "POSTGRES", desc: "ACID commit, cache invalidation, and sub-15ms client stream", status: "idle" },
    ],
    telemetry: [
      { label: "SSR First Paint", value: "140 ms" },
      { label: "API Round-Trip", value: "18.4 ms" },
      { label: "Type Safety", value: "100% Zod" },
      { label: "DB Query Time", value: "1.2 ms" },
    ],
  },
  forensics: {
    title: "Digital Evidence Chain of Custody",
    category: "INVESTIGATION & AUDIT ENGINE",
    tagline: "Bitstream verification, cryptographic hashing, and court-ready documentation",
    color: "#6EE7B7",
    accent: "text-emerald-300",
    steps: [
      { title: "EVIDENCE SEIZURE", tag: "PHYSICAL", desc: "Hardware write-blocking and environmental preservation", status: "complete" },
      { title: "BIT-FOR-BIT IMAGE", tag: "ACQUISITION", desc: "Bitstream raw forensic disk image created without modifying source", status: "complete" },
      { title: "HASH VERIFICATION", tag: "SHA-256", desc: "Generate twin SHA-256 and SHA-512 hashes to prove byte identity", status: "active" },
      { title: "ARTIFACT PARSING", tag: "AUTOPSY", desc: "Correlate timeline events, memory structures, and registry entries", status: "idle" },
      { title: "LEGAL DOSSIER", tag: "PROOF", desc: "Generate court-ready evidence report with unbroken chain of custody", status: "idle" },
    ],
    telemetry: [
      { label: "Hash Method", value: "SHA-256 + SHA-512" },
      { label: "Imaging", value: "Bit-for-Bit" },
      { label: "Standard", value: "ISO/IEC 27037" },
      { label: "Documentation", value: "Court-Ready" },
    ],
  },
  cloud: {
    title: "Continuous Cloud & Edge Deployment",
    category: "INFRASTRUCTURE & ORCHESTRATION",
    tagline: "From Git commit to global edge CDN with automated quality gates",
    color: "#FF7070",
    accent: "text-pink-400",
    steps: [
      { title: "GIT COMMIT", tag: "PUSH", desc: "Cryptographically signed commit with conventional changelog message", status: "complete" },
      { title: "CI QUALITY GATES", tag: "AUTOMATE", desc: "Zero-tolerance TypeScript typecheck, ESLint, and unit test suites", status: "complete" },
      { title: "CONTAINER BUILD", tag: "DOCKER", desc: "Multi-stage minimal image build with vulnerability vulnerability scan", status: "active" },
      { title: "EDGE CDN SYNC", tag: "VERCEL", desc: "Atomic deployment across 100+ global edge locations", status: "idle" },
      { title: "ACTIVE OBSERVABILITY", tag: "LIVE", desc: "Real-time synthetic monitoring, error boundaries & instant rollbacks", status: "idle" },
    ],
    telemetry: [
      { label: "Deploy", value: "Atomic" },
      { label: "Edge", value: "Global CDN" },
      { label: "Pipeline", value: "CI/CD Gated" },
      { label: "Rollback", value: "Instant" },
    ],
  },
};

// ==========================================
// 3. THE 7 ARCHITECTURAL LAYERS DATA
// ==========================================
const SEVEN_LAYERS = [
  {
    step: "01",
    name: "Architecture",
    subtitle: "FOUNDATION",
    desc: "Clean decomposition, modular failure isolation, and clear trust boundaries before writing code.",
    accent: "text-amber-400",
  },
  {
    step: "02",
    name: "Interfaces",
    subtitle: "EXPERIENCE",
    desc: "Fluid, accessible, responsive user interfaces that respect keyboard navigation and deliver microsecond feedback.",
    accent: "text-blue-400",
  },
  {
    step: "03",
    name: "Data",
    subtitle: "INTEGRITY",
    desc: "Rigorous schemas, relational consistency, type contracts, and immutable logging across every data touchpoint.",
    accent: "text-emerald-400",
  },
  {
    step: "04",
    name: "Logic",
    subtitle: "EXECUTION",
    desc: "Deterministic algorithms, asynchronous queues, state machines, and thorough edge-case handling.",
    accent: "text-purple-400",
  },
  {
    step: "05",
    name: "Security",
    subtitle: "DEFENSE",
    desc: "Zero-trust primitives, cryptographic verification, minimized attack surfaces, and adversarial resistance.",
    accent: "text-sky-400",
  },
  {
    step: "06",
    name: "Intelligence",
    subtitle: "COGNITION",
    desc: "Context retrieval, deterministic guardrails, multi-agent reasoning loops, and verifiable outputs.",
    accent: "text-emerald-400",
  },
  {
    step: "07",
    name: "Deployment",
    subtitle: "IMPACT",
    desc: "Automated CI/CD pipelines, containerization, global edge distribution, and continuous observability.",
    accent: "text-pink-400",
  },
];

export function HowIBuildLab() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [selectedCluster, setSelectedCluster] = useState<number>(0);
  const [simulationMode, setSimulationMode] = useState<SimulationMode>("ai");
  const [activeSimulationStep, setActiveSimulationStep] = useState<number>(1);
  const [isSimulating, setIsSimulating] = useState<boolean>(true);
  const [isConverged, setIsConverged] = useState<boolean>(false);
  const [showTarikSingularity, setShowTarikSingularity] = useState<boolean>(false);
  const [fpsCount, setFpsCount] = useState<number>(60);

  const openLabLightbox = (monitorId: number = 1) => {
    window.dispatchEvent(
      new CustomEvent("tarik:open-lab-lightbox", { detail: { monitor: monitorId } })
    );
  };

  // Simulation timer
  useEffect(() => {
    if (!isSimulating) return;
    const interval = setInterval(() => {
      setActiveSimulationStep((prev) => (prev + 1) % 5);
    }, 2400);
    return () => clearInterval(interval);
  }, [isSimulating]);

  // Three.js refs
  const sceneRef = useRef<{
    scene?: THREE.Scene;
    camera?: THREE.PerspectiveCamera;
    renderer?: THREE.WebGLRenderer;
    coreMesh?: THREE.Mesh;
    wireCore?: THREE.Mesh;
    nodes: { group: THREE.Group; mesh: THREE.Mesh; angle: number; radius: number; hexColor: number }[];
    beams: THREE.Line[];
    particles?: THREE.Points;
    targetCameraPos: THREE.Vector3;
    currentCameraPos: THREE.Vector3;
    targetLookAt: THREE.Vector3;
    currentLookAt: THREE.Vector3;
    convergedRatio: number;
    targetConvergence: number;
    isIntersecting: boolean;
    reqId: number;
  }>({
    nodes: [],
    beams: [],
    targetCameraPos: new THREE.Vector3(0, 3, 14),
    currentCameraPos: new THREE.Vector3(0, 3, 18),
    targetLookAt: new THREE.Vector3(0, 0, 0),
    currentLookAt: new THREE.Vector3(0, 0, 0),
    convergedRatio: 0,
    targetConvergence: 0,
    isIntersecting: false,
    reqId: 0,
  });

  // Handle Convergence Trigger
  const triggerConvergence = () => {
    setIsConverged(true);
    sceneRef.current.targetConvergence = 1;
    setTimeout(() => {
      setShowTarikSingularity(true);
    }, 900);
  };

  const resetConvergence = () => {
    setIsConverged(false);
    setShowTarikSingularity(false);
    sceneRef.current.targetConvergence = 0;
  };

  // Update Three.js camera on cluster change
  useEffect(() => {
    if (isConverged) return;
    const s = sceneRef.current;
    const node = s.nodes[selectedCluster];
    if (node) {
      const angle = (selectedCluster / TECH_CLUSTERS.length) * Math.PI * 2;
      const x = Math.cos(angle) * 5.5;
      const z = Math.sin(angle) * 5.5;
      s.targetCameraPos.set(x * 1.5, 2.5, z * 1.5 + 4.2);
      s.targetLookAt.set(x * 0.4, 0, z * 0.4);
    }
  }, [selectedCluster, isConverged]);

  // ==========================================
  // THREE.JS SCENE SETUP
  // ==========================================
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 800;
    const height = container.clientHeight || 560;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0a0c10, 0.038);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 3, 16);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.4;
    container.appendChild(renderer.domElement);

    // 1. Digital Intelligence Core
    const coreGroup = new THREE.Group();
    scene.add(coreGroup);

    // Inner Gem
    const coreGeom = new THREE.DodecahedronGeometry(1.4, 1);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0xe8a838,
      emissive: 0x905e15,
      emissiveIntensity: 0.9,
      roughness: 0.15,
      metalness: 0.95,
      wireframe: false,
    });
    const coreMesh = new THREE.Mesh(coreGeom, coreMat);
    coreGroup.add(coreMesh);

    // Outer Geodesic Wireframe Shell
    const wireGeom = new THREE.IcosahedronGeometry(2.3, 1);
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      wireframe: true,
      transparent: true,
      opacity: 0.25,
    });
    const wireCore = new THREE.Mesh(wireGeom, wireMat);
    coreGroup.add(wireCore);

    // Gyroscopic telemetry rings
    const rings: THREE.Mesh[] = [];
    [2.8, 3.4].forEach((rad, i) => {
      const rGeom = new THREE.TorusGeometry(rad, 0.015, 16, 100);
      const rMat = new THREE.MeshBasicMaterial({
        color: i === 0 ? 0xe8a838 : 0x10b981,
        transparent: true,
        opacity: 0.4,
      });
      const rMesh = new THREE.Mesh(rGeom, rMat);
      rMesh.rotation.x = Math.PI / (2.2 + i * 0.4);
      rMesh.rotation.y = i * 1.1;
      coreGroup.add(rMesh);
      rings.push(rMesh);
    });

    // 2. 6 Orbiting Technology Nodes
    const nodes: { group: THREE.Group; mesh: THREE.Mesh; angle: number; radius: number; hexColor: number }[] = [];
    const beams: THREE.Line[] = [];
    const baseRadius = 5.8;

    TECH_CLUSTERS.forEach((cluster, idx) => {
      const angle = (idx / TECH_CLUSTERS.length) * Math.PI * 2;
      const x = Math.cos(angle) * baseRadius;
      const z = Math.sin(angle) * baseRadius;
      const y = (idx % 2 === 0 ? 0.4 : -0.4);

      const nodeGroup = new THREE.Group();
      nodeGroup.position.set(x, y, z);

      // Node Geometry: Octahedron
      const nGeom = new THREE.OctahedronGeometry(0.65, 0);
      const nMat = new THREE.MeshStandardMaterial({
        color: cluster.hexColor,
        emissive: cluster.hexColor,
        emissiveIntensity: 0.7,
        roughness: 0.2,
        metalness: 0.8,
      });
      const nMesh = new THREE.Mesh(nGeom, nMat);
      nodeGroup.add(nMesh);

      // Node Halo
      const hGeom = new THREE.TorusGeometry(1.0, 0.018, 12, 50);
      const hMat = new THREE.MeshBasicMaterial({
        color: cluster.hexColor,
        transparent: true,
        opacity: 0.5,
      });
      const hMesh = new THREE.Mesh(hGeom, hMat);
      hMesh.rotation.x = Math.PI / 2;
      nodeGroup.add(hMesh);

      scene.add(nodeGroup);
      nodes.push({ group: nodeGroup, mesh: nMesh, angle, radius: baseRadius, hexColor: cluster.hexColor });

      // Laser lattice beam to core
      const lineGeom = new THREE.BufferGeometry();
      lineGeom.setAttribute("position", new THREE.BufferAttribute(new Float32Array([0, 0, 0, x, y, z]), 3));
      lineGeom.setAttribute(
        "color",
        new THREE.BufferAttribute(
          new Float32Array([
            0.9, 0.65, 0.2, // Core amber
            ((cluster.hexColor >> 16) & 255) / 255,
            ((cluster.hexColor >> 8) & 255) / 255,
            (cluster.hexColor & 255) / 255,
          ]),
          3
        )
      );
      const lineMat = new THREE.LineBasicMaterial({
        vertexColors: true,
        transparent: true,
        opacity: 0.35,
      });
      const beam = new THREE.Line(lineGeom, lineMat);
      scene.add(beam);
      beams.push(beam);
    });

    // 3. Particle Cloud (Laboratory Atmosphere)
    const particleCount = 800;
    const pPos = new Float32Array(particleCount * 3);
    const pCol = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      const r = 2.0 + Math.random() * 11.0;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      pPos[i3] = r * Math.sin(phi) * Math.cos(theta);
      pPos[i3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pPos[i3 + 2] = r * Math.cos(phi);

      const rnd = Math.random();
      if (rnd < 0.4) {
        pCol[i3] = 0.91; pCol[i3 + 1] = 0.66; pCol[i3 + 2] = 0.22; // Amber
      } else if (rnd < 0.7) {
        pCol[i3] = 0.22; pCol[i3 + 1] = 0.74; pCol[i3 + 2] = 0.97; // Sky
      } else {
        pCol[i3] = 0.06; pCol[i3 + 1] = 0.73; pCol[i3 + 2] = 0.51; // Emerald
      }
    }

    const pGeom = new THREE.BufferGeometry();
    pGeom.setAttribute("position", new THREE.BufferAttribute(pPos, 3));
    pGeom.setAttribute("color", new THREE.BufferAttribute(pCol, 3));
    const pMat = new THREE.PointsMaterial({
      size: 0.048,
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(pGeom, pMat);
    scene.add(particles);

    // 4. Lighting
    const ambLight = new THREE.AmbientLight(0x0a0c10, 2.0);
    scene.add(ambLight);

    const pLightCore = new THREE.PointLight(0xe8a838, 3.5, 25);
    pLightCore.position.set(0, 0, 0);
    scene.add(pLightCore);

    const dirLight = new THREE.DirectionalLight(0x38bdf8, 1.8);
    dirLight.position.set(8, 10, 8);
    scene.add(dirLight);

    // Save objects
    const s = sceneRef.current;
    s.scene = scene;
    s.camera = camera;
    s.renderer = renderer;
    s.coreMesh = coreMesh;
    s.wireCore = wireCore;
    s.nodes = nodes;
    s.beams = beams;
    s.particles = particles;

    // Intersection Observer
    const observer = new IntersectionObserver(
      ([entry]) => {
        s.isIntersecting = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    // Render loop
    let lastTime = performance.now();
    let frameCount = 0;
    let fpsTimer = performance.now();

    const animate = (now: number) => {
      s.reqId = requestAnimationFrame(animate);
      if (!s.isIntersecting) return;

      const delta = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;

      frameCount++;
      if (now - fpsTimer >= 1000) {
        setFpsCount(frameCount);
        frameCount = 0;
        fpsTimer = now;
      }

      // Smooth camera interpolation
      s.currentCameraPos.lerp(s.targetCameraPos, 0.05);
      camera.position.copy(s.currentCameraPos);

      s.currentLookAt.lerp(s.targetLookAt, 0.05);
      camera.lookAt(s.currentLookAt);

      // Smooth convergence ratio
      s.convergedRatio += (s.targetConvergence - s.convergedRatio) * 0.06;

      // Rotate central core
      if (coreMesh) {
        coreMesh.rotation.y += (0.6 + s.convergedRatio * 3.0) * delta;
        coreMesh.rotation.x += 0.3 * delta;
      }
      if (wireCore) {
        wireCore.rotation.y -= (0.3 + s.convergedRatio * 1.5) * delta;
        wireCore.rotation.z += 0.2 * delta;
        const scale = 1 + s.convergedRatio * 0.6;
        wireCore.scale.set(scale, scale, scale);
      }
      rings.forEach((r, idx) => {
        r.rotation.z += (0.5 + idx * 0.3 + s.convergedRatio * 2.0) * delta;
      });

      // Orbit & move nodes
      nodes.forEach((n, idx) => {
        const currentAngle = n.angle + now * 0.00025;
        // When converged, pull inward to radius 1.2
        const targetRad = THREE.MathUtils.lerp(n.radius, 1.25, s.convergedRatio);
        const nx = Math.cos(currentAngle) * targetRad;
        const nz = Math.sin(currentAngle) * targetRad;
        const ny = Math.sin(now * 0.0018 + idx) * (0.4 * (1 - s.convergedRatio));

        n.group.position.set(nx, ny, nz);
        n.mesh.rotation.y += 1.4 * delta;

        // Scale nodes down during singularity
        const nScale = THREE.MathUtils.lerp(1.0, 0.35, s.convergedRatio);
        n.group.scale.set(nScale, nScale, nScale);

        // Update beam line
        const beam = beams[idx];
        if (beam) {
          const pos = beam.geometry.getAttribute("position") as THREE.BufferAttribute;
          pos.setXYZ(0, 0, 0, 0);
          pos.setXYZ(1, nx, ny, nz);
          pos.needsUpdate = true;

          const mat = beam.material as THREE.LineBasicMaterial;
          mat.opacity = THREE.MathUtils.lerp(0.35, 0.9, s.convergedRatio);
        }
      });

      if (particles) {
        particles.rotation.y += (0.04 + s.convergedRatio * 0.2) * delta;
      }

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

  // Pointer orbital drag
  const isDragging = useRef(false);
  const prevPointer = useRef({ x: 0, y: 0 });

  const handlePointerDown = (e: React.PointerEvent) => {
    isDragging.current = true;
    prevPointer.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current) return;
    const dx = e.clientX - prevPointer.current.x;
    const dy = e.clientY - prevPointer.current.y;
    prevPointer.current = { x: e.clientX, y: e.clientY };

    const s = sceneRef.current;
    if (s.camera) {
      const spherical = new THREE.Spherical();
      spherical.setFromVector3(s.targetCameraPos);
      spherical.theta -= dx * 0.006;
      spherical.phi = Math.max(0.2, Math.min(Math.PI - 0.2, spherical.phi - dy * 0.006));
      s.targetCameraPos.setFromSpherical(spherical);
    }
  };

  const handlePointerUp = () => {
    isDragging.current = false;
  };

  const currentCluster = TECH_CLUSTERS[selectedCluster];
  const currentSim = ARCHITECTURE_FLOWS[simulationMode];

  return (
    <section
      id="systems"
      className="relative py-28 md:py-36 px-6 md:px-12 lg:px-16 border-b border-white/5 bg-[#0A0D12] overflow-hidden"
    >
      {/* Soft background ambient lighting */}
      <div className="absolute top-1/4 left-1/3 size-[40rem] rounded-full blur-3xl opacity-15 bg-radial from-emerald-500/20 to-transparent pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 size-[36rem] rounded-full blur-3xl opacity-10 bg-radial from-accent/20 to-transparent pointer-events-none" />

      <div className="relative max-w-[1600px] mx-auto">
        {/* ==========================================
            1. SECTION OPENING: DIGITAL ENGINEERING LAB
        ========================================== */}
        <div className="mb-16">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs text-[#62E6FF] uppercase tracking-widest px-2.5 py-1 rounded border border-[#62E6FF]/30 bg-[#62E6FF]/10 font-bold">
                04 / SYSTEMS
              </span>
              <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-[0.25em]">
                HOW I BUILD: LIVING DIGITAL LABORATORY &amp; ARCHITECTURE
              </span>
            </div>

            {/* Live Lab Engine Telemetry */}
            <div className="flex items-center gap-4 text-xs font-mono text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-emerald-400 font-semibold">LAB PIPELINE ACTIVE</span>
              </div>
              <span className="text-white/20">|</span>
              <span>RENDER: {fpsCount} FPS</span>
            </div>
          </div>

          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground mb-6">
            How I Build: <br className="hidden sm:block" />
            <span className="italic font-light text-gradient-flow">
              Tools, Architecture &amp; The Living Lab.
            </span>
          </h2>

          {/* Center Callout: Core Concept */}
          <div className="max-w-4xl space-y-4 mb-8">
            <p className="font-display text-2xl sm:text-3xl md:text-4xl text-foreground font-semibold tracking-tight leading-snug">
              &ldquo;I don&apos;t just use tools.{" "}
              <span className="text-accent italic font-light">
                I connect them into systems.&rdquo;
              </span>
            </p>
            <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
              I work across AI, cybersecurity, digital forensics, full-stack engineering,
              and digital product development. I don&apos;t see these as separate worlds.
              I see them as connected layers of one larger, resilient system.
            </p>
          </div>

          {/* The Lifecycle Trajectory Ribbon */}
          <div className="p-4 sm:p-5 rounded-xl border border-white/10 bg-[#12151C]/90 backdrop-blur-md">
            <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest block mb-3">
              THE VALUE CONVERSION PATHWAY:
            </span>
            <div className="flex flex-wrap items-center gap-2 sm:gap-4 font-mono text-xs sm:text-sm font-bold text-foreground">
              {[
                { name: "IDEA", accent: "text-amber-400" },
                { name: "ARCHITECTURE", accent: "text-sky-400" },
                { name: "CODE", accent: "text-indigo-400" },
                { name: "INTELLIGENCE", accent: "text-emerald-400" },
                { name: "PRODUCT", accent: "text-pink-400" },
                { name: "IMPACT", accent: "text-accent" },
              ].map((step, idx, arr) => (
                <div key={step.name} className="flex items-center gap-2 sm:gap-4">
                  <span className={`px-3 py-1 rounded bg-white/5 border border-white/10 ${step.accent}`}>
                    {step.name}
                  </span>
                  {idx < arr.length - 1 && <span className="text-white/30 text-xs">→</span>}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ==========================================
            1.5 PHYSICAL COMMAND MATRIX (AUTHENTIC EVIDENCE)
        ========================================== */}
        <div className="mb-20 rounded-2xl border border-white/15 bg-gradient-to-br from-[#0A0D12]/95 to-[#050608]/95 p-6 md:p-8 backdrop-blur-2xl shadow-2xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Col: Photo with Scanline Sweep and Hotspot Trigger */}
            <div
              onClick={() => openLabLightbox(1)}
              className="lg:col-span-7 relative rounded-xl overflow-hidden border border-white/10 group cursor-pointer aspect-[16/10]"
            >
              <img
                src={photoLab}
                alt="Tarik Islam engineering workstation with 4 monitors"
                className="size-full object-cover object-center filter contrast-[1.06] transition-transform duration-700 group-hover:scale-[1.03]"
              />
              <div className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-transparent via-[#62E6FF]/25 to-transparent animate-scan-sweep opacity-75" />

              {/* Badges */}
              <div className="absolute top-3 left-3 z-10 px-2.5 py-1 rounded bg-[#050608]/85 border border-white/10 font-mono text-[9px] text-[#62E6FF] backdrop-blur-md flex items-center gap-1.5">
                <span className="size-1.5 rounded-full bg-[#62E6FF] animate-pulse" />
                <span>PHYSICAL WORKSTATION</span>
              </div>

              <div className="absolute bottom-3 right-3 z-10 px-2.5 py-1 rounded bg-[#050608]/85 border border-white/10 font-mono text-[9px] text-[#6EE7B7] backdrop-blur-md flex items-center gap-1.5">
                <span className="size-1 rounded-full bg-[#6EE7B7]" />
                <span>SHA-256 VERIFIED</span>
              </div>

              {/* Hover inspect banner */}
              <div className="absolute inset-0 bg-[#050608]/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 font-mono text-xs text-[#62E6FF] font-bold">
                <Maximize2 className="size-4" />
                <span>CLICK TO INSPECT FULL HD LAB &amp; TELEMETRY</span>
              </div>
            </div>

            {/* Right Col: Evidentiary Specs & Narrative */}
            <div className="lg:col-span-5 space-y-5">
              <div className="flex items-center gap-2 font-mono text-xs text-[#62E6FF] uppercase tracking-widest font-semibold">
                <Monitor className="size-4" />
                <span>PHYSICAL WORKBENCH ANCHOR</span>
              </div>

              <h3 className="font-display text-2xl sm:text-3xl font-bold text-foreground leading-tight">
                Where theoretical architecture meets physical reality.
              </h3>

              <p className="font-sans text-sm text-muted-foreground leading-relaxed">
                Every line of code, zero-trust security perimeter, and AI agent workflow in this portfolio was engineered from Tarik's private laboratory in India.
              </p>

              {/* 4-node breakdown list */}
              <div className="space-y-2 pt-1 font-mono text-xs">
                <div className="flex items-center justify-between p-2 rounded-lg bg-white/[0.02] border border-white/5">
                  <span className="text-[#62E6FF]">MONITOR 01:</span>
                  <span className="text-foreground text-[11px]">Neural Threat Radar &amp; Graph</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded-lg bg-white/[0.02] border border-white/5">
                  <span className="text-[#62E6FF]">MONITOR 02:</span>
                  <span className="text-foreground text-[11px]">ISO/IEC 27037 Case Evidence</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded-lg bg-white/[0.02] border border-white/5">
                  <span className="text-[#62E6FF]">MONITOR 03:</span>
                  <span className="text-foreground text-[11px]">Systems IDE Runtime &amp; Rust</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded-lg bg-white/[0.02] border border-white/5">
                  <span className="text-[#62E6FF]">MONITOR 04:</span>
                  <span className="text-foreground text-[11px]">Dezo.in Product Incubation</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => openLabLightbox(1)}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-lg border border-[#62E6FF]/40 bg-[#62E6FF]/10 hover:bg-[#62E6FF]/20 text-[#62E6FF] font-mono text-xs uppercase tracking-widest font-bold transition-all shadow-[0_0_20px_rgba(98,230,255,0.15)] cursor-pointer"
              >
                <span>INSPECT WORKBENCH (FULL HD)</span>
                <Maximize2 className="size-4" />
              </button>
            </div>
          </div>
        </div>

        {/* ==========================================
            2. INTERACTIVE 3D TECHNOLOGY UNIVERSE
        ========================================== */}
        <div className="relative mb-20 rounded-2xl border border-white/10 bg-[#12151C]/90 overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.6)]">
          {/* Top Telemetry Header */}
          <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-4 border-b border-white/10 bg-black/40 backdrop-blur-md">
            <div className="flex items-center gap-3">
              <span className="flex size-2 rounded-full bg-emerald-400 animate-ping" />
              <span className="font-mono text-xs uppercase tracking-widest text-foreground font-semibold">
                3D TECHNOLOGY ECOSYSTEM &amp; LABORATORY
              </span>
              <span className="hidden md:inline font-mono text-[10px] text-muted-foreground tracking-wider">
                [ORBITAL MATRIX: 6 CONVERGENT DISCIPLINES]
              </span>
            </div>

            {/* Convergence Trigger & Reset */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={isConverged ? resetConvergence : triggerConvergence}
                className={`flex items-center gap-2 px-3 py-1.5 rounded text-xs font-mono font-semibold transition-all cursor-pointer ${
                  isConverged
                    ? "bg-accent text-[#0A0D12] shadow-[0_0_16px_rgba(232,168,56,0.5)]"
                    : "border border-accent/50 text-accent hover:bg-accent/10"
                }`}
              >
                <Zap className="size-3.5" />
                <span>{isConverged ? "RESET LAB ORBIT" : "TRIGGER SYSTEM CONVERGENCE"}</span>
              </button>
            </div>
          </div>

          {/* Split Canvas & Cluster Dossier */}
          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[580px]">
            {/* 3D WebGL Canvas */}
            <div
              className="lg:col-span-7 relative min-h-[380px] lg:min-h-full bg-gradient-to-b from-[#0A0C10] to-[#12151C] cursor-grab active:cursor-grabbing select-none"
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerLeave={handlePointerUp}
            >
              <div ref={mountRef} className="absolute inset-0 size-full" />

              {/* HUD Telemetry Overlay */}
              <div className="absolute top-4 left-4 pointer-events-none">
                <div className="px-3 py-1.5 rounded bg-black/75 border border-white/10 font-mono text-[10px] text-muted-foreground space-y-0.5">
                  <div className="text-emerald-400 font-semibold flex items-center gap-1.5">
                    <Activity className="size-3" />
                    <span>SYSTEM TOPOLOGY // 3D SPATIAL</span>
                  </div>
                  <div>ACTIVE NODE: {currentCluster.category.toUpperCase()}</div>
                  <div>STATUS: {isConverged ? "CONVERGED SINGULARITY" : "DYNAMIC EQUILIBRIUM"}</div>
                </div>
              </div>

              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between pointer-events-none">
                <span className="font-mono text-[9px] text-muted-foreground/80 bg-black/60 px-2 py-1 rounded border border-white/5">
                  DRAG 360° · TAP TABS TO FOCUS
                </span>
                <span className="font-mono text-[9px] text-emerald-400/80 bg-black/60 px-2 py-1 rounded border border-emerald-500/20">
                  SYSTEM CONNECTIVITY: 100%
                </span>
              </div>

              {/* SIGNATURE WOW SINGULARITY OVERLAY */}
              {showTarikSingularity && (
                <div className="absolute inset-0 z-40 flex flex-col items-center justify-center p-6 bg-black/85 backdrop-blur-md animate-fade-in text-center">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-accent/40 bg-accent/10 font-mono text-xs text-accent uppercase tracking-widest mb-4">
                    <Sparkles className="size-3.5" />
                    <span>SINGULARITY COMPLETE</span>
                  </div>
                  <h3 className="font-display text-5xl sm:text-6xl md:text-7xl font-extrabold text-foreground tracking-tight mb-4 drop-shadow-[0_0_35px_rgba(232,168,56,0.4)]">
                    TARIK
                  </h3>
                  <p className="font-mono text-sm md:text-base font-bold text-accent uppercase tracking-[0.25em] mb-4">
                    ONE MIND. MULTIPLE DISCIPLINES. ONE SYSTEM.
                  </p>
                  <p className="text-muted-foreground text-sm md:text-base max-w-lg mb-8 leading-relaxed">
                    &ldquo;I build technology where intelligence, security, software, and creativity meet.&rdquo;
                  </p>
                  <div className="flex flex-wrap items-center justify-center gap-4">
                    <a
                      href="#work"
                      className="flex items-center gap-2 px-6 py-3 rounded-md bg-accent text-[#0A0D12] font-mono text-xs uppercase tracking-widest font-bold hover:bg-accent/90 transition-all shadow-[0_0_20px_rgba(232,168,56,0.4)]"
                    >
                      <span>EXPLORE VERIFIED PROJECTS</span>
                      <ArrowRight className="size-4" />
                    </a>
                    <button
                      type="button"
                      onClick={resetConvergence}
                      className="px-5 py-3 rounded-md border border-white/20 text-foreground hover:border-accent hover:text-accent font-mono text-xs uppercase tracking-widest transition-colors cursor-pointer"
                    >
                      RETURN TO WORKBENCH
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Right Side: Discipline Selector & Technology Dossier */}
            <div className="lg:col-span-5 p-6 md:p-8 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-white/10 bg-[#0E1117]/95">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-[11px] text-muted-foreground uppercase tracking-widest font-semibold">
                    EXPLORE TECHNOLOGY UNIVERSE
                  </span>
                  <span className="font-mono text-[10px] text-accent font-bold">
                    [0{selectedCluster + 1} / 06]
                  </span>
                </div>

                {/* 6 Selector Tabs */}
                <div className="grid grid-cols-6 gap-1.5 mb-6">
                  {TECH_CLUSTERS.map((clust, idx) => {
                    const isSelected = selectedCluster === idx;
                    const IconComp = clust.icon;
                    return (
                      <button
                        key={clust.id}
                        type="button"
                        onClick={() => setSelectedCluster(idx)}
                        className={`flex flex-col items-center justify-center p-2 rounded-lg border transition-all cursor-pointer ${
                          isSelected
                            ? `${clust.borderColor} bg-white/5 shadow-md`
                            : "border-white/5 bg-black/30 hover:border-white/20 text-muted-foreground"
                        }`}
                        title={clust.category}
                      >
                        <IconComp
                          className={`size-4 mb-1 ${
                            isSelected ? clust.textColor : "text-muted-foreground"
                          }`}
                        />
                        <span className="font-mono text-[9px] font-bold">0{idx + 1}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Cluster Dossier */}
                <div className="p-5 rounded-xl border border-white/10 bg-black/40 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-accent font-semibold">
                      {currentCluster.code}
                    </span>
                    <span
                      className={`font-mono text-[9px] uppercase tracking-wider px-2 py-0.5 rounded border ${currentCluster.borderColor} ${currentCluster.textColor} bg-white/5`}
                    >
                      {currentCluster.category}
                    </span>
                  </div>

                  <div>
                    <h4 className="font-display text-2xl font-bold text-foreground mb-1">
                      {currentCluster.category}
                    </h4>
                    <p className="font-mono text-xs text-muted-foreground">
                      {currentCluster.tagline}
                    </p>
                  </div>

                  <p className="text-xs md:text-sm text-muted-foreground/90 leading-relaxed border-l-2 border-accent/40 pl-3 italic">
                    &ldquo;{currentCluster.corePurpose}&rdquo;
                  </p>

                  {/* Technology Grid List */}
                  <div className="space-y-2 pt-2 border-t border-white/10">
                    <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest block">
                      CORE INSTRUMENTS &amp; CAPABILITIES:
                    </span>
                    <div className="space-y-2 max-h-[200px] overflow-y-auto pr-1">
                      {currentCluster.technologies.map((tech) => (
                        <div
                          key={tech.name}
                          className="p-2 rounded bg-white/[0.02] border border-white/5 hover:border-white/10 transition-colors"
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-mono text-xs font-bold text-foreground">
                              {tech.name}
                            </span>
                            <span
                              className={`font-mono text-[9px] px-1.5 py-0.5 rounded border ${currentCluster.borderColor} ${currentCluster.textColor}`}
                            >
                              {tech.level}
                            </span>
                          </div>
                          <p className="text-[11px] text-muted-foreground mt-0.5">
                            {tech.desc}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Next Tab Action */}
              <div className="pt-4 flex items-center justify-between border-t border-white/10">
                <button
                  type="button"
                  onClick={() =>
                    setSelectedCluster((prev) => (prev + 1) % TECH_CLUSTERS.length)
                  }
                  className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-muted-foreground hover:text-accent transition-colors cursor-pointer"
                >
                  <span>NEXT CLUSTER</span>
                  <ChevronRight className="size-4" />
                </button>
                <span className="font-mono text-[10px] text-muted-foreground">
                  FOCUS: {currentCluster.category}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ==========================================
            3. MAKE THE TOOLS COME ALIVE: ARCHITECTURE EXPLORER
        ========================================== */}
        <div className="mb-20">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <div>
              <span className="font-mono text-xs text-accent uppercase tracking-widest block mb-2">
                MAKE THE TOOLS COME ALIVE // SYSTEM SIMULATIONS
              </span>
              <h3 className="font-display text-3xl sm:text-4xl font-bold text-foreground">
                Architecture Explorer &amp; Live Data Flows.
              </h3>
            </div>
            <p className="font-mono text-xs text-muted-foreground max-w-md">
              Don&apos;t just look at logos. Experience how each system processes, protects,
              reasons, and transforms data in real time.
            </p>
          </div>

          {/* Simulation Mode Selector Bar */}
          <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-xl border border-white/10 bg-[#11151C]/80 backdrop-blur-md mb-8">
            {[
              { id: "ai", label: "01 / AI NEURAL REASONING", icon: Brain },
              { id: "cyber", label: "02 / ZERO-TRUST SHIELD", icon: ShieldCheck },
              { id: "fullstack", label: "03 / FULL-STACK PIPELINE", icon: Code2 },
              { id: "forensics", label: "04 / FORENSIC EVIDENCE CHAIN", icon: Search },
              { id: "cloud", label: "05 / CLOUD & EDGE CDN", icon: Server },
            ].map((tab) => {
              const IconComp = tab.icon;
              const isSelected = simulationMode === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => {
                    setSimulationMode(tab.id as SimulationMode);
                    setActiveSimulationStep(0);
                  }}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-lg font-mono text-xs uppercase tracking-wider transition-all cursor-pointer ${
                    isSelected
                      ? "bg-accent text-[#0A0D12] font-bold shadow-[0_0_15px_rgba(232,168,56,0.35)]"
                      : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                  }`}
                >
                  <IconComp className="size-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Active Simulation Display Box */}
          <div className="p-6 md:p-10 rounded-2xl border border-white/10 bg-[#12151C]/95 backdrop-blur-xl shadow-xl">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 mb-8 border-b border-white/10">
              <div>
                <span className="font-mono text-[10px] text-accent uppercase tracking-widest block mb-1">
                  {currentSim.category}
                </span>
                <h4 className="font-display text-2xl md:text-3xl font-bold text-foreground">
                  {currentSim.title}
                </h4>
                <p className="text-sm text-muted-foreground mt-1">{currentSim.tagline}</p>
              </div>

              {/* Live Play / Pause Button */}
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setIsSimulating(!isSimulating)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded border border-white/10 text-muted-foreground hover:text-foreground font-mono text-xs transition-colors cursor-pointer"
                >
                  {isSimulating ? <Pause className="size-3.5" /> : <Play className="size-3.5" />}
                  <span>{isSimulating ? "PAUSE FLOW" : "RESUME FLOW"}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveSimulationStep(0)}
                  className="p-1.5 rounded border border-white/10 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                  title="Reset Flow"
                >
                  <RefreshCw className="size-3.5" />
                </button>
              </div>
            </div>

            {/* Step-by-Step Interactive Flow Line */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-10">
              {currentSim.steps.map((step, idx) => {
                const isActive = activeSimulationStep === idx;
                const isPassed = activeSimulationStep > idx;
                return (
                  <div
                    key={step.title}
                    onClick={() => setActiveSimulationStep(idx)}
                    className={`p-4 rounded-xl border transition-all cursor-pointer relative ${
                      isActive
                        ? "border-accent bg-accent/10 shadow-[0_0_20px_rgba(232,168,56,0.2)]"
                        : isPassed
                          ? "border-white/20 bg-white/[0.02]"
                          : "border-white/5 bg-black/30 opacity-70"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                        STEP 0{idx + 1}
                      </span>
                      <span
                        className={`font-mono text-[9px] px-1.5 py-0.5 rounded ${
                          isActive
                            ? "bg-accent text-[#0A0D12] font-bold"
                            : "bg-white/5 text-muted-foreground"
                        }`}
                      >
                        {step.tag}
                      </span>
                    </div>
                    <h5
                      className={`font-display text-sm font-bold mb-1 ${
                        isActive ? "text-accent" : "text-foreground"
                      }`}
                    >
                      {step.title}
                    </h5>
                    <p className="text-xs text-muted-foreground leading-relaxed">{step.desc}</p>
                  </div>
                );
              })}
            </div>

            {/* Live Telemetry Readout Grid */}
            <div className="p-4 sm:p-5 rounded-xl bg-black/50 border border-white/5 grid grid-cols-2 md:grid-cols-4 gap-4">
              {currentSim.telemetry.map((item) => (
                <div key={item.label}>
                  <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest block mb-1">
                    {item.label}
                  </span>
                  <span className="font-mono text-base md:text-lg font-bold text-foreground">
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ==========================================
            4. I DON'T JUST WRITE CODE: THE 7 LAYERS
        ========================================== */}
        <div className="mb-20">
          <div className="max-w-3xl mb-12">
            <span className="font-mono text-xs text-accent uppercase tracking-widest block mb-2">
              DECONSTRUCTING THE PRODUCT
            </span>
            <h3 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
              I don&apos;t just write code. <br />
              <span className="italic font-light text-gradient-flow">
                I design the system behind it.
              </span>
            </h3>
            <p className="text-muted-foreground text-base leading-relaxed">
              A product begins as an idea. Then I break it down across seven discrete,
              interconnected architectural dimensions until it becomes something people can
              depend on with absolute reliability.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {SEVEN_LAYERS.map((layer) => (
              <div
                key={layer.name}
                className="p-6 rounded-xl border border-white/10 bg-[#12151C]/80 hover:border-accent/40 transition-all group"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-xs font-bold text-accent">
                    {layer.step} //
                  </span>
                  <span className="font-mono text-[9px] uppercase tracking-wider px-2 py-0.5 rounded bg-white/5 text-muted-foreground">
                    {layer.subtitle}
                  </span>
                </div>
                <h4 className="font-display text-xl font-bold text-foreground group-hover:text-accent transition-colors mb-2">
                  {layer.name}
                </h4>
                <p className="text-xs text-muted-foreground leading-relaxed">{layer.desc}</p>
              </div>
            ))}

            {/* 8th Card: The Integrated Synthesis */}
            <div className="p-6 rounded-xl border border-accent/40 bg-gradient-to-br from-accent/15 via-[#141824] to-black flex flex-col justify-between">
              <div>
                <span className="font-mono text-xs font-bold text-accent mb-4 block">
                  SYNTHESIS //
                </span>
                <h4 className="font-display text-xl font-bold text-foreground mb-2">
                  The Complete System
                </h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  When all seven layers align, the technology becomes defensible, intelligent, and
                  enduring.
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-accent/20 flex items-center gap-2 font-mono text-[10px] text-accent font-bold">
                <CheckCircle2 className="size-3.5" />
                <span>0 → 1 PRODUCTION READINESS</span>
              </div>
            </div>
          </div>
        </div>

        {/* ==========================================
            5. ONE SYSTEM. MULTIPLE DISCIPLINES.
        ========================================== */}
        <div className="mb-20 p-8 md:p-12 lg:p-14 rounded-2xl border border-white/10 bg-gradient-to-b from-[#12151C] to-[#0A0C10] shadow-xl">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <span className="font-mono text-xs text-accent uppercase tracking-widest block mb-2">
              THE UNIFIED ARCHITECTURE
            </span>
            <h3 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
              One System. Multiple Disciplines.
            </h3>
            <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
              Every discipline contributes a vital organ to the larger machine.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto mb-12">
            {[
              { role: "Artificial Intelligence", provides: "Intelligence & Reasoning", desc: "Allows systems to comprehend, retrieve verified ground truth, and reason autonomously.", accent: "text-emerald-400" },
              { role: "Software Engineering", provides: "Structure & Scale", desc: "Translates abstract ideas into deterministic, type-safe, fault-tolerant infrastructure.", accent: "text-amber-400" },
              { role: "Cybersecurity", provides: "Protection & Trust", desc: "Defends the architecture against adversaries from the bedrock up using zero-trust.", accent: "text-sky-400" },
              { role: "Digital Forensics", provides: "Investigative Depth", desc: "Applies empirical evidence analysis, cryptographic hashing, and chain-of-custody proof.", accent: "text-teal-300" },
              { role: "3D & Creative Design", provides: "Human Interaction", desc: "Transforms complex technical telemetry into fluid, intuitive, and evocative experiences.", accent: "text-purple-400" },
              { role: "Entrepreneurship", provides: "Purpose & Impact", desc: "Directs engineering momentum toward solving difficult real-world challenges that matter.", accent: "text-pink-400" },
            ].map((item) => (
              <div key={item.role} className="p-5 rounded-xl border border-white/5 bg-black/40">
                <span className={`font-mono text-xs font-bold uppercase tracking-wider block mb-1 ${item.accent}`}>
                  {item.role}
                </span>
                <p className="font-display text-lg font-bold text-foreground mb-2">
                  → {item.provides}
                </p>
                <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* The Way I Think Framework */}
          <div className="pt-10 border-t border-white/10 max-w-4xl mx-auto">
            <span className="font-mono text-[11px] text-accent uppercase tracking-widest text-center block mb-6">
              THE WAY I THINK // 6 CORE OPERATING AXIOMS
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-center font-mono text-xs uppercase tracking-wider">
              {[
                "Research deeply.",
                "Build intelligently.",
                "Test relentlessly.",
                "Learn from failure.",
                "Improve continuously.",
                "Turn complexity into systems.",
              ].map((axiom) => (
                <div
                  key={axiom}
                  className="p-3.5 rounded-lg border border-white/5 bg-white/[0.02] text-foreground/90 font-semibold"
                >
                  {axiom}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ==========================================
            6. THIS IS MY DIGITAL WORKBENCH ANCHOR
        ========================================== */}
        <div className="p-8 md:p-12 rounded-2xl border border-accent/30 bg-gradient-to-r from-accent/10 via-[#141824] to-[#0E1117] text-center max-w-4xl mx-auto shadow-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-accent/40 bg-accent/10 font-mono text-[11px] text-accent uppercase tracking-widest mb-6">
            <Terminal className="size-3.5" />
            <span>THE LIVING WORKBENCH</span>
          </div>

          <h3 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-6 leading-tight">
            &ldquo;This is my digital workbench.
            <br />
            <span className="text-accent italic">And I&apos;m still adding new layers.&rdquo;</span>
          </h3>

          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed">
            Not a collection of static logos. Not a list of empty buzzwords.
            <br />
            <strong className="text-foreground font-semibold">
              A connected ecosystem of technologies, ideas, and systems that I use to build things that matter.
            </strong>
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4 border-t border-white/10">
            <a
              href="#work"
              className="flex items-center gap-2 px-7 py-3.5 rounded-md bg-accent text-[#0A0D12] font-mono text-xs uppercase tracking-widest font-bold hover:bg-accent/90 transition-all shadow-[0_0_24px_rgba(232,168,56,0.35)]"
            >
              <span>INSPECT SELECTED WORK</span>
              <ArrowRight className="size-4" />
            </a>

            <button
              type="button"
              onClick={triggerConvergence}
              className="flex items-center gap-2 px-6 py-3.5 rounded-md border border-accent/50 hover:border-accent text-accent font-mono text-xs uppercase tracking-widest font-semibold transition-all cursor-pointer"
            >
              <Zap className="size-3.5" />
              <span>TRIGGER CONVERGENCE</span>
            </button>

            <a
              href="#contact"
              className="flex items-center gap-2 px-6 py-3.5 rounded-md border border-white/10 hover:border-white/30 text-muted-foreground hover:text-foreground font-mono text-xs uppercase tracking-widest transition-all"
            >
              <span>GET IN TOUCH</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
