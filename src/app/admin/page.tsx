'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  TrendingUp,
  Package,
  ShoppingCart,
  Users,
  Tag,
  ArrowUpRight,
  Plus,
  Sparkles,
  BarChart3,
  DollarSign,
  Layers,
  ArrowRight,
  Eye,
  X,
  Phone,
  Mail,
  MapPin,
  Banknote,
  Printer,
  ExternalLink,
  CheckCircle2,
  Clock
} from 'lucide-react';
import { getStoredProducts, getStoredOffers } from '@/lib/adminStore';

interface AdminDashboardItem {
  productName?: string;
  name?: string;
  quantity?: number;
  price?: number;
  pricePKR?: number;
}

interface AdminDashboardOrder {
  id: string;
  customerName?: string;
  customerPhone?: string;
  customerEmail?: string;
  totalPKR?: number;
  paymentMethod?: string;
  status?: string;
  createdAt?: string | number;
  shippingAddress?: {
    street?: string;
    city?: string;
    province?: string;
    deliveryNotes?: string;
  };
  items?: AdminDashboardItem[];
}

export default function AdminDashboardPage() {
  const [productsCount, setProductsCount] = useState(0);
  const [offersCount, setOffersCount] = useState(0);
  const [ordersCount, setOrdersCount] = useState(0);
  const [recentOrders, setRecentOrders] = useState<AdminDashboardOrder[]>([]);
  const [dashboardFilter, setDashboardFilter] = useState('All');
  const [selectedOrder, setSelectedOrder] = useState<AdminDashboardOrder | null>(null);

  useEffect(() => {
    const prods = getStoredProducts();
    const offers = getStoredOffers();
    setProductsCount(prods.length);
    setOffersCount(offers.length);

    // Fetch live orders
    async function fetchOrders() {
      try {
        let combined: AdminDashboardOrder[] = [];
        const res = await fetch('/api/orders');
        const data = await res.json();
        if (data.success && Array.isArray(data.orders)) {
          combined = [...data.orders];
        }

        // Also check local storage for newly placed checkout orders
        try {
          const local = localStorage.getItem('elegant_user_orders');
          if (local) {
            const parsed = JSON.parse(local);
            if (Array.isArray(parsed)) {
              parsed.forEach((po: AdminDashboardOrder) => {
                if (!combined.some((co) => co.id === po.id)) {
                  combined.unshift(po);
                }
              });
            }
          }
        } catch {
          // ignore localStorage error
        }

        setOrdersCount(combined.length);
        setRecentOrders(combined.slice(0, 10));
      } catch (e) {
        console.error('Overview orders fetch error', e);
      }
    }

    fetchOrders();
  }, []);

  // Monthly revenue chart data points
  const salesData = [
    { month: 'Jan', sales: 12400 },
    { month: 'Feb', sales: 18900 },
    { month: 'Mar', sales: 24500 },
    { month: 'Apr', sales: 21200 },
    { month: 'May', sales: 31000 },
    { month: 'Jun', sales: 42800 },
  ];

  const categoryDistribution = [
    { name: 'Makeup & Lip Colors', count: 18, color: '#E9C9CE', percent: '42%' },
    { name: 'Botanical Skin Care', count: 12, color: '#C58C97', percent: '28%' },
    { name: 'Calfskin Belts', count: 8, color: '#9E6E77', percent: '18%' },
    { name: 'Saddle Leather Wallets', count: 5, color: '#6E4950', percent: '12%' },
  ];

  const getStatusBadge = (status?: string) => {
    switch (status) {
      case 'Delivered':
        return 'bg-emerald-950 text-emerald-300 border-emerald-800';
      case 'Dispatched':
      case 'Shipped':
        return 'bg-indigo-950 text-indigo-300 border-indigo-800';
      case 'Processing':
        return 'bg-blue-950 text-blue-300 border-blue-800';
      default:
        return 'bg-amber-950 text-amber-300 border-amber-800';
    }
  };

  return (
    <div className="space-y-8 font-sans antialiased text-[#F3ECEB]">
      {/* Welcome Banner */}
      <div className="p-6 sm:p-8 bg-[#141213] border border-[#242022] rounded-lg relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-md">
        <div className="space-y-2 max-w-xl">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-[#262123] text-[#E9C9CE] text-[10px] uppercase tracking-widest font-mono">
            <Sparkles className="w-3 h-3 text-[#E9C9CE]" />
            <span>Maison Operational Overview</span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-light text-[#FFFFFF] tracking-wide">
            Welcome to ElegantStyle Admin Dashboard
          </h1>
          <p className="text-xs text-[#B0A7A9] font-light leading-relaxed">
            Manage product catalog, active client orders, shipping addresses & privileged deal suites.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Link
            href="/admin/orders"
            className="px-4 py-2.5 bg-[#E9C9CE] hover:bg-[#F3D7DC] text-[#171515] font-semibold text-xs tracking-wider uppercase rounded transition-all flex items-center gap-2 shadow-xs"
          >
            <ShoppingCart className="w-4 h-4 text-[#171515]" />
            <span>Customer Orders ({ordersCount})</span>
          </Link>
          <Link
            href="/admin/products?action=new"
            className="px-4 py-2.5 bg-[#1A1718] border border-[#3A3134] hover:border-[#E9C9CE] text-[#F3ECEB] font-medium text-xs tracking-wider uppercase rounded transition-all flex items-center gap-2"
          >
            <Plus className="w-4 h-4 text-[#E9C9CE]" />
            <span>Add Product</span>
          </Link>
          <Link
            href="/admin/offers"
            className="px-4 py-2.5 bg-[#1A1718] border border-[#3A3134] hover:border-[#E9C9CE] text-[#F3ECEB] font-medium text-xs tracking-wider uppercase rounded transition-all flex items-center gap-2"
          >
            <Tag className="w-4 h-4 text-[#E9C9CE]" />
            <span>Offers</span>
          </Link>
        </div>
      </div>

      {/* Metric Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Total Revenue */}
        <div className="p-5 bg-[#141213] border border-[#242022] rounded-lg space-y-3">
          <div className="flex items-center justify-between text-[#7A7375]">
            <span className="text-[11px] uppercase tracking-wider font-medium text-[#B0A7A9]">Total Revenue (PKR)</span>
            <DollarSign className="w-4 h-4 text-[#E9C9CE]" />
          </div>
          <div className="text-2xl font-serif text-[#FFFFFF]">₨ 3,650,000</div>
          <div className="flex items-center gap-1.5 text-[11px] text-emerald-400 font-medium">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>+18.4% from last month</span>
          </div>
        </div>

        {/* Card 2: Customer Orders */}
        <Link
          href="/admin/orders"
          className="p-5 bg-[#141213] border border-[#242022] hover:border-[#E9C9CE] rounded-lg space-y-3 transition-colors block group"
        >
          <div className="flex items-center justify-between text-[#7A7375]">
            <span className="text-[11px] uppercase tracking-wider font-medium text-[#B0A7A9] group-hover:text-[#E9C9CE] transition-colors">
              Customer Orders
            </span>
            <ShoppingCart className="w-4 h-4 text-[#E9C9CE]" />
          </div>
          <div className="text-2xl font-serif text-[#FFFFFF]">{ordersCount || 5} Orders</div>
          <div className="text-[11px] text-[#E9C9CE] flex items-center justify-between">
            <span>Manage & Inspect Details</span>
            <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>

        {/* Card 3: Total Products */}
        <Link
          href="/admin/products"
          className="p-5 bg-[#141213] border border-[#242022] hover:border-[#E9C9CE] rounded-lg space-y-3 transition-colors block group"
        >
          <div className="flex items-center justify-between text-[#7A7375]">
            <span className="text-[11px] uppercase tracking-wider font-medium text-[#B0A7A9] group-hover:text-[#E9C9CE] transition-colors">
              Total Products
            </span>
            <Package className="w-4 h-4 text-[#E9C9CE]" />
          </div>
          <div className="text-2xl font-serif text-[#FFFFFF]">{productsCount || 16} Products</div>
          <div className="text-[11px] text-[#A8A19F] font-light">Skincare, Makeup & Leather</div>
        </Link>

        {/* Card 4: Active Offers */}
        <Link
          href="/admin/offers"
          className="p-5 bg-[#141213] border border-[#242022] hover:border-[#E9C9CE] rounded-lg space-y-3 transition-colors block group"
        >
          <div className="flex items-center justify-between text-[#7A7375]">
            <span className="text-[11px] uppercase tracking-wider font-medium text-[#B0A7A9] group-hover:text-[#E9C9CE] transition-colors">
              Active Offers & Deals
            </span>
            <Tag className="w-4 h-4 text-[#E9C9CE]" />
          </div>
          <div className="text-2xl font-serif text-[#FFFFFF]">{offersCount || 6} Bundles</div>
          <div className="text-[11px] text-[#C58C97] font-light">Bridal, Party & Suites</div>
        </Link>
      </div>

      {/* Interactive Charts Section: Revenue Curve + Product Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Sales Overview SVG Graph */}
        <div className="lg:col-span-8 bg-[#141213] border border-[#242022] rounded-lg p-6 space-y-6">
          <div className="flex items-center justify-between border-b border-[#242022] pb-4">
            <div>
              <h3 className="font-serif text-lg text-[#FFFFFF]">Sales & Customer Growth Analytics</h3>
              <p className="text-xs text-[#7A7375]">Monthly gross revenue performance (2026)</p>
            </div>
            <span className="text-[10px] font-mono text-[#E9C9CE] bg-[#262123] px-2.5 py-1 rounded border border-[#3A3134]">
              UPDATED TODAY
            </span>
          </div>

          <div className="h-60 w-full relative flex flex-col justify-end">
            <svg className="w-full h-48 overflow-visible" viewBox="0 0 500 150">
              <defs>
                <linearGradient id="salesGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#E9C9CE" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#E9C9CE" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              <line x1="0" y1="0" x2="500" y2="0" stroke="#242022" strokeDasharray="3 3" />
              <line x1="0" y1="50" x2="500" y2="50" stroke="#242022" strokeDasharray="3 3" />
              <line x1="0" y1="100" x2="500" y2="100" stroke="#242022" strokeDasharray="3 3" />
              <line x1="0" y1="150" x2="500" y2="150" stroke="#242022" />

              <path
                d="M 0 110 C 80 80, 160 50, 240 70 C 320 90, 400 30, 500 10 L 500 150 L 0 150 Z"
                fill="url(#salesGrad)"
              />

              <path
                d="M 0 110 C 80 80, 160 50, 240 70 C 320 90, 400 30, 500 10"
                fill="none"
                stroke="#E9C9CE"
                strokeWidth="3"
              />

              <circle cx="0" cy="110" r="4" fill="#E9C9CE" />
              <circle cx="100" cy="85" r="4" fill="#E9C9CE" />
              <circle cx="200" cy="60" r="4" fill="#E9C9CE" />
              <circle cx="300" cy="70" r="4" fill="#E9C9CE" />
              <circle cx="400" cy="35" r="4" fill="#E9C9CE" />
              <circle cx="500" cy="10" r="5" fill="#FFFFFF" stroke="#E9C9CE" strokeWidth="2" />
            </svg>

            <div className="flex justify-between text-[11px] text-[#7A7375] font-mono mt-4 pt-2 border-t border-[#242022]">
              {salesData.map((d) => (
                <span key={d.month}>{d.month} (₨ {(d.sales / 1000).toFixed(1)}k)</span>
              ))}
            </div>
          </div>
        </div>

        {/* Product Category Breakdown */}
        <div className="lg:col-span-4 bg-[#141213] border border-[#242022] rounded-lg p-6 space-y-6">
          <div className="border-b border-[#242022] pb-4">
            <h3 className="font-serif text-lg text-[#FFFFFF]">Category Breakdown</h3>
            <p className="text-xs text-[#7A7375]">Catalog items by department</p>
          </div>

          <div className="space-y-4">
            {categoryDistribution.map((cat) => (
              <div key={cat.name} className="space-y-1.5">
                <div className="flex justify-between text-xs text-[#F3ECEB]">
                  <span>{cat.name}</span>
                  <span className="font-mono text-[#E9C9CE]">{cat.percent}</span>
                </div>
                <div className="w-full bg-[#1A1718] h-2 rounded-full overflow-hidden border border-[#2B2527]">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{ width: cat.percent, backgroundColor: cat.color }}
                  ></div>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-[#242022]">
            <Link
              href="/admin/products"
              className="text-xs text-[#E9C9CE] hover:underline flex items-center justify-between font-medium"
            >
              <span>Explore Products Directory</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Recent Orders Section with Dedicated Details Button */}
      <div className="bg-[#141213] border border-[#242022] rounded-lg p-6 space-y-4 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#242022] pb-4">
          <div>
            <h3 className="font-serif text-xl text-[#FFFFFF]">Recent Client Orders</h3>
            <p className="text-xs text-[#7A7375]">Real-time incoming orders from customer checkout</p>
          </div>

          <div className="flex items-center gap-3">
            <select
              value={dashboardFilter}
              onChange={(e) => setDashboardFilter(e.target.value)}
              className="bg-[#1A1718] border border-[#2B2527] focus:border-[#E9C9CE] text-xs text-[#FCFAF9] py-1.5 px-3 rounded focus:outline-none"
            >
              <option value="All">All Statuses</option>
              <option value="Pending">Pending</option>
              <option value="Processing">Processing</option>
              <option value="Dispatched">Dispatched</option>
              <option value="Shipped">Shipped</option>
              <option value="Delivered">Delivered</option>
            </select>

            <Link
              href="/admin/orders"
              className="px-3.5 py-1.5 bg-[#1A1718] border border-[#3A3134] hover:border-[#E9C9CE] text-xs text-[#E9C9CE] hover:text-[#FFFFFF] rounded font-medium transition-colors flex items-center gap-1.5"
            >
              <span>Open Orders Tab</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-[#B0A7A9]">
            <thead className="bg-[#1A1718] text-[10px] uppercase tracking-wider text-[#7A7375] font-mono border-b border-[#242022]">
              <tr>
                <th className="p-3">Order ID</th>
                <th className="p-3">Customer & City</th>
                <th className="p-3">Purchased Items</th>
                <th className="p-3">Total Amount</th>
                <th className="p-3">Status</th>
                <th className="p-3">Date</th>
                <th className="p-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#242022]">
              {recentOrders
                .filter((ord) => dashboardFilter === 'All' || ord.status === dashboardFilter)
                .map((ord) => {
                  const city = ord.shippingAddress?.city || 'Pakistan';
                  const itemsSummary = (ord.items || [])
                    .map((i: AdminDashboardItem) => `${i.productName || i.name} (×${i.quantity || 1})`)
                    .join(', ');

                  return (
                    <tr key={ord.id} className="hover:bg-[#1A1718]/60 transition-colors">
                      <td className="p-3 font-mono text-[#E9C9CE] font-bold">{ord.id}</td>
                      <td className="p-3">
                        <div className="font-medium text-[#F3ECEB]">{ord.customerName}</div>
                        <div className="text-[10px] text-[#7A7375] font-mono">{city}</div>
                      </td>
                      <td className="p-3 text-[#A8A19F] max-w-xs truncate">{itemsSummary}</td>
                      <td className="p-3 font-mono text-[#FFFFFF] font-bold">
                        ₨ {(ord.totalPKR || 0).toLocaleString()}
                      </td>
                      <td className="p-3">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] tracking-wide font-mono uppercase border ${getStatusBadge(
                            ord.status || 'Pending'
                          )}`}
                        >
                          {ord.status || 'Pending'}
                        </span>
                      </td>
                      <td className="p-3 text-[#7A7375]">
                        {new Date(ord.createdAt || Date.now()).toLocaleDateString()}
                      </td>
                      <td className="p-3 text-right whitespace-nowrap">
                        <button
                          onClick={() => setSelectedOrder(ord)}
                          className="px-3 py-1.5 bg-[#E9C9CE] text-[#171515] hover:bg-[#F3D7DC] rounded text-xs font-semibold inline-flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>Details</span>
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>

      {/* QUICK VIEW DETAILS MODAL */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 bg-[#0D0C0C]/85 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#141213] border border-[#242022] rounded-xl w-full max-w-xl p-6 space-y-5 my-8 shadow-2xl relative text-xs animate-in fade-in">
            <div className="flex items-center justify-between border-b border-[#242022] pb-3">
              <div className="flex items-center gap-2">
                <span className="font-mono text-base text-[#E9C9CE] font-bold">{selectedOrder.id}</span>
                <span
                  className={`px-2 py-0.5 rounded text-[10px] font-mono uppercase border ${getStatusBadge(
                    selectedOrder.status
                  )}`}
                >
                  {selectedOrder.status}
                </span>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="text-[#7A7375] hover:text-[#FFFFFF] p-1 rounded hover:bg-[#1A1718]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Customer Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="bg-[#1A1718] p-3.5 rounded border border-[#2B2527] space-y-1.5">
                <span className="text-[10px] uppercase font-mono text-[#E9C9CE] block font-semibold">
                  Customer Profile
                </span>
                <div className="font-medium text-sm text-[#FFFFFF]">{selectedOrder.customerName}</div>
                <div className="text-[11px] text-[#A8A19F] font-mono flex items-center gap-1">
                  <Phone className="w-3 h-3 text-[#7A7375]" />
                  <span>{selectedOrder.customerPhone}</span>
                </div>
                <div className="text-[11px] text-[#7A7375] flex items-center gap-1">
                  <Mail className="w-3 h-3 text-[#7A7375]" />
                  <span>{selectedOrder.customerEmail}</span>
                </div>
              </div>

              <div className="bg-[#1A1718] p-3.5 rounded border border-[#2B2527] space-y-1.5">
                <span className="text-[10px] uppercase font-mono text-[#E9C9CE] block font-semibold">
                  Delivery Address
                </span>
                <p className="font-medium text-xs text-[#FFFFFF]">{selectedOrder.shippingAddress?.street}</p>
                <p className="text-[11px] text-[#A8A19F]">
                  {selectedOrder.shippingAddress?.city}, {selectedOrder.shippingAddress?.province}
                </p>
                {selectedOrder.shippingAddress?.deliveryNotes && (
                  <p className="text-[10px] text-[#C58C97] italic mt-1">
                    Note: {selectedOrder.shippingAddress.deliveryNotes}
                  </p>
                )}
              </div>
            </div>

            {/* Purchased Items */}
            <div className="space-y-1.5">
              <span className="text-[10px] uppercase font-mono text-[#7A7375] font-semibold block">
                Purchased Items ({selectedOrder.items?.length || 0})
              </span>
              <div className="bg-[#1A1718] p-3 rounded border border-[#2B2527] space-y-1.5 divide-y divide-[#2B2527]">
                {(selectedOrder.items || []).map((it: AdminDashboardItem, idx: number) => (
                  <div key={idx} className="flex items-center justify-between pt-1.5 first:pt-0">
                    <span className="text-[#FFFFFF]">
                      {it.productName || it.name} × {it.quantity || 1}
                    </span>
                    <span className="font-mono text-[#E9C9CE]">
                      ₨ {((it.pricePKR || it.price || 0) * (it.quantity || 1)).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Payment & Total */}
            <div className="bg-[#1A1718] p-3.5 rounded border border-[#2B2527] flex items-center justify-between font-mono">
              <div>
                <span className="text-[10px] uppercase text-[#7A7375] block">Payment Mode</span>
                <span className="text-xs text-[#FFFFFF] font-sans font-medium">{selectedOrder.paymentMethod}</span>
              </div>
              <div className="text-right">
                <span className="text-[10px] uppercase text-[#7A7375] block">Total Amount</span>
                <span className="text-base text-[#E9C9CE] font-bold">
                  ₨ {(selectedOrder.totalPKR || 0).toLocaleString()}
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between pt-2 border-t border-[#242022]">
              <Link
                href={`/admin/orders?id=${selectedOrder.id}`}
                className="text-xs text-[#E9C9CE] hover:underline flex items-center gap-1 font-medium"
              >
                <span>Open Full Management in Orders Tab</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>

              <button
                onClick={() => setSelectedOrder(null)}
                className="px-4 py-2 bg-[#E9C9CE] hover:bg-[#F3D7DC] text-[#171515] font-semibold text-xs rounded transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
