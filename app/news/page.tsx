import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { AppNavbar } from "@/components/layout/AppNavbar";

export const dynamic = "force-dynamic";

function SkeletonCard() {
  return (
    <div className="cc-card p-6">
      <div className="h-4 w-40 rounded-full cc-shimmer" />
      <div className="mt-4 h-3 w-full rounded-full cc-shimmer" />
      <div className="mt-2 h-3 w-5/6 rounded-full cc-shimmer" />
      <div className="mt-2 h-3 w-2/3 rounded-full cc-shimmer" />
    </div>
  );
}

export default async function NewsPage() {
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
            뉴스 피드 — 곧 출시
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            최고의 한국 비즈니스 뉴스를 큐레이션 중입니다. 2026년 3분기 출시
            예정.
          </p>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </div>
      </div>
    </>
  );
}

