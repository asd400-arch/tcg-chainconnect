"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function SignupPage() {
  const router = useRouter();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const supabase = createClient();
    const { error } = await supabase.auth.signUp({
      email: email.trim(),
      password,
      options: {
        data: {
          full_name: fullName.trim(),
        },
      },
    });

    setSubmitting(false);

    if (error) {
      setError(error.message);
      return;
    }

    router.push("/dashboard");
    router.refresh();
  }

  return (
    <div className="min-h-full bg-[color:var(--cc-bg)]">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-6 sm:px-6">
        <Link href="/" className="text-lg font-semibold tracking-tight">
          <span className="text-[color:var(--cc-primary)]">Chain</span>
          <span className="text-[color:var(--cc-accent)]">Connect</span>
        </Link>
        <Link
          href="/auth/login"
          className="rounded-full px-4 py-2 text-sm font-semibold text-[color:var(--cc-primary)] hover:bg-black/5"
        >
          Login
        </Link>
      </div>

      <div className="mx-auto max-w-md px-4 pb-16 pt-10 sm:px-6">
        <div className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm">
          <h1 className="text-2xl font-semibold tracking-tight text-[color:var(--cc-text)]">
            Create your account
          </h1>
          <p className="mt-2 text-sm text-black/60">
            Join ChainConnect and start building your network.
          </p>

          <form onSubmit={onSubmit} className="mt-6 space-y-4">
            <div>
              <label className="text-sm font-semibold text-black/70">
                Full Name
              </label>
              <input
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                className="mt-1 w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm outline-none ring-[color:var(--cc-primary)]/30 focus:ring-4"
              />
            </div>
            <div>
              <label className="text-sm font-semibold text-black/70">
                Email
              </label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                required
                className="mt-1 w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm outline-none ring-[color:var(--cc-primary)]/30 focus:ring-4"
              />
            </div>
            <div>
              <label className="text-sm font-semibold text-black/70">
                Password
              </label>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                required
                minLength={6}
                className="mt-1 w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm outline-none ring-[color:var(--cc-primary)]/30 focus:ring-4"
              />
              <p className="mt-2 text-xs text-black/50">Minimum 6 characters.</p>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full rounded-xl bg-[color:var(--cc-accent)] px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-[#cc2f3b] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting ? "Signing up..." : "Sign up"}
            </button>

            {error ? (
              <p className="text-sm font-semibold text-[color:var(--cc-accent)]">
                {error}
              </p>
            ) : null}
          </form>
        </div>
      </div>
    </div>
  );
}

