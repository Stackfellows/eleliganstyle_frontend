import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { PRODUCTS } from '@/lib/data/products';
import { Product } from '@/lib/types';

const CUSTOM_PRODUCTS_PATH = path.join(process.cwd(), 'src/lib/data/custom_products.json');

function getCustomProducts(): Product[] {
  try {
    if (fs.existsSync(CUSTOM_PRODUCTS_PATH)) {
      const data = fs.readFileSync(CUSTOM_PRODUCTS_PATH, 'utf8');
      return JSON.parse(data);
    }
  } catch (e) {
    console.error('Failed reading custom_products.json', e);
  }
  return [];
}

function saveCustomProducts(products: Product[]) {
  try {
    fs.writeFileSync(CUSTOM_PRODUCTS_PATH, JSON.stringify(products, null, 2), 'utf8');
  } catch (e) {
    console.error('Failed writing custom_products.json', e);
  }
}

export async function GET() {
  const custom = getCustomProducts();
  const all = [...custom, ...PRODUCTS];
  return NextResponse.json({
    success: true,
    count: all.length,
    products: all,
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      name,
      mainCategory,
      subcategory,
      price,
      originalPrice,
      discount,
      images,
      description,
      subtitle,
      badge,
      audience,
      brand,
      colors,
      sizes,
      details,
      productCode,
      id
    } = body;

    if (!name || !price || !mainCategory || !subcategory) {
      return NextResponse.json(
        { success: false, message: 'Missing required product fields (name, price, mainCategory, subcategory).' },
        { status: 400 }
      );
    }

    const newProduct: Product = {
      id: id || `prod-${Date.now()}`,
      productCode: productCode || `ELG-${Math.floor(1000 + Math.random() * 9000)}`,
      slug: (name || '').toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      name,
      subtitle: subtitle || 'Luxury Curation',
      description: description || 'Artisanal luxury creation.',
      brand: brand || 'ELEGANTSTYLE',
      colors: Array.isArray(colors) ? colors : undefined,
      sizes: Array.isArray(sizes) ? sizes : undefined,
      price: typeof price === 'number' ? price : parseFloat(price),
      originalPrice: originalPrice ? (typeof originalPrice === 'number' ? originalPrice : parseFloat(originalPrice)) : undefined,
      discount: discount ? (typeof discount === 'number' ? discount : parseFloat(discount)) : undefined,
      rating: 5.0,
      reviewCount: 1,
      mainCategory,
      subcategory,
      audience: audience || ['women'],
      badge: badge || undefined,
      images: Array.isArray(images) && images.length > 0 ? images : [
        'https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=1200&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1586495777744-4413f21062fa?q=80&w=1200&auto=format&fit=crop'
      ],
      details: Array.isArray(details) ? details : ['Handcrafted using organic bio-fermented ingredients.'],
      inStock: true,
      createdAt: new Date().toISOString(),
    };

    const currentCustom = getCustomProducts();
    const existingIndex = currentCustom.findIndex((p) => p.id === newProduct.id || p.slug === newProduct.slug);
    let updated: Product[];
    if (existingIndex >= 0) {
      updated = [...currentCustom];
      updated[existingIndex] = newProduct;
    } else {
      updated = [newProduct, ...currentCustom];
    }

    saveCustomProducts(updated);

    return NextResponse.json({
      success: true,
      message: 'Product created and synced to server successfully.',
      product: newProduct,
    }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Failed to create product.' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { success: false, message: 'Product ID required.' },
        { status: 400 }
      );
    }

    const currentCustom = getCustomProducts();
    const updated = currentCustom.filter((p) => p.id !== id);
    saveCustomProducts(updated);

    return NextResponse.json({
      success: true,
      message: `Product ${id} deleted successfully.`,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Failed to delete product.' },
      { status: 500 }
    );
  }
}
