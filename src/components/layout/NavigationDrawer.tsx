'use client';

import React from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Search, Heart, User, ShoppingBag, ArrowRight } from 'lucide-react';
import { useUI } from '@/lib/context/UIContext';
import { useCart } from '@/lib/context/CartContext';
import { useWishlist } from '@/lib/context/WishlistContext';

export default function NavigationDrawer() {
  const { isMobileNavOpen, closeMobileNav, openSearch, openCart } = useUI();
  const { itemCount } = useCart();
  const { wishlistCount } = useWishlist();

  return (
    <AnimatePresence>
      {isMobileNavOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeMobileNav}
            className="fixed inset-0 z-50 bg-[#171515]/40 backdrop-blur-xs"
          />

          {/* Drawer Panel */}
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed top-0 left-0 bottom-0 z-50 w-full max-w-sm bg-[#FCFAF9] text-[#171515] border-r border-[#ECE7E6] flex flex-col justify-between p-6 sm:p-8 overflow-y-auto"
          >
            {/* Header */}
            <div>
              <div className="flex items-center justify-between border-b border-[#ECE7E6] pb-5 mb-8">
                <div className="flex flex-col">
                  <span className="font-serif text-lg tracking-[0.2em] font-light uppercase">
                    ELEGANTSTYLE
                  </span>
                  <span className="text-[9px] tracking-[0.3em] text-[#6E6767] uppercase font-sans font-light">
                    LUXURY BEAUTY & FASHION
                  </span>
                </div>
                <button
                  onClick={closeMobileNav}
                  className="p-2 -mr-2 text-[#171515] hover:text-[#6E6767] transition-colors"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5 stroke-[1.5]" />
                </button>
              </div>

              {/* Navigation Links */}
              <nav className="space-y-6 font-serif text-2xl font-light text-[#171515]">
                <div className="space-y-3">
                  <span className="block text-[10px] font-sans font-medium tracking-[0.25em] text-[#6E6767] uppercase mb-2">
                    MAIN COLLECTIONS
                  </span>
                  <Link
                    href="/beauty"
                    onClick={closeMobileNav}
                    className="flex items-center justify-between py-1 group"
                  >
                    <span>Beauty & Cosmetics</span>
                    <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-[#C58C97]" />
                  </Link>
                  <div className="pl-4 space-y-2 text-sm font-sans text-[#6E6767]">
                    <Link
                      href="/beauty/makeup"
                      onClick={closeMobileNav}
                      className="block hover:text-[#171515] transition-colors"
                    >
                      Makeup & Lip Colors
                    </Link>
                    <Link
                      href="/beauty/skin-care"
                      onClick={closeMobileNav}
                      className="block hover:text-[#171515] transition-colors"
                    >
                      Botanical Skin Care
                    </Link>
                    <Link
                      href="/beauty/hair-care"
                      onClick={closeMobileNav}
                      className="block hover:text-[#171515] transition-colors"
                    >
                      Nourishing Hair Care
                    </Link>
                  </div>

                  <Link
                    href="/fashion"
                    onClick={closeMobileNav}
                    className="flex items-center justify-between py-1 group pt-4"
                  >
                    <span>Fashion & Style</span>
                    <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-[#C58C97]" />
                  </Link>
                  <div className="pl-4 space-y-2 text-sm font-sans text-[#6E6767]">
                    <Link
                      href="/fashion/belts"
                      onClick={closeMobileNav}
                      className="block hover:text-[#171515] transition-colors"
                    >
                      Italian Calfskin Belts
                    </Link>
                    <Link
                      href="/fashion/wallets"
                      onClick={closeMobileNav}
                      className="block hover:text-[#171515] transition-colors"
                    >
                      Saddle Leather Wallets
                    </Link>
                  </div>
                </div>

                <div className="pt-6 border-t border-[#ECE7E6] space-y-3">
                  <span className="block text-[10px] font-sans font-medium tracking-[0.25em] text-[#6E6767] uppercase mb-2">
                    SHOP BY AUDIENCE
                  </span>
                  <Link
                    href="/women"
                    onClick={closeMobileNav}
                    className="block hover:text-[#C58C97] transition-colors text-xl"
                  >
                    Women Collection
                  </Link>
                  <Link
                    href="/men"
                    onClick={closeMobileNav}
                    className="block hover:text-[#C58C97] transition-colors text-xl"
                  >
                    Men Collection
                  </Link>
                  <Link
                    href="/children"
                    onClick={closeMobileNav}
                    className="block hover:text-[#C58C97] transition-colors text-xl"
                  >
                    Children Care
                  </Link>
                </div>

                <div className="pt-6 border-t border-[#ECE7E6] space-y-2 text-base font-sans font-light">
                  <Link
                    href="/journal"
                    onClick={closeMobileNav}
                    className="block hover:text-[#C58C97] transition-colors"
                  >
                    Maison Journal
                  </Link>
                  <Link
                    href="/wishlist"
                    onClick={closeMobileNav}
                    className="flex items-center justify-between hover:text-[#C58C97] transition-colors"
                  >
                    <span>Wishlist</span>
                    <span className="text-xs bg-[#F8E8EA] px-2 py-0.5 rounded-full">{wishlistCount}</span>
                  </Link>
                </div>
              </nav>
            </div>

            {/* Footer Quick Action Bar */}
            <div className="pt-8 border-t border-[#ECE7E6] space-y-4">
              <div className="grid grid-cols-2 gap-3 text-xs font-sans uppercase tracking-widest text-[#6E6767]">
                <button
                  onClick={() => {
                    closeMobileNav();
                    openSearch();
                  }}
                  className="flex items-center justify-center gap-2 p-3 bg-[#FFFFFF] border border-[#ECE7E6] hover:bg-[#F8F5F4] transition-colors"
                >
                  <Search className="w-3.5 h-3.5" />
                  Search
                </button>
                <button
                  onClick={() => {
                    closeMobileNav();
                    openCart();
                  }}
                  className="flex items-center justify-center gap-2 p-3 bg-[#171515] text-[#FCFAF9] hover:bg-[#292526] transition-colors"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  Bag ({itemCount})
                </button>
              </div>

              <p className="text-[10px] text-[#6E6767] font-sans text-center tracking-wider">
                © 2026 ELEGANTSTYLE. ALL RIGHTS RESERVED.
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
