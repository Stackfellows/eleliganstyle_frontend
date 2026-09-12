'use client';

import React from 'react';
import Image from 'next/image';

export default function BrandStory() {
  return (
    <section className="py-28 bg-[#F8F5F4] border-b border-[#ECE7E6] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left / Editorial Composition */}
          <div className="lg:col-span-6 relative">
            <div className="relative aspect-4/5 w-full bg-[#FFFFFF] border border-[#ECE7E6] shadow-sm">
              <Image
                src="https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=1200&auto=format&fit=crop"
                alt="Botanical Formulations"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            {/* Overlay inset image */}
            <div className="hidden sm:block absolute -bottom-10 -right-10 w-3/5 aspect-square bg-[#FFFFFF] border border-[#ECE7E6] p-3 shadow-xl">
              <div className="relative w-full h-full">
                <Image
                  src="https://images.unsplash.com/photo-1624222247344-550fb60583dc?q=80&w=800&auto=format&fit=crop"
                  alt="Leather Craftsmanship"
                  fill
                  className="object-cover"
                  sizes="30vw"
                />
              </div>
            </div>
          </div>

          {/* Right / Text Narrative */}
          <div className="lg:col-span-6 space-y-6 lg:pl-8">
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#C58C97] font-sans font-medium">
              OUR PHILOSOPHY
            </span>

            <h2 className="font-serif text-3xl sm:text-5xl font-light text-[#171515] leading-[1.15]">
              Formulated with Intent. <br />
              <span className="italic font-normal">Crafted for Posterity.</span>
            </h2>

            <p className="text-xs sm:text-sm text-[#292526] font-sans font-light leading-relaxed">
              ElegantStyle was born at the intersection of French botanical cosmetic science and Florentine saddlery. We reject artificial synthetics and mass seasonal noise in favor of timeless formulations and vegetable-tanned leather goods that mature gracefully over time.
            </p>

            <div className="pt-6 border-t border-[#ECE7E6] grid grid-cols-2 gap-6 text-xs font-sans">
              <div className="space-y-1">
                <span className="block font-serif text-2xl font-light text-[#171515]">100%</span>
                <span className="text-[11px] text-[#6E6767] uppercase tracking-wider block">
                  Bio-Fermented Formulations
                </span>
              </div>
              <div className="space-y-1">
                <span className="block font-serif text-2xl font-light text-[#171515]">60-Day</span>
                <span className="text-[11px] text-[#6E6767] uppercase tracking-wider block">
                  Natural Vegetable Tanning
                </span>
              </div>
            </div>

            <div className="pt-4">
              <span className="font-serif italic text-lg text-[#171515] block">
                “Beauty is not an ornamentation; it is the quiet harmony between nature and craft.”
              </span>
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#6E6767] font-sans font-medium block mt-2">
                — ELEGANTSTYLE FOUNDERS
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
