import React, { useState } from 'react';
import { Navbar, NavTab } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ExploreCategories } from './components/ExploreCategories';
import { PremiumPartners } from './components/PremiumPartners';
import { TrendingCatalog } from './components/TrendingCatalog';
import { ListBusinessBanner } from './components/ListBusinessBanner';
import { Footer } from './components/Footer';

// Modals and Drawers
import { ProductDetailModal } from './components/ProductDetailModal';
import { SupplierModal } from './components/SupplierModal';
import { SupplierChatModal } from './components/SupplierChatModal';
import { RegisterWizardModal } from './components/RegisterWizardModal';
import { AuthModal } from './components/AuthModal';
import { CitySelectorModal } from './components/CitySelectorModal';
import { QuoteDrawer } from './components/QuoteDrawer';
import { CompareModal } from './components/CompareModal';
import { CompareFloatingBar } from './components/CompareFloatingBar';
import { VideoPlayerModal } from './components/VideoPlayerModal';
import { SubmitVideoModal } from './components/SubmitVideoModal';
import { UploadGalleryModal } from './components/UploadGalleryModal';

// Views
import { CatalogView } from './views/CatalogView';
import { BrandsView } from './views/BrandsView';
import { DistributorsView } from './views/DistributorsView';
import { BusinessView } from './views/BusinessView';
import { OffersView } from './views/OffersView';
import { GalleryView } from './components/GalleryView';
import { OwnerGalleryModeration } from './components/OwnerGalleryModeration';

// Data & Types
import { MOCK_PRODUCTS, MOCK_PARTNERS, MOCK_VIDEO_TESTIMONIALS, DEFAULT_USER } from './data/mockData';
import { INITIAL_GALLERY_ITEMS } from './data/galleryData';
import { GalleryItem, GalleryStatus } from './types/gallery';
import { Product, SupplierPartner, CategoryId, QuoteItem, UserProfile, VideoTestimonial } from './types';
import { CheckCircle2, Info, ShoppingBag } from 'lucide-react';

export function App() {
  // Navigation
  const [currentTab, setCurrentTab] = useState<NavTab>('home');
  
  // Gallery State
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>(INITIAL_GALLERY_ITEMS);
  const [isUploadGalleryOpen, setIsUploadGalleryOpen] = useState(false);
  
  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [searchScope, setSearchScope] = useState<'all' | 'products' | 'brands' | 'suppliers'>('all');
  const [selectedCategory, setSelectedCategory] = useState<CategoryId | 'all'>('all');
  const [selectedCity, setSelectedCity] = useState('Mumbai');

  // User & Quote Cart State
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(DEFAULT_USER);
  const [quoteItems, setQuoteItems] = useState<QuoteItem[]>([
    {
      product: MOCK_PRODUCTS[0],
      quantity: 10,
      unitPrice: 145.0,
      totalPrice: 1450.0
    }
  ]);

  // Video Testimonials State
  const [videoTestimonials, setVideoTestimonials] = useState<VideoTestimonial[]>(MOCK_VIDEO_TESTIMONIALS);
  const [selectedVideo, setSelectedVideo] = useState<VideoTestimonial | null>(null);
  const [isSubmitVideoOpen, setIsSubmitVideoOpen] = useState(false);
  const [likedVideoIds, setLikedVideoIds] = useState<string[]>(['vid-1']);

  // Compare Products State (up to 3 products)
  const [compareProductIds, setCompareProductIds] = useState<string[]>([]);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);

  // Modals & Drawers
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedSupplier, setSelectedSupplier] = useState<SupplierPartner | null>(null);
  const [chatSupplier, setChatSupplier] = useState<SupplierPartner | null>(null);
  const [chatProductContext, setChatProductContext] = useState<Product | null>(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isCityModalOpen, setIsCityModalOpen] = useState(false);
  const [isQuoteDrawerOpen, setIsQuoteDrawerOpen] = useState(false);

  // Toast Notification
  const [toastMessage, setToastMessage] = useState<{ text: string; type: 'success' | 'info' } | null>(null);

  // Price Change Notification Subscriptions State
  const [priceAlerts, setPriceAlerts] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem('nexora_price_alerts');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const showToast = (text: string, type: 'success' | 'info' = 'success') => {
    setToastMessage({ text, type });
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const handleToggleCompare = (product: Product) => {
    setCompareProductIds((prev) => {
      if (prev.includes(product.id)) {
        showToast(`Removed "${product.name}" from comparison tray`, 'info');
        return prev.filter((id) => id !== product.id);
      }
      if (prev.length >= 3) {
        showToast(`Comparison limit reached (max 3 products). Remove one to add "${product.name}".`, 'info');
        return prev;
      }
      showToast(`Added "${product.name}" to comparison (${prev.length + 1}/3)`, 'success');
      return [...prev, product.id];
    });
  };

  const handleRemoveCompareProduct = (productId: string) => {
    setCompareProductIds((prev) => prev.filter((id) => id !== productId));
  };

  const handleClearCompare = () => {
    setCompareProductIds([]);
    setIsCompareModalOpen(false);
    showToast('Comparison list cleared', 'info');
  };

  const comparedProducts = MOCK_PRODUCTS.filter((p) => compareProductIds.includes(p.id));

  const handleTogglePriceAlert = (product: Product, enabled: boolean) => {
    setPriceAlerts((prev) => {
      const next = { ...prev, [product.id]: enabled };
      try {
        localStorage.setItem('nexora_price_alerts', JSON.stringify(next));
      } catch (e) {
        console.error('Failed to save price alert to localStorage', e);
      }
      return next;
    });

    if (enabled) {
      showToast(`🔔 Price change alerts enabled for ${product.name}`, 'success');
    } else {
      showToast(`🔕 Price change alerts disabled for ${product.name}`, 'info');
    }
  };

  const handleLikeVideo = (videoId: string) => {
    setLikedVideoIds((prev) => {
      if (prev.includes(videoId)) {
        showToast('Removed highlight endorsement', 'info');
        return prev.filter((id) => id !== videoId);
      } else {
        showToast('Applauded video highlight! Verified supplier alerted.', 'success');
        return [...prev, videoId];
      }
    });
  };

  const handleSubmitVideo = (newVideo: VideoTestimonial) => {
    setVideoTestimonials((prev) => [newVideo, ...prev]);
    setIsSubmitVideoOpen(false);
    showToast(`🎉 "${newVideo.title}" has been published to Verified Video Showcases!`, 'success');
  };

  const handleOpenChat = (supplierOrId: SupplierPartner | string, product?: Product) => {
    let sup: SupplierPartner | undefined;
    if (typeof supplierOrId === 'string') {
      sup = MOCK_PARTNERS.find((p) => p.id === supplierOrId);
    } else {
      sup = supplierOrId;
    }

    if (sup) {
      setChatSupplier(sup);
      setChatProductContext(product || null);
      setIsChatOpen(true);
    }
  };


  // Handlers
  const handleSearch = (
    query: string, 
    scope: 'all' | 'products' | 'brands' | 'suppliers' = 'all',
    city?: string,
    category?: CategoryId | 'all'
  ) => {
    setSearchQuery(query);
    setSearchScope(scope);
    if (category) {
      setSelectedCategory(category);
    }
    if (city) {
      setSelectedCity(city);
    }
    if (scope === 'brands' || scope === 'suppliers') {
      setCurrentTab('brands');
    } else {
      setCurrentTab('products');
    }
    
    const filterInfo = [
      query ? `"${query}"` : null,
      category && category !== 'all' ? `Category: ${category}` : null,
      city ? `in ${city}` : null
    ].filter(Boolean).join(' • ');

    showToast(`Searching for ${filterInfo || 'all catalog items'}...`, 'info');
  };

  const handleSelectCategory = (catId: CategoryId) => {
    setSelectedCategory(catId);
    setCurrentTab('products');
  };

  const handleAddToQuote = (product: Product, quantity: number) => {
    setQuoteItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      const unitPrice = product.price; // or tier price
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? {
                ...item,
                quantity: item.quantity + quantity,
                totalPrice: (item.quantity + quantity) * item.unitPrice
              }
            : item
        );
      }
      return [
        ...prev,
        {
          product,
          quantity,
          unitPrice,
          totalPrice: quantity * unitPrice
        }
      ];
    });

    showToast(`Added ${quantity} units of ${product.name} to Wholesale Quote.`);
  };

  const handleUpdateQuoteQuantity = (productId: string, newQty: number) => {
    setQuoteItems((prev) =>
      prev.map((item) =>
        item.product.id === productId
          ? {
              ...item,
              quantity: newQty,
              totalPrice: newQty * item.unitPrice
            }
          : item
      )
    );
  };

  const handleRemoveQuoteItem = (productId: string) => {
    setQuoteItems((prev) => prev.filter((item) => item.product.id !== productId));
    showToast('Product removed from quote list', 'info');
  };

  const handleClearQuote = () => {
    setQuoteItems([]);
  };

  // Gallery Handlers
  const handleUploadGallerySubmit = (newItem: GalleryItem) => {
    setGalleryItems((prev) => [newItem, ...prev]);
    showToast(`Upload submitted! Waiting for owner moderation. (Status: Pending)`, 'info');
  };

  const handleUpdateGalleryStatus = (itemId: string, newStatus: GalleryStatus, rejectionReason?: string) => {
    setGalleryItems((prev) =>
      prev.map((item) =>
        item.id === itemId
          ? {
              ...item,
              status: newStatus,
              rejectionReason: rejectionReason || item.rejectionReason,
              reviewedAt: new Date().toISOString(),
              reviewedBy: 'Owner #salon-101'
            }
          : item
      )
    );
  };

  const totalQuoteUnits = quoteItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#1E1E1E] flex flex-col font-sans selection:bg-[#FFD1E3] selection:text-[#B8005A]">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 animate-in slide-in-from-top-4 duration-300">
          <div className="bg-white border border-[#EDEDED] shadow-xl rounded-2xl p-4 flex items-center gap-3 text-xs font-semibold text-[#1E1E1E]">
            {toastMessage.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0" />
            ) : (
              <Info className="w-4 h-4 text-[#B8005A] shrink-0" />
            )}
            <span>{toastMessage.text}</span>
          </div>
        </div>
      )}

      {/* Navbar */}
      <Navbar
        currentTab={currentTab}
        onNavigate={(tab) => {
          setCurrentTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        selectedCity={selectedCity}
        onOpenCitySelector={() => setIsCityModalOpen(true)}
        quoteCount={quoteItems.length}
        priceAlertsCount={Object.values(priceAlerts).filter(Boolean).length}
        onOpenQuote={() => setIsQuoteDrawerOpen(true)}
        onOpenAuth={() => setIsAuthOpen(true)}
        onOpenRegister={() => setIsRegisterOpen(true)}
        user={currentUser}
        onLogout={() => {
          setCurrentUser(null);
          showToast('Signed out of Nexora Luxe account', 'info');
        }}
      />

      {/* Main Page Content */}
      <main className="flex-1">
        {currentTab === 'home' && (
          <>
            {/* 1. Hero Section matching screenshot */}
            <HeroSection
              selectedCity={selectedCity}
              onOpenCitySelector={() => setIsCityModalOpen(true)}
              onSearch={handleSearch}
              onSelectCategory={handleSelectCategory}
            />

            {/* 2. Explore Categories grid matching screenshot */}
            <ExploreCategories
              onSelectCategory={handleSelectCategory}
              onOpenRegister={() => setIsRegisterOpen(true)}
              onViewAllCategories={() => {
                setSelectedCategory('all');
                setCurrentTab('products');
              }}
            />

            {/* 3. Premium Partners matching screenshot */}
            <PremiumPartners
              partners={MOCK_PARTNERS}
              videoTestimonials={videoTestimonials}
              products={MOCK_PRODUCTS}
              onSelectPartner={(partner) => setSelectedSupplier(partner)}
              onViewAllPartners={() => setCurrentTab('distributors')}
              onSelectVideo={(video) => setSelectedVideo(video)}
              onOpenSubmitModal={() => setIsSubmitVideoOpen(true)}
              onAddToQuote={handleAddToQuote}
              likedVideoIds={likedVideoIds}
              onLikeVideo={handleLikeVideo}
            />

            {/* 4. Trending in Catalog matching screenshot */}
            <TrendingCatalog
              products={MOCK_PRODUCTS}
              compareProductIds={compareProductIds}
              onToggleCompare={handleToggleCompare}
              onSelectProduct={(product) => setSelectedProduct(product)}
              onRequestQuote={(product) => handleAddToQuote(product, product.moq)}
            />

            {/* 5. List Your Beauty Business - Free banner matching screenshot */}
            <ListBusinessBanner
              onStartRegistration={() => setIsRegisterOpen(true)}
            />
          </>
        )}

        {currentTab === 'products' && (
          <CatalogView
            products={MOCK_PRODUCTS}
            selectedCategory={selectedCategory}
            searchQuery={searchQuery}
            compareProductIds={compareProductIds}
            onToggleCompare={handleToggleCompare}
            onOpenCompareModal={() => setIsCompareModalOpen(true)}
            onSelectProduct={(product) => setSelectedProduct(product)}
            onSelectCategory={(cat) => setSelectedCategory(cat)}
          />
        )}

        {currentTab === 'brands' && (
          <BrandsView
            partners={MOCK_PARTNERS}
            products={MOCK_PRODUCTS}
            onSelectPartner={(partner) => setSelectedSupplier(partner)}
            onSelectProduct={(product) => setSelectedProduct(product)}
          />
        )}

        {currentTab === 'distributors' && (
          <DistributorsView
            partners={MOCK_PARTNERS}
            videoTestimonials={videoTestimonials}
            products={MOCK_PRODUCTS}
            onSelectPartner={(partner) => setSelectedSupplier(partner)}
            onOpenRegister={() => setIsRegisterOpen(true)}
            onSelectVideo={(video) => setSelectedVideo(video)}
            onOpenSubmitModal={() => setIsSubmitVideoOpen(true)}
            onAddToQuote={handleAddToQuote}
            likedVideoIds={likedVideoIds}
            onLikeVideo={handleLikeVideo}
          />
        )}

        {currentTab === 'business' && (
          <BusinessView
            onOpenRegister={() => setIsRegisterOpen(true)}
          />
        )}

        {currentTab === 'offers' && (
          <OffersView
            onAddToQuote={handleAddToQuote}
            onOpenRegister={() => setIsRegisterOpen(true)}
          />
        )}

        {currentTab === 'gallery' && (
          <GalleryView
            items={galleryItems}
            onOpenUploadModal={() => setIsUploadGalleryOpen(true)}
            onNavigateToModeration={() => setCurrentTab('gallery-moderation')}
          />
        )}

        {currentTab === 'gallery-moderation' && (
          <OwnerGalleryModeration
            items={galleryItems}
            onUpdateStatus={handleUpdateGalleryStatus}
            onAddItem={handleUploadGallerySubmit}
            onBackToGallery={() => setCurrentTab('gallery')}
          />
        )}
      </main>

      {/* Footer matching screenshot */}
      <Footer
        onNavigate={(tab) => {
          setCurrentTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Floating Wholesale Quote Button on mobile / when items in bag */}
      {quoteItems.length > 0 && !isQuoteDrawerOpen && (
        <div className="fixed bottom-6 right-6 z-40">
          <button
            onClick={() => setIsQuoteDrawerOpen(true)}
            className="bg-[#B8005A] hover:bg-[#A0004E] text-white px-5 py-3.5 rounded-full shadow-2xl hover:shadow-pink-500/20 flex items-center gap-3 transition-all active:scale-95 cursor-pointer border-2 border-white"
          >
            <div className="relative">
              <ShoppingBag className="w-5 h-5" />
              <span className="absolute -top-1.5 -right-2 bg-white text-[#B8005A] font-bold text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                {quoteItems.length}
              </span>
            </div>
            <span className="text-xs font-bold">Review RFQ List ({totalQuoteUnits} units)</span>
          </button>
        </div>
      )}

      {/* Modals & Drawers */}
      <ProductDetailModal
        product={selectedProduct}
        supplier={
          selectedProduct
            ? MOCK_PARTNERS.find((p) => p.id === selectedProduct.supplierId)
            : undefined
        }
        allProducts={MOCK_PRODUCTS}
        isPriceAlertEnabled={selectedProduct ? !!priceAlerts[selectedProduct.id] : false}
        onClose={() => setSelectedProduct(null)}
        onAddToQuote={handleAddToQuote}
        onViewSupplier={(sup) => {
          setSelectedProduct(null);
          setSelectedSupplier(sup);
        }}
        onMessageSupplier={(sup, prod) => {
          handleOpenChat(sup, prod);
        }}
        onTogglePriceAlert={handleTogglePriceAlert}
        onSelectProduct={(product) => setSelectedProduct(product)}
      />

      <SupplierModal
        supplier={selectedSupplier}
        products={MOCK_PRODUCTS}
        onClose={() => setSelectedSupplier(null)}
        onSelectProduct={(product) => {
          setSelectedSupplier(null);
          setSelectedProduct(product);
        }}
        onMessageSupplier={(sup) => {
          handleOpenChat(sup);
        }}
      />

      <SupplierChatModal
        isOpen={isChatOpen}
        supplier={chatSupplier}
        productContext={chatProductContext}
        onClose={() => {
          setIsChatOpen(false);
          setChatProductContext(null);
        }}
      />

      <RegisterWizardModal
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
        onSuccess={(newUser) => {
          setCurrentUser({
            id: 'usr-new',
            name: newUser.name,
            email: 'verified@nexoraluxe.com',
            companyName: newUser.businessName,
            role: newUser.role,
            city: selectedCity,
            isVerified: true
          });
          showToast(`Welcome ${newUser.name}! Your business listing is live.`);
        }}
      />

      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onLogin={(user) => {
          setCurrentUser(user);
          showToast(`Signed in as ${user.name} (${user.companyName})`);
        }}
        onOpenRegister={() => setIsRegisterOpen(true)}
      />

      <CitySelectorModal
        isOpen={isCityModalOpen}
        onClose={() => setIsCityModalOpen(false)}
        selectedCity={selectedCity}
        onSelectCity={(city) => {
          setSelectedCity(city);
          showToast(`Switched market region to ${city}`);
        }}
      />

      <QuoteDrawer
        isOpen={isQuoteDrawerOpen}
        onClose={() => setIsQuoteDrawerOpen(false)}
        items={quoteItems}
        onUpdateQuantity={handleUpdateQuoteQuantity}
        onRemoveItem={handleRemoveQuoteItem}
        onClearQuote={handleClearQuote}
      />

      {/* Floating Compare Selection Tray */}
      <CompareFloatingBar
        selectedProducts={comparedProducts}
        onRemoveProduct={handleRemoveCompareProduct}
        onClearAll={handleClearCompare}
        onOpenCompareModal={() => setIsCompareModalOpen(true)}
      />

      {/* Side-by-Side Product Comparison Modal */}
      <CompareModal
        isOpen={isCompareModalOpen}
        products={comparedProducts}
        onClose={() => setIsCompareModalOpen(false)}
        onRemoveProduct={handleRemoveCompareProduct}
        onSelectProduct={(product) => {
          setIsCompareModalOpen(false);
          setSelectedProduct(product);
        }}
        onAddToQuote={(product, quantity) => {
          handleAddToQuote(product, quantity);
        }}
        onMessageSupplier={(supplierId, product) => {
          setIsCompareModalOpen(false);
          handleOpenChat(supplierId, product);
        }}
      />

      {/* Video Player Cinema Modal */}
      <VideoPlayerModal
        isOpen={!!selectedVideo}
        video={selectedVideo}
        allVideos={videoTestimonials}
        products={MOCK_PRODUCTS}
        onClose={() => setSelectedVideo(null)}
        onSelectVideo={(video) => setSelectedVideo(video)}
        onSelectProduct={(product) => {
          setSelectedVideo(null);
          setSelectedProduct(product);
        }}
        onSelectSupplier={(supplierId) => {
          setSelectedVideo(null);
          const sup = MOCK_PARTNERS.find((p) => p.id === supplierId);
          if (sup) setSelectedSupplier(sup);
        }}
        onAddToQuote={handleAddToQuote}
        onMessageSupplier={(supplierId, product) => {
          handleOpenChat(supplierId, product);
        }}
        onLikeVideo={handleLikeVideo}
        isLiked={selectedVideo ? likedVideoIds.includes(selectedVideo.id) : false}
      />

      {/* Submit Video Highlight Modal */}
      <SubmitVideoModal
        isOpen={isSubmitVideoOpen}
        distributors={MOCK_PARTNERS}
        products={MOCK_PRODUCTS}
        onClose={() => setIsSubmitVideoOpen(false)}
        onSubmit={handleSubmitVideo}
      />

      {/* Upload Gallery Transformation Modal */}
      <UploadGalleryModal
        isOpen={isUploadGalleryOpen}
        onClose={() => setIsUploadGalleryOpen(false)}
        onSubmit={handleUploadGallerySubmit}
        activeTheme="barber"
        salonId="salon-101"
        salonName="Maison de Luxe Salon Group"
      />
    </div>
  );
}

export default App;
