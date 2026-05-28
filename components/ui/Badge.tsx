import * as React from "react";

type Variant = "comingSoon" | "new" | "koreanCompany" | "pro";

function cx(...classes: Array<string | undefined | false>) {
  return classes.filter(Boolean).join(" ");
}

const variants: Record<Variant, string> = {
  comingSoon: "bg-black/5 text-black/60 ring-1 ring-black/10",
  new: "bg-[color:var(--cc-accent)] text-white",
  koreanCompany: "bg-[color:var(--cc-primary)] text-white",
  pro: "bg-[#C9A227] text-[#1A1A2E]",
};

export type BadgeProps = React.HTMLAttributes<HTMLSpanElement> & {
  variant?: Variant;
};

export function Badge({ variant = "comingSoon", className, ...props }: BadgeProps) {
  return (
    <span
      {...props}
      className={cx(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold",
        variants[variant],
        className,
      )}
    />
  );
}

