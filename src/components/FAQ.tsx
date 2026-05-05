import { useScrollReveal } from "@/hooks/useScrollReveal";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function FAQ() {
  const { t } = useLanguage();
  const [open, setOpen] = useState<number | null>(0);
  const revealRef = useScrollReveal<HTMLElement>();

  return (
    <section className="bg-[var(--ink-soft)] px-6 py-[60px] md:px-8 md:py-[80px]" id="faq" ref={revealRef}>
      <div className="mx-auto w-full max-w-5xl">
        <p className="label-track reveal">{t.faq.label}</p>
        <h2 className="mt-6 text-3xl font-light leading-[0.95] text-[var(--white)] sm:text-5xl lg:text-7xl reveal reveal-delay-1">
          <span className="font-display">{t.faq.h2_1}</span>
          <span className="gold-italic block">{t.faq.h2_2}</span>
        </h2>

        <div className="mt-10 divide-y divide-[rgba(212,188,128,0.15)] border-y border-[rgba(212,188,128,0.15)]">
          {t.faq.items.map((item, index) => {
            const isOpen = open === index;
            return (
              <article key={item.q} className={`reveal ${index % 2 === 0 ? "reveal-delay-2" : "reveal-delay-3"}`}>
                <button
                  type="button"
                  onClick={() => setOpen((prev) => (prev === index ? null : index))}
                  className={`flex w-full items-center justify-between gap-4 px-1 py-5 text-left transition-colors ${isOpen ? "text-[var(--gold)]" : "text-[var(--cream)] hover:text-[var(--gold)]"}`}
                  data-hover
                >
                  <span className="text-sm font-semibold tracking-[0.08em]">{item.q}</span>
                  <ChevronDown size={18} className={`transition-transform ${isOpen ? "rotate-180" : "rotate-0"}`} />
                </button>
                {isOpen && <p className="pb-5 pr-8 text-[14px] font-medium leading-relaxed text-[rgba(246,241,232,0.68)]">{item.a}</p>}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
