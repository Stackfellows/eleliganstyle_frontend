'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Clock } from 'lucide-react';
import { JOURNAL_ARTICLES } from '@/lib/data/journal';

export default function JournalTeaser() {
  return (
    <section className="py-24 bg-[#FFFFFF] border-b border-[#ECE7E6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#ECE7E6]">
          <div className="space-y-2">
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#6E6767] font-sans font-medium">
              ELEGANT JOURNAL
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-light text-[#171515]">
              Editorial Chronicles
            </h2>
          </div>
          <Link
            href="/journal"
            className="text-xs text-[#171515] uppercase tracking-widest font-sans underline flex items-center gap-1 hover:text-[#C58C97] transition-colors"
          >
            Read All Chronicles <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {JOURNAL_ARTICLES.map((article) => (
            <Link
              key={article.id}
              href={`/journal/${article.slug}`}
              className="group flex flex-col bg-[#FCFAF9] border border-[#ECE7E6] overflow-hidden hover:border-[#171515] transition-all"
            >
              <div className="relative aspect-16/9 w-full overflow-hidden bg-[#F8F5F4]">
                <Image
                  src={article.coverImage}
                  alt={article.title}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <span className="absolute top-3 left-3 bg-[#171515] text-[#FCFAF9] text-[9px] uppercase tracking-widest px-2.5 py-1 font-sans">
                  {article.category}
                </span>
              </div>

              <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-3 text-[10px] text-[#6E6767] font-sans uppercase tracking-widest">
                    <span>{article.publishedAt}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {article.readTime}
                    </span>
                  </div>

                  <h3 className="font-serif text-xl sm:text-2xl font-light text-[#171515] group-hover:text-[#C58C97] transition-colors">
                    {article.title}
                  </h3>

                  <p className="text-xs text-[#6E6767] font-sans font-light line-clamp-2 leading-relaxed">
                    {article.subtitle}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#ECE7E6] flex items-center justify-between text-xs font-sans text-[#171515] font-medium">
                  <span>Read Article</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
