import React from 'react';
import Link from 'next/link';
import { RefreshCw, CheckCircle2, ShieldCheck, Mail, ArrowRight } from 'lucide-react';
import Breadcrumbs from '@/components/layout/Breadcrumbs';

export const metadata = {
  title: 'Return Policy & 30-Day Guarantee | ELEGANTSTYLE',
  description: 'Review our 30-day return policy, prepaid courier returns, and complimentary size and shade exchanges.',
};

export default function ReturnPolicyPage() {
  return (
    <div className="bg-[#FFFFFF] min-h-screen pb-24 font-sans">
      {/* Header */}
      <div className="bg-[#FCFAF9] border-b border-[#ECE7E6] py-16 sm:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#C58C97] font-medium block">
            MAISON CLIENT COMMITMENT
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-light text-[#171515]">
            Return Policy
          </h1>
          <p className="text-xs sm:text-sm text-[#6E6767] font-light max-w-xl mx-auto leading-relaxed">
            We provide a 30-day complimentary return and exchange privilege on all unworn leather creations and unopened botanical beauty formulations.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Return Policy' }]} />

        {/* 3 Step Process */}
        <div className="my-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-[#FCFAF9] border border-[#ECE7E6] space-y-3">
            <span className="font-serif text-3xl text-[#C58C97] font-light">01</span>
            <h3 className="font-serif text-lg text-[#171515]">Initiate Your Request</h3>
            <p className="text-xs text-[#6E6767] font-light leading-relaxed">
              Contact our concierge desk via email or phone with your order number within 30 days of delivery.
            </p>
          </div>

          <div className="p-6 bg-[#FCFAF9] border border-[#ECE7E6] space-y-3">
            <span className="font-serif text-3xl text-[#C58C97] font-light">02</span>
            <h3 className="font-serif text-lg text-[#171515]">Affix Prepaid Label</h3>
            <p className="text-xs text-[#6E6767] font-light leading-relaxed">
              We provide a complimentary insured courier return label. Pack items safely in the original presentation box.
            </p>
          </div>

          <div className="p-6 bg-[#FCFAF9] border border-[#ECE7E6] space-y-3">
            <span className="font-serif text-3xl text-[#C58C97] font-light">03</span>
            <h3 className="font-serif text-lg text-[#171515]">Reimbursement or Exchange</h3>
            <p className="text-xs text-[#6E6767] font-light leading-relaxed">
              Upon receipt at our Florence or Paris atelier, your refund is disbursed in 3–5 business days, or exchange dispatched.
            </p>
          </div>
        </div>

        {/* Detailed Guidelines */}
        <div className="space-y-8 text-xs font-light text-[#6E6767] leading-relaxed">
          <div className="p-8 border border-[#ECE7E6] bg-[#FFFFFF] space-y-4">
            <h3 className="font-serif text-xl text-[#171515]">
              Beauty & Cosmetic Formulations
            </h3>
            <p>
              Due to hygiene and organic preservation standards, all serums, face creams, lipsticks, and fluid tints must be returned in their original, unopened packaging with intact security holographic tamper seals.
            </p>
            <p>
              Complimentary sample sachets included with your order are yours to keep and test prior to breaking the seal of the full-size bottle.
            </p>
          </div>

          <div className="p-8 border border-[#ECE7E6] bg-[#FFFFFF] space-y-4">
            <h3 className="font-serif text-xl text-[#171515]">
              Leather Goods: Belts, Wallets, & Hand Bags
            </h3>
            <p>
              Belts, wallets, and handbags must be returned in brand new, unworn condition with all protective films, dust covers, authenticity cards, and presentation boxes intact.
            </p>
            <p>
              We gladly offer free size exchanges on all belts (including junior school belts and formal calfskin belts).
            </p>
          </div>

          <div className="p-8 border border-[#ECE7E6] bg-[#FFFFFF] space-y-4">
            <h3 className="font-serif text-xl text-[#171515]">
              Deals & Curated Suites
            </h3>
            <p>
              Curated deal bundles (Bridal Makeup Deals, Party Makeup Deals, and Makeup Deals) can be returned as a complete set within the 30-day window. Individual items within a promotional bundle cannot be returned separately for partial reimbursement.
            </p>
          </div>
        </div>

        {/* Assistance CTA */}
        <div className="mt-12 p-8 bg-[#FCFAF9] border border-[#ECE7E6] flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1">
            <h4 className="font-serif text-xl text-[#171515]">Need Assistance with a Return?</h4>
            <p className="text-xs text-[#6E6767] font-light">
              Our concierge will generate your prepaid shipping label immediately.
            </p>
          </div>
          <Link
            href="/contact"
            className="px-6 py-3 bg-[#171515] text-[#FCFAF9] text-xs uppercase tracking-widest hover:bg-[#292526] transition-colors shrink-0 flex items-center gap-2"
          >
            <span>Contact Returns Desk</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
