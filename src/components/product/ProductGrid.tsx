'use client';

import React, { useState } from 'react';
import { Product } from '@/lib/types';
import ProductCard from './ProductCard';
import { SlidersHorizontal, ChevronDown } from 'lucide-react';

interface ProductGridProps {
  products: Product[];
  title?: string;
  subtitle?: string;
  showFilters?: boolean;
}

export default function ProductGrid({
  products,
  title,
  subtitle,
  showFilters = true,
}: ProductGridProps) {
  const [sortBy, setSortBy] = useState<'newest' | 'price-asc' | 'price-desc' | 'rating'>('newest');
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>('all');
  const [selectedAudience, setSelectedAudience] = useState<string>('all');

  // Filter subcategories dynamically
  const subcategories = Array.from(new Set(products.map((p) => p.subcategory)));

  let filtered = [...products];

  if (selectedSubcategory !== 'all') {
    filtered = filtered.filter((p) => p.subcategory === selectedSubcategory);
  }

  if (selectedAudience !== 'all') {
    filtered = filtered.filter((p) => p.audience.includes(selectedAudience as any));
  }

  if (sortBy === 'price-asc') {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sortBy === 'price-desc') {
    filtered.sort((a, b) => b.price - a.price);
  } else if (sortBy === 'rating') {
    filtered.sort((a, b) => b.rating - a.rating);
  } else {
    filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  return (
    <section className="space-y-8">
      {/* Title & Filter Header */}
      {(title || showFilters) && (
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#ECE7E6]">
          {title && (
            <div className="space-y-1">
              <h2 className="font-serif text-2xl sm:text-3xl font-light text-[#171515]">{title}</h2>
              {subtitle && <p className="text-xs text-[#6E6767] font-sans font-light">{subtitle}</p>}
            </div>
          )}

          {showFilters && (
            <div className="flex flex-wrap items-center gap-4 text-xs font-sans">
              {/* Subcategory Filter */}
              {subcategories.length > 1 && (
                <div className="relative">
                  <select
                    value={selectedSubcategory}
                    onChange={(e) => setSelectedSubcategory(e.target.value)}
                    className="appearance-none bg-[#FFFFFF] border border-[#ECE7E6] text-[#171515] py-2 pl-3 pr-8 rounded-none uppercase tracking-wider text-[11px] focus:outline-none cursor-pointer"
                  >
                    <option value="all">All Subcategories</option>
                    {subcategories.map((sub) => (
                      <option key={sub} value={sub}>
                        {sub.replace('-', ' ')}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="w-3.5 h-3.5 text-[#6E6767] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              )}

              {/* Audience Filter */}
              <div className="relative">
                <select
                  value={selectedAudience}
                  onChange={(e) => setSelectedAudience(e.target.value)}
                  className="appearance-none bg-[#FFFFFF] border border-[#ECE7E6] text-[#171515] py-2 pl-3 pr-8 rounded-none uppercase tracking-wider text-[11px] focus:outline-none cursor-pointer"
                >
                  <option value="all">All Audiences</option>
                  <option value="women">Women</option>
                  <option value="men">Men</option>
                  <option value="children">Children</option>
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-[#6E6767] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>

              {/* Sort By */}
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e: any) => setSortBy(e.target.value)}
                  className="appearance-none bg-[#FFFFFF] border border-[#ECE7E6] text-[#171515] py-2 pl-3 pr-8 rounded-none uppercase tracking-wider text-[11px] focus:outline-none cursor-pointer"
                >
                  <option value="newest">Sort: Newest First</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="rating">Top Rated</option>
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-[#6E6767] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>

              <span className="text-xs text-[#6E6767] uppercase tracking-wider font-light">
                ({filtered.length} Items)
              </span>
            </div>
          )}
        </div>
      )}

      {/* Grid listing */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="py-20 text-center space-y-4 bg-[#FCFAF9] border border-[#ECE7E6]">
          <h4 className="font-serif text-xl text-[#171515]">No products match your filter criteria</h4>
          <p className="text-xs text-[#6E6767] font-sans">
            Try adjusting your category or audience selection above.
          </p>
          <button
            onClick={() => {
              setSelectedSubcategory('all');
              setSelectedAudience('all');
            }}
            className="text-xs uppercase tracking-widest bg-[#171515] text-[#FCFAF9] py-2.5 px-6 hover:bg-[#292526] transition-colors inline-block"
          >
            Reset Filters
          </button>
        </div>
      )}
    </section>
  );
}
