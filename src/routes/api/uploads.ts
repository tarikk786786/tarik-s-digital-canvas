import { createFileRoute } from "@tanstack/react-router";
import { validateUploadFile } from "@/lib/find-someone/security";

const CORS: Record<string, string> = {
  "Access-Control-Allow-Origin": "https://tarik-s-digital-canvas.vercel.app",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export const Route = createFileRoute("/api/uploads")({
  server: {
    handlers: {
      OPTIONS: async () => new Response(null, { status: 204, headers: CORS }),

      POST: async ({ request }) => {
        try {
          const body = await request.json().catch(() => ({}));
          const fileName = String(body.fileName || "");
          const fileSize = Number(body.fileSize || 0);
          const mimeType = String(body.mimeType || "");

          const validation = validateUploadFile(fileName, fileSize, mimeType);
          if (!validation.isValid) {
            return Response.json({ error: validation.error }, { status: 400, headers: CORS });
          }

          return Response.json(
            {
              status: "ACCEPTED",
              fileName,
              fileSize,
              message:
                "File metadata accepted. Object storage is not connected yet — nothing was hashed or OCR'd.",
            },
            { status: 202, headers: CORS },
          );
        } catch (err) {
          return Response.json(
            { error: "Upload processing failed", details: (err as Error).message },
            { status: 500, headers: CORS },
          );
        }
      },
    },
  },
});
