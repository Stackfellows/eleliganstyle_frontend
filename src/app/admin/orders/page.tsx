'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  ShoppingCart,
  Search,
  Filter,
  Eye,
  CheckCircle2,
  Clock,
  Truck,
  MapPin,
  Phone,
  Mail,
  User,
  Package,
  X,
  Printer,
  ChevronDown,
  AlertCircle,
  Sparkles,
  CreditCard,
  Banknote,
  FileSpreadsheet,
  FileText,
  Download,
  Copy,
  Check,
  Trash2,
  MessageCircle,
  ExternalLink
} from 'lucide-react';

export type OrderStatus = 'Pending' | 'Processing' | 'Dispatched' | 'Shipped' | 'Delivered' | 'Cancelled';

export interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  pricePKR: number;
  image?: string;
  brand?: string;
  color?: string;
  size?: string;
}

export interface CustomerOrder {
  id: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  shippingAddress: {
    street: string;
    city: string;
    province: string;
    postalCode: string;
    deliveryNotes?: string;
  };
  items: OrderItem[];
  subtotalPKR: number;
  shippingFeePKR: number;
  totalPKR: number;
  paymentMethod: string;
  paymentStatus: 'Paid' | 'Unpaid (COD)' | 'Pending Verification';
  status: OrderStatus;
  orderDate: string;
  trackingNumber?: string;
}

interface RawOrderItem {
  id?: string;
  name?: string;
  productName?: string;
  quantity?: number;
  price?: number;
  pricePKR?: number;
  image?: string;
}

interface RawOrder {
  id: string;
  customerName?: string;
  customerPhone?: string;
  customerEmail?: string;
  shippingAddress?: string | { street: string; city: string; province: string; postalCode: string };
  items?: RawOrderItem[];
  totalPKR?: number;
  paymentMethod?: string;
  status?: OrderStatus;
  createdAt?: string | number;
}

const INITIAL_ORDERS: CustomerOrder[] = [
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
      deliveryNotes: 'Please deliver after 3:00 PM. Call customer upon arrival.'
    },
    items: [
      {
        id: 'item-1',
        name: 'Rouge Opéra Satin Silk Lipstick (Nude Élégance)',
        quantity: 2,
        pricePKR: 12500,
        image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?q=80&w=400&auto=format&fit=crop'
      },
      {
        id: 'item-2',
        name: 'Éclat Mineral Glow Fluid Tint',
        quantity: 1,
        pricePKR: 18000,
        image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=400&auto=format&fit=crop'
      }
    ],
    subtotalPKR: 43000,
    shippingFeePKR: 500,
    totalPKR: 43500,
    paymentMethod: 'Cash on Delivery (COD)',
    paymentStatus: 'Unpaid (COD)',
    status: 'Processing',
    orderDate: '2026-10-07 11:20 AM',
    trackingNumber: 'TCS-9842109'
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
      deliveryNotes: 'Leave with apartment reception if unavailable.'
    },
    items: [
      {
        id: 'item-3',
        name: 'Florentine Hand-Woven Calfskin Formal Belt',
        quantity: 1,
        pricePKR: 34500,
        image: 'https://images.unsplash.com/photo-1624222247344-550fb60583dc?q=80&w=400&auto=format&fit=crop'
      }
    ],
    subtotalPKR: 34500,
    shippingFeePKR: 500,
    totalPKR: 35000,
    paymentMethod: 'Bank Transfer',
    paymentStatus: 'Paid',
    status: 'Dispatched',
    orderDate: '2026-10-07 09:45 AM',
    trackingNumber: 'LEO-4491028'
  },
  {
    id: 'ORD-PK-9819',
    customerName: 'Zainab Tariq',
    customerPhone: '+92 333 9128374',
    customerEmail: 'zainab.tariq@yahoo.com',
    shippingAddress: {
      street: 'Sector F-7/2, Street 14, Villa 8',
      city: 'Islamabad',
      province: 'Federal Capital',
      postalCode: '44000',
      deliveryNotes: 'Fragile bridal cosmetics trunk. Handle with extreme care.'
    },
    items: [
      {
        id: 'item-4',
        name: 'Royal Bridal Couture Suite (5-Piece Trunk)',
        quantity: 1,
        pricePKR: 68500,
        image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=400&auto=format&fit=crop'
      }
    ],
    subtotalPKR: 68500,
    shippingFeePKR: 0,
    totalPKR: 68500,
    paymentMethod: 'JazzCash / EasyPaisa',
    paymentStatus: 'Paid',
    status: 'Shipped',
    orderDate: '2026-10-06 04:15 PM',
    trackingNumber: 'DHL-PK-881203'
  },
  {
    id: 'ORD-PK-9818',
    customerName: 'Bilal Ahmed',
    customerPhone: '+92 345 6712390',
    customerEmail: 'bilal.ahmed@gmail.com',
    shippingAddress: {
      street: 'House 19, Canal View Housing Society',
      city: 'Faisalabad',
      province: 'Punjab',
      postalCode: '38000',
      deliveryNotes: 'Ring main bell.'
    },
    items: [
      {
        id: 'item-5',
        name: 'Florentine Saddle Leather Bifold Wallet',
        quantity: 1,
        pricePKR: 21000,
        image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?q=80&w=400&auto=format&fit=crop'
      }
    ],
    subtotalPKR: 21000,
    shippingFeePKR: 500,
    totalPKR: 21500,
    paymentMethod: 'Cash on Delivery (COD)',
    paymentStatus: 'Paid',
    status: 'Delivered',
    orderDate: '2026-10-05 02:00 PM',
    trackingNumber: 'TRAX-119280'
  }
];

function AdminOrdersContent() {
  const searchParams = useSearchParams();
  const highlightId = searchParams.get('id');

  const [orders, setOrders] = useState<CustomerOrder[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [cityFilter, setCityFilter] = useState<string>('All');
  const [paymentFilter, setPaymentFilter] = useState<string>('All');
  const [selectedOrder, setSelectedOrder] = useState<CustomerOrder | null>(null);
  const [copiedSummary, setCopiedSummary] = useState(false);

  // Load and merge orders from API, local storage, and demo initial data
  useEffect(() => {
    async function loadOrders() {
      let combined: CustomerOrder[] = [];

      // 1. Fetch from server API
      try {
        const res = await fetch('/api/orders');
        const data = await res.json();
        if (data.success && Array.isArray(data.orders)) {
          const formatted: CustomerOrder[] = data.orders.map((o: RawOrder) => ({
            id: o.id,
            customerName: o.customerName || 'Valued Client',
            customerPhone: o.customerPhone || '+92 300 0000000',
            customerEmail: o.customerEmail || 'client@maison.pk',
            shippingAddress: typeof o.shippingAddress === 'string'
              ? { street: o.shippingAddress, city: 'Lahore', province: 'Punjab', postalCode: '54000' }
              : o.shippingAddress || { street: 'Main Road', city: 'Lahore', province: 'Punjab', postalCode: '54000' },
            items: (o.items || []).map((it: RawOrderItem, idx: number) => ({
              id: `item-${idx}`,
              name: it.productName || it.name || 'Artisanal Creation',
              quantity: it.quantity || 1,
              pricePKR: it.pricePKR || it.price || 15000,
              image: it.image
            })),
            subtotalPKR: o.totalPKR || 35000,
            shippingFeePKR: 0,
            totalPKR: o.totalPKR || 35000,
            paymentMethod: o.paymentMethod || 'Cash on Delivery (COD)',
            paymentStatus: o.paymentMethod?.includes('COD') ? 'Unpaid (COD)' : 'Paid',
            status: (o.status as OrderStatus) || 'Pending',
            orderDate: new Date(o.createdAt || Date.now()).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            }),
            trackingNumber: `PAK-EXP-${o.id.replace(/[^0-9]/g, '') || '9841'}`
          }));
          combined = [...formatted];
        }
      } catch (err) {
        console.error('Error fetching admin orders from API:', err);
      }

      // 2. Fetch from localStorage elegant_user_orders (placed by customer in checkout)
      try {
        const userOrders = localStorage.getItem('elegant_user_orders');
        if (userOrders) {
          const parsed = JSON.parse(userOrders);
          if (Array.isArray(parsed)) {
            parsed.forEach((po: RawOrder) => {
              if (!combined.some((c) => c.id === po.id)) {
                combined.unshift({
                  id: po.id,
                  customerName: po.customerName || 'Online Client',
                  customerPhone: po.customerPhone || '+92 300 0000000',
                  customerEmail: po.customerEmail || 'customer@maison.pk',
                  shippingAddress: (typeof po.shippingAddress === 'object' ? po.shippingAddress : { street: 'Address', city: 'Lahore', province: 'Punjab', postalCode: '54000' }) || { street: 'Address', city: 'Lahore', province: 'Punjab', postalCode: '54000' },
                  items: (po.items || []).map((it: RawOrderItem, idx: number) => ({
                    id: `user-it-${idx}`,
                    name: it.productName || it.name || 'Creation',
                    quantity: it.quantity || 1,
                    pricePKR: it.pricePKR || 12000,
                    image: it.image
                  })),
                  subtotalPKR: po.totalPKR || 25000,
                  shippingFeePKR: 0,
                  totalPKR: po.totalPKR || 25000,
                  paymentMethod: po.paymentMethod || 'Cash on Delivery (COD)',
                  paymentStatus: po.paymentMethod?.includes('COD') ? 'Unpaid (COD)' : 'Paid',
                  status: (po.status as OrderStatus) || 'Processing',
                  orderDate: new Date(po.createdAt || Date.now()).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  }),
                  trackingNumber: `PAK-EXP-${po.id.replace(/[^0-9]/g, '') || '9841'}`
                });
              }
            });
          }
        }
      } catch (err) {
        console.error('Error parsing user orders', err);
      }

      // 3. Fallback Initial Orders
      INITIAL_ORDERS.forEach((io) => {
        if (!combined.some((c) => c.id === io.id)) {
          combined.push(io);
        }
      });

      setOrders(combined);
      localStorage.setItem('elegant_admin_orders', JSON.stringify(combined));

      // Check if URL has ?id=ORD-...
      if (highlightId) {
        const target = combined.find((o) => o.id.toLowerCase() === highlightId.toLowerCase());
        if (target) {
          setSelectedOrder(target);
        }
      }
    }

    loadOrders();
  }, [highlightId]);

  const saveOrders = (updated: CustomerOrder[]) => {
    setOrders(updated);
    try {
      localStorage.setItem('elegant_admin_orders', JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
  };

  const handleStatusChange = async (orderId: string, newStatus: OrderStatus) => {
    const updated = orders.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o));
    saveOrders(updated);
    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder({ ...selectedOrder, status: newStatus });
    }

    // Sync status change with /api/orders
    try {
      await fetch('/api/orders', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId, status: newStatus }),
      });
    } catch (err) {
      console.error('Failed to update status on server:', err);
    }
  };

  const handleDeleteOrder = (orderId: string) => {
    if (confirm(`Are you sure you want to remove Order #${orderId} from the admin ledger?`)) {
      const updated = orders.filter((o) => o.id !== orderId);
      saveOrders(updated);
      if (selectedOrder?.id === orderId) {
        setSelectedOrder(null);
      }
    }
  };

  const handleCopyCustomerSummary = (order: CustomerOrder) => {
    const itemsText = order.items.map((i) => `• ${i.name} (Qty: ${i.quantity}) - PKR ${(i.pricePKR * i.quantity).toLocaleString()}`).join('\n');
    const summary = `*ELEGANTSTYLE MAISON - ORDER CONFIRMATION*\n` +
      `Order Reference: ${order.id}\n` +
      `Customer Name: ${order.customerName}\n` +
      `Phone: ${order.customerPhone}\n` +
      `Delivery Address: ${order.shippingAddress.street}, ${order.shippingAddress.city}, ${order.shippingAddress.province}\n` +
      `Items:\n${itemsText}\n` +
      `Total Amount: PKR ${order.totalPKR.toLocaleString()}\n` +
      `Payment Method: ${order.paymentMethod}\n` +
      `Status: ${order.status}\n` +
      `Tracking ID: ${order.trackingNumber || 'PAK-EXPRESS'}`;

    navigator.clipboard.writeText(summary);
    setCopiedSummary(true);
    setTimeout(() => setCopiedSummary(false), 2500);
  };

  const filteredOrders = orders.filter((o) => {
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      o.id.toLowerCase().includes(q) ||
      o.customerName.toLowerCase().includes(q) ||
      o.customerPhone.includes(q) ||
      o.customerEmail.toLowerCase().includes(q) ||
      o.shippingAddress.city.toLowerCase().includes(q) ||
      o.shippingAddress.street.toLowerCase().includes(q);

    const matchesStatus = statusFilter === 'All' || o.status === statusFilter;
    const matchesCity = cityFilter === 'All' || o.shippingAddress.city === cityFilter;
    const matchesPayment = paymentFilter === 'All' || o.paymentMethod.toLowerCase().includes(paymentFilter.toLowerCase());

    return matchesSearch && matchesStatus && matchesCity && matchesPayment;
  });

  const availableCities = Array.from(new Set(orders.map((o) => o.shippingAddress.city).filter(Boolean)));

  const handleDownloadExcel = () => {
    const headers = [
      'Order ID',
      'Order Date',
      'Customer Name',
      'Customer Phone',
      'Customer Email',
      'City',
      'Street Address',
      'Purchased Items',
      'Ordered Quantity',
      'Total (PKR)',
      'Payment Method',
      'Payment Status',
      'Fulfillment Status',
      'Tracking Number'
    ];

    const rows = filteredOrders.map((o) => {
      const totalQty = o.items.reduce((sum, i) => sum + (Number(i.quantity) || 1), 0);
      return [
        `"${o.id}"`,
        `"${o.orderDate}"`,
        `"${o.customerName}"`,
        `"${o.customerPhone}"`,
        `"${o.customerEmail}"`,
        `"${o.shippingAddress.city}"`,
        `"${o.shippingAddress.street?.replace(/"/g, '""') || ''}"`,
        `"${o.items.map((i) => `${i.name} (x${i.quantity})`).join('; ').replace(/"/g, '""')}"`,
        totalQty,
        o.totalPKR,
        `"${o.paymentMethod}"`,
        `"${o.paymentStatus}"`,
        `"${o.status}"`,
        `"${o.trackingNumber || ''}"`
      ];
    });

    const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `ElegantStyle_Orders_Ledger_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDownloadPDF = () => {
    const printWindow = window.open('', '_blank', 'width=1100,height=850');
    if (!printWindow) {
      window.print();
      return;
    }

    const rowsHtml = filteredOrders
      .map((o) => {
        const totalQty = o.items.reduce((sum, i) => sum + (Number(i.quantity) || 1), 0);
        const itemsList = o.items
          .map((i) => `<div><strong>${i.name}</strong> × ${i.quantity}${i.color ? ` (${i.color})` : ''}${i.size ? ` [${i.size}]` : ''}</div>`)
          .join('');

        return `
          <tr>
            <td>
              <div style="font-weight: 700; color: #171515;">${o.id}</div>
              <div style="font-size: 10px; color: #777;">${o.orderDate}</div>
            </td>
            <td>
              <div style="font-weight: 600;">${o.customerName}</div>
              <div style="font-size: 11px; color: #555;">${o.customerPhone}</div>
              <div style="font-size: 10px; color: #888;">${o.customerEmail}</div>
            </td>
            <td>
              <div>${o.shippingAddress.city}, ${o.shippingAddress.province}</div>
              <div style="font-size: 10px; color: #777;">${o.shippingAddress.street}</div>
            </td>
            <td>${itemsList}</td>
            <td style="text-align: center; font-weight: 700; background: #FAF7F6; font-size: 13px;">
              ${totalQty} <span style="font-size: 10px; font-weight: normal; color: #666;">Units</span>
            </td>
            <td style="font-weight: 700; font-family: monospace;">₨ ${o.totalPKR.toLocaleString()}</td>
            <td>
              <div>${o.paymentMethod}</div>
              <div style="font-size: 10px; color: #666;">${o.paymentStatus}</div>
            </td>
            <td>
              <span style="display: inline-block; padding: 2px 8px; border-radius: 4px; font-size: 10px; font-weight: 700; text-transform: uppercase; border: 1px solid #CCC;">
                ${o.status}
              </span>
            </td>
          </tr>
        `;
      })
      .join('');

    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>ELEGANTSTYLE — Orders Ledger & PDF Report</title>
          <style>
            @page { size: landscape; margin: 12mm; }
            body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; color: #222; margin: 0; padding: 20px; font-size: 11px; line-height: 1.4; }
            .header { display: flex; justify-content: space-between; align-items: flex-end; border-bottom: 2px solid #171515; padding-bottom: 12px; margin-bottom: 16px; }
            .brand { font-family: "Didot", "Playfair Display", Georgia, serif; font-size: 24px; letter-spacing: 3px; font-weight: 600; text-transform: uppercase; color: #171515; }
            .tagline { font-size: 9px; letter-spacing: 2px; color: #888; text-transform: uppercase; margin-top: 2px; }
            .meta { text-align: right; font-size: 10px; color: #666; }
            table { width: 100%; border-collapse: collapse; margin-top: 10px; }
            th { background: #171515; color: #FCFAF9; text-transform: uppercase; font-size: 9px; letter-spacing: 1px; padding: 8px 6px; text-align: left; }
            td { padding: 8px 6px; border-bottom: 1px solid #E8E5E4; vertical-align: top; }
            tr:nth-child(even) { background-color: #FCFAF9; }
            .summary-box { display: flex; gap: 20px; margin-top: 16px; padding: 12px; background: #F8F5F4; border: 1px solid #E5E0DF; border-radius: 4px; font-size: 11px; }
            .summary-item { font-weight: 600; }
            .no-print { margin-bottom: 15px; }
            .print-btn { background: #171515; color: #FFF; border: none; padding: 8px 16px; font-size: 12px; cursor: pointer; border-radius: 4px; font-weight: 600; }
            @media print {
              .no-print { display: none !important; }
              body { padding: 0; }
            }
          </style>
        </head>
        <body>
          <div class="no-print">
            <button class="print-btn" onclick="window.print()">📥 Save as PDF / Print Report</button>
            <span style="margin-left: 10px; color: #666; font-size: 11px;">Tip: Select "Save as PDF" in the destination dropdown to download this PDF file.</span>
          </div>
          <div class="header">
            <div>
              <div class="brand">ELEGANTSTYLE</div>
              <div class="tagline">Luxury Beauty & Fashion Privilege — Orders & Logistics Ledger</div>
            </div>
            <div class="meta">
              <div><strong>Generated:</strong> ${new Date().toLocaleString()}</div>
              <div><strong>Total Filtered Orders:</strong> ${filteredOrders.length}</div>
            </div>
          </div>

          <table>
            <thead>
              <tr>
                <th style="width: 11%;">Order ID & Date</th>
                <th style="width: 15%;">Customer</th>
                <th style="width: 16%;">Delivery Destination</th>
                <th style="width: 20%;">Purchased Items</th>
                <th style="width: 10%; text-align: center;">Ordered Qty</th>
                <th style="width: 11%;">Total Amount</th>
                <th style="width: 10%;">Payment Mode</th>
                <th style="width: 7%;">Status</th>
              </tr>
            </thead>
            <tbody>
              ${rowsHtml}
            </tbody>
          </table>

          <div class="summary-box">
            <div class="summary-item">Total Orders: <span>${filteredOrders.length}</span></div>
            <div class="summary-item">Total Units Ordered: <span>${filteredOrders.reduce((sum, o) => sum + o.items.reduce((isum, it) => isum + (Number(it.quantity) || 1), 0), 0)} Units</span></div>
            <div class="summary-item">Total Amount: <span>₨ ${filteredOrders.reduce((sum, o) => sum + o.totalPKR, 0).toLocaleString()}</span></div>
          </div>

          <script>
            window.onload = function() {
              setTimeout(function() {
                window.print();
              }, 400);
            };
          </script>
        </body>
      </html>
    `;

    printWindow.document.open();
    printWindow.document.write(htmlContent);
    printWindow.document.close();
  };

  const getStatusBadgeClass = (status: OrderStatus) => {
    switch (status) {
      case 'Pending':
        return 'bg-amber-950/80 text-amber-300 border-amber-800';
      case 'Processing':
        return 'bg-blue-950/80 text-blue-300 border-blue-800';
      case 'Dispatched':
        return 'bg-indigo-950/80 text-indigo-300 border-indigo-800';
      case 'Shipped':
        return 'bg-purple-950/80 text-purple-300 border-purple-800';
      case 'Delivered':
        return 'bg-emerald-950/80 text-emerald-300 border-emerald-800';
      case 'Cancelled':
        return 'bg-red-950/80 text-red-300 border-red-800';
      default:
        return 'bg-gray-900 text-gray-300 border-gray-700';
    }
  };

  const totalRevenuePKR = orders
    .filter((o) => o.status !== 'Cancelled')
    .reduce((sum, o) => sum + o.totalPKR, 0);

  return (
    <div className="space-y-6 font-sans antialiased text-[#F3ECEB]">
      {/* Top Banner & Quick Controls */}
      <div className="p-6 bg-[#141213] border border-[#242022] rounded-lg flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-[#262123] text-[#E9C9CE] text-[10px] uppercase tracking-widest font-mono">
            <ShoppingCart className="w-3.5 h-3.5 text-[#E9C9CE]" />
            <span>Customer Orders & Logistics Ledger</span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-light text-[#FFFFFF] tracking-wide mt-1">
            Customer Orders Management
          </h1>
          <p className="text-xs text-[#B0A7A9] font-light mt-0.5">
            View real-time customer orders, inspect complete shipping & contact info, and update fulfillment statuses.
          </p>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          <button
            onClick={handleDownloadExcel}
            className="px-3.5 py-2 bg-[#1A1718] border border-[#2B2527] hover:border-[#E9C9CE] text-[#FCFAF9] rounded text-xs transition-colors flex items-center gap-2 cursor-pointer shadow-sm"
            title="Download complete orders spreadsheet with ordered quantity column"
          >
            <Download className="w-3.5 h-3.5 text-[#E9C9CE]" />
            <span>Export CSV</span>
          </button>
          <button
            onClick={handleDownloadPDF}
            className="px-3.5 py-2 bg-[#1A1718] border border-[#2B2527] hover:border-[#E9C9CE] text-[#FCFAF9] rounded text-xs transition-colors flex items-center gap-2 cursor-pointer shadow-sm"
            title="Download / Print luxury orders report PDF with ordered quantity column"
          >
            <Printer className="w-3.5 h-3.5 text-[#E9C9CE]" />
            <span>Print / Download PDF</span>
          </button>
        </div>
      </div>

      {/* Metric Counters Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 bg-[#141213] border border-[#242022] rounded-lg space-y-1">
          <span className="text-[10px] uppercase tracking-wider text-[#7A7375] font-mono">Total Orders</span>
          <div className="text-2xl font-serif text-[#FFFFFF]">{orders.length}</div>
          <span className="text-[10px] text-[#A8A19F]">All-time store orders</span>
        </div>

        <div className="p-4 bg-[#141213] border border-[#242022] rounded-lg space-y-1">
          <span className="text-[10px] uppercase tracking-wider text-[#7A7375] font-mono">Total Order Value</span>
          <div className="text-2xl font-serif text-[#E9C9CE]">₨ {(totalRevenuePKR / 1000).toFixed(0)}k</div>
          <span className="text-[10px] text-emerald-400">Total in PKR</span>
        </div>

        <div className="p-4 bg-[#141213] border border-[#242022] rounded-lg space-y-1">
          <span className="text-[10px] uppercase tracking-wider text-[#7A7375] font-mono">Pending / Processing</span>
          <div className="text-2xl font-serif text-amber-300">
            {orders.filter((o) => o.status === 'Pending' || o.status === 'Processing').length}
          </div>
          <span className="text-[10px] text-amber-400">Awaiting dispatch</span>
        </div>

        <div className="p-4 bg-[#141213] border border-[#242022] rounded-lg space-y-1">
          <span className="text-[10px] uppercase tracking-wider text-[#7A7375] font-mono">Delivered</span>
          <div className="text-2xl font-serif text-emerald-400">
            {orders.filter((o) => o.status === 'Delivered').length}
          </div>
          <span className="text-[10px] text-emerald-400">Completed shipments</span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 bg-[#141213] border border-[#242022] p-4 rounded-lg">
        <div className="lg:col-span-5 relative">
          <Search className="w-3.5 h-3.5 text-[#7A7375] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by Order ID, Customer Name, Phone, Email, City..."
            className="w-full bg-[#1A1718] text-xs text-[#FCFAF9] placeholder-[#6B6466] pl-9 pr-4 py-2.5 rounded border border-[#2B2527] focus:outline-none focus:border-[#E9C9CE]"
          />
        </div>

        <div className="lg:col-span-3">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full bg-[#1A1718] text-xs text-[#FCFAF9] py-2.5 px-3 rounded border border-[#2B2527] focus:outline-none focus:border-[#E9C9CE]"
          >
            <option value="All">All Statuses ({orders.length})</option>
            <option value="Pending">Pending</option>
            <option value="Processing">Processing</option>
            <option value="Dispatched">Dispatched</option>
            <option value="Shipped">Shipped</option>
            <option value="Delivered">Delivered</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>

        <div className="lg:col-span-2">
          <select
            value={cityFilter}
            onChange={(e) => setCityFilter(e.target.value)}
            className="w-full bg-[#1A1718] text-xs text-[#FCFAF9] py-2.5 px-3 rounded border border-[#2B2527] focus:outline-none focus:border-[#E9C9CE]"
          >
            <option value="All">All Cities</option>
            {availableCities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>

        <div className="lg:col-span-2">
          <select
            value={paymentFilter}
            onChange={(e) => setPaymentFilter(e.target.value)}
            className="w-full bg-[#1A1718] text-xs text-[#FCFAF9] py-2.5 px-3 rounded border border-[#2B2527] focus:outline-none focus:border-[#E9C9CE]"
          >
            <option value="All">All Payment Modes</option>
            <option value="COD">Cash on Delivery</option>
            <option value="JazzCash">JazzCash</option>
            <option value="EasyPaisa">EasyPaisa</option>
            <option value="Bank">Bank Transfer</option>
          </select>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-[#141213] border border-[#242022] rounded-lg overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-[#B0A7A9]">
            <thead className="bg-[#1A1718] text-[10px] uppercase tracking-wider text-[#7A7375] font-mono border-b border-[#242022]">
              <tr>
                <th className="p-3.5">Order ID & Date</th>
                <th className="p-3.5">Customer Information</th>
                <th className="p-3.5">Destination City & Street</th>
                <th className="p-3.5">Purchased Items</th>
                <th className="p-3.5 text-center">Ordered Quantity</th>
                <th className="p-3.5">Total Amount</th>
                <th className="p-3.5">Fulfillment Status</th>
                <th className="p-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#242022]">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={8} className="p-8 text-center text-xs text-[#7A7375]">
                    No orders matching current filter criteria.
                  </td>
                </tr>
              ) : (
                filteredOrders.map((ord) => {
                  const totalQty = ord.items.reduce((sum, it) => sum + (Number(it.quantity) || 1), 0);
                  return (
                    <tr key={ord.id} className="hover:bg-[#1A1718]/70 transition-colors">
                      {/* Order ID & Date */}
                      <td className="p-3.5 whitespace-nowrap">
                        <div className="font-mono text-[#E9C9CE] font-bold">{ord.id}</div>
                        <div className="text-[10px] text-[#7A7375] mt-0.5">{ord.orderDate}</div>
                      </td>

                      {/* Customer Information */}
                      <td className="p-3.5">
                        <div className="font-serif text-sm text-[#FFFFFF] font-medium flex items-center gap-1.5">
                          <User className="w-3 h-3 text-[#E9C9CE]" />
                          <span>{ord.customerName}</span>
                        </div>
                        <div className="text-[11px] text-[#A8A19F] font-mono flex items-center gap-1 mt-0.5">
                          <Phone className="w-2.5 h-2.5 text-[#7A7375]" />
                          <span>{ord.customerPhone}</span>
                        </div>
                        <div className="text-[10px] text-[#7A7375] truncate max-w-xs">{ord.customerEmail}</div>
                      </td>

                      {/* Destination City & Street */}
                      <td className="p-3.5 max-w-xs">
                        <div className="flex items-start gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-[#E9C9CE] shrink-0 mt-0.5" />
                          <div>
                            <span className="font-medium text-[#F3ECEB] text-xs block">
                              {ord.shippingAddress.city}, {ord.shippingAddress.province}
                            </span>
                            <span className="text-[11px] text-[#7A7375] line-clamp-1">
                              {ord.shippingAddress.street}
                            </span>
                            {ord.shippingAddress.deliveryNotes && (
                              <span className="text-[10px] text-[#C58C97] italic block mt-0.5">
                                Note: {ord.shippingAddress.deliveryNotes}
                              </span>
                            )}
                          </div>
                        </div>
                      </td>

                      {/* Purchased Items */}
                      <td className="p-3.5 max-w-xs">
                        <div className="space-y-1">
                          {ord.items.map((it, idx) => (
                            <div key={idx} className="text-[11px] text-[#D4CDCE] flex items-center justify-between">
                              <span className="truncate max-w-[170px]">{it.name}</span>
                              <span className="font-mono text-[10px] text-[#7A7375] shrink-0 ml-2">×{it.quantity}</span>
                            </div>
                          ))}
                        </div>
                      </td>

                      {/* Ordered Quantity Column */}
                      <td className="p-3.5 text-center whitespace-nowrap">
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#1F1B1D] border border-[#3A2E32] rounded-full">
                          <Package className="w-3 h-3 text-[#E9C9CE]" />
                          <span className="font-mono text-xs text-[#FCFAF9] font-bold">
                            {totalQty}
                          </span>
                          <span className="text-[10px] text-[#B0A7A9] font-sans">Units</span>
                        </div>
                      </td>

                      {/* Total Amount & Payment */}
                      <td className="p-3.5 whitespace-nowrap">
                        <div className="font-mono text-sm text-[#FFFFFF] font-bold">
                          ₨ {ord.totalPKR.toLocaleString()}
                        </div>
                        <div className="text-[10px] font-mono text-[#A8A19F] flex items-center gap-1 mt-0.5">
                          <Banknote className="w-3 h-3 text-[#E9C9CE]" />
                          <span>{ord.paymentMethod}</span>
                        </div>
                      </td>

                      {/* Live Fulfillment Status Selector */}
                      <td className="p-3.5">
                        <div className="relative inline-block w-36">
                          <select
                            value={ord.status}
                            onChange={(e) => handleStatusChange(ord.id, e.target.value as OrderStatus)}
                            className={`w-full py-1.5 px-2.5 rounded text-[11px] font-mono uppercase tracking-wider border focus:outline-none transition-all cursor-pointer ${getStatusBadgeClass(
                              ord.status
                            )}`}
                          >
                            <option value="Pending" className="bg-[#141213] text-amber-300">Pending</option>
                            <option value="Processing" className="bg-[#141213] text-blue-300">Processing</option>
                            <option value="Dispatched" className="bg-[#141213] text-indigo-300">Dispatched</option>
                            <option value="Shipped" className="bg-[#141213] text-purple-300">Shipped</option>
                            <option value="Delivered" className="bg-[#141213] text-emerald-300">Delivered</option>
                            <option value="Cancelled" className="bg-[#141213] text-red-300">Cancelled</option>
                          </select>
                        </div>
                      </td>

                      {/* Actions: View Details Button */}
                      <td className="p-3.5 text-right whitespace-nowrap space-x-2">
                        <button
                          onClick={() => setSelectedOrder(ord)}
                          className="px-3.5 py-1.5 bg-[#E9C9CE] text-[#171515] hover:bg-[#F3D7DC] rounded text-xs font-semibold inline-flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
                          title="View Complete Customer & Order Details"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>Details</span>
                        </button>

                        <button
                          onClick={() => handleDeleteOrder(ord.id)}
                          className="p-1.5 bg-[#1A1718] border border-[#2B2527] hover:border-red-500 text-[#7A7375] hover:text-red-400 rounded transition-colors inline-block cursor-pointer"
                          title="Delete order"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* COMPREHENSIVE ORDER & CUSTOMER DETAILS MODAL */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 bg-[#0D0C0C]/85 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#141213] border border-[#242022] rounded-xl w-full max-w-2xl p-6 sm:p-7 space-y-6 my-8 shadow-2xl relative text-xs animate-in fade-in duration-200">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-[#242022] pb-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2.5">
                  <span className="font-mono text-base text-[#E9C9CE] font-bold">{selectedOrder.id}</span>
                  <span
                    className={`px-2.5 py-0.5 rounded text-[10px] font-mono uppercase border ${getStatusBadgeClass(
                      selectedOrder.status
                    )}`}
                  >
                    {selectedOrder.status}
                  </span>
                </div>
                <p className="text-[11px] text-[#7A7375]">Booked on {selectedOrder.orderDate}</p>
              </div>

              <button
                onClick={() => setSelectedOrder(null)}
                className="text-[#7A7375] hover:text-[#FFFFFF] transition-colors p-1.5 rounded-lg hover:bg-[#1A1718]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* 2-Column: Customer Information & Delivery Address */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Customer Info Card */}
              <div className="bg-[#1A1718] p-4 rounded-lg border border-[#2B2527] space-y-3">
                <div className="text-[10px] uppercase tracking-wider text-[#E9C9CE] font-mono flex items-center gap-1.5 font-semibold">
                  <User className="w-3.5 h-3.5 text-[#E9C9CE]" />
                  <span>Customer Personal Details</span>
                </div>

                <div className="space-y-1.5">
                  <div className="font-serif text-base text-[#FFFFFF] font-medium">
                    {selectedOrder.customerName}
                  </div>
                  <div className="flex items-center gap-2 text-[#D4CDCE] font-mono text-xs">
                    <Phone className="w-3.5 h-3.5 text-[#E9C9CE]" />
                    <a href={`tel:${selectedOrder.customerPhone}`} className="hover:underline">
                      {selectedOrder.customerPhone}
                    </a>
                  </div>
                  <div className="flex items-center gap-2 text-[#7A7375] text-xs">
                    <Mail className="w-3.5 h-3.5 text-[#7A7375]" />
                    <a href={`mailto:${selectedOrder.customerEmail}`} className="hover:underline">
                      {selectedOrder.customerEmail}
                    </a>
                  </div>
                </div>

                {/* Quick WhatsApp / Direct Call Buttons */}
                <div className="pt-2 flex items-center gap-2 border-t border-[#2B2527]">
                  <a
                    href={`https://wa.me/${selectedOrder.customerPhone.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 py-1.5 bg-[#25D366]/20 border border-[#25D366]/40 hover:bg-[#25D366]/30 text-[#25D366] rounded text-[11px] font-medium flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <MessageCircle className="w-3 h-3" />
                    <span>WhatsApp</span>
                  </a>
                  <a
                    href={`tel:${selectedOrder.customerPhone}`}
                    className="flex-1 py-1.5 bg-[#141213] border border-[#2B2527] hover:border-[#E9C9CE] text-[#FCFAF9] rounded text-[11px] font-medium flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <Phone className="w-3 h-3 text-[#E9C9CE]" />
                    <span>Call Customer</span>
                  </a>
                </div>
              </div>

              {/* Delivery Destination Address */}
              <div className="bg-[#1A1718] p-4 rounded-lg border border-[#2B2527] space-y-3">
                <div className="text-[10px] uppercase tracking-wider text-[#E9C9CE] font-mono flex items-center gap-1.5 font-semibold">
                  <MapPin className="w-3.5 h-3.5 text-[#E9C9CE]" />
                  <span>Delivery Address</span>
                </div>

                <div className="space-y-1 text-[#D4CDCE]">
                  <p className="font-medium text-[#FFFFFF] text-xs">
                    {selectedOrder.shippingAddress.street}
                  </p>
                  <p className="text-xs">
                    {selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.province}{' '}
                    {selectedOrder.shippingAddress.postalCode && `- ${selectedOrder.shippingAddress.postalCode}`}
                  </p>
                  <p className="text-[11px] text-[#7A7375]">Country: Pakistan</p>
                  {selectedOrder.shippingAddress.deliveryNotes && (
                    <div className="mt-2 p-2 rounded bg-[#241B1D] border border-[#3E282D] text-[11px] text-[#E9C9CE]">
                      <strong>Rider Note:</strong> {selectedOrder.shippingAddress.deliveryNotes}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Ordered Products Breakdown */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <div className="text-[10px] uppercase tracking-wider text-[#7A7375] font-mono font-semibold">
                  Ordered Products Breakdown ({selectedOrder.items.length} line items)
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#262123] border border-[#3A3134] rounded-full text-xs font-mono text-[#E9C9CE]">
                  <Package className="w-3.5 h-3.5 text-[#E9C9CE]" />
                  <span>Total Quantity: <strong>{selectedOrder.items.reduce((sum, it) => sum + (Number(it.quantity) || 1), 0)} Units</strong></span>
                </div>
              </div>
              <div className="bg-[#1A1718] rounded-lg border border-[#2B2527] divide-y divide-[#2B2527] overflow-hidden">
                {selectedOrder.items.map((item, idx) => (
                  <div key={idx} className="p-3.5 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      {item.image ? (
                        <div className="w-12 h-12 rounded bg-[#262123] overflow-hidden shrink-0 border border-[#3A3134]">
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        </div>
                      ) : (
                        <div className="w-12 h-12 rounded bg-[#262123] border border-[#3A3134] flex items-center justify-center text-[#7A7375]">
                          <Package className="w-5 h-5" />
                        </div>
                      )}
                      <div>
                        <div className="font-serif text-sm text-[#FFFFFF]">{item.name}</div>
                        <div className="flex items-center gap-2 mt-1 flex-wrap">
                          {item.brand && (
                            <span className="px-2 py-0.5 rounded bg-[#262123] text-[#E9C9CE] text-[10px] font-mono border border-[#3A3134]">
                              {item.brand}
                            </span>
                          )}
                          {item.color && (
                            <span className="px-2 py-0.5 rounded bg-[#262123] text-[#D4CDCE] text-[10px] font-mono border border-[#3A3134]">
                              Color: {item.color}
                            </span>
                          )}
                          {item.size && (
                            <span className="px-2 py-0.5 rounded bg-[#262123] text-[#D4CDCE] text-[10px] font-mono border border-[#3A3134]">
                              Size: {item.size}
                            </span>
                          )}
                        </div>
                        <div className="text-[10px] text-[#7A7375] font-mono mt-1">
                          ₨ {item.pricePKR.toLocaleString()} × {item.quantity} Unit(s)
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-mono text-sm text-[#FFFFFF] font-medium">
                        ₨ {(item.pricePKR * item.quantity).toLocaleString()}
                      </div>
                      <div className="text-[10px] font-mono text-[#E9C9CE] mt-0.5">
                        Qty: {item.quantity}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Financial Summary */}
            <div className="bg-[#1A1718] p-4 rounded-lg border border-[#2B2527] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-[10px] uppercase tracking-wider text-[#7A7375] font-mono block">Payment Mode</span>
                <span className="text-sm font-medium text-[#FFFFFF] flex items-center gap-1.5 mt-0.5">
                  <Banknote className="w-4 h-4 text-[#E9C9CE]" />
                  <span>{selectedOrder.paymentMethod}</span>
                </span>
                <span className="text-[10px] font-mono text-emerald-400 block mt-0.5">
                  Payment Status: {selectedOrder.paymentStatus}
                </span>
              </div>

              <div className="space-y-1 text-right border-t sm:border-t-0 sm:border-l border-[#2B2527] pt-2 sm:pt-0 sm:pl-6 font-mono text-xs">
                <div className="flex justify-between sm:justify-end gap-6 text-[#7A7375]">
                  <span>Subtotal:</span>
                  <span>₨ {selectedOrder.subtotalPKR.toLocaleString()}</span>
                </div>
                <div className="flex justify-between sm:justify-end gap-6 text-[#7A7375]">
                  <span>Delivery Courier:</span>
                  <span>{selectedOrder.shippingFeePKR === 0 ? 'Complimentary (PKR 0)' : `₨ ${selectedOrder.shippingFeePKR}`}</span>
                </div>
                <div className="flex justify-between sm:justify-end gap-6 text-[#FFFFFF] font-bold text-sm pt-1 border-t border-[#2B2527]">
                  <span>Total Amount:</span>
                  <span className="text-[#E9C9CE]">₨ {selectedOrder.totalPKR.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Update Fulfillment Status Control */}
            <div className="p-4 bg-[#211E1F] border border-[#2B2527] rounded-lg flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <label className="text-xs font-semibold text-[#FFFFFF] block">
                  Change Fulfillment Status:
                </label>
                <span className="text-[11px] text-[#7A7375]">
                  Updates delivery status in real-time for customer tracking.
                </span>
              </div>

              <select
                value={selectedOrder.status}
                onChange={(e) => handleStatusChange(selectedOrder.id, e.target.value as OrderStatus)}
                className={`py-2 px-3 rounded text-xs font-mono uppercase tracking-wider border focus:outline-none cursor-pointer ${getStatusBadgeClass(
                  selectedOrder.status
                )}`}
              >
                <option value="Pending" className="bg-[#141213] text-amber-300">Pending</option>
                <option value="Processing" className="bg-[#141213] text-blue-300">Processing</option>
                <option value="Dispatched" className="bg-[#141213] text-indigo-300">Dispatched</option>
                <option value="Shipped" className="bg-[#141213] text-purple-300">Shipped</option>
                <option value="Delivered" className="bg-[#141213] text-emerald-300">Delivered</option>
                <option value="Cancelled" className="bg-[#141213] text-red-300">Cancelled</option>
              </select>
            </div>

            {/* Modal Bottom Actions */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[#242022]">
              <button
                onClick={() => handleCopyCustomerSummary(selectedOrder)}
                className="px-3.5 py-2 bg-[#1A1718] border border-[#2B2527] hover:border-[#E9C9CE] text-[#FCFAF9] rounded text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                {copiedSummary ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-[#E9C9CE]" />}
                <span>{copiedSummary ? 'Copied Summary!' : 'Copy Summary for WhatsApp'}</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => window.print()}
                  className="px-4 py-2 bg-[#1A1718] border border-[#2B2527] hover:border-[#E9C9CE] text-[#FCFAF9] rounded text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5 text-[#E9C9CE]" />
                  <span>Print Slip</span>
                </button>

                <button
                  onClick={() => setSelectedOrder(null)}
                  className="px-5 py-2 bg-[#E9C9CE] hover:bg-[#F3D7DC] text-[#171515] font-semibold text-xs rounded transition-colors cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function AdminOrdersPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[50vh] flex items-center justify-center text-xs text-[#7A7375] font-mono">
          Loading Customer Orders...
        </div>
      }
    >
      <AdminOrdersContent />
    </Suspense>
  );
}
