import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Experiencia() {
  const { t } = useLanguage();
  const revealRef = useScrollReveal<HTMLElement>();

  return (
    <section className="bg-[var(--ink-soft)] px-6 py-[60px] md:px-8 md:py-[80px]" id="experiencia" ref={revealRef}>
      <div className="mx-auto w-full max-w-7xl">
        <p className="label-track reveal">{t.experiencia.label}</p>

        <div className="mt-8 border-l border-[rgba(212,188,128,0.25)] pl-6 reveal reveal-delay-1">
          <div className="mb-6 h-px w-10 bg-[linear-gradient(90deg,var(--gold),transparent)]" />
          <p className="font-display text-3xl italic leading-tight text-[var(--gold)] md:text-4xl">
            {t.experiencia.citacao}
          </p>
          <p className="mt-4 max-w-3xl text-sm font-medium leading-relaxed text-[rgba(246,241,232,0.62)]">
            {t.experiencia.desc}
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {t.experiencia.servicos.map((item, index) => (
            <article key={item.titulo} className={`border-t border-[rgba(212,188,128,0.2)] pt-5 reveal ${index % 2 === 0 ? "reveal-delay-2" : "reveal-delay-3"}`}>
              <h3 className="text-sm font-semibold tracking-[0.18em] text-[var(--white)]">{item.titulo}</h3>
              <p className="mt-2 text-[13px] font-medium leading-relaxed text-[rgba(246,241,232,0.62)]">{item.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
