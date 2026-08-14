import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import {
  Search,
  MapPin,
  CheckCircle2,
  ShieldCheck,
  Star,
  Phone,
  MessageCircle,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Filter,
  Globe,
  Building2,
  Truck,
  Film,
  Sparkles,
  Scissors,
  Palette,
  Brush,
  Hand,
  Flower2,
  Armchair,
  Wrench,
  Layers,
  ArrowRight,
  SlidersHorizontal,
  Plus
} from 'lucide-react';
import { SupplierPartner, VideoTestimonial, Product } from '../types';
import { StarRating } from '../components/StarRating';
import { VideoTestimonials } from '../components/VideoTestimonials';

interface DistributorsViewProps {
  partners: SupplierPartner[];
  videoTestimonials?: VideoTestimonial[];
  products?: Product[];
  onSelectPartner: (partner: SupplierPartner) => void;
  onOpenRegister: () => void;
  onSelectVideo?: (video: VideoTestimonial) => void;
  onOpenSubmitModal?: () => void;
  onAddToQuote?: (product: Product, quantity: number) => void;
  likedVideoIds?: string[];
  onLikeVideo?: (videoId: string) => void;
}

export const DistributorsView: React.FC<DistributorsViewProps> = ({
  partners,
  videoTestimonials = [],
  products = [],
  onSelectPartner,
  onOpenRegister,
  onSelectVideo,
  onOpenSubmitModal,
  onAddToQuote,
  likedVideoIds = [],
  onLikeVideo
}) => {
  // Search & Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeTab, setActiveTab] = useState<'directory' | 'videos'>('directory');
  const [sortBy, setSortBy] = useState<'recommended' | 'rating' | 'newest' | 'orders'>('recommended');

  // Sidebar Filter States
  const [businessTypeFilters, setBusinessTypeFilters] = useState<{
    manufacturer: boolean;
    wholesaler: boolean;
    distributor: boolean;
    importer: boolean;
  }>({
    manufacturer: true,
    wholesaler: true,
    distributor: true,
    importer: true
  });

  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [topRatedOnly, setTopRatedOnly] = useState(false);
  const [panIndiaOnly, setPanIndiaOnly] = useState(false);
  const [sameDayDelivery, setSameDayDelivery] = useState(false);

  // Accordion Open States
  const [openSections, setOpenSections] = useState({
    businessType: true,
    trustSafety: true,
    location: false
  });

  const [visibleCount, setVisibleCount] = useState(6);

  // Categories for category strip
  const categoriesList = [
    { id: 'all', label: 'All', icon: Layers },
    { id: 'skincare', label: 'Skincare', icon: Sparkles },
    { id: 'haircare', label: 'Haircare', icon: Scissors },
    { id: 'haircolor', label: 'Hair Color', icon: Palette },
    { id: 'makeup', label: 'Makeup', icon: Brush },
    { id: 'nails', label: 'Nails', icon: Hand },
    { id: 'spa', label: 'Spa', icon: Flower2 },
    { id: 'tools', label: 'Salon Tools', icon: Armchair }
  ];

  // Toggle Accordion section
  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  // Clear all filters
  const handleClearAll = () => {
    setSearchQuery('');
    setSelectedCity('');
    setSelectedCategory('all');
    setBusinessTypeFilters({
      manufacturer: true,
      wholesaler: true,
      distributor: true,
      importer: true
    });
    setVerifiedOnly(false);
    setTopRatedOnly(false);
    setPanIndiaOnly(false);
    setSameDayDelivery(false);
  };

  // Filtered & Sorted Suppliers
  const filteredSuppliers = useMemo(() => {
    return partners.filter((partner) => {
      // Search query match
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = partner.name.toLowerCase().includes(q);
        const matchesDesc = partner.description.toLowerCase().includes(q);
        const matchesLoc = partner.location.toLowerCase().includes(q);
        const matchesTags = partner.tags?.some((t) => t.toLowerCase().includes(q)) ?? false;
        if (!matchesName && !matchesDesc && !matchesLoc && !matchesTags) return false;
      }

      // City filter
      if (selectedCity) {
        if (!partner.location.toLowerCase().includes(selectedCity.toLowerCase())) {
          return false;
        }
      }

      // Category filter
      if (selectedCategory !== 'all') {
        const catMap: Record<string, string[]> = {
          skincare: ['skincare', 'facial', 'ayurvedic', 'peptides'],
          haircare: ['haircare', 'shampoo', 'keratin'],
          haircolor: ['hair color', 'color', 'pigments'],
          makeup: ['makeup', 'cosmetics', 'pigments'],
          nails: ['nails', 'lash'],
          spa: ['spa', 'massage', 'wellness', 'stones'],
          tools: ['tools', 'equipment', 'furniture', 'dryer']
        };
        const keywords = catMap[selectedCategory] || [selectedCategory];
        const hasMatch = (partner.tags && partner.tags.some((tag) =>
          keywords.some((kw) => tag.toLowerCase().includes(kw))
        )) || keywords.some((kw) => partner.description.toLowerCase().includes(kw));
        if (!hasMatch) return false;
      }

      // Business Type Filter
      const pType = partner.type.toLowerCase();
      const pDetail = (partner.businessTypeDetail || '').toLowerCase();
      const isMfg = pType === 'manufacturer' || pDetail.includes('manufacturer') || pDetail.includes('company');
      const isWholesale = pType === 'wholesaler' || pDetail.includes('wholesaler');
      const isDist = pType === 'distributor' || pDetail.includes('distributor');
      const isImp = pDetail.includes('importer');

      const matchesType =
        (businessTypeFilters.manufacturer && isMfg) ||
        (businessTypeFilters.wholesaler && isWholesale) ||
        (businessTypeFilters.distributor && isDist) ||
        (businessTypeFilters.importer && isImp);

      if (!matchesType) return false;

      // Trust & Safety
      if (verifiedOnly && !partner.verified) return false;
      if (topRatedOnly && partner.rating < 4.8) return false;

      // Quick filter tags
      if (panIndiaOnly && !partner.location.includes('India') && partner.region !== 'India') return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'newest') return b.establishedYear - a.establishedYear;
      if (sortBy === 'orders') return a.minOrderValue - b.minOrderValue;
      // Default: Recommended (verified first, then highest rating)
      if (a.verified !== b.verified) return a.verified ? -1 : 1;
      return b.rating - a.rating;
    });
  }, [
    partners,
    searchQuery,
    selectedCity,
    selectedCategory,
    businessTypeFilters,
    verifiedOnly,
    topRatedOnly,
    panIndiaOnly,
    sortBy
  ]);

  const displayedSuppliers = filteredSuppliers.slice(0, visibleCount);

  // Helper to trigger direct WhatsApp or Call
  const handleCall = (phone: string, e: React.MouseEvent) => {
    e.stopPropagation();
    window.location.href = `tel:${phone}`;
  };

  const handleWhatsApp = (whatsappNum: string | undefined, partnerName: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const num = (whatsappNum || '+919820012345').replace(/[^0-9]/g, '');
    const text = encodeURIComponent(
      `Hello ${partnerName}, I discovered your verified profile on Nexora Luxe. I would like to request your wholesale salon catalog and backbar pricing.`
    );
    window.open(`https://wa.me/${num}?text=${text}`, '_blank');
  };

  return (
    <div className="w-full min-h-screen bg-[#FCF9F8] text-[#1C1B1B] pb-24 animate-in fade-in duration-300">
      {/* 1. Full Bleed Hero Section matching exact screenshot */}
      <section className="relative w-full h-[500px] flex items-center justify-center text-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            alt="Luxury salon interior"
            className="w-full h-full object-cover object-center"
            src="https://lh3.googleusercontent.com/aida/AP1WRLuNcnInKLjqyRmT-5JDLsj6Zog4u1yy2lQSTNjlUW963hSx_8nl2FwqejDnU5grY2ZvyQ_skSHbxJXVQTwlwsOONnmJEaH11-fcMOlba5Odstx9hmq47137Cqn9d0O-tltAc32zPrtXIz7IXcWynE9yrSOCzqZh0pgnJsuLg0qn4xpug_H0u7UZPAr6_VQ2SrQ29XPx7DbN1iuZRXMvLM6a-em36AZRbdJb47Sq0_3vlDodBH0GHIkRiDo"
          />
          <div className="absolute inset-0 bg-black/45 backdrop-blur-[0.5px]" />
        </div>

        <div className="relative z-10 w-full max-w-[920px] px-4 md:px-8 flex flex-col gap-6 items-center mt-6">
          <div className="flex flex-col gap-2 drop-shadow-md text-center">
            <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">
              Find Premium Beauty Suppliers
            </h1>
            <p className="text-white/90 text-sm md:text-lg max-w-2xl mx-auto font-normal">
              Discover exclusive manufacturers, wholesalers and distributors for professional beauty spaces.
            </p>
          </div>

          {/* Glassmorphic Search Bar */}
          <div className="w-full bg-[#FDF8F8]/90 backdrop-blur-md rounded-full p-2 flex flex-col md:flex-row gap-2 shadow-2xl border border-white/40 focus-within:ring-2 focus-within:ring-[#B90064]/50 transition-all duration-300">
            <div className="flex-grow flex items-center px-4 gap-3 border-b md:border-b-0 md:border-r border-[#E0BEC6]/50 pb-2 md:pb-0">
              <Search className="w-5 h-5 text-[#594047] shrink-0" />
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent border-none focus:ring-0 text-sm md:text-base placeholder:text-[#594047]/70 text-[#1C1B1B] outline-none font-medium"
                placeholder="Search products, brands, distributors..."
                type="text"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="text-xs text-[#8C7077] hover:text-[#B90064] cursor-pointer"
                >
                  Clear
                </button>
              )}
            </div>

            <div className="flex items-center px-4 gap-3 md:w-52 relative">
              <MapPin className="w-5 h-5 text-[#594047] shrink-0" />
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="w-full bg-transparent border-none focus:ring-0 text-sm md:text-base text-[#1C1B1B] outline-none cursor-pointer appearance-none font-medium pr-6"
              >
                <option value="">All Cities</option>
                <option value="mumbai">Mumbai</option>
                <option value="delhi">Delhi NCR</option>
                <option value="bangalore">Bangalore</option>
                <option value="hyderabad">Hyderabad</option>
                <option value="paris">Paris, EU</option>
                <option value="new york">New York, NA</option>
                <option value="milan">Milan, EU</option>
                <option value="dubai">Dubai, UAE</option>
                <option value="london">London, UK</option>
              </select>
              <ChevronDown className="w-4 h-4 text-[#594047] pointer-events-none absolute right-4" />
            </div>

            <button
              onClick={() => {
                // Smooth scroll to suppliers list
                document.getElementById('suppliers-results')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="bg-[#B90064] text-white px-8 py-3 rounded-full text-sm hover:bg-[#8E004B] transition-colors duration-300 ease-in-out min-h-[48px] flex items-center justify-center mt-2 md:mt-0 whitespace-nowrap font-bold shadow-md cursor-pointer"
            >
              Search
            </button>
          </div>

          {/* Quick Filters */}
          <div className="flex flex-wrap justify-center gap-2.5 mt-2">
            <button
              onClick={() => setVerifiedOnly(!verifiedOnly)}
              className={`backdrop-blur-sm border px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer ${
                verifiedOnly
                  ? 'bg-[#B90064] border-[#B90064] text-white shadow-sm'
                  : 'bg-white/20 hover:bg-white/30 border-white/40 text-white'
              }`}
            >
              ✓ Verified Only
            </button>
            <button
              onClick={() => setTopRatedOnly(!topRatedOnly)}
              className={`backdrop-blur-sm border px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer ${
                topRatedOnly
                  ? 'bg-[#B90064] border-[#B90064] text-white shadow-sm'
                  : 'bg-white/20 hover:bg-white/30 border-white/40 text-white'
              }`}
            >
              ★ Top Rated (4.8+)
            </button>
            <button
              onClick={() => setPanIndiaOnly(!panIndiaOnly)}
              className={`backdrop-blur-sm border px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer ${
                panIndiaOnly
                  ? 'bg-[#B90064] border-[#B90064] text-white shadow-sm'
                  : 'bg-white/20 hover:bg-white/30 border-white/40 text-white'
              }`}
            >
              Pan-India Suppliers
            </button>
            <button
              onClick={() => setSameDayDelivery(!sameDayDelivery)}
              className={`backdrop-blur-sm border px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer ${
                sameDayDelivery
                  ? 'bg-[#B90064] border-[#B90064] text-white shadow-sm'
                  : 'bg-white/20 hover:bg-white/30 border-white/40 text-white'
              }`}
            >
              Same-Day Delivery
            </button>
            <button
              onClick={() => setActiveTab(activeTab === 'videos' ? 'directory' : 'videos')}
              className={`backdrop-blur-sm border px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'videos'
                  ? 'bg-[#B90064] border-[#B90064] text-white shadow-sm'
                  : 'bg-white/20 hover:bg-white/30 border-white/40 text-white'
              }`}
            >
              <Film className="w-3 h-3" />
              <span>Video Highlights ({videoTestimonials.length})</span>
            </button>
          </div>
        </div>
      </section>

      {/* 2. Category Strip */}
      <section className="w-full border-b border-[#E8E8E8] bg-white overflow-hidden shadow-2xs z-20 relative sticky top-[73px]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-10 py-4 flex overflow-x-auto hide-scrollbar gap-6 items-center">
          {categoriesList.map((cat) => {
            const Icon = cat.icon;
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className="flex flex-col items-center gap-2 group min-w-[76px] cursor-pointer"
              >
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 ${
                    isActive
                      ? 'bg-[#B90064] text-white shadow-sm scale-105'
                      : 'bg-[#F0EDEC] border border-[#E8E8E8] text-[#594047] group-hover:border-[#B90064] group-hover:text-[#B90064] group-hover:bg-[#FFF0F5]'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <span
                  className={`text-xs font-semibold tracking-tight transition-colors ${
                    isActive ? 'text-[#B90064]' : 'text-[#594047] group-hover:text-[#B90064]'
                  }`}
                >
                  {cat.label}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* 3. Main Directory Layout with Sidebar Filters and High Density Editorial Cards */}
      <div id="suppliers-results" className="max-w-[1440px] mx-auto w-full px-4 sm:px-6 md:px-10 py-10 flex flex-col md:flex-row gap-8">
        {/* Left: Sidebar Filters (1/4 width) */}
        <aside className="w-full md:w-1/4 lg:w-[290px] flex flex-col gap-6 flex-shrink-0">
          <div className="bg-white rounded-2xl border border-[#E8E8E8] shadow-sm flex flex-col overflow-hidden">
            {/* Header */}
            <div className="p-5 bg-[#FCF9F8] flex justify-between items-center border-b border-[#E8E8E8]">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-[#B90064]" />
                <h2 className="text-base font-bold text-[#1C1B1B]">Filters</h2>
              </div>
              <button
                onClick={handleClearAll}
                className="text-xs text-[#B90064] hover:text-[#8E004B] transition-colors font-semibold cursor-pointer"
              >
                Clear All
              </button>
            </div>

            {/* Accordion: Business Type */}
            <div className="border-b border-[#E8E8E8]">
              <button
                onClick={() => toggleSection('businessType')}
                className="w-full flex justify-between items-center p-5 text-sm font-bold text-[#1C1B1B] hover:bg-[#F7F2F2] transition-colors cursor-pointer"
              >
                <span>Business Type</span>
                {openSections.businessType ? (
                  <ChevronUp className="w-4 h-4 text-[#8C7077]" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-[#8C7077]" />
                )}
              </button>

              {openSections.businessType && (
                <div className="px-5 pb-5 flex flex-col gap-3.5">
                  <label className="flex justify-between items-center cursor-pointer group">
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={businessTypeFilters.manufacturer}
                        onChange={(e) =>
                          setBusinessTypeFilters((prev) => ({ ...prev, manufacturer: e.target.checked }))
                        }
                        className="w-4 h-4 rounded text-[#B90064] focus:ring-[#B90064] border-[#8C7077] cursor-pointer"
                      />
                      <span className="text-sm text-[#1C1B1B] group-hover:text-[#B90064] transition-colors font-medium">
                        Company / Manufacturer
                      </span>
                    </div>
                    <span className="text-xs text-[#594047] bg-[#F0EDEC] px-2 py-0.5 rounded-full font-semibold">
                      42
                    </span>
                  </label>

                  <label className="flex justify-between items-center cursor-pointer group">
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={businessTypeFilters.wholesaler}
                        onChange={(e) =>
                          setBusinessTypeFilters((prev) => ({ ...prev, wholesaler: e.target.checked }))
                        }
                        className="w-4 h-4 rounded text-[#B90064] focus:ring-[#B90064] border-[#8C7077] cursor-pointer"
                      />
                      <span className="text-sm text-[#1C1B1B] group-hover:text-[#B90064] transition-colors font-medium">
                        Wholesaler
                      </span>
                    </div>
                    <span className="text-xs text-[#594047] bg-[#F0EDEC] px-2 py-0.5 rounded-full font-semibold">
                      85
                    </span>
                  </label>

                  <label className="flex justify-between items-center cursor-pointer group">
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={businessTypeFilters.distributor}
                        onChange={(e) =>
                          setBusinessTypeFilters((prev) => ({ ...prev, distributor: e.target.checked }))
                        }
                        className="w-4 h-4 rounded text-[#B90064] focus:ring-[#B90064] border-[#8C7077] cursor-pointer"
                      />
                      <span className="text-sm text-[#1C1B1B] group-hover:text-[#B90064] transition-colors font-medium">
                        Regional Distributor
                      </span>
                    </div>
                    <span className="text-xs text-[#594047] bg-[#F0EDEC] px-2 py-0.5 rounded-full font-semibold">
                      18
                    </span>
                  </label>

                  <label className="flex justify-between items-center cursor-pointer group">
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={businessTypeFilters.importer}
                        onChange={(e) =>
                          setBusinessTypeFilters((prev) => ({ ...prev, importer: e.target.checked }))
                        }
                        className="w-4 h-4 rounded text-[#B90064] focus:ring-[#B90064] border-[#8C7077] cursor-pointer"
                      />
                      <span className="text-sm text-[#1C1B1B] group-hover:text-[#B90064] transition-colors font-medium">
                        Importer
                      </span>
                    </div>
                    <span className="text-xs text-[#594047] bg-[#F0EDEC] px-2 py-0.5 rounded-full font-semibold">
                      12
                    </span>
                  </label>
                </div>
              )}
            </div>

            {/* Accordion: Trust & Safety */}
            <div className="border-b border-[#E8E8E8]">
              <button
                onClick={() => toggleSection('trustSafety')}
                className="w-full flex justify-between items-center p-5 text-sm font-bold text-[#1C1B1B] hover:bg-[#F7F2F2] transition-colors cursor-pointer"
              >
                <span>Trust & Safety</span>
                {openSections.trustSafety ? (
                  <ChevronUp className="w-4 h-4 text-[#8C7077]" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-[#8C7077]" />
                )}
              </button>

              {openSections.trustSafety && (
                <div className="px-5 pb-5 flex flex-col gap-3.5">
                  <label className="flex justify-between items-center cursor-pointer group">
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={verifiedOnly}
                        onChange={(e) => setVerifiedOnly(e.target.checked)}
                        className="w-4 h-4 rounded text-[#B90064] focus:ring-[#B90064] border-[#8C7077] cursor-pointer"
                      />
                      <span className="text-sm text-[#1C1B1B] group-hover:text-[#B90064] transition-colors font-medium">
                        Nexora Verified Only
                      </span>
                    </div>
                    <CheckCircle2 className="w-4 h-4 text-[#B90064]" />
                  </label>

                  <label className="flex justify-between items-center cursor-pointer group">
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={topRatedOnly}
                        onChange={(e) => setTopRatedOnly(e.target.checked)}
                        className="w-4 h-4 rounded text-[#B90064] focus:ring-[#B90064] border-[#8C7077] cursor-pointer"
                      />
                      <span className="text-sm text-[#1C1B1B] group-hover:text-[#B90064] transition-colors font-medium">
                        Top Rated (4.8+)
                      </span>
                    </div>
                    <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                  </label>
                </div>
              )}
            </div>

            {/* Accordion: Location / Region */}
            <div>
              <button
                onClick={() => toggleSection('location')}
                className="w-full flex justify-between items-center p-5 text-sm font-bold text-[#1C1B1B] hover:bg-[#F7F2F2] transition-colors cursor-pointer"
              >
                <span>Location Hub</span>
                {openSections.location ? (
                  <ChevronUp className="w-4 h-4 text-[#8C7077]" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-[#8C7077]" />
                )}
              </button>

              {openSections.location && (
                <div className="px-5 pb-5 flex flex-col gap-2">
                  {['Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Paris', 'New York', 'Milan', 'Dubai'].map((city) => (
                    <button
                      key={city}
                      onClick={() => setSelectedCity(selectedCity === city.toLowerCase() ? '' : city.toLowerCase())}
                      className={`text-left px-3 py-2 rounded-lg text-xs font-medium transition-colors cursor-pointer flex justify-between items-center ${
                        selectedCity === city.toLowerCase()
                          ? 'bg-[#FFF0F5] text-[#B90064] font-bold border border-[#FFD6E5]'
                          : 'hover:bg-[#F0EDEC] text-[#594047]'
                      }`}
                    >
                      <span>{city}</span>
                      {selectedCity === city.toLowerCase() && <span>✓</span>}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Apply Filters Button */}
            <div className="p-5 bg-[#FCF9F8] border-t border-[#E8E8E8]">
              <button
                onClick={() => {
                  document.getElementById('suppliers-results')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full bg-[#B90064] text-white px-6 py-3 rounded-full text-xs font-bold hover:bg-[#8E004B] transition-colors duration-200 min-h-[44px] shadow-sm cursor-pointer"
              >
                Apply Filters
              </button>
            </div>
          </div>

          {/* Supplier Registration Promo Card */}
          <div className="bg-gradient-to-br from-[#FFF5F8] via-[#FFF0F5] to-white border border-[#FFD6E5] rounded-2xl p-5 shadow-xs flex flex-col gap-3">
            <div className="w-10 h-10 rounded-xl bg-white border border-[#FFD6E5] text-[#B90064] flex items-center justify-center shadow-xs">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#1C1B1B]">Are you a Distributor?</h3>
              <p className="text-xs text-[#594047] mt-1 leading-relaxed">
                Connect with 12,000+ verified salons, spas, and aesthetic clinics across India and worldwide.
              </p>
            </div>
            <button
              onClick={onOpenRegister}
              className="mt-1 bg-[#B90064] text-white px-4 py-2 rounded-full text-xs font-bold hover:bg-[#8E004B] transition-colors shadow-xs cursor-pointer flex items-center justify-center gap-1.5"
            >
              <span>List Your Business</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </aside>

        {/* Right: Results Area (3/4 width) */}
        <section className="w-full flex-grow flex flex-col gap-6">
          {/* Header Row */}
          <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-4 pb-2 border-b border-[#E8E8E8]">
            <div>
              <div className="flex items-center gap-3">
                <h2 className="text-2xl font-bold text-[#1C1B1B]">Premium Suppliers</h2>
                <div className="inline-flex items-center gap-1 bg-[#FFF0F5] border border-[#FFD6E5] text-[#B90064] text-xs font-bold px-2.5 py-0.5 rounded-full">
                  <span>{filteredSuppliers.length}</span>
                  <span className="font-normal text-[11px]">available</span>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-[#594047] mt-1">
                Showing curated manufacturers, regional distributors, and authorized wholesale suppliers
              </p>
            </div>

            <div className="flex items-center gap-3 self-end sm:self-auto">
              <span className="text-xs font-semibold text-[#594047] uppercase tracking-wider">Sort by:</span>
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-white border border-[#E8E8E8] rounded-full pl-4 pr-10 py-2 text-xs font-semibold text-[#1C1B1B] focus:outline-none focus:border-[#B90064] focus:ring-1 focus:ring-[#B90064] cursor-pointer appearance-none shadow-2xs"
                >
                  <option value="recommended">Recommended</option>
                  <option value="rating">Highest Rated</option>
                  <option value="newest">Newest Established</option>
                  <option value="orders">Lowest MOQ</option>
                </select>
                <ChevronDown className="w-4 h-4 text-[#8C7077] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* High Density Editorial Cards Stack */}
          {displayedSuppliers.length > 0 ? (
            <div className="flex flex-col gap-6">
              {displayedSuppliers.map((supplier) => (
                <motion.article
                  key={supplier.id}
                  onClick={() => onSelectPartner(supplier)}
                  whileHover={{ y: -5, scale: 1.008 }}
                  transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                  className="bg-white border border-[#E8E8E8] rounded-2xl overflow-hidden hover:shadow-lg hover:border-[#B90064]/40 transition-all duration-300 flex flex-col md:flex-row group cursor-pointer"
                >
                  {/* Left: Image Cover */}
                  <div className="w-full md:w-[290px] h-52 md:h-auto relative overflow-hidden flex-shrink-0 bg-neutral-100">
                    <img
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      src={
                        supplier.coverImage ||
                        'https://lh3.googleusercontent.com/aida-public/AB6AXuCK-1tyXdcZhq03-TknCZ3gj6usizy9FmYBWyXQZlEScGfVq8T_ErDPFErYxAkuiVtq1xmegqXRtquzvh_V0hgWSBFfHqkJEGEyePtXBmhFZ6NgHonkxGvxrYSpwS5NYPGs6yOR7iHtUhmsMalVUgxHJ4wqzY_LJBzIQYY0Dw-t7B46Jglat6owcHZ9QLSSfrM8ImMQbj_n3TvkV5O37biJ2dDtkDu9PgLKS34ZsO28OndThcLh2dUo'
                      }
                      alt={supplier.name}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/20 to-transparent" />

                    {/* Verified vs Free Supplier Badge */}
                    <div className="absolute bottom-4 left-4 flex gap-2">
                      {supplier.verified ? (
                        <span className="bg-[#B90064] text-white px-2.5 py-1 rounded-md text-[10px] font-extrabold tracking-wider flex items-center gap-1 shadow-md">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          NEXORA VERIFIED
                        </span>
                      ) : (
                        <span className="bg-white text-[#1C1B1B] px-2.5 py-1 rounded-md text-[10px] font-bold tracking-wider flex items-center gap-1 shadow-md border border-[#E8E8E8]">
                          FREE SUPPLIER
                        </span>
                      )}
                    </div>

                    {/* Brand Avatar Overlay */}
                    <div className="absolute top-4 left-4 w-12 h-12 bg-white rounded-xl shadow-md p-1 border border-[#E8E8E8]">
                      <div className="w-full h-full bg-[#FFF0F5] rounded-lg flex items-center justify-center font-extrabold text-[#B90064] text-lg">
                        {supplier.initials || supplier.name.charAt(0)}
                      </div>
                    </div>
                  </div>

                  {/* Right: Content */}
                  <div className="flex-grow p-6 flex flex-col justify-between">
                    <div>
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-2">
                        <div>
                          <h3 className="text-xl font-bold text-[#1C1B1B] group-hover:text-[#B90064] transition-colors flex items-center gap-2">
                            <span>{supplier.name}</span>
                            {supplier.verified && (
                              <CheckCircle2 className="w-4 h-4 text-[#B90064] shrink-0 inline" />
                            )}
                          </h3>
                          <div className="flex flex-wrap items-center gap-2.5 mt-1 text-xs text-[#594047]">
                            <span className="font-semibold uppercase tracking-wider text-[11px] text-[#8C7077]">
                              {supplier.businessTypeDetail || `${supplier.type} & Wholesaler`}
                            </span>
                            <span className="w-1 h-1 rounded-full bg-[#E0BEC6]" />
                            <div className="flex items-center text-amber-500 font-bold">
                              <Star className="w-3.5 h-3.5 fill-amber-500 inline mr-1" />
                              <span className="text-[#1C1B1B]">{supplier.rating.toFixed(1)}</span>
                              <span className="text-[#8C7077] font-normal ml-1">({supplier.reviewsCount})</span>
                            </div>
                            <span className="w-1 h-1 rounded-full bg-[#E0BEC6]" />
                            <span>Est. {supplier.establishedYear}</span>
                          </div>
                        </div>

                        {/* Location Badge */}
                        <div className="flex items-center gap-1 text-[#594047] bg-[#F7F2F2] px-3 py-1.5 rounded-full border border-[#E8E8E8] text-xs font-medium self-start">
                          <MapPin className="w-3.5 h-3.5 text-[#B90064]" />
                          <span>{supplier.location}</span>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-xs sm:text-sm text-[#594047] mt-2.5 leading-relaxed line-clamp-2">
                        {supplier.description}
                      </p>

                      {/* Horizontal Product Thumbnail Strip */}
                      <div className="flex items-center gap-2.5 mt-4">
                        {(supplier.sampleImages || [
                          'https://lh3.googleusercontent.com/aida-public/AB6AXuCNZWlxo1GE3RfXkL38ez9qU0PUaR7lM3gFLgHj5X30C7AnefXJPRYe2XMQqGRC7kE4z1Ktw4Jz9S_xpPzIMskSLPI-FbsfkH_mUOuZZidEIttsWlQ0Coo_R_tTmGPebKfznKeY_IPlVFQ16VrVlkTKasvjuTQY8Jd6Bq0yu2WpICmzZWm8IeXqxKd0DFZWWWVDR-trwOaAQD98vBxOIhHXcEUtC_R0Amcxb44DE-fqXreE85PhKhjK',
                          'https://lh3.googleusercontent.com/aida-public/AB6AXuDnJB1h3l7QdG5inXNig2zQ_SNPj47UYUQuqySdluwxz_WqsOistnvQgDWWr3KGPj9W88GD4v4WsKhV2my9Jjy_HBdVevJqKf2wnkEYAriuiq3-SgtrzyleSHjA348ir1OZ8UydadWzsQs41aVeB2R8L4xXTjgtlv1pj7JY-dILg8my7KJaI8GQXw6frw3-h0vYuO9uFdSdR1y92b_ujj1iMWbHUtBgy_O8AKm7I1eHK42mxiWySf5T'
                        ]).map((imgSrc, i) => (
                          <div
                            key={i}
                            className="w-14 h-14 sm:w-16 sm:h-16 rounded-lg bg-[#F0EDEC] border border-[#E8E8E8] overflow-hidden shrink-0"
                          >
                            <img src={imgSrc || undefined} alt="Sample product" className="w-full h-full object-cover" />
                          </div>
                        ))}
                        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-lg bg-[#F7F2F2] border border-[#E8E8E8] flex flex-col items-center justify-center text-[#594047] text-xs font-bold shrink-0">
                          <span>+{supplier.productCount > 0 ? supplier.productCount : 12}</span>
                          <span className="text-[9px] font-normal text-[#8C7077]">items</span>
                        </div>

                        {/* Logistics preview */}
                        <div className="hidden lg:flex flex-col text-[11px] text-[#594047] ml-3 pl-3 border-l border-[#E8E8E8]">
                          <span className="font-semibold text-[#1C1B1B]">Response: <strong className="text-[#B90064] font-bold">{supplier.responseRate}</strong></span>
                          <span className="text-[#8C7077]">Min Order: ${supplier.minOrderValue}</span>
                        </div>
                      </div>
                    </div>

                    {/* Footer Row */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mt-5 pt-4 border-t border-[#F0EDEC]">
                      {/* Tags */}
                      <div className="flex flex-wrap gap-1.5">
                        {supplier.tags?.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="bg-[#FCF9F8] border border-[#E0BEC6] px-3 py-1 rounded-md text-[11px] font-semibold text-[#594047]"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Action buttons */}
                      <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onSelectPartner(supplier);
                          }}
                          className="px-5 py-2 rounded-full border border-[#B90064] text-[#B90064] text-xs hover:bg-[#B90064] hover:text-white transition-colors font-bold shadow-2xs cursor-pointer"
                        >
                          View Profile
                        </button>

                        <button
                          onClick={(e) => handleCall(supplier.phone, e)}
                          className="w-9 h-9 rounded-full bg-[#F7F2F2] border border-[#E8E8E8] flex items-center justify-center text-[#1C1B1B] hover:text-[#B90064] hover:border-[#B90064] transition-colors cursor-pointer"
                          title="Call Supplier"
                        >
                          <Phone className="w-4 h-4" />
                        </button>

                        <button
                          onClick={(e) => handleWhatsApp(supplier.whatsapp, supplier.name, e)}
                          className="w-9 h-9 rounded-full bg-[#25D366]/10 border border-[#25D366]/30 flex items-center justify-center text-[#25D366] hover:bg-[#25D366] hover:text-white transition-colors cursor-pointer"
                          title="Chat on WhatsApp"
                        >
                          <MessageCircle className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          ) : (
            <div className="bg-white border border-[#E8E8E8] rounded-2xl p-12 text-center flex flex-col items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-[#FFF0F5] text-[#B90064] flex items-center justify-center">
                <Search className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-[#1C1B1B]">No suppliers found</h3>
              <p className="text-xs text-[#594047] max-w-md">
                We couldn't find any suppliers matching your current filter criteria. Try clearing some filters or searching for another category.
              </p>
              <button
                onClick={handleClearAll}
                className="mt-2 bg-[#B90064] text-white px-5 py-2 rounded-full text-xs font-bold hover:bg-[#8E004B] transition-colors cursor-pointer"
              >
                Reset All Filters
              </button>
            </div>
          )}

          {/* Pagination / Load More Button */}
          {visibleCount < filteredSuppliers.length && (
            <div className="flex justify-center mt-6">
              <button
                onClick={() => setVisibleCount((prev) => prev + 4)}
                className="bg-white border border-[#8C7077] text-[#1C1B1B] px-8 py-3 rounded-full text-xs font-bold hover:bg-[#F7F2F2] transition-colors duration-200 min-h-[44px] shadow-2xs cursor-pointer flex items-center gap-2"
              >
                <span>Load More Results</span>
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>
          )}
        </section>
      </div>

      {/* 4. Verified Distributor Video Testimonials & Highlights Section */}
      {videoTestimonials.length > 0 && onSelectVideo && (
        <div className="max-w-[1440px] mx-auto w-full px-4 sm:px-6 md:px-10 pt-8">
          <div className="border-t border-[#E8E8E8] pt-10">
            <VideoTestimonials
              videos={videoTestimonials}
              distributors={partners}
              products={products}
              onSelectVideo={onSelectVideo}
              onOpenSubmitModal={onOpenSubmitModal}
              onAddToQuote={onAddToQuote}
              onSelectSupplier={(supplierId) => {
                const partner = partners.find((p) => p.id === supplierId);
                if (partner) onSelectPartner(partner);
              }}
              likedVideoIds={likedVideoIds}
              onLikeVideo={onLikeVideo}
              title="Verified Distributor Video Highlights"
              subtitle="Watch high-definition backbar demonstrations, chemical peel unboxings, and clinic protocol trials recorded by authorized suppliers."
            />
          </div>
        </div>
      )}
    </div>
  );
};
