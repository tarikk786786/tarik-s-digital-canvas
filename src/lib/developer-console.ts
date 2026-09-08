/**
 * Developer Console Experience & Easter Eggs
 * - Forensic ASCII Banner in Browser DevTools
 * - Konami Code Listener (triggers singularity pulse)
 * - Global Keyboard Shortcut Coordinator
 */

export function initDeveloperConsole(callbacks?: {
  onOpenTerminal?: () => void;
  onOpenAskTarik?: () => void;
  onOpenEngineInspector?: () => void;
  onKonamiSuccess?: () => void;
}) {
  if (typeof window === "undefined") return () => {};

  // 1. Stylized DevTools Console Banner
  const titleStyle = "color: #E8A838; font-size: 14px; font-weight: bold; font-family: monospace;";
  const subStyle = "color: #38BDF8; font-size: 11px; font-family: monospace;";
  const textStyle = "color: #9CA3AF; font-size: 10px; font-family: monospace;";
  const accentStyle = "color: #10B981; font-weight: bold; font-family: monospace;";

  console.log(
    `%c
   ████████╗ █████╗ ██████╗ ██╗██╗  ██╗
   ╚══██╔══╝██╔══██╗██╔══██╗██║██║ ██╔╝
      ██║   ███████║██████╔╝██║█████╔╝ 
      ██║   ██╔══██║██╔══██╗██║██╔═██╗ 
      ██║   ██║  ██║██║  ██║██║██║  ██╗
      ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝╚═╝  ╚═╝
   TARIK ISLAM // MULTIDISCIPLINARY TECHNOLOGIST
    `,
    titleStyle
  );
  console.log(
    `%c[FORENSIC EVIDENCE PROTOCOL] — Systems Integrity: VERIFIED (SHA-256)`,
    subStyle
  );
  console.log(
    `%c• Forensic Science · Cybersecurity · AI Systems · Full-Stack Platforms\n• Founder & CEO @ Dezo.in (https://dezo.in)\n• Coordinates: India (UTC +05:30) · Worldwide Enclave`,
    textStyle
  );
  console.log(
    `%c[SHORTCUTS] Press 'A' for Ask Tarik AI · Press 'E' for Engine Inspector · Press 'T' for Terminal`,
    accentStyle
  );

  // 2. Konami Code Sequence: Up, Up, Down, Down, Left, Right, Left, Right, b, a
  const konamiSequence = [
    "ArrowUp",
    "ArrowUp",
    "ArrowDown",
    "ArrowDown",
    "ArrowLeft",
    "ArrowRight",
    "ArrowLeft",
    "ArrowRight",
    "b",
    "a",
  ];
  let konamiIndex = 0;

  const handleKeyDown = (e: KeyboardEvent) => {
    // Ignore input fields, textareas, contenteditable
    const target = e.target as HTMLElement | null;
    if (
      target &&
      (target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable)
    ) {
      return;
    }

    // Check Konami Code
    const key = e.key;
    if (key.toLowerCase() === konamiSequence[konamiIndex].toLowerCase()) {
      konamiIndex++;
      if (konamiIndex === konamiSequence.length) {
        konamiIndex = 0;
        console.log("%c★ SINGULARITY UNLOCKED: KONAMI CODE VERIFIED ★", "color: #E8A838; font-weight: bold; font-size: 16px;");
        if (callbacks?.onKonamiSuccess) {
          callbacks.onKonamiSuccess();
        } else {
          window.dispatchEvent(new CustomEvent("tarik:konami-unlocked"));
        }
      }
    } else {
      konamiIndex = 0;
    }

    // Check Single Key Shortcuts
    if (!e.ctrlKey && !e.metaKey && !e.altKey) {
      if (e.key === "a" || e.key === "A") {
        callbacks?.onOpenAskTarik?.() ?? window.dispatchEvent(new CustomEvent("tarik:open-ask-ai"));
      } else if (e.key === "e" || e.key === "E") {
        callbacks?.onOpenEngineInspector?.() ?? window.dispatchEvent(new CustomEvent("tarik:open-engine-inspector"));
      } else if (e.key === "t" || e.key === "T") {
        callbacks?.onOpenTerminal?.() ?? window.dispatchEvent(new CustomEvent("tarik:open-terminal"));
      }
    }
  };

  window.addEventListener("keydown", handleKeyDown);
  return () => window.removeEventListener("keydown", handleKeyDown);
}
