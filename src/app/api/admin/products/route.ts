import { NextResponse } from 'next/server';
import { PRODUCTS } from '@/lib/data/products';
import { Product } from '@/lib/types';

// In-memory products store for API runtime persistence
let adminProductsStore: Product[] = [...PRODUCTS];

export async function GET() {
  return NextResponse.json({
    success: true,
    count: adminProductsStore.length,
    products: adminProductsStore,
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, mainCategory, subcategory, price, originalPrice, images, description, badge, audience } = body;

    if (!name || !price || !mainCategory || !subcategory) {
      return NextResponse.json(
        { success: false, message: 'Missing required product fields (name, price, mainCategory, subcategory).' },
        { status: 400 }
      );
    }

    const newProduct: Product = {
      id: `prod-${Date.now()}`,
      slug: name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      name,
      subtitle: body.subtitle || 'Luxury Curation',
      description: description || 'Artisanal luxury creation.',
      price: parseFloat(price),
      originalPrice: originalPrice ? parseFloat(originalPrice) : undefined,
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
      details: body.details || ['Handcrafted using organic bio-fermented ingredients.'],
      inStock: true,
      createdAt: new Date().toISOString(),
    };

    adminProductsStore = [newProduct, ...adminProductsStore];

    return NextResponse.json({
      success: true,
      message: 'Product created and mapped to categories successfully.',
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

    adminProductsStore = adminProductsStore.filter((p) => p.id !== id);

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
