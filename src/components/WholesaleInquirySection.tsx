import React, { useState } from 'react';
import { Mail, Send, CheckCircle2, AlertCircle, Sparkles, Shield, ArrowRight, RefreshCw } from 'lucide-react';

interface WholesaleInquirySectionProps {
  onSuccessNotification?: (message: string) => void;
}

export const WholesaleInquirySection: React.FC<WholesaleInquirySectionProps> = ({
  onSuccessNotification
}) => {
  const [email, setEmail] = useState('');
  const [buyerType, setBuyerType] = useState<'salon' | 'spa' | 'retail' | 'distributor'>('salon');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [submittedData, setSubmittedData] = useState<{ email: string; buyerType: string } | null>(null);

  const validateEmail = (val: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(val.trim());
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!email.trim()) {
      setErrorMessage('Please enter your business or salon email address.');
      return;
    }

    if (!validateEmail(email)) {
      setErrorMessage('Please enter a valid business email address (e.g. buyer@salon.com).');
      return;
    }

    setIsSubmitting(true);

    // Simulate responsive network inquiry submission
    setTimeout(() => {
      setIsSubmitting(false);
      const data = {
        email: email.trim(),
        buyerType: buyerType
      };
      setSubmittedData(data);
      if (onSuccessNotification) {
        onSuccessNotification(`VIP Price Sheet sent to ${data.email}`);
      }
    }, 700);
  };

  const handleReset = () => {
    setSubmittedData(null);
    setEmail('');
    setErrorMessage(null);
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      <div className="responsive-container bg-gradient-to-br from-[#1E1E1E] via-[#2A1822] to-[#1E1E1E] text-white rounded-3xl p-6 sm:p-10 lg:p-14 border border-[#442332] shadow-xl relative overflow-hidden">
        {/* Glow Accent */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#B8005A]/20 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#FF69B4]/10 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Description Column */}
          <div className="lg:col-span-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-[#FFB8D6] text-xs font-bold uppercase tracking-wider mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              Wholesale VIP Buyer Newsletter & Sample Kit
            </div>

            <h2 className="responsive-hero-title text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight leading-tight text-white font-serif">
              Access Direct Factory Price Lists & Curated Sample Lots
            </h2>

            <p className="mt-3 text-sm sm:text-base text-gray-300 leading-relaxed max-w-xl">
              Subscribe with your business email to receive weekly B2B price adjustments, factory volume discounts, and complimentary salon sample formulations directly from certified manufacturers.
            </p>

            {/* Badges */}
            <div className="mt-6 flex flex-wrap items-center gap-3 text-xs text-gray-300">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10">
                <Shield className="w-3.5 h-3.5 text-[#FFB8D6]" />
                Zero Spam • Unsubscribe Anytime
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                GST-Compliant Direct Invoices
              </span>
            </div>
          </div>

          {/* Right Form Column */}
          <div className="lg:col-span-6">
            <div className="bg-white/95 backdrop-blur-md text-[#1E1E1E] rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-2xl border border-white/40">
              {!submittedData ? (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label htmlFor="business-email" className="block text-xs font-bold uppercase tracking-wider text-[#4A4A4A]">
                        Business Email Address <span className="text-[#B8005A]">*</span>
                      </label>
                      <span className="text-[11px] text-[#888]">Instant VIP Delivery</span>
                    </div>

                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#888]">
                        <Mail className="w-4 h-4" />
                      </div>
                      <input
                        id="business-email"
                        type="email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          if (errorMessage) setErrorMessage(null);
                        }}
                        placeholder="salonowner@business.com"
                        className={`w-full pl-10 pr-4 py-3.5 bg-[#FAF8F9] border rounded-xl text-sm font-medium text-[#1E1E1E] placeholder-[#999] transition-all focus:outline-none focus:ring-2 focus:ring-[#B8005A]/20 ${
                          errorMessage
                            ? 'border-rose-400 bg-rose-50/50'
                            : 'border-[#E5D8DF] focus:border-[#B8005A]'
                        }`}
                        aria-invalid={!!errorMessage}
                        aria-describedby={errorMessage ? 'email-error' : undefined}
                      />
                    </div>

                    {errorMessage && (
                      <p id="email-error" className="mt-1.5 text-xs text-rose-600 flex items-center gap-1 font-medium animate-in fade-in">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>{errorMessage}</span>
                      </p>
                    )}
                  </div>

                  {/* Buyer Profile Pill Selector */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#4A4A4A] mb-2">
                      Business Type
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {[
                        { id: 'salon', label: 'Salon / Parlor' },
                        { id: 'spa', label: 'Day Spa / Clinic' },
                        { id: 'retail', label: 'Retail Chain' },
                        { id: 'distributor', label: 'Wholesaler' }
                      ].map((item) => (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => setBuyerType(item.id as any)}
                          className={`px-2.5 py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer text-center ${
                            buyerType === item.id
                              ? 'bg-[#B8005A] text-white border-[#B8005A] shadow-xs'
                              : 'bg-white hover:bg-[#FFF5F8] text-[#555] border-[#E8DEE3]'
                          }`}
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Simple Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full mt-2 py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#B8005A] to-[#931248] hover:from-[#A0004E] hover:to-[#7E0F3D] text-white font-bold text-sm shadow-md hover:shadow-lg transition-all active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>Processing VIP Access...</span>
                      </>
                    ) : (
                      <>
                        <span>Get VIP Price Sheet & Sample Kit</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>

                  <p className="text-[11px] text-[#888] text-center mt-1">
                    By submitting, you agree to receive verified B2B catalog drops. No spam guaranteed.
                  </p>
                </form>
              ) : (
                /* Interactive Success Confirmation Message Box */
                <div className="p-4 sm:p-6 text-center animate-in zoom-in-95 duration-200">
                  <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-3 shadow-xs">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-[#1E1E1E]">
                    Subscription Confirmed!
                  </h3>
                  <p className="text-xs sm:text-sm text-[#555] mt-2 leading-relaxed">
                    The Q2 2025 Wholesale Price Sheet and Complimentary Formulation Kit reservation have been sent to:
                  </p>
                  <p className="text-sm font-bold text-[#B8005A] mt-1 bg-[#FFF0F5] py-1.5 px-3 rounded-lg inline-block border border-[#FFD1E3]">
                    {submittedData.email}
                  </p>
                  <p className="text-xs text-[#777] mt-3">
                    A dedicated regional distributor manager will connect with your {submittedData.buyerType} account within 2 business hours.
                  </p>
                  <button
                    type="button"
                    onClick={handleReset}
                    className="mt-5 px-4 py-2 text-xs font-bold text-[#B8005A] hover:bg-[#FFF0F5] rounded-xl border border-[#FFD1E3] transition-colors cursor-pointer"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
