import { Clock, Ear, Compass } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const ICONS = [Clock, Ear, Compass];

const Principles = () => {
  const { t } = useLanguage();

  return (
    <section className="section-padding bg-background">
      <div className="container-content px-4 md:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <span className="inline-block px-4 py-2 bg-gold/10 rounded-full text-sm font-medium text-gold-dark">
            {t.principles.label}
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground">
            {t.principles.h2.split(" ").slice(0, 2).join(" ")} <span className="text-gold italic">{t.principles.h2.split(" ").slice(2).join(" ")}</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {t.principles.items.map((p, i) => {
            const Icon = ICONS[i];
            return (
              <div
                key={p.title}
                className="card-elegant text-center hover-lift"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="w-14 h-14 bg-gold/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-7 h-7 text-gold" />
                </div>
                <h3 className="font-display text-2xl font-semibold text-foreground mb-2">
                  {p.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">{p.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Principles;
