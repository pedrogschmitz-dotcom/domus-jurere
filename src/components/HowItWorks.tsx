import { Clock, Ear, ClipboardList, Compass } from "lucide-react";
import ConsultationPhotoRoulette from "@/components/ConsultationPhotoRoulette";
import { useLanguage } from "@/contexts/LanguageContext";

const ICONS = [Clock, Ear, ClipboardList, Compass];

const HowItWorks = () => {
  const { t } = useLanguage();

  return (
    <section className="section-padding bg-background">
      <div className="container-content px-4 md:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <span className="inline-block px-4 py-2 bg-gold/10 rounded-full text-sm font-medium text-gold-dark">
                {t.howItWorks.label}
              </span>
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground">
                {t.howItWorks.h2_1} <span className="text-gold italic">{t.howItWorks.h2_2}</span>
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {t.howItWorks.desc}
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {t.howItWorks.steps.map((step, i) => {
                const Icon = ICONS[i];
                return (
                  <div
                    key={step.title}
                    className="space-y-2"
                    style={{ animationDelay: `${i * 0.1}s` }}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gold/10 rounded-lg flex items-center justify-center">
                        <Icon className="w-5 h-5 text-gold" />
                      </div>
                      <h3 className="font-display text-xl font-semibold text-foreground">
                        {step.title}
                      </h3>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed pl-13">
                      {step.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Roleta de fotos do atendimento */}
          <div className="relative pb-20">
            <ConsultationPhotoRoulette />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
