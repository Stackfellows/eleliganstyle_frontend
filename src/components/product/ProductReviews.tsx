'use client';

import React, { useState } from 'react';
import { Product } from '@/lib/types';
import { Star, CheckCircle, ThumbsUp } from 'lucide-react';

export default function ProductReviews({ product }: { product: Product }) {
  const reviews = product.reviews || [];
  const [helpfulCount, setHelpfulCount] = useState<Record<string, number>>({});

  const handleHelpful = (id: string) => {
    setHelpfulCount((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
  };

  return (
    <div className="space-y-12">
      {/* Header & Rating Breakdown */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 pb-8 border-b border-[#ECE7E6]">
        <div className="space-y-2">
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#6E6767] font-sans font-medium">
            CLIENT VERIFICATIONS
          </span>
          <h3 className="font-serif text-3xl font-light text-[#171515]">
            Verified Ratings & Reviews
          </h3>
          <p className="text-xs text-[#6E6767] font-sans font-light">
            Genuine reviews collected from verified ElegantStyle patrons.
          </p>
        </div>

        {/* Rating Card */}
        <div className="flex items-center gap-8 bg-[#FCFAF9] p-6 border border-[#ECE7E6]">
          <div className="text-center">
            <span className="font-serif text-4xl text-[#171515] block font-light">
              {product.rating}
            </span>
            <div className="flex justify-center text-[#171515] gap-0.5 my-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-[#171515]" />
              ))}
            </div>
            <span className="text-[10px] text-[#6E6767] uppercase font-sans">
              Based on {product.reviewCount} Reviews
            </span>
          </div>

          <div className="w-px h-16 bg-[#ECE7E6]" />

          <div className="space-y-1 text-xs font-sans text-[#6E6767]">
            <div className="flex items-center gap-2">
              <span>5 Stars</span>
              <div className="w-24 h-1.5 bg-[#ECE7E6] rounded-full overflow-hidden">
                <div className="h-full bg-[#171515] w-[90%]" />
              </div>
              <span>90%</span>
            </div>
            <div className="flex items-center gap-2">
              <span>4 Stars</span>
              <div className="w-24 h-1.5 bg-[#ECE7E6] rounded-full overflow-hidden">
                <div className="h-full bg-[#171515] w-[10%]" />
              </div>
              <span>10%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-6 divide-y divide-[#ECE7E6]">
        {reviews.length > 0 ? (
          reviews.map((rev) => (
            <div key={rev.id} className="pt-6 first:pt-0 space-y-3 font-sans">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex text-[#171515]">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-[#171515]" />
                    ))}
                  </div>
                  <span className="font-serif text-base font-light text-[#171515]">
                    {rev.title}
                  </span>
                </div>
                <span className="text-[11px] text-[#6E6767] font-light">{rev.date}</span>
              </div>

              <p className="text-xs sm:text-sm text-[#292526] font-light leading-relaxed">
                "{rev.comment}"
              </p>

              <div className="flex items-center justify-between pt-2 text-[11px] text-[#6E6767]">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-[#171515]">{rev.userName}</span>
                  <span>•</span>
                  <span>{rev.userLocation}</span>
                  {rev.verifiedPurchase && (
                    <span className="inline-flex items-center gap-1 text-[#C58C97]">
                      <CheckCircle className="w-3 h-3" />
                      Verified Purchase
                    </span>
                  )}
                </div>

                <button
                  onClick={() => handleHelpful(rev.id)}
                  className="flex items-center gap-1 hover:text-[#171515] transition-colors"
                >
                  <ThumbsUp className="w-3 h-3" />
                  <span>Helpful ({helpfulCount[rev.id] || 0})</span>
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="py-8 text-center text-xs text-[#6E6767] font-sans font-light">
            No customer reviews yet. Be the first to share your experience with {product.name}.
          </div>
        )}
      </div>
    </div>
  );
}
