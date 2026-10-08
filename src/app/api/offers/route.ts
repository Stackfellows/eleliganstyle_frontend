import { NextResponse } from 'next/server';
import { DEAL_BUNDLES, DEAL_CATEGORIES } from '@/lib/data/deals';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');

    let bundles = [...DEAL_BUNDLES];

    if (category) {
      bundles = bundles.filter((b) => b.dealCategory === category);
    }

    return NextResponse.json({
      success: true,
      categories: DEAL_CATEGORIES,
      count: bundles.length,
      offers: bundles,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Failed to fetch promotional offers.' },
      { status: 500 }
    );
  }
}
