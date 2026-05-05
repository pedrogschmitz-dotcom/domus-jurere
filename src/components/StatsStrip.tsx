import { useLanguage } from "@/contexts/LanguageContext";

export default function StatsStrip() {
  const { t } = useLanguage();

  return (
    <div className="relative border-y border-[rgba(212,188,128,0.18)] bg-[var(--ink)]">
      {/* grain overlay */}
      <div className="grain absolute inset-0 opacity-30 pointer-events-none" aria-hidden="true" />

      <ul className="mx-auto grid grid-cols-3 divide-x divide-[rgba(212,188,128,0.12)] md:grid-cols-6 max-w-7xl">
        {t.statsStrip.stats.map((s) => (
          <li
            key={s.label}
            className="flex flex-col items-center justify-center gap-1 px-4 py-8 text-center md:py-10"
          >
            <p className="font-display text-3xl font-light leading-none text-[var(--gold)] md:text-4xl lg:text-5xl">
              {s.value}
              {s.unit && (
                <span className="ml-0.5 text-lg font-light text-[var(--gold-lt)] md:text-xl">
                  {s.unit}
                </span>
              )}
            </p>
            <p className="mt-2 text-[9px] font-semibold uppercase tracking-[0.26em] text-[var(--cream-dk)]">
              {s.label}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
