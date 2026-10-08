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
  ArrowRight
} from 'lucide-react';
import { getStoredProducts, getStoredOffers } from '@/lib/adminStore';

export default function AdminDashboardPage() {
  const [productsCount, setProductsCount] = useState(0);
  const [offersCount, setOffersCount] = useState(0);
  const [recentOrders, setRecentOrders] = useState<any[]>([]);

  useEffect(() => {
    const prods = getStoredProducts();
    const offers = getStoredOffers();
    setProductsCount(prods.length);
    setOffersCount(offers.length);

    // Fetch live orders
    async function fetchOrders() {
      try {
        const res = await fetch('/api/orders');
        const data = await res.json();
        if (data.success && data.orders) {
          const formatted = data.orders.slice(0, 5).map((o: any) => ({
            id: o.id,
            customer: `${o.customerName} (${o.shippingAddress?.city || 'Pakistan'})`,
            items: (o.items || []).map((i: any) => i.productName || i.name).join(', '),
            total: `PKR ${o.totalPKR?.toLocaleString() || '0'}`,
            status: o.status || 'Pending',
            date: new Date(o.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }));
          setRecentOrders(formatted);
        }
      } catch (e) {
        console.error('Overview orders fetch error', e);
      }
    }

    fetchOrders();
  }, []);

  // Mock revenue monthly chart data points
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



  return (
    <div className="space-y-8 font-sans">
      {/* Welcome Banner */}
      <div className="p-6 sm:p-8 bg-[#141213] border border-[#242022] rounded-lg relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-[#262123] text-[#E9C9CE] text-[10px] uppercase tracking-widest font-mono">
            <Sparkles className="w-3 h-3 text-[#E9C9CE]" />
            <span>Maison Operational Overview</span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-light text-[#FFFFFF] tracking-wide">
            Welcome to ElegantStyle Admin Dashboard
          </h1>
          <p className="text-xs text-[#B0A7A9] font-light leading-relaxed">
            Manage product inventory, client orders, and active privileges & deal bundles.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Link
            href="/admin/products?action=new"
            className="px-4 py-2.5 bg-[#E9C9CE] hover:bg-[#F3D7DC] text-[#171515] font-medium text-xs tracking-wider uppercase rounded transition-all flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Product</span>
          </Link>
          <Link
            href="/admin/offers"
            className="px-4 py-2.5 bg-[#1A1718] border border-[#3A3134] hover:border-[#E9C9CE] text-[#F3ECEB] font-medium text-xs tracking-wider uppercase rounded transition-all flex items-center gap-2"
          >
            <Tag className="w-4 h-4 text-[#E9C9CE]" />
            <span>Manage Offers</span>
          </Link>
        </div>
      </div>

      {/* Metric Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 bg-[#141213] border border-[#242022] rounded-lg space-y-3">
          <div className="flex items-center justify-between text-[#7A7375]">
            <span className="text-[11px] uppercase tracking-wider font-medium text-[#B0A7A9]">Total Revenue (PKR)</span>
            <DollarSign className="w-4 h-4 text-[#E9C9CE]" />
          </div>
          <div className="text-2xl font-serif text-[#FFFFFF]">PKR 3,650,000</div>
          <div className="flex items-center gap-1.5 text-[11px] text-emerald-400 font-medium">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>+18.4% from last month</span>
          </div>
        </div>

        <div className="p-5 bg-[#141213] border border-[#242022] rounded-lg space-y-3">
          <div className="flex items-center justify-between text-[#7A7375]">
            <span className="text-[11px] uppercase tracking-wider font-medium text-[#B0A7A9]">Total Products</span>
            <Package className="w-4 h-4 text-[#E9C9CE]" />
          </div>
          <div className="text-2xl font-serif text-[#FFFFFF]">{productsCount || 12} Products</div>
          <div className="text-[11px] text-[#A8A19F] font-light">Categorized in Beauty & Fashion</div>
        </div>

        <div className="p-5 bg-[#141213] border border-[#242022] rounded-lg space-y-3">
          <div className="flex items-center justify-between text-[#7A7375]">
            <span className="text-[11px] uppercase tracking-wider font-medium text-[#B0A7A9]">Active Offers</span>
            <Tag className="w-4 h-4 text-[#E9C9CE]" />
          </div>
          <div className="text-2xl font-serif text-[#FFFFFF]">{offersCount || 6} Bundles</div>
          <div className="text-[11px] text-[#C58C97] font-light">Bridal, Party & Makeup Suites</div>
        </div>

        <div className="p-5 bg-[#141213] border border-[#242022] rounded-lg space-y-3">
          <div className="flex items-center justify-between text-[#7A7375]">
            <span className="text-[11px] uppercase tracking-wider font-medium text-[#B0A7A9]">VIP Customers</span>
            <Users className="w-4 h-4 text-[#E9C9CE]" />
          </div>
          <div className="text-2xl font-serif text-[#FFFFFF]">1,420 Clients</div>
          <div className="text-[11px] text-emerald-400 font-medium">+124 new this week</div>
        </div>
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

          {/* Custom SVG Line Chart */}
          <div className="h-60 w-full relative flex flex-col justify-end">
            <svg className="w-full h-48 overflow-visible" viewBox="0 0 500 150">
              <defs>
                <linearGradient id="salesGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#E9C9CE" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#E9C9CE" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Grid lines */}
              <line x1="0" y1="0" x2="500" y2="0" stroke="#242022" strokeDasharray="3 3" />
              <line x1="0" y1="50" x2="500" y2="50" stroke="#242022" strokeDasharray="3 3" />
              <line x1="0" y1="100" x2="500" y2="100" stroke="#242022" strokeDasharray="3 3" />
              <line x1="0" y1="150" x2="500" y2="150" stroke="#242022" />

              {/* Area fill */}
              <path
                d="M 0 110 C 80 80, 160 50, 240 70 C 320 90, 400 30, 500 10 L 500 150 L 0 150 Z"
                fill="url(#salesGrad)"
              />

              {/* Smooth curve line */}
              <path
                d="M 0 110 C 80 80, 160 50, 240 70 C 320 90, 400 30, 500 10"
                fill="none"
                stroke="#E9C9CE"
                strokeWidth="3"
              />

              {/* Glowing data points */}
              <circle cx="0" cy="110" r="4" fill="#E9C9CE" />
              <circle cx="100" cy="85" r="4" fill="#E9C9CE" />
              <circle cx="200" cy="60" r="4" fill="#E9C9CE" />
              <circle cx="300" cy="70" r="4" fill="#E9C9CE" />
              <circle cx="400" cy="35" r="4" fill="#E9C9CE" />
              <circle cx="500" cy="10" r="5" fill="#FFFFFF" stroke="#E9C9CE" strokeWidth="2" />
            </svg>

            <div className="flex justify-between text-[11px] text-[#7A7375] font-mono mt-4 pt-2 border-t border-[#242022]">
              {salesData.map((d) => (
                <span key={d.month}>{d.month} (${(d.sales / 1000).toFixed(1)}k)</span>
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

      {/* Recent Orders Table */}
      <div className="bg-[#141213] border border-[#242022] rounded-lg p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-serif text-lg text-[#FFFFFF]">Recent Client Orders</h3>
            <p className="text-xs text-[#7A7375]">Real-time checkout requests</p>
          </div>
          <Link href="/admin/orders" className="text-xs text-[#E9C9CE] hover:underline font-medium">
            View All Orders
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-[#B0A7A9]">
            <thead className="bg-[#1A1718] text-[10px] uppercase tracking-wider text-[#7A7375] font-mono border-b border-[#242022]">
              <tr>
                <th className="p-3">Order ID</th>
                <th className="p-3">Customer</th>
                <th className="p-3">Purchased Items</th>
                <th className="p-3">Total Amount</th>
                <th className="p-3">Status</th>
                <th className="p-3">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#242022]">
              {recentOrders.map((ord) => (
                <tr key={ord.id} className="hover:bg-[#1A1718]/50 transition-colors">
                  <td className="p-3 font-mono text-[#E9C9CE]">{ord.id}</td>
                  <td className="p-3 font-medium text-[#F3ECEB]">{ord.customer}</td>
                  <td className="p-3 text-[#A8A19F] max-w-xs truncate">{ord.items}</td>
                  <td className="p-3 font-mono text-[#FFFFFF]">{ord.total}</td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] tracking-wide font-mono uppercase ${
                        ord.status === 'Delivered'
                          ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                          : ord.status === 'Shipped'
                          ? 'bg-sky-950 text-sky-300 border border-sky-800'
                          : 'bg-amber-950 text-amber-300 border border-amber-800'
                      }`}
                    >
                      {ord.status}
                    </span>
                  </td>
                  <td className="p-3 text-[#7A7375]">{ord.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
