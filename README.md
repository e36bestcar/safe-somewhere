# Safe Somewhere

Collective / imprint landing — quiet arrival, soft socials.

## Stack

Next.js 16 · React 19 · Tailwind 4 · TypeScript · Vercel  
Payload CMS later (content in code for v1)

## Design

See `DESIGN.md` — locked: palette 15, Six Caps + Host Grotesk, matte concrete, **06e +2** soft-light wordmark.  
Visual files are checksum-locked (`npm run verify:visual-lock`).

## Develop

```bash
npm run dev
```

→ http://localhost:3031

## Production checks

```bash
npm run ci          # lint + typecheck + visual lock + build
npm run audit       # prod dependency advisories (informational)
```

## Notes

- Product brief: `PRODUCT.md`
- Design lock: `DESIGN.md`
- Security / Vercel hardening: `SECURITY.md`
- Moodboards / labs (not deployed): `moodboards/`
- Env template: `.env.example` — set `NEXT_PUBLIC_SITE_URL` on Vercel
