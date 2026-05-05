import { useScrollReveal } from "@/hooks/useScrollReveal";
import { ExternalLink } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const MAPS_LINK = "https://maps.google.com/?q=Av+dos+B%C3%BAzios+1540,+Jurerê+Internacional,+Florianópolis,+SC";

export default function Localizacao() {
  const { t } = useLanguage();
  const revealRef = useScrollReveal<HTMLElement>();

  return (
    <section className="bg-[var(--ink)] px-6 py-[60px] md:px-8 md:py-[80px]" id="localizacao" ref={revealRef}>
      <div className="mx-auto grid w-full max-w-7xl gap-10 lg:grid-cols-2">
        <div>
          <p className="label-track reveal">{t.localizacao.label}</p>
          <h2 className="mt-6 text-3xl font-light leading-[0.95] text-[var(--white)] sm:text-5xl lg:text-7xl reveal reveal-delay-1">
            <span className="font-display">{t.localizacao.h2_1}</span>
            <span className="gold-italic block">{t.localizacao.h2_2}</span>
          </h2>

          <p className="mt-6 max-w-xl text-[15px] font-medium leading-relaxed text-[rgba(246,241,232,0.7)] reveal reveal-delay-2">
            {t.localizacao.desc}
          </p>

          <ul className="mt-8 space-y-3 text-xs font-semibold tracking-[0.2em] text-[var(--cream-dk)] reveal reveal-delay-3">
            {t.localizacao.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          <a href={MAPS_LINK} target="_blank" rel="noreferrer" className="btn-cta mt-8 inline-flex reveal reveal-delay-4" data-hover>
            {t.localizacao.cta} <ExternalLink size={15} />
          </a>
        </div>

        <div className="overflow-hidden rounded-sm border border-[rgba(212,188,128,0.2)] reveal reveal-delay-2">
          <iframe
            title={t.localizacao.mapTitle}
            src="https://maps.google.com/maps?q=Av+dos+B%C3%BAzios+1540,+Jurerê+Internacional,+Florianópolis,+SC&z=16&output=embed"
            width="100%"
            height="480"
            style={{ border: 0, filter: "grayscale(1) invert(0.86) contrast(1.2)" }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
}
