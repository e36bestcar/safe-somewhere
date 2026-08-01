"use client";

/**
 * Root crash boundary. Must not depend on root layout fonts/CSS.
 */
export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100dvh",
          display: "grid",
          placeItems: "center",
          background: "#6e6a60",
          color: "#1a1a22",
          fontFamily: "system-ui, sans-serif",
          padding: "2rem",
          textAlign: "center",
        }}
      >
        <div>
          <p style={{ letterSpacing: "0.08em", textTransform: "uppercase" }}>
            Safe Somewhere
          </p>
          <button
            type="button"
            onClick={reset}
            style={{
              marginTop: "1rem",
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
            Reload
          </button>
        </div>
      </body>
    </html>
  );
}
