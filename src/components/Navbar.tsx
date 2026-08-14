import React, { useState } from 'react';
import { MapPin, User, FileText, Sparkles, Menu, X, LogOut, Check, Bell } from 'lucide-react';

export type NavTab = 'home' | 'products' | 'brands' | 'distributors' | 'business';

interface NavbarProps {
  currentTab?: NavTab;
  activeTab?: NavTab;
  onNavigate?: (tab: NavTab) => void;
  setActiveTab?: (tab: NavTab) => void;
  selectedCity: string;
  onOpenCitySelector: () => void;
  onOpenRegister: () => void;
  onOpenAuth: () => void;
  onOpenQuote?: () => void;
  onOpenQuoteDrawer?: () => void;
  quoteCount: number;
  priceAlertsCount?: number;
  user: { name: string; businessName?: string; companyName?: string; role?: string } | null;
  onLogout?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  activeTab,
  onNavigate,
  setActiveTab,
  selectedCity,
  onOpenCitySelector,
  onOpenRegister,
  onOpenAuth,
  onOpenQuote,
  onOpenQuoteDrawer,
  quoteCount,
  priceAlertsCount = 0,
  user,
  onLogout
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const active = currentTab || activeTab || 'home';
  const handleNav = (tab: NavTab) => {
    if (onNavigate) {
      onNavigate(tab);
    } else if (setActiveTab) {
      setActiveTab(tab);
    }
    setMobileMenuOpen(false);
  };

  const handleOpenQuote = () => {
    if (onOpenQuote) {
      onOpenQuote();
    } else if (onOpenQuoteDrawer) {
      onOpenQuoteDrawer();
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#F0E6EC] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <div 
          onClick={() => handleNav('home')}
          className="flex items-center gap-2 cursor-pointer group select-none"
        >
          <span className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#B8005A] font-serif group-hover:opacity-90 transition-opacity">
            Nexora Luxe
          </span>
          <span className="hidden sm:inline-flex items-center text-[10px] uppercase font-bold tracking-widest text-[#B8005A] bg-[#FFF0F5] border border-[#FFD1E3] px-2 py-0.5 rounded-full">
            B2B
          </span>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[#4A4A4A]">
          <button
            onClick={() => handleNav('products')}
            className={`transition-colors relative py-1 hover:text-[#B8005A] ${
              active === 'products' ? 'text-[#B8005A] font-semibold' : ''
            }`}
          >
            Products
            {active === 'products' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#B8005A] rounded-full" />
            )}
          </button>

          <button
            onClick={() => handleNav('brands')}
            className={`transition-colors relative py-1 hover:text-[#B8005A] ${
              active === 'brands' ? 'text-[#B8005A] font-semibold' : ''
            }`}
          >
            Brands
            {active === 'brands' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#B8005A] rounded-full" />
            )}
          </button>

          <button
            onClick={() => handleNav('distributors')}
            className={`transition-colors relative py-1 hover:text-[#B8005A] ${
              active === 'distributors' ? 'text-[#B8005A] font-semibold' : ''
            }`}
          >
            Distributors
            {active === 'distributors' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#B8005A] rounded-full" />
            )}
          </button>

          <button
            onClick={() => handleNav('business')}
            className={`transition-colors relative py-1 hover:text-[#B8005A] ${
              active === 'business' ? 'text-[#B8005A] font-semibold' : ''
            }`}
          >
            Business
            {active === 'business' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#B8005A] rounded-full" />
            )}
          </button>
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Location Button */}
          <button
            onClick={onOpenCitySelector}
            className="flex items-center gap-1.5 text-xs sm:text-sm font-medium text-[#4A4A4A] hover:text-[#B8005A] p-2 rounded-full hover:bg-[#FFF0F5] transition-all"
            title="Select Location / Region"
          >
            <MapPin className="w-4 h-4 text-[#4A4A4A] hover:text-[#B8005A]" />
            <span className="hidden lg:inline">{selectedCity}</span>
          </button>

          {/* User Account / Profile */}
          <div className="relative">
            <button
              onClick={() => {
                if (user) {
                  setUserMenuOpen(!userMenuOpen);
                } else {
                  onOpenAuth();
                }
              }}
              className="flex items-center gap-1.5 text-xs sm:text-sm font-medium text-[#4A4A4A] hover:text-[#B8005A] p-2 rounded-full hover:bg-[#FFF0F5] transition-all"
              title={user ? `Signed in as ${user.name}` : 'Sign In / Account'}
            >
              <User className="w-5 h-5 text-[#4A4A4A]" />
              {user && (
                <span className="hidden lg:inline text-xs font-semibold text-[#B8005A] max-w-[120px] truncate">
                  {user.name}
                </span>
              )}
            </button>

            {/* User Dropdown */}
            {user && userMenuOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white border border-[#EDEDED] shadow-xl rounded-2xl p-3 z-50 animate-in fade-in slide-in-from-top-2">
                <div className="pb-2 mb-2 border-b border-[#F0F0F0] px-2">
                  <p className="text-xs font-bold text-[#1E1E1E] truncate">{user.name}</p>
                  <p className="text-[11px] text-[#737373] truncate">{user.companyName || user.businessName || 'Verified Buyer'}</p>
                  <span className="inline-flex items-center gap-1 mt-1 text-[10px] font-semibold text-[#10B981] bg-[#E8F8F2] px-2 py-0.5 rounded-full">
                    <Check className="w-2.5 h-2.5" /> B2B Verified
                  </span>
                </div>

                <button
                  onClick={() => {
                    setUserMenuOpen(false);
                    onOpenAuth();
                  }}
                  className="w-full text-left px-2 py-1.5 text-xs font-medium text-[#4A4A4A] hover:text-[#B8005A] hover:bg-[#FFF0F5] rounded-lg transition-colors flex items-center gap-2"
                >
                  <User className="w-3.5 h-3.5" /> Account Details
                </button>

                <div className="px-2 py-1.5 text-xs font-medium text-[#555] flex items-center justify-between rounded-lg bg-[#FAFAFA] border border-[#F0F0F0] my-1">
                  <span className="flex items-center gap-1.5 text-[11px] text-[#737373]">
                    <Bell className="w-3 h-3 text-[#B8005A]" /> Price Alerts
                  </span>
                  <span className="text-[11px] font-bold text-[#B8005A] bg-[#FFF0F5] px-2 py-0.5 rounded-full border border-[#FFD1E3]">
                    {priceAlertsCount} active
                  </span>
                </div>

                {onLogout && (
                  <button
                    onClick={() => {
                      setUserMenuOpen(false);
                      onLogout();
                    }}
                    className="w-full text-left px-2 py-1.5 text-xs font-medium text-[#DC2626] hover:bg-red-50 rounded-lg transition-colors flex items-center gap-2 mt-1"
                  >
                    <LogOut className="w-3.5 h-3.5" /> Sign Out
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Quote / RFQ Cart */}
          <button
            onClick={handleOpenQuote}
            className="relative flex items-center gap-1 text-xs font-semibold text-[#4A4A4A] hover:text-[#B8005A] p-2 rounded-full hover:bg-[#FFF0F5] transition-all"
            title="Wholesale Inquiries & Quotes"
          >
            <FileText className="w-4 h-4" />
            {quoteCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#B8005A] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-pulse">
                {quoteCount}
              </span>
            )}
          </button>

          {/* Register Button */}
          <button
            onClick={onOpenRegister}
            className="bg-[#B8005A] hover:bg-[#A0004E] text-white text-xs sm:text-sm font-semibold px-3 sm:px-6 py-2 rounded-md transition-all shadow-sm hover:shadow active:scale-95 flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Register</span>
          </button>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[#4A4A4A] hover:text-[#B8005A] rounded-lg"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-[#F0E6EC] px-4 py-4 space-y-3 animate-in slide-in-from-top-2 duration-200">
          <div className="grid grid-cols-2 gap-2 pb-3 border-b border-[#F0E6EC]">
            <button
              onClick={() => handleNav('products')}
              className={`p-2.5 rounded-xl text-xs font-semibold text-left transition-colors ${
                active === 'products' ? 'bg-[#FFF0F5] text-[#B8005A]' : 'bg-[#FAFAFA] text-[#4A4A4A]'
              }`}
            >
              Products
            </button>
            <button
              onClick={() => handleNav('brands')}
              className={`p-2.5 rounded-xl text-xs font-semibold text-left transition-colors ${
                active === 'brands' ? 'bg-[#FFF0F5] text-[#B8005A]' : 'bg-[#FAFAFA] text-[#4A4A4A]'
              }`}
            >
              Brands
            </button>
            <button
              onClick={() => handleNav('distributors')}
              className={`p-2.5 rounded-xl text-xs font-semibold text-left transition-colors ${
                active === 'distributors' ? 'bg-[#FFF0F5] text-[#B8005A]' : 'bg-[#FAFAFA] text-[#4A4A4A]'
              }`}
            >
              Distributors
            </button>
            <button
              onClick={() => handleNav('business')}
              className={`p-2.5 rounded-xl text-xs font-semibold text-left transition-colors ${
                active === 'business' ? 'bg-[#FFF0F5] text-[#B8005A]' : 'bg-[#FAFAFA] text-[#4A4A4A]'
              }`}
            >
              Business Hub
            </button>
          </div>

          <div className="flex items-center justify-between pt-1">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenCitySelector();
              }}
              className="flex items-center gap-1.5 text-xs font-medium text-[#737373]"
            >
              <MapPin className="w-3.5 h-3.5 text-[#B8005A]" />
              <span>{selectedCity}</span>
            </button>
            
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                handleOpenQuote();
              }}
              className="text-xs font-semibold text-[#B8005A] flex items-center gap-1"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Quote Requests ({quoteCount})</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

