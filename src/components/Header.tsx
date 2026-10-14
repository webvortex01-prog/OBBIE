import React from 'react';
import { useApp } from '../context/AppContext';
import { ObbiLogo } from './ObbiLogo';
import {
  Bell,
  ArrowLeft,
  SlidersHorizontal,
  Share2,
  Heart,
  Phone,
  Video,
  Settings,
  Wifi,
  BatteryMedium
} from 'lucide-react';

interface HeaderProps {
  title?: string;
  showBack?: boolean;
  onBack?: () => void;
  rightAction?: React.ReactNode;
}

export const StatusBar: React.FC = () => {
  return (
    <div className="flex items-center justify-between px-6 pt-2 pb-1 text-xs font-semibold text-slate-800 select-none">
      <span>9:41</span>
      <div className="flex items-center gap-2">
        {/* Cell signal icon */}
        <div className="flex items-end gap-0.5 h-3">
          <span className="w-0.5 h-1.5 bg-slate-800 rounded-xs"></span>
          <span className="w-0.5 h-2 bg-slate-800 rounded-xs"></span>
          <span className="w-0.5 h-2.5 bg-slate-800 rounded-xs"></span>
          <span className="w-0.5 h-3 bg-slate-800 rounded-xs"></span>
        </div>
        <Wifi className="w-3.5 h-3.5" />
        <BatteryMedium className="w-4 h-4" />
      </div>
    </div>
  );
};

export const Header: React.FC<HeaderProps> = ({
  title,
  showBack,
  onBack,
  rightAction
}) => {
  const {
    currentScreen,
    goBack,
    toggleDrawer,
    currentUser,
    navigateTo,
    selectedProfessional,
    isFavorite,
    toggleFavorite,
    showToast,
    openCallModal,
    setFilterModalOpen
  } = useApp();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      goBack();
    }
  };

  // Special case: Professional profile has custom floating header over cover image
  if (currentScreen === 'professional_profile') {
    return (
      <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between p-4 pt-10">
        <button
          onClick={handleBack}
          aria-label="Voltar"
          className="flex items-center justify-center w-10 h-10 rounded-full bg-white/90 backdrop-blur-md shadow-md text-slate-700 hover:bg-white transition-transform active:scale-95"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              if (navigator.clipboard) {
                navigator.clipboard.writeText(window.location.href);
              }
              showToast('Link do perfil copiado!');
            }}
            aria-label="Compartilhar"
            className="flex items-center justify-center w-10 h-10 rounded-full bg-white/90 backdrop-blur-md shadow-md text-slate-700 hover:bg-white transition-transform active:scale-95"
          >
            <Share2 className="w-4 h-4" />
          </button>

          <button
            onClick={() => toggleFavorite(selectedProfessional.id)}
            aria-label="Favoritar"
            className="flex items-center justify-center w-10 h-10 rounded-full bg-white/90 backdrop-blur-md shadow-md transition-transform active:scale-95"
          >
            <Heart
              className={`w-5 h-5 ${
                isFavorite(selectedProfessional.id)
                  ? 'fill-red-500 text-red-500'
                  : 'text-slate-700'
              }`}
            />
          </button>
        </div>
      </div>
    );
  }

  // Home Screen Header
  if (currentScreen === 'home') {
    return (
      <div className="px-5 pt-3 pb-2 flex items-center justify-between bg-white border-b border-slate-100">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigateTo('home')}>
          <ObbiLogo size="sm" />
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => navigateTo('notifications')}
            className="relative p-2 rounded-full text-slate-600 hover:bg-slate-100 transition-colors"
            aria-label="Notificações"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white"></span>
          </button>

          <button
            onClick={toggleDrawer}
            className="relative flex items-center rounded-full p-0.5 ring-2 ring-blue-500/30 hover:ring-blue-500 transition-all active:scale-95"
            aria-label="Menu do Usuário"
          >
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-8 h-8 rounded-full object-cover"
            />
          </button>
        </div>
      </div>
    );
  }

  // Chat Screen Header
  if (currentScreen === 'chat') {
    return (
      <div className="px-4 py-2.5 flex items-center justify-between bg-white border-b border-slate-100">
        <div className="flex items-center gap-3 min-w-0">
          <button
            onClick={handleBack}
            className="p-1 rounded-full text-slate-700 hover:bg-slate-100 active:scale-95"
            aria-label="Voltar"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          <div
            className="flex items-center gap-2.5 cursor-pointer truncate"
            onClick={() => navigateTo('professional_profile')}
          >
            <div className="relative flex-shrink-0">
              <img
                src={selectedProfessional.avatar}
                alt={selectedProfessional.name}
                className="w-9 h-9 rounded-full object-cover ring-1 ring-slate-200"
              />
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-white rounded-full"></span>
            </div>
            <div className="min-w-0">
              <h3 className="text-sm font-bold text-slate-900 truncate">
                {selectedProfessional.name}
              </h3>
              <p className="text-[11px] text-emerald-600 font-medium">Online agora</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={() => openCallModal('voice')}
            className="p-2 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors active:scale-95"
            aria-label="Chamada de voz"
          >
            <Phone className="w-4 h-4" />
          </button>
          <button
            onClick={() => openCallModal('video')}
            className="p-2 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors active:scale-95"
            aria-label="Chamada de vídeo"
          >
            <Video className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  // Worker Profile Header
  if (currentScreen === 'worker_profile') {
    return (
      <div className="px-5 py-3 flex items-center justify-between bg-white border-b border-slate-100">
        <div className="flex items-center gap-2">
          {showBack && (
            <button
              onClick={handleBack}
              className="p-1 text-slate-700 hover:bg-slate-100 rounded-full mr-1"
              aria-label="Voltar"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
          )}
          <span className="font-bold text-slate-800 text-base">Perfil do Profissional</span>
        </div>
        <button
          onClick={() => navigateTo('notifications')}
          className="p-2 text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
          aria-label="Configurações"
        >
          <Settings className="w-5 h-5" />
        </button>
      </div>
    );
  }

  // Standard Header for Categories, Category Listings, Booking, Orders, etc.
  return (
    <div className="px-5 py-3 flex items-center justify-between bg-white border-b border-slate-100">
      <div className="flex items-center gap-3 min-w-0">
        <button
          onClick={handleBack}
          className="p-1 text-slate-700 hover:bg-slate-100 rounded-full active:scale-95"
          aria-label="Voltar"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-base font-bold text-slate-900 truncate">
          {title || 'OBBI'}
        </h1>
      </div>

      <div>
        {rightAction || (
          currentScreen === 'category_listings' ? (
            <button
              onClick={() => setFilterModalOpen(true)}
              className="p-2 text-slate-700 hover:bg-slate-100 rounded-full active:scale-95"
              aria-label="Filtros"
            >
              <SlidersHorizontal className="w-5 h-5" />
            </button>
          ) : null
        )}
      </div>
    </div>
  );
};
