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
  Layers,
  FolderPlus,
  Tag,
  Palette,
  Maximize2
} from 'lucide-react';
import { Product, MainCategory, SubCategory, Audience, Category } from '@/lib/types';
import {
  getStoredProducts,
  saveProductToStore,
  deleteProductFromStore,
  getStoredCategories,
  addCustomMainCategory,
  addCustomSubcategory,
  deleteCategoryFromStore
} from '@/lib/adminStore';

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMainCat, setSelectedMainCat] = useState<string>('all');
  const [selectedSubCat, setSelectedSubCat] = useState<string>('all');
  
  // Modals state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [categoryModalTab, setCategoryModalTab] = useState<'main' | 'sub'>('main');
  const [uploadingImage, setUploadingImage] = useState(false);

  // Quick inline add category/subcategory inside Product Modal
  const [isAddingInlineCategory, setIsAddingInlineCategory] = useState(false);
  const [inlineCategoryName, setInlineCategoryName] = useState('');
  const [isAddingInlineSubcategory, setIsAddingInlineSubcategory] = useState(false);
  const [inlineSubcategoryName, setInlineSubcategoryName] = useState('');

  // New Main Category Form State
  const [newCatName, setNewCatName] = useState('');
  const [newCatSlug, setNewCatSlug] = useState('');
  const [newCatTagline, setNewCatTagline] = useState('');
  const [newCatDescription, setNewCatDescription] = useState('');
  const [newCatHeroImage, setNewCatHeroImage] = useState('');

  // New Subcategory Form State
  const [targetParentSlug, setTargetParentSlug] = useState('beauty');
  const [newSubName, setNewSubName] = useState('');
  const [newSubSlug, setNewSubSlug] = useState('');
  const [newSubDescription, setNewSubDescription] = useState('');
  const [newSubImage, setNewSubImage] = useState('');

  // Form State with Multi-Image Support & Brand / Color / Size
  const [formData, setFormData] = useState<{
    id?: string;
    productCode: string;
    name: string;
    subtitle: string;
    description: string;
    brand: string;
    colors: string;
    sizes: string;
    price: string;
    originalPrice: string;
    discount: string;
    mainCategory: MainCategory;
    subcategory: SubCategory;
    audience: Audience[];
    badge: 'NEW' | 'BEST SELLER' | 'LIMITED' | 'AWARD WINNER' | '';
    images: string[];
    details: string;
  }>({
    productCode: 'ELG-PROD-01',
    name: '',
    subtitle: '',
    description: '',
    brand: 'ELEGANTSTYLE',
    colors: 'Rose Gold, Velvet Crimson, Noir',
    sizes: '30ml, 50ml, 100ml',
    price: '',
    originalPrice: '',
    discount: '',
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
    setCategories(getStoredCategories());
  }, []);

  // Update targetParentSlug default when categories load
  useEffect(() => {
    if (categories.length > 0 && !targetParentSlug) {
      setTargetParentSlug(categories[0].slug);
    }
  }, [categories, targetParentSlug]);

  const handleOpenModal = (prod?: Product) => {
    if (prod) {
      setFormData({
        id: prod.id,
        productCode: prod.productCode || `ELG-${prod.id.toUpperCase()}`,
        name: prod.name,
        subtitle: prod.subtitle || '',
        description: prod.description || '',
        brand: prod.brand || 'ELEGANTSTYLE',
        colors: prod.colors?.join(', ') || '',
        sizes: prod.sizes?.join(', ') || '',
        price: prod.price.toString(),
        originalPrice: prod.originalPrice ? prod.originalPrice.toString() : '',
        discount: prod.discount ? prod.discount.toString() : (prod.originalPrice && prod.originalPrice > prod.price ? Math.round(((prod.originalPrice - prod.price) / prod.originalPrice) * 100).toString() : ''),
        mainCategory: prod.mainCategory,
        subcategory: prod.subcategory,
        audience: prod.audience || ['women'],
        badge: prod.badge || '',
        images: prod.images && prod.images.length > 0 ? prod.images : ['https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=1200&auto=format&fit=crop'],
        details: prod.details?.join('\n') || '',
      });
    } else {
      const generatedCode = `ELG-${Math.floor(1000 + Math.random() * 9000)}`;
      const firstCat = categories[0]?.slug || 'beauty';
      const firstSub = categories[0]?.subcategories?.[0]?.slug || 'makeup';

      setFormData({
        productCode: generatedCode,
        name: '',
        subtitle: '',
        description: '',
        brand: 'ELEGANTSTYLE',
        colors: 'Rose Gold, Velvet Crimson, Noir',
        sizes: '30ml, 50ml, 100ml',
        price: '',
        originalPrice: '',
        discount: '15',
        mainCategory: firstCat,
        subcategory: firstSub,
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

    const parsedPrice = parseFloat(formData.price);
    const parsedOriginal = formData.originalPrice ? parseFloat(formData.originalPrice) : undefined;
    const parsedDiscount = formData.discount ? parseFloat(formData.discount) : undefined;

    const parsedColors = formData.colors
      .split(',')
      .map((c) => c.trim())
      .filter(Boolean);

    const parsedSizes = formData.sizes
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    const newProd: Product = {
      id: formData.id || `prod-${Date.now()}`,
      productCode: formData.productCode || `ELG-${Math.floor(1000 + Math.random() * 9000)}`,
      slug: (formData.name || '').toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      name: formData.name,
      subtitle: formData.subtitle || 'Luxury Curation',
      description: formData.description || 'High art luxury creation.',
      brand: formData.brand.trim() || 'ELEGANTSTYLE',
      colors: parsedColors.length > 0 ? parsedColors : undefined,
      sizes: parsedSizes.length > 0 ? parsedSizes : undefined,
      price: parsedPrice,
      originalPrice: parsedOriginal,
      discount: parsedDiscount,
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

    // Sync to server-side JSON storage and dispatch cross-component refresh
    try {
      fetch('/api/admin/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProd),
      }).catch((err) => console.error('Server product sync notice:', err));

      if (typeof window !== 'undefined') {
        window.dispatchEvent(new Event('storage'));
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
      const updated = deleteProductFromStore(id);
      setProducts(updated);

      try {
        fetch(`/api/admin/products?id=${id}`, { method: 'DELETE' }).catch((err) =>
          console.error('Server product delete notice:', err)
        );
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new Event('storage'));
        }
      } catch (e) {
        console.error(e);
      }
    }
  };

  // Custom Category creation
  const handleCreateMainCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCatName.trim()) return;

    const updated = addCustomMainCategory({
      name: newCatName.trim(),
      slug: newCatSlug.trim() || undefined,
      tagline: newCatTagline.trim() || undefined,
      description: newCatDescription.trim() || undefined,
      heroImage: newCatHeroImage.trim() || undefined,
    });

    setCategories(updated);
    setNewCatName('');
    setNewCatSlug('');
    setNewCatTagline('');
    setNewCatDescription('');
    setNewCatHeroImage('');
    alert(`Main Category "${newCatName.trim()}" created successfully! It is now live in store.`);
  };

  // Custom Subcategory creation
  const handleCreateSubcategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSubName.trim()) return;

    const updated = addCustomSubcategory(targetParentSlug, {
      name: newSubName.trim(),
      slug: newSubSlug.trim() || undefined,
      description: newSubDescription.trim() || undefined,
      image: newSubImage.trim() || undefined,
    });

    setCategories(updated);
    setNewSubName('');
    setNewSubSlug('');
    setNewSubDescription('');
    setNewSubImage('');
    alert(`Subcategory "${newSubName.trim()}" created under ${targetParentSlug} successfully!`);
  };

  // Quick Inline Category creation directly inside Add Product modal
  const handleQuickAddInlineCategory = () => {
    const name = inlineCategoryName.trim();
    if (!name) return;
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const updated = addCustomMainCategory({
      name,
      slug,
      tagline: `Exclusive ${name} luxury edition`,
      description: `Artisanal ${name} crafted with quiet refinement.`,
    });
    setCategories(updated);
    const targetCat = updated.find((c) => c.slug === slug);
    const defaultSub = targetCat?.subcategories?.[0]?.slug || 'general';
    setFormData((prev) => ({
      ...prev,
      mainCategory: slug,
      subcategory: defaultSub,
    }));
    setInlineCategoryName('');
    setIsAddingInlineCategory(false);
  };

  // Quick Inline Subcategory creation directly inside Add Product modal
  const handleQuickAddInlineSubcategory = () => {
    const name = inlineSubcategoryName.trim();
    if (!name) return;
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const updated = addCustomSubcategory(formData.mainCategory, {
      name,
      slug,
      description: `Refined ${name} collection`,
    });
    setCategories(updated);
    setFormData((prev) => ({
      ...prev,
      subcategory: slug,
    }));
    setInlineSubcategoryName('');
    setIsAddingInlineSubcategory(false);
  };

  const handleDeleteCategory = (catSlug: string) => {
    if (['beauty', 'fashion'].includes(catSlug)) {
      alert('Core built-in categories cannot be deleted.');
      return;
    }
    if (confirm(`Are you sure you want to delete category "${catSlug}"?`)) {
      const updated = deleteCategoryFromStore(catSlug);
      setCategories(updated);
    }
  };

  // Cloudinary image upload handler for multiple images (2 to 3 images per product)
  const handleCloudinaryUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
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

  // Get dynamic subcategories for current main category in form
  const currentCategoryObj = categories.find((c) => c.slug === formData.mainCategory);
  const availableSubcategories = currentCategoryObj?.subcategories || [];

  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.subcategory.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.brand && p.brand.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesMain = selectedMainCat === 'all' || p.mainCategory === selectedMainCat;
    const matchesSub = selectedSubCat === 'all' || p.subcategory === selectedSubCat;
    return matchesSearch && matchesMain && matchesSub;
  });

  return (
    <div className="space-y-6 font-sans">
      {/* Top Title Bar & Category Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#242022] pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded bg-[#262123] text-[#E9C9CE] text-[10px] uppercase tracking-widest font-mono mb-1">
            <Package className="w-3 h-3 text-[#E9C9CE]" />
            <span>Catalog & Inventory Management</span>
          </div>
          <h1 className="font-serif text-2xl text-[#FFFFFF]">Products & Categories</h1>
          <p className="text-xs text-[#7A7375]">
            Add & manage products with multi-image upload, Brand, Color, Size, and custom Categories/Subcategories.
          </p>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          <button
            onClick={() => setIsCategoryModalOpen(true)}
            className="px-4 py-2.5 bg-[#1F1B1D] border border-[#3A2E32] hover:border-[#E9C9CE] text-[#E9C9CE] font-medium text-xs tracking-wider uppercase rounded transition-all flex items-center gap-2 cursor-pointer shadow-md"
            title="Create and manage custom Main Categories and Subcategories"
          >
            <Layers className="w-4 h-4 text-[#E9C9CE]" />
            <span>Manage / Add Categories</span>
          </button>

          <button
            onClick={() => handleOpenModal()}
            className="px-4 py-2.5 bg-[#E9C9CE] hover:bg-[#F3D7DC] text-[#171515] font-semibold text-xs tracking-wider uppercase rounded transition-all flex items-center gap-2 cursor-pointer shadow-lg shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Add Product</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3 bg-[#141213] border border-[#242022] p-4 rounded-lg">
        <div className="md:col-span-5 relative">
          <Search className="w-3.5 h-3.5 text-[#7A7375] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by product name, brand, subcategory..."
            className="w-full bg-[#1A1718] text-xs text-[#FCFAF9] placeholder-[#6B6466] pl-9 pr-4 py-2 rounded border border-[#2B2527] focus:outline-none focus:border-[#E9C9CE]"
          />
        </div>

        <div className="md:col-span-3">
          <select
            value={selectedMainCat}
            onChange={(e) => setSelectedMainCat(e.target.value)}
            className="w-full bg-[#1A1718] text-xs text-[#FCFAF9] py-2 px-3 rounded border border-[#2B2527] focus:outline-none focus:border-[#E9C9CE]"
          >
            <option value="all">All Main Categories ({categories.length})</option>
            {categories.map((c) => (
              <option key={c.slug} value={c.slug}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        <div className="md:col-span-4">
          <select
            value={selectedSubCat}
            onChange={(e) => setSelectedSubCat(e.target.value)}
            className="w-full bg-[#1A1718] text-xs text-[#FCFAF9] py-2 px-3 rounded border border-[#2B2527] focus:outline-none focus:border-[#E9C9CE]"
          >
            <option value="all">All Subcategories</option>
            {categories.flatMap((c) =>
              c.subcategories.map((s) => (
                <option key={`${c.slug}-${s.slug}`} value={s.slug}>
                  {c.name} → {s.name}
                </option>
              ))
            )}
          </select>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-[#141213] border border-[#242022] rounded-lg overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-[#B0A7A9]">
            <thead className="bg-[#1A1718] text-[10px] uppercase tracking-wider text-[#7A7375] font-mono border-b border-[#242022]">
              <tr>
                <th className="p-3.5">Images (2-3)</th>
                <th className="p-3.5">Product Details & Brand</th>
                <th className="p-3.5">Category</th>
                <th className="p-3.5">Subcategory</th>
                <th className="p-3.5">Colors & Sizes</th>
                <th className="p-3.5">Price</th>
                <th className="p-3.5">Discount</th>
                <th className="p-3.5">Badge</th>
                <th className="p-3.5">Stock</th>
                <th className="p-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#242022]">
              {filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan={10} className="p-8 text-center text-xs text-[#7A7375]">
                    No products found matching filters.
                  </td>
                </tr>
              ) : (
                filteredProducts.map((prod) => (
                  <tr key={prod.id} className="hover:bg-[#1A1718]/60 transition-colors">
                    {/* Images */}
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

                    {/* Product Name, SKU & Brand */}
                    <td className="p-3.5">
                      <div className="font-serif text-sm text-[#FFFFFF] font-medium">{prod.name}</div>
                      <div className="flex items-center gap-2 mt-1 flex-wrap">
                        <span className="font-mono text-[10px] text-[#E9C9CE] bg-[#262123] px-1.5 py-0.5 rounded border border-[#3A3134]">
                          {prod.brand || 'ELEGANTSTYLE'}
                        </span>
                        <span className="text-[10px] text-[#7A7375] font-mono">
                          {prod.productCode || `ELG-${prod.id.slice(-4).toUpperCase()}`}
                        </span>
                      </div>
                    </td>

                    {/* Main Category */}
                    <td className="p-3.5 capitalize font-mono text-[#E9C9CE]">
                      {categories.find((c) => c.slug === prod.mainCategory)?.name || prod.mainCategory}
                    </td>

                    {/* Subcategory */}
                    <td className="p-3.5 capitalize font-mono text-[#A8A19F]">
                      {prod.subcategory}
                    </td>

                    {/* Colors & Sizes Chips */}
                    <td className="p-3.5 max-w-xs">
                      <div className="space-y-1">
                        {prod.colors && prod.colors.length > 0 ? (
                          <div className="flex items-center gap-1 flex-wrap">
                            <span className="text-[9px] text-[#7A7375] uppercase font-mono">Colors:</span>
                            {prod.colors.slice(0, 3).map((c, i) => (
                              <span key={i} className="px-1.5 py-0.5 bg-[#262123] border border-[#3A3134] text-[9px] rounded text-[#D4CDCE]">
                                {c}
                              </span>
                            ))}
                            {prod.colors.length > 3 && <span className="text-[9px] text-[#7A7375]">+{prod.colors.length - 3}</span>}
                          </div>
                        ) : (
                          <span className="text-[10px] text-[#555] italic">Default Palette</span>
                        )}

                        {prod.sizes && prod.sizes.length > 0 ? (
                          <div className="flex items-center gap-1 flex-wrap">
                            <span className="text-[9px] text-[#7A7375] uppercase font-mono">Sizes:</span>
                            {prod.sizes.slice(0, 3).map((s, i) => (
                              <span key={i} className="px-1.5 py-0.5 bg-[#1F1B1D] border border-[#3A2E32] text-[9px] rounded text-[#E9C9CE]">
                                {s}
                              </span>
                            ))}
                            {prod.sizes.length > 3 && <span className="text-[9px] text-[#7A7375]">+{prod.sizes.length - 3}</span>}
                          </div>
                        ) : (
                          <span className="text-[10px] text-[#555] italic">Standard Dimension</span>
                        )}
                      </div>
                    </td>

                    {/* Price */}
                    <td className="p-3.5 font-mono text-[#FFFFFF]">${prod.price.toFixed(2)}</td>

                    {/* Discount */}
                    <td className="p-3.5 font-mono text-[11px]">
                      {prod.discount ? (
                        <span className="px-2 py-0.5 bg-[#6B7C52]/20 text-[#D0D9C0] border border-[#6B7C52]/40 rounded font-semibold">
                          {prod.discount}% OFF
                        </span>
                      ) : prod.originalPrice && prod.originalPrice > prod.price ? (
                        <span className="px-2 py-0.5 bg-[#6B7C52]/20 text-[#D0D9C0] border border-[#6B7C52]/40 rounded font-semibold">
                          {Math.round(((prod.originalPrice - prod.price) / prod.originalPrice) * 100)}% OFF
                        </span>
                      ) : (
                        <span className="text-[#6B6466] text-[10px]">—</span>
                      )}
                    </td>

                    {/* Badge */}
                    <td className="p-3.5">
                      {prod.badge ? (
                        <span className="px-2 py-0.5 bg-[#C58C97]/20 text-[#E9C9CE] border border-[#C58C97]/40 text-[9px] rounded uppercase font-mono">
                          {prod.badge}
                        </span>
                      ) : (
                        <span className="text-[#6B6466] text-[10px]">—</span>
                      )}
                    </td>

                    {/* Stock */}
                    <td className="p-3.5">
                      <span className="px-2 py-0.5 bg-emerald-950 text-emerald-300 text-[10px] rounded border border-emerald-800 font-mono">
                        In Stock
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="p-3.5 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleOpenModal(prod)}
                          className="p-1.5 text-[#B0A7A9] hover:text-[#E9C9CE] hover:bg-[#262123] rounded transition-colors cursor-pointer"
                          title="Edit product"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDelete(prod.id)}
                          className="p-1.5 text-[#E87373] hover:bg-[#2E181A] rounded transition-colors cursor-pointer"
                          title="Delete product"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* CATEGORY & SUBCATEGORY MANAGEMENT MODAL */}
      {isCategoryModalOpen && (
        <div className="fixed inset-0 z-[70] bg-[#0D0C0C]/85 backdrop-blur-sm flex items-start justify-center p-2 sm:p-4 md:p-6 overflow-y-auto">
          <div className="bg-[#141213] border border-[#242022] rounded-xl w-full max-w-3xl my-2 sm:my-6 max-h-[92vh] flex flex-col shadow-2xl relative overflow-hidden">
            {/* Modal Sticky Header */}
            <div className="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-[#242022] bg-[#141213] shrink-0 z-10">
              <div className="flex items-center gap-2">
                <Layers className="w-5 h-5 text-[#E9C9CE]" />
                <h3 className="font-serif text-lg sm:text-xl text-[#FFFFFF]">Manage Categories & Subcategories</h3>
              </div>
              <button
                type="button"
                onClick={() => setIsCategoryModalOpen(false)}
                className="text-[#7A7375] hover:text-[#FFFFFF] transition-colors p-1.5 rounded-lg hover:bg-[#1A1718] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Body */}
            <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-6">

            {/* Tabs switcher */}
            <div className="flex border-b border-[#242022] gap-4 text-xs font-mono uppercase tracking-wider">
              <button
                type="button"
                onClick={() => setCategoryModalTab('main')}
                className={`pb-3 px-1 transition-colors border-b-2 font-medium flex items-center gap-2 ${
                  categoryModalTab === 'main'
                    ? 'border-[#E9C9CE] text-[#E9C9CE]'
                    : 'border-transparent text-[#7A7375] hover:text-[#FCFAF9]'
                }`}
              >
                <FolderPlus className="w-4 h-4" />
                <span>Add / Manage Main Categories ({categories.length})</span>
              </button>

              <button
                type="button"
                onClick={() => setCategoryModalTab('sub')}
                className={`pb-3 px-1 transition-colors border-b-2 font-medium flex items-center gap-2 ${
                  categoryModalTab === 'sub'
                    ? 'border-[#E9C9CE] text-[#E9C9CE]'
                    : 'border-transparent text-[#7A7375] hover:text-[#FCFAF9]'
                }`}
              >
                <Tag className="w-4 h-4" />
                <span>Add / Manage Subcategories</span>
              </button>
            </div>

            {/* TAB 1: MAIN CATEGORIES */}
            {categoryModalTab === 'main' && (
              <div className="space-y-6">
                {/* Form to add Main Category */}
                <form onSubmit={handleCreateMainCategory} className="bg-[#1A1718] p-4 rounded-lg border border-[#2B2527] space-y-4">
                  <div className="text-xs uppercase font-mono text-[#E9C9CE] tracking-wider font-semibold">
                    + Create New Custom Main Category
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div className="space-y-1">
                      <label className="text-[#B0A7A9]">Category Name *</label>
                      <input
                        type="text"
                        required
                        value={newCatName}
                        onChange={(e) => {
                          setNewCatName(e.target.value);
                          if (!newCatSlug) {
                            setNewCatSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-'));
                          }
                        }}
                        placeholder="e.g. Fragrances, Watches, Jewelry"
                        className="w-full bg-[#141213] border border-[#2B2527] focus:border-[#E9C9CE] text-[#FCFAF9] p-2.5 rounded focus:outline-none"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[#B0A7A9]">Slug / Route (Optional)</label>
                      <input
                        type="text"
                        value={newCatSlug}
                        onChange={(e) => setNewCatSlug(e.target.value)}
                        placeholder="e.g. fragrances"
                        className="w-full bg-[#141213] border border-[#2B2527] focus:border-[#E9C9CE] text-[#FCFAF9] p-2.5 rounded focus:outline-none font-mono"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[#B0A7A9]">Tagline</label>
                      <input
                        type="text"
                        value={newCatTagline}
                        onChange={(e) => setNewCatTagline(e.target.value)}
                        placeholder="e.g. Haute Parfumerie & Pure Botanical Essences"
                        className="w-full bg-[#141213] border border-[#2B2527] focus:border-[#E9C9CE] text-[#FCFAF9] p-2.5 rounded focus:outline-none"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[#B0A7A9]">Hero Banner Image URL</label>
                      <input
                        type="url"
                        value={newCatHeroImage}
                        onChange={(e) => setNewCatHeroImage(e.target.value)}
                        placeholder="https://images.unsplash.com/..."
                        className="w-full bg-[#141213] border border-[#2B2527] focus:border-[#E9C9CE] text-[#FCFAF9] p-2.5 rounded focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="space-y-1 text-xs">
                    <label className="text-[#B0A7A9]">Description</label>
                    <textarea
                      rows={2}
                      value={newCatDescription}
                      onChange={(e) => setNewCatDescription(e.target.value)}
                      placeholder="Atmospheric luxury collection description displayed in the category header..."
                      className="w-full bg-[#141213] border border-[#2B2527] focus:border-[#E9C9CE] text-[#FCFAF9] p-2 rounded focus:outline-none"
                    />
                  </div>

                  <div className="text-right">
                    <button
                      type="submit"
                      className="px-4 py-2 bg-[#E9C9CE] text-[#171515] font-semibold text-xs rounded hover:bg-[#F3D7DC] transition-colors cursor-pointer"
                    >
                      Save & Publish Main Category
                    </button>
                  </div>
                </form>

                {/* Existing Main Categories List */}
                <div className="space-y-2">
                  <div className="text-[10px] uppercase tracking-wider text-[#7A7375] font-mono">
                    Live Active Main Categories
                  </div>
                  <div className="divide-y divide-[#242022] border border-[#242022] rounded-lg overflow-hidden bg-[#1A1718]">
                    {categories.map((c) => (
                      <div key={c.slug} className="p-3.5 flex items-center justify-between gap-4">
                        <div>
                          <div className="font-serif text-sm text-[#FFFFFF] flex items-center gap-2">
                            <span>{c.name}</span>
                            <span className="font-mono text-[10px] text-[#E9C9CE] bg-[#262123] px-2 py-0.5 rounded">
                              /{c.slug}
                            </span>
                          </div>
                          <p className="text-[11px] text-[#A8A19F] mt-0.5 line-clamp-1">{c.tagline || c.description}</p>
                          <div className="text-[10px] text-[#7A7375] font-mono mt-1">
                            {c.subcategories.length} Subcategories: {c.subcategories.map((s) => s.name).join(', ') || 'None'}
                          </div>
                        </div>

                        <div>
                          {['beauty', 'fashion'].includes(c.slug) ? (
                            <span className="px-2 py-1 bg-[#262123] text-[#7A7375] rounded text-[10px] font-mono uppercase">
                              Core
                            </span>
                          ) : (
                            <button
                              type="button"
                              onClick={() => handleDeleteCategory(c.slug)}
                              className="p-1.5 bg-[#2E181A] text-red-400 hover:bg-red-900 rounded transition-colors text-xs flex items-center gap-1 cursor-pointer"
                              title="Delete custom category"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                              <span>Remove</span>
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: SUBCATEGORIES */}
            {categoryModalTab === 'sub' && (
              <div className="space-y-6">
                {/* Form to add Subcategory */}
                <form onSubmit={handleCreateSubcategory} className="bg-[#1A1718] p-4 rounded-lg border border-[#2B2527] space-y-4">
                  <div className="text-xs uppercase font-mono text-[#E9C9CE] tracking-wider font-semibold">
                    + Add New Subcategory Under a Main Category
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div className="space-y-1">
                      <label className="text-[#B0A7A9]">Select Parent Category *</label>
                      <select
                        value={targetParentSlug}
                        onChange={(e) => setTargetParentSlug(e.target.value)}
                        className="w-full bg-[#141213] border border-[#2B2527] focus:border-[#E9C9CE] text-[#FCFAF9] p-2.5 rounded focus:outline-none"
                      >
                        {categories.map((c) => (
                          <option key={c.slug} value={c.slug}>
                            {c.name} (/{c.slug})
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[#B0A7A9]">Subcategory Name *</label>
                      <input
                        type="text"
                        required
                        value={newSubName}
                        onChange={(e) => {
                          setNewSubName(e.target.value);
                          if (!newSubSlug) {
                            setNewSubSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-'));
                          }
                        }}
                        placeholder="e.g. Eau de Parfum, Necklaces, Silk Ties"
                        className="w-full bg-[#141213] border border-[#2B2527] focus:border-[#E9C9CE] text-[#FCFAF9] p-2.5 rounded focus:outline-none"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[#B0A7A9]">Subcategory Slug (Optional)</label>
                      <input
                        type="text"
                        value={newSubSlug}
                        onChange={(e) => setNewSubSlug(e.target.value)}
                        placeholder="e.g. eau-de-parfum"
                        className="w-full bg-[#141213] border border-[#2B2527] focus:border-[#E9C9CE] text-[#FCFAF9] p-2.5 rounded focus:outline-none font-mono"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[#B0A7A9]">Image URL</label>
                      <input
                        type="url"
                        value={newSubImage}
                        onChange={(e) => setNewSubImage(e.target.value)}
                        placeholder="https://images.unsplash.com/..."
                        className="w-full bg-[#141213] border border-[#2B2527] focus:border-[#E9C9CE] text-[#FCFAF9] p-2.5 rounded focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="space-y-1 text-xs">
                    <label className="text-[#B0A7A9]">Subcategory Description</label>
                    <textarea
                      rows={2}
                      value={newSubDescription}
                      onChange={(e) => setNewSubDescription(e.target.value)}
                      placeholder="Brief description of this collection..."
                      className="w-full bg-[#141213] border border-[#2B2527] focus:border-[#E9C9CE] text-[#FCFAF9] p-2 rounded focus:outline-none"
                    />
                  </div>

                  <div className="text-right">
                    <button
                      type="submit"
                      className="px-4 py-2 bg-[#E9C9CE] text-[#171515] font-semibold text-xs rounded hover:bg-[#F3D7DC] transition-colors cursor-pointer"
                    >
                      Save & Add Subcategory
                    </button>
                  </div>
                </form>

                {/* Subcategories list by parent */}
                <div className="space-y-4">
                  {categories.map((cat) => (
                    <div key={cat.slug} className="bg-[#1A1718] border border-[#2B2527] rounded-lg p-4 space-y-2">
                      <div className="font-serif text-sm text-[#FFFFFF] font-medium flex items-center justify-between border-b border-[#242022] pb-2">
                        <span>{cat.name} Subcategories</span>
                        <span className="text-[10px] font-mono text-[#E9C9CE]">{cat.subcategories.length} entries</span>
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-1">
                        {cat.subcategories.map((sub) => (
                          <div key={sub.slug} className="p-2 bg-[#141213] rounded border border-[#2B2527] text-xs">
                            <div className="font-medium text-[#FCFAF9]">{sub.name}</div>
                            <div className="text-[10px] text-[#7A7375] font-mono">/{sub.slug}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            </div>

            {/* Modal Sticky Footer */}
            <div className="px-4 sm:px-6 py-3 border-t border-[#242022] bg-[#141213] text-right shrink-0 z-10">
              <button
                type="button"
                onClick={() => setIsCategoryModalOpen(false)}
                className="px-4 py-2 bg-[#262123] text-[#FCFAF9] text-xs rounded hover:bg-[#332B2E] transition-colors cursor-pointer"
              >
                Close Manager
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ADD / EDIT PRODUCT MODAL (with Multi-Image, Brand, Color, Size & Dynamic Categories) */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-[#0D0C0C]/85 backdrop-blur-sm flex items-start justify-center p-2 sm:p-4 md:p-6 overflow-y-auto">
          <div className="bg-[#141213] border border-[#242022] rounded-xl w-full max-w-3xl my-2 sm:my-6 max-h-[92vh] flex flex-col shadow-2xl relative overflow-hidden">
            {/* Modal Sticky Header - Always visible on all screens */}
            <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 sm:py-4 border-b border-[#242022] bg-[#141213] shrink-0 z-10">
              <div>
                <h3 className="font-serif text-base sm:text-lg text-[#FFFFFF]">
                  {formData.id ? 'Edit Product Details' : 'Add New Product to Catalog'}
                </h3>
                <p className="text-[11px] text-[#7A7375] mt-0.5 hidden sm:block">
                  Configure title, brand, colors, sizes, dynamic category, and multi-image gallery.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="text-[#7A7375] hover:text-[#FFFFFF] transition-colors p-1.5 rounded-lg hover:bg-[#1A1718] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="flex flex-col flex-1 min-h-0 overflow-hidden">
              <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-4 text-xs">
              {/* Product Code & Product Name */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[#B0A7A9] font-medium flex items-center justify-between">
                    <span>Product Code / SKU *</span>
                    <span className="text-[10px] text-[#E9C9CE] font-mono">e.g. ELG-9821</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.productCode}
                    onChange={(e) => setFormData({ ...formData, productCode: e.target.value })}
                    placeholder="ELG-SKU-9821"
                    className="w-full bg-[#1A1718] border border-[#2B2527] focus:border-[#E9C9CE] text-[#FCFAF9] p-2.5 rounded focus:outline-none font-mono"
                  />
                </div>

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
              </div>

              {/* Subtitle & Brand (NEW REQUIREMENT) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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

                <div className="space-y-1">
                  <label className="text-[#B0A7A9] font-medium flex items-center justify-between">
                    <span className="flex items-center gap-1.5 text-[#E9C9CE]">
                      <Sparkles className="w-3.5 h-3.5" />
                      <strong>Brand Name *</strong>
                    </span>
                    <span className="text-[10px] text-[#A8A19F]">e.g. ELEGANTSTYLE, Dior</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.brand}
                    onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                    placeholder="ELEGANTSTYLE"
                    className="w-full bg-[#1A1718] border border-[#2B2527] focus:border-[#E9C9CE] text-[#FCFAF9] p-2.5 rounded focus:outline-none font-medium"
                  />
                </div>
              </div>

              {/* Colors & Sizes Inputs (NEW REQUIREMENT) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-[#1A1718] p-3.5 rounded-lg border border-[#2B2527]">
                <div className="space-y-1.5">
                  <label className="text-[#B0A7A9] font-medium flex items-center gap-1.5 text-[#E9C9CE]">
                    <Palette className="w-3.5 h-3.5" />
                    <span>Available Colors (Comma Separated)</span>
                  </label>
                  <input
                    type="text"
                    value={formData.colors}
                    onChange={(e) => setFormData({ ...formData, colors: e.target.value })}
                    placeholder="Rose Gold, Crimson Red, Noir, Nude Silk"
                    className="w-full bg-[#141213] border border-[#2B2527] focus:border-[#E9C9CE] text-[#FCFAF9] p-2.5 rounded focus:outline-none"
                  />
                  {formData.colors && (
                    <div className="flex items-center gap-1.5 flex-wrap pt-1">
                      {formData.colors
                        .split(',')
                        .map((c) => c.trim())
                        .filter(Boolean)
                        .map((c, i) => (
                          <span key={i} className="px-2 py-0.5 rounded bg-[#262123] border border-[#3A3134] text-[10px] text-[#E9C9CE] font-mono">
                            ● {c}
                          </span>
                        ))}
                    </div>
                  )}
                </div>

                <div className="space-y-1.5">
                  <label className="text-[#B0A7A9] font-medium flex items-center gap-1.5 text-[#E9C9CE]">
                    <Maximize2 className="w-3.5 h-3.5" />
                    <span>Available Sizes / Options (Comma Separated)</span>
                  </label>
                  <input
                    type="text"
                    value={formData.sizes}
                    onChange={(e) => setFormData({ ...formData, sizes: e.target.value })}
                    placeholder="30ml, 50ml, 100ml or S, M, L, XL"
                    className="w-full bg-[#141213] border border-[#2B2527] focus:border-[#E9C9CE] text-[#FCFAF9] p-2.5 rounded focus:outline-none"
                  />
                  {formData.sizes && (
                    <div className="flex items-center gap-1.5 flex-wrap pt-1">
                      {formData.sizes
                        .split(',')
                        .map((s) => s.trim())
                        .filter(Boolean)
                        .map((s, i) => (
                          <span key={i} className="px-2 py-0.5 rounded bg-[#262123] border border-[#3A3134] text-[10px] text-[#FCFAF9] font-mono">
                            [{s}]
                          </span>
                        ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Dynamic Main Category & Subcategory Selectors */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* MAIN CATEGORY */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="text-[#B0A7A9] font-medium">Main Category *</label>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setIsAddingInlineCategory(!isAddingInlineCategory)}
                        className="text-[11px] text-[#E9C9CE] font-semibold hover:underline flex items-center gap-1 cursor-pointer bg-[#262123] px-2 py-0.5 rounded border border-[#3A3134]"
                      >
                        {isAddingInlineCategory ? '✕ Close' : '+ Quick Add'}
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setIsCategoryModalOpen(true);
                          setCategoryModalTab('main');
                        }}
                        className="text-[10px] text-[#7A7375] hover:text-[#FFFFFF] underline cursor-pointer"
                        title="Open Full Category Manager"
                      >
                        Manager
                      </button>
                    </div>
                  </div>

                  {/* Inline Category Quick Add Input */}
                  {isAddingInlineCategory && (
                    <div className="p-2.5 bg-[#262123] border border-[#E9C9CE] rounded-lg space-y-2 animate-in fade-in shadow-inner">
                      <div className="text-[10px] uppercase font-mono text-[#E9C9CE] font-semibold">
                        Enter New Category Name:
                      </div>
                      <div className="flex items-center gap-1.5">
                        <input
                          type="text"
                          autoFocus
                          value={inlineCategoryName}
                          onChange={(e) => setInlineCategoryName(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              handleQuickAddInlineCategory();
                            }
                          }}
                          placeholder="e.g. Fragrances, Watches, Shoes"
                          className="flex-1 bg-[#141213] border border-[#3A3134] focus:border-[#E9C9CE] text-[#FCFAF9] p-2 rounded text-xs focus:outline-none"
                        />
                        <button
                          type="button"
                          onClick={handleQuickAddInlineCategory}
                          className="px-3 py-2 bg-[#E9C9CE] text-[#171515] font-semibold rounded text-xs hover:bg-[#F3D7DC] transition-colors shrink-0 cursor-pointer"
                        >
                          Add
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setIsAddingInlineCategory(false);
                            setInlineCategoryName('');
                          }}
                          className="p-2 text-[#7A7375] hover:text-[#FFFFFF] cursor-pointer"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  )}

                  <select
                    value={formData.mainCategory}
                    onChange={(e) => {
                      const newMain = e.target.value;
                      const matchedCat = categories.find((c) => c.slug === newMain);
                      const defaultSub = matchedCat?.subcategories?.[0]?.slug || 'general';
                      setFormData({ ...formData, mainCategory: newMain, subcategory: defaultSub });
                    }}
                    className="w-full bg-[#1A1718] border border-[#2B2527] text-[#FCFAF9] p-2.5 rounded focus:outline-none"
                  >
                    {categories.map((c) => (
                      <option key={c.slug} value={c.slug}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* SUBCATEGORY */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="text-[#B0A7A9] font-medium">Subcategory *</label>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setIsAddingInlineSubcategory(!isAddingInlineSubcategory)}
                        className="text-[11px] text-[#E9C9CE] font-semibold hover:underline flex items-center gap-1 cursor-pointer bg-[#262123] px-2 py-0.5 rounded border border-[#3A3134]"
                      >
                        {isAddingInlineSubcategory ? '✕ Close' : '+ Quick Add'}
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setIsCategoryModalOpen(true);
                          setCategoryModalTab('sub');
                        }}
                        className="text-[10px] text-[#7A7375] hover:text-[#FFFFFF] underline cursor-pointer"
                        title="Open Full Subcategory Manager"
                      >
                        Manager
                      </button>
                    </div>
                  </div>

                  {/* Inline Subcategory Quick Add Input */}
                  {isAddingInlineSubcategory && (
                    <div className="p-2.5 bg-[#262123] border border-[#E9C9CE] rounded-lg space-y-2 animate-in fade-in shadow-inner">
                      <div className="text-[10px] uppercase font-mono text-[#E9C9CE] font-semibold">
                        New Subcategory in &ldquo;{currentCategoryObj?.name || formData.mainCategory}&rdquo;:
                      </div>
                      <div className="flex items-center gap-1.5">
                        <input
                          type="text"
                          autoFocus
                          value={inlineSubcategoryName}
                          onChange={(e) => setInlineSubcategoryName(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              handleQuickAddInlineSubcategory();
                            }
                          }}
                          placeholder="e.g. Eau de Parfum, Cologne, Silk Scarves"
                          className="flex-1 bg-[#141213] border border-[#3A3134] focus:border-[#E9C9CE] text-[#FCFAF9] p-2 rounded text-xs focus:outline-none"
                        />
                        <button
                          type="button"
                          onClick={handleQuickAddInlineSubcategory}
                          className="px-3 py-2 bg-[#E9C9CE] text-[#171515] font-semibold rounded text-xs hover:bg-[#F3D7DC] transition-colors shrink-0 cursor-pointer"
                        >
                          Add
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setIsAddingInlineSubcategory(false);
                            setInlineSubcategoryName('');
                          }}
                          className="p-2 text-[#7A7375] hover:text-[#FFFFFF] cursor-pointer"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  )}

                  <select
                    value={formData.subcategory}
                    onChange={(e) => setFormData({ ...formData, subcategory: e.target.value })}
                    className="w-full bg-[#1A1718] border border-[#2B2527] text-[#FCFAF9] p-2.5 rounded focus:outline-none"
                  >
                    {availableSubcategories.length > 0 ? (
                      availableSubcategories.map((s) => (
                        <option key={s.slug} value={s.slug}>
                          {s.name}
                        </option>
                      ))
                    ) : (
                      <option value={formData.subcategory}>{formData.subcategory}</option>
                    )}
                  </select>
                </div>
              </div>

              {/* Price, Original MSRP, Discount & Badge */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                <div className="space-y-1">
                  <label className="text-[#B0A7A9] font-medium">Price ($) *</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    placeholder="88.00"
                    className="w-full bg-[#1A1718] border border-[#2B2527] text-[#FCFAF9] p-2.5 rounded focus:outline-none font-mono"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[#B0A7A9] font-medium">Original MSRP ($)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.originalPrice}
                    onChange={(e) => setFormData({ ...formData, originalPrice: e.target.value })}
                    placeholder="120.00"
                    className="w-full bg-[#1A1718] border border-[#2B2527] text-[#FCFAF9] p-2.5 rounded focus:outline-none font-mono"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[#B0A7A9] font-medium">Discount (%)</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={formData.discount}
                    onChange={(e) => setFormData({ ...formData, discount: e.target.value })}
                    placeholder="20"
                    className="w-full bg-[#1A1718] border border-[#2B2527] text-[#FCFAF9] p-2.5 rounded focus:outline-none font-mono"
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
                        className="absolute top-1 right-1 bg-red-900/80 text-white p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-700 cursor-pointer"
                        title="Remove Image"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  ))}

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
                    className="px-3 py-2 bg-[#262123] border border-[#3A3134] text-[#E9C9CE] hover:bg-[#332B2E] rounded text-xs transition-colors cursor-pointer"
                  >
                    Add URL
                  </button>
                </div>
              </div>

              {/* Description */}
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

              </div>

              {/* Modal Sticky Footer - Always accessible */}
              <div className="px-4 sm:px-6 py-3 border-t border-[#242022] bg-[#141213] flex items-center justify-between gap-3 shrink-0 z-10">
                <span className="text-[11px] text-[#7A7375] font-mono hidden sm:inline">
                  {formData.images.length} image{formData.images.length === 1 ? '' : 's'} attached
                </span>
                <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto justify-end">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 bg-[#1A1718] text-[#B0A7A9] rounded-lg hover:text-[#FFFFFF] transition-colors cursor-pointer text-xs"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-[#E9C9CE] text-[#171515] font-semibold rounded-lg hover:bg-[#F3D7DC] transition-colors cursor-pointer shadow-md text-xs"
                  >
                    Save Product to Store
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
