'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const HERO_SLIDES = [
  {
    id: 'subtle-elegance',
    image: '/Subtle Elegance Beauty Collection.webp',
    alt: 'ELEGANTSTYLE — Subtle Elegance Beauty Collection',
    href: '/collections',
  },
  {
    id: 'botanical-skincare',
    image: '/Botanical Skincare Still Life.webp',
    alt: 'ELEGANTSTYLE — Botanical Skincare Still Life',
    href: '/beauty/skin-care',
  },
];

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Mobile Touch Swipe Handling
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  // Auto-advance carousel every 6.5 seconds when not hovered
  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6500);
    return () => clearInterval(timer);
  }, [isHovered]);

  const handlePrev = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

  const handleNext = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  // Touch Swipe Handlers for mobile phones & tablets
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
    touchEndX.current = null;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    const isLeftSwipe = distance > 45;
    const isRightSwipe = distance < -45;

    if (isLeftSwipe) {
      handleNext();
    } else if (isRightSwipe) {
      handlePrev();
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  const slide = HERO_SLIDES[currentSlide];

  return (
    <section
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className="relative w-full aspect-[2172/724] min-h-[160px] sm:min-h-[260px] md:min-h-[380px] lg:min-h-[460px] xl:min-h-[520px] bg-[#FCFAF9] overflow-hidden select-none border-b border-[#ECE7E6] touch-pan-y"
    >
      {/* Carousel Banner Slides - Pre-mounted for Instant Zero-Lag Transitions */}
      {HERO_SLIDES.map((s, idx) => {
        const isActive = idx === currentSlide;
        return (
          <div
            key={s.id}
            aria-hidden={!isActive}
            className={`absolute inset-0 w-full h-full transition-opacity duration-700 ease-in-out ${
              isActive ? 'opacity-100 z-10 pointer-events-auto' : 'opacity-0 z-0 pointer-events-none'
            }`}
          >
            <Link href={s.href} className="block relative w-full h-full cursor-pointer">
              <Image
                src={s.image}
                alt={s.alt}
                fill
                priority
                loading="eager"
                decoding="async"
                className="object-cover object-center"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 1920px"
              />
            </Link>
          </div>
        );
      })}

      {/* Luxury Left/Right Carousel Controls (Touch-optimized) */}
      <div className="absolute inset-y-0 left-2 sm:left-6 flex items-center z-20 pointer-events-none">
        <button
          type="button"
          onClick={handlePrev}
          aria-label="Previous Banner"
          className="pointer-events-auto w-8 h-8 sm:w-11 sm:h-11 rounded-full bg-[#FFFFFF]/90 hover:bg-[#171515] text-[#171515] hover:text-[#FCFAF9] border border-[#ECE7E6] transition-all flex items-center justify-center shadow-md backdrop-blur-xs cursor-pointer hover:scale-105 active:scale-95"
        >
          <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 stroke-[1.75]" />
        </button>
      </div>

      <div className="absolute inset-y-0 right-2 sm:right-6 flex items-center z-20 pointer-events-none">
        <button
          type="button"
          onClick={handleNext}
          aria-label="Next Banner"
          className="pointer-events-auto w-8 h-8 sm:w-11 sm:h-11 rounded-full bg-[#FFFFFF]/90 hover:bg-[#171515] text-[#171515] hover:text-[#FCFAF9] border border-[#ECE7E6] transition-all flex items-center justify-center shadow-md backdrop-blur-xs cursor-pointer hover:scale-105 active:scale-95"
        >
          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 stroke-[1.75]" />
        </button>
      </div>

      {/* Slide Indicators / Pill Dots (Enhanced Touch Target) */}
      <div className="absolute bottom-3 sm:bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 p-1 bg-[#FFFFFF]/40 sm:bg-transparent rounded-full backdrop-blur-[2px]">
        {HERO_SLIDES.map((s, idx) => (
          <button
            key={s.id}
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setCurrentSlide(idx);
            }}
            className={`transition-all duration-300 h-1.5 sm:h-2 rounded-full cursor-pointer ${
              currentSlide === idx
                ? 'w-6 sm:w-8 bg-[#171515] shadow-xs'
                : 'w-2 sm:w-2.5 bg-[#171515]/40 hover:bg-[#171515]/75'
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
