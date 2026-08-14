import React, { useState, useRef, useEffect, useMemo } from 'react';
import { 
  Search, 
  ChevronDown, 
  Sparkles, 
  MapPin, 
  Building2, 
  Package, 
  ArrowRight, 
  X, 
  Clock, 
  Trash2, 
  Scissors, 
  Palette, 
  Brush, 
  Hand, 
  Flower2, 
  Heart, 
  PenTool, 
  Armchair, 
  Wrench, 
  ShieldCheck, 
  Flame, 
  Filter, 
  CornerDownLeft,
  Check
} from 'lucide-react';
import { CITIES, MOCK_PRODUCTS, MOCK_PARTNERS, CATEGORIES } from '../data/mockData';
import { CategoryId, Product, SupplierPartner } from '../types';

interface HeroSectionProps {
  onSearch: (query: string, scope: 'all' | 'products' | 'brands' | 'suppliers', city?: string, category?: CategoryId | 'all') => void;
  selectedCity?: string;
  setSelectedCity?: (city: string) => void;
  onOpenCitySelector?: () => void;
  onSelectCategory?: (catId: CategoryId) => void;
}

const PRESET_POPULAR_QUERIES = [
  'Peptide Rich Formula Cream',
  'Ionic Salon Dryer X2',
  'Pro Master Brush Set',
  'Caviar Repair Hair Mask',
  'DermaGlow Clinical Skincare',
  'Hydraulic Treatment Spa Bed',
  'Hyaluronic Multi-Molecular Serum',
  'Micro-Pigment Cosmetic Ink',
  'Backbar Botanical Shampoo Gallon',
  'LED Light Therapy Facial Mask',
  'AeroPro Salon Equipment',
  'Organic Essential Massage Oils',
  'Long-Wear Salon Gel Polish',
  'Luxe Elite Distribution Paris',
  'Global Glamour Cosmetics Supply'
];

const CATEGORY_ICON_MAP: Record<string, React.ReactNode> = {
  skincare: <Sparkles className="w-3.5 h-3.5" />,
  haircare: <Scissors className="w-3.5 h-3.5" />,
  haircolor: <Palette className="w-3.5 h-3.5" />,
  makeup: <Brush className="w-3.5 h-3.5" />,
  nails: <Hand className="w-3.5 h-3.5" />,
  spa: <Flower2 className="w-3.5 h-3.5" />,
  massage: <Heart className="w-3.5 h-3.5" />,
  tattoo: <PenTool className="w-3.5 h-3.5" />,
  furniture: <Armchair className="w-3.5 h-3.5" />,
  tools: <Wrench className="w-3.5 h-3.5" />
};

export const HeroSection: React.FC<HeroSectionProps> = ({
  onSearch,
  selectedCity = 'Paris, EU',
  setSelectedCity,
  onOpenCitySelector,
  onSelectCategory
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchScope, setSearchScope] = useState<'all' | 'products' | 'brands' | 'suppliers'>('all');
  const [activeCategoryTag, setActiveCategoryTag] = useState<CategoryId | 'all'>('all');
  const [activeQuickFilter, setActiveQuickFilter] = useState<string | null>(null);
  
  const [isScopeOpen, setIsScopeOpen] = useState(false);
  const [isCityOpen, setIsCityOpen] = useState(false);
  const [isSuggestionsOpen, setIsSuggestionsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);

  // Recent searches saved in localStorage
  const [recentSearches, setRecentSearches] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('nexora_recent_searches');
      return saved ? JSON.parse(saved) : ['Peptide Serums', 'Ionic Dryer', 'Salon Furniture', 'DermaGlow'];
    } catch {
      return ['Peptide Serums', 'Ionic Dryer', 'Salon Furniture', 'DermaGlow'];
    }
  });

  const searchContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scopes: Array<{ id: 'all' | 'products' | 'brands' | 'suppliers'; label: string }> = [
    { id: 'all', label: 'All Catalog' },
    { id: 'products', label: 'Products' },
    { id: 'brands', label: 'Brands' },
    { id: 'suppliers', label: 'Distributors' }
  ];

  // Save recent search
  const saveRecentSearch = (query: string) => {
    if (!query.trim()) return;
    const clean = query.trim();
    const updated = [clean, ...recentSearches.filter(s => s.toLowerCase() !== clean.toLowerCase())].slice(0, 6);
    setRecentSearches(updated);
    try {
      localStorage.setItem('nexora_recent_searches', JSON.stringify(updated));
    } catch (e) {
      console.error('Could not save recent searches', e);
    }
  };

  const removeRecentSearch = (queryToRemove: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = recentSearches.filter(s => s !== queryToRemove);
    setRecentSearches(updated);
    try {
      localStorage.setItem('nexora_recent_searches', JSON.stringify(updated));
    } catch (err) {
      console.error(err);
    }
  };

  const clearAllRecent = (e: React.MouseEvent) => {
    e.stopPropagation();
    setRecentSearches([]);
    try {
      localStorage.removeItem('nexora_recent_searches');
    } catch (err) {
      console.error(err);
    }
  };

  // Handle outside click to close dropdowns
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setIsSuggestionsOpen(false);
        setIsScopeOpen(false);
        setIsCityOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter products according to category tag and query
  const matchingProducts = useMemo(() => {
    let list = MOCK_PRODUCTS;
    if (activeCategoryTag !== 'all') {
      list = list.filter(p => p.category === activeCategoryTag);
    }
    if (activeQuickFilter === 'moq') {
      list = list.filter(p => p.moq <= 20);
    } else if (activeQuickFilter === 'stock') {
      list = list.filter(p => p.stockStatus === 'In Stock');
    } else if (activeQuickFilter === 'verified') {
      list = list.filter(p => p.isVerified);
    }

    if (!searchQuery.trim()) {
      return list.slice(0, 3);
    }
    const q = searchQuery.toLowerCase().trim();
    return list.filter(p => 
      p.name.toLowerCase().includes(q) || 
      p.brand.toLowerCase().includes(q) ||
      p.tag.toLowerCase().includes(q)
    ).slice(0, 4);
  }, [searchQuery, activeCategoryTag, activeQuickFilter]);

  // Filter partners
  const matchingPartners = useMemo(() => {
    let list = MOCK_PARTNERS;
    if (activeQuickFilter === 'verified') {
      list = list.filter(p => p.verified);
    }
    if (!searchQuery.trim()) {
      return list.slice(0, 2);
    }
    const q = searchQuery.toLowerCase().trim();
    return list.filter(p => 
      p.name.toLowerCase().includes(q) ||
      p.tags.some(t => t.toLowerCase().includes(q)) ||
      p.location.toLowerCase().includes(q)
    ).slice(0, 3);
  }, [searchQuery, activeQuickFilter]);

  // Candidate terms for predictive typeahead autocompletion
  const allCandidateTerms = useMemo(() => {
    const pool = new Set<string>();
    PRESET_POPULAR_QUERIES.forEach(q => pool.add(q));
    MOCK_PRODUCTS.forEach(p => {
      pool.add(p.name);
      pool.add(`${p.brand} ${p.categoryLabel}`);
      pool.add(p.brand);
    });
    MOCK_PARTNERS.forEach(p => {
      pool.add(p.name);
      p.tags.forEach(t => pool.add(`${t} Wholesale`));
    });
    CATEGORIES.forEach(c => {
      pool.add(`${c.name} Formulations`);
      pool.add(`${c.name} Wholesale`);
    });
    return Array.from(pool);
  }, []);

  // Predictive candidate calculation (Ghost Text)
  const predictiveMatch = useMemo(() => {
    if (!searchQuery.trim() || searchQuery.length < 2) return null;
    const q = searchQuery.toLowerCase();
    
    // Check if any candidate starts strictly with the query
    const match = allCandidateTerms.find(term => term.toLowerCase().startsWith(q) && term.toLowerCase() !== q);
    if (match) {
      return {
        fullText: match,
        suffix: match.slice(searchQuery.length)
      };
    }
    return null;
  }, [searchQuery, allCandidateTerms]);

  // Query suggestions list
  const querySuggestions = useMemo(() => {
    if (!searchQuery.trim()) {
      return PRESET_POPULAR_QUERIES.slice(0, 4);
    }
    const q = searchQuery.toLowerCase();
    const matches = allCandidateTerms
      .filter(t => t.toLowerCase().includes(q))
      .slice(0, 4);
    return matches.length > 0 ? matches : [`${searchQuery} Wholesale`, `${searchQuery} Bulk Orders`];
  }, [searchQuery, allCandidateTerms]);

  // Total selectable items in dropdown for keyboard navigation
  const selectableCount = useMemo(() => {
    return querySuggestions.length + matchingProducts.length + matchingPartners.length;
  }, [querySuggestions, matchingProducts, matchingPartners]);

  // Handle Form Submit
  const handleSubmit = (e?: React.FormEvent, customQuery?: string) => {
    if (e) e.preventDefault();
    const term = (customQuery !== undefined ? customQuery : searchQuery).trim();
    if (term) {
      saveRecentSearch(term);
    }
    setIsSuggestionsOpen(false);
    onSearch(term, searchScope, selectedCity, activeCategoryTag);
  };

  // Handle Selection from dropdown
  const handleSelectSuggestion = (query: string, scope: 'all' | 'products' | 'brands' | 'suppliers' = 'products') => {
    setSearchQuery(query);
    setSearchScope(scope);
    saveRecentSearch(query);
    setIsSuggestionsOpen(false);
    onSearch(query, scope, selectedCity, activeCategoryTag);
  };

  // Complete the ghost predictive text
  const handleAcceptPredictive = () => {
    if (predictiveMatch) {
      setSearchQuery(predictiveMatch.fullText);
      inputRef.current?.focus();
    }
  };

  // Keyboard navigation inside search input
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Tab' || (e.key === 'ArrowRight' && inputRef.current?.selectionStart === searchQuery.length)) {
      if (predictiveMatch) {
        e.preventDefault();
        handleAcceptPredictive();
        return;
      }
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (!isSuggestionsOpen) {
        setIsSuggestionsOpen(true);
      } else {
        setSelectedIndex(prev => (prev < selectableCount - 1 ? prev + 1 : 0));
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (prev > 0 ? prev - 1 : selectableCount - 1));
    } else if (e.key === 'Enter') {
      if (selectedIndex >= 0 && isSuggestionsOpen) {
        e.preventDefault();
        // Execute highlighted selection
        let currentIndex = 0;
        // 1. Check queries
        if (selectedIndex < querySuggestions.length) {
          handleSelectSuggestion(querySuggestions[selectedIndex], searchScope);
          return;
        }
        currentIndex += querySuggestions.length;
        // 2. Check products
        const productIndex = selectedIndex - currentIndex;
        if (productIndex < matchingProducts.length) {
          handleSelectSuggestion(matchingProducts[productIndex].name, 'products');
          return;
        }
        currentIndex += matchingProducts.length;
        // 3. Check partners
        const partnerIndex = selectedIndex - currentIndex;
        if (partnerIndex < matchingPartners.length) {
          handleSelectSuggestion(matchingPartners[partnerIndex].name, 'suppliers');
          return;
        }
      }
      handleSubmit();
    } else if (e.key === 'Escape') {
      setIsSuggestionsOpen(false);
      setSelectedIndex(-1);
    }
  };

  const handleCategoryTagClick = (catId: CategoryId | 'all') => {
    setActiveCategoryTag(catId);
    if (catId !== 'all' && onSelectCategory) {
      // Keep category filter ready
    }
    inputRef.current?.focus();
  };

  // Helper to highlight matching substrings
  const highlightMatch = (text: string, query: string) => {
    if (!query.trim()) return text;
    const index = text.toLowerCase().indexOf(query.toLowerCase());
    if (index === -1) return text;
    const before = text.slice(0, index);
    const match = text.slice(index, index + query.length);
    const after = text.slice(index + query.length);
    return (
      <span>
        {before}
        <strong className="text-[#B8005A] font-extrabold bg-[#FFF0F5] px-0.5 rounded">{match}</strong>
        {after}
      </span>
    );
  };

  return (
    <section className="relative w-full min-h-[600px] sm:min-h-[660px] flex items-center justify-center overflow-hidden py-16">
      {/* Background Image with warm luxury aesthetic */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 scale-105"
        style={{
          backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuD_8XRqnZ42dwqZX7WXwBzA5qYrdD6gdYSfQKIo5Av0zIYIbI9FYU4LibxTMaHYeIu7iCp2qlIoWXzct-aGaRx3wnMjFE1N12YFVZFYFzkxGoV6IM8rf0h2VLe8tSkTPbTJ02KyDx0eyMc5YT3kXCj8A_Rq6B4WqZjqJQUOzDVZMAiwbJZHJ4HWGlH51G7jdxpcMsuOkmjC8JK_Cly1o2jyWg57BRjwTSGU2FIK3HRy4iWOS1lmQXx9')`
        }}
      >
        {/* Soft Dark Amber & Vignette Overlay for Crisp Readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/40 to-black/75 mix-blend-multiply" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-black/20 to-black/60" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center flex flex-col items-center">
        {/* Top subtle luxury badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/30 text-white text-xs font-semibold mb-5 tracking-wider shadow-lg">
          <Sparkles className="w-3.5 h-3.5 text-[#FFB3D1]" />
          <span>Exclusive B2B Wholesale & Distribution Portal</span>
        </div>

        {/* Exact Headline */}
        <h1 className="text-3xl sm:text-5xl md:text-[54px] leading-tight sm:leading-[1.15] font-extrabold text-white tracking-tight max-w-4xl drop-shadow-lg">
          The Premier Network for Luxury Beauty Businesses & Products
        </h1>

        {/* Subheading */}
        <p className="mt-4 text-base sm:text-lg text-white/90 font-normal max-w-2xl text-balance drop-shadow">
          Discover manufacturers, wholesalers, distributors, and professional products.
        </p>

        {/* CATEGORY FILTERING TAGS BAR (Directly above search bar for rapid filtering) */}
        <div className="mt-7 w-full max-w-4xl flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none px-2 justify-start sm:justify-center">
          <button
            type="button"
            onClick={() => handleCategoryTagClick('all')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer backdrop-blur-md shadow-xs ${
              activeCategoryTag === 'all'
                ? 'bg-[#B8005A] text-white border border-[#B8005A] scale-105 shadow-md'
                : 'bg-white/20 hover:bg-white/30 text-white/95 border border-white/30 hover:border-white/50'
            }`}
          >
            <Filter className="w-3 h-3" />
            <span>All Categories</span>
          </button>

          {CATEGORIES.map((cat) => {
            const isActive = activeCategoryTag === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => handleCategoryTagClick(cat.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer backdrop-blur-md shadow-xs ${
                  isActive
                    ? 'bg-[#B8005A] text-white border border-[#B8005A] font-bold scale-105 shadow-md'
                    : 'bg-white/20 hover:bg-white/30 text-white/95 border border-white/30 hover:border-white/50'
                }`}
              >
                {CATEGORY_ICON_MAP[cat.id] || <Sparkles className="w-3 h-3" />}
                <span>{cat.name}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  isActive ? 'bg-white/25 text-white' : 'bg-black/20 text-white/80'
                }`}>
                  {cat.itemCount}
                </span>
              </button>
            );
          })}
        </div>

        {/* MOST PROMINENT SEARCH BAR CONTAINER WITH PREDICTIVE TYPEAHEAD */}
        <div 
          ref={searchContainerRef}
          className="mt-3 w-full max-w-4xl relative z-30"
        >
          <form 
            onSubmit={handleSubmit}
            className="bg-white/95 backdrop-blur-xl p-2.5 sm:p-3 rounded-2xl sm:rounded-3xl border border-white/40 shadow-[0_16px_45px_rgba(0,0,0,0.35)] ring-1 ring-black/5 flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-2.5 transition-all hover:shadow-[0_20px_55px_rgba(0,0,0,0.45)]"
          >
            {/* Main Search Input with Ghost Predictive Text Overlay */}
            <div className="relative flex-1 bg-[#F9F9FB] border border-[#E8E8EE] focus-within:border-[#B8005A] focus-within:bg-white rounded-xl sm:rounded-2xl flex items-center px-4 py-3 sm:py-2.5 transition-all shadow-2xs">
              <Search className="w-4 h-4 text-[#8E8E93] shrink-0 mr-3" />
              
              {/* Active Category Scope Tag Chip inside Input (if active) */}
              {activeCategoryTag !== 'all' && (
                <div className="hidden sm:inline-flex items-center gap-1 bg-[#FFF0F5] border border-[#FFD1E3] text-[#B8005A] text-[11px] font-bold px-2 py-0.5 rounded-lg mr-2 shrink-0">
                  {CATEGORY_ICON_MAP[activeCategoryTag]}
                  <span className="capitalize">{activeCategoryTag}</span>
                  <button 
                    type="button" 
                    onClick={() => setActiveCategoryTag('all')}
                    className="hover:text-black ml-0.5"
                    title="Remove category filter"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              )}

              {/* Ghost Completion Text Container */}
              <div className="relative flex-1 flex items-center">
                {/* 1. Ghost Predictive Autocomplete (renders behind input) */}
                {predictiveMatch && (
                  <div 
                    aria-hidden="true" 
                    className="absolute inset-0 pointer-events-none flex items-center text-sm font-medium whitespace-pre overflow-hidden"
                  >
                    <span className="opacity-0">{searchQuery}</span>
                    <span className="text-[#B8005A]/40 font-medium select-none">
                      {predictiveMatch.suffix}
                    </span>
                  </div>
                )}

                {/* 2. Interactive Real Input */}
                <input
                  ref={inputRef}
                  type="text"
                  value={searchQuery}
                  onFocus={() => setIsSuggestionsOpen(true)}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setIsSuggestionsOpen(true);
                    setSelectedIndex(-1);
                  }}
                  onKeyDown={handleKeyDown}
                  placeholder={
                    activeCategoryTag !== 'all' 
                      ? `Search within ${CATEGORIES.find(c => c.id === activeCategoryTag)?.name || activeCategoryTag}...`
                      : "Search luxury products, formulas, brands, distributors..."
                  }
                  className="w-full bg-transparent text-sm text-[#1A1A1A] placeholder:text-[#8E8E93] font-medium focus:outline-none relative z-10"
                />
              </div>

              {/* Predictive Tab Helper Pill */}
              {predictiveMatch && (
                <button
                  type="button"
                  onClick={handleAcceptPredictive}
                  className="hidden md:inline-flex items-center gap-1 text-[10px] font-bold text-[#B8005A] bg-[#FFF0F5] border border-[#FFD1E3] px-2 py-0.5 rounded-md mr-1 shrink-0 cursor-pointer hover:bg-[#FFE0EB] transition-colors"
                  title="Click or press Tab to complete"
                >
                  <span>Tab</span>
                  <CornerDownLeft className="w-2.5 h-2.5" />
                </button>
              )}

              {/* Clear Input Button */}
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery('');
                    inputRef.current?.focus();
                  }}
                  className="p-1 hover:bg-gray-200 rounded-full text-gray-400 hover:text-gray-600 transition-colors shrink-0"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Scope Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  setIsScopeOpen(!isScopeOpen);
                  setIsCityOpen(false);
                  setIsSuggestionsOpen(false);
                }}
                className="w-full sm:w-auto bg-[#F4F4F6] hover:bg-[#EBEBEF] border border-[#E2E2E8] text-xs sm:text-sm font-semibold text-[#2C2C2E] px-4 py-3 sm:py-2.5 rounded-xl sm:rounded-2xl flex items-center justify-between gap-2.5 transition-colors cursor-pointer"
              >
                <span>{scopes.find(s => s.id === searchScope)?.label || 'All Catalog'}</span>
                <ChevronDown className="w-4 h-4 text-[#737373] shrink-0" />
              </button>

              {isScopeOpen && (
                <div className="absolute top-full mt-2 left-0 w-48 bg-white rounded-2xl shadow-2xl border border-[#EDEDED] py-1.5 z-40 animate-in fade-in zoom-in-95 duration-150">
                  <div className="px-3 py-1 text-[10px] uppercase font-bold text-[#8E8E93] tracking-wider">
                    Search Scope
                  </div>
                  {scopes.map((s) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => {
                        setSearchScope(s.id);
                        setIsScopeOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2.5 text-xs sm:text-sm transition-colors hover:bg-[#FFF0F5] hover:text-[#B8005A] font-medium flex items-center justify-between ${
                        searchScope === s.id ? 'text-[#B8005A] font-bold bg-[#FFF0F5]/70' : 'text-[#333]'
                      }`}
                    >
                      <span>{s.label}</span>
                      {searchScope === s.id && <Check className="w-3.5 h-3.5 text-[#B8005A]" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* City Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  if (onOpenCitySelector) {
                    onOpenCitySelector();
                  } else {
                    setIsCityOpen(!isCityOpen);
                    setIsScopeOpen(false);
                    setIsSuggestionsOpen(false);
                  }
                }}
                className="w-full sm:w-auto bg-[#F4F4F6] hover:bg-[#EBEBEF] border border-[#E2E2E8] text-xs sm:text-sm font-semibold text-[#2C2C2E] px-4 py-3 sm:py-2.5 rounded-xl sm:rounded-2xl flex items-center justify-between gap-2 transition-colors cursor-pointer"
              >
                <MapPin className="w-3.5 h-3.5 text-[#B8005A] shrink-0" />
                <span className="truncate max-w-[100px]">{selectedCity}</span>
                <ChevronDown className="w-4 h-4 text-[#737373] shrink-0" />
              </button>

              {isCityOpen && (
                <div className="absolute top-full mt-2 right-0 sm:left-0 w-52 bg-white rounded-2xl shadow-2xl border border-[#EDEDED] py-1.5 max-h-60 overflow-y-auto z-40 animate-in fade-in zoom-in-95 duration-150">
                  <div className="px-3 py-1 text-[10px] uppercase font-bold text-[#8E8E93] tracking-wider">
                    Sourcing Region
                  </div>
                  {CITIES.map((city) => (
                    <button
                      key={city}
                      type="button"
                      onClick={() => {
                        if (setSelectedCity) setSelectedCity(city);
                        setIsCityOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2.5 text-xs sm:text-sm transition-colors hover:bg-[#FFF0F5] hover:text-[#B8005A] flex items-center gap-2 ${
                        selectedCity === city ? 'text-[#B8005A] font-bold bg-[#FFF0F5]/70' : 'text-[#333]'
                      }`}
                    >
                      <MapPin className="w-3 h-3 text-[#B8005A]" />
                      <span>{city}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* High-Impact Luxury Search Button */}
            <button
              type="submit"
              className="bg-[#B8005A] hover:bg-[#A0004E] text-white text-xs sm:text-sm font-bold px-7 py-3 sm:py-2.5 rounded-xl sm:rounded-2xl transition-all shadow-md hover:shadow-lg active:scale-95 flex items-center justify-center gap-2 shrink-0 cursor-pointer"
            >
              <Search className="w-4 h-4" />
              <span>Search</span>
            </button>
          </form>

          {/* ADVANCED PREDICTIVE SUGGESTIONS & INSTANT RESULTS DROPDOWN */}
          {isSuggestionsOpen && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-3xl shadow-2xl border border-[#EAE5DE] p-4 sm:p-5 text-left z-40 animate-in fade-in slide-in-from-top-2 duration-200 max-h-[80vh] overflow-y-auto">
              
              {/* Filter Quick Pills inside dropdown */}
              <div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-3 border-b border-[#F0F0F0]">
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="text-[11px] font-bold text-[#8E8E93] uppercase tracking-wider mr-1">
                    Quick Filter:
                  </span>
                  {[
                    { id: 'all', label: 'All' },
                    { id: 'moq', label: '⚡ Low MOQ (<20)' },
                    { id: 'stock', label: '📦 In Stock' },
                    { id: 'verified', label: '✨ Verified Only' }
                  ].map(f => (
                    <button
                      key={f.id}
                      type="button"
                      onClick={() => setActiveQuickFilter(activeQuickFilter === f.id ? null : (f.id === 'all' ? null : f.id))}
                      className={`text-[11px] px-2.5 py-1 rounded-full font-bold transition-colors cursor-pointer ${
                        (activeQuickFilter === f.id || (!activeQuickFilter && f.id === 'all'))
                          ? 'bg-[#B8005A] text-white'
                          : 'bg-[#F4F4F6] text-[#555] hover:bg-[#EBEBEF]'
                      }`}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>

                {activeCategoryTag !== 'all' && (
                  <div className="flex items-center gap-1 text-[11px] text-[#B8005A] bg-[#FFF0F5] px-2.5 py-1 rounded-full font-bold border border-[#FFD1E3]">
                    <span>Category: <strong className="capitalize">{activeCategoryTag}</strong></span>
                    <button
                      type="button"
                      onClick={() => setActiveCategoryTag('all')}
                      className="hover:text-black ml-1 cursor-pointer"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                )}
              </div>

              {/* Main Content Grid: Predictive Queries, Products, Suppliers */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
                
                {/* Left Column: Predictive Queries & Recent Searches (4 cols) */}
                <div className="lg:col-span-4 space-y-4 border-b lg:border-b-0 lg:border-r border-[#F0F0F0] pb-4 lg:pb-0 lg:pr-4">
                  {/* Predictive Query Autocomplete Suggestions */}
                  <div>
                    <div className="flex items-center justify-between mb-2 px-1">
                      <span className="text-[11px] font-bold text-[#8E8E93] uppercase tracking-wider flex items-center gap-1.5">
                        <Flame className="w-3.5 h-3.5 text-[#B8005A]" />
                        {searchQuery ? 'Predictive Suggestions' : 'Trending Queries'}
                      </span>
                    </div>
                    <div className="space-y-1">
                      {querySuggestions.map((queryText, idx) => {
                        const isSelected = selectedIndex === idx;
                        return (
                          <button
                            key={queryText}
                            type="button"
                            onClick={() => handleSelectSuggestion(queryText, searchScope)}
                            className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-left transition-colors group cursor-pointer text-xs font-medium ${
                              isSelected ? 'bg-[#FFF0F5] text-[#B8005A] font-bold' : 'hover:bg-[#F9F9FB] text-[#2C2C2E]'
                            }`}
                          >
                            <div className="flex items-center gap-2 truncate">
                              <Search className="w-3.5 h-3.5 text-[#8E8E93] group-hover:text-[#B8005A] shrink-0" />
                              <span className="truncate">
                                {highlightMatch(queryText, searchQuery)}
                              </span>
                            </div>
                            <ArrowRight className="w-3.5 h-3.5 text-[#B8005A] opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Recent Searches (if available) */}
                  {recentSearches.length > 0 && (
                    <div className="pt-2 border-t border-[#F0F0F0]">
                      <div className="flex items-center justify-between mb-2 px-1">
                        <span className="text-[11px] font-bold text-[#8E8E93] uppercase tracking-wider flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-[#737373]" />
                          Recent Searches
                        </span>
                        <button
                          type="button"
                          onClick={clearAllRecent}
                          className="text-[10px] text-[#8E8E93] hover:text-[#B8005A] transition-colors"
                        >
                          Clear
                        </button>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {recentSearches.map((rec) => (
                          <div
                            key={rec}
                            onClick={() => handleSelectSuggestion(rec, searchScope)}
                            className="inline-flex items-center gap-1.5 bg-[#F4F4F6] hover:bg-[#FFF0F5] text-[#333] hover:text-[#B8005A] px-2.5 py-1 rounded-lg text-xs font-medium transition-colors cursor-pointer border border-[#E8E8EE]"
                          >
                            <span>{rec}</span>
                            <button
                              type="button"
                              onClick={(e) => removeRecentSearch(rec, e)}
                              className="hover:text-red-500 text-gray-400"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Right Column: Live Matching Products & Suppliers (8 cols) */}
                <div className="lg:col-span-8 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Matching Products */}
                    <div>
                      <div className="flex items-center justify-between mb-2 px-1">
                        <span className="text-[11px] font-bold text-[#8E8E93] uppercase tracking-wider flex items-center gap-1.5">
                          <Package className="w-3.5 h-3.5 text-[#B8005A]" />
                          {searchQuery ? 'Matching Products' : 'Featured Products'}
                        </span>
                        <span className="text-[10px] text-[#8E8E93]">
                          {matchingProducts.length} items
                        </span>
                      </div>
                      <div className="space-y-1.5">
                        {matchingProducts.length === 0 ? (
                          <div className="p-4 text-center text-xs text-[#8E8E93] bg-[#F9F9FB] rounded-xl">
                            No products match filter
                          </div>
                        ) : (
                          matchingProducts.map((p, pIdx) => {
                            const itemSelectIndex = querySuggestions.length + pIdx;
                            const isSelected = selectedIndex === itemSelectIndex;
                            return (
                              <button
                                key={p.id}
                                type="button"
                                onClick={() => handleSelectSuggestion(p.name, 'products')}
                                className={`w-full flex items-center justify-between p-2 rounded-xl transition-colors group cursor-pointer text-left border ${
                                  isSelected ? 'bg-[#FFF0F5] border-[#FFD1E3]' : 'hover:bg-[#FFF0F5] border-transparent hover:border-[#FFD1E3]'
                                }`}
                              >
                                <div className="flex items-center gap-2.5 min-w-0">
                                  <img 
                                    src={p.image} 
                                    alt={p.name} 
                                    className="w-10 h-10 rounded-lg object-cover border border-[#EDEDED] shrink-0" 
                                  />
                                  <div className="min-w-0">
                                    <p className="text-xs font-bold text-[#1E1E1E] group-hover:text-[#B8005A] transition-colors truncate">
                                      {highlightMatch(p.name, searchQuery)}
                                    </p>
                                    <div className="flex items-center gap-2 text-[10px] text-[#737373] mt-0.5">
                                      <span className="font-semibold text-[#1A1A1A]">${p.price.toFixed(2)}/{p.unit}</span>
                                      <span>•</span>
                                      <span>MOQ: {p.moq}</span>
                                      {p.stockStatus === 'In Stock' && (
                                        <span className="text-green-600 font-bold">In Stock</span>
                                      )}
                                    </div>
                                  </div>
                                </div>
                                <ArrowRight className="w-3.5 h-3.5 text-[#B8005A] opacity-0 group-hover:opacity-100 transition-opacity shrink-0 ml-2" />
                              </button>
                            );
                          })
                        )}
                      </div>
                    </div>

                    {/* Verified Distributors & Brands */}
                    <div>
                      <div className="flex items-center justify-between mb-2 px-1">
                        <span className="text-[11px] font-bold text-[#8E8E93] uppercase tracking-wider flex items-center gap-1.5">
                          <Building2 className="w-3.5 h-3.5 text-[#B8005A]" />
                          {searchQuery ? 'Matching Suppliers' : 'Verified Distributors'}
                        </span>
                        <span className="text-[10px] text-[#8E8E93]">
                          {matchingPartners.length} partners
                        </span>
                      </div>
                      <div className="space-y-1.5">
                        {matchingPartners.length === 0 ? (
                          <div className="p-4 text-center text-xs text-[#8E8E93] bg-[#F9F9FB] rounded-xl">
                            No suppliers match query
                          </div>
                        ) : (
                          matchingPartners.map((p, sIdx) => {
                            const itemSelectIndex = querySuggestions.length + matchingProducts.length + sIdx;
                            const isSelected = selectedIndex === itemSelectIndex;
                            return (
                              <button
                                key={p.id}
                                type="button"
                                onClick={() => handleSelectSuggestion(p.name, 'suppliers')}
                                className={`w-full flex items-center justify-between p-2 rounded-xl transition-colors group cursor-pointer text-left border ${
                                  isSelected ? 'bg-[#FFF0F5] border-[#FFD1E3]' : 'hover:bg-[#FFF0F5] border-transparent hover:border-[#FFD1E3]'
                                }`}
                              >
                                <div className="flex items-center gap-2.5 min-w-0">
                                  <div className="w-10 h-10 rounded-lg bg-[#FFF0F5] border border-[#FFD6E5] text-[#B8005A] font-bold text-xs flex items-center justify-center shrink-0">
                                    {p.initials}
                                  </div>
                                  <div className="min-w-0">
                                    <p className="text-xs font-bold text-[#1E1E1E] group-hover:text-[#B8005A] transition-colors truncate">
                                      {highlightMatch(p.name, searchQuery)}
                                    </p>
                                    <p className="text-[10px] text-[#737373] truncate">
                                      {p.type} • {p.location}
                                    </p>
                                  </div>
                                </div>
                                {p.verified ? (
                                  <span className="inline-flex items-center gap-1 text-[9px] font-extrabold text-white bg-gradient-to-r from-[#B8005A] via-[#931248] to-[#1E1E1E] px-2 py-0.5 rounded-full shrink-0 ml-2 border border-[#FFD1E3]/40 shadow-xs" title="Nexora Luxe Verified Partner Status">
                                    <ShieldCheck className="w-2.5 h-2.5 text-[#FFD700]" />
                                    VERIFIED PARTNER
                                  </span>
                                ) : (
                                  <span className="text-[9px] font-bold text-[#737373] bg-[#FAFAFA] border border-[#E5E5E5] px-2 py-0.5 rounded-md shrink-0 ml-2">
                                    SUPPLIER
                                  </span>
                                )}
                              </button>
                            );
                          })
                        )}
                      </div>
                    </div>
                  </div>
                </div>

              </div>

              {/* Bottom Quick Search Actions */}
              <div className="mt-4 pt-3 border-t border-[#F0F0F0] flex flex-wrap items-center justify-between gap-2 text-xs">
                <div className="flex items-center gap-2 text-[#8E8E93] text-[11px]">
                  <span>Navigate with <kbd className="bg-gray-100 px-1 py-0.5 rounded border text-[10px]">↑</kbd> <kbd className="bg-gray-100 px-1 py-0.5 rounded border text-[10px]">↓</kbd></span>
                  <span>•</span>
                  <span>Select with <kbd className="bg-gray-100 px-1.5 py-0.5 rounded border text-[10px]">Enter ↵</kbd></span>
                  {predictiveMatch && (
                    <>
                      <span>•</span>
                      <span>Autocomplete with <kbd className="bg-gray-100 px-1.5 py-0.5 rounded border text-[10px]">Tab ⇥</kbd></span>
                    </>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => handleSubmit()}
                  className="text-[#B8005A] font-bold text-xs hover:underline flex items-center gap-1 cursor-pointer ml-auto"
                >
                  <span>Explore all {matchingProducts.length + matchingPartners.length} results</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Quick Search Trending Tags Pills */}
        <div className="mt-5 flex flex-wrap items-center justify-center gap-2 text-xs text-white/90">
          <span className="text-white/70 font-medium flex items-center gap-1">
            <Flame className="w-3.5 h-3.5 text-[#FFB3D1]" />
            Trending:
          </span>
          {['Peptide Serums', 'Salon Ionic Dryers', 'Vegan Brushes', 'Micro-Pigments', 'Hydraulic Spa Beds', 'Hyaluronic Acid'].map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => {
                setSearchQuery(tag);
                saveRecentSearch(tag);
                onSearch(tag, 'products', selectedCity, activeCategoryTag);
              }}
              className="bg-white/15 hover:bg-white/25 backdrop-blur-md border border-white/25 rounded-full px-3 py-1 text-white font-medium transition-all hover:scale-105 active:scale-95 shadow-sm cursor-pointer"
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
