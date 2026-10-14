import React from 'react';
import { useApp } from '../context/AppContext';
import { ObbiLogo } from './ObbiLogo';
import {
  X,
  Home,
  CalendarCheck,
  MessageSquare,
  Heart,
  Wallet,
  Settings,
  HelpCircle,
  LogOut,
  UserCheck
} from 'lucide-react';

export const DrawerMenu: React.FC = () => {
  const {
    drawerOpen,
    setDrawerOpen,
    currentUser,
    navigateTo,
    bookings,
    favorites,
    userRole,
    toggleUserRole,
    showToast
  } = useApp();

  if (!drawerOpen) return null;

  const activeBookingsCount = bookings.filter((b) => b.status === 'confirmado' || b.status === 'em_andamento').length;

  const menuItems = [
    {
      id: 'home',
      label: 'Início',
      icon: Home,
      action: () => navigateTo('home')
    },
    {
      id: 'orders',
      label: 'Meus pedidos',
      icon: CalendarCheck,
      badge: activeBookingsCount > 0 ? activeBookingsCount : undefined,
      action: () => navigateTo('orders')
    },
    {
      id: 'chat',
      label: 'Minhas conversas',
      icon: MessageSquare,
      action: () => navigateTo('chat')
    },
    {
      id: 'favorites',
      label: 'Favoritos',
      icon: Heart,
      badge: favorites.length > 0 ? favorites.length : undefined,
      action: () => navigateTo('favorites')
    },
    {
      id: 'wallet',
      label: 'Carteira',
      icon: Wallet,
      action: () => navigateTo('wallet')
    },
    {
      id: 'settings',
      label: 'Configurações',
      icon: Settings,
      action: () => {
        showToast('Configurações do aplicativo abertas.');
        setDrawerOpen(false);
      }
    },
    {
      id: 'help',
      label: 'Ajuda',
      icon: HelpCircle,
      action: () => {
        showToast('Central de Ajuda OBBI: suporte@obbi.com.br');
        setDrawerOpen(false);
      }
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={() => setDrawerOpen(false)}
      />

      {/* Drawer content (Screen 10) */}
      <div className="relative w-72 max-w-[85%] bg-[#081329] text-white h-full flex flex-col justify-between shadow-2xl z-10 animate-in slide-in-from-left duration-200">
        <div className="p-6">
          {/* User Header */}
          <div className="flex items-center justify-between pb-6 border-b border-white/10">
            <div className="flex items-center gap-3">
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-12 h-12 rounded-full object-cover ring-2 ring-blue-500"
              />
              <div>
                <h3 className="font-bold text-base text-white">{currentUser.name}</h3>
                <span className="text-xs text-blue-300 font-medium">{currentUser.roleTitle}</span>
              </div>
            </div>

            <button
              onClick={() => setDrawerOpen(false)}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
              aria-label="Fechar menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Role Switcher Pill */}
          <div className="mt-4 p-2.5 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs text-slate-300">
              <UserCheck className="w-4 h-4 text-blue-400" />
              <span>Modo: <strong className="text-white capitalize">{userRole === 'client' ? 'Cliente' : 'Trabalhador'}</strong></span>
            </div>
            <button
              onClick={toggleUserRole}
              className="text-[11px] font-bold text-blue-400 hover:text-blue-300 underline"
            >
              Trocar
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="mt-6 space-y-1.5">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={item.action}
                  className="w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-slate-200 hover:text-white hover:bg-white/10 transition-colors text-left group"
                >
                  <div className="flex items-center gap-3.5">
                    <Icon className="w-5 h-5 text-slate-400 group-hover:text-blue-400 transition-colors" />
                    <span className="text-sm font-medium">{item.label}</span>
                  </div>

                  {item.badge !== undefined && (
                    <span className="px-2 py-0.5 text-xs font-bold rounded-full bg-[#0052FF] text-white">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}

            {/* Sair */}
            <button
              onClick={() => {
                navigateTo('splash');
                setDrawerOpen(false);
                showToast('Você saiu da sua conta.');
              }}
              className="w-full flex items-center gap-3.5 px-3.5 py-3 rounded-xl text-rose-300 hover:text-rose-200 hover:bg-rose-500/10 transition-colors text-left"
            >
              <LogOut className="w-5 h-5 text-rose-400" />
              <span className="text-sm font-medium">Sair</span>
            </button>
          </nav>
        </div>

        {/* Bottom Branding (Screen 10 Footer) */}
        <div className="p-6 pt-4 border-t border-white/10">
          <ObbiLogo variant="white" size="sm" showTagline={true} />
        </div>
      </div>
    </div>
  );
};
