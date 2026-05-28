import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-black/5 bg-white py-10">
      <div className="cc-container">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <div className="text-base font-semibold tracking-tight">
              <span className="text-[color:var(--cc-primary)]">Kol</span>
              <span className="text-[color:var(--cc-accent)]">inked</span>
            </div>
            <div className="mt-2 text-sm text-black/60">
              Korea-Connected Professional Network
            </div>
            <div className="mt-4 text-sm text-black/50">
              © 2026 Kolinked · Tech Chain Global Pte Ltd · Singapore
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 text-sm sm:grid-cols-4 sm:gap-3">
            <Link href="/#features" className="font-semibold text-black/65 hover:text-black">
              Features
            </Link>
            <Link href="/jobs" className="font-semibold text-black/65 hover:text-black">
              Jobs
            </Link>
            <Link href="/news" className="font-semibold text-black/65 hover:text-black">
              News
            </Link>
            <Link href="/#about" className="font-semibold text-black/65 hover:text-black">
              About
            </Link>
            <span className="col-span-2 mt-2 text-black/45 sm:col-span-4">
              Privacy Policy · Terms of Service
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

