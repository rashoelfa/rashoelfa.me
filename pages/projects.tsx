import type { NextPage } from "next";
import { useEffect, useRef } from "react";
import Navbar from "../components/navbar";
import SEO from "../components/SEO";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Projects: NextPage = () => {
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const isMobile = window.innerWidth < 768;
    if (isMobile) return;

    const ctx = gsap.context(() => {
      gsap.fromTo('.page-title',
        { opacity: 0, y: -20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          ease: 'power2.out'
        }
      );

      gsap.fromTo('.construction-text',
        { opacity: 0, scale: 0.9 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.4,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.construction-text',
            start: 'top 80%',
          }
        }
      );
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="h-screen bg-[#ebebeb] dark:bg-slate-800" ref={pageRef}>
      <SEO
        title="Projects | Rasyidana Sulthan Fathansyah"
        description="Explore my coding projects and portfolio. I'm a Backend Developer working with Go, Node.js, and various cloud technologies."
        path="/projects"
      />
      <Navbar />
      <main>
        <div className="text-center max-w-7xl mx-auto">
          <h1 className="page-title text-xl font-bold my-4">Under Construction :)</h1>
          <p className="construction-text text-lg text-gray-500 dark:text-slate-400">
            New projects coming soon!
          </p>
        </div>
      </main>
    </div>
  );
};

export default Projects;