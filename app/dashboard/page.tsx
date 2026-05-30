import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { AppNavbar } from "@/components/layout/AppNavbar";
import { WelcomeBanner } from "@/components/dashboard/WelcomeBanner";
import { ComingSoonCard } from "@/components/dashboard/ComingSoonCard";
import { calculateProfileCompletion } from "@/lib/profile";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name, headline, company, country, industry, bio")
    .eq("id", user.id)
    .maybeSingle();

  const completion = calculateProfileCompletion(profile);

  const { count: waitlistCount } = await supabase
    .from("waitlist")
    .select("*", { count: "exact", head: true });

  return (
    <>
      <AppNavbar />
      <div className="cc-container py-10">
        <WelcomeBanner
          fullName={profile?.full_name ?? null}
          completion={completion}
        />

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <ComingSoonCard
            icon="🤝"
            title="내 네트워크"
            description="연결된 전문가와 주변 한국인 전문가를 발견하세요"
          />
          <ComingSoonCard
            icon="📰"
            title="뉴스 피드"
            description="한국 비즈니스 뉴스 및 업계 알림 — 곧 출시"
            href="/news"
          />
          <ComingSoonCard
            icon="💼"
            title="채용 게시판"
            description="전 세계 한국 기업의 채용 기회를 탐색하세요"
            href="/jobs"
          />
          <ComingSoonCard
            icon="🔔"
            title="내 알림"
            description="프로모션 및 기회 알림을 설정하세요"
          />
        </div>

        <div className="mt-8 cc-card p-6">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div className="text-sm font-semibold text-gray-600">
              Kolinked <span className="text-gray-800">2026년 3분기</span> 출시
              예정
            </div>
            <div className="text-sm font-semibold text-gray-600">
              <span className="text-[color:var(--navy)]">
                {typeof waitlistCount === "number"
                  ? waitlistCount.toLocaleString()
                  : "—"}
              </span>{" "}
              명이 웨이트리스트 대기 중
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
