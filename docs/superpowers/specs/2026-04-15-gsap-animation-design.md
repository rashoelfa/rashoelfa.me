# GSAP Animation Enhancement - Design Spec

## Overview

Enhance the personal website with GSAP-powered animations that feel subtle, fast, and professional. No new pages or features—purely motion enhancements.

## Design Principles

- **Duration**: 200-400ms per animation
- **Easing**: `power2.out` for entrances, `power2.inOut` for transitions
- **Stagger**: 50-100ms between elements
- **Respect**: `prefers-reduced-motion` media query - disable all animation if set
- **Mobile**: Skip scroll-triggered animations on mobile (performance)

## Animation Inventory

### 1. Page Transitions
- **Trigger**: Route change via Next.js router
- **Effect**: Fade out current page (200ms), fade in new page (200ms + 20px y-slide)
- **Implementation**: GSAP timeline in `_app.tsx`

### 2. Navbar Interactions
- **Link hover**: Underline grows from left (scaleX 0→1, 200ms)
- **Logo**: Subtle scale on hover (1→1.05, 150ms)
- **Mobile menu**: Slide down with staggered link reveals (50ms stagger)
- **Theme toggle**: Rotation + scale on click (300ms)

### 3. Hero Section (index.tsx)
- **On load**: "Hello" text fades in first (400ms)
- **Characters**: Remaining text reveals character-by-character (50ms stagger per word)
- **Location line**: Fades in after main text (delayed 800ms)
- **Button**: Scale 1→1.02 on hover, slight glow pulse

### 4. About Page
- **ProfileCard**: Slides up + fades in (400ms, 50px y-offset)
- **AboutMe sections**: Staggered fade-in as they enter viewport
- **Experience/Education cards**: Subtle scale + shadow on scroll reveal

### 5. Projects Page
- **Project cards**: Staggered reveal on scroll (100ms stagger)
- **Card hover**: Lift effect (translateY -4px) + shadow increase (200ms)

## Technical Approach

### Dependencies
```
gsap: ^3.12.x
```

### File Structure
- `_app.tsx`: GSAP context + page transition wrapper
- `components/navbar.tsx`: Nav-specific animations
- `pages/index.tsx`: Hero entrance animations
- `pages/about.tsx`: Scroll-triggered reveals
- `pages/projects.tsx`: Project card animations

### Performance Considerations
- Use `will-change: transform` sparingly
- Kill ScrollTrigger instances on unmount
- Lazy load GSAP imports per page (dynamic imports)
- Avoid animating layout properties (width, height)

## Reduced Motion

All animations wrapped in motion preference check:
```typescript
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (prefersReducedMotion) return; // Skip all GSAP animations
```

## Testing Checklist

- [ ] Page transitions feel seamless (no flash)
- [ ] All animations under 400ms
- [ ] No jank on scroll
- [ ] Reduced motion: no movement, only instant states
- [ ] Mobile performance: no scroll-triggered animations