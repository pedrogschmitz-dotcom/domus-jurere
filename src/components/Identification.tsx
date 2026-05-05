import { Search, BatteryLow, Scale, HeartHandshake, Sparkles } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const ICONS = [Search, BatteryLow, Scale, HeartHandshake, Sparkles];

const Identification = () => {
  const { t } = useLanguage();

  return (
    <section className="section-padding bg-card">
      <div className="container-content px-4 md:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <span className="inline-block px-4 py-2 bg-gold/10 rounded-full text-sm font-medium text-gold-dark">
            {t.identification.label}
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground">
            {t.identification.h2.split(" ").slice(0, 4).join(" ")} <span className="text-gold italic">{t.identification.h2.split(" ").slice(4).join(" ")}</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Atendimento pensado para quem quer entender o que está acontecendo, não apenas silenciar o sintoma.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-4 max-w-4xl mx-auto">
          {t.identification.items.map((text, i) => {
            const Icon = ICONS[i];
            return (
              <div
                key={text}
                className="card-elegant flex items-start gap-4 hover-lift"
                style={{ animationDelay: `${i * 0.08}s` }}
              >
                <div className="w-12 h-12 bg-gold/10 rounded-xl flex items-center justify-center shrink-0">
                  <Icon className="w-6 h-6 text-gold" />
                </div>
                <p className="text-foreground/90 leading-relaxed pt-2.5">{text}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Identification;
