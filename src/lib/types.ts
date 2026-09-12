export type MainCategory = 'beauty' | 'fashion';

export type SubCategory =
  | 'makeup'
  | 'skin-care'
  | 'belts'
  | 'wallets'
  | 'hair-care';

export type Audience = 'women' | 'men' | 'children';

export interface ProductVariant {
  id: string;
  name: string;
  sku: string;
  inStock: boolean;
  colorHex?: string;
  size?: string;
  priceModifier?: number;
}

export interface Review {
  id: string;
  userName: string;
  userLocation: string;
  rating: number; // 1 to 5
  date: string;
  title: string;
  comment: string;
  verifiedPurchase: boolean;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  subtitle: string;
  description: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  mainCategory: MainCategory;
  subcategory: SubCategory;
  audience: Audience[];
  badge?: 'NEW' | 'BEST SELLER' | 'LIMITED' | 'AWARD WINNER';
  images: string[];
  variants?: ProductVariant[];
  ingredients?: string[];
  materials?: string[];
  details: string[];
  usageInstructions?: string;
  shippingInfo?: string;
  isFeatured?: boolean;
  inStock: boolean;
  createdAt: string;
  reviews?: Review[];
}

export interface Category {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  heroImage: string;
  subcategories: {
    slug: string;
    name: string;
    description: string;
    image: string;
  }[];
}

export interface CartItem {
  product: Product;
  selectedVariant?: ProductVariant;
  quantity: number;
}

export interface JournalArticle {
  id: string;
  slug: string;
  title: string;
  category: 'beauty' | 'fashion' | 'skincare' | 'lifestyle';
  subtitle: string;
  author: string;
  publishedAt: string;
  readTime: string;
  coverImage: string;
  content: {
    type: 'paragraph' | 'heading' | 'quote' | 'image' | 'shoppable';
    value: string;
    productSlug?: string;
    caption?: string;
  }[];
  relatedProductSlugs?: string[];
}
