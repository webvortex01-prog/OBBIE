import React from 'react';
import { useApp } from '../context/AppContext';
import { Star, MapPin, Heart, ChevronRight, MessageSquare, Calendar } from 'lucide-react';

export const WebFavoritesView: React.FC = () => {
  const {
    favorites,
    professionals,
    toggleFavorite,
    selectProfessionalById,
    navigateTo,
    setActiveChatProfessionalId
  } = useApp();

  const favoritePros = professionals.filter((p) => favorites.includes(p.id));

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

  const handleBook = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    selectProfessionalById(id);
    navigateTo('booking');
  };

  return (
    <div className="bg-slate-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Meus Profissionais Favoritos
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Profissionais salvos para contratação rápida e contato direto
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favoritePros.map((prof) => (
            <div
              key={prof.id}
              onClick={() => handleCardClick(prof.id)}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-xs hover:shadow-lg transition-all cursor-pointer relative group flex flex-col justify-between"
            >
              <div>
                <div className="relative h-36 w-full bg-slate-100">
                  <img
                    src={prof.coverImage}
                    alt={prof.name}
                    className="w-full h-full object-cover"
                  />
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(prof.id);
                    }}
                    className="absolute top-3 right-3 p-2 rounded-full bg-white/90 backdrop-blur-xs text-red-500 hover:scale-110 transition-transform shadow-xs"
                    title="Remover dos favoritos"
                  >
                    <Heart className="w-4 h-4 fill-red-500" />
                  </button>
                </div>

                <div className="p-5">
                  <div className="flex items-start gap-3.5 -mt-10 mb-2">
                    <img
                      src={prof.avatar}
                      alt={prof.name}
                      className="w-14 h-14 rounded-2xl object-cover ring-4 ring-white shadow-md"
                    />
                    <div>
                      <h3 className="text-sm font-bold text-slate-900 group-hover:text-[#0052FF] transition-colors">
                        {prof.name}
                      </h3>
                      <p className="text-xs text-slate-500 font-medium">{prof.title}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-slate-600 mt-2">
                    <div className="flex items-center gap-1 font-bold text-amber-600">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span>{prof.rating.toFixed(1)}</span>
                    </div>
                    <span className="text-slate-300">•</span>
                    <span className="text-slate-500">A {prof.distanceKm} km</span>
                  </div>

                  <p className="mt-2 text-xs text-slate-600 line-clamp-2">{prof.bio}</p>
                </div>
              </div>

              <div className="p-5 pt-3 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 block font-medium">Diária a partir de</span>
                  <span className="text-sm font-black text-[#0052FF]">
                    R$ {prof.price.toFixed(2).replace('.', ',')}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => handleChat(prof.id, e)}
                    className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                  >
                    <MessageSquare className="w-4 h-4" />
                  </button>
                  <button
                    onClick={(e) => handleBook(prof.id, e)}
                    className="px-3.5 py-2 rounded-xl bg-[#0052FF] text-white text-xs font-bold hover:bg-blue-600 transition-colors shadow-xs"
                  >
                    Contratar
                  </button>
                </div>
              </div>
            </div>
          ))}

          {favoritePros.length === 0 && (
            <div className="col-span-full bg-white rounded-3xl p-16 text-center border border-slate-200 space-y-3">
              <Heart className="w-12 h-12 mx-auto text-slate-300" />
              <h3 className="text-base font-bold text-slate-700">Você ainda não favoritou nenhum profissional</h3>
              <p className="text-xs text-slate-400">
                Clique no ícone de coração nos perfis para salvá-los aqui.
              </p>
              <button
                onClick={() => navigateTo('category_listings')}
                className="mt-2 px-5 py-2.5 rounded-xl bg-[#0052FF] text-white text-xs font-bold hover:bg-blue-600 transition-colors"
              >
                Explorar Profissionais
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
