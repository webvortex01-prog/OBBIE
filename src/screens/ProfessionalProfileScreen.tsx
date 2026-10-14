import React from 'react';
import { useApp } from '../context/AppContext';
import { StatusBar, Header } from '../components/Header';
import {
  Star,
  MapPin,
  Calendar,
  CreditCard,
  Clock,
  MessageSquare,
  CheckCircle2,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';

export const ProfessionalProfileScreen: React.FC = () => {
  const {
    selectedProfessional,
    navigateTo,
    setActiveChatProfessionalId,
    showToast
  } = useApp();

  const handleStartBooking = () => {
    navigateTo('booking');
  };

  const handleOpenChat = () => {
    setActiveChatProfessionalId(selectedProfessional.id);
    navigateTo('chat');
  };

  return (
    <div className="relative flex flex-col h-full bg-white select-none">
      <StatusBar />
      <Header />

      {/* Main Scrollable View */}
      <div className="flex-1 overflow-y-auto pb-24">
        {/* Top Cover Image Area */}
        <div className="relative h-56 w-full bg-slate-200">
          <img
            src={selectedProfessional.coverImage}
            alt={selectedProfessional.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />
        </div>

        {/* Content Card overlapping cover (Screen 6 design) */}
        <div className="relative -mt-8 px-5">
          <div className="bg-white rounded-2xl p-5 shadow-lg border border-slate-100">
            {/* Avatar & Header */}
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3.5">
                <div className="relative">
                  <img
                    src={selectedProfessional.avatar}
                    alt={selectedProfessional.name}
                    className="w-16 h-16 rounded-full object-cover ring-4 ring-white shadow-md"
                  />
                  {selectedProfessional.verified && (
                    <span className="absolute bottom-0 right-0 w-4 h-4 bg-[#0052FF] text-white rounded-full flex items-center justify-center text-[9px] font-bold ring-2 ring-white">
                      ✓
                    </span>
                  )}
                </div>

                <div>
                  <h1 className="text-lg font-extrabold text-slate-900 leading-tight">
                    {selectedProfessional.name}
                  </h1>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">
                    {selectedProfessional.title}
                  </p>
                  <div className="flex items-center gap-2 mt-1 text-xs text-slate-600">
                    <span className="flex items-center gap-1 font-bold text-amber-600">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      {selectedProfessional.rating.toFixed(1)}
                    </span>
                    <span className="text-slate-400 text-[11px]">
                      ({selectedProfessional.reviewsCount} avaliações)
                    </span>
                    <span className="text-slate-300">•</span>
                    <span className="text-slate-500 flex items-center gap-0.5 text-[11px]">
                      <MapPin className="w-3 h-3 text-slate-400" />
                      {selectedProfessional.distanceKm} km
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Price Box */}
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-baseline justify-between">
              <div>
                <span className="text-2xl font-black text-[#0052FF]">
                  R$ {selectedProfessional.price.toFixed(2).replace('.', ',')}
                </span>
                <span className="text-xs text-slate-400 ml-1.5 font-medium">
                  {selectedProfessional.priceUnit}
                </span>
              </div>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-blue-50 text-[#0052FF] text-[11px] font-bold">
                <ShieldCheck className="w-3.5 h-3.5" />
                Preço Garantido
              </span>
            </div>

            {/* Description Bio (Exact text from screenshot) */}
            <div className="mt-4 pt-4 border-t border-slate-100">
              <p className="text-xs text-slate-600 leading-relaxed">
                {selectedProfessional.bio}
              </p>
            </div>

            {/* 3 Highlight Badges (Exact icons and text from Screen 6) */}
            <div className="grid grid-cols-3 gap-2.5 mt-5">
              <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100/80 text-center flex flex-col items-center justify-center">
                <Calendar className="w-4 h-4 text-blue-600 mb-1" />
                <span className="text-[10px] text-slate-400 font-medium">Experiência</span>
                <strong className="text-xs text-slate-800 font-bold mt-0.5">
                  {selectedProfessional.experienceYears} anos
                </strong>
              </div>

              <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100/80 text-center flex flex-col items-center justify-center">
                <CreditCard className="w-4 h-4 text-emerald-600 mb-1" />
                <span className="text-[10px] text-slate-400 font-medium">Aceita</span>
                <strong className="text-[11px] text-slate-800 font-bold mt-0.5 truncate max-w-full">
                  PIX e cartão
                </strong>
              </div>

              <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100/80 text-center flex flex-col items-center justify-center">
                <Clock className="w-4 h-4 text-indigo-600 mb-1" />
                <span className="text-[10px] text-slate-400 font-medium">Disponível</span>
                <strong className="text-[11px] text-slate-800 font-bold mt-0.5">
                  {selectedProfessional.availableDays}
                </strong>
              </div>
            </div>
          </div>

          {/* Avaliações Section (Exact from Screen 6) */}
          <div className="mt-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-slate-900">Avaliações</h3>
              <button
                onClick={() => showToast('Visualizando todas as avaliações')}
                className="text-xs font-semibold text-[#0052FF] hover:underline flex items-center gap-0.5"
              >
                <span>Ver todas</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Mariana Costa Review Card */}
            {selectedProfessional.reviews.length > 0 ? (
              selectedProfessional.reviews.map((rev) => (
                <div
                  key={rev.id}
                  className="bg-white rounded-xl p-3.5 border border-slate-100 shadow-xs mb-2.5"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <img
                        src={rev.authorAvatar}
                        alt={rev.authorName}
                        className="w-7 h-7 rounded-full object-cover"
                      />
                      <div>
                        <h4 className="text-xs font-bold text-slate-800">{rev.authorName}</h4>
                        <span className="text-[10px] text-slate-400">{rev.date}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-xs font-bold text-amber-500">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                      <span>{rev.rating.toFixed(1)}</span>
                    </div>
                  </div>
                  <p className="mt-2 text-xs text-slate-600 leading-relaxed">{rev.comment}</p>
                </div>
              ))
            ) : (
              <div className="bg-slate-50 rounded-xl p-4 text-center text-xs text-slate-500">
                Nenhuma avaliação recente para este profissional.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Floating Bottom Bar with "Contratar serviço" (Screen 6 CTA) */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-white/95 backdrop-blur-md border-t border-slate-100 flex items-center gap-3 z-30">
        <button
          onClick={handleOpenChat}
          className="flex items-center justify-center w-12 h-12 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 active:scale-95 transition-all"
          aria-label="Abrir conversa"
        >
          <MessageSquare className="w-5 h-5 text-slate-700" />
        </button>

        <button
          onClick={handleStartBooking}
          className="flex-1 py-3.5 px-6 rounded-xl bg-[#0052FF] text-white font-bold text-sm shadow-md shadow-blue-500/25 hover:bg-blue-600 active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <span>Contratar serviço</span>
        </button>
      </div>
    </div>
  );
};
