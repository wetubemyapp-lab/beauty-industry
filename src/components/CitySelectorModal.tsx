import React, { useState } from 'react';
import { X, MapPin, Check, Search, Globe } from 'lucide-react';
import { CITIES } from '../data/mockData';

interface CitySelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCity: string;
  onSelectCity: (city: string) => void;
}

export const CitySelectorModal: React.FC<CitySelectorModalProps> = ({
  isOpen,
  onClose,
  selectedCity,
  onSelectCity
}) => {
  const [search, setSearch] = useState('');

  if (!isOpen) return null;
  const filtered = CITIES.filter((c) => c.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl border border-[#EDEDED] relative">
        <div className="p-6 border-b border-[#F0E6EC] bg-gradient-to-r from-[#FFF5F8] to-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#FFF0F5] border border-[#FFD1E3] flex items-center justify-center text-[#B8005A]">
              <Globe className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#1E1E1E]">Select Market Region</h3>
              <p className="text-xs text-[#737373]">Discover local distributors & regional stock</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white hover:bg-[#FFF0F5] text-[#555] hover:text-[#B8005A] border border-[#E5E5E5] flex items-center justify-center transition-all cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div className="relative">
            <Search className="w-4 h-4 text-[#8E8E93] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search region or city..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-[#FAFAFA] border border-[#E5E5E5] rounded-xl pl-9 pr-3 py-2 text-xs text-[#1E1E1E] focus:outline-none focus:border-[#B8005A]"
            />
          </div>

          <div className="space-y-1.5 max-h-64 overflow-y-auto">
            {filtered.map((city) => {
              const isSelected = selectedCity === city;
              return (
                <button
                  key={city}
                  onClick={() => {
                    onSelectCity(city);
                    onClose();
                  }}
                  className={`w-full flex items-center justify-between p-3 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#FFF0F5] text-[#B8005A] border border-[#FFD1E3]'
                      : 'hover:bg-[#F5F5F5] text-[#1E1E1E] border border-transparent'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <MapPin className={`w-3.5 h-3.5 ${isSelected ? 'text-[#B8005A]' : 'text-[#8E8E93]'}`} />
                    {city}
                  </span>
                  {isSelected && <Check className="w-4 h-4 text-[#B8005A]" />}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
