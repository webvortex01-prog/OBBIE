import React from 'react';
import { useApp } from '../context/AppContext';
import { StatusBar, Header } from '../components/Header';
import { BottomNav } from '../components/BottomNav';
import { Star, MapPin, Heart, ChevronRight } from 'lucide-react';

export const FavoritesScreen: React.FC = () => {
  const {
    favorites,
    professionals,
    toggleFavorite,
    selectProfessionalById,
    navigateTo
  } = useApp();

  const favoriteProfessionals = professionals.filter((p) => favorites.includes(p.id));

  const handleCardClick = (id: string) => {
    selectProfessionalById(id);
    navigateTo('professional_profile');
  };

  return (
    <div className="flex flex-col h-full bg-[#F8FAFC] select-none">
      <StatusBar />
      <Header title="Meus Favoritos" showBack={true} />

      <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
        {favoriteProfessionals.map((prof) => (
          <div
            key={prof.id}
            onClick={() => handleCardClick(prof.id)}
            className="bg-white rounded-2xl p-3.5 border border-slate-100 shadow-xs hover:shadow-md transition-all cursor-pointer relative"
          >
            <div className="flex items-start gap-3.5">
              <img
                src={prof.avatar}
                alt={prof.name}
                className="w-13 h-13 rounded-full object-cover ring-1 ring-slate-100"
              />

              <div className="flex-1 min-w-0 pr-8">
                <h3 className="text-sm font-bold text-slate-900 truncate">{prof.name}</h3>
                <p className="text-xs text-slate-500 mt-0.5">{prof.title}</p>

                <div className="flex items-center gap-2 mt-1.5 text-xs text-slate-600">
                  <div className="flex items-center gap-1 font-semibold text-amber-600">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>{prof.rating.toFixed(1)}</span>
                  </div>
                  <span className="text-slate-300">•</span>
                  <div className="flex items-center gap-1 text-slate-500 text-[11px]">
                    <MapPin className="w-3 h-3 text-slate-400" />
                    <span>A {prof.distanceKm} km</span>
                  </div>
                </div>

                <div className="mt-2 pt-2 border-t border-slate-50 flex items-center justify-between">
                  <span className="text-xs font-black text-[#0052FF]">
                    R$ {prof.price.toFixed(2).replace('.', ',')}
                  </span>
                  <span className="text-[10px] text-slate-400">{prof.priceUnit}</span>
                </div>
              </div>

              {/* Unfavorite button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFavorite(prof.id);
                }}
                className="absolute top-3.5 right-3.5 p-1.5 rounded-full hover:bg-slate-50 text-red-500"
                aria-label="Remover favorito"
              >
                <Heart className="w-5 h-5 fill-red-500" />
              </button>
            </div>
          </div>
        ))}

        {favoriteProfessionals.length === 0 && (
          <div className="text-center py-16 text-slate-400">
            <Heart className="w-10 h-10 mx-auto text-slate-300 mb-2" />
            <p className="text-xs">Nenhum profissional salvo nos favoritos ainda.</p>
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
};
