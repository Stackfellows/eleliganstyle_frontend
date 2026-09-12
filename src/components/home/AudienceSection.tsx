'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { AUDIENCE_SECTIONS } from '@/lib/data/categories';

export default function AudienceSection() {
  const womenSection = AUDIENCE_SECTIONS.find((a) => a.slug === 'women')!;
  const menSection = AUDIENCE_SECTIONS.find((a) => a.slug === 'men')!;
  const childrenSection = AUDIENCE_SECTIONS.find((a) => a.slug === 'children')!;

  return (
    <section className="py-24 bg-[#FCFAF9] border-b border-[#ECE7E6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Section Title */}
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#6E6767] font-sans font-medium">
            SHOP BY AUDIENCE
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-light text-[#171515]">
            Tailored Experiences
          </h2>
          <p className="text-xs text-[#6E6767] font-sans font-light">
            Formulations and leather accessories styled distinctly for women, men, and gentle child care.
          </p>
        </div>

        {/* Asymmetrical Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* WOMEN: Large Left Feature */}
          <div className="lg:col-span-7 group relative bg-[#FFFFFF] border border-[#ECE7E6] overflow-hidden min-h-[500px] flex flex-col justify-between p-8 sm:p-12">
            <div className="absolute inset-0 z-0">
              <Image
                src={womenSection.image}
                alt="Women Collection"
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 filter brightness-[0.9]"
                sizes="(max-width: 1024px) 100vw, 60vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#171515]/85 via-transparent to-transparent" />
            </div>

            <div className="relative z-10">
              <span className="bg-[#F8E8EA] text-[#171515] text-[10px] uppercase tracking-[0.25em] font-sans px-3 py-1">
                FOR WOMEN
              </span>
            </div>

            <div className="relative z-10 space-y-4">
              <div>
                <h3 className="font-serif text-3xl sm:text-4xl font-light text-[#FFFFFF]">
                  Women’s Line
                </h3>
                <p className="text-xs text-[#ECE7E6] font-sans font-light mt-1 max-w-md">
                  {womenSection.description}
                </p>
              </div>

              <div className="flex flex-wrap gap-2 text-xs font-sans">
                <Link
                  href="/women/makeup"
                  className="bg-[#FFFFFF]/90 text-[#171515] px-3.5 py-1.5 hover:bg-[#FFFFFF] transition-colors"
                >
                  Silk Makeup
                </Link>
                <Link
                  href="/women/skin-care"
                  className="bg-[#FFFFFF]/90 text-[#171515] px-3.5 py-1.5 hover:bg-[#FFFFFF] transition-colors"
                >
                  Nectar Skincare
                </Link>
                <Link
                  href="/women"
                  className="bg-[#171515] text-[#FCFAF9] px-4 py-1.5 hover:bg-[#292526] transition-colors flex items-center gap-1"
                >
                  <span>Explore All</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>

          {/* MEN & CHILDREN: Stacked Right Grid */}
          <div className="lg:col-span-5 space-y-8 flex flex-col justify-between h-full">
            {/* MEN */}
            <div className="group relative bg-[#FFFFFF] border border-[#ECE7E6] overflow-hidden min-h-[236px] p-6 sm:p-8 flex flex-col justify-between">
              <div className="absolute inset-0 z-0">
                <Image
                  src={menSection.image}
                  alt="Men Collection"
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 filter brightness-[0.88]"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#171515]/90 via-[#171515]/40 to-transparent" />
              </div>

              <div className="relative z-10 flex justify-between items-start">
                <span className="bg-[#FFFFFF]/90 text-[#171515] text-[10px] uppercase tracking-[0.25em] font-sans px-3 py-1">
                  FOR MEN
                </span>
              </div>

              <div className="relative z-10 space-y-2">
                <h3 className="font-serif text-2xl font-light text-[#FFFFFF]">Men’s Collection</h3>
                <p className="text-xs text-[#ECE7E6] font-sans font-light line-clamp-1">
                  {menSection.description}
                </p>
                <Link
                  href="/men"
                  className="inline-flex items-center gap-1.5 text-xs text-[#E9C9CE] font-sans uppercase tracking-widest hover:text-[#FFFFFF] transition-colors pt-1"
                >
                  <span>Discover Belts & Wallets</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* CHILDREN */}
            <div className="group relative bg-[#FFFFFF] border border-[#ECE7E6] overflow-hidden min-h-[236px] p-6 sm:p-8 flex flex-col justify-between">
              <div className="absolute inset-0 z-0">
                <Image
                  src={childrenSection.image}
                  alt="Children Collection"
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 filter brightness-[0.92]"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#171515]/85 via-[#171515]/30 to-transparent" />
              </div>

              <div className="relative z-10 flex justify-between items-start">
                <span className="bg-[#F8E8EA] text-[#171515] text-[10px] uppercase tracking-[0.25em] font-sans px-3 py-1">
                  FOR CHILDREN
                </span>
              </div>

              <div className="relative z-10 space-y-2">
                <h3 className="font-serif text-2xl font-light text-[#FFFFFF]">Child & Infant Care</h3>
                <p className="text-xs text-[#ECE7E6] font-sans font-light line-clamp-1">
                  {childrenSection.description}
                </p>
                <Link
                  href="/children"
                  className="inline-flex items-center gap-1.5 text-xs text-[#E9C9CE] font-sans uppercase tracking-widest hover:text-[#FFFFFF] transition-colors pt-1"
                >
                  <span>Explore Organic Baby Care</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
