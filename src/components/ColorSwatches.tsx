"use client";

import { motion } from "framer-motion";
import { ColorVariant } from "@/data/products";

interface ColorSwatchesProps {
  colors: ColorVariant[];
  activeIndex: number;
  onSelect: (index: number) => void;
}

export default function ColorSwatches({ colors, activeIndex, onSelect }: ColorSwatchesProps) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-xs text-[#1a1a1a]/50 uppercase tracking-wider mr-1">Color</span>
      {colors.map((color, i) => (
        <motion.button
          key={color.name}
          onClick={() => onSelect(i)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="relative w-7 h-7 rounded-full cursor-pointer"
          style={{ backgroundColor: color.hex }}
          title={color.name}
        >
          {activeIndex === i && (
            <motion.div
              layoutId="color-ring"
              className="absolute -inset-1 rounded-full border-2 border-[#c9a96e]"
              style={{ boxShadow: "0 0 8px rgba(201,169,110,0.4)" }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            />
          )}
        </motion.button>
      ))}
      <span className="text-xs text-[#1a1a1a]/60 ml-2">{colors[activeIndex].name}</span>
    </div>
  );
}
