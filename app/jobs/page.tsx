import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { AppNavbar } from "@/components/layout/AppNavbar";

export const dynamic = "force-dynamic";

function SkeletonJobCard() {
  return (
    <div className="cc-card p-6">
      <div className="flex items-center justify-between gap-4">
        <div className="h-4 w-40 rounded-full cc-shimmer" />
        <div className="h-6 w-24 rounded-full cc-shimmer" />
      </div>
      <div className="mt-4 h-3 w-3/5 rounded-full cc-shimmer" />
      <div className="mt-2 h-3 w-2/5 rounded-full cc-shimmer" />
      <div className="mt-5 h-9 w-28 rounded-xl cc-shimmer" />
    </div>
  );
}

export default async function JobsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/auth/login");

  return (
    <>
      <AppNavbar />
      <div className="cc-container py-10">
        <div className="cc-card p-6">
          <h1 className="text-2xl font-bold tracking-tight text-[color:var(--text)]">
            채용 게시판 — 곧 출시
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            한국 기업들이 채용 공고를 올리고 있습니다. 가장 먼저 지원하세요.
            2026년 3분기 출시 예정.
          </p>

        <div className="mt-6 grid gap-3 sm:grid-cols-12">
          <div className="sm:col-span-6">
            <label className="text-sm font-semibold text-black/70">Search</label>
            <input
              placeholder="Search title, company..."
              className="mt-1 w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm outline-none ring-[color:var(--navy)]/30 focus:ring-4"
            />
          </div>
          <div className="sm:col-span-3">
            <label className="text-sm font-semibold text-black/70">
              Country
            </label>
            <select className="mt-1 w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm outline-none ring-[color:var(--navy)]/30 focus:ring-4">
              <option>Any</option>
              <option>South Korea</option>
              <option>Singapore</option>
              <option>United States</option>
              <option>Other</option>
            </select>
          </div>
          <div className="sm:col-span-3">
            <label className="text-sm font-semibold text-black/70">
              Industry
            </label>
            <select className="mt-1 w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm outline-none ring-[color:var(--navy)]/30 focus:ring-4">
              <option>Any</option>
              <option>Technology</option>
              <option>Finance</option>
              <option>Logistics & Supply Chain</option>
              <option>Other</option>
            </select>
          </div>

          <div className="sm:col-span-12">
            <label className="inline-flex items-center gap-2 text-sm font-semibold text-black/70">
              <input type="checkbox" className="h-4 w-4" />
              Korean company only
            </label>
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <SkeletonJobCard />
        <SkeletonJobCard />
        <SkeletonJobCard />
      </div>
      </div>
    </>
  );
}

