import { useEffect, useRef, useState } from "react";

interface Node3D {
  x: number;
  y: number;
  z: number;
  baseX: number;
  baseY: number;
  baseZ: number;
  label: string;
  category: string;
  size: number;
  color: string;
}

interface Edge3D {
  from: number;
  to: number;
  alpha: number;
}

const DOMAIN_NODES = [
  { label: "AI AGENTS", category: "ai", color: "#E8A838" },
  { label: "DIGITAL FORENSICS", category: "forensics", color: "#6E8EF7" },
  { label: "ZERO TRUST", category: "cyber", color: "#22D3EE" },
  { label: "DEZO.IN", category: "venture", color: "#F0C060" },
  { label: "PYTORCH / ML", category: "ai", color: "#E8A838" },
  { label: "SHA-256 VAULT", category: "forensics", color: "#6E8EF7" },
  { label: "MEMORY FORENSICS", category: "forensics", color: "#8EAAFB" },
  { label: "THREAT INTEL", category: "cyber", color: "#22D3EE" },
  { label: "FULL STACK TS", category: "dev", color: "#F59E0B" },
  { label: "INCIDENT RESPONSE", category: "cyber", color: "#6E8EF7" },
  { label: "CRIME SCENE", category: "forensics", color: "#E8A838" },
  { label: "RAG PIPELINES", category: "ai", color: "#F0C060" },
];

export function ForensicCanvas3D({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [activeNode, setActiveNode] = useState<string | null>(null);
  const [mode, setMode] = useState<"lattice" | "hypercube" | "helix">("lattice");

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 800);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 600);

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener("resize", handleResize);

    // Mouse tracking with smooth damping
    let mouseX = 0;
    let mouseY = 0;
    let targetRotX = 0;
    let targetRotY = 0;
    let rotX = 0.2;
    let rotY = 0.3;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      mouseX = x;
      mouseY = y;
      targetRotY = (x / rect.width) * 1.5;
      targetRotX = -(y / rect.height) * 1.5;
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Generate 3D nodes on a sphere/geodesic structure
    const radius = Math.min(width, height) * 0.35;
    const count = DOMAIN_NODES.length;
    const nodes: Node3D[] = [];

    // Fibonacci sphere distribution
    const phi = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < count; i++) {
      const y = 1 - (i / (count - 1)) * 2;
      const radiusAtY = Math.sqrt(1 - y * y);
      const theta = phi * i;

      const x = Math.cos(theta) * radiusAtY;
      const z = Math.sin(theta) * radiusAtY;

      nodes.push({
        x: x * radius,
        y: y * radius,
        z: z * radius,
        baseX: x * radius,
        baseY: y * radius,
        baseZ: z * radius,
        label: DOMAIN_NODES[i].label,
        category: DOMAIN_NODES[i].category,
        size: 5,
        color: DOMAIN_NODES[i].color,
      });
    }

    // Connect edges between nearest neighbors
    const edges: Edge3D[] = [];
    for (let i = 0; i < count; i++) {
      for (let j = i + 1; j < count; j++) {
        const dx = nodes[i].baseX - nodes[j].baseX;
        const dy = nodes[i].baseY - nodes[j].baseY;
        const dz = nodes[i].baseZ - nodes[j].baseZ;
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
        if (dist < radius * 1.4) {
          edges.push({ from: i, to: j, alpha: Math.max(0.15, 1 - dist / (radius * 1.4)) });
        }
      }
    }

    // Animation Loop
    let time = 0;
    const render = () => {
      time += 0.008;
      rotX += (targetRotX - rotX) * 0.05 + 0.002;
      rotY += (targetRotY - rotY) * 0.05 + 0.004;

      ctx.clearRect(0, 0, width, height);

      const fov = 400;
      const centerX = width / 2;
      const centerY = height / 2;

      // Rotate nodes in 3D
      const cosY = Math.cos(rotY);
      const sinY = Math.sin(rotY);
      const cosX = Math.cos(rotX);
      const sinX = Math.sin(rotX);

      const projected = nodes.map((node, index) => {
        // Apply mode morphing
        let bx = node.baseX;
        let by = node.baseY;
        let bz = node.baseZ;

        if (mode === "hypercube") {
          const s = Math.sign(bx) * (radius * 0.7);
          bx = s + Math.sin(time + index) * 10;
        } else if (mode === "helix") {
          const angle = index * 0.6 + time;
          bx = Math.cos(angle) * (radius * 0.8);
          by = ((index - count / 2) / count) * radius * 1.8;
          bz = Math.sin(angle) * (radius * 0.8);
        }

        // Y-axis rotation
        let x1 = bx * cosY - bz * sinY;
        let z1 = bz * cosY + bx * sinY;

        // X-axis rotation
        let y1 = by * cosX - z1 * sinX;
        let z2 = z1 * cosX + by * sinX;

        // Perspective projection
        const scale = fov / (fov + z2 + radius * 1.2);
        const px = centerX + x1 * scale;
        const py = centerY + y1 * scale;

        return {
          px,
          py,
          scale,
          z: z2,
          color: node.color,
          label: node.label,
          category: node.category,
        };
      });

      // Draw Edges with depth gradient
      edges.forEach((edge) => {
        const p1 = projected[edge.from];
        const p2 = projected[edge.to];
        if (!p1 || !p2) return;

        const avgZ = (p1.z + p2.z) / 2;
        const alpha = Math.max(0.04, Math.min(0.4, (avgZ + radius) / (radius * 2) * edge.alpha));

        ctx.beginPath();
        ctx.moveTo(p1.px, p1.py);
        ctx.lineTo(p2.px, p2.py);
        ctx.strokeStyle = `rgba(232, 168, 56, ${alpha})`;
        ctx.lineWidth = Math.max(0.6, 1.5 * ((p1.scale + p2.scale) / 2));
        ctx.stroke();
      });

      // Sort nodes back to front for proper rendering
      const sortedIndices = projected
        .map((p, idx) => ({ ...p, idx }))
        .sort((a, b) => a.z - b.z);

      // Draw Nodes and dynamic holographic badges
      sortedIndices.forEach((p) => {
        const depthAlpha = Math.max(0.2, (p.z + radius) / (radius * 2));
        const nodeSize = Math.max(3, 7 * p.scale);

        // Glow ring
        ctx.beginPath();
        ctx.arc(p.px, p.py, nodeSize * 2.2, 0, Math.PI * 2);
        ctx.fillStyle = p.color === "#E8A838" 
          ? `rgba(232, 168, 56, ${depthAlpha * 0.25})`
          : `rgba(110, 142, 247, ${depthAlpha * 0.25})`;
        ctx.fill();

        // Node core
        ctx.beginPath();
        ctx.arc(p.px, p.py, nodeSize, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 12 * p.scale;
        ctx.fill();
        ctx.shadowBlur = 0;

        // Node labels for foreground nodes
        if (p.z > -radius * 0.4) {
          ctx.font = `${Math.max(9, Math.round(11 * p.scale))}px "IBM Plex Mono", monospace`;
          ctx.fillStyle = `rgba(237, 238, 241, ${depthAlpha * 0.9})`;
          ctx.textAlign = "center";
          ctx.fillText(p.label, p.px, p.py - nodeSize - 8);

          // Small forensic marker tag
          ctx.font = `${Math.max(7, Math.round(8 * p.scale))}px "IBM Plex Mono", monospace`;
          ctx.fillStyle = `rgba(232, 168, 56, ${depthAlpha * 0.7})`;
          ctx.fillText(`[${p.category.toUpperCase()}]`, p.px, p.py + nodeSize + 12);
        }
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [mode]);

  return (
    <div className={`relative w-full h-full min-h-[420px] lg:min-h-[560px] flex flex-col items-center justify-center select-none overflow-hidden ${className}`}>
      {/* Interactive 3D Canvas */}
      <canvas
        ref={canvasRef}
        className="w-full h-full cursor-grab active:cursor-grabbing"
      />

      {/* Cyber-Forensic Mode Controls Overlay */}
      <div className="absolute top-4 right-4 z-20 flex items-center gap-1.5 bg-[#14161C]/80 backdrop-blur-md border border-white/10 p-1.5 rounded-md font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
        <span className="px-2 text-accent text-[9px] font-semibold">3D VIEW:</span>
        {(["lattice", "hypercube", "helix"] as const).map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => setMode(m)}
            className={`px-2.5 py-1 rounded transition-all ${
              mode === m
                ? "bg-accent text-[#0C0E12] font-bold shadow-[0_0_12px_rgba(232,168,56,0.4)]"
                : "hover:text-foreground hover:bg-white/5"
            }`}
          >
            {m}
          </button>
        ))}
      </div>

      {/* Interactive Telemetry HUD bottom badge */}
      <div className="absolute bottom-4 left-4 z-20 flex items-center gap-3 bg-[#14161C]/80 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-md font-mono text-[10px] text-muted-foreground">
        <span className="relative flex size-2">
          <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-75" />
          <span className="relative inline-flex size-2 rounded-full bg-accent" />
        </span>
        <span>INTERACTIVE FORENSIC MESH · MOUSE DRIVEN</span>
      </div>
    </div>
  );
}
