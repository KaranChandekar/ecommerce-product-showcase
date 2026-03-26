"use client";

import { useRef, useCallback } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { useCart } from "@/context/CartContext";

interface AddToCartButtonProps {
  productId: string;
  color: string;
  size: string;
  price: number;
  image: string;
}

export default function AddToCartButton({
  productId,
  color,
  size,
  price,
  image,
}: AddToCartButtonProps) {
  const { addItem } = useCart();
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleClick = useCallback(() => {
    addItem({ productId, color, size, price });

    // Fly animation
    const heroEl = document.getElementById("product-hero");
    const cartEl = document.getElementById("cart-icon");
    if (!heroEl || !cartEl) return;

    const heroRect = heroEl.getBoundingClientRect();
    const cartRect = cartEl.getBoundingClientRect();

    // Create flying thumbnail
    const thumb = document.createElement("img");
    thumb.src = image;
    thumb.style.cssText = `
      position: fixed;
      z-index: 9999;
      width: 80px;
      height: 80px;
      border-radius: 12px;
      object-fit: cover;
      pointer-events: none;
      left: ${heroRect.left + heroRect.width / 2 - 40}px;
      top: ${heroRect.top + heroRect.height / 2 - 40}px;
    `;
    document.body.appendChild(thumb);

    const dx = cartRect.left + cartRect.width / 2 - (heroRect.left + heroRect.width / 2);
    const dy = cartRect.top + cartRect.height / 2 - (heroRect.top + heroRect.height / 2);

    gsap.to(thumb, {
      x: dx,
      y: dy,
      scale: 0.3,
      opacity: 0.8,
      duration: 0.8,
      ease: "power2.inOut",
      onComplete: () => {
        thumb.remove();

        // Pulse cart icon
        const cartIcon = document.getElementById("cart-icon");
        if (cartIcon) {
          gsap.fromTo(
            cartIcon,
            { scale: 1 },
            { scale: 1.3, duration: 0.15, yoyo: true, repeat: 1, ease: "power2.out" }
          );
        }

        // Particle burst
        createParticles(cartRect);
      },
    });
  }, [addItem, productId, color, size, price, image]);

  return (
    <motion.button
      ref={buttonRef}
      onClick={handleClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="w-full bg-[#c9a96e] text-white font-semibold py-4 px-8 rounded-full text-sm uppercase tracking-wider hover:bg-[#b8954f] transition-colors cursor-pointer"
    >
      Add to Cart
    </motion.button>
  );
}

function createParticles(rect: DOMRect) {
  const colors = ["#c9a96e", "#e8d5a3", "#fff", "#b8954f"];
  for (let i = 0; i < 8; i++) {
    const particle = document.createElement("div");
    particle.style.cssText = `
      position: fixed;
      z-index: 9999;
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: ${colors[i % colors.length]};
      left: ${rect.left + rect.width / 2}px;
      top: ${rect.top + rect.height / 2}px;
      pointer-events: none;
    `;
    document.body.appendChild(particle);

    const angle = (i / 8) * Math.PI * 2;
    const distance = 30 + Math.random() * 20;

    gsap.to(particle, {
      x: Math.cos(angle) * distance,
      y: Math.sin(angle) * distance,
      opacity: 0,
      scale: 0,
      duration: 0.5,
      ease: "power2.out",
      onComplete: () => particle.remove(),
    });
  }
}
