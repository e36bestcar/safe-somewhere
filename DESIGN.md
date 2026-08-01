# Safe Somewhere — Design

Locked visual · 2026-08-01  
Enforced by `visual-lock.sha256` (see `SECURITY.md`).

## Locked visual system

| Token | Value |
|-------|--------|
| Palette | **15 · Satellite dish** |
| Wordmark | **Six Caps** · normal two-line stack (Safe / Somewhere) |
| Body / UI | **Host Grotesk** |
| Edge / labels | **Six Caps** · `soon` · `safe` · `somewhere` |
| Matte | **SVG concrete** (`#matte-concrete`) + grain + vignette — **HARD-LOCKED** |
| Wordmark material | **06e +2** — soft-light bone stamp + dark lip |
| Chrome / holo / Envato metal | **Rejected** — do not reintroduce |

## Color (OKLCH)

```css
--bg: oklch(0.48 0.02 95);
--surface: oklch(0.54 0.022 95);
--ink: oklch(0.14 0.02 250);
--muted: oklch(0.26 0.025 250);
--primary: oklch(0.48 0.15 25); /* signal red */
--accent: oklch(0.45 0.06 230);
```

Wordmark: `color: oklch(0.93 0.01 95)` · `mix-blend-mode: soft-light` ·
`-webkit-text-stroke: 1.25px oklch(0.08 0.02 250 / 0.85)` · micro text-shadow.
Sits as a sibling of matte layers (no `isolation` on `.stage`) so soft-light blends with the field.

## Typography

| Role | Family | Notes |
|------|--------|--------|
| Wordmark | Six Caps | Ultra condensed · soft-light stamp |
| Edges | Six Caps | Corner labels |
| Socials / UI | Host Grotesk | Soft contact links |

## Materials

- **Matte field — LOCKED:** `#matte-concrete` + grain + vignette. No alternate fields.
- **Wordmark — LOCKED:** 06e +2 soft-light + stroke; normal stack (not overlapping).
- **No cast ellipse** on the live wordmark.

## Layout cue

kntxt.be-style full-bleed · text at edges · brand wordmark only in hero · soft socials  
Edges: `soon` · `safe` · `somewhere`

## Reference

Moodboard archive (not deployed): `moodboards/`  
Obsidian: `CURSOR WORK ZONE/Finding Apex/Safe-Somewhere/palette-moodboards`
