import { JournalArticle } from '../types';

export const JOURNAL_ARTICLES: JournalArticle[] = [
  {
    id: 'art-01',
    slug: 'the-art-of-botanical-skin-layering',
    title: 'The Art of Botanical Skin Layering',
    category: 'skincare',
    subtitle: 'How to cultivate glowing skin density using natural bio-fermented hydrosols and plant squalane.',
    author: 'Dr. Hélène Vaneau, Chief Cosmetic Scientist',
    publishedAt: '2026-02-20',
    readTime: '4 min read',
    coverImage: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=1600&auto=format&fit=crop',
    content: [
      {
        type: 'paragraph',
        value: 'True luminosity is not painted onto the surface—it is cultivated deep within the cutaneous layers. When skin cells receive exact ratios of triple-molecular hyaluronic acid combined with bio-fermented Damask rose hydrosol, hydration locks in for up to 48 hours.'
      },
      {
        type: 'heading',
        value: 'Step 1: Hydrosol Awakening'
      },
      {
        type: 'paragraph',
        value: 'Begin your morning ritual immediately following a lukewarm water rinse. Pressing a water-based nectar serum into damp skin allows the water-binding molecules to draw ambient moisture straight into the epidermis.'
      },
      {
        type: 'shoppable',
        value: 'Recommended Elixir for Layering',
        productSlug: 'lumieres-hydrating-nectar-serum'
      },
      {
        type: 'heading',
        value: 'Step 2: Lipid Seal Protection'
      },
      {
        type: 'paragraph',
        value: 'Follow with a botanical barrier cream enriched with cold-pressed Camellia Japonica seed oil. This seals in active nutrients while forming a breathable shield against urban oxidants.'
      }
    ],
    relatedProductSlugs: ['lumieres-hydrating-nectar-serum', 'velours-botanical-nourishing-cream']
  },
  {
    id: 'art-02',
    slug: 'florentine-leather-craftsmanship-guide',
    title: 'Florentine Leather: A Legacy of Quiet Luxury',
    category: 'fashion',
    subtitle: 'Uncovering the centuries-old vegetable tanning techniques behind Italian full-grain calfskin.',
    author: 'Marcello Moretti, Master Leather Artisan',
    publishedAt: '2026-02-14',
    readTime: '5 min read',
    coverImage: 'https://images.unsplash.com/photo-1624222247344-550fb60583dc?q=80&w=1600&auto=format&fit=crop',
    content: [
      {
        type: 'paragraph',
        value: 'In the hills surrounding Florence, master tanners continue to use chestnut extracts and mimosa barks to naturally cure raw calfskin over a meticulous 60-day period. The resulting leather is supple, aromatic, and develops a rich patina over decades of use.'
      },
      {
        type: 'shoppable',
        value: 'The Woven Calfskin Heritage Belt',
        productSlug: 'lhermitage-woven-calfskin-belt'
      }
    ],
    relatedProductSlugs: ['lhermitage-woven-calfskin-belt', 'la-malle-bifold-leather-wallet']
  }
];
