'use client';

import React, { useState } from 'react';
import { notFound, useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Sparkles, Check, ShoppingBag, ShieldCheck, Heart, ArrowLeft, Star } from 'lucide-react';
import { DEAL_CATEGORIES, DEAL_BUNDLES, DealBundle } from '@/lib/data/deals';
import { useCart } from '@/lib/context/CartContext';
import { useUI } from '@/lib/context/UIContext';
import { useWishlist } from '@/lib/context/WishlistContext';
import { formatPrice } from '@/lib/utils';
import Breadcrumbs from '@/components/layout/Breadcrumbs';

export default function DealCategoryPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const category = DEAL_CATEGORIES.find((c) => c.slug === slug);
  const bundles = DEAL_BUNDLES.filter((b) => b.dealCategory === slug);

  const [addedDealId, setAddedDealId] = useState<string | null>(null);

  const { addToCart } = useCart();
  const { openCart } = useUI();
  const { toggleWishlist, isInWishlist } = useWishlist();

  if (!category) {
    return notFound();
  }

  const handleAddBundle = (bundle: DealBundle) => {
    addToCart({
      id: bundle.id,
      slug: bundle.slug,
      name: bundle.title,
      subtitle: bundle.subtitle,
      description: bundle.description,
      price: bundle.discountedPrice,
      originalPrice: bundle.originalPrice,
      rating: 5.0,
      reviewCount: 48,
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

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Deals & Discounts', href: '/deals' },
    { label: category.title }
  ];

  return (
    <div className="bg-[#FFFFFF] min-h-screen pb-24 font-sans">
      {/* Category Banner */}
      <div className="relative bg-[#171515] text-[#FCFAF9] py-16 sm:py-20 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-25">
          <Image
            src={category.bannerImage}
            alt={category.title}
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#171515] via-[#171515]/80 to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <Link
            href="/deals"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#E9C9CE] hover:text-[#FFFFFF] transition-colors mb-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>All Deals & Discounts</span>
          </Link>

          <div className="inline-block px-3 py-1 bg-[#292526] text-[#E9C9CE] border border-[#E9C9CE]/30 text-[10px] tracking-[0.25em] uppercase font-sans">
            {category.badgeText}
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-light text-[#FFFFFF] max-w-2xl leading-tight">
            {category.title}
          </h1>

          <p className="text-xs sm:text-sm text-[#D8D2D0] max-w-2xl font-light leading-relaxed">
            {category.description}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <Breadcrumbs items={breadcrumbs} />

        {/* Bundles Listing */}
        <div className="mt-8 space-y-12">
          {bundles.map((bundle) => {
            const isAdded = addedDealId === bundle.id;

            return (
              <div
                key={bundle.id}
                className="bg-[#FCFAF9] border border-[#ECE7E6] p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
              >
                {/* Left: Image */}
                <div className="lg:col-span-5 relative aspect-square sm:aspect-4/3 lg:aspect-square bg-[#FFFFFF] border border-[#ECE7E6] overflow-hidden">
                  <Image
                    src={bundle.image}
                    alt={bundle.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover"
                  />
                  <div className="absolute top-4 left-4 bg-[#171515] text-[#FCFAF9] text-[9px] uppercase tracking-widest px-3 py-1 font-medium">
                    {bundle.badge}
                  </div>
                  <div className="absolute bottom-4 left-4 bg-[#E9C9CE] text-[#171515] text-[10px] uppercase tracking-widest px-3 py-1.5 font-serif font-medium shadow-sm">
                    SAVE {bundle.savingsPercentage}% OFF
                  </div>
                </div>

                {/* Right: Detailed Specification */}
                <div className="lg:col-span-7 space-y-6">
                  <div className="space-y-2">
                    <div className="flex items-center gap-1 text-[#C58C97]">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current" />
                      ))}
                      <span className="text-[11px] text-[#6E6767] ml-2 font-light">5.0 (Archival Rated)</span>
                    </div>

                    <h2 className="font-serif text-2xl sm:text-3xl font-light text-[#171515]">
                      {bundle.title}
                    </h2>
                    <p className="text-xs sm:text-sm text-[#6E6767] font-light leading-relaxed">
                      {bundle.description}
                    </p>
                  </div>

                  {/* Pricing Box */}
                  <div className="p-4 bg-[#FFFFFF] border border-[#ECE7E6] inline-flex items-baseline gap-4">
                    <div>
                      <span className="text-[10px] uppercase tracking-widest text-[#6E6767] block">
                        Privilege Price
                      </span>
                      <span className="font-serif text-3xl text-[#171515] font-light">
                        {formatPrice(bundle.discountedPrice)}
                      </span>
                    </div>
                    <div className="pl-4 border-l border-[#ECE7E6]">
                      <span className="text-[10px] uppercase tracking-widest text-[#6E6767] block">
                        Standard Value
                      </span>
                      <span className="text-base text-[#A8A19F] line-through font-light">
                        {formatPrice(bundle.originalPrice)}
                      </span>
                    </div>
                    <div className="pl-4 border-l border-[#ECE7E6]">
                      <span className="text-[10px] uppercase tracking-widest text-[#A21D21] block font-medium">
                        Your Savings
                      </span>
                      <span className="text-base text-[#A21D21] font-medium font-sans">
                        {formatPrice(bundle.originalPrice - bundle.discountedPrice)} ({bundle.savingsPercentage}%)
                      </span>
                    </div>
                  </div>

                  {/* Suite Inclusions */}
                  <div className="space-y-2">
                    <span className="text-xs uppercase tracking-widest text-[#171515] font-medium block">
                      Suite Contents Included:
                    </span>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {bundle.includes.map((item, idx) => (
                        <li key={idx} className="text-xs text-[#292526] flex items-center gap-2">
                          <Check className="w-3.5 h-3.5 text-[#C58C97] shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Perks */}
                  <div className="space-y-2 pt-2 border-t border-[#ECE7E6]">
                    <span className="text-[11px] uppercase tracking-widest text-[#6E6767] block">
                      Maison Perks with this Deal:
                    </span>
                    <ul className="space-y-1">
                      {bundle.perks.map((perk, idx) => (
                        <li key={idx} className="text-xs text-[#6E6767] flex items-center gap-2">
                          <Sparkles className="w-3 h-3 text-[#C58C97] shrink-0" />
                          <span>{perk}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Action Button */}
                  <div className="pt-4 flex items-center gap-4">
                    <button
                      onClick={() => handleAddBundle(bundle)}
                      disabled={isAdded}
                      className={`flex-1 py-4 px-8 text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-3 ${
                        isAdded
                          ? 'bg-[#E9C9CE] text-[#171515]'
                          : 'bg-[#171515] text-[#FCFAF9] hover:bg-[#292526]'
                      }`}
                    >
                      {isAdded ? (
                        <>
                          <Check className="w-4 h-4" />
                          Suite Claimed & Added to Bag
                        </>
                      ) : (
                        <>
                          <ShoppingBag className="w-4 h-4" />
                          Claim {category.title} Offer — {formatPrice(bundle.discountedPrice)}
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Other Deal Categories Switcher */}
        <div className="mt-16 pt-12 border-t border-[#ECE7E6]">
          <h3 className="font-serif text-xl text-[#171515] mb-6">
            Explore Other Exclusive Deals
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {DEAL_CATEGORIES.filter((c) => c.slug !== slug).map((other) => (
              <Link
                key={other.slug}
                href={`/deals/${other.slug}`}
                className="p-5 border border-[#ECE7E6] bg-[#FCFAF9] hover:border-[#171515] transition-colors flex items-center justify-between group"
              >
                <div>
                  <span className="text-[9px] uppercase tracking-widest text-[#C58C97] font-medium block">
                    {other.badgeText}
                  </span>
                  <h4 className="font-serif text-lg text-[#171515] group-hover:text-[#C58C97] transition-colors">
                    {other.title}
                  </h4>
                </div>
                <ShoppingBag className="w-4 h-4 text-[#6E6767] group-hover:text-[#171515] transition-colors" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
