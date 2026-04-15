import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";
import NextNProgress from "nextjs-progressbar";
import FluidCursor from "../components/fluid-cursor";
import { useRouter } from "next/router";
import { useEffect, useRef } from "react";
import gsap from "gsap";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const transitionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const handleStart = () => {
      if (transitionRef.current) {
        gsap.to(transitionRef.current, {
          opacity: 1,
          duration: 0.2,
          ease: 'power2.in'
        });
      }
    };

    const handleComplete = () => {
      if (transitionRef.current) {
        gsap.to(transitionRef.current, {
          opacity: 0,
          duration: 0.2,
          ease: 'power2.out'
        });
      }
    };

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleComplete);
    };
  }, [router]);

  return (
    <ThemeProvider attribute="class" defaultTheme="light">
      <div
        ref={transitionRef}
        className="fixed inset-0 bg-slate-800 z-50 pointer-events-none opacity-0"
      />
      <FluidCursor />
      <NextNProgress color="#000" options={{ showSpinner: false }} />
      <Component {...pageProps}></Component>
    </ThemeProvider>
  );
}

export default MyApp;