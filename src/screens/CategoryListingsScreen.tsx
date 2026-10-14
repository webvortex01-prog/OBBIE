import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { StatusBar, Header } from '../components/Header';
import { BottomNav } from '../components/BottomNav';
import { Star, ChevronRight, SlidersHorizontal, MapPin } from 'lucide-react';

export const CategoryListingsScreen: React.FC = () => {
  const {
    selectedCategory,
    professionals,
    selectProfessionalById,
    navigateTo,
    maxDistanceFilter,
    maxPriceFilter,
    setFilterModalOpen
  } = useApp();

  const [activeSubcategory, setActiveSubcategory] = useState('Todos');

  // Filter professionals belonging to this category or matching filters
  const categoryProfessionals = professionals.filter((p) => {
    // If user clicked a category, show matching category or show all if general search
    const matchesCategory =
      selectedCategory.id === 'outros' || p.category === selectedCategory.id || p.category === 'faxina';
    const matchesDistance = p.distanceKm <= maxDistanceFilter;
    const matchesPrice = p.price <= maxPriceFilter;
    return matchesCategory && matchesDistance && matchesPrice;
  });

  const handleCardClick = (id: string) => {
    selectProfessionalById(id);
    navigateTo('professional_profile');
  };

  return (
    <div className="flex flex-col h-full bg-[#F8FAFC] select-none">
      <StatusBar />
      <Header
        title={selectedCategory.name}
        showBack={true}
        rightAction={
          <button
            onClick={() => setFilterModalOpen(true)}
            className="p-1.5 text-slate-700 hover:bg-slate-100 rounded-full active:scale-95 transition-transform"
            aria-label="Filtrar profissionais"
          >
            <SlidersHorizontal className="w-5 h-5" />
          </button>
        }
      />

      {/* Filter Chips (Screen 5: Todos, Residencial, Comercial, etc.) */}
      <div className="px-5 py-2.5 bg-white border-b border-slate-100">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
          {selectedCategory.subcategories.map((sub) => {
            const isActive = activeSubcategory === sub;
            return (
              <button
                key={sub}
                onClick={() => setActiveSubcategory(sub)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-[#0052FF] text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {sub}
              </button>
            );
          })}
        </div>
      </div>

      {/* Professionals List (Matching Screen 5) */}
      <div className="flex-1 overflow-y-auto px-5 py-3 space-y-3">
        {categoryProfessionals.map((prof) => (
          <div
            key={prof.id}
            onClick={() => handleCardClick(prof.id)}
            className="bg-white rounded-2xl p-3.5 border border-slate-100 shadow-xs hover:shadow-md hover:border-blue-100 transition-all cursor-pointer group active:scale-[0.99]"
          >
            <div className="flex items-start gap-3.5">
              {/* Avatar */}
              <div className="relative flex-shrink-0">
                <img
                  src={prof.avatar}
                  alt={prof.name}
                  className="w-13 h-13 rounded-full object-cover ring-2 ring-slate-100 group-hover:ring-[#0052FF]/30 transition-all"
                />
                {prof.verified && (
                  <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-blue-500 text-white rounded-full flex items-center justify-center text-[8px] font-bold ring-2 ring-white">
                    ✓
                  </span>
                )}
              </div>

              {/* Middle Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-slate-900 truncate group-hover:text-[#0052FF] transition-colors">
                    {prof.name}
                  </h3>
                  <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-[#0052FF] group-hover:translate-x-0.5 transition-all" />
                </div>

                <p className="text-xs text-slate-500 mt-0.5">{prof.title}</p>

                {/* Rating & Distance */}
                <div className="flex items-center gap-3 mt-1.5 text-xs text-slate-600">
                  <div className="flex items-center gap-1 font-semibold text-amber-600">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>{prof.rating.toFixed(1)}</span>
                    <span className="text-slate-400 font-normal">({prof.reviewsCount})</span>
                  </div>

                  <span className="text-slate-300">•</span>

                  <div className="flex items-center gap-1 text-slate-500">
                    <MapPin className="w-3 h-3 text-slate-400" />
                    <span>A {prof.distanceKm} km</span>
                  </div>
                </div>

                {/* Price */}
                <div className="mt-2 pt-2 border-t border-slate-50 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400">{prof.availableDays}</span>
                  <div className="text-right">
                    <span className="text-sm font-black text-[#0052FF]">
                      R$ {prof.price.toFixed(2).replace('.', ',')}
                    </span>
                    <span className="text-[10px] text-slate-400 ml-1">{prof.priceUnit}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {categoryProfessionals.length === 0 && (
          <div className="text-center py-12 text-slate-400">
            <p className="text-sm">Nenhum profissional encontrado com os filtros atuais.</p>
            <button
              onClick={() => setFilterModalOpen(true)}
              className="mt-3 text-xs font-bold text-[#0052FF] underline"
            >
              Ajustar filtros
            </button>
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
};
