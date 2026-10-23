"use client";

import { Info } from "lucide-react";
import { useId, useState, type ReactNode } from "react";

/**
 * A small "i" beside a label that shows a short explanation. It shows while the pointer is over it,
 * stays open once it has been clicked or tapped (click again to close), and can be reached and
 * opened with the keyboard. Escape, or moving away to something else, closes it. The words float
 * over the form instead of taking up room in it, so the fields around it stay in line.
 */
export function InfoTip({ children }: { children: ReactNode }) {
  const [hovered, setHovered] = useState(false);
  const [pinned, setPinned] = useState(false);
  const open = hovered || pinned;
  const id = useId();

  const close = () => {
    setHovered(false);
    setPinned(false);
  };

  return (
    <span
      className="relative inline-flex"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <button
        type="button"
        aria-label="More information"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setPinned((v) => !v)}
        onBlur={close}
        onKeyDown={(event) => {
          if (event.key === "Escape") close();
        }}
        className="inline-grid size-4 place-items-center rounded-full text-muted transition-colors hover:text-fg focus-visible:text-fg"
      >
        <Info className="size-3.5" aria-hidden />
      </button>
      {open && (
        <span
          id={id}
          role="note"
          className="absolute top-full left-0 z-20 mt-1 w-56 rounded-md border border-line bg-surface p-2.5 text-xs leading-snug font-normal tracking-normal text-fg normal-case shadow-lg"
        >
          {children}
        </span>
      )}
    </span>
  );
}
