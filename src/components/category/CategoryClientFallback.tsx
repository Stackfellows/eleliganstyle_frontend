'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import ProductGrid from '@/components/product/ProductGrid';
import { getStoredCategories, getStoredProducts } from '@/lib/adminStore';
import { Category, Product } from '@/lib/types';
import { ArrowLeft, Sparkles } from 'lucide-react';

export default function CategoryClientFallback({ slug }: { slug: string }) {
  const [mounted, setMounted] = useState(false);
  const [category, setCategory] = useState<Category | null>(null);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    setMounted(true);
    const storedCats = getStoredCategories();
    const matched = storedCats.find((c) => c.slug === slug);
    if (matched) {
      setCategory(matched);
      const allProds = getStoredProducts();
      const filtered = allProds.filter((p) => p.mainCategory === slug);
      setProducts(filtered);
    }
  }, [slug]);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-[#FFFFFF] py-24 flex items-center justify-center">
        <div className="font-serif text-lg text-[#171515] animate-pulse">Loading Collection Archives...</div>
      </div>
    );
  }

  if (!category) {
    return (
      <div className="min-h-screen bg-[#FCFAF9] py-24 flex flex-col items-center justify-center px-4 text-center">
        <div className="p-3 bg-[#E9C9CE]/30 rounded-full mb-4">
          <Sparkles className="w-6 h-6 text-[#171515]" />
        </div>
        <h1 className="font-serif text-3xl text-[#171515] mb-2">Collection Not Found</h1>
        <p className="text-xs text-[#6E6767] max-w-md mb-6 leading-relaxed">
          The requested archive &ldquo;{slug}&rdquo; is not currently active in our catalogue.
        </p>
        <Link
          href="/"
          className="px-6 py-3 bg-[#171515] text-[#FCFAF9] text-xs uppercase tracking-widest hover:bg-[#292526] transition-colors"
        >
          Return to Storefront
        </Link>
      </div>
    );
  }

  const breadcrumbs = [
    { label: 'Shop', href: '/' },
    { label: category.name },
  ];

  return (
    <div className="bg-[#FFFFFF] min-h-screen pb-24 font-sans">
      {/* Category Hero Header */}
      <div className="bg-[#FCFAF9] border-b border-[#ECE7E6] py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <Breadcrumbs items={breadcrumbs} />
          <div className="max-w-2xl space-y-2">
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#C58C97] font-sans font-medium">
              {category.tagline || 'EXCLUSIVE ARCHIVE'}
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl font-light text-[#171515]">
              {category.name}
            </h1>
            <p className="text-xs sm:text-sm text-[#6E6767] font-sans font-light leading-relaxed">
              {category.description || 'Exclusive luxury creations formulated and curated with timeless refinement.'}
            </p>
          </div>
        </div>
      </div>

      {/* Main Listing Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <ProductGrid products={products} showFilters={true} />
      </div>

      {/* Category Footer Details */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24 pt-12 border-t border-[#ECE7E6]">
        <div className="bg-[#FCFAF9] p-8 border border-[#ECE7E6] space-y-3">
          <h3 className="font-serif text-xl text-[#171515]">
            About Our {category.name} Archive
          </h3>
          <p className="text-xs text-[#6E6767] font-light leading-relaxed">
            Every creation within the {category.name} realm is formulated or handcrafted in accordance with stringent European quality principles.
          </p>
        </div>
      </div>
    </div>
  );
}

