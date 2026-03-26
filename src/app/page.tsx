"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { CartProvider } from "@/context/CartContext";
import Header from "@/components/Header";
import ColorSwatches from "@/components/ColorSwatches";
import SizeSelector from "@/components/SizeSelector";
import AnimatedPrice from "@/components/AnimatedPrice";
import AddToCartButton from "@/components/AddToCartButton";
import ImageGallery from "@/components/ImageGallery";
import FeatureHighlights from "@/components/FeatureHighlights";
import ReviewsSection from "@/components/ReviewsSection";
import StickyCartBar from "@/components/StickyCartBar";
import { product } from "@/data/products";

// Code-split the 3D viewer
const ProductViewer3D = dynamic(() => import("@/components/ProductViewer3D"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[500px] md:h-[600px] flex items-center justify-center">
      <div className="w-10 h-10 border-2 border-[#e8e8e8] border-t-[#c9a96e] rounded-full animate-spin" />
    </div>
  ),
});

export default function Home() {
  const [colorIndex, setColorIndex] = useState(0);
  const [activeSize, setActiveSize] = useState("medium");

  const activeColor = product.colors[colorIndex];

  return (
    <CartProvider>
      <Header />

      <main className="pt-16">
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-6 py-8 md:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* 3D Viewer */}
            <ProductViewer3D
              color={activeColor.materialProps.color}
              metalness={activeColor.materialProps.metalness}
              roughness={activeColor.materialProps.roughness}
            />

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <span className="text-xs uppercase tracking-widest text-[#c9a96e] font-medium">
                  New Release
                </span>
                <h1 className="text-4xl md:text-5xl font-bold text-[#1a1a1a] mt-2 leading-tight">
                  {product.name}
                </h1>
                <p className="text-[#1a1a1a]/50 mt-2 text-lg">
                  {product.tagline}
                </p>
              </div>

              <AnimatedPrice
                price={activeColor.price}
                originalPrice={product.originalPrice}
              />

              <p className="text-[#1a1a1a]/60 leading-relaxed text-sm">
                {product.description}
              </p>

              <ColorSwatches
                colors={product.colors}
                activeIndex={colorIndex}
                onSelect={setColorIndex}
              />

              <SizeSelector
                sizes={product.sizes}
                activeSize={activeSize}
                onSelect={setActiveSize}
              />

              <div className="flex items-center gap-3 text-xs text-[#1a1a1a]/40">
                <span className="flex items-center gap-1">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                  Free shipping
                </span>
                <span>·</span>
                <span>{activeColor.stock} in stock</span>
                <span>·</span>
                <span>2-year warranty</span>
              </div>

              <AddToCartButton
                productId={product.id}
                color={activeColor.name}
                size={activeSize}
                price={activeColor.price}
                image={product.images[0]}
              />
            </div>
          </div>
        </section>

        {/* Divider */}
        <div className="max-w-6xl mx-auto px-6">
          <div className="h-px bg-[#e8e8e8]" />
        </div>

        {/* Image Gallery */}
        <ImageGallery images={product.images} />

        {/* Divider */}
        <div className="max-w-6xl mx-auto px-6">
          <div className="h-px bg-[#e8e8e8]" />
        </div>

        {/* Feature Highlights */}
        <FeatureHighlights features={product.features} />

        {/* Divider */}
        <div className="max-w-6xl mx-auto px-6">
          <div className="h-px bg-[#e8e8e8]" />
        </div>

        {/* Reviews */}
        <ReviewsSection
          reviews={product.reviews}
          averageRating={product.averageRating}
          totalReviews={product.totalReviews}
        />

        {/* Footer */}
        <footer className="border-t border-[#e8e8e8] mt-12">
          <div className="max-w-7xl mx-auto px-6 py-12">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <span className="font-bold text-xl tracking-tight text-[#1a1a1a]">
                AURA<span className="text-[#c9a96e]">.</span>
              </span>
              <p className="text-xs text-[#1a1a1a]/30">
                &copy; 2026 AURA Audio. All rights reserved. Demo product showcase.
              </p>
            </div>
          </div>
        </footer>
      </main>

      {/* Sticky Bar */}
      <StickyCartBar
        productName={product.name}
        price={activeColor.price}
        productId={product.id}
        color={activeColor.name}
        size={activeSize}
      />
    </CartProvider>
  );
}
