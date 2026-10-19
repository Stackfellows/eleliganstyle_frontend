import { NextResponse } from 'next/server';
import { PRODUCTS } from '@/lib/data/products';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const mainCategory = searchParams.get('mainCategory');
    const subcategory = searchParams.get('subcategory');
    const audience = searchParams.get('audience');
    const query = searchParams.get('q');
    const featured = searchParams.get('featured');

    let filtered = [...PRODUCTS];

    if (mainCategory) {
      filtered = filtered.filter((p) => p.mainCategory === mainCategory);
    }

    if (subcategory) {
      filtered = filtered.filter((p) => p.subcategory === subcategory);
    }

    if (audience) {
      filtered = filtered.filter((p) => p.audience.includes(audience as any));
    }

    if (featured === 'true') {
      filtered = filtered.filter((p) => p.isFeatured);
    }

    if (query) {
      const q = query.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.subcategory.toLowerCase().includes(q)
      );
    }

    return NextResponse.json({
      success: true,
      count: filtered.length,
      products: filtered,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Failed to fetch products.' },
      { status: 500 }
    );
  }
}
