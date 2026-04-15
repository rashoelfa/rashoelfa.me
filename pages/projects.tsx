import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef } from "react";
import Navbar from "../components/navbar";
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
      <Head>
      <title>Rasyidana Sulthan Fathanssonh | Projects</title>
        <meta
          name="title"
          content="Rasyidana Sulthan Fathanssonh | Personal Website"
        />
        <meta
          name="description"
          content="Personal website that explain about the creator of this website :)"
        />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://rashoelfa.me/" />
        <meta
          property="og:title"
          content="Rasyidana Sulthan Fathanssonh | Personal Website"
        />
        <meta
          property="og:description"
          content="Personal website that explain about the creator of this website :)"
        />
        <meta property="og:image" content="https://rashoelfa.me/assets/image/meta-header.jpeg" />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://rashoelfa.me/" />
        <meta
          property="twitter:title"
          content="Rasyidana Sulthan Fathanssonh | Personal Website"
        />
        <meta
          property="twitter:description"
          content="Personal website that explain about the creator of this website :)"
        />
        <meta property="twitter:image" content="https://rashoelfa.me/assets/image/meta-header.jpeg" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
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