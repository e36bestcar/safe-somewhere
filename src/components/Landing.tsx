const SOCIALS = [
  {
    href: "https://instagram.com/safe.somewhere",
    label: "ig · safe.somewhere",
  },
  {
    href: "https://www.tiktok.com/@safesomewhere",
    label: "tt · @safesomewhere",
  },
  {
    href: "https://www.youtube.com/@safesomewhere",
    label: "yt · safesomewhere",
  },
] as const;

export function Landing() {
  return (
    <main className="stage">
      <SvgMatteFilter />
      <div className="tex-matte" aria-hidden />
      <div className="tex-grain" aria-hidden />
      <div className="tex-vignette" aria-hidden />

      {/* Wordmark sits with matte layers (same stacking as 06e mock) */}
      <h1 className="wordmark anim-word">
        Safe
        <br />
        Somewhere
      </h1>

      <div className="stage-content">
        <div className="edges anim-edges">
          <span className="edge">soon</span>
          <span className="edge">safe</span>
        </div>

        <div className="hero-spacer" aria-hidden />

        <div className="edges edges--bottom anim-socials">
          <nav className="socials" aria-label="Social">
            {SOCIALS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                {item.label}
              </a>
            ))}
          </nav>
          <span className="edge">somewhere</span>
        </div>
      </div>
    </main>
  );
}

function SvgMatteFilter() {
  return (
    <svg
      width="0"
      height="0"
      aria-hidden
      style={{ position: "absolute" }}
    >
      <defs>
        <filter
          id="matte-concrete"
          x="0%"
          y="0%"
          width="100%"
          height="100%"
          colorInterpolationFilters="sRGB"
        >
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.75"
            numOctaves="4"
            seed="7"
            result="noise"
          />
          <feDiffuseLighting
            in="noise"
            lightingColor="#ffffff"
            surfaceScale="1.4"
            result="light"
          >
            <feDistantLight azimuth="135" elevation="48" />
          </feDiffuseLighting>
          <feComponentTransfer in="light" result="matte">
            <feFuncR type="linear" slope="0.85" intercept="0.05" />
            <feFuncG type="linear" slope="0.85" intercept="0.05" />
            <feFuncB type="linear" slope="0.85" intercept="0.05" />
          </feComponentTransfer>
        </filter>
      </defs>
    </svg>
  );
}
