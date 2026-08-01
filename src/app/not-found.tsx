import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Not found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <main
      style={{
        minHeight: "100dvh",
        display: "grid",
        placeItems: "center",
        background: "oklch(0.48 0.02 95)",
        color: "oklch(0.14 0.02 250)",
        fontFamily: "system-ui, sans-serif",
        padding: "2rem",
      }}
    >
      <p
        style={{
          margin: 0,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
        }}
      >
        <Link href="/" style={{ color: "inherit", textDecoration: "none" }}>
          Safe Somewhere
        </Link>
      </p>
    </main>
  );
}
