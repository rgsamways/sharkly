import type { CSSProperties } from "react";

/**
 * A tiny twinkling star. Decoration only: hidden from screen readers, never clickable, and
 * absolutely positioned, so it can never move any content. Put it inside a `relative` wrapper and
 * place it with `className` (for example "-top-2 -right-3"). Give neighbours different `delay`s so
 * they do not twinkle in step. All motion stops when the visitor asks for reduced motion.
 */
export function Sparkle({
  size = 12,
  className = "",
  delay = 0,
  duration = 4,
  tone = "highlight",
}: {
  /** Width and height in pixels. */
  size?: number;
  className?: string;
  /** Seconds to wait before the first twinkle. */
  delay?: number;
  /** Seconds per twinkle. Keep it slow: two seconds or more. */
  duration?: number;
  tone?: "highlight" | "accent";
}) {
  const style = {
    width: size,
    height: size,
    "--twinkle-delay": `${delay}s`,
    "--twinkle-duration": `${Math.max(2, duration)}s`,
  } as CSSProperties;
  return (
    <span
      aria-hidden
      className={`sparkle ${tone === "accent" ? "sparkle-accent" : ""} ${className}`.trim()}
      style={style}
    />
  );
}
