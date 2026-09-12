'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Star, ShoppingBag, Heart, Check, ArrowRight } from 'lucide-react';
import { useUI } from '@/lib/context/UIContext';
import { useCart } from '@/lib/context/CartContext';
import { useWishlist } from '@/lib/context/WishlistContext';
import { formatPrice } from '@/lib/utils';
import { ProductVariant } from '@/lib/types';

export default function QuickViewModal() {
  const { quickViewProduct, closeQuickView, openCart, showToast } = useUI();
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const [selectedImageIdx, setSelectedImageIdx] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | undefined>(
    quickViewProduct?.variants ? quickViewProduct.variants[0] : undefined
  );
  const [quantity, setQuantity] = useState(1);

  if (!quickViewProduct) return null;

  const isLiked = isInWishlist(quickViewProduct.id);
  const finalPrice = selectedVariant?.priceModifier
    ? quickViewProduct.price + selectedVariant.priceModifier
    : quickViewProduct.price;

  const handleAddToCart = () => {
    addToCart(quickViewProduct, selectedVariant, quantity);
    closeQuickView();
    showToast({
      type: 'success',
      title: 'Added to Bag',
      message: `${quickViewProduct.name} (${quantity}) added to your bag.`,
      image: quickViewProduct.images[0],
    });
    openCart();
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-[#171515]/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6"
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="relative max-w-4xl w-full bg-[#FFFFFF] border border-[#ECE7E6] shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2 max-h-[90vh] overflow-y-auto"
        >
          {/* Close button */}
          <button
            onClick={closeQuickView}
            className="absolute top-4 right-4 z-20 p-2 bg-[#FFFFFF]/80 rounded-full text-[#171515] hover:bg-[#171515] hover:text-[#FFFFFF] transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5 stroke-[1.5]" />
          </button>

          {/* Left / Gallery */}
          <div className="bg-[#F8F5F4] p-6 flex flex-col justify-between space-y-4">
            <div className="relative aspect-square w-full bg-[#FFFFFF] border border-[#ECE7E6] overflow-hidden">
              <Image
                src={quickViewProduct.images[selectedImageIdx]}
                alt={quickViewProduct.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>

            {quickViewProduct.images.length > 1 && (
              <div className="flex gap-2 justify-center">
                {quickViewProduct.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIdx(idx)}
                    className={`w-14 h-14 relative border transition-all ${
                      selectedImageIdx === idx ? 'border-[#171515] scale-105' : 'border-[#ECE7E6]'
                    }`}
                  >
                    <Image src={img} alt="" fill className="object-cover" sizes="56px" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right / Product Information */}
          <div className="p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div>
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#6E6767] font-sans font-medium block">
                  {quickViewProduct.mainCategory} • {quickViewProduct.subcategory}
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-light text-[#171515] mt-1">
                  {quickViewProduct.name}
                </h3>
                <p className="text-xs text-[#6E6767] font-sans font-light mt-1">
                  {quickViewProduct.subtitle}
                </p>
              </div>

              {/* Rating & Price */}
              <div className="flex items-center justify-between border-y border-[#ECE7E6] py-3 font-sans">
                <div className="flex items-center gap-1.5 text-xs text-[#171515]">
                  <Star className="w-4 h-4 fill-[#171515] text-[#171515]" />
                  <span className="font-medium">{quickViewProduct.rating}</span>
                  <span className="text-[#6E6767]">({quickViewProduct.reviewCount} Reviews)</span>
                </div>
                <div className="text-lg font-medium text-[#171515]">
                  {formatPrice(finalPrice)}
                </div>
              </div>

              <p className="text-xs text-[#292526] font-sans leading-relaxed font-light">
                {quickViewProduct.description}
              </p>

              {/* Variants if present */}
              {quickViewProduct.variants && (
                <div className="space-y-2">
                  <span className="text-xs font-medium text-[#171515] uppercase tracking-wider block font-sans">
                    Select Shade / Option:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {quickViewProduct.variants.map((v) => (
                      <button
                        key={v.id}
                        onClick={() => setSelectedVariant(v)}
                        className={`text-xs py-2 px-3 border transition-colors flex items-center gap-2 font-sans ${
                          selectedVariant?.id === v.id
                            ? 'border-[#171515] bg-[#171515] text-[#FCFAF9]'
                            : 'border-[#ECE7E6] text-[#171515] hover:border-[#171515]'
                        }`}
                      >
                        {v.colorHex && (
                          <span
                            className="w-3 h-3 rounded-full border border-[#FFFFFF]"
                            style={{ backgroundColor: v.colorHex }}
                          />
                        )}
                        <span>{v.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity */}
              <div className="flex items-center gap-4 font-sans text-xs pt-2">
                <span className="text-[#6E6767] uppercase tracking-wider font-light">Quantity:</span>
                <div className="flex items-center border border-[#ECE7E6]">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="px-3 py-1.5 hover:bg-[#FCFAF9]"
                  >
                    -
                  </button>
                  <span className="px-4 font-medium">{quantity}</span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="px-3 py-1.5 hover:bg-[#FCFAF9]"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="space-y-3 pt-4 border-t border-[#ECE7E6] font-sans">
              <div className="flex gap-3">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-[#171515] text-[#FCFAF9] text-xs uppercase tracking-[0.2em] py-3.5 flex items-center justify-center gap-2 hover:bg-[#292526] transition-colors"
                >
                  <ShoppingBag className="w-4 h-4" />
                  Add to Bag — {formatPrice(finalPrice * quantity)}
                </button>
                <button
                  onClick={() => toggleWishlist(quickViewProduct)}
                  className={`p-3.5 border border-[#ECE7E6] transition-colors ${
                    isLiked ? 'bg-[#F8E8EA] text-[#C58C97]' : 'hover:border-[#171515]'
                  }`}
                  aria-label="Wishlist"
                >
                  <Heart className={`w-4 h-4 ${isLiked ? 'fill-[#C58C97]' : ''}`} />
                </button>
              </div>

              <Link
                href={`/product/${quickViewProduct.slug}`}
                onClick={closeQuickView}
                className="w-full bg-[#FCFAF9] border border-[#ECE7E6] text-[#171515] text-[11px] uppercase tracking-widest py-2.5 flex items-center justify-center gap-1.5 hover:bg-[#F8F5F4] transition-colors"
              >
                View Complete Product Details
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
