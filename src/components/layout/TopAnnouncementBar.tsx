'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { X, Sparkles, Truck, MessageSquare } from 'lucide-react';

import { usePathname } from 'next/navigation';

export default function TopAnnouncementBar() {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(true);

  if (pathname?.startsWith('/admin') || !isVisible) return null;

  return (
    <div className="bg-[#171515] text-[#FCFAF9] text-[10px] sm:text-[11px] tracking-widest uppercase py-2 px-4 flex items-center justify-between transition-all duration-300 font-sans border-b border-[#292526]">
      <div className="flex-1 text-center flex flex-wrap items-center justify-center gap-x-6 gap-y-1">
        <Link
          href="/deals"
          className="flex items-center gap-1.5 text-[#E9C9CE] hover:text-[#FFFFFF] transition-colors"
        >
          <Sparkles className="w-3 h-3 text-[#E9C9CE] animate-pulse" />
          <span className="font-medium">Deals & Discounts: Bridal, Party & Makeup Suites (Save up to 35%)</span>
        </Link>

        <span className="hidden md:inline text-[#4D4547]">•</span>

        <div className="hidden md:flex items-center gap-4 text-[#A8A19F]">
          <Link href="/track-order" className="hover:text-[#FCFAF9] transition-colors flex items-center gap-1">
            <Truck className="w-3 h-3" />
            <span>Track Order</span>
          </Link>
          <span className="text-[#4D4547]">|</span>
          <Link href="/contact" className="hover:text-[#FCFAF9] transition-colors flex items-center gap-1">
            <MessageSquare className="w-3 h-3" />
            <span>Contact Us</span>
          </Link>
        </div>
      </div>

      <button
        onClick={() => setIsVisible(false)}
        className="text-[#6E6767] hover:text-[#FFFFFF] transition-colors p-1 ml-2"
        aria-label="Close notification"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}
