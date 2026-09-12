'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/lib/context/CartContext';
import { formatPrice } from '@/lib/utils';
import { ShieldCheck, Lock, CheckCircle, ArrowLeft, CreditCard, Truck } from 'lucide-react';

export default function CheckoutPage() {
  const { cart, subtotal, clearCart } = useCart();

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Form states
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    country: 'United States',
    postalCode: '',
    cardNumber: '',
    cardExp: '',
    cardCvc: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const shippingFee = subtotal > 150 ? 0 : 15;
  const totalAmount = subtotal + shippingFee;

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 3) {
      setIsSubmitting(true);
      setTimeout(() => {
        setIsSubmitting(false);
        setStep(4);
        clearCart();
      }, 1500);
    } else {
      setStep((s) => (s + 1) as any);
    }
  };

  return (
    <div className="bg-[#FCFAF9] min-h-screen font-sans pb-24 text-[#171515]">
      {/* Top Distraction-Free Header */}
      <header className="bg-[#FFFFFF] border-b border-[#ECE7E6] py-5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          <Link href="/" className="font-serif text-2xl font-light uppercase tracking-[0.2em]">
            ELEGANTSTYLE
          </Link>
          <div className="flex items-center gap-2 text-xs text-[#6E6767] uppercase tracking-widest font-light">
            <Lock className="w-3.5 h-3.5 text-[#171515]" />
            <span>Secure 256-Bit SSL Checkout</span>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-10">
        {step < 4 ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left: Checkout Steps Form */}
            <div className="lg:col-span-7 space-y-8">
              {/* Stepper indicator */}
              <div className="flex items-center justify-between border-b border-[#ECE7E6] pb-4 text-xs font-sans uppercase tracking-widest">
                <span className={step >= 1 ? 'font-medium text-[#171515]' : 'text-[#6E6767]'}>
                  1. Contact
                </span>
                <span>•</span>
                <span className={step >= 2 ? 'font-medium text-[#171515]' : 'text-[#6E6767]'}>
                  2. Shipping
                </span>
                <span>•</span>
                <span className={step >= 3 ? 'font-medium text-[#171515]' : 'text-[#6E6767]'}>
                  3. Payment
                </span>
              </div>

              <form onSubmit={handleNextStep} className="space-y-6 bg-[#FFFFFF] p-8 border border-[#ECE7E6]">
                {/* STEP 1: CONTACT */}
                {step === 1 && (
                  <div className="space-y-6">
                    <h2 className="font-serif text-2xl font-light">Contact Information</h2>
                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-wider text-[#6E6767]">Email Address</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="client@elegantstyle.com"
                        className="w-full bg-[#FCFAF9] border border-[#ECE7E6] p-3 text-xs focus:outline-none focus:border-[#171515]"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-[#171515] text-[#FCFAF9] text-xs uppercase tracking-[0.2em] py-4 hover:bg-[#292526] transition-colors"
                    >
                      Continue to Shipping
                    </button>
                  </div>
                )}

                {/* STEP 2: SHIPPING */}
                {step === 2 && (
                  <div className="space-y-6">
                    <h2 className="font-serif text-2xl font-light">Shipping Address</h2>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-xs uppercase tracking-wider text-[#6E6767]">First Name</label>
                        <input
                          type="text"
                          required
                          value={formData.firstName}
                          onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                          className="w-full bg-[#FCFAF9] border border-[#ECE7E6] p-3 text-xs focus:outline-none focus:border-[#171515]"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs uppercase tracking-wider text-[#6E6767]">Last Name</label>
                        <input
                          type="text"
                          required
                          value={formData.lastName}
                          onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                          className="w-full bg-[#FCFAF9] border border-[#ECE7E6] p-3 text-xs focus:outline-none focus:border-[#171515]"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-wider text-[#6E6767]">Street Address</label>
                      <input
                        type="text"
                        required
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        placeholder="123 Rue du Faubourg Saint-Honoré"
                        className="w-full bg-[#FCFAF9] border border-[#ECE7E6] p-3 text-xs focus:outline-none focus:border-[#171515]"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-xs uppercase tracking-wider text-[#6E6767]">City</label>
                        <input
                          type="text"
                          required
                          value={formData.city}
                          onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                          className="w-full bg-[#FCFAF9] border border-[#ECE7E6] p-3 text-xs focus:outline-none focus:border-[#171515]"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs uppercase tracking-wider text-[#6E6767]">Postal Code</label>
                        <input
                          type="text"
                          required
                          value={formData.postalCode}
                          onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                          className="w-full bg-[#FCFAF9] border border-[#ECE7E6] p-3 text-xs focus:outline-none focus:border-[#171515]"
                        />
                      </div>
                    </div>

                    <div className="flex gap-4 pt-4">
                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="px-6 py-4 border border-[#ECE7E6] text-xs uppercase tracking-wider"
                      >
                        Back
                      </button>
                      <button
                        type="submit"
                        className="flex-1 bg-[#171515] text-[#FCFAF9] text-xs uppercase tracking-[0.2em] py-4 hover:bg-[#292526] transition-colors"
                      >
                        Continue to Payment
                      </button>
                    </div>
                  </div>
                )}

                {/* STEP 3: PAYMENT */}
                {step === 3 && (
                  <div className="space-y-6">
                    <h2 className="font-serif text-2xl font-light">Payment Details</h2>

                    <div className="p-4 bg-[#FCFAF9] border border-[#ECE7E6] flex items-center justify-between text-xs">
                      <span className="font-medium text-[#171515]">Credit / Debit Card (Encrypted)</span>
                      <CreditCard className="w-4 h-4 text-[#6E6767]" />
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-wider text-[#6E6767]">Card Number</label>
                      <input
                        type="text"
                        required
                        placeholder="4532 •••• •••• 8921"
                        value={formData.cardNumber}
                        onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                        className="w-full bg-[#FCFAF9] border border-[#ECE7E6] p-3 text-xs focus:outline-none focus:border-[#171515]"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-xs uppercase tracking-wider text-[#6E6767]">Exp Date</label>
                        <input
                          type="text"
                          required
                          placeholder="MM/YY"
                          value={formData.cardExp}
                          onChange={(e) => setFormData({ ...formData, cardExp: e.target.value })}
                          className="w-full bg-[#FCFAF9] border border-[#ECE7E6] p-3 text-xs focus:outline-none focus:border-[#171515]"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs uppercase tracking-wider text-[#6E6767]">CVC Security</label>
                        <input
                          type="text"
                          required
                          placeholder="123"
                          value={formData.cardCvc}
                          onChange={(e) => setFormData({ ...formData, cardCvc: e.target.value })}
                          className="w-full bg-[#FCFAF9] border border-[#ECE7E6] p-3 text-xs focus:outline-none focus:border-[#171515]"
                        />
                      </div>
                    </div>

                    <div className="flex gap-4 pt-4">
                      <button
                        type="button"
                        onClick={() => setStep(2)}
                        className="px-6 py-4 border border-[#ECE7E6] text-xs uppercase tracking-wider"
                      >
                        Back
                      </button>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="flex-1 bg-[#171515] text-[#FCFAF9] text-xs uppercase tracking-[0.2em] py-4 hover:bg-[#292526] transition-colors disabled:opacity-50"
                      >
                        {isSubmitting ? 'Processing Encryption...' : `Authorize Payment — ${formatPrice(totalAmount)}`}
                      </button>
                    </div>
                  </div>
                )}
              </form>
            </div>

            {/* Right: Order Summary Sidebar */}
            <div className="lg:col-span-5">
              <div className="bg-[#FFFFFF] p-6 border border-[#ECE7E6] space-y-6">
                <h3 className="font-serif text-xl font-light border-b border-[#ECE7E6] pb-4">
                  Order Summary ({cart.length} Items)
                </h3>

                <div className="space-y-4 max-h-64 overflow-y-auto divide-y divide-[#ECE7E6]">
                  {cart.map((item, idx) => (
                    <div key={idx} className="pt-4 first:pt-0 flex gap-3 text-xs">
                      <div className="w-12 h-14 relative bg-[#F8F5F4] border border-[#ECE7E6] flex-shrink-0">
                        <Image
                          src={item.product.images[0]}
                          alt={item.product.name}
                          fill
                          className="object-cover"
                          sizes="48px"
                        />
                      </div>
                      <div className="flex-1">
                        <h5 className="font-serif font-light text-[#171515]">{item.product.name}</h5>
                        <span className="text-[10px] text-[#6E6767]">Qty: {item.quantity}</span>
                      </div>
                      <span className="font-medium text-[#171515]">
                        {formatPrice(item.product.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="space-y-2 text-xs text-[#6E6767] pt-4 border-t border-[#ECE7E6]">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="text-[#171515] font-medium">{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Express Carbon Shipping</span>
                    <span>{shippingFee === 0 ? 'COMPLIMENTARY' : formatPrice(shippingFee)}</span>
                  </div>
                  <div className="flex justify-between text-sm text-[#171515] font-medium pt-3 border-t border-[#ECE7E6]">
                    <span>Total Authorized</span>
                    <span>{formatPrice(totalAmount)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* STEP 4: ORDER CONFIRMATION */
          <div className="max-w-2xl mx-auto bg-[#FFFFFF] border border-[#ECE7E6] p-8 sm:p-12 text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-[#F8E8EA] text-[#C58C97] flex items-center justify-center mx-auto">
              <CheckCircle className="w-8 h-8 stroke-[1.5]" />
            </div>

            <div className="space-y-2">
              <span className="text-[10px] uppercase tracking-[0.3em] text-[#C58C97] font-medium">
                ORDER #MV-2026-8942 CONFIRMED
              </span>
              <h2 className="font-serif text-3xl font-light text-[#171515]">
                Thank You for Your Order
              </h2>
              <p className="text-xs text-[#6E6767] font-light leading-relaxed max-w-md mx-auto">
                We have received your order. A digital invoice and tracking link have been dispatched to your email address.
              </p>
            </div>

            <div className="p-6 bg-[#FCFAF9] border border-[#ECE7E6] text-left text-xs space-y-2">
              <div className="flex justify-between font-medium">
                <span>Shipping Address:</span>
                <span>{formData.address || '123 Rue du Faubourg'}, {formData.city || 'Paris'}</span>
              </div>
              <div className="flex justify-between text-[#6E6767]">
                <span>Estimated Delivery:</span>
                <span>2-3 Business Days via Express Courier</span>
              </div>
            </div>

            <Link
              href="/"
              className="inline-block bg-[#171515] text-[#FCFAF9] text-xs uppercase tracking-[0.2em] py-4 px-10 hover:bg-[#292526] transition-colors"
            >
              Return to ElegantStyle
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
