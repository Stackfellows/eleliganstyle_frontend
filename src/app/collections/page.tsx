import React from 'react';
import { Metadata } from 'next';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import ProductGrid from '@/components/product/ProductGrid';
import { getProducts } from '@/lib/services/productService';
import Link from 'next/link';
import { Sparkles, Layers, SlidersHorizontal } from 'lucide-react';

export const metadata: Metadata = {
  title: 'All Collections & Vault | ELEGANTSTYLE',
  description:
    'Explore the full catalog of ELEGANTSTYLE: botanical skincare elixirs, silk lip colors, and Florentine leather accessories.',
};

export default function AllCollectionsPage() {
  const allProducts = getProducts();

  const collectionCategories = [
    { label: 'All Creations', href: '/collections', active: true },
    { label: 'Botanical Skincare', href: '/beauty/skin-care', active: false },
    { label: 'Makeup & Lip Colors', href: '/beauty/makeup', active: false },
    { label: 'Hair Care', href: '/beauty/hair-care', active: false },
    { label: 'Calfskin Belts', href: '/fashion/belts', active: false },
    { label: 'Saddle Wallets', href: '/fashion/wallets', active: false },
    { label: 'Hand Bags', href: '/fashion/hand-bags', active: false },
    { label: 'Curated Privileges', href: '/deals', active: false },
  ];

  return (
    <div className="bg-[#FFFFFF] min-h-screen pb-24 font-sans">
      {/* Hero Header */}
      <div className="bg-[#FCFAF9] border-b border-[#ECE7E6] py-14 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'All Collections' }]} />
          
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-[#F4F6EE] border border-[#D0D9C0] text-[#6B7C52] text-[10px] uppercase tracking-widest font-mono">
              <Sparkles className="w-3.5 h-3.5 text-[#6B7C52]" />
              <span>Full Maison Catalog</span>
            </div>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-light text-[#171515] tracking-tight">
              All Collections
            </h1>
            <p className="text-xs sm:text-sm text-[#6E6767] font-light leading-relaxed max-w-2xl">
              Immerse yourself in our complete universe of organic bio-fermented skincare, Paris lip pigments, and Florentine hand-buffed leather creations. Every creation is crafted to endure.
            </p>
          </div>

          {/* Quick Sub-collection filters */}
          <div className="pt-6 flex flex-wrap items-center gap-2 text-xs">
            {collectionCategories.map((cat, idx) => (
              <Link
                key={idx}
                href={cat.href}
                className={`px-4 py-2 uppercase tracking-wider text-[11px] rounded transition-all border ${
                  cat.active
                    ? 'bg-[#171515] text-[#FCFAF9] border-[#171515] shadow-xs'
                    : 'bg-[#FFFFFF] text-[#292526] border-[#ECE7E6] hover:border-[#6B7C52] hover:text-[#6B7C52]'
                }`}
              >
                {cat.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Main Products Grid Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="flex items-center justify-between pb-6 border-b border-[#ECE7E6] mb-8">
          <span className="text-xs text-[#6E6767] font-mono">
            Showing all {allProducts.length} archival creations
          </span>
          <div className="flex items-center gap-2 text-xs text-[#6B7C52] font-mono">
            <Layers className="w-3.5 h-3.5" />
            <span>Curated Inventory</span>
          </div>
        </div>

        <ProductGrid products={allProducts} />
      </div>
    </div>
  );
}
