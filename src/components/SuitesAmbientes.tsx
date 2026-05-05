import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useLanguage } from "@/contexts/LanguageContext";

const SUITE_SRCS = [
  "./images/interior.jpg",
  "./images/detalhe.jpg",
  "./images/piscina.jpg",
  "./images/fachada.jpg",
  "./images/aerea.jpg",
];

const SUITE_AREAS = ["120 m²", "45 m²", "48 m²", "52 m²", "180 m²"];

export default function SuitesAmbientes() {
  const { t } = useLanguage();
  const revealRef = useScrollReveal<HTMLElement>();

  return (
    <section
      className="overflow-hidden bg-[var(--ink)] px-6 py-20 md:px-8 md:py-24"
      id="suites"
      ref={revealRef}
    >
      <div className="mx-auto w-full max-w-7xl">
        <p className="label-track reveal">{t.suitesAmbientes.label}</p>
        <div className="mt-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <h2 className="text-3xl font-light leading-[0.95] text-[var(--white)] sm:text-5xl lg:text-7xl reveal reveal-delay-1">
            <span className="font-display">{t.suitesAmbientes.h2_1}</span>
            <span className="gold-italic block">{t.suitesAmbientes.h2_2}</span>
          </h2>
          <p className="max-w-sm text-sm leading-relaxed text-[var(--cream-dk)] reveal reveal-delay-2">
            {t.suitesAmbientes.desc}
          </p>
        </div>

        {/* Horizontal scroll no mobile, grid no desktop */}
        <div
          className="mt-14 flex gap-4 overflow-x-auto pb-4 md:grid md:grid-cols-3 md:gap-6 md:overflow-visible md:pb-0 lg:grid-cols-5 reveal reveal-delay-3"
          style={{ scrollSnapType: "x mandatory" }}
        >
          {t.suitesAmbientes.suites.map((suite, idx) => (
            <article
              key={suite.name}
              className="group relative flex-shrink-0 w-[72vw] overflow-hidden rounded-xl border border-[rgba(212,188,128,0.15)] sm:w-[55vw] md:w-auto"
              style={{ scrollSnapAlign: "start" }}
            >
              <div className="aspect-[3/4] w-full overflow-hidden">
                <img
                  src={SUITE_SRCS[idx]}
                  alt={suite.name}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              {/* gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[rgba(10,10,10,0.92)] via-[rgba(10,10,10,0.15)] to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5">
                <p className="label-track text-[8px]">{suite.tag}</p>
                <h3 className="mt-2 font-display text-xl font-light text-[var(--white)]">{suite.name}</h3>
                <p className="mt-0.5 text-[10px] font-semibold tracking-[0.18em] text-[var(--gold)]">{SUITE_AREAS[idx]}</p>
                {/* descrição aparece no hover */}
                <p className="mt-3 max-h-0 overflow-hidden text-xs leading-relaxed text-[var(--cream-dk)] transition-all duration-500 group-hover:max-h-24 md:group-hover:max-h-32">
                  {suite.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
