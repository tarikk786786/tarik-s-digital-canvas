import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import type { WorldDimension, WorldObject } from "@/lib/world-os/adapters";
import { latLngToVector3 } from "@/lib/find-someone/live-world-data";

const EARTH_R = 2;

interface WorldGlobeProps {
  objects: WorldObject[];
  indiaMode: boolean;
  selectedId?: string | null;
  onSelect?: (id: string) => void;
  className?: string;
  loading?: boolean;
  dimension?: WorldDimension;
}

/**
 * Source-marker globe for WORLD OS.
 * Only plots objects that already have lat/lng from adapters — never invents positions.
 */
export function WorldGlobe({
  objects,
  indiaMode,
  selectedId,
  onSelect,
  className = "",
  loading = false,
  dimension,
}: WorldGlobeProps) {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const onSelectRef = useRef(onSelect);
  const selectedIdRef = useRef(selectedId);
  const meshesByIdRef = useRef(new Map<string, THREE.Mesh>());

  onSelectRef.current = onSelect;
  selectedIdRef.current = selectedId;

  const markers = useMemo(
    () => objects.filter((o) => typeof o.lat === "number" && typeof o.lng === "number"),
    [objects],
  );

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 640;
    const height = container.clientHeight || 420;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(36, width / height, 0.1, 100);
    camera.position.set(0, indiaMode ? 0.48 : 0.28, indiaMode ? 4.45 : 5.0);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.innerHTML = "";
    container.appendChild(renderer.domElement);

    const globe = new THREE.Group();
    scene.add(globe);

    const sphere = new THREE.Mesh(
      new THREE.SphereGeometry(EARTH_R, 64, 64),
      new THREE.MeshBasicMaterial({ color: 0x081018 }),
    );
    globe.add(sphere);

    // Meridian / parallel guide (engineered grid, not decorative noise)
    const gridMat = new THREE.LineBasicMaterial({
      color: 0x1c3d4e,
      transparent: true,
      opacity: 0.45,
    });
    for (let lat = -60; lat <= 60; lat += 30) {
      const pts: THREE.Vector3[] = [];
      for (let lng = 0; lng <= 360; lng += 6) {
        const [x, y, z] = latLngToVector3(lat, lng, EARTH_R + 0.002);
        pts.push(new THREE.Vector3(x, y, z));
      }
      globe.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), gridMat));
    }
    for (let lng = 0; lng < 360; lng += 30) {
      const pts: THREE.Vector3[] = [];
      for (let lat = -80; lat <= 80; lat += 4) {
        const [x, y, z] = latLngToVector3(lat, lng, EARTH_R + 0.002);
        pts.push(new THREE.Vector3(x, y, z));
      }
      globe.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), gridMat));
    }

    const wire = new THREE.LineSegments(
      new THREE.WireframeGeometry(new THREE.SphereGeometry(EARTH_R + 0.008, 24, 24)),
      new THREE.LineBasicMaterial({ color: 0x143040, transparent: true, opacity: 0.22 }),
    );
    globe.add(wire);

    const atmosphere = new THREE.Mesh(
      new THREE.SphereGeometry(EARTH_R + 0.07, 48, 48),
      new THREE.MeshBasicMaterial({
        color: 0x62e6ff,
        transparent: true,
        opacity: 0.05,
        side: THREE.BackSide,
      }),
    );
    globe.add(atmosphere);

    if (indiaMode) {
      const [ix, iy, iz] = latLngToVector3(20.5, 78.5, EARTH_R + 0.035);
      const focus = new THREE.Mesh(
        new THREE.RingGeometry(0.16, 0.2, 48),
        new THREE.MeshBasicMaterial({
          color: 0x62e6ff,
          transparent: true,
          opacity: 0.4,
          side: THREE.DoubleSide,
        }),
      );
      focus.position.set(ix, iy, iz);
      focus.lookAt(0, 0, 0);
      globe.add(focus);
    }

    const markerGroup = new THREE.Group();
    globe.add(markerGroup);
    const idByMesh = new Map<THREE.Object3D, string>();
    const meshesById = new Map<string, THREE.Mesh>();
    meshesByIdRef.current = meshesById;

    const applySelection = (id: string | null | undefined) => {
      for (const [mid, mesh] of meshesById) {
        const selected = mid === id;
        mesh.scale.setScalar(selected ? 1.65 : 1);
        const mat = mesh.material as THREE.MeshBasicMaterial;
        mat.color.setHex(selected ? 0xffffff : 0x62e6ff);
      }
    };

    for (const obj of markers) {
      const [x, y, z] = latLngToVector3(obj.lat!, obj.lng!, EARTH_R + 0.028);
      const m = new THREE.Mesh(
        new THREE.SphereGeometry(0.032, 14, 14),
        new THREE.MeshBasicMaterial({ color: 0x62e6ff }),
      );
      m.position.set(x, y, z);
      markerGroup.add(m);
      idByMesh.set(m, obj.id);
      meshesById.set(obj.id, m);

      // Soft halo for readability
      const halo = new THREE.Mesh(
        new THREE.SphereGeometry(0.055, 12, 12),
        new THREE.MeshBasicMaterial({
          color: 0x62e6ff,
          transparent: true,
          opacity: 0.18,
        }),
      );
      halo.position.set(x, y, z);
      markerGroup.add(halo);
    }
    applySelection(selectedIdRef.current);

    if (indiaMode) {
      const [tx, ty, tz] = latLngToVector3(22, 78, EARTH_R);
      const target = new THREE.Vector3(tx, ty, tz).normalize();
      const q = new THREE.Quaternion().setFromUnitVectors(
        target,
        new THREE.Vector3(0, 0, 1),
      );
      globe.setRotationFromQuaternion(q);
    }

    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();
    let dragging = false;
    let lastX = 0;
    let lastY = 0;
    let autoSpin = true;
    let frame = 0;

    const onPointerDown = (e: PointerEvent) => {
      dragging = true;
      autoSpin = false;
      lastX = e.clientX;
      lastY = e.clientY;
    };
    const onPointerUp = () => {
      dragging = false;
    };
    const onPointerMove = (e: PointerEvent) => {
      if (!dragging) return;
      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      lastX = e.clientX;
      lastY = e.clientY;
      globe.rotation.y += dx * 0.005;
      globe.rotation.x += dy * 0.003;
      globe.rotation.x = Math.max(-0.9, Math.min(0.9, globe.rotation.x));
    };
    const onClick = (e: MouseEvent) => {
      if (!onSelectRef.current || markers.length === 0) return;
      const rect = renderer.domElement.getBoundingClientRect();
      pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(pointer, camera);
      const hits = raycaster.intersectObjects([...meshesById.values()], false);
      if (hits[0]) {
        const id = idByMesh.get(hits[0].object);
        if (id) onSelectRef.current(id);
      }
    };

    renderer.domElement.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointerup", onPointerUp);
    window.addEventListener("pointermove", onPointerMove);
    renderer.domElement.addEventListener("click", onClick);

    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const animate = () => {
      frame = requestAnimationFrame(animate);
      if (autoSpin && !reduceMotion) globe.rotation.y += 0.001;
      renderer.render(scene, camera);
    };
    animate();

    const onResize = () => {
      const w = container.clientWidth || 640;
      const h = container.clientHeight || 420;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("pointermove", onPointerMove);
      renderer.domElement.removeEventListener("pointerdown", onPointerDown);
      renderer.domElement.removeEventListener("click", onClick);
      renderer.dispose();
      container.innerHTML = "";
      meshesByIdRef.current = new Map();
    };
  }, [markers, indiaMode]);

  useEffect(() => {
    for (const [mid, mesh] of meshesByIdRef.current) {
      const selected = mid === selectedId;
      mesh.scale.setScalar(selected ? 1.65 : 1);
      const mat = mesh.material as THREE.MeshBasicMaterial;
      mat.color.setHex(selected ? 0xffffff : 0x62e6ff);
    }
  }, [selectedId]);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <div ref={mountRef} className="absolute inset-0" />
      <div className="pointer-events-none absolute left-4 top-4 space-y-1">
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#62E6FF]">
          {dimension ?? "LAYER"} · source markers
        </p>
        <p className="font-mono text-[9px] text-muted-foreground">
          {loading
            ? "Retrieving…"
            : `${markers.length} positioned · ${objects.length - markers.length} without lat/lng`}
          {indiaMode ? " · India bias" : " · global"}
        </p>
      </div>
      {loading && (
        <div className="pointer-events-none absolute inset-0 bg-[#050608]/25" />
      )}
    </div>
  );
}
