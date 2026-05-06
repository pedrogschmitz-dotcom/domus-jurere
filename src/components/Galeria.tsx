import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useMemo, useEffect, useRef, useState, useCallback } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

const MEDIA_SRCS = [
  "./videos/clip1-entrada.mp4",
  "./videos/clip2-piscina.mp4",
  "./videos/clip3-cozinha.mp4",
  "./videos/clip4-sala.mp4",
  "./videos/clip5-garagem.mp4",
] as const;

const MEDIA_POSTERS = [
  "./images/fachada.jpg",
  "./images/piscina.jpg",
  "./images/detalhe.jpg",
  "./images/interior.jpg",
  "./images/aerea.jpg",
] as const;

type VideoSlideProps = {
  src: string;
  active: boolean;
  poster: string;
  startAt?: number;
  segmentDuration?: number;
};

function VideoSlide({ src, active, poster, startAt = 0, segmentDuration }: VideoSlideProps) {
  const ref = useRef<HTMLVideoElement>(null);
  const [retryCount, setRetryCount] = useState(0);
  const MAX_RETRIES = 3;

    const seekToStart = useCallback(() => {
    if (!ref.current) return;
    if (startAt > 0) {
      ref.current.currentTime = startAt;
    } else {
      ref.current.currentTime = 0;
    }
    }, [startAt]);

  useEffect(() => {
    if (!ref.current) return;
    if (active) {
      if (ref.current.readyState >= 1) {
        seekToStart();
      }
      ref.current.play().catch(() => {});
    } else {
      ref.current.pause();
    }
  }, [active, seekToStart]);

  const handleLoadedMetadata = () => {
    if (!active) return;
    seekToStart();
  };

  const handleTimeUpdate = () => {
    if (!ref.current || !active || !segmentDuration) return;
    const duration = Number.isFinite(ref.current.duration)
      ? ref.current.duration
      : startAt + segmentDuration;
    const endAt = Math.min(startAt + segmentDuration, duration);

    if (ref.current.currentTime >= endAt) {
      ref.current.currentTime = startAt;
      ref.current.play().catch(() => {});
    }
  };

  const handleError = () => {
    if (retryCount < MAX_RETRIES && ref.current) {
      setRetryCount((prev) => prev + 1);
      setTimeout(() => {
        if (ref.current) {
          ref.current.load();
        }
      }, 500 * (retryCount + 1));
    }
  };

  return (
    <video
      ref={ref}
        src={active ? src : undefined}
        poster={poster}
      className="h-full w-full object-cover"
      muted
      playsInline
      loop={!segmentDuration}
        preload={active ? "auto" : "none"}
      onLoadedMetadata={handleLoadedMetadata}
      onTimeUpdate={handleTimeUpdate}
      onError={handleError}
    />
  );
}

export default function Galeria() {
  const { t } = useLanguage();
  const [active, setActive] = useState(0);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchEndX, setTouchEndX] = useState<number | null>(null);
  const revealRef = useScrollReveal<HTMLElement>();

  const media = t.galeria.mediaLabels.map((label, i) => ({
    id: i + 1,
    label,
    tag: "VIDEO" as const,
    src: MEDIA_SRCS[i],
  }));

  const n = media.length;
  const prevIndex = useMemo(() => (active - 1 + n) % n, [active, n]);
  const nextIndex = useMemo(() => (active + 1) % n, [active, n]);

  const goPrev = () => setActive((v) => (v - 1 + n) % n);
  const goNext = () => setActive((v) => (v + 1) % n);

  const handleTouchStart = (x: number) => { setTouchStartX(x); setTouchEndX(x); };
  const handleTouchMove  = (x: number) => setTouchEndX(x);
  const handleTouchEnd   = () => {
    if (touchStartX === null || touchEndX === null) return;
    const d = touchStartX - touchEndX;
    if (d > 40) goNext();
    else if (d < -40) goPrev();
    setTouchStartX(null);
    setTouchEndX(null);
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    if (e.clientX - r.left > r.width / 2) goNext();
    else goPrev();
  };

  return (
    <section className="bg-[var(--ink)] px-6 py-20 md:px-8 md:py-24" id="galeria" ref={revealRef}>
      <div className="mx-auto w-full max-w-7xl">
        <p className="label-track reveal">{t.galeria.label}</p>
        <h2 className="mt-6 text-3xl font-light leading-[0.95] text-[var(--white)] sm:text-5xl lg:text-7xl reveal reveal-delay-1">
          <span className="font-display">{t.galeria.h2_1}</span>
          <span className="gold-italic block">{t.galeria.h2_2}</span>
        </h2>

        {/* Carrossel stories 9:16 */}
        <div
          className="relative mt-14 flex items-center justify-center reveal reveal-delay-2"
          style={{ height: "clamp(480px, 72vh, 720px)", perspective: "1200px" }}
          onTouchStart={(e) => handleTouchStart(e.touches[0].clientX)}
          onTouchMove={(e)  => handleTouchMove(e.touches[0].clientX)}
          onTouchEnd={handleTouchEnd}
          onClick={handleClick}
        >
          {media.map((item, idx) => {
            const isCurrent = idx === active;
            const isPrev    = idx === prevIndex;
            const isNext    = idx === nextIndex;
            const visible   = isCurrent || isPrev || isNext;

            if (!visible) return null;

            let transform = "translateX(-50%) scale(0.7)";
            let opacity   = 0;
            let zIndex    = 1;

            if (isCurrent) {
              transform = "translateX(-50%) scale(1)";
              opacity   = 1;
              zIndex    = 30;
            } else if (isPrev) {
              transform = "translateX(calc(-50% - clamp(110px, 20vw, 240px))) scale(0.84) rotateY(14deg)";
              opacity   = 0.55;
              zIndex    = 20;
            } else if (isNext) {
              transform = "translateX(calc(-50% + clamp(110px, 20vw, 240px))) scale(0.84) rotateY(-14deg)";
              opacity   = 0.55;
              zIndex    = 20;
            }

            return (
              <article
                key={item.id}
                className="absolute left-1/2 top-0 bottom-0 overflow-hidden rounded-xl border border-[rgba(212,188,128,0.18)]"
                style={{
                  aspectRatio: "9 / 16",
                  width: "auto",
                  height: "100%",
                  transform,
                  opacity,
                  zIndex,
                  pointerEvents: isCurrent ? "auto" : "none",
                  transition: "transform 420ms cubic-bezier(0.16,1,0.3,1), opacity 320ms ease",
                  boxShadow: isCurrent
                    ? "0 32px 64px rgba(0,0,0,0.55)"
                    : "0 12px 24px rgba(0,0,0,0.3)",
                }}
              >
                {item.tag === "VIDEO" ? (
                  <VideoSlide
                    src={item.src}
                    active={isCurrent}
                      poster={MEDIA_POSTERS[idx]}
                    startAt={idx === 0 ? 2 : 0}
                    segmentDuration={idx === 0 ? 10 : undefined}
                  />
                ) : (
                  <img src={item.src} alt={item.label} className="h-full w-full object-cover" />
                )}
                {/* overlay escuro nas laterais */}
                {!isCurrent && (
                  <div className="absolute inset-0" style={{ background: "rgba(8,8,8,0.75)" }} />
                )}
                {/* legenda só no central */}
                {isCurrent && (
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[rgba(10,10,10,0.9)] to-transparent p-5">
                    <p className="label-track text-[9px]">{item.tag}</p>
                    <p className="mt-2 text-sm font-semibold tracking-[0.12em] text-[var(--cream)]">{item.label}</p>
                  </div>
                )}
              </article>
            );
          })}
        </div>

        {/* Dots */}
        <div className="mt-8 flex items-center justify-center gap-2 reveal reveal-delay-3">
          {media.map((item, idx) => (
            <button
              key={item.id}
              type="button"
              aria-label={`Ir para slide ${idx + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                idx === active
                  ? "w-8 bg-[var(--gold)]"
                  : "w-2 bg-[rgba(107,101,96,0.6)]"
              }`}
              onClick={(e) => { e.stopPropagation(); setActive(idx); }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

