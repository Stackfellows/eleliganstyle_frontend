'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/lib/context/CartContext';
import { formatPrice } from '@/lib/utils';
import {
  ShieldCheck,
  Lock,
  CheckCircle,
  ArrowLeft,
  CreditCard,
  Truck,
  Phone,
  Banknote,
  Building,
  Copy,
  Check,
  AlertCircle
} from 'lucide-react';

export default function CheckoutPage() {
  const { cart, subtotal, clearCart } = useCart();
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Form states
  const [formData, setFormData] = useState({
    email: '',
    countryCode: '+92',
    phone10: '',
    phone: '',
    firstName: '',
    lastName: '',
    address: '',
    city: 'Lahore',
    province: 'Punjab',
    country: 'Pakistan',
    postalCode: '',
    deliveryNotes: '',
    paymentMethod: 'JazzCash' as 'JazzCash' | 'EasyPaisa' | 'Bank Transfer' | 'Cash on Delivery (COD)',
    accountName: '',
    transactionId: '',
  });

  const [emailError, setEmailError] = useState<string>('');
  const [phoneError, setPhoneError] = useState<string>('');
  const [showRefundModal, setShowRefundModal] = useState<boolean>(false);
  const [refundPolicyAgreed, setRefundPolicyAgreed] = useState<boolean>(true);

  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedOrderId, setConfirmedOrderId] = useState('');

  // Auto-fill logged-in client details
  useEffect(() => {
    try {
      const sessionStr = localStorage.getItem('elegant_user_session');
      if (sessionStr) {
        const user = JSON.parse(sessionStr);
        if (user) {
          const names = (user.name || '').split(' ');
          const fName = names[0] || '';
          const lName = names.slice(1).join(' ') || '';
          setFormData((prev) => ({
            ...prev,
            firstName: prev.firstName || fName,
            lastName: prev.lastName || lName,
            email: prev.email || user.email || '',
            address: prev.address || user.address || '',
            city: prev.city || user.city || 'Lahore',
            province: prev.province || user.province || 'Punjab',
            phone10: prev.phone10 || (user.phone ? user.phone.replace(/\D/g, '').slice(-10) : ''),
          }));
        }
      }
    } catch (e) {
      console.error('Session autofill error', e);
    }
  }, []);

  const shippingFee = subtotal > 150 ? 0 : 15;
  const totalAmount = subtotal + shippingFee;

  const handleCopy = (text: string, fieldId: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldId);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleNextStep = async (e: React.FormEvent) => {
    e.preventDefault();

    if (step === 1) {
      let hasError = false;

      // Validate email: Must contain @ and end with .com
      const trimmedEmail = formData.email.trim();
      const emailRegex = /^[^\s@]+@[^\s@]+\.com$/i;
      if (!trimmedEmail) {
        setEmailError('Email address is required.');
        hasError = true;
      } else if (!emailRegex.test(trimmedEmail)) {
        setEmailError('Invalid email format. Email must end with .com (e.g. name@domain.com)');
        hasError = true;
      } else {
        setEmailError('');
      }

      // Validate phone: Exactly 10 digits
      const digitsOnly = formData.phone10.replace(/\D/g, '');
      if (digitsOnly.length !== 10) {
        setPhoneError(`Mobile number must be exactly 10 digits (currently entered ${digitsOnly.length} digits).`);
        hasError = true;
      } else {
        setPhoneError('');
      }

      if (hasError) {
        return;
      }

      // Format full phone with country code
      const fullPhone = `${formData.countryCode} ${digitsOnly}`;
      setFormData((prev) => ({ ...prev, phone: fullPhone }));
      setStep(2);
      return;
    }

    if (step === 3) {
      setIsSubmitting(true);

      const generatedOrderId = `ORD-PK-${Math.floor(1000 + Math.random() * 9000)}`;
      setConfirmedOrderId(generatedOrderId);

      // Save order to /api/orders
      try {
        const pkrTotal = totalAmount < 1000 ? Math.round(totalAmount * 280) : Math.round(totalAmount);
        const fullPhone = formData.phone || `${formData.countryCode} ${formData.phone10}`;
        await fetch('/api/orders', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            customerName: `${formData.firstName} ${formData.lastName}`.trim() || 'Valued Client',
            customerPhone: fullPhone,
            customerEmail: formData.email,
            shippingAddress: {
              street: formData.address,
              city: formData.city,
              province: formData.province,
              postalCode: formData.postalCode,
              deliveryNotes: formData.deliveryNotes,
            },
            items: cart.map((it) => ({
              productName: it.product.name,
              name: it.product.name,
              quantity: it.quantity,
              pricePKR: it.product.price < 1000 ? Math.round(it.product.price * 280) : it.product.price,
              image: it.product.images?.[0] || '',
              brand: it.product.brand || 'ELEGANTSTYLE',
              color: it.selectedColor || undefined,
              size: it.selectedSize || undefined,
            })),
            totalPKR: pkrTotal,
            paymentMethod: formData.paymentMethod,
          }),
        });

        // Also save order into local storage so user account archives are immediately updated
        try {
          const userOrder = {
            id: generatedOrderId,
            customerName: `${formData.firstName} ${formData.lastName}`.trim() || 'Valued Client',
            customerPhone: fullPhone,
            customerEmail: formData.email,
            shippingAddress: {
              street: formData.address,
              city: formData.city,
              province: formData.province,
              postalCode: formData.postalCode,
            },
            items: cart.map((it) => ({
              productName: it.product.name,
              name: it.product.name,
              quantity: it.quantity,
              pricePKR: it.product.price < 1000 ? Math.round(it.product.price * 280) : it.product.price,
              image: it.product.images?.[0] || '',
              brand: it.product.brand || 'ELEGANTSTYLE',
              color: it.selectedColor || undefined,
              size: it.selectedSize || undefined,
            })),
            totalPKR: pkrTotal,
            paymentMethod: formData.paymentMethod,
            status: 'Processing',
            createdAt: new Date().toISOString(),
          };

          const existingOrders = JSON.parse(localStorage.getItem('elegant_user_orders') || '[]');
          localStorage.setItem('elegant_user_orders', JSON.stringify([userOrder, ...existingOrders]));
        } catch (localErr) {
          console.error('Local order save error', localErr);
        }
      } catch (err) {
        console.error('Order submission error', err);
      }

      setTimeout(() => {
        setIsSubmitting(false);
        setStep(4);
        clearCart();
      }, 1200);
    } else {
      setStep((s) => (s + 1) as any);
    }
  };

  return (
    <div className="bg-[#FCFAF9] min-h-screen font-sans pb-24 text-[#171515]">
      {/* Top Header */}
      <header className="bg-[#FFFFFF] border-b border-[#ECE7E6] py-5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          <Link href="/" className="font-serif text-2xl font-light uppercase tracking-[0.2em]">
            ELEGANTSTYLE
          </Link>
          <div className="flex items-center gap-2 text-xs text-[#6E6767] uppercase tracking-widest font-light">
            <Lock className="w-3.5 h-3.5 text-[#171515]" />
            <span>Secure 256-Bit SSL Checkout (PKR)</span>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-10">
        {step < 4 ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left: Steps Form */}
            <div className="lg:col-span-7 space-y-8">
              {/* Stepper indicator */}
              <div className="flex items-center justify-between border-b border-[#ECE7E6] pb-4 text-xs font-sans uppercase tracking-widest">
                <span className={step >= 1 ? 'font-medium text-[#171515]' : 'text-[#6E6767]'}>
                  1. Contact
                </span>
                <span>•</span>
                <span className={step >= 2 ? 'font-medium text-[#171515]' : 'text-[#6E6767]'}>
                  2. Delivery Address
                </span>
                <span>•</span>
                <span className={step >= 3 ? 'font-medium text-[#171515]' : 'text-[#6E6767]'}>
                  3. Payment Details
                </span>
              </div>

              <form onSubmit={handleNextStep} className="space-y-6 bg-[#FFFFFF] p-8 border border-[#ECE7E6]">
                {/* STEP 1: CONTACT */}
                {step === 1 && (
                  <div className="space-y-6">
                    <h2 className="font-serif text-2xl font-light">Contact Information</h2>

                    {/* Email Input */}
                    <div className="space-y-1.5">
                      <label className="text-xs uppercase tracking-wider text-[#6E6767]">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => {
                          setFormData({ ...formData, email: e.target.value });
                          if (emailError) setEmailError('');
                        }}
                        placeholder="client@maison.com"
                        className={`w-full bg-[#FCFAF9] border p-3 text-xs focus:outline-none ${
                          emailError
                            ? 'border-red-500 bg-red-50/20 focus:border-red-600'
                            : 'border-[#ECE7E6] focus:border-[#6B7C52]'
                        }`}
                      />
                      {emailError && (
                        <p className="text-[11px] text-red-600 flex items-center gap-1 font-medium mt-1">
                          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                          <span>{emailError}</span>
                        </p>
                      )}
                      <span className="text-[10px] text-[#7A7375] block">
                        Must end with .com (e.g., yourname@gmail.com)
                      </span>
                    </div>

                    {/* Separate Country Code & 10-Digit Mobile Number */}
                    <div className="space-y-1.5">
                      <label className="text-xs uppercase tracking-wider text-[#6E6767] flex items-center justify-between">
                        <span>Mobile / Contact Phone *</span>
                        <span className="text-[10px] text-[#7A7375]">Exactly 10 digits required</span>
                      </label>
                      
                      <div className="grid grid-cols-12 gap-2">
                        {/* Separate Country Code Dropdown */}
                        <div className="col-span-4 sm:col-span-4 relative">
                          <select
                            value={formData.countryCode}
                            onChange={(e) => setFormData({ ...formData, countryCode: e.target.value })}
                            className="w-full bg-[#FCFAF9] border border-[#ECE7E6] p-3 text-xs focus:outline-none focus:border-[#6B7C52] font-mono cursor-pointer"
                          >
                            <option value="+92">PK (+92)</option>
                            <option value="+1">US (+1)</option>
                            <option value="+44">UK (+44)</option>
                            <option value="+971">UAE (+971)</option>
                            <option value="+966">SA (+966)</option>
                            <option value="+33">FR (+33)</option>
                            <option value="+39">IT (+39)</option>
                            <option value="+49">DE (+49)</option>
                            <option value="+61">AU (+61)</option>
                            <option value="+91">IN (+91)</option>
                          </select>
                        </div>

                        {/* 10-digit number */}
                        <div className="col-span-8 sm:col-span-8 relative">
                          <input
                            type="tel"
                            required
                            maxLength={10}
                            value={formData.phone10}
                            onChange={(e) => {
                              // Only keep digits and limit to 10
                              const val = e.target.value.replace(/\D/g, '').slice(0, 10);
                              setFormData({ ...formData, phone10: val });
                              if (phoneError) setPhoneError('');
                            }}
                            placeholder="3001234567"
                            className={`w-full bg-[#FCFAF9] border p-3 text-xs focus:outline-none font-mono ${
                              phoneError
                                ? 'border-red-500 bg-red-50/20 focus:border-red-600'
                                : 'border-[#ECE7E6] focus:border-[#6B7C52]'
                            }`}
                          />
                        </div>
                      </div>

                      {phoneError ? (
                        <p className="text-[11px] text-red-600 flex items-center gap-1 font-medium mt-1">
                          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                          <span>{phoneError}</span>
                        </p>
                      ) : (
                        <div className="flex items-center justify-between text-[10px] text-[#7A7375]">
                          <span>Enter 10 numbers without leading zero (e.g. 3001234567)</span>
                          <span className="font-mono text-[#6B7C52]">
                            {formData.phone10.length}/10 digits
                          </span>
                        </div>
                      )}
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-[#171515] text-[#FCFAF9] text-xs uppercase tracking-[0.2em] py-4 hover:bg-[#292526] transition-colors cursor-pointer"
                    >
                      Continue to Delivery Address
                    </button>
                  </div>
                )}

                {/* STEP 2: SHIPPING ADDRESS */}
                {step === 2 && (
                  <div className="space-y-6">
                    <h2 className="font-serif text-2xl font-light">Delivery Destination (Pata)</h2>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-xs uppercase tracking-wider text-[#6E6767]">First Name</label>
                        <input
                          type="text"
                          required
                          value={formData.firstName}
                          onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                          placeholder="Ayesha"
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
                          placeholder="Khan"
                          className="w-full bg-[#FCFAF9] border border-[#ECE7E6] p-3 text-xs focus:outline-none focus:border-[#171515]"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-wider text-[#6E6767]">Street Address & House / Flat No.</label>
                      <input
                        type="text"
                        required
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        placeholder="House 42-B, Block C, Gulberg III"
                        className="w-full bg-[#FCFAF9] border border-[#ECE7E6] p-3 text-xs focus:outline-none focus:border-[#171515]"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-xs uppercase tracking-wider text-[#6E6767]">City</label>
                        <select
                          value={formData.city}
                          onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                          className="w-full bg-[#FCFAF9] border border-[#ECE7E6] p-3 text-xs focus:outline-none focus:border-[#171515]"
                        >
                          <option value="Lahore">Lahore</option>
                          <option value="Karachi">Karachi</option>
                          <option value="Islamabad">Islamabad</option>
                          <option value="Rawalpindi">Rawalpindi</option>
                          <option value="Faisalabad">Faisalabad</option>
                          <option value="Multan">Multan</option>
                          <option value="Peshawar">Peshawar</option>
                          <option value="Sialkot">Sialkot</option>
                          <option value="Gujranwala">Gujranwala</option>
                          <option value="Quetta">Quetta</option>
                        </select>
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs uppercase tracking-wider text-[#6E6767]">Postal Code</label>
                        <input
                          type="text"
                          value={formData.postalCode}
                          onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                          placeholder="54000"
                          className="w-full bg-[#FCFAF9] border border-[#ECE7E6] p-3 text-xs focus:outline-none focus:border-[#171515]"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-wider text-[#6E6767]">Special Rider Delivery Notes (Optional)</label>
                      <input
                        type="text"
                        value={formData.deliveryNotes}
                        onChange={(e) => setFormData({ ...formData, deliveryNotes: e.target.value })}
                        placeholder="Call upon arrival, deliver after 2 PM..."
                        className="w-full bg-[#FCFAF9] border border-[#ECE7E6] p-3 text-xs focus:outline-none focus:border-[#171515]"
                      />
                    </div>

                    <div className="flex gap-4 pt-4">
                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="px-6 py-4 border border-[#ECE7E6] text-xs uppercase tracking-wider hover:bg-[#F8F5F4] transition-colors"
                      >
                        Back
                      </button>
                      <button
                        type="submit"
                        className="flex-1 bg-[#171515] text-[#FCFAF9] text-xs uppercase tracking-[0.2em] py-4 hover:bg-[#292526] transition-colors cursor-pointer"
                      >
                        Continue to Payment Details
                      </button>
                    </div>
                  </div>
                )}

                {/* STEP 3: PAYMENT DETAILS WITH JAZZCASH, EASYPAISA, BANK TRANSFER & COD */}
                {step === 3 && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="font-serif text-2xl font-light">Payment Method & Verification</h2>
                      <p className="text-xs text-[#6E6767] mt-1">
                        Select your preferred payment channel. Send payment and enter your sender Account Name and Transaction Number (TRX ID).
                      </p>
                    </div>

                    {/* Payment Channel Selection Tabs */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                      {[
                        { id: 'JazzCash', label: 'JazzCash', icon: Banknote },
                        { id: 'EasyPaisa', label: 'EasyPaisa', icon: Banknote },
                        { id: 'Bank Transfer', label: 'Bank Transfer', icon: Building },
                        { id: 'Cash on Delivery (COD)', label: 'Cash on Delivery', icon: Truck },
                      ].map((m) => {
                        const Icon = m.icon;
                        const isSelected = formData.paymentMethod === m.id;
                        return (
                          <button
                            key={m.id}
                            type="button"
                            onClick={() =>
                              setFormData({
                                ...formData,
                                paymentMethod: m.id as any,
                              })
                            }
                            className={`p-3 border rounded text-center flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer ${
                              isSelected
                                ? 'border-[#171515] bg-[#171515] text-[#FCFAF9] shadow-sm font-medium'
                                : 'border-[#ECE7E6] bg-[#FCFAF9] text-[#171515] hover:bg-[#F8F5F4]'
                            }`}
                          >
                            <Icon className="w-4 h-4" />
                            <span className="text-[11px] leading-tight">{m.label}</span>
                          </button>
                        );
                      })}
                    </div>

                    {/* CHANNEL DETAILS BOX: JAZZCASH */}
                    {formData.paymentMethod === 'JazzCash' && (
                      <div className="p-4 bg-[#FCFAF9] border border-[#ECE7E6] rounded space-y-3 text-xs">
                        <div className="flex items-center justify-between border-b border-[#ECE7E6] pb-2">
                          <span className="font-medium text-[#171515] flex items-center gap-1.5">
                            <span className="w-2.5 h-2.5 rounded-full bg-red-600 inline-block" />
                            JazzCash Official Account
                          </span>
                          <span className="text-[10px] font-mono text-[#C58C97]">Instant Verification</span>
                        </div>

                        <div className="grid grid-cols-2 gap-4 font-mono">
                          <div>
                            <span className="text-[10px] text-[#6E6767] uppercase block font-sans">Account Title</span>
                            <span className="font-bold text-[#171515]">ELEGANTSTYLE MAISON</span>
                          </div>
                          <div>
                            <span className="text-[10px] text-[#6E6767] uppercase block font-sans">Account / Mobile No.</span>
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-[#171515]">0300-4589210</span>
                              <button
                                type="button"
                                onClick={() => handleCopy('03004589210', 'jc')}
                                className="text-[10px] text-[#C58C97] hover:underline flex items-center gap-0.5"
                              >
                                {copiedField === 'jc' ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                                <span>{copiedField === 'jc' ? 'Copied' : 'Copy'}</span>
                              </button>
                            </div>
                          </div>
                        </div>

                        <p className="text-[11px] text-[#6E6767] leading-relaxed pt-1">
                          Transfer <strong className="text-[#171515]">{formatPrice(totalAmount)}</strong> to the above JazzCash account. After sending, enter your sender Account Name and the 12-digit TID / TRX number below.
                        </p>
                      </div>
                    )}

                    {/* CHANNEL DETAILS BOX: EASYPAISA */}
                    {formData.paymentMethod === 'EasyPaisa' && (
                      <div className="p-4 bg-[#FCFAF9] border border-[#ECE7E6] rounded space-y-3 text-xs">
                        <div className="flex items-center justify-between border-b border-[#ECE7E6] pb-2">
                          <span className="font-medium text-[#171515] flex items-center gap-1.5">
                            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
                            EasyPaisa Official Account
                          </span>
                          <span className="text-[10px] font-mono text-emerald-600">Verified Merchant</span>
                        </div>

                        <div className="grid grid-cols-2 gap-4 font-mono">
                          <div>
                            <span className="text-[10px] text-[#6E6767] uppercase block font-sans">Account Title</span>
                            <span className="font-bold text-[#171515]">ELEGANTSTYLE MAISON</span>
                          </div>
                          <div>
                            <span className="text-[10px] text-[#6E6767] uppercase block font-sans">EasyPaisa Mobile No.</span>
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-[#171515]">0345-9128374</span>
                              <button
                                type="button"
                                onClick={() => handleCopy('03459128374', 'ep')}
                                className="text-[10px] text-[#C58C97] hover:underline flex items-center gap-0.5"
                              >
                                {copiedField === 'ep' ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                                <span>{copiedField === 'ep' ? 'Copied' : 'Copy'}</span>
                              </button>
                            </div>
                          </div>
                        </div>

                        <p className="text-[11px] text-[#6E6767] leading-relaxed pt-1">
                          Transfer <strong className="text-[#171515]">{formatPrice(totalAmount)}</strong> via EasyPaisa App or USSD code. Enter your sender Name and Transaction ID below.
                        </p>
                      </div>
                    )}

                    {/* CHANNEL DETAILS BOX: BANK TRANSFER */}
                    {formData.paymentMethod === 'Bank Transfer' && (
                      <div className="p-4 bg-[#FCFAF9] border border-[#ECE7E6] rounded space-y-3 text-xs">
                        <div className="flex items-center justify-between border-b border-[#ECE7E6] pb-2">
                          <span className="font-medium text-[#171515] flex items-center gap-1.5">
                            <Building className="w-4 h-4 text-[#C58C97]" />
                            Meezan Bank Limited / HBL Islamic
                          </span>
                          <span className="text-[10px] font-mono text-[#6E6767]">Direct Bank Wire</span>
                        </div>

                        <div className="space-y-2 font-mono">
                          <div className="flex justify-between">
                            <span className="text-[#6E6767] font-sans">Account Title:</span>
                            <span className="font-bold text-[#171515]">ELEGANTSTYLE LUXURY TRADING</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-[#6E6767] font-sans">Account Number:</span>
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-[#171515]">02010109842100</span>
                              <button
                                type="button"
                                onClick={() => handleCopy('02010109842100', 'acc')}
                                className="text-[10px] text-[#C58C97] hover:underline"
                              >
                                {copiedField === 'acc' ? 'Copied' : 'Copy'}
                              </button>
                            </div>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-[#6E6767] font-sans">IBAN:</span>
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-[#171515]">PK12MEZN0002010109842100</span>
                              <button
                                type="button"
                                onClick={() => handleCopy('PK12MEZN0002010109842100', 'iban')}
                                className="text-[10px] text-[#C58C97] hover:underline"
                              >
                                {copiedField === 'iban' ? 'Copied' : 'Copy'}
                              </button>
                            </div>
                          </div>
                          <div className="flex justify-between text-[11px] text-[#7A7375] font-sans">
                            <span>Branch:</span>
                            <span>Main Boulevard, Gulberg III Branch, Lahore</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* CHANNEL DETAILS BOX: COD */}
                    {formData.paymentMethod === 'Cash on Delivery (COD)' && (
                      <div className="p-4 bg-[#FCFAF9] border border-[#ECE7E6] rounded space-y-2 text-xs">
                        <div className="flex items-center gap-2 font-medium text-[#171515]">
                          <Truck className="w-4 h-4 text-[#C58C97]" />
                          <span>Cash on Delivery (Pay at Doorstep)</span>
                        </div>
                        <p className="text-[11px] text-[#6E6767] leading-relaxed">
                          Pay the total amount in cash to the TCS or Leopards courier rider when your parcel is delivered to your doorstep.
                        </p>
                      </div>
                    )}

                    {/* REQUIRED INPUTS FOR JAZZCASH, EASYPAISA, BANK: SENDER ACCOUNT NAME & TRANSACTION NUMBER */}
                    {formData.paymentMethod !== 'Cash on Delivery (COD)' && (
                      <div className="space-y-4 pt-2 border-t border-[#ECE7E6]">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="space-y-1.5">
                            <label className="text-xs uppercase tracking-wider text-[#6E6767] font-medium block">
                              Sender Account Name *
                            </label>
                            <input
                              type="text"
                              required
                              value={formData.accountName}
                              onChange={(e) => setFormData({ ...formData, accountName: e.target.value })}
                              placeholder="e.g. Hamza Farooq"
                              className="w-full bg-[#FCFAF9] border border-[#ECE7E6] p-3 text-xs focus:outline-none focus:border-[#171515]"
                            />
                            <span className="text-[10px] text-[#7A7375]">Jis name sa payment send ki hai</span>
                          </div>

                          <div className="space-y-1.5">
                            <label className="text-xs uppercase tracking-wider text-[#6E6767] font-medium block">
                              Transaction ID / TRX No. *
                            </label>
                            <input
                              type="text"
                              required
                              value={formData.transactionId}
                              onChange={(e) => setFormData({ ...formData, transactionId: e.target.value })}
                              placeholder="e.g. 198421038912"
                              className="w-full bg-[#FCFAF9] border border-[#ECE7E6] p-3 text-xs focus:outline-none focus:border-[#171515] font-mono"
                            />
                            <span className="text-[10px] text-[#7A7375]">JazzCash/EasyPaisa SMS transaction ID</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Step Actions */}
                    <div className="flex gap-4 pt-4 border-t border-[#ECE7E6]">
                      <button
                        type="button"
                        onClick={() => setStep(2)}
                        className="px-6 py-4 border border-[#ECE7E6] text-xs uppercase tracking-wider hover:bg-[#F8F5F4] transition-colors"
                      >
                        Back
                      </button>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="flex-1 bg-[#171515] text-[#FCFAF9] text-xs uppercase tracking-[0.2em] py-4 hover:bg-[#292526] transition-colors disabled:opacity-50 cursor-pointer shadow-md"
                      >
                        {isSubmitting ? (
                          'Verifying & Confirming...'
                        ) : (
                          `Confirm Order & Payment — ${formatPrice(totalAmount)}`
                        )}
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
                      <div className="w-12 h-14 relative bg-[#F8F5F4] border border-[#ECE7E6] shrink-0">
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
                    <span>Express Insured Courier</span>
                    <span>{shippingFee === 0 ? 'COMPLIMENTARY' : formatPrice(shippingFee)}</span>
                  </div>
                  <div className="flex justify-between text-base text-[#171515] font-medium pt-3 border-t border-[#ECE7E6]">
                    <span>Total Amount (PKR)</span>
                    <span className="font-bold text-[#A21D21]">{formatPrice(totalAmount)}</span>
                  </div>
                </div>

                {/* Refund Policy Card */}
                <div className="pt-4 border-t border-[#ECE7E6] space-y-3">
                  <div className="flex items-start gap-2.5 p-3.5 bg-[#F4F6EE] border border-[#D0D9C0] rounded">
                    <ShieldCheck className="w-4 h-4 text-[#6B7C52] shrink-0 mt-0.5" />
                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-serif text-sm font-medium text-[#171515]">
                          30-Day Maison Refund Guarantee
                        </span>
                        <span className="text-[10px] font-mono text-[#6B7C52] bg-[#FFFFFF] px-1.5 py-0.5 border border-[#D0D9C0] rounded">
                          Included
                        </span>
                      </div>
                      <p className="text-[11px] text-[#556340] leading-relaxed">
                        Full reimbursement on unopened skincare & unworn leather goods within 30 days of courier delivery.
                      </p>
                      <button
                        type="button"
                        onClick={() => setShowRefundModal(true)}
                        className="text-[11px] text-[#171515] hover:text-[#6B7C52] underline font-medium cursor-pointer pt-1 block"
                      >
                        Read Full Refund Policy Terms & Details →
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-[11px] text-[#6E6767]">
                    <CheckCircle className="w-3.5 h-3.5 text-[#6B7C52]" />
                    <span>Free size exchanges on belts & return shipping courier pickups</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* STEP 4: ORDER CONFIRMATION */
          <div className="max-w-2xl mx-auto bg-[#FFFFFF] border border-[#ECE7E6] p-8 sm:p-12 text-center space-y-6 shadow-xl">
            <div className="w-16 h-16 rounded-full bg-[#F8E8EA] text-[#C58C97] flex items-center justify-center mx-auto">
              <CheckCircle className="w-8 h-8 stroke-[1.5]" />
            </div>

            <div className="space-y-2">
              <span className="text-[10px] uppercase tracking-[0.3em] text-[#C58C97] font-medium font-mono">
                ORDER #{confirmedOrderId || 'ORD-PK-9821'} CONFIRMED
              </span>
              <h2 className="font-serif text-3xl font-light text-[#171515]">
                Thank You for Your Order
              </h2>
              <p className="text-xs text-[#6E6767] font-light leading-relaxed max-w-md mx-auto">
                We have received your order via <strong>{formData.paymentMethod}</strong>. Your purchase has been logged in the Maison ledger and our fulfillment team in Lahore will dispatch your package shortly.
              </p>
            </div>

            <div className="p-6 bg-[#FCFAF9] border border-[#ECE7E6] text-left text-xs space-y-2 font-sans">
              <div className="flex justify-between font-medium">
                <span>Customer:</span>
                <span>{formData.firstName} {formData.lastName} ({formData.phone})</span>
              </div>
              <div className="flex justify-between font-medium">
                <span>Delivery Address:</span>
                <span>{formData.address}, {formData.city}</span>
              </div>
              <div className="flex justify-between text-[#6E6767]">
                <span>Payment Mode:</span>
                <span>{formData.paymentMethod}</span>
              </div>
              {formData.transactionId && (
                <div className="flex justify-between text-[#6E6767] font-mono">
                  <span>Transaction ID:</span>
                  <span className="text-[#171515] font-bold">{formData.transactionId}</span>
                </div>
              )}
              <div className="flex justify-between text-[#6E6767]">
                <span>Estimated Delivery:</span>
                <span>2-3 Business Days via Express Courier</span>
              </div>
            </div>

            <Link
              href="/"
              className="inline-block bg-[#171515] text-[#FCFAF9] text-xs uppercase tracking-[0.2em] py-4 px-10 hover:bg-[#292526] transition-colors"
            >
              Return to Storefront
            </Link>
          </div>
        )}
      </div>

      {/* Interactive Refund Policy Modal */}
      {showRefundModal && (
        <div className="fixed inset-0 z-50 bg-[#0D0C0C]/80 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#FFFFFF] border border-[#ECE7E6] max-w-lg w-full p-6 sm:p-8 space-y-5 rounded-sm shadow-2xl relative">
            <div className="flex items-center justify-between border-b border-[#ECE7E6] pb-4">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-[#6B7C52]" />
                <h3 className="font-serif text-xl font-light text-[#171515]">
                  Maison Refund & Return Policy
                </h3>
              </div>
              <button
                onClick={() => setShowRefundModal(false)}
                className="text-[#6E6767] hover:text-[#171515] p-1 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-xs text-[#6E6767] leading-relaxed max-h-96 overflow-y-auto pr-1">
              <div className="p-3 bg-[#F4F6EE] border border-[#D0D9C0] rounded text-[#556340] space-y-1">
                <span className="font-semibold block text-[#171515]">30-Day Client Guarantee:</span>
                Every client is entitled to a 30-day return privilege starting from the timestamp the courier confirms delivery at your doorstep.
              </div>

              <div>
                <h4 className="font-serif text-sm text-[#171515] font-medium mb-1">
                  1. Botanical Skincare & Cosmetic Products
                </h4>
                <p>
                  For hygiene and organic stability, skincare bottles, lipsticks, and serums must remain unopened with holographic security tamper seals fully intact. Complimentary samples may be tested freely.
                </p>
              </div>

              <div>
                <h4 className="font-serif text-sm text-[#171515] font-medium mb-1">
                  2. Florentine Leather Goods & Accessories
                </h4>
                <p>
                  Belts, wallets, and bags must be unworn and in brand new condition with dust covers and presentation boxes. Complimentary size exchanges are honored with zero courier fee.
                </p>
              </div>

              <div>
                <h4 className="font-serif text-sm text-[#171515] font-medium mb-1">
                  3. Reimbursement Timeline
                </h4>
                <p>
                  Once items are collected by our reverse courier, refunds are transferred within 3–5 business days directly back to your JazzCash, EasyPaisa, or Bank Account.
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-[#ECE7E6] flex items-center justify-between">
              <Link
                href="/return-policy"
                target="_blank"
                className="text-xs text-[#6B7C52] hover:underline"
              >
                View full policy page →
              </Link>
              <button
                type="button"
                onClick={() => setShowRefundModal(false)}
                className="bg-[#171515] text-[#FCFAF9] text-xs uppercase tracking-widest py-2.5 px-6 hover:bg-[#292526] transition-colors"
              >
                Understood & Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
