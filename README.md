# Personal Website

Personal website of Rasyidana Sulthan Fathansyah - Backend Developer specializing in Go and Node.js.

## Tech Stack

- **Framework**: Next.js 16 with TypeScript
- **Styling**: Tailwind CSS with monochrome theme tokens (`--paper`, `--ink`, `--muted`, `--line`) in `styles/globals.css`
- **Font**: Geist via `next/font`
- **Animation**: GSAP (masked line reveals, scroll reveals, magnetic CTA) + WebGL fluid cursor
- **Theme**: next-themes for dark/light mode

## Features

- Dark/Light theme toggle
- Masked hero reveal and scroll-triggered fade-ups (`useReveal`, no pre-hydration flash)
- Sliding active-link indicator and animated mobile menu
- Rainbow fluid cursor trail; pauses when idle, off for touch and reduced motion
- All motion respects `prefers-reduced-motion`

## Getting Started

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Scripts

```bash
pnpm dev      # Start development server
pnpm build    # Build for production
pnpm start    # Start production server
pnpm lint     # Run ESLint
```

## Project Structure

```
├── components/     # React components (Navbar, SEO, etc.)
├── hooks/          # Custom React hooks (use-gsap, etc.)
├── pages/          # Next.js pages (index, about, projects)
├── styles/         # Global styles and theme tokens
├── public/         # Static assets
└── docs/           # Design specs and plans
```

## License

MIT