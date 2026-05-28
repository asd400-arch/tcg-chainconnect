import Link from "next/link";
import { Button } from "@/components/ui/Button";

export function WelcomeBanner({
  fullName,
  completion,
  userId,
}: {
  fullName: string | null;
  completion: number;
  userId: string;
}) {
  const firstName =
    fullName?.trim().split(/\s+/).filter(Boolean)[0] ?? "there";

  return (
    <div className="cc-card p-6">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-[color:var(--cc-text)]">
            Welcome back, {firstName}
          </h1>
          <p className="mt-2 text-sm text-black/60">
            Your network is launching soon. Complete your profile to get better
            matches at launch.
          </p>
        </div>
        <Link href={`/profile/${userId}`}>
          <Button variant="secondary" size="md">
            Complete your profile →
          </Button>
        </Link>
      </div>

      <div className="mt-6">
        <div className="flex items-center justify-between text-sm font-semibold text-black/60">
          <span>Profile completion</span>
          <span className="text-[color:var(--cc-primary)]">{completion}%</span>
        </div>
        <div className="mt-2 h-3 w-full rounded-full bg-black/5">
          <div
            className="h-3 rounded-full bg-[color:var(--cc-accent)] transition-[width]"
            style={{ width: `${completion}%` }}
          />
        </div>
      </div>
    </div>
  );
}

