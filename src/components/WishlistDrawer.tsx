import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Heart, Trash2, ShoppingBag, ArrowRight, Sparkles, ShieldCheck, ExternalLink } from 'lucide-react';
import { Product } from '../types';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlistIds: string[];
  products: Product[];
  onToggleWishlist: (productId: string) => void;
  onClearWishlist: () => void;
  onSelectProduct: (product: Product) => void;
  onAddToQuote: (product: Product, quantity?: number) => void;
  onExploreCatalog: () => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  wishlistIds,
  products,
  onToggleWishlist,
  onClearWishlist,
  onSelectProduct,
  onAddToQuote,
  onExploreCatalog,
}) => {
  const wishlistedProducts = products.filter((p) => wishlistIds.includes(p.id));

  const handleAddAllToQuote = () => {
    wishlistedProducts.forEach((p) => {
      onAddToQuote(p, p.moq || 1);
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: 'easeInOut' }}
          onClick={onClose}
          className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs"
        >
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300, mass: 0.8 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white w-full max-w-lg h-full shadow-2xl flex flex-col justify-between border-l border-[#EDEDED] relative overflow-hidden"
          >
            {/* Top Header */}
            <div className="p-6 border-b border-[#F0E6EC] bg-gradient-to-r from-[#FFF5F8] to-white flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-2xl bg-[#FFF0F5] border border-[#FFD1E3] flex items-center justify-center text-[#B8005A] shadow-xs">
                  <Heart className="w-5 h-5 fill-[#B8005A]" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#1E1E1E] flex items-center gap-2">
                    Favorite Products
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-[#FFF0F5] text-[#B8005A] border border-[#FFD1E3]">
                      {wishlistedProducts.length}
                    </span>
                  </h3>
                  <p className="text-xs text-[#737373]">Curated wholesale picks saved for quick quotation</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {wishlistedProducts.length > 0 && (
                  <button
                    onClick={onClearWishlist}
                    className="p-2 text-[#8E8E93] hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all cursor-pointer text-xs font-semibold"
                    title="Clear Wishlist"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
                <button
                  onClick={onClose}
                  className="w-8 h-8 rounded-full border border-[#E5E5E5] flex items-center justify-center text-[#555] hover:text-[#B8005A] hover:bg-[#FFF0F5] transition-colors cursor-pointer"
                  aria-label="Close Wishlist"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Content List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {wishlistedProducts.length === 0 ? (
                <div className="py-20 flex flex-col items-center justify-center text-center px-4">
                  <div className="w-16 h-16 rounded-3xl bg-[#FFF0F5] border border-[#FFD1E3] flex items-center justify-center text-[#B8005A] mb-4 shadow-xs">
                    <Heart className="w-8 h-8 stroke-1 text-[#B8005A]" />
                  </div>
                  <h4 className="text-base font-bold text-[#1E1E1E]">Your Wishlist is Empty</h4>
                  <p className="text-xs text-[#737373] mt-1.5 max-w-xs leading-relaxed">
                    Click the heart icon on any wholesale luxury product or trending card to bookmark items here for batch quote requests.
                  </p>
                  <button
                    onClick={() => {
                      onClose();
                      onExploreCatalog();
                    }}
                    className="mt-6 bg-[#B8005A] hover:bg-[#A0004E] text-white text-xs font-bold px-5 py-2.5 rounded-xl shadow-md transition-all active:scale-95 cursor-pointer flex items-center gap-2"
                  >
                    <span>Browse Wholesale Catalog</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  {wishlistedProducts.map((product) => (
                    <motion.div
                      layout
                      key={product.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="bg-[#FCFCFA] hover:bg-white border border-[#EAE5DE] hover:border-[#FFD1E3] rounded-2xl p-3.5 transition-all shadow-2xs hover:shadow-md flex gap-3.5 group"
                    >
                      {/* Thumbnail */}
                      <div
                        onClick={() => {
                          onClose();
                          onSelectProduct(product);
                        }}
                        className="w-20 h-20 rounded-xl bg-gray-100 overflow-hidden shrink-0 relative cursor-pointer"
                      >
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        {product.isVerified && (
                          <div className="absolute top-1 left-1 bg-[#B8005A] text-white p-0.5 rounded-md shadow-xs">
                            <ShieldCheck className="w-2.5 h-2.5" />
                          </div>
                        )}
                      </div>

                      {/* Info & Actions */}
                      <div className="flex-1 flex flex-col justify-between min-w-0">
                        <div>
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-[#8E8E93] truncate">
                              {product.brand}
                            </span>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                onToggleWishlist(product.id);
                              }}
                              className="text-rose-500 hover:text-rose-700 p-1 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                              title="Remove from favorites"
                            >
                              <Heart className="w-4 h-4 fill-rose-500 text-rose-500" />
                            </button>
                          </div>

                          <h4
                            onClick={() => {
                              onClose();
                              onSelectProduct(product);
                            }}
                            className="text-xs font-bold text-[#1E1E1E] hover:text-[#B8005A] transition-colors truncate cursor-pointer mt-0.5"
                          >
                            {product.name}
                          </h4>

                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-[10px] font-semibold text-[#10B981] bg-[#E8F8F2] px-2 py-0.5 rounded-md">
                              {product.stockStatus || 'In Stock'}
                            </span>
                            <span className="text-[10px] text-[#737373]">
                              MOQ: {product.moq} {product.unit}
                            </span>
                          </div>
                        </div>

                        {/* Price & Add to Quote row */}
                        <div className="flex items-center justify-between mt-2.5 pt-2 border-t border-[#F0E6EC]">
                          <div>
                            <span className="text-xs font-extrabold text-[#1E1E1E]">
                              ₹{product.price.toLocaleString('en-IN')}
                            </span>
                            <span className="text-[10px] text-[#8E8E93]"> / {product.unit}</span>
                          </div>

                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              onAddToQuote(product, product.moq || 1);
                            }}
                            className="bg-[#FFF0F5] hover:bg-[#B8005A] text-[#B8005A] hover:text-white border border-[#FFD1E3] hover:border-transparent px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs"
                          >
                            <ShoppingBag className="w-3 h-3" />
                            <span>Add to RFQ</span>
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Bottom Actions Bar */}
            {wishlistedProducts.length > 0 && (
              <div className="p-5 border-t border-[#F0E6EC] bg-white flex flex-col gap-2.5 shrink-0">
                <div className="flex items-center justify-between text-xs text-[#737373] px-1">
                  <span>Total Saved Products:</span>
                  <span className="font-bold text-[#1E1E1E]">{wishlistedProducts.length} items</span>
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  <button
                    onClick={handleAddAllToQuote}
                    className="w-full bg-[#B8005A] hover:bg-[#A0004E] text-white text-xs font-bold py-2.5 px-3 rounded-xl transition-all shadow-md active:scale-95 cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Add All to RFQ</span>
                  </button>

                  <button
                    onClick={() => {
                      onClose();
                      onExploreCatalog();
                    }}
                    className="w-full bg-[#FAFAFA] hover:bg-[#F0E6EC] text-[#1E1E1E] border border-[#EAE5DE] text-xs font-bold py-2.5 px-3 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <span>View in Catalog</span>
                    <ExternalLink className="w-3.5 h-3.5 text-[#737373]" />
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
