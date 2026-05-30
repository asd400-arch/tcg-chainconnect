"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { ProfileAvatar } from "@/components/profile/ProfileAvatar";
import {
  COUNTRIES,
  INDUSTRIES,
  JOB_LEVELS,
  type ProfileRow,
} from "@/lib/profile";

export function EditProfileForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  const [fullName, setFullName] = useState("");
  const [headline, setHeadline] = useState("");
  const [company, setCompany] = useState("");
  const [country, setCountry] = useState("");
  const [industry, setIndustry] = useState("");
  const [jobLevel, setJobLevel] = useState("");
  const [bio, setBio] = useState("");
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    async function loadProfile() {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push("/auth/login");
        return;
      }

      setUserId(user.id);

      const { data: profile } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .maybeSingle();

      if (profile) {
        const p = profile as ProfileRow;
        setFullName(p.full_name ?? "");
        setHeadline(p.headline ?? "");
        setCompany(p.company ?? "");
        setCountry(p.country ?? "");
        setIndustry(p.industry ?? "");
        setJobLevel(p.job_level ?? "");
        setBio(p.bio ?? "");
        setLinkedinUrl(p.linkedin_url ?? "");
        setAvatarUrl(p.avatar_url);
      }

      setLoading(false);
    }

    loadProfile();
  }, [router]);

  async function handleAvatarUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file || !userId) return;

    setUploading(true);
    setError(null);

    const supabase = createClient();
    const ext = file.name.split(".").pop() ?? "jpg";
    const path = `${userId}/${Date.now()}.${ext}`;

    const { error: uploadError } = await supabase.storage
      .from("avatars")
      .upload(path, file, { upsert: true });

    if (uploadError) {
      setError("사진 업로드에 실패했습니다. 다시 시도해 주세요.");
      setUploading(false);
      return;
    }

    const {
      data: { publicUrl },
    } = supabase.storage.from("avatars").getPublicUrl(path);

    setAvatarUrl(publicUrl);
    setUploading(false);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!userId) return;

    setSaving(true);
    setError(null);
    setSuccess(false);

    const supabase = createClient();
    const { error: updateError } = await supabase
      .from("profiles")
      .update({
        full_name: fullName.trim(),
        headline: headline.trim(),
        company: company.trim(),
        country: country || null,
        industry: industry || null,
        job_level: jobLevel || null,
        bio: bio.trim(),
        linkedin_url: linkedinUrl.trim() || null,
        avatar_url: avatarUrl,
      })
      .eq("id", userId);

    setSaving(false);

    if (updateError) {
      setError("저장에 실패했습니다. 다시 시도해 주세요.");
      return;
    }

    setSuccess(true);
    router.refresh();
  }

  if (loading) {
    return (
      <div className="cc-container py-10">
        <div className="cc-card p-8 text-center text-sm text-gray-500">
          불러오는 중...
        </div>
      </div>
    );
  }

  const inputClass =
    "mt-1 w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[color:var(--navy)]";

  return (
    <div className="cc-container py-8">
      <div className="mb-6">
        <Link
          href={userId ? `/profile/${userId}` : "/dashboard"}
          className="text-sm font-semibold text-[color:var(--navy)] hover:underline"
        >
          ← 프로필로 돌아가기
        </Link>
        <h1 className="mt-2 text-2xl font-black text-[color:var(--text)]">
          프로필 수정
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="cc-card p-6 sm:p-8">
        <div className="flex flex-col items-center gap-4 border-b border-gray-100 pb-8 sm:flex-row sm:items-start">
          <ProfileAvatar name={fullName} avatarUrl={avatarUrl} size="lg" />
          <div>
            <label className="inline-flex cursor-pointer items-center rounded-full bg-[color:var(--navy)] px-4 py-2 text-sm font-bold text-white transition hover:opacity-90">
              {uploading ? "업로드 중..." : "프로필 사진 업로드"}
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleAvatarUpload}
                disabled={uploading}
              />
            </label>
            <p className="mt-2 text-xs text-gray-400">
              JPG, PNG · 최대 2MB 권장
            </p>
          </div>
        </div>

        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          <Field label="이름" className="sm:col-span-2">
            <input
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              className={inputClass}
              placeholder="홍길동"
            />
          </Field>

          <Field label="헤드라인" className="sm:col-span-2">
            <input
              value={headline}
              onChange={(e) => setHeadline(e.target.value)}
              className={inputClass}
              placeholder="Senior Manager at Samsung SDS"
            />
          </Field>

          <Field label="회사">
            <input
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className={inputClass}
              placeholder="삼성SDS"
            />
          </Field>

          <Field label="국가">
            <select
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className={inputClass}
            >
              <option value="">선택</option>
              {COUNTRIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </Field>

          <Field label="업종">
            <select
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
              className={inputClass}
            >
              <option value="">선택</option>
              {INDUSTRIES.map((i) => (
                <option key={i} value={i}>
                  {i}
                </option>
              ))}
            </select>
          </Field>

          <Field label="직급">
            <select
              value={jobLevel}
              onChange={(e) => setJobLevel(e.target.value)}
              className={inputClass}
            >
              <option value="">선택</option>
              {JOB_LEVELS.map((l) => (
                <option key={l} value={l}>
                  {l}
                </option>
              ))}
            </select>
          </Field>

          <Field label="소개" className="sm:col-span-2">
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows={5}
              className={inputClass}
              placeholder="자기소개를 입력해 주세요..."
            />
          </Field>

          <Field label="LinkedIn URL" className="sm:col-span-2">
            <input
              value={linkedinUrl}
              onChange={(e) => setLinkedinUrl(e.target.value)}
              type="url"
              className={inputClass}
              placeholder="https://linkedin.com/in/username"
            />
          </Field>
        </div>

        {error ? (
          <p className="mt-4 text-sm font-semibold text-[color:var(--red)]">
            {error}
          </p>
        ) : null}
        {success ? (
          <p className="mt-4 text-sm font-semibold text-emerald-600">
            프로필이 업데이트되었습니다 ✅
          </p>
        ) : null}

        <button
          type="submit"
          disabled={saving}
          className="mt-8 w-full rounded-xl bg-[color:var(--red)] py-4 text-sm font-bold text-white transition hover:opacity-90 disabled:opacity-50 sm:w-auto sm:px-12"
        >
          {saving ? "저장 중..." : "저장"}
        </button>
      </form>
    </div>
  );
}

function Field({
  label,
  children,
  className,
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <label className="text-sm font-bold text-gray-700">{label}</label>
      {children}
    </div>
  );
}
