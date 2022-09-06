import React from "react";
import { useTheme } from "next-themes";
import Link from "next/link";

export default function Navbar() {
  const { theme, setTheme } = useTheme();

  return (
    <>
      <div className="sticky z-10 top-0 bg-[#ebebeb] dark:bg-slate-800 backdrop-filter backdrop-blur-lg bg-opacity-30 border-b border-black dark:border-slate-600 firefox:bg-opacity-90">
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex items-center justify-around h-16">
            <span className="text-2xl text-black dark:text-slate-200 font-semibold">rashoelfa</span>
            <div className="flex space-x-4 text-lg text-black dark:text-slate-200">
              <Link href="/">Home</Link>
              <Link href="/about">About</Link>
              <Link href="/projects">Projects</Link>
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
      </div>
    </>
  );
}
