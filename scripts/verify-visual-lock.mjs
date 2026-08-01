#!/usr/bin/env node
/**
 * Fails CI if locked visual files drift without an intentional hash update.
 * Usage:
 *   node scripts/verify-visual-lock.mjs
 *   node scripts/verify-visual-lock.mjs --write
 */
import { createHash } from "node:crypto";
import { readFileSync, writeFileSync } from "node:fs";
import { resolve, dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const lockPath = join(root, "visual-lock.sha256");
const FILES = ["src/components/Landing.tsx", "src/app/globals.css"];

function hashFile(rel) {
  const buf = readFileSync(join(root, rel));
  return createHash("sha256").update(buf).digest("hex");
}

const write = process.argv.includes("--write");

if (write) {
  const lines = [
    "# Visual lock — do not change these files without an explicit visual ask.",
    "# Regenerate: node scripts/verify-visual-lock.mjs --write",
    ...FILES.map((f) => `${hashFile(f)}  ${f}`),
    "",
  ];
  writeFileSync(lockPath, lines.join("\n"));
  console.log("Wrote", lockPath);
  process.exit(0);
}

const raw = readFileSync(lockPath, "utf8");
const expected = new Map();
for (const line of raw.split("\n")) {
  const trimmed = line.trim();
  if (!trimmed || trimmed.startsWith("#")) continue;
  const [hash, file] = trimmed.split(/\s+/);
  if (hash && file) expected.set(file, hash);
}

let failed = false;
for (const file of FILES) {
  const actual = hashFile(file);
  const want = expected.get(file);
  if (!want) {
    console.error(`MISSING in visual-lock.sha256: ${file}`);
    failed = true;
    continue;
  }
  if (actual !== want) {
    console.error(`VISUAL LOCK DRIFT: ${file}`);
    console.error(`  expected ${want}`);
    console.error(`  actual   ${actual}`);
    failed = true;
  } else {
    console.log(`ok  ${file}`);
  }
}

for (const file of expected.keys()) {
  if (!FILES.includes(file)) {
    console.error(`UNEXPECTED lock entry: ${file}`);
    failed = true;
  }
}

if (failed) {
  console.error(
    "\nVisual files changed. If intentional, re-lock with:\n  npm run verify:visual-lock -- --write\nOtherwise restore Landing.tsx / globals.css.",
  );
  process.exit(1);
}

console.log("Visual lock intact.");
