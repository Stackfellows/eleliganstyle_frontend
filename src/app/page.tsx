import React from 'react';
import HeroSection from '@/components/home/HeroSection';
import CategoryShowcase from '@/components/home/CategoryShowcase';
import DealsSection from '@/components/home/DealsSection';
import AudienceSection from '@/components/home/AudienceSection';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import BrandStory from '@/components/home/BrandStory';
import JournalTeaser from '@/components/home/JournalTeaser';

export const metadata = {
  title: 'ELEGANTSTYLE — Botanical Skincare & Florentine Leather Goods',
  description:
    'An original international luxury brand. Explore Damask rose serums, velvet face creams, silk lipsticks, Italian hand-woven calfskin belts, and saddle leather wallets.',
};

export default function HomePage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'ELEGANTSTYLE',
    url: 'https://elegantstyle.com',
    logo: 'https://elegantstyle.com/logo.png',
    description:
      'International luxury e-commerce brand selling botanical skincare elixirs, silk lip colors, and Italian calfskin leather goods.',
    sameAs: [
      'https://instagram.com/elegantstyle',
      'https://pinterest.com/elegantstyle',
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="space-y-0">
        <HeroSection />
        <CategoryShowcase />
        <DealsSection />
        <AudienceSection />
        <FeaturedProducts />
        <BrandStory />
        <JournalTeaser />
      </div>
    </>
  );
}
