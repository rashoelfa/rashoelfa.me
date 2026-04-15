# GSAP Animation Enhancement Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add subtle, fast GSAP animations to the personal website covering page transitions, scroll effects, hero text, and hover interactions.

**Architecture:** GSAP core + ScrollTrigger plugin installed as dependency. Animation context created per-page with proper cleanup. Page transitions via Next.js router events.

**Tech Stack:** GSAP 3.12.x, Next.js, TypeScript, Tailwind CSS

---

## Task 1: Install GSAP

**Files:**

- Modify: `package.json`

- [ ] **Step 1: Install gsap dependency**

```bash
npm install gsap
```

- [ ] **Step 2: Verify installation**

```bash
grep gsap package.json
```

Expected: `"gsap": "^3.12.x"` in dependencies

- [ ] **Step 3: Commit**

```bash
git add package.json pnpm-lock.yaml
git commit -m "feat: add gsap dependency"
```

---

## Task 2: Create GSAP Animation Hook

**Files:**

- Create: `hooks/use-gsap.tsx`

- [ ] **Step 1: Create the use-gsap hook**

```typescript
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function useGsap() {
  const contextRef = useRef<gsap.Context | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
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
  options: gsap.TweenVars = {},
) {
  const ref = useRef<HTMLElement>(null);
  const { gsap: gsapInstance, ready } = useGsap();

  useEffect(() => {
    if (!ready || !ref.current) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReducedMotion) return;

    gsapInstance.fromTo(
      ref.current,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.4,
        ease: "power2.out",
        ...options,
      },
    );

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger === ref.current) {
          trigger.kill();
        }
      });
    };
  }, [ready, gsapInstance]);

  return ref;
}
```

- [ ] **Step 2: Commit**

```bash
git add hooks/use-gsap.tsx
git commit -m "feat: create use-gsap hook with scroll animation helper"
```

---

## Task 3: Implement Page Transitions in \_app.tsx

**Files:**

- Modify: `pages/_app.tsx`

- [ ] **Step 1: Read current \_app.tsx**

```bash
cat pages/_app.tsx
```

- [ ] **Step 2: Update \_app.tsx with page transitions**

```typescript
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { useEffect, useRef } from 'react';
import '../styles/globals.css';
import gsap from 'gsap';

export default function App({ Component, pageProps }: AppProps) {
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
    <>
      <div
        ref={transitionRef}
        className="fixed inset-0 bg-slate-800 z-50 pointer-events-none opacity-0"
        style={{ display: 'none' }}
      />
      <Component {...pageProps} />
    </>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add pages/_app.tsx
git commit -m "feat: add page transition overlay in _app"
```

---

## Task 4: Add Navbar Hover Animations

**Files:**

- Modify: `components/navbar.tsx`

- [ ] **Step 1: Read current navbar**

```bash
cat components/navbar.tsx
```

- [ ] **Step 2: Add GSAP hover animations to navbar**

Replace the navbar with this enhanced version:

```typescript
import React, { useEffect, useRef } from "react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import gsap from "gsap";

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const [isNavOpen, setIsNavOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const links = navRef.current?.querySelectorAll('.nav-link');
    if (!links) return;

    links.forEach(link => {
      const el = link as HTMLElement;
      el.style.position = 'relative';

      el.addEventListener('mouseenter', () => {
        gsap.to(el, {
          scale: 1.05,
          duration: 0.15,
          ease: 'power2.out'
        });
      });

      el.addEventListener('mouseleave', () => {
        gsap.to(el, {
          scale: 1,
          duration: 0.15,
          ease: 'power2.out'
        });
      });
    });
  }, []);

  const toggleNav = () => {
    setIsNavOpen((current) => !current);
  };

  return (
    <>
      <div
        ref={navRef}
        className="sticky z-10 top-0 bg-[#ebebeb] dark:bg-slate-800 backdrop-filter backdrop-blur-lg bg-opacity-30 border-b border-black dark:border-slate-600 firefox:bg-opacity-90"
      >
        <div className="max-w-5xl hidden md:block mx-auto px-4">
          <div className="flex items-center justify-around h-16">
            <Link href="/">
              <span className="text-2xl text-black dark:text-slate-200 font-semibold cursor-pointer nav-link">
                rashoelfa
              </span>
            </Link>
            <div className="flex space-x-4 text-lg text-black dark:text-slate-200">
              <Link href="/">
                <span className="nav-link cursor-pointer">Home</span>
              </Link>
              <Link href="/about">
                <span className="nav-link cursor-pointer">About</span>
              </Link>
              <Link href="/projects">
                <span className="nav-link cursor-pointer">Projects</span>
              </Link>
            </div>
            <button
              aria-label="Toggle Dark Mode"
              type="button"
              className="p-3 h-12 w-12 order-2 md:order-3"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              {theme === "light" ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
        <div className="max-w-5xl block md:hidden mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link href="/">
              <span className="text-2xl text-black dark:text-slate-200 font-semibold cursor-pointer nav-link">
                <Image
                  src="/favicon.ico"
                  width={25}
                  height={25}
                  alt="logo"
                />
              </span>
            </Link>
            <button
              aria-label="Toggle Dark Mode"
              type="button"
              className="p-3 h-12 w-12"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              {theme === "light" ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                  />
                </svg>
              )}
            </button>
            <button onClick={toggleNav}>
              {isNavOpen ? (
                <svg
                  fill="#000000"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  viewBox="0 0 30 30"
                >
                  <path
                    fill="currentColor"
                    d="M 7 4 C 6.744125 4 6.4879687 4.0974687 6.2929688 4.2929688 L 4.2929688 6.2929688 C 3.9019687 6.6839688 3.9019687 7.3170313 4.2929688 7.7070312 L 11.585938 15 L 4.2929688 22.292969 C 3.9019687 22.683969 3.9019687 23.317031 4.2929688 23.707031 L 6.2929688 25.707031 C 6.6839688 26.098031 7.3170313 26.098031 7.7070312 25.707031 L 15 18.414062 L 22.292969 25.707031 C 22.682969 26.098031 23.317031 26.098031 23.707031 25.707031 L 25.707031 23.707031 C 26.098031 23.316031 26.098031 22.682969 25.707031 22.292969 L 18.414062 15 L 25.707031 7.7070312 C 26.098031 7.3170312 26.098031 6.6829688 25.707031 6.2929688 L 23.707031 4.2929688 C 23.316031 3.9019687 22.682969 3.9019687 22.292969 4.2929688 L 15 11.585938 L 7.7070312 4.2929688 C 7.5115312 4.0974687 7.255875 4 7 4 z"
                  />
                </svg>
              ) : (
                <svg
                  className="w-6 h-6"
                  viewBox="0 0 15 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M1.5 3C1.22386 3 1 3.22386 1 3.5C1 3.77614 1.22386 4 1.5 4H13.5C13.7761 4 14 3.77614 14 3.5C14 3.22386 13.7761 3 13.5 3H1.5ZM1 7.5C1 7.22386 1.22386 7 1.5 7H13.5C13.7761 7 14 7.22386 14 7.5C14 7.77614 13.7761 8 13.5 8H1.5C1.22386 8 1 7.77614 1 7.5ZM1 11.5C1 11.2239 1.22386 11 1.5 11H13.5C13.7761 11 14 11.2239 14 11.5C14 11.7761 13.7761 12 13.5 12H1.5C1.22386 12 1 11.7761 1 11.5Z"
                    fill="currentColor"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
        {isNavOpen ? (
          <div className="flex flex-col absolute w-full text-black dark:text-slate-200 md:hidden gap-4 text-center py-4 text-2xl border-y border-black dark:border-slate-600 bg-[#ebebeb] dark:bg-slate-800">
            <Link href="/">
              <span className="nav-link">Home</span>
            </Link>
            <Link href="/about">
              <span className="nav-link">About</span>
            </Link>
            <Link href="/projects">
              <span className="nav-link">Projects</span>
            </Link>
          </div>
        ) : (
          <span className="hidden"></span>
        )}
      </div>
    </>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add components/navbar.tsx
git commit -m "feat: add GSAP hover animations to navbar links"
```

---

## Task 5: Add Hero Text Animation on index.tsx

**Files:**

- Modify: `pages/index.tsx`

- [ ] **Step 1: Update index.tsx with hero animations**

```typescript
import type { NextPage } from "next";
import axios from "axios";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import styles from "../styles/index.module.css";
import Navbar from "../components/navbar";
import gsap from "gsap";

const dataEndpoints = {
  location: "https://ipapi.co/json/",
  flag: "https://flagcdn.com/40x30/",
};

const Home: NextPage = () => {
  const [location, setLocation] = useState({
    ip: "",
    IPv4: "",
    country_code: "unknown",
    country_name: "flag",
  });
  const [isLoading, setIsLoading] = useState(true);
  const heroRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
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
      <Head>
        <title>Rasyidana Sulthan Fathansyah</title>
        <meta
          name="title"
          content="Rasyidana Sulthan Fathansyah | Personal Website"
        />
        <meta
          name="description"
          content="Personal website that explain about Rasyidana Sulthan Fathansyah which the creator of this website :)"
        />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://rashoelfa.my.id/" />
        <meta
          property="og:title"
          content="Rasyidana Sulthan Fathansyah | Personal Website"
        />
        <meta
          property="og:description"
          content="Personal website that explain about the creator of this website :)"
        />
        <meta
          property="og:image"
          content="https://rashoelfa.my.id/assets/image/meta-header.jpeg"
        />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://rashoelfa.my.id/" />
        <meta
          property="twitter:title"
          content="Rasyidana Sulthan Fathansyah | Personal Website"
        />
        <meta
          property="twitter:description"
          content="Personal website that explain about the creator of this website :)"
        />
        <meta
          property="twitter:image"
          content="https://rashoelfa.my.id/assets/image/meta-header.jpeg"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />
      <main className="h-4/5" ref={heroRef}>
        <div className="h-full max-w-5xl flex mx-auto items-center justify-center">
          <div className="relative text-xl md:text-2xl lg:text-4xl font-bold" ref={textRef}>
            <h1 className="hero-text dark:text-slate-200">
              Hello &#128075;,
              <br />
              {isLoading ? (
                <span className="hero-location">Loading your location...</span>
              ) : location.country_code !== "unknown" ? (
                <span className="hero-location">
                  You are {location.ip} from{" "}
                  <Image
                    height={30}
                    width={40}
                    src={
                      dataEndpoints.flag +
                      location.country_code?.toLowerCase() +
                      ".png"
                    }
                    alt={location.country_name}
                    className="inline-block align-middle mx-1"
                  />
                </span>
              ) : (
                <span className="hero-location">Location unavailable</span>
              )}
            </h1>
            <h1 className="hero-text dark:text-slate-200">
              I&apos;m <span className={styles.text}>Rasyid</span> The{" "}
              <span className={styles.secondText}>Developer</span> &#128187;&#8205;&#9794;
            </h1>
            <Link href="/about">
              <button className={`${styles.glow} glow-btn hero-text`}>
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
```

- [ ] **Step 2: Commit**

```bash
git add pages/index.tsx
git commit -m "feat: add hero text entrance animations with GSAP"
```

---

## Task 6: Add Scroll Animations to About Page

**Files:**

- Modify: `pages/about.tsx`

- [ ] **Step 1: Update about.tsx with scroll-triggered animations**

```typescript
import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef } from "react";
import Navbar from "../components/navbar";
import ProfileCard from "../components/about/profilecard";
import AboutMe from "../components/about/aboutme";
import Experience from "../components/about/experience";
import Education from "../components/about/education";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const CardTw =
  "h-fit backdrop-filter backdrop-blur-lg bg-opacity-30 relative max-w-4xl mx-auto mt-4 bg-[#ebebed] dark:bg-slate-800 md:rounded-lg border border-black dark:border-slate-600 dark:text-slate-200 border-solid";

const About: NextPage = () => {
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const isMobile = window.innerWidth < 768;
    if (isMobile) return;

    const ctx = gsap.context(() => {
      gsap.fromTo('.profile-card',
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.profile-card',
            start: 'top 80%',
          }
        }
      );

      gsap.fromTo('.about-section',
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.about-section',
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
        <title>Rasyidana Sulthan Fathansyah | About</title>
        <meta
          name="title"
          content="Rasyidana Sulthan Fathansyah | Personal Website"
        />
        <meta
          name="description"
          content="Personal website that explain about the creator of this website :)"
        />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://rashoelfa.my.id/" />
        <meta
          property="og:title"
          content="Rasyidana Sulthan Fathansyah | Personal Website"
        />
        <meta
          property="og:description"
          content="Personal website that explain about the creator of this website :)"
        />
        <meta
          property="og:image"
          content="https://rashoelfa.my.id/assets/image/meta-header.jpeg"
        />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://rashoelfa.my.id/" />
        <meta
          property="twitter:title"
          content="Rasyidana Sulthan Fathansyah | Personal Website"
        />
        <meta
          property="twitter:description"
          content="Personal website that explain about the creator of this website :)"
        />
        <meta
          property="twitter:image"
          content="https://rashoelfa.my.id/assets/image/meta-header.jpeg"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <main>
        <div>
          <div className={CardTw}>
            <ProfileCard />
          </div>
        </div>
      </main>
    </div>
  );
};

export default About;
```

- [ ] **Step 2: Commit**

```bash
git add pages/about.tsx
git commit -m "feat: add scroll-triggered animations to about page"
```

---

## Task 7: Add Scroll Animations to Projects Page

**Files:**

- Modify: `pages/projects.tsx`

- [ ] **Step 1: Read projects.tsx**

```bash
cat pages/projects.tsx
```

- [ ] **Step 2: Update projects.tsx with scroll animations**

```typescript
import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef } from "react";
import Navbar from "../components/navbar";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: 1,
    title: "Project 1",
    description: "Description for project 1",
    link: "https://github.com/rashoelfa/project1",
  },
  {
    id: 2,
    title: "Project 2",
    description: "Description for project 2",
    link: "https://github.com/rashoelfa/project2",
  },
  {
    id: 3,
    title: "Project 3",
    description: "Description for project 3",
    link: "https://github.com/rashoelfa/project3",
  },
];

const Projects: NextPage = () => {
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const isMobile = window.innerWidth < 768;
    if (isMobile) return;

    const ctx = gsap.context(() => {
      gsap.fromTo('.project-card',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.project-card',
            start: 'top 85%',
          }
        }
      );
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="h-screen bg-[#ebebeb] dark:bg-slate-800" ref={pageRef}>
      <Head>
        <title>Rasyidana Sulthan Fathansyah | Projects</title>
        <meta
          name="title"
          content="Rasyidana Sulthan Fathansyah | Personal Website"
        />
        <meta
          name="description"
          content="Personal website that explain about the creator of this website :)"
        />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://rashoelfa.my.id/" />
        <meta
          property="og:title"
          content="Rasyidana Sulthan Fathansyah | Personal Website"
        />
        <meta
          property="og:description"
          content="Personal website that explain about the creator of this website :)"
        />
        <meta
          property="og:image"
          content="https://rashoelfa.my.id/assets/image/meta-header.jpeg"
        />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://rashoelfa.my.id/" />
        <meta
          property="twitter:title"
          content="Rasyidana Sulthan Fathansyah | Personal Website"
        />
        <meta
          property="twitter:description"
          content="Personal website that explain about the creator of this website :)"
        />
        <meta
          property="twitter:image"
          content="https://rashoelfa.my.id/assets/image/meta-header.jpeg"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <main className="max-w-5xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold dark:text-slate-200 mb-8">My Projects</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <a
              key={project.id}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="project-card block p-6 bg-white dark:bg-slate-700 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-200 hover:-translate-y-1"
            >
              <h2 className="text-xl font-semibold dark:text-slate-200 mb-2">
                {project.title}
              </h2>
              <p className="text-gray-600 dark:text-slate-400">
                {project.description}
              </p>
            </a>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Projects;
```

- [ ] **Step 3: Commit**

```bash
git add pages/projects.tsx
git commit -m "feat: add scroll animations to projects page"
```

---

## Task 8: Verify Everything Works

**Files:**

- Run: `npm run build`

- [ ] **Step 1: Run build to check for errors**

```bash
npm run build
```

Expected: Build completes without errors

- [ ] **Step 2: Run lint check**

```bash
npm run lint
```

Expected: No lint errors

- [ ] **Step 3: Commit remaining changes**

```bash
git add -A && git commit -m "feat: complete GSAP animation system"
```

---

## Plan Summary

| Task | Description                           |
| ---- | ------------------------------------- |
| 1    | Install gsap dependency               |
| 2    | Create use-gsap hook                  |
| 3    | Add page transitions to \_app.tsx     |
| 4    | Add navbar hover animations           |
| 5    | Add hero text animation on index.tsx  |
| 6    | Add scroll animations to about.tsx    |
| 7    | Add scroll animations to projects.tsx |
| 8    | Verify build and lint                 |

---

**Plan complete and saved to `docs/superpowers/plans/2026-04-15-gsap-animation-plan.md`**

**Two execution options:**

**1. Subagent-Driven (recommended)** - I dispatch a fresh subagent per task, review between tasks, fast iteration

**2. Inline Execution** - Execute tasks in this session using executing-plans, batch execution with checkpoints

Which approach?
