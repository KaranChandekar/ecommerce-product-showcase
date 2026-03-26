"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SizeOption } from "@/data/products";

interface SizeSelectorProps {
  sizes: SizeOption[];
  activeSize: string;
  onSelect: (value: string) => void;
}

function SizeGuideModal({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="relative bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#1a1a1a]/40 hover:text-[#1a1a1a] transition-colors"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
        <h3 className="text-lg font-bold mb-4 text-[#1a1a1a]">Size Guide</h3>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[#e8e8e8]">
              <th className="text-left py-2 text-[#1a1a1a]/50">Size</th>
              <th className="text-left py-2 text-[#1a1a1a]/50">Head Circumference</th>
              <th className="text-left py-2 text-[#1a1a1a]/50">Fit</th>
            </tr>
          </thead>
          <tbody className="text-[#1a1a1a]">
            <tr className="border-b border-[#e8e8e8]/50">
              <td className="py-2 font-medium">S</td>
              <td className="py-2">52-54 cm</td>
              <td className="py-2">Snug</td>
            </tr>
            <tr className="border-b border-[#e8e8e8]/50">
              <td className="py-2 font-medium">M</td>
              <td className="py-2">55-57 cm</td>
              <td className="py-2">Regular</td>
            </tr>
            <tr className="border-b border-[#e8e8e8]/50">
              <td className="py-2 font-medium">L</td>
              <td className="py-2">58-60 cm</td>
              <td className="py-2">Relaxed</td>
            </tr>
            <tr>
              <td className="py-2 font-medium">XL</td>
              <td className="py-2">61-63 cm</td>
              <td className="py-2">Loose</td>
            </tr>
          </tbody>
        </table>
        <p className="text-xs text-[#1a1a1a]/40 mt-4">
          Measure around the widest part of your head, just above the ears.
        </p>
      </motion.div>
    </motion.div>
  );
}

export default function SizeSelector({ sizes, activeSize, onSelect }: SizeSelectorProps) {
  const [showGuide, setShowGuide] = useState(false);

  return (
    <div>
      <div className="flex items-center gap-2 mb-3">
        <span className="text-xs text-[#1a1a1a]/50 uppercase tracking-wider">Size</span>
      </div>
      <div className="flex items-center gap-2">
        {sizes.map((size) => (
          <motion.button
            key={size.value}
            onClick={() => size.inStock && onSelect(size.value)}
            whileHover={size.inStock ? { scale: 1.05 } : {}}
            whileTap={size.inStock ? { scale: 0.95 } : {}}
            className={`relative px-5 py-2 rounded-full text-sm font-medium transition-colors ${
              !size.inStock
                ? "bg-[#e8e8e8]/50 text-[#1a1a1a]/25 cursor-not-allowed line-through"
                : activeSize === size.value
                ? "text-white"
                : "bg-[#e8e8e8] text-[#1a1a1a] hover:bg-[#ddd] cursor-pointer"
            }`}
          >
            {activeSize === size.value && (
              <motion.div
                layoutId="size-pill"
                className="absolute inset-0 bg-[#c9a96e] rounded-full"
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
              />
            )}
            <span className="relative z-10">{size.label}</span>
          </motion.button>
        ))}
      </div>
      <button
        onClick={() => setShowGuide(true)}
        className="text-xs text-[#c9a96e] mt-3 hover:underline cursor-pointer"
      >
        Size guide
      </button>
      <AnimatePresence>
        {showGuide && <SizeGuideModal onClose={() => setShowGuide(false)} />}
      </AnimatePresence>
    </div>
  );
}
