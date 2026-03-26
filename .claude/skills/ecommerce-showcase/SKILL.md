---
name: ecommerce-showcase
description: Build a premium animated e-commerce product showcase with 3D product viewers, color variant morphing, add-to-cart fly animations, swipe galleries with spring physics, and scroll-triggered feature highlights. Use this skill when building product landing pages, luxury e-commerce experiences, or animated shopping interfaces. Trigger when the user mentions product showcase, e-commerce animations, 3D product view, product landing page, add-to-cart animation, or luxury shopping experience.
---

# E-Commerce Product Showcase Skill

Build a premium, animations-first product landing page featuring 3D product models, interactive color morphing, physics-based interactions, and scroll-triggered revelations for luxury e-commerce experiences.

## Technology Stack

- **Framework**: Next.js 15 with App Router
- **3D Graphics**: React Three Fiber for 3D product models, Drei for utilities (OrbitControls, useGLTF)
- **Animation**: Framer Motion for UI/layout animations, GSAP with ScrollTrigger for scroll-driven effects
- **Physics**: Framer Motion's drag and spring physics for gesture-based interactions
- **Styling**: Tailwind CSS with custom CSS for premium typography and spacing
- **Language**: TypeScript for component safety
- **Image Optimization**: Next.js Image component for responsive product photography

## Design Direction

**Color Palette:**
- Background: Warm off-white (#faf8f5) for minimal, luxurious feel
- Text: Charcoal (#1a1a1a) for high contrast and legibility
- Accent: Gold (#c9a96e) for interactive elements and highlights
- Secondary: Soft grays (#e8e8e8) for borders and dividers

**Typography:**
- Headlines: Satoshi (bold, geometric) from Fontshare
- Body: Cabinet Grotesk (clean, modern) from Fontshare
- Fallbacks: system sans-serif stack

## Core Components

### Hero Section with 3D Product

Create an immersive hero featuring a 3D product model with interactive controls:

```typescript
// Canvas setup with Three.js
<Canvas camera={{ position: [0, 0, 15], fov: 50 }}>
  <OrbitControls
    enableZoom={true}
    autoRotate={true}
    autoRotateSpeed={2}
    enablePan={false}
    minDistance={10}
    maxDistance={25}
  />
  <ProductModel url="/models/product.glb" />
  <environment preset="studio" />
</Canvas>
```

**Features:**
- Load 3D model (GLTF/GLB) using `useGLTF` hook from Drei
- `OrbitControls` for user rotation, zoom, and pan
- Auto-rotate when idle (2 RPM) to showcase product
- Studio lighting environment preset with soft shadows
- Touch-friendly drag controls on mobile
- "Click to rotate" hint that fades out after first interaction
- Resolution-aware LOD (Level of Detail) switching for performance

### Color and Variant Morphing

Implement smooth material morphing when users select different colors:

```typescript
const [selectedColor, setSelectedColor] = useState('black');

// In component state
const colorMap = {
  black: { color: '#000000', metalness: 0.6, roughness: 0.3 },
  gold: { color: '#c9a96e', metalness: 0.8, roughness: 0.2 },
  silver: { color: '#c0c0c0', metalness: 0.7, roughness: 0.25 },
};

// Animate material transition
useEffect(() => {
  gsap.to(materialRef.current, {
    color: colorMap[selectedColor].color,
    metalness: colorMap[selectedColor].metalness,
    roughness: colorMap[selectedColor].roughness,
    duration: 0.8,
    ease: 'power2.inOut',
  });
}, [selectedColor]);
```

**Color swatch UI:**
- Circular color swatches below hero (12-16px radius)
- Active swatch has gold border and subtle glow
- Clicking a swatch triggers:
  1. Material cross-fade (GSAP animation over 0.8s)
  2. 3D model brightness pulse on transition
  3. Price update if variant has different price
  4. Image gallery refresh if showing variant-specific photos

**Variants supported:**
- Color (primary variant selector)
- Size (hidden from 3D view, shown in sidebar)
- Material (affects metalness, roughness, reflectivity)

### Add-to-Cart Fly Animation

Trigger a dynamic animation when user adds product to cart:

```typescript
const handleAddToCart = () => {
  // Get coordinates of product thumbnail and cart icon
  const productRect = productImageRef.current.getBoundingClientRect();
  const cartRect = cartIconRef.current.getBoundingClientRect();

  // Create motion path animation using GSAP
  gsap.to(flyingElementRef.current, {
    x: cartRect.x - productRect.x,
    y: cartRect.y - productRect.y,
    duration: 0.8,
    ease: 'power2.inOut',
    motionPath: {
      curviness: 1.25, // Arc curve
      autoRotate: false,
      path: [
        { x: 0, y: 0 },
        { x: (cartRect.x - productRect.x) * 0.5, y: -100 }, // Peak arc
        { x: cartRect.x - productRect.x, y: cartRect.y - productRect.y }
      ]
    },
    onComplete: () => {
      // Cart icon pulse effect
      gsap.to(cartIconRef.current, {
        scale: 1.2,
        duration: 0.3,
        yoyo: true,
        repeat: 1,
        ease: 'back.out'
      });
    }
  });
};
```

**Animation details:**
- Thumbnail of product (20-30px square) flies from hero to cart icon
- Parabolic arc using GSAP motionPath with `curviness: 1.25`
- Scale down during flight (start 1.0x, end 0.3x)
- Particle burst effect at cart icon on arrival
- Toast notification confirms addition ("Added to cart")
- Optional: Shake cart icon and increment badge count

### Image Gallery with Swipe Gestures

Implement a responsive, touch-friendly image carousel:

```typescript
const [gallery, setGallery] = useState(images);
const [[currentIndex, direction], setCurrentIndex] = useState([0, 0]);

const slideVariants = {
  enter: (dir) => ({ x: dir > 0 ? 1000 : -1000, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir) => ({ x: dir < 0 ? 1000 : -1000, opacity: 0 }),
};

<motion.div
  key={currentIndex}
  custom={direction}
  variants={slideVariants}
  initial="enter"
  animate="center"
  exit="exit"
  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
  drag="x"
  dragConstraints={{ left: 0, right: 0 }}
  dragElastic={0.2}
  onDragEnd={(e, { offset, velocity }) => {
    const swipe = swipePower(offset.x, velocity.x);
    if (swipe < -swipeConfidenceThreshold) {
      paginate(1);
    } else if (swipe > swipeConfidenceThreshold) {
      paginate(-1);
    }
  }}
>
  <Image src={gallery[currentIndex]} alt="Product" />
</motion.div>
```

**Features:**
- Swipeable with Framer Motion `drag` prop
- Spring physics on endpoint: smooth deceleration with bounce
- Snap to nearest slide on drag release
- Touch velocity detection for kinetic scrolling
- Thumbnail strip below main image (3-5 visible thumbnails)
- Keyboard navigation: arrow keys to cycle
- Fade transition between slides when clicking thumbnails
- Lazy loading images (Next.js Image `loading="lazy"`)

### Animated Price and Variant Counter

Display and animate numeric values on interaction:

```typescript
const [price, setPrice] = useState(basePrice);

// Animated counter component
<motion.div>
  <AnimatedValue value={price} />
</motion.div>

// Custom hook for number animation
function AnimatedValue({ value }) {
  const nodeRef = useRef(null);
  const controls = useAnimationControls();

  useEffect(() => {
    controls.start({
      opacity: [1, 0.5, 1],
      y: [-5, 0, 5, 0],
      transition: { duration: 0.4, ease: 'easeOut' }
    });
  }, [value]);

  return <motion.span animate={controls}>${value.toFixed(2)}</motion.span>;
}
```

**When price changes:**
- Animate opacity pulse (1 → 0.5 → 1)
- Slight vertical bounce animation
- Color flash to gold for 200ms
- Duration: 0.4 seconds

### Size Selector with Animated Pill

Create an interactive size selector with animated highlight pill:

```typescript
const [selectedSize, setSelectedSize] = useState(null);
const sizeOptions = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

<motion.div className="flex gap-2">
  {sizeOptions.map((size) => (
    <motion.button
      key={size}
      onClick={() => setSelectedSize(size)}
      className={selectedSize === size ? 'bg-gold text-black' : 'bg-gray-200'}
      initial={false}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      {size}
    </motion.button>
  ))}
</motion.div>
```

**Interaction:**
- Hovering over unselected size: subtle scale up (1.05x)
- Selecting size: pill background animates to gold color
- Selected pill has white/dark text for contrast
- Smooth spring animation between states (stiffness: 300)
- Show size guide link below options (opens modal with measurements)

### Feature Highlights with Scroll Triggers

Reveal product features as user scrolls down the page:

```typescript
// Use GSAP ScrollTrigger for scroll-driven animations
useEffect(() => {
  const features = document.querySelectorAll('[data-feature]');

  features.forEach((feature, i) => {
    gsap.from(feature, {
      opacity: 0,
      y: 50,
      duration: 0.8,
      scrollTrigger: {
        trigger: feature,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      }
    });
  });

  return () => {
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
  };
}, []);
```

**Feature section structure:**
- Text description on left, parallax image on right
- Image moves slower than scroll (parallax ratio: 0.5x)
- SVG annotations on images (arrows, circles) draw in with stroke-dasharray animation
- Staggered reveal: heading, then body text, then image
- Multiple features (3-5): "Premium Materials", "Crafted Design", "Sustainable", etc.

### Quick View Modal

Implement a fast product preview modal without page navigation:

```typescript
<AnimatePresence>
  {isQuickViewOpen && (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={() => setIsQuickViewOpen(false)}
    >
      <motion.div
        className="bg-white rounded-lg p-8 max-w-2xl"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Compact product view */}
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>
```

**Features:**
- Overlay background with blur effect
- Modal scales in from center with spring physics
- Shows compact version of product (3D model thumbnail, key details)
- Quick add-to-cart button
- Close button (X) in top-right corner
- Escape key closes modal
- Prevents body scroll when open

### Reviews Section

Display customer reviews with reveal animations:

```typescript
const reviews = [
  { author: 'Sarah', rating: 5, text: 'Amazing quality...' },
  // more reviews
];

<motion.div>
  {reviews.map((review, i) => (
    <motion.div
      key={i}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: i * 0.1 }}
      viewport={{ once: true, amount: 0.5 }}
    >
      <div className="flex gap-1">
        {[...Array(review.rating)].map((_, j) => (
          <motion.span
            key={j}
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ delay: i * 0.1 + j * 0.05 }}
            viewport={{ once: true }}
          >
            ⭐
          </motion.span>
        ))}
      </div>
      <p className="text-sm text-gray-700 mt-2">{review.text}</p>
    </motion.div>
  ))}
</motion.div>
```

**Animations:**
- Cards stagger into view from bottom (delay per card)
- Star ratings animate in one by one
- Text appears with fade-in
- Reveal only once when scrolled into viewport (`whileInView`)

### Sticky Add-to-Cart Bar

Floating CTA that appears when hero scrolls out of view:

```typescript
const [showStickyCart, setShowStickyCart] = useState(false);

useEffect(() => {
  const handleScroll = () => {
    const heroHeight = document.querySelector('[data-hero]')?.offsetHeight || 0;
    setShowStickyCart(window.scrollY > heroHeight - 100);
  };

  window.addEventListener('scroll', handleScroll);
  return () => window.removeEventListener('scroll', handleScroll);
}, []);

<motion.div
  className="fixed bottom-0 left-0 right-0 bg-charcoal text-white p-4"
  initial={{ y: 100 }}
  animate={{ y: showStickyCart ? 0 : 100 }}
  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
>
  <div className="max-w-7xl mx-auto flex items-center justify-between">
    <div>
      <p className="text-sm text-gray-400">{productName}</p>
      <p className="text-2xl font-bold">${price}</p>
    </div>
    <button className="bg-gold text-black px-8 py-3 rounded">
      Add to Cart
    </button>
  </div>
</motion.div>
```

**Behavior:**
- Slides up from bottom with spring animation
- Disappears when hero comes back into view
- Shows product name, price, and large CTA button
- High contrast for visibility
- Doesn't obstruct main content (only appears on scroll)

### Page Transitions with Shared Layout

Animate between product listing and product detail views:

```typescript
// Product listing
<motion.div layoutId={`product-${id}`}>
  <Image src={product.image} />
</motion.div>

// Product detail page
<motion.div layoutId={`product-${id}`} className="hero-image">
  <Image src={product.image} />
</motion.div>
```

**Effect:**
- When navigating from listing to detail, image animates from list position to hero position
- Uses Framer Motion's `layoutId` for shared layout animation
- Smooth cross-fade between pages
- Feels like the image "grew" into the detail view

## Free Resources

**3D Models:**
- Sketchfab free models (https://sketchfab.com/search?q=product&type=models&license=published) - sneakers, headphones, watches
- Download as GLB/GLTF format for Three.js
- Search filters: "free", "downloadable", "animated"

**Product Photography:**
- Unsplash (https://unsplash.com/s/photos/product) - high-resolution product images
- Pexels (https://www.pexels.com/search/product/) - free product photography
- Pixabay (https://pixabay.com/images/search/product/) - royalty-free product shots

**Fonts:**
- Fontshare (https://www.fontshare.com/) - Satoshi (geometric headlines), Cabinet Grotesk (body)
- Both fonts have free licenses for commercial use
- Google Fonts alternatives: Inter (body), Space Mono (headlines)

**Icons & SVG:**
- Feather Icons (https://feathericons.com/) - simple, clean icons
- Heroicons (https://heroicons.com/) - Tailwind-compatible icons

## File Structure

```
05-ecommerce-product-showcase/
├── app/
│   ├── layout.tsx
│   ├── page.tsx (product listing)
│   └── product/
│       └── [id]/
│           └── page.tsx (product detail)
├── components/
│   ├── Hero.tsx (3D product + color picker)
│   ├── ProductModel.tsx (Three.js component)
│   ├── Gallery.tsx (swipeable image carousel)
│   ├── SizeSelector.tsx (animated pills)
│   ├── PriceDisplay.tsx (animated counter)
│   ├── FeatureHighlights.tsx (scroll-triggered sections)
│   ├── QuickViewModal.tsx (modal component)
│   ├── ReviewsSection.tsx (staggered cards)
│   ├── StickyCart.tsx (floating CTA)
│   ├── AddToCartAnimation.tsx (flight animation)
│   └── Navigation.tsx (header with cart icon)
├── hooks/
│   ├── useScrollVisibility.ts (scroll detection)
│   └── useAddToCart.ts (cart animation logic)
├── lib/
│   └── products.ts (product data)
└── public/
    ├── models/ (GLTF/GLB 3D models)
    └── images/ (product photography)
```

## Implementation Steps

1. **Set up Next.js project** with React Three Fiber, GSAP, Framer Motion
2. **Build product data structure** with variants, pricing, images, 3D models
3. **Create 3D product viewer** with OrbitControls and auto-rotation
4. **Implement color morphing** with GSAP material transitions
5. **Add image gallery** with Framer Motion drag and spring physics
6. **Build controls UI** (size selector, quantity, add-to-cart button)
7. **Create add-to-cart animation** using GSAP motionPath
8. **Implement price animation** for variant changes
9. **Add scroll-triggered features** section with GSAP ScrollTrigger
10. **Build reviews section** with staggered reveal animation
11. **Create sticky cart bar** that slides up on scroll
12. **Implement quick view modal** for product preview
13. **Add page transitions** with Framer Motion layoutId
14. **Optimize images and models** for performance
15. **Test responsiveness** on mobile, tablet, desktop

## Performance Considerations

- **3D Model Optimization**: Use compressed GLB files (target < 2MB)
- **Image Loading**: Use Next.js Image component with blur placeholder
- **Lazy Loading**: Load 3D model only when hero comes into view
- **Code Splitting**: Separate 3D component into dynamic import
- **GPU Acceleration**: Use `will-change: transform` for animated elements
- **Reduce Particles/Effects on Mobile**: Detect device and adjust visual complexity

## Accessibility

- Provide alt text for all product images
- Use semantic HTML for product information
- Ensure color picker has proper ARIA labels
- Make gallery keyboard-navigable (arrow keys)
- Provide `prefers-reduced-motion` support to disable animations
- Maintain minimum 4.5:1 contrast ratio for text and interactive elements
