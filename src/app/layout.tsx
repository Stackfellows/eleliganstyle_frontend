import type { Metadata } from 'next';
import { Cormorant_Garamond, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import { CartProvider } from '@/lib/context/CartContext';
import { WishlistProvider } from '@/lib/context/WishlistContext';
import { UIProvider } from '@/lib/context/UIContext';
import TopAnnouncementBar from '@/components/layout/TopAnnouncementBar';
import Header from '@/components/layout/Header';
import NavigationDrawer from '@/components/layout/NavigationDrawer';
import CartDrawer from '@/components/commerce/CartDrawer';
import SearchOverlay from '@/components/commerce/SearchOverlay';
import QuickViewModal from '@/components/commerce/QuickViewModal';
import ToastContainer from '@/components/ui/Toast';
import Footer from '@/components/layout/Footer';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-cormorant',
  weight: ['300', '400', '500', '600'],
  display: 'swap',
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
  weight: ['300', '400', '500', '600'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'ELEGANTSTYLE — Luxury Beauty & Fashion',
    template: '%s | ELEGANTSTYLE',
  },
  description:
    'An international luxury beauty and fashion house. Discover bio-fermented botanical skincare elixirs, silk lip colors, and Florentine hand-woven calfskin leather goods.',
  keywords: [
    'luxury beauty',
    'botanical skincare',
    'silk lipstick',
    'italian calfskin belts',
    'saddle leather wallets',
    'elegantstyle',
  ],
  authors: [{ name: 'ELEGANTSTYLE' }],
  openGraph: {
    title: 'ELEGANTSTYLE — Luxury Beauty & Fashion',
    description:
      'Discover bio-fermented botanical skincare elixirs, silk lip colors, and Florentine hand-woven calfskin leather goods.',
    url: 'https://elegantstyle.com',
    siteName: 'ELEGANTSTYLE',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ELEGANTSTYLE — Luxury Beauty & Fashion',
    description: 'International luxury beauty and Florentine leather goods.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${jakarta.variable}`}>
      <body className="bg-[#FFFFFF] text-[#171515] font-sans antialiased min-h-screen flex flex-col">
        <UIProvider>
          <CartProvider>
            <WishlistProvider>
              <TopAnnouncementBar />
              <Header />
              <NavigationDrawer />
              <CartDrawer />
              <SearchOverlay />
              <QuickViewModal />
              <ToastContainer />
              <main className="flex-1">{children}</main>
              <Footer />
            </WishlistProvider>
          </CartProvider>
        </UIProvider>
      </body>
    </html>
  );
}
