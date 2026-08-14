import React, { useState } from 'react';
import { X, CheckCircle2, ArrowRight, ArrowLeft, Building2, Store, Sparkles, Upload, ShieldCheck } from 'lucide-react';
import { CategoryId } from '../types';

interface RegisterWizardModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (user: { name: string; businessName: string; role: 'buyer' | 'supplier' }) => void;
}

export const RegisterWizardModal: React.FC<RegisterWizardModalProps> = ({
  isOpen,
  onClose,
  onSuccess
}) => {
  const [step, setStep] = useState(1);
  const [role, setRole] = useState<'supplier' | 'buyer'>('supplier');

  // Step 1 State
  const [fullName, setFullName] = useState('Helena Dubois');
  const [email, setEmail] = useState('helena@luxeaesthetics.fr');
  const [password, setPassword] = useState('••••••••••••');

  // Step 2 State
  const [businessName, setBusinessName] = useState('Luxe Aesthetics Paris');
  const [businessType, setBusinessType] = useState('Manufacturer & Wholesaler');
  const [city, setCity] = useState('Paris, EU');
  const [phone, setPhone] = useState('+33 1 48 90 22 11');
  const [vatNumber, setVatNumber] = useState('FR8923849102');

  // Step 3 State
  const [productTitle, setProductTitle] = useState('Micro-Bio Active Peptide Serum');
  const [productCategory, setProductCategory] = useState<CategoryId>('skincare');
  const [wholesalePrice, setWholesalePrice] = useState('32.00');
  const [moq, setMoq] = useState('25');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) {
      setStep(step + 1);
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsComplete(true);
      setTimeout(() => {
        onSuccess({
          name: fullName,
          businessName,
          role
        });
        onClose();
      }, 1800);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/65 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl border border-[#EDEDED] relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white/90 hover:bg-[#FFF0F5] text-[#555] hover:text-[#B8005A] border border-[#E5E5E5] flex items-center justify-center transition-all shadow-xs cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Top Header & Wizard Stepper */}
        <div className="p-6 sm:p-8 bg-gradient-to-r from-[#FFF5F8] to-white border-b border-[#F0E6EC]">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#B8005A] bg-[#FFF0F5] border border-[#FFD1E3] px-2.5 py-0.5 rounded-full">
              Nexora Verified Network
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#1E1E1E] tracking-tight mt-1.5">
            List Your Beauty Business — Free
          </h2>
          <p className="text-xs sm:text-sm text-[#737373] mt-1">
            Get instant discovery across 12,000+ verified luxury spas, salons, and beauty retailers.
          </p>

          {/* Stepper Progress Bar */}
          <div className="mt-6 grid grid-cols-3 gap-3">
            {/* Step 1 */}
            <div className={`flex items-center gap-2.5 p-2 rounded-xl border transition-all ${
              step >= 1 ? 'bg-white border-[#B8005A] shadow-xs' : 'bg-[#FAFAFA] border-[#E5E5E5] opacity-60'
            }`}>
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                step > 1 ? 'bg-[#10B981] text-white' : step === 1 ? 'bg-[#B8005A] text-white' : 'bg-[#E5E5E5] text-[#737373]'
              }`}>
                {step > 1 ? <CheckCircle2 className="w-3.5 h-3.5" /> : '1'}
              </div>
              <span className="text-xs font-bold text-[#1E1E1E]">Account</span>
            </div>

            {/* Step 2 */}
            <div className={`flex items-center gap-2.5 p-2 rounded-xl border transition-all ${
              step >= 2 ? 'bg-white border-[#B8005A] shadow-xs' : 'bg-[#FAFAFA] border-[#E5E5E5] opacity-60'
            }`}>
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                step > 2 ? 'bg-[#10B981] text-white' : step === 2 ? 'bg-[#B8005A] text-white' : 'bg-[#E5E5E5] text-[#737373]'
              }`}>
                {step > 2 ? <CheckCircle2 className="w-3.5 h-3.5" /> : '2'}
              </div>
              <span className="text-xs font-bold text-[#1E1E1E]">Business</span>
            </div>

            {/* Step 3 */}
            <div className={`flex items-center gap-2.5 p-2 rounded-xl border transition-all ${
              step >= 3 ? 'bg-white border-[#B8005A] shadow-xs' : 'bg-[#FAFAFA] border-[#E5E5E5] opacity-60'
            }`}>
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                step === 3 ? 'bg-[#B8005A] text-white' : 'bg-[#E5E5E5] text-[#737373]'
              }`}>
                3
              </div>
              <span className="text-xs font-bold text-[#1E1E1E]">Products</span>
            </div>
          </div>
        </div>

        {/* Wizard Form Content */}
        {isComplete ? (
          <div className="p-10 text-center flex flex-col items-center justify-center animate-in zoom-in-95 duration-300">
            <div className="w-16 h-16 rounded-full bg-[#ECFDF5] border-2 border-[#10B981] flex items-center justify-center text-[#10B981] mb-4">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-bold text-[#1E1E1E]">Welcome to Nexora Luxe!</h3>
            <p className="text-sm text-[#525252] mt-2 max-w-md">
              Your business profile for <strong>{businessName}</strong> has been submitted. Your B2B wholesale portal is now active.
            </p>
            <div className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-[#10B981] bg-[#ECFDF5] px-3 py-1 rounded-full">
              <ShieldCheck className="w-4 h-4" />
              <span>Verified Account Activated</span>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-5">
            {/* STEP 1: CREATE ACCOUNT */}
            {step === 1 && (
              <div className="space-y-4 animate-in fade-in duration-200">
                <div>
                  <label className="text-xs font-bold text-[#525252] uppercase block mb-1.5">
                    Account Type
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setRole('supplier')}
                      className={`p-3 rounded-2xl border text-left flex items-start gap-3 transition-all cursor-pointer ${
                        role === 'supplier'
                          ? 'border-[#B8005A] bg-[#FFF0F5] text-[#B8005A] ring-2 ring-[#FFD1E3]'
                          : 'border-[#E5E5E5] bg-white text-[#525252]'
                      }`}
                    >
                      <Building2 className="w-5 h-5 shrink-0 mt-0.5" />
                      <div>
                        <div className="text-xs font-bold">Brand / Supplier</div>
                        <div className="text-[10px] text-[#737373] mt-0.5">Sell wholesale to salons & spas</div>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setRole('buyer')}
                      className={`p-3 rounded-2xl border text-left flex items-start gap-3 transition-all cursor-pointer ${
                        role === 'buyer'
                          ? 'border-[#B8005A] bg-[#FFF0F5] text-[#B8005A] ring-2 ring-[#FFD1E3]'
                          : 'border-[#E5E5E5] bg-white text-[#525252]'
                      }`}
                    >
                      <Store className="w-5 h-5 shrink-0 mt-0.5" />
                      <div>
                        <div className="text-xs font-bold">Salon / Spa Buyer</div>
                        <div className="text-[10px] text-[#737373] mt-0.5">Source luxury products at MOQ</div>
                      </div>
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-[#525252] uppercase block mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      required
                      className="w-full bg-[#FAFAFA] border border-[#E5E5E5] rounded-xl px-3.5 py-2.5 text-xs text-[#1E1E1E] focus:outline-none focus:border-[#B8005A]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-[#525252] uppercase block mb-1">
                      Business Email
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full bg-[#FAFAFA] border border-[#E5E5E5] rounded-xl px-3.5 py-2.5 text-xs text-[#1E1E1E] focus:outline-none focus:border-[#B8005A]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-[#525252] uppercase block mb-1">
                    Password
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full bg-[#FAFAFA] border border-[#E5E5E5] rounded-xl px-3.5 py-2.5 text-xs text-[#1E1E1E] focus:outline-none focus:border-[#B8005A]"
                  />
                </div>
              </div>
            )}

            {/* STEP 2: ADD BUSINESS INFO */}
            {step === 2 && (
              <div className="space-y-4 animate-in fade-in duration-200">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-[#525252] uppercase block mb-1">
                      Company / Business Name
                    </label>
                    <input
                      type="text"
                      value={businessName}
                      onChange={(e) => setBusinessName(e.target.value)}
                      required
                      className="w-full bg-[#FAFAFA] border border-[#E5E5E5] rounded-xl px-3.5 py-2.5 text-xs text-[#1E1E1E] focus:outline-none focus:border-[#B8005A]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-[#525252] uppercase block mb-1">
                      Business Category
                    </label>
                    <select
                      value={businessType}
                      onChange={(e) => setBusinessType(e.target.value)}
                      className="w-full bg-[#FAFAFA] border border-[#E5E5E5] rounded-xl px-3.5 py-2.5 text-xs text-[#1E1E1E] focus:outline-none focus:border-[#B8005A]"
                    >
                      <option>Manufacturer & Wholesaler</option>
                      <option>Authorized Brand Distributor</option>
                      <option>Luxury Medi-Spa / Clinic Group</option>
                      <option>Salon Chain Backbar Buyer</option>
                      <option>Aesthetic Equipment Supplier</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-[#525252] uppercase block mb-1">
                      Headquarters City / Market
                    </label>
                    <input
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      required
                      className="w-full bg-[#FAFAFA] border border-[#E5E5E5] rounded-xl px-3.5 py-2.5 text-xs text-[#1E1E1E] focus:outline-none focus:border-[#B8005A]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-[#525252] uppercase block mb-1">
                      Direct Phone
                    </label>
                    <input
                      type="text"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                      className="w-full bg-[#FAFAFA] border border-[#E5E5E5] rounded-xl px-3.5 py-2.5 text-xs text-[#1E1E1E] focus:outline-none focus:border-[#B8005A]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-[#525252] uppercase block mb-1">
                    Tax / VAT Identification (for verified badge)
                  </label>
                  <input
                    type="text"
                    value={vatNumber}
                    onChange={(e) => setVatNumber(e.target.value)}
                    required
                    className="w-full bg-[#FAFAFA] border border-[#E5E5E5] rounded-xl px-3.5 py-2.5 text-xs text-[#1E1E1E] focus:outline-none focus:border-[#B8005A]"
                  />
                </div>
              </div>
            )}

            {/* STEP 3: ADD PRODUCTS */}
            {step === 3 && (
              <div className="space-y-4 animate-in fade-in duration-200">
                <div>
                  <label className="text-xs font-bold text-[#525252] uppercase block mb-1">
                    Primary Wholesale Product Title
                  </label>
                  <input
                    type="text"
                    value={productTitle}
                    onChange={(e) => setProductTitle(e.target.value)}
                    required
                    className="w-full bg-[#FAFAFA] border border-[#E5E5E5] rounded-xl px-3.5 py-2.5 text-xs text-[#1E1E1E] focus:outline-none focus:border-[#B8005A]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="text-xs font-bold text-[#525252] uppercase block mb-1">
                      Category
                    </label>
                    <select
                      value={productCategory}
                      onChange={(e) => setProductCategory(e.target.value as CategoryId)}
                      className="w-full bg-[#FAFAFA] border border-[#E5E5E5] rounded-xl px-3.5 py-2.5 text-xs text-[#1E1E1E] focus:outline-none focus:border-[#B8005A]"
                    >
                      <option value="skincare">Skincare</option>
                      <option value="haircare">Haircare</option>
                      <option value="makeup">Makeup</option>
                      <option value="nails">Nails</option>
                      <option value="spa">Spa</option>
                      <option value="tools">Salon Tools</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-[#525252] uppercase block mb-1">
                      Wholesale Price ($)
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      value={wholesalePrice}
                      onChange={(e) => setWholesalePrice(e.target.value)}
                      required
                      className="w-full bg-[#FAFAFA] border border-[#E5E5E5] rounded-xl px-3.5 py-2.5 text-xs text-[#1E1E1E] focus:outline-none focus:border-[#B8005A]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-[#525252] uppercase block mb-1">
                      MOQ (Units)
                    </label>
                    <input
                      type="number"
                      value={moq}
                      onChange={(e) => setMoq(e.target.value)}
                      required
                      className="w-full bg-[#FAFAFA] border border-[#E5E5E5] rounded-xl px-3.5 py-2.5 text-xs text-[#1E1E1E] focus:outline-none focus:border-[#B8005A]"
                    />
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-[#FFF9FB] border border-[#FFD6E5] flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white border border-[#FFD1E3] flex items-center justify-center text-[#B8005A]">
                      <Upload className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#1E1E1E]">Product Images & Line Sheet</div>
                      <div className="text-[10px] text-[#737373]">PNG, JPG, PDF up to 25MB (Simulated)</div>
                    </div>
                  </div>
                  <span className="text-[11px] font-bold text-[#B8005A] bg-white px-2.5 py-1 rounded-lg border border-[#FFD1E3]">
                    Ready to Publish
                  </span>
                </div>
              </div>
            )}

            {/* Bottom Actions */}
            <div className="mt-8 pt-4 border-t border-[#F0F0F0] flex items-center justify-between">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={() => setStep(step - 1)}
                  className="px-4 py-2.5 rounded-xl border border-[#E5E5E5] text-xs font-bold text-[#525252] hover:bg-[#F5F5F5] transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back</span>
                </button>
              ) : (
                <div />
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-[#B8005A] hover:bg-[#A0004E] text-white px-6 py-2.5 rounded-xl text-xs font-bold shadow-md hover:shadow-lg transition-all active:scale-95 flex items-center gap-2 cursor-pointer"
              >
                <span>{step === 3 ? (isSubmitting ? 'Publishing...' : 'Complete & List Business') : 'Continue'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
