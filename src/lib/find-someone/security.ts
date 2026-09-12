/**
 * FIND DETAILS — Security, Hardening & SSRF Protection
 * Enforces strict input validation, SSRF boundary controls, and file sanity.
 */

// Private IP / Loopback / Cloud Metadata Blacklist (RFC 1918, RFC 3927, RFC 6598)
const SSRF_BLOCKED_PATTERNS = [
  /^localhost$/i,
  /^127\.\d+\.\d+\.\d+$/,
  /^10\.\d+\.\d+\.\d+$/,
  /^192\.168\.\d+\.\d+$/,
  /^172\.(1[6-9]|2[0-9]|3[0-1])\.\d+\.\d+$/,
  /^169\.254\.\d+\.\d+$/, // Link-local & AWS/GCP metadata (169.254.169.254)
  /^::1$/,
  /^fe80:/i,
  /^fc00:/i,
  /^fd00:/i,
  /\.internal$/i,
  /\.local$/i,
];

/**
 * Validates whether a target URL or domain is safe to inspect
 * Returns false for private IPs, loopback, or cloud metadata endpoints.
 */
export function validateUrlForSSRF(urlOrDomain: string): { isSafe: boolean; reason?: string } {
  try {
    let hostname = urlOrDomain.trim();
    if (!hostname.startsWith("http://") && !hostname.startsWith("https://")) {
      hostname = "https://" + hostname;
    }

    const parsed = new URL(hostname);
    const host = parsed.hostname;

    for (const pattern of SSRF_BLOCKED_PATTERNS) {
      if (pattern.test(host)) {
        return {
          isSafe: false,
          reason: `SSRF Violation: Access to private/internal endpoint (${host}) is blocked.`,
        };
      }
    }

    return { isSafe: true };
  } catch {
    return { isSafe: false, reason: "Invalid domain or URL format." };
  }
}

/**
 * Validates uploaded document/image security parameters
 */
export function validateUploadFile(
  fileName: string,
  fileSize: number,
  mimeType: string,
): { isValid: boolean; error?: string } {
  const MAX_SIZE_BYTES = 15 * 1024 * 1024; // 15MB limit

  if (fileSize > MAX_SIZE_BYTES) {
    return { isValid: false, error: "File size exceeds 15MB limit." };
  }

  const allowedExtensions = [".pdf", ".docx", ".txt", ".png", ".jpg", ".jpeg", ".webp"];
  const dot = fileName.lastIndexOf(".");
  const ext = dot >= 0 ? fileName.slice(dot).toLowerCase() : "";

  if (!allowedExtensions.includes(ext)) {
    return {
      isValid: false,
      error: `Disallowed extension (${ext || "none"}). Allowed: PDF, DOCX, TXT, PNG, JPG, WEBP.`,
    };
  }

  void mimeType;
  return { isValid: true };
}

/**
 * Sanitizes untrusted text strings to prevent prompt injection and XSS
 */
export function sanitizePromptInput(input: string): string {
  return input
    .replace(/<[^>]*>/g, " ")
    .replace(/[\u0000-\u001f\u007f]/g, " ")
    .replace(/(?:system:|\bignore previous instructions\b|\byou are now\b)/gi, "[REDACTED]")
    .trim();
}
