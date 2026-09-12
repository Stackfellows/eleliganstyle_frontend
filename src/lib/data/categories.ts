import { Category } from '../types';

export const CATEGORIES: Category[] = [
  {
    id: 'cat-beauty',
    slug: 'beauty',
    name: 'Beauty & Cosmetics',
    tagline: 'Pure Botanical Elixirs & High-Art Cosmetics',
    description: 'Immerse your daily rituals in bio-fermented skincare formulations and silk pigment cosmetics crafted with organic French flora.',
    heroImage: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=1600&auto=format&fit=crop',
    subcategories: [
      {
        slug: 'makeup',
        name: 'Makeup',
        description: 'Weightless satin lipsticks, mineral skin fluid tints, and pigment-rich eye accents.',
        image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?q=80&w=1200&auto=format&fit=crop'
      },
      {
        slug: 'skin-care',
        name: 'Skin Care',
        description: 'Restorative serums, velvet creams, and botanical oils designed for radiant resilience.',
        image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=1200&auto=format&fit=crop'
      },
      {
        slug: 'hair-care',
        name: 'Hair Care',
        description: 'Nourishing botanical cleansers and hair balms engineered for softness and luster.',
        image: 'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?q=80&w=1200&auto=format&fit=crop'
      }
    ]
  },
  {
    id: 'cat-fashion',
    slug: 'fashion',
    name: 'Fashion & Style',
    tagline: 'Quiet Luxury Leather Craftsmanship',
    description: 'Hand-woven full-grain calfskin belts and sleek vegetable-tanned wallets handcrafted by Florentine leather artisans.',
    heroImage: 'https://images.unsplash.com/photo-1624222247344-550fb60583dc?q=80&w=1600&auto=format&fit=crop',
    subcategories: [
      {
        slug: 'belts',
        name: 'Belts',
        description: 'Hand-woven woven calfskin and formal reversible belts finished with palladium hardware.',
        image: 'https://images.unsplash.com/photo-1624222247344-550fb60583dc?q=80&w=1200&auto=format&fit=crop'
      },
      {
        slug: 'wallets',
        name: 'Wallets',
        description: 'Bifold wallets, zip compact purses, and slim cardholders crafted from saddle leather.',
        image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?q=80&w=1200&auto=format&fit=crop'
      }
    ]
  }
];

export const AUDIENCE_SECTIONS = [
  {
    slug: 'women',
    name: 'Women',
    tagline: 'Sensual Elegance & Luminous Care',
    description: 'Explore radiant skincare elixirs, silk lip colors, and refined zip compact wallets.',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1200&auto=format&fit=crop',
    subcategories: ['makeup', 'skin-care', 'wallets', 'belts']
  },
  {
    slug: 'men',
    name: 'Men',
    tagline: 'Subtle Precision & Craftsmanship',
    description: 'Hand-woven Italian calfskin belts and vegetable-tanned saddle leather bifolds.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1200&auto=format&fit=crop',
    subcategories: ['belts', 'wallets']
  },
  {
    slug: 'children',
    name: 'Children',
    tagline: 'Gentle Pure Botanical Care',
    description: 'Pediatrician-tested soothing balms and tear-free oat cleansers crafted for child skin.',
    image: 'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?q=80&w=1200&auto=format&fit=crop',
    subcategories: ['skin-care', 'hair-care']
  }
];
