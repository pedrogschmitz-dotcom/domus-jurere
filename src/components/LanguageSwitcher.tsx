import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import type { Lang } from "@/lib/translations";

// SVG flag icons for better cross-platform compatibility
const FlagIcons: Record<Lang, React.ReactNode> = {
  pt: (
    <svg viewBox="0 0 900 600" className="h-5 w-5" aria-hidden="true">
      <rect width="900" height="600" fill="#009739" />
      <path d="M450 85 L765 300 L450 515 L135 300 Z" fill="#FEDD00" />
      <circle cx="450" cy="300" r="125" fill="#012169" />
      <path d="M300 315 C375 270 525 270 600 315" stroke="#FFFFFF" strokeWidth="24" fill="none" />
    </svg>
  ),
  es: (
    <svg viewBox="0 0 900 600" className="h-5 w-5" aria-hidden="true">
      <rect width="900" height="200" fill="#AA151B"/>
      <rect y="200" width="900" height="200" fill="#FFC400"/>
      <rect y="400" width="900" height="200" fill="#AA151B"/>
    </svg>
  ),
  en: (
    <svg viewBox="0 0 900 600" className="h-5 w-5" aria-hidden="true">
      <rect width="900" height="600" fill="#012169"/>
      <path d="M0,0 L900,600 M900,0 L0,600" stroke="#FFF" strokeWidth="120"/>
      <path d="M0,0 L900,600 M900,0 L0,600" stroke="#C8102E" strokeWidth="60"/>
      <rect y="250" width="900" height="100" fill="#FFF"/>
      <rect y="270" width="900" height="60" fill="#C8102E"/>
      <rect x="350" width="200" height="600" fill="#FFF"/>
      <rect x="370" width="160" height="600" fill="#C8102E"/>
    </svg>
  ),
};

const FLAGS: Record<Lang, { icon: React.ReactNode; code: string; label: string }> = {
  pt: { icon: FlagIcons.pt, code: "PT", label: "Português" },
  es: { icon: FlagIcons.es, code: "ES", label: "Español" },
  en: { icon: FlagIcons.en, code: "EN", label: "English" },
};

const LANGS: Lang[] = ["pt", "es", "en"];

export default function LanguageSwitcher() {
  const { lang, setLang } = useLanguage();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Fecha ao clicar fora
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  // Fecha ao pressionar Esc
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open]);

  const others = LANGS.filter((l) => l !== lang);
  const current = FLAGS[lang];

  return (
    <div ref={ref} className="relative flex-shrink-0">
      {/* Botão com a bandeira ativa */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={`Idioma: ${current.label}. Clique para alternar`}
        aria-expanded={open}
        className="flex h-10 w-10 items-center justify-center rounded-full border border-[rgba(212,188,128,0.35)] bg-[rgba(10,10,10,0.55)] transition-all duration-200 hover:border-[var(--gold)] hover:bg-[rgba(212,188,128,0.08)]"
      >
        <div className="h-5 w-5 overflow-hidden rounded">
          {current.icon}
        </div>
      </button>

      {/* Dropdown */}
      {open && (
        <div
          className="absolute right-0 top-[calc(100%+8px)] z-50 flex flex-col gap-1 rounded-sm border border-[rgba(212,188,128,0.25)] bg-[rgba(10,10,10,0.97)] py-2 shadow-[0_12px_32px_rgba(0,0,0,0.6)] backdrop-blur-sm"
          style={{ minWidth: "80px" }}
        >
          {others.map((l) => {
            const f = FLAGS[l];
            return (
              <button
                key={l}
                type="button"
                onClick={() => { setLang(l); setOpen(false); }}
                aria-label={f.label}
                className="flex items-center gap-2 px-4 py-2 text-left transition-colors hover:bg-[rgba(212,188,128,0.08)]"
              >
                <div className="h-5 w-5 overflow-hidden rounded">
                  {f.icon}
                </div>
                <span className="text-[10px] font-semibold tracking-[0.22em] text-[var(--cream-dk)]">
                  {f.code}
                </span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
