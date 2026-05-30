import Link from "next/link";
import { Badge } from "@/components/ui/Badge";

export function ComingSoonCard({
  icon,
  title,
  description,
  href,
}: {
  icon: string;
  title: string;
  description: string;
  href?: string;
}) {
  const content = (
    <div className="cc-card p-6 transition-shadow hover:shadow-md">
      <div className="flex items-start justify-between gap-4">
        <div className="text-2xl">{icon}</div>
        <Badge variant="comingSoon">Coming Soon</Badge>
      </div>
      <div className="mt-4 text-lg font-semibold tracking-tight text-[color:var(--navy)]">
        {title}
      </div>
      <p className="mt-2 text-sm leading-6 text-black/60">{description}</p>
    </div>
  );

  if (!href) return content;
  return <Link href={href}>{content}</Link>;
}

