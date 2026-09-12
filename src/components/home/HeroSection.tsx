'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative w-full min-h-[85vh] lg:min-h-[90vh] bg-[#F8F5F4] overflow-hidden flex items-center border-b border-[#ECE7E6]">
      {/* Background Image with slow luxury scale animation */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=2000&auto=format&fit=crop"
          alt="ElegantStyle Luxury Beauty & Fashion"
          fill
          priority
          className="object-cover object-center filter brightness-[0.92] contrast-[0.98] transition-transform duration-10000 ease-out hover:scale-105"
        />
        {/* Soft luxury editorial overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#FFFFFF]/95 via-[#FFFFFF]/80 to-transparent sm:w-2/3 lg:w-1/2" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#FFFFFF] via-transparent to-transparent h-32 bottom-0" />
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-xl space-y-6"
        >
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 bg-[#171515] text-[#FCFAF9] px-3.5 py-1.5 text-[10px] tracking-[0.3em] font-sans uppercase">
            <Sparkles className="w-3 h-3 text-[#E9C9CE]" />
            <span>BEAUTY • FASHION • EVERYDAY LUXURY</span>
          </div>

          {/* Heading */}
          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-light text-[#171515] leading-[1.08] tracking-tight">
            The Form of <br />
            <span className="italic font-normal text-[#C58C97]">Subtle Elegance</span>
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-base text-[#292526] font-sans font-light leading-relaxed max-w-md">
            Bio-fermented botanical skincare formulations paired with Italian calfskin leather goods. Designed with quiet restraint in Paris and Florence.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-4 pt-4 font-sans text-xs uppercase tracking-[0.2em]">
            <Link
              href="/beauty"
              className="bg-[#171515] text-[#FCFAF9] py-4 px-8 flex items-center gap-3 hover:bg-[#292526] transition-all hover:gap-4 shadow-sm"
            >
              <span>Shop Collection</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/journal"
              className="bg-[#FFFFFF]/90 backdrop-blur-xs border border-[#ECE7E6] text-[#171515] py-4 px-8 hover:bg-[#FFFFFF] hover:border-[#171515] transition-all"
            >
              <span>Explore Journal</span>
            </Link>
          </div>

          {/* Editorial Badging */}
          <div className="pt-8 border-t border-[#ECE7E6]/80 grid grid-cols-3 gap-4 text-[10px] uppercase tracking-widest text-[#6E6767] font-sans">
            <div>
              <span className="block font-medium text-[#171515]">100% Organic</span>
              <span>French Flora</span>
            </div>
            <div>
              <span className="block font-medium text-[#171515]">Tuscan Leather</span>
              <span>Full-Grain Calfskin</span>
            </div>
            <div>
              <span className="block font-medium text-[#171515]">Carbon Neutral</span>
              <span>Express Delivery</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
