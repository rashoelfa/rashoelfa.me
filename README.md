# Personal Website

Personal website of Rasyidana Sulthan Fathansyah - Backend Developer specializing in Go and Node.js.

## Tech Stack

- **Framework**: Next.js 16 with TypeScript
- **Styling**: Tailwind CSS + custom CSS modules
- **Animation**: GSAP for page transitions and scroll effects
- **Theme**: next-themes for dark/light mode
- **IP Geolocation**: ipinfo.io

## Features

- Dark/Light theme toggle
- Animated page transitions
- Scroll-triggered animations
- Interactive navbar hover effects
- Visitor IP geolocation with country flag

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
├── styles/         # CSS modules and global styles
├── public/         # Static assets
└── docs/           # Design specs and plans
```

## License

MIT