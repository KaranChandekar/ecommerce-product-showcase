"use client";

import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState } from "react";
import { useCart } from "@/context/CartContext";

interface StickyCartBarProps {
  productName: string;
  price: number;
  productId: string;
  color: string;
  size: string;
}

export default function StickyCartBar({
  productName,
  price,
  productId,
  color,
  size,
}: StickyCartBarProps) {
  const [visible, setVisible] = useState(false);
  const { scrollY } = useScroll();
  const { addItem } = useCart();

  useMotionValueEvent(scrollY, "change", (latest) => {
    // Show when scrolled past the hero (approx 600px)
    setVisible(latest > 600);
  });

  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: visible ? 0 : 100 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="fixed bottom-0 left-0 right-0 z-50 bg-[#1a1a1a] text-white border-t border-white/10"
    >
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between gap-4">
        <div className="flex items-center gap-4 min-w-0">
          <span className="font-medium text-sm truncate">{productName}</span>
          <span className="text-lg font-bold text-[#c9a96e]">
            ${price.toFixed(2)}
          </span>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => addItem({ productId, color, size, price })}
          className="bg-[#c9a96e] text-white font-semibold py-2.5 px-6 rounded-full text-sm uppercase tracking-wider flex-shrink-0 hover:bg-[#b8954f] transition-colors cursor-pointer"
        >
          Add to Cart
        </motion.button>
      </div>
    </motion.div>
  );
}
