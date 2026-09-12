'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search, ShoppingBag, Heart, User, Menu, ChevronDown } from 'lucide-react';
import { useCart } from '@/lib/context/CartContext';
import { useWishlist } from '@/lib/context/WishlistContext';
import { useUI } from '@/lib/context/UIContext';
import { CATEGORIES, AUDIENCE_SECTIONS } from '@/lib/data/categories';

export default function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const { itemCount } = useCart();
  const { wishlistCount } = useWishlist();
  const { openCart, openSearch, openMobileNav } = useUI();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        isScrolled
          ? 'bg-[#FFFFFF]/95 backdrop-blur-md border-b border-[#ECE7E6] py-3 shadow-xs'
          : 'bg-[#FCFAF9] border-b border-[#ECE7E6]/60 py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Mobile menu trigger */}
        <div className="flex items-center lg:hidden">
          <button
            onClick={openMobileNav}
            className="p-2 -ml-2 text-[#171515] hover:text-[#6E6767] transition-colors focus:outline-none"
            aria-label="Open mobile navigation menu"
          >
            <Menu className="w-5 h-5 stroke-[1.5]" />
          </button>
        </div>

        {/* Left / Logo */}
        <div className="flex items-center gap-8">
          <Link
            href="/"
            className="group flex flex-col items-center lg:items-start tracking-[0.25em] text-[#171515]"
          >
            <span className="font-serif text-xl sm:text-2xl font-light uppercase tracking-[0.2em] transition-opacity group-hover:opacity-80">
              ELEGANTSTYLE
            </span>
            <span className="text-[9px] tracking-[0.35em] text-[#6E6767] uppercase font-sans -mt-1 font-light">
              LUXURY BEAUTY & FASHION
            </span>
          </Link>
        </div>

        {/* Center / Nav Items (Desktop) */}
        <nav className="hidden lg:flex items-center gap-8 text-xs uppercase tracking-[0.18em] font-sans text-[#171515]">
          {/* Beauty Category Dropdown */}
          <div
            className="relative py-2 group"
            onMouseEnter={() => setActiveDropdown('beauty')}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <Link
              href="/beauty"
              className={`flex items-center gap-1 transition-colors hover:text-[#6E6767] py-1 ${
                pathname.startsWith('/beauty') ? 'border-b border-[#171515] pb-0.5' : ''
              }`}
            >
              Beauty & Cosmetics
              <ChevronDown className="w-3 h-3 text-[#6E6767] transition-transform duration-200 group-hover:rotate-180" />
            </Link>

            {/* Mega Dropdown */}
            {activeDropdown === 'beauty' && (
              <div className="absolute top-full left-0 w-64 bg-[#FFFFFF] border border-[#ECE7E6] shadow-lg p-6 space-y-4 animate-in fade-in slide-in-from-top-2 duration-200 z-50">
                <div className="text-[10px] text-[#6E6767] tracking-widest border-b border-[#ECE7E6] pb-2 font-medium">
                  CATEGORIES
                </div>
                <ul className="space-y-3 font-normal normal-case text-sm text-[#292526]">
                  <li>
                    <Link
                      href="/beauty/makeup"
                      className="hover:text-[#C58C97] transition-colors block py-0.5"
                    >
                      Makeup & Lip Colors
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/beauty/skin-care"
                      className="hover:text-[#C58C97] transition-colors block py-0.5"
                    >
                      Botanical Skin Care
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/beauty/hair-care"
                      className="hover:text-[#C58C97] transition-colors block py-0.5"
                    >
                      Nourishing Hair Care
                    </Link>
                  </li>
                </ul>
              </div>
            )}
          </div>

          {/* Fashion Category Dropdown */}
          <div
            className="relative py-2 group"
            onMouseEnter={() => setActiveDropdown('fashion')}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <Link
              href="/fashion"
              className={`flex items-center gap-1 transition-colors hover:text-[#6E6767] py-1 ${
                pathname.startsWith('/fashion') ? 'border-b border-[#171515] pb-0.5' : ''
              }`}
            >
              Fashion & Style
              <ChevronDown className="w-3 h-3 text-[#6E6767] transition-transform duration-200 group-hover:rotate-180" />
            </Link>

            {activeDropdown === 'fashion' && (
              <div className="absolute top-full left-0 w-64 bg-[#FFFFFF] border border-[#ECE7E6] shadow-lg p-6 space-y-4 animate-in fade-in slide-in-from-top-2 duration-200 z-50">
                <div className="text-[10px] text-[#6E6767] tracking-widest border-b border-[#ECE7E6] pb-2 font-medium">
                  LEATHER GOODS
                </div>
                <ul className="space-y-3 font-normal normal-case text-sm text-[#292526]">
                  <li>
                    <Link
                      href="/fashion/belts"
                      className="hover:text-[#C58C97] transition-colors block py-0.5"
                    >
                      Italian Calfskin Belts
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/fashion/wallets"
                      className="hover:text-[#C58C97] transition-colors block py-0.5"
                    >
                      Saddle Leather Wallets
                    </Link>
                  </li>
                </ul>
              </div>
            )}
          </div>

          {/* Audiences */}
          <Link
            href="/women"
            className={`transition-colors hover:text-[#6E6767] py-1 ${
              pathname.startsWith('/women') ? 'border-b border-[#171515] pb-0.5' : ''
            }`}
          >
            Women
          </Link>

          <Link
            href="/men"
            className={`transition-colors hover:text-[#6E6767] py-1 ${
              pathname.startsWith('/men') ? 'border-b border-[#171515] pb-0.5' : ''
            }`}
          >
            Men
          </Link>

          <Link
            href="/children"
            className={`transition-colors hover:text-[#6E6767] py-1 ${
              pathname.startsWith('/children') ? 'border-b border-[#171515] pb-0.5' : ''
            }`}
          >
            Children
          </Link>

          <Link
            href="/journal"
            className={`transition-colors hover:text-[#6E6767] py-1 ${
              pathname.startsWith('/journal') ? 'border-b border-[#171515] pb-0.5' : ''
            }`}
          >
            Journal
          </Link>
        </nav>

        {/* Right / Actions */}
        <div className="flex items-center gap-5 sm:gap-6 text-[#171515]">
          <button
            onClick={openSearch}
            className="p-1.5 hover:text-[#6E6767] transition-colors focus:outline-none"
            aria-label="Search store"
          >
            <Search className="w-4 h-4 stroke-[1.5]" />
          </button>

          <Link
            href="/account"
            className="hidden sm:block p-1.5 hover:text-[#6E6767] transition-colors"
            aria-label="Customer Account"
          >
            <User className="w-4 h-4 stroke-[1.5]" />
          </Link>

          <Link
            href="/wishlist"
            className="relative p-1.5 hover:text-[#6E6767] transition-colors"
            aria-label="Wishlist"
          >
            <Heart className="w-4 h-4 stroke-[1.5]" />
            {wishlistCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#E9C9CE] text-[#171515] text-[9px] font-sans font-medium flex items-center justify-center border border-[#FFFFFF]">
                {wishlistCount}
              </span>
            )}
          </Link>

          <button
            onClick={openCart}
            className="relative p-1.5 hover:text-[#6E6767] transition-colors focus:outline-none flex items-center gap-1.5"
            aria-label={`Shopping bag containing ${itemCount} items`}
          >
            <ShoppingBag className="w-4 h-4 stroke-[1.5]" />
            {itemCount > 0 && (
              <span className="w-4 h-4 rounded-full bg-[#171515] text-[#FCFAF9] text-[9px] font-sans font-medium flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
