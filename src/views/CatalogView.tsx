import React, { useState, useMemo, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Sparkles, 
  SlidersHorizontal, 
  ArrowRight, 
  Check, 
  Grid, 
  List, 
  ShieldCheck, 
  Search, 
  X, 
  Tag, 
  ArrowLeftRight,
  TrendingUp,
  BarChart3,
  Flame,
  Calendar,
  Users,
  Award,
  Zap
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  Cell, 
  AreaChart, 
  Area, 
  CartesianGrid 
} from 'recharts';
import { Product, CategoryId } from '../types';
import { CATEGORIES } from '../data/mockData';
import { StarRating } from '../components/StarRating';

// Trending Data for Premium Buyers (Category Query Analytics)
const TRENDING_CATEGORY_METRICS = {
  '30d': [
    { name: 'Skincare', categoryId: 'skincare', queries: 4850, growth: 34.2, salons: 420, avgOrder: 1950, color: '#B8005A' },
    { name: 'Haircare', categoryId: 'haircare', queries: 3920, growth: 28.5, salons: 380, avgOrder: 1650, color: '#D91B73' },
    { name: 'Salon Tools', categoryId: 'tools', queries: 2840, growth: 42.1, salons: 290, avgOrder: 2400, color: '#931248' },
    { name: 'Hair Color', categoryId: 'haircolor', queries: 2150, growth: 18.4, salons: 240, avgOrder: 1400, color: '#C026D3' },
    { name: 'Spa & Wellness', categoryId: 'spa', queries: 1890, growth: 22.0, salons: 185, avgOrder: 2800, color: '#8B5CF6' },
    { name: 'Cosmetics', categoryId: 'makeup', queries: 1420, growth: 15.8, salons: 160, avgOrder: 1200, color: '#EC4899' },
    { name: 'Nail Care', categoryId: 'nails', queries: 1180, growth: 19.3, salons: 130, avgOrder: 950, color: '#F43F5E' },
  ],
  '7d': [
    { name: 'Skincare', categoryId: 'skincare', queries: 1240, growth: 38.0, salons: 190, avgOrder: 1920, color: '#B8005A' },
    { name: 'Haircare', categoryId: 'haircare', queries: 980, growth: 24.1, salons: 160, avgOrder: 1680, color: '#D91B73' },
    { name: 'Salon Tools', categoryId: 'tools', queries: 790, growth: 46.5, salons: 140, avgOrder: 2450, color: '#931248' },
    { name: 'Hair Color', categoryId: 'haircolor', queries: 540, growth: 16.2, salons: 110, avgOrder: 1380, color: '#C026D3' },
    { name: 'Spa & Wellness', categoryId: 'spa', queries: 480, growth: 20.8, salons: 95, avgOrder: 2820, color: '#8B5CF6' },
    { name: 'Cosmetics', categoryId: 'makeup', queries: 360, growth: 14.1, salons: 75, avgOrder: 1180, color: '#EC4899' },
    { name: 'Nail Care', categoryId: 'nails', queries: 310, growth: 18.0, salons: 65, avgOrder: 940, color: '#F43F5E' },
  ],
  '90d': [
    { name: 'Skincare', categoryId: 'skincare', queries: 13900, growth: 31.4, salons: 890, avgOrder: 1980, color: '#B8005A' },
    { name: 'Haircare', categoryId: 'haircare', queries: 11200, growth: 26.8, salons: 780, avgOrder: 1620, color: '#D91B73' },
    { name: 'Salon Tools', categoryId: 'tools', queries: 8100, growth: 39.8, salons: 620, avgOrder: 2380, color: '#931248' },
    { name: 'Hair Color', categoryId: 'haircolor', queries: 6300, growth: 17.9, salons: 510, avgOrder: 1410, color: '#C026D3' },
    { name: 'Spa & Wellness', categoryId: 'spa', queries: 5400, growth: 21.2, salons: 420, avgOrder: 2790, color: '#8B5CF6' },
    { name: 'Cosmetics', categoryId: 'makeup', queries: 4100, growth: 14.9, salons: 340, avgOrder: 1220, color: '#EC4899' },
    { name: 'Nail Care', categoryId: 'nails', queries: 3300, growth: 17.5, salons: 290, avgOrder: 960, color: '#F43F5E' },
  ],
};

interface CatalogViewProps {
  products: Product[];
  selectedCategory: CategoryId | 'all';
  searchQuery: string;
  compareProductIds?: string[];
  onToggleCompare?: (product: Product) => void;
  onOpenCompareModal?: () => void;
  onSelectProduct: (product: Product) => void;
  onSelectCategory: (cat: CategoryId | 'all') => void;
}

export const CatalogView: React.FC<CatalogViewProps> = ({
  products,
  selectedCategory,
  searchQuery: initialSearchQuery,
  compareProductIds = [],
  onToggleCompare,
  onOpenCompareModal,
  onSelectProduct,
  onSelectCategory
}) => {
  const [activeCategory, setActiveCategory] = useState<CategoryId | 'all'>(selectedCategory);
  const [localSearch, setLocalSearch] = useState(initialSearchQuery || '');
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [wholesaleOnly, setWholesaleOnly] = useState(false);
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high' | 'moq'>('featured');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  
  // Trending Analytics Chart States
  const [chartTimeframe, setChartTimeframe] = useState<'30d' | '7d' | '90d'>('30d');
  const [chartMetric, setChartMetric] = useState<'queries' | 'growth'>('queries');

  useEffect(() => {
    setActiveCategory(selectedCategory);
  }, [selectedCategory]);

  useEffect(() => {
    setLocalSearch(initialSearchQuery || '');
  }, [initialSearchQuery]);

  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        if (activeCategory !== 'all' && p.category !== activeCategory) return false;
        if (verifiedOnly && !p.isVerified) return false;
        if (wholesaleOnly && !p.isWholesale) return false;
        if (localSearch.trim()) {
          const q = localSearch.toLowerCase().trim();
          const matchesName = p.name.toLowerCase().includes(q);
          const matchesBrand = p.brand.toLowerCase().includes(q);
          const matchesTag = p.tag.toLowerCase().includes(q);
          const matchesSupplier = p.supplierName.toLowerCase().includes(q);
          if (!matchesName && !matchesBrand && !matchesTag && !matchesSupplier) return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') return a.price - b.price;
        if (sortBy === 'price-high') return b.price - a.price;
        if (sortBy === 'moq') return a.moq - b.moq;
        return 0;
      });
  }, [products, activeCategory, verifiedOnly, wholesaleOnly, localSearch, sortBy]);

  // Custom Chart Tooltip
  const CustomChartTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const item = payload[0].payload;
      return (
        <div className="bg-[#1A1A1A] text-white p-3.5 rounded-2xl border border-[#FFD1E3]/40 shadow-2xl text-xs space-y-1.5 z-50">
          <div className="flex items-center justify-between gap-3 border-b border-white/10 pb-1.5">
            <span className="font-extrabold text-[#FFD700] text-sm">{item.name}</span>
            <span className="bg-[#B8005A] text-white text-[10px] font-black px-2 py-0.5 rounded-full">
              +{item.growth}% MoM
            </span>
          </div>
          <div className="flex items-center justify-between gap-4 text-gray-300">
            <span>Inquiry / RFQ Volume:</span>
            <strong className="text-white font-black">{item.queries.toLocaleString()} RFQs</strong>
          </div>
          <div className="flex items-center justify-between gap-4 text-gray-300">
            <span>Active Premium Salons:</span>
            <strong className="text-white font-bold">{item.salons} Salons</strong>
          </div>
          <div className="flex items-center justify-between gap-4 text-gray-300">
            <span>Avg Wholesale PO:</span>
            <strong className="text-[#10B981] font-bold">${item.avgOrder}</strong>
          </div>
          <div className="text-[10px] text-gray-400 pt-1.5 border-t border-white/10 flex items-center gap-1 font-medium">
            <Sparkles className="w-3 h-3 text-[#B8005A]" />
            <span>Click bar to filter catalog products</span>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#FFF5F8] via-[#FFF0F5] to-white border border-[#FFD6E5] rounded-3xl p-6 sm:p-10 mb-8 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/80 border border-[#FFD1E3] text-[#B8005A] text-xs font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              Direct Factory & Distributor Wholesale
            </div>
            <h1 className="text-2xl sm:text-4xl font-bold text-[#1A1A1A] tracking-tight">
              Product Discovery Catalog
            </h1>
            <p className="text-xs sm:text-sm text-[#737373] mt-1.5 max-w-xl">
              Source verified luxury salon backbar essentials, aesthetic devices, and retail-ready cosmetics with tiered bulk pricing.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-[#4A4A4A] bg-white border border-[#EAE5DE] px-4 py-2 rounded-xl shadow-2xs">
              Showing <strong className="text-[#B8005A]">{filteredProducts.length}</strong> verified items
            </span>
          </div>
        </div>
      </div>

      {/* TRENDING NOW CHART: MOST QUERIED CATEGORIES FOR PREMIUM BUYERS */}
      <div className="bg-gradient-to-br from-[#1A1A1A] via-[#2A1824] to-[#121212] rounded-3xl border border-[#FFD1E3]/30 p-6 sm:p-8 mb-8 text-white shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#B8005A]/15 rounded-full blur-3xl pointer-events-none" />

        {/* Top Header Row */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/10 relative z-10">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-[#FFD700] text-[11px] font-extrabold uppercase tracking-wider mb-2">
              <Flame className="w-3.5 h-3.5 text-[#FFD700]" />
              Trending Now • Premium Buyer Analytics
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
              <span>Most Queried Product Categories</span>
              <span className="text-xs font-semibold text-gray-400 font-normal">
                ({chartTimeframe === '30d' ? 'Last 30 Days' : chartTimeframe === '7d' ? 'Last 7 Days' : 'Last 90 Days'})
              </span>
            </h2>
            <p className="text-xs text-gray-300 mt-1 max-w-xl">
              Real-time sourcing demand & wholesale RFQ volume submitted by verified luxury salons & spa buyers.
            </p>
          </div>

          {/* Timeframe & Metric Toggle Bar */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Timeframe selector */}
            <div className="flex items-center bg-white/10 border border-white/15 p-1 rounded-2xl">
              {[
                { id: '7d', label: '7 Days' },
                { id: '30d', label: '30 Days' },
                { id: '90d', label: '90 Days' },
              ].map((t) => (
                <button
                  key={t.id}
                  onClick={() => setChartTimeframe(t.id as any)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    chartTimeframe === t.id
                      ? 'bg-[#B8005A] text-white shadow-md'
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>

            {/* Metric Mode selector */}
            <div className="flex items-center bg-white/10 border border-white/15 p-1 rounded-2xl">
              <button
                onClick={() => setChartMetric('queries')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                  chartMetric === 'queries'
                    ? 'bg-white text-[#1A1A1A] shadow-md'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                <BarChart3 className="w-3.5 h-3.5" />
                <span>RFQ Volume</span>
              </button>
              <button
                onClick={() => setChartMetric('growth')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                  chartMetric === 'growth'
                    ? 'bg-white text-[#1A1A1A] shadow-md'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                <TrendingUp className="w-3.5 h-3.5 text-[#10B981]" />
                <span>Growth %</span>
              </button>
            </div>
          </div>
        </div>

        {/* Quick KPI Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-6 relative z-10">
          <div className="bg-white/5 border border-white/10 p-3.5 rounded-2xl">
            <span className="text-[10px] text-gray-400 font-medium block">Total B2B Category RFQs</span>
            <span className="text-base sm:text-lg font-black text-white mt-0.5 block">
              {TRENDING_CATEGORY_METRICS[chartTimeframe].reduce((acc, curr) => acc + curr.queries, 0).toLocaleString()}
            </span>
          </div>
          <div className="bg-white/5 border border-white/10 p-3.5 rounded-2xl">
            <span className="text-[10px] text-gray-400 font-medium block">Top Demand Surge</span>
            <span className="text-base sm:text-lg font-black text-[#FFD700] mt-0.5 block">
              Salon Tools (+42.1%)
            </span>
          </div>
          <div className="bg-white/5 border border-white/10 p-3.5 rounded-2xl">
            <span className="text-[10px] text-gray-400 font-medium block">Avg Wholesale PO</span>
            <span className="text-base sm:text-lg font-black text-[#10B981] mt-0.5 block">
              $1,850 / PO
            </span>
          </div>
          <div className="bg-white/5 border border-white/10 p-3.5 rounded-2xl">
            <span className="text-[10px] text-gray-400 font-medium block">Active Purchasing Salons</span>
            <span className="text-base sm:text-lg font-black text-white mt-0.5 block">
              1,240+ Pro Accounts
            </span>
          </div>
        </div>

        {/* Recharts Graphical Rendering */}
        <div className="mt-4 h-72 w-full relative z-10 pt-2">
          <ResponsiveContainer width="100%" height="100%">
            {chartMetric === 'queries' ? (
              <BarChart
                data={TRENDING_CATEGORY_METRICS[chartTimeframe]}
                margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
                onClick={(e: any) => {
                  if (e && e.activePayload && e.activePayload[0]) {
                    const catId = e.activePayload[0].payload.categoryId;
                    setActiveCategory(catId as CategoryId);
                    onSelectCategory(catId as CategoryId);
                  }
                }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" vertical={false} />
                <XAxis 
                  dataKey="name" 
                  stroke="rgba(255,255,255,0.6)" 
                  tick={{ fill: 'rgba(255,255,255,0.8)', fontSize: 11, fontWeight: 600 }}
                  axisLine={{ stroke: 'rgba(255,255,255,0.15)' }}
                />
                <YAxis 
                  stroke="rgba(255,255,255,0.6)" 
                  tick={{ fill: 'rgba(255,255,255,0.6)', fontSize: 10 }}
                  axisLine={{ stroke: 'rgba(255,255,255,0.15)' }}
                />
                <Tooltip content={<CustomChartTooltip />} cursor={{ fill: 'rgba(255,255,255,0.05)' }} />
                <Bar dataKey="queries" radius={[10, 10, 0, 0]} className="cursor-pointer">
                  {TRENDING_CATEGORY_METRICS[chartTimeframe].map((entry) => (
                    <Cell 
                      key={entry.name} 
                      fill={activeCategory === entry.categoryId ? '#FFD700' : entry.color} 
                      opacity={activeCategory === 'all' || activeCategory === entry.categoryId ? 1 : 0.4}
                    />
                  ))}
                </Bar>
              </BarChart>
            ) : (
              <AreaChart
                data={TRENDING_CATEGORY_METRICS[chartTimeframe]}
                margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
                onClick={(e: any) => {
                  if (e && e.activePayload && e.activePayload[0]) {
                    const catId = e.activePayload[0].payload.categoryId;
                    setActiveCategory(catId as CategoryId);
                    onSelectCategory(catId as CategoryId);
                  }
                }}
              >
                <defs>
                  <linearGradient id="growthGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" vertical={false} />
                <XAxis 
                  dataKey="name" 
                  stroke="rgba(255,255,255,0.6)" 
                  tick={{ fill: 'rgba(255,255,255,0.8)', fontSize: 11, fontWeight: 600 }}
                  axisLine={{ stroke: 'rgba(255,255,255,0.15)' }}
                />
                <YAxis 
                  stroke="rgba(255,255,255,0.6)" 
                  tick={{ fill: 'rgba(255,255,255,0.6)', fontSize: 10 }}
                  unit="%"
                  axisLine={{ stroke: 'rgba(255,255,255,0.15)' }}
                />
                <Tooltip content={<CustomChartTooltip />} />
                <Area 
                  type="monotone" 
                  dataKey="growth" 
                  stroke="#10B981" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#growthGradient)" 
                  className="cursor-pointer"
                />
              </AreaChart>
            )}
          </ResponsiveContainer>
        </div>

        {/* Footnote instruction */}
        <div className="mt-3 pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-2 text-[11px] text-gray-400 relative z-10">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
            <span>Updated live based on verified buyer queries across Nexora Luxe portal</span>
          </div>
          {activeCategory !== 'all' && (
            <button
              onClick={() => {
                setActiveCategory('all');
                onSelectCategory('all');
              }}
              className="text-[#FFD700] hover:underline font-bold cursor-pointer"
            >
              Reset Category Filter
            </button>
          )}
        </div>
      </div>

      {/* Category Pills Slider */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-none mb-6">
        <button
          onClick={() => {
            setActiveCategory('all');
            onSelectCategory('all');
          }}
          className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
            activeCategory === 'all'
              ? 'bg-[#B8005A] text-white shadow-sm'
              : 'bg-white text-[#525252] border border-[#EAE5DE] hover:border-[#B8005A]'
          }`}
        >
          All Categories
        </button>

        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => {
              setActiveCategory(cat.id);
              onSelectCategory(cat.id);
            }}
            className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
              activeCategory === cat.id
                ? 'bg-[#B8005A] text-white shadow-sm'
                : 'bg-white text-[#525252] border border-[#EAE5DE] hover:border-[#B8005A]'
            }`}
          >
            <span>{cat.name}</span>
          </button>
        ))}
      </div>

      {/* Filter & Sorting Control Bar */}
      <div className="bg-white border border-[#EAE5DE] rounded-2xl p-4 mb-8 flex flex-wrap items-center justify-between gap-4 shadow-2xs">
        {/* Quick Search within Catalog */}
        <div className="relative w-full md:w-72 flex items-center bg-[#F9F9FB] border border-[#E8E8EE] focus-within:border-[#B8005A] focus-within:bg-white rounded-xl px-3 py-1.5 transition-all">
          <Search className="w-4 h-4 text-[#8E8E93] mr-2 shrink-0" />
          <input
            type="text"
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            placeholder="Filter catalog products..."
            className="w-full bg-transparent text-xs text-[#1A1A1A] placeholder:text-[#8E8E93] font-medium focus:outline-none"
          />
          {localSearch && (
            <button
              onClick={() => setLocalSearch('')}
              className="text-gray-400 hover:text-gray-600 p-0.5 rounded-full"
            >
              <X className="w-3 h-3" />
            </button>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Verified Toggle */}
          <button
            onClick={() => setVerifiedOnly(!verifiedOnly)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer border ${
              verifiedOnly
                ? 'bg-[#FFF0F5] text-[#B8005A] border-[#FFD1E3]'
                : 'bg-[#FAFAFA] text-[#737373] border-[#EAE5DE]'
            }`}
          >
            <div className={`w-3.5 h-3.5 rounded-md flex items-center justify-center border ${
              verifiedOnly ? 'bg-[#B8005A] border-[#B8005A] text-white' : 'border-[#CCCCCC]'
            }`}>
              {verifiedOnly && <Check className="w-2.5 h-2.5" />}
            </div>
            <span>Nexora Verified Only</span>
          </button>

          {/* Wholesale Toggle */}
          <button
            onClick={() => setWholesaleOnly(!wholesaleOnly)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer border ${
              wholesaleOnly
                ? 'bg-[#FFF0F5] text-[#B8005A] border-[#FFD1E3]'
                : 'bg-[#FAFAFA] text-[#737373] border-[#EAE5DE]'
            }`}
          >
            <div className={`w-3.5 h-3.5 rounded-md flex items-center justify-center border ${
              wholesaleOnly ? 'bg-[#B8005A] border-[#B8005A] text-white' : 'border-[#CCCCCC]'
            }`}>
              {wholesaleOnly && <Check className="w-2.5 h-2.5" />}
            </div>
            <span>Wholesale Pricing</span>
          </button>
        </div>

        <div className="flex items-center gap-3 ml-auto">
          {/* Quick Compare Trigger if items selected */}
          {compareProductIds.length > 0 && onOpenCompareModal && (
            <button
              onClick={onOpenCompareModal}
              className="bg-[#FFF0F5] hover:bg-[#FFE5EE] border border-[#FFD1E3] text-[#B8005A] px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-xs cursor-pointer animate-in fade-in"
            >
              <ArrowLeftRight className="w-3.5 h-3.5" />
              <span>Compare ({compareProductIds.length}/3)</span>
            </button>
          )}

          {/* Sorting Dropdown */}
          <div className="flex items-center gap-1.5 text-xs text-[#737373]">
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#8E8E93]" />
            <span className="font-semibold">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-[#FAFAFA] border border-[#EAE5DE] rounded-xl px-2.5 py-1 text-xs font-medium text-[#1A1A1A] focus:outline-none focus:border-[#B8005A]"
            >
              <option value="featured">Featured / Trending</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="moq">Lowest MOQ</option>
            </select>
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center border border-[#EAE5DE] rounded-xl p-0.5 bg-[#FAFAFA]">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                viewMode === 'grid' ? 'bg-white shadow-xs text-[#B8005A]' : 'text-[#8E8E93]'
              }`}
            >
              <Grid className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                viewMode === 'list' ? 'bg-white shadow-xs text-[#B8005A]' : 'text-[#8E8E93]'
              }`}
            >
              <List className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Products Grid / List */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-3xl border border-[#EAE5DE] p-8">
          <div className="w-12 h-12 rounded-full bg-[#FFF0F5] text-[#B8005A] flex items-center justify-center mx-auto mb-3">
            <Sparkles className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-[#1A1A1A]">No products match your filter criteria</h3>
          <p className="text-xs text-[#737373] mt-1 max-w-sm mx-auto">
            Try resetting your category or search filters to discover more items in the catalog.
          </p>
          <button
            onClick={() => {
              setActiveCategory('all');
              setVerifiedOnly(false);
              setWholesaleOnly(false);
            }}
            className="mt-4 bg-[#B8005A] text-white text-xs font-bold px-4 py-2 rounded-xl shadow-xs cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div
          className={
            viewMode === 'grid'
              ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7'
              : 'space-y-4'
          }
        >
          {filteredProducts.map((product) => {
            const isCompared = compareProductIds.includes(product.id);

            return (
              <motion.div
                key={product.id}
                onClick={() => onSelectProduct(product)}
                whileHover={{ y: -6, scale: 1.01 }}
                transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                className={`bg-white border rounded-3xl overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 group cursor-pointer ${
                  isCompared 
                    ? 'border-[#B8005A] ring-2 ring-[#B8005A]/20 bg-[#FFFDFE]' 
                    : 'border-[#EAE5DE] hover:border-[#B8005A]/40'
                } ${
                  viewMode === 'list' ? 'flex flex-col sm:flex-row items-center p-4 gap-6' : 'flex flex-col'
                }`}
              >
                {/* Image */}
                <div
                  className={`relative bg-[#F7F5F0] overflow-hidden ${
                    viewMode === 'list'
                      ? 'w-full sm:w-48 aspect-square rounded-2xl shrink-0'
                      : 'w-full aspect-[4/3]'
                  }`}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute top-3.5 left-3.5 flex flex-wrap items-center gap-1.5 z-10">
                    <span className="bg-white/95 backdrop-blur-md text-[#1A1A1A] text-xs font-semibold px-3 py-1 rounded-full shadow-xs border border-white/40">
                      {product.tag}
                    </span>
                    {product.isVerified && (
                      <span className="bg-gradient-to-r from-[#B8005A] to-[#931248] text-white text-[10px] font-extrabold tracking-wider uppercase px-2.5 py-1 rounded-full flex items-center gap-1 shadow-sm">
                        <ShieldCheck className="w-3 h-3" />
                        VERIFIED
                      </span>
                    )}
                  </div>

                  {/* Compare Toggle Pill on Image */}
                  {onToggleCompare && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleCompare(product);
                      }}
                      className={`absolute top-3.5 right-3.5 z-20 px-2.5 py-1 rounded-full text-[11px] font-extrabold transition-all flex items-center gap-1 shadow-md cursor-pointer ${
                        isCompared
                          ? 'bg-[#B8005A] text-white border border-[#B8005A]'
                          : 'bg-white/95 hover:bg-[#FFF0F5] text-[#4A4A4A] hover:text-[#B8005A] border border-white/60 hover:border-[#FFD1E3]'
                      }`}
                      title={isCompared ? 'Remove from comparison' : 'Add to side-by-side comparison'}
                    >
                      <ArrowLeftRight className="w-3 h-3" />
                      <span>{isCompared ? 'Comparing' : 'Compare'}</span>
                    </button>
                  )}
                </div>

                {/* Info Body */}
                <div className="p-6 flex-1 flex flex-col justify-between w-full">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[11px] font-bold text-[#8E8E93] uppercase tracking-wider">
                        {product.brand} • {product.supplierName}
                      </span>
                      {product.isWholesale && (
                        <span className="text-[11px] font-bold text-[#B8005A] bg-[#FFF0F5] border border-[#FFD1E3] px-2.5 py-0.5 rounded-full">
                          Wholesale B2B
                        </span>
                      )}
                    </div>

                    <h3 className="text-base sm:text-lg font-bold text-[#1A1A1A] group-hover:text-[#B8005A] transition-colors line-clamp-1">
                      {product.name}
                    </h3>

                    {/* Star Rating */}
                    <div className="mt-2 flex items-center">
                      <StarRating rating={product.rating || 4.9} reviewsCount={product.reviewsCount || 42} size="xs" compact={true} />
                    </div>

                    <p className="text-xs text-[#525252] mt-2 line-clamp-2 leading-relaxed">
                      {product.description}
                    </p>

                    <div className="mt-4 pt-3.5 border-t border-[#F5F2EB] flex items-center justify-between">
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-xl sm:text-2xl font-extrabold text-[#1A1A1A] tracking-tight">
                          ${product.price.toFixed(2)}
                        </span>
                        <span className="text-xs text-[#8E8E93] font-semibold">
                          / {product.unit}
                        </span>
                      </div>

                      <span className="text-xs font-bold text-[#4A4A4A] bg-[#F5F2EB] border border-[#EAE5DE] px-3 py-1 rounded-lg">
                        MOQ: {product.moq} units
                      </span>
                    </div>
                  </div>

                  <div className="mt-5 pt-3.5 border-t border-[#F5F2EB] flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1.5 font-semibold">
                      <span
                        className={`w-2 h-2 rounded-full ${
                          product.stockStatus === 'In Stock'
                            ? 'bg-[#10B981] animate-pulse'
                            : product.stockStatus === 'Low Stock'
                            ? 'bg-[#F59E0B]'
                            : 'bg-[#6366F1]'
                        }`}
                      />
                      <span
                        className={
                          product.stockStatus === 'In Stock'
                            ? 'text-[#059669]'
                            : product.stockStatus === 'Low Stock'
                            ? 'text-[#D97706]'
                            : 'text-[#4F46E5]'
                        }
                      >
                        {product.stockStatus}
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (onToggleCompare) onToggleCompare(product);
                        }}
                        className={`text-[11px] font-bold px-2.5 py-1 rounded-lg transition-colors flex items-center gap-1 cursor-pointer ${
                          isCompared
                            ? 'text-[#B8005A] bg-[#FFF0F5] border border-[#FFD1E3]'
                            : 'text-[#737373] hover:text-[#B8005A] hover:bg-[#FAF8F5]'
                        }`}
                      >
                        <ArrowLeftRight className="w-3 h-3" />
                        <span>{isCompared ? 'In Compare' : '+ Compare'}</span>
                      </button>

                      <div className="flex items-center gap-1.5 font-bold text-[#B8005A] group-hover:translate-x-1 transition-transform">
                        <span>Details & RFQ</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
};

