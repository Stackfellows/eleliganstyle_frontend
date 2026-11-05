'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Search, Package, Truck, CheckCircle2, Clock, MapPin, ArrowRight, ShieldCheck, AlertCircle } from 'lucide-react';
import Breadcrumbs from '@/components/layout/Breadcrumbs';

interface TrackingStep {
  title: string;
  description: string;
  date: string;
  done: boolean;
}

interface TrackingResult {
  orderId: string;
  placedDate: string;
  estimatedDelivery: string;
  carrier: string;
  trackingNumber: string;
  shippingAddress: string;
  status: string;
  customerName?: string;
  customerPhone?: string;
  paymentMethod?: string;
  totalPKR?: number;
  items: unknown[];
  steps: TrackingStep[];
}

interface OrderRecord {
  id: string;
  customerPhone?: string;
  customerEmail?: string;
  status?: string;
  createdAt?: string | number;
  customerName?: string;
  paymentMethod?: string;
  totalPKR?: number;
  items?: unknown[];
  shippingAddress?: {
    street?: string;
    city?: string;
  };
}

function TrackOrderContent() {
  const searchParams = useSearchParams();
  const initialId = searchParams.get('id') || '';

  const [orderNumber, setOrderNumber] = useState(initialId);
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [trackingResult, setTrackingResult] = useState<TrackingResult | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    if (initialId) {
      setOrderNumber(initialId);
      performSearch(initialId, '');
    }
  }, [initialId]);

  const performSearch = async (ordNum: string, contactInfo: string) => {
    const targetOrder = ordNum.trim().toLowerCase();
    const targetContact = contactInfo.trim().toLowerCase();

    if (!targetOrder && !targetContact) return;

    setIsSearching(true);
    setTrackingResult(null);
    setNotFound(false);

    try {
      let candidateOrders: OrderRecord[] = [];

      // 1. Fetch from server API
      try {
        const res = await fetch('/api/orders');
        const data = await res.json();
        if (data.success && Array.isArray(data.orders)) {
          candidateOrders = [...data.orders];
        }
      } catch (e) {
        console.error('API orders fetch error', e);
      }

      // 2. Fetch from local user orders
      try {
        const local = localStorage.getItem('elegant_user_orders');
        if (local) {
          const parsed = JSON.parse(local);
          if (Array.isArray(parsed)) {
            parsed.forEach((po: OrderRecord) => {
              if (!candidateOrders.some((co) => co.id === po.id)) {
                candidateOrders.push(po);
              }
            });
          }
        }
      } catch (e) {
        console.error('Local orders fetch error', e);
      }

      // Find match
      const found = candidateOrders.find((o: OrderRecord) => {
        const orderId = (o.id || '').toLowerCase();
        const customerPhone = (o.customerPhone || '').toLowerCase();
        const customerEmail = (o.customerEmail || '').toLowerCase();

        const matchesOrder =
          targetOrder &&
          (orderId === targetOrder ||
            orderId === `ord-pk-${targetOrder}` ||
            orderId.includes(targetOrder) ||
            customerPhone.includes(targetOrder));

        const matchesContact =
          targetContact &&
          (customerEmail === targetContact || customerPhone.includes(targetContact));

        if (targetOrder && targetContact) {
          return matchesOrder || matchesContact;
        }
        return matchesOrder || matchesContact;
      });

      if (found) {
        const status = found.status || 'Processing';
        const isDelivered = status === 'Delivered';
        const isDispatched = ['Dispatched', 'Shipped', 'Delivered'].includes(status);
        const isProcessing = ['Processing', 'Dispatched', 'Shipped', 'Delivered'].includes(status);

        setTrackingResult({
          orderId: found.id,
          placedDate: new Date(found.createdAt || Date.now()).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          }),
          estimatedDelivery: isDelivered ? 'Delivered to Customer' : '2-3 Business Days via Express Courier',
          carrier: 'TCS / Leopards Express Courier Pakistan',
          trackingNumber: `PAK-EXP-${found.id.replace(/[^0-9]/g, '') || '9841'}`,
          shippingAddress: `${found.shippingAddress?.street || ''}, ${found.shippingAddress?.city || 'Lahore'}`,
          status: status,
          customerName: found.customerName,
          customerPhone: found.customerPhone,
          paymentMethod: found.paymentMethod,
          totalPKR: found.totalPKR,
          items: found.items || [],
          steps: [
            {
              title: 'Order Placed & Confirmed',
              description: `Order received via ${found.paymentMethod}. Total verified in Maison ledger.`,
              date: new Date(found.createdAt || Date.now()).toLocaleDateString(),
              done: true,
            },
            {
              title: 'Quality Check & Luxury Packaging',
              description: 'Inspected and packaged at central fulfillment hub in Lahore.',
              date: isProcessing ? 'Completed' : 'Pending Verification',
              done: isProcessing,
            },
            {
              title: 'Dispatched to Express Courier',
              description: 'Handed over to TCS / Leopards logistics rider for doorstep delivery.',
              date: isDispatched ? 'In Transit' : 'Scheduled',
              done: isDispatched,
            },
            {
              title: 'Delivered to Residence',
              description: 'Insured package delivered and signed by customer.',
              date: isDelivered ? 'Completed' : 'Estimated 2 Days',
              done: isDelivered,
            },
          ],
        });
        setNotFound(false);
      } else {
        setNotFound(true);
      }
    } catch (err) {
      console.error('Tracking fetch error:', err);
      setNotFound(true);
    } finally {
      setIsSearching(false);
    }
  };

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    performSearch(orderNumber, emailOrPhone);
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
            Follow the live status, courier transit milestones, and doorstep delivery of your orders across Pakistan.
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
                  Order Reference Number *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. ORD-PK-9821"
                  value={orderNumber}
                  onChange={(e) => setOrderNumber(e.target.value)}
                  className="w-full bg-[#FFFFFF] border border-[#ECE7E6] px-4 py-3 text-sm text-[#171515] focus:outline-none focus:border-[#171515] transition-colors"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-[#171515] font-medium block">
                  Registered Email or Phone
                </label>
                <input
                  type="text"
                  placeholder="name@domain.com or 0300..."
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
                Auto-fill demo order (ORD-PK-9821)
              </button>

              <button
                type="submit"
                disabled={isSearching}
                className="w-full sm:w-auto bg-[#171515] text-[#FCFAF9] text-xs uppercase tracking-widest px-8 py-3.5 hover:bg-[#292526] transition-colors flex items-center justify-center gap-2"
              >
                {isSearching ? (
                  <span>Locating Shipment...</span>
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

        {/* Not Found Alert */}
        {notFound && (
          <div className="mt-8 p-6 bg-red-50/60 border border-red-200 text-left space-y-2 animate-in fade-in">
            <div className="flex items-center gap-2 text-red-800 font-medium text-sm">
              <AlertCircle className="w-4 h-4 text-red-600" />
              <span>No Shipment Found for Reference: &ldquo;{orderNumber}&rdquo;</span>
            </div>
            <p className="text-xs text-red-700 leading-relaxed font-light">
              Please verify your Order ID (such as <strong>ORD-PK-9821</strong>) or phone number entered at checkout. If you just placed an order, please allow a few minutes for courier dispatch synchronization, or contact our private client concierge.
            </p>
          </div>
        )}

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
              <div className="flex items-center justify-between border-b border-[#ECE7E6] pb-3">
                <h4 className="font-serif text-xl text-[#171515]">
                  Consignment Milestones
                </h4>
                <span className="px-3 py-1 text-[10px] uppercase tracking-wider font-semibold rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                  {trackingResult.status}
                </span>
              </div>

              <div className="relative pl-6 sm:pl-8 space-y-8 border-l-2 border-[#ECE7E6]">
                {trackingResult.steps.map((step: TrackingStep, index: number) => (
                  <div key={index} className="relative">
                    <div
                      className={`absolute -left-[31px] sm:-left-[39px] top-0 w-6 h-6 rounded-full flex items-center justify-center border-2 ${
                        step.done
                          ? 'bg-[#171515] border-[#171515] text-[#FCFAF9]'
                          : 'bg-[#FCFAF9] border-[#ECE7E6] text-[#A8A19F]'
                      }`}
                    >
                      {step.done ? (
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
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
              Questions regarding delivery timing or courier hand-off? Contact our private concierge team.
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

export default function TrackOrderPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#FFFFFF] flex items-center justify-center text-xs text-[#6E6767]">
          Loading tracking...
        </div>
      }
    >
      <TrackOrderContent />
    </Suspense>
  );
}
