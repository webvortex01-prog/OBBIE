import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { StatusBar, Header } from '../components/Header';
import { BottomNav } from '../components/BottomNav';
import {
  Calendar,
  Clock,
  MapPin,
  MessageSquare,
  XCircle,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

export const OrdersScreen: React.FC = () => {
  const {
    bookings,
    cancelBooking,
    selectProfessionalById,
    navigateTo,
    setActiveChatProfessionalId
  } = useApp();

  const [activeTab, setActiveTab] = useState<'ativos' | 'historico'>('ativos');

  const activeOrders = bookings.filter(
    (b) => b.status === 'confirmado' || b.status === 'pendente' || b.status === 'em_andamento'
  );

  const historyOrders = bookings.filter(
    (b) => b.status === 'concluido' || b.status === 'cancelado'
  );

  const displayedOrders = activeTab === 'ativos' ? activeOrders : historyOrders;

  const handleOpenChat = (profId: string) => {
    selectProfessionalById(profId);
    setActiveChatProfessionalId(profId);
    navigateTo('chat');
  };

  return (
    <div className="flex flex-col h-full bg-[#F8FAFC] select-none">
      <StatusBar />
      <Header title="Meus pedidos" showBack={true} />

      {/* Tabs */}
      <div className="flex bg-white border-b border-slate-100 px-5 pt-2">
        <button
          onClick={() => setActiveTab('ativos')}
          className={`flex-1 py-2.5 text-xs font-bold border-b-2 text-center transition-colors ${
            activeTab === 'ativos'
              ? 'border-[#0052FF] text-[#0052FF]'
              : 'border-transparent text-slate-400 hover:text-slate-600'
          }`}
        >
          Ativos ({activeOrders.length})
        </button>

        <button
          onClick={() => setActiveTab('historico')}
          className={`flex-1 py-2.5 text-xs font-bold border-b-2 text-center transition-colors ${
            activeTab === 'historico'
              ? 'border-[#0052FF] text-[#0052FF]'
              : 'border-transparent text-slate-400 hover:text-slate-600'
          }`}
        >
          Histórico ({historyOrders.length})
        </button>
      </div>

      {/* Orders List */}
      <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
        {displayedOrders.map((order) => {
          const isConfirmed = order.status === 'confirmado';
          const isDone = order.status === 'concluido';
          const isCancelled = order.status === 'cancelado';

          return (
            <div
              key={order.id}
              className="bg-white rounded-2xl p-4 border border-slate-100 shadow-xs space-y-3"
            >
              {/* Header info */}
              <div className="flex items-center justify-between pb-2.5 border-b border-slate-50">
                <div className="flex items-center gap-2.5">
                  <img
                    src={order.professionalAvatar}
                    alt={order.professionalName}
                    className="w-10 h-10 rounded-full object-cover ring-1 ring-slate-100"
                  />
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">{order.professionalName}</h4>
                    <p className="text-[11px] text-slate-400">{order.professionalTitle}</p>
                  </div>
                </div>

                <span
                  className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                    isConfirmed
                      ? 'bg-blue-50 text-[#0052FF]'
                      : isDone
                      ? 'bg-emerald-50 text-emerald-600'
                      : 'bg-rose-50 text-rose-600'
                  }`}
                >
                  {isConfirmed
                    ? 'Confirmado'
                    : isDone
                    ? 'Concluído'
                    : 'Cancelado'}
                </span>
              </div>

              {/* Service details */}
              <div className="space-y-1.5 text-xs">
                <p className="font-bold text-slate-800">{order.serviceName}</p>
                <div className="flex items-center gap-1.5 text-slate-500">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  <span>{order.date}</span>
                  <span className="text-slate-300">•</span>
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span>{order.timeSlot}</span>
                </div>
                <div className="flex items-start gap-1.5 text-slate-500">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 mt-0.5 flex-shrink-0" />
                  <span className="line-clamp-1">{order.address}</span>
                </div>
              </div>

              {/* Bottom action row */}
              <div className="pt-2.5 border-t border-slate-50 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 block">Total:</span>
                  <span className="text-sm font-black text-[#0052FF]">
                    R$ {order.price.toFixed(2).replace('.', ',')}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleOpenChat(order.professionalId)}
                    className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 active:scale-95 transition-all"
                    title="Conversar"
                  >
                    <MessageSquare className="w-4 h-4" />
                  </button>

                  {isConfirmed && (
                    <button
                      onClick={() => cancelBooking(order.id)}
                      className="px-3 py-1.5 rounded-xl text-xs font-semibold text-rose-600 hover:bg-rose-50 active:scale-95 transition-all"
                    >
                      Cancelar
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}

        {displayedOrders.length === 0 && (
          <div className="text-center py-16 text-slate-400">
            <Calendar className="w-10 h-10 mx-auto text-slate-300 mb-2" />
            <p className="text-xs">Nenhum pedido nesta aba.</p>
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
};
