import { NextResponse } from 'next/server';
import { sendOrderConfirmationEmail, sendAdminNewOrderAlert, sendOrderStatusUpdateEmail } from '@/lib/services/emailService';

let ordersStore = [
  {
    id: 'ORD-PK-9821',
    customerName: 'Ayesha Khan',
    customerPhone: '+92 300 4589210',
    customerEmail: 'ayesha.khan@gmail.com',
    shippingAddress: {
      street: 'House 42-B, Block C, Gulberg III',
      city: 'Lahore',
      province: 'Punjab',
      postalCode: '54000',
      deliveryNotes: 'Deliver after 3 PM. Call customer upon arrival.'
    },
    items: [
      { productName: 'Rouge Opéra Satin Silk Lipstick (Nude Élégance)', quantity: 2, pricePKR: 12500 },
      { productName: 'Éclat Mineral Glow Fluid Tint', quantity: 1, pricePKR: 18000 }
    ],
    totalPKR: 43500,
    paymentMethod: 'Cash on Delivery (COD)',
    status: 'Processing',
    createdAt: '2026-10-07T06:20:00Z'
  },
  {
    id: 'ORD-PK-9820',
    customerName: 'Hamza Farooq',
    customerPhone: '+92 321 8849102',
    customerEmail: 'hamza.farooq@outlook.com',
    shippingAddress: {
      street: 'Apartment 502, Creek Vistas, Phase 8 DHA',
      city: 'Karachi',
      province: 'Sindh',
      postalCode: '75500',
      deliveryNotes: 'Leave with reception if unavailable.'
    },
    items: [
      { productName: 'Florentine Hand-Woven Calfskin Formal Belt', quantity: 1, pricePKR: 35000 }
    ],
    totalPKR: 35000,
    paymentMethod: 'Bank Transfer',
    status: 'Dispatched',
    createdAt: '2026-10-07T04:45:00Z'
  }
];

export async function GET() {
  return NextResponse.json({
    success: true,
    currency: 'PKR',
    count: ordersStore.length,
    orders: ordersStore,
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { customerName, customerPhone, customerEmail, shippingAddress, items, totalPKR, paymentMethod } = body;

    if (!customerName || !customerPhone || !items || !totalPKR) {
      return NextResponse.json(
        { success: false, message: 'Missing required order fields (customerName, customerPhone, items, totalPKR).' },
        { status: 400 }
      );
    }

    const newOrder = {
      id: `ORD-PK-${Math.floor(1000 + Math.random() * 9000)}`,
      customerName,
      customerPhone,
      customerEmail: customerEmail || 'customer@maison.pk',
      shippingAddress: shippingAddress || {
        street: 'Main Mall Road',
        city: 'Lahore',
        province: 'Punjab',
        postalCode: '54000'
      },
      items,
      totalPKR: parseFloat(totalPKR),
      paymentMethod: paymentMethod || 'Cash on Delivery (COD)',
      status: 'Pending',
      createdAt: new Date().toISOString(),
    };

    ordersStore = [newOrder, ...ordersStore];

    // Trigger Nodemailer notifications in background
    sendOrderConfirmationEmail(newOrder).catch((err) => console.error('Confirmation email error:', err));
    sendAdminNewOrderAlert(newOrder).catch((err) => console.error('Admin alert email error:', err));

    return NextResponse.json({
      success: true,
      message: 'Order created successfully in PKR.',
      order: newOrder,
    }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Failed to place order.' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { orderId, status } = body;

    if (!orderId || !status) {
      return NextResponse.json(
        { success: false, message: 'orderId and status are required.' },
        { status: 400 }
      );
    }

    const order = ordersStore.find((o) => o.id === orderId);
    if (!order) {
      return NextResponse.json(
        { success: false, message: 'Order not found.' },
        { status: 404 }
      );
    }

    order.status = status;

    // Trigger Nodemailer status update email to customer
    sendOrderStatusUpdateEmail(order, status).catch((err) => console.error('Status update email error:', err));

    return NextResponse.json({
      success: true,
      message: `Order ${orderId} fulfillment status updated to ${status}.`,
      order,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Failed to update order status.' },
      { status: 500 }
    );
  }
}
