/**
 * The Tarik Design System — Director Mode Manager
 * Modes: 'experience' (Full 3D) | 'minimal' (Clean Editorial) | 'performance' (Max FPS)
 */

export type DirectorMode = "experience" | "minimal" | "performance";

const STORAGE_KEY = "tarik_director_mode";

export function getDirectorMode(): DirectorMode {
  if (typeof window === "undefined") return "experience";
  const stored = localStorage.getItem(STORAGE_KEY) as DirectorMode | null;
  if (stored && ["experience", "minimal", "performance"].includes(stored)) {
    return stored;
  }
  // If reduced motion requested or low hardware, default to performance
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return "performance";
  }
  return "experience";
}

export function setDirectorMode(mode: DirectorMode): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, mode);
  document.documentElement.dataset.directorMode = mode;
  window.dispatchEvent(new CustomEvent("tarik:director-mode-change", { detail: { mode } }));
}

export function initDirectorMode(): () => void {
  if (typeof window === "undefined") return () => {};
  const current = getDirectorMode();
  document.documentElement.dataset.directorMode = current;

  const handleStorage = (e: StorageEvent) => {
    if (e.key === STORAGE_KEY && e.newValue) {
      document.documentElement.dataset.directorMode = e.newValue;
    }
  };

  window.addEventListener("storage", handleStorage);
  return () => window.removeEventListener("storage", handleStorage);
}
