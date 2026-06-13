import { useEffect, useRef, useState } from "react";

export function useFloatingNavbar(threshold = 72) {
  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    let ticking = false;

    const onScroll = () => {
      if (ticking) return;
      ticking = true;

      requestAnimationFrame(() => {
        const currentY = window.scrollY;
        const delta = currentY - lastScrollY.current;

        if (currentY <= threshold) {
          setVisible(true);
        } else if (delta > 8) {
          setVisible(false);
        } else if (delta < -8) {
          setVisible(true);
        }

        lastScrollY.current = currentY;
        ticking = false;
      });
    };

    lastScrollY.current = window.scrollY;
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  return visible;
}
