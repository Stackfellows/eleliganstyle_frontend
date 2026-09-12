'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, Eye, ShoppingBag, Star } from 'lucide-react';
import { Product } from '@/lib/types';
import { formatPrice } from '@/lib/utils';
import { useWishlist } from '@/lib/context/WishlistContext';
import { useCart } from '@/lib/context/CartContext';
import { useUI } from '@/lib/context/UIContext';

export default function ProductCard({ product }: { product: Product }) {
  const [isHovered, setIsHovered] = useState(false);
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();
  const { openQuickView, showToast, openCart } = useUI();

  const isLiked = isInWishlist(product.id);
  const secondImage = product.images[1] || product.images[0];

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const defaultVariant = product.variants ? product.variants[0] : undefined;
    addToCart(product, defaultVariant, 1);
    showToast({
      type: 'success',
      title: 'Added to Bag',
      message: `${product.name} has been added to your shopping bag.`,
      image: product.images[0],
    });
    openCart();
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
    showToast({
      type: 'info',
      title: isLiked ? 'Removed from Wishlist' : 'Saved to Wishlist',
      message: `${product.name} ${isLiked ? 'removed from' : 'added to'} your wishlist.`,
      image: product.images[0],
    });
  };

  const handleQuickViewOpen = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    openQuickView(product);
  };

  return (
    <div
      className="group relative flex flex-col bg-[#FFFFFF] border border-[#ECE7E6] transition-all duration-500 hover:shadow-md"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Gallery Container */}
      <div className="relative aspect-3/4 w-full overflow-hidden bg-[#F8F5F4]">
        <Link href={`/product/${product.slug}`} className="block w-full h-full">
          <Image
            src={isHovered ? secondImage : product.images[0]}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        </Link>

        {/* Badge */}
        {product.badge && (
          <span className="absolute top-3 left-3 bg-[#171515] text-[#FCFAF9] text-[9px] tracking-[0.2em] font-sans uppercase py-1 px-2.5 z-10">
            {product.badge}
          </span>
        )}

        {/* Wishlist Button */}
        <button
          onClick={handleWishlistToggle}
          className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-[#FFFFFF]/90 backdrop-blur-xs flex items-center justify-center text-[#171515] hover:bg-[#171515] hover:text-[#FFFFFF] transition-colors shadow-xs"
          aria-label="Add to wishlist"
        >
          <Heart
            className={`w-4 h-4 transition-colors ${
              isLiked ? 'fill-[#C58C97] text-[#C58C97]' : 'stroke-[1.5]'
            }`}
          />
        </button>

        {/* Quick View & Quick Add Action Bar */}
        <div className="absolute bottom-3 left-3 right-3 z-10 flex gap-2 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
          <button
            onClick={handleQuickViewOpen}
            className="flex-1 bg-[#FFFFFF]/95 backdrop-blur-xs text-[#171515] hover:bg-[#171515] hover:text-[#FFFFFF] text-[10px] uppercase tracking-widest py-2.5 px-3 flex items-center justify-center gap-1.5 transition-colors border border-[#ECE7E6]"
          >
            <Eye className="w-3.5 h-3.5 stroke-[1.5]" />
            <span className="hidden sm:inline">Quick View</span>
          </button>
          <button
            onClick={handleQuickAdd}
            className="flex-1 bg-[#171515] text-[#FCFAF9] hover:bg-[#292526] text-[10px] uppercase tracking-widest py-2.5 px-3 flex items-center justify-center gap-1.5 transition-colors"
          >
            <ShoppingBag className="w-3.5 h-3.5 stroke-[1.5]" />
            <span>Add to Bag</span>
          </button>
        </div>
      </div>

      {/* Product Details */}
      <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between space-y-2">
        <div>
          <div className="flex items-center justify-between text-[10px] uppercase tracking-widest text-[#6E6767] mb-1 font-sans">
            <span>{product.subcategory.replace('-', ' ')}</span>
            <div className="flex items-center gap-1 text-[#171515]">
              <Star className="w-3 h-3 fill-[#171515] text-[#171515]" />
              <span>{product.rating}</span>
            </div>
          </div>

          <Link href={`/product/${product.slug}`} className="block group-hover:text-[#C58C97] transition-colors">
            <h3 className="font-serif text-base sm:text-lg font-light text-[#171515] line-clamp-1">
              {product.name}
            </h3>
          </Link>

          <p className="text-xs text-[#6E6767] line-clamp-1 font-light mt-0.5 font-sans">
            {product.subtitle}
          </p>
        </div>

        {/* Pricing */}
        <div className="flex items-center gap-2 pt-2 border-t border-[#ECE7E6]/60 font-sans text-xs">
          <span className="font-medium text-[#171515]">{formatPrice(product.price)}</span>
          {product.originalPrice && (
            <span className="text-[#6E6767] line-through text-[11px]">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
