import type { NextPage } from "next";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import styles from "../styles/index.module.css";
import Navbar from "../components/navbar";
import SEO from "../components/SEO";
import gsap from "gsap";

const dataEndpoints = {
  location: "https://ip-api.com/json",
  flag: "https://flagcdn.com/40x30/",
};

const Home: NextPage = () => {
  const [location, setLocation] = useState({
    query: "",
    ip: "",
    countryCode: "unknown",
    country: "flag",
  });
  const [isLoading, setIsLoading] = useState(true);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });

      tl.fromTo('.hero-text',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.4, stagger: 0.1 }
      );

      tl.fromTo('.hero-location',
        { opacity: 0 },
        { opacity: 1, duration: 0.4 },
        '+=0.4'
      );

      tl.fromTo('.hero-btn',
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.3 },
        '-=0.2'
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get(dataEndpoints.location);
        setLocation(res.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Failed to fetch location data:', error);
        setIsLoading(false);
      }
    };
    getData();
  }, []);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const btn = document.querySelector('.glow-btn');
    if (!btn) return;

    btn.addEventListener('mouseenter', () => {
      gsap.to(btn, { scale: 1.02, duration: 0.15 });
    });

    btn.addEventListener('mouseleave', () => {
      gsap.to(btn, { scale: 1, duration: 0.15 });
    });
  }, [isLoading]);

  return (
    <div className="h-screen bg-[#ebebeb] dark:bg-slate-800">
      <SEO
        title="Rasyidana Sulthan Fathansyah | Backend Developer"
        description="Personal website of Rasyidana Sulthan Fathansyah, a Backend Developer specializing in Go and Node.js. Learn more about my projects and experience."
        path="/"
      />

      <Navbar />
      <main className="h-4/5" ref={heroRef}>
        <div className="h-full max-w-5xl flex mx-auto items-center justify-center">
          <div className="relative text-xl md:text-2xl lg:text-4xl font-bold">
            <h1 className="hero-text dark:text-slate-200">
              Hello &#128075;,
              <br />
              {isLoading ? (
                <span className="hero-location">Loading your location...</span>
              ) : location.countryCode !== "unknown" ? (
                <span className="hero-location">
                  You are {location.query} and from{" "}
                  <Image
                    height={30}
                    width={40}
                    src={
                      dataEndpoints.flag +
                      location.countryCode?.toLowerCase() +
                      ".png"
                    }
                    alt={location.country}
                    className="inline-block align-middle mx-1"
                  />
                </span>
              ) : (
                <span className="hero-location">You are unknown 😕</span>
              )}
            </h1>
            <h1 className="hero-text dark:text-slate-200">
              I&apos;m <span className={styles.text}>Rasyid</span> The{" "}
              <span className={styles.secondText}>Developer</span> &#128187;
            </h1>
            <Link href="/about">
              <button className={`${styles.glow} glow-btn hero-btn`}>
                <p>About Me</p>
              </button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;