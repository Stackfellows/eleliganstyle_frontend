'use client';

import React, { useState } from 'react';
import { X, Sparkles } from 'lucide-react';

export default function TopAnnouncementBar() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="bg-[#171515] text-[#FCFAF9] text-[11px] sm:text-xs tracking-widest uppercase py-2 px-4 flex items-center justify-between transition-all duration-300 font-sans border-b border-[#292526]">
      <div className="flex-1 text-center flex items-center justify-center gap-2">
        <Sparkles className="w-3 h-3 text-[#E9C9CE] animate-pulse" />
        <span>Complimentary Carbon-Neutral Delivery & Luxury Presentation Box on Orders Over $150</span>
      </div>
      <button
        onClick={() => setIsVisible(false)}
        className="text-[#6E6767] hover:text-[#FFFFFF] transition-colors p-1"
        aria-label="Close notification"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}
