"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { getInitials } from "@/lib/profile";

export function NavbarUserMenu({
  userId,
  fullName,
  avatarUrl,
}: {
  userId: string;
  fullName: string | null;
  avatarUrl: string | null;
}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  async function handleLogout() {
    setLoggingOut(true);
    const supabase = createClient();
    await supabase.auth.signOut();
    setLoggingOut(false);
    router.push("/");
    router.refresh();
  }

  return (
    <div className="relative" ref={menuRef}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-[color:var(--navy)] text-xs font-bold text-white transition hover:opacity-90"
        aria-label="프로필 메뉴"
      >
        {avatarUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={avatarUrl} alt="" className="h-full w-full object-cover" />
        ) : (
          getInitials(fullName)
        )}
      </button>

      {open ? (
        <div className="absolute right-0 z-50 mt-2 w-48 overflow-hidden rounded-xl border border-black/5 bg-white py-1 shadow-lg">
          <Link
            href={`/profile/${userId}`}
            onClick={() => setOpen(false)}
            className="block px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
          >
            내 프로필
          </Link>
          <Link
            href="/profile/edit"
            onClick={() => setOpen(false)}
            className="block px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
          >
            프로필 수정
          </Link>
          <hr className="my-1 border-gray-100" />
          <button
            type="button"
            onClick={handleLogout}
            disabled={loggingOut}
            className="block w-full px-4 py-2.5 text-left text-sm font-medium text-[color:var(--red)] transition hover:bg-gray-50 disabled:opacity-50"
          >
            {loggingOut ? "로그아웃 중..." : "로그아웃"}
          </button>
        </div>
      ) : null}
    </div>
  );
}
