"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { Feature } from "@/data/products";

function FeatureSection({ feature, index }: { feature: Feature; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const isReversed = index % 2 === 1;

  return (
    <div
      ref={ref}
      className={`flex flex-col ${
        isReversed ? "md:flex-row-reverse" : "md:flex-row"
      } items-center gap-8 md:gap-16 py-16 md:py-24 relative`}
    >
      {/* Text */}
      <div className="flex-1 space-y-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <span className="text-xs uppercase tracking-widest text-[#c9a96e] font-medium">
            Feature {String(index + 1).padStart(2, "0")}
          </span>
          <h3 className="text-2xl md:text-3xl font-bold text-[#1a1a1a] mt-2">
            {feature.title}
          </h3>
        </motion.div>
        <motion.p
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
          className="text-[#1a1a1a]/60 leading-relaxed"
        >
          {feature.description}
        </motion.p>
        {/* SVG annotation */}
        <motion.svg
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.4 }}
          width="120"
          height="40"
          viewBox="0 0 120 40"
          className="text-[#c9a96e]/40"
        >
          <motion.path
            d="M5 35 Q30 5 60 20 Q90 35 115 10"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.4 }}
          />
          <motion.circle
            cx="115"
            cy="10"
            r="3"
            fill="currentColor"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1.2 }}
          />
        </motion.svg>
      </div>

      {/* Image with parallax */}
      <motion.div
        className="flex-1 relative w-full aspect-[4/3] rounded-2xl overflow-hidden"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <motion.div className="absolute inset-0" style={{ y: imageY }}>
          <Image
            src={feature.image}
            alt={feature.title}
            fill
            className="object-cover scale-110"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </motion.div>
      </motion.div>
    </div>
  );
}

export default function FeatureHighlights({ features }: { features: Feature[] }) {
  return (
    <section className="max-w-6xl mx-auto px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-8"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-[#1a1a1a]">
          Why AURA Pro X1
        </h2>
        <p className="text-[#1a1a1a]/50 mt-3">
          Every detail, meticulously crafted
        </p>
      </motion.div>
      {features.map((feature, i) => (
        <FeatureSection key={i} feature={feature} index={i} />
      ))}
    </section>
  );
}
