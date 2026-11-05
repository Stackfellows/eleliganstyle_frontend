'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, Flame, Sparkles, Tag, TrendingUp, Award, Layers } from 'lucide-react';
import { PRODUCTS } from '@/lib/data/products';
import { getStoredProducts } from '@/lib/adminStore';
import { Product } from '@/lib/types';
import ProductCard from '../product/ProductCard';

type SectionKey = 'all' | 'featured' | 'sale' | 'bestsellers' | 'new';

export default function ProductSummarySection() {
  const [activeSection, setActiveSection] = useState<SectionKey>('all');
  const [productList, setProductList] = useState<Product[]>(PRODUCTS);

  useEffect(() => {
    setProductList(getStoredProducts());
    const handleStorage = () => setProductList(getStoredProducts());
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  // Featured items
  const featuredItems = productList.filter((p) => p.isFeatured || p.badge === 'AWARD WINNER').slice(0, 8);
  // Products on Sale / Special pricing
  const onSaleItems = productList.filter((p) => p.originalPrice && p.originalPrice > p.price).slice(0, 8);
  // Best Selling products
  const bestSellers = productList.filter((p) => p.badge === 'BEST SELLER' || p.reviewCount >= 20).slice(0, 8);
  // New Arrivals
  const newArrivals = productList.filter((p) => p.badge === 'NEW').slice(0, 8);

  const getActiveList = () => {
    switch (activeSection) {
      case 'featured':
        return featuredItems;
      case 'sale':
        return onSaleItems;
      case 'bestsellers':
        return bestSellers;
      case 'new':
        return newArrivals;
      case 'all':
      default:
        return productList.slice(0, 8);
    }
  };

  const currentProducts = getActiveList();

  const sections = [
    { id: 'all', label: 'All Curations', icon: Layers, count: productList.length },
    { id: 'featured', label: 'Featured Products', icon: Sparkles, count: featuredItems.length },
    { id: 'sale', label: 'Products on Sale', icon: Tag, count: onSaleItems.length },
    { id: 'bestsellers', label: 'Best Selling Products', icon: Flame, count: bestSellers.length },
    { id: 'new', label: 'New Arrivals', icon: TrendingUp, count: newArrivals.length },
  ];

  return (
    <section className="py-20 sm:py-24 bg-[#FFFFFF] border-b border-[#ECE7E6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Top Summary Banner */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#F4F6EE] border border-[#D0D9C0] text-[#6B7C52] text-[10px] uppercase tracking-widest font-mono">
            <Sparkles className="w-3.5 h-3.5 text-[#6B7C52]" />
            <span>Maison Product Directory & Summary</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-light text-[#171515] tracking-tight">
            Curated Summary of Products
          </h2>
          <p className="text-xs sm:text-sm text-[#6E6767] font-light leading-relaxed">
            Instant overview of every product group — explore our iconic featured formulas, exclusive promotions on sale, and coveted best-selling leather & beauty creations.
          </p>
        </div>

        {/* 3 Summary Spotlight Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Featured Products */}
          <button
            onClick={() => setActiveSection('featured')}
            className={`p-6 text-left border rounded transition-all text-xs space-y-3 cursor-pointer group ${
              activeSection === 'featured'
                ? 'bg-[#F4F6EE] border-[#6B7C52] shadow-sm'
                : 'bg-[#FCFAF9] border-[#ECE7E6] hover:border-[#6B7C52]'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-full bg-[#FFFFFF] border border-[#ECE7E6] flex items-center justify-center text-[#6B7C52]">
                <Sparkles className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 rounded bg-[#E8ECE0] text-[#556340]">
                {featuredItems.length} Products
              </span>
            </div>
            <div>
              <h3 className="font-serif text-lg font-light text-[#171515] group-hover:text-[#6B7C52] transition-colors">
                Featured Products
              </h3>
              <p className="text-[#6E6767] text-[11px] leading-relaxed mt-1">
                Handpicked benchmark formulations & signature Florentine leather pieces celebrated for craftsmanship.
              </p>
            </div>
            <div className="text-[11px] font-medium text-[#6B7C52] flex items-center gap-1 pt-1">
              <span>View Featured Summary</span>
              <span>→</span>
            </div>
          </button>

          {/* Card 2: Products on Sale */}
          <button
            onClick={() => setActiveSection('sale')}
            className={`p-6 text-left border rounded transition-all text-xs space-y-3 cursor-pointer group ${
              activeSection === 'sale'
                ? 'bg-[#F4F6EE] border-[#6B7C52] shadow-sm'
                : 'bg-[#FCFAF9] border-[#ECE7E6] hover:border-[#6B7C52]'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-full bg-[#FFFFFF] border border-[#ECE7E6] flex items-center justify-center text-[#6B7C52]">
                <Tag className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 rounded bg-[#E8ECE0] text-[#556340]">
                {onSaleItems.length} On Sale
              </span>
            </div>
            <div>
              <h3 className="font-serif text-lg font-light text-[#171515] group-hover:text-[#6B7C52] transition-colors">
                Products on Sale
              </h3>
              <p className="text-[#6E6767] text-[11px] leading-relaxed mt-1">
                Special limited promotional pricing and privileged seasonal markdowns on select catalog items.
              </p>
            </div>
            <div className="text-[11px] font-medium text-[#6B7C52] flex items-center gap-1 pt-1">
              <span>View Sale Products</span>
              <span>→</span>
            </div>
          </button>

          {/* Card 3: Best Selling Products */}
          <button
            onClick={() => setActiveSection('bestsellers')}
            className={`p-6 text-left border rounded transition-all text-xs space-y-3 cursor-pointer group ${
              activeSection === 'bestsellers'
                ? 'bg-[#F4F6EE] border-[#6B7C52] shadow-sm'
                : 'bg-[#FCFAF9] border-[#ECE7E6] hover:border-[#6B7C52]'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-full bg-[#FFFFFF] border border-[#ECE7E6] flex items-center justify-center text-[#6B7C52]">
                <Flame className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 rounded bg-[#E8ECE0] text-[#556340]">
                {bestSellers.length} Top Sellers
              </span>
            </div>
            <div>
              <h3 className="font-serif text-lg font-light text-[#171515] group-hover:text-[#6B7C52] transition-colors">
                Best Selling Products
              </h3>
              <p className="text-[#6E6767] text-[11px] leading-relaxed mt-1">
                The most popular customer choices with five-star verified client acclaim across Pakistan & Paris.
              </p>
            </div>
            <div className="text-[11px] font-medium text-[#6B7C52] flex items-center gap-1 pt-1">
              <span>View Best Sellers</span>
              <span>→</span>
            </div>
          </button>
        </div>

        {/* Section Navigation Tabs */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#ECE7E6]">
          <div className="flex flex-wrap gap-2 text-xs">
            {sections.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeSection === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveSection(tab.id as SectionKey)}
                  className={`py-2 px-4 uppercase tracking-wider text-[11px] rounded transition-all flex items-center gap-2 cursor-pointer border ${
                    isActive
                      ? 'bg-[#171515] text-[#FCFAF9] border-[#171515] shadow-xs'
                      : 'bg-[#FCFAF9] text-[#292526] border-[#ECE7E6] hover:border-[#6B7C52] hover:text-[#6B7C52]'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#D0D9C0]' : 'text-[#6E6767]'}`} />
                  <span>{tab.label}</span>
                  <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded ${
                    isActive ? 'bg-[#292526] text-[#D0D9C0]' : 'bg-[#ECE7E6] text-[#6E6767]'
                  }`}>
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>

          <Link
            href="/collections"
            className="text-xs uppercase tracking-widest text-[#6B7C52] hover:text-[#171515] transition-colors font-medium flex items-center gap-1 self-start sm:self-auto"
          >
            <span>View All Collections</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {currentProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* View All In Full Catalog CTA */}
        <div className="text-center pt-8 border-t border-[#ECE7E6]">
          <Link
            href="/collections"
            className="inline-flex items-center gap-3 bg-[#171515] text-[#FCFAF9] text-xs uppercase tracking-[0.2em] py-4 px-10 hover:bg-[#292526] transition-all hover:gap-4 shadow-sm"
          >
            <span>Explore All Collections & Vault ({PRODUCTS.length} Creations)</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
