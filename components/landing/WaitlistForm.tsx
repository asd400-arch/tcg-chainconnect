"use client";

import { useEffect, useMemo, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

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

export function WaitlistForm() {
  const supabase = useMemo(() => createClient(), []);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [industry, setIndustry] = useState<(typeof industries)[number]>("Technology");
  const [country, setCountry] = useState<(typeof countries)[number]>("Singapore");

  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [count, setCount] = useState<number | null>(null);

  async function refreshCount() {
    const { count, error } = await supabase
      .from("waitlist")
      .select("*", { count: "exact", head: true });
    if (!error && typeof count === "number") setCount(count);
  }

  useEffect(() => {
    refreshCount();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    setSuccess(false);

    const { error } = await supabase.from("waitlist").insert({
      email: email.trim().toLowerCase(),
      name: name.trim(),
      company: company.trim(),
      country,
      industry,
    });

    setSubmitting(false);

    if (error) {
      if (error.code === "23505") {
        setSuccess(true);
        setError("This email is already registered.");
        return;
      }
      setError(error.message);
      return;
    }

    setSuccess(true);
    setName("");
    setEmail("");
    setCompany("");
    setIndustry("Technology");
    setCountry("Singapore");
    refreshCount();
  }

  return (
    <section
      id="waitlist"
      className="relative overflow-hidden bg-[color:var(--cc-primary)] py-16"
    >
      <div className="absolute inset-0 opacity-25">
        <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-white/15 blur-3xl" />
        <div className="absolute -right-20 top-24 h-72 w-72 rounded-full bg-[color:var(--cc-accent)]/60 blur-3xl" />
      </div>

      <div className="cc-container relative grid gap-10 sm:grid-cols-2">
        <div className="text-white">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Be First on Kolinked
          </h2>
          <p className="mt-3 text-base leading-7 text-white/80">
            Join 2,000+ professionals on the waitlist. Launching Q3 2026.
          </p>
          <div className="mt-6 rounded-2xl bg-white/10 p-5 ring-1 ring-white/15">
            <div className="text-sm font-semibold text-white/90">
              What you’ll unlock at launch
            </div>
            <ul className="mt-3 space-y-2 text-sm text-white/80">
              <li>• Global Korean-first professional profiles</li>
              <li>• Jobs at Korean companies worldwide</li>
              <li>• Curated Korean business news & alerts</li>
            </ul>
          </div>
        </div>

        <div className="cc-card p-6">
          <form onSubmit={onSubmit} className="space-y-4">
            <Input
              label="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="e.g., Min-jun Park"
            />
            <Input
              label="Work Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              type="email"
              placeholder="name@company.com"
            />
            <Input
              label="Company"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder="e.g., Samsung / Grab / Deloitte"
            />

            <div>
              <label className="text-sm font-semibold text-black/70">
                Industry
              </label>
              <select
                value={industry}
                onChange={(e) =>
                  setIndustry(e.target.value as (typeof industries)[number])
                }
                className="mt-1 w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm outline-none ring-[color:var(--cc-primary)]/30 focus:ring-4"
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
                className="mt-1 w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm outline-none ring-[color:var(--cc-primary)]/30 focus:ring-4"
              >
                {countries.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <Button
              type="submit"
              variant="ghost"
              size="lg"
              loading={submitting}
              className="w-full bg-white text-[color:var(--cc-accent)] hover:bg-white/90"
            >
              Join Waitlist →
            </Button>

            {success ? (
              <p className="text-sm font-semibold text-emerald-700">
                You&apos;re on the list! We&apos;ll notify you at launch.
              </p>
            ) : null}
            {error ? (
              <p className="text-sm font-semibold text-[color:var(--cc-accent)]">
                {error}
              </p>
            ) : null}

            <p className="text-sm font-semibold text-black/55">
              Join{" "}
              <span className="text-[color:var(--cc-primary)]">
                {typeof count === "number" ? count.toLocaleString() : "—"}
              </span>{" "}
              professionals already waiting
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}

