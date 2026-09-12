import { PRODUCTS } from '../data/products';
import { Product, MainCategory, SubCategory, Audience } from '../types';

export interface ProductFilters {
  mainCategory?: MainCategory;
  subcategory?: SubCategory;
  audience?: Audience;
  featuredOnly?: boolean;
  minPrice?: number;
  maxPrice?: number;
  badge?: string;
  sortBy?: 'newest' | 'price-asc' | 'price-desc' | 'rating';
  query?: string;
}

export function getProducts(filters: ProductFilters = {}): Product[] {
  let result = [...PRODUCTS];

  if (filters.mainCategory) {
    result = result.filter((p) => p.mainCategory === filters.mainCategory);
  }

  if (filters.subcategory) {
    result = result.filter((p) => p.subcategory === filters.subcategory);
  }

  if (filters.audience) {
    result = result.filter((p) => p.audience.includes(filters.audience!));
  }

  if (filters.featuredOnly) {
    result = result.filter((p) => p.isFeatured);
  }

  if (filters.minPrice !== undefined) {
    result = result.filter((p) => p.price >= filters.minPrice!);
  }

  if (filters.maxPrice !== undefined) {
    result = result.filter((p) => p.price <= filters.maxPrice!);
  }

  if (filters.badge) {
    result = result.filter((p) => p.badge === filters.badge);
  }

  if (filters.query) {
    const q = filters.query.toLowerCase().trim();
    result = result.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.subtitle.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.mainCategory.toLowerCase().includes(q) ||
        p.subcategory.toLowerCase().includes(q)
    );
  }

  // Sorting logic
  if (filters.sortBy === 'price-asc') {
    result.sort((a, b) => a.price - b.price);
  } else if (filters.sortBy === 'price-desc') {
    result.sort((a, b) => b.price - a.price);
  } else if (filters.sortBy === 'rating') {
    result.sort((a, b) => b.rating - a.rating);
  } else {
    // Default newest
    result.sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  return result;
}

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function getRelatedProducts(product: Product, limit = 4): Product[] {
  return PRODUCTS.filter(
    (p) => p.id !== product.id && (p.subcategory === product.subcategory || p.mainCategory === product.mainCategory)
  ).slice(0, limit);
}

export function searchProducts(query: string, limit = 6): Product[] {
  if (!query.trim()) return [];
  return getProducts({ query }).slice(0, limit);
}
