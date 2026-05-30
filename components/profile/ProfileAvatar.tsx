import { getInitials } from "@/lib/profile";

export function ProfileAvatar({
  name,
  avatarUrl,
  size = "lg",
}: {
  name: string | null;
  avatarUrl?: string | null;
  size?: "sm" | "md" | "lg" | "xl";
}) {
  const sizeClasses = {
    sm: "h-8 w-8 text-xs",
    md: "h-10 w-10 text-sm",
    lg: "h-24 w-24 text-2xl",
    xl: "h-32 w-32 text-3xl",
  };

  const cls = sizeClasses[size];

  if (avatarUrl) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={avatarUrl}
        alt={name ?? "프로필"}
        className={`${cls} rounded-full object-cover ring-4 ring-white shadow-md`}
      />
    );
  }

  return (
    <div
      className={`${cls} flex items-center justify-center rounded-full bg-[color:var(--navy)] font-bold text-white ring-4 ring-white shadow-md`}
    >
      {getInitials(name)}
    </div>
  );
}
