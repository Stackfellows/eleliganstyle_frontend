import React from 'react';
import { notFound } from 'next/navigation';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import { getProductBySlug, getRelatedProducts } from '@/lib/services/productService';
import ProductGallery from '@/components/product/ProductGallery';
import ProductInfo from '@/components/product/ProductInfo';
import ProductReviews from '@/components/product/ProductReviews';
import RelatedProducts from '@/components/product/RelatedProducts';

interface PDPProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: PDPProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return {
      title: 'Product Not Found | ELEGANTSTYLE',
    };
  }

  return {
    title: `${product.name} — ${product.subtitle}`,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: [{ url: product.images[0] }],
    },
  };
}

export default async function ProductDetailPage({ params }: PDPProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const related = getRelatedProducts(product);

  const breadcrumbs = [
    { label: product.mainCategory, href: `/${product.mainCategory}` },
    { label: product.subcategory.replace('-', ' '), href: `/${product.mainCategory}/${product.subcategory}` },
    { label: product.name },
  ];

  // JSON-LD Product Schema
  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    image: product.images,
    description: product.description,
    sku: product.id,
    brand: {
      '@type': 'Brand',
      name: 'ELEGANTSTYLE',
    },
    offers: {
      '@type': 'Offer',
      priceCurrency: 'USD',
      price: product.price,
      availability: product.inStock
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
      url: `https://elegantstyle.com/product/${product.slug}`,
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: product.rating,
      reviewCount: product.reviewCount,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <div className="bg-[#FFFFFF] min-h-screen pb-24">
        {/* Breadcrumb Header */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-2">
          <Breadcrumbs items={breadcrumbs} />
        </div>

        {/* Main Product Layout */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            {/* Left: Image Gallery */}
            <div className="lg:col-span-7">
              <ProductGallery images={product.images} name={product.name} />
            </div>

            {/* Right: Purchase Info & Details */}
            <div className="lg:col-span-5">
              <ProductInfo product={product} />
            </div>
          </div>
        </div>

        {/* Customer Reviews Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24 pt-16 border-t border-[#ECE7E6]">
          <ProductReviews product={product} />
        </div>

        {/* Algorithmic Related Products */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24 pt-16 border-t border-[#ECE7E6]">
          <RelatedProducts products={related} />
        </div>
      </div>
    </>
  );
}
