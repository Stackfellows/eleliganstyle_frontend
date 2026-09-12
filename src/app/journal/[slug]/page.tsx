import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import { JOURNAL_ARTICLES } from '@/lib/data/journal';
import { getProductBySlug } from '@/lib/services/productService';
import ProductCard from '@/components/product/ProductCard';
import { Clock, ArrowLeft } from 'lucide-react';

interface ArticlePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = JOURNAL_ARTICLES.find((a) => a.slug === slug);
  if (!article) {
    return { title: 'Article Not Found | ELEGANTSTYLE' };
  }
  return {
    title: `${article.title} — ElegantStyle Journal`,
    description: article.subtitle,
  };
}

export default async function ArticleDetailPage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = JOURNAL_ARTICLES.find((a) => a.slug === slug);

  if (!article) {
    notFound();
  }

  const relatedProducts = (article.relatedProductSlugs || [])
    .map((s) => getProductBySlug(s))
    .filter(Boolean);

  const breadcrumbs = [
    { label: 'Journal', href: '/journal' },
    { label: article.title },
  ];

  return (
    <article className="bg-[#FFFFFF] min-h-screen pb-24 font-sans text-[#171515]">
      {/* Article Header */}
      <div className="bg-[#FCFAF9] border-b border-[#ECE7E6] py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-6">
          <Breadcrumbs items={breadcrumbs} />

          <div className="space-y-3">
            <span className="bg-[#171515] text-[#FCFAF9] text-[9px] uppercase tracking-widest px-3 py-1 font-sans">
              {article.category}
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl font-light text-[#171515] leading-tight">
              {article.title}
            </h1>
            <p className="text-sm sm:text-base text-[#6E6767] font-light leading-relaxed">
              {article.subtitle}
            </p>
          </div>

          <div className="flex items-center gap-4 text-xs text-[#6E6767] pt-4 border-t border-[#ECE7E6]">
            <span className="font-medium text-[#171515]">{article.author}</span>
            <span>•</span>
            <span>{article.publishedAt}</span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {article.readTime}
            </span>
          </div>
        </div>
      </div>

      {/* Main Cover Image */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-10">
        <div className="relative aspect-16/9 w-full bg-[#F8F5F4] border border-[#ECE7E6] overflow-hidden">
          <Image
            src={article.coverImage}
            alt={article.title}
            fill
            priority
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 80vw"
          />
        </div>
      </div>

      {/* Article Content */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-12 space-y-8 font-light text-sm sm:text-base leading-relaxed text-[#292526]">
        {article.content.map((block, idx) => {
          if (block.type === 'paragraph') {
            return <p key={idx}>{block.value}</p>;
          }
          if (block.type === 'heading') {
            return (
              <h3 key={idx} className="font-serif text-2xl sm:text-3xl font-light text-[#171515] pt-6">
                {block.value}
              </h3>
            );
          }
          if (block.type === 'shoppable' && block.productSlug) {
            const product = getProductBySlug(block.productSlug);
            if (!product) return null;
            return (
              <div key={idx} className="my-8 p-6 bg-[#FCFAF9] border border-[#ECE7E6] space-y-3">
                <span className="text-[10px] uppercase tracking-widest text-[#C58C97] font-medium block">
                  FEATURED IN THIS ESSAY
                </span>
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <h5 className="font-serif text-lg font-light text-[#171515]">{product.name}</h5>
                    <p className="text-xs text-[#6E6767] font-light">{product.subtitle}</p>
                  </div>
                  <Link
                    href={`/product/${product.slug}`}
                    className="bg-[#171515] text-[#FCFAF9] text-xs uppercase tracking-widest py-2.5 px-6 hover:bg-[#292526] transition-colors"
                  >
                    Discover Formulation
                  </Link>
                </div>
              </div>
            );
          }
          return null;
        })}
      </div>

      {/* Shoppable Products Grid Section */}
      {relatedProducts.length > 0 && (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-16 mt-16 border-t border-[#ECE7E6]">
          <h4 className="font-serif text-2xl font-light text-[#171515] mb-6">
            Featured Products in this Story
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {relatedProducts.map((p) => p && <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      )}
    </article>
  );
}
