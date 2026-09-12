import {
  Camera,
  Image as ImageIcon,
  MapPin,
  FileSearch,
  ShieldAlert,
  CheckCircle2,
  Upload,
  AlertTriangle,
} from "lucide-react";
import type { ImageIntelligence } from "@/lib/find-someone/types";

interface ImageViewProps {
  image: ImageIntelligence;
  onUploadNew?: () => void;
}

export function ImageView({ image, onUploadNew }: ImageViewProps) {
  return (
    <div className="space-y-6">
      {/* Image Header Card */}
      <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-6 sm:p-8 backdrop-blur-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="grid size-14 shrink-0 place-items-center rounded-2xl border border-pink-400/40 bg-[#0E121A] text-pink-400 shadow-[0_0_24px_rgba(244,114,182,0.25)]">
              <Camera className="size-7" />
            </div>
            <div>
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-pink-400 font-bold">
                IMAGE INTELLIGENCE & OPTICAL METADATA ANALYSIS
              </span>
              <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-foreground">
                {image.fileName}
              </h2>
              <p className="font-mono text-xs text-muted-foreground mt-0.5">
                Resolution: {image.dimensions} · File Size: {image.fileSize}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onUploadNew}
            className="flex items-center gap-2 rounded-lg border border-white/15 bg-white/5 px-4 py-2 font-mono text-xs font-semibold text-foreground hover:bg-white/10 transition-all cursor-pointer"
          >
            <Upload className="size-3.5" />
            <span>Inspect Another Image</span>
          </button>
        </div>

        {/* Ethical Non-Speculation Notice */}
        <div className="flex items-center gap-2 rounded-lg border border-amber-500/30 bg-amber-500/10 p-3 text-xs text-amber-300 font-mono">
          <ShieldAlert className="size-4 shrink-0 text-amber-400" />
          <span>{image.attributionCaveat}</span>
        </div>
      </div>

      {/* Main Grid: Optical Text, EXIF, Clues */}
      <div className="grid gap-6 lg:grid-cols-12">
        {/* Left Column (7 cols): Optical OCR Text & Document Elements */}
        <div className="space-y-6 lg:col-span-7">
          {/* Visible Text Extracted */}
          <div className="rounded-xl border border-white/10 bg-white/[0.02] p-5 backdrop-blur-xl space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-display text-sm font-bold text-foreground">
                Extracted Visible Text & Display Typography
              </h4>
              <span className="rounded bg-[#6EE7B7]/10 px-2 py-0.5 font-mono text-[9.5px] text-[#6EE7B7] border border-[#6EE7B7]/20">
                OCR Matched
              </span>
            </div>

            <div className="space-y-2 font-mono text-xs">
              {image.visibleTextExtracted.map((text, idx) => (
                <div
                  key={idx}
                  className="rounded-lg border border-white/5 bg-black/40 p-3 text-foreground/90 font-semibold"
                >
                  "{text}"
                </div>
              ))}
            </div>
          </div>

          {/* Identified Document / Environmental Elements */}
          <div className="rounded-xl border border-white/10 bg-white/[0.02] p-5 backdrop-blur-xl space-y-3">
            <h4 className="font-display text-sm font-bold text-foreground">
              Identified Equipment & Physical Artifacts
            </h4>
            <div className="space-y-2">
              {image.identifiedDocumentElements.map((elem, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 rounded-lg border border-white/5 bg-white/[0.02] p-2.5 font-mono text-xs text-foreground"
                >
                  <CheckCircle2 className="size-3.5 text-[#62E6FF] shrink-0" />
                  <span>{elem}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column (5 cols): Camera EXIF & Context */}
        <div className="space-y-6 lg:col-span-5">
          {/* EXIF Metadata */}
          {image.cameraExif && (
            <div className="rounded-xl border border-white/10 bg-white/[0.02] p-5 backdrop-blur-xl space-y-3">
              <h4 className="font-display text-sm font-bold text-foreground">
                Hardware & Camera EXIF Headers
              </h4>
              <div className="space-y-2 font-mono text-xs text-muted-foreground">
                {image.cameraExif.make && (
                  <div className="flex justify-between bg-white/5 p-2 rounded">
                    <span>Device:</span>
                    <span className="text-foreground">
                      {image.cameraExif.make} {image.cameraExif.model}
                    </span>
                  </div>
                )}
                {image.cameraExif.captureTime && (
                  <div className="flex justify-between bg-white/5 p-2 rounded">
                    <span>Timestamp:</span>
                    <span className="text-foreground">{image.cameraExif.captureTime}</span>
                  </div>
                )}
                {image.cameraExif.gpsCoordinates && (
                  <div className="bg-white/5 p-2.5 rounded space-y-1">
                    <span className="flex items-center gap-1 text-amber-400 font-semibold">
                      <MapPin className="size-3" /> Geographic Coordinates
                    </span>
                    <span className="text-foreground text-[11px] block">
                      {image.cameraExif.gpsCoordinates}
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Contextual Intelligence & Source Verification */}
          <div className="rounded-xl border border-white/10 bg-white/[0.02] p-5 backdrop-blur-xl space-y-3">
            <h4 className="font-display text-sm font-bold text-foreground">
              Contextual Intelligence
            </h4>
            <div className="space-y-2 text-xs text-muted-foreground">
              {image.contextualClues.map((clue, idx) => (
                <div key={idx} className="rounded bg-white/5 p-2.5 leading-relaxed">
                  • {clue}
                </div>
              ))}
            </div>

            <div className="mt-3 pt-3 border-t border-white/5 font-mono text-[10.5px] text-muted-foreground">
              <span className="text-[#62E6FF] block mb-1">Potential Publication Context:</span>
              <p>{image.potentialSourceContext}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
