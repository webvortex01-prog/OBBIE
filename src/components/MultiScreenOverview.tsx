import React from 'react';
import { useApp } from '../context/AppContext';
import { ObbiLogo } from './ObbiLogo';
import { SplashScreen } from '../screens/SplashScreen';
import { OnboardingScreen } from '../screens/OnboardingScreen';
import { HomeScreen } from '../screens/HomeScreen';
import { CategoriesScreen } from '../screens/CategoriesScreen';
import { CategoryListingsScreen } from '../screens/CategoryListingsScreen';
import { ProfessionalProfileScreen } from '../screens/ProfessionalProfileScreen';
import { BookingScreen } from '../screens/BookingScreen';
import { ChatScreen } from '../screens/ChatScreen';
import { WorkerProfileScreen } from '../screens/WorkerProfileScreen';
import { DrawerMenu } from './DrawerMenu';
import {
  Briefcase,
  ShieldCheck,
  Zap,
  ShoppingBag,
  ExternalLink,
  Smartphone,
  Eye,
  CheckCircle2
} from 'lucide-react';
import { ScreenId } from '../types';

export const MultiScreenOverview: React.FC = () => {
  const { setCurrentScreen, setViewMode } = useApp();

  const handleInspectScreen = (screenId: ScreenId) => {
    setCurrentScreen(screenId);
    setViewMode('phone');
  };

  const screens = [
    {
      id: 'splash' as ScreenId,
      number: '01',
      title: 'Splash Screen',
      subtitle: 'Boas-vindas e slogan oficial',
      component: <SplashScreen />
    },
    {
      id: 'onboarding' as ScreenId,
      number: '02',
      title: 'Onboarding',
      subtitle: 'Apresentação dos profissionais',
      component: <OnboardingScreen />
    },
    {
      id: 'home' as ScreenId,
      number: '03',
      title: 'Início (Home)',
      subtitle: 'Feed, categorias e destaques',
      component: <HomeScreen />
    },
    {
      id: 'categories' as ScreenId,
      number: '04',
      title: 'Categorias',
      subtitle: 'Lista completa de serviços',
      component: <CategoriesScreen />
    },
    {
      id: 'category_listings' as ScreenId,
      number: '05',
      title: 'Listagem de Profissionais',
      subtitle: 'Filtros e preços por diária',
      component: <CategoryListingsScreen />
    },
    {
      id: 'professional_profile' as ScreenId,
      number: '06',
      title: 'Perfil da Profissional',
      subtitle: 'Ana Souza - Detalhes e avaliações',
      component: <ProfessionalProfileScreen />
    },
    {
      id: 'booking' as ScreenId,
      number: '07',
      title: 'Agendar Serviço',
      subtitle: 'Data, horário, endereço e PIX',
      component: <BookingScreen />
    },
    {
      id: 'chat' as ScreenId,
      number: '08',
      title: 'Chat em Tempo Real',
      subtitle: 'Conversa direta com Ana Souza',
      component: <ChatScreen />
    },
    {
      id: 'worker_profile' as ScreenId,
      number: '09',
      title: 'Perfil do Trabalhador',
      subtitle: 'Carlos Lima - Serviços e estatísticas',
      component: <WorkerProfileScreen />
    },
    {
      id: 'home' as ScreenId,
      number: '10',
      title: 'Menu Lateral (Drawer)',
      subtitle: 'Navegação rápida do usuário Gustavo',
      component: (
        <div className="relative h-full w-full bg-[#081329] overflow-hidden">
          <DrawerMenu />
          {/* Static preview fallback if drawer is closed */}
          <div className="p-6 text-white h-full flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 pb-6 border-b border-white/10">
                <img
                  src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=400&q=80"
                  alt="Gustavo"
                  className="w-12 h-12 rounded-full object-cover ring-2 ring-blue-500"
                />
                <div>
                  <h3 className="font-bold text-base text-white">Gustavo</h3>
                  <span className="text-xs text-blue-300">Usuário</span>
                </div>
              </div>
              <div className="mt-6 space-y-3 text-xs text-slate-300">
                <div className="p-2 rounded-lg bg-white/10 font-bold text-white">Início</div>
                <div className="p-2 rounded-lg">Meus pedidos</div>
                <div className="p-2 rounded-lg">Minhas conversas</div>
                <div className="p-2 rounded-lg">Favoritos</div>
                <div className="p-2 rounded-lg">Carteira</div>
                <div className="p-2 rounded-lg">Configurações</div>
                <div className="p-2 rounded-lg">Ajuda</div>
                <div className="p-2 rounded-lg text-rose-300">Sair</div>
              </div>
            </div>
            <ObbiLogo variant="white" size="sm" showTagline={true} />
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="min-h-full bg-[#040D1E] text-white p-4 md:p-8 select-none">
      {/* Top Banner Header */}
      <div className="max-w-7xl mx-auto mb-8 text-center flex flex-col items-center">
        <ObbiLogo variant="white" size="lg" showTagline={true} />
        <p className="mt-3 text-sm text-blue-200 max-w-xl">
          Painel de visualização completa das <strong>10 telas oficiais</strong> do sistema OBBI criadas exatamente de acordo com o design fornecido.
        </p>

        <div className="mt-4 flex flex-wrap justify-center gap-3">
          <button
            onClick={() => {
              setCurrentScreen('home');
              setViewMode('phone');
            }}
            className="px-5 py-2.5 rounded-xl bg-[#0052FF] text-white font-bold text-xs shadow-lg hover:bg-blue-600 transition-all flex items-center gap-2"
          >
            <Smartphone className="w-4 h-4" />
            <span>Abrir Simulador Interativo do App</span>
          </button>
        </div>
      </div>

      {/* Grid of 10 Mobile Screens (recreating the 2 rows of 5 from the user's promo image) */}
      <div className="max-w-[1700px] mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {screens.map((item) => (
          <div
            key={item.number}
            className="flex flex-col items-center group"
          >
            {/* Screen Header Badge */}
            <div className="w-full flex items-center justify-between px-2 mb-2 text-xs">
              <span className="font-mono text-blue-400 font-bold">Tela {item.number}</span>
              <span className="font-semibold text-slate-300 truncate max-w-[150px]">{item.title}</span>
            </div>

            {/* Mobile Mockup Card */}
            <div className="relative w-full max-w-[300px] h-[610px] bg-slate-900 rounded-[32px] p-2 ring-1 ring-slate-800 shadow-2xl overflow-hidden transition-all duration-300 group-hover:ring-2 group-hover:ring-[#0052FF] group-hover:scale-[1.02]">
              {/* Dynamic Island */}
              <div className="absolute top-3 left-1/2 -translate-x-1/2 z-40 w-20 h-4 bg-black rounded-full" />

              {/* Screen Content Wrapper */}
              <div className="relative w-full h-full rounded-[26px] overflow-hidden bg-white text-slate-900 pointer-events-auto">
                {item.component}
              </div>

              {/* Hover overlay to test */}
              <div className="absolute inset-0 bg-black/60 backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-4 z-50">
                <h4 className="font-bold text-white text-base mb-1">{item.title}</h4>
                <p className="text-xs text-blue-200 mb-4 text-center">{item.subtitle}</p>
                <button
                  onClick={() => handleInspectScreen(item.id)}
                  className="px-4 py-2 rounded-xl bg-[#0052FF] text-white font-bold text-xs flex items-center gap-1.5 shadow-lg hover:bg-blue-600 transition-all cursor-pointer"
                >
                  <Eye className="w-4 h-4" />
                  <span>Interagir e Testar Esta Tela</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Benefits Banner (Exact footer from the user's promo image) */}
      <div className="max-w-7xl mx-auto mt-14 pt-8 border-t border-white/10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center md:text-left">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center flex-shrink-0">
              <Briefcase className="w-5 h-5" />
            </div>
            <div>
              <h5 className="text-xs font-bold text-white">Mais oportunidades</h5>
              <p className="text-[11px] text-blue-200">para quem precisa trabalhar</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center flex-shrink-0">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h5 className="text-xs font-bold text-white">Mais praticidade</h5>
              <p className="text-[11px] text-blue-200">para quem precisa de um serviço</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center flex-shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h5 className="text-xs font-bold text-white">Segurança e confiança</h5>
              <p className="text-[11px] text-blue-200">em todas as contratações</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center flex-shrink-0">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <h5 className="text-xs font-bold text-white">Rápido, fácil e direto</h5>
              <p className="text-[11px] text-blue-200">pelo aplicativo</p>
            </div>
          </div>
        </div>

        {/* Brand slogan callout */}
        <div className="mt-8 text-center">
          <span className="text-lg md:text-xl font-black italic tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-300">
            Juntos geramos mais!
          </span>
        </div>
      </div>
    </div>
  );
};
