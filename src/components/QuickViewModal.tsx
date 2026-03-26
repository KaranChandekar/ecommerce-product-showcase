"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import Image from "next/image";
import { Product } from "@/data/products";

interface QuickViewModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
}

export default function QuickViewModal({ product, isOpen, onClose }: QuickViewModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="relative bg-white rounded-2xl p-6 md:p-8 max-w-lg w-full shadow-2xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-[#1a1a1a]/40 hover:text-[#1a1a1a] transition-colors z-10 cursor-pointer"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>

            <div className="relative w-full h-48 rounded-xl overflow-hidden mb-5 bg-[#f0ede8]">
              <Image
                src={product.images[0]}
                alt={product.name}
                fill
                className="object-cover"
                sizes="500px"
              />
            </div>

            <h3 className="text-xl font-bold text-[#1a1a1a]">{product.name}</h3>
            <p className="text-[#1a1a1a]/50 text-sm mt-1">{product.tagline}</p>

            <div className="flex items-baseline gap-3 mt-4">
              <span className="text-2xl font-bold text-[#1a1a1a]">
                ${product.basePrice.toFixed(2)}
              </span>
              <span className="text-sm text-[#1a1a1a]/30 line-through">
                ${product.originalPrice.toFixed(2)}
              </span>
            </div>

            <div className="flex gap-2 mt-4">
              {product.colors.slice(0, 4).map((c) => (
                <div
                  key={c.name}
                  className="w-5 h-5 rounded-full border border-[#e8e8e8]"
                  style={{ backgroundColor: c.hex }}
                  title={c.name}
                />
              ))}
            </div>

            <ul className="mt-4 space-y-1.5">
              {product.features.slice(0, 3).map((f) => (
                <li key={f.title} className="flex items-center gap-2 text-sm text-[#1a1a1a]/60">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="#c9a96e">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                  </svg>
                  {f.title}
                </li>
              ))}
            </ul>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-[#c9a96e] text-white font-semibold py-3.5 px-8 rounded-full text-sm uppercase tracking-wider mt-6 hover:bg-[#b8954f] transition-colors cursor-pointer"
            >
              Add to Cart
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
