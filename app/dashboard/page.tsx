import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { WelcomeBanner } from "@/components/dashboard/WelcomeBanner";
import { ComingSoonCard } from "@/components/dashboard/ComingSoonCard";

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
    .select(
      "id, full_name, headline, company, country, industry, linkedin_url, avatar_url",
    )
    .eq("id", user.id)
    .maybeSingle();

  const completionFields = [
    profile?.full_name,
    profile?.headline,
    profile?.company,
    profile?.country,
    profile?.industry,
    profile?.linkedin_url,
    profile?.avatar_url,
  ];
  const filled = completionFields.filter((v) => Boolean(v && String(v).trim()))
    .length;
  const completion = Math.round((filled / completionFields.length) * 100);

  const { count: waitlistCount } = await supabase
    .from("waitlist")
    .select("*", { count: "exact", head: true });

  return (
    <div className="cc-container py-10">
      <WelcomeBanner
        fullName={profile?.full_name ?? null}
        completion={completion}
        userId={user.id}
      />

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <ComingSoonCard
          icon="🤝"
          title="My Network"
          description="See your connections and discover Korean professionals near you"
        />
        <ComingSoonCard
          icon="📰"
          title="News Feed"
          description="Korean business news and industry alerts — launching soon"
          href="/news"
        />
        <ComingSoonCard
          icon="💼"
          title="Job Board"
          description="Browse opportunities at Korean companies worldwide"
          href="/jobs"
        />
        <ComingSoonCard
          icon="🔔"
          title="My Alerts"
          description="Set up promotion and opportunity alerts"
        />
      </div>

      <div className="mt-8 cc-card p-6">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-sm font-semibold text-black/60">
            Kolinked launches <span className="text-black/80">Q3 2026</span>
          </div>
          <div className="text-sm font-semibold text-black/60">
            <span className="text-[color:var(--cc-primary)]">
              {typeof waitlistCount === "number"
                ? waitlistCount.toLocaleString()
                : "—"}
            </span>{" "}
            professionals waiting
          </div>
        </div>
      </div>
    </div>
  );
}

