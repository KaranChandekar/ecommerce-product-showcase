"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, useMotionValue, useSpring, animate } from "framer-motion";
import Image from "next/image";

interface ImageGalleryProps {
  images: string[];
}

export default function ImageGallery({ images }: ImageGalleryProps) {
  const [current, setCurrent] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 30 });
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setWidth(containerRef.current.offsetWidth);
      }
    };
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  const goTo = useCallback(
    (index: number) => {
      const clamped = Math.max(0, Math.min(index, images.length - 1));
      setCurrent(clamped);
      animate(x, -clamped * width, {
        type: "spring",
        stiffness: 300,
        damping: 30,
      });
    },
    [images.length, width, x]
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") goTo(current - 1);
      else if (e.key === "ArrowRight") goTo(current + 1);
      else if (e.key === "Home") goTo(0);
      else if (e.key === "End") goTo(images.length - 1);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [current, goTo, images.length]);

  const handleDragEnd = (_: unknown, info: { offset: { x: number }; velocity: { x: number } }) => {
    const threshold = width / 4;
    const velocity = info.velocity.x;
    let next = current;

    if (info.offset.x < -threshold || velocity < -500) {
      next = Math.min(current + 1, images.length - 1);
    } else if (info.offset.x > threshold || velocity > 500) {
      next = Math.max(current - 1, 0);
    }

    goTo(next);
  };

  return (
    <section className="w-full max-w-5xl mx-auto px-4 py-8">
      {/* Main gallery */}
      <div
        ref={containerRef}
        className="relative overflow-hidden rounded-2xl bg-[#f0ede8] cursor-grab active:cursor-grabbing"
        style={{ height: "clamp(300px, 50vw, 500px)" }}
      >
        <motion.div
          className="flex h-full"
          style={{ x: springX }}
          drag="x"
          dragConstraints={{
            left: -(images.length - 1) * width,
            right: 0,
          }}
          dragElastic={0.1}
          onDragEnd={handleDragEnd}
        >
          {images.map((src, i) => (
            <div
              key={i}
              className="flex-shrink-0 relative"
              style={{ width: width || "100%" }}
            >
              <Image
                src={src}
                alt={`Product image ${i + 1}`}
                fill
                className="object-cover pointer-events-none"
                sizes="(max-width: 768px) 100vw, 1024px"
                priority={i === 0}
                loading={i === 0 ? "eager" : "lazy"}
              />
            </div>
          ))}
        </motion.div>

        {/* Slide indicators */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                i === current ? "bg-[#c9a96e] w-6" : "bg-white/60"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Thumbnails */}
      <div className="flex gap-3 mt-4 overflow-x-auto pb-2 scrollbar-hide">
        {images.map((src, i) => (
          <motion.button
            key={i}
            onClick={() => goTo(i)}
            whileHover={{ scale: 1.05 }}
            className={`relative flex-shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden transition-all duration-200 ${
              i === current
                ? "ring-2 ring-[#c9a96e] ring-offset-2"
                : "opacity-60 hover:opacity-100"
            }`}
          >
            <Image
              src={src}
              alt={`Thumbnail ${i + 1}`}
              fill
              className="object-cover"
              sizes="80px"
            />
          </motion.button>
        ))}
      </div>
    </section>
  );
}
