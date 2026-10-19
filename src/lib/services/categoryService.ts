import { CATEGORIES, AUDIENCE_SECTIONS } from '../data/categories';
import { Category, SubCategory } from '../types';

export function getCategories(): Category[] {
  return CATEGORIES;
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return CATEGORIES.find((c) => c.slug === slug);
}

export function getAudienceSectionBySlug(slug: string) {
  return AUDIENCE_SECTIONS.find((a) => a.slug === slug);
}

export interface SubcategoryMeta {
  slug: SubCategory;
  name: string;
  tagline: string;
  description: string;
  parentCategorySlug: 'beauty' | 'fashion';
  image: string;
}

export const SUBCATEGORY_METADATA: Record<string, SubcategoryMeta> = {
  makeup: {
    slug: 'makeup',
    name: 'Makeup',
    tagline: 'Silk Textures & Mineral Radiance',
    description: 'Explore weightless satin lip colors, light-reflecting mineral skin tints, and delicate Parisian finishes.',
    parentCategorySlug: 'beauty',
    image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?q=80&w=1200&auto=format&fit=crop',
  },
  'skin-care': {
    slug: 'skin-care',
    name: 'Skincare',
    tagline: 'Pure Bio-Fermented Botanical Formulations',
    description: 'Damask Rose restorative serums, cold-pressed Camellia barrier creams, and soothing pediatrician-tested balms.',
    parentCategorySlug: 'beauty',
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=1200&auto=format&fit=crop',
  },
  skincare: {
    slug: 'skin-care',
    name: 'Skincare',
    tagline: 'Pure Bio-Fermented Botanical Formulations',
    description: 'Damask Rose restorative serums, cold-pressed Camellia barrier creams, and soothing pediatrician-tested balms.',
    parentCategorySlug: 'beauty',
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=1200&auto=format&fit=crop',
  },
  belts: {
    slug: 'belts',
    name: 'Belts',
    tagline: 'Tuscan Full-Grain Calfskin & Solid Hardware',
    description: 'Hand-woven Italian calfskin belts, formal reversible dress belts, and solid brass buckles finished in palladium.',
    parentCategorySlug: 'fashion',
    image: 'https://images.unsplash.com/photo-1624222247344-550fb60583dc?q=80&w=1200&auto=format&fit=crop',
  },
  wallets: {
    slug: 'wallets',
    name: 'Wallets',
    tagline: 'Saddle Leather & Florentine Stitching',
    description: 'Minimalist bifold wallets, zip-around compact purse designs, and ultra-slim card cases handcrafted from French calfskin.',
    parentCategorySlug: 'fashion',
    image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?q=80&w=1200&auto=format&fit=crop',
  },
  'hand-bags': {
    slug: 'hand-bags',
    name: 'Hand Bags',
    tagline: 'Sculptural Luxury Leather Silhouettes',
    description: 'Handcrafted full-grain Florentine calfskin handbags, structured satchels, and versatile shoulder totes with gold-plated locks.',
    parentCategorySlug: 'fashion',
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=1200&auto=format&fit=crop',
  },
  'school-belts': {
    slug: 'school-belts',
    name: 'School Belts',
    tagline: 'Reinforced Academy & Uniform Durability',
    description: 'Heavy-duty vegetable-tanned leather school belts featuring nickel-free hypoallergenic buckles, rounded edges, and uniform compliance.',
    parentCategorySlug: 'fashion',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=1200&auto=format&fit=crop',
  },
  deals: {
    slug: 'deals',
    name: 'Deals & Discounts',
    tagline: 'Exclusive Curated Suites & Archive Privileges',
    description: 'Save up to 35% on Bridal suites, Party Glamour sets, and everyday Parisian makeup essentials.',
    parentCategorySlug: 'beauty',
    image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=1200&auto=format&fit=crop',
  }
};

export function getSubcategoryMeta(slug: string): SubcategoryMeta | undefined {
  const normalized = slug.toLowerCase().trim();
  return SUBCATEGORY_METADATA[normalized];
}
