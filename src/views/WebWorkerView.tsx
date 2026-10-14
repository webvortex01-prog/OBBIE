import React from 'react';
import { useApp } from '../context/AppContext';
import { CategoryIcon } from '../components/CategoryIcon';
import {
  Star,
  Settings,
  Plus,
  Edit3,
  CheckCircle2,
  TrendingUp,
  DollarSign,
  Calendar,
  Briefcase,
  Share2,
  ShieldCheck
} from 'lucide-react';

export const WebWorkerView: React.FC = () => {
  const {
    professionals,
    setPublishModalOpen,
    showToast,
    userRole,
    toggleUserRole,
    navigateTo
  } = useApp();

  const worker = professionals.find((p) => p.id === 'carlos-lima') || professionals[1];

  return (
    <div className="bg-slate-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Top Header Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
            <div className="relative">
              <img
                src={worker.avatar}
                alt={worker.name}
                className="w-24 h-24 rounded-3xl object-cover ring-4 ring-blue-50 shadow-md"
              />
              <span className="absolute -bottom-1 -right-1 w-6 h-6 bg-[#0052FF] text-white rounded-full flex items-center justify-center text-xs font-bold ring-2 ring-white">
                ✓
              </span>
            </div>

            <div>
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <h1 className="text-2xl font-black text-slate-900">{worker.name}</h1>
                <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-[#0052FF] text-xs font-bold">
                  Trabalhador Autônomo
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium mt-1">{worker.title}</p>
              <div className="flex items-center justify-center sm:justify-start gap-2 mt-2 text-xs font-bold text-amber-600">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span>{worker.rating.toFixed(1)}</span>
                <span className="text-slate-400 font-normal">({worker.reviewsCount} avaliações recebidas)</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => showToast('Editor de perfil aberto')}
              className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Edit3 className="w-4 h-4" />
              <span>Editar Perfil</span>
            </button>

            <button
              onClick={() => setPublishModalOpen(true)}
              className="px-5 py-2.5 rounded-xl bg-[#0052FF] text-white hover:bg-blue-600 text-xs font-bold transition-colors shadow-xs flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Adicionar Serviço</span>
            </button>
          </div>
        </div>

        {/* 3 Metric Cards (Screen 9: 12 Serviços realizados, 3 Anos de experiência, 92% Satisfação) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-blue-50 text-[#0052FF] flex items-center justify-center flex-shrink-0">
              <Briefcase className="w-7 h-7" />
            </div>
            <div>
              <span className="text-3xl font-black text-slate-900">{worker.completedServicesCount}</span>
              <p className="text-xs text-slate-500 font-semibold mt-0.5">Serviços Realizados</p>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center flex-shrink-0">
              <Calendar className="w-7 h-7" />
            </div>
            <div>
              <span className="text-3xl font-black text-slate-900">{worker.experienceYears}</span>
              <p className="text-xs text-slate-500 font-semibold mt-0.5">Anos de Experiência</p>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0">
              <TrendingUp className="w-7 h-7" />
            </div>
            <div>
              <span className="text-3xl font-black text-emerald-600">{worker.satisfactionRate}%</span>
              <p className="text-xs text-slate-500 font-semibold mt-0.5">Índice de Satisfação</p>
            </div>
          </div>
        </div>

        {/* Meus Serviços Gerenciados */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <h2 className="text-lg font-black text-slate-900">Meus Serviços Cadastrados</h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Serviços visíveis para clientes que buscam na sua região
              </p>
            </div>

            <button
              onClick={() => setPublishModalOpen(true)}
              className="text-xs font-bold text-[#0052FF] hover:underline flex items-center gap-1 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Novo serviço</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {worker.services.map((svc) => (
              <div
                key={svc.id}
                className="p-5 rounded-2xl bg-slate-50 border border-slate-100 hover:border-blue-200 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-100 text-[#0052FF] flex items-center justify-center">
                      <CategoryIcon name={svc.category} className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-slate-900">{svc.name}</h3>
                      <span className="text-[10px] text-slate-400 capitalize">{svc.category}</span>
                    </div>
                  </div>
                  <p className="text-xs text-slate-600">{svc.description}</p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center justify-between">
                  <span className="text-xs text-slate-400">Preço cobrado:</span>
                  <span className="text-base font-black text-[#0052FF]">
                    R$ {svc.price.toFixed(2).replace('.', ',')}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
