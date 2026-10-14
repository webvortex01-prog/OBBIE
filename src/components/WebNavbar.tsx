import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ObbiLogo } from './ObbiLogo';
import {
  Search,
  MessageSquare,
  CalendarCheck,
  Wallet,
  Heart,
  Plus,
  UserCheck,
  Menu,
  X,
  ChevronDown,
  Bell,
  LogOut,
  ShieldCheck,
  SlidersHorizontal,
  Briefcase
} from 'lucide-react';

export const WebNavbar: React.FC = () => {
  const {
    currentScreen,
    navigateTo,
    currentUser,
    userRole,
    toggleUserRole,
    bookings,
    chatMessages,
    favorites,
    setPublishModalOpen,
    globalSearchQuery,
    setGlobalSearchQuery
  } = useApp();

  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const activeBookingsCount = bookings.filter(
    (b) => b.status === 'confirmado' || b.status === 'em_andamento'
  ).length;

  const totalChatMessages = Object.values(chatMessages).flat().length;

  const handleNavClick = (screen: any) => {
    navigateTo(screen);
    setMobileMenuOpen(false);
    setUserDropdownOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200/90 shadow-2xs">
      {/* Top micro announcement bar */}
      <div className="bg-[#0052FF] text-white text-[11px] font-medium py-1 px-4 text-center hidden sm:flex items-center justify-center gap-3">
        <span className="flex items-center gap-1.5 font-bold">
          <ShieldCheck className="w-3.5 h-3.5 text-blue-200" />
          Garantia OBBI Protege:
        </span>
        <span>Seu pagamento fica seguro até a entrega e aprovação do serviço.</span>
        <button
          onClick={toggleUserRole}
          className="ml-3 underline font-bold hover:text-blue-100 cursor-pointer"
        >
          {userRole === 'client' ? 'Quero trabalhar no OBBI' : 'Modo Contratante'}
        </button>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-6">
        {/* Left: Brand Logo */}
        <div
          className="flex items-center gap-3 cursor-pointer shrink-0"
          onClick={() => handleNavClick('home')}
        >
          <ObbiLogo size="md" />
        </div>

        {/* Center: Search Bar (Desktop) */}
        <div className="hidden lg:flex flex-1 max-w-md mx-4">
          <div className="relative w-full">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Buscar faxina, encanador, eletricista..."
              value={globalSearchQuery}
              onChange={(e) => setGlobalSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  navigateTo('category_listings');
                }
              }}
              className="w-full pl-10 pr-24 py-2 rounded-xl bg-slate-100/80 border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0052FF]/20 focus:bg-white transition-all"
            />
            <button
              onClick={() => navigateTo('category_listings')}
              className="absolute right-1.5 top-1/2 -translate-y-1/2 px-3 py-1 bg-[#0052FF] text-white text-[11px] font-bold rounded-lg hover:bg-blue-600 transition-colors cursor-pointer"
            >
              Buscar
            </button>
          </div>
        </div>

        {/* Center-Right: Navigation Links */}
        <nav className="hidden md:flex items-center gap-1.5 lg:gap-3 text-xs font-semibold text-slate-600">
          <button
            onClick={() => handleNavClick('home')}
            className={`px-3 py-2 rounded-lg transition-colors cursor-pointer ${
              currentScreen === 'home'
                ? 'text-[#0052FF] bg-blue-50/70 font-bold'
                : 'hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            Início
          </button>

          <button
            onClick={() => handleNavClick('category_listings')}
            className={`px-3 py-2 rounded-lg transition-colors cursor-pointer ${
              currentScreen === 'category_listings' || currentScreen === 'categories'
                ? 'text-[#0052FF] bg-blue-50/70 font-bold'
                : 'hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            Serviços & Categorias
          </button>

          <button
            onClick={() => handleNavClick('orders')}
            className={`px-3 py-2 rounded-lg transition-colors relative cursor-pointer ${
              currentScreen === 'orders'
                ? 'text-[#0052FF] bg-blue-50/70 font-bold'
                : 'hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <span>Meus Pedidos</span>
            {activeBookingsCount > 0 && (
              <span className="ml-1.5 px-1.5 py-0.2 rounded-full bg-[#0052FF] text-white text-[10px] font-black">
                {activeBookingsCount}
              </span>
            )}
          </button>

          <button
            onClick={() => handleNavClick('chat')}
            className={`px-3 py-2 rounded-lg transition-colors relative cursor-pointer ${
              currentScreen === 'chat'
                ? 'text-[#0052FF] bg-blue-50/70 font-bold'
                : 'hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <span>Mensagens</span>
            {totalChatMessages > 0 && (
              <span className="ml-1.5 px-1.5 py-0.2 rounded-full bg-emerald-500 text-white text-[10px] font-black">
                {totalChatMessages}
              </span>
            )}
          </button>

          <button
            onClick={() => handleNavClick('wallet')}
            className={`px-3 py-2 rounded-lg transition-colors flex items-center gap-1 cursor-pointer ${
              currentScreen === 'wallet'
                ? 'text-[#0052FF] bg-blue-50/70 font-bold'
                : 'hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Wallet className="w-3.5 h-3.5 text-slate-400" />
            <span>R$ {currentUser.balance.toFixed(2).replace('.', ',')}</span>
          </button>
        </nav>

        {/* Right: CTA Button & User Profile */}
        <div className="flex items-center gap-3">
          {/* Action CTA Button */}
          <button
            onClick={() => setPublishModalOpen(true)}
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#0052FF] text-white text-xs font-bold hover:bg-blue-600 active:scale-95 transition-all shadow-xs cursor-pointer"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            <span>{userRole === 'client' ? 'Pedir Orçamento' : 'Anunciar Serviço'}</span>
          </button>

          {/* User Profile dropdown trigger */}
          <div className="relative">
            <button
              onClick={() => setUserDropdownOpen((p) => !p)}
              className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-slate-100 border border-transparent hover:border-slate-200 transition-all cursor-pointer"
            >
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-8 h-8 rounded-full object-cover ring-2 ring-blue-500/20"
              />
              <div className="hidden xl:block text-left text-xs">
                <span className="font-bold text-slate-800 block leading-tight">{currentUser.name}</span>
                <span className="text-[10px] text-slate-500 capitalize">{userRole === 'client' ? 'Cliente' : 'Trabalhador'}</span>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden sm:block" />
            </button>

            {/* Dropdown Menu */}
            {userDropdownOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-slate-100 p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="p-3 border-b border-slate-100 flex items-center gap-3">
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    className="w-10 h-10 rounded-full object-cover ring-2 ring-[#0052FF]"
                  />
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">{currentUser.name}</h4>
                    <span className="text-[11px] text-slate-400">{currentUser.email}</span>
                  </div>
                </div>

                <div className="py-2 space-y-1 text-xs">
                  <button
                    onClick={() => handleNavClick('worker_profile')}
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-slate-700 hover:bg-slate-50 hover:text-[#0052FF] text-left cursor-pointer"
                  >
                    <Briefcase className="w-4 h-4 text-slate-400" />
                    <span>Perfil do Trabalhador (Carlos)</span>
                  </button>

                  <button
                    onClick={() => handleNavClick('orders')}
                    className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-slate-700 hover:bg-slate-50 hover:text-[#0052FF] text-left cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5">
                      <CalendarCheck className="w-4 h-4 text-slate-400" />
                      <span>Meus Pedidos</span>
                    </div>
                    {activeBookingsCount > 0 && (
                      <span className="px-2 py-0.5 rounded-full bg-[#0052FF] text-white text-[10px] font-bold">
                        {activeBookingsCount}
                      </span>
                    )}
                  </button>

                  <button
                    onClick={() => handleNavClick('favorites')}
                    className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-slate-700 hover:bg-slate-50 hover:text-[#0052FF] text-left cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5">
                      <Heart className="w-4 h-4 text-slate-400" />
                      <span>Favoritos</span>
                    </div>
                    {favorites.length > 0 && (
                      <span className="text-slate-400 text-xs font-bold">{favorites.length}</span>
                    )}
                  </button>

                  <button
                    onClick={() => handleNavClick('wallet')}
                    className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-slate-700 hover:bg-slate-50 hover:text-[#0052FF] text-left cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5">
                      <Wallet className="w-4 h-4 text-slate-400" />
                      <span>Carteira Digital</span>
                    </div>
                    <span className="font-bold text-emerald-600 text-xs">
                      R$ {currentUser.balance.toFixed(2).replace('.', ',')}
                    </span>
                  </button>

                  <div className="pt-2 border-t border-slate-100">
                    <button
                      onClick={toggleUserRole}
                      className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-slate-700 hover:bg-blue-50 hover:text-[#0052FF] text-left cursor-pointer"
                    >
                      <UserCheck className="w-4 h-4 text-blue-500" />
                      <span>Alternar para {userRole === 'client' ? 'Trabalhador' : 'Cliente'}</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Mobile menu hamburger button */}
          <button
            onClick={() => setMobileMenuOpen((p) => !p)}
            className="md:hidden p-2 rounded-xl text-slate-700 hover:bg-slate-100"
            aria-label="Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-3">
          <div className="relative w-full">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Buscar serviços..."
              value={globalSearchQuery}
              onChange={(e) => setGlobalSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-100 border border-slate-200 text-xs"
            />
          </div>

          <div className="flex flex-col space-y-1 text-sm font-semibold text-slate-700">
            <button
              onClick={() => handleNavClick('home')}
              className="px-3 py-2.5 rounded-xl hover:bg-slate-100 text-left"
            >
              Início
            </button>
            <button
              onClick={() => handleNavClick('category_listings')}
              className="px-3 py-2.5 rounded-xl hover:bg-slate-100 text-left"
            >
              Serviços & Categorias
            </button>
            <button
              onClick={() => handleNavClick('orders')}
              className="px-3 py-2.5 rounded-xl hover:bg-slate-100 text-left flex justify-between"
            >
              <span>Meus Pedidos</span>
              {activeBookingsCount > 0 && (
                <span className="px-2 py-0.5 rounded-full bg-[#0052FF] text-white text-xs">
                  {activeBookingsCount}
                </span>
              )}
            </button>
            <button
              onClick={() => handleNavClick('chat')}
              className="px-3 py-2.5 rounded-xl hover:bg-slate-100 text-left flex justify-between"
            >
              <span>Mensagens</span>
              {totalChatMessages > 0 && (
                <span className="px-2 py-0.5 rounded-full bg-emerald-500 text-white text-xs">
                  {totalChatMessages}
                </span>
              )}
            </button>
            <button
              onClick={() => handleNavClick('wallet')}
              className="px-3 py-2.5 rounded-xl hover:bg-slate-100 text-left flex justify-between"
            >
              <span>Carteira</span>
              <span className="text-emerald-600 font-bold">
                R$ {currentUser.balance.toFixed(2).replace('.', ',')}
              </span>
            </button>
            <button
              onClick={() => {
                setPublishModalOpen(true);
                setMobileMenuOpen(false);
              }}
              className="w-full mt-2 py-3 rounded-xl bg-[#0052FF] text-white font-bold text-center"
            >
              + Pedir Orçamento / Anunciar
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
