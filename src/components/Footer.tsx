import { useLanguage } from "@/contexts/LanguageContext";

const WHATSAPP = "https://wa.me/5548984680088";
const INSTAGRAM = "https://www.instagram.com/domus.jurere";

export default function Footer() {
  const { t } = useLanguage();

  const links = [
    { href: "#mansao", label: t.nav.mansion },
    { href: "#galeria", label: t.nav.galeria },
    { href: "#amenidades", label: t.nav.amenidades },
    { href: "#localizacao", label: t.nav.localizacao },
    { href: "#contato", label: t.nav.contato },
  ];

  return (
    <footer className="border-t border-[rgba(212,188,128,0.15)] bg-[var(--ink-soft)]">
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-6 py-16 md:grid-cols-3 md:px-8">
        <div>
          <img
            src="./images/logo-domus.png"
            alt="DOMUS Jurerê Internacional"
            className="w-56 object-contain md:w-72"
          />
          <p className="mt-4 text-sm font-medium tracking-[0.08em] text-[rgba(246,241,232,0.7)]">
            Jurerê Internacional · Florianópolis · SC
          </p>
        </div>

        <div>
          <p className="label-track">{t.footer.nav}</p>
          <nav className="mt-4 flex flex-col gap-3">
            {links.map((item) => (
              <a key={item.href} href={item.href} className="text-xs font-semibold tracking-[0.2em] text-[var(--cream-dk)] transition-colors hover:text-[var(--gold)]" data-hover>
                {item.label}
              </a>
            ))}
          </nav>
        </div>

        <div>
          <p className="label-track">{t.footer.contato}</p>
          <a href={WHATSAPP} target="_blank" rel="noreferrer" className="mt-4 inline-flex text-xs font-semibold tracking-[0.2em] text-[var(--gold)] transition-colors hover:text-[var(--gold-lt)]" data-hover>
            {t.footer.ctaPrivado}
          </a>
          <a href={INSTAGRAM} target="_blank" rel="noreferrer" className="mt-3 block text-xs font-semibold tracking-[0.2em] text-[var(--cream-dk)] transition-colors hover:text-[var(--gold)]" data-hover>
            @domus.jurere
          </a>
        </div>
      </div>

      <div className="border-t border-[rgba(212,188,128,0.15)]">
        <div className="mx-auto w-full max-w-7xl px-6 py-6 text-[11px] font-semibold tracking-[0.16em] text-[rgba(246,241,232,0.6)] md:px-8">
          {t.footer.copyright}
        </div>
      </div>
    </footer>
  );
}
