'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import ProductGallery from '@/components/product/ProductGallery';
import ProductInfo from '@/components/product/ProductInfo';
import ProductReviews from '@/components/product/ProductReviews';
import RelatedProducts from '@/components/product/RelatedProducts';
import { getStoredProducts } from '@/lib/adminStore';
import { Product } from '@/lib/types';
import { ArrowLeft, Sparkles } from 'lucide-react';

export default function ProductDetailClientFallback({ slug }: { slug: string }) {
  const [mounted, setMounted] = useState(false);
  const [product, setProduct] = useState<Product | null>(null);
  const [related, setRelated] = useState<Product[]>([]);

  useEffect(() => {
    setMounted(true);
    const stored = getStoredProducts();
    const found = stored.find((p) => p.slug === slug || p.id === slug);
    if (found) {
      setProduct(found);
      const rel = stored.filter(
        (p) => p.id !== found.id && (p.subcategory === found.subcategory || p.mainCategory === found.mainCategory)
      ).slice(0, 4);
      setRelated(rel);
    }
  }, [slug]);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-[#FFFFFF] py-24 flex items-center justify-center">
        <div className="font-serif text-lg text-[#171515] animate-pulse">Loading Luxury Creation...</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-[#FCFAF9] py-24 flex flex-col items-center justify-center px-4 text-center">
        <div className="p-3 bg-[#E9C9CE]/30 rounded-full mb-4">
          <Sparkles className="w-6 h-6 text-[#171515]" />
        </div>
        <h1 className="font-serif text-3xl text-[#171515] mb-2">Product Not Found</h1>
        <p className="text-xs text-[#6E6767] max-w-md mb-6 leading-relaxed">
          The requested creation &ldquo;{slug}&rdquo; is currently not active in our catalogue.
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
    { label: product.mainCategory, href: `/${product.mainCategory}` },
    { label: product.subcategory.replace('-', ' '), href: `/${product.mainCategory}/${product.subcategory}` },
    { label: product.name },
  ];

  return (
    <div className="bg-[#FFFFFF] min-h-screen pb-24 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Breadcrumbs items={breadcrumbs} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          <div className="lg:col-span-7">
            <ProductGallery images={product.images} name={product.name} />
          </div>

          <div className="lg:col-span-5">
            <ProductInfo product={product} />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-[#ECE7E6] pt-16">
        <ProductReviews product={product} />
      </div>

      {related.length > 0 && (
        <div className="border-t border-[#ECE7E6] mt-16">
          <RelatedProducts products={related} />
        </div>
      )}
    </div>
  );
}

