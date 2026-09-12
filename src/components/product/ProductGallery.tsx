'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Maximize2, X } from 'lucide-react';

interface GalleryProps {
  images: string[];
  name: string;
}

export default function ProductGallery({ images, name }: GalleryProps) {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  return (
    <div className="space-y-4 lg:sticky lg:top-28">
      {/* Main Image View */}
      <div className="relative aspect-4/5 w-full bg-[#F8F5F4] border border-[#ECE7E6] overflow-hidden group">
        <Image
          src={images[selectedIdx]}
          alt={name}
          fill
          priority
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 1024px) 100vw, 60vw"
        />

        {/* Lightbox Zoom Trigger */}
        <button
          onClick={() => setIsLightboxOpen(true)}
          className="absolute bottom-4 right-4 z-10 p-3 bg-[#FFFFFF]/90 backdrop-blur-xs text-[#171515] rounded-full hover:bg-[#171515] hover:text-[#FFFFFF] transition-colors shadow-sm"
          aria-label="Expand image"
        >
          <Maximize2 className="w-4 h-4 stroke-[1.5]" />
        </button>
      </div>

      {/* Thumbnails list */}
      {images.length > 1 && (
        <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedIdx(idx)}
              className={`relative aspect-square border overflow-hidden transition-all ${
                selectedIdx === idx
                  ? 'border-[#171515] ring-1 ring-[#171515]'
                  : 'border-[#ECE7E6] opacity-70 hover:opacity-100'
              }`}
            >
              <Image src={img} alt="" fill className="object-cover" sizes="120px" />
            </button>
          ))}
        </div>
      )}

      {/* Lightbox Modal */}
      {isLightboxOpen && (
        <div className="fixed inset-0 z-50 bg-[#171515]/95 flex items-center justify-center p-4">
          <button
            onClick={() => setIsLightboxOpen(false)}
            className="absolute top-6 right-6 p-3 text-[#FCFAF9] hover:text-[#E9C9CE] transition-colors"
          >
            <X className="w-6 h-6 stroke-[1.5]" />
          </button>
          <div className="relative max-w-4xl w-full aspect-4/5 max-h-[85vh]">
            <Image
              src={images[selectedIdx]}
              alt={name}
              fill
              className="object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
}
