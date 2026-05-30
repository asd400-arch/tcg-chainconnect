export type ProfileRow = {
  id: string;
  full_name: string | null;
  headline: string | null;
  company: string | null;
  country: string | null;
  industry: string | null;
  job_level: string | null;
  bio: string | null;
  linkedin_url: string | null;
  avatar_url: string | null;
  tier: string | null;
  created_at?: string | null;
};

export function getInitials(name: string | null | undefined): string {
  if (!name?.trim()) return "?";
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export function calculateProfileCompletion(
  profile: Partial<ProfileRow> | null | undefined,
): number {
  const fields = [
    profile?.full_name,
    profile?.headline,
    profile?.company,
    profile?.country,
    profile?.industry,
    profile?.bio,
  ];
  const filled = fields.filter((v) => Boolean(v && String(v).trim())).length;
  return Math.round((filled / fields.length) * 100);
}

export function isKoreanCompany(company: string | null | undefined): boolean {
  if (!company?.trim()) return false;
  return /[\uAC00-\uD7AF]/.test(company);
}

export const TIER_LABELS: Record<string, string> = {
  free: "Free",
  pro: "Pro",
  business: "Business",
  enterprise: "Enterprise",
};

export const JOB_LEVELS = [
  "인턴",
  "사원",
  "대리",
  "과장",
  "차장",
  "부장",
  "이사",
  "상무",
  "전무",
  "부사장",
  "사장",
  "대표",
] as const;

export const COUNTRIES = [
  "South Korea",
  "Singapore",
  "Indonesia",
  "Malaysia",
  "Thailand",
  "Philippines",
  "Vietnam",
  "Japan",
  "United States",
  "United Kingdom",
  "Australia",
  "Other",
] as const;

export const INDUSTRIES = [
  "Technology",
  "Finance",
  "Logistics & Supply Chain",
  "Marketing",
  "Healthcare",
  "Education",
  "F&B",
  "Beauty & Cosmetics",
  "Media & Entertainment",
  "Other",
] as const;
