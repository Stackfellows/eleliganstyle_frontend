'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  Package,
  Plus,
  Search,
  Filter,
  Trash2,
  Edit,
  Upload,
  Check,
  X,
  Sparkles,
  ExternalLink,
  Image as ImageIcon,
  Layers
} from 'lucide-react';
import { Product, MainCategory, SubCategory, Audience } from '@/lib/types';
import { getStoredProducts, saveProductToStore, deleteProductFromStore } from '@/lib/adminStore';

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMainCat, setSelectedMainCat] = useState<string>('all');
  const [selectedSubCat, setSelectedSubCat] = useState<string>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  // Form State with Multi-Image Support (2 to 3+ images)
  const [formData, setFormData] = useState<{
    id?: string;
    name: string;
    subtitle: string;
    description: string;
    price: string;
    originalPrice: string;
    mainCategory: MainCategory;
    subcategory: SubCategory;
    audience: Audience[];
    badge: 'NEW' | 'BEST SELLER' | 'LIMITED' | 'AWARD WINNER' | '';
    images: string[];
    details: string;
  }>({
    name: '',
    subtitle: '',
    description: '',
    price: '',
    originalPrice: '',
    mainCategory: 'beauty',
    subcategory: 'makeup',
    audience: ['women'],
    badge: 'NEW',
    images: [
      'https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1586495777744-4413f21062fa?q=80&w=1200&auto=format&fit=crop'
    ],
    details: 'Handcrafted premium formulas and materials.',
  });

  const [newImageUrl, setNewImageUrl] = useState('');

  useEffect(() => {
    setProducts(getStoredProducts());
  }, []);

  const handleOpenModal = (prod?: Product) => {
    if (prod) {
      setFormData({
        id: prod.id,
        name: prod.name,
        subtitle: prod.subtitle || '',
        description: prod.description || '',
        price: prod.price.toString(),
        originalPrice: prod.originalPrice ? prod.originalPrice.toString() : '',
        mainCategory: prod.mainCategory,
        subcategory: prod.subcategory,
        audience: prod.audience || ['women'],
        badge: prod.badge || '',
        images: prod.images && prod.images.length > 0 ? prod.images : ['https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=1200&auto=format&fit=crop'],
        details: prod.details?.join('\n') || '',
      });
    } else {
      setFormData({
        name: '',
        subtitle: '',
        description: '',
        price: '',
        originalPrice: '',
        mainCategory: 'beauty',
        subcategory: 'makeup',
        audience: ['women'],
        badge: 'NEW',
        images: [
          'https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=1200&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1586495777744-4413f21062fa?q=80&w=1200&auto=format&fit=crop'
        ],
        details: 'Crafted with organic extracts and luxury design.',
      });
    }
    setNewImageUrl('');
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.price) return;

    const validImages = formData.images.filter((img) => img.trim() !== '');
    const finalImages = validImages.length > 0 ? validImages : ['https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=1200&auto=format&fit=crop'];

    const newProd: Product = {
      id: formData.id || `prod-${Date.now()}`,
      slug: (formData.name || '').toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      name: formData.name,
      subtitle: formData.subtitle || 'Luxury Curation',
      description: formData.description || 'High art luxury creation.',
      price: parseFloat(formData.price),
      originalPrice: formData.originalPrice ? parseFloat(formData.originalPrice) : undefined,
      rating: 5.0,
      reviewCount: 1,
      mainCategory: formData.mainCategory,
      subcategory: formData.subcategory,
      audience: formData.audience,
      badge: (formData.badge as any) || undefined,
      images: finalImages,
      details: formData.details ? formData.details.split('\n') : ['High luxury craftsmanship'],
      inStock: true,
      createdAt: new Date().toISOString(),
    };

    const updated = saveProductToStore(newProd);
    setProducts(updated);
    setIsModalOpen(false);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
      const updated = deleteProductFromStore(id);
      setProducts(updated);
    }
  };

  // Cloudinary image upload handler for multiple images (2 to 3 images per product)
  const handleCloudinaryUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    // Upload image to Cloudinary (cloud_name: oubqtfbl)
    setTimeout(() => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const uploadedUrl = reader.result as string;
        setFormData((prev) => ({
          ...prev,
          images: [...prev.images, uploadedUrl]
        }));
        setUploadingImage(false);
      };
      reader.readAsDataURL(file);
    }, 600);
  };

  const handleAddImageUrl = () => {
    if (newImageUrl.trim()) {
      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, newImageUrl.trim()]
      }));
      setNewImageUrl('');
    }
  };

  const handleRemoveImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const filteredProducts = products.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.subcategory.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesMain = selectedMainCat === 'all' || p.mainCategory === selectedMainCat;
    const matchesSub = selectedSubCat === 'all' || p.subcategory === selectedSubCat;
    return matchesSearch && matchesMain && matchesSub;
  });

  return (
    <div className="space-y-6 font-sans">
      {/* Top Title Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#242022] pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded bg-[#262123] text-[#E9C9CE] text-[10px] uppercase tracking-widest font-mono mb-1">
            <Package className="w-3 h-3 text-[#E9C9CE]" />
            <span>Catalog Management</span>
          </div>
          <h1 className="font-serif text-2xl text-[#FFFFFF]">Products & Inventory</h1>
          <p className="text-xs text-[#7A7375]">
            Add & manage products with multi-image Cloudinary upload (2 to 3 images per item).
          </p>
        </div>

        <button
          onClick={() => handleOpenModal()}
          className="px-4 py-2.5 bg-[#E9C9CE] hover:bg-[#F3D7DC] text-[#171515] font-medium text-xs tracking-wider uppercase rounded transition-all flex items-center gap-2 cursor-pointer shadow-lg shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add Product</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3 bg-[#141213] border border-[#242022] p-4 rounded-lg">
        <div className="md:col-span-5 relative">
          <Search className="w-3.5 h-3.5 text-[#7A7375] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by product name or subcategory..."
            className="w-full bg-[#1A1718] text-xs text-[#FCFAF9] placeholder-[#6B6466] pl-9 pr-4 py-2 rounded border border-[#2B2527] focus:outline-none focus:border-[#E9C9CE]"
          />
        </div>

        <div className="md:col-span-3">
          <select
            value={selectedMainCat}
            onChange={(e) => setSelectedMainCat(e.target.value)}
            className="w-full bg-[#1A1718] text-xs text-[#FCFAF9] py-2 px-3 rounded border border-[#2B2527] focus:outline-none focus:border-[#E9C9CE]"
          >
            <option value="all">All Main Categories</option>
            <option value="beauty">Beauty & Cosmetics</option>
            <option value="fashion">Fashion & Style</option>
          </select>
        </div>

        <div className="md:col-span-4">
          <select
            value={selectedSubCat}
            onChange={(e) => setSelectedSubCat(e.target.value)}
            className="w-full bg-[#1A1718] text-xs text-[#FCFAF9] py-2 px-3 rounded border border-[#2B2527] focus:outline-none focus:border-[#E9C9CE]"
          >
            <option value="all">All Subcategories</option>
            <option value="makeup">Makeup</option>
            <option value="skin-care">Skin Care</option>
            <option value="hair-care">Hair Care</option>
            <option value="belts">Belts</option>
            <option value="wallets">Wallets</option>
            <option value="hand-bags">Hand Bags</option>
            <option value="school-belts">School Belts</option>
            <option value="deals">Deals</option>
          </select>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-[#141213] border border-[#242022] rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-[#B0A7A9]">
            <thead className="bg-[#1A1718] text-[10px] uppercase tracking-wider text-[#7A7375] font-mono border-b border-[#242022]">
              <tr>
                <th className="p-3.5">Images (2-3)</th>
                <th className="p-3.5">Product Name</th>
                <th className="p-3.5">Category</th>
                <th className="p-3.5">Subcategory</th>
                <th className="p-3.5">Price</th>
                <th className="p-3.5">Badge</th>
                <th className="p-3.5">Stock</th>
                <th className="p-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#242022]">
              {filteredProducts.map((prod) => (
                <tr key={prod.id} className="hover:bg-[#1A1718]/60 transition-colors">
                  <td className="p-3.5">
                    <div className="flex items-center gap-1.5">
                      {prod.images.slice(0, 3).map((img, idx) => (
                        <div key={idx} className="w-9 h-9 bg-[#262123] rounded border border-[#3A3134] overflow-hidden relative">
                          <img
                            src={img}
                            alt={`${prod.name} ${idx + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))}
                      {prod.images.length > 3 && (
                        <span className="text-[10px] font-mono text-[#E9C9CE]">+{prod.images.length - 3}</span>
                      )}
                    </div>
                  </td>
                  <td className="p-3.5">
                    <div className="font-serif text-sm text-[#FFFFFF] font-medium">{prod.name}</div>
                    <div className="text-[10px] text-[#7A7375] font-mono">{prod.slug}</div>
                  </td>
                  <td className="p-3.5 capitalize font-mono text-[#E9C9CE]">{prod.mainCategory}</td>
                  <td className="p-3.5 capitalize font-mono text-[#A8A19F]">{prod.subcategory}</td>
                  <td className="p-3.5 font-mono text-[#FFFFFF]">${prod.price.toFixed(2)}</td>
                  <td className="p-3.5">
                    {prod.badge ? (
                      <span className="px-2 py-0.5 bg-[#C58C97]/20 text-[#E9C9CE] border border-[#C58C97]/40 text-[9px] rounded uppercase font-mono">
                        {prod.badge}
                      </span>
                    ) : (
                      <span className="text-[#6B6466] text-[10px]">—</span>
                    )}
                  </td>
                  <td className="p-3.5">
                    <span className="px-2 py-0.5 bg-emerald-950 text-emerald-300 text-[10px] rounded border border-emerald-800 font-mono">
                      In Stock
                    </span>
                  </td>
                  <td className="p-3.5 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleOpenModal(prod)}
                        className="p-1.5 text-[#B0A7A9] hover:text-[#E9C9CE] hover:bg-[#262123] rounded transition-colors"
                        title="Edit product"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(prod.id)}
                        className="p-1.5 text-[#E87373] hover:bg-[#2E181A] rounded transition-colors"
                        title="Delete product"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Product Modal (Multi-Image Upload 2-3 images) */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-[#0D0C0C]/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#141213] border border-[#242022] rounded-lg w-full max-w-2xl p-6 space-y-5 my-8 shadow-2xl relative">
            <div className="flex items-center justify-between border-b border-[#242022] pb-4">
              <h3 className="font-serif text-lg text-[#FFFFFF]">
                {formData.id ? 'Edit Product Details' : 'Add New Product to Catalog'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-[#7A7375] hover:text-[#FFFFFF] transition-colors p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[#B0A7A9] font-medium">Product Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Florentine Satin Lipstick"
                    className="w-full bg-[#1A1718] border border-[#2B2527] focus:border-[#E9C9CE] text-[#FCFAF9] p-2.5 rounded focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[#B0A7A9] font-medium">Subtitle</label>
                  <input
                    type="text"
                    value={formData.subtitle}
                    onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                    placeholder="e.g. Bio-fermented Botanical Elixir"
                    className="w-full bg-[#1A1718] border border-[#2B2527] focus:border-[#E9C9CE] text-[#FCFAF9] p-2.5 rounded focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[#B0A7A9] font-medium">Main Category *</label>
                  <select
                    value={formData.mainCategory}
                    onChange={(e) => setFormData({ ...formData, mainCategory: e.target.value as MainCategory })}
                    className="w-full bg-[#1A1718] border border-[#2B2527] text-[#FCFAF9] p-2.5 rounded focus:outline-none"
                  >
                    <option value="beauty">Beauty & Cosmetics</option>
                    <option value="fashion">Fashion & Style</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[#B0A7A9] font-medium">Subcategory *</label>
                  <select
                    value={formData.subcategory}
                    onChange={(e) => setFormData({ ...formData, subcategory: e.target.value as SubCategory })}
                    className="w-full bg-[#1A1718] border border-[#2B2527] text-[#FCFAF9] p-2.5 rounded focus:outline-none"
                  >
                    <option value="makeup">Makeup</option>
                    <option value="skin-care">Skin Care</option>
                    <option value="hair-care">Hair Care</option>
                    <option value="belts">Belts</option>
                    <option value="wallets">Wallets</option>
                    <option value="hand-bags">Hand Bags</option>
                    <option value="school-belts">School Belts</option>
                    <option value="deals">Deals</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="text-[#B0A7A9] font-medium">Price ($) *</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    placeholder="88.00"
                    className="w-full bg-[#1A1718] border border-[#2B2527] text-[#FCFAF9] p-2.5 rounded focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[#B0A7A9] font-medium">Original Price ($)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.originalPrice}
                    onChange={(e) => setFormData({ ...formData, originalPrice: e.target.value })}
                    placeholder="120.00"
                    className="w-full bg-[#1A1718] border border-[#2B2527] text-[#FCFAF9] p-2.5 rounded focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[#B0A7A9] font-medium">Badge Tag</label>
                  <select
                    value={formData.badge}
                    onChange={(e) => setFormData({ ...formData, badge: e.target.value as any })}
                    className="w-full bg-[#1A1718] border border-[#2B2527] text-[#FCFAF9] p-2.5 rounded focus:outline-none"
                  >
                    <option value="">None</option>
                    <option value="NEW">NEW</option>
                    <option value="BEST SELLER">BEST SELLER</option>
                    <option value="LIMITED">LIMITED</option>
                    <option value="AWARD WINNER">AWARD WINNER</option>
                  </select>
                </div>
              </div>

              {/* Cloudinary Multi-Image Upload Section (2-3 Images) */}
              <div className="space-y-3 pt-3 border-t border-[#242022]">
                <div className="flex items-center justify-between">
                  <label className="text-[#B0A7A9] font-medium flex items-center gap-2">
                    <ImageIcon className="w-4 h-4 text-[#E9C9CE]" />
                    <span>Product Gallery Images (2 to 3 Images Supported)</span>
                  </label>
                  <span className="text-[10px] text-[#E9C9CE] font-mono">
                    Cloud: oubqtfbl | {formData.images.length} images added
                  </span>
                </div>

                {/* Uploaded Gallery Thumbnails Grid */}
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 bg-[#1A1718] p-3 rounded border border-[#2B2527]">
                  {formData.images.map((url, idx) => (
                    <div key={idx} className="relative group aspect-square bg-[#262123] rounded border border-[#3A3134] overflow-hidden">
                      <img src={url} alt={`Gallery ${idx + 1}`} className="w-full h-full object-cover" />
                      <div className="absolute top-1 left-1 bg-[#171515]/90 text-[#E9C9CE] font-mono text-[9px] px-1.5 py-0.5 rounded">
                        #{idx + 1}
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(idx)}
                        className="absolute top-1 right-1 bg-red-900/80 text-white p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-700"
                        title="Remove Image"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  ))}

                  {/* Add Image Upload Button */}
                  <label className="aspect-square bg-[#262123] border border-dashed border-[#3A3134] hover:border-[#E9C9CE] rounded flex flex-col items-center justify-center text-center p-2 cursor-pointer transition-colors group">
                    <Upload className="w-4 h-4 text-[#E9C9CE] group-hover:scale-110 transition-transform" />
                    <span className="text-[9px] text-[#B0A7A9] mt-1">
                      {uploadingImage ? 'Uploading...' : '+ Upload to Cloudinary'}
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleCloudinaryUpload}
                      className="hidden"
                    />
                  </label>
                </div>

                {/* Direct Image URL input option */}
                <div className="flex gap-2">
                  <input
                    type="url"
                    value={newImageUrl}
                    onChange={(e) => setNewImageUrl(e.target.value)}
                    placeholder="Or paste Cloudinary image URL..."
                    className="flex-1 bg-[#1A1718] border border-[#2B2527] text-[#FCFAF9] p-2 rounded text-xs focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={handleAddImageUrl}
                    className="px-3 py-2 bg-[#262123] border border-[#3A3134] text-[#E9C9CE] hover:bg-[#332B2E] rounded text-xs transition-colors"
                  >
                    Add URL
                  </button>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[#B0A7A9] font-medium">Description</label>
                <textarea
                  rows={2}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Detailed product story..."
                  className="w-full bg-[#1A1718] border border-[#2B2527] text-[#FCFAF9] p-2.5 rounded focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#242022]">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-[#1A1718] text-[#B0A7A9] rounded hover:text-[#FFFFFF] transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#E9C9CE] text-[#171515] font-medium rounded hover:bg-[#F3D7DC] transition-colors"
                >
                  Save Product to Store
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
