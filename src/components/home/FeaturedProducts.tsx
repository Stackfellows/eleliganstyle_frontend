'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { PRODUCTS } from '@/lib/data/products';
import ProductCard from '../product/ProductCard';

const TABS = [
  { id: 'all', label: 'All Curations' },
  { id: 'BEST SELLER', label: 'Best Sellers' },
  { id: 'NEW', label: 'New Arrivals' },
  { id: 'AWARD WINNER', label: 'Award Winners' },
];

export default function FeaturedProducts() {
  const [activeTab, setActiveTab] = useState('all');

  const filtered =
    activeTab === 'all'
      ? PRODUCTS.slice(0, 8)
      : PRODUCTS.filter((p) => p.badge === activeTab).slice(0, 8);

  return (
    <section className="py-24 bg-[#FFFFFF] border-b border-[#ECE7E6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header & Tabs */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#ECE7E6]">
          <div className="space-y-2">
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#6E6767] font-sans font-medium">
              CURATED SELECTION
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-light text-[#171515]">
              Featured Icons
            </h2>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-2 text-xs font-sans">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-2 px-4 uppercase tracking-widest text-[11px] transition-all border ${
                  activeTab === tab.id
                    ? 'bg-[#171515] text-[#FCFAF9] border-[#171515]'
                    : 'bg-[#FCFAF9] text-[#292526] border-[#ECE7E6] hover:border-[#171515]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* View All CTA */}
        <div className="text-center pt-8">
          <Link
            href="/beauty"
            className="inline-flex items-center gap-3 bg-[#FCFAF9] border border-[#ECE7E6] text-[#171515] text-xs uppercase tracking-[0.2em] py-4 px-10 hover:bg-[#171515] hover:text-[#FCFAF9] transition-all hover:gap-4"
          >
            <span>Explore Complete Vault</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
