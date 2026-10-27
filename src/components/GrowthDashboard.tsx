import React, { useState, useMemo } from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';
import {
  TrendingUp,
  TrendingDown,
  Eye,
  FileText,
  Clock,
  CheckCircle2,
  Calendar,
  Download,
  Building2,
  Sparkles,
  ArrowUpRight,
  Filter,
  BarChart3,
  PieChart as PieChartIcon,
  ShoppingBag,
  Zap,
  Info,
  ChevronDown,
  Share2
} from 'lucide-react';
import { SupplierPartner } from '../types';
import { SUPPLIERS } from '../data/mockData';

type TimeRange = '7d' | '30d' | '90d' | '1y';

interface GrowthDashboardProps {
  partner?: SupplierPartner;
  partnersList?: SupplierPartner[];
  onSelectPartner?: (partner: SupplierPartner) => void;
  onClose?: () => void;
  isStandalone?: boolean;
}

// Generate realistic performance data based on partner & time range
const generatePartnerTimeSeries = (partnerId: string, range: TimeRange) => {
  const seed = partnerId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  
  if (range === '7d') {
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    return days.map((day, i) => {
      const baseViews = 240 + ((seed * (i + 1) * 37) % 180);
      const baseQuotes = Math.round(baseViews * (0.05 + ((seed + i) % 5) * 0.012));
      const conversion = Number(((baseQuotes / baseViews) * 100).toFixed(1));
      return {
        label: day,
        fullDate: `Day ${i + 1}`,
        productViews: baseViews,
        quoteRequests: baseQuotes,
        conversionRate: conversion,
        pipelineValue: baseQuotes * 42000
      };
    });
  }

  if (range === '30d') {
    return Array.from({ length: 15 }, (_, i) => {
      const dayNum = (i + 1) * 2;
      const baseViews = 620 + ((seed * (i + 3) * 23) % 450);
      const baseQuotes = Math.round(baseViews * (0.055 + ((seed + i) % 7) * 0.009));
      const conversion = Number(((baseQuotes / baseViews) * 100).toFixed(1));
      return {
        label: `Oct ${dayNum < 10 ? '0' + dayNum : dayNum}`,
        fullDate: `Oct ${dayNum}, 2026`,
        productViews: baseViews,
        quoteRequests: baseQuotes,
        conversionRate: conversion,
        pipelineValue: baseQuotes * 48000
      };
    });
  }

  if (range === '90d') {
    return Array.from({ length: 12 }, (_, i) => {
      const weekNum = i + 1;
      const baseViews = 2800 + ((seed * (i + 5) * 41) % 1600);
      const baseQuotes = Math.round(baseViews * 0.068) + ((i % 3) * 12);
      const conversion = Number(((baseQuotes / baseViews) * 100).toFixed(1));
      return {
        label: `Wk ${weekNum}`,
        fullDate: `Week ${weekNum} (Q3/Q4)`,
        productViews: baseViews,
        quoteRequests: baseQuotes,
        conversionRate: conversion,
        pipelineValue: baseQuotes * 52000
      };
    });
  }

  // 1y
  const months = ['Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'];
  return months.map((month, i) => {
    const growthFactor = 1 + (i * 0.06);
    const baseViews = Math.round((7500 + ((seed * (i + 2) * 19) % 3200)) * growthFactor);
    const baseQuotes = Math.round((baseViews * 0.072) * (0.9 + (i * 0.02)));
    const conversion = Number(((baseQuotes / baseViews) * 100).toFixed(1));
    return {
      label: month,
      fullDate: `${month} 2026`,
      productViews: baseViews,
      quoteRequests: baseQuotes,
      conversionRate: conversion,
      pipelineValue: baseQuotes * 55000
    };
  });
};

const CATEGORY_PERFORMANCE = [
  { category: 'Skincare Serums', views: 18450, quotes: 940, avgOrderVal: '₹48,500' },
  { category: 'Haircare Backbar', views: 14200, quotes: 780, avgOrderVal: '₹62,000' },
  { category: 'Organic Facial Oils', views: 9800, quotes: 510, avgOrderVal: '₹34,000' },
  { category: 'Salon Styling Tools', views: 7600, quotes: 390, avgOrderVal: '₹75,000' },
  { category: 'Spa Treatment Kits', views: 5400, quotes: 280, avgOrderVal: '₹88,000' }
];

const LEAD_CHANNELS = [
  { name: 'Direct RFQ Form', value: 46, color: '#B90064' },
  { name: 'WhatsApp Business Chat', value: 28, color: '#10B981' },
  { name: 'Sample Kit Dispatch', value: 16, color: '#7C3AED' },
  { name: 'Line Sheet Download', value: 10, color: '#F59E0B' }
];

const TOP_PRODUCTS = [
  {
    name: 'Luminous Peptide Restorative Serum 50ml',
    sku: 'NEX-SER-045',
    category: 'Skincare',
    views: '12,480',
    quotes: 324,
    conversion: '2.6%',
    trend: '+24.5%',
    trendUp: true
  },
  {
    name: 'Hydra-Infusion Professional Hair Mask 1000ml',
    sku: 'NEX-HR-109',
    category: 'Haircare',
    views: '9,840',
    quotes: 248,
    conversion: '2.5%',
    trend: '+18.2%',
    trendUp: true
  },
  {
    name: 'Velvet Matte Finish Powder Backbar Set',
    sku: 'NEX-MK-882',
    category: 'Makeup',
    views: '7,150',
    quotes: 186,
    conversion: '2.6%',
    trend: '+12.0%',
    trendUp: true
  },
  {
    name: 'Organic Botanical Cleansing Balm 500g',
    sku: 'NEX-CLN-302',
    category: 'Cleansers',
    views: '5,920',
    quotes: 142,
    conversion: '2.4%',
    trend: '-3.1%',
    trendUp: false
  }
];

// Custom Tooltip for Area & Line Charts
const CustomTrendTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-[#1C1B1B] text-white p-3.5 rounded-xl shadow-xl border border-white/10 text-xs min-w-[200px]">
        <div className="font-bold text-sm text-[#FFD1E3] mb-2 flex items-center justify-between">
          <span>{data.fullDate || label}</span>
          <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-white/10 text-gray-300">
            Performance
          </span>
        </div>
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-gray-300">
              <span className="w-2.5 h-2.5 rounded-full bg-[#B90064] inline-block" />
              Product Views:
            </span>
            <span className="font-bold font-mono text-white">
              {Number(data.productViews).toLocaleString()}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-gray-300">
              <span className="w-2.5 h-2.5 rounded-full bg-[#7C3AED] inline-block" />
              Quote Requests:
            </span>
            <span className="font-bold font-mono text-white">
              {Number(data.quoteRequests).toLocaleString()}
            </span>
          </div>
          {data.conversionRate !== undefined && (
            <div className="pt-1.5 mt-1.5 border-t border-white/10 flex items-center justify-between text-[11px]">
              <span className="text-gray-400">Quote Conversion:</span>
              <span className="font-bold text-[#10B981]">{data.conversionRate}%</span>
            </div>
          )}
          {data.pipelineValue !== undefined && (
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-gray-400">Est. Pipeline:</span>
              <span className="font-bold text-amber-400">
                ₹{(data.pipelineValue / 100000).toFixed(2)} Lakhs
              </span>
            </div>
          )}
        </div>
      </div>
    );
  }
  return null;
};

// Custom Tooltip for Category Bar Chart
const CustomBarTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-[#1C1B1B] text-white p-3 rounded-xl shadow-xl border border-white/10 text-xs">
        <p className="font-bold text-sm text-[#FFD1E3] mb-1.5">{label}</p>
        <div className="space-y-1">
          <p className="text-gray-300 flex justify-between gap-4">
            <span>Views:</span>
            <strong className="text-white font-mono">{Number(data.views).toLocaleString()}</strong>
          </p>
          <p className="text-gray-300 flex justify-between gap-4">
            <span>Quotes:</span>
            <strong className="text-[#B90064] font-mono">{data.quotes}</strong>
          </p>
          <p className="text-gray-300 flex justify-between gap-4">
            <span>Avg Order Val:</span>
            <strong className="text-amber-300 font-mono">{data.avgOrderVal}</strong>
          </p>
        </div>
      </div>
    );
  }
  return null;
};

export const GrowthDashboard: React.FC<GrowthDashboardProps> = ({
  partner,
  partnersList = SUPPLIERS,
  onSelectPartner,
  onClose,
  isStandalone = true
}) => {
  // Active partner (defaults to prop or first partner in mock data)
  const [selectedPartner, setSelectedPartner] = useState<SupplierPartner>(
    partner || partnersList[0] || SUPPLIERS[0]
  );
  const [timeRange, setTimeRange] = useState<TimeRange>('30d');
  const [activeMetricFilter, setActiveMetricFilter] = useState<'both' | 'views' | 'quotes'>('both');
  const [downloadToast, setDownloadToast] = useState<string | null>(null);

  // Time-series chart dataset
  const timeSeriesData = useMemo(() => {
    return generatePartnerTimeSeries(selectedPartner.id, timeRange);
  }, [selectedPartner.id, timeRange]);

  // Aggregate totals for the active range
  const aggregates = useMemo(() => {
    const totalViews = timeSeriesData.reduce((acc, curr) => acc + curr.productViews, 0);
    const totalQuotes = timeSeriesData.reduce((acc, curr) => acc + curr.quoteRequests, 0);
    const avgConversion = Number(((totalQuotes / (totalViews || 1)) * 100).toFixed(1));
    const totalPipeline = timeSeriesData.reduce((acc, curr) => acc + curr.pipelineValue, 0);

    return {
      totalViews,
      totalQuotes,
      avgConversion,
      totalPipeline
    };
  }, [timeSeriesData]);

  const handleExportReport = () => {
    setDownloadToast(`Exporting ${selectedPartner.name} performance report (${timeRange.toUpperCase()}) to CSV...`);
    setTimeout(() => {
      setDownloadToast(`Report downloaded successfully!`);
      setTimeout(() => setDownloadToast(null), 3500);
    }, 1200);
  };

  const handlePartnerChange = (partnerId: string) => {
    const found = partnersList.find((p) => p.id === partnerId);
    if (found) {
      setSelectedPartner(found);
      if (onSelectPartner) onSelectPartner(found);
    }
  };

  return (
    <div className={`w-full bg-[#FCF9F8] text-[#1C1B1B] ${isStandalone ? 'p-4 sm:p-6 md:p-8' : 'p-2 sm:p-4'}`}>
      {/* Toast Notification */}
      {downloadToast && (
        <div className="fixed top-20 right-6 z-50 bg-[#1C1B1B] text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 border border-pink-500/30 animate-in fade-in slide-in-from-top-2">
          <CheckCircle2 className="w-5 h-5 text-[#10B981]" />
          <span className="text-xs font-semibold">{downloadToast}</span>
        </div>
      )}

      {/* Top Header Card */}
      <div className="bg-white rounded-3xl border border-[#E8E8E8] p-5 sm:p-6 shadow-xs mb-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          {/* Partner Info & Switcher */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#B90064] to-[#7C3AED] text-white flex items-center justify-center font-bold text-xl shadow-md shrink-0">
              {selectedPartner.initials || selectedPartner.name.slice(0, 2).toUpperCase()}
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <span className="text-xs font-bold uppercase tracking-wider text-[#B90064] bg-[#FFF0F5] px-2.5 py-0.5 rounded-full border border-[#FFD1E3]">
                  {selectedPartner.type}
                </span>
                {selectedPartner.verified && (
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#10B981] bg-[#ECFDF5] px-2 py-0.5 rounded-full border border-[#A7F3D0]">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Verified Partner
                  </span>
                )}
                <span className="text-xs text-[#594047] font-medium">
                  {selectedPartner.location}
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold font-serif text-[#1C1B1B]">
                {selectedPartner.name} — Growth Dashboard
              </h1>
              <p className="text-xs sm:text-sm text-[#594047] mt-0.5">
                Real-time product views, quote request volume, and wholesale buyer conversion analytics.
              </p>
            </div>
          </div>

          {/* Partner Selector & Controls */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Partner Dropdown */}
            {partnersList.length > 1 && (
              <div className="relative">
                <select
                  value={selectedPartner.id}
                  onChange={(e) => handlePartnerChange(e.target.value)}
                  className="appearance-none bg-[#FCF9F8] border border-[#E8E8E8] text-xs font-bold text-[#1C1B1B] py-2.5 pl-3.5 pr-8 rounded-xl focus:outline-none focus:border-[#B90064] cursor-pointer"
                >
                  {partnersList.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name} ({p.type})
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-4 h-4 text-gray-500 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            )}

            {/* Time Range Selector */}
            <div className="inline-flex bg-[#F1EDEC] p-1 rounded-xl border border-[#E8E8E8]">
              {(['7d', '30d', '90d', '1y'] as TimeRange[]).map((range) => (
                <button
                  key={range}
                  onClick={() => setTimeRange(range)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase transition-all ${
                    timeRange === range
                      ? 'bg-white text-[#B90064] shadow-xs'
                      : 'text-[#594047] hover:text-[#1C1B1B]'
                  }`}
                >
                  {range}
                </button>
              ))}
            </div>

            {/* Export Report Action */}
            <button
              onClick={handleExportReport}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-[#E8E8E8] bg-white hover:bg-[#FCF9F8] text-xs font-bold text-[#1C1B1B] shadow-2xs transition-all active:scale-95 cursor-pointer"
              title="Download detailed CSV report"
            >
              <Download className="w-3.5 h-3.5 text-[#B90064]" />
              <span>Export CSV</span>
            </button>
          </div>
        </div>
      </div>

      {/* KPI Cards Row (5 Core Metrics) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
        {/* Metric 1: Total Product Views */}
        <div className="bg-white rounded-2xl border border-[#E8E8E8] p-5 shadow-xs hover:border-[#B90064]/30 transition-all flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#594047]">
              Product Views
            </span>
            <div className="w-8 h-8 rounded-lg bg-[#FFF0F5] text-[#B90064] flex items-center justify-center">
              <Eye className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-[#1C1B1B] tracking-tight">
              {aggregates.totalViews.toLocaleString()}
            </div>
            <div className="flex items-center gap-1 text-[11px] font-bold text-[#10B981] mt-1.5">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>+24.8% vs prev period</span>
            </div>
          </div>
        </div>

        {/* Metric 2: Quote Requests (RFQs) */}
        <div className="bg-white rounded-2xl border border-[#E8E8E8] p-5 shadow-xs hover:border-[#7C3AED]/30 transition-all flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#594047]">
              Quote Requests (RFQs)
            </span>
            <div className="w-8 h-8 rounded-lg bg-[#F5F3FF] text-[#7C3AED] flex items-center justify-center">
              <FileText className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-[#1C1B1B] tracking-tight">
              {aggregates.totalQuotes.toLocaleString()}
            </div>
            <div className="flex items-center gap-1 text-[11px] font-bold text-[#10B981] mt-1.5">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>+18.4% high-intent buyers</span>
            </div>
          </div>
        </div>

        {/* Metric 3: Quote Conversion Rate */}
        <div className="bg-white rounded-2xl border border-[#E8E8E8] p-5 shadow-xs hover:border-[#10B981]/30 transition-all flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#594047]">
              Conversion Rate
            </span>
            <div className="w-8 h-8 rounded-lg bg-[#ECFDF5] text-[#10B981] flex items-center justify-center">
              <Zap className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-[#1C1B1B] tracking-tight">
              {aggregates.avgConversion}%
            </div>
            <div className="flex items-center gap-1 text-[11px] font-bold text-[#10B981] mt-1.5">
              <ArrowUpRight className="w-3.5 h-3.5" />
              <span>+2.1% above salon avg</span>
            </div>
          </div>
        </div>

        {/* Metric 4: Estimated Pipeline Value */}
        <div className="bg-white rounded-2xl border border-[#E8E8E8] p-5 shadow-xs hover:border-amber-500/30 transition-all flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#594047]">
              Pipeline Value
            </span>
            <div className="w-8 h-8 rounded-lg bg-[#FEF3C7] text-amber-600 flex items-center justify-center">
              <span className="font-bold text-xs">₹</span>
            </div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-[#1C1B1B] tracking-tight">
              ₹{(aggregates.totalPipeline / 100000).toFixed(1)}L
            </div>
            <div className="text-[11px] font-medium text-[#594047] mt-1.5">
              From verified salons & spas
            </div>
          </div>
        </div>

        {/* Metric 5: Avg Response Time */}
        <div className="bg-white rounded-2xl border border-[#E8E8E8] p-5 shadow-xs hover:border-blue-500/30 transition-all flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#594047]">
              Response SLA
            </span>
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-[#1C1B1B] tracking-tight">
              1.2 hrs
            </div>
            <div className="text-[11px] font-bold text-[#10B981] mt-1.5 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>99% queries closed</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Primary Trend Chart (Product Views & Quote Requests Over Time) - 2 Cols */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-[#E8E8E8] p-5 sm:p-6 shadow-xs flex flex-col">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-[#1C1B1B]">
                  Product Views & Quote Requests Trend
                </h3>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-[#FFF0F5] text-[#B90064] border border-[#FFD1E3]">
                  Interactive
                </span>
              </div>
              <p className="text-xs text-[#594047] mt-1">
                Visualizing buyer traffic surges vs wholesale quote enquiries over selected timeline.
              </p>
            </div>

            {/* Metric Filter Toggles */}
            <div className="flex items-center gap-1.5 bg-[#F1EDEC] p-1 rounded-xl self-start sm:self-auto">
              <button
                onClick={() => setActiveMetricFilter('both')}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                  activeMetricFilter === 'both' ? 'bg-white text-[#1C1B1B] shadow-2xs' : 'text-[#594047]'
                }`}
              >
                All Metrics
              </button>
              <button
                onClick={() => setActiveMetricFilter('views')}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                  activeMetricFilter === 'views' ? 'bg-[#B90064] text-white shadow-2xs' : 'text-[#594047]'
                }`}
              >
                Views Only
              </button>
              <button
                onClick={() => setActiveMetricFilter('quotes')}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                  activeMetricFilter === 'quotes' ? 'bg-[#7C3AED] text-white shadow-2xs' : 'text-[#594047]'
                }`}
              >
                Quotes Only
              </button>
            </div>
          </div>

          {/* Recharts Area Chart */}
          <div className="w-full h-80 min-h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={timeSeriesData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="viewsGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#B90064" stopOpacity={0.35} />
                    <stop offset="95%" stopColor="#B90064" stopOpacity={0.0} />
                  </linearGradient>
                  <linearGradient id="quotesGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#7C3AED" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#7C3AED" stopOpacity={0.0} />
                  </linearGradient>
                </defs>

                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1EDEC" />

                <XAxis
                  dataKey="label"
                  tickLine={false}
                  axisLine={{ stroke: '#E8E8E8' }}
                  tick={{ fill: '#594047', fontSize: 11, fontWeight: 500 }}
                />

                <YAxis
                  yAxisId="left"
                  tickLine={false}
                  axisLine={{ stroke: '#E8E8E8' }}
                  tick={{ fill: '#594047', fontSize: 11 }}
                  tickFormatter={(val) => (val >= 1000 ? `${(val / 1000).toFixed(0)}k` : val)}
                />

                <YAxis
                  yAxisId="right"
                  orientation="right"
                  tickLine={false}
                  axisLine={false}
                  tick={{ fill: '#7C3AED', fontSize: 11 }}
                  tickFormatter={(val) => (val >= 1000 ? `${(val / 1000).toFixed(1)}k` : val)}
                />

                <Tooltip content={<CustomTrendTooltip />} />

                <Legend
                  verticalAlign="top"
                  align="right"
                  wrapperStyle={{ paddingBottom: '12px', fontSize: '12px', fontWeight: 600 }}
                />

                {(activeMetricFilter === 'both' || activeMetricFilter === 'views') && (
                  <Area
                    yAxisId="left"
                    type="monotone"
                    name="Product Views"
                    dataKey="productViews"
                    stroke="#B90064"
                    strokeWidth={2.5}
                    fillOpacity={1}
                    fill="url(#viewsGradient)"
                  />
                )}

                {(activeMetricFilter === 'both' || activeMetricFilter === 'quotes') && (
                  <Area
                    yAxisId="right"
                    type="monotone"
                    name="Quote Requests"
                    dataKey="quoteRequests"
                    stroke="#7C3AED"
                    strokeWidth={2.5}
                    fillOpacity={1}
                    fill="url(#quotesGradient)"
                  />
                )}
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-4 pt-4 border-t border-[#E8E8E8] flex flex-wrap items-center justify-between text-xs text-[#594047]">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#10B981]" />
              <span>Conversion peak detected on Thursday afternoons (+32% above weekly baseline)</span>
            </div>
            <span className="font-semibold text-[#1C1B1B]">Updated real-time with verified RFQ events</span>
          </div>
        </div>

        {/* Lead Sources / Channels Donut Chart - 1 Col */}
        <div className="bg-white rounded-3xl border border-[#E8E8E8] p-5 sm:p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-lg font-bold text-[#1C1B1B]">Lead Channels</h3>
              <PieChartIcon className="w-4 h-4 text-[#B90064]" />
            </div>
            <p className="text-xs text-[#594047] mb-4">
              Breakdown of how salon buyers submit inquiries.
            </p>

            <div className="w-full h-56 relative flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={LEAD_CHANNELS}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={85}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {LEAD_CHANNELS.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value: any, name: any) => [`${value}% of total inquiries`, name]}
                    contentStyle={{
                      backgroundColor: '#1C1B1B',
                      borderRadius: '12px',
                      color: '#FFF',
                      fontSize: '12px',
                      border: 'none'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
              {/* Center stat inside donut */}
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-2xl font-black text-[#1C1B1B]">46%</span>
                <span className="text-[10px] uppercase font-bold text-[#594047]">Direct RFQ</span>
              </div>
            </div>

            {/* Channel Legend List */}
            <div className="space-y-2 mt-2">
              {LEAD_CHANNELS.map((channel) => (
                <div key={channel.name} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-2.5 h-2.5 rounded-full shrink-0"
                      style={{ backgroundColor: channel.color }}
                    />
                    <span className="font-medium text-[#1C1B1B]">{channel.name}</span>
                  </div>
                  <span className="font-bold font-mono text-[#594047]">{channel.value}%</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-5 p-3 rounded-2xl bg-[#FFF0F5] border border-[#FFD1E3] text-[11px] text-[#B90064] flex items-center gap-2 font-medium">
            <Sparkles className="w-4 h-4 shrink-0" />
            <span>Direct RFQ leads convert 2.4x faster into signed annual contracts.</span>
          </div>
        </div>
      </div>

      {/* Secondary Row: Category Performance (Bar Chart) & Top Products Table */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Category Performance Bar Chart - 1 Col */}
        <div className="bg-white rounded-3xl border border-[#E8E8E8] p-5 sm:p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-lg font-bold text-[#1C1B1B]">Category Demand</h3>
              <BarChart3 className="w-4 h-4 text-[#B90064]" />
            </div>
            <p className="text-xs text-[#594047] mb-4">
              Product views and quote requests by category line.
            </p>

            <div className="w-full h-64 min-h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={CATEGORY_PERFORMANCE}
                  layout="vertical"
                  margin={{ top: 5, right: 10, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#F1EDEC" />
                  <XAxis
                    type="number"
                    tickLine={false}
                    axisLine={{ stroke: '#E8E8E8' }}
                    tick={{ fill: '#594047', fontSize: 10 }}
                    tickFormatter={(val) => (val >= 1000 ? `${val / 1000}k` : val)}
                  />
                  <YAxis
                    dataKey="category"
                    type="category"
                    tickLine={false}
                    axisLine={false}
                    width={105}
                    tick={{ fill: '#1C1B1B', fontSize: 11, fontWeight: 600 }}
                  />
                  <Tooltip content={<CustomBarTooltip />} />
                  <Bar dataKey="views" name="Views" fill="#FCE7F3" radius={[0, 4, 4, 0]} />
                  <Bar dataKey="quotes" name="Quotes" fill="#B90064" radius={[0, 6, 6, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-[#E8E8E8] text-xs text-[#594047] flex items-center justify-between">
            <span>Highest conversion: <strong>Skincare Serums (5.1%)</strong></span>
          </div>
        </div>

        {/* Top Performing Catalog Products - 2 Cols */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-[#E8E8E8] p-5 sm:p-6 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
            <div>
              <h3 className="text-lg font-bold text-[#1C1B1B]">Top Performing Products</h3>
              <p className="text-xs text-[#594047]">
                SKUs generating the largest share of wholesale inquiries and line-sheet orders.
              </p>
            </div>
            <span className="text-xs font-bold text-[#B90064] bg-[#FFF0F5] px-3 py-1 rounded-full border border-[#FFD1E3] self-start sm:self-auto">
              Top 4 Drivers
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#E8E8E8] text-[11px] font-bold text-[#594047] uppercase tracking-wider">
                  <th className="py-3 px-3">Product Name & SKU</th>
                  <th className="py-3 px-3">Category</th>
                  <th className="py-3 px-3 text-right">Views</th>
                  <th className="py-3 px-3 text-right">Quotes</th>
                  <th className="py-3 px-3 text-right">Conv. %</th>
                  <th className="py-3 px-3 text-right">Trend</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E8E8E8] text-xs">
                {TOP_PRODUCTS.map((prod) => (
                  <tr key={prod.sku} className="hover:bg-[#FCF9F8] transition-colors group">
                    <td className="py-3 px-3">
                      <div className="font-bold text-[#1C1B1B] group-hover:text-[#B90064] transition-colors">
                        {prod.name}
                      </div>
                      <div className="text-[10px] font-mono text-[#594047]">{prod.sku}</div>
                    </td>
                    <td className="py-3 px-3">
                      <span className="px-2 py-0.5 rounded-md bg-[#F1EDEC] text-[#594047] text-[10px] font-semibold">
                        {prod.category}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-right font-mono font-semibold text-[#1C1B1B]">
                      {prod.views}
                    </td>
                    <td className="py-3 px-3 text-right font-mono font-bold text-[#B90064]">
                      {prod.quotes}
                    </td>
                    <td className="py-3 px-3 text-right font-mono font-semibold text-[#1C1B1B]">
                      {prod.conversion}
                    </td>
                    <td className="py-3 px-3 text-right">
                      <span
                        className={`inline-flex items-center gap-0.5 font-bold font-mono text-[11px] ${
                          prod.trendUp ? 'text-[#10B981]' : 'text-rose-500'
                        }`}
                      >
                        {prod.trendUp ? (
                          <TrendingUp className="w-3.5 h-3.5" />
                        ) : (
                          <TrendingDown className="w-3.5 h-3.5" />
                        )}
                        {prod.trend}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Quick Growth Tips Banner */}
          <div className="mt-5 p-4 rounded-2xl bg-gradient-to-r from-[#FFF0F5] to-[#F5F3FF] border border-[#FFD1E3] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-xl bg-[#B90064] text-white flex items-center justify-center shrink-0 shadow-xs">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-[#1C1B1B]">
                  Growth Tip: Activate Tiered MOQ Pricing
                </h4>
                <p className="text-[11px] text-[#594047] mt-0.5">
                  Products with 3+ MOQ price tiers receive 42% more direct quote inquiries from multi-location salon chains.
                </p>
              </div>
            </div>
            <button
              onClick={() => {
                setDownloadToast('Opening wholesale tier configuration wizard...');
                setTimeout(() => setDownloadToast(null), 3000);
              }}
              className="text-xs font-bold text-[#B90064] hover:text-[#91004E] hover:underline shrink-0 cursor-pointer"
            >
              Configure Tiers &rarr;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
