import React from 'react';
import { motion } from 'motion/react';
import {
  Scissors,
  Palette,
  Sparkles,
  Hand,
  Flower2,
  HeartHandshake,
  PenTool,
  Armchair,
  Wrench,
  ArrowRight
} from 'lucide-react';
import { CategoryId } from '../types';

interface ExploreCategoriesProps {
  onSelectCategory: (categoryId: CategoryId) => void;
  onViewAllCatalog: () => void;
}

export const ExploreCategories: React.FC<ExploreCategoriesProps> = ({
  onSelectCategory,
  onViewAllCatalog
}) => {
  const categoryCards = [
    {
      id: 'haircare' as CategoryId,
      name: 'Haircare',
      icon: Scissors
    },
    {
      id: 'haircolor' as CategoryId,
      name: 'Hair Color',
      icon: Palette
    },
    {
      id: 'makeup' as CategoryId,
      name: 'Makeup',
      icon: Sparkles
    },
    {
      id: 'nails' as CategoryId,
      name: 'Nails',
      icon: Hand
    },
    {
      id: 'spa' as CategoryId,
      name: 'Spa',
      icon: Flower2
    },
    {
      id: 'massage' as CategoryId,
      name: 'Massage',
      icon: HeartHandshake
    },
    {
      id: 'tattoo' as CategoryId,
      name: 'Tattoo Studio',
      icon: PenTool
    },
    {
      id: 'furniture' as CategoryId,
      name: 'Salon Furniture',
      icon: Armchair
    }
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      {/* Section Title */}
      <h2 className="text-2xl sm:text-3xl font-bold text-[#1E1E1E] tracking-tight mb-8">
        Explore Categories
      </h2>

      {/* Main Grid: Left Featured Large Card + Right 8 Category Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left Featured Skincare Card */}
        <motion.div
          onClick={() => onSelectCategory('skincare')}
          whileHover={{ y: -6, scale: 1.01 }}
          transition={{ type: 'spring', stiffness: 350, damping: 25 }}
          className="lg:col-span-4 relative rounded-2xl overflow-hidden cursor-pointer group shadow-sm hover:shadow-xl transition-all duration-300 min-h-[300px] lg:min-h-[340px] flex flex-col justify-end"
        >
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuACGmKxH3sKXQzfZ0ok5I09A_2UZ5Lk-zeaa_4Xt6mSPDZDL1IIZA2tVmblc0QziC47pQfp-5Wk6BBt42duT67QeBqYZkN6UH6HkVEU1iqTWHgMbCSUnsvb1PvD9o6hW_C1ySvLZ_q-7F2xmSh4Hn7gBVNzLuNTcqufs4ML63tl-Ng1UqB9kTB8g3uuBZvYf2yAOh8efzkvt74XQrLNEMOurN9E_4tW-0W_K5wpWHASxqrA6QQOfNH1"
            alt="Luxury Skincare Formulations"
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />

          {/* Text Info at bottom */}
          <div className="relative z-10 p-6">
            <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#B8005A] text-white text-[11px] font-bold uppercase tracking-wider mb-2">
              Featured Category
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Skincare
            </h3>
            <p className="text-sm text-white/90 font-medium mt-1">
              Professional Formulations
            </p>
          </div>
        </motion.div>

        {/* Right 8 Small Category Cards (2 Rows of 4) */}
        <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
          {categoryCards.map((cat) => {
            const Icon = cat.icon;
            return (
              <motion.button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                whileHover={{ y: -4, scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                className="bg-white hover:bg-[#FFF8FA] border border-[#EDEDED] hover:border-[#FFD6E5] rounded-2xl p-5 flex flex-col items-center justify-center text-center group shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer min-h-[155px]"
              >
                {/* Icon Container with soft pink circle */}
                <div className="w-12 h-12 rounded-full bg-[#FFF0F5] group-hover:bg-[#FFE0EC] flex items-center justify-center mb-3 transition-colors">
                  <Icon className="w-5 h-5 text-[#B8005A] group-hover:scale-110 transition-transform" />
                </div>
                {/* Name */}
                <span className="text-sm font-semibold text-[#2C2C2E] group-hover:text-[#B8005A] transition-colors">
                  {cat.name}
                </span>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Bottom 2 Wide Banner Cards */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 mt-5">
        {/* Left Wide Card: Professional Beauty Products */}
        <div
          onClick={onViewAllCatalog}
          className="md:col-span-8 bg-white border border-[#EDEDED] hover:border-[#FFD6E5] rounded-2xl p-6 sm:p-7 flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer group shadow-xs hover:shadow-md transition-all"
        >
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-[#1E1E1E] group-hover:text-[#B8005A] transition-colors">
              Professional Beauty Products
            </h3>
            <p className="text-xs sm:text-sm text-[#737373] mt-1">
              Browse over 2,400+ wholesale cosmetic formulas, backbar supplies & aesthetics tools.
            </p>
          </div>
          <div className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#B8005A] tracking-wider uppercase group-hover:translate-x-1 transition-transform shrink-0">
            <span>VIEW CATALOG</span>
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>

        {/* Right Card: Salon Tools & Eq. */}
        <div
          onClick={() => onSelectCategory('tools')}
          className="md:col-span-4 bg-white border border-[#EDEDED] hover:border-[#FFD6E5] rounded-2xl p-6 sm:p-7 flex items-center justify-between cursor-pointer group shadow-xs hover:shadow-md transition-all"
        >
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-full bg-[#FFF0F5] flex items-center justify-center shrink-0">
              <Wrench className="w-5 h-5 text-[#B8005A]" />
            </div>
            <span className="text-base sm:text-lg font-bold text-[#1E1E1E] group-hover:text-[#B8005A] transition-colors">
              Salon Tools & Eq.
            </span>
          </div>
          <ArrowRight className="w-4 h-4 text-[#B8005A] opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
        </div>
      </div>
    </section>
  );
};
