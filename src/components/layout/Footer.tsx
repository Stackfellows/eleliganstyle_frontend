'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Check, Sparkles, MapPin, Truck, ShieldCheck, MessageSquare } from 'lucide-react';

import { usePathname } from 'next/navigation';

export default function Footer() {
  const pathname = usePathname();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  if (pathname?.startsWith('/admin')) return null;

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-[#171515] text-[#FCFAF9] font-sans pt-16 pb-12 border-t border-[#292526]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* TOP SECTION: DEALS & DISCOUNTS HIGHLIGHT BANNER */}
        <div className="p-8 sm:p-10 bg-[#211E1F] border border-[#2E2A2B] mb-16 relative overflow-hidden">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 text-[#E9C9CE] text-[10px] tracking-[0.3em] uppercase font-sans font-medium">
                <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                <span>ARCHIVE PRIVILEGES</span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-light text-[#FFFFFF] tracking-wide">
                Deals & Discounts
              </h3>
              <p className="text-xs text-[#A8A19F] max-w-md font-light leading-relaxed">
                Curated ceremony suites, nocturnal gala edits, and Parisian silk cosmetics with exclusive archive pricing up to 35% off.
              </p>
            </div>

            {/* The 3 Specific Deals */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <Link
                href="/deals/bridal-makeup-deals"
                className="group p-4 bg-[#171515] border border-[#2E2A2B] hover:border-[#E9C9CE] transition-all flex flex-col justify-between"
              >
                <div>
                  <span className="text-[9px] uppercase tracking-widest text-[#E9C9CE] block font-medium">
                    SAVE 35%
                  </span>
                  <span className="font-serif text-sm text-[#FCFAF9] group-hover:text-[#E9C9CE] transition-colors block mt-1">
                    Bridal Makeup Deals
                  </span>
                </div>
                <span className="text-[10px] text-[#A8A19F] font-light mt-3 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                  Explore Suite <ArrowRight className="w-2.5 h-2.5" />
                </span>
              </Link>

              <Link
                href="/deals/party-makeup-deals"
                className="group p-4 bg-[#171515] border border-[#2E2A2B] hover:border-[#E9C9CE] transition-all flex flex-col justify-between"
              >
                <div>
                  <span className="text-[9px] uppercase tracking-widest text-[#E9C9CE] block font-medium">
                    SAVE 30%
                  </span>
                  <span className="font-serif text-sm text-[#FCFAF9] group-hover:text-[#E9C9CE] transition-colors block mt-1">
                    Party Makeup Deals
                  </span>
                </div>
                <span className="text-[10px] text-[#A8A19F] font-light mt-3 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                  Explore Suite <ArrowRight className="w-2.5 h-2.5" />
                </span>
              </Link>

              <Link
                href="/deals/makeup-deals"
                className="group p-4 bg-[#171515] border border-[#2E2A2B] hover:border-[#E9C9CE] transition-all flex flex-col justify-between"
              >
                <div>
                  <span className="text-[9px] uppercase tracking-widest text-[#E9C9CE] block font-medium">
                    UP TO 30%
                  </span>
                  <span className="font-serif text-sm text-[#FCFAF9] group-hover:text-[#E9C9CE] transition-colors block mt-1">
                    Makeup Deals
                  </span>
                </div>
                <span className="text-[10px] text-[#A8A19F] font-light mt-3 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                  Explore Suite <ArrowRight className="w-2.5 h-2.5" />
                </span>
              </Link>
            </div>
          </div>
        </div>

        {/* Newsletter Inscription */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pb-14 border-b border-[#292526]">
          <div className="lg:col-span-6 space-y-2">
            <span className="text-[10px] tracking-[0.3em] uppercase text-[#E9C9CE] font-sans font-medium">
              ELEGANTSTYLE NEWSLETTER
            </span>
            <h3 className="font-serif text-2xl font-light text-[#FFFFFF] tracking-wide">
              Receive Privileged Access to Private Archives
            </h3>
            <p className="text-xs text-[#6E6767] font-light max-w-md">
              Subscribe to receive private invitations, curated skincare rituals, and early releases.
            </p>
          </div>

          <div className="lg:col-span-6 flex flex-col justify-center">
            {subscribed ? (
              <div className="flex items-center gap-3 text-xs text-[#E9C9CE] bg-[#211E1F] p-4 border border-[#ECE7E6]/10">
                <Check className="w-4 h-4 text-[#E9C9CE]" />
                <span>Thank you. You are now inscribed in the ElegantStyle ledger.</span>
              </div>
            ) : (
              <form onSubmit={handleNewsletter} className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address..."
                  className="flex-1 bg-[#211E1F] text-[#FCFAF9] placeholder-[#6E6767] text-xs px-4 py-3 border border-[#2E2A2B] focus:border-[#E9C9CE] focus:outline-none transition-colors"
                />
                <button
                  type="submit"
                  className="bg-[#FCFAF9] text-[#171515] text-xs tracking-[0.2em] uppercase font-sans py-3 px-6 hover:bg-[#F8E8EA] transition-colors flex items-center justify-center gap-2"
                >
                  Subscribe
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* MIDDLE SECTION: 4-COLUMN FRONT END NAVIGATION GRID */}
        {/*
            Columns layout matching user specification:
            Column 1: Makeup, Skincare, Belts, Hand Bags
            Column 2: Skincare, Belts, Wallets
            Column 3: Skincare, School Belts
            Column 4 (Reviews & Suggestions): Delivery Period, Return Policy, Feedback & Suggestions
        */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-12 py-16 text-xs border-b border-[#292526]">
          {/* Column 1 */}
          <div className="space-y-4">
            <h4 className="text-[11px] uppercase tracking-[0.2em] text-[#E9C9CE] font-medium border-b border-[#292526] pb-2">
              Collections Edit I
            </h4>
            <ul className="space-y-3 text-[#A8A19F] font-light">
              <li>
                <Link href="/beauty/makeup" className="hover:text-[#FFFFFF] transition-colors block">
                  Makeup
                </Link>
              </li>
              <li>
                <Link href="/beauty/skin-care" className="hover:text-[#FFFFFF] transition-colors block">
                  Skincare
                </Link>
              </li>
              <li>
                <Link href="/fashion/belts" className="hover:text-[#FFFFFF] transition-colors block">
                  Belts
                </Link>
              </li>
              <li>
                <Link href="/fashion/hand-bags" className="hover:text-[#FFFFFF] transition-colors block">
                  Hand Bags
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2 */}
          <div className="space-y-4">
            <h4 className="text-[11px] uppercase tracking-[0.2em] text-[#E9C9CE] font-medium border-b border-[#292526] pb-2">
              Collections Edit II
            </h4>
            <ul className="space-y-3 text-[#A8A19F] font-light">
              <li>
                <Link href="/beauty/skin-care" className="hover:text-[#FFFFFF] transition-colors block">
                  Skincare
                </Link>
              </li>
              <li>
                <Link href="/fashion/belts" className="hover:text-[#FFFFFF] transition-colors block">
                  Belts
                </Link>
              </li>
              <li>
                <Link href="/fashion/wallets" className="hover:text-[#FFFFFF] transition-colors block">
                  Wallets
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3 */}
          <div className="space-y-4">
            <h4 className="text-[11px] uppercase tracking-[0.2em] text-[#E9C9CE] font-medium border-b border-[#292526] pb-2">
              Junior & Academy
            </h4>
            <ul className="space-y-3 text-[#A8A19F] font-light">
              <li>
                <Link href="/beauty/skin-care" className="hover:text-[#FFFFFF] transition-colors block">
                  Skincare
                </Link>
              </li>
              <li>
                <Link href="/fashion/school-belts" className="hover:text-[#FFFFFF] transition-colors block">
                  School Belts
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Reviews & Suggestions */}
          <div className="space-y-4">
            <h4 className="text-[11px] uppercase tracking-[0.2em] text-[#E9C9CE] font-medium border-b border-[#292526] pb-2">
              Reviews & Suggestions
            </h4>
            <ul className="space-y-3 text-[#A8A19F] font-light">
              <li>
                <Link href="/delivery-period" className="hover:text-[#FFFFFF] transition-colors block">
                  Delivery Period
                </Link>
              </li>
              <li>
                <Link href="/return-policy" className="hover:text-[#FFFFFF] transition-colors block">
                  Return Policy
                </Link>
              </li>
              <li>
                <Link href="/reviews-suggestions" className="hover:text-[#FFFFFF] transition-colors block">
                  Feedback & Suggestions
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* BOTTOM UTILITY BAR: TRACK YOUR ORDER | CONTACT US */}
        <div className="py-8 flex flex-col md:flex-row items-center justify-between gap-6 border-b border-[#292526]">
          <div className="flex flex-wrap items-center gap-6 text-xs uppercase tracking-[0.2em] font-medium text-[#FCFAF9]">
            <Link
              href="/track-order"
              className="px-5 py-2.5 bg-[#211E1F] border border-[#2E2A2B] hover:border-[#E9C9CE] hover:text-[#E9C9CE] transition-all flex items-center gap-2"
            >
              <Truck className="w-3.5 h-3.5 text-[#E9C9CE]" />
              <span>Track Your Order</span>
            </Link>

            <Link
              href="/contact"
              className="px-5 py-2.5 bg-[#211E1F] border border-[#2E2A2B] hover:border-[#E9C9CE] hover:text-[#E9C9CE] transition-all flex items-center gap-2"
            >
              <MessageSquare className="w-3.5 h-3.5 text-[#E9C9CE]" />
              <span>Contact Us</span>
            </Link>
          </div>

          <div className="flex items-center gap-6 text-[10px] uppercase tracking-widest text-[#6E6767]">
            <span className="hover:text-[#FFFFFF] cursor-pointer transition-colors">PARIS PLACE VENDÔME</span>
            <span className="hover:text-[#FFFFFF] cursor-pointer transition-colors">FLORENCE VIA DE’ TORNABUONI</span>
            <span className="hover:text-[#FFFFFF] cursor-pointer transition-colors">NEW YORK MADISON AVE</span>
          </div>
        </div>

        {/* Copyright & Social */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#6E6767] font-light">
          <p>© 2026 ELEGANTSTYLE MAISON. ALL RIGHTS RESERVED.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-[#FFFFFF] cursor-pointer transition-colors">INSTAGRAM</span>
            <span className="hover:text-[#FFFFFF] cursor-pointer transition-colors">PINTEREST</span>
            <span className="hover:text-[#FFFFFF] cursor-pointer transition-colors">VOGUE ARCHIVES</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
