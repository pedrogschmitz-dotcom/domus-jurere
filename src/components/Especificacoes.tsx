import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useLanguage } from "@/contexts/LanguageContext";

const SPEC_VALUES = ["9", "8", "800m²", "300m", "6", "600m²"];

export default function Especificacoes() {
  const { t } = useLanguage();
  const revealRef = useScrollReveal<HTMLElement>();

  return (
    <section className="bg-[var(--ink-soft)] px-6 py-20 md:px-8 md:py-20" id="especificacoes" ref={revealRef}>
      <div className="mx-auto w-full max-w-7xl">
        <p className="label-track reveal">{t.especificacoes.label}</p>
        <h2 className="mt-6 text-3xl font-light leading-[0.95] text-[var(--white)] sm:text-5xl md:text-5xl lg:text-7xl reveal reveal-delay-1">
          <span className="font-display">{t.especificacoes.h2_1}</span>
          <span className="gold-italic block">{t.especificacoes.h2_2}</span>
        </h2>
        <p className="mt-6 max-w-3xl text-[15px] font-medium leading-relaxed text-[rgba(246,241,232,0.7)] reveal reveal-delay-2">
          {t.especificacoes.desc}
        </p>

        <div className="mt-14 grid grid-cols-2 border-y border-[rgba(212,188,128,0.15)] md:grid-cols-3 lg:grid-cols-6">
          {t.especificacoes.items.map((item, index) => (
            <article key={item.label} className={`border-r border-[rgba(212,188,128,0.15)] p-6 last:border-r-0 reveal ${index < 3 ? "reveal-delay-1" : "reveal-delay-2"}`}>
              <p className="font-display text-4xl font-light text-[var(--gold)] md:text-6xl">{SPEC_VALUES[index]}</p>
              <p className="mt-3 text-[10px] font-semibold tracking-[0.28em] text-[var(--gray)]">{item.label}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
