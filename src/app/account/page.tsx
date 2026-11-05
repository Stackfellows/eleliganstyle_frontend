'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import {
  User,
  Package,
  Heart,
  LogOut,
  ShieldCheck,
  Lock,
  ArrowRight,
  Truck,
  CheckCircle2,
  Clock,
  Sparkles,
  ShoppingBag,
  Edit3,
  Check,
  MapPin,
  Phone,
  Mail
} from 'lucide-react';
import { useWishlist } from '@/lib/context/WishlistContext';
import { useCart } from '@/lib/context/CartContext';
import { formatPrice } from '@/lib/utils';

interface UserSession {
  id: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  city?: string;
  province?: string;
  tier?: string;
  memberSince?: string | number;
}

interface StoredOrder {
  id: string;
  createdAt: string;
  status: string;
  totalPKR: number;
  paymentMethod: string;
  items: Array<{
    name?: string;
    productName?: string;
    quantity: number;
    pricePKR: number;
    image?: string;
  }>;
  shippingAddress?: {
    street?: string;
    city?: string;
    province?: string;
  };
}

function AccountContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { wishlist, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();

  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<UserSession | null>(null);
  const [activeTab, setActiveTab] = useState<'profile' | 'orders' | 'vault' | 'privileges'>('profile');

  // Edit profile form
  const [editName, setEditName] = useState('');
  const [editPhone, setEditPhone] = useState('');
  const [editAddress, setEditAddress] = useState('');
  const [editCity, setEditCity] = useState('');
  const [editProvince, setEditProvince] = useState('');
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Orders
  const [orders, setOrders] = useState<StoredOrder[]>([]);
  const [ordersLoading, setOrdersLoading] = useState(false);

  useEffect(() => {
    try {
      const sessionStr = localStorage.getItem('elegant_user_session');
      if (sessionStr) {
        const parsed: UserSession = JSON.parse(sessionStr);
        if (parsed && (parsed.email || parsed.name)) {
          setUser(parsed);
          setIsAuthenticated(true);
          setEditName(parsed.name || '');
          setEditPhone(parsed.phone || '');
          setEditAddress(parsed.address || '');
          setEditCity(parsed.city || '');
          setEditProvince(parsed.province || 'Punjab');
        } else {
          setIsAuthenticated(false);
        }
      } else {
        setIsAuthenticated(false);
      }
    } catch (err) {
      console.error('Session load error', err);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Fetch or load orders when authenticated
  useEffect(() => {
    if (!isAuthenticated || !user) return;

    setOrdersLoading(true);

    const loadOrders = async () => {
      let combined: StoredOrder[] = [];

      // 1. From localStorage user orders
      try {
        const local = localStorage.getItem('elegant_user_orders');
        if (local) {
          const parsed = JSON.parse(local);
          if (Array.isArray(parsed)) {
            combined = [...parsed];
          }
        }
      } catch (e) {
        console.error('Local orders parse error', e);
      }

      // 2. From server API matching email or phone
      try {
        const res = await fetch('/api/orders');
        const data = await res.json();
        if (data.success && Array.isArray(data.orders)) {
          const userEmail = (user.email || '').toLowerCase().trim();
          const userPhone = (user.phone || '').trim();

          const matching = data.orders.filter((o: any) => {
            const orderEmail = (o.customerEmail || '').toLowerCase().trim();
            const orderPhone = (o.customerPhone || '').trim();
            return (
              (userEmail && orderEmail === userEmail) ||
              (userPhone && orderPhone && (orderPhone.includes(userPhone) || userPhone.includes(orderPhone)))
            );
          });

          // Deduplicate by ID
          matching.forEach((m: any) => {
            if (!combined.some((c) => c.id === m.id)) {
              combined.push(m);
            }
          });
        }
      } catch (err) {
        console.error('API orders fetch error', err);
      }

      // Sort newest first
      combined.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      setOrders(combined);
      setOrdersLoading(false);
    };

    loadOrders();
  }, [isAuthenticated, user]);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    const updatedUser: UserSession = {
      ...user,
      name: editName.trim() || user.name,
      phone: editPhone.trim(),
      address: editAddress.trim(),
      city: editCity.trim(),
      province: editProvince.trim(),
    };

    localStorage.setItem('elegant_user_session', JSON.stringify(updatedUser));
    setUser(updatedUser);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleSignOut = () => {
    localStorage.removeItem('elegant_user_session');
    setIsAuthenticated(false);
    setUser(null);
    router.push('/login');
  };

  if (isLoading) {
    return (
      <div className="bg-[#FFFFFF] min-h-[70vh] flex items-center justify-center font-sans text-xs text-[#6E6767]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-[#171515] border-t-transparent rounded-full animate-spin" />
          <span className="uppercase tracking-widest text-[10px]">Verifying Privilege Credentials...</span>
        </div>
      </div>
    );
  }

  // GATE: User is not logged in / account not created
  if (!isAuthenticated || !user) {
    return (
      <div className="bg-[#FFFFFF] min-h-screen pb-24 font-sans text-[#171515]">
        <div className="bg-[#FCFAF9] border-b border-[#ECE7E6] py-16 sm:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#C58C97] font-medium block">
              ELEGANTSTYLE PRIVILEGE
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl font-light text-[#171515]">
              Privilege Client Portal
            </h1>
            <p className="text-xs sm:text-sm text-[#6E6767] font-light max-w-lg mx-auto leading-relaxed">
              Access to your personal client ledger, order tracking archives, and bespoke concierge benefits requires an authorized account.
            </p>
          </div>
        </div>

        <div className="max-w-xl mx-auto px-4 sm:px-6 pt-12">
          <div className="bg-[#FCFAF9] border border-[#ECE7E6] p-8 sm:p-12 text-center space-y-6 shadow-sm">
            <div className="w-16 h-16 rounded-full bg-[#FFFFFF] border border-[#ECE7E6] text-[#C58C97] flex items-center justify-center mx-auto shadow-xs">
              <Lock className="w-7 h-7 stroke-[1.5]" />
            </div>

            <div className="space-y-2">
              <h2 className="font-serif text-2xl font-light text-[#171515]">
                Sign In or Register to Access Dashboard
              </h2>
              <p className="text-xs text-[#6E6767] font-light leading-relaxed">
                Please create your account or sign in with your credentials to manage orders, update shipping addresses, and review saved luxury items.
              </p>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/login?redirect=/account"
                className="w-full sm:w-auto px-8 py-3.5 bg-[#171515] text-[#FCFAF9] text-xs uppercase tracking-widest hover:bg-[#292526] transition-all flex items-center justify-center gap-2"
              >
                <span>Sign In to Account</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/login?register=true&redirect=/account"
                className="w-full sm:w-auto px-8 py-3.5 bg-[#FFFFFF] border border-[#ECE7E6] text-[#171515] text-xs uppercase tracking-widest hover:border-[#171515] transition-all flex items-center justify-center gap-2"
              >
                <span>Create New Account</span>
              </Link>
            </div>

            {/* Member Benefits Overview */}
            <div className="pt-8 border-t border-[#ECE7E6] text-left">
              <span className="text-[10px] uppercase tracking-widest text-[#6E6767] font-medium block mb-4">
                PRIVILEGE MEMBER BENEFITS
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-[#6E6767]">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#C58C97] shrink-0 mt-0.5" />
                  <span>Complimentary Insured Express Delivery</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#C58C97] shrink-0 mt-0.5" />
                  <span>Real-time Order & Rider Tracking</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#C58C97] shrink-0 mt-0.5" />
                  <span>Personal Saved Vault Wishlist</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#C58C97] shrink-0 mt-0.5" />
                  <span>30-Day Exchange Privilege</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // AUTHENTICATED: Display the user's authentic dashboard
  return (
    <div className="bg-[#FFFFFF] min-h-screen pb-24 font-sans text-[#171515]">
      {/* Header Banner */}
      <div className="bg-[#FCFAF9] border-b border-[#ECE7E6] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Client Account' }]} />
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-[#C58C97] font-medium">
                <Sparkles className="w-3 h-3 text-[#C58C97]" />
                <span>ELEGANTSTYLE PRIVILEGE • ACTIVE MEMBER</span>
              </div>
              <h1 className="font-serif text-3xl sm:text-4xl font-light text-[#171515] mt-1">
                Welcome, {user.name}
              </h1>
            </div>
            <div className="flex items-center gap-4 text-xs font-mono text-[#6E6767]">
              <span>Client ID: {user.id || 'ES-98410'}</span>
              <span className="hidden sm:inline text-[#ECE7E6]">|</span>
              <span className="text-[#C58C97] font-medium">{user.tier || 'Privilege Member'}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Sidebar Nav */}
          <div className="lg:col-span-3 space-y-2 font-sans text-xs">
            <button
              onClick={() => setActiveTab('profile')}
              className={`w-full text-left py-3 px-4 flex items-center justify-between border transition-colors ${
                activeTab === 'profile'
                  ? 'bg-[#171515] text-[#FCFAF9] border-[#171515]'
                  : 'bg-[#FCFAF9] text-[#171515] border-[#ECE7E6] hover:bg-[#F8F5F4]'
              }`}
            >
              <div className="flex items-center gap-3">
                <User className="w-4 h-4" />
                <span>Personal Details</span>
              </div>
            </button>

            <button
              onClick={() => setActiveTab('orders')}
              className={`w-full text-left py-3 px-4 flex items-center justify-between border transition-colors ${
                activeTab === 'orders'
                  ? 'bg-[#171515] text-[#FCFAF9] border-[#171515]'
                  : 'bg-[#FCFAF9] text-[#171515] border-[#ECE7E6] hover:bg-[#F8F5F4]'
              }`}
            >
              <div className="flex items-center gap-3">
                <Package className="w-4 h-4" />
                <span>Order Archives</span>
              </div>
              {orders.length > 0 && (
                <span className="px-2 py-0.5 text-[10px] rounded-full bg-[#C58C97] text-[#FFFFFF] font-mono">
                  {orders.length}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('vault')}
              className={`w-full text-left py-3 px-4 flex items-center justify-between border transition-colors ${
                activeTab === 'vault'
                  ? 'bg-[#171515] text-[#FCFAF9] border-[#171515]'
                  : 'bg-[#FCFAF9] text-[#171515] border-[#ECE7E6] hover:bg-[#F8F5F4]'
              }`}
            >
              <div className="flex items-center gap-3">
                <Heart className="w-4 h-4" />
                <span>Saved Vault</span>
              </div>
              {wishlist.length > 0 && (
                <span className="px-2 py-0.5 text-[10px] rounded-full bg-[#E9C9CE] text-[#171515] font-mono">
                  {wishlist.length}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('privileges')}
              className={`w-full text-left py-3 px-4 flex items-center justify-between border transition-colors ${
                activeTab === 'privileges'
                  ? 'bg-[#171515] text-[#FCFAF9] border-[#171515]'
                  : 'bg-[#FCFAF9] text-[#171515] border-[#ECE7E6] hover:bg-[#F8F5F4]'
              }`}
            >
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-4 h-4" />
                <span>Privilege Privileges</span>
              </div>
            </button>

            <button
              onClick={handleSignOut}
              className="w-full text-left py-3 px-4 flex items-center gap-3 border border-[#ECE7E6] bg-[#FCFAF9] text-[#A21D21] hover:bg-[#F8F5F4] transition-colors mt-4"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          </div>

          {/* Tab Content */}
          <div className="lg:col-span-9">
            {/* 1. PROFILE TAB */}
            {activeTab === 'profile' && (
              <div className="bg-[#FCFAF9] border border-[#ECE7E6] p-8 space-y-6">
                <div className="flex items-center justify-between border-b border-[#ECE7E6] pb-4">
                  <div>
                    <h3 className="font-serif text-2xl font-light text-[#171515]">
                      Personal Details & Address
                    </h3>
                    <p className="text-xs text-[#6E6767] font-light mt-1">
                      Update your primary contact coordinates and delivery address for expedited checkout.
                    </p>
                  </div>
                  {saveSuccess && (
                    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#F4F6EE] border border-[#D0D9C0] text-[#556340] text-xs font-medium rounded">
                      <Check className="w-3.5 h-3.5" />
                      <span>Changes Saved</span>
                    </div>
                  )}
                </div>

                <form onSubmit={handleSaveProfile} className="space-y-6 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-1.5">
                      <label className="text-[10px] uppercase tracking-wider text-[#6E6767] font-medium block">
                        Full Name
                      </label>
                      <input
                        type="text"
                        required
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        className="w-full bg-[#FFFFFF] border border-[#ECE7E6] p-3 text-xs focus:outline-none focus:border-[#171515]"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] uppercase tracking-wider text-[#6E6767] font-medium block">
                        Email Address (Read-only)
                      </label>
                      <input
                        type="email"
                        disabled
                        value={user.email}
                        className="w-full bg-[#F2EEEE] border border-[#ECE7E6] p-3 text-xs text-[#6E6767] cursor-not-allowed"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] uppercase tracking-wider text-[#6E6767] font-medium block">
                        Contact Phone Number
                      </label>
                      <input
                        type="text"
                        placeholder="+92 300 1234567"
                        value={editPhone}
                        onChange={(e) => setEditPhone(e.target.value)}
                        className="w-full bg-[#FFFFFF] border border-[#ECE7E6] p-3 text-xs focus:outline-none focus:border-[#171515]"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] uppercase tracking-wider text-[#6E6767] font-medium block">
                        City
                      </label>
                      <input
                        type="text"
                        placeholder="Lahore / Karachi / Islamabad"
                        value={editCity}
                        onChange={(e) => setEditCity(e.target.value)}
                        className="w-full bg-[#FFFFFF] border border-[#ECE7E6] p-3 text-xs focus:outline-none focus:border-[#171515]"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase tracking-wider text-[#6E6767] font-medium block">
                      Primary Delivery Address
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Street, House/Apartment number, Sector, Area..."
                      value={editAddress}
                      onChange={(e) => setEditAddress(e.target.value)}
                      className="w-full bg-[#FFFFFF] border border-[#ECE7E6] p-3 text-xs focus:outline-none focus:border-[#171515] leading-relaxed"
                    />
                  </div>

                  <div className="flex justify-end pt-2">
                    <button
                      type="submit"
                      className="px-8 py-3 bg-[#171515] text-[#FCFAF9] text-xs uppercase tracking-widest hover:bg-[#292526] transition-colors"
                    >
                      Save Profile Changes
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* 2. ORDERS ARCHIVES TAB */}
            {activeTab === 'orders' && (
              <div className="bg-[#FCFAF9] border border-[#ECE7E6] p-8 space-y-6">
                <div className="border-b border-[#ECE7E6] pb-4">
                  <h3 className="font-serif text-2xl font-light text-[#171515]">
                    Order Archives
                  </h3>
                  <p className="text-xs text-[#6E6767] font-light mt-1">
                    Review your completed purchases, courier dispatch tracking, and luxury invoices.
                  </p>
                </div>

                {ordersLoading ? (
                  <div className="py-12 text-center text-xs text-[#6E6767]">
                    Loading order archives...
                  </div>
                ) : orders.length === 0 ? (
                  <div className="py-12 text-center space-y-4 border border-dashed border-[#ECE7E6] bg-[#FFFFFF] p-8">
                    <div className="w-12 h-12 rounded-full bg-[#FCFAF9] border border-[#ECE7E6] text-[#6E6767] flex items-center justify-center mx-auto">
                      <Package className="w-5 h-5 stroke-[1.5]" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-serif text-lg text-[#171515]">No Orders Recorded Yet</h4>
                      <p className="text-xs text-[#6E6767] font-light max-w-sm mx-auto">
                        Your purchases, courier status, and receipts will appear here as soon as you complete your first order.
                      </p>
                    </div>
                    <Link
                      href="/collections"
                      className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#171515] text-[#FCFAF9] text-xs uppercase tracking-wider hover:bg-[#292526] transition-colors"
                    >
                      <span>Discover Collections</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {orders.map((ord) => (
                      <div
                        key={ord.id}
                        className="border border-[#ECE7E6] p-6 bg-[#FFFFFF] space-y-4 text-xs font-sans shadow-xs"
                      >
                        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#ECE7E6] pb-3">
                          <div className="space-y-1">
                            <span className="font-mono text-xs font-bold text-[#171515]">
                              Order #{ord.id}
                            </span>
                            <span className="text-[11px] text-[#6E6767] block">
                              Placed on {new Date(ord.createdAt).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric',
                              })}
                            </span>
                          </div>

                          <div className="flex items-center gap-3">
                            <span
                              className={`px-3 py-1 text-[10px] uppercase tracking-wider font-semibold rounded-full ${
                                ord.status === 'Delivered'
                                  ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                                  : ord.status === 'Dispatched' || ord.status === 'Shipped'
                                  ? 'bg-purple-50 text-purple-800 border border-purple-200'
                                  : ord.status === 'Processing'
                                  ? 'bg-blue-50 text-blue-800 border border-blue-200'
                                  : 'bg-amber-50 text-amber-800 border border-amber-200'
                              }`}
                            >
                              {ord.status || 'Pending'}
                            </span>

                            <Link
                              href={`/track-order?id=${ord.id}`}
                              className="px-3 py-1 bg-[#171515] text-[#FCFAF9] hover:bg-[#292526] transition-colors text-[10px] uppercase tracking-wider flex items-center gap-1"
                            >
                              <Truck className="w-3 h-3 text-[#E9C9CE]" />
                              <span>Track Shipment</span>
                            </Link>
                          </div>
                        </div>

                        {/* Order Items */}
                        <div className="space-y-2">
                          {ord.items &&
                            ord.items.map((it, idx) => (
                              <div
                                key={idx}
                                className="flex items-center justify-between text-xs py-1.5 border-b border-[#F8F5F4] last:border-b-0"
                              >
                                <span className="text-[#171515] font-medium">
                                  {it.productName || it.name} × {it.quantity}
                                </span>
                                <span className="font-mono text-[#6E6767]">
                                  {formatPrice(it.pricePKR * it.quantity)}
                                </span>
                              </div>
                            ))}
                        </div>

                        <div className="pt-3 border-t border-[#ECE7E6] flex flex-wrap items-center justify-between text-xs text-[#6E6767]">
                          <span>
                            Payment: <strong className="text-[#171515]">{ord.paymentMethod}</strong>
                          </span>
                          <span className="font-serif text-sm text-[#171515]">
                            Total: <strong className="font-mono">{formatPrice(ord.totalPKR)}</strong>
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* 3. SAVED VAULT TAB */}
            {activeTab === 'vault' && (
              <div className="bg-[#FCFAF9] border border-[#ECE7E6] p-8 space-y-6">
                <div className="border-b border-[#ECE7E6] pb-4">
                  <h3 className="font-serif text-2xl font-light text-[#171515]">
                    Saved Vault
                  </h3>
                  <p className="text-xs text-[#6E6767] font-light mt-1">
                    Your personal wish-list curation of botanical formulas and leather accessories.
                  </p>
                </div>

                {wishlist.length === 0 ? (
                  <div className="py-12 text-center space-y-4 border border-dashed border-[#ECE7E6] bg-[#FFFFFF] p-8">
                    <div className="w-12 h-12 rounded-full bg-[#FCFAF9] border border-[#ECE7E6] text-[#6E6767] flex items-center justify-center mx-auto">
                      <Heart className="w-5 h-5 stroke-[1.5]" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-serif text-lg text-[#171515]">Your Saved Vault is Empty</h4>
                      <p className="text-xs text-[#6E6767] font-light max-w-sm mx-auto">
                        Bookmark your favorite creations while browsing to revisit and order at any time.
                      </p>
                    </div>
                    <Link
                      href="/collections"
                      className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#171515] text-[#FCFAF9] text-xs uppercase tracking-wider hover:bg-[#292526] transition-colors"
                    >
                      <span>Explore Catalog</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {wishlist.map((prod) => (
                      <div
                        key={prod.id}
                        className="bg-[#FFFFFF] border border-[#ECE7E6] p-4 flex flex-col justify-between space-y-3"
                      >
                        <div className="flex gap-4">
                          <div className="w-20 h-24 bg-[#F8F5F4] border border-[#ECE7E6] shrink-0 relative overflow-hidden">
                            {prod.images?.[0] && (
                              <img
                                src={prod.images[0]}
                                alt={prod.name}
                                className="w-full h-full object-cover"
                              />
                            )}
                          </div>
                          <div className="space-y-1 text-xs">
                            <span className="text-[10px] uppercase tracking-wider text-[#6E6767]">
                              {prod.mainCategory}
                            </span>
                            <h4 className="font-serif text-sm text-[#171515] line-clamp-1">
                              {prod.name}
                            </h4>
                            <span className="font-mono text-xs text-[#171515] font-medium block">
                              {formatPrice(prod.price)}
                            </span>
                          </div>
                        </div>

                        <div className="pt-2 flex items-center gap-2 border-t border-[#ECE7E6]">
                          <button
                            onClick={() => addToCart(prod)}
                            className="flex-1 py-2 bg-[#171515] text-[#FCFAF9] text-[10px] uppercase tracking-wider hover:bg-[#292526] transition-colors"
                          >
                            Add to Bag
                          </button>
                          <button
                            onClick={() => toggleWishlist(prod)}
                            className="px-3 py-2 border border-[#ECE7E6] text-[#A21D21] text-[10px] uppercase tracking-wider hover:bg-[#FCFAF9] transition-colors"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* 4. PRIVILEGE PRIVILEGES TAB */}
            {activeTab === 'privileges' && (
              <div className="bg-[#FCFAF9] border border-[#ECE7E6] p-8 space-y-6">
                <div className="border-b border-[#ECE7E6] pb-4">
                  <h3 className="font-serif text-2xl font-light text-[#171515]">
                    Privilege Privileges & Tier Status
                  </h3>
                  <p className="text-xs text-[#6E6767] font-light mt-1">
                    Your account grants you lifetime access to exclusive maison services across Pakistan and internationally.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-5 bg-[#FFFFFF] border border-[#ECE7E6] space-y-2">
                    <Truck className="w-5 h-5 text-[#C58C97]" />
                    <h4 className="font-serif text-base text-[#171515]">Insured Express Delivery</h4>
                    <p className="text-xs text-[#6E6767] font-light">
                      Complimentary express courier shipping on all orders over PKR 10,000 across Pakistan.
                    </p>
                  </div>

                  <div className="p-5 bg-[#FFFFFF] border border-[#ECE7E6] space-y-2">
                    <CheckCircle2 className="w-5 h-5 text-[#C58C97]" />
                    <h4 className="font-serif text-base text-[#171515]">30-Day Return Privilege</h4>
                    <p className="text-xs text-[#6E6767] font-light">
                      Enjoy hassle-free returns and size/shade exchanges on all unworn creations.
                    </p>
                  </div>

                  <div className="p-5 bg-[#FFFFFF] border border-[#ECE7E6] space-y-2">
                    <Sparkles className="w-5 h-5 text-[#C58C97]" />
                    <h4 className="font-serif text-base text-[#171515]">Private Client Concierge</h4>
                    <p className="text-xs text-[#6E6767] font-light">
                      Direct phone and WhatsApp consultation for bespoke bridal kits and leather embossing.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AccountPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#FFFFFF] flex items-center justify-center text-xs text-[#6E6767]">
          Loading account...
        </div>
      }
    >
      <AccountContent />
    </Suspense>
  );
}
