import React from 'react';
import { notFound } from 'next/navigation';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import ProductGrid from '@/components/product/ProductGrid';
import { getProducts } from '@/lib/services/productService';
import { SubCategory, MainCategory, Audience } from '@/lib/types';

interface SubcategoryPageProps {
  params: Promise<{
    category: string;
    subcategory: string;
  }>;
}

export async function generateMetadata({ params }: SubcategoryPageProps) {
  const { category, subcategory } = await params;
  const subFormatted = subcategory.replace('-', ' ');
  return {
    title: `${subFormatted.toUpperCase()} — ${category.toUpperCase()} | ELEGANTSTYLE`,
    description: `Shop luxury ${subFormatted} within our ${category} catalog. Organic formulations and handcrafted leather goods.`,
  };
}

export default async function SubcategoryPage({ params }: SubcategoryPageProps) {
  const { category, subcategory } = await params;
  const normalizedSub = subcategory === 'skincare' ? 'skin-care' : subcategory;

  // Fetch products matching category and subcategory
  let products = getProducts({
    subcategory: normalizedSub as SubCategory,
  });

  // Filter further by mainCategory or audience if applicable
  if (['beauty', 'fashion'].includes(category)) {
    products = products.filter((p) => p.mainCategory === category);
  } else if (['women', 'men', 'children'].includes(category)) {
    products = products.filter((p) => p.audience.includes(category as Audience));
  }

  const subFormatted = subcategory.replace('-', ' ');

  const breadcrumbs = [
    { label: category, href: `/${category}` },
    { label: subFormatted },
  ];

  return (
    <div className="bg-[#FFFFFF] min-h-screen pb-24">
      {/* Subcategory Header */}
      <div className="bg-[#FCFAF9] border-b border-[#ECE7E6] py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <Breadcrumbs items={breadcrumbs} />
          <div className="max-w-2xl space-y-2">
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#C58C97] font-sans font-medium">
              CURATED SUITE
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl font-light text-[#171515] capitalize">
              {subFormatted}
            </h1>
            <p className="text-xs sm:text-sm text-[#6E6767] font-sans font-light leading-relaxed">
              Discover our signature selection of {subFormatted} engineered with natural efficacy and refined aesthetics.
            </p>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <ProductGrid products={products} showFilters={true} />
      </div>
    </div>
  );
}
