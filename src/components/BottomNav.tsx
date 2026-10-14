import React from 'react';
import { useApp } from '../context/AppContext';
import { Home, Briefcase, Plus, MessageSquare, User } from 'lucide-react';

export const BottomNav: React.FC = () => {
  const {
    currentScreen,
    navigateTo,
    setPublishModalOpen,
    chatMessages
  } = useApp();

  // Calculate unread chat messages
  const totalMessages = Object.values(chatMessages).flat().length;

  return (
    <div className="relative bg-white border-t border-slate-200/80 px-3 py-1.5 flex items-center justify-between select-none z-30">
      {/* 1. Início */}
      <button
        onClick={() => navigateTo('home')}
        className={`flex-1 flex flex-col items-center justify-center py-1 transition-colors ${
          currentScreen === 'home'
            ? 'text-[#0052FF]'
            : 'text-slate-400 hover:text-slate-600'
        }`}
      >
        <Home className="w-5 h-5 mb-0.5" strokeWidth={currentScreen === 'home' ? 2.5 : 1.8} />
        <span className={`text-[10px] ${currentScreen === 'home' ? 'font-bold' : 'font-medium'}`}>
          Início
        </span>
      </button>

      {/* 2. Serviços */}
      <button
        onClick={() => navigateTo('categories')}
        className={`flex-1 flex flex-col items-center justify-center py-1 transition-colors ${
          currentScreen === 'categories' || currentScreen === 'category_listings'
            ? 'text-[#0052FF]'
            : 'text-slate-400 hover:text-slate-600'
        }`}
      >
        <Briefcase
          className="w-5 h-5 mb-0.5"
          strokeWidth={currentScreen === 'categories' || currentScreen === 'category_listings' ? 2.5 : 1.8}
        />
        <span
          className={`text-[10px] ${
            currentScreen === 'categories' || currentScreen === 'category_listings'
              ? 'font-bold'
              : 'font-medium'
          }`}
        >
          Serviços
        </span>
      </button>

      {/* 3. Floating Action (+) Button in Center */}
      <div className="flex-1 flex justify-center -mt-5">
        <button
          onClick={() => setPublishModalOpen(true)}
          className="w-12 h-12 rounded-full bg-[#0052FF] text-white flex items-center justify-center shadow-lg shadow-blue-500/30 hover:bg-blue-600 active:scale-95 transition-all focus:outline-none"
          aria-label="Publicar ou Solicitar Serviço"
        >
          <Plus className="w-6 h-6 stroke-[3]" />
        </button>
      </div>

      {/* 4. Conversas */}
      <button
        onClick={() => navigateTo('chat')}
        className={`flex-1 flex flex-col items-center justify-center py-1 relative transition-colors ${
          currentScreen === 'chat'
            ? 'text-[#0052FF]'
            : 'text-slate-400 hover:text-slate-600'
        }`}
      >
        <div className="relative">
          <MessageSquare
            className="w-5 h-5 mb-0.5"
            strokeWidth={currentScreen === 'chat' ? 2.5 : 1.8}
          />
          {totalMessages > 0 && (
            <span className="absolute -top-1 -right-1.5 w-2 h-2 bg-[#0052FF] rounded-full ring-2 ring-white"></span>
          )}
        </div>
        <span className={`text-[10px] ${currentScreen === 'chat' ? 'font-bold' : 'font-medium'}`}>
          Conversas
        </span>
      </button>

      {/* 5. Perfil */}
      <button
        onClick={() => navigateTo('worker_profile')}
        className={`flex-1 flex flex-col items-center justify-center py-1 transition-colors ${
          currentScreen === 'worker_profile'
            ? 'text-[#0052FF]'
            : 'text-slate-400 hover:text-slate-600'
        }`}
      >
        <User
          className="w-5 h-5 mb-0.5"
          strokeWidth={currentScreen === 'worker_profile' ? 2.5 : 1.8}
        />
        <span className={`text-[10px] ${currentScreen === 'worker_profile' ? 'font-bold' : 'font-medium'}`}>
          Perfil
        </span>
      </button>
    </div>
  );
};
