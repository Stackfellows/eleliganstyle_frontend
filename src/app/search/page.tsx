import React from 'react';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import ProductGrid from '@/components/product/ProductGrid';
import { searchProducts } from '@/lib/services/productService';

interface SearchPageProps {
  searchParams: Promise<{
    q?: string;
  }>;
}

export async function generateMetadata({ searchParams }: SearchPageProps) {
  const { q } = await searchParams;
  return {
    title: q ? `Search results for "${q}" | ELEGANTSTYLE` : 'Search | ELEGANTSTYLE',
  };
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q } = await searchParams;
  const query = q || '';
  const results = searchProducts(query, 20);

  return (
    <div className="bg-[#FFFFFF] min-h-screen pb-24 font-sans">
      <div className="bg-[#FCFAF9] border-b border-[#ECE7E6] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <Breadcrumbs items={[{ label: 'Search Results' }]} />
          <h1 className="font-serif text-3xl sm:text-4xl font-light text-[#171515]">
            Search Results {query && `for "${query}"`}
          </h1>
          <p className="text-xs text-[#6E6767] font-light">
            Showing {results.length} formulation & leather accessory matches.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <ProductGrid products={results} showFilters={true} />
      </div>
    </div>
  );
}
