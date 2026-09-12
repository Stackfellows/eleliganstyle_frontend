import { MetadataRoute } from 'next';
import { PRODUCTS } from '@/lib/data/products';
import { CATEGORIES, AUDIENCE_SECTIONS } from '@/lib/data/categories';
import { JOURNAL_ARTICLES } from '@/lib/data/journal';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://elegantstyle.com';

  const staticPages = [
    '',
    '/beauty',
    '/fashion',
    '/women',
    '/men',
    '/children',
    '/cart',
    '/checkout',
    '/wishlist',
    '/journal',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));

  const productPages = PRODUCTS.map((p) => ({
    url: `${baseUrl}/product/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  const journalPages = JOURNAL_ARTICLES.map((a) => ({
    url: `${baseUrl}/journal/${a.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...staticPages, ...productPages, ...journalPages];
}
