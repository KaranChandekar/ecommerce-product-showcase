# E-Commerce Product Showcase

A premium, animation-rich product landing page featuring an interactive 3D product viewer, smooth color variant morphing, physics-based add-to-cart animations, swipeable image galleries with spring physics, and scroll-triggered feature highlights. Built for a luxury e-commerce experience with cinematic animations throughout.

![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)
![Three.js](https://img.shields.io/badge/Three.js-R3F-black?style=flat-square&logo=three.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38bdf8?style=flat-square&logo=tailwindcss)

## Features

- **3D Product Viewer** — Interactive headphone model built with React Three Fiber, featuring orbit controls (rotate/zoom), auto-rotate when idle, studio lighting environment, and lazy-loaded rendering with IntersectionObserver
- **Color Variant Morphing** — 5 color swatches with smooth real-time material transitions (color, metalness, roughness) using frame-based lerp interpolation, animated selection ring with Framer Motion layoutId
- **Add-to-Cart Fly Animation** — GSAP-powered thumbnail that flies from the product hero to the cart icon along a parabolic arc, with particle burst effects and cart icon pulse on arrival
- **Image Gallery with Spring Physics** — Full-width swipeable carousel with Framer Motion drag controls, spring physics on release (stiffness: 300, damping: 30), snap-to-slide, keyboard navigation, and thumbnail strip
- **Animated Price Counter** — Price display with opacity pulse, vertical bounce, and gold color flash animation on variant change
- **Size Selector Pills** — Animated pill buttons with Framer Motion layoutId for smooth background transitions, spring physics, and a size guide modal
- **Feature Highlights** — 4 alternating-layout sections with scroll-triggered text reveals, parallax image effects, and SVG annotation stroke draw-in animations
- **Reviews Section** — 6 customer review cards with staggered fade-in reveals, one-by-one star rating scale-in animations, and verified badge indicators
- **Sticky Add-to-Cart Bar** — Bottom bar that slides up with spring animation when the hero exits viewport, with product name, price, and quick add button
- **Quick View Modal** — Scale + opacity spring animation with backdrop blur, compact product view, escape/overlay close, and body scroll lock
- **Toast Notifications** — Animated "Added to cart" toast with slide-up enter/exit transitions
- **Cart State Management** — React Context-based cart with animated badge counter on the header cart icon

## Tech Stack

| Category | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| 3D Graphics | Three.js, React Three Fiber, Drei |
| Animation | GSAP, Framer Motion |
| Styling | Tailwind CSS v4 |
| Fonts | Satoshi, Cabinet Grotesk (Fontshare) |
| Images | Unsplash (remote) |

## Getting Started

### Prerequisites

- Node.js 20.9+
- npm 10+

### Installation

```bash
# Clone the repository
git clone https://github.com/KaranChandekar/ecommerce-product-showcase.git
cd ecommerce-product-showcase

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### Build

```bash
npm run build
npm start
```

## Project Structure

```
src/
├── app/
│   ├── globals.css          # Tailwind v4 theme with luxury color palette
│   ├── layout.tsx           # Root layout with Fontshare fonts
│   └── page.tsx             # Main product showcase page
├── components/
│   ├── Header.tsx           # Fixed header with animated cart badge & toast
│   ├── ProductViewer3D.tsx  # Interactive 3D headphone model (R3F)
│   ├── ColorSwatches.tsx    # Color variant selector with animated ring
│   ├── SizeSelector.tsx     # Size pills with size guide modal
│   ├── AnimatedPrice.tsx    # Price with bounce/flash animations
│   ├── AddToCartButton.tsx  # Fly-to-cart GSAP animation + particles
│   ├── ImageGallery.tsx     # Swipeable gallery with spring physics
│   ├── FeatureHighlights.tsx # Scroll-triggered features with parallax
│   ├── ReviewsSection.tsx   # Staggered review cards with star animations
│   ├── StickyCartBar.tsx    # Scroll-aware sticky bottom bar
│   └── QuickViewModal.tsx   # Animated modal with backdrop blur
├── context/
│   └── CartContext.tsx       # Cart state management
└── data/
    └── products.ts           # Product data and TypeScript interfaces
```

## Customization

- **Product data** — Edit `src/data/products.ts` to change the product name, description, colors, sizes, prices, features, and reviews
- **3D model** — Modify `src/components/ProductViewer3D.tsx` to change the procedural 3D model geometry or load a GLTF/GLB model
- **Colors** — Update the color palette in `src/app/globals.css` (background: `#faf8f5`, accent: `#c9a96e`, text: `#1a1a1a`)
- **Images** — Replace Unsplash URLs in `products.ts` with your own product photography
- **Fonts** — Change the Fontshare import in `src/app/layout.tsx`

## Design System

| Token | Value | Usage |
|---|---|---|
| Background | `#faf8f5` | Warm off-white page background |
| Foreground | `#1a1a1a` | Primary text (charcoal) |
| Accent | `#c9a96e` | Gold — buttons, active states, highlights |
| Secondary | `#e8e8e8` | Borders, dividers, inactive elements |
| Heading Font | Satoshi (Bold) | Headlines and titles |
| Body Font | Cabinet Grotesk | Body text and UI elements |

## Deployment

Optimized for [Vercel](https://vercel.com):

```bash
npm run build   # Verify build succeeds
vercel deploy   # Deploy to Vercel
```

## License

This project is open source and available under the [MIT License](LICENSE).
