import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import type { Lang } from "@/lib/translations";

const FLAGS: Record<Lang, { emoji: string; code: string; label: string }> = {
  pt: { emoji: "🇧🇷", code: "PT", label: "Português" },
  es: { emoji: "🇪🇸", code: "ES", label: "Español" },
  en: { emoji: "🇬🇧", code: "EN", label: "English" },
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
        <span
          className="text-base leading-none"
          role="img"
          aria-label={current.label}
          style={{ fontFamily: "Apple Color Emoji, Segoe UI Emoji, sans-serif" }}
        >
          {current.emoji}
        </span>
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
                <span
                  className="text-base leading-none"
                  role="img"
                  aria-label={f.label}
                  style={{ fontFamily: "Apple Color Emoji, Segoe UI Emoji, sans-serif" }}
                >
                  {f.emoji}
                </span>
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
