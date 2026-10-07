import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const MOTION_OK = "(prefers-reduced-motion: no-preference)";

/**
 * Animates descendants of the returned ref:
 * - `[data-reveal-line]`: slides up inside an overflow-hidden parent (masked line reveal).
 * - `[data-reveal]`: fades up when scrolled into view.
 * Both start hidden via globals.css, so there is no flash before hydration.
 */
export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    const mm = gsap.matchMedia();
    mm.add(MOTION_OK, () => {
      const lines = root.querySelectorAll("[data-reveal-line]");
      gsap.set(lines, { autoAlpha: 1 });
      gsap.from(lines, { yPercent: 110, duration: 1.1, ease: "expo.out", stagger: 0.08 });

      ScrollTrigger.batch(root.querySelectorAll("[data-reveal]"), {
        start: "top 92%",
        once: true,
        onEnter: (els) =>
          gsap.fromTo(
            els,
            { y: 24, autoAlpha: 0 },
            {
              y: 0,
              autoAlpha: 1,
              duration: 0.9,
              ease: "expo.out",
              stagger: 0.08,
              delay: lines.length ? 0.3 : 0,
            }
          ),
      });
    });

    return () => mm.revert();
  }, []);

  return ref;
}

/** Element drifts toward the pointer while hovered, springs back on leave. Mouse + motion-OK only. */
export function useMagnetic<T extends HTMLElement>(strength = 0.3) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const mm = gsap.matchMedia();
    mm.add(`${MOTION_OK} and (hover: hover)`, () => {
      const toX = gsap.quickTo(el, "x", { duration: 0.6, ease: "elastic.out(1, 0.4)" });
      const toY = gsap.quickTo(el, "y", { duration: 0.6, ease: "elastic.out(1, 0.4)" });

      const move = (e: PointerEvent) => {
        const r = el.getBoundingClientRect();
        // Subtract the current offset so the element's own movement doesn't feed back in.
        const cx = r.left - Number(gsap.getProperty(el, "x")) + r.width / 2;
        const cy = r.top - Number(gsap.getProperty(el, "y")) + r.height / 2;
        toX((e.clientX - cx) * strength);
        toY((e.clientY - cy) * strength);
      };
      const leave = () => {
        toX(0);
        toY(0);
      };

      el.addEventListener("pointermove", move);
      el.addEventListener("pointerleave", leave);
      return () => {
        el.removeEventListener("pointermove", move);
        el.removeEventListener("pointerleave", leave);
      };
    });

    return () => mm.revert();
  }, [strength]);

  return ref;
}
