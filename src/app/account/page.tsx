'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import { User, Package, Heart, LogOut, ShieldCheck } from 'lucide-react';

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState<'profile' | 'orders'>('profile');

  return (
    <div className="bg-[#FFFFFF] min-h-screen pb-24 font-sans text-[#171515]">
      <div className="bg-[#FCFAF9] border-b border-[#ECE7E6] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <Breadcrumbs items={[{ label: 'Client Account' }]} />
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-[10px] uppercase tracking-[0.3em] text-[#C58C97] font-medium">
                ELEGANTSTYLE PRIVILEGE
              </span>
              <h1 className="font-serif text-3xl sm:text-4xl font-light">
                Welcome, Hélène Vaneau
              </h1>
            </div>
            <span className="text-xs text-[#6E6767]">Client ID: MV-89410</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Sidebar Nav */}
          <div className="lg:col-span-3 space-y-2 font-sans text-xs">
            <button
              onClick={() => setActiveTab('profile')}
              className={`w-full text-left py-3 px-4 flex items-center gap-3 border transition-colors ${
                activeTab === 'profile'
                  ? 'bg-[#171515] text-[#FCFAF9] border-[#171515]'
                  : 'bg-[#FCFAF9] text-[#171515] border-[#ECE7E6] hover:bg-[#F8F5F4]'
              }`}
            >
              <User className="w-4 h-4" />
              <span>Personal Details</span>
            </button>
            <button
              onClick={() => setActiveTab('orders')}
              className={`w-full text-left py-3 px-4 flex items-center gap-3 border transition-colors ${
                activeTab === 'orders'
                  ? 'bg-[#171515] text-[#FCFAF9] border-[#171515]'
                  : 'bg-[#FCFAF9] text-[#171515] border-[#ECE7E6] hover:bg-[#F8F5F4]'
              }`}
            >
              <Package className="w-4 h-4" />
              <span>Order Archives</span>
            </button>
            <Link
              href="/wishlist"
              className="w-full text-left py-3 px-4 flex items-center gap-3 border border-[#ECE7E6] bg-[#FCFAF9] text-[#171515] hover:bg-[#F8F5F4] transition-colors block"
            >
              <Heart className="w-4 h-4" />
              <span>Saved Vault</span>
            </Link>
          </div>

          {/* Tab Content */}
          <div className="lg:col-span-9">
            {activeTab === 'profile' ? (
              <div className="bg-[#FCFAF9] border border-[#ECE7E6] p-8 space-y-6">
                <h3 className="font-serif text-2xl font-light">Client Information</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs font-sans">
                  <div>
                    <span className="text-[#6E6767] uppercase tracking-wider block">Full Name</span>
                    <span className="font-medium text-sm mt-1 block">Dr. Hélène Vaneau</span>
                  </div>
                  <div>
                    <span className="text-[#6E6767] uppercase tracking-wider block">Email Address</span>
                    <span className="font-medium text-sm mt-1 block">helene.vaneau@paris.fr</span>
                  </div>
                  <div>
                    <span className="text-[#6E6767] uppercase tracking-wider block">Primary Residence</span>
                    <span className="font-medium text-sm mt-1 block">14 Rue Bonaparte, 75006 Paris</span>
                  </div>
                  <div>
                    <span className="text-[#6E6767] uppercase tracking-wider block">Privilege Tier</span>
                    <span className="font-medium text-sm text-[#C58C97] mt-1 block">
                      ElegantStyle VIP Ledger
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-[#FCFAF9] border border-[#ECE7E6] p-8 space-y-6">
                <h3 className="font-serif text-2xl font-light">Order Archives</h3>
                <div className="border border-[#ECE7E6] p-4 bg-[#FFFFFF] space-y-2 text-xs font-sans">
                  <div className="flex justify-between font-medium border-b border-[#ECE7E6] pb-2">
                    <span>Order #MV-2026-8942</span>
                    <span className="text-[#C58C97]">Delivered</span>
                  </div>
                  <div className="flex justify-between text-[#6E6767] pt-1">
                    <span>Lumière Hydrating Nectar Serum x 1</span>
                    <span>$135.00</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
