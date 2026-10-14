import React from 'react';
import { useApp } from '../../context/AppContext';
import { X, SlidersHorizontal, Check } from 'lucide-react';

export const FilterModal: React.FC = () => {
  const {
    filterModalOpen,
    setFilterModalOpen,
    maxDistanceFilter,
    setMaxDistanceFilter,
    maxPriceFilter,
    setMaxPriceFilter
  } = useApp();

  if (!filterModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={() => setFilterModalOpen(false)}
      />

      <div className="relative w-full max-w-sm bg-white rounded-t-3xl sm:rounded-2xl p-6 shadow-2xl z-10 animate-in slide-in-from-bottom duration-200">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-5 h-5 text-[#0052FF]" />
            <h3 className="font-extrabold text-slate-900 text-base">Filtros de Busca</h3>
          </div>
          <button
            onClick={() => setFilterModalOpen(false)}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="py-4 space-y-5 text-xs">
          {/* Distância Máxima */}
          <div>
            <div className="flex justify-between font-bold text-slate-700 mb-2">
              <span>Distância Máxima</span>
              <span className="text-[#0052FF]">{maxDistanceFilter} km</span>
            </div>
            <input
              type="range"
              min="1"
              max="25"
              step="1"
              value={maxDistanceFilter}
              onChange={(e) => setMaxDistanceFilter(Number(e.target.value))}
              className="w-full accent-[#0052FF] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-1">
              <span>1 km</span>
              <span>10 km</span>
              <span>25 km</span>
            </div>
          </div>

          {/* Valor Máximo */}
          <div>
            <div className="flex justify-between font-bold text-slate-700 mb-2">
              <span>Valor Máximo por Diária / Serviço</span>
              <span className="text-[#0052FF]">R$ {maxPriceFilter},00</span>
            </div>
            <input
              type="range"
              min="40"
              max="300"
              step="10"
              value={maxPriceFilter}
              onChange={(e) => setMaxPriceFilter(Number(e.target.value))}
              className="w-full accent-[#0052FF] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-1">
              <span>R$ 40</span>
              <span>R$ 150</span>
              <span>R$ 300</span>
            </div>
          </div>
        </div>

        <div className="flex gap-2 pt-2 border-t border-slate-100">
          <button
            onClick={() => {
              setMaxDistanceFilter(15);
              setMaxPriceFilter(200);
            }}
            className="flex-1 py-3 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl"
          >
            Redefinir
          </button>
          <button
            onClick={() => setFilterModalOpen(false)}
            className="flex-1 py-3 text-xs font-bold text-white bg-[#0052FF] hover:bg-blue-600 rounded-xl shadow-xs"
          >
            Aplicar Filtros
          </button>
        </div>
      </div>
    </div>
  );
};
