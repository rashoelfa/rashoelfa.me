import type { NextPage } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import SEO from "../components/SEO";
import { useMagnetic, useReveal } from "../hooks/use-gsap";

// Inner span slides up from below; the outer span's overflow clip makes it read as a mask.
// Padding/negative margin keeps descenders from being clipped.
const Line = ({ children, className = "" }: { children: ReactNode; className?: string }) => (
  <span className="-mb-[0.12em] block overflow-hidden pb-[0.12em]">
    <span data-reveal-line className={`block ${className}`}>
      {children}
    </span>
  </span>
);

const Home: NextPage = () => {
  const ref = useReveal<HTMLElement>();
  const ctaRef = useMagnetic<HTMLSpanElement>();

  return (
    <main ref={ref} className="mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center px-6 py-24">
      <SEO
        title="Rasyidana Sulthan Fathansyah | Backend Developer"
        description="Personal website of Rasyidana Sulthan Fathansyah, a Backend Developer specializing in Go and Node.js. Learn more about my projects and experience."
        path="/"
      />

      <h1 className="text-[clamp(3rem,9vw,7.5rem)] font-semibold leading-[0.95] tracking-[-0.045em]">
        <Line>Hello, I&apos;m</Line>
        <Line>Rasyid,</Line>
        <Line className="text-muted">the developer.</Line>
      </h1>

      <div data-reveal className="mt-10 flex flex-wrap items-center gap-6">
        <span ref={ctaRef} className="inline-block">
          <Link href="/about" className="btn-primary group">
            About me
            <span aria-hidden className="transition-transform duration-300 ease-out-expo group-hover:translate-x-1">
              →
            </span>
          </Link>
        </span>
        <a
          href="https://github.com/rashoelfa"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-medium underline decoration-line underline-offset-4 transition-colors hover:decoration-ink"
        >
          GitHub ↗
        </a>
      </div>
    </main>
  );
};

export default Home;
