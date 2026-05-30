'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

const COUNTRIES = [
  '대한민국',
  '싱가포르',
  '인도네시아',
  '말레이시아',
  '태국',
  '필리핀',
  '베트남',
  '일본',
  '미국',
  '영국',
  '호주',
  '기타',
] as const

const INDUSTRIES = [
  '테크/IT',
  '금융',
  '물류/공급망',
  '마케팅',
  '의료',
  '교육',
  'F&B',
  '뷰티',
  '미디어',
  '기타',
] as const

const JOB_LEVELS = [
  '인턴',
  '사원',
  '대리',
  '과장',
  '차장',
  '부장',
  '이사',
  '상무',
  '전무',
  '부사장',
  '사장',
  '대표',
] as const

export default function EditProfilePage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [userId, setUserId] = useState<string | null>(null)

  const [fullName, setFullName] = useState('')
  const [headline, setHeadline] = useState('')
  const [company, setCompany] = useState('')
  const [country, setCountry] = useState('')
  const [industry, setIndustry] = useState('')
  const [jobLevel, setJobLevel] = useState('')
  const [bio, setBio] = useState('')
  const [linkedinUrl, setLinkedinUrl] = useState('')

  useEffect(() => {
    async function loadProfile() {
      const supabase = createClient()
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        router.replace('/auth/login')
        return
      }

      setUserId(user.id)

      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .maybeSingle()

      if (profile) {
        setFullName(profile.full_name ?? '')
        setHeadline(profile.headline ?? '')
        setCompany(profile.company ?? '')
        setCountry(profile.country ?? '')
        setIndustry(profile.industry ?? '')
        setJobLevel(profile.job_level ?? '')
        setBio(profile.bio ?? '')
        setLinkedinUrl(profile.linkedin_url ?? '')
      }

      setLoading(false)
    }

    loadProfile()
  }, [router])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!userId) return

    setSaving(true)
    setError(null)
    setSuccess(false)

    const supabase = createClient()
    const { error: updateError } = await supabase
      .from('profiles')
      .update({
        full_name: fullName.trim(),
        headline: headline.trim(),
        company: company.trim(),
        country: country || null,
        industry: industry || null,
        job_level: jobLevel || null,
        bio: bio.trim(),
        linkedin_url: linkedinUrl.trim() || null,
      })
      .eq('id', userId)

    setSaving(false)

    if (updateError) {
      setError('저장에 실패했습니다. 다시 시도해 주세요.')
      return
    }

    setSuccess(true)
  }

  const inputClass =
    'mt-1 w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#0F4C81]'

  if (loading) {
    return (
      <div className="cc-container py-16 text-center text-sm text-gray-500">
        불러오는 중...
      </div>
    )
  }

  return (
    <div className="cc-container py-8">
      <div className="mb-6">
        <Link
          href={userId ? `/profile/${userId}` : '/dashboard'}
          className="text-sm font-semibold text-[#0F4C81] hover:underline"
        >
          ← 프로필로 돌아가기
        </Link>
        <h1 className="mt-2 text-2xl font-black text-[#1A1A2E]">프로필 수정</h1>
      </div>

      <form onSubmit={handleSubmit} className="cc-card p-6 sm:p-8">
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="이름" className="sm:col-span-2">
            <input
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              className={inputClass}
            />
          </Field>

          <Field label="헤드라인" className="sm:col-span-2">
            <input
              value={headline}
              onChange={(e) => setHeadline(e.target.value)}
              placeholder="Senior Manager at Samsung SDS"
              className={inputClass}
            />
          </Field>

          <Field label="회사">
            <input
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className={inputClass}
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
              placeholder="https://linkedin.com/in/username"
              className={inputClass}
            />
          </Field>
        </div>

        {error ? (
          <p className="mt-4 text-sm font-semibold text-[#E63946]">{error}</p>
        ) : null}
        {success ? (
          <p className="mt-4 text-sm font-semibold text-emerald-600">
            프로필이 업데이트되었습니다 ✅
          </p>
        ) : null}

        <button
          type="submit"
          disabled={saving}
          className="mt-8 rounded-xl bg-[#E63946] px-10 py-3.5 text-sm font-bold text-white transition hover:opacity-90 disabled:opacity-50"
        >
          {saving ? '저장 중...' : '저장'}
        </button>
      </form>
    </div>
  )
}

function Field({
  label,
  children,
  className,
}: {
  label: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={className}>
      <label className="text-sm font-bold text-gray-700">{label}</label>
      {children}
    </div>
  )
}
