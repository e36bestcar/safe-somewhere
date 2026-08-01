"use client";

/**
 * Minimal route-level error UI. Intentionally plain — not the landing stage.
 * Do not import Landing or globals stage styles here.
 */
export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
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
        textAlign: "center",
        gap: "1rem",
      }}
    >
      <p style={{ margin: 0, letterSpacing: "0.08em", textTransform: "uppercase" }}>
        Something went wrong
      </p>
      <button
        type="button"
        onClick={reset}
        style={{
          background: "transparent",
          border: "1px solid currentColor",
          color: "inherit",
          padding: "0.5rem 1rem",
          letterSpacing: "0.06em",
          textTransform: "uppercase",
          cursor: "pointer",
          font: "inherit",
        }}
      >
        Try again
      </button>
    </main>
  );
}
