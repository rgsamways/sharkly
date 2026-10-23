import Link from "next/link";
import type { ComponentProps } from "react";

const base =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold transition-colors disabled:cursor-not-allowed disabled:opacity-50";

const variants = {
  primary: "shine bg-accent text-accent-fg hover:opacity-90",
  ghost: "border border-line-strong text-fg hover:border-fg",
} as const;

type Variant = keyof typeof variants;

export function LinkButton({
  variant = "primary",
  className = "",
  ...props
}: ComponentProps<typeof Link> & { variant?: Variant }) {
  return <Link className={`${base} ${variants[variant]} ${className}`.trim()} {...props} />;
}
