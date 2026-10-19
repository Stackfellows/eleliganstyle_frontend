export interface DealBundle {
  id: string;
  slug: string;
  dealCategory: 'bridal-makeup-deals' | 'party-makeup-deals' | 'makeup-deals';
  title: string;
  subtitle: string;
  description: string;
  originalPrice: number;
  discountedPrice: number;
  savingsPercentage: number;
  badge: string;
  image: string;
  includes: string[];
  perks: string[];
}

export interface DealCategoryInfo {
  slug: 'bridal-makeup-deals' | 'party-makeup-deals' | 'makeup-deals';
  title: string;
  headline: string;
  description: string;
  bannerImage: string;
  badgeText: string;
}

export const DEAL_CATEGORIES: DealCategoryInfo[] = [
  {
    slug: 'bridal-makeup-deals',
    title: 'Bridal Makeup Deals',
    headline: 'Tears-Proof Radiance for Your Most Unforgettable Day',
    description: 'Immerse in our master-formulated Bridal Suites. Engineered with bio-fermented Damask Rose floral hydrosols and satin mineral pigments designed to endure emotional vows, flash photography, and evening celebrations.',
    bannerImage: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=1600&auto=format&fit=crop',
    badgeText: 'EXCLUSIVE BRIDAL PRIVILEGE • SAVE 35%'
  },
  {
    slug: 'party-makeup-deals',
    title: 'Party Makeup Deals',
    headline: 'High-Impact Drama, Velvet Lips & Glistening Gala Radiance',
    description: 'Turn heads at every soiree with our curated evening edit. Rich satin lips, ultra-reflective micro-pearl highlights, and smudge-resistant definition that radiates under candlelight and flashbulbs.',
    bannerImage: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?q=80&w=1600&auto=format&fit=crop',
    badgeText: 'EVENING SOIRÉE CURATION • SAVE 30%'
  },
  {
    slug: 'makeup-deals',
    title: 'Makeup Deals',
    headline: 'Everyday Parisian Chic & Flawless Silk Complexion Bundles',
    description: 'Explore limited-edition bundles combining our most coveted lip formulas, skin fluid tints, and sculpting balms. Indulge in effortless luxury at privileged archive pricing.',
    bannerImage: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?q=80&w=1600&auto=format&fit=crop',
    badgeText: 'LIMITED RUN DEALS • UP TO 40% OFF'
  }
];

export const DEAL_BUNDLES: DealBundle[] = [
  // BRIDAL MAKEUP DEALS
  {
    id: 'deal-bridal-01',
    slug: 'royal-bridal-couture-suite',
    dealCategory: 'bridal-makeup-deals',
    title: 'Royal Bridal Couture Suite',
    subtitle: 'Full 5-Piece Ceremony & Reception Perfection Trunk',
    description: 'The definitive bridal collection. Includes 16-hour mineral skin tint, Rouge Opéra lipstick in Nude Élégance, setting radiance mist, Rose Gold highlighter, and a bespoke bridal touch-up vanity pouch.',
    originalPrice: 380,
    discountedPrice: 247,
    savingsPercentage: 35,
    badge: 'MOST COVETED',
    image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=1200&auto=format&fit=crop',
    includes: [
      'Éclat Mineral Glow Fluid Tint (Custom Shade)',
      'Rouge Opéra Satin Silk Lipstick (Nude Élégance)',
      'Sublime Rose Illuminating Primer Serum',
      'Velours Translucent Micro-Setting Silk Powder',
      'Signature Italian Calfskin Keepsake Bridal Clutch'
    ],
    perks: [
      'Complimentary 1-on-1 virtual bridal concierge consultation',
      'Free engraving on lipstick case',
      'Express white-glove insured delivery'
    ]
  },
  {
    id: 'deal-bridal-02',
    slug: 'radiance-veil-bridal-duo',
    dealCategory: 'bridal-makeup-deals',
    title: 'Radiance Veil Bridal Glow Duo',
    subtitle: 'Camera-Ready Complexion & Hydrating Lip Elixir',
    description: 'Designed for the modern, minimalist bride desiring a lit-from-within celestial glow that photographs flawlessly without flashback or caking.',
    originalPrice: 195,
    discountedPrice: 139,
    savingsPercentage: 28,
    badge: 'BRIDAL ESSENTIAL',
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=1200&auto=format&fit=crop',
    includes: [
      'Lumière Hydrating Nectar Serum (30ml)',
      'Éclat Mineral Glow Fluid Tint (30ml)',
      'Silk Pout Conditioning Treatment (Full Size)'
    ],
    perks: [
      'Complimentary silk makeup bag',
      '2 luxury deluxe skincare samples included'
    ]
  },

  // PARTY MAKEUP DEALS
  {
    id: 'deal-party-01',
    slug: 'nocturne-glamour-gala-set',
    dealCategory: 'party-makeup-deals',
    title: 'Nocturne Gala Glamour Set',
    subtitle: 'Dramatic Bold Lip & Starlight Micro-Pigment Highlighter',
    description: 'Command the room after twilight. Combines our high-impact Rouge Opéra in Scarlet Opéra with prismatic pearlescent dust and 12-hour defining mascara.',
    originalPrice: 210,
    discountedPrice: 147,
    savingsPercentage: 30,
    badge: 'PARTY FAVORITE',
    image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?q=80&w=1200&auto=format&fit=crop',
    includes: [
      'Rouge Opéra Satin Silk Lipstick (Scarlet Opéra)',
      'Starlight Prismatic Champagne Highlighter',
      'Precision Smudge-Proof Gel Liner Pen',
      'Velours Golden Evening Velvet Pouch'
    ],
    perks: [
      'Includes travel pocket mirror with LED light',
      'Complimentary luxury gift wrapping'
    ]
  },
  {
    id: 'deal-party-02',
    slug: 'after-dark-cocktail-lip-trio',
    dealCategory: 'party-makeup-deals',
    title: 'After-Dark Cocktail Lip Trio',
    subtitle: 'Three Iconic Statement Shades for Every Venue',
    description: 'From velvet speakeasies to rooftop cocktail lounges, alternate seamlessly between Plum Nocturne, Scarlet Opéra, and Rose Cashmere.',
    originalPrice: 174,
    discountedPrice: 121,
    savingsPercentage: 30,
    badge: 'LIMITED EDITION',
    image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?q=80&w=1200&auto=format&fit=crop',
    includes: [
      'Rouge Opéra: Scarlet Opéra (#A21D21)',
      'Rouge Opéra: Plum Nocturne (#582233)',
      'Rouge Opéra: Rose Cashmere (#D48C9A)'
    ],
    perks: [
      'Signature magnetic tri-box presentation',
      'Complimentary carbon-neutral express delivery'
    ]
  },

  // MAKEUP DEALS
  {
    id: 'deal-makeup-01',
    slug: 'parisian-everyday-perfection-bundle',
    dealCategory: 'makeup-deals',
    title: 'Everyday Parisian Chic Makeup Duo',
    subtitle: 'The 5-Minute Weightless Fresh Complexion & Lip',
    description: 'The effortless French beauty aesthetic in two legendary staples. Delivers clean, breathable sheer coverage and healthy rosebud lips.',
    originalPrice: 140,
    discountedPrice: 98,
    savingsPercentage: 30,
    badge: 'BEST VALUE',
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=1200&auto=format&fit=crop',
    includes: [
      'Éclat Mineral Glow Fluid Tint (Full Size)',
      'Rouge Opéra Satin Silk Lipstick (Nude Élégance)'
    ],
    perks: [
      'Free deluxe botanical face wash sachet (15ml)',
      '30-day effortless return guarantee'
    ]
  },
  {
    id: 'deal-makeup-02',
    slug: 'florentine-masterclass-full-kit',
    dealCategory: 'makeup-deals',
    title: 'Florentine Masterclass Complete Archive',
    subtitle: 'The Ultimate Beauty Connoisseur Collection',
    description: 'The complete artistry ensemble. Features our mineral skin tint, two lip color shades, rose cheek tint, sculpting eye balm, and artisanal Italian makeup brush set.',
    originalPrice: 420,
    discountedPrice: 273,
    savingsPercentage: 35,
    badge: 'COLLECTORS EDIT',
    image: 'https://images.unsplash.com/photo-1631729371254-42c2892f0e6e?q=80&w=1200&auto=format&fit=crop',
    includes: [
      'Éclat Mineral Glow Fluid Tint',
      'Rouge Opéra Satin Silk Lipstick (Choice of 2 Shades)',
      'Sublime Rose Eye Sculpting Balm',
      'Petal Flush Cream Blush & Lip Stain',
      'Handmade Wooden Handle Goat-Hair Brush Trio'
    ],
    perks: [
      'Complimentary personalized embossing on leather travel case',
      'Free VIP Express Courier'
    ]
  }
];
