import React from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle2, QrCode, Copy, Calendar, MessageSquare, ArrowRight, ShieldCheck } from 'lucide-react';

export const PaymentSuccessModal: React.FC = () => {
  const {
    paymentSuccessBooking,
    setPaymentSuccessBooking,
    navigateTo,
    selectProfessionalById,
    setActiveChatProfessionalId,
    showToast
  } = useApp();

  if (!paymentSuccessBooking) return null;

  const handleCopyPix = () => {
    const pixCode = '00020126580014br.gov.bcb.pix0136obbi-pagamentos-1049-uuid-2026520400005303986540580.005802BR5925OBBI SERVICOS SAO PAULO6009SAO PAULO62070503***6304E8A2';
    if (navigator.clipboard) {
      navigator.clipboard.writeText(pixCode);
    }
    showToast('Código PIX Copia e Cola copiado com sucesso!');
  };

  const handleGoToChat = () => {
    selectProfessionalById(paymentSuccessBooking.professionalId);
    setActiveChatProfessionalId(paymentSuccessBooking.professionalId);
    setPaymentSuccessBooking(null);
    navigateTo('chat');
  };

  const handleGoToOrders = () => {
    setPaymentSuccessBooking(null);
    navigateTo('orders');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs select-none animate-in fade-in duration-200">
      <div className="relative w-full max-w-sm bg-white rounded-3xl p-6 shadow-2xl z-10 text-center">
        {/* Animated Check */}
        <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-500 mx-auto flex items-center justify-center mb-4 ring-8 ring-emerald-50/50">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <h3 className="text-xl font-extrabold text-slate-900 leading-snug">
          Contratação Confirmada!
        </h3>
        <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
          Seu agendamento com <strong className="text-slate-800">{paymentSuccessBooking.professionalName}</strong> foi registrado com sucesso.
        </p>

        {/* Booking Card Details */}
        <div className="mt-4 p-3.5 rounded-2xl bg-slate-50 border border-slate-100 text-left space-y-2 text-xs">
          <div className="flex justify-between">
            <span className="text-slate-400">Serviço:</span>
            <span className="font-bold text-slate-800">{paymentSuccessBooking.serviceName}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Data e Horário:</span>
            <span className="font-bold text-slate-800">{paymentSuccessBooking.date} • {paymentSuccessBooking.timeSlot}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Total:</span>
            <span className="font-black text-[#0052FF] text-sm">
              R$ {paymentSuccessBooking.price.toFixed(2).replace('.', ',')}
            </span>
          </div>
        </div>

        {/* PIX Quick Copy */}
        <div className="mt-4 p-3 bg-blue-50/60 rounded-xl border border-blue-100 flex items-center justify-between">
          <div className="flex items-center gap-2 text-left">
            <QrCode className="w-6 h-6 text-[#0052FF]" />
            <div>
              <span className="text-[11px] font-bold text-slate-800 block">PIX Copia e Cola</span>
              <span className="text-[10px] text-slate-400">Pague direto pelo seu banco</span>
            </div>
          </div>
          <button
            onClick={handleCopyPix}
            className="px-2.5 py-1.5 rounded-lg bg-[#0052FF] text-white text-[11px] font-bold hover:bg-blue-600 active:scale-95 transition-all flex items-center gap-1 cursor-pointer"
          >
            <Copy className="w-3 h-3" />
            <span>Copiar</span>
          </button>
        </div>

        {/* Buttons */}
        <div className="mt-5 space-y-2">
          <button
            onClick={handleGoToChat}
            className="w-full py-3 px-4 rounded-xl bg-[#0052FF] text-white font-bold text-xs shadow-md shadow-blue-500/25 hover:bg-blue-600 active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Falar com {paymentSuccessBooking.professionalName} no chat</span>
          </button>

          <button
            onClick={handleGoToOrders}
            className="w-full py-2.5 px-4 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 transition-colors"
          >
            Ver meus pedidos
          </button>
        </div>
      </div>
    </div>
  );
};
