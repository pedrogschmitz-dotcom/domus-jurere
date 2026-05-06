import { Stethoscope, Scale, Sparkles, ArrowRight } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import { useLanguage } from "@/contexts/LanguageContext";

const ICONS = [Stethoscope, Scale, Sparkles];

const Services = () => {
  const { t } = useLanguage();

  return (
    <section id="servicos" className="section-padding bg-background">
      <div className="container-content px-4 md:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <span className="inline-block px-4 py-2 bg-gold/10 rounded-full text-sm font-medium text-gold-dark">
            {t.services.label}
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground">
            {t.services.h2.split(" ").slice(0, 3).join(" ")} <span className="text-gold italic">{t.services.h2.split(" ").slice(3).join(" ")}</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Três frentes de atendimento conectadas pelo mesmo princípio: tempo, escuta e plano individualizado.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {t.services.items.map((service, i) => {
            const Icon = ICONS[i];
            return (
              <div
                key={service.title}
                className="card-elegant hover-lift group flex flex-col"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="w-14 h-14 bg-gold/10 rounded-2xl flex items-center justify-center mb-5 group-hover:bg-gold/20 transition-colors">
                  <Icon className="w-7 h-7 text-gold" />
                </div>

                <h3 className="font-display text-2xl font-semibold text-foreground mb-3">
                  {service.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-5">
                  {service.description}
                </p>

                <a
                  href="https://wa.me/5548984680088?text=Ol%C3%A1%2C%20gostaria%20de%20saber%20mais%20sobre%20a%20Domus%20Jurer%C3%AA."
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackEvent("whatsapp_click", { location: `services_${service.title}` })}
                  className="inline-flex items-center gap-2 text-gold font-medium mt-auto group/link"
                >
                  Falar no WhatsApp
                  <ArrowRight
                    size={16}
                    className="group-hover/link:translate-x-1 transition-transform"
                  />
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
