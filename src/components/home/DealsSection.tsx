'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Sparkles, Heart } from 'lucide-react';
import { DEAL_CATEGORIES } from '@/lib/data/deals';

export default function DealsSection() {
  return (
    <section className="py-20 sm:py-28 bg-[#171515] text-[#FCFAF9] relative overflow-hidden font-sans">
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#E9C9CE_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#292526] pb-8 mb-12">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#211E1F] border border-[#E9C9CE]/30 text-[#E9C9CE] text-[10px] tracking-[0.25em] uppercase font-sans">
              <Sparkles className="w-3 h-3 text-[#E9C9CE] animate-pulse" />
              <span>LIMITED PRIVILEGES • SAVE UP TO 35%</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-light text-[#FFFFFF] tracking-wide">
              Deals & Discounts
            </h2>
            <p className="text-xs sm:text-sm text-[#A8A19F] max-w-xl font-light leading-relaxed">
              Curated ceremony suites, nocturnal gala edits, and Parisian silk cosmetics bundled with special maison savings.
            </p>
          </div>

          <Link
            href="/deals"
            className="group inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#E9C9CE] hover:text-[#FFFFFF] transition-colors"
          >
            <span>View All Deals Archives</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* 3 Major Deal Category Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {DEAL_CATEGORIES.map((deal) => (
            <Link
              key={deal.slug}
              href={`/deals/${deal.slug}`}
              className="group block bg-[#211E1F] border border-[#2E2A2B] hover:border-[#E9C9CE]/70 transition-all duration-300 overflow-hidden shadow-lg"
            >
              {/* Card Image */}
              <div className="relative aspect-4/3 overflow-hidden bg-[#292526]">
                <Image
                  src={deal.bannerImage}
                  alt={deal.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#211E1F] via-transparent to-transparent" />
                <div className="absolute top-4 left-4 bg-[#171515] text-[#E9C9CE] text-[9px] uppercase tracking-widest px-3 py-1 font-sans border border-[#E9C9CE]/20 font-medium">
                  {deal.badgeText}
                </div>
              </div>

              {/* Card Content */}
              <div className="p-6 sm:p-7 space-y-3">
                <h3 className="font-serif text-2xl font-light text-[#FFFFFF] group-hover:text-[#E9C9CE] transition-colors">
                  {deal.title}
                </h3>
                <p className="text-xs text-[#A8A19F] font-light leading-relaxed line-clamp-2">
                  {deal.headline}
                </p>
                <div className="pt-4 flex items-center justify-between text-xs uppercase tracking-widest text-[#FCFAF9]">
                  <span className="text-[11px] text-[#E9C9CE] font-sans font-medium">Explore Special Suite</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#E9C9CE] group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
