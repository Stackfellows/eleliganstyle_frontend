'use client';

import React from 'react';
import Link from 'next/link';
import ProductCard from '@/components/product/ProductCard';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import { useWishlist } from '@/lib/context/WishlistContext';
import { useCart } from '@/lib/context/CartContext';
import { useUI } from '@/lib/context/UIContext';
import { Heart, ShoppingBag } from 'lucide-react';

export default function WishlistPage() {
  const { wishlist } = useWishlist();
  const { addToCart } = useCart();
  const { showToast, openCart } = useUI();

  const handleMoveAllToCart = () => {
    wishlist.forEach((product) => {
      addToCart(product, undefined, 1);
    });
    showToast({
      type: 'success',
      title: 'Wishlist Moved to Bag',
      message: `${wishlist.length} products added to your bag.`,
    });
    openCart();
  };

  return (
    <div className="bg-[#FFFFFF] min-h-screen pb-24 font-sans">
      <div className="bg-[#FCFAF9] border-b border-[#ECE7E6] py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-2">
          <Breadcrumbs items={[{ label: 'Saved Wishlist' }]} />
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h1 className="font-serif text-3xl sm:text-4xl font-light text-[#171515]">
                Your Saved Vault ({wishlist.length})
              </h1>
              <p className="text-xs text-[#6E6767] font-light mt-1">
                Saved formulations and leather accessories for future consideration.
              </p>
            </div>

            {wishlist.length > 0 && (
              <button
                onClick={handleMoveAllToCart}
                className="bg-[#171515] text-[#FCFAF9] text-xs uppercase tracking-[0.2em] py-3 px-6 hover:bg-[#292526] transition-colors flex items-center gap-2"
              >
                <ShoppingBag className="w-4 h-4 stroke-[1.5]" />
                Move All to Bag
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        {wishlist.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {wishlist.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center space-y-4 max-w-md mx-auto">
            <div className="w-16 h-16 rounded-full bg-[#FCFAF9] border border-[#ECE7E6] flex items-center justify-center mx-auto text-[#6E6767]">
              <Heart className="w-8 h-8 stroke-[1.2]" />
            </div>
            <h2 className="font-serif text-2xl text-[#171515]">Your wishlist is currently empty</h2>
            <p className="text-xs text-[#6E6767] font-light">
              Tap the heart icon on any formulation or leather accessory to save it here.
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
