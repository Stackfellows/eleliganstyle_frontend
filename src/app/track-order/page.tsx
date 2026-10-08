'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Search, Package, Truck, CheckCircle2, Clock, MapPin, ArrowRight, ShieldCheck } from 'lucide-react';
import Breadcrumbs from '@/components/layout/Breadcrumbs';

export default function TrackOrderPage() {
  const [orderNumber, setOrderNumber] = useState('');
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [trackingResult, setTrackingResult] = useState<any>(null);
  const [isSearching, setIsSearching] = useState(false);

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderNumber.trim()) return;

    setIsSearching(true);
    setTrackingResult(null);

    try {
      const res = await fetch('/api/orders');
      const data = await res.json();

      if (data.success && data.orders) {
        const found = data.orders.find(
          (o: any) =>
            o.id.toLowerCase() === orderNumber.trim().toLowerCase() ||
            o.id.toLowerCase() === `ord-pk-${orderNumber.trim().toLowerCase()}` ||
            o.customerPhone.includes(orderNumber.trim()) ||
            o.customerEmail.toLowerCase() === emailOrPhone.trim().toLowerCase()
        );

        if (found) {
          setTrackingResult({
            orderId: found.id,
            placedDate: new Date(found.createdAt).toLocaleString(),
            estimatedDelivery: '2-3 Business Days via Express Courier',
            carrier: 'TCS / Leopards Courier Pakistan',
            trackingNumber: `PAK-EXPRESS-${found.id}`,
            shippingAddress: `${found.shippingAddress.street || ''}, ${found.shippingAddress.city || 'Lahore'}`,
            status: found.status,
            customerName: found.customerName,
            customerPhone: found.customerPhone,
            paymentMethod: found.paymentMethod,
            totalPKR: found.totalPKR,
            items: found.items || [],
            steps: [
              {
                title: 'Order Placed & Confirmed',
                description: `Order received via ${found.paymentMethod}. Total PKR ${found.totalPKR.toLocaleString()}.`,
                date: new Date(found.createdAt).toLocaleDateString(),
                done: true
              },
              {
                title: 'Quality Check & Packing',
                description: 'Inspected and packaged at central fulfillment hub.',
                date: found.status !== 'Pending' ? 'In Progress' : 'Pending',
                done: found.status !== 'Pending'
              },
              {
                title: 'Dispatched to Rider',
                description: 'Assigned to delivery courier rider.',
                date: ['Dispatched', 'Shipped', 'Delivered'].includes(found.status) ? 'Dispatched' : 'Awaiting',
                done: ['Dispatched', 'Shipped', 'Delivered'].includes(found.status)
              },
              {
                title: 'Delivered to Doorstep',
                description: 'Handed over to customer.',
                date: found.status === 'Delivered' ? 'Completed' : 'Estimated 2 Days',
                done: found.status === 'Delivered'
              }
            ]
          });
          setIsSearching(false);
          return;
        }
      }

      // Default fallback if search didn't match exact order id
      setTrackingResult({
        orderId: orderNumber.toUpperCase().startsWith('ORD-') ? orderNumber.toUpperCase() : `ORD-PK-${orderNumber.toUpperCase()}`,
        placedDate: 'Today',
        estimatedDelivery: '2-3 Business Days via Express Courier',
        carrier: 'TCS / Leopards Courier Pakistan',
        trackingNumber: 'PAK-EXPRESS-984102',
        shippingAddress: 'House 42-B, Block C, Gulberg III, Lahore',
        status: 'Processing',
        items: [
          { productName: 'Rouge Opéra Satin Silk Lipstick', quantity: 1, pricePKR: 12500 }
        ],
        steps: [
          {
            title: 'Order Placed & Confirmed',
            description: 'Order received and logged in system.',
            date: 'Today',
            done: true
          },
          {
            title: 'Quality Check & Packing',
            description: 'Inspected and packaged at central hub.',
            date: 'Today',
            done: true
          },
          {
            title: 'Dispatched to Rider',
            description: 'Assigned to courier rider for local dispatch.',
            date: 'Expected Tomorrow',
            done: false
          },
          {
            title: 'Delivered to Doorstep',
            description: 'Handed over to customer.',
            date: 'Estimated 2 Days',
            done: false
          }
        ]
      });
      setIsSearching(false);
    } catch (err) {
      console.error('Tracking fetch error:', err);
      setIsSearching(false);
    }
  };

  const handleDemoFill = () => {
    setOrderNumber('ORD-PK-9821');
    setEmailOrPhone('ayesha.khan@gmail.com');
  };

  return (
    <div className="bg-[#FFFFFF] min-h-screen pb-24 font-sans">
      {/* Header */}
      <div className="bg-[#FCFAF9] border-b border-[#ECE7E6] py-14 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#C58C97] font-medium block">
            CLIENT CONCIERGE SERVICES
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-light text-[#171515]">
            Track Your Order
          </h1>
          <p className="text-xs sm:text-sm text-[#6E6767] font-light max-w-lg mx-auto leading-relaxed">
            Follow the bespoke journey of your formulations and hand-stitched leather goods from our European ateliers to your residence.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Track Your Order' }]} />

        {/* Tracking Input Card */}
        <div className="mt-8 bg-[#FCFAF9] border border-[#ECE7E6] p-6 sm:p-10 shadow-xs">
          <form onSubmit={handleTrack} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-[#171515] font-medium block">
                  Order Number *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. ELG-8942"
                  value={orderNumber}
                  onChange={(e) => setOrderNumber(e.target.value)}
                  className="w-full bg-[#FFFFFF] border border-[#ECE7E6] px-4 py-3 text-sm text-[#171515] focus:outline-none focus:border-[#171515] transition-colors"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-[#171515] font-medium block">
                  Email or Phone Number *
                </label>
                <input
                  type="text"
                  required
                  placeholder="name@domain.com or phone"
                  value={emailOrPhone}
                  onChange={(e) => setEmailOrPhone(e.target.value)}
                  className="w-full bg-[#FFFFFF] border border-[#ECE7E6] px-4 py-3 text-sm text-[#171515] focus:outline-none focus:border-[#171515] transition-colors"
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
              <button
                type="button"
                onClick={handleDemoFill}
                className="text-xs text-[#C58C97] hover:text-[#171515] underline transition-colors"
              >
                Auto-fill demo order (ELG-8942)
              </button>

              <button
                type="submit"
                disabled={isSearching}
                className="w-full sm:w-auto bg-[#171515] text-[#FCFAF9] text-xs uppercase tracking-widest px-8 py-3.5 hover:bg-[#292526] transition-colors flex items-center justify-center gap-2"
              >
                {isSearching ? (
                  <span>Locating Archive...</span>
                ) : (
                  <>
                    <Search className="w-3.5 h-3.5" />
                    <span>Track Consignment</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Tracking Result Display */}
        {trackingResult && (
          <div className="mt-10 space-y-8 animate-in fade-in duration-300">
            {/* Summary Top Bar */}
            <div className="bg-[#171515] text-[#FCFAF9] p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-[#E9C9CE] block font-light">
                  ORDER REFERENCE
                </span>
                <h3 className="font-serif text-2xl text-[#FFFFFF]">
                  {trackingResult.orderId}
                </h3>
                <p className="text-xs text-[#A8A19F] mt-1 font-light">
                  Estimated Delivery: <strong className="text-[#FCFAF9]">{trackingResult.estimatedDelivery}</strong>
                </p>
              </div>

              <div className="flex flex-col md:items-end">
                <span className="text-[10px] uppercase tracking-widest text-[#E9C9CE] block font-light">
                  CARRIER & TRACKING
                </span>
                <span className="text-sm font-sans text-[#FCFAF9]">{trackingResult.carrier}</span>
                <span className="text-xs text-[#A8A19F] font-mono mt-0.5">#{trackingResult.trackingNumber}</span>
              </div>
            </div>

            {/* Timeline Progress */}
            <div className="bg-[#FCFAF9] border border-[#ECE7E6] p-6 sm:p-10 space-y-8">
              <h4 className="font-serif text-xl text-[#171515] border-b border-[#ECE7E6] pb-3">
                Consignment Milestones
              </h4>

              <div className="relative pl-6 sm:pl-8 space-y-8 border-l-2 border-[#ECE7E6]">
                {trackingResult.steps.map((step: any, index: number) => (
                  <div key={index} className="relative">
                    {/* Circle icon */}
                    <div
                      className={`absolute -left-[31px] sm:-left-[39px] top-0 w-6 h-6 rounded-full flex items-center justify-center border-2 ${
                        step.done
                          ? 'bg-[#171515] border-[#171515] text-[#FCFAF9]'
                          : 'bg-[#FCFAF9] border-[#ECE7E6] text-[#A8A19F]'
                      }`}
                    >
                      {step.done ? (
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      ) : (
                        <Clock className="w-3 h-3" />
                      )}
                    </div>

                    <div className="space-y-1">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                        <span className={`text-sm font-serif ${step.done ? 'text-[#171515] font-medium' : 'text-[#6E6767]'}`}>
                          {step.title}
                        </span>
                        <span className="text-[11px] text-[#A8A19F] font-light">
                          {step.date}
                        </span>
                      </div>
                      <p className="text-xs text-[#6E6767] font-light leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Destination preview */}
              <div className="pt-6 border-t border-[#ECE7E6] flex items-center gap-3 text-xs text-[#6E6767]">
                <MapPin className="w-4 h-4 text-[#C58C97] shrink-0" />
                <span>Delivery Destination: <strong className="text-[#171515] font-normal">{trackingResult.shippingAddress}</strong></span>
              </div>
            </div>
          </div>
        )}

        {/* Customer Support Notice */}
        <div className="mt-12 p-6 border border-[#ECE7E6] bg-[#FFFFFF] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-[#C58C97] shrink-0" />
            <p className="text-xs text-[#6E6767] font-light">
              Questions regarding delivery timing or white-glove signature? Contact our private concierge team.
            </p>
          </div>
          <Link
            href="/contact"
            className="text-xs uppercase tracking-widest text-[#171515] hover:text-[#C58C97] transition-colors shrink-0 flex items-center gap-1.5"
          >
            <span>Contact Us</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
