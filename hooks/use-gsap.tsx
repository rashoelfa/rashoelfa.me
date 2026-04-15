import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useGsap() {
  const contextRef = useRef<gsap.Context | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    setReady(true);
    return () => {
      contextRef.current?.revert();
    };
  }, []);

  const createContext = (callback: () => void) => {
    if (!ready) return;
    contextRef.current = gsap.context(callback);
  };

  return { gsap, context: createContext, ready };
}

export function useScrollAnimation(
  selector: string,
  options: gsap.TweenVars = {}
) {
  const ref = useRef<HTMLElement>(null);
  const { gsap: gsapInstance, ready } = useGsap();
  const optionsRef = useRef(options);
  optionsRef.current = options;

  useEffect(() => {
    if (!ready || !ref.current) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    gsapInstance.fromTo(
      ref.current,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.4,
        ease: 'power2.out',
        ...optionsRef.current
      }
    );

    const element = ref.current;
    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars.trigger === element) {
          trigger.kill();
        }
      });
    };
  }, [ready, gsapInstance]);

  return ref;
}