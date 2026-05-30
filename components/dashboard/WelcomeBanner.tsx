import Link from "next/link";

export function WelcomeBanner({
  fullName,
  completion,
}: {
  fullName: string | null;
  completion: number;
}) {
  const firstName =
    fullName?.trim().split(/\s+/).filter(Boolean)[0] ?? "회원";

  return (
    <div className="cc-card p-6">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[color:var(--text)]">
            {firstName}님, 다시 오신 것을 환영합니다 👋
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            프로필을 완성하면 더 좋은 네트워킹 기회를 받을 수 있습니다.
          </p>
        </div>
        <Link
          href="/profile/edit"
          className="inline-flex items-center justify-center rounded-full bg-[color:var(--navy)] px-5 py-2.5 text-sm font-bold text-white transition hover:opacity-90"
        >
          프로필 완성하기 →
        </Link>
      </div>

      <div className="mt-6">
        <div className="flex items-center justify-between text-sm font-semibold text-gray-600">
          <span>프로필 완성도</span>
          <span className="text-[color:var(--navy)]">{completion}%</span>
        </div>
        <div className="mt-2 h-3 w-full rounded-full bg-gray-100">
          <div
            className="h-3 rounded-full bg-[color:var(--red)] transition-[width]"
            style={{ width: `${completion}%` }}
          />
        </div>
      </div>
    </div>
  );
}
