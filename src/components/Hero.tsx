import { ChevronDown } from "lucide-react";
import { useEffect, useRef } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

const WHATSAPP = "https://wa.me/5548984680088";

export default function Hero() {
  const { t } = useLanguage();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const logoImgRef = useRef<HTMLImageElement | null>(null);
  const offscreenRef = useRef<HTMLCanvasElement | null>(null); // canvas offscreen para hit-test por pixel
  const opacityRef = useRef(0.82);       // opacidade atual do véu
  const targetOpacityRef = useRef(0.82); // opacidade alvo
  const rafRef = useRef<number>(0);
  const logoBoundsRef = useRef({ x: 0, y: 0, w: 0, h: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const draw = (veilOpacity: number) => {
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.globalCompositeOperation = "source-over";
      ctx.fillStyle = `rgba(8,8,8,${veilOpacity})`;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const logo = logoImgRef.current;
      if (!logo || !logo.complete) return;

      const logoW = Math.min(canvas.width * 1.10, 1400);
      const logoH = logo.height * (logoW / logo.width);
      const logoX = (canvas.width - logoW) / 2;
      const logoY = canvas.height * 0.46 - logoH / 2;

      logoBoundsRef.current = { x: logoX, y: logoY, w: logoW, h: logoH };

      ctx.globalCompositeOperation = "destination-out";
      ctx.drawImage(logo, logoX, logoY, logoW, logoH);
    };

    const animate = () => {
      const cur = opacityRef.current;
      const tgt = targetOpacityRef.current;
      const diff = tgt - cur;
      if (Math.abs(diff) > 0.004) {
        opacityRef.current = cur + diff * 0.08;
        draw(opacityRef.current);
        rafRef.current = requestAnimationFrame(animate);
      } else {
        opacityRef.current = tgt;
        draw(tgt);
      }
    };

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      draw(opacityRef.current);
    };

    // Carrega a logo uma vez
    const logo = new Image();
    logo.onload = () => {
      logoImgRef.current = logo;

      // Cria canvas offscreen com a logo original para hit-test por pixel
      const off = document.createElement("canvas");
      off.width = logo.naturalWidth;
      off.height = logo.naturalHeight;
      const octx = off.getContext("2d");
      if (octx) octx.drawImage(logo, 0, 0);
      offscreenRef.current = off;

      resize();
    };
    logo.src = "./images/logo-domus-texto.png";

    // Retorna true se o pixel (mx, my) em coords do canvas cair sobre um pixel opaco da logo
    const isOverLogo = (mx: number, my: number): boolean => {
      const { x, y, w, h } = logoBoundsRef.current;
      const off = offscreenRef.current;
      if (!off) return false;
      // converte coords do canvas para coords do offscreen
      const lx = ((mx - x) / w) * off.width;
      const ly = ((my - y) / h) * off.height;
      if (lx < 0 || ly < 0 || lx >= off.width || ly >= off.height) return false;
      const ctx = off.getContext("2d");
      if (!ctx) return false;
      const pixel = ctx.getImageData(Math.floor(lx), Math.floor(ly), 1, 1).data;
      return pixel[3] > 30; // alpha > 30 = sobre uma letra
    };

    // Hover: detecta se mouse está exatamente sobre um pixel das letras
    const onMouseMove = (e: MouseEvent) => {
      const rect = (sectionRef.current ?? canvas).getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;
      const over = isOverLogo(mx, my);
      targetOpacityRef.current = over ? 0 : 0.82;
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(animate);
    };

    const onMouseLeave = () => {
      targetOpacityRef.current = 0.82;
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(animate);
    };

    const section = sectionRef.current;
    section?.addEventListener("mousemove", onMouseMove);
    section?.addEventListener("mouseleave", onMouseLeave);

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    return () => {
      ro.disconnect();
      section?.removeEventListener("mousemove", onMouseMove);
      section?.removeEventListener("mouseleave", onMouseLeave);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <section ref={sectionRef} id="mansao" className="relative flex min-h-screen flex-col overflow-hidden">
      {/* Foto de fundo */}
      <picture>
        <source srcSet="./images/fachada.webp" type="image/webp" />
        <img
          src="./images/fachada.jpg"
          alt="Fachada da DOMUS.JURERE em Jurerê Internacional"
          className="absolute inset-0 h-full w-full object-cover"
          loading="eager"
          fetchPriority="high"
          decoding="async"
        />
      </picture>

      {/* Canvas: véu escuro com recorte no formato da logo + hover reveal */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full cursor-pointer"
        aria-hidden="true"
      />

      {/* Gradiente suave no rodapé para legibilidade do CTA */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-52 bg-gradient-to-t from-[rgba(8,8,8,0.90)] to-transparent" />

      {/* Conteúdo */}
      <div className="relative z-10 flex flex-1 flex-col items-center justify-between px-6 pt-32 pb-10 text-center">
        <p className="label-track animate-fade-in reveal revealed">
          {t.hero.subtitle}
        </p>

        <div aria-hidden="true" />

        <div className="flex flex-col items-center gap-5">
          <a
            href={WHATSAPP}
            target="_blank"
            rel="noreferrer"
            data-hover
            className="btn-cta-primary animate-fade-in-up reveal revealed"
          >
            {t.hero.cta}
          </a>
          <a href="#galeria" className="text-[var(--gold)] animate-bounce" aria-label="Rolar para baixo">
            <ChevronDown size={22} />
          </a>
        </div>
      </div>
    </section>
  );
}
