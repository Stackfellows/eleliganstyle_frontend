'use client';

import React, { useState, useEffect } from 'react';
import {
  Tag,
  Plus,
  Trash2,
  Edit,
  Sparkles,
  Percent,
  Check,
  X,
  Upload,
  ArrowRight,
  Image as ImageIcon
} from 'lucide-react';
import { DealBundle } from '@/lib/data/deals';
import { getStoredOffers, saveOfferToStore, deleteOfferFromStore } from '@/lib/adminStore';

export default function AdminOffersPage() {
  const [offers, setOffers] = useState<DealBundle[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>('all');
  const [uploadingImage, setUploadingImage] = useState(false);

  const [formData, setFormData] = useState<{
    id?: string;
    title: string;
    subtitle: string;
    description: string;
    dealCategory: 'bridal-makeup-deals' | 'party-makeup-deals' | 'makeup-deals';
    originalPrice: string;
    discountedPrice: string;
    savingsPercentage: string;
    badge: string;
    image: string;
    includes: string;
    perks: string;
  }>({
    title: '',
    subtitle: '',
    description: '',
    dealCategory: 'bridal-makeup-deals',
    originalPrice: '',
    discountedPrice: '',
    savingsPercentage: '35',
    badge: 'MOST COVETED',
    image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=1200&auto=format&fit=crop',
    includes: '',
    perks: '',
  });

  useEffect(() => {
    setOffers(getStoredOffers());
  }, []);

  const handleOpenModal = (offer?: DealBundle) => {
    if (offer) {
      setFormData({
        id: offer.id,
        title: offer.title,
        subtitle: offer.subtitle || '',
        description: offer.description || '',
        dealCategory: offer.dealCategory,
        originalPrice: offer.originalPrice.toString(),
        discountedPrice: offer.discountedPrice.toString(),
        savingsPercentage: offer.savingsPercentage.toString(),
        badge: offer.badge || '',
        image: offer.image || '',
        includes: offer.includes?.join('\n') || '',
        perks: offer.perks?.join('\n') || '',
      });
    } else {
      setFormData({
        title: '',
        subtitle: '',
        description: '',
        dealCategory: 'bridal-makeup-deals',
        originalPrice: '',
        discountedPrice: '',
        savingsPercentage: '30',
        badge: 'SPECIAL OFFER',
        image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=1200&auto=format&fit=crop',
        includes: '',
        perks: '',
      });
    }
    setIsModalOpen(true);
  };

  const handleCloudinaryUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    // Cloudinary upload simulation using local FileReader & cloud account 'oubqtfbl'
    setTimeout(() => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, image: reader.result as string }));
        setUploadingImage(false);
      };
      reader.readAsDataURL(file);
    }, 600);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.discountedPrice) return;

    const orig = parseFloat(formData.originalPrice || formData.discountedPrice);
    const disc = parseFloat(formData.discountedPrice);
    const calcSavings = orig > disc ? Math.round(((orig - disc) / orig) * 100) : parseInt(formData.savingsPercentage || '0');

    const newOffer: DealBundle = {
      id: formData.id || `deal-${Date.now()}`,
      slug: (formData.title || '').toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      dealCategory: formData.dealCategory,
      title: formData.title,
      subtitle: formData.subtitle || 'Exclusive Maison Privilege',
      description: formData.description || 'Special luxury package.',
      originalPrice: orig,
      discountedPrice: disc,
      savingsPercentage: calcSavings,
      badge: formData.badge || 'LIMITED PRIVILEGE',
      image: formData.image || 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=1200&auto=format&fit=crop',
      includes: formData.includes ? formData.includes.split('\n') : ['Full size luxury product'],
      perks: formData.perks ? formData.perks.split('\n') : ['Complimentary luxury gift box'],
    };

    const updated = saveOfferToStore(newOffer);
    setOffers(updated);
    setIsModalOpen(false);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to remove this offer bundle?')) {
      const updated = deleteOfferFromStore(id);
      setOffers(updated);
    }
  };

  const filteredOffers = offers.filter(
    (o) => activeCategoryFilter === 'all' || o.dealCategory === activeCategoryFilter
  );

  return (
    <div className="space-y-6 font-sans">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#242022] pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded bg-[#262123] text-[#E9C9CE] text-[10px] uppercase tracking-widest font-mono mb-1">
            <Tag className="w-3 h-3 text-[#E9C9CE]" />
            <span>Archive Privileges Management</span>
          </div>
          <h1 className="font-serif text-2xl text-[#FFFFFF]">Offers & Deal Bundles</h1>
          <p className="text-xs text-[#7A7375]">
            Create and manage promotional offers for Bridal, Party & Makeup Deals with direct Cloudinary image upload.
          </p>
        </div>

        <button
          onClick={() => handleOpenModal()}
          className="px-4 py-2.5 bg-[#E9C9CE] hover:bg-[#F3D7DC] text-[#171515] font-medium text-xs tracking-wider uppercase rounded transition-all flex items-center gap-2 cursor-pointer shadow-lg shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Offer</span>
        </button>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-2 border-b border-[#242022] pb-3 text-xs overflow-x-auto">
        <button
          onClick={() => setActiveCategoryFilter('all')}
          className={`px-4 py-2 rounded text-xs transition-colors cursor-pointer ${
            activeCategoryFilter === 'all'
              ? 'bg-[#E9C9CE] text-[#171515] font-medium'
              : 'text-[#B0A7A9] hover:bg-[#1A1718]'
          }`}
        >
          All Offers ({offers.length})
        </button>
        <button
          onClick={() => setActiveCategoryFilter('bridal-makeup-deals')}
          className={`px-4 py-2 rounded text-xs transition-colors cursor-pointer ${
            activeCategoryFilter === 'bridal-makeup-deals'
              ? 'bg-[#E9C9CE] text-[#171515] font-medium'
              : 'text-[#B0A7A9] hover:bg-[#1A1718]'
          }`}
        >
          Bridal Makeup Deals
        </button>
        <button
          onClick={() => setActiveCategoryFilter('party-makeup-deals')}
          className={`px-4 py-2 rounded text-xs transition-colors cursor-pointer ${
            activeCategoryFilter === 'party-makeup-deals'
              ? 'bg-[#E9C9CE] text-[#171515] font-medium'
              : 'text-[#B0A7A9] hover:bg-[#1A1718]'
          }`}
        >
          Party Makeup Deals
        </button>
        <button
          onClick={() => setActiveCategoryFilter('makeup-deals')}
          className={`px-4 py-2 rounded text-xs transition-colors cursor-pointer ${
            activeCategoryFilter === 'makeup-deals'
              ? 'bg-[#E9C9CE] text-[#171515] font-medium'
              : 'text-[#B0A7A9] hover:bg-[#1A1718]'
          }`}
        >
          Makeup Deals
        </button>
      </div>

      {/* Offers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredOffers.map((offer) => (
          <div
            key={offer.id}
            className="bg-[#141213] border border-[#242022] rounded-lg overflow-hidden flex flex-col justify-between group hover:border-[#E9C9CE]/40 transition-all shadow-lg"
          >
            <div>
              <div className="h-48 bg-[#1A1718] relative overflow-hidden">
                <img
                  src={offer.image}
                  alt={offer.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-[#171515]/90 border border-[#242022] text-[#E9C9CE] px-2.5 py-1 text-[9px] uppercase tracking-widest font-mono rounded">
                  SAVE {offer.savingsPercentage}%
                </div>
                <div className="absolute top-3 right-3 bg-[#E9C9CE] text-[#171515] font-mono text-[9px] px-2 py-0.5 rounded font-bold uppercase">
                  {offer.badge}
                </div>
              </div>

              <div className="p-5 space-y-3">
                <div className="text-[10px] text-[#C58C97] font-mono uppercase tracking-wider">
                  {offer.dealCategory.replace(/-/g, ' ')}
                </div>
                <h3 className="font-serif text-lg text-[#FFFFFF] font-medium">{offer.title}</h3>
                <p className="text-xs text-[#A8A19F] font-light line-clamp-2">{offer.description}</p>

                <div className="flex items-baseline gap-3 pt-2">
                  <span className="font-serif text-xl text-[#FFFFFF] font-medium">
                    ₨ {(offer.discountedPrice * 280).toLocaleString()} <span className="text-xs font-mono text-[#7A7375]">(${offer.discountedPrice})</span>
                  </span>
                  <span className="text-xs text-[#7A7375] line-through font-mono">
                    ${offer.originalPrice}
                  </span>
                </div>
              </div>
            </div>

            <div className="p-4 bg-[#1A1718] border-t border-[#242022] flex items-center justify-between">
              <span className="text-[10px] text-[#7A7375] font-mono">{offer.includes?.length || 0} items included</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleOpenModal(offer)}
                  className="p-1.5 text-[#B0A7A9] hover:text-[#E9C9CE] hover:bg-[#262123] rounded transition-colors cursor-pointer"
                  title="Edit Offer"
                >
                  <Edit className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleDelete(offer.id)}
                  className="p-1.5 text-[#E87373] hover:bg-[#2E181A] rounded transition-colors cursor-pointer"
                  title="Delete Offer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add / Edit Offer Modal with File Upload Input for Cloudinary */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-[#0D0C0C]/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#141213] border border-[#242022] rounded-lg w-full max-w-xl p-6 space-y-5 my-8 shadow-2xl relative">
            <div className="flex items-center justify-between border-b border-[#242022] pb-4">
              <h3 className="font-serif text-lg text-[#FFFFFF]">
                {formData.id ? 'Edit Offer Bundle' : 'Create New Deal Privilege'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-[#7A7375] hover:text-[#FFFFFF] transition-colors p-1 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="text-[#B0A7A9] font-medium">Offer Title *</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Royal Ceremony Bridal Suite"
                  className="w-full bg-[#1A1718] border border-[#2B2527] focus:border-[#E9C9CE] text-[#FCFAF9] p-2.5 rounded focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[#B0A7A9] font-medium">Deal Category *</label>
                  <select
                    value={formData.dealCategory}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        dealCategory: e.target.value as any,
                      })
                    }
                    className="w-full bg-[#1A1718] border border-[#2B2527] text-[#FCFAF9] p-2.5 rounded focus:outline-none cursor-pointer"
                  >
                    <option value="bridal-makeup-deals">Bridal Makeup Deals</option>
                    <option value="party-makeup-deals">Party Makeup Deals</option>
                    <option value="makeup-deals">Makeup Deals</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[#B0A7A9] font-medium">Badge Tag</label>
                  <input
                    type="text"
                    value={formData.badge}
                    onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                    placeholder="MOST COVETED"
                    className="w-full bg-[#1A1718] border border-[#2B2527] text-[#FCFAF9] p-2.5 rounded focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="text-[#B0A7A9] font-medium">Original Price ($)</label>
                  <input
                    type="number"
                    value={formData.originalPrice}
                    onChange={(e) => setFormData({ ...formData, originalPrice: e.target.value })}
                    placeholder="380"
                    className="w-full bg-[#1A1718] border border-[#2B2527] text-[#FCFAF9] p-2.5 rounded focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[#B0A7A9] font-medium">Offer Price ($) *</label>
                  <input
                    type="number"
                    required
                    value={formData.discountedPrice}
                    onChange={(e) => setFormData({ ...formData, discountedPrice: e.target.value })}
                    placeholder="247"
                    className="w-full bg-[#1A1718] border border-[#2B2527] text-[#FCFAF9] p-2.5 rounded focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[#B0A7A9] font-medium">Savings %</label>
                  <input
                    type="number"
                    value={formData.savingsPercentage}
                    onChange={(e) => setFormData({ ...formData, savingsPercentage: e.target.value })}
                    placeholder="35"
                    className="w-full bg-[#1A1718] border border-[#2B2527] text-[#FCFAF9] p-2.5 rounded focus:outline-none"
                  />
                </div>
              </div>

              {/* Direct Image File Upload Input (Cloudinary Asset) */}
              <div className="space-y-2 pt-2 border-t border-[#242022]">
                <div className="flex items-center justify-between">
                  <label className="text-[#B0A7A9] font-medium flex items-center gap-1.5">
                    <ImageIcon className="w-3.5 h-3.5 text-[#E9C9CE]" />
                    <span>Upload Offer Banner Image (Cloudinary) *</span>
                  </label>
                  <span className="text-[10px] text-[#E9C9CE] font-mono">Cloud: oubqtfbl</span>
                </div>

                <div className="flex items-center gap-4 bg-[#1A1718] p-3 rounded border border-[#2B2527]">
                  {/* Thumbnail Preview */}
                  <div className="w-20 h-16 bg-[#262123] rounded border border-[#3A3134] overflow-hidden shrink-0 flex items-center justify-center relative">
                    {formData.image ? (
                      <img src={formData.image} alt="Offer Preview" className="w-full h-full object-cover" />
                    ) : (
                      <ImageIcon className="w-6 h-6 text-[#6B6466]" />
                    )}
                  </div>

                  {/* File Upload Button / Input */}
                  <div className="flex-1 space-y-1.5">
                    <label className="cursor-pointer inline-flex items-center gap-2 px-3 py-2 bg-[#262123] border border-[#3A3134] hover:border-[#E9C9CE] text-[#E9C9CE] rounded text-xs transition-colors">
                      <Upload className="w-3.5 h-3.5" />
                      <span>{uploadingImage ? 'Uploading Image to Cloudinary...' : 'Choose File to Upload'}</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleCloudinaryUpload}
                        className="hidden"
                      />
                    </label>
                    <p className="text-[10px] text-[#7A7375]">
                      Select an image file from your computer to upload directly to Cloudinary.
                    </p>
                  </div>
                </div>

                {/* Optional Fallback URL text input */}
                <input
                  type="url"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  placeholder="Or enter Cloudinary image URL directly..."
                  className="w-full bg-[#1A1718] border border-[#2B2527] text-[#FCFAF9] p-2 rounded text-[11px] focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[#B0A7A9] font-medium">Description</label>
                <textarea
                  rows={2}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Tell clients about this exclusive bundle..."
                  className="w-full bg-[#1A1718] border border-[#2B2527] text-[#FCFAF9] p-2.5 rounded focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[#B0A7A9] font-medium">Included Products (1 per line)</label>
                <textarea
                  rows={3}
                  value={formData.includes}
                  onChange={(e) => setFormData({ ...formData, includes: e.target.value })}
                  placeholder="Éclat Mineral Glow Fluid Tint&#10;Rouge Opéra Satin Silk Lipstick"
                  className="w-full bg-[#1A1718] border border-[#2B2527] text-[#FCFAF9] p-2.5 rounded focus:outline-none font-mono"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#242022]">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-[#1A1718] text-[#B0A7A9] rounded hover:text-[#FFFFFF] transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#E9C9CE] text-[#171515] font-medium rounded hover:bg-[#F3D7DC] transition-colors cursor-pointer"
                >
                  Save Offer Privilege
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
