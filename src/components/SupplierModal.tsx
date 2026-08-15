import React, { useState } from 'react';
import { X, Sparkles, Building2, MapPin, Mail, Phone, Calendar, Star, FileText, Send, CheckCircle2, ArrowRight, MessageSquare, ShieldCheck, Award, Tag, Gift, Copy, Check, Globe, Shield, Package, PlusCircle, Edit2, Archive, LayoutGrid, List } from 'lucide-react';
import { SupplierPartner, Product } from '../types';
import { StarRating } from './StarRating';

interface SupplierModalProps {
  supplier: SupplierPartner | null;
  products: Product[];
  onClose: () => void;
  onSelectProduct: (product: Product) => void;
  onMessageSupplier?: (supplier: SupplierPartner) => void;
  currentUser?: any;
  onUpdateProducts?: (products: Product[]) => void;
  onEditProduct?: (product: Product) => void;
  onAddProduct?: () => void;
}

export const SupplierModal: React.FC<SupplierModalProps> = ({
  supplier,
  products,
  onClose,
  onSelectProduct,
  onMessageSupplier,
  currentUser,
  onUpdateProducts,
  onEditProduct,
  onAddProduct
}) => {
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [sampleRequested, setSampleRequested] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState('All');
  const [archiveConfirmProduct, setArchiveConfirmProduct] = useState<Product | null>(null);

  if (!supplier) return null;

  const isOwner = currentUser?.id === supplier.id;

  // Phase 9: Filter products for this supplier
  // Only show Published products publicly, unless owner is viewing
  const supplierProducts = products.filter((p) => {
    if (p.supplierId !== supplier.id) return false;
    
    const status = p.status || (p.stockStatus === 'Draft' ? 'Draft' : 'Published');
    if (isOwner) return true; // Owner sees all (Published, Draft, Archived)
    return status === 'Published'; // Public sees only Published
  });

  const availableCategories = ['All', ...Array.from(new Set(supplierProducts.map(p => p.categoryLabel || 'Other')))];

  const filteredProducts = supplierProducts.filter(p => 
    activeCategory === 'All' || (p.categoryLabel || 'Other') === activeCategory
  );

  const publishedCount = supplierProducts.filter(p => (p.status || (p.stockStatus === 'Draft' ? 'Draft' : 'Published')) === 'Published').length;

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    setSent(true);
    setTimeout(() => {
      setMessage('');
      setSent(false);
    }, 4000);
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2500);
  };

  const handleRequestSample = (productName: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSampleRequested(productName);
    setTimeout(() => setSampleRequested(null), 3000);
  };

  const handleUpdateAvailability = (product: Product, status: 'In Stock' | 'Out of Stock' | 'Available on Request') => {
    if (!onUpdateProducts) return;
    const updated = products.map(p => 
      p.id === product.id ? { ...p, stockStatus: status } : p
    );
    onUpdateProducts(updated);
  };

  const handleArchiveProduct = (product: Product) => {
    if (!onUpdateProducts) return;
    const updated = products.map(p => 
      p.id === product.id ? { ...p, status: 'Archived' as const } : p
    );
    onUpdateProducts(updated);
    setArchiveConfirmProduct(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/65 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl w-full max-w-5xl max-h-[92vh] overflow-y-auto shadow-2xl border border-[#EDEDED] relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white/90 hover:bg-[#FFF0F5] text-[#555] hover:text-[#B8005A] border border-[#E5E5E5] flex items-center justify-center transition-all shadow-xs cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Hero */}
        <div className="p-6 sm:p-8 bg-gradient-to-r from-[#FFF5F8] via-[#FFF0F5] to-white border-b border-[#F0E6EC]">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-white border-2 border-[#B8005A] text-[#B8005A] flex items-center justify-center font-bold text-xl shadow-md shrink-0 overflow-hidden">
                {supplier.logo ? (
                  <img src={supplier.logo} alt={supplier.name} className="w-full h-full object-cover" />
                ) : (
                  supplier.initials
                )}
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="text-xl sm:text-2xl font-bold text-[#1E1E1E]">{supplier.name}</h2>
                  {supplier.verified && (
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-black text-white uppercase tracking-wider bg-gradient-to-r from-[#B8005A] via-[#931248] to-[#1E1E1E] border border-[#FFD1E3] px-3 py-1 rounded-full shadow-sm">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#FFD700]" />
                      VERIFIED PARTNER
                    </span>
                  )}
                </div>
                <div className="flex flex-wrap items-center gap-3 text-xs text-[#737373] mt-1.5">
                  <span className="flex items-center gap-1 font-medium">
                    <Building2 className="w-3.5 h-3.5 text-[#B8005A]" />
                    {supplier.type}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-[#8E8E93]" />
                    {supplier.location}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-[#8E8E93]" />
                    Est. {supplier.establishedYear}
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Actions & Rating */}
            <div className="flex flex-wrap sm:flex-col items-center sm:items-end gap-2 text-xs w-full sm:w-auto justify-between">
              <div className="bg-white px-3.5 py-2 rounded-2xl border border-[#EDEDED] shadow-xs flex items-center gap-2">
                <StarRating
                  rating={supplier.rating}
                  reviewsCount={supplier.reviewsCount}
                  size="md"
                  showVerifiedBadge={true}
                />
              </div>
              <span className="text-[11px] text-[#10B981] font-semibold flex items-center gap-1">
                ⚡ {supplier.responseRate}
              </span>

              <div className="flex items-center gap-2 mt-1">
                <a
                  href={`tel:${supplier.phone}`}
                  className="bg-[#B8005A] hover:bg-[#A0004E] text-white px-3.5 py-2 rounded-xl font-bold text-xs shadow-xs hover:shadow flex items-center gap-1.5 transition-all active:scale-95 cursor-pointer"
                >
                  <Phone className="w-3.5 h-3.5 fill-current" />
                  <span>Call Supplier</span>
                </a>
                <a
                  href={`https://wa.me/${supplier.whatsapp.replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(supplier.name)},%20I%20am%20interested%20in%20your%20wholesale%20salon%20catalog.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#25D366] hover:bg-[#20bd5a] text-white px-3.5 py-2 rounded-xl font-bold text-xs shadow-xs hover:shadow flex items-center gap-1.5 transition-all active:scale-95 cursor-pointer"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          </div>

          <p className="mt-4 text-xs sm:text-sm text-[#525252] max-w-3xl leading-relaxed">
            {supplier.description}
          </p>

          {/* NEXORA LUXE VERIFIED PARTNER CERTIFICATION BANNER */}
          {supplier.verified && (
            <div className="mt-4 p-4 rounded-2xl bg-gradient-to-r from-[#1A1A1A] via-[#2D1B28] to-[#1A1A1A] border border-[#FFD1E3]/30 text-white shadow-lg relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#B8005A]/20 rounded-full blur-2xl pointer-events-none" />
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 relative z-10">
                <div className="flex items-start sm:items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#FFD700] to-[#B8005A] p-0.5 shrink-0 shadow-md">
                    <div className="w-full h-full bg-[#1A1A1A] rounded-[10px] flex items-center justify-center text-[#FFD700]">
                      <Award className="w-5 h-5" />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-black text-[#FFD700] uppercase tracking-wider">
                        Verified Partner Status
                      </span>
                      <span className="text-[10px] font-bold bg-[#B8005A] text-white px-2 py-0.5 rounded-full uppercase tracking-wider">
                        Nexora Luxe Standard
                      </span>
                    </div>
                    <p className="text-xs text-gray-300 mt-0.5">
                      Complies with Nexora Luxe B2B Quality Standards: ISO-audited facilities, 100% genuine backbar formulation guarantee, & escrow protection.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0 bg-white/10 backdrop-blur-md border border-white/15 px-3 py-1.5 rounded-xl text-xs font-bold text-white">
                  <ShieldCheck className="w-4 h-4 text-[#FFD700]" />
                  <span>Grade A+ Certified Supplier</span>
                </div>
              </div>

              <div className="mt-3 pt-3 border-t border-white/10 flex flex-wrap items-center gap-2 text-[11px] text-gray-300">
                <span className="text-[#FFD700] font-bold">Verification Seals:</span>
                <span className="bg-white/10 border border-white/15 px-2.5 py-0.5 rounded-lg flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-[#10B981]" /> ISO 22716 CGMP Audit
                </span>
                <span className="bg-white/10 border border-white/15 px-2.5 py-0.5 rounded-lg flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-[#10B981]" /> Authentic Salon Guarantee
                </span>
                <span className="bg-white/10 border border-white/15 px-2.5 py-0.5 rounded-lg flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-[#10B981]" /> Chemical Safety Verified
                </span>
                <span className="bg-white/10 border border-white/15 px-2.5 py-0.5 rounded-lg flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-[#10B981]" /> B2B Escrow Coverage
                </span>
              </div>
            </div>
          )}

          {/* Supplier Quality & Trust Badges */}
          <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-2 pt-3 border-t border-[#F0E6EC]">
            <div className="bg-white/80 p-2 rounded-xl border border-[#FFD6E5] text-center">
              <span className="text-[10px] text-[#8E8E93] block font-medium">Distributor Score</span>
              <span className="text-xs font-bold text-[#1E1E1E] flex items-center justify-center gap-1 mt-0.5">
                <Star className="w-3 h-3 text-[#F59E0B] fill-[#F59E0B]" />
                {supplier.rating.toFixed(1)} / 5.0
              </span>
            </div>
            <div className="bg-white/80 p-2 rounded-xl border border-[#FFD6E5] text-center">
              <span className="text-[10px] text-[#8E8E93] block font-medium">Fulfillment Rate</span>
              <span className="text-xs font-bold text-[#059669] block mt-0.5">99.4% On-Time</span>
            </div>
            <div className="bg-white/80 p-2 rounded-xl border border-[#FFD6E5] text-center">
              <span className="text-[10px] text-[#8E8E93] block font-medium">Formulation Quality</span>
              <span className="text-xs font-bold text-[#1E1E1E] block mt-0.5">100% Certified</span>
            </div>
            <div className="bg-white/80 p-2 rounded-xl border border-[#FFD6E5] text-center">
              <span className="text-[10px] text-[#8E8E93] block font-medium">Verified Reviews</span>
              <span className="text-xs font-bold text-[#B8005A] block mt-0.5">{supplier.reviewsCount} Pro Salons</span>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-2">
            <span className="text-xs text-[#8E8E93] font-medium mr-1">Specialties:</span>
            {supplier.tags?.map((tag) => (
              <span key={tag} className="text-xs font-semibold text-[#B8005A] bg-white border border-[#FFD1E3] px-2.5 py-1 rounded-lg">
                {tag}
              </span>
            ))}
            <span className="text-xs text-[#525252] bg-white border border-[#E5E5E5] px-2.5 py-1 rounded-lg ml-auto">
              Min. Order Value: <strong>₹{supplier.minOrderValue?.toLocaleString('en-IN') || '50,000'}</strong>
            </span>
          </div>
        </div>

        {/* CURRENT OFFERS SECTION */}
        <div className="px-6 sm:px-8 pt-6 pb-2 border-b border-[#F0E6EC]">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm sm:text-base font-extrabold text-[#1E1E1E] flex items-center gap-2">
              <Gift className="w-4 h-4 text-[#B8005A]" />
              <span>Active Wholesale Offers & Salon Discounts</span>
            </h3>
            <span className="text-[11px] font-semibold text-[#B8005A] bg-[#FFF0F5] px-2.5 py-0.5 rounded-full border border-[#FFD1E3]">
              Verified Partner Specials
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-gradient-to-br from-white to-[#FFF8FA] border border-[#FFD1E3] rounded-2xl p-4 relative overflow-hidden shadow-xs flex flex-col justify-between">
              <div className="absolute top-0 right-0 bg-[#B8005A] text-white px-2.5 py-0.5 rounded-bl-xl font-black text-[10px] tracking-wider uppercase">
                15% OFF
              </div>
              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-[#FFF0F5] text-[#B8005A] border border-[#FFD1E3] shrink-0 mt-1">
                  <Tag className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#1E1E1E]">Wholesale Bulk Offer</h4>
                  <p className="text-[11px] text-[#525252] mt-0.5">On orders above ₹2,50,000 across all professional skincare & backbar lines.</p>
                </div>
              </div>
              <div className="mt-3 pt-2.5 border-t border-[#F0E6EC] flex items-center justify-between">
                <button
                  onClick={() => handleCopyCode('BULK15')}
                  className="bg-white border border-[#E5E5E5] hover:border-[#B8005A] px-3 py-1 rounded-lg font-mono text-xs text-[#1E1E1E] font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  {copiedCode === 'BULK15' ? <Check className="w-3 h-3 text-[#10B981]" /> : <Copy className="w-3 h-3 text-[#8E8E93]" />}
                  <span>{copiedCode === 'BULK15' ? 'COPIED!' : 'BULK15'}</span>
                </button>
                <span className="text-[10px] text-[#8E8E93] font-medium">Valid till Nov 30</span>
              </div>
            </div>

            <div className="bg-gradient-to-br from-white to-[#FFF8FA] border border-[#FFD1E3] rounded-2xl p-4 relative overflow-hidden shadow-xs flex flex-col justify-between">
              <div className="absolute top-0 right-0 bg-[#B8005A] text-white px-2.5 py-0.5 rounded-bl-xl font-black text-[10px] tracking-wider uppercase">
                BUY 10 GET 2
              </div>
              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-[#FFF0F5] text-[#B8005A] border border-[#FFD1E3] shrink-0 mt-1">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#1E1E1E]">Seasonal Salon Discount</h4>
                  <p className="text-[11px] text-[#525252] mt-0.5">Buy 10 Hair Treatment Kits, Get 2 Free + Expedited Shipping Included.</p>
                </div>
              </div>
              <div className="mt-3 pt-2.5 border-t border-[#F0E6EC] flex items-center justify-between">
                <button
                  onClick={() => handleCopyCode('HAIRKIT10')}
                  className="bg-white border border-[#E5E5E5] hover:border-[#B8005A] px-3 py-1 rounded-lg font-mono text-xs text-[#1E1E1E] font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  {copiedCode === 'HAIRKIT10' ? <Check className="w-3 h-3 text-[#10B981]" /> : <Copy className="w-3 h-3 text-[#8E8E93]" />}
                  <span>{copiedCode === 'HAIRKIT10' ? 'COPIED!' : 'HAIRKIT10'}</span>
                </button>
                <span className="text-[10px] text-[#8E8E93] font-medium">Limited Time Offer</span>
              </div>
            </div>
          </div>
        </div>

        {/* Phase 9: Products & Catalogue Section */}
        <div className="p-6 sm:p-8 bg-white">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <h3 className="text-lg sm:text-xl font-black text-[#1E1E1E] flex items-center gap-2">
                <Package className="w-5 h-5 text-[#B8005A]" />
                <span>Products & Catalogue</span>
              </h3>
              <p className="text-xs text-[#737373] mt-1">
                <strong className="text-[#B8005A] font-extrabold">{publishedCount}</strong> Products Listed publicly on Nexora Luxe.
              </p>
            </div>

            <div className="flex items-center gap-3 overflow-x-auto pb-1 scrollbar-hide">
              {availableCategories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-[11px] font-bold transition-all border whitespace-nowrap cursor-pointer ${
                    activeCategory === cat
                      ? 'bg-[#B8005A] text-white border-[#B8005A] shadow-sm'
                      : 'bg-white text-[#737373] border-[#EAE5DE] hover:border-[#B8005A]/40 hover:text-[#B8005A]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {isOwner && onAddProduct && (
              <button
                onClick={onAddProduct}
                className="bg-[#B8005A] text-white px-4 py-2 rounded-xl text-xs font-bold shadow-xs hover:shadow transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
              >
                <PlusCircle className="w-4 h-4" />
                Add Product
              </button>
            )}
          </div>

          {filteredProducts.length === 0 ? (
            <div className="p-12 text-center bg-[#FAFAFA] rounded-3xl border-2 border-dashed border-[#EAE5DE]">
              <div className="w-16 h-16 bg-white text-gray-300 rounded-full flex items-center justify-center mx-auto mb-4 border border-[#EAE5DE]">
                <Package className="w-8 h-8" />
              </div>
              <h4 className="text-base font-bold text-[#1E1E1E]">Your product catalogue is empty.</h4>
              <p className="text-xs text-[#737373] mt-1 max-w-sm mx-auto">
                {isOwner 
                  ? "Add products to showcase your business to buyers across Nexora discovery."
                  : "This supplier hasn't listed any products in this category yet."}
              </p>
              {isOwner && onAddProduct && (
                <button
                  onClick={onAddProduct}
                  className="mt-6 bg-[#B8005A] text-white text-xs font-bold px-6 py-3 rounded-xl shadow-xs cursor-pointer inline-flex items-center gap-2"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>+ Add Product Listing</span>
                </button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((p) => {
                const status = p.status || (p.stockStatus === 'Draft' ? 'Draft' : 'Published');
                return (
                  <div
                    key={p.id}
                    onClick={() => onSelectProduct(p)}
                    className="bg-white rounded-2xl border border-[#EAE5DE] hover:border-[#B8005A]/40 overflow-hidden group cursor-pointer transition-all shadow-xs hover:shadow-md flex flex-col h-full"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <img
                        src={p.image}
                        alt={p.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-2 left-2 flex flex-col gap-1.5">
                        <span className={`px-2 py-0.5 rounded-lg text-[9px] font-black uppercase tracking-wider shadow-sm border ${
                          p.stockStatus === 'In Stock'
                            ? 'bg-emerald-500 text-white border-emerald-400'
                            : p.stockStatus === 'Out of Stock'
                            ? 'bg-rose-500 text-white border-rose-400'
                            : 'bg-amber-500 text-white border-amber-400'
                        }`}>
                          {p.stockStatus}
                        </span>
                        {isOwner && (
                          <span className={`px-2 py-0.5 rounded-lg text-[9px] font-black uppercase tracking-wider shadow-sm border ${
                            status === 'Published'
                              ? 'bg-white text-emerald-600 border-emerald-100'
                              : status === 'Draft'
                              ? 'bg-white text-amber-600 border-amber-100'
                              : 'bg-white text-gray-500 border-gray-100'
                          }`}>
                            {status}
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <div className="p-4 flex flex-col flex-1">
                      <div className="flex-1">
                        <div className="flex items-center gap-1.5 mb-1">
                          <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest truncate">{p.brand}</span>
                          <span className="w-1 h-1 rounded-full bg-gray-300 shrink-0" />
                          <span className="text-[9px] font-bold text-[#B8005A] uppercase tracking-widest truncate">{p.categoryLabel}</span>
                        </div>
                        <h4 className="text-sm font-bold text-[#1E1E1E] line-clamp-2 group-hover:text-[#B8005A] transition-colors mb-2">{p.name}</h4>
                      </div>

                      <div className="flex items-center justify-between pt-3 border-t border-[#F5F2EB] mt-auto">
                        <div>
                          <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">Wholesale Price</p>
                          <p className="text-sm font-black text-[#1A1A1A]">₹{p.price.toLocaleString('en-IN')}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-[9px] text-gray-300 font-bold uppercase tracking-widest">Min. Order</p>
                          <p className="text-xs font-bold text-[#4A4A4A]">{p.moq} {p.unit}</p>
                        </div>
                      </div>

                      {isOwner && (
                        <div className="grid grid-cols-2 gap-2 mt-4 pt-3 border-t border-[#F5F2EB]">
                          <div className="col-span-2 grid grid-cols-2 gap-2 mb-2">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                const nextStatus = p.stockStatus === 'In Stock' ? 'Out of Stock' : 'In Stock';
                                handleUpdateAvailability(p, nextStatus as any);
                              }}
                              className="py-1.5 bg-white border border-[#EAE5DE] hover:border-[#B8005A] text-[#737373] hover:text-[#B8005A] rounded-xl text-[9px] font-black uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-1"
                            >
                              Status: {p.stockStatus}
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                navigator.clipboard.writeText(`https://nexora.luxe/product/${p.id}`);
                                alert('Product link copied to clipboard!');
                              }}
                              className="py-1.5 bg-white border border-[#EAE5DE] hover:border-[#B8005A] text-[#737373] hover:text-[#B8005A] rounded-xl text-[9px] font-black uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-1"
                            >
                              <Copy className="w-2.5 h-2.5" /> Share
                            </button>
                          </div>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onEditProduct?.(p);
                            }}
                            className="py-2 bg-[#FAF8F5] border border-[#EAE5DE] hover:border-[#B8005A] text-[#4A4A4A] hover:text-[#B8005A] rounded-xl text-[10px] font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                          >
                            <Edit2 className="w-3 h-3" /> Edit
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setArchiveConfirmProduct(p);
                            }}
                            className="py-2 bg-white border border-[#EAE5DE] hover:border-rose-300 text-[#737373] hover:text-rose-600 rounded-xl text-[10px] font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                          >
                            <Archive className="w-3 h-3" /> Archive
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Business Details & Trust Section */}
        <div className="p-6 sm:p-8 bg-[#FAFAFA] grid grid-cols-1 lg:grid-cols-12 gap-8 border-t border-[#F0E6EC]">
          {/* Left: Supplier Credentials */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <h4 className="text-sm font-black text-[#1E1E1E] uppercase tracking-wider mb-4 flex items-center gap-2">
                <Shield className="w-5 h-5 text-[#B8005A]" />
                <span>Verified Business Credentials</span>
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-4 bg-white rounded-2xl border border-[#EDEDED] flex items-center gap-4 shadow-xs">
                  <div className="w-12 h-12 rounded-xl bg-[#FFF0F5] text-[#B8005A] flex items-center justify-center border border-[#FFD1E3] shrink-0">
                    <Award className="w-6 h-6" />
                  </div>
                  <div>
                    <strong className="text-[#1E1E1E] block font-bold text-sm">ISO 9001:2015</strong>
                    <span className="text-[#737373] text-[11px]">Quality Management Certified Facility</span>
                  </div>
                </div>

                <div className="p-4 bg-white rounded-2xl border border-[#EDEDED] flex items-center gap-4 shadow-xs">
                  <div className="w-12 h-12 rounded-xl bg-[#FFF0F5] text-[#B8005A] flex items-center justify-center border border-[#FFD1E3] shrink-0">
                    <Calendar className="w-6 h-6" />
                  </div>
                  <div>
                    <strong className="text-[#1E1E1E] block font-bold text-sm">{new Date().getFullYear() - (supplier.establishedYear || 2010)}+ Years Pro</strong>
                    <span className="text-[#737373] text-[11px]">Established in {supplier.establishedYear || 2010}</span>
                  </div>
                </div>

                <div className="p-4 bg-white rounded-2xl border border-[#EDEDED] flex items-center gap-4 shadow-xs">
                  <div className="w-12 h-12 rounded-xl bg-[#FFF0F5] text-[#B8005A] flex items-center justify-center border border-[#FFD1E3] shrink-0">
                    <Globe className="w-6 h-6" />
                  </div>
                  <div>
                    <strong className="text-[#1E1E1E] block font-bold text-sm">Pan-India Network</strong>
                    <span className="text-[#737373] text-[11px]">Supplying major salon hubs nationwide</span>
                  </div>
                </div>

                <div className="p-4 bg-white rounded-2xl border border-[#EDEDED] flex items-center gap-4 shadow-xs">
                  <div className="w-12 h-12 rounded-xl bg-[#FFF0F5] text-[#B8005A] flex items-center justify-center border border-[#FFD1E3] shrink-0">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div>
                    <strong className="text-[#1E1E1E] block font-bold text-sm">Authorized OEM</strong>
                    <span className="text-[#737373] text-[11px]">Direct manufacturing & distribution rights</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-5 rounded-2xl border border-[#EDEDED] shadow-xs">
              <h4 className="text-xs font-black text-[#1E1E1E] uppercase tracking-wider mb-3">About {supplier.name}</h4>
              <p className="text-xs text-[#525252] leading-relaxed">
                {supplier.description} Our professional formulation lab is dedicated to the Nexora Luxe B2B quality standard, ensuring every shipment meets ISO-audited excellence. We specialize in high-performance backbar solutions for luxury salons and spas.
              </p>
            </div>
          </div>

          {/* Right: Direct Wholesale Enquiry */}
          <div className="lg:col-span-5">
            <div className="bg-white p-6 rounded-3xl border border-[#B8005A]/20 shadow-lg flex flex-col justify-between sticky top-6">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-[#FFF0F5] text-[#B8005A] flex items-center justify-center border border-[#FFD1E3]">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-[#1E1E1E]">Direct Supplier Inquiry</h3>
                    <p className="text-[11px] text-[#737373]">Response time: ⚡ {supplier.responseRate}</p>
                  </div>
                </div>

                <form onSubmit={handleSendMessage} className="space-y-4">
                  <div>
                    <label className="text-[11px] font-bold text-[#525252] uppercase tracking-wider">Project / Inquiry Details</label>
                    <textarea
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Specify your requirements (MOQ, custom labeling, pricing terms)..."
                      className="mt-1.5 w-full bg-[#FAF8F5] border border-[#EAE5DE] rounded-2xl p-4 text-xs text-[#1E1E1E] focus:outline-none focus:border-[#B8005A] transition-all resize-none"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    <button
                      type="submit"
                      className="w-full bg-[#1E1E1E] hover:bg-black text-white py-3 rounded-2xl text-xs font-bold shadow-sm hover:shadow transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Send className="w-4 h-4" />
                      <span>Send Inquiry</span>
                    </button>

                    {onMessageSupplier && (
                      <button
                        type="button"
                        onClick={() => {
                          onClose();
                          onMessageSupplier(supplier);
                        }}
                        className="w-full bg-[#FFF0F5] hover:bg-[#FFE4EE] text-[#B8005A] border border-[#FFD1E3] py-3 rounded-2xl text-xs font-bold shadow-sm transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <MessageSquare className="w-4 h-4" />
                        <span>Live Chat</span>
                      </button>
                    )}
                  </div>
                </form>

                {sent && (
                  <div className="mt-4 p-4 rounded-2xl bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs font-bold flex items-center gap-3 animate-in fade-in slide-in-from-top-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                    <span>Inquiry dispatched! The {supplier.name} sales team will contact you shortly.</span>
                  </div>
                )}
              </div>

              <div className="mt-6 pt-5 border-t border-[#F0E6EC] text-[10px] text-[#8E8E93] flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-[#B8005A] shrink-0" />
                <p>Distributor contracts on Nexora Luxe are protected by B2B Quality Guarantees & Escrow terms.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Archive Confirmation Modal */}
        {archiveConfirmProduct && (
          <div className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl w-full max-w-md p-6 sm:p-8 shadow-2xl border border-[#E8E8E8] animate-in zoom-in-95 duration-200">
              <div className="w-16 h-16 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Archive className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-black text-[#1C1B1B] text-center mb-2">Archive Product Listing?</h3>
              <p className="text-gray-500 text-sm text-center mb-8">
                Are you sure you want to archive <span className="font-bold text-[#1C1B1B]">"{archiveConfirmProduct.name}"</span>? 
                It will no longer appear in public discovery.
              </p>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setArchiveConfirmProduct(null)}
                  className="w-full py-3.5 bg-[#FAF8F5] text-[#594047] font-bold rounded-2xl border border-[#EAE5DE] hover:bg-[#FDFBF9] transition-all cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleArchiveProduct(archiveConfirmProduct)}
                  className="w-full py-3.5 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-2xl shadow-sm transition-all cursor-pointer"
                >
                  Archive Listing
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

