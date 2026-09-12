import { Product } from '../types';

export const PRODUCTS: Product[] = [
  // BEAUTY & COSMETICS - SKINCARE (WOMEN / CHILDREN / UNISEX)
  {
    id: 'prod-01',
    slug: 'lumieres-hydrating-nectar-serum',
    name: 'Lumière Hydrating Nectar Serum',
    subtitle: 'Bio-Fermented Hyaluronic Acid & Rose Extract',
    description: 'An ultra-lightweight elixir infused with wild Damask Rose water and triple-molecular hyaluronic acid. Penetrates deeply to restore skin volume, luminous clarity, and silky resilience.',
    price: 135,
    originalPrice: 160,
    rating: 4.9,
    reviewCount: 48,
    mainCategory: 'beauty',
    subcategory: 'skin-care',
    audience: ['women'],
    badge: 'BEST SELLER',
    images: [
      'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=1200&auto=format&fit=crop',
    ],
    ingredients: [
      'Organic Damask Rose Water',
      'Triple-Molecular Hyaluronic Acid',
      'Botanical Squalane',
      'Centella Asiatica Extract',
      'Niacinamide (Vitamin B3)'
    ],
    details: [
      '30ml / 1.0 fl. oz. dropper bottle',
      'Suitable for all skin types including sensitive',
      '100% Vegan & Cruelty-Free',
      'Formulated without parabens, sulfates, or artificial fragrances',
      'Glass packaging with 100% recyclable cap'
    ],
    usageInstructions: 'Apply 3-4 drops onto freshly cleansed face and neck every morning and evening. Press gently with warm fingertips until fully absorbed.',
    shippingInfo: 'Complimentary carbon-neutral express shipping on all orders over $150. Delivers in 2-3 business days.',
    isFeatured: true,
    inStock: true,
    createdAt: '2026-01-15',
    reviews: [
      {
        id: 'rev-01',
        userName: 'Clara V.',
        userLocation: 'Paris, France',
        rating: 5,
        date: '2026-02-10',
        title: 'Pure radiance in a bottle',
        comment: 'My skin absorbed this serum instantly. The subtle rose aroma is exquisite, never overwhelming. A daily ritual I cannot live without.',
        verifiedPurchase: true
      },
      {
        id: 'rev-02',
        userName: 'Eleanor M.',
        userLocation: 'London, UK',
        rating: 5,
        date: '2026-02-18',
        title: 'Unbelievable texture',
        comment: 'Extremely elegant formulation. Does not feel sticky at all and leaves a gorgeous dewy sheen under foundation.',
        verifiedPurchase: true
      }
    ]
  },
  {
    id: 'prod-02',
    slug: 'velours-botanical-nourishing-cream',
    name: 'Velours Botanical Nourishing Cream',
    subtitle: 'Cold-Pressed Camellia & Shea Butter Complex',
    description: 'A velvet-texture barrier restoration cream crafted with cold-pressed Camellia Japonica seed oil, ceramides, and fermented oat extract. Intensely repairs dry skin barrier.',
    price: 165,
    rating: 4.8,
    reviewCount: 36,
    mainCategory: 'beauty',
    subcategory: 'skin-care',
    audience: ['women'],
    badge: 'NEW',
    images: [
      'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=1200&auto=format&fit=crop'
    ],
    ingredients: [
      'Camellia Japonica Seed Oil',
      'Bio-Identical Ceramides NP & AP',
      'Shea Butter (Fair Trade)',
      'Fermented Oat Kernel Oil',
      'Vitamin E Tokopherol'
    ],
    details: [
      '50ml / 1.7 fl. oz. heavy refillable glass jar',
      'Deeply nourishing night and day moisturizer',
      'Dermatologist tested & hypoallergenic',
      'Formulated in Provence, France'
    ],
    usageInstructions: 'Warm a pearl-sized amount between palms and smooth upwards over cleansed face and decolletage.',
    shippingInfo: 'Complimentary express delivery and two luxury sample sachets included.',
    isFeatured: true,
    inStock: true,
    createdAt: '2026-02-01',
    reviews: [
      {
        id: 'rev-03',
        userName: 'Sophia L.',
        userLocation: 'New York, US',
        rating: 5,
        date: '2026-02-25',
        title: 'Luxurious moisture barrier',
        comment: 'Completely healed my winter flakiness within three days. The jar design alone looks like sculpture on my vanity.',
        verifiedPurchase: true
      }
    ]
  },
  {
    id: 'prod-03',
    slug: 'purete-soothing-baby-balm',
    name: 'Purité Soothing Baby Oil & Balm',
    subtitle: 'Organic Chamomile & Sweet Almond Protection',
    description: 'Ultra-gentle, pediatrician-approved barrier protection for delicate child and infant skin. Pure cold-pressed oils soften dryness and calm redness naturally.',
    price: 68,
    rating: 5.0,
    reviewCount: 22,
    mainCategory: 'beauty',
    subcategory: 'skin-care',
    audience: ['children'],
    badge: 'AWARD WINNER',
    images: [
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=1200&auto=format&fit=crop'
    ],
    ingredients: [
      'Organic Roman Chamomile Extract',
      'Sweet Almond Oil',
      'Calendula Officinalis Flower Extract',
      'Jojoba Seed Oil'
    ],
    details: [
      '100ml / 3.4 fl. oz. pump bottle',
      '100% Certified Organic ingredients',
      'Hypoallergenic & fragrance-free formula',
      'Safe for newborns and sensitive child skin'
    ],
    usageInstructions: 'Apply gently after bath time or massage softly into dry areas as needed.',
    shippingInfo: 'Standard 2-4 business day delivery.',
    isFeatured: false,
    inStock: true,
    createdAt: '2026-01-20'
  },
  {
    id: 'prod-04',
    slug: 'doux-gentle-childrens-shampoo',
    name: 'Doux Nourishing Hair & Body Wash',
    subtitle: 'Aloe Vera & Oat Protein Tear-Free Formula',
    description: 'A soothing tear-free cleanser that leaves children’s hair soft, detangled, and naturally radiant. Gently washes skin without stripping moisture.',
    price: 52,
    rating: 4.9,
    reviewCount: 19,
    mainCategory: 'beauty',
    subcategory: 'hair-care',
    audience: ['children'],
    badge: 'NEW',
    images: [
      'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=1200&auto=format&fit=crop'
    ],
    ingredients: [
      'Aloe Barbadensis Leaf Juice',
      'Hydrolyzed Oat Protein',
      'Chamomile Recutita Flower Extract',
      'Coconut Derived Cleanser'
    ],
    details: [
      '250ml / 8.5 fl. oz.',
      'Tear-free & non-irritating',
      'pH balanced (5.5)',
      'Subtle natural vanilla blossom note'
    ],
    usageInstructions: 'Lather a small pump onto wet hair and body. Rinse thoroughly with lukewarm water.',
    shippingInfo: 'Complimentary shipping over $150.',
    isFeatured: true,
    inStock: true,
    createdAt: '2026-02-12'
  },

  // BEAUTY & COSMETICS - MAKEUP (WOMEN)
  {
    id: 'prod-05',
    slug: 'rouge-opera-satin-lipstick',
    name: 'Rouge Opéra Satin Silk Lipstick',
    subtitle: 'Pigment-Rich Botanical Wax Formula',
    description: 'An iconic lipstick combining intense weightless color with satin conditioning comfort. Enriched with wild mango butter and pomegranate flower extract.',
    price: 58,
    originalPrice: 65,
    rating: 4.9,
    reviewCount: 64,
    mainCategory: 'beauty',
    subcategory: 'makeup',
    audience: ['women'],
    badge: 'BEST SELLER',
    images: [
      'https://images.unsplash.com/photo-1586495777744-4413f21062fa?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1625093742435-6fa192b6fb10?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=1200&auto=format&fit=crop'
    ],
    variants: [
      { id: 'v-01', name: 'Nude Élégance', sku: 'RO-01', inStock: true, colorHex: '#C58277' },
      { id: 'v-02', name: 'Scarlet Opéra', sku: 'RO-02', inStock: true, colorHex: '#A21D21' },
      { id: 'v-03', name: 'Rose Cashmere', sku: 'RO-03', inStock: true, colorHex: '#D48C9A' },
      { id: 'v-04', name: 'Plum Nocturne', sku: 'RO-04', inStock: true, colorHex: '#582233' }
    ],
    ingredients: [
      'Wild Mango Butter',
      'Pomegranate Flower Oil',
      'Camellia Seed Extract',
      'Natural Mineral Pigments'
    ],
    details: [
      '3.5g / 0.12 oz. magnetic heavy-brass case',
      '10-hour comfortable hydration',
      'Non-feathering satin finish'
    ],
    usageInstructions: 'Apply directly from bullet starting at center of lips outwards, or use lip brush for precise contouring.',
    shippingInfo: 'Includes signature ElegantStyle velvet pouch.',
    isFeatured: true,
    inStock: true,
    createdAt: '2026-01-10'
  },
  {
    id: 'prod-06',
    slug: 'eclat-mineral-glow-skin-tint',
    name: 'Éclat Mineral Glow Fluid Tint',
    subtitle: 'Luminous Hydration & Sheer Coverage',
    description: 'A breathable serum foundation that evens skin tone while boosting natural luminescence. Contains light-reflecting micro-pearls for an effortless skin-like finish.',
    price: 82,
    rating: 4.7,
    reviewCount: 31,
    mainCategory: 'beauty',
    subcategory: 'makeup',
    audience: ['women'],
    badge: 'NEW',
    images: [
      'https://images.unsplash.com/photo-1631729371254-42c2892f0e6e?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=1200&auto=format&fit=crop'
    ],
    variants: [
      { id: 'vt-01', name: '01 Porcelain', sku: 'EG-01', inStock: true, colorHex: '#F6E6D8' },
      { id: 'vt-02', name: '02 Sable Neutral', sku: 'EG-02', inStock: true, colorHex: '#E8D0BB' },
      { id: 'vt-03', name: '03 Warm Miel', sku: 'EG-03', inStock: true, colorHex: '#D6B499' }
    ],
    ingredients: [
      'Damask Rose Hydrosol',
      'Light-Reflecting Minerals',
      'Plant Squalane',
      'SPF 15 Mineral Zinc'
    ],
    details: [
      '30ml glass bottle with glass dropper',
      'Buildable light to medium coverage',
      'Dewy natural finish'
    ],
    usageInstructions: 'Shake bottle well. Smooth 2-3 drops over skin using fingertips or foundation brush.',
    shippingInfo: 'Complimentary shipping over $150.',
    isFeatured: false,
    inStock: true,
    createdAt: '2026-02-05'
  },

  // FASHION & STYLE - BELTS (MEN / WOMEN)
  {
    id: 'prod-07',
    slug: 'lhermitage-woven-calfskin-belt',
    name: 'L’Hermitage Hand-Woven Calfskin Belt',
    subtitle: 'Handcrafted Full-Grain French Leather',
    description: 'An exemplar of quiet luxury. Hand-woven from supple full-grain calfskin leather in Florence, finished with a palladium-plated solid brass buckle.',
    price: 340,
    originalPrice: 380,
    rating: 5.0,
    reviewCount: 15,
    mainCategory: 'fashion',
    subcategory: 'belts',
    audience: ['men', 'women'],
    badge: 'BEST SELLER',
    images: [
      'https://images.unsplash.com/photo-1624222247344-550fb60583dc?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=1200&auto=format&fit=crop'
    ],
    materials: [
      '100% Full-Grain Calfskin Leather',
      'Solid Brass Buckle with Brushed Palladium Finish',
      'Hand-Painted Edges'
    ],
    variants: [
      { id: 'vb-01', name: 'Nero Black / 85cm', sku: 'HB-01-85', inStock: true, size: '85cm' },
      { id: 'vb-02', name: 'Nero Black / 95cm', sku: 'HB-01-95', inStock: true, size: '95cm' },
      { id: 'vb-03', name: 'Cognac Brown / 90cm', sku: 'HB-02-90', inStock: true, size: '90cm' }
    ],
    details: [
      'Width: 35mm / 1.4 inches',
      'Handmade in Tuscany, Italy',
      'Includes dust cover and handmade presentation box'
    ],
    usageInstructions: 'Condition periodically with natural beeswax polish. Store unbuckled in dust bag.',
    shippingInfo: 'Complimentary international express shipping & gift wrapping.',
    isFeatured: true,
    inStock: true,
    createdAt: '2026-01-05'
  },
  {
    id: 'prod-08',
    slug: 'monarch-reversible-leather-belt',
    name: 'Monarch Reversible Formal Belt',
    subtitle: 'Smooth Box Calf & Grained Saddle Leather',
    description: 'Two sophisticated looks in one single piece. Dual-sided craftsmanship with a swivel brushed palladium buckle transition.',
    price: 295,
    rating: 4.8,
    reviewCount: 28,
    mainCategory: 'fashion',
    subcategory: 'belts',
    audience: ['men'],
    badge: 'LIMITED',
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1624222247344-550fb60583dc?q=80&w=1200&auto=format&fit=crop'
    ],
    materials: [
      'French Box Calfskin (Black side)',
      'Tuscan Saddle Leather (Espresso side)',
      'Swivel Brushed Steel Hardware'
    ],
    details: [
      'Width: 32mm / 1.25 inches',
      'Reversible twist mechanism',
      'Engraved subtle brand logo on loop'
    ],
    shippingInfo: 'Delivered in presentation gift box.',
    isFeatured: false,
    inStock: true,
    createdAt: '2026-01-25'
  },

  // FASHION & STYLE - WALLETS (MEN / WOMEN)
  {
    id: 'prod-09',
    slug: 'la-malle-bifold-leather-wallet',
    name: 'La Malle Minimalist Bifold Wallet',
    subtitle: 'Vegetable-Tanned Saddle Leather',
    description: 'Designed for modern elegance and functionality. Features six credit card slots, two hidden pockets, and a full-length currency compartment in slim profile.',
    price: 260,
    rating: 4.9,
    reviewCount: 42,
    mainCategory: 'fashion',
    subcategory: 'wallets',
    audience: ['men'],
    badge: 'BEST SELLER',
    images: [
      'https://images.unsplash.com/photo-1627123424574-724758594e93?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1606503153255-59d8b8b82176?q=80&w=1200&auto=format&fit=crop'
    ],
    materials: [
      '100% Tuscan Vegetable-Tanned Leather',
      'RFID Blocking Shielding Layer',
      'Waxed Linen Hand Stitching'
    ],
    variants: [
      { id: 'vw-01', name: 'Midnight Black', sku: 'LM-01', inStock: true, colorHex: '#1C1C1C' },
      { id: 'vw-02', name: 'Chestnut Brown', sku: 'LM-02', inStock: true, colorHex: '#4A2E1D' }
    ],
    details: [
      'Dimensions: 11cm x 9cm x 1.2cm',
      'Holds up to 10 cards and flat currency notes',
      'Ages gracefully with custom leather patina'
    ],
    shippingInfo: 'Complimentary express delivery and custom embossing optional at checkout.',
    isFeatured: true,
    inStock: true,
    createdAt: '2026-01-08'
  },
  {
    id: 'prod-10',
    slug: 'athena-zip-around-compact-wallet',
    name: 'Athéna Zip-Around Compact Wallet',
    subtitle: 'Grained Calfskin & Gold-Plated Hardware',
    description: 'An architectural compact wallet tailored for women. Offers zippered coin pocket, expandable accordions, and eight card slots.',
    price: 320,
    originalPrice: 350,
    rating: 4.9,
    reviewCount: 29,
    mainCategory: 'fashion',
    subcategory: 'wallets',
    audience: ['women'],
    badge: 'NEW',
    images: [
      'https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1627123424574-724758594e93?q=80&w=1200&auto=format&fit=crop'
    ],
    materials: [
      'Supple Grained Calfskin',
      '24k Gold-Plated Swiss Raccagni Zipper',
      'Moire Fabric Lining'
    ],
    variants: [
      { id: 'vw-03', name: 'Blush Powder', sku: 'AT-01', inStock: true, colorHex: '#E9C9CE' },
      { id: 'vw-04', name: 'Ivory Cream', sku: 'AT-02', inStock: true, colorHex: '#F5F2EC' },
      { id: 'vw-05', name: 'Noir Classic', sku: 'AT-03', inStock: true, colorHex: '#181818' }
    ],
    details: [
      'Dimensions: 12cm x 10cm x 2cm',
      'Secure zip closure with leather pull tab',
      'Handcrafted in France'
    ],
    shippingInfo: 'Includes signature gift box & cotton dust bag.',
    isFeatured: true,
    inStock: true,
    createdAt: '2026-02-08'
  },
  {
    id: 'prod-11',
    slug: 'slim-cardholder-saddle-leather',
    name: 'Saddle Leather Slim Card Case',
    subtitle: 'Four Slots & Central Cash Pocket',
    description: 'Refined essentialism. A slim cardholder cut from vegetable-tanned French calfskin with hand-painted burnished edges.',
    price: 155,
    rating: 4.8,
    reviewCount: 53,
    mainCategory: 'fashion',
    subcategory: 'wallets',
    audience: ['men', 'women'],
    badge: 'BEST SELLER',
    images: [
      'https://images.unsplash.com/photo-1606503153255-59d8b8b82176?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1627123424574-724758594e93?q=80&w=1200&auto=format&fit=crop'
    ],
    materials: [
      '100% French Calfskin',
      'Debossed Gold Foil Logo'
    ],
    details: [
      'Dimensions: 10cm x 7cm',
      'Ultra-thin 4mm thickness',
      '4 card slots + 1 middle pocket'
    ],
    shippingInfo: 'Fast 2-3 day shipping.',
    isFeatured: false,
    inStock: true,
    createdAt: '2026-01-02'
  },
  {
    id: 'prod-12',
    slug: 'sublime-rose-eye-sculpting-cream',
    name: 'Sublime Rose Eye Sculpting Balm',
    subtitle: 'Peptides & Damask Rose Stem Cells',
    description: 'Targeted botanical treatment designed to visibly diminish dark circles, smooth fine lines, and firm delicate under-eye contours.',
    price: 110,
    rating: 4.7,
    reviewCount: 27,
    mainCategory: 'beauty',
    subcategory: 'skin-care',
    audience: ['women'],
    badge: 'NEW',
    images: [
      'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=1200&auto=format&fit=crop'
    ],
    ingredients: [
      'Damask Rose Stem Cell Culture',
      'Acetyl Tetrapeptide-5',
      'Caffeine Botanical Complex',
      'Cold-Pressed Rosehip Seed Oil'
    ],
    details: [
      '15ml / 0.5 fl. oz. frosted glass jar',
      'Cooling ceramic applicator spoon included',
      'Ophthalmologist tested'
    ],
    usageInstructions: 'Dab small dot around eye orbital bone using ceramic applicator twice daily.',
    shippingInfo: 'Complimentary shipping over $150.',
    isFeatured: false,
    inStock: true,
    createdAt: '2026-02-14'
  }
];
