'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Check } from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-[#171515] text-[#FCFAF9] font-sans pt-20 pb-12 border-t border-[#292526]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Newsletter & Brand Tagline */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-[#292526]">
          <div className="lg:col-span-6 space-y-4">
            <span className="text-[10px] tracking-[0.3em] uppercase text-[#E9C9CE] font-sans font-medium">
              ELEGANTSTYLE NEWSLETTER
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-light text-[#FFFFFF] tracking-wide leading-tight">
              Receive Privileged Access to Private Archives & New Formulations
            </h3>
            <p className="text-xs text-[#6E6767] leading-relaxed max-w-md font-light">
              Subscribe to receive private invitations, curated skincare rituals, and early releases.
            </p>
          </div>

          <div className="lg:col-span-6 flex flex-col justify-center">
            {subscribed ? (
              <div className="flex items-center gap-3 text-sm text-[#E9C9CE] bg-[#292526] p-4 border border-[#ECE7E6]/10">
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
                  className="flex-1 bg-[#292526] text-[#FCFAF9] placeholder-[#6E6767] text-xs px-4 py-3.5 border border-[#292526] focus:border-[#E9C9CE] focus:outline-none transition-colors"
                />
                <button
                  type="submit"
                  className="bg-[#FCFAF9] text-[#171515] text-xs tracking-[0.2em] uppercase font-sans py-3.5 px-8 hover:bg-[#F8E8EA] transition-colors flex items-center justify-center gap-2"
                >
                  Subscribe
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Middle Navigation Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 py-16 text-xs border-b border-[#292526]">
          {/* Brand Info */}
          <div className="col-span-2 md:col-span-4 lg:col-span-1 space-y-4">
            <Link href="/" className="inline-block">
              <span className="font-serif text-xl font-light uppercase tracking-[0.2em] text-[#FFFFFF]">
                ELEGANTSTYLE
              </span>
              <span className="block text-[8px] tracking-[0.3em] text-[#6E6767] uppercase font-sans font-light">
                LUXURY BEAUTY & FASHION • EST. 2026
              </span>
            </Link>
            <p className="text-[#6E6767] text-xs leading-relaxed font-light">
              Crafting botanical skincare elixirs and Italian calfskin leather goods with timeless Florentine and Parisian restraint.
            </p>
          </div>

          {/* Shop */}
          <div className="space-y-4">
            <h4 className="text-[10px] uppercase tracking-[0.2em] text-[#E9C9CE] font-medium">
              Shop Collections
            </h4>
            <ul className="space-y-2.5 text-[#6E6767] font-light">
              <li>
                <Link href="/beauty" className="hover:text-[#FFFFFF] transition-colors">
                  Beauty & Cosmetics
                </Link>
              </li>
              <li>
                <Link href="/beauty/skin-care" className="hover:text-[#FFFFFF] transition-colors">
                  Botanical Skin Care
                </Link>
              </li>
              <li>
                <Link href="/beauty/makeup" className="hover:text-[#FFFFFF] transition-colors">
                  Silk Makeup
                </Link>
              </li>
              <li>
                <Link href="/fashion" className="hover:text-[#FFFFFF] transition-colors">
                  Fashion & Style
                </Link>
              </li>
              <li>
                <Link href="/fashion/belts" className="hover:text-[#FFFFFF] transition-colors">
                  Calfskin Belts
                </Link>
              </li>
              <li>
                <Link href="/fashion/wallets" className="hover:text-[#FFFFFF] transition-colors">
                  Saddle Wallets
                </Link>
              </li>
            </ul>
          </div>

          {/* Audiences */}
          <div className="space-y-4">
            <h4 className="text-[10px] uppercase tracking-[0.2em] text-[#E9C9CE] font-medium">
              Curated Lines
            </h4>
            <ul className="space-y-2.5 text-[#6E6767] font-light">
              <li>
                <Link href="/women" className="hover:text-[#FFFFFF] transition-colors">
                  Women Collection
                </Link>
              </li>
              <li>
                <Link href="/men" className="hover:text-[#FFFFFF] transition-colors">
                  Men Collection
                </Link>
              </li>
              <li>
                <Link href="/children" className="hover:text-[#FFFFFF] transition-colors">
                  Children Care
                </Link>
              </li>
              <li>
                <Link href="/journal" className="hover:text-[#FFFFFF] transition-colors">
                  Editorial Journal
                </Link>
              </li>
            </ul>
          </div>

          {/* Client Service */}
          <div className="space-y-4">
            <h4 className="text-[10px] uppercase tracking-[0.2em] text-[#E9C9CE] font-medium">
              Client Service
            </h4>
            <ul className="space-y-2.5 text-[#6E6767] font-light">
              <li>
                <Link href="/account" className="hover:text-[#FFFFFF] transition-colors">
                  My Account
                </Link>
              </li>
              <li>
                <Link href="/wishlist" className="hover:text-[#FFFFFF] transition-colors">
                  Wishlist
                </Link>
              </li>
              <li>
                <span className="cursor-pointer hover:text-[#FFFFFF] transition-colors">
                  Shipping & Returns
                </span>
              </li>
              <li>
                <span className="cursor-pointer hover:text-[#FFFFFF] transition-colors">
                  Sustainability & Ethics
                </span>
              </li>
              <li>
                <span className="cursor-pointer hover:text-[#FFFFFF] transition-colors">
                  Contact Concierge
                </span>
              </li>
            </ul>
          </div>

          {/* House Rules */}
          <div className="space-y-4">
            <h4 className="text-[10px] uppercase tracking-[0.2em] text-[#E9C9CE] font-medium">
              Legal & Privacy
            </h4>
            <ul className="space-y-2.5 text-[#6E6767] font-light">
              <li>
                <span className="cursor-pointer hover:text-[#FFFFFF] transition-colors">
                  Terms of Service
                </span>
              </li>
              <li>
                <span className="cursor-pointer hover:text-[#FFFFFF] transition-colors">
                  Privacy Policy
                </span>
              </li>
              <li>
                <span className="cursor-pointer hover:text-[#FFFFFF] transition-colors">
                  Cookie Preferences
                </span>
              </li>
              <li>
                <span className="cursor-pointer hover:text-[#FFFFFF] transition-colors">
                  Accessibility Statement
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#6E6767] font-light">
          <p>© 2026 ELEGANTSTYLE. ALL RIGHTS RESERVED. PARIS • FLORENCE • NEW YORK.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-[#FFFFFF] cursor-pointer transition-colors">INSTAGRAM</span>
            <span className="hover:text-[#FFFFFF] cursor-pointer transition-colors">PINTEREST</span>
            <span className="hover:text-[#FFFFFF] cursor-pointer transition-colors">VOGUE RUNWAY</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
