import { NextResponse } from 'next/server';
import { PRODUCTS } from '@/lib/data/products';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const product = PRODUCTS.find((p) => p.slug === slug || p.id === slug);

    if (!product) {
      return NextResponse.json(
        { success: false, message: 'Product not found.' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      product,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Failed to retrieve product.' },
      { status: 500 }
    );
  }
}
