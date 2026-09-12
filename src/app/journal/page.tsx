import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import { JOURNAL_ARTICLES } from '@/lib/data/journal';
import { Clock, ArrowRight } from 'lucide-react';

export const metadata = {
  title: 'ElegantStyle Journal — Botanical Skincare & Florentine Craft',
  description: 'Editorial guides, skincare rituals, and leather care chronicles from ElegantStyle.',
};

export default function JournalPage() {
  return (
    <div className="bg-[#FFFFFF] min-h-screen pb-24 font-sans">
      <div className="bg-[#FCFAF9] border-b border-[#ECE7E6] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <Breadcrumbs items={[{ label: 'ElegantStyle Journal' }]} />
          <div className="max-w-2xl space-y-2">
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#C58C97] font-medium">
              EDITORIAL CHRONICLES
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl font-light text-[#171515]">
              ElegantStyle Journal
            </h1>
            <p className="text-xs sm:text-sm text-[#6E6767] font-light leading-relaxed">
              Curated essays on botanical ingredient integrity, cold-pressed formulation rituals, and Florentine saddlery traditions.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {JOURNAL_ARTICLES.map((article) => (
            <Link
              key={article.id}
              href={`/journal/${article.slug}`}
              className="group bg-[#FCFAF9] border border-[#ECE7E6] overflow-hidden hover:border-[#171515] transition-all flex flex-col justify-between"
            >
              <div className="relative aspect-16/9 w-full overflow-hidden bg-[#F8F5F4]">
                <Image
                  src={article.coverImage}
                  alt={article.title}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <span className="absolute top-4 left-4 bg-[#171515] text-[#FCFAF9] text-[9px] uppercase tracking-widest px-3 py-1 font-sans">
                  {article.category}
                </span>
              </div>

              <div className="p-8 space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-[10px] text-[#6E6767] font-sans uppercase tracking-widest">
                    <span>{article.author}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {article.readTime}
                    </span>
                  </div>

                  <h2 className="font-serif text-2xl sm:text-3xl font-light text-[#171515] group-hover:text-[#C58C97] transition-colors leading-tight">
                    {article.title}
                  </h2>

                  <p className="text-xs text-[#6E6767] font-light leading-relaxed">
                    {article.subtitle}
                  </p>
                </div>

                <div className="pt-6 border-t border-[#ECE7E6] flex items-center justify-between text-xs font-medium text-[#171515]">
                  <span>Read Full Essay</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
