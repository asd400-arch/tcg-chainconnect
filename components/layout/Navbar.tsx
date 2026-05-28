import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { Button } from "@/components/ui/Button";
import { LogoutButton } from "@/components/layout/LogoutButton";

export const dynamic = "force-dynamic";

export async function Navbar() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const isAuthed = Boolean(user);

  return (
    <header className="sticky top-0 z-30 border-b border-black/5 bg-white/70 backdrop-blur">
      <div className="cc-container flex items-center justify-between py-4">
        <Link href="/" className="text-lg font-semibold tracking-tight">
          <span className="text-[color:var(--cc-primary)]">Kol</span>
          <span className="text-[color:var(--cc-accent)]">inked</span>
        </Link>

        <nav className="flex items-center gap-2 sm:gap-3">
          {isAuthed ? (
            <>
              <Link
                href="/dashboard"
                className="rounded-full px-4 py-2 text-sm font-semibold text-[color:var(--cc-primary)] hover:bg-black/5"
              >
                Dashboard
              </Link>
              <Link
                href="/news"
                className="hidden rounded-full px-4 py-2 text-sm font-semibold text-[color:var(--cc-primary)] hover:bg-black/5 sm:inline-flex"
              >
                News
              </Link>
              <Link
                href="/jobs"
                className="hidden rounded-full px-4 py-2 text-sm font-semibold text-[color:var(--cc-primary)] hover:bg-black/5 sm:inline-flex"
              >
                Jobs
              </Link>
              <LogoutButton />
            </>
          ) : (
            <>
              <Link href="/auth/login" className="hidden sm:inline-flex">
                <Button variant="ghost" size="sm">
                  Login
                </Button>
              </Link>
              <a href="/#waitlist">
                <Button variant="primary" size="sm">
                  Join Waitlist
                </Button>
              </a>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

