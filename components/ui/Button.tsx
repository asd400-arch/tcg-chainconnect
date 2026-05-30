import * as React from "react";

type Variant = "primary" | "secondary" | "ghost" | "outline";
type Size = "sm" | "md" | "lg";

function cx(...classes: Array<string | undefined | false>) {
  return classes.filter(Boolean).join(" ");
}

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-colors cursor-pointer disabled:cursor-not-allowed disabled:opacity-60 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[color:var(--cc-primary)]/30";

const variants: Record<Variant, string> = {
  primary:
    "bg-[color:var(--red)] text-white hover:bg-[#cc2f3b] shadow-sm",
  secondary:
    "bg-[color:var(--navy)] text-white hover:bg-[#0b3b67] shadow-sm",
  ghost: "bg-transparent text-[color:var(--navy)] hover:bg-black/5",
  outline:
    "bg-transparent text-[color:var(--navy)] ring-1 ring-black/10 hover:bg-black/5",
};

const sizes: Record<Size, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-5 py-2.5 text-sm",
  lg: "px-6 py-3 text-sm sm:text-base",
};

function Spinner() {
  return (
    <span
      aria-hidden="true"
      className="h-4 w-4 animate-spin rounded-full border-2 border-white/50 border-t-white"
    />
  );
}

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
};

export function Button({
  variant = "primary",
  size = "md",
  loading,
  className,
  disabled,
  children,
  ...props
}: ButtonProps) {
  const isDisabled = disabled || loading;
  return (
    <button
      {...props}
      disabled={isDisabled}
      className={cx(base, variants[variant], sizes[size], className)}
    >
      {loading ? <Spinner /> : null}
      {children}
    </button>
  );
}

