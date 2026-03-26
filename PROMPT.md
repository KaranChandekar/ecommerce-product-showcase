# E-Commerce Product Showcase - Claude Code Prompt

Build a premium, animations-rich product landing page featuring 3D product viewers with interactive controls, smooth color variant morphing, physics-based add-to-cart animations, swipeable image galleries with spring physics, and scroll-triggered feature highlights. Target a luxury e-commerce experience with cinematic animations throughout.

## Core Requirements

### Tech Stack Setup
- Initialize Next.js 15 with TypeScript
- Install: React Three Fiber, Drei, Framer Motion, GSAP with ScrollTrigger, Tailwind CSS
- Configure Three.js Canvas with proper lighting and environment

### Hero Section with 3D Product Viewer
- Create full-screen hero with 3D product model (GLTF/GLB format)
- Load free 3D models from Sketchfab (sneakers, headphones, or watches)
- Implement OrbitControls:
  - User can rotate (drag), zoom (wheel), pan
  - Auto-rotate at 2 RPM when idle
  - Min/max zoom constraints (10-25 distance)
  - No panning allowed (only rotate/zoom)
- Apply studio lighting environment preset from Drei
- Show "Click to rotate" hint that fades after first interaction
- Lazy load 3D model only when hero scrolls into view

### Color and Variant Morphing
- Display 4-6 color swatches below hero (12-16px circles)
- Clicking a swatch triggers material transition animation:
  - Smoothly morph material color using GSAP (duration: 0.8s)
  - Update metalness and roughness properties
  - Brief brightness pulse on the 3D model during transition
- Update accompanying information (price, stock) if variant changes
- Active swatch: gold border with soft glow
- Hover effect: subtle scale up (1.05x)

### Add-to-Cart Fly Animation
- Get coordinates of product hero and cart icon in header
- On "Add to Cart" click, trigger GSAP animation:
  - Duplicate product thumbnail appears at hero position
  - Animate thumbnail along parabolic arc to cart icon (GSAP motionPath)
  - Arc curve: `curviness: 1.25` for natural parabola
  - Scale down during flight: 1.0x → 0.3x
  - Duration: 0.8 seconds with `power2.inOut` easing
- On arrival at cart:
  - Particle burst effect around cart icon
  - Cart icon pulse animation (scale 1.2x, yoyo repeat 1)
  - Increment cart badge count with animated number roll
- Show toast notification: "Added to cart"

### Image Gallery with Swipe and Spring Physics
- Full-width image carousel below hero (responsive height)
- Implement Framer Motion drag controls:
  - Drag left/right to scroll gallery
  - Spring physics on release (stiffness: 300, damping: 30)
  - Visual momentum on fast swipes
  - Snap to nearest slide automatically
- Support keyboard navigation:
  - Left/right arrow keys to advance slides
  - Home/End to jump to first/last slide
- Thumbnail strip below main image:
  - Show 3-5 visible thumbnails (scroll horizontally on mobile)
  - Click thumbnail to jump to slide
  - Current slide highlighted (gold border or scale up)
- Fade transition between slides when clicking thumbnails
- Lazy load images using Next.js Image component
- Preload next slide in background

### Animated Price Counter
- Display primary price prominently ($99.99 format)
- When variant changes:
  - Trigger opacity pulse animation: 1 → 0.5 → 1 (0.4s duration)
  - Slight vertical bounce: -5px → 0px → 5px → 0px
  - Brief color flash to gold (#c9a96e)
- Support size/variant options with individual pricing
- Show savings/discount if applicable (percentage or dollar amount)

### Size Selector with Animated Pills
- Display 4-6 size options as horizontal pill buttons
- Unselected pills: light gray background
- Selecting a pill:
  - Background animates to gold color
  - Text color inverts for contrast
  - Smooth spring animation (stiffness: 300)
- Hover effect on unselected pills: scale up 1.05x
- Show size guide link below options
- Size guide modal: displays measurements, fit description

### Feature Highlights Section
- 3-5 feature sections, each highlighting a product benefit
- Layout: alternating left-text/right-image and right-text/left-image
- Each section triggers on scroll:
  - Text elements fade in from bottom (opacity 0 → 1, y: 50 → 0)
  - Image parallax effect (moves slower than scroll, ratio: 0.5x)
  - SVG annotations (arrows, circles) draw in with stroke-dasharray animation
- Staggered reveal timing: heading → body paragraph → image

### Quick View Modal
- "Quick View" link on product cards in listing page
- Modal animates in with scale + opacity transition:
  - Initial: scale 0.9, opacity 0
  - Target: scale 1.0, opacity 1 (spring physics)
- Background blurs and darkens (Framer Motion backdrop blur)
- Compact product view inside modal:
  - Small 3D model thumbnail
  - Key product details (price, colors, key features)
  - Quick add-to-cart button
- Close button (X) in top-right corner
- Escape key closes modal
- Clicking outside modal closes it (overlay click)
- Prevent body scroll when modal open

### Reviews Section
- Display 5-8 customer reviews as cards
- Staggered reveal animation:
  - Cards fade in and slide up from bottom
  - Delay: i * 0.1s for staggered effect
  - Trigger: `whileInView` once per element
- Star rating animation:
  - Stars scale in one-by-one
  - Delay between stars: 0.05s each
- Review text fades in after stars
- Show reviewer name, date, verified badge
- Star count (e.g., "4.5 stars from 200 reviews") at top

### Sticky Add-to-Cart Bar
- Floating bar slides up from bottom when hero exits viewport
- Becomes visible as user scrolls past hero (with spring animation)
- Contains:
  - Product name (text)
  - Current price (large, bold)
  - "Add to Cart" button (prominent, gold background)
- Disappears when hero comes back into view
- Fixed position, stays visible during scroll
- High contrast for visibility (dark background, light text)

### Page Transitions
- Use Framer Motion's `layoutId` for shared layout animation
- When navigating from product listing to detail page:
  - Product image "grows" from list position to hero position
  - Smooth cross-fade between pages
  - Feels like the image expanded into the detail view

## Color Palette and Design

- **Background**: Warm off-white (#faf8f5)
- **Text**: Charcoal (#1a1a1a)
- **Accent**: Gold (#c9a96e)
- **Secondary**: Soft gray (#e8e8e8) for borders/dividers
- **Typography**:
  - Headlines: Satoshi (bold) from Fontshare
  - Body: Cabinet Grotesk from Fontshare
  - Fallback: system sans-serif

## Default Content

If not provided, use free resources:
- Load sample 3D model from Sketchfab (sneakers or headphones recommended)
- Use Unsplash product photography for gallery and features
- Create 3-4 realistic color variants (black, white, gold, etc.)
- Provide sample product details, prices, and customer reviews
- Use Fontshare for Satoshi and Cabinet Grotesk fonts

## Performance Optimization

- Lazy load 3D model on scroll trigger
- Code split 3D Canvas component with dynamic import
- Optimize images: use Next.js Image with WebP format
- Preload next page on hover of product cards
- Reduce particle effects or remove on mobile
- Target Lighthouse score: 85+ for performance

## Visual Polish

- Smooth spring-based animations throughout (not linear)
- Consistent easing: power2.inOut for most animations
- Loading states for images and 3D models
- Empty states for gallery, reviews, etc.
- Smooth color transitions (0.8s duration)
- Hover/active states on all interactive elements

## Deliverables

- Fully functional e-commerce product showcase on localhost:3000
- Responsive design tested on mobile (375px), tablet (768px), desktop (1440px)
- Clean TypeScript codebase with modular components
- All free/open assets (Unsplash, Sketchfab, Fontshare)
- Comprehensive code comments
- README with setup, customization, and 3D model swap instructions
