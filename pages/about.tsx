import type { NextPage } from "next";
import { useEffect, useRef } from "react";
import Navbar from "../components/navbar";
import ProfileCard from "../components/about/profilecard";
import AboutMe from "../components/about/aboutme";
import Experience from "../components/about/experience";
import Education from "../components/about/education";
import SEO from "../components/SEO";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const CardTw =
  "h-fit backdrop-filter backdrop-blur-lg bg-opacity-30 relative max-w-4xl mx-auto mt-4 bg-[#ebebeb] dark:bg-slate-800 md:rounded-lg border border-black dark:border-slate-600 dark:text-slate-200 border-solid";

const About: NextPage = () => {
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const isMobile = window.innerWidth < 768;
    if (isMobile) return;

    if (!pageRef.current) return;

    const profileCard = pageRef.current.querySelector('.profile-card');
    const aboutSections = pageRef.current.querySelectorAll('.about-section');

    if (!profileCard && aboutSections.length === 0) return;

    const ctx = gsap.context(() => {
      if (profileCard) {
        gsap.fromTo(profileCard,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.4,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: profileCard,
              start: 'top 80%',
            }
          }
        );
      }

      if (aboutSections.length > 0) {
        gsap.fromTo(aboutSections,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.4,
            stagger: 0.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: aboutSections[0],
              start: 'top 80%',
            }
          }
        );
      }
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen bg-[#ebebeb] dark:bg-slate-800" ref={pageRef}>
      <SEO
        title="About Me | Rasyidana Sulthan Fathanssonh"
        description="Learn more about Rasyidana Sulthan Fathanssonh, a Backend Developer with experience in Go, Node.js, and cloud technologies. View my education, experience, and download my CV."
        path="/about"
      />
      <Navbar />
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className={CardTw}>
          <div className="profile-card">
            <ProfileCard />
          </div>
          <div className="about-section">
            <AboutMe />
          </div>
          <div className="about-section">
            <Experience />
          </div>
          <div className="about-section">
            <Education />
          </div>
        </div>
      </main>
    </div>
  );
};

export default About;