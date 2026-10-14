import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CategoryIcon } from '../components/CategoryIcon';
import {
  Search,
  SlidersHorizontal,
  Star,
  MapPin,
  Calendar,
  MessageSquare,
  ChevronRight,
  Filter,
  Check,
  ShieldCheck
} from 'lucide-react';

export const WebServicesView: React.FC = () => {
  const {
    categories,
    selectedCategory,
    selectCategoryById,
    professionals,
    selectProfessionalById,
    navigateTo,
    globalSearchQuery,
    setGlobalSearchQuery,
    maxDistanceFilter,
    setMaxDistanceFilter,
    maxPriceFilter,
    setMaxPriceFilter,
    setActiveChatProfessionalId
  } = useApp();

  const [activeSubcategory, setActiveSubcategory] = useState('Todos');
  const [minRatingFilter, setMinRatingFilter] = useState<number>(4.0);
  const [sortBy, setSortBy] = useState<'rating' | 'price' | 'distance'>('rating');

  // Filter professionals
  const filteredPros = professionals
    .filter((p) => {
      // Category match
      const matchesCategory =
        selectedCategory.id === 'outros' ||
        p.category === selectedCategory.id ||
        selectedCategory.id === 'faxina';

      // Search match
      const matchesSearch =
        !globalSearchQuery.trim() ||
        p.name.toLowerCase().includes(globalSearchQuery.toLowerCase()) ||
        p.title.toLowerCase().includes(globalSearchQuery.toLowerCase()) ||
        p.bio.toLowerCase().includes(globalSearchQuery.toLowerCase());

      // Numeric filters
      const matchesDistance = p.distanceKm <= maxDistanceFilter;
      const matchesPrice = p.price <= maxPriceFilter;
      const matchesRating = p.rating >= minRatingFilter;

      return matchesCategory && matchesSearch && matchesDistance && matchesPrice && matchesRating;
    })
    .sort((a, b) => {
      if (sortBy === 'price') return a.price - b.price;
      if (sortBy === 'distance') return a.distanceKm - b.distanceKm;
      return b.rating - a.rating;
    });

  const handleCardClick = (id: string) => {
    selectProfessionalById(id);
    navigateTo('professional_profile');
  };

  const handleChat = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    selectProfessionalById(id);
    setActiveChatProfessionalId(id);
    navigateTo('chat');
  };

  const handleBooking = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    selectProfessionalById(id);
    navigateTo('booking');
  };

  return (
    <div className="bg-slate-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb & Title */}
        <div className="mb-6">
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
            <button onClick={() => navigateTo('home')} className="hover:text-[#0052FF]">
              Início
            </button>
            <span>/</span>
            <span className="text-slate-800 font-semibold">{selectedCategory.name}</span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                {selectedCategory.name}
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                {selectedCategory.subtitle} — {filteredPros.length} profissionais disponíveis
              </p>
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 text-xs">
              <span className="text-slate-500 font-medium">Ordenar por:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-3 py-2 bg-white border border-slate-200 rounded-xl font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0052FF] cursor-pointer"
              >
                <option value="rating">Melhor Avaliados</option>
                <option value="price">Menor Preço</option>
                <option value="distance">Mais Próximos</option>
              </select>
            </div>
          </div>
        </div>

        {/* 2-Column Desktop Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Column: Filter Sidebar (Sticky) */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-6 sticky top-24">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                  <Filter className="w-4 h-4 text-[#0052FF]" />
                  <span>Filtros de Busca</span>
                </div>
                <button
                  onClick={() => {
                    setMaxDistanceFilter(15);
                    setMaxPriceFilter(200);
                    setMinRatingFilter(4.0);
                  }}
                  className="text-xs text-[#0052FF] hover:underline font-semibold cursor-pointer"
                >
                  Limpar
                </button>
              </div>

              {/* Categorias Selector */}
              <div>
                <label className="text-xs font-bold text-slate-900 uppercase tracking-wider block mb-2.5">
                  Categorias
                </label>
                <div className="space-y-1">
                  {categories.map((c) => {
                    const isSelected = selectedCategory.id === c.id;
                    return (
                      <button
                        key={c.id}
                        onClick={() => selectCategoryById(c.id)}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#0052FF] text-white shadow-xs'
                            : 'text-slate-600 hover:bg-slate-100'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <CategoryIcon name={c.iconName} className="w-4 h-4" />
                          <span>{c.name}</span>
                        </div>
                        {isSelected && <Check className="w-3.5 h-3.5" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Distância Máxima */}
              <div>
                <div className="flex justify-between text-xs font-bold text-slate-800 mb-1.5">
                  <span>Raio de Distância</span>
                  <span className="text-[#0052FF]">{maxDistanceFilter} km</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="25"
                  value={maxDistanceFilter}
                  onChange={(e) => setMaxDistanceFilter(Number(e.target.value))}
                  className="w-full accent-[#0052FF] cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                  <span>1 km</span>
                  <span>15 km</span>
                  <span>25 km</span>
                </div>
              </div>

              {/* Preço Máximo */}
              <div>
                <div className="flex justify-between text-xs font-bold text-slate-800 mb-1.5">
                  <span>Preço Máximo</span>
                  <span className="text-[#0052FF]">R$ {maxPriceFilter},00</span>
                </div>
                <input
                  type="range"
                  min="40"
                  max="300"
                  step="10"
                  value={maxPriceFilter}
                  onChange={(e) => setMaxPriceFilter(Number(e.target.value))}
                  className="w-full accent-[#0052FF] cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                  <span>R$ 40</span>
                  <span>R$ 150</span>
                  <span>R$ 300</span>
                </div>
              </div>

              {/* Avaliação Mínima */}
              <div>
                <label className="text-xs font-bold text-slate-900 uppercase tracking-wider block mb-2">
                  Avaliação Mínima
                </label>
                <div className="grid grid-cols-3 gap-1.5">
                  {[4.0, 4.7, 4.9].map((star) => (
                    <button
                      key={star}
                      onClick={() => setMinRatingFilter(star)}
                      className={`py-2 px-2 rounded-xl text-xs font-bold border transition-colors flex items-center justify-center gap-1 cursor-pointer ${
                        minRatingFilter === star
                          ? 'border-[#0052FF] bg-blue-50 text-[#0052FF]'
                          : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                      <span>{star}+</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Safe guarantee */}
              <div className="p-3 bg-blue-50 rounded-2xl border border-blue-100 flex items-center gap-2.5 text-xs text-blue-900">
                <ShieldCheck className="w-5 h-5 text-[#0052FF] flex-shrink-0" />
                <span className="text-[11px] leading-tight font-medium">
                  Todos os profissionais passam por verificação de documentos.
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Search Results */}
          <div className="lg:col-span-3 space-y-4">
            {/* Subcategory Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
              {selectedCategory.subcategories.map((sub) => {
                const isActive = activeSubcategory === sub;
                return (
                  <button
                    key={sub}
                    onClick={() => setActiveSubcategory(sub)}
                    className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                      isActive
                        ? 'bg-[#0052FF] text-white shadow-sm'
                        : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    {sub}
                  </button>
                );
              })}
            </div>

            {/* Professionals List (Desktop horizontal cards) */}
            <div className="space-y-4">
              {filteredPros.map((prof) => (
                <div
                  key={prof.id}
                  onClick={() => handleCardClick(prof.id)}
                  className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs hover:shadow-lg hover:border-blue-200 transition-all cursor-pointer flex flex-col md:flex-row items-center justify-between gap-6 group"
                >
                  {/* Left: Avatar + Details */}
                  <div className="flex items-start gap-4 flex-1">
                    <div className="relative flex-shrink-0">
                      <img
                        src={prof.avatar}
                        alt={prof.name}
                        className="w-18 h-18 rounded-2xl object-cover ring-2 ring-slate-100 group-hover:ring-[#0052FF]/30 transition-all"
                      />
                      {prof.verified && (
                        <span className="absolute -bottom-1 -right-1 w-5 h-5 bg-[#0052FF] text-white rounded-full flex items-center justify-center text-[10px] font-bold ring-2 ring-white">
                          ✓
                        </span>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="text-base font-extrabold text-slate-900 group-hover:text-[#0052FF] transition-colors">
                          {prof.name}
                        </h3>
                        <span className="text-xs text-slate-400">•</span>
                        <span className="text-xs font-semibold text-slate-600">{prof.title}</span>
                      </div>

                      <div className="flex items-center gap-3 mt-1 text-xs text-slate-600">
                        <div className="flex items-center gap-1 font-bold text-amber-600">
                          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                          <span>{prof.rating.toFixed(1)}</span>
                          <span className="text-slate-400 font-normal">({prof.reviewsCount} avaliações)</span>
                        </div>
                        <span className="text-slate-300">•</span>
                        <div className="flex items-center gap-1 text-slate-500">
                          <MapPin className="w-3.5 h-3.5 text-slate-400" />
                          <span>A {prof.distanceKm} km da sua localização</span>
                        </div>
                      </div>

                      <p className="mt-2 text-xs text-slate-600 line-clamp-2 max-w-xl">
                        {prof.bio}
                      </p>

                      <div className="flex items-center gap-2 mt-3 text-[11px] text-slate-500">
                        <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">
                          {prof.experienceYears} anos de experiência
                        </span>
                        <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 font-medium">
                          Aceita PIX e Cartão
                        </span>
                        <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">
                          {prof.availableDays}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Right: Price & CTAs */}
                  <div className="flex md:flex-col items-center md:items-end justify-between w-full md:w-auto pt-4 md:pt-0 border-t md:border-t-0 border-slate-100 gap-3 flex-shrink-0">
                    <div className="text-left md:text-right">
                      <span className="text-[10px] text-slate-400 block font-medium">Valor médio</span>
                      <div className="text-xl font-black text-[#0052FF]">
                        R$ {prof.price.toFixed(2).replace('.', ',')}
                      </div>
                      <span className="text-[11px] text-slate-400">{prof.priceUnit}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={(e) => handleChat(prof.id, e)}
                        className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer"
                        title="Conversar no Chat"
                      >
                        <MessageSquare className="w-4 h-4 text-slate-600" />
                        <span>Chat</span>
                      </button>

                      <button
                        onClick={(e) => handleBooking(prof.id, e)}
                        className="px-5 py-2 rounded-xl bg-[#0052FF] text-white text-xs font-bold hover:bg-blue-600 transition-colors shadow-xs cursor-pointer flex items-center gap-1"
                      >
                        <span>Contratar</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {filteredPros.length === 0 && (
                <div className="bg-white rounded-3xl p-12 text-center border border-slate-200">
                  <p className="text-base font-bold text-slate-700">Nenhum profissional encontrado.</p>
                  <p className="text-xs text-slate-400 mt-1">
                    Tente aumentar o raio de distância ou diminuir os filtros.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
