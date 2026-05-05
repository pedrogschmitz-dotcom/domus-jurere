import { useState } from "react";
import {
  Syringe,
  Droplets,
  Sparkles,
  Layers,
  HeartPulse,
  Waves,
  Flame,
  Zap,
  Activity,
  ChevronDown,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const ICONS = [Syringe, Droplets, Sparkles, Layers, HeartPulse, Waves, Flame, Zap, Activity];

const Procedures = () => {
  const { t } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="section-padding bg-card">
      <div className="container-content px-4 md:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <span className="inline-block px-4 py-2 bg-gold/10 rounded-full text-sm font-medium text-gold-dark">
            Procedimentos
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground">
            Conheça <span className="text-gold italic">cada procedimento</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Conheça cada um dos procedimentos disponíveis. Indicação sempre definida em consulta médica.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">
          {t.procedures.items.map((p, i) => {
            const isOpen = openIndex === i;
            const Icon = ICONS[i];
            return (
              <button
                key={p.title}
                onClick={() => setOpenIndex(isOpen ? null : i)}
                className={`text-left card-elegant hover-lift transition-all duration-300 ${
                  isOpen ? "ring-2 ring-gold/40 shadow-card" : ""
                }`}
                aria-expanded={isOpen}
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 bg-gold/10 rounded-xl flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5 text-gold" />
                    </div>
                    <h3 className="font-display text-xl font-semibold text-foreground">
                      {p.title}
                    </h3>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 text-gold shrink-0 transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </div>

                <div
                  className={`grid transition-all duration-300 ${
                    isOpen ? "grid-rows-[1fr] opacity-100 mt-2" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="text-sm text-muted-foreground leading-relaxed">{p.description}</p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        <p className="text-center text-sm text-muted-foreground/80 mt-10 max-w-2xl mx-auto">
          Conteúdo informativo. Indicação, técnica e expectativa de resultado dependem de avaliação médica individual.
        </p>
      </div>
    </section>
  );
};

export default Procedures;
