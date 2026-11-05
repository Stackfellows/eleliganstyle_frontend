'use client';

import React, { useState } from 'react';
import { Product, ProductVariant } from '@/lib/types';
import { formatPrice } from '@/lib/utils';
import { useCart } from '@/lib/context/CartContext';
import { useWishlist } from '@/lib/context/WishlistContext';
import { useUI } from '@/lib/context/UIContext';
import { Star, Heart, ShoppingBag, Truck, ShieldCheck, RefreshCw, ChevronDown, Check } from 'lucide-react';

export default function ProductInfo({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { openCart, showToast } = useUI();

  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | undefined>(
    product.variants ? product.variants[0] : undefined
  );
  const [selectedColor, setSelectedColor] = useState<string | undefined>(
    product.colors && product.colors.length > 0 ? product.colors[0] : undefined
  );
  const [selectedSize, setSelectedSize] = useState<string | undefined>(
    product.sizes && product.sizes.length > 0 ? product.sizes[0] : undefined
  );
  const [quantity, setQuantity] = useState(1);
  const [activeAccordion, setActiveAccordion] = useState<string | null>('details');

  const isLiked = isInWishlist(product.id);
  const currentPrice = selectedVariant?.priceModifier
    ? product.price + selectedVariant.priceModifier
    : product.price;

  const handleAddToCart = () => {
    addToCart(product, selectedVariant, quantity, selectedColor, selectedSize);
    const optionText = [selectedColor, selectedSize].filter(Boolean).join(' • ');
    showToast({
      type: 'success',
      title: 'Added to Bag',
      message: `${product.name}${optionText ? ` (${optionText})` : ''} has been added to your shopping bag.`,
      image: product.images[0],
    });
    openCart();
  };

  const toggleAccordion = (id: string) => {
    setActiveAccordion((prev) => (prev === id ? null : id));
  };

  return (
    <div className="space-y-8 font-sans">
      {/* Category & Title */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs uppercase tracking-widest text-[#6E6767]">
          <span className="flex items-center gap-2">
            <span className="font-semibold text-[#171515] bg-[#ECE7E6] px-2 py-0.5 rounded text-[10px] tracking-[0.2em]">
              {product.brand || 'ELEGANTSTYLE'}
            </span>
            <span>
              {product.mainCategory} • {product.subcategory.replace('-', ' ')}
            </span>
          </span>
          <span className="text-[#C58C97] font-medium">{product.inStock ? 'IN STOCK' : 'OUT OF STOCK'}</span>
        </div>

        <h1 className="font-serif text-3xl sm:text-4xl font-light text-[#171515] leading-tight">
          {product.name}
        </h1>

        <p className="text-xs sm:text-sm text-[#6E6767] font-light leading-relaxed">
          {product.subtitle}
        </p>
      </div>

      {/* Price & Reviews Bar */}
      <div className="flex items-center justify-between border-y border-[#ECE7E6] py-4">
        <div className="flex items-center gap-3">
          <span className="text-2xl font-serif font-light text-[#171515]">
            {formatPrice(currentPrice)}
          </span>
          {product.originalPrice && (
            <span className="text-xs text-[#6E6767] line-through">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2 text-xs text-[#171515]">
          <div className="flex items-center gap-1 text-[#171515]">
            <Star className="w-4 h-4 fill-[#171515] text-[#171515]" />
            <span className="font-medium">{product.rating}</span>
          </div>
          <span className="text-[#6E6767]">({product.reviewCount} Reviews)</span>
        </div>
      </div>

      {/* Description */}
      <p className="text-xs sm:text-sm text-[#292526] font-light leading-relaxed">
        {product.description}
      </p>

      {/* Variants Selection */}
      {product.variants && (
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs">
            <span className="uppercase tracking-wider font-medium text-[#171515]">
              Select Shade / Option:
            </span>
            <span className="text-[#6E6767] font-light">{selectedVariant?.name}</span>
          </div>
          <div className="flex flex-wrap gap-2.5">
            {product.variants.map((v) => (
              <button
                key={v.id}
                onClick={() => setSelectedVariant(v)}
                className={`py-2.5 px-4 border text-xs transition-all flex items-center gap-2 ${
                  selectedVariant?.id === v.id
                    ? 'border-[#171515] bg-[#171515] text-[#FCFAF9]'
                    : 'border-[#ECE7E6] text-[#171515] hover:border-[#171515] bg-[#FFFFFF]'
                }`}
              >
                {v.colorHex && (
                  <span
                    className="w-3.5 h-3.5 rounded-full border border-[#FFFFFF]"
                    style={{ backgroundColor: v.colorHex }}
                  />
                )}
                <span>{v.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Colors Selection (NEW REQUIREMENT) */}
      {product.colors && product.colors.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs">
            <span className="uppercase tracking-wider font-medium text-[#171515]">
              Select Color Palette:
            </span>
            <span className="text-[#C58C97] font-medium">{selectedColor}</span>
          </div>
          <div className="flex flex-wrap gap-2.5">
            {product.colors.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setSelectedColor(c)}
                className={`py-2 px-3.5 border text-xs transition-all flex items-center gap-2 ${
                  selectedColor === c
                    ? 'border-[#171515] bg-[#171515] text-[#FCFAF9] shadow-sm'
                    : 'border-[#ECE7E6] text-[#171515] hover:border-[#171515] bg-[#FFFFFF]'
                }`}
              >
                <span className="w-2.5 h-2.5 rounded-full border border-current opacity-80" />
                <span>{c}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Sizes Selection (NEW REQUIREMENT) */}
      {product.sizes && product.sizes.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs">
            <span className="uppercase tracking-wider font-medium text-[#171515]">
              Select Dimension / Size:
            </span>
            <span className="text-[#C58C97] font-medium">{selectedSize}</span>
          </div>
          <div className="flex flex-wrap gap-2.5">
            {product.sizes.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setSelectedSize(s)}
                className={`py-2 px-3.5 border text-xs transition-all font-mono ${
                  selectedSize === s
                    ? 'border-[#171515] bg-[#171515] text-[#FCFAF9] shadow-sm'
                    : 'border-[#ECE7E6] text-[#171515] hover:border-[#171515] bg-[#FFFFFF]'
                }`}
              >
                <span>{s}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Quantity & CTAs */}
      <div className="space-y-4 pt-2">
        <div className="flex gap-4">
          {/* Quantity Selector */}
          <div className="flex items-center border border-[#ECE7E6] bg-[#FCFAF9]">
            <button
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="px-4 py-3 hover:bg-[#ECE7E6] transition-colors"
            >
              -
            </button>
            <span className="px-4 text-xs font-medium">{quantity}</span>
            <button
              onClick={() => setQuantity((q) => q + 1)}
              className="px-4 py-3 hover:bg-[#ECE7E6] transition-colors"
            >
              +
            </button>
          </div>

          {/* Add to Bag */}
          <button
            onClick={handleAddToCart}
            className="flex-1 bg-[#171515] text-[#FCFAF9] text-xs uppercase tracking-[0.2em] py-3.5 px-6 flex items-center justify-center gap-2 hover:bg-[#292526] transition-colors shadow-sm"
          >
            <ShoppingBag className="w-4 h-4 stroke-[1.5]" />
            Add to Bag — {formatPrice(currentPrice * quantity)}
          </button>

          {/* Wishlist */}
          <button
            onClick={() => toggleWishlist(product)}
            className={`p-3.5 border border-[#ECE7E6] transition-colors ${
              isLiked ? 'bg-[#F8E8EA] text-[#C58C97]' : 'hover:border-[#171515]'
            }`}
            aria-label="Add to wishlist"
          >
            <Heart className={`w-4 h-4 ${isLiked ? 'fill-[#C58C97]' : ''}`} />
          </button>
        </div>

        {/* Value Propositions */}
        <div className="grid grid-cols-3 gap-3 text-[11px] text-[#6E6767] pt-4 border-t border-[#ECE7E6]">
          <div className="flex items-center gap-2">
            <Truck className="w-4 h-4 text-[#171515]" />
            <span>Complimentary Express Shipping</span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#171515]" />
            <span>100% Authentic Guarantee</span>
          </div>
          <div className="flex items-center gap-2">
            <RefreshCw className="w-4 h-4 text-[#171515]" />
            <span>30-Day Complimentary Returns</span>
          </div>
        </div>
      </div>

      {/* Accordions */}
      <div className="border-t border-[#ECE7E6] divide-y divide-[#ECE7E6] pt-4">
        {/* Ingredients or Materials */}
        {(product.ingredients || product.materials) && (
          <div className="py-4">
            <button
              onClick={() => toggleAccordion('formula')}
              className="w-full flex items-center justify-between text-xs uppercase tracking-widest text-[#171515] font-medium text-left"
            >
              <span>{product.ingredients ? 'Botanical Ingredients' : 'Materials & Craft'}</span>
              <ChevronDown
                className={`w-4 h-4 transition-transform ${
                  activeAccordion === 'formula' ? 'rotate-180' : ''
                }`}
              />
            </button>
            {activeAccordion === 'formula' && (
              <div className="pt-3 text-xs text-[#6E6767] font-light leading-relaxed space-y-2">
                {product.ingredients ? (
                  <ul className="list-disc pl-4 space-y-1">
                    {product.ingredients.map((ing, idx) => (
                      <li key={idx}>{ing}</li>
                    ))}
                  </ul>
                ) : (
                  <ul className="list-disc pl-4 space-y-1">
                    {product.materials?.map((mat, idx) => (
                      <li key={idx}>{mat}</li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>
        )}

        {/* Product Details */}
        <div className="py-4">
          <button
            onClick={() => toggleAccordion('details')}
            className="w-full flex items-center justify-between text-xs uppercase tracking-widest text-[#171515] font-medium text-left"
          >
            <span>Product Specifications & Packaging</span>
            <ChevronDown
              className={`w-4 h-4 transition-transform ${
                activeAccordion === 'details' ? 'rotate-180' : ''
              }`}
            />
          </button>
          {activeAccordion === 'details' && (
            <div className="pt-3 text-xs text-[#6E6767] font-light leading-relaxed">
              <ul className="list-disc pl-4 space-y-1">
                {product.details.map((detail, idx) => (
                  <li key={idx}>{detail}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Usage / Care */}
        {product.usageInstructions && (
          <div className="py-4">
            <button
              onClick={() => toggleAccordion('usage')}
              className="w-full flex items-center justify-between text-xs uppercase tracking-widest text-[#171515] font-medium text-left"
            >
              <span>Usage & Application Ritual</span>
              <ChevronDown
                className={`w-4 h-4 transition-transform ${
                  activeAccordion === 'usage' ? 'rotate-180' : ''
                }`}
              />
            </button>
            {activeAccordion === 'usage' && (
              <div className="pt-3 text-xs text-[#6E6767] font-light leading-relaxed">
                <p>{product.usageInstructions}</p>
              </div>
            )}
          </div>
        )}

        {/* Shipping & Delivery */}
        <div className="py-4">
          <button
            onClick={() => toggleAccordion('shipping')}
            className="w-full flex items-center justify-between text-xs uppercase tracking-widest text-[#171515] font-medium text-left"
          >
            <span>Shipping & Delivery Policy</span>
            <ChevronDown
              className={`w-4 h-4 transition-transform ${
                activeAccordion === 'shipping' ? 'rotate-180' : ''
              }`}
            />
          </button>
          {activeAccordion === 'shipping' && (
            <div className="pt-3 text-xs text-[#6E6767] font-light leading-relaxed">
              <p>
                {product.shippingInfo ||
                  'Delivered in signature ElegantStyle presentation box with carbon-neutral courier tracking. Orders placed before 2 PM EST ship same day.'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
