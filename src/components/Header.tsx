"use client";

import { useCart } from "@/context/CartContext";
import { motion, AnimatePresence } from "framer-motion";
import { useRef } from "react";

export default function Header() {
  const { count, showToast } = useCart();
  const cartRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#faf8f5]/80 backdrop-blur-md border-b border-[#e8e8e8]">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="/" className="font-bold text-xl tracking-tight text-[#1a1a1a]">
            AURA<span className="text-[#c9a96e]">.</span>
          </a>

          <nav className="hidden md:flex items-center gap-8 text-sm text-[#1a1a1a]/70">
            <a href="#" className="hover:text-[#1a1a1a] transition-colors">
              Products
            </a>
            <a href="#" className="hover:text-[#1a1a1a] transition-colors">
              About
            </a>
            <a href="#" className="hover:text-[#1a1a1a] transition-colors">
              Support
            </a>
          </nav>

          <div className="flex items-center gap-4">
            <div ref={cartRef} id="cart-icon" className="relative cursor-pointer">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-[#1a1a1a]"
              >
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 01-8 0" />
              </svg>
              <AnimatePresence>
                {count > 0 && (
                  <motion.span
                    key={count}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -top-2 -right-2 bg-[#c9a96e] text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center"
                  >
                    {count}
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </header>

      {/* Toast notification */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-24 left-1/2 -translate-x-1/2 z-[60] bg-[#1a1a1a] text-white px-6 py-3 rounded-full text-sm font-medium shadow-lg"
          >
            Added to cart
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
