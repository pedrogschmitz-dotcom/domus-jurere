import { useEffect, useState } from "react";

export default function CustomCursor() {
  const [isTouchDevice, setIsTouchDevice] = useState(true);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const touch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncReducedMotion = () => setPrefersReducedMotion(reducedMotionQuery.matches);
    syncReducedMotion();

    setIsTouchDevice(touch);
    if (touch || reducedMotionQuery.matches) return;

    const move = (event: MouseEvent) => setPosition({ x: event.clientX, y: event.clientY });
    const over = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      setHovered(Boolean(target?.closest("a, button, [data-hover]")));
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    reducedMotionQuery.addEventListener("change", syncReducedMotion);

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
      reducedMotionQuery.removeEventListener("change", syncReducedMotion);
    };
  }, []);

  if (isTouchDevice || prefersReducedMotion) return null;

  return (
    <div
      style={{
        position: "fixed",
        left: position.x,
        top: position.y,
        width: hovered ? 40 : 12,
        height: hovered ? 40 : 12,
        marginLeft: hovered ? -20 : -6,
        marginTop: hovered ? -20 : -6,
        border: "1px solid rgba(212,188,128,0.70)",
        borderRadius: "50%",
        pointerEvents: "none",
        zIndex: 9999,
        transition: "width 0.25s ease, height 0.25s ease, margin 0.25s ease, opacity 0.2s ease",
        mixBlendMode: "difference",
      }}
    />
  );
}