'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function MyProfilePage() {
  const router = useRouter()

  useEffect(() => {
    async function redirectToProfile() {
      const supabase = createClient()
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        router.replace('/auth/login')
        return
      }

      router.replace(`/profile/${user.id}`)
    }

    redirectToProfile()
  }, [router])

  return (
    <div className="cc-container py-16 text-center text-sm text-gray-500">
      프로필 불러오는 중...
    </div>
  )
}
