import { CATEGORIES, AUDIENCE_SECTIONS } from '../data/categories';
import { Category } from '../types';

export function getCategories(): Category[] {
  return CATEGORIES;
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return CATEGORIES.find((c) => c.slug === slug);
}

export function getAudienceSectionBySlug(slug: string) {
  return AUDIENCE_SECTIONS.find((a) => a.slug === slug);
}
