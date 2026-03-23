# Elite Animation Studio

> Cinematic web experiences with GSAP - Brutalist-Modern UI/UX Design

A stunning showcase of high-performance web animations built with GSAP 3.14+, featuring a brutalist-modern aesthetic with psychology-driven interaction design.

![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)
![GSAP](https://img.shields.io/badge/GSAP-3.14-green?style=flat-square&logo=greensock)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38B2AC?style=flat-square&logo=tailwind-css)

## 🎬 Live Demo

**GitHub Repository**: [marktantongco/elite-animation-studio](https://github.com/marktantongco/elite-animation-studio)

---

## ✨ Features

### Animation Components

| Component | Description |
|-----------|-------------|
| **MagneticButton** | Buttons that follow cursor with elastic physics, scale animations on click |
| **ScrollReveal** | Staggered reveal animations with 6 animation types (fadeUp, fadeDown, fadeLeft, fadeRight, scale, rotate) |
| **TextScramble** | Characters cycle through random symbols before settling |
| **SplitText** | Character-by-character text reveals with rotation and blur effects |
| **ParallaxImage** | Scroll-driven depth effects with configurable speed |
| **PinnedSection** | Full-screen takeovers with scrubbing and snap |
| **CustomCursor** | Smooth cursor following with magnetic hover effects |
| **ScrollProgress** | Reading progress bar linked to scroll position |

### Design System

- **Brutalist-Modern Aesthetic**: Exposed structure, thick borders (4-8px), hard shadows
- **High-Contrast Palette**: Electric Yellow (#FFEA00), Deep Black, Alert Red
- **Bold Typography**: Display (96px) to Caption (14px) scale
- **8px Base Spacing System**: Consistent rhythm from xs (8px) to 2xl (144px)
- **Dark Mode Support**: Inverted color scheme with yellow accents

### Performance

- **60fps Guaranteed**: GPU-accelerated properties only (transform, opacity)
- **ScrollTrigger Optimization**: Strategic use of `once` option
- **Context-Based Cleanup**: Prevents memory leaks
- **Reduced Motion Support**: Respects `prefers-reduced-motion` media query

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- Bun (recommended) or npm

### Installation

```bash
# Clone the repository
git clone https://github.com/marktantongco/elite-animation-studio.git

# Navigate to project
cd elite-animation-studio

# Install dependencies
bun install

# Start development server
bun run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📁 Project Structure

```
src/
├── app/
│   ├── globals.css          # Design tokens & brutalist utilities
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Main page with all sections
├── components/
│   ├── animations/          # GSAP animation components
│   │   ├── CustomCursor.tsx
│   │   ├── MagneticButton.tsx
│   │   ├── ParallaxSection.tsx
│   │   ├── ScrollProgress.tsx
│   │   ├── ScrollReveal.tsx
│   │   └── TextScramble.tsx
│   └── ui/                  # shadcn/ui components
├── hooks/
│   ├── useGSAP.ts           # Custom GSAP hook with cleanup
│   ├── use-mobile.ts        # Mobile detection
│   └── use-toast.ts         # Toast notifications
└── lib/
    ├── db.ts                # Prisma client
    └── utils.ts             # Utility functions
```

---

## 🎨 Design System

### Color Palette

```css
/* Brutalist-Modern Palette */
--brutal-yellow: #FFEA00;    /* Primary - CTAs, highlights, energy */
--brutal-black: #000000;     /* Secondary - Text, borders, structure */
--brutal-red: #FF3B30;       /* Accent - Errors, urgency, contrast */
--brutal-white: #F5F5F5;     /* Neutral - Backgrounds, breathing room */
--brutal-surface: #1A1A1A;   /* Surface - Cards, elevated surfaces */
```

### Typography Scale

| Token | Size | Line Height | Letter Spacing |
|-------|------|-------------|----------------|
| Display | 96px | 100% | -0.02em |
| H1 | 72px | 110% | -0.01em |
| H2 | 48px | 120% | 0 |
| H3 | 32px | 130% | 0 |
| Body | 18px | 160% | 0.01em |
| Caption | 14px | 150% | 0.02em |

### Spacing System

```css
--space-xs: 8px;    /* Micro gaps */
--space-sm: 16px;   /* Component internal */
--space-md: 24px;   /* Related elements */
--space-lg: 48px;   /* Section breaks */
--space-xl: 96px;   /* Major sections */
--space-2xl: 144px; /* Hero breathing room */
```

### Hard Shadows

```css
.shadow-brutal-sm { box-shadow: 4px 4px 0px #000; }
.shadow-brutal-md { box-shadow: 8px 8px 0px #000; }
.shadow-brutal-lg { box-shadow: 12px 12px 0px #000; }
```

---

## 🛠️ GSAP Animation API

### MagneticButton

```tsx
<MagneticButton
  strength={0.3}        // Magnetic pull strength (0-1)
  onClick={() => {}}    // Click handler
  className="..."       // Additional classes
>
  Click Me
</MagneticButton>
```

### ScrollReveal

```tsx
<ScrollReveal
  animation="fadeUp"    // fadeUp | fadeDown | fadeLeft | fadeRight | scale | rotate
  duration={0.8}        // Animation duration in seconds
  delay={0}             // Delay before animation starts
  stagger={0.1}         // Stagger between children
  start="top 85%"       // ScrollTrigger start position
  once={false}          // Only animate once?
>
  <div>Revealed content</div>
</ScrollReveal>
```

### TextScramble

```tsx
<TextScramble
  text="Hello World"
  trigger="load"        // load | hover | inView
  duration={0.8}        // Scramble duration
  chars="!@#$%^&*"      // Custom scramble characters
/>
```

### SplitText

```tsx
<SplitText
  text="ANIMATION"
  animation="fadeUp"    // fadeUp | fadeDown | rotateX | blur
  stagger={0.02}        // Delay between each character
  duration={0.8}        // Animation duration
/>
```

### ParallaxImage

```tsx
<ParallaxImage
  src="/image.jpg"
  alt="Description"
  speed={0.3}           // Parallax speed (0.1-0.5)
  scale={1.2}           // Initial scale
/>
```

---

## ⚡ Performance Guidelines

### GPU-Accelerated Properties Only

```javascript
// ✅ SAFE - GPU-composited
gsap.to(element, {
  x: 100,           // transform: translateX
  y: 50,            // transform: translateY
  rotation: 45,     // transform: rotate
  scale: 1.2,       // transform: scale
  opacity: 0.5,     // opacity
});

// ❌ AVOID - Causes layout thrashing
gsap.to(element, {
  width: 200,       // Triggers reflow
  height: 100,      // Triggers reflow
  top: 50,          // Triggers reflow
  left: 100,        // Triggers reflow
  margin: 20,       // Triggers reflow
});
```

### Easing Reference

| Easing | Use Case | Character |
|--------|----------|-----------|
| `power2.out` | Default for everything | Natural, professional |
| `power3.inOut` | Dramatic reveals | Bold acceleration |
| `back.out(1.7)` | Playful interactions | Bouncy, overshoot |
| `elastic.out(1, 0.3)` | Celebratory moments | Spring physics |
| `rough({strength: 0.5})` | Glitch effects | Raw, edgy |

---

## ♿ Accessibility

- ✅ All animations respect `prefers-reduced-motion`
- ✅ Focus states visible and animated
- ✅ No seizure-inducing flashes (max 3 flashes/second)
- ✅ Interactive elements have hover AND focus animations
- ✅ Screen reader compatible
- ✅ Keyboard navigation support

---

## 📦 Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) with App Router
- **Language**: [TypeScript 5](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
- **Animation**: [GSAP 3.14+](https://greensock.com/gsap/)
- **Database**: [Prisma](https://www.prisma.io/) with SQLite

---

## 🎯 Roadmap

- [ ] Add more animation presets
- [ ] Create Storybook documentation
- [ ] Add unit tests for animation components
- [ ] Implement page transitions
- [ ] Add Lottie/After Effects integration
- [ ] Create Figma design tokens export

---

## 📄 License

MIT License - feel free to use this project for your own animations!

---

## 🙏 Credits

Built with inspiration from:
- [GSAP](https://greensock.com/) - Professional-grade animation
- [Brutalist Web Design](https://brutalistwebsites.com/) - Raw aesthetic
- [shadcn/ui](https://ui.shadcn.com/) - Beautiful components

---

<p align="center">
  <strong>60 FPS GUARANTEED</strong>
</p>
