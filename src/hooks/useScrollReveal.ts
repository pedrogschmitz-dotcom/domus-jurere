import { useEffect, useRef } from "react";

export function useScrollReveal<T extends HTMLElement>(options: IntersectionObserverInit = {}) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          element.querySelectorAll<HTMLElement>(".reveal").forEach((node) => node.classList.add("revealed"));
          observer.unobserve(element);
        }
      },
      { threshold: 0.12, ...options },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [options]);

  return ref;
}