import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import type { WorldObject } from "@/lib/world-os/adapters";
import { latLngToVector3 } from "@/lib/find-someone/live-world-data";

const EARTH_R = 2;

interface WorldGlobeProps {
  objects: WorldObject[];
  indiaMode: boolean;
  selectedId?: string | null;
  onSelect?: (id: string) => void;
  className?: string;
}

/**
 * Lightweight source-marker globe for WORLD OS.
 * Lazy-loaded by the shell — Three.js stays off the critical path.
 * Only plots objects that already have lat/lng from adapters (never invents positions).
 */
export function WorldGlobe({
  objects,
  indiaMode,
  selectedId,
  onSelect,
  className = "",
}: WorldGlobeProps) {
  const mountRef = useRef<HTMLDivElement | null>(null);
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
    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
    camera.position.set(0, indiaMode ? 0.55 : 0.35, indiaMode ? 4.6 : 5.1);

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
      new THREE.SphereGeometry(EARTH_R, 48, 48),
      new THREE.MeshBasicMaterial({ color: 0x070b12 }),
    );
    globe.add(sphere);

    const wire = new THREE.LineSegments(
      new THREE.WireframeGeometry(new THREE.SphereGeometry(EARTH_R + 0.01, 28, 28)),
      new THREE.LineBasicMaterial({ color: 0x1a3a4a, transparent: true, opacity: 0.55 }),
    );
    globe.add(wire);

    const atmosphere = new THREE.Mesh(
      new THREE.SphereGeometry(EARTH_R + 0.06, 32, 32),
      new THREE.MeshBasicMaterial({
        color: 0x62e6ff,
        transparent: true,
        opacity: 0.06,
        side: THREE.BackSide,
      }),
    );
    globe.add(atmosphere);

    // India bias ring (visual cue, not a data layer)
    if (indiaMode) {
      const [ix, iy, iz] = latLngToVector3(20.5, 78.5, EARTH_R + 0.04);
      const focus = new THREE.Mesh(
        new THREE.RingGeometry(0.18, 0.22, 48),
        new THREE.MeshBasicMaterial({
          color: 0x62e6ff,
          transparent: true,
          opacity: 0.35,
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

    for (const obj of markers) {
      const [x, y, z] = latLngToVector3(obj.lat!, obj.lng!, EARTH_R + 0.03);
      const selected = obj.id === selectedId;
      const m = new THREE.Mesh(
        new THREE.SphereGeometry(selected ? 0.045 : 0.028, 12, 12),
        new THREE.MeshBasicMaterial({
          color: selected ? 0xffffff : 0x62e6ff,
        }),
      );
      m.position.set(x, y, z);
      markerGroup.add(m);
      idByMesh.set(m, obj.id);
    }

    // Orient toward India when India Mode is on
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
      if (!onSelect || markers.length === 0) return;
      const rect = renderer.domElement.getBoundingClientRect();
      pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(pointer, camera);
      const hits = raycaster.intersectObjects(markerGroup.children, false);
      if (hits[0]) {
        const id = idByMesh.get(hits[0].object);
        if (id) onSelect(id);
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
      if (autoSpin && !reduceMotion) globe.rotation.y += 0.0012;
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
    };
  }, [markers, indiaMode, selectedId, onSelect]);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <div ref={mountRef} className="absolute inset-0" />
      <div className="pointer-events-none absolute left-4 top-4 space-y-1">
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#62E6FF]">
          Live layer · source markers only
        </p>
        <p className="font-mono text-[9px] text-muted-foreground">
          {markers.length} positioned · {objects.length - markers.length} catalog-only
          {indiaMode ? " · India bias" : ""}
        </p>
      </div>
    </div>
  );
}
