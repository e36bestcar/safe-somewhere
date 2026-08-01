/**
 * Shared security response headers for Safe Somewhere.
 * Applied via next.config.ts (static) and src/proxy.ts (request-scoped CSP).
 * Do not put anything here that changes rendered pixels.
 */

export type SecurityHeader = { key: string; value: string };

/**
 * CSP for HTML navigations. Nonce is required so Next.js framework
 * scripts can run under `strict-dynamic`.
 * Set ONLY from proxy — never also from next.config (multiple CSP
 * headers are AND-combined and will break scripts).
 */
export function buildContentSecurityPolicy(nonce: string): string {
  const isDev = process.env.NODE_ENV === "development";
  // Prod Analytics loads from /_vercel/insights (same origin).
  // Dev debug script + event posts use Vercel insight hosts.
  const connectSrc = isDev
    ? "connect-src 'self' https://va.vercel-scripts.com https://vitals.vercel-insights.com"
    : "connect-src 'self' https://vitals.vercel-insights.com";
  return [
    "default-src 'self'",
    // Dev needs unsafe-eval for React debugging stacks (Next docs)
    // + va.vercel-scripts.com for Analytics debug script
    `script-src 'self' 'nonce-${nonce}' 'strict-dynamic'${isDev ? " 'unsafe-eval' https://va.vercel-scripts.com" : ""}`,
    // Tailwind / App Router inject style tags
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: blob:",
    "font-src 'self'",
    connectSrc,
    "media-src 'self'",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    "worker-src 'self' blob:",
    "manifest-src 'self'",
    "upgrade-insecure-requests",
  ].join("; ");
}

/** Headers safe to apply from next.config (no CSP — that is proxy-only). */
export const STATIC_SECURITY_HEADERS: SecurityHeader[] = [
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "X-Frame-Options",
    value: "DENY",
  },
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  {
    key: "Permissions-Policy",
    value: [
      "accelerometer=()",
      "autoplay=()",
      "bluetooth=()",
      "camera=()",
      "display-capture=()",
      "encrypted-media=()",
      "fullscreen=(self)",
      "geolocation=()",
      "gyroscope=()",
      "hid=()",
      "idle-detection=()",
      "magnetometer=()",
      "microphone=()",
      "midi=()",
      "payment=()",
      "picture-in-picture=()",
      "publickey-credentials-get=()",
      "screen-wake-lock=()",
      "serial=()",
      "usb=()",
      "web-share=()",
      "xr-spatial-tracking=()",
      "interest-cohort=()",
    ].join(", "),
  },
  {
    key: "Cross-Origin-Opener-Policy",
    value: "same-origin",
  },
  {
    key: "Cross-Origin-Resource-Policy",
    value: "same-origin",
  },
  {
    key: "X-DNS-Prefetch-Control",
    value: "off",
  },
  {
    key: "X-Permitted-Cross-Domain-Policies",
    value: "none",
  },
  {
    key: "Origin-Agent-Cluster",
    value: "?1",
  },
];
