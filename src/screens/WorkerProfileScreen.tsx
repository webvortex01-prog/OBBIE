import React from 'react';
import { useApp } from '../context/AppContext';
import { StatusBar, Header } from '../components/Header';
import { BottomNav } from '../components/BottomNav';
import { CategoryIcon } from '../components/CategoryIcon';
import {
  Star,
  Settings,
  ChevronRight,
  Plus,
  Share2,
  Edit3,
  Award,
  CheckCircle,
  TrendingUp,
  Sliders
} from 'lucide-react';

export const WorkerProfileScreen: React.FC = () => {
  const {
    professionals,
    setPublishModalOpen,
    showToast,
    userRole,
    toggleUserRole,
    navigateTo
  } = useApp();

  // Screen 9 specifically presents Carlos Lima's worker profile
  const worker = professionals.find((p) => p.id === 'carlos-lima') || professionals[1];

  return (
    <div className="flex flex-col h-full bg-[#F8FAFC] select-none">
      <StatusBar />
      <Header />

      {/* Profile Content */}
      <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
        {/* Worker Header Card (Screen 9) */}
        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-xs text-center flex flex-col items-center">
          <div className="relative mb-3">
            <img
              src={worker.avatar}
              alt={worker.name}
              className="w-20 h-20 rounded-full object-cover ring-4 ring-blue-50 shadow-md"
            />
            <span className="absolute bottom-1 right-1 w-5 h-5 bg-[#0052FF] text-white rounded-full flex items-center justify-center text-[10px] font-bold ring-2 ring-white">
              ✓
            </span>
          </div>

          <h2 className="text-lg font-black text-slate-900">{worker.name}</h2>
          <span className="text-xs font-semibold text-slate-500 mt-0.5">Trabalhador</span>

          <div className="flex items-center gap-1.5 mt-2 text-xs font-bold text-amber-600 bg-amber-50 px-3 py-1 rounded-full">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span>{worker.rating.toFixed(1)}</span>
            <span className="text-slate-400 font-normal">({worker.reviewsCount} avaliações)</span>
          </div>

          {/* 3 Stats Columns (Screen 9: 12 Serviços realizados, 3 Anos de experiência, 92% Satisfação) */}
          <div className="grid grid-cols-3 gap-2 w-full mt-5 pt-4 border-t border-slate-100">
            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100/60">
              <span className="block text-base font-black text-slate-900">
                {worker.completedServicesCount}
              </span>
              <span className="text-[10px] text-slate-400 font-medium leading-tight block mt-0.5">
                Serviços realizados
              </span>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100/60">
              <span className="block text-base font-black text-slate-900">
                {worker.experienceYears}
              </span>
              <span className="text-[10px] text-slate-400 font-medium leading-tight block mt-0.5">
                Anos de experiência
              </span>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100/60">
              <span className="block text-base font-black text-emerald-600">
                {worker.satisfactionRate}%
              </span>
              <span className="text-[10px] text-slate-400 font-medium leading-tight block mt-0.5">
                Satisfação
              </span>
            </div>
          </div>
        </div>

        {/* Section: Meus serviços (Screen 9: Encanador R$80, Elétrica R$90, Pequenos reparos R$70) */}
        <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-bold text-slate-900">Meus serviços</h3>
            <button
              onClick={() => showToast('Todos os 3 serviços cadastrados')}
              className="text-xs font-semibold text-[#0052FF] hover:underline flex items-center gap-0.5"
            >
              <span>Ver todos</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-2.5">
            {worker.services.map((svc) => (
              <div
                key={svc.id}
                className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100/80 hover:bg-slate-100/70 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-100/80 text-[#0052FF] flex items-center justify-center">
                    <CategoryIcon name={svc.category} className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-800">{svc.name}</h4>
                    <p className="text-[11px] text-slate-400">{svc.description}</p>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-xs font-black text-[#0052FF]">
                    R$ {svc.price.toFixed(2).replace('.', ',')}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={() => setPublishModalOpen(true)}
            className="w-full mt-3 py-2.5 rounded-xl border border-dashed border-blue-200 text-xs font-bold text-[#0052FF] hover:bg-blue-50/50 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Adicionar novo serviço</span>
          </button>
        </div>

        {/* Action Button: Editar Perfil (Screen 9 button) */}
        <div>
          <button
            onClick={() => showToast('Abrindo editor de perfil')}
            className="w-full py-3 px-4 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 font-bold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <Edit3 className="w-4 h-4" />
            <span>Editar perfil</span>
          </button>
        </div>

        {/* Role Toggle Card */}
        <div className="p-3 bg-blue-50/70 rounded-xl border border-blue-100 flex items-center justify-between">
          <div className="text-xs">
            <span className="text-slate-500 block">Visualização atual:</span>
            <strong className="text-blue-900 font-bold">
              {userRole === 'worker' ? 'Modo Trabalhador (Carlos)' : 'Modo Cliente (Gustavo)'}
            </strong>
          </div>
          <button
            onClick={toggleUserRole}
            className="px-3 py-1.5 rounded-lg bg-[#0052FF] text-white text-xs font-bold hover:bg-blue-600 transition-colors"
          >
            Alternar
          </button>
        </div>
      </div>

      <BottomNav />
    </div>
  );
};
