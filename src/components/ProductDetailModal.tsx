import React, { useState, useEffect } from 'react';
import { X, Sparkles, Building2, MapPin, CheckCircle2, ShieldCheck, Truck, Plus, Minus, FileText, MessageSquare, Bell, BellRing, Star, Zap } from 'lucide-react';
import { Product, SupplierPartner } from '../types';
import { StarRating } from './StarRating';

interface ProductDetailModalProps {
  product: Product | null;
  supplier?: SupplierPartner;
  isPriceAlertEnabled?: boolean;
  onClose: () => void;
  onAddToQuote: (product: Product, quantity: number) => void;
  onViewSupplier: (supplier: SupplierPartner) => void;
  onMessageSupplier?: (supplier: SupplierPartner | string, product?: Product) => void;
  onTogglePriceAlert?: (product: Product, enabled: boolean) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  supplier,
  isPriceAlertEnabled = false,
  onClose,
  onAddToQuote,
  onViewSupplier,
  onMessageSupplier,
  onTogglePriceAlert
}) => {
  const [quantity, setQuantity] = useState(product?.moq || 10);
  const [selectedImage, setSelectedImage] = useState(product?.image || '');
  const [sampleRequested, setSampleRequested] = useState(false);
  const [activeTab, setActiveTab] = useState<'specs' | 'tiers' | 'reviews' | 'shipping'>('specs');
  const [priceAlertActive, setPriceAlertActive] = useState(isPriceAlertEnabled);

  useEffect(() => {
    if (product) {
      setQuantity(product.moq || 10);
      setSelectedImage(product.image);
    }
  }, [product?.id, product?.moq, product?.image]);

  useEffect(() => {
    setPriceAlertActive(isPriceAlertEnabled);
  }, [isPriceAlertEnabled, product?.id]);

  if (!product) return null;

  const handleToggleAlert = () => {
    const newState = !priceAlertActive;
    setPriceAlertActive(newState);
    if (onTogglePriceAlert) {
      onTogglePriceAlert(product, newState);
    }
  };

  // Calculate current tier price
  const getTierPrice = (qty: number) => {
    if (!product.wholesaleTiers || product.wholesaleTiers.length === 0) {
      return product.price;
    }
    const matchingTiers = [...product.wholesaleTiers]
      .filter((t) => qty >= t.minUnits)
      .sort((a, b) => b.minUnits - a.minUnits);

    return matchingTiers.length > 0 ? matchingTiers[0].pricePerUnit : product.price;
  };

  const currentUnitPrice = getTierPrice(quantity);
  const totalPrice = currentUnitPrice * quantity;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/65 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl border border-[#EDEDED] relative flex flex-col">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white/90 hover:bg-[#FFF0F5] text-[#555] hover:text-[#B8005A] border border-[#E5E5E5] flex items-center justify-center transition-all shadow-xs cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 p-6 sm:p-8">
          {/* Left Column: Image Gallery */}
          <div className="md:col-span-6 flex flex-col gap-4">
            <div className="relative w-full aspect-square bg-[#F8F8F8] rounded-2xl overflow-hidden border border-[#EDEDED]">
              <img
                src={selectedImage}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                <span className="bg-white/90 backdrop-blur-md text-[#1E1E1E] text-xs font-semibold px-3 py-1 rounded-full shadow-xs">
                  {product.tag}
                </span>
                {product.isVerified && (
                  <span className="bg-[#B8005A] text-white text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    VERIFIED
                  </span>
                )}
              </div>
            </div>

            {/* Gallery Thumbnails */}
            {product.gallery && product.gallery.length > 1 && (
              <div className="flex items-center gap-2">
                {product.gallery.map((imgUrl, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(imgUrl)}
                    className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                      selectedImage === imgUrl ? 'border-[#B8005A] ring-2 ring-[#FFD1E3]' : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={imgUrl} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Supplier Info Box */}
            <div className="mt-2 p-4 rounded-2xl bg-[#FFF9FB] border border-[#FFD6E5] flex flex-col gap-2.5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <span className="text-[10px] uppercase font-bold text-[#B8005A] tracking-wider">
                    Verified Supplier
                  </span>
                  <h4 className="text-sm font-bold text-[#1E1E1E]">{product.supplierName}</h4>
                  <p className="text-xs text-[#737373] flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3 h-3 text-[#B8005A]" />
                    {product.supplierLocation}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  {onMessageSupplier && (
                    <button
                      onClick={() => {
                        onClose();
                        onMessageSupplier(supplier || product.supplierId, product);
                      }}
                      className="text-xs font-bold text-[#B8005A] bg-white hover:bg-[#FFF0F5] border border-[#FFD1E3] px-3 py-1.5 rounded-xl flex items-center gap-1 transition-all shadow-2xs cursor-pointer"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>Message</span>
                    </button>
                  )}

                  {supplier && (
                    <button
                      onClick={() => {
                        onClose();
                        onViewSupplier(supplier);
                      }}
                      className="text-xs font-bold text-[#737373] hover:text-[#B8005A] underline cursor-pointer"
                    >
                      Profile
                    </button>
                  )}
                </div>
              </div>

              {/* Distributor Star Rating Row */}
              <div className="pt-2 border-t border-[#FFE5EE] flex items-center justify-between">
                <StarRating
                  rating={supplier?.rating || 4.9}
                  reviewsCount={supplier?.reviewsCount || 74}
                  size="xs"
                  label="Distributor Rating"
                  compact={true}
                  showVerifiedBadge={true}
                />
              </div>
            </div>
          </div>

          {/* Right Column: Product Details & Wholesale Config */}
          <div className="md:col-span-6 flex flex-col justify-between">
            <div>
              {/* Brand & Category */}
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-bold text-[#8E8E93] uppercase tracking-wider">
                  {product.brand}
                </span>
                <span className="text-xs font-bold text-[#B8005A] bg-[#FFF0F5] px-2.5 py-0.5 rounded-full border border-[#FFD1E3]">
                  {product.categoryLabel}
                </span>
              </div>

              {/* Title */}
              <h2 className="text-2xl sm:text-3xl font-bold text-[#1E1E1E] tracking-tight leading-snug">
                {product.name}
              </h2>

              {/* Star Rating for Product */}
              <div className="mt-2 flex items-center gap-3">
                <StarRating
                  rating={product.rating || 4.9}
                  reviewsCount={product.reviewsCount || 48}
                  size="sm"
                  showVerifiedBadge={true}
                />
              </div>

              {/* Price Banner */}
              <div className="mt-4 p-4 rounded-2xl bg-[#F8F9FA] border border-[#EDEDED] flex items-baseline justify-between">
                <div>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-3xl font-extrabold text-[#1E1E1E]">
                      ${currentUnitPrice.toFixed(2)}
                    </span>
                    <span className="text-sm text-[#737373] font-medium">
                      / {product.unit}
                    </span>
                  </div>
                  <span className="text-xs text-[#10B981] font-semibold mt-0.5 block">
                    ● {product.stockStatus} • Lead Time: {product.leadTimeDays} days
                  </span>
                </div>

                <div className="text-right">
                  <span className="text-xs text-[#8E8E93] font-medium block">Minimum Order</span>
                  <span className="text-sm font-bold text-[#1E1E1E]">{product.moq} {product.unit}s</span>
                </div>
              </div>

              {/* Notify me of price changes Toggle */}
              <div className={`mt-3 p-3.5 rounded-2xl border transition-all flex items-center justify-between gap-3 ${
                priceAlertActive
                  ? 'bg-[#FFF5F8] border-[#FFD1E3] shadow-2xs'
                  : 'bg-[#FAFAFA] border-[#EDEDED]'
              }`}>
                <div className="flex items-center gap-3 min-w-0">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                    priceAlertActive
                      ? 'bg-[#B8005A] text-white shadow-2xs'
                      : 'bg-white text-[#737373] border border-[#E5E5E5]'
                  }`}>
                    {priceAlertActive ? (
                      <BellRing className="w-4 h-4 animate-in zoom-in duration-200" />
                    ) : (
                      <Bell className="w-4 h-4" />
                    )}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs sm:text-sm font-bold text-[#1E1E1E] truncate">
                        Notify me of price changes
                      </span>
                      {priceAlertActive && (
                        <span className="text-[10px] font-bold text-[#B8005A] bg-[#FFF0F5] border border-[#FFD1E3] px-2 py-0.5 rounded-full uppercase tracking-wider shrink-0">
                          Active Alert
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-[#737373] leading-tight mt-0.5 line-clamp-1">
                      {priceAlertActive
                        ? 'Alert active: You will be notified of tier rate reductions & discounts'
                        : 'Get instant notifications when wholesale volume rates or prices drop'}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  role="switch"
                  aria-checked={priceAlertActive}
                  onClick={handleToggleAlert}
                  className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                    priceAlertActive ? 'bg-[#B8005A]' : 'bg-[#D1D5DB]'
                  }`}
                  aria-label="Toggle price change notifications"
                >
                  <span
                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                      priceAlertActive ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              {/* Description */}
              <p className="mt-4 text-sm text-[#525252] leading-relaxed">
                {product.description}
              </p>

              {/* Tabs: Specifications / Wholesale Tiers / Ratings & Reviews / Certifications */}
              <div className="mt-6 border-b border-[#F0F0F0] flex flex-wrap gap-4 text-xs font-bold uppercase tracking-wider">
                <button
                  onClick={() => setActiveTab('specs')}
                  className={`pb-2 transition-colors relative cursor-pointer ${
                    activeTab === 'specs' ? 'text-[#B8005A]' : 'text-[#8E8E93] hover:text-[#1E1E1E]'
                  }`}
                >
                  Specifications
                  {activeTab === 'specs' && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#B8005A]" />}
                </button>
                <button
                  onClick={() => setActiveTab('tiers')}
                  className={`pb-2 transition-colors relative cursor-pointer ${
                    activeTab === 'tiers' ? 'text-[#B8005A]' : 'text-[#8E8E93] hover:text-[#1E1E1E]'
                  }`}
                >
                  Bulk Tier Pricing
                  {activeTab === 'tiers' && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#B8005A]" />}
                </button>
                <button
                  onClick={() => setActiveTab('reviews')}
                  className={`pb-2 transition-colors relative cursor-pointer flex items-center gap-1.5 ${
                    activeTab === 'reviews' ? 'text-[#B8005A]' : 'text-[#8E8E93] hover:text-[#1E1E1E]'
                  }`}
                >
                  <span>Ratings & Reviews</span>
                  <span className="text-[10px] bg-[#FFF0F5] text-[#B8005A] font-bold px-1.5 py-0.2 rounded-full border border-[#FFD1E3]">
                    {(product.rating || 4.9).toFixed(1)} ★
                  </span>
                  {activeTab === 'reviews' && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#B8005A]" />}
                </button>
                <button
                  onClick={() => setActiveTab('shipping')}
                  className={`pb-2 transition-colors relative cursor-pointer ${
                    activeTab === 'shipping' ? 'text-[#B8005A]' : 'text-[#8E8E93] hover:text-[#1E1E1E]'
                  }`}
                >
                  Certifications
                  {activeTab === 'shipping' && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#B8005A]" />}
                </button>
              </div>

              {/* Tab Content */}
              <div className="mt-4 min-h-[110px]">
                {activeTab === 'specs' && (
                  <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs">
                    {Object.entries(product.specifications).map(([key, val]) => (
                      <div key={key} className="bg-[#FAFAFA] p-2 rounded-lg border border-[#F0F0F0]">
                        <dt className="text-[#8E8E93] font-medium">{key}</dt>
                        <dd className="font-semibold text-[#1E1E1E] mt-0.5">{val}</dd>
                      </div>
                    ))}
                  </dl>
                )}

                {activeTab === 'tiers' && (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                    {product.wholesaleTiers?.map((tier, idx) => (
                      <div
                        key={idx}
                        className={`p-2.5 rounded-xl border text-center transition-all ${
                          quantity >= tier.minUnits
                            ? 'bg-[#FFF0F5] border-[#B8005A] text-[#B8005A]'
                            : 'bg-white border-[#E5E5E5] text-[#555]'
                        }`}
                      >
                        <span className="font-bold text-sm block">${tier.pricePerUnit.toFixed(2)}</span>
                        <span className="text-[10px] text-[#737373]">{tier.minUnits}+ units</span>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === 'reviews' && (
                  <div className="space-y-3">
                    <div className="p-3.5 bg-[#FAFAFA] rounded-xl border border-[#EDEDED] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-2xl font-bold text-[#1E1E1E]">{(product.rating || 4.9).toFixed(1)}</span>
                          <div>
                            <StarRating rating={product.rating || 4.9} showCount={false} showNumber={false} size="sm" />
                            <span className="text-[11px] text-[#8E8E93]">Based on {product.reviewsCount || 48} verified salon orders</span>
                          </div>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-[11px] w-full sm:w-auto">
                        <div className="bg-white px-2.5 py-1.5 rounded-lg border border-[#EAEAEA] flex items-center justify-between gap-2">
                          <span className="text-[#737373]">Formulation:</span>
                          <span className="font-bold text-[#10B981]">5.0 ★</span>
                        </div>
                        <div className="bg-white px-2.5 py-1.5 rounded-lg border border-[#EAEAEA] flex items-center justify-between gap-2">
                          <span className="text-[#737373]">Packaging:</span>
                          <span className="font-bold text-[#10B981]">4.9 ★</span>
                        </div>
                      </div>
                    </div>

                    {/* Sample Verified Reviews */}
                    <div className="space-y-2 text-xs">
                      <div className="p-3 bg-white rounded-xl border border-[#EFEFEF]">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-[#1E1E1E]">Maison de Beauté (Paris)</span>
                            <span className="text-[10px] bg-[#ECFDF5] text-[#059669] font-semibold px-2 py-0.5 rounded-md border border-[#A7F3D0]">
                              Verified Salon Buyer
                            </span>
                          </div>
                          <StarRating rating={5} showCount={false} showNumber={false} size="xs" />
                        </div>
                        <p className="text-[#555] text-[11px] mt-1">
                          "Exceptional batch purity and consistent results on our clientele. Fast pallet freight with zero breakage."
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'shipping' && (
                  <div className="flex flex-wrap gap-2">
                    {product.certifications.map((cert) => (
                      <span
                        key={cert}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-[#1E1E1E] bg-[#FAFAFA] border border-[#EDEDED] px-3 py-1.5 rounded-lg"
                      >
                        <ShieldCheck className="w-4 h-4 text-[#10B981]" />
                        {cert}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Bottom Actions: Quantity Stepper & Add to Quote */}
            <div className="mt-6 pt-6 border-t border-[#F0F0F0] space-y-3">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center border border-[#E5E5E5] rounded-xl p-1 bg-white">
                  <button
                    onClick={() => setQuantity(Math.max(product.moq, quantity - (quantity > 50 ? 10 : 5)))}
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-[#555] hover:bg-[#F5F5F5] transition-colors cursor-pointer"
                    disabled={quantity <= product.moq}
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-14 text-center text-sm font-bold text-[#1E1E1E]">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + (quantity >= 50 ? 10 : 5))}
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-[#555] hover:bg-[#F5F5F5] transition-colors cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="text-right flex-1">
                  <span className="text-xs text-[#8E8E93]">Estimated Total ({quantity} {product.unit}s)</span>
                  <div className="text-lg sm:text-xl font-bold text-[#1E1E1E]">
                    ${totalPrice.toFixed(2)}
                  </div>
                </div>
              </div>

              {/* Main Action Buttons: Quick Buy (Standard MOQ) & Custom Quantity Quote */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <button
                  onClick={() => {
                    onAddToQuote(product, product.moq);
                    onClose();
                  }}
                  className="bg-gradient-to-r from-[#B8005A] to-[#D9006C] hover:from-[#A0004E] hover:to-[#B8005A] text-white py-3 px-4 rounded-xl text-xs font-bold shadow-md hover:shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer group"
                  title={`Immediately add standard Minimum Order Quantity (${product.moq} ${product.unit}s) to quote`}
                >
                  <Zap className="w-4 h-4 fill-amber-300 text-amber-300 group-hover:scale-110 transition-transform" />
                  <span>Quick Buy ({product.moq} {product.unit}s MOQ)</span>
                </button>

                <button
                  onClick={() => {
                    onAddToQuote(product, quantity);
                    onClose();
                  }}
                  className="bg-white hover:bg-[#FFF0F5] text-[#B8005A] border-2 border-[#B8005A] py-3 px-4 rounded-xl text-xs font-bold shadow-2xs hover:shadow-md transition-all active:scale-95 flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add {quantity} Units to RFQ</span>
                </button>
              </div>

              {/* Secondary Supplier Communication Actions */}
              <div className="grid grid-cols-2 gap-2.5 pt-1">
                {onMessageSupplier && (
                  <button
                    onClick={() => {
                      onClose();
                      onMessageSupplier(supplier || product.supplierId, product);
                    }}
                    className="py-2.5 px-3 rounded-xl text-xs font-bold border border-[#FFD1E3] bg-[#FFF0F5] hover:bg-[#FFE5EE] text-[#B8005A] transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-2xs active:scale-95"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Message Supplier</span>
                  </button>
                )}

                <button
                  onClick={() => {
                    setSampleRequested(true);
                    setTimeout(() => setSampleRequested(false), 3000);
                  }}
                  className={`py-2.5 px-3 rounded-xl text-xs font-bold border transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                    !onMessageSupplier ? 'col-span-2' : ''
                  } ${
                    sampleRequested
                      ? 'bg-[#10B981] text-white border-[#10B981]'
                      : 'bg-white hover:bg-[#F9F9F9] text-[#525252] border-[#E5E5E5]'
                  }`}
                >
                  {sampleRequested ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Sample Requested</span>
                    </>
                  ) : (
                    <>
                      <FileText className="w-3.5 h-3.5" />
                      <span>Request Sample</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
