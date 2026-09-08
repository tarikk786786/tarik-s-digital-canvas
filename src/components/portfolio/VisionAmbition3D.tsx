import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import {
  ShieldCheck,
  Brain,
  Cpu,
  Rocket,
  Layers,
  Sparkles,
  Zap,
  Activity,
  ArrowRight,
  RotateCcw,
  Target,
  ChevronRight,
  Shield,
  Search,
} from "lucide-react";

// ==========================================
// 5 CONVERGENT DISCIPLINES DATA
// ==========================================
interface DisciplineNode {
  id: string;
  name: string;
  code: string;
  tag: string;
  coreTruth: string;
  color: string;
  hexColor: number;
  textColor: string;
  borderColor: string;
  bgGlow: string;
  icon: React.ComponentType<{ className?: string }>;
  roleSummary: string;
  deepDive: string;
  pillars: string[];
}

const DISCIPLINES: DisciplineNode[] = [
  {
    id: "forensics",
    name: "Forensic Science",
    code: "DISC_01 // SCI_METHOD",
    tag: "EVIDENCE OVER ASSUMPTIONS",
    coreTruth: "Evidence over assumptions.",
    color: "#F59E0B", // amber-500
    hexColor: 0xf59e0b,
    textColor: "text-amber-400",
    borderColor: "border-amber-500/40 hover:border-amber-400",
    bgGlow: "rgba(245, 158, 11, 0.15)",
    icon: Search,
    roleSummary: "Rigor, Empirical Investigation, Chain of Custody",
    deepDive:
      "Forensics taught me to never assume when you can investigate. In every system, physical or digital, reality leaves an indelible signature. I apply forensic verification to software architectures, establishing mathematical proof and immutable audit trails.",
    pillars: [
      "Mathematical & cryptographic reproducibility",
      "Chain-of-custody data integrity",
      "Adversarial proof under extreme scrutiny",
    ],
  },
  {
    id: "cybersecurity",
    name: "Cybersecurity",
    code: "DISC_02 // ZERO_TRUST",
    tag: "SECURITY BY DESIGN",
    coreTruth: "Security by design.",
    color: "#38BDF8", // sky-400
    hexColor: 0x38bdf8,
    textColor: "text-sky-400",
    borderColor: "border-sky-500/40 hover:border-sky-400",
    bgGlow: "rgba(56, 189, 248, 0.15)",
    icon: ShieldCheck,
    roleSummary: "Resilience, Threat Modeling, Defensive Architecture",
    deepDive:
      "Defending systems against sophisticated adversaries from the architectural bedrock. Security is not an afterthought, a sticker, or a checklist—it dictates data flows, trust boundaries, permission primitives, and operational resilience.",
    pillars: [
      "Proactive threat surface minimization",
      "Zero-trust protocol enforcement",
      "Memory, network & identity compartmentalization",
    ],
  },
  {
    id: "ai",
    name: "Artificial Intelligence",
    code: "DISC_03 // NEURAL_REASON",
    tag: "INTELLIGENCE WITH PURPOSE",
    coreTruth: "Intelligence with purpose.",
    color: "#10B981", // emerald-500
    hexColor: 0x10b981,
    textColor: "text-emerald-400",
    borderColor: "border-emerald-500/40 hover:border-emerald-400",
    bgGlow: "rgba(16, 185, 129, 0.15)",
    icon: Brain,
    roleSummary: "Reasoning Systems, Verified Knowledge, Autonomous Agents",
    deepDive:
      "Engineering intelligence that reasons, retrieves grounded ground truth, automates high-cognitive workflows, and amplifies human capability. I reject vanity hype to build robust AI agents backed by verifiable source citations.",
    pillars: [
      "Deterministic agentic reasoning loops",
      "Source-grounded RAG & vector synthesis",
      "High-throughput low-latency inference pipelines",
    ],
  },
  {
    id: "engineering",
    name: "Software Engineering",
    code: "DISC_04 // SYS_ARCH",
    tag: "TURN IDEAS INTO SYSTEMS",
    coreTruth: "Turn ideas into systems.",
    color: "#6366F1", // indigo-500
    hexColor: 0x6366f1,
    textColor: "text-indigo-400",
    borderColor: "border-indigo-500/40 hover:border-indigo-400",
    bgGlow: "rgba(99, 102, 241, 0.15)",
    icon: Cpu,
    roleSummary: "Distributed Systems, High Reliability, Production Craft",
    deepDive:
      "Architecting clean, scalable, fault-tolerant platforms. Translating abstract mathematical constructs into production systems that execute with sub-millisecond precision, audit-grade logging, and bulletproof reliability.",
    pillars: [
      "0 → 1 end-to-end full-stack architectures",
      "Fault-tolerant distributed execution",
      "Refined user experience and interface engineering",
    ],
  },
  {
    id: "entrepreneurship",
    name: "Entrepreneurship",
    code: "DISC_05 // VENTURE_01",
    tag: "BUILD. SCALE. CREATE VALUE.",
    coreTruth: "Build. Scale. Create value.",
    color: "#EC4899", // pink-500
    hexColor: 0xec4899,
    textColor: "text-pink-400",
    borderColor: "border-pink-500/40 hover:border-pink-400",
    bgGlow: "rgba(236, 72, 153, 0.15)",
    icon: Rocket,
    roleSummary: "Product-Market Fit, Ecosystem Creation, Sustainable Impact",
    deepDive:
      "The vehicle for impact. Taking an idea from zero to one, assembling the operational infrastructure, identifying real market friction, and scaling defensible businesses that deliver compounding value to real organizations.",
    pillars: [
      "High-impact 0 → 1 venture incubation",
      "Defensible economic & intellectual moats",
      "Long-term systems solving difficult human challenges",
    ],
  },
];

const FUTURE_ECOSYSTEM_CARDS = [
  {
    code: "PILLAR // 01",
    title: "Ecosystems Over Single Apps",
    subtitle: "SYSTEMIC THINKING",
    desc: "My ambition is not limited to creating another application. I want to build self-reinforcing technology ecosystems where intelligence, security, data pipelines, and products integrate into an unassailable whole.",
    accent: "text-amber-400",
    border: "border-amber-500/20 hover:border-amber-400/50",
    icon: Layers,
  },
  {
    code: "PILLAR // 02",
    title: "Defensible Intelligence",
    subtitle: "FORENSIC × AI HYBRID",
    desc: "Combining forensic science with machine intelligence. When neural systems are bound by chain-of-custody verification, hallucination disappears, leaving audit-grade, defensible AI that enterprises can legally stake their future on.",
    accent: "text-sky-400",
    border: "border-sky-500/20 hover:border-sky-400/50",
    icon: Shield,
  },
  {
    code: "PILLAR // 03",
    title: "Enduring Value Over Vanity Hype",
    subtitle: "DECADE HORIZON",
    desc: "I am not interested in short-term hype cycles, ephemeral viral gadgets, or vanity metrics. I focus on building things that last—systems that protect human agency, empower organizations, and reveal truth under pressure.",
    accent: "text-emerald-400",
    border: "border-emerald-500/20 hover:border-emerald-400/50",
    icon: Target,
  },
  {
    code: "PILLAR // 04",
    title: "0 → 1 Venture Execution",
    subtitle: "FOUNDER VELOCITY",
    desc: "The ability to conceptualize, engineer the underlying protocols, protect the IP, assemble the product experience, and commercialize. Bridging the rare gap between deep technical depth and commercial instinct.",
    accent: "text-pink-400",
    border: "border-pink-500/20 hover:border-pink-400/50",
    icon: Rocket,
  },
];

export function VisionAmbition3D() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [activeDiscipline, setActiveDiscipline] = useState<number>(0);
  const [converged, setConverged] = useState<boolean>(false);
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [webglSupported, setWebglSupported] = useState<boolean>(true);
  const [fpsCount, setFpsCount] = useState<number>(60);

  // References for Three.js control outside React render loop
  const sceneStateRef = useRef<{
    scene?: THREE.Scene;
    camera?: THREE.PerspectiveCamera;
    renderer?: THREE.WebGLRenderer;
    coreGroup?: THREE.Group;
    nodesGroup?: THREE.Group;
    ringsGroup?: THREE.Group;
    particlesMesh?: THREE.Points;
    nodeMeshes: THREE.Group[];
    beamLines: THREE.Line[];
    targetCameraPos: THREE.Vector3;
    currentCameraPos: THREE.Vector3;
    targetLookAt: THREE.Vector3;
    currentLookAt: THREE.Vector3;
    convergedAmount: number; // 0 (expanded) to 1 (converged)
    targetConvergence: number;
    activeNodeIndex: number;
    isIntersecting: boolean;
    reqId: number;
  }>({
    nodeMeshes: [],
    beamLines: [],
    targetCameraPos: new THREE.Vector3(0, 2, 12),
    currentCameraPos: new THREE.Vector3(0, 2, 16),
    targetLookAt: new THREE.Vector3(0, 0, 0),
    currentLookAt: new THREE.Vector3(0, 0, 0),
    convergedAmount: 0,
    targetConvergence: 0,
    activeNodeIndex: 0,
    isIntersecting: false,
    reqId: 0,
  });

  // Update convergence target when state changes
  useEffect(() => {
    sceneStateRef.current.targetConvergence = converged ? 1 : 0;
  }, [converged]);

  // Update active node target in Three.js scene
  useEffect(() => {
    sceneStateRef.current.activeNodeIndex = activeDiscipline;
    if (!converged) {
      // Position camera slightly toward the selected discipline
      const angle = (activeDiscipline / DISCIPLINES.length) * Math.PI * 2;
      const radius = 5.2;
      const nx = Math.cos(angle) * radius;
      const nz = Math.sin(angle) * radius;
      sceneStateRef.current.targetCameraPos.set(nx * 1.4, 2.2, nz * 1.4 + 4.5);
      sceneStateRef.current.targetLookAt.set(nx * 0.35, 0, nz * 0.35);
    } else {
      // Zoom in centered on singularity
      sceneStateRef.current.targetCameraPos.set(0, 1.2, 8.5);
      sceneStateRef.current.targetLookAt.set(0, 0, 0);
    }
  }, [activeDiscipline, converged]);

  // ==========================================
  // THREE.JS INITIALIZATION & SCENE GRAPH
  // ==========================================
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Check WebGL availability
    try {
      const testCanvas = document.createElement("canvas");
      const hasGl = !!(
        window.WebGLRenderingContext &&
        (testCanvas.getContext("webgl") ||
          testCanvas.getContext("experimental-webgl"))
      );
      if (!hasGl) {
        setWebglSupported(false);
        return;
      }
    } catch {
      setWebglSupported(false);
      return;
    }

    const width = container.clientWidth || 800;
    const height = container.clientHeight || 550;

    // SCENE & CAMERA
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0a0c10, 0.035);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 2, 14);
    camera.lookAt(0, 0, 0);

    // RENDERER
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

    // ==========================================
    // 1. CENTRAL INTELLIGENCE CORE
    // ==========================================
    const coreGroup = new THREE.Group();
    scene.add(coreGroup);

    // A. Inner Golden Octahedron / Singularity
    const innerGeom = new THREE.OctahedronGeometry(1.2, 1);
    const innerMat = new THREE.MeshStandardMaterial({
      color: 0xe8a838,
      emissive: 0x805210,
      emissiveIntensity: 0.8,
      wireframe: true,
      roughness: 0.2,
      metalness: 0.9,
    });
    const innerCoreMesh = new THREE.Mesh(innerGeom, innerMat);
    coreGroup.add(innerCoreMesh);

    // B. Inner Solid Singularity Gem
    const gemGeom = new THREE.IcosahedronGeometry(0.65, 0);
    const gemMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      emissive: 0xe8a838,
      emissiveIntensity: 1.2,
      roughness: 0.1,
      metalness: 1.0,
    });
    const gemMesh = new THREE.Mesh(gemGeom, gemMat);
    coreGroup.add(gemMesh);

    // C. Outer Geodesic Telemetry Shell
    const outerGeom = new THREE.IcosahedronGeometry(2.4, 1);
    const outerMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      wireframe: true,
      transparent: true,
      opacity: 0.22,
    });
    const outerShellMesh = new THREE.Mesh(outerGeom, outerMat);
    coreGroup.add(outerShellMesh);

    // D. Gyroscopic Telemetry Rings
    const ringsGroup = new THREE.Group();
    coreGroup.add(ringsGroup);

    const ringColors = [0xe8a838, 0x38bdf8, 0xec4899];
    const ringRadii = [2.0, 2.7, 3.3];
    const rings: THREE.Mesh[] = [];

    ringRadii.forEach((rad, idx) => {
      const ringGeom = new THREE.TorusGeometry(rad, 0.018, 16, 120);
      const ringMat = new THREE.MeshBasicMaterial({
        color: ringColors[idx % ringColors.length],
        transparent: true,
        opacity: 0.45 - idx * 0.08,
      });
      const ring = new THREE.Mesh(ringGeom, ringMat);
      ring.rotation.x = Math.PI / (2 + idx * 0.5);
      ring.rotation.y = idx * 0.7;
      ringsGroup.add(ring);
      rings.push(ring);
    });

    // ==========================================
    // 2. CONVERGENT DISCIPLINE SATELLITE NODES
    // ==========================================
    const nodesGroup = new THREE.Group();
    scene.add(nodesGroup);

    const nodeMeshes: THREE.Group[] = [];
    const beamLines: THREE.Line[] = [];
    const baseRadius = 5.2;

    DISCIPLINES.forEach((disc, idx) => {
      const angle = (idx / DISCIPLINES.length) * Math.PI * 2;
      const x = Math.cos(angle) * baseRadius;
      const z = Math.sin(angle) * baseRadius;
      const y = idx % 2 === 0 ? 0.35 : -0.35;

      const satellite = new THREE.Group();
      satellite.position.set(x, y, z);

      // Node Geometry: Diamond crystal
      const nodeGeom = new THREE.OctahedronGeometry(0.5, 0);
      const nodeMat = new THREE.MeshStandardMaterial({
        color: disc.hexColor,
        emissive: disc.hexColor,
        emissiveIntensity: 0.6,
        roughness: 0.2,
        metalness: 0.8,
      });
      const nodeMesh = new THREE.Mesh(nodeGeom, nodeMat);
      satellite.add(nodeMesh);

      // Node orbital halo ring
      const haloGeom = new THREE.TorusGeometry(0.85, 0.015, 12, 60);
      const haloMat = new THREE.MeshBasicMaterial({
        color: disc.hexColor,
        transparent: true,
        opacity: 0.55,
      });
      const haloMesh = new THREE.Mesh(haloGeom, haloMat);
      haloMesh.rotation.x = Math.PI / 2;
      satellite.add(haloMesh);

      nodesGroup.add(satellite);
      nodeMeshes.push(satellite);

      // Laser Lattice Energy Beam connecting Node to Core
      const linePositions = new Float32Array([0, 0, 0, x, y, z]);
      const lineColors = new Float32Array([
        0.9, 0.7, 0.2, // Core side amber
        ((disc.hexColor >> 16) & 255) / 255,
        ((disc.hexColor >> 8) & 255) / 255,
        (disc.hexColor & 255) / 255,
      ]);

      const lineGeom = new THREE.BufferGeometry();
      lineGeom.setAttribute(
        "position",
        new THREE.BufferAttribute(linePositions, 3)
      );
      lineGeom.setAttribute(
        "color",
        new THREE.BufferAttribute(lineColors, 3)
      );

      const lineMat = new THREE.LineBasicMaterial({
        vertexColors: true,
        transparent: true,
        opacity: 0.35,
      });
      const beamLine = new THREE.Line(lineGeom, lineMat);
      scene.add(beamLine);
      beamLines.push(beamLine);
    });

    // ==========================================
    // 3. AMBIENT PARTICLES & TELEMETRY CLOUD
    // ==========================================
    const particleCount = 750;
    const particlePositions = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      const pRad = 1.5 + Math.random() * 9.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      particlePositions[i3] = pRad * Math.sin(phi) * Math.cos(theta);
      particlePositions[i3 + 1] = pRad * Math.sin(phi) * Math.sin(theta);
      particlePositions[i3 + 2] = pRad * Math.cos(phi);

      // Color spectrum: Amber, sky, pink
      const rnd = Math.random();
      if (rnd < 0.45) {
        particleColors[i3] = 0.91;
        particleColors[i3 + 1] = 0.66;
        particleColors[i3 + 2] = 0.22; // Amber
      } else if (rnd < 0.75) {
        particleColors[i3] = 0.22;
        particleColors[i3 + 1] = 0.74;
        particleColors[i3 + 2] = 0.97; // Sky
      } else {
        particleColors[i3] = 0.92;
        particleColors[i3 + 1] = 0.28;
        particleColors[i3 + 2] = 0.6; // Pink
      }
    }

    const particleGeom = new THREE.BufferGeometry();
    particleGeom.setAttribute(
      "position",
      new THREE.BufferAttribute(particlePositions, 3)
    );
    particleGeom.setAttribute(
      "color",
      new THREE.BufferAttribute(particleColors, 3)
    );

    const particleMat = new THREE.PointsMaterial({
      size: 0.045,
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
    });
    const particlesMesh = new THREE.Points(particleGeom, particleMat);
    scene.add(particlesMesh);

    // ==========================================
    // 4. LIGHTING & ENVIRONMENT
    // ==========================================
    const ambientLight = new THREE.AmbientLight(0x0f172a, 1.8);
    scene.add(ambientLight);

    const goldLight = new THREE.PointLight(0xe8a838, 3.2, 20);
    goldLight.position.set(0, 0, 0);
    scene.add(goldLight);

    const cyberLight = new THREE.DirectionalLight(0x38bdf8, 1.4);
    cyberLight.position.set(6, 8, 8);
    scene.add(cyberLight);

    const purpleFill = new THREE.PointLight(0xec4899, 1.8, 18);
    purpleFill.position.set(-6, -4, -4);
    scene.add(purpleFill);

    // Store objects in state ref
    const s = sceneStateRef.current;
    s.scene = scene;
    s.camera = camera;
    s.renderer = renderer;
    s.coreGroup = coreGroup;
    s.nodesGroup = nodesGroup;
    s.ringsGroup = ringsGroup;
    s.particlesMesh = particlesMesh;
    s.nodeMeshes = nodeMeshes;
    s.beamLines = beamLines;

    // ==========================================
    // 5. INTERSECTION OBSERVER FOR RAF PERFORMANCE
    // ==========================================
    const observer = new IntersectionObserver(
      ([entry]) => {
        s.isIntersecting = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    // ==========================================
    // 6. RENDER LOOP WITH CONVERGENCE INTERPOLATION
    // ==========================================
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

      // Smooth convergence interpolation
      s.convergedAmount += (s.targetConvergence - s.convergedAmount) * 0.06;

      // Rotate central core
      if (innerCoreMesh) {
        innerCoreMesh.rotation.y += (0.6 + s.convergedAmount * 2.2) * delta;
        innerCoreMesh.rotation.x += 0.3 * delta;
      }
      if (gemMesh) {
        gemMesh.rotation.y -= (0.9 + s.convergedAmount * 3.5) * delta;
        gemMesh.rotation.z += 0.4 * delta;
      }
      if (outerShellMesh) {
        outerShellMesh.rotation.y += 0.15 * delta;
        outerShellMesh.rotation.z -= 0.1 * delta;
        const scaleVal = 1 + s.convergedAmount * 0.45;
        coreGroup.scale.set(scaleVal, scaleVal, scaleVal);
      }

      // Rotate gyroscopic rings
      rings.forEach((ring, idx) => {
        ring.rotation.z += (0.4 + idx * 0.25 + s.convergedAmount * 1.5) * delta;
        ring.rotation.x += (0.2 + idx * 0.15) * delta;
      });

      // Update Satellites position based on convergence
      nodeMeshes.forEach((sat, idx) => {
        const baseAngle = (idx / DISCIPLINES.length) * Math.PI * 2;
        const orbitSpeed = autoRotate ? 0.25 : 0.05;
        const currentAngle = baseAngle + now * 0.00035 * orbitSpeed;

        // When converged, nodes collapse into core radius 1.35
        const targetRad = THREE.MathUtils.lerp(baseRadius, 1.35, s.convergedAmount);
        const nx = Math.cos(currentAngle) * targetRad;
        const nz = Math.sin(currentAngle) * targetRad;
        const ny = Math.sin(now * 0.0015 + idx) * (0.35 * (1 - s.convergedAmount));

        sat.position.set(nx, ny, nz);
        sat.rotation.y += 1.2 * delta;

        // Scale satellite down when merged
        const satScale = THREE.MathUtils.lerp(1.0, 0.45, s.convergedAmount);
        sat.scale.set(satScale, satScale, satScale);

        // Update connecting beam lines
        const beam = beamLines[idx];
        if (beam) {
          const posAttr = beam.geometry.getAttribute(
            "position"
          ) as THREE.BufferAttribute;
          posAttr.setXYZ(0, 0, 0, 0); // Core
          posAttr.setXYZ(1, nx, ny, nz); // Satellite
          posAttr.needsUpdate = true;

          const mat = beam.material as THREE.LineBasicMaterial;
          mat.opacity = THREE.MathUtils.lerp(0.25, 0.85, s.convergedAmount);
        }
      });

      // Ambient particles slow orbit
      if (particlesMesh) {
        particlesMesh.rotation.y += 0.05 * delta;
      }

      renderer.render(scene, camera);
    };

    s.reqId = requestAnimationFrame(animate);

    // RESIZE LISTENER
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);

    // CLEANUP
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
  }, [autoRotate]);

  // Pointer drag inspection
  const isDragging = useRef(false);
  const prevPointerPos = useRef({ x: 0, y: 0 });

  const handlePointerDown = (e: React.PointerEvent) => {
    isDragging.current = true;
    prevPointerPos.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current) return;
    const dx = e.clientX - prevPointerPos.current.x;
    const dy = e.clientY - prevPointerPos.current.y;
    prevPointerPos.current = { x: e.clientX, y: e.clientY };

    const s = sceneStateRef.current;
    if (s.camera) {
      const spherical = new THREE.Spherical();
      spherical.setFromVector3(s.targetCameraPos);
      spherical.theta -= dx * 0.006;
      spherical.phi = Math.max(
        0.2,
        Math.min(Math.PI - 0.2, spherical.phi - dy * 0.006)
      );
      s.targetCameraPos.setFromSpherical(spherical);
    }
  };

  const handlePointerUp = () => {
    isDragging.current = false;
  };

  const currentDiscipline = DISCIPLINES[activeDiscipline];

  return (
    <section
      id="vision"
      className="relative py-28 md:py-36 px-6 md:px-12 lg:px-16 border-b border-white/5 bg-[#0C0E12] overflow-hidden"
    >
      {/* Subtle ambient lighting spots */}
      <div className="absolute top-1/4 left-10 size-[32rem] rounded-full blur-3xl opacity-15 bg-radial from-amber-500/20 to-transparent pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 size-[36rem] rounded-full blur-3xl opacity-10 bg-radial from-sky-500/20 to-transparent pointer-events-none" />

      <div className="relative max-w-[1600px] mx-auto">
        {/* ==========================================
            1. SECTION HEADER: MANIFESTO & PHILOSOPHY
        ========================================== */}
        <div className="mb-14">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs text-accent uppercase tracking-widest px-2.5 py-1 rounded border border-accent/30 bg-accent/10">
                PART 03 // AMBITION MATRIX
              </span>
              <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-[0.25em]">
                0 → 1 CONVERGENCE ARCHITECTURE
              </span>
            </div>

            {/* Telemetry Indicator */}
            <div className="flex items-center gap-4 text-xs font-mono text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-emerald-400 font-semibold">ENGINE ONLINE</span>
              </div>
              <span className="text-white/20">|</span>
              <span>RENDER: {fpsCount} FPS</span>
            </div>
          </div>

          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground mb-6">
            My Vision &amp; Ambition.
          </h2>

          <div className="max-w-4xl space-y-4">
            <p className="font-display text-2xl md:text-3xl lg:text-4xl text-foreground font-semibold tracking-tight leading-snug">
              I don&apos;t want to spend my life simply consuming technology.{" "}
              <span className="text-accent italic font-light">
                I want to build it.
              </span>
            </p>
            <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
              My long-term vision is to become a high-impact entrepreneur and
              technology builder—someone capable of taking an idea from{" "}
              <span className="text-foreground font-semibold">0 → 1</span>,
              turning it into a real product, building the technology behind it,
              protecting it from adversaries, and scaling it into defensible,
              compounding ecosystems.
            </p>
          </div>
        </div>

        {/* ==========================================
            2. THE 3D INTERACTIVE INTELLIGENCE CORE
        ========================================== */}
        <div className="relative mb-20 rounded-2xl border border-white/10 bg-[#12151C]/90 overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
          {/* Top HUD Telemetry Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-4 border-b border-white/10 bg-black/40 backdrop-blur-md">
            <div className="flex items-center gap-3">
              <span className="flex size-2 rounded-full bg-accent animate-ping" />
              <span className="font-mono text-xs uppercase tracking-widest text-foreground font-semibold">
                PROCEDURAL INTELLIGENCE CORE
              </span>
              <span className="hidden sm:inline font-mono text-[10px] text-muted-foreground tracking-wider">
                [ORBITAL SYMMETRY: PENTAGONAL // 5 NODES]
              </span>
            </div>

            {/* Controls Bar */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setConverged(!converged)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded text-xs font-mono font-semibold transition-all cursor-pointer ${
                  converged
                    ? "bg-accent text-[#0C0E12] shadow-[0_0_15px_rgba(232,168,56,0.4)]"
                    : "border border-accent/40 text-accent hover:bg-accent/10"
                }`}
              >
                <Zap className="size-3.5" />
                <span>
                  {converged ? "SINGULARITY CONVERGED" : "TRIGGER CONVERGENCE"}
                </span>
              </button>

              <button
                type="button"
                onClick={() => setAutoRotate(!autoRotate)}
                className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded border border-white/10 text-muted-foreground hover:text-foreground text-xs font-mono transition-colors cursor-pointer"
                title="Toggle Auto Rotation"
              >
                <RotateCcw className="size-3.5" />
                <span>{autoRotate ? "ORBIT ON" : "ORBIT PAUSED"}</span>
              </button>
            </div>
          </div>

          {/* Canvas + Interactive Panel Split View */}
          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[560px]">
            {/* 3D WebGL Canvas Viewport */}
            <div
              className="lg:col-span-7 relative min-h-[360px] lg:min-h-full bg-gradient-to-b from-[#0A0C10] to-[#12151C] cursor-grab active:cursor-grabbing select-none"
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerLeave={handlePointerUp}
            >
              {/* WebGL Canvas Target */}
              <div ref={mountRef} className="absolute inset-0 size-full" />

              {/* WebGL Fallback if hardware acceleration unavailable */}
              {!webglSupported && (
                <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center bg-[#0C0E12]">
                  <div className="p-4 rounded-full border border-amber-500/40 bg-amber-500/10 text-amber-400 mb-4">
                    <Activity className="size-8" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-foreground mb-2">
                    Procedural Core Initialized
                  </h3>
                  <p className="text-sm text-muted-foreground max-w-sm">
                    5-discipline convergence simulation active. High-dimensional
                    mathematical model ready.
                  </p>
                </div>
              )}

              {/* In-Canvas Telemetry HUD Overlays */}
              <div className="absolute top-4 left-4 pointer-events-none">
                <div className="px-3 py-1.5 rounded bg-black/70 border border-white/10 font-mono text-[10px] text-muted-foreground space-y-0.5">
                  <div className="text-accent font-semibold flex items-center gap-1.5">
                    <Activity className="size-3" />
                    <span>COORDINATES // 3D MATRIX</span>
                  </div>
                  <div>FOCUS: {currentDiscipline.name.toUpperCase()}</div>
                  <div>STATUS: {converged ? "CONVERGED STATE" : "ORBITAL HARMONY"}</div>
                </div>
              </div>

              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between pointer-events-none">
                <span className="font-mono text-[9px] text-muted-foreground/80 bg-black/60 px-2 py-1 rounded border border-white/5">
                  DRAG TO ROTATE 360° · TAP NODES TO FOCUS
                </span>
                <span className="font-mono text-[9px] text-accent/80 bg-black/60 px-2 py-1 rounded border border-accent/20">
                  {converged ? "HARMONIC ENERGY: 100%" : "DISPERSION INDEX: NOMINAL"}
                </span>
              </div>
            </div>

            {/* Right Side: Discipline Selector & Detailed Dossier */}
            <div className="lg:col-span-5 p-6 md:p-8 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-white/10 bg-[#0E1117]/95">
              {/* Discipline Switcher Tabs */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-[11px] text-muted-foreground uppercase tracking-widest font-semibold">
                    CONVERGENT DISCIPLINES (5)
                  </span>
                  <span className="font-mono text-[10px] text-accent font-bold">
                    [0{activeDiscipline + 1} / 05]
                  </span>
                </div>

                <div className="grid grid-cols-5 gap-2 mb-6">
                  {DISCIPLINES.map((disc, idx) => {
                    const isSelected = activeDiscipline === idx;
                    const IconComp = disc.icon;
                    return (
                      <button
                        key={disc.id}
                        type="button"
                        onClick={() => {
                          setActiveDiscipline(idx);
                          setConverged(false);
                        }}
                        className={`flex flex-col items-center justify-center p-2.5 rounded-lg border transition-all cursor-pointer ${
                          isSelected
                            ? `${disc.borderColor} bg-white/5 shadow-md`
                            : "border-white/5 bg-black/30 hover:border-white/20 text-muted-foreground"
                        }`}
                        title={disc.name}
                      >
                        <IconComp
                          className={`size-4 mb-1 ${
                            isSelected ? disc.textColor : "text-muted-foreground"
                          }`}
                        />
                        <span className="font-mono text-[9px] font-bold">
                          0{idx + 1}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Selected Discipline Dossier */}
                <div className="p-5 rounded-xl border border-white/10 bg-black/40 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-accent font-semibold">
                      {currentDiscipline.code}
                    </span>
                    <span
                      className={`font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 rounded border ${currentDiscipline.borderColor} ${currentDiscipline.textColor} bg-white/5`}
                    >
                      {currentDiscipline.tag}
                    </span>
                  </div>

                  <div>
                    <h4 className="font-display text-2xl font-bold text-foreground mb-1">
                      {currentDiscipline.name}
                    </h4>
                    <p className="font-mono text-xs text-muted-foreground">
                      {currentDiscipline.roleSummary}
                    </p>
                  </div>

                  <p className="text-xs md:text-sm text-muted-foreground/90 leading-relaxed border-l-2 border-accent/40 pl-3 italic">
                    &ldquo;{currentDiscipline.deepDive}&rdquo;
                  </p>

                  <div className="space-y-2 pt-2 border-t border-white/10">
                    <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest">
                      SYSTEM CAPABILITIES:
                    </span>
                    <ul className="space-y-1.5">
                      {currentDiscipline.pillars.map((pil, pIdx) => (
                        <li
                          key={pIdx}
                          className="flex items-start gap-2 text-xs text-foreground/80 font-mono"
                        >
                          <span
                            className={`size-1.5 rounded-full mt-1.5 shrink-0 ${currentDiscipline.textColor}`}
                            style={{ backgroundColor: currentDiscipline.color }}
                          />
                          <span>{pil}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Next Discipline Quick Action */}
              <div className="pt-6 flex items-center justify-between border-t border-white/10">
                <button
                  type="button"
                  onClick={() => {
                    const next = (activeDiscipline + 1) % DISCIPLINES.length;
                    setActiveDiscipline(next);
                    setConverged(false);
                  }}
                  className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-muted-foreground hover:text-accent transition-colors cursor-pointer"
                >
                  <span>NEXT DISCIPLINE</span>
                  <ChevronRight className="size-4" />
                </button>

                <div className="font-mono text-[10px] text-muted-foreground">
                  FOCUS: {currentDiscipline.name}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ==========================================
            3. THE CONVERGENCE STATEMENT BANNER
        ========================================== */}
        <div className="relative mb-20 p-8 md:p-12 lg:p-14 rounded-2xl border border-accent/30 bg-gradient-to-r from-accent/10 via-[#12151C] to-sky-500/10 overflow-hidden">
          <div className="relative z-10 max-w-4xl">
            <div className="flex items-center gap-2 font-mono text-xs text-accent uppercase tracking-widest mb-3">
              <Sparkles className="size-4" />
              <span>THE CONVERGENCE IMPERATIVE</span>
            </div>

            <h3 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-foreground leading-snug mb-4">
              When these five disciplines come together, technology becomes
              something more than functional.
            </h3>

            <p className="font-display text-xl sm:text-2xl text-accent font-semibold tracking-tight leading-relaxed mb-6">
              It becomes defensible, intelligent, and transformative.
            </p>

            <p className="text-muted-foreground text-sm md:text-base leading-relaxed max-w-3xl">
              I believe the greatest opportunities in the next two decades will
              not come from siloed practitioners, but from builders who can
              synthesize forensic rigor with machine intelligence, robust
              security protocols, architectural engineering, and decisive venture
              execution.
            </p>
          </div>
        </div>

        {/* ==========================================
            4. THE FUTURE WORLD & AMBITION BENTO
        ========================================== */}
        <div className="mb-20">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <div>
              <span className="font-mono text-xs text-accent uppercase tracking-widest block mb-2">
                WHAT I AM BUILDING TOWARD
              </span>
              <h3 className="font-display text-3xl sm:text-4xl font-bold text-foreground">
                The Future Technological Blueprint.
              </h3>
            </div>
            <p className="font-mono text-xs text-muted-foreground max-w-md">
              A technology-driven entrepreneurial ecosystem where intelligence,
              security, and engineering create lasting value.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {FUTURE_ECOSYSTEM_CARDS.map((card, idx) => {
              const IconComp = card.icon;
              return (
                <div
                  key={idx}
                  className={`p-8 rounded-xl border bg-[#12151C]/80 backdrop-blur-sm transition-all duration-300 ${card.border}`}
                >
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                      {card.code}
                    </span>
                    <div className={`p-2.5 rounded-lg bg-white/5 ${card.accent}`}>
                      <IconComp className="size-5" />
                    </div>
                  </div>

                  <span className="font-mono text-xs font-semibold tracking-wider text-muted-foreground uppercase block mb-1">
                    {card.subtitle}
                  </span>
                  <h4 className="font-display text-2xl font-bold text-foreground mb-3">
                    {card.title}
                  </h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {card.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* ==========================================
            5. FINAL MANIFESTO & HORIZON STATEMENT
        ========================================== */}
        <div className="relative p-8 md:p-12 rounded-2xl border border-white/10 bg-gradient-to-b from-[#141824] to-[#0D1017] text-center max-w-4xl mx-auto shadow-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-accent/40 bg-accent/10 font-mono text-[11px] text-accent uppercase tracking-widest mb-6">
            <Target className="size-3.5" />
            <span>HORIZON DESTINATION</span>
          </div>

          <h3 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-6 leading-tight">
            &ldquo;I&apos;m not claiming that I&apos;ve reached the destination.
            <br />
            <span className="text-accent italic">I&apos;m building toward it.&rdquo;</span>
          </h3>

          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed">
            This portfolio is not just a reflection of what I’ve done so far.
            <br />
            <strong className="text-foreground font-semibold">
              It’s a blueprint of where I’m going.
            </strong>
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4 border-t border-white/10">
            <a
              href="#work"
              className="flex items-center gap-2 px-6 py-3 rounded-md bg-accent text-[#0C0E12] font-mono text-xs uppercase tracking-widest font-bold hover:bg-accent/90 transition-all shadow-[0_0_20px_rgba(232,168,56,0.3)]"
            >
              <span>EXPLORE SELECTED WORK</span>
              <ArrowRight className="size-4" />
            </a>

            <a
              href="https://dezo.in"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 rounded-md border border-white/20 hover:border-accent text-foreground hover:text-accent font-mono text-xs uppercase tracking-widest font-semibold transition-all"
            >
              <span>DEZO.IN PRODUCT STUDIO ↗</span>
            </a>

            <a
              href="#contact"
              className="flex items-center gap-2 px-6 py-3 rounded-md border border-white/10 hover:border-white/30 text-muted-foreground hover:text-foreground font-mono text-xs uppercase tracking-widest transition-all"
            >
              <span>GET IN TOUCH</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
