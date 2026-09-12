import React from 'react';
import { notFound } from 'next/navigation';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import ProductGrid from '@/components/product/ProductGrid';
import { getProducts } from '@/lib/services/productService';
import { getCategoryBySlug, getAudienceSectionBySlug } from '@/lib/services/categoryService';
import { MainCategory, Audience, Product } from '@/lib/types';

interface PageProps {
  params: Promise<{
    category: string;
  }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { category: slug } = await params;
  const mainCategory = getCategoryBySlug(slug);
  const audience = getAudienceSectionBySlug(slug);

  if (mainCategory) {
    return {
      title: `${mainCategory.name} — Luxury Collection`,
      description: mainCategory.description,
    };
  }

  if (audience) {
    return {
      title: `${audience.name} Line — Curated Elegance`,
      description: audience.description,
    };
  }

  return {
    title: 'Store Collection | ELEGANTSTYLE',
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const { category: slug } = await params;

  const mainCategory = getCategoryBySlug(slug);
  const audience = getAudienceSectionBySlug(slug);

  if (!mainCategory && !audience) {
    notFound();
  }

  let products: Product[] = [];
  let title = '';
  let tagline = '';
  let description = '';

  if (mainCategory) {
    products = getProducts({ mainCategory: slug as MainCategory });
    title = mainCategory.name;
    tagline = mainCategory.tagline;
    description = mainCategory.description;
  } else if (audience) {
    products = getProducts({ audience: slug as Audience });
    title = `${audience.name} Collection`;
    tagline = audience.tagline;
    description = audience.description;
  }

  const breadcrumbs = [
    { label: 'Shop' },
    { label: title },
  ];

  return (
    <div className="bg-[#FFFFFF] min-h-screen pb-24">
      {/* Category Hero Header */}
      <div className="bg-[#FCFAF9] border-b border-[#ECE7E6] py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <Breadcrumbs items={breadcrumbs} />
          <div className="max-w-2xl space-y-2">
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#C58C97] font-sans font-medium">
              {tagline}
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl font-light text-[#171515]">
              {title}
            </h1>
            <p className="text-xs sm:text-sm text-[#6E6767] font-sans font-light leading-relaxed">
              {description}
            </p>
          </div>
        </div>
      </div>

      {/* Main Listing Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <ProductGrid products={products} showFilters={true} />
      </div>

      {/* SEO Information Footer Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24 pt-12 border-t border-[#ECE7E6]">
        <div className="bg-[#FCFAF9] p-8 border border-[#ECE7E6] space-y-4">
          <h3 className="font-serif text-xl text-[#171515]">
            About Our {title} Archives
          </h3>
          <p className="text-xs text-[#6E6767] font-sans font-light leading-relaxed">
            Every creation within the {title} realm is formulated or handcrafted in accordance with stringent European quality principles. Formulated in laboratories in Provence and Florentine leather studios, each piece delivers an unmistakable aura of timeless luxury.
          </p>
        </div>
      </div>
    </div>
  );
}
