'use client';

import React from 'react';
import { Product } from '@/lib/types';
import ProductCard from './ProductCard';

export default function RelatedProducts({ products }: { products: Product[] }) {
  if (products.length === 0) return null;

  return (
    <div className="space-y-8">
      <div className="space-y-1">
        <span className="text-[10px] uppercase tracking-[0.3em] text-[#6E6767] font-sans font-medium">
          COMPLEMENTARY RITUALS
        </span>
        <h3 className="font-serif text-2xl sm:text-3xl font-light text-[#171515]">
          You May Also Admire
        </h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}
