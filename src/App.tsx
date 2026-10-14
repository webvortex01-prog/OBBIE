import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { WebNavbar } from './components/WebNavbar';
import { WebFooter } from './components/WebFooter';
import { WebHomeView } from './views/WebHomeView';
import { WebServicesView } from './views/WebServicesView';
import { WebProfessionalDetailView } from './views/WebProfessionalDetailView';
import { WebChatView } from './views/WebChatView';
import { WebWorkerView } from './views/WebWorkerView';
import { WebOrdersView } from './views/WebOrdersView';
import { WebWalletView } from './views/WebWalletView';
import { WebFavoritesView } from './views/WebFavoritesView';
import { MultiScreenOverview } from './components/MultiScreenOverview';
import { PhoneFrame } from './components/PhoneFrame';
import { PublishServiceModal } from './components/Modals/PublishServiceModal';
import { CallModal } from './components/Modals/CallModal';
import { FilterModal } from './components/Modals/FilterModal';
import { PaymentSuccessModal } from './components/Modals/PaymentSuccessModal';
import { Sparkles, LayoutGrid, Monitor, Smartphone, X } from 'lucide-react';

const AppContent: React.FC = () => {
  const { currentScreen, viewMode, setViewMode, toastMessage } = useApp();

  const renderActiveView = () => {
    switch (currentScreen) {
      case 'home':
        return <WebHomeView />;
      case 'categories':
      case 'category_listings':
        return <WebServicesView />;
      case 'professional_profile':
      case 'booking':
        return <WebProfessionalDetailView />;
      case 'chat':
        return <WebChatView />;
      case 'worker_profile':
        return <WebWorkerView />;
      case 'orders':
        return <WebOrdersView />;
      case 'wallet':
        return <WebWalletView />;
      case 'favorites':
        return <WebFavoritesView />;
      default:
        return <WebHomeView />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-800 antialiased selection:bg-[#0052FF] selection:text-white">
      {/* If viewMode is 'overview' (the 10 screens promo poster), show the poster board */}
      {viewMode === 'overview' ? (
        <div className="relative">
          {/* Close button to return to normal website */}
          <div className="fixed top-4 right-4 z-50">
            <button
              onClick={() => setViewMode('responsive')}
              className="px-4 py-2 rounded-xl bg-[#0052FF] text-white text-xs font-bold shadow-xl hover:bg-blue-600 flex items-center gap-2 cursor-pointer"
            >
              <Monitor className="w-4 h-4" />
              <span>Voltar para o Site Normal</span>
            </button>
          </div>
          <MultiScreenOverview />
        </div>
      ) : (
        /* NORMAL FULL WEBSITE */
        <>
          <WebNavbar />

          <main className="flex-1">
            {renderActiveView()}
          </main>

          <WebFooter />

          {/* Quick Floating Switcher to toggle poster/mockup view if user desires */}
          <div className="fixed bottom-4 right-4 z-30">
            <button
              onClick={() => setViewMode('overview')}
              className="px-4 py-2.5 rounded-full bg-slate-900/90 text-white hover:bg-slate-950 text-xs font-bold shadow-xl border border-slate-700/80 backdrop-blur-md flex items-center gap-2 hover:scale-105 transition-all cursor-pointer"
              title="Ver painel com as 10 telas lado a lado como na imagem"
            >
              <LayoutGrid className="w-3.5 h-3.5 text-blue-400" />
              <span className="hidden sm:inline">Ver Painel 10 Telas</span>
            </button>
          </div>
        </>
      )}

      {/* Global Interactive Modals */}
      <PublishServiceModal />
      <CallModal />
      <FilterModal />
      <PaymentSuccessModal />

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-full bg-slate-900/95 text-white text-xs font-bold shadow-2xl border border-slate-700/80 backdrop-blur-md flex items-center gap-2.5 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <Sparkles className="w-4 h-4 text-[#0052FF]" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
