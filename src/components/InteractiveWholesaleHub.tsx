import React, { useState } from 'react';
import { 
  Sparkles, 
  BellRing, 
  CheckCircle2, 
  AlertCircle, 
  Copy, 
  Check, 
  X, 
  Truck, 
  ShieldCheck, 
  TrendingUp, 
  Calculator, 
  ArrowRight,
  Info
} from 'lucide-react';

interface InteractiveWholesaleHubProps {
  onOpenCatalog?: () => void;
  onOpenRegister?: () => void;
}

export const InteractiveWholesaleHub: React.FC<InteractiveWholesaleHubProps> = ({
  onOpenCatalog,
  onOpenRegister
}) => {
  // State for interactive action button displaying messages
  const [activeMessage, setActiveMessage] = useState<{
    id: string;
    title: string;
    message: string;
    type: 'success' | 'info' | 'advisory';
    timestamp: string;
    details?: string[];
    code?: string;
  } | null>(null);

  const [copiedCode, setCopiedCode] = useState(false);
  const [activeCalculator, setActiveCalculator] = useState(false);
  const [calcUnits, setCalcUnits] = useState(25);
  const [calcUnitPrice, setCalcUnitPrice] = useState(1200);

  const handleShowMarketAdvisory = () => {
    setActiveMessage({
      id: 'market-advisory',
      title: '⚡ Live Wholesale Market Advisory — April 2025',
      message: 'Active wholesale freight subsidies now enabled for verified salon and spa partners in India. Orders over ₹20,000 qualify for free express temperature-controlled transit across Mumbai, Delhi-NCR, Bengaluru, and Hyderabad.',
      type: 'advisory',
      timestamp: 'Updated just now • Nexora Supply Logistics',
      details: [
        'Insured B2B shipping with real-time temperature tracking',
        'Direct GST Input Tax Credit (ITC) invoices generated instantly',
        'Same-day fulfillment from regional supplier fulfillment hubs'
      ],
      code: 'LUXEFREIGHT2025'
    });
  };

  const handleShowSampleAlert = () => {
    setActiveMessage({
      id: 'sample-dispatch',
      title: '📦 Complimentary Salon Sample Dispatch Active',
      message: 'Exclusive salon formulation kits are available this week. Receive 5 sample vials from DermaGlow and Caviar Clinical lines prior to committing to full case quantities.',
      type: 'success',
      timestamp: 'Fulfillment capacity: 94% available today',
      details: [
        'Zero shipping charge for licensed estheticians and salon owners',
        'Complete ingredient breakdown and COA test sheets included',
        'Dedicated distributor account manager assigned within 2 hours'
      ],
      code: 'SAMPLESVIP'
    });
  };

  const handleShowGstVerification = () => {
    setActiveMessage({
      id: 'gst-compliance',
      title: '🛡️ 100% Verified GST & Compliance Protection',
      message: 'Every partner on Nexora Luxe maintains active GSTIN registration and compliant BIS/CDSCO cosmetics regulatory certifications. Download verified compliance dossiers on-demand.',
      type: 'info',
      timestamp: 'All partner records verified by Nexora Compliance Team',
      details: [
        'Automated monthly GSTR-2B matching for seamless input credit',
        'Batch testing certificates and cruelty-free accreditation on file',
        'Escrow-secured purchase orders for all high-volume transactions'
      ]
    });
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2500);
  };

  const calculatedTotal = calcUnits * calcUnitPrice;
  const bulkDiscount = calcUnits >= 50 ? 0.20 : calcUnits >= 20 ? 0.12 : 0.05;
  const finalDiscountedTotal = Math.round(calculatedTotal * (1 - bulkDiscount));
  const totalSavings = calculatedTotal - finalDiscountedTotal;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Container with responsive CSS media query classes */}
      <div className="responsive-container bg-gradient-to-br from-white via-[#FFF9FB] to-[#FFF0F5] border border-[#FFD6E5] rounded-3xl p-6 sm:p-8 md:p-10 shadow-xs relative overflow-hidden">
        {/* Decorative backdrop glow */}
        <div className="absolute -top-16 -right-16 w-80 h-80 bg-[#B8005A]/10 rounded-full blur-3xl pointer-events-none" />

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-6 border-b border-[#F0E6EC]">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#FFD6E5] text-[#B8005A] text-xs font-bold uppercase tracking-wider mb-2 shadow-xs">
              <Sparkles className="w-3.5 h-3.5" />
              Interactive B2B Buyer Operations
            </div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#1A1A1A] tracking-tight">
              Instant Wholesale Actions & Market Alerts
            </h2>
            <p className="text-sm text-[#666] mt-1 max-w-xl">
              Tap any action button below to display real-time logistics advisories, claim sample vouchers, or test wholesale margin savings.
            </p>
          </div>

          {/* Quick status pill */}
          <div className="flex items-center gap-2 self-start md:self-auto px-3 py-1.5 bg-emerald-50 border border-emerald-200 rounded-full text-emerald-800 text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Regional Depots Online</span>
          </div>
        </div>

        {/* Action Buttons Grid - Fully responsive via CSS media queries */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
          {/* Action Button 1: Market Advisory Message */}
          <button
            type="button"
            onClick={handleShowMarketAdvisory}
            className={`p-4 rounded-2xl border text-left transition-all duration-200 cursor-pointer flex flex-col justify-between group active:scale-[0.98] ${
              activeMessage?.id === 'market-advisory'
                ? 'bg-[#B8005A] text-white border-[#B8005A] shadow-md ring-2 ring-[#B8005A]/30'
                : 'bg-white hover:bg-[#FFF5F8] text-[#1E1E1E] border-[#F0E6EC] hover:border-[#FFB8D6] shadow-xs'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                activeMessage?.id === 'market-advisory' ? 'bg-white/20 text-white' : 'bg-[#FFF0F5] text-[#B8005A]'
              }`}>
                <BellRing className="w-4 h-4" />
              </div>
              <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                activeMessage?.id === 'market-advisory' ? 'bg-white/20 text-white' : 'bg-[#FFF0F5] text-[#B8005A]'
              }`}>
                Action
              </span>
            </div>
            <div>
              <h3 className="font-bold text-sm leading-snug">
                Freight & Market Status
              </h3>
              <p className={`text-xs mt-1 line-clamp-2 ${
                activeMessage?.id === 'market-advisory' ? 'text-pink-100' : 'text-[#777]'
              }`}>
                Click to inspect active shipping waivers and regional routes.
              </p>
            </div>
          </button>

          {/* Action Button 2: Complimentary Samples Message */}
          <button
            type="button"
            onClick={handleShowSampleAlert}
            className={`p-4 rounded-2xl border text-left transition-all duration-200 cursor-pointer flex flex-col justify-between group active:scale-[0.98] ${
              activeMessage?.id === 'sample-dispatch'
                ? 'bg-[#B8005A] text-white border-[#B8005A] shadow-md ring-2 ring-[#B8005A]/30'
                : 'bg-white hover:bg-[#FFF5F8] text-[#1E1E1E] border-[#F0E6EC] hover:border-[#FFB8D6] shadow-xs'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                activeMessage?.id === 'sample-dispatch' ? 'bg-white/20 text-white' : 'bg-[#FFF0F5] text-[#B8005A]'
              }`}>
                <Truck className="w-4 h-4" />
              </div>
              <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                activeMessage?.id === 'sample-dispatch' ? 'bg-white/20 text-white' : 'bg-[#FFF0F5] text-[#B8005A]'
              }`}>
                Action
              </span>
            </div>
            <div>
              <h3 className="font-bold text-sm leading-snug">
                Sample Kit Dispatch
              </h3>
              <p className={`text-xs mt-1 line-clamp-2 ${
                activeMessage?.id === 'sample-dispatch' ? 'text-pink-100' : 'text-[#777]'
              }`}>
                Click to check free trial formulation kit availability.
              </p>
            </div>
          </button>

          {/* Action Button 3: GST Compliance Message */}
          <button
            type="button"
            onClick={handleShowGstVerification}
            className={`p-4 rounded-2xl border text-left transition-all duration-200 cursor-pointer flex flex-col justify-between group active:scale-[0.98] ${
              activeMessage?.id === 'gst-compliance'
                ? 'bg-[#B8005A] text-white border-[#B8005A] shadow-md ring-2 ring-[#B8005A]/30'
                : 'bg-white hover:bg-[#FFF5F8] text-[#1E1E1E] border-[#F0E6EC] hover:border-[#FFB8D6] shadow-xs'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                activeMessage?.id === 'gst-compliance' ? 'bg-white/20 text-white' : 'bg-[#FFF0F5] text-[#B8005A]'
              }`}>
                <ShieldCheck className="w-4 h-4" />
              </div>
              <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                activeMessage?.id === 'gst-compliance' ? 'bg-white/20 text-white' : 'bg-[#FFF0F5] text-[#B8005A]'
              }`}>
                Action
              </span>
            </div>
            <div>
              <h3 className="font-bold text-sm leading-snug">
                GST & Compliance Dossier
              </h3>
              <p className={`text-xs mt-1 line-clamp-2 ${
                activeMessage?.id === 'gst-compliance' ? 'text-pink-100' : 'text-[#777]'
              }`}>
                Click to view verified regulatory standards and ITC protocols.
              </p>
            </div>
          </button>

          {/* Action Button 4: Interactive MOQ Savings Calculator */}
          <button
            type="button"
            onClick={() => setActiveCalculator(!activeCalculator)}
            className={`p-4 rounded-2xl border text-left transition-all duration-200 cursor-pointer flex flex-col justify-between group active:scale-[0.98] ${
              activeCalculator
                ? 'bg-[#1E1E1E] text-white border-[#1E1E1E] shadow-md ring-2 ring-[#1E1E1E]/30'
                : 'bg-white hover:bg-[#FFF5F8] text-[#1E1E1E] border-[#F0E6EC] hover:border-[#FFB8D6] shadow-xs'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                activeCalculator ? 'bg-white/20 text-white' : 'bg-[#FFF0F5] text-[#B8005A]'
              }`}>
                <Calculator className="w-4 h-4" />
              </div>
              <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                activeCalculator ? 'bg-white/20 text-white' : 'bg-[#FFF0F5] text-[#B8005A]'
              }`}>
                {activeCalculator ? 'Open' : 'Calculator'}
              </span>
            </div>
            <div>
              <h3 className="font-bold text-sm leading-snug">
                Wholesale Margin Estimator
              </h3>
              <p className={`text-xs mt-1 line-clamp-2 ${
                activeCalculator ? 'text-gray-300' : 'text-[#777]'
              }`}>
                Calculate volume tiered discounts and instant order savings.
              </p>
            </div>
          </button>
        </div>

        {/* Display Message Box when an action button is clicked */}
        {activeMessage && (
          <div className="mb-6 p-5 sm:p-6 bg-white border-2 border-[#B8005A]/30 rounded-2xl shadow-lg relative animate-in fade-in slide-in-from-top-2 duration-300">
            <button
              type="button"
              onClick={() => setActiveMessage(null)}
              className="absolute top-4 right-4 text-[#888] hover:text-[#B8005A] p-1.5 rounded-full hover:bg-[#FFF0F5] transition-colors cursor-pointer"
              aria-label="Close message"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-start gap-3.5 pr-8">
              <div className="w-10 h-10 rounded-full bg-[#FFF0F5] border border-[#FFD6E5] text-[#B8005A] flex items-center justify-center shrink-0 mt-0.5">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <h4 className="font-bold text-base sm:text-lg text-[#1A1A1A]">
                    {activeMessage.title}
                  </h4>
                  <span className="text-[11px] font-semibold text-[#8E8E93] bg-[#F7F7F7] px-2 py-0.5 rounded-md border border-[#EEEEEE]">
                    {activeMessage.timestamp}
                  </span>
                </div>

                <p className="text-sm text-[#444] leading-relaxed mb-4">
                  {activeMessage.message}
                </p>

                {/* Details list */}
                {activeMessage.details && (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mb-4">
                    {activeMessage.details.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs font-medium text-[#333] bg-[#FAFAFA] border border-[#EAEAEA] p-2.5 rounded-xl">
                        <Check className="w-3.5 h-3.5 text-[#B8005A] shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Optional Promo Code & Actions */}
                <div className="flex flex-wrap items-center gap-3 pt-3 border-t border-[#F0E6EC]">
                  {activeMessage.code && (
                    <div className="flex items-center gap-2 bg-[#FFF0F5] border border-[#FFD1E3] px-3 py-1.5 rounded-xl">
                      <span className="text-xs font-medium text-[#777]">Voucher Code:</span>
                      <code className="text-xs font-extrabold text-[#B8005A] tracking-wider uppercase">
                        {activeMessage.code}
                      </code>
                      <button
                        type="button"
                        onClick={() => handleCopyCode(activeMessage.code!)}
                        className="ml-1 text-[#B8005A] hover:text-[#931248] text-xs font-bold inline-flex items-center gap-1 cursor-pointer transition-colors"
                      >
                        {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedCode ? 'Copied!' : 'Copy'}</span>
                      </button>
                    </div>
                  )}

                  {onOpenCatalog && (
                    <button
                      type="button"
                      onClick={onOpenCatalog}
                      className="px-4 py-2 bg-[#B8005A] hover:bg-[#A0004E] text-white font-bold text-xs rounded-xl shadow-xs inline-flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <span>Explore Eligible Catalog</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={() => setActiveMessage(null)}
                    className="px-3 py-2 text-xs font-semibold text-[#666] hover:text-[#111] hover:bg-gray-100 rounded-xl transition-colors cursor-pointer"
                  >
                    Dismiss Message
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Interactive Calculator Drawer/Panel */}
        {activeCalculator && (
          <div className="mb-6 p-5 sm:p-6 bg-white border border-[#EAE5DE] rounded-2xl shadow-md animate-in fade-in duration-200">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Calculator className="w-5 h-5 text-[#B8005A]" />
                <h4 className="font-bold text-base text-[#1A1A1A]">
                  Interactive Wholesale Quantity & Margin Estimator
                </h4>
              </div>
              <button
                type="button"
                onClick={() => setActiveCalculator(false)}
                className="text-[#999] hover:text-[#333] cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#555] mb-1.5">
                  Order Quantity (Units): <span className="text-[#B8005A] font-bold">{calcUnits} pcs</span>
                </label>
                <input
                  type="range"
                  min="5"
                  max="200"
                  step="5"
                  value={calcUnits}
                  onChange={(e) => setCalcUnits(Number(e.target.value))}
                  className="w-full accent-[#B8005A] cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-[#999] mt-1">
                  <span>5 pcs (MOQ)</span>
                  <span>50 pcs (-20%)</span>
                  <span>200 pcs (Bulk)</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#555] mb-1.5">
                  Estimated Unit Retail MSRP (₹)
                </label>
                <input
                  type="number"
                  min="100"
                  max="10000"
                  step="50"
                  value={calcUnitPrice}
                  onChange={(e) => setCalcUnitPrice(Number(e.target.value))}
                  className="w-full px-3 py-2 text-sm border border-[#DDD] rounded-xl focus:border-[#B8005A] focus:outline-none"
                />
              </div>

              <div className="p-3 bg-[#FFF9FB] border border-[#FFD6E5] rounded-xl flex flex-col justify-center">
                <div className="flex justify-between text-xs text-[#666]">
                  <span>Tier Discount:</span>
                  <span className="font-bold text-[#B8005A]">{(bulkDiscount * 100).toFixed(0)}% Off</span>
                </div>
                <div className="flex justify-between text-xs text-[#666] mt-1">
                  <span>Estimated Total:</span>
                  <span className="font-bold text-[#1A1A1A]">₹{finalDiscountedTotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-xs text-emerald-700 font-bold mt-1 pt-1 border-t border-[#FFD6E5]">
                  <span>Instant Margin Savings:</span>
                  <span>₹{totalSavings.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
