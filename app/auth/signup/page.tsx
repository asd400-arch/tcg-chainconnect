"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

const industries = [
  "Technology",
  "Finance",
  "Logistics & Supply Chain",
  "Marketing",
  "Healthcare",
  "Education",
  "F&B",
  "Beauty & Cosmetics",
  "Media & Entertainment",
  "Other",
] as const;

const countries = [
  "South Korea",
  "Singapore",
  "Indonesia",
  "Malaysia",
  "Thailand",
  "Philippines",
  "Vietnam",
  "Japan",
  "United States",
  "United Kingdom",
  "Australia",
  "Other",
] as const;

export default function SignupPage() {
  const router = useRouter();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [industry, setIndustry] =
    useState<(typeof industries)[number]>("Technology");
  const [country, setCountry] =
    useState<(typeof countries)[number]>("Singapore");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    if (password !== confirmPassword) {
      setSubmitting(false);
      setError("Passwords do not match.");
      return;
    }

    const supabase = createClient();
    const { error } = await supabase.auth.signUp({
      email: email.trim(),
      password,
      options: {
        data: {
          full_name: fullName.trim(),
          industry,
          country,
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
    <div className="min-h-full bg-[color:var(--bg)]">
      <div className="mx-auto max-w-md px-4 pb-16 pt-12 sm:px-6">
        <div className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm">
          <h1 className="text-2xl font-semibold tracking-tight text-[color:var(--text)]">
            Join Kolinked
          </h1>
          <p className="mt-2 text-sm text-black/60">
            Create your account to be ready for launch.
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
                className="mt-1 w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm outline-none ring-[color:var(--navy)]/30 focus:ring-4"
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
                minLength={6}
                className="mt-1 w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm outline-none ring-[color:var(--navy)]/30 focus:ring-4"
              />
              <p className="mt-2 text-xs text-black/50">Minimum 6 characters.</p>
            </div>

            <div>
              <label className="text-sm font-semibold text-black/70">
                Confirm Password
              </label>
              <input
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                type="password"
                required
                minLength={6}
                className="mt-1 w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm outline-none ring-[color:var(--navy)]/30 focus:ring-4"
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-black/70">
                Industry
              </label>
              <select
                value={industry}
                onChange={(e) =>
                  setIndustry(e.target.value as (typeof industries)[number])
                }
                className="mt-1 w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm outline-none ring-[color:var(--navy)]/30 focus:ring-4"
              >
                {industries.map((i) => (
                  <option key={i} value={i}>
                    {i}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-sm font-semibold text-black/70">
                Country
              </label>
              <select
                value={country}
                onChange={(e) =>
                  setCountry(e.target.value as (typeof countries)[number])
                }
                className="mt-1 w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm outline-none ring-[color:var(--navy)]/30 focus:ring-4"
              >
                {countries.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full rounded-xl bg-[color:var(--red)] px-4 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#cc2f3b] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting ? "Creating account..." : "Create Account"}
            </button>

            {error ? (
              <p className="text-sm font-semibold text-[color:var(--red)]">
                {error}
              </p>
            ) : null}

            <p className="pt-2 text-sm text-black/60">
              Already have an account?{" "}
              <Link
                href="/auth/login"
                className="font-semibold text-[color:var(--navy)] hover:underline"
              >
                Sign in
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

