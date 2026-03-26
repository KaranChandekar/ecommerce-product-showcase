"use client";

import { motion } from "framer-motion";
import { Review } from "@/data/products";

function StarRating({ rating, delay = 0 }: { rating: number; delay?: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <motion.svg
          key={star}
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: delay + star * 0.05, type: "spring", stiffness: 400 }}
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill={star <= rating ? "#c9a96e" : "#e8e8e8"}
          className="flex-shrink-0"
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </motion.svg>
      ))}
    </div>
  );
}

function ReviewCard({ review, index }: { review: Review; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.1, duration: 0.5, ease: "easeOut" }}
      className="bg-white rounded-2xl p-6 shadow-sm border border-[#e8e8e8]/60"
    >
      <StarRating rating={review.rating} delay={index * 0.1} />
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.1 + 0.3 }}
        className="text-[#1a1a1a]/70 text-sm mt-3 leading-relaxed"
      >
        &ldquo;{review.text}&rdquo;
      </motion.p>
      <div className="flex items-center gap-2 mt-4">
        <div className="w-8 h-8 rounded-full bg-[#e8e8e8] flex items-center justify-center text-xs font-bold text-[#1a1a1a]/50">
          {review.name.charAt(0)}
        </div>
        <div>
          <div className="flex items-center gap-1.5">
            <span className="text-sm font-medium text-[#1a1a1a]">{review.name}</span>
            {review.verified && (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="#c9a96e">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
              </svg>
            )}
          </div>
          <span className="text-xs text-[#1a1a1a]/40">{review.date}</span>
        </div>
      </div>
    </motion.div>
  );
}

interface ReviewsSectionProps {
  reviews: Review[];
  averageRating: number;
  totalReviews: number;
}

export default function ReviewsSection({
  reviews,
  averageRating,
  totalReviews,
}: ReviewsSectionProps) {
  return (
    <section className="max-w-6xl mx-auto px-6 py-16 md:py-24">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-[#1a1a1a]">
          What People Say
        </h2>
        <div className="flex items-center justify-center gap-3 mt-4">
          <StarRating rating={Math.round(averageRating)} />
          <span className="text-sm text-[#1a1a1a]/50">
            {averageRating} stars from {totalReviews} reviews
          </span>
        </div>
      </motion.div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reviews.map((review, i) => (
          <ReviewCard key={review.id} review={review} index={i} />
        ))}
      </div>
    </section>
  );
}
