import { NextResponse } from 'next/server';
import { DEAL_BUNDLES, DealBundle } from '@/lib/data/deals';

let adminOffersStore: DealBundle[] = [...DEAL_BUNDLES];

export async function GET() {
  return NextResponse.json({
    success: true,
    count: adminOffersStore.length,
    offers: adminOffersStore,
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, dealCategory, originalPrice, discountedPrice, savingsPercentage, image, badge, includes, perks } = body;

    if (!title || !discountedPrice || !dealCategory) {
      return NextResponse.json(
        { success: false, message: 'Missing required offer fields (title, discountedPrice, dealCategory).' },
        { status: 400 }
      );
    }

    const newOffer: DealBundle = {
      id: `deal-${Date.now()}`,
      slug: title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      dealCategory,
      title,
      subtitle: body.subtitle || 'Exclusive Maison Privilege',
      description: body.description || 'Special luxury package.',
      originalPrice: parseFloat(originalPrice || discountedPrice),
      discountedPrice: parseFloat(discountedPrice),
      savingsPercentage: parseInt(savingsPercentage || '30'),
      badge: badge || 'EXCLUSIVE',
      image: image || 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=1200&auto=format&fit=crop',
      includes: includes || ['Full size luxury product'],
      perks: perks || ['Complimentary luxury gift box'],
    };

    adminOffersStore = [newOffer, ...adminOffersStore];

    return NextResponse.json({
      success: true,
      message: 'Offer bundle created successfully.',
      offer: newOffer,
    }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Failed to create offer.' },
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
        { success: false, message: 'Offer ID required.' },
        { status: 400 }
      );
    }

    adminOffersStore = adminOffersStore.filter((o) => o.id !== id);

    return NextResponse.json({
      success: true,
      message: `Offer ${id} removed successfully.`,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Failed to delete offer.' },
      { status: 500 }
    );
  }
}
