import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { ProfileAvatar } from "@/components/profile/ProfileAvatar";
import { TierBadge } from "@/components/profile/TierBadge";
import { isKoreanCompany } from "@/lib/profile";

export const dynamic = "force-dynamic";

export default async function ProfilePage(props: PageProps<"/profile/[id]">) {
  const params = await props.params;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/auth/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select(
      "id, full_name, headline, company, country, industry, job_level, bio, linkedin_url, avatar_url, tier, created_at",
    )
    .eq("id", params.id)
    .maybeSingle();

  if (!profile) {
    return (
        <div className="cc-container py-10">
          <div className="cc-card p-8 text-center">
            <h1 className="text-2xl font-bold text-[color:var(--text)]">
              프로필을 찾을 수 없습니다
            </h1>
            <p className="mt-2 text-sm text-gray-500">
              해당 프로필이 존재하지 않거나 삭제되었습니다.
            </p>
            <Link
              href="/dashboard"
              className="mt-6 inline-block text-sm font-semibold text-[color:var(--navy)] hover:underline"
            >
              대시보드로 돌아가기
            </Link>
          </div>
        </div>
    );
  }

  const isOwnProfile = user.id === profile.id;
  const showKoreanBadge = isKoreanCompany(profile.company);

  return (
      <div className="cc-container py-8">
        {/* Header Card */}
        <div className="cc-card overflow-hidden">
          <div className="h-24 bg-gradient-to-r from-[color:var(--navy)] to-[#0b3b67]" />
          <div className="px-6 pb-6">
            <div className="-mt-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
                <ProfileAvatar
                  name={profile.full_name}
                  avatarUrl={profile.avatar_url}
                  size="xl"
                />
                <div className="pb-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h1 className="text-2xl font-black text-[color:var(--text)] sm:text-3xl">
                      {profile.full_name ?? "이름 없음"}
                    </h1>
                    <TierBadge tier={profile.tier} />
                  </div>
                  {profile.headline ? (
                    <p className="mt-1 text-base text-gray-600">
                      {profile.headline}
                    </p>
                  ) : null}
                  <div className="mt-2 flex flex-wrap items-center gap-2 text-sm text-gray-500">
                    {profile.company ? <span>{profile.company}</span> : null}
                    {profile.company && profile.country ? (
                      <span>·</span>
                    ) : null}
                    {profile.country ? <span>{profile.country}</span> : null}
                    {profile.job_level ? (
                      <>
                        <span>·</span>
                        <span>{profile.job_level}</span>
                      </>
                    ) : null}
                  </div>
                  {showKoreanBadge ? (
                    <span className="mt-3 inline-flex items-center rounded-full bg-[color:var(--navy)] px-3 py-1 text-xs font-bold text-white">
                      한국 기업 전문가
                    </span>
                  ) : null}
                </div>
              </div>

              <div className="flex flex-col gap-3 sm:items-end">
                <div className="flex gap-6 text-center text-sm">
                  <div>
                    <div className="font-black text-[color:var(--navy)]">0</div>
                    <div className="text-gray-500">연결</div>
                  </div>
                  <div>
                    <div className="font-black text-[color:var(--navy)]">0</div>
                    <div className="text-gray-500">팔로워</div>
                  </div>
                </div>
                {isOwnProfile ? (
                  <Link
                    href="/profile/edit"
                    className="inline-flex items-center justify-center rounded-full border border-[color:var(--navy)] px-6 py-2.5 text-sm font-bold text-[color:var(--navy)] transition hover:bg-[color:var(--navy)] hover:text-white"
                  >
                    프로필 수정
                  </Link>
                ) : (
                  <button
                    type="button"
                    className="inline-flex items-center justify-center rounded-full bg-[color:var(--navy)] px-6 py-2.5 text-sm font-bold text-white transition hover:opacity-90"
                  >
                    연결하기
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            <ProfileSection title="소개">
              {profile.bio ? (
                <p className="whitespace-pre-wrap text-sm leading-7 text-gray-700">
                  {profile.bio}
                </p>
              ) : (
                <EmptyState text="아직 소개가 없습니다." />
              )}
            </ProfileSection>

            <ProfileSection title="경력">
              <EmptyState text="아직 등록된 경력이 없습니다." />
            </ProfileSection>

            <ProfileSection title="학력">
              <EmptyState text="아직 등록된 학력이 없습니다." />
            </ProfileSection>
          </div>

          <div className="space-y-6">
            <ProfileSection title="스킬">
              <EmptyState text="아직 등록된 스킬이 없습니다." />
            </ProfileSection>

            <ProfileSection title="자격증">
              <EmptyState text="아직 등록된 자격증이 없습니다." />
            </ProfileSection>

            {profile.linkedin_url ? (
              <ProfileSection title="LinkedIn">
                <a
                  href={profile.linkedin_url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[color:var(--navy)] hover:underline"
                >
                  LinkedIn 프로필 보기 →
                </a>
              </ProfileSection>
            ) : null}

            {profile.industry ? (
              <ProfileSection title="업종">
                <p className="text-sm font-medium text-gray-700">
                  {profile.industry}
                </p>
              </ProfileSection>
            ) : null}
          </div>
        </div>
      </div>
  );
}

function ProfileSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="cc-card p-6">
      <h2 className="text-lg font-bold text-[color:var(--text)]">{title}</h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}

function EmptyState({ text }: { text: string }) {
  return (
    <p className="rounded-xl bg-gray-50 px-4 py-6 text-center text-sm text-gray-400">
      {text}
    </p>
  );
}
