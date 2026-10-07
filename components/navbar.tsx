import Link from "next/link";
import { useRouter } from "next/router";
import { useTheme } from "next-themes";
import { useLayoutEffect, useRef, useState } from "react";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
];

export default function Navbar() {
  const { pathname } = useRouter();
  const { resolvedTheme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const indicatorRef = useRef<HTMLSpanElement>(null);

  // Slide the underline to the hovered link, falling back to the current page.
  const target = hovered ?? pathname;
  useLayoutEffect(() => {
    const list = listRef.current;
    const indicator = indicatorRef.current;
    if (!list || !indicator) return;

    const place = () => {
      const el = list.querySelector<HTMLElement>(`[data-href="${target}"]`);
      indicator.style.opacity = el ? "1" : "0";
      if (!el) return;
      indicator.style.width = `${el.offsetWidth - 24}px`;
      indicator.style.transform = `translateX(${el.offsetLeft + 12}px)`;
    };
    place();

    // Re-measure when the list resizes (web font swap, breakpoint change).
    const ro = new ResizeObserver(place);
    ro.observe(list);
    return () => ro.disconnect();
  }, [target]);

  return (
    <header className="sticky top-0 z-20 border-b border-line bg-paper/70 backdrop-blur-lg">
      <nav aria-label="Main" className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link href="/" className="text-lg font-semibold tracking-tight">
          rashoelfa<span className="text-accent">.</span>
        </Link>

        <div className="flex items-center gap-1">
          <ul ref={listRef} onMouseLeave={() => setHovered(null)} className="relative hidden md:flex">
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  data-href={l.href}
                  aria-current={pathname === l.href ? "page" : undefined}
                  onMouseEnter={() => setHovered(l.href)}
                  className={`block px-3 py-2 text-sm transition-colors ${
                    pathname === l.href ? "text-ink" : "text-muted hover:text-ink"
                  }`}
                >
                  {l.label}
                </Link>
              </li>
            ))}
            <span
              ref={indicatorRef}
              aria-hidden
              className="pointer-events-none absolute bottom-1 left-0 h-px bg-accent transition-[transform,width,opacity] duration-500 ease-out-expo"
            />
          </ul>

          <button
            type="button"
            aria-label="Toggle dark mode"
            onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
            className="grid h-10 w-10 place-items-center rounded-full text-muted transition-colors hover:text-ink active:scale-95"
          >
            {/* Visibility via the `dark` class next-themes sets before paint, so no mount check needed. */}
            <svg className="h-5 w-5 dark:hidden" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
            </svg>
            <svg className="hidden h-5 w-5 dark:block" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
            </svg>
          </button>

          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((o) => !o)}
            className="relative h-10 w-10 md:hidden"
          >
            <span
              className={`absolute left-1/2 top-1/2 h-px w-5 -translate-x-1/2 bg-ink transition-transform duration-300 ease-out-expo ${
                open ? "rotate-45" : "-translate-y-[4px]"
              }`}
            />
            <span
              className={`absolute left-1/2 top-1/2 h-px w-5 -translate-x-1/2 bg-ink transition-transform duration-300 ease-out-expo ${
                open ? "-rotate-45" : "translate-y-[4px]"
              }`}
            />
          </button>
        </div>
      </nav>

      <div
        id="mobile-menu"
        inert={!open}
        className={`absolute inset-x-0 top-full border-b border-line bg-paper transition duration-300 ease-out-expo md:hidden ${
          open ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-2 opacity-0"
        }`}
      >
        <ul className="flex flex-col px-6 py-4">
          {links.map((l, i) => (
            <li
              key={l.href}
              style={{ transitionDelay: open ? `${80 + i * 50}ms` : "0ms" }}
              className={`transition duration-500 ease-out-expo ${open ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"}`}
            >
              <Link
                href={l.href}
                onClick={() => setOpen(false)}
                aria-current={pathname === l.href ? "page" : undefined}
                className={`block py-3 text-3xl font-medium tracking-tight ${pathname === l.href ? "text-accent" : ""}`}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
