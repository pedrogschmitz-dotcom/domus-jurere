import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useLanguage } from "@/contexts/LanguageContext";
import { OptimizedImage } from "./ui/OptimizedImage";

const WHATSAPP =
  "https://wa.me/5548984680088?text=Ol%C3%A1%2C%20quero%20saber%20mais%20sobre%20a%20Domus%20Jurer%C3%AA";

// Dados estruturais imutáveis (ids, quantidade de fotos, ordem)
const SUITES_STATIC = [
  { id: "zeus",     deus: "ZEUS",      fotos: 5,               },
  { id: "poseidon", deus: "POSEIDON",  fotos: 4,               },
  { id: "artemis",  deus: "ARTEMIS",   fotos: 3,               },
  { id: "apollo",   deus: "APOLLO",    fotos: 4, photoOrder: [3, 2, 4, 1] },
  { id: "hera",     deus: "HERA",      fotos: 3,               },
  { id: "dionisio", deus: "DIONISIO",  fotos: 4,               },
  { id: "aphodite", deus: "APHRODITE", fotos: 6,               },
  { id: "athena",   deus: "ATHENA",    fotos: 3,               },
] as const;

interface Suite {
  id: string;
  nome: string;
  deus: string;
  descricao: string;
  destaque?: string;
  fotos: number;
  photoOrder?: readonly number[];
  amenidades: string[];
}

function photoPath(id: string, n: number) {
  return `/images/quartos/${id}/${n}.webp`;
}

function resolvePhoto(suite: Suite, position: number): number {
  return suite.photoOrder ? suite.photoOrder[position - 1] : position;
}

interface LightboxProps {
  suite: Suite;
  startIndex: number;
  onClose: () => void;
}

function Lightbox({ suite, startIndex, onClose }: LightboxProps) {
  const { t } = useLanguage();
  const [idx, setIdx] = useState(startIndex);
  const total = suite.fotos;

  const prev = () => setIdx((i) => (i - 1 + total) % total);
  const next = () => setIdx((i) => (i + 1) % total);

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90"
      onClick={onClose}
    >
      <button
        className="absolute right-5 top-5 z-10 text-[var(--gold)] transition-colors hover:text-white"
        onClick={onClose}
        aria-label={t.quartos.ariaFechar}
      >
        <X size={28} />
      </button>

      <button
        className="absolute left-4 top-1/2 z-10 -translate-y-1/2 text-[var(--gold)] transition-colors hover:text-white"
        onClick={(e) => {
          e.stopPropagation();
          prev();
        }}
        aria-label={t.quartos.ariaAnterior}
      >
        <ChevronLeft size={36} />
      </button>

      <OptimizedImage
        src={photoPath(suite.id, resolvePhoto(suite, idx + 1))}
        alt={`${suite.nome} - foto ${idx + 1}`}
        className="max-h-[88vh] max-w-[90vw] object-contain"
        onClick={(e) => e.stopPropagation()}
      />

      <button
        className="absolute right-4 top-1/2 z-10 -translate-y-1/2 text-[var(--gold)] transition-colors hover:text-white"
        onClick={(e) => {
          e.stopPropagation();
          next();
        }}
        aria-label={t.quartos.ariaProxima}
      >
        <ChevronRight size={36} />
      </button>

      <span className="absolute bottom-5 text-[10px] tracking-[0.25em] text-[var(--gold-dk)]">
        {idx + 1} / {total}
      </span>
    </div>
  );
}

export default function Quartos() {
  const { t } = useLanguage();
  const revealRef = useScrollReveal<HTMLElement>();
  const [suiteId, setSuiteId] = useState("zeus");
  const [fotoAtiva, setFotoAtiva] = useState(1);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [thumbMenuOpen, setThumbMenuOpen] = useState(false);

  // Mescla dados estruturais com textos traduzidos
  const SUITES: Suite[] = SUITES_STATIC.map((s, i) => ({
    ...s,
    nome: t.quartos.suites[i].nome,
    descricao: t.quartos.suites[i].descricao,
    destaque: t.quartos.suites[i].destaque,
    amenidades: t.quartos.suites[i].amenidades,
  }));

  const suiteAtiva = useMemo(() => {
    return SUITES.find((item) => item.id === suiteId) ?? SUITES[0];
  }, [suiteId, SUITES]);

  const goPrev = () => {
    setFotoAtiva((v) => (v - 1 <= 0 ? suiteAtiva.fotos : v - 1));
  };

  const goNext = () => {
    setFotoAtiva((v) => (v + 1 > suiteAtiva.fotos ? 1 : v + 1));
  };

  const switchSuite = (id: string) => {
    setSuiteId(id);
    setFotoAtiva(1);
    setThumbMenuOpen(false);
  };

  const activePhoto = resolvePhoto(suiteAtiva, fotoAtiva);

  return (
    <section id="quartos" className="bg-[var(--ink)] py-24 md:py-32" ref={revealRef}>
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="reveal mb-12 text-center md:mb-16">
          <p className="label-track mb-4">{t.quartos.label}</p>
          <h2 className="font-display text-2xl font-normal italic leading-tight text-[var(--cream)] sm:text-4xl md:text-5xl">
            {t.quartos.h2}
          </h2>
          <hr className="rule-gold mx-auto mt-6" />
        </div>

        <div className="reveal reveal-delay-1 border-y border-[rgba(212,188,128,0.18)] py-3">
          <div className="no-scrollbar flex gap-2 overflow-x-auto md:justify-center">
            {SUITES.map((suite) => {
              const active = suite.id === suiteAtiva.id;
              return (
                <button
                  key={suite.id}
                  type="button"
                  onClick={() => switchSuite(suite.id)}
                  className={`whitespace-nowrap border px-4 py-2 text-[10px] font-semibold tracking-[0.24em] transition-all duration-300 ${
                    active
                      ? "border-[var(--gold)] bg-[rgba(212,188,128,0.14)] text-[var(--gold)] shadow-[0_0_24px_rgba(212,188,128,0.18)]"
                      : "border-transparent text-[var(--cream-dk)] hover:border-[rgba(212,188,128,0.28)] hover:text-[var(--gold)]"
                  }`}
                >
                  {suite.deus}
                </button>
              );
            })}
          </div>
        </div>

        <div className="reveal reveal-delay-2 mt-10 grid gap-10 lg:grid-cols-[1.3fr_0.7fr] lg:items-stretch">
          <div className="h-full">
            <div
              className="group relative aspect-[4/5] w-full overflow-hidden border border-[rgba(212,188,128,0.2)] bg-[var(--ink-soft)] md:aspect-[4/3] lg:aspect-[4/3]"
              onMouseEnter={() => setThumbMenuOpen(true)}
              onMouseLeave={() => setThumbMenuOpen(false)}
              onTouchStart={() => setThumbMenuOpen(true)}
            >
              <OptimizedImage
                src={photoPath(suiteAtiva.id, activePhoto)}
                alt={`${suiteAtiva.nome} - foto ${fotoAtiva}`}
                wrapperClassName="h-full w-full"
                className="h-full w-full object-cover object-center"
              />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-[rgba(8,8,8,0.82)] to-transparent" />

              {suiteAtiva.destaque && (
                <span className="absolute right-5 top-5 z-[3] bg-[var(--gold)] px-3 py-1 text-[9px] font-bold uppercase tracking-[0.24em] text-[var(--ink)]">
                  {suiteAtiva.destaque}
                </span>
              )}

              <div className="absolute left-5 top-5 z-[3]">
                <p className="text-[9px] tracking-[0.24em] text-[var(--gold)]">{suiteAtiva.nome.toUpperCase()}</p>
                <h3 className="font-display text-3xl italic text-[var(--cream)] md:text-5xl">{suiteAtiva.deus}</h3>
              </div>

              <div className="absolute bottom-5 right-5 z-[3]">
                <button
                  type="button"
                  onClick={() => setLightboxOpen(true)}
                  className="flex h-10 w-10 items-center justify-center border border-[rgba(212,188,128,0.42)] bg-[rgba(10,10,10,0.7)] text-[var(--gold)] transition-colors hover:text-[var(--gold-lt)]"
                  aria-label={t.quartos.ariaExpandir}
                >
                  <Expand size={18} />
                </button>
              </div>

              <button
                type="button"
                onClick={goPrev}
                className="absolute left-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center border border-[rgba(212,188,128,0.3)] bg-[rgba(10,10,10,0.5)] text-[var(--gold)] transition-colors hover:text-[var(--gold-lt)]"
                aria-label={t.quartos.ariaAnterior}
              >
                <ChevronLeft size={20} />
              </button>
              <button
                type="button"
                onClick={goNext}
                className="absolute right-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center border border-[rgba(212,188,128,0.3)] bg-[rgba(10,10,10,0.5)] text-[var(--gold)] transition-colors hover:text-[var(--gold-lt)]"
                aria-label={t.quartos.ariaProxima}
              >
                <ChevronRight size={20} />
              </button>

              <button
                type="button"
                onClick={() => setThumbMenuOpen((v) => !v)}
                className="absolute bottom-5 right-20 border border-[rgba(212,188,128,0.42)] bg-[rgba(10,10,10,0.7)] px-3 py-2 text-[9px] font-semibold tracking-[0.22em] text-[var(--gold)] transition-colors hover:text-[var(--gold-lt)] md:hidden"
                aria-label="Abrir miniaturas"
              >
                FOTOS
              </button>

              <div
                className={`absolute inset-x-0 bottom-0 z-[2] border-t border-[rgba(212,188,128,0.22)] bg-[linear-gradient(180deg,rgba(10,10,10,0.15),rgba(10,10,10,0.86))] px-4 pb-4 pt-3 backdrop-blur-sm transition-all duration-300 ${
                  thumbMenuOpen
                    ? "translate-y-0 opacity-100"
                    : "pointer-events-none translate-y-4 opacity-0 md:group-hover:pointer-events-auto md:group-hover:translate-y-0 md:group-hover:opacity-100"
                }`}
              >
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-[9px] font-semibold tracking-[0.22em] text-[var(--gold)]">GALERIA DA SUITE</span>
                  <span className="text-[9px] tracking-[0.18em] text-[var(--cream-dk)]">
                    {fotoAtiva}/{suiteAtiva.fotos}
                  </span>
                </div>

                <div className="no-scrollbar flex gap-2 overflow-x-auto">
                  {Array.from({ length: suiteAtiva.fotos }, (_, i) => i + 1).map((n) => {
                    const photoNumber = resolvePhoto(suiteAtiva, n);
                    return (
                      <button
                        type="button"
                        key={n}
                        onClick={() => {
                          setFotoAtiva(n);
                          setThumbMenuOpen(false);
                        }}
                        className={`group/shadow shrink-0 overflow-hidden border transition-all ${
                          fotoAtiva === n
                            ? "border-[var(--gold)]"
                            : "border-[rgba(212,188,128,0.2)] hover:border-[rgba(212,188,128,0.48)]"
                        }`}
                      >
                        <OptimizedImage
                          src={photoPath(suiteAtiva.id, photoNumber)}
                          alt={`${suiteAtiva.nome} miniatura ${n}`}
                          className="h-16 w-24 object-cover transition-transform duration-500 group-hover/shadow:scale-105"
                          showSkeleton={false}
                        />
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          <aside className="flex h-full flex-col border border-[rgba(212,188,128,0.2)] bg-[linear-gradient(180deg,rgba(20,20,20,0.75),rgba(10,10,10,0.92))] p-7 md:p-8">
            <p className="label-track">{t.quartos.colecao}</p>
            <h3 className="mt-5 font-display text-3xl font-normal italic text-[var(--cream)] md:text-[44px]">
              {suiteAtiva.nome}
            </h3>
            <p className="mt-5 text-[13px] leading-relaxed text-[var(--cream-dk)]">{suiteAtiva.descricao}</p>

            <div className="mt-8 border-t border-[rgba(212,188,128,0.16)] pt-6">
              <p className="text-[10px] font-semibold tracking-[0.24em] text-[var(--gold)]">{t.quartos.destaques}</p>
              <ul className="mt-4 space-y-3">
                {suiteAtiva.amenidades.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-[12px] tracking-[0.06em] text-[var(--cream-dk)]">
                    <span className="h-px w-5 bg-[var(--gold)]" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <a
              href={WHATSAPP}
              target="_blank"
              rel="noreferrer"
              data-hover
              className="btn-cta-primary mt-auto inline-block"
            >
              {t.quartos.reservar}
            </a>
          </aside>
        </div>

        <div className="reveal reveal-delay-3 mt-16 text-center">
          <a
            href={WHATSAPP}
            target="_blank"
            rel="noreferrer"
            data-hover
            className="btn-cta-primary inline-block"
          >
            {t.quartos.ctaDisponibilidade}
          </a>
        </div>
      </div>

      {lightboxOpen && (
        <Lightbox
          suite={suiteAtiva}
          startIndex={fotoAtiva - 1}
          onClose={() => setLightboxOpen(false)}
        />
      )}
    </section>
  );
}
