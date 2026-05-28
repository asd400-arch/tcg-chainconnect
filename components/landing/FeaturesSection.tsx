const features = [
  {
    title: "🤝 Professional Network",
    desc: "Korean-first profiles with 직급 support. Connect with professionals across all industries globally.",
  },
  {
    title: "📰 News & Intelligence",
    desc: "Curated Korean business news, market alerts, and industry insights — personalised for you.",
  },
  {
    title: "💼 Jobs & Careers",
    desc: "Job board for Korean companies hiring globally + overseas talent seeking Korean companies.",
  },
  {
    title: "🔔 Promotions & Alerts",
    desc: "Business opportunities, industry events, and networking alerts tailored to Korean professionals.",
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="bg-[color:var(--cc-bg)]">
      <div className="cc-container py-16">
        <div className="max-w-2xl">
          <h2 className="text-2xl font-semibold tracking-tight text-[color:var(--cc-text)] sm:text-3xl">
            Built for Koreans going global
          </h2>
          <p className="mt-3 text-base leading-7 text-black/60">
            A focused professional network to help you connect, discover
            opportunities, and stay informed across borders.
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {features.map((f) => (
            <div
              key={f.title}
              className="group cc-card p-6 transition-shadow hover:shadow-md"
            >
              <div className="flex items-start justify-between gap-4">
                <h3 className="text-lg font-semibold tracking-tight text-[color:var(--cc-primary)]">
                  {f.title}
                </h3>
                <div className="mt-1 h-2.5 w-2.5 rounded-full bg-[color:var(--cc-accent)] opacity-70" />
              </div>
              <p className="mt-3 text-sm leading-6 text-black/60">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

