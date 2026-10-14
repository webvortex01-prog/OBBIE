import React from 'react';
import { useApp } from '../context/AppContext';
import { StatusBar, Header } from '../components/Header';
import { BottomNav } from '../components/BottomNav';
import { Bell, CheckCircle2, MessageSquare, Tag, Calendar } from 'lucide-react';

export const NotificationsScreen: React.FC = () => {
  const { navigateTo } = useApp();

  const notifications = [
    {
      id: 'n-1',
      title: 'Agendamento Confirmado!',
      desc: 'Ana Souza confirmou sua solicitação de Faxina para 17/10 às 08:00.',
      time: 'Há 10 minutos',
      icon: CheckCircle2,
      color: 'bg-emerald-50 text-emerald-600',
      action: () => navigateTo('orders')
    },
    {
      id: 'n-2',
      title: 'Nova mensagem de Ana Souza',
      desc: '"Oi! Tenho sim, posso sim. Qual horário você precisa?"',
      time: 'Há 45 minutos',
      icon: MessageSquare,
      color: 'bg-blue-50 text-[#0052FF]',
      action: () => navigateTo('chat')
    },
    {
      id: 'n-3',
      title: 'Desconto de 15% na primeira faxina',
      desc: 'Use o cupom BEMVINDOBBI em qualquer contratação residencial.',
      time: 'Há 2 horas',
      icon: Tag,
      color: 'bg-amber-50 text-amber-600',
      action: () => navigateTo('categories')
    }
  ];

  return (
    <div className="flex flex-col h-full bg-[#F8FAFC] select-none">
      <StatusBar />
      <Header title="Notificações" showBack={true} />

      <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
        {notifications.map((notif) => {
          const Icon = notif.icon;
          return (
            <div
              key={notif.id}
              onClick={notif.action}
              className="bg-white rounded-2xl p-3.5 border border-slate-100 shadow-xs hover:bg-slate-50 transition-colors cursor-pointer flex items-start gap-3"
            >
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${notif.color}`}>
                <Icon className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-slate-800">{notif.title}</h4>
                  <span className="text-[10px] text-slate-400">{notif.time}</span>
                </div>
                <p className="text-xs text-slate-500 mt-1 leading-snug">{notif.desc}</p>
              </div>
            </div>
          );
        })}
      </div>

      <BottomNav />
    </div>
  );
};
