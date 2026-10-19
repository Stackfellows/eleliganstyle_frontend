'use client';

import React from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Search, Heart, User, ShoppingBag, ArrowRight, Sparkles, Truck, MessageSquare } from 'lucide-react';
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
              <div className="flex items-center justify-between border-b border-[#ECE7E6] pb-5 mb-6">
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
                {/* DEALS & DISCOUNTS SECTION */}
                <div className="p-4 bg-[#171515] text-[#FCFAF9] space-y-3">
                  <div className="flex items-center justify-between text-[#E9C9CE]">
                    <span className="text-[10px] font-sans font-medium tracking-[0.25em] uppercase flex items-center gap-1.5">
                      <Sparkles className="w-3 h-3 text-[#E9C9CE]" />
                      Deals & Discounts
                    </span>
                    <span className="text-[9px] font-sans uppercase">Save 35%</span>
                  </div>
                  <div className="space-y-2 text-sm font-sans">
                    <Link
                      href="/deals/bridal-makeup-deals"
                      onClick={closeMobileNav}
                      className="block text-[#FCFAF9] hover:text-[#E9C9CE] transition-colors"
                    >
                      Bridal Makeup Deals
                    </Link>
                    <Link
                      href="/deals/party-makeup-deals"
                      onClick={closeMobileNav}
                      className="block text-[#FCFAF9] hover:text-[#E9C9CE] transition-colors"
                    >
                      Party Makeup Deals
                    </Link>
                    <Link
                      href="/deals/makeup-deals"
                      onClick={closeMobileNav}
                      className="block text-[#FCFAF9] hover:text-[#E9C9CE] transition-colors"
                    >
                      Makeup Deals
                    </Link>
                  </div>
                </div>

                {/* CATEGORIES */}
                <div className="space-y-3">
                  <span className="block text-[10px] font-sans font-medium tracking-[0.25em] text-[#6E6767] uppercase mb-2">
                    COLLECTIONS & SUITES
                  </span>

                  <div className="pl-1 space-y-2.5 text-base font-sans text-[#292526]">
                    <Link
                      href="/beauty/makeup"
                      onClick={closeMobileNav}
                      className="flex items-center justify-between hover:text-[#C58C97] transition-colors py-1 border-b border-[#ECE7E6]/50"
                    >
                      <span>Makeup</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#C58C97]" />
                    </Link>

                    <Link
                      href="/beauty/skin-care"
                      onClick={closeMobileNav}
                      className="flex items-center justify-between hover:text-[#C58C97] transition-colors py-1 border-b border-[#ECE7E6]/50"
                    >
                      <span>Skincare</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#C58C97]" />
                    </Link>

                    <Link
                      href="/fashion/belts"
                      onClick={closeMobileNav}
                      className="flex items-center justify-between hover:text-[#C58C97] transition-colors py-1 border-b border-[#ECE7E6]/50"
                    >
                      <span>Belts</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#C58C97]" />
                    </Link>

                    <Link
                      href="/fashion/hand-bags"
                      onClick={closeMobileNav}
                      className="flex items-center justify-between hover:text-[#C58C97] transition-colors py-1 border-b border-[#ECE7E6]/50"
                    >
                      <span>Hand Bags</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#C58C97]" />
                    </Link>

                    <Link
                      href="/fashion/wallets"
                      onClick={closeMobileNav}
                      className="flex items-center justify-between hover:text-[#C58C97] transition-colors py-1 border-b border-[#ECE7E6]/50"
                    >
                      <span>Wallets</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#C58C97]" />
                    </Link>

                    <Link
                      href="/fashion/school-belts"
                      onClick={closeMobileNav}
                      className="flex items-center justify-between hover:text-[#C58C97] transition-colors py-1 border-b border-[#ECE7E6]/50"
                    >
                      <span>School Belts</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#C58C97]" />
                    </Link>
                  </div>
                </div>

                {/* REVIEWS & SUGGESTIONS */}
                <div className="pt-4 border-t border-[#ECE7E6] space-y-2.5">
                  <span className="block text-[10px] font-sans font-medium tracking-[0.25em] text-[#6E6767] uppercase mb-1">
                    REVIEWS & SUGGESTIONS
                  </span>
                  <div className="pl-1 space-y-2 text-sm font-sans text-[#6E6767]">
                    <Link
                      href="/delivery-period"
                      onClick={closeMobileNav}
                      className="block hover:text-[#171515] transition-colors"
                    >
                      Delivery Period
                    </Link>
                    <Link
                      href="/return-policy"
                      onClick={closeMobileNav}
                      className="block hover:text-[#171515] transition-colors"
                    >
                      Return Policy
                    </Link>
                    <Link
                      href="/reviews-suggestions"
                      onClick={closeMobileNav}
                      className="block hover:text-[#171515] transition-colors"
                    >
                      Feedback & Suggestions
                    </Link>
                  </div>
                </div>

                {/* UTILITY QUICK LINKS */}
                <div className="pt-4 border-t border-[#ECE7E6] space-y-2.5">
                  <span className="block text-[10px] font-sans font-medium tracking-[0.25em] text-[#6E6767] uppercase mb-1">
                    CLIENT CARE
                  </span>
                  <div className="pl-1 space-y-2 text-sm font-sans text-[#171515]">
                    <Link
                      href="/track-order"
                      onClick={closeMobileNav}
                      className="flex items-center gap-2 hover:text-[#C58C97] transition-colors"
                    >
                      <Truck className="w-3.5 h-3.5 text-[#C58C97]" />
                      <span>Track Your Order</span>
                    </Link>
                    <Link
                      href="/contact"
                      onClick={closeMobileNav}
                      className="flex items-center gap-2 hover:text-[#C58C97] transition-colors"
                    >
                      <MessageSquare className="w-3.5 h-3.5 text-[#C58C97]" />
                      <span>Contact Us</span>
                    </Link>
                    <Link
                      href="/login"
                      onClick={closeMobileNav}
                      className="flex items-center gap-2 hover:text-[#C58C97] transition-colors text-[#C58C97] font-medium"
                    >
                      <User className="w-3.5 h-3.5 text-[#C58C97]" />
                      <span>VIP Member Access ID</span>
                    </Link>
                  </div>
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
