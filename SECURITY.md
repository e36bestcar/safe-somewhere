# Security

## Locked visual (non-negotiable)

Production / platform work must **not** change rendered pixels.

| File | Role |
|------|------|
| `src/components/Landing.tsx` | Stage markup, edges, socials, matte SVG filter |
| `src/app/globals.css` | Palette, matte/grain/vignette, wordmark 06e+2, edges |

CI enforces integrity via `visual-lock.sha256` + `npm run verify:visual-lock`.

If a visual change is **explicitly** requested:

```bash
# …edit Landing / globals…
npm run verify:visual-lock -- --write
```

Do not “fix” layout while hardening.

## Reporting

Update `public/.well-known/security.txt` with a real contact before launch.
Until then, treat reports via the project owner.

## Platform controls (v1)

| Control | Where |
|--------|--------|
| Security headers (HSTS, COOP, CORP, Permissions-Policy, …) | `src/lib/security-headers.ts` → `next.config.ts` + `src/proxy.ts` |
| Nonce CSP (`strict-dynamic`) | `src/proxy.ts` only (never duplicate in next.config) |
| Probe / secret-path blocking | `src/proxy.ts` |
| Method allowlist (`GET`/`HEAD`/`OPTIONS`) | `src/proxy.ts` |
| HTML `Cache-Control: no-store` (nonce safety) | `src/proxy.ts` |
| Dynamic render for nonces | `src/app/page.tsx` `connection()` |
| Canonical site URL helper | `src/lib/site-url.ts` |
| No `X-Powered-By` | `next.config.ts` `poweredByHeader: false` |
| No production browser source maps | `next.config.ts` |
| Strip `console.*` in prod (keep error/warn) | `next.config.ts` `compiler.removeConsole` |
| Env template (no secrets in repo) | `.env.example` · `.gitignore` ignores `.env*` |
| Build exclude moodboards / labs / docs | `.vercelignore` |
| Robots / sitemap | `src/app/robots.ts` · `src/app/sitemap.ts` |
| Route / global error boundaries | `src/app/error.tsx` · `src/app/global-error.tsx` |
| CI | `.github/workflows/ci.yml` · `npm run ci` |
| Dependabot | `.github/dependabot.yml` |
| Visual lock | `visual-lock.sha256` · `scripts/verify-visual-lock.mjs` |
| Install discipline on Vercel | `vercel.json` → `npm ci` |
| Web Analytics | `@vercel/analytics` in `src/app/layout.tsx` |

Accepted risk: `style-src 'unsafe-inline'` (Tailwind / App Router). Dev-only: `script-src 'unsafe-eval'` for React debug stacks.

Platform quirk: HTTP `TRACE` is rejected by Next/undici before the proxy runs (typically a 500). Other non-GET methods are 405 from `src/proxy.ts`.

## Vercel dashboard checklist (manual)

Do these in the Vercel project settings before public launch:

1. **Deployment Protection** — protect preview deployments (password or Vercel Auth).
2. **Web Application Firewall** — enable Vercel WAF / Attack Challenge Mode as needed.
3. **Bot protection** — consider BotID / bot management if abuse appears.
4. **Environment variables** — set `NEXT_PUBLIC_SITE_URL` to the canonical HTTPS domain.
5. **Domains** — HTTPS only; enable HSTS preload only after domain is stable.
6. **Access / team** — least-privilege; require 2FA on the Vercel team.
7. **Logs** — retain runtime logs; no PII expected on this static page.
8. **OIDC / Secure Compute** — not required for v1 landing.
9. **Git** — connect repo; production branch `main`; disable auto-deploy from forks if applicable.

## Dependency notes

`npm audit` may report transitive issues inside `next` (e.g. bundled `postcss` /
`sharp`). Do **not** run `npm audit fix --force` — it can downgrade Next.
Track upstream Next releases and upgrade on the 16.x line when patches land.
CI runs `npm run audit` informationally (`continue-on-error`).

## Supply chain

- Production dependencies: Next + React only for v1.
- Prefer `npm ci` in CI and on Vercel (`vercel.json` `installCommand`).
- Pin majors; review lockfile diffs on upgrades.
- Dependabot weekly for npm; monthly for GitHub Actions.
