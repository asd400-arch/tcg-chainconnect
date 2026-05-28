import * as React from "react";

function cx(...classes: Array<string | undefined | false>) {
  return classes.filter(Boolean).join(" ");
}

export type InputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "size"
> & {
  label: string;
  error?: string | null;
};

export function Input({ label, error, className, id, ...props }: InputProps) {
  const inputId = id ?? React.useId();
  const describedBy = error ? `${inputId}-error` : undefined;

  return (
    <div>
      <label
        htmlFor={inputId}
        className="text-sm font-semibold text-black/70"
      >
        {label}
      </label>
      <input
        id={inputId}
        aria-invalid={Boolean(error) || undefined}
        aria-describedby={describedBy}
        className={cx(
          "mt-1 w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm outline-none ring-[color:var(--cc-primary)]/30 focus:ring-4",
          error ? "border-[color:var(--cc-accent)]" : undefined,
          className,
        )}
        {...props}
      />
      {error ? (
        <p
          id={describedBy}
          className="mt-2 text-sm font-semibold text-[color:var(--cc-accent)]"
        >
          {error}
        </p>
      ) : null}
    </div>
  );
}

