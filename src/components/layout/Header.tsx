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

  if (pathname?.startsWith('/admin')) return null;

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
        <div className="flex items-center shrink-0">
          <Link
            href="/"
            className="group flex flex-col items-center lg:items-start tracking-[0.2em] text-[#171515]"
          >
            <span className="font-serif text-lg sm:text-xl font-light uppercase tracking-[0.18em] transition-opacity group-hover:opacity-80 leading-tight">
              ELEGANTSTYLE
            </span>
            <span className="text-[8px] sm:text-[8.5px] tracking-[0.28em] text-[#6E6767] uppercase font-sans font-light">
              LUXURY BEAUTY & FASHION
            </span>
          </Link>
        </div>

        {/* Center / Nav Items (Desktop) */}
        <nav className="hidden lg:flex items-center gap-3.5 xl:gap-6 text-[11px] xl:text-xs uppercase tracking-[0.12em] xl:tracking-[0.16em] font-sans text-[#171515] whitespace-nowrap">
          {/* Deals & Discounts Dropdown */}
          <div
            className="relative py-2 group"
            onMouseEnter={() => setActiveDropdown('deals')}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <Link
              href="/deals"
              className={`flex items-center gap-1 transition-colors hover:text-[#C58C97] py-1 text-[#171515] font-medium ${
                pathname.startsWith('/deals') ? 'border-b border-[#171515] pb-0.5 text-[#C58C97]' : ''
              }`}
            >
              <span className="text-[#C58C97] font-semibold">Deals & Discounts</span>
              <ChevronDown className="w-3 h-3 text-[#C58C97] transition-transform duration-200 group-hover:rotate-180" />
            </Link>

            {activeDropdown === 'deals' && (
              <div className="absolute top-full left-0 w-72 bg-[#FFFFFF] border border-[#ECE7E6] shadow-xl p-6 space-y-4 animate-in fade-in slide-in-from-top-2 duration-200 z-50">
                <div className="text-[10px] text-[#C58C97] tracking-widest border-b border-[#ECE7E6] pb-2 font-medium flex items-center justify-between">
                  <span>CURATED SUITES</span>
                  <span>SAVE UP TO 35%</span>
                </div>
                <ul className="space-y-3 font-normal normal-case text-sm text-[#292526]">
                  <li>
                    <Link
                      href="/deals/bridal-makeup-deals"
                      className="hover:text-[#C58C97] transition-colors block py-0.5 font-serif"
                    >
                      Bridal Makeup Deals
                      <span className="block text-[10px] font-sans text-[#6E6767]">Save 35% on full wedding bridal suites</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/deals/party-makeup-deals"
                      className="hover:text-[#C58C97] transition-colors block py-0.5 font-serif"
                    >
                      Party Makeup Deals
                      <span className="block text-[10px] font-sans text-[#6E6767]">High-glamour nocturnal soirée sets</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/deals/makeup-deals"
                      className="hover:text-[#C58C97] transition-colors block py-0.5 font-serif"
                    >
                      Makeup Deals
                      <span className="block text-[10px] font-sans text-[#6E6767]">Parisian silk lip & skin fluid bundles</span>
                    </Link>
                  </li>
                </ul>
                <div className="pt-2 border-t border-[#ECE7E6]">
                  <Link
                    href="/deals"
                    className="text-[11px] uppercase tracking-widest text-[#171515] hover:text-[#C58C97] transition-colors font-medium flex items-center justify-between"
                  >
                    <span>View All Privileges</span>
                    <span>→</span>
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Beauty Category Dropdown */}
          <div
            className="relative py-2 group"
            onMouseEnter={() => setActiveDropdown('beauty')}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <Link
              href="/beauty"
              className={`flex items-center gap-1 transition-colors hover:text-[#6E6767] py-1 ${
                pathname.startsWith('/beauty') || pathname.startsWith('/makeup') || pathname.startsWith('/skincare') ? 'border-b border-[#171515] pb-0.5' : ''
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
                pathname.startsWith('/fashion') || pathname.startsWith('/belts') || pathname.startsWith('/hand-bags') || pathname.startsWith('/wallets') ? 'border-b border-[#171515] pb-0.5' : ''
              }`}
            >
              Fashion & Style
              <ChevronDown className="w-3 h-3 text-[#6E6767] transition-transform duration-200 group-hover:rotate-180" />
            </Link>

            {activeDropdown === 'fashion' && (
              <div className="absolute top-full left-0 w-64 bg-[#FFFFFF] border border-[#ECE7E6] shadow-lg p-6 space-y-4 animate-in fade-in slide-in-from-top-2 duration-200 z-50">
                <div className="text-[10px] text-[#6E6767] tracking-widest border-b border-[#ECE7E6] pb-2 font-medium">
                  LEATHER GOODS & ACCESSORIES
                </div>
                <ul className="space-y-3 font-normal normal-case text-sm text-[#292526]">
                  <li>
                    <Link
                      href="/fashion/belts"
                      className="hover:text-[#C58C97] transition-colors block py-0.5"
                    >
                      Calfskin Belts
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
                  <li>
                    <Link
                      href="/fashion/hand-bags"
                      className="hover:text-[#C58C97] transition-colors block py-0.5"
                    >
                      Hand Bags & Totes
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/fashion/school-belts"
                      className="hover:text-[#C58C97] transition-colors block py-0.5"
                    >
                      Academy School Belts
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

          {/* Reviews & Suggestions Link */}
          <Link
            href="/reviews-suggestions"
            className={`transition-colors hover:text-[#6E6767] py-1 ${
              pathname.startsWith('/reviews-suggestions') ? 'border-b border-[#171515] pb-0.5' : ''
            }`}
          >
            Reviews & Suggestions
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
