const stats = [
  { label: "Overseas Koreans", value: "7.5M+" },
  { label: "Korean Company Branches Globally", value: "25,000+" },
  { label: "Professional Network Market", value: "$26B" },
  { label: "APAC Digital Growth CAGR", value: "22.9%" },
];

export function StatsSection() {
  return (
    <section className="bg-white">
      <div className="cc-container py-12">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="cc-card p-6">
              <div className="text-3xl font-semibold tracking-tight text-[color:var(--cc-primary)]">
                {s.value}
              </div>
              <div className="mt-2 text-sm font-semibold text-black/60">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

