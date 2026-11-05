'use client';

import { Product, Category } from './types';
import { PRODUCTS } from './data/products';
import { DEAL_BUNDLES, DealBundle } from './data/deals';
import { CATEGORIES } from './data/categories';

const PRODUCTS_STORAGE_KEY = 'elegant_admin_products';
const OFFERS_STORAGE_KEY = 'elegant_admin_offers';
const CATEGORIES_STORAGE_KEY = 'elegant_admin_categories';

export function getStoredCategories(): Category[] {
  if (typeof window === 'undefined') return CATEGORIES;
  try {
    const saved = localStorage.getItem(CATEGORIES_STORAGE_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (e) {
    console.error('Failed to load stored categories', e);
  }
  return CATEGORIES;
}

export function saveCategoryToStore(cat: Category): Category[] {
  const current = getStoredCategories();
  const index = current.findIndex((c) => c.slug === cat.slug || c.id === cat.id);
  let updated: Category[];
  if (index >= 0) {
    updated = [...current];
    updated[index] = cat;
  } else {
    updated = [...current, cat];
  }
  if (typeof window !== 'undefined') {
    localStorage.setItem(CATEGORIES_STORAGE_KEY, JSON.stringify(updated));
  }
  return updated;
}

export function deleteCategoryFromStore(slugOrId: string): Category[] {
  const current = getStoredCategories();
  const updated = current.filter((c) => c.slug !== slugOrId && c.id !== slugOrId);
  if (typeof window !== 'undefined') {
    localStorage.setItem(CATEGORIES_STORAGE_KEY, JSON.stringify(updated));
  }
  return updated;
}

export function addCustomMainCategory(item: {
  name: string;
  slug?: string;
  tagline?: string;
  description?: string;
  heroImage?: string;
  subcategories?: Array<{ slug: string; name: string; description: string; image: string }>;
}): Category[] {
  const slug = item.slug || item.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  const newCat: Category = {
    id: `cat-${slug}-${Date.now()}`,
    slug,
    name: item.name,
    tagline: item.tagline || `Exclusive ${item.name} Curations`,
    description: item.description || `Discover hand-formulated and crafted ${item.name} collections.`,
    heroImage: item.heroImage || 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=1600&auto=format&fit=crop',
    subcategories: item.subcategories || [],
  };
  return saveCategoryToStore(newCat);
}

export function addCustomSubcategory(
  parentSlug: string,
  sub: { name: string; slug?: string; description?: string; image?: string }
): Category[] {
  const current = getStoredCategories();
  const subSlug = sub.slug || sub.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

  const updated = current.map((cat) => {
    if (cat.slug === parentSlug) {
      const existingSubIndex = cat.subcategories.findIndex((s) => s.slug === subSlug);
      const newSub = {
        slug: subSlug,
        name: sub.name,
        description: sub.description || `Luxury ${sub.name} designed with quiet refinement.`,
        image: sub.image || cat.heroImage || 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?q=80&w=1200&auto=format&fit=crop',
      };

      let newSubs = [...cat.subcategories];
      if (existingSubIndex >= 0) {
        newSubs[existingSubIndex] = newSub;
      } else {
        newSubs.push(newSub);
      }
      return { ...cat, subcategories: newSubs };
    }
    return cat;
  });

  if (typeof window !== 'undefined') {
    localStorage.setItem(CATEGORIES_STORAGE_KEY, JSON.stringify(updated));
  }
  return updated;
}

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
