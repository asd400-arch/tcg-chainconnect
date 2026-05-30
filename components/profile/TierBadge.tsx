import { TIER_LABELS } from "@/lib/profile";

const tierStyles: Record<string, string> = {
  free: "bg-gray-100 text-gray-600 ring-gray-200",
  pro: "bg-[#C9A227]/15 text-[#8B6914] ring-[#C9A227]/30",
  business: "bg-[color:var(--navy)]/10 text-[color:var(--navy)] ring-[color:var(--navy)]/20",
  enterprise: "bg-purple-100 text-purple-700 ring-purple-200",
};

export function TierBadge({ tier }: { tier: string | null | undefined }) {
  const key = (tier ?? "free").toLowerCase();
  const label = TIER_LABELS[key] ?? "Free";
  const style = tierStyles[key] ?? tierStyles.free;

  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-bold ring-1 ${style}`}
    >
      {label}
    </span>
  );
}
