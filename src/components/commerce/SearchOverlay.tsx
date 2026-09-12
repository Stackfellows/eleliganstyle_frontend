'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, ArrowRight, Sparkles } from 'lucide-react';
import { useUI } from '@/lib/context/UIContext';
import { searchProducts } from '@/lib/services/productService';
import { Product } from '@/lib/types';
import { formatPrice } from '@/lib/utils';

const POPULAR_SEARCHES = [
  'Hydrating Nectar',
  'Rose Satin Lipstick',
  'Calfskin Belt',
  'Saddle Wallet',
  'Baby Balm',
  'Botanical Cream',
];

export default function SearchOverlay() {
  const { isSearchOpen, closeSearch } = useUI();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Product[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    const timer = setTimeout(() => {
      const res = searchProducts(query);
      setResults(res);
      setIsSearching(false);
    }, 250);

    return () => clearTimeout(timer);
  }, [query]);

  return (
    <AnimatePresence>
      {isSearchOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-[#171515]/70 backdrop-blur-sm flex flex-col justify-start p-4 sm:p-8"
        >
          <div className="max-w-4xl mx-auto w-full bg-[#FFFFFF] border border-[#ECE7E6] shadow-2xl overflow-hidden mt-6 sm:mt-12 flex flex-col max-h-[85vh]">
            {/* Search Input Bar */}
            <div className="p-6 border-b border-[#ECE7E6] flex items-center gap-4 bg-[#FCFAF9]">
              <Search className="w-5 h-5 text-[#6E6767]" />
              <input
                type="text"
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search formulations, leather goods, lipstick shades..."
                className="flex-1 bg-transparent text-[#171515] placeholder-[#6E6767] text-base sm:text-lg font-serif font-light focus:outline-none"
              />
              {query && (
                <button
                  onClick={() => setQuery('')}
                  className="text-xs text-[#6E6767] hover:text-[#171515] uppercase tracking-widest"
                >
                  Clear
                </button>
              )}
              <button
                onClick={closeSearch}
                className="p-2 text-[#171515] hover:text-[#6E6767] transition-colors"
                aria-label="Close search"
              >
                <X className="w-5 h-5 stroke-[1.5]" />
              </button>
            </div>

            {/* Content Body */}
            <div className="p-6 overflow-y-auto flex-1 space-y-8">
              {/* Query is empty: Show suggestions */}
              {!query.trim() && (
                <div className="space-y-6">
                  <div>
                    <span className="text-[10px] uppercase tracking-[0.25em] text-[#6E6767] font-sans font-medium block mb-3">
                      POPULAR SEARCH QUERIES
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {POPULAR_SEARCHES.map((term) => (
                        <button
                          key={term}
                          onClick={() => setQuery(term)}
                          className="bg-[#FCFAF9] border border-[#ECE7E6] text-[#171515] text-xs py-2 px-4 hover:border-[#171515] transition-colors font-sans"
                        >
                          {term}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-[#ECE7E6]">
                    <span className="text-[10px] uppercase tracking-[0.25em] text-[#6E6767] font-sans font-medium block mb-3">
                      MAIN CATEGORIES
                    </span>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-sans">
                      <Link
                        href="/beauty/skin-care"
                        onClick={closeSearch}
                        className="p-4 bg-[#F8F5F4] border border-[#ECE7E6] hover:bg-[#F8E8EA] transition-colors font-medium text-[#171515]"
                      >
                        Botanical Skin Care
                      </Link>
                      <Link
                        href="/beauty/makeup"
                        onClick={closeSearch}
                        className="p-4 bg-[#F8F5F4] border border-[#ECE7E6] hover:bg-[#F8E8EA] transition-colors font-medium text-[#171515]"
                      >
                        Silk Makeup
                      </Link>
                      <Link
                        href="/fashion/belts"
                        onClick={closeSearch}
                        className="p-4 bg-[#F8F5F4] border border-[#ECE7E6] hover:bg-[#F8E8EA] transition-colors font-medium text-[#171515]"
                      >
                        Calfskin Belts
                      </Link>
                      <Link
                        href="/fashion/wallets"
                        onClick={closeSearch}
                        className="p-4 bg-[#F8F5F4] border border-[#ECE7E6] hover:bg-[#F8E8EA] transition-colors font-medium text-[#171515]"
                      >
                        Saddle Wallets
                      </Link>
                    </div>
                  </div>
                </div>
              )}

              {/* Active Search Loader */}
              {isSearching && (
                <div className="py-12 text-center text-xs text-[#6E6767] tracking-widest uppercase font-sans flex items-center justify-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#C58C97] animate-spin" />
                  <span>Searching ElegantStyle Vault...</span>
                </div>
              )}

              {/* Results grid */}
              {!isSearching && query.trim() && (
                <div>
                  <div className="flex items-center justify-between pb-4 border-b border-[#ECE7E6] mb-6">
                    <span className="text-xs uppercase tracking-widest text-[#6E6767] font-sans">
                      Matching Products ({results.length})
                    </span>
                    {results.length > 0 && (
                      <Link
                        href={`/search?q=${encodeURIComponent(query)}`}
                        onClick={closeSearch}
                        className="text-xs text-[#171515] underline flex items-center gap-1 font-sans"
                      >
                        View Full Results Page <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    )}
                  </div>

                  {results.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                      {results.map((product) => (
                        <Link
                          key={product.id}
                          href={`/product/${product.slug}`}
                          onClick={closeSearch}
                          className="flex gap-3 p-2 border border-[#ECE7E6] hover:border-[#171515] transition-colors group bg-[#FFFFFF]"
                        >
                          <div className="w-16 h-20 relative bg-[#F8F5F4] flex-shrink-0">
                            <Image
                              src={product.images[0]}
                              alt={product.name}
                              fill
                              className="object-cover"
                              sizes="64px"
                            />
                          </div>
                          <div className="flex-1 flex flex-col justify-center">
                            <h5 className="font-serif text-sm font-light text-[#171515] group-hover:text-[#C58C97] transition-colors line-clamp-1">
                              {product.name}
                            </h5>
                            <span className="text-[10px] text-[#6E6767] uppercase font-sans block">
                              {product.subcategory}
                            </span>
                            <span className="text-xs font-medium text-[#171515] font-sans mt-1">
                              {formatPrice(product.price)}
                            </span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <div className="py-12 text-center space-y-3">
                      <p className="font-serif text-lg text-[#171515]">
                        No formulations or leather goods match "{query}"
                      </p>
                      <p className="text-xs text-[#6E6767] font-sans">
                        Try searching for "Nectar", "Lipstick", "Belt", "Wallet", or "Care".
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
