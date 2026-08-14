import React from 'react';
import { Sparkles, Check, Building2, Store, ShieldCheck, ArrowRight, FileCheck, Layers } from 'lucide-react';

interface BusinessViewProps {
  onOpenRegister: () => void;
}

export const BusinessView: React.FC<BusinessViewProps> = ({ onOpenRegister }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 animate-in fade-in duration-300">
      {/* Hero */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFF0F5] border border-[#FFD1E3] text-[#B8005A] text-xs font-bold uppercase tracking-wider mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          B2B Enterprise Solutions
        </div>
        <h1 className="text-3xl sm:text-5xl font-bold text-[#1E1E1E] tracking-tight">
          Scale Your Beauty Brand or Salon Chain
        </h1>
        <p className="text-sm sm:text-base text-[#737373] mt-3 leading-relaxed">
          Nexora Luxe connects high-end beauty manufacturers, distributors, and professional salons through a single verified trade infrastructure.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <button
            onClick={onOpenRegister}
            className="bg-[#B8005A] hover:bg-[#A0004E] text-white px-8 py-3.5 rounded-2xl text-sm font-bold shadow-md hover:shadow-lg transition-all active:scale-95 flex items-center gap-2 cursor-pointer"
          >
            <span>List Your Business — Free</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Two Pillars: For Brands vs For Salons */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        {/* Card 1: For Suppliers & Brands */}
        <div className="bg-white border border-[#EDEDED] rounded-3xl p-8 sm:p-10 shadow-xs flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-[#FFF0F5] text-[#B8005A] flex items-center justify-center mb-6">
              <Building2 className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold text-[#B8005A] uppercase tracking-wider">For Manufacturers & Wholesalers</span>
            <h2 className="text-2xl font-bold text-[#1E1E1E] mt-1">Direct Access to 12,000+ Salons & Spas</h2>
            <p className="text-xs sm:text-sm text-[#737373] mt-2">
              Eliminate friction in wholesale customer acquisition. Publish your line sheets, manage MOQ tiers, and receive verified RFQs directly.
            </p>

            <ul className="mt-6 space-y-3 text-xs sm:text-sm text-[#525252]">
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-[#10B981] shrink-0" />
                <span>Automated MOQ tier calculations & sample dispatch</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-[#10B981] shrink-0" />
                <span>Verified B2B Escrow & payment guarantee protection</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-[#10B981] shrink-0" />
                <span>European and North American regulatory compliance verification</span>
              </li>
            </ul>
          </div>

          <button
            onClick={onOpenRegister}
            className="mt-8 w-full bg-[#FFF0F5] hover:bg-[#B8005A] text-[#B8005A] hover:text-white border border-[#FFD1E3] py-3 rounded-xl text-xs font-bold transition-all cursor-pointer"
          >
            Start as Supplier
          </button>
        </div>

        {/* Card 2: For Salons & Spas */}
        <div className="bg-white border border-[#EDEDED] rounded-3xl p-8 sm:p-10 shadow-xs flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-[#FFF0F5] text-[#B8005A] flex items-center justify-center mb-6">
              <Store className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold text-[#B8005A] uppercase tracking-wider">For Salons, Spas & Clinics</span>
            <h2 className="text-2xl font-bold text-[#1E1E1E] mt-1">Unmatched Factory & Wholesale Rates</h2>
            <p className="text-xs sm:text-sm text-[#737373] mt-2">
              Cut out multiple distributor markups. Order directly from licensed luxury manufacturers with certified authenticity and prompt logistics.
            </p>

            <ul className="mt-6 space-y-3 text-xs sm:text-sm text-[#525252]">
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-[#10B981] shrink-0" />
                <span>Single consolidated wholesale inquiry cart (RFQ)</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-[#10B981] shrink-0" />
                <span>Request complimentary samples before committing to bulk</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-[#10B981] shrink-0" />
                <span>Local warehouse stock with 24-48h expedited dispatch</span>
              </li>
            </ul>
          </div>

          <button
            onClick={onOpenRegister}
            className="mt-8 w-full bg-[#FFF0F5] hover:bg-[#B8005A] text-[#B8005A] hover:text-white border border-[#FFD1E3] py-3 rounded-xl text-xs font-bold transition-all cursor-pointer"
          >
            Start as Salon Buyer
          </button>
        </div>
      </div>

      {/* Verification Standards */}
      <div className="bg-[#FFFDFE] border border-[#FFD6E5] rounded-3xl p-8 sm:p-12 text-center">
        <ShieldCheck className="w-12 h-12 text-[#B8005A] mx-auto mb-4" />
        <h2 className="text-2xl sm:text-3xl font-bold text-[#1E1E1E]">
          The Nexora Verification Standard
        </h2>
        <p className="text-xs sm:text-sm text-[#737373] mt-2 max-w-xl mx-auto">
          Every verified partner undergoes strict verification: business registration checks, authentic lab testing certifications, and customer satisfaction audits.
        </p>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto text-left">
          <div className="p-4 bg-white rounded-2xl border border-[#EDEDED]">
            <FileCheck className="w-6 h-6 text-[#B8005A] mb-2" />
            <h4 className="text-xs font-bold text-[#1E1E1E]">Entity Verification</h4>
            <p className="text-[11px] text-[#737373] mt-1">Official VAT / Tax ID and corporate registration checked with local authorities.</p>
          </div>
          <div className="p-4 bg-white rounded-2xl border border-[#EDEDED]">
            <Layers className="w-6 h-6 text-[#B8005A] mb-2" />
            <h4 className="text-xs font-bold text-[#1E1E1E]">Product Quality</h4>
            <p className="text-[11px] text-[#737373] mt-1">CE, FDA, Ecocert, and GMP manufacturing safety certificates verified.</p>
          </div>
          <div className="p-4 bg-white rounded-2xl border border-[#EDEDED]">
            <ShieldCheck className="w-6 h-6 text-[#B8005A] mb-2" />
            <h4 className="text-xs font-bold text-[#1E1E1E]">Fulfillment Audit</h4>
            <p className="text-[11px] text-[#737373] mt-1">98%+ on-time dispatch rate required to maintain verified gold badge status.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
