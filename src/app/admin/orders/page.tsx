'use client';

import React, { useState, useEffect } from 'react';
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
  Banknote
} from 'lucide-react';

export type OrderStatus = 'Pending' | 'Processing' | 'Dispatched' | 'Shipped' | 'Delivered' | 'Cancelled';

export interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  pricePKR: number;
  image?: string;
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
  paymentMethod: 'Cash on Delivery (COD)' | 'Bank Transfer' | 'JazzCash / EasyPaisa' | 'Credit / Debit Card';
  paymentStatus: 'Paid' | 'Unpaid (COD)' | 'Pending Verification';
  status: OrderStatus;
  orderDate: string;
  trackingNumber?: string;
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
    paymentMethod: 'Credit / Debit Card',
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
  },
  {
    id: 'ORD-PK-9817',
    customerName: 'Fatima Noor',
    customerPhone: '+92 312 5590123',
    customerEmail: 'fatima.noor@hotmail.com',
    shippingAddress: {
      street: 'Bungalow 78, Cantt Road, Near Mall',
      city: 'Rawalpindi',
      province: 'Punjab',
      postalCode: '46000',
      deliveryNotes: 'Call before dispatch.'
    },
    items: [
      {
        id: 'item-6',
        name: 'Nocturne Gala Glamour Set',
        quantity: 1,
        pricePKR: 39500,
        image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?q=80&w=400&auto=format&fit=crop'
      }
    ],
    subtotalPKR: 39500,
    shippingFeePKR: 500,
    totalPKR: 40000,
    paymentMethod: 'JazzCash / EasyPaisa',
    paymentStatus: 'Pending Verification',
    status: 'Pending',
    orderDate: '2026-10-07 11:55 AM'
  }
];

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<CustomerOrder[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [selectedOrder, setSelectedOrder] = useState<CustomerOrder | null>(null);

  useEffect(() => {
    // Fetch live orders from /api/orders backend
    async function loadOrders() {
      try {
        const res = await fetch('/api/orders');
        const data = await res.json();
        if (data.success && data.orders && data.orders.length > 0) {
          const formatted: CustomerOrder[] = data.orders.map((o: any) => ({
            id: o.id,
            customerName: o.customerName,
            customerPhone: o.customerPhone || '+92 300 0000000',
            customerEmail: o.customerEmail || 'customer@maison.pk',
            shippingAddress: typeof o.shippingAddress === 'string'
              ? { street: o.shippingAddress, city: 'Lahore', province: 'Punjab', postalCode: '54000' }
              : o.shippingAddress,
            items: (o.items || []).map((it: any, idx: number) => ({
              id: `item-${idx}`,
              name: it.productName || it.name,
              quantity: it.quantity,
              pricePKR: it.pricePKR || it.price || 15000,
            })),
            subtotalPKR: o.totalPKR || 35000,
            shippingFeePKR: 0,
            totalPKR: o.totalPKR || 35000,
            paymentMethod: o.paymentMethod || 'Cash on Delivery (COD)',
            paymentStatus: o.paymentMethod?.includes('COD') ? 'Unpaid (COD)' : 'Paid',
            status: o.status || 'Pending',
            orderDate: new Date(o.createdAt || Date.now()).toLocaleString(),
            trackingNumber: `PAK-${o.id}`
          }));
          setOrders(formatted);
          localStorage.setItem('elegant_admin_orders', JSON.stringify(formatted));
        } else {
          setOrders(INITIAL_ORDERS);
        }
      } catch (err) {
        console.error('Error fetching admin orders:', err);
        setOrders(INITIAL_ORDERS);
      }
    }

    loadOrders();
  }, []);

  const saveOrders = async (updated: CustomerOrder[]) => {
    setOrders(updated);
    localStorage.setItem('elegant_admin_orders', JSON.stringify(updated));
  };

  const handleStatusChange = async (orderId: string, newStatus: OrderStatus) => {
    const updated = orders.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o));
    saveOrders(updated);
    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder({ ...selectedOrder, status: newStatus });
    }

    // Also update server endpoint /api/orders via PATCH
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

  const filteredOrders = orders.filter((o) => {
    const matchesSearch =
      o.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.customerPhone.includes(searchQuery) ||
      o.shippingAddress.city.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'All' || o.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

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
    <div className="space-y-6 font-sans">
      {/* Top Title & Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#242022] pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded bg-[#262123] text-[#E9C9CE] text-[10px] uppercase tracking-widest font-mono mb-1">
            <ShoppingCart className="w-3.5 h-3.5 text-[#E9C9CE]" />
            <span>Customer Orders & Delivery Center</span>
          </div>
          <h1 className="font-serif text-2xl text-[#FFFFFF]">Order Fulfillment & Customer Purchases</h1>
          <p className="text-xs text-[#7A7375]">
            Track delivery destinations, customer contact details, and update live fulfillment statuses (All amounts in PKR).
          </p>
        </div>

        <div className="p-3 bg-[#141213] border border-[#242022] rounded-lg flex items-center gap-4 text-xs font-mono">
          <div>
            <span className="text-[10px] text-[#7A7375] uppercase block">Total Net Volume</span>
            <span className="font-serif text-base text-[#FFFFFF] font-bold">
              PKR {totalRevenuePKR.toLocaleString()}
            </span>
          </div>
          <div className="h-8 w-px bg-[#242022]"></div>
          <div>
            <span className="text-[10px] text-[#7A7375] uppercase block">Total Orders</span>
            <span className="font-serif text-base text-[#E9C9CE] font-bold">{orders.length} Purchases</span>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3 bg-[#141213] border border-[#242022] p-4 rounded-lg">
        <div className="md:col-span-8 relative">
          <Search className="w-3.5 h-3.5 text-[#7A7375] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by Customer Name, Phone, City, or Order ID..."
            className="w-full bg-[#1A1718] text-xs text-[#FCFAF9] placeholder-[#6B6466] pl-9 pr-4 py-2 rounded border border-[#2B2527] focus:outline-none focus:border-[#E9C9CE]"
          />
        </div>

        <div className="md:col-span-4 flex items-center gap-2">
          <Filter className="w-3.5 h-3.5 text-[#7A7375]" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full bg-[#1A1718] text-xs text-[#FCFAF9] py-2 px-3 rounded border border-[#2B2527] focus:outline-none focus:border-[#E9C9CE]"
          >
            <option value="All">All Fulfillment Statuses</option>
            <option value="Pending">Pending</option>
            <option value="Processing">Processing</option>
            <option value="Dispatched">Dispatched</option>
            <option value="Shipped">Shipped</option>
            <option value="Delivered">Delivered</option>
            <option value="Cancelled">Cancelled</option>
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
                <th className="p-3.5">Customer Details</th>
                <th className="p-3.5">Delivery Destination</th>
                <th className="p-3.5">Purchased Items</th>
                <th className="p-3.5">Payment (PKR)</th>
                <th className="p-3.5">Fulfillment Status</th>
                <th className="p-3.5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#242022]">
              {filteredOrders.map((ord) => (
                <tr key={ord.id} className="hover:bg-[#1A1718]/60 transition-colors">
                  {/* Order ID & Date */}
                  <td className="p-3.5 whitespace-nowrap">
                    <div className="font-mono text-[#E9C9CE] font-medium">{ord.id}</div>
                    <div className="text-[10px] text-[#7A7375]">{ord.orderDate}</div>
                  </td>

                  {/* Customer Details */}
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

                  {/* Delivery Destination (Oder Kahan Bhejna Hai) */}
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
                          <span className="truncate max-w-[180px]">{it.name}</span>
                          <span className="font-mono text-[10px] text-[#7A7375] shrink-0 ml-2">x{it.quantity}</span>
                        </div>
                      ))}
                    </div>
                  </td>

                  {/* Payment in PKR */}
                  <td className="p-3.5 whitespace-nowrap">
                    <div className="font-mono text-sm text-[#FFFFFF] font-bold">
                      PKR {ord.totalPKR.toLocaleString()}
                    </div>
                    <div className="text-[10px] font-mono text-[#A8A19F] flex items-center gap-1 mt-0.5">
                      <Banknote className="w-3 h-3 text-[#E9C9CE]" />
                      <span>{ord.paymentMethod}</span>
                    </div>
                  </td>

                  {/* Fulfillment Status Dropdown (Live Changer) */}
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

                  {/* View Details Button */}
                  <td className="p-3.5 text-right whitespace-nowrap">
                    <button
                      onClick={() => setSelectedOrder(ord)}
                      className="px-3 py-1.5 bg-[#1A1718] border border-[#2B2527] hover:border-[#E9C9CE] text-[#E9C9CE] hover:text-[#FFFFFF] rounded text-xs transition-colors inline-flex items-center gap-1.5 cursor-pointer font-medium"
                    >
                      <Eye className="w-3 h-3" />
                      <span>View Details</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Comprehensive Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 bg-[#0D0C0C]/85 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#141213] border border-[#242022] rounded-lg w-full max-w-2xl p-6 sm:p-7 space-y-6 my-8 shadow-2xl relative text-xs">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-[#242022] pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-sm text-[#E9C9CE] font-bold">{selectedOrder.id}</span>
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-mono uppercase border ${getStatusBadgeClass(
                      selectedOrder.status
                    )}`}
                  >
                    {selectedOrder.status}
                  </span>
                </div>
                <p className="text-[11px] text-[#7A7375] mt-1">Booked on {selectedOrder.orderDate}</p>
              </div>

              <button
                onClick={() => setSelectedOrder(null)}
                className="text-[#7A7375] hover:text-[#FFFFFF] transition-colors p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Customer Details & Shipping Address 2-Column Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Customer Profile */}
              <div className="bg-[#1A1718] p-4 rounded border border-[#2B2527] space-y-2.5">
                <div className="text-[10px] uppercase tracking-wider text-[#E9C9CE] font-mono flex items-center gap-1.5 font-medium">
                  <User className="w-3 h-3 text-[#E9C9CE]" />
                  <span>Customer Information</span>
                </div>
                <div className="space-y-1">
                  <div className="font-serif text-base text-[#FFFFFF]">{selectedOrder.customerName}</div>
                  <div className="flex items-center gap-2 text-[#B0A7A9] font-mono">
                    <Phone className="w-3 h-3 text-[#7A7375]" />
                    <span>{selectedOrder.customerPhone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#7A7375]">
                    <Mail className="w-3 h-3 text-[#7A7375]" />
                    <span>{selectedOrder.customerEmail}</span>
                  </div>
                </div>
              </div>

              {/* Delivery Address (Oder Bhejne Ka Pata) */}
              <div className="bg-[#1A1718] p-4 rounded border border-[#2B2527] space-y-2.5">
                <div className="text-[10px] uppercase tracking-wider text-[#E9C9CE] font-mono flex items-center gap-1.5 font-medium">
                  <MapPin className="w-3 h-3 text-[#E9C9CE]" />
                  <span>Delivery Address (Oder Bhejne Ka Pata)</span>
                </div>
                <div className="space-y-1 text-[#D4CDCE]">
                  <p className="font-medium text-[#FFFFFF]">{selectedOrder.shippingAddress.street}</p>
                  <p>
                    {selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.province} - {selectedOrder.shippingAddress.postalCode}
                  </p>
                  {selectedOrder.shippingAddress.deliveryNotes && (
                    <div className="pt-1.5 border-t border-[#2B2527] text-[10px] text-[#C58C97]">
                      <strong>Rider Note:</strong> {selectedOrder.shippingAddress.deliveryNotes}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Purchased Items List */}
            <div className="space-y-3">
              <div className="text-[10px] uppercase tracking-wider text-[#7A7375] font-mono font-semibold">
                Ordered Products Breakdown
              </div>
              <div className="bg-[#1A1718] rounded border border-[#2B2527] divide-y divide-[#2B2527]">
                {selectedOrder.items.map((item, idx) => (
                  <div key={idx} className="p-3 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      {item.image && (
                        <div className="w-10 h-10 rounded bg-[#262123] overflow-hidden shrink-0 border border-[#3A3134]">
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        </div>
                      )}
                      <div>
                        <div className="font-serif text-sm text-[#FFFFFF]">{item.name}</div>
                        <div className="text-[10px] text-[#7A7375] font-mono">
                          PKR {item.pricePKR.toLocaleString()} × {item.quantity}
                        </div>
                      </div>
                    </div>
                    <div className="font-mono text-[#FFFFFF] font-medium">
                      PKR {(item.pricePKR * item.quantity).toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Payment & Financial Summary in PKR */}
            <div className="bg-[#1A1718] p-4 rounded border border-[#2B2527] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-[10px] uppercase tracking-wider text-[#7A7375] font-mono block">Payment Mode</span>
                <span className="text-sm font-medium text-[#FFFFFF] flex items-center gap-1.5 mt-0.5">
                  <Banknote className="w-4 h-4 text-[#E9C9CE]" />
                  <span>{selectedOrder.paymentMethod}</span>
                </span>
                <span className="text-[10px] font-mono text-emerald-400 block mt-0.5">
                  Status: {selectedOrder.paymentStatus}
                </span>
              </div>

              <div className="space-y-1 text-right border-t sm:border-t-0 sm:border-l border-[#2B2527] pt-2 sm:pt-0 sm:pl-6 font-mono text-xs">
                <div className="flex justify-between sm:justify-end gap-6 text-[#7A7375]">
                  <span>Subtotal:</span>
                  <span>PKR {selectedOrder.subtotalPKR.toLocaleString()}</span>
                </div>
                <div className="flex justify-between sm:justify-end gap-6 text-[#7A7375]">
                  <span>Shipping Fee:</span>
                  <span>PKR {selectedOrder.shippingFeePKR.toLocaleString()}</span>
                </div>
                <div className="flex justify-between sm:justify-end gap-6 text-[#FFFFFF] font-bold text-sm pt-1 border-t border-[#2B2527]">
                  <span>Grand Total:</span>
                  <span className="text-[#E9C9CE]">PKR {selectedOrder.totalPKR.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Change Fulfillment Status Control */}
            <div className="p-4 bg-[#211E1F] border border-[#2B2527] rounded flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <label className="text-[11px] font-medium text-[#FFFFFF] block">
                  Update Fulfillment Status:
                </label>
                <span className="text-[10px] text-[#7A7375]">
                  Updates delivery tracking and customer records immediately.
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
            <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#242022]">
              <button
                onClick={() => window.print()}
                className="px-4 py-2 bg-[#1A1718] border border-[#2B2527] hover:border-[#E9C9CE] text-[#FCFAF9] rounded flex items-center gap-2 transition-colors cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5 text-[#E9C9CE]" />
                <span>Print Invoice</span>
              </button>
              <button
                onClick={() => setSelectedOrder(null)}
                className="px-5 py-2 bg-[#E9C9CE] hover:bg-[#F3D7DC] text-[#171515] font-medium rounded transition-colors cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
