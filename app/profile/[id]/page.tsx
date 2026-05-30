'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { getInitials } from '@/lib/profile'

type Profile = {
  id: string
  full_name: string | null
  headline: string | null
  company: string | null
  country: string | null
  industry: string | null
  job_level: string | null
  bio: string | null
  linkedin_url: string | null
  avatar_url: string | null
}

export default function ProfileByIdPage() {
  const params = useParams<{ id: string }>()
  const router = useRouter()
  const [profile, setProfile] = useState<Profile | null>(null)
  const [currentUserId, setCurrentUserId] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

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

      setCurrentUserId(user.id)

      const { data, error } = await supabase
        .from('profiles')
        .select(
          'id, full_name, headline, company, country, industry, job_level, bio, linkedin_url, avatar_url',
        )
        .eq('id', params.id)
        .maybeSingle()

      if (error || !data) {
        setNotFound(true)
      } else {
        setProfile(data as Profile)
      }

      setLoading(false)
    }

    loadProfile()
  }, [params.id, router])

  if (loading) {
    return (
      <div className="cc-container py-16 text-center text-sm text-gray-500">
        프로필 불러오는 중...
      </div>
    )
  }

  if (notFound || !profile) {
    return (
      <div className="cc-container py-10">
        <div className="cc-card p-8 text-center">
          <h1 className="text-2xl font-bold text-[#1A1A2E]">
            프로필을 찾을 수 없습니다
          </h1>
          <Link
            href="/dashboard"
            className="mt-4 inline-block text-sm font-semibold text-[#0F4C81] hover:underline"
          >
            대시보드로 돌아가기
          </Link>
        </div>
      </div>
    )
  }

  const isOwnProfile = currentUserId === profile.id

  return (
    <div className="cc-container py-8">
      <div className="cc-card p-6 sm:p-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex gap-5">
            {profile.avatar_url ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={profile.avatar_url}
                alt={profile.full_name ?? '프로필'}
                className="h-24 w-24 rounded-full object-cover ring-4 ring-[#0F4C81]/10"
              />
            ) : (
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-[#0F4C81] text-2xl font-bold text-white ring-4 ring-[#0F4C81]/10">
                {getInitials(profile.full_name)}
              </div>
            )}

            <div>
              <h1 className="text-2xl font-black text-[#1A1A2E] sm:text-3xl">
                {profile.full_name ?? '이름 없음'}
              </h1>
              {profile.headline ? (
                <p className="mt-1 text-base text-gray-600">{profile.headline}</p>
              ) : null}
              <div className="mt-3 flex flex-wrap gap-2 text-sm text-gray-500">
                {profile.company ? (
                  <span className="rounded-full bg-gray-100 px-3 py-1">
                    {profile.company}
                  </span>
                ) : null}
                {profile.country ? (
                  <span className="rounded-full bg-gray-100 px-3 py-1">
                    {profile.country}
                  </span>
                ) : null}
                {profile.industry ? (
                  <span className="rounded-full bg-gray-100 px-3 py-1">
                    {profile.industry}
                  </span>
                ) : null}
                {profile.job_level ? (
                  <span className="rounded-full bg-[#0F4C81]/10 px-3 py-1 font-semibold text-[#0F4C81]">
                    {profile.job_level}
                  </span>
                ) : null}
              </div>
            </div>
          </div>

          {isOwnProfile ? (
            <Link
              href="/profile/edit"
              className="inline-flex items-center justify-center rounded-full border-2 border-[#0F4C81] px-6 py-2.5 text-sm font-bold text-[#0F4C81] transition hover:bg-[#0F4C81] hover:text-white"
            >
              프로필 수정
            </Link>
          ) : null}
        </div>

        {profile.bio ? (
          <div className="mt-8 border-t border-gray-100 pt-6">
            <h2 className="text-sm font-bold text-[#0F4C81]">소개</h2>
            <p className="mt-3 whitespace-pre-wrap text-sm leading-7 text-gray-700">
              {profile.bio}
            </p>
          </div>
        ) : null}

        {profile.linkedin_url ? (
          <div className="mt-6 border-t border-gray-100 pt-6">
            <h2 className="text-sm font-bold text-[#0F4C81]">LinkedIn</h2>
            <a
              href={profile.linkedin_url}
              target="_blank"
              rel="noreferrer"
              className="mt-2 inline-block text-sm font-semibold text-[#0F4C81] hover:underline"
            >
              {profile.linkedin_url}
            </a>
          </div>
        ) : null}
      </div>
    </div>
  )
}
