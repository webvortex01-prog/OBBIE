import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Calendar,
  Clock,
  MapPin,
  MessageSquare,
  XCircle,
  CheckCircle2,
  AlertCircle,
  CreditCard,
  ChevronRight
} from 'lucide-react';

export const WebOrdersView: React.FC = () => {
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

  const handleChat = (profId: string) => {
    selectProfessionalById(profId);
    setActiveChatProfessionalId(profId);
    navigateTo('chat');
  };

  return (
    <div className="bg-slate-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Meus Pedidos e Agendamentos
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Acompanhe o andamento dos serviços contratados em tempo real
            </p>
          </div>

          {/* Tabs */}
          <div className="flex bg-white p-1 rounded-2xl border border-slate-200 shadow-xs">
            <button
              onClick={() => setActiveTab('ativos')}
              className={`px-5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'ativos'
                  ? 'bg-[#0052FF] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Ativos ({activeOrders.length})
            </button>
            <button
              onClick={() => setActiveTab('historico')}
              className={`px-5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'historico'
                  ? 'bg-[#0052FF] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Histórico ({historyOrders.length})
            </button>
          </div>
        </div>

        {/* Orders Cards List */}
        <div className="space-y-4">
          {displayedOrders.map((order) => {
            const isConfirmed = order.status === 'confirmado';
            const isDone = order.status === 'concluido';

            return (
              <div
                key={order.id}
                className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs flex flex-col md:flex-row items-center justify-between gap-6"
              >
                <div className="flex items-start gap-5 flex-1">
                  <img
                    src={order.professionalAvatar}
                    alt={order.professionalName}
                    className="w-16 h-16 rounded-2xl object-cover ring-2 ring-slate-100 flex-shrink-0"
                  />

                  <div className="space-y-1">
                    <div className="flex items-center gap-3">
                      <h3 className="text-base font-bold text-slate-900">{order.serviceName}</h3>
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                          isConfirmed
                            ? 'bg-blue-50 text-[#0052FF]'
                            : isDone
                            ? 'bg-emerald-50 text-emerald-600'
                            : 'bg-rose-50 text-rose-600'
                        }`}
                      >
                        {isConfirmed ? 'Confirmado' : isDone ? 'Concluído' : 'Cancelado'}
                      </span>
                    </div>

                    <p className="text-xs text-slate-500 font-medium">
                      Profissional: <strong className="text-slate-800">{order.professionalName}</strong> ({order.professionalTitle})
                    </p>

                    <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pt-1">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                        {order.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        {order.timeSlot}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" />
                        {order.address}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex md:flex-col items-center md:items-end justify-between w-full md:w-auto pt-4 md:pt-0 border-t md:border-t-0 border-slate-100 gap-3">
                  <div className="text-left md:text-right">
                    <span className="text-[10px] text-slate-400 block font-medium">Forma: {order.paymentMethod}</span>
                    <span className="text-xl font-black text-[#0052FF]">
                      R$ {order.price.toFixed(2).replace('.', ',')}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleChat(order.professionalId)}
                      className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                    >
                      <MessageSquare className="w-4 h-4 text-blue-500" />
                      <span>Falar no Chat</span>
                    </button>

                    {isConfirmed && (
                      <button
                        onClick={() => cancelBooking(order.id)}
                        className="px-3 py-2 rounded-xl text-xs font-semibold text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
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
            <div className="bg-white rounded-3xl p-16 text-center border border-slate-200 space-y-3">
              <Calendar className="w-12 h-12 mx-auto text-slate-300" />
              <h3 className="text-base font-bold text-slate-700">Nenhum pedido nesta aba</h3>
              <p className="text-xs text-slate-400">
                Você pode buscar profissionais e agendar serviços a qualquer momento.
              </p>
              <button
                onClick={() => navigateTo('category_listings')}
                className="mt-2 px-5 py-2.5 rounded-xl bg-[#0052FF] text-white text-xs font-bold hover:bg-blue-600 transition-colors cursor-pointer"
              >
                Explorar Serviços
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
