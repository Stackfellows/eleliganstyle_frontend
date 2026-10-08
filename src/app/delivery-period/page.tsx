import React from 'react';
import Link from 'next/link';
import { Truck, Clock, ShieldCheck, Globe, CheckCircle2, ArrowRight } from 'lucide-react';
import Breadcrumbs from '@/components/layout/Breadcrumbs';

export const metadata = {
  title: 'Delivery Period & Shipping Information | ELEGANTSTYLE',
  description: 'Learn about our complimentary carbon-neutral shipping timelines, express delivery periods, and international concierge dispatch.',
};

export default function DeliveryPeriodPage() {
  const deliveryTiers = [
    {
      region: 'Lahore (Same City Delivery)',
      standardTime: '1 – 2 Business Days',
      expressTime: 'Same Day Express Rider',
      standardCost: 'Complimentary over PKR 10,000 (otherwise PKR 350)',
      expressCost: 'PKR 600 (Complimentary on VIP Suites)'
    },
    {
      region: 'Karachi & Islamabad / Rawalpindi',
      standardTime: '2 – 3 Business Days via TCS',
      expressTime: 'Overnight Air Courier',
      standardCost: 'Complimentary over PKR 15,000 (otherwise PKR 500)',
      expressCost: 'PKR 850'
    },
    {
      region: 'Faisalabad, Multan, Sialkot & Gujranwala',
      standardTime: '2 – 3 Business Days',
      expressTime: 'Next Day Express Courier',
      standardCost: 'Complimentary over PKR 15,000 (otherwise PKR 500)',
      expressCost: 'PKR 850'
    },
    {
      region: 'Peshawar, Quetta & Nationwide Cities',
      standardTime: '3 – 4 Business Days',
      expressTime: '2 Business Days via Leopards',
      standardCost: 'Complimentary over PKR 20,000 (otherwise PKR 600)',
      expressCost: 'PKR 1,100'
    }
  ];

  return (
    <div className="bg-[#FFFFFF] min-h-screen pb-24 font-sans">
      {/* Header */}
      <div className="bg-[#FCFAF9] border-b border-[#ECE7E6] py-16 sm:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#C58C97] font-medium block">
            SHIPPING TIMELINES & LOGISTICS
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-light text-[#171515]">
            Delivery Period
          </h1>
          <p className="text-xs sm:text-sm text-[#6E6767] font-light max-w-xl mx-auto leading-relaxed">
            Every creation is prepared with artisanal care and dispatched in temperature-regulated, carbon-neutral luxury transit.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Delivery Period' }]} />

        {/* Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-10">
          <div className="p-6 bg-[#FCFAF9] border border-[#ECE7E6] space-y-3">
            <Truck className="w-5 h-5 text-[#C58C97]" />
            <h3 className="font-serif text-lg text-[#171515]">Carbon-Neutral Express</h3>
            <p className="text-xs text-[#6E6767] font-light leading-relaxed">
              100% of emissions are counterbalanced through certified reforestation initiatives.
            </p>
          </div>

          <div className="p-6 bg-[#FCFAF9] border border-[#ECE7E6] space-y-3">
            <Clock className="w-5 h-5 text-[#C58C97]" />
            <h3 className="font-serif text-lg text-[#171515]">Same-Day Atelier Packing</h3>
            <p className="text-xs text-[#6E6767] font-light leading-relaxed">
              Orders placed prior to 1:00 PM CET are inscribed and handed to the courier the very same day.
            </p>
          </div>

          <div className="p-6 bg-[#FCFAF9] border border-[#ECE7E6] space-y-3">
            <ShieldCheck className="w-5 h-5 text-[#C58C97]" />
            <h3 className="font-serif text-lg text-[#171515]">Signature Handover</h3>
            <p className="text-xs text-[#6E6767] font-light leading-relaxed">
              All parcels require an authorized adult signature to ensure discreet, verified delivery.
            </p>
          </div>
        </div>

        {/* Region Schedule Table */}
        <div className="mt-12 bg-[#FCFAF9] border border-[#ECE7E6] p-6 sm:p-10 space-y-6">
          <div className="border-b border-[#ECE7E6] pb-4">
            <h2 className="font-serif text-2xl text-[#171515]">
              Estimated Delivery Periods by Destination
            </h2>
            <p className="text-xs text-[#6E6767] font-light mt-1">
              Calculated in business days following atelier dispatch.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-[#ECE7E6] text-[10px] uppercase tracking-widest text-[#171515]">
                  <th className="py-3 pr-4 font-medium">Destination</th>
                  <th className="py-3 px-4 font-medium">Standard Delivery</th>
                  <th className="py-3 px-4 font-medium">Express Courier</th>
                  <th className="py-3 pl-4 font-medium">Standard Cost</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#ECE7E6]/70 text-[#6E6767] font-light">
                {deliveryTiers.map((tier, idx) => (
                  <tr key={idx} className="hover:bg-[#FFFFFF] transition-colors">
                    <td className="py-4 pr-4 font-serif text-sm text-[#171515] font-normal">{tier.region}</td>
                    <td className="py-4 px-4">{tier.standardTime}</td>
                    <td className="py-4 px-4 text-[#171515] font-medium">{tier.expressTime}</td>
                    <td className="py-4 pl-4">{tier.standardCost}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Detailed FAQ */}
        <div className="mt-12 space-y-6">
          <h3 className="font-serif text-2xl text-[#171515]">
            Frequently Asked Shipping Queries
          </h3>

          <div className="space-y-4">
            <div className="p-6 border border-[#ECE7E6] bg-[#FFFFFF] space-y-2">
              <h4 className="font-serif text-base text-[#171515]">
                How do I track my delivery in real time?
              </h4>
              <p className="text-xs text-[#6E6767] font-light leading-relaxed">
                As soon as your shipment is dispatched, you will receive an SMS and email notification with your tracking link. You can also monitor real-time milestones anytime via our{' '}
                <Link href="/track-order" className="text-[#C58C97] underline hover:text-[#171515]">
                  Track Your Order portal
                </Link>.
              </p>
            </div>

            <div className="p-6 border border-[#ECE7E6] bg-[#FFFFFF] space-y-2">
              <h4 className="font-serif text-base text-[#171515]">
                Are customs duties and import taxes included?
              </h4>
              <p className="text-xs text-[#6E6767] font-light leading-relaxed">
                Yes. All orders destined for the European Union, United Kingdom, United States, and Canada are shipped DDP (Delivered Duty Paid). There are no additional customs fees charged at your door.
              </p>
            </div>

            <div className="p-6 border border-[#ECE7E6] bg-[#FFFFFF] space-y-2">
              <h4 className="font-serif text-base text-[#171515]">
                What presentation packaging is provided?
              </h4>
              <p className="text-xs text-[#6E6767] font-light leading-relaxed">
                Every order arrives enclosed within our embossed rigid keepsake presentation box, tied with grosgrain ribbon, and nestled inside protective organic unbleached cotton pouches.
              </p>
            </div>
          </div>
        </div>

        {/* Action Link */}
        <div className="mt-12 p-8 bg-[#171515] text-[#FCFAF9] flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div>
            <h4 className="font-serif text-xl text-[#FFFFFF]">Ready to Track Your Consignment?</h4>
            <p className="text-xs text-[#A8A19F] font-light mt-1">
              Enter your order number and email for live GPS milestones.
            </p>
          </div>
          <Link
            href="/track-order"
            className="px-6 py-3 bg-[#E9C9CE] text-[#171515] text-xs uppercase tracking-widest font-medium hover:bg-[#FFFFFF] transition-colors shrink-0"
          >
            Track Order Now
          </Link>
        </div>
      </div>
    </div>
  );
}
