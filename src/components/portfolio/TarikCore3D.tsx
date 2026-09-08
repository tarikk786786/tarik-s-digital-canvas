import { useEffect, useRef } from "react";
import * as THREE from "three";
import { getDirectorMode } from "@/lib/director-mode";

interface TarikCore3DProps {
  className?: string;
  size?: number; // size in px or relative
}

export function TarikCore3D({ className = "" }: TarikCore3DProps) {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const isVisibleRef = useRef(true);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const mode = getDirectorMode();
    if (mode === "minimal") {
      // In minimal mode, render a clean SVG fallback
      return;
    }

    const width = container.clientWidth || 400;
    const height = container.clientHeight || 400;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 6;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: mode !== "performance",
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, mode === "performance" ? 1 : 2));
    container.appendChild(renderer.domElement);

    // 2. Signature Core Group
    const coreGroup = new THREE.Group();
    scene.add(coreGroup);

    // Outer Crystalline Shell: Wireframe Icosahedron
    const outerGeo = new THREE.IcosahedronGeometry(2.0, 1);
    const outerMat = new THREE.MeshBasicMaterial({
      color: 0x62e6ff, // Electric Cyan
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });
    const outerMesh = new THREE.Mesh(outerGeo, outerMat);
    coreGroup.add(outerMesh);

    // Inner Gyroscopic Ring 1 (Electric Cyan)
    const ring1Geo = new THREE.TorusGeometry(1.6, 0.02, 16, 100);
    const ring1Mat = new THREE.MeshBasicMaterial({
      color: 0x62e6ff,
      transparent: true,
      opacity: 0.8,
    });
    const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
    coreGroup.add(ring1);

    // Inner Gyroscopic Ring 2 (Soft Violet)
    const ring2Geo = new THREE.TorusGeometry(1.3, 0.02, 16, 100);
    const ring2Mat = new THREE.MeshBasicMaterial({
      color: 0x9b8cff,
      transparent: true,
      opacity: 0.75,
    });
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2.rotation.x = Math.PI / 2;
    coreGroup.add(ring2);

    // Neural Network Center: Synaptic Nodes
    const nodeCount = 36;
    const nodePositions = new Float32Array(nodeCount * 3);
    for (let i = 0; i < nodeCount; i++) {
      const radius = 0.8 + Math.random() * 0.4;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      nodePositions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      nodePositions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      nodePositions[i * 3 + 2] = radius * Math.cos(phi);
    }

    const nodeGeo = new THREE.BufferGeometry();
    nodeGeo.setAttribute("position", new THREE.BufferAttribute(nodePositions, 3));
    const nodeMat = new THREE.PointsMaterial({
      color: 0x9b8cff,
      size: 0.08,
      transparent: true,
      opacity: 0.9,
    });
    const nodes = new THREE.Points(nodeGeo, nodeMat);
    coreGroup.add(nodes);

    // Synaptic Connecting Lines (Neural lattice)
    const lineIndices: number[] = [];
    for (let i = 0; i < nodeCount; i++) {
      for (let j = i + 1; j < nodeCount; j++) {
        const dx = nodePositions[i * 3] - nodePositions[j * 3];
        const dy = nodePositions[i * 3 + 1] - nodePositions[j * 3 + 1];
        const dz = nodePositions[i * 3 + 2] - nodePositions[j * 3 + 2];
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
        if (dist < 0.75) {
          lineIndices.push(i, j);
        }
      }
    }
    const linesGeo = new THREE.BufferGeometry();
    linesGeo.setAttribute("position", new THREE.BufferAttribute(nodePositions, 3));
    linesGeo.setIndex(lineIndices);
    const linesMat = new THREE.LineBasicMaterial({
      color: 0x62e6ff,
      transparent: true,
      opacity: 0.25,
    });
    const neuralLines = new THREE.LineSegments(linesGeo, linesMat);
    coreGroup.add(neuralLines);

    // Central Energy Sphere (Pulsating core)
    const centralGeo = new THREE.SphereGeometry(0.35, 32, 32);
    const centralMat = new THREE.MeshBasicMaterial({
      color: 0x62e6ff,
      transparent: true,
      opacity: 0.85,
    });
    const centralSphere = new THREE.Mesh(centralGeo, centralMat);
    coreGroup.add(centralSphere);

    // Ambient Environmental Particle Dust (Digital Gravity)
    const particleCount = mode === "performance" ? 60 : 180;
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const pRadius = 2.4 + Math.random() * 1.5;
      const pTheta = Math.random() * Math.PI * 2;
      const pPhi = Math.acos(2 * Math.random() - 1);
      particlePositions[i * 3] = pRadius * Math.sin(pPhi) * Math.cos(pTheta);
      particlePositions[i * 3 + 1] = pRadius * Math.sin(pPhi) * Math.sin(pTheta);
      particlePositions[i * 3 + 2] = pRadius * Math.cos(pPhi);
    }
    const particlesGeo = new THREE.BufferGeometry();
    particlesGeo.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3));
    const particlesMat = new THREE.PointsMaterial({
      color: 0x62e6ff,
      size: 0.03,
      transparent: true,
      opacity: 0.45,
    });
    const dust = new THREE.Points(particlesGeo, particlesMat);
    coreGroup.add(dust);

    // 3. Mouse Parallax Reaction
    let targetX = 0;
    let targetY = 0;
    const onMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      targetX = x * 0.8;
      targetY = y * 0.8;
    };
    window.addEventListener("mousemove", onMouseMove, { passive: true });

    // 4. Observer for 0% Idle CPU when offscreen
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    // 5. Animation Loop
    let rafId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      rafId = requestAnimationFrame(animate);
      if (!isVisibleRef.current) return;

      const elapsed = clock.getElapsedTime();

      // Gyroscopic Rotations
      outerMesh.rotation.y = elapsed * 0.15;
      outerMesh.rotation.x = elapsed * 0.10;

      ring1.rotation.x = elapsed * 0.35;
      ring1.rotation.y = elapsed * 0.20;

      ring2.rotation.y = -elapsed * 0.40;
      ring2.rotation.z = elapsed * 0.25;

      nodes.rotation.y = elapsed * 0.08;
      neuralLines.rotation.y = elapsed * 0.08;
      dust.rotation.y = elapsed * 0.04;

      // Energy Core Breathe / Pulse
      const scale = 1 + Math.sin(elapsed * 2.5) * 0.08;
      centralSphere.scale.set(scale, scale, scale);

      // Smooth Mouse Parallax Lerp
      coreGroup.rotation.y += (targetX - coreGroup.rotation.y) * 0.05;
      coreGroup.rotation.x += (targetY - coreGroup.rotation.x) * 0.05;

      renderer.render(scene, camera);
    };

    animate();

    // Resize Handler
    const onResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(rafId);
      observer.disconnect();
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      outerGeo.dispose();
      outerMat.dispose();
      ring1Geo.dispose();
      ring1Mat.dispose();
      ring2Geo.dispose();
      ring2Mat.dispose();
      nodeGeo.dispose();
      nodeMat.dispose();
      linesGeo.dispose();
      linesMat.dispose();
      centralGeo.dispose();
      centralMat.dispose();
      particlesGeo.dispose();
      particlesMat.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className={`relative flex items-center justify-center select-none pointer-events-auto ${className}`}
      data-cursor="explore"
      aria-label="The Tarik Core 3D Centerpiece"
    />
  );
}
