'use client';

import { Product, Category } from './types';
import { PRODUCTS } from './data/products';
import { DEAL_BUNDLES, DealBundle } from './data/deals';

const PRODUCTS_STORAGE_KEY = 'elegant_admin_products';
const OFFERS_STORAGE_KEY = 'elegant_admin_offers';

export function getStoredProducts(): Product[] {
  if (typeof window === 'undefined') return PRODUCTS;
  try {
    const saved = localStorage.getItem(PRODUCTS_STORAGE_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (e) {
    console.error('Failed to load stored products', e);
  }
  return PRODUCTS;
}

export function saveProductToStore(product: Product): Product[] {
  const current = getStoredProducts();
  const index = current.findIndex((p) => p.id === product.id);
  let updated: Product[];
  if (index >= 0) {
    updated = [...current];
    updated[index] = product;
  } else {
    updated = [product, ...current];
  }
  if (typeof window !== 'undefined') {
    localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(updated));
  }
  return updated;
}

export function deleteProductFromStore(id: string): Product[] {
  const current = getStoredProducts();
  const updated = current.filter((p) => p.id !== id);
  if (typeof window !== 'undefined') {
    localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(updated));
  }
  return updated;
}

export function getStoredOffers(): DealBundle[] {
  if (typeof window === 'undefined') return DEAL_BUNDLES;
  try {
    const saved = localStorage.getItem(OFFERS_STORAGE_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (e) {
    console.error('Failed to load stored offers', e);
  }
  return DEAL_BUNDLES;
}

export function saveOfferToStore(offer: DealBundle): DealBundle[] {
  const current = getStoredOffers();
  const index = current.findIndex((o) => o.id === offer.id);
  let updated: DealBundle[];
  if (index >= 0) {
    updated = [...current];
    updated[index] = offer;
  } else {
    updated = [offer, ...current];
  }
  if (typeof window !== 'undefined') {
    localStorage.setItem(OFFERS_STORAGE_KEY, JSON.stringify(updated));
  }
  return updated;
}

export function deleteOfferFromStore(id: string): DealBundle[] {
  const current = getStoredOffers();
  const updated = current.filter((o) => o.id !== id);
  if (typeof window !== 'undefined') {
    localStorage.setItem(OFFERS_STORAGE_KEY, JSON.stringify(updated));
  }
  return updated;
}
