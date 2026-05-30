import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { NavbarUserMenu } from "@/components/layout/NavbarUserMenu";

export const dynamic = "force-dynamic";

export async function AppNavbar() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let profile: {
    full_name: string | null;
    avatar_url: string | null;
  } | null = null;

  if (user) {
    const { data } = await supabase
      .from("profiles")
      .select("full_name, avatar_url")
      .eq("id", user.id)
      .maybeSingle();
    profile = data;
  }

  return (
    <header className="sticky top-0 z-40 border-b border-gray-100 bg-white shadow-sm">
      <div className="cc-container flex items-center justify-between py-3">
        <Link href="/" className="text-xl font-black">
          <span style={{ color: "#0F4C81" }}>Ko</span>
          <span style={{ color: "#E63946" }}>linked</span>
        </Link>

        {user ? (
          <nav className="flex items-center gap-1 sm:gap-3">
            <Link
              href="/dashboard"
              className="hidden rounded-full px-3 py-2 text-sm font-semibold text-gray-600 transition hover:bg-gray-50 sm:inline-flex"
            >
              대시보드
            </Link>
            <Link
              href="/news"
              className="hidden rounded-full px-3 py-2 text-sm font-semibold text-gray-600 transition hover:bg-gray-50 md:inline-flex"
            >
              뉴스
            </Link>
            <Link
              href="/jobs"
              className="hidden rounded-full px-3 py-2 text-sm font-semibold text-gray-600 transition hover:bg-gray-50 md:inline-flex"
            >
              채용
            </Link>
            <NavbarUserMenu
              userId={user.id}
              fullName={profile?.full_name ?? user.email ?? null}
              avatarUrl={profile?.avatar_url ?? null}
            />
          </nav>
        ) : (
          <nav className="flex items-center gap-3">
            <Link
              href="/auth/login"
              className="text-sm font-medium text-gray-600 transition hover:text-gray-900"
            >
              로그인
            </Link>
            <Link
              href="/#waitlist"
              className="rounded-full px-4 py-2 text-sm font-bold text-white transition hover:opacity-90"
              style={{ backgroundColor: "#E63946" }}
            >
              웨이트리스트
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}
