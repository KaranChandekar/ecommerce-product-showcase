"use client";

import { motion, useAnimationControls } from "framer-motion";
import { useEffect } from "react";

interface AnimatedPriceProps {
  price: number;
  originalPrice: number;
}

export default function AnimatedPrice({ price, originalPrice }: AnimatedPriceProps) {
  const controls = useAnimationControls();

  useEffect(() => {
    controls.start({
      opacity: [1, 0.5, 1],
      y: [0, -5, 5, 0],
      color: ["#1a1a1a", "#c9a96e", "#1a1a1a"],
      transition: { duration: 0.4, ease: "easeInOut" },
    });
  }, [price, controls]);

  const discount = Math.round(((originalPrice - price) / originalPrice) * 100);

  return (
    <div className="flex items-baseline gap-3">
      <motion.span
        animate={controls}
        className="text-3xl md:text-4xl font-bold text-[#1a1a1a]"
      >
        ${price.toFixed(2)}
      </motion.span>
      {originalPrice > price && (
        <>
          <span className="text-lg text-[#1a1a1a]/30 line-through">
            ${originalPrice.toFixed(2)}
          </span>
          <span className="text-sm font-medium text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
            {discount}% off
          </span>
        </>
      )}
    </div>
  );
}
