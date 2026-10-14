import React from 'react';
import { useApp } from '../context/AppContext';
import { StatusBar, Header } from '../components/Header';
import { BottomNav } from '../components/BottomNav';
import { CategoryIcon } from '../components/CategoryIcon';
import { Search, ChevronRight, ArrowRight, Star, MapPin } from 'lucide-react';

export const HomeScreen: React.FC = () => {
  const {
    categories,
    professionals,
    navigateTo,
    selectCategoryById,
    selectProfessionalById,
    globalSearchQuery,
    setGlobalSearchQuery
  } = useApp();

  const handleCategoryClick = (catId: string) => {
    selectCategoryById(catId);
    navigateTo('category_listings');
  };

  const handleProfessionalClick = (profId: string) => {
    selectProfessionalById(profId);
    navigateTo('professional_profile');
  };

  return (
    <div className="flex flex-col h-full bg-[#F8FAFC] select-none">
      <StatusBar />
      <Header />

      {/* Scrollable Feed */}
      <div className="flex-1 overflow-y-auto pb-4 space-y-4">
        {/* Search Input Bar */}
        <div className="px-5 pt-3">
          <div className="relative flex items-center">
            <Search className="absolute left-3.5 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Buscar serviços ou profissionais..."
              value={globalSearchQuery}
              onChange={(e) => setGlobalSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  navigateTo('category_listings');
                }
              }}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-100/90 border border-slate-200/70 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0052FF]/20 focus:bg-white transition-all shadow-xs"
            />
          </div>
        </div>

        {/* Hero Promo Banner (Exact matching Screen 3) */}
        <div className="px-5">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#0052FF] to-[#0A66FE] text-white p-5 shadow-md shadow-blue-500/15">
            {/* Background pattern */}
            <div className="absolute -right-6 -bottom-6 w-36 h-36 bg-white/10 rounded-full blur-xl" />

            <div className="relative z-10 max-w-[62%]">
              <h2 className="text-base font-extrabold leading-snug">
                Precisa de um serviço?
              </h2>
              <p className="mt-1 text-xs text-blue-100 leading-tight">
                Encontre profissionais perto de você.
              </p>

              <button
                onClick={() => navigateTo('categories')}
                className="mt-3.5 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white text-[#0052FF] text-xs font-bold hover:bg-blue-50 active:scale-95 transition-all shadow-xs"
              >
                <span>Buscar agora</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Worker Hero Image right aligned */}
            <div className="absolute right-2 -bottom-2 w-28 h-32 flex items-end justify-center pointer-events-none">
              <img
                src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80"
                alt="Profissional OBBI"
                className="w-24 h-28 object-cover rounded-xl shadow-lg ring-2 ring-white/30"
              />
            </div>
          </div>
        </div>

        {/* Categorias em destaque */}
        <div className="px-5">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-bold text-slate-900">Categorias em destaque</h3>
            <button
              onClick={() => navigateTo('categories')}
              className="text-xs font-semibold text-[#0052FF] hover:underline flex items-center gap-0.5"
            >
              <span>Ver todas</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* 8 Category Icons Grid (matching Screen 3 layout) */}
          <div className="grid grid-cols-4 gap-3">
            {categories.slice(0, 8).map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleCategoryClick(cat.id)}
                className="flex flex-col items-center group cursor-pointer active:scale-95 transition-transform"
              >
                <div
                  className={`w-13 h-13 rounded-2xl flex items-center justify-center shadow-xs transition-colors group-hover:scale-105 duration-200 ${cat.iconBgColor}`}
                >
                  <CategoryIcon name={cat.iconName} className="w-5 h-5" />
                </div>
                <span className="mt-1.5 text-[11px] font-medium text-slate-700 text-center line-clamp-1">
                  {cat.name.split(' ')[0]}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Serviços mais recentes */}
        <div className="px-5 pt-1">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-bold text-slate-900">Serviços mais recentes</h3>
            <button
              onClick={() => navigateTo('category_listings')}
              className="text-xs font-semibold text-[#0052FF] hover:underline flex items-center gap-0.5"
            >
              <span>Ver todos</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Horizontal scroll cards */}
          <div className="flex gap-3 overflow-x-auto pb-2 -mx-5 px-5 no-scrollbar">
            {professionals.map((prof) => (
              <div
                key={prof.id}
                onClick={() => handleProfessionalClick(prof.id)}
                className="min-w-[175px] max-w-[175px] bg-white rounded-xl p-2.5 border border-slate-100 shadow-xs hover:shadow-md transition-all cursor-pointer flex-shrink-0 group"
              >
                <div className="relative h-24 w-full rounded-lg overflow-hidden mb-2">
                  <img
                    src={prof.coverImage}
                    alt={prof.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-1.5 left-1.5 px-1.5 py-0.5 rounded-md bg-white/90 backdrop-blur-xs text-[10px] font-bold text-slate-800 flex items-center gap-1 shadow-xs">
                    <Star className="w-2.5 h-2.5 fill-amber-400 text-amber-400" />
                    <span>{prof.rating.toFixed(1)}</span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 mb-1">
                  <img
                    src={prof.avatar}
                    alt={prof.name}
                    className="w-5 h-5 rounded-full object-cover ring-1 ring-slate-100"
                  />
                  <h4 className="text-xs font-bold text-slate-800 truncate">{prof.name}</h4>
                </div>

                <p className="text-[11px] text-slate-500 truncate">{prof.title}</p>

                <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1 text-[10px] text-slate-400">
                    <MapPin className="w-2.5 h-2.5" />
                    <span>{prof.distanceKm} km</span>
                  </div>
                  <span className="font-extrabold text-[#0052FF] text-[11px]">
                    R$ {prof.price.toFixed(2).replace('.', ',')}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
};
