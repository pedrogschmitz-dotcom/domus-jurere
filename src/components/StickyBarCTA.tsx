import { useEffect, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function StickyBarCTA() {
  const { t } = useLanguage();
  const [visible, setVisible] = useState(false);

  const WHATSAPP = `https://wa.me/5548984680088?text=${encodeURIComponent(t.contato.formIntro)}`;

  useEffect(() => {
    const onScroll = () => {
      // Aparece após passar 80vh do hero
      setVisible(window.scrollY > window.innerHeight * 0.8);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 flex items-center justify-between border-t border-[rgba(212,188,128,0.25)] bg-[rgba(10,10,10,0.97)] px-5 py-4 backdrop-blur transition-transform duration-500 md:px-10 lg:hidden ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
      aria-hidden={!visible}
    >
      <div>
        <p className="text-[9px] font-semibold uppercase tracking-[0.22em] text-[var(--cream-dk)]">
          DOMUS.JURERE
        </p>
        <p className="mt-0.5 text-xs text-[var(--gold)]">{t.stickybar.subtitle}</p>
      </div>
      <a
        href={WHATSAPP}
        target="_blank"
        rel="noreferrer"
        className="btn-cta-primary text-xs px-6 py-3"
        tabIndex={visible ? 0 : -1}
      >
        {t.stickybar.cta}
      </a>
    </div>
  );
}
