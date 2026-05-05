import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useLanguage } from "@/contexts/LanguageContext";

export default function CitacaoEditorial() {
  const { t } = useLanguage();
  const revealRef = useScrollReveal<HTMLElement>();

  return (
    <section
      className="relative overflow-hidden bg-[var(--ink)] px-6 py-20 md:px-8 md:py-28"
      aria-hidden="true"
      ref={revealRef}
    >
      {/* aspas decorativas */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none font-display text-[30vw] font-light leading-none text-[rgba(212,188,128,0.04)]"
        aria-hidden="true"
      >
        "
      </div>

      <div className="relative mx-auto w-full max-w-5xl text-center">
        <blockquote className="reveal">
          <p className="font-display text-3xl font-light leading-[1.15] text-[var(--white)] md:text-5xl lg:text-6xl">
            "{t.citacao.text1}
            <em className="gold-italic not-italic">
              {t.citacao.em}
            </em>
            {t.citacao.text2}"
          </p>
        </blockquote>
        <p className="mt-8 label-track reveal reveal-delay-1">
          {t.citacao.rodape}
        </p>
      </div>
    </section>
  );
}
