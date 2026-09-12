import { useEffect, useRef, useState, useMemo } from "react";
import * as THREE from "three";
import {
  Satellite,
  Plane,
  Ship,
  Radio,
  Video,
  AlertOctagon,
  Layers,
  RotateCw,
  Crosshair,
  Maximize2,
  Compass,
  ExternalLink,
  ShieldCheck,
  Zap,
  Info,
  ChevronRight,
  Eye,
  CheckCircle2,
} from "lucide-react";
import {
  DEMO_LIVE_WORLD,
  latLngToVector3,
  type LiveWorldLayer,
  type SatelliteEntity,
  type AircraftEntity,
  type ShipEntity,
  type CellTowerEntity,
  type PublicCameraEntity,
  type RealtimeEventEntity,
} from "@/lib/find-someone/live-world-data";
import { soundEngine } from "@/lib/sound-engine";

interface LiveWorld3DProps {
  className?: string;
  focusTargetName?: string;
  focusCoords?: { lat: number; lng: number };
}

type SelectedEntity =
  | { type: "satellite"; data: SatelliteEntity }
  | { type: "aircraft"; data: AircraftEntity }
  | { type: "ship"; data: ShipEntity }
  | { type: "cell"; data: CellTowerEntity }
  | { type: "camera"; data: PublicCameraEntity }
  | { type: "event"; data: RealtimeEventEntity }
  | null;

export function LiveWorld3D({
  className = "",
  focusTargetName = "Bhubaneswar, Odisha",
  focusCoords = { lat: 20.2961, lng: 85.8245 },
}: LiveWorld3DProps) {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const [activeLayer, setActiveLayer] = useState<LiveWorldLayer>("all");
  const [selectedEntity, setSelectedEntity] = useState<SelectedEntity>(null);
  const [isAutoRotating, setIsAutoRotating] = useState(true);
  const [currentTime, setCurrentTime] = useState("");
  const [hoveredLabel, setHoveredLabel] = useState<string | null>(null);

  // Live UTC Clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toISOString().replace("T", " ").substring(0, 19) + " UTC");
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  // Three.js Scene Setup & Animation Loop
  const earthRadius = 2.0;
  const globeRef = useRef<THREE.Group | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const animFrameRef = useRef<number | null>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 800;
    const height = container.clientHeight || 520;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 1000);
    camera.position.set(0, 1.2, 5.2);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.innerHTML = "";
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 2. Main Earth Globe Group
    const globe = new THREE.Group();
    scene.add(globe);
    globeRef.current = globe;

    // Base Sphere with Cyber Blue/Emerald Tone
    const sphereGeo = new THREE.SphereGeometry(earthRadius, 48, 48);
    const sphereMat = new THREE.MeshBasicMaterial({
      color: 0x050914,
      wireframe: false,
    });
    const sphereMesh = new THREE.Mesh(sphereGeo, sphereMat);
    globe.add(sphereMesh);

    // Latitude & Longitude Wireframe Grid
    const wireGeo = new THREE.WireframeGeometry(
      new THREE.SphereGeometry(earthRadius + 0.005, 24, 24),
    );
    const wireMat = new THREE.LineBasicMaterial({
      color: 0x1e293b,
      transparent: true,
      opacity: 0.35,
    });
    const wireLines = new THREE.LineSegments(wireGeo, wireMat);
    globe.add(wireLines);

    // Outer Atmospheric Glow
    const atmosGeo = new THREE.SphereGeometry(earthRadius + 0.08, 36, 36);
    const atmosMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.12,
      side: THREE.BackSide,
    });
    const atmosMesh = new THREE.Mesh(atmosGeo, atmosMat);
    globe.add(atmosMesh);

    // Continents & Geographic Cluster Points (Simulated high-density spatial point clouds)
    const pointsGeo = new THREE.BufferGeometry();
    const sampleCoords: [number, number][] = [
      // India & South Asia High Density
      [20.29, 85.82],
      [28.61, 77.2],
      [19.07, 72.87],
      [12.97, 77.59],
      [13.08, 80.27],
      [22.57, 88.36],
      [17.38, 78.48],
      [23.02, 72.57],
      [26.84, 80.94],
      [21.17, 72.83],
      [15.31, 75.71],
      [11.01, 76.95],
      [8.52, 76.93],
      [24.81, 93.93],
      [26.14, 91.73],
      // East & Southeast Asia
      [35.67, 139.65],
      [31.23, 121.47],
      [39.9, 116.4],
      [1.35, 103.81],
      [13.75, 100.5],
      // Middle East & Europe
      [25.2, 55.27],
      [24.71, 46.67],
      [51.5, -0.12],
      [48.85, 2.35],
      [52.52, 13.4],
      [41.9, 12.49],
      [40.41, -3.7],
      [55.75, 37.61],
      [37.98, 23.72],
      // Americas & Africa
      [40.71, -74.0],
      [34.05, -118.24],
      [37.77, -122.41],
      [-23.55, -46.63],
      [-34.6, -58.38],
      [-1.29, 36.82],
      [30.04, 31.23],
      [-33.92, 18.42],
      [-33.86, 151.2],
    ];

    const vertices: number[] = [];
    sampleCoords.forEach(([lat, lng]) => {
      // Add jitter around urban clusters
      for (let j = 0; j < 14; j++) {
        const jLat = lat + (Math.random() - 0.5) * 4.5;
        const jLng = lng + (Math.random() - 0.5) * 4.5;
        const [x, y, z] = latLngToVector3(jLat, jLng, earthRadius + 0.015);
        vertices.push(x, y, z);
      }
    });

    pointsGeo.setAttribute("position", new THREE.Float32BufferAttribute(vertices, 3));
    const pointsMat = new THREE.PointsMaterial({
      color: 0x38bdf8,
      size: 0.035,
      transparent: true,
      opacity: 0.65,
    });
    const pointsMesh = new THREE.Points(pointsGeo, pointsMat);
    globe.add(pointsMesh);

    // 3. Pinpoint Target Location (e.g. Bhubaneswar / Investigation Subject)
    const targetGroup = new THREE.Group();
    const [tx, ty, tz] = latLngToVector3(focusCoords.lat, focusCoords.lng, earthRadius);
    targetGroup.position.set(tx, ty, tz);
    targetGroup.lookAt(0, 0, 0);

    // Target holographic pin
    const pinGeo = new THREE.CylinderGeometry(0.005, 0.03, 0.35, 12);
    pinGeo.rotateX(Math.PI / 2);
    const pinMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });
    const pinMesh = new THREE.Mesh(pinGeo, pinMat);
    targetGroup.add(pinMesh);

    // Target pulsing ring
    const ringGeo = new THREE.RingGeometry(0.05, 0.08, 24);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.8,
    });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    targetGroup.add(ringMesh);
    globe.add(targetGroup);

    // 4. Layer Groups: Satellites, Aircraft, Ships, Cells, Cams, Events
    const satellitesGroup = new THREE.Group();
    const aircraftGroup = new THREE.Group();
    const shipsGroup = new THREE.Group();
    const cellsGroup = new THREE.Group();
    const camsGroup = new THREE.Group();
    const eventsGroup = new THREE.Group();

    globe.add(satellitesGroup);
    globe.add(aircraftGroup);
    globe.add(shipsGroup);
    globe.add(cellsGroup);
    globe.add(camsGroup);
    globe.add(eventsGroup);

    // Add Satellites with Orbits
    const satMeshes: {
      mesh: THREE.Mesh;
      orbitRadius: number;
      speed: number;
      angle: number;
      satData: SatelliteEntity;
    }[] = [];
    DEMO_LIVE_WORLD.satellites.forEach((sat, i) => {
      const orbRad = earthRadius + 0.45 + sat.altitudeKm / 2000;

      // Orbit Ring
      const orbitCurve = new THREE.EllipseCurve(0, 0, orbRad, orbRad, 0, 2 * Math.PI, false, 0);
      const orbitPoints = orbitCurve.getPoints(64);
      const orbitGeo = new THREE.BufferGeometry().setFromPoints(
        orbitPoints.map((p) => new THREE.Vector3(p.x, 0, p.y)),
      );
      const orbitMat = new THREE.LineBasicMaterial({
        color: 0x6366f1,
        transparent: true,
        opacity: 0.28,
      });
      const orbitLine = new THREE.Line(orbitGeo, orbitMat);
      orbitLine.rotation.x = (sat.inclinationDeg * Math.PI) / 180;
      orbitLine.rotation.z = i * 0.8;
      satellitesGroup.add(orbitLine);

      // Satellite Object
      const satGeo = new THREE.BoxGeometry(0.04, 0.04, 0.08);
      const satMat = new THREE.MeshBasicMaterial({ color: 0xa855f7 });
      const satMesh = new THREE.Mesh(satGeo, satMat);
      satellitesGroup.add(satMesh);

      satMeshes.push({
        mesh: satMesh,
        orbitRadius: orbRad,
        speed: (sat.velocityKmS / 7.6) * 0.008,
        angle: (i * Math.PI) / 2.5,
        satData: sat,
      });
    });

    // Add Aircraft with Geodesic Flight Arcs
    DEMO_LIVE_WORLD.aircraft.forEach((ac) => {
      const [ax, ay, az] = latLngToVector3(ac.lat, ac.lng, earthRadius + 0.06);
      const acGeo = new THREE.ConeGeometry(0.025, 0.08, 6);
      acGeo.rotateX(Math.PI / 2);
      const acMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });
      const acMesh = new THREE.Mesh(acGeo, acMat);
      acMesh.position.set(ax, ay, az);
      acMesh.lookAt(0, 0, 0);
      aircraftGroup.add(acMesh);

      // Flight trajectory arc to destination
      const [tx2, ty2, tz2] = latLngToVector3(focusCoords.lat, focusCoords.lng, earthRadius + 0.06);
      const midPoint = new THREE.Vector3(
        ((ax + tx2) / 2) * 1.15,
        ((ay + ty2) / 2) * 1.15,
        ((az + tz2) / 2) * 1.15,
      );
      const curve = new THREE.QuadraticBezierCurve3(
        new THREE.Vector3(ax, ay, az),
        midPoint,
        new THREE.Vector3(tx2, ty2, tz2),
      );
      const arcGeo = new THREE.BufferGeometry().setFromPoints(curve.getPoints(32));
      const arcMat = new THREE.LineDashedMaterial({
        color: 0x38bdf8,
        dashSize: 0.05,
        gapSize: 0.03,
        transparent: true,
        opacity: 0.45,
      });
      const arcLine = new THREE.Line(arcGeo, arcMat);
      arcLine.computeLineDistances();
      aircraftGroup.add(arcLine);
    });

    // Add Ships
    DEMO_LIVE_WORLD.ships.forEach((ship) => {
      const [sx, sy, sz] = latLngToVector3(ship.lat, ship.lng, earthRadius + 0.02);
      const shipGeo = new THREE.BoxGeometry(0.03, 0.015, 0.05);
      const shipMat = new THREE.MeshBasicMaterial({ color: 0x34d399 });
      const shipMesh = new THREE.Mesh(shipGeo, shipMat);
      shipMesh.position.set(sx, sy, sz);
      shipMesh.lookAt(0, 0, 0);
      shipsGroup.add(shipMesh);
    });

    // Add Cell Towers
    DEMO_LIVE_WORLD.cells.forEach((cell) => {
      const [cx, cy, cz] = latLngToVector3(cell.lat, cell.lng, earthRadius + 0.015);
      const cellGeo = new THREE.CylinderGeometry(0.006, 0.006, 0.06, 8);
      const cellMat = new THREE.MeshBasicMaterial({ color: 0xf59e0b });
      const cellMesh = new THREE.Mesh(cellGeo, cellMat);
      cellMesh.position.set(cx, cy, cz);
      cellMesh.lookAt(0, 0, 0);
      cellsGroup.add(cellMesh);
    });

    // Add Public Cameras
    DEMO_LIVE_WORLD.cameras.forEach((cam) => {
      const [mx, my, mz] = latLngToVector3(cam.lat, cam.lng, earthRadius + 0.02);
      const camGeo = new THREE.SphereGeometry(0.025, 12, 12);
      const camMat = new THREE.MeshBasicMaterial({ color: 0x10b981 });
      const camMesh = new THREE.Mesh(camGeo, camMat);
      camMesh.position.set(mx, my, mz);
      camsGroup.add(camMesh);
    });

    // Add Events (Seismic / Weather)
    DEMO_LIVE_WORLD.events.forEach((evt) => {
      const [ex, ey, ez] = latLngToVector3(evt.lat, evt.lng, earthRadius + 0.02);
      const evtGeo = new THREE.RingGeometry(0.04, 0.07, 16);
      const evtMat = new THREE.MeshBasicMaterial({
        color: evt.type === "seismic" ? 0xef4444 : 0xf97316,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.75,
      });
      const evtMesh = new THREE.Mesh(evtGeo, evtMat);
      evtMesh.position.set(ex, ey, ez);
      evtMesh.lookAt(0, 0, 0);
      eventsGroup.add(evtMesh);
    });

    // Initial Rotation: Center over India (Lat ~20, Lng ~80)
    globe.rotation.y = -1.45;
    globe.rotation.x = 0.35;

    // Mouse Interaction for Drag Orbiting
    let isDragging = false;
    let prevMousePos = { x: 0, y: 0 };

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      prevMousePos = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging || !globeRef.current) return;
      const deltaX = e.clientX - prevMousePos.x;
      const deltaY = e.clientY - prevMousePos.y;

      globeRef.current.rotation.y += deltaX * 0.005;
      globeRef.current.rotation.x += deltaY * 0.005;

      prevMousePos = { x: e.clientX, y: e.clientY };
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    const dom = renderer.domElement;
    dom.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);

    // Zoom on wheel
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      camera.position.z = Math.min(8.0, Math.max(3.2, camera.position.z + e.deltaY * 0.003));
    };
    dom.addEventListener("wheel", onWheel, { passive: false });

    // Render & Animation Loop
    let pulseTime = 0;
    const animate = () => {
      animFrameRef.current = requestAnimationFrame(animate);

      // Auto rotation when idle
      if (isAutoRotating && !isDragging && globeRef.current) {
        globeRef.current.rotation.y += 0.0015;
      }

      // Pulse ring expansion
      pulseTime += 0.04;
      const scale = 1.0 + Math.sin(pulseTime) * 0.25;
      ringMesh.scale.set(scale, scale, 1);

      // Orbit satellites
      satMeshes.forEach((item) => {
        item.angle += item.speed;
        item.mesh.position.x = item.orbitRadius * Math.cos(item.angle);
        item.mesh.position.z = item.orbitRadius * Math.sin(item.angle);
        item.mesh.position.y = Math.sin(item.angle * 1.5) * 0.4;
      });

      renderer.render(scene, camera);
    };
    animate();

    // Resize handling
    const handleResize = () => {
      if (!container || !rendererRef.current) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      rendererRef.current.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      dom.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      dom.removeEventListener("wheel", onWheel);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      renderer.dispose();
    };
  }, [focusCoords.lat, focusCoords.lng, isAutoRotating]);

  // Reset View / Focus Target
  const handleResetToTarget = () => {
    soundEngine.playClick();
    if (globeRef.current) {
      globeRef.current.rotation.y = -1.45;
      globeRef.current.rotation.x = 0.35;
    }
  };

  return (
    <div
      className={`relative w-full rounded-xl border border-sky-500/20 bg-slate-950/80 backdrop-blur-md overflow-hidden font-mono ${className}`}
    >
      {/* HUD Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 px-4 py-3 bg-slate-900/60 text-xs">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 font-bold tracking-widest text-amber-400">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
            </span>
            WORLD LAYER · SIMULATION
          </span>
          <span className="hidden sm:inline-block text-slate-500">|</span>
          <span className="hidden sm:inline-block text-slate-400">TARGET: {focusTargetName}</span>
        </div>

        <div className="flex items-center gap-2 text-[11px] text-slate-400">
          <span className="bg-slate-800/80 px-2 py-0.5 rounded border border-white/5 font-mono">
            {currentTime || "SYNCING..."}
          </span>
          <button
            onClick={() => setIsAutoRotating(!isAutoRotating)}
            className={`px-2 py-0.5 rounded border transition-colors ${
              isAutoRotating
                ? "border-sky-500/40 text-sky-400 bg-sky-950/30"
                : "border-white/10 text-slate-400 hover:text-white"
            }`}
            title="Toggle Earth Auto-Rotation"
          >
            <RotateCw className="w-3 h-3 inline mr-1" />
            {isAutoRotating ? "ORBIT ON" : "PAUSED"}
          </button>
          <button
            onClick={handleResetToTarget}
            className="px-2 py-0.5 rounded border border-sky-500/30 text-sky-400 hover:bg-sky-950/40 transition-colors"
            title="Center View on Target"
          >
            <Crosshair className="w-3 h-3 inline mr-1" />
            FOCUS TARGET
          </button>
        </div>
      </div>

      {/* Layer Selector Chips */}
      <div className="flex items-center gap-1.5 px-4 py-2 bg-slate-900/40 border-b border-white/5 overflow-x-auto scrollbar-none text-[11px]">
        <span className="text-slate-400 font-semibold flex items-center gap-1 mr-1">
          <Layers className="w-3 h-3 text-sky-400" /> LAYERS:
        </span>
        {[
          { key: "all", label: "ALL ENTITIES", icon: Crosshair, count: 28 },
          { key: "satellites", label: "SATELLITES", icon: Satellite, count: 5 },
          { key: "aircraft", label: "AIRCRAFT", icon: Plane, count: 5 },
          { key: "ships", label: "SHIPS", icon: Ship, count: 4 },
          { key: "cells", label: "CELL INFRA", icon: Radio, count: 5 },
          { key: "cameras", label: "PUBLIC CAMS", icon: Video, count: 4 },
          { key: "events", label: "DEMO EVENTS", icon: AlertOctagon, count: 3 },
        ].map((item) => {
          const Icon = item.icon;
          const isActive = activeLayer === item.key;
          return (
            <button
              key={item.key}
              onClick={() => {
                soundEngine.playClick();
                setActiveLayer(item.key as LiveWorldLayer);
              }}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md border whitespace-nowrap transition-all ${
                isActive
                  ? "border-sky-500/60 bg-sky-500/15 text-sky-300 shadow-[0_0_12px_rgba(56,189,248,0.2)]"
                  : "border-white/5 bg-slate-800/40 text-slate-400 hover:border-white/20 hover:text-slate-200"
              }`}
            >
              <Icon className="w-3 h-3" />
              <span>{item.label}</span>
              <span
                className={`px-1 py-0.2 rounded text-[9px] ${isActive ? "bg-sky-400/20 text-sky-200" : "bg-white/5 text-slate-400"}`}
              >
                {item.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Main 3D Canvas & Overlays */}
      <div className="relative w-full h-[480px] sm:h-[540px]">
        {/* Three.js Render Mount */}
        <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

        {/* 3D Viewport Corner Crosshairs & Legend */}
        <div className="absolute top-3 left-3 pointer-events-none flex flex-col gap-1 text-[10px] text-slate-400 bg-slate-950/70 p-2.5 rounded border border-white/10 backdrop-blur-sm">
          <div className="text-sky-400 font-bold flex items-center gap-1.5">
            <Compass className="w-3.5 h-3.5" /> 3D SPATIAL TELEMETRY
          </div>
          <div>
            COORDINATES: {focusCoords.lat.toFixed(4)}°N, {focusCoords.lng.toFixed(4)}°E
          </div>
          <div>ALTITUDE DATUM: WGS84 ELLIPSOID</div>
          <div>DRAG TO ORBIT · SCROLL TO ZOOM</div>
        </div>

        {/* Entity Live Quick-Select Feed (Right Floating Panel) */}
        <div className="absolute top-3 right-3 bottom-3 w-72 max-w-[85vw] bg-slate-950/85 border border-white/10 rounded-lg p-3 backdrop-blur-md overflow-y-auto scrollbar-thin text-xs flex flex-col gap-2">
          <div className="flex items-center justify-between border-b border-white/10 pb-1.5 text-slate-300 font-bold">
            <span className="flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-amber-400" /> SIMULATION TELEMETRY
            </span>
            <span className="text-[10px] text-slate-400 font-mono">28 ACTIVE</span>
          </div>

          <div className="flex flex-col gap-1.5 mt-1">
            {/* Satellites List */}
            {(activeLayer === "all" || activeLayer === "satellites") && (
              <div className="flex flex-col gap-1">
                <span className="text-[10px] font-bold text-purple-400 flex items-center gap-1">
                  <Satellite className="w-3 h-3" /> SATELLITES (LEO / MEO)
                </span>
                {DEMO_LIVE_WORLD.satellites.map((sat) => (
                  <button
                    key={sat.id}
                    onClick={() => {
                      soundEngine.playClick();
                      setSelectedEntity({ type: "satellite", data: sat });
                    }}
                    className={`text-left p-2 rounded border transition-all ${
                      selectedEntity?.type === "satellite" && selectedEntity.data.id === sat.id
                        ? "border-purple-500 bg-purple-950/40 text-purple-200"
                        : "border-white/5 bg-slate-900/60 hover:border-purple-500/30 text-slate-300"
                    }`}
                  >
                    <div className="flex items-center justify-between font-bold text-[11px]">
                      <span className="truncate">{sat.name}</span>
                      <span className="text-[9px] text-purple-400 font-mono">
                        {sat.altitudeKm} km
                      </span>
                    </div>
                    <div className="text-[10px] text-slate-400 mt-0.5 flex items-center justify-between">
                      <span>NORAD #{sat.noradId}</span>
                      <span className="text-emerald-400 font-mono">{sat.velocityKmS} km/s</span>
                    </div>
                  </button>
                ))}
              </div>
            )}

            {/* Aircraft List */}
            {(activeLayer === "all" || activeLayer === "aircraft") && (
              <div className="flex flex-col gap-1 mt-1">
                <span className="text-[10px] font-bold text-sky-400 flex items-center gap-1">
                  <Plane className="w-3 h-3" /> AIRCRAFT (SIMULATED)
                </span>
                {DEMO_LIVE_WORLD.aircraft.map((ac) => (
                  <button
                    key={ac.id}
                    onClick={() => {
                      soundEngine.playClick();
                      setSelectedEntity({ type: "aircraft", data: ac });
                    }}
                    className={`text-left p-2 rounded border transition-all ${
                      selectedEntity?.type === "aircraft" && selectedEntity.data.id === ac.id
                        ? "border-sky-500 bg-sky-950/40 text-sky-200"
                        : "border-white/5 bg-slate-900/60 hover:border-sky-500/30 text-slate-300"
                    }`}
                  >
                    <div className="flex items-center justify-between font-bold text-[11px]">
                      <span className="text-sky-300 font-mono">
                        {ac.callsign} · {ac.operator}
                      </span>
                      <span className="text-[9px] text-sky-400 font-mono">{ac.altitudeFt} ft</span>
                    </div>
                    <div className="text-[10px] text-slate-400 mt-0.5 flex items-center justify-between">
                      <span className="truncate">
                        {ac.origin} → {ac.destination}
                      </span>
                      <span className="text-amber-400 font-mono">{ac.velocityKts} kts</span>
                    </div>
                  </button>
                ))}
              </div>
            )}

            {/* Marine Ships */}
            {(activeLayer === "all" || activeLayer === "ships") && (
              <div className="flex flex-col gap-1 mt-1">
                <span className="text-[10px] font-bold text-emerald-400 flex items-center gap-1">
                  <Ship className="w-3 h-3" /> MARITIME VESSELS (SIMULATED)
                </span>
                {DEMO_LIVE_WORLD.ships.map((ship) => (
                  <button
                    key={ship.id}
                    onClick={() => {
                      soundEngine.playClick();
                      setSelectedEntity({ type: "ship", data: ship });
                    }}
                    className={`text-left p-2 rounded border transition-all ${
                      selectedEntity?.type === "ship" && selectedEntity.data.id === ship.id
                        ? "border-emerald-500 bg-emerald-950/40 text-emerald-200"
                        : "border-white/5 bg-slate-900/60 hover:border-emerald-500/30 text-slate-300"
                    }`}
                  >
                    <div className="flex items-center justify-between font-bold text-[11px]">
                      <span className="truncate text-emerald-300">{ship.name}</span>
                      <span className="text-[9px] text-emerald-400 font-mono">
                        {ship.speedKts} kts
                      </span>
                    </div>
                    <div className="text-[10px] text-slate-400 mt-0.5 flex items-center justify-between">
                      <span className="truncate">{ship.vesselType}</span>
                      <span className="font-mono">DEST: {ship.destination}</span>
                    </div>
                  </button>
                ))}
              </div>
            )}

            {/* Public Cameras */}
            {(activeLayer === "all" || activeLayer === "cameras") && (
              <div className="flex flex-col gap-1 mt-1">
                <span className="text-[10px] font-bold text-emerald-300 flex items-center gap-1">
                  <Video className="w-3 h-3" /> MUNICIPAL / TRAFFIC CAMS
                </span>
                {DEMO_LIVE_WORLD.cameras.map((cam) => (
                  <button
                    key={cam.id}
                    onClick={() => {
                      soundEngine.playClick();
                      setSelectedEntity({ type: "camera", data: cam });
                    }}
                    className={`text-left p-2 rounded border transition-all ${
                      selectedEntity?.type === "camera" && selectedEntity.data.id === cam.id
                        ? "border-emerald-400 bg-emerald-950/40 text-emerald-200"
                        : "border-white/5 bg-slate-900/60 hover:border-emerald-400/30 text-slate-300"
                    }`}
                  >
                    <div className="flex items-center justify-between font-bold text-[11px]">
                      <span className="truncate text-slate-200">{cam.locationName}</span>
                      <span className="text-[9px] text-amber-400 font-mono">● SIMULATION</span>
                    </div>
                    <div className="text-[10px] text-slate-400 mt-0.5 flex items-center justify-between">
                      <span>{cam.city}</span>
                      <span className="font-mono text-slate-500">{cam.resolution}</span>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Selected Entity Inspection Modal / Bottom Drawer */}
        {selectedEntity && (
          <div className="absolute bottom-3 left-3 right-3 sm:right-80 bg-slate-950/95 border border-sky-500/40 rounded-lg p-4 shadow-2xl backdrop-blur-md animate-in fade-in slide-in-from-bottom-2 text-xs">
            <div className="flex items-start justify-between gap-2 border-b border-white/10 pb-2 mb-2">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-sky-500/20 text-sky-300 border border-sky-500/30">
                  {selectedEntity.type}
                </span>
                <h4 className="text-sm font-bold text-white">
                  {selectedEntity.type === "satellite" && selectedEntity.data.name}
                  {selectedEntity.type === "aircraft" &&
                    `${selectedEntity.data.callsign} (${selectedEntity.data.operator})`}
                  {selectedEntity.type === "ship" && selectedEntity.data.name}
                  {selectedEntity.type === "cell" &&
                    `${selectedEntity.data.operator} (${selectedEntity.data.technology})`}
                  {selectedEntity.type === "camera" && selectedEntity.data.locationName}
                  {selectedEntity.type === "event" && selectedEntity.data.title}
                </h4>
              </div>
              <button
                onClick={() => setSelectedEntity(null)}
                className="text-slate-400 hover:text-white px-1.5 py-0.5 text-sm"
              >
                ✕
              </button>
            </div>

            {/* Entity Specific Details */}
            {selectedEntity.type === "satellite" && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px]">
                <div className="bg-slate-900/80 p-2 rounded border border-white/5">
                  <div className="text-slate-500">NORAD ID</div>
                  <div className="font-mono font-bold text-white">
                    {selectedEntity.data.noradId}
                  </div>
                </div>
                <div className="bg-slate-900/80 p-2 rounded border border-white/5">
                  <div className="text-slate-500">ALTITUDE</div>
                  <div className="font-mono font-bold text-purple-400">
                    {selectedEntity.data.altitudeKm} km
                  </div>
                </div>
                <div className="bg-slate-900/80 p-2 rounded border border-white/5">
                  <div className="text-slate-500">VELOCITY</div>
                  <div className="font-mono font-bold text-emerald-400">
                    {selectedEntity.data.velocityKmS} km/s
                  </div>
                </div>
                <div className="bg-slate-900/80 p-2 rounded border border-white/5">
                  <div className="text-slate-500">ORBITAL PERIOD</div>
                  <div className="font-mono font-bold text-white">
                    {selectedEntity.data.periodMin} min
                  </div>
                </div>
                <div className="col-span-2 sm:col-span-4 bg-slate-900/40 p-2 rounded border border-white/5 text-[10px] text-slate-400 flex items-center justify-between">
                  <span>OPERATOR: {selectedEntity.data.operator}</span>
                  <span className="text-emerald-400">STATUS: {selectedEntity.data.status}</span>
                </div>
              </div>
            )}

            {selectedEntity.type === "aircraft" && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px]">
                <div className="bg-slate-900/80 p-2 rounded border border-white/5">
                  <div className="text-slate-500">AIRCRAFT TYPE</div>
                  <div className="font-mono font-bold text-white truncate">
                    {selectedEntity.data.aircraftType}
                  </div>
                </div>
                <div className="bg-slate-900/80 p-2 rounded border border-white/5">
                  <div className="text-slate-500">BAROMETRIC ALTITUDE</div>
                  <div className="font-mono font-bold text-sky-400">
                    {selectedEntity.data.altitudeFt} ft
                  </div>
                </div>
                <div className="bg-slate-900/80 p-2 rounded border border-white/5">
                  <div className="text-slate-500">GROUND SPEED</div>
                  <div className="font-mono font-bold text-amber-400">
                    {selectedEntity.data.velocityKts} kts
                  </div>
                </div>
                <div className="bg-slate-900/80 p-2 rounded border border-white/5">
                  <div className="text-slate-500">HEADING / SQUAWK</div>
                  <div className="font-mono font-bold text-white">
                    {selectedEntity.data.headingDeg}° / {selectedEntity.data.squawk}
                  </div>
                </div>
                <div className="col-span-2 sm:col-span-4 bg-slate-900/40 p-2 rounded border border-white/5 text-[10px] text-slate-400 flex items-center justify-between">
                  <span>
                    FLIGHT ROUTE: {selectedEntity.data.origin} → {selectedEntity.data.destination}
                  </span>
                  <span className="text-sky-400">SOURCE: {selectedEntity.data.source}</span>
                </div>
              </div>
            )}

            {selectedEntity.type === "ship" && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px]">
                <div className="bg-slate-900/80 p-2 rounded border border-white/5">
                  <div className="text-slate-500">MMSI / IMO</div>
                  <div className="font-mono font-bold text-white">
                    {selectedEntity.data.mmsi} / {selectedEntity.data.imo}
                  </div>
                </div>
                <div className="bg-slate-900/80 p-2 rounded border border-white/5">
                  <div className="text-slate-500">SPEED OVER GROUND</div>
                  <div className="font-mono font-bold text-emerald-400">
                    {selectedEntity.data.speedKts} kts
                  </div>
                </div>
                <div className="bg-slate-900/80 p-2 rounded border border-white/5">
                  <div className="text-slate-500">COURSE HEADING</div>
                  <div className="font-mono font-bold text-white">
                    {selectedEntity.data.headingDeg}°
                  </div>
                </div>
                <div className="bg-slate-900/80 p-2 rounded border border-white/5">
                  <div className="text-slate-500">MAX DRAUGHT</div>
                  <div className="font-mono font-bold text-white">
                    {selectedEntity.data.draughtM} m
                  </div>
                </div>
                <div className="col-span-2 sm:col-span-4 bg-slate-900/40 p-2 rounded border border-white/5 text-[10px] text-slate-400 flex items-center justify-between">
                  <span>
                    DESTINATION: {selectedEntity.data.destination} (ETA: {selectedEntity.data.eta})
                  </span>
                  <span className="text-emerald-400">FLAG: {selectedEntity.data.flag}</span>
                </div>
              </div>
            )}

            {selectedEntity.type === "camera" && (
              <div className="flex flex-col sm:flex-row items-center gap-3 text-[11px]">
                <img
                  src={selectedEntity.data.previewUrl}
                  alt={selectedEntity.data.locationName}
                  className="w-full sm:w-48 h-28 object-cover rounded border border-white/10"
                />
                <div className="flex-1 flex flex-col gap-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">
                      AUTHORITY: {selectedEntity.data.authority}
                    </span>
                    <span className="text-amber-400 font-bold">
                      ● {selectedEntity.data.status}
                    </span>
                  </div>
                  <div className="text-slate-300">
                    STREAM PROTOCOL: {selectedEntity.data.streamProtocol}
                  </div>
                  <div className="text-slate-300">
                    RESOLUTION & FRAME RATE: {selectedEntity.data.resolution}
                  </div>
                  <div className="text-[10px] text-slate-500">
                    Simulation only — no live municipal or private camera ingest in this demo.
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Footer System Status Bar */}
      <div className="border-t border-white/10 px-4 py-2.5 bg-slate-950 flex flex-wrap items-center justify-between gap-3 text-[11px] text-slate-400">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 text-amber-400">
            <ShieldCheck className="w-3.5 h-3.5" /> DEMO DATASET · NOT LIVE FEEDS
          </span>
          <span className="hidden md:inline-block text-slate-600">|</span>
          <span className="hidden md:inline-block text-slate-400">
            NO PRIVATE TELEMETRY · NO DEVICE TRACKING · SIMULATION ONLY
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-amber-400/90 font-mono">
            STYLED AFTER OPENSKY / AIS / OPENCELLID · WORKERS OFF
          </span>
        </div>
      </div>
    </div>
  );
}
