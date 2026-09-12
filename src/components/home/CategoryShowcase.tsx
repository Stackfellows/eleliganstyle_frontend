'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { CATEGORIES } from '@/lib/data/categories';

export default function CategoryShowcase() {
  return (
    <section className="py-20 bg-[#FFFFFF] border-b border-[#ECE7E6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 space-y-4 md:space-y-0">
          <div className="space-y-2">
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#6E6767] font-sans font-medium">
              MAIN CATEGORIES
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-light text-[#171515]">
              Curated Universes
            </h2>
          </div>
          <p className="text-xs text-[#6E6767] font-sans font-light max-w-sm">
            Distinct realms of high-art cosmetics and master Florentine leather craftsmanship.
          </p>
        </div>

        {/* 2 Panel Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {CATEGORIES.map((cat) => (
            <div
              key={cat.id}
              className="group relative bg-[#F8F5F4] border border-[#ECE7E6] overflow-hidden min-h-[480px] sm:min-h-[540px] flex flex-col justify-between p-8 sm:p-12 transition-all duration-700"
            >
              {/* Image Background with zoom effect */}
              <div className="absolute inset-0 z-0">
                <Image
                  src={cat.heroImage}
                  alt={cat.name}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 filter brightness-[0.88] contrast-[0.96]"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#171515]/90 via-[#171515]/30 to-transparent" />
              </div>

              {/* Top Tag */}
              <div className="relative z-10 flex items-center justify-between">
                <span className="bg-[#FFFFFF]/90 backdrop-blur-xs text-[#171515] text-[10px] tracking-[0.25em] uppercase px-3 py-1.5 font-sans">
                  {cat.name}
                </span>

                <div className="w-10 h-10 rounded-full bg-[#FFFFFF]/90 text-[#171515] flex items-center justify-center group-hover:bg-[#171515] group-hover:text-[#FFFFFF] transition-all duration-500">
                  <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </div>

              {/* Bottom Information */}
              <div className="relative z-10 space-y-6 transform group-hover:-translate-y-1 transition-transform duration-500">
                <div>
                  <span className="text-[11px] uppercase tracking-[0.2em] text-[#E9C9CE] font-sans font-light">
                    {cat.tagline}
                  </span>
                  <h3 className="font-serif text-3xl sm:text-4xl font-light text-[#FFFFFF] mt-1">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-[#ECE7E6] font-sans font-light mt-2 max-w-md leading-relaxed">
                    {cat.description}
                  </p>
                </div>

                {/* Subcategories links */}
                <div className="flex flex-wrap gap-2 pt-2 border-t border-[#FFFFFF]/20">
                  {cat.subcategories.map((sub) => (
                    <Link
                      key={sub.slug}
                      href={`/${cat.slug}/${sub.slug}`}
                      className="bg-[#FFFFFF]/20 hover:bg-[#FFFFFF] hover:text-[#171515] text-[#FFFFFF] text-[10px] uppercase tracking-widest px-3.5 py-1.5 transition-colors font-sans border border-[#FFFFFF]/30"
                    >
                      {sub.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
