'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  Package,
  Tag,
  Users,
  ShoppingCart,
  TrendingUp,
  LogOut,
  Sparkles,
  Search,
  Bell,
  SlidersHorizontal,
  ChevronRight,
  ExternalLink,
  ShieldCheck,
  Image as ImageIcon,
  Terminal
} from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    // Simple admin auth check via localStorage cookie/token check
    const auth = localStorage.getItem('elegant_admin_authenticated');
    if (auth === 'true') {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
      if (pathname !== '/admin/login') {
        router.push('/admin/login');
      }
    }
  }, [pathname, router]);

  if (pathname === '/admin/login') {
    return <div className="min-h-screen bg-[#0F0E0E] text-[#FCFAF9]">{children}</div>;
  }

  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-[#0F0E0E] flex items-center justify-center text-[#E9C9CE]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-[#E9C9CE] border-t-transparent rounded-full animate-spin"></div>
          <span className="text-xs uppercase tracking-widest font-mono">Loading Maison Admin...</span>
        </div>
      </div>
    );
  }

  if (!isAuthenticated && pathname !== '/admin/login') {
    return null;
  }

  const navLinks = [
    { href: '/admin', label: 'Dashboard Overview', icon: LayoutDashboard },
    { href: '/admin/products', label: 'Products & Inventory', icon: Package },
    { href: '/admin/offers', label: 'Offers & Privileges', icon: Tag },
    { href: '/admin/orders', label: 'Customer Orders', icon: ShoppingCart },
    { href: '/admin/testing', label: 'API Testing Suite', icon: Terminal },
  ];

  const handleLogout = () => {
    localStorage.removeItem('elegant_admin_authenticated');
    router.push('/admin/login');
  };

  return (
    <div className="min-h-screen bg-[#0D0C0C] text-[#F3ECEB] font-sans flex flex-col md:flex-row antialiased">
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-[#141213] border-r border-[#242022] flex flex-col justify-between shrink-0">
        <div>
          {/* Brand Header */}
          <div className="p-6 border-b border-[#242022] flex items-center justify-between">
            <Link href="/admin" className="flex flex-col">
              <span className="font-serif text-lg tracking-[0.2em] font-light text-[#FFFFFF] uppercase">
                ELEGANTSTYLE
              </span>
              <span className="text-[9px] tracking-[0.3em] text-[#C58C97] uppercase font-sans font-medium">
                MAISON ADMIN PORTAL
              </span>
            </Link>
            <span className="px-2 py-0.5 rounded bg-[#C58C97]/15 text-[#E9C9CE] text-[9px] tracking-wider uppercase font-mono">
              v1.0
            </span>
          </div>

          {/* Nav Items */}
          <div className="px-4 py-6 space-y-1.5">
            <div className="px-3 pb-2 text-[10px] uppercase tracking-[0.25em] text-[#7A7375] font-semibold">
              Management & Analytics
            </div>

            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-md text-xs tracking-wide transition-all ${
                    isActive
                      ? 'bg-[#262123] text-[#E9C9CE] font-medium border border-[#3A3134]'
                      : 'text-[#B0A7A9] hover:bg-[#1A1718] hover:text-[#FFFFFF]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-[#E9C9CE]' : 'text-[#7A7375]'}`} />
                    <span>{link.label}</span>
                  </div>
                  {isActive && <ChevronRight className="w-3.5 h-3.5 text-[#E9C9CE]" />}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Bottom Sidebar Controls */}
        <div className="p-4 border-t border-[#242022] space-y-3">
          <Link
            href="/"
            target="_blank"
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded text-xs text-[#A8A19F] bg-[#1A1718] border border-[#2B2527] hover:border-[#E9C9CE]/40 hover:text-[#FFFFFF] transition-all"
          >
            <span>Preview Frontend Store</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>

          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded text-xs text-[#E87373] bg-[#211415] border border-[#3D1F21] hover:bg-[#2E181A] transition-all cursor-pointer font-medium"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Workspace */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header Bar */}
        <header className="h-16 bg-[#141213]/80 backdrop-blur-md border-b border-[#242022] px-6 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-3 text-xs text-[#A8A19F]">
            <span className="text-[#E9C9CE] font-medium">Maison Portal Active</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-[#7A7375] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search admin catalog..."
                className="bg-[#1A1718] text-xs text-[#F3ECEB] placeholder-[#6B6466] pl-9 pr-4 py-1.5 rounded border border-[#2B2527] focus:outline-none focus:border-[#E9C9CE] w-48 sm:w-64 transition-colors"
              />
            </div>

            <div className="flex items-center gap-2 pl-4 border-l border-[#242022]">
              <div className="w-7 h-7 rounded-full bg-[#262123] border border-[#3A3134] flex items-center justify-center text-[#E9C9CE] font-serif text-xs">
                A
              </div>
              <div className="hidden sm:flex flex-col text-left">
                <span className="text-xs font-medium text-[#F3ECEB] leading-none">Maison Admin</span>
                <span className="text-[10px] text-[#7A7375] leading-tight">Super Administrator</span>
              </div>
            </div>
          </div>
        </header>

        {/* Content Body */}
        <main className="flex-1 p-6 md:p-8 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
