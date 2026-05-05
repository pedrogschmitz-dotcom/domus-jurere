import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Car, ChefHat, Film, Trees, Waves, Wifi, Wine } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const ICONS: LucideIcon[] = [Waves, ChefHat, Film, Wifi, Car, Trees, Wine, Waves];

export default function Amenidades() {
  const { t } = useLanguage();
  const revealRef = useScrollReveal<HTMLElement>();

  return (
    <section id="amenidades" className="bg-[var(--ink)] px-6 py-20 md:px-8 md:py-20" ref={revealRef}>
      <div className="mx-auto w-full max-w-7xl">
        <p className="label-track reveal">{t.amenidades.label}</p>
        <h2 className="mt-6 text-3xl font-light leading-[0.95] text-[var(--white)] sm:text-5xl lg:text-7xl reveal reveal-delay-1">
          <span className="font-display">{t.amenidades.h2_1}</span>
          <span className="gold-italic block">{t.amenidades.h2_2}</span>
        </h2>

        <div className="mt-14 grid gap-5 md:grid-cols-2 max-md:grid-cols-1 xl:grid-cols-4">
          {t.amenidades.items.map((item, index) => {
            const Icon = ICONS[index];
            return (
              <article key={item.titulo} className={`glass-card p-7 reveal ${index % 4 === 0 ? "reveal-delay-1" : index % 4 === 1 ? "reveal-delay-2" : index % 4 === 2 ? "reveal-delay-3" : "reveal-delay-4"}`}>
                <Icon size={24} className="text-[var(--gold)]" />
                <h3 className="mt-5 text-sm font-semibold tracking-[0.12em] text-[var(--white)]">{item.titulo}</h3>
                <p className="mt-3 text-[13px] font-medium leading-relaxed text-[rgba(246,241,232,0.62)]">{item.desc}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
