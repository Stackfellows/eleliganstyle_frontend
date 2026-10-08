'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight, ShieldCheck, Tag } from 'lucide-react';
import { useCart } from '@/lib/context/CartContext';
import { useUI } from '@/lib/context/UIContext';
import { formatPrice } from '@/lib/utils';

export default function CartDrawer() {
  const { isCartOpen, closeCart } = useUI();
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

  const handlePromoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (applyPromoCode(promoInput)) {
      setPromoError(false);
      setPromoInput('');
    } else {
      setPromoError(true);
    }
  };

  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 z-50 bg-[#171515]/40 backdrop-blur-xs"
          />

          {/* Drawer Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-md bg-[#FFFFFF] text-[#171515] shadow-2xl flex flex-col justify-between"
          >
            {/* Header */}
            <div className="p-6 border-b border-[#ECE7E6] flex items-center justify-between bg-[#FCFAF9]">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 stroke-[1.5] text-[#171515]" />
                <h3 className="font-serif text-xl font-light tracking-wide">Shopping Bag</h3>
                <span className="text-xs text-[#6E6767] font-sans font-light">
                  ({cart.reduce((t, i) => t + i.quantity, 0)} Items)
                </span>
              </div>
              <button
                onClick={closeCart}
                className="p-2 text-[#171515] hover:text-[#6E6767] transition-colors"
                aria-label="Close cart"
              >
                <X className="w-5 h-5 stroke-[1.5]" />
              </button>
            </div>

            {/* Free Shipping Progress Indicator */}
            <div className="bg-[#F8E8EA]/60 p-4 border-b border-[#ECE7E6] space-y-2">
              <div className="flex items-center justify-between text-xs font-sans">
                <span className="text-[#171515] font-light">
                  {remainingForFreeShipping > 0
                    ? `Add ${formatPrice(remainingForFreeShipping)} for Complimentary Express Delivery`
                    : '🎉 You have unlocked Complimentary Express Delivery!'}
                </span>
                <span className="text-[#C58C97] font-medium">{freeShippingProgress}%</span>
              </div>
              <div className="w-full h-1.5 bg-[#FFFFFF] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#C58C97] transition-all duration-500"
                  style={{ width: `${freeShippingProgress}%` }}
                />
              </div>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 divide-y divide-[#ECE7E6]/60">
              {cart.length > 0 ? (
                cart.map((item, idx) => {
                  const itemPrice = item.selectedVariant?.priceModifier
                    ? item.product.price + item.selectedVariant.priceModifier
                    : item.product.price;

                  return (
                    <div key={idx} className="pt-6 first:pt-0 flex gap-4">
                      {/* Image */}
                      <div className="w-20 h-24 relative bg-[#F8F5F4] flex-shrink-0 border border-[#ECE7E6]">
                        <Image
                          src={item.product.images[0]}
                          alt={item.product.name}
                          fill
                          className="object-cover"
                          sizes="80px"
                        />
                      </div>

                      {/* Info */}
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex items-start justify-between">
                            <h4 className="font-serif text-base font-light text-[#171515] line-clamp-1">
                              {item.product.name}
                            </h4>
                            <button
                              onClick={() =>
                                removeFromCart(item.product.id, item.selectedVariant?.id)
                              }
                              className="text-[#6E6767] hover:text-[#A21D21] transition-colors p-1"
                              aria-label="Remove item"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          {item.selectedVariant && (
                            <span className="text-[11px] text-[#6E6767] font-sans block mt-0.5">
                              Variant: {item.selectedVariant.name}
                            </span>
                          )}

                          <span className="text-xs font-medium text-[#171515] font-sans block mt-1">
                            {formatPrice(itemPrice)}
                          </span>
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center justify-between pt-2">
                          <div className="flex items-center border border-[#ECE7E6] bg-[#FCFAF9]">
                            <button
                              onClick={() =>
                                updateQuantity(
                                  item.product.id,
                                  item.quantity - 1,
                                  item.selectedVariant?.id
                                )
                              }
                              className="p-1.5 hover:bg-[#ECE7E6] transition-colors"
                            >
                              <Minus className="w-3 h-3 text-[#171515]" />
                            </button>
                            <span className="px-3 text-xs font-sans text-[#171515]">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(
                                  item.product.id,
                                  item.quantity + 1,
                                  item.selectedVariant?.id
                                )
                              }
                              className="p-1.5 hover:bg-[#ECE7E6] transition-colors"
                            >
                              <Plus className="w-3 h-3 text-[#171515]" />
                            </button>
                          </div>

                          <span className="text-xs font-semibold text-[#171515] font-sans">
                            {formatPrice(itemPrice * item.quantity)}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="py-20 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-[#FCFAF9] border border-[#ECE7E6] flex items-center justify-center mx-auto text-[#6E6767]">
                    <ShoppingBag className="w-8 h-8 stroke-[1.2]" />
                  </div>
                  <h4 className="font-serif text-xl font-light text-[#171515]">
                    Your bag is currently empty
                  </h4>
                  <p className="text-xs text-[#6E6767] font-sans font-light">
                    Explore our botanical skincare and Italian leather collections.
                  </p>
                  <button
                    onClick={closeCart}
                    className="inline-block bg-[#171515] text-[#FCFAF9] text-xs uppercase tracking-widest py-3 px-8 hover:bg-[#292526] transition-colors"
                  >
                    Explore Shop
                  </button>
                </div>
              )}
            </div>

            {/* Footer Summary & Checkout */}
            {cart.length > 0 && (
              <div className="p-6 border-t border-[#ECE7E6] bg-[#FCFAF9] space-y-4 font-sans">
                {/* Promo Code Form */}
                <form onSubmit={handlePromoSubmit} className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="w-3.5 h-3.5 text-[#6E6767] absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value)}
                      placeholder="Promo Code (e.g. ELEGANT15)"
                      className="w-full bg-[#FFFFFF] border border-[#ECE7E6] text-xs pl-9 pr-3 py-2 uppercase placeholder:normal-case placeholder:text-[#6E6767] focus:outline-none focus:border-[#171515]"
                    />
                  </div>
                  <button
                    type="submit"
                    className="bg-[#171515] text-[#FCFAF9] text-[10px] uppercase tracking-widest px-4 hover:bg-[#292526] transition-colors"
                  >
                    Apply
                  </button>
                </form>

                {appliedPromoCode && (
                  <div className="text-[11px] text-[#C58C97] flex items-center justify-between">
                    <span>Promo Applied ({appliedPromoCode})</span>
                    <span>-{discountPercentage}% Off</span>
                  </div>
                )}
                {promoError && (
                  <div className="text-[11px] text-[#A21D21]">
                    Invalid code. Try ELEGANT15 for 15% off.
                  </div>
                )}

                {/* Subtotal */}
                <div className="space-y-1 pt-2 border-t border-[#ECE7E6]">
                  <div className="flex items-center justify-between text-xs text-[#6E6767]">
                    <span>Subtotal</span>
                    <span className="text-[#171515] font-medium">{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-[#6E6767]">
                    <span>Estimated Shipping</span>
                    <span>{remainingForFreeShipping === 0 ? 'FREE' : formatPrice(15)}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm text-[#171515] font-medium pt-2 border-t border-[#ECE7E6]">
                    <span>Total</span>
                    <span>
                      {formatPrice(subtotal + (remainingForFreeShipping === 0 ? 0 : 15))}
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-2 pt-2">
                  <Link
                    href="/checkout"
                    onClick={closeCart}
                    className="w-full bg-[#171515] text-[#FCFAF9] text-xs uppercase tracking-[0.2em] py-3.5 flex items-center justify-center gap-2 hover:bg-[#292526] transition-colors"
                  >
                    Proceed to Checkout
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>

                  <Link
                    href="/cart"
                    onClick={closeCart}
                    className="w-full bg-[#FFFFFF] border border-[#ECE7E6] text-[#171515] text-[11px] uppercase tracking-widest py-2.5 flex items-center justify-center hover:bg-[#F8F5F4] transition-colors"
                  >
                    View Detailed Bag
                  </Link>
                </div>

                <div className="flex items-center justify-center gap-2 text-[10px] text-[#6E6767] pt-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#6E6767]" />
                  <span>256-Bit SSL Encrypted & Guaranteed Authenticity</span>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
