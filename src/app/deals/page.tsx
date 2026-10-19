'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Sparkles, Check, ArrowRight, ShoppingBag, ShieldCheck, Truck, RefreshCw } from 'lucide-react';
import { DEAL_CATEGORIES, DEAL_BUNDLES, DealBundle } from '@/lib/data/deals';
import { useCart } from '@/lib/context/CartContext';
import { useUI } from '@/lib/context/UIContext';
import { formatPrice } from '@/lib/utils';
import Breadcrumbs from '@/components/layout/Breadcrumbs';

export default function DealsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [addedDealId, setAddedDealId] = useState<string | null>(null);

  const { addToCart } = useCart();
  const { openCart } = useUI();

  const filteredBundles = selectedCategory === 'all'
    ? DEAL_BUNDLES
    : DEAL_BUNDLES.filter(b => b.dealCategory === selectedCategory);

  const handleAddBundle = (bundle: DealBundle) => {
    // Map bundle into product object for cart
    addToCart({
      id: bundle.id,
      slug: bundle.slug,
      name: bundle.title,
      subtitle: bundle.subtitle,
      description: bundle.description,
      price: bundle.discountedPrice,
      originalPrice: bundle.originalPrice,
      rating: 5.0,
      reviewCount: 42,
      mainCategory: 'beauty',
      subcategory: 'deals',
      audience: ['women'],
      images: [bundle.image],
      details: bundle.includes,
      inStock: true,
      createdAt: '2026-02-20'
    });

    setAddedDealId(bundle.id);
    setTimeout(() => {
      setAddedDealId(null);
      openCart();
    }, 800);
  };

  return (
    <div className="bg-[#FFFFFF] min-h-screen pb-24 font-sans">
      {/* Hero Header */}
      <div className="bg-[#171515] text-[#FCFAF9] py-16 sm:py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#E9C9CE_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-6 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#292526] border border-[#E9C9CE]/30 text-[#E9C9CE] text-[10px] tracking-[0.25em] uppercase font-sans">
            <Sparkles className="w-3 h-3 text-[#E9C9CE] animate-pulse" />
            <span>Maison Privilege Archives</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl font-light tracking-wide text-[#FFFFFF] max-w-3xl mx-auto leading-tight">
            Deals & Exclusive Discounts
          </h1>

          <p className="text-xs sm:text-sm text-[#A8A19F] max-w-2xl mx-auto font-light leading-relaxed">
            Curated ceremony suites, nocturnal gala edits, and Parisian silk cosmetics bundled with special maison savings up to 35%.
          </p>

          {/* Quick Filter Pill Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 pt-4">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-5 py-2.5 text-xs uppercase tracking-widest transition-all ${
                selectedCategory === 'all'
                  ? 'bg-[#E9C9CE] text-[#171515] font-medium shadow-md'
                  : 'bg-[#292526] text-[#FCFAF9] hover:bg-[#3D3739]'
              }`}
            >
              All Privileges
            </button>
            <button
              onClick={() => setSelectedCategory('bridal-makeup-deals')}
              className={`px-5 py-2.5 text-xs uppercase tracking-widest transition-all ${
                selectedCategory === 'bridal-makeup-deals'
                  ? 'bg-[#E9C9CE] text-[#171515] font-medium shadow-md'
                  : 'bg-[#292526] text-[#FCFAF9] hover:bg-[#3D3739]'
              }`}
            >
              Bridal Makeup Deals
            </button>
            <button
              onClick={() => setSelectedCategory('party-makeup-deals')}
              className={`px-5 py-2.5 text-xs uppercase tracking-widest transition-all ${
                selectedCategory === 'party-makeup-deals'
                  ? 'bg-[#E9C9CE] text-[#171515] font-medium shadow-md'
                  : 'bg-[#292526] text-[#FCFAF9] hover:bg-[#3D3739]'
              }`}
            >
              Party Makeup Deals
            </button>
            <button
              onClick={() => setSelectedCategory('makeup-deals')}
              className={`px-5 py-2.5 text-xs uppercase tracking-widest transition-all ${
                selectedCategory === 'makeup-deals'
                  ? 'bg-[#E9C9CE] text-[#171515] font-medium shadow-md'
                  : 'bg-[#292526] text-[#FCFAF9] hover:bg-[#3D3739]'
              }`}
            >
              Makeup Deals
            </button>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Deals & Discounts' }]} />

        {/* Category Features Spotlight */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-10">
          {DEAL_CATEGORIES.map((cat) => (
            <Link
              key={cat.slug}
              href={`/deals/${cat.slug}`}
              className="group relative overflow-hidden bg-[#FCFAF9] border border-[#ECE7E6] p-6 hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <span className="text-[9px] uppercase tracking-[0.25em] text-[#C58C97] font-medium block">
                  {cat.badgeText}
                </span>
                <h3 className="font-serif text-2xl font-light text-[#171515] group-hover:text-[#C58C97] transition-colors">
                  {cat.title}
                </h3>
                <p className="text-xs text-[#6E6767] font-light leading-relaxed line-clamp-3">
                  {cat.headline}
                </p>
              </div>
              <div className="pt-6 flex items-center gap-2 text-xs uppercase tracking-widest text-[#171515] group-hover:translate-x-1 transition-transform">
                <span>Explore Specific Edit</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#C58C97]" />
              </div>
            </Link>
          ))}
        </div>

        {/* Section Heading */}
        <div className="border-b border-[#ECE7E6] pb-4 mb-10 flex items-center justify-between">
          <h2 className="font-serif text-2xl sm:text-3xl font-light text-[#171515]">
            Featured Privileged Suites ({filteredBundles.length})
          </h2>
          <span className="text-xs uppercase tracking-widest text-[#6E6767]">
            Includes Presentation Packaging
          </span>
        </div>

        {/* Bundles Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {filteredBundles.map((bundle) => {
            const isAdded = addedDealId === bundle.id;

            return (
              <div
                key={bundle.id}
                className="bg-[#FFFFFF] border border-[#ECE7E6] hover:border-[#171515]/30 transition-all duration-300 flex flex-col sm:flex-row overflow-hidden shadow-xs hover:shadow-md"
              >
                {/* Image */}
                <div className="sm:w-1/2 relative min-h-[300px] bg-[#FCFAF9]">
                  <Image
                    src={bundle.image}
                    alt={bundle.title}
                    fill
                    sizes="(max-width: 640px) 100vw, 50vw"
                    className="object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <div className="absolute top-3 left-3 bg-[#171515] text-[#FCFAF9] text-[9px] uppercase tracking-widest px-3 py-1 font-medium">
                    {bundle.badge}
                  </div>
                  <div className="absolute bottom-3 left-3 bg-[#E9C9CE] text-[#171515] text-[10px] uppercase tracking-widest px-3 py-1 font-medium font-serif shadow-xs">
                    SAVE {bundle.savingsPercentage}%
                  </div>
                </div>

                {/* Info */}
                <div className="sm:w-1/2 p-6 sm:p-7 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <span className="text-[9px] uppercase tracking-[0.25em] text-[#C58C97] font-medium">
                      {bundle.dealCategory.replace(/-/g, ' ')}
                    </span>
                    <h3 className="font-serif text-xl sm:text-2xl font-light text-[#171515] leading-snug">
                      {bundle.title}
                    </h3>
                    <p className="text-xs text-[#6E6767] font-light leading-relaxed">
                      {bundle.subtitle}
                    </p>

                    {/* Price Block */}
                    <div className="flex items-baseline gap-3 pt-2">
                      <span className="font-serif text-2xl text-[#171515] font-normal">
                        {formatPrice(bundle.discountedPrice)}
                      </span>
                      <span className="text-sm text-[#A8A19F] line-through font-light">
                        {formatPrice(bundle.originalPrice)}
                      </span>
                      <span className="text-[11px] text-[#A21D21] font-medium tracking-wide">
                        Save {formatPrice(bundle.originalPrice - bundle.discountedPrice)}
                      </span>
                    </div>

                    {/* What's Included */}
                    <div className="pt-3 border-t border-[#ECE7E6]/70">
                      <span className="text-[10px] uppercase tracking-widest text-[#171515] font-medium block mb-1.5">
                        Suite Inclusions:
                      </span>
                      <ul className="space-y-1">
                        {bundle.includes.slice(0, 3).map((item, idx) => (
                          <li key={idx} className="text-[11px] text-[#6E6767] flex items-center gap-1.5">
                            <Check className="w-3 h-3 text-[#C58C97] shrink-0" />
                            <span className="truncate">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-4 flex flex-col sm:flex-row gap-2.5">
                    <button
                      onClick={() => handleAddBundle(bundle)}
                      disabled={isAdded}
                      className={`flex-1 py-3 px-4 text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${
                        isAdded
                          ? 'bg-[#E9C9CE] text-[#171515]'
                          : 'bg-[#171515] text-[#FCFAF9] hover:bg-[#292526]'
                      }`}
                    >
                      {isAdded ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          Added to Bag
                        </>
                      ) : (
                        <>
                          <ShoppingBag className="w-3.5 h-3.5" />
                          Claim Deal
                        </>
                      )}
                    </button>
                    <Link
                      href={`/deals/${bundle.dealCategory}`}
                      className="py-3 px-4 text-xs uppercase tracking-widest border border-[#ECE7E6] hover:bg-[#FCFAF9] text-[#171515] transition-colors flex items-center justify-center"
                    >
                      Details
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Reassurance Banner */}
        <div className="mt-20 p-8 bg-[#FCFAF9] border border-[#ECE7E6] grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
          <div className="flex items-start gap-4">
            <ShieldCheck className="w-6 h-6 text-[#C58C97] shrink-0 mx-auto md:mx-0" />
            <div>
              <h4 className="font-serif text-base text-[#171515]">Authenticity Guaranteed</h4>
              <p className="text-xs text-[#6E6767] font-light mt-1">
                Every deal formulation is 100% genuine and packaged in our signature luxury presentation box.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <Truck className="w-6 h-6 text-[#C58C97] shrink-0 mx-auto md:mx-0" />
            <div>
              <h4 className="font-serif text-base text-[#171515]">Complimentary Express Shipping</h4>
              <p className="text-xs text-[#6E6767] font-light mt-1">
                All privilege deal orders include complimentary insured express delivery across Pakistan.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <RefreshCw className="w-6 h-6 text-[#C58C97] shrink-0 mx-auto md:mx-0" />
            <div>
              <h4 className="font-serif text-base text-[#171515]">30-Day Effortless Returns</h4>
              <p className="text-xs text-[#6E6767] font-light mt-1">
                Unopened beauty items and leather goods may be returned within 30 days with prepaid shipping labels.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
