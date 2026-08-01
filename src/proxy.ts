import { NextResponse, type NextRequest } from "next/server";
import {
  STATIC_SECURITY_HEADERS,
  buildContentSecurityPolicy,
} from "@/lib/security-headers";

/** Landing has no mutations — reject write-shaped methods. */
const ALLOWED_METHODS = new Set(["GET", "HEAD", "OPTIONS"]);

/** Paths that look like recon / secret leakage probes. */
const BLOCKED_PATH =
  /(?:^|\/)(?:\.env(?:\..*)?|\.git(?:\/|$)|\.svn|\.hg|\.DS_Store|wp-admin|wp-login|wp-content|wp-includes|xmlrpc\.php|phpmyadmin|adminer|actuator|server-status|\.aws|\.docker|composer\.(?:json|lock)|package-lock\.json|yarn\.lock|pnpm-lock\.yaml|Dockerfile|\.npmrc|\.htaccess|\.htpasswd|web\.config|id_rsa|id_dsa|\.ssh|backup|dump|vendor\/phpunit|cgi-bin|credentials|secrets?\.(?:json|yml|yaml|txt)|config\.(?:php|yml|yaml|json|ini)|database\.ya?ml)(?:\/|$)/i;

const BLOCKED_EXT =
  /\.(?:php|asp|aspx|jsp|cgi|exe|sh|bash|env|bak|sql|ini|cfg|config|dist|old|swp|swo)$/i;

function isBlocked(pathname: string): boolean {
  if (pathname.includes("\0") || pathname.includes("%00")) return true;
  if (pathname.includes("..")) return true;
  if (BLOCKED_PATH.test(pathname)) return true;
  if (BLOCKED_EXT.test(pathname)) return true;
  return false;
}

function applyStaticHeaders(response: NextResponse) {
  for (const { key, value } of STATIC_SECURITY_HEADERS) {
    response.headers.set(key, value);
  }
}

function secureEmpty(status: number, extra?: HeadersInit): NextResponse {
  const response = new NextResponse(null, { status, headers: extra });
  applyStaticHeaders(response);
  response.headers.set("Cache-Control", "no-store");
  response.headers.set("Content-Security-Policy", "default-src 'none'");
  return response;
}

/**
 * Next.js 16+ proxy (formerly middleware).
 * Generates a per-request CSP nonce and blocks common probe paths.
 * Must not affect rendered pixels — headers / status only.
 */
export function proxy(request: NextRequest) {
  const method = request.method.toUpperCase();
  if (!ALLOWED_METHODS.has(method)) {
    return secureEmpty(405, { Allow: "GET, HEAD, OPTIONS" });
  }

  if (method === "OPTIONS") {
    return secureEmpty(204, { Allow: "GET, HEAD, OPTIONS" });
  }

  const { pathname } = request.nextUrl;

  if (isBlocked(pathname)) {
    return secureEmpty(404);
  }

  const nonce = Buffer.from(crypto.randomUUID()).toString("base64");
  const csp = buildContentSecurityPolicy(nonce);

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-nonce", nonce);
  // Next parses nonce from the request CSP during SSR
  requestHeaders.set("Content-Security-Policy", csp);

  const response = NextResponse.next({
    request: { headers: requestHeaders },
  });

  applyStaticHeaders(response);
  response.headers.set("Content-Security-Policy", csp);
  // Dynamic HTML carries a per-request nonce — do not let CDNs cache documents.
  response.headers.set(
    "Cache-Control",
    "private, no-cache, no-store, max-age=0, must-revalidate",
  );

  return response;
}

export const config = {
  matcher: [
    {
      source:
        "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
      missing: [
        { type: "header", key: "next-router-prefetch" },
        { type: "header", key: "purpose", value: "prefetch" },
      ],
    },
  ],
};
