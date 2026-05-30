"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
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
    <div className="min-h-full bg-[color:var(--bg)]">
      <div className="mx-auto max-w-md px-4 pb-16 pt-12 sm:px-6">
        <div className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm">
          <h1 className="text-2xl font-semibold tracking-tight text-[color:var(--text)]">
            Welcome back to Kolinked
          </h1>
          <p className="mt-2 text-sm text-black/60">
            Sign in to access your account.
          </p>

          <form onSubmit={onSubmit} className="mt-6 space-y-4">
            <div>
              <label className="text-sm font-semibold text-black/70">
                Email
              </label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                required
                className="mt-1 w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm outline-none ring-[color:var(--navy)]/30 focus:ring-4"
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
                className="mt-1 w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm outline-none ring-[color:var(--navy)]/30 focus:ring-4"
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full rounded-xl bg-[color:var(--red)] px-4 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#cc2f3b] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting ? "Signing in..." : "Sign In"}
            </button>

            {error ? (
              <p className="text-sm font-semibold text-[color:var(--red)]">
                {error}
              </p>
            ) : null}

            <p className="pt-2 text-sm text-black/60">
              Don&apos;t have an account?{" "}
              <Link
                href="/auth/signup"
                className="font-semibold text-[color:var(--navy)] hover:underline"
              >
                Sign up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

