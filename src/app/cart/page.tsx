'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/lib/context/CartContext';
import { formatPrice } from '@/lib/utils';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag, ShieldCheck, Tag } from 'lucide-react';
import Breadcrumbs from '@/components/layout/Breadcrumbs';

export default function CartPage() {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    subtotal,
    freeShippingThreshold,
    freeShippingProgress,
    applyPromoCode,
    appliedPromoCode,
    discountPercentage,
  } = useCart();

  const [promoInput, setPromoInput] = useState('');
  const [promoError, setPromoError] = useState(false);
  const [giftNote, setGiftNote] = useState('');

  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const shippingFee = remainingForFreeShipping === 0 ? 0 : 15;
  const grandTotal = subtotal + shippingFee;

  const handlePromoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (applyPromoCode(promoInput)) {
      setPromoError(false);
      setPromoInput('');
    } else {
      setPromoError(true);
    }
  };

  return (
    <div className="bg-[#FFFFFF] min-h-screen pb-24 font-sans">
      <div className="bg-[#FCFAF9] border-b border-[#ECE7E6] py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-2">
          <Breadcrumbs items={[{ label: 'Shopping Bag' }]} />
          <h1 className="font-serif text-3xl sm:text-4xl font-light text-[#171515]">
            Your Shopping Bag
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        {cart.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Items List */}
            <div className="lg:col-span-8 space-y-8">
              {/* Free Shipping Alert */}
              <div className="bg-[#F8E8EA]/60 border border-[#ECE7E6] p-4 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span>
                    {remainingForFreeShipping > 0
                      ? `Add ${formatPrice(remainingForFreeShipping)} more to qualify for Free Express Shipping`
                      : '🎉 You have unlocked Complimentary Express Shipping!'}
                  </span>
                  <span className="font-medium text-[#C58C97]">{freeShippingProgress}%</span>
                </div>
                <div className="w-full h-1.5 bg-[#FFFFFF] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#C58C97] transition-all duration-500"
                    style={{ width: `${freeShippingProgress}%` }}
                  />
                </div>
              </div>

              {/* Table / List */}
              <div className="divide-y divide-[#ECE7E6] border-y border-[#ECE7E6]">
                {cart.map((item, idx) => {
                  const itemPrice = item.selectedVariant?.priceModifier
                    ? item.product.price + item.selectedVariant.priceModifier
                    : item.product.price;

                  return (
                    <div key={idx} className="py-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                      <div className="flex items-center gap-4">
                        <div className="w-20 h-24 relative bg-[#F8F5F4] border border-[#ECE7E6] flex-shrink-0">
                          <Image
                            src={item.product.images[0]}
                            alt={item.product.name}
                            fill
                            className="object-cover"
                            sizes="80px"
                          />
                        </div>
                        <div className="space-y-1">
                          <Link
                            href={`/product/${item.product.slug}`}
                            className="font-serif text-lg font-light text-[#171515] hover:text-[#C58C97] transition-colors"
                          >
                            {item.product.name}
                          </Link>
                          {item.selectedVariant && (
                            <span className="text-xs text-[#6E6767] block font-light">
                              Variant: {item.selectedVariant.name}
                            </span>
                          )}
                          <span className="text-xs font-medium text-[#171515] block">
                            {formatPrice(itemPrice)}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between w-full sm:w-auto gap-8">
                        {/* Quantity Modifiers */}
                        <div className="flex items-center border border-[#ECE7E6] bg-[#FCFAF9]">
                          <button
                            onClick={() =>
                              updateQuantity(
                                item.product.id,
                                item.quantity - 1,
                                item.selectedVariant?.id
                              )
                            }
                            className="p-2 hover:bg-[#ECE7E6] transition-colors"
                          >
                            <Minus className="w-3 h-3 text-[#171515]" />
                          </button>
                          <span className="px-4 text-xs font-medium">{item.quantity}</span>
                          <button
                            onClick={() =>
                              updateQuantity(
                                item.product.id,
                                item.quantity + 1,
                                item.selectedVariant?.id
                              )
                            }
                            className="p-2 hover:bg-[#ECE7E6] transition-colors"
                          >
                            <Plus className="w-3 h-3 text-[#171515]" />
                          </button>
                        </div>

                        {/* Total price for item */}
                        <span className="text-sm font-semibold text-[#171515]">
                          {formatPrice(itemPrice * item.quantity)}
                        </span>

                        <button
                          onClick={() =>
                            removeFromCart(item.product.id, item.selectedVariant?.id)
                          }
                          className="text-[#6E6767] hover:text-[#A21D21] transition-colors p-2"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Gift Message Optional */}
              <div className="bg-[#FCFAF9] p-6 border border-[#ECE7E6] space-y-2">
                <label className="block text-xs uppercase tracking-wider text-[#171515] font-medium">
                  Add Complimentary Handwritten Gift Card Note
                </label>
                <textarea
                  rows={3}
                  value={giftNote}
                  onChange={(e) => setGiftNote(e.target.value)}
                  placeholder="Write your personal message to be handwritten on ElegantStyle cardstock..."
                  className="w-full bg-[#FFFFFF] border border-[#ECE7E6] text-xs p-3 focus:outline-none focus:border-[#171515]"
                />
              </div>
            </div>

            {/* Right Summary */}
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-[#FCFAF9] p-6 border border-[#ECE7E6] space-y-6">
                <h3 className="font-serif text-xl font-light text-[#171515] border-b border-[#ECE7E6] pb-4">
                  Order Summary
                </h3>

                {/* Promo Code */}
                <form onSubmit={handlePromoSubmit} className="space-y-2">
                  <div className="relative">
                    <Tag className="w-3.5 h-3.5 text-[#6E6767] absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value)}
                      placeholder="Promo Code (VERA15)"
                      className="w-full bg-[#FFFFFF] border border-[#ECE7E6] text-xs pl-9 pr-3 py-2.5 uppercase placeholder:normal-case placeholder:text-[#6E6767] focus:outline-none focus:border-[#171515]"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-[#171515] text-[#FCFAF9] text-[10px] uppercase tracking-widest py-2 hover:bg-[#292526] transition-colors"
                  >
                    Apply Discount Code
                  </button>
                  {appliedPromoCode && (
                    <span className="text-[11px] text-[#C58C97] block pt-1">
                      Code {appliedPromoCode} ({discountPercentage}% Off) Applied!
                    </span>
                  )}
                  {promoError && (
                    <span className="text-[11px] text-[#A21D21] block pt-1">
                      Invalid code. Try VERA15.
                    </span>
                  )}
                </form>

                <div className="space-y-2 text-xs text-[#6E6767] pt-4 border-t border-[#ECE7E6]">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="text-[#171515] font-medium">{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Estimated Shipping</span>
                    <span>{shippingFee === 0 ? 'COMPLIMENTARY' : formatPrice(shippingFee)}</span>
                  </div>
                  <div className="flex justify-between text-sm text-[#171515] font-medium pt-3 border-t border-[#ECE7E6]">
                    <span>Total Amount</span>
                    <span>{formatPrice(grandTotal)}</span>
                  </div>
                </div>

                <Link
                  href="/checkout"
                  className="w-full bg-[#171515] text-[#FCFAF9] text-xs uppercase tracking-[0.2em] py-4 flex items-center justify-center gap-2 hover:bg-[#292526] transition-colors shadow-sm"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <div className="flex items-center justify-center gap-2 text-[10px] text-[#6E6767]">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#171515]" />
                  <span>256-Bit SSL Encrypted & Secure Checkout</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="py-20 text-center space-y-4 max-w-md mx-auto">
            <div className="w-20 h-20 rounded-full bg-[#FCFAF9] border border-[#ECE7E6] flex items-center justify-center mx-auto text-[#6E6767]">
              <ShoppingBag className="w-10 h-10 stroke-[1.2]" />
            </div>
            <h2 className="font-serif text-2xl text-[#171515]">Your bag is currently empty</h2>
            <p className="text-xs text-[#6E6767] font-light">
              Explore our botanical skincare and Italian calfskin leather goods collections.
            </p>
            <Link
              href="/beauty"
              className="inline-block bg-[#171515] text-[#FCFAF9] text-xs uppercase tracking-widest py-3.5 px-8 hover:bg-[#292526] transition-colors"
            >
              Explore Shop Collection
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
