import Link from "next/link";
import { Button } from "@/components/ui/Button";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-[color:var(--cc-primary)]">
      <div className="absolute inset-0">
        <div className="absolute -left-28 -top-28 h-80 w-80 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -right-24 top-20 h-96 w-96 rounded-full bg-[color:var(--cc-accent)]/35 blur-3xl" />
        <div className="absolute left-1/3 top-1/2 h-72 w-72 rounded-full bg-white/5 blur-3xl" />
      </div>

      <div className="cc-container relative py-20 sm:py-28">
        <div className="max-w-3xl">
          <p className="inline-flex items-center rounded-full bg-white/10 px-4 py-2 text-xs font-semibold tracking-wide text-white/90 ring-1 ring-white/20">
            Korea-Connected Professional Network
          </p>

          <h1 className="mt-6 text-4xl font-semibold leading-tight tracking-tight text-white sm:text-6xl">
            The Professional Network for Koreans Going Global
          </h1>

          <p className="mt-6 text-lg leading-8 text-white/85 sm:text-xl">
            Connect with 7.5M+ overseas Korean professionals. Find jobs at Korean
            companies worldwide. Stay ahead with Korean industry news.
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a href="#waitlist">
              <Button variant="primary" size="lg" className="w-full sm:w-auto">
                Join the Waitlist →
              </Button>
            </a>
            <Link href="#features" className="w-full sm:w-auto">
              <Button
                variant="ghost"
                size="lg"
                className="w-full text-white hover:bg-white/10"
              >
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

