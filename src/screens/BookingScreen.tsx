import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { StatusBar, Header } from '../components/Header';
import {
  Calendar as CalendarIcon,
  Clock,
  MapPin,
  CreditCard,
  QrCode,
  Banknote,
  Star,
  CheckCircle2,
  ShieldCheck,
  ChevronDown
} from 'lucide-react';

export const BookingScreen: React.FC = () => {
  const {
    selectedProfessional,
    addBooking,
    currentUser,
    setPaymentSuccessBooking,
    navigateTo,
    showToast
  } = useApp();

  const [selectedDate, setSelectedDate] = useState('17/10/2026 (Sexta-feira)');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('08:00 às 12:00');
  const [address, setAddress] = useState(currentUser.address || 'Av. Paulista, 1000 - Apto 42, São Paulo - SP');
  const [paymentMethod, setPaymentMethod] = useState<'pix' | 'card' | 'cash'>('pix');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const datesList = [
    'Hoje - 14/10/2026',
    'Amanhã - 15/10/2026',
    '17/10/2026 (Sexta-feira)',
    '18/10/2026 (Sábado)',
    '20/10/2026 (Segunda-feira)'
  ];

  const timeSlotsList = [
    '08:00 às 12:00 (Manhã)',
    '13:00 às 17:00 (Tarde)',
    '08:00 às 17:00 (Integral)'
  ];

  const handleConfirm = () => {
    if (!address.trim()) {
      showToast('Por favor, informe o endereço do serviço.');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const paymentLabel =
        paymentMethod === 'pix'
          ? 'PIX Instantâneo'
          : paymentMethod === 'card'
          ? 'Cartão de Crédito'
          : 'Dinheiro na entrega';

      const newBooking = addBooking({
        professionalId: selectedProfessional.id,
        professionalName: selectedProfessional.name,
        professionalAvatar: selectedProfessional.avatar,
        professionalTitle: selectedProfessional.title,
        serviceName: selectedProfessional.services[0]?.name || 'Serviço Profissional',
        date: selectedDate,
        timeSlot: selectedTimeSlot,
        address: address.trim(),
        paymentMethod: paymentLabel,
        notes: notes.trim() || undefined,
        price: selectedProfessional.price,
        status: 'confirmado'
      });

      setIsSubmitting(false);
      setPaymentSuccessBooking(newBooking);
    }, 600);
  };

  return (
    <div className="flex flex-col h-full bg-[#F8FAFC] select-none">
      <StatusBar />
      <Header title="Agendar serviço" showBack={true} />

      {/* Form Content */}
      <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
        {/* Professional Summary Card (Screen 7 header card) */}
        <div className="bg-white rounded-2xl p-3.5 border border-slate-100 shadow-xs flex items-center gap-3">
          <img
            src={selectedProfessional.avatar}
            alt={selectedProfessional.name}
            className="w-12 h-12 rounded-full object-cover ring-2 ring-slate-100"
          />
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-bold text-slate-900 truncate">
              {selectedProfessional.name}
            </h3>
            <p className="text-xs text-slate-500">{selectedProfessional.title}</p>
            <div className="flex items-center gap-1 text-xs font-semibold text-amber-600 mt-0.5">
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              <span>{selectedProfessional.rating.toFixed(1)}</span>
              <span className="text-slate-400 font-normal">
                ({selectedProfessional.reviewsCount})
              </span>
            </div>
          </div>
          <div className="text-right">
            <span className="text-sm font-black text-[#0052FF]">
              R$ {selectedProfessional.price.toFixed(2).replace('.', ',')}
            </span>
            <p className="text-[10px] text-slate-400">{selectedProfessional.priceUnit}</p>
          </div>
        </div>

        {/* Section: Data e horário */}
        <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-xs space-y-3">
          <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
            Data e horário
          </h4>

          {/* Date Picker */}
          <div>
            <label className="text-xs font-medium text-slate-500 mb-1 block">
              Selecione a data
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <CalendarIcon className="w-4 h-4" />
              </div>
              <select
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full pl-9 pr-8 py-2.5 bg-slate-50 border border-slate-200/80 rounded-xl text-xs text-slate-800 font-medium appearance-none focus:outline-none focus:ring-2 focus:ring-[#0052FF]/20 focus:bg-white cursor-pointer"
              >
                {datesList.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-slate-400">
                <ChevronDown className="w-4 h-4" />
              </div>
            </div>
          </div>

          {/* Time Picker */}
          <div>
            <label className="text-xs font-medium text-slate-500 mb-1 block">
              Selecione o horário
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <Clock className="w-4 h-4" />
              </div>
              <select
                value={selectedTimeSlot}
                onChange={(e) => setSelectedTimeSlot(e.target.value)}
                className="w-full pl-9 pr-8 py-2.5 bg-slate-50 border border-slate-200/80 rounded-xl text-xs text-slate-800 font-medium appearance-none focus:outline-none focus:ring-2 focus:ring-[#0052FF]/20 focus:bg-white cursor-pointer"
              >
                {timeSlotsList.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-slate-400">
                <ChevronDown className="w-4 h-4" />
              </div>
            </div>
          </div>
        </div>

        {/* Section: Endereço do serviço */}
        <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-xs space-y-2">
          <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
            Endereço do serviço
          </h4>

          <div className="relative">
            <div className="absolute top-3 left-3 text-slate-400">
              <MapPin className="w-4 h-4" />
            </div>
            <textarea
              rows={2}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Digite o endereço completo"
              className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200/80 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0052FF]/20 focus:bg-white resize-none"
            />
          </div>
          <p className="text-[11px] text-slate-400">
            Você pode alterar depois, se necessário.
          </p>
        </div>

        {/* Section: Forma de pagamento */}
        <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-xs space-y-3">
          <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
            Forma de pagamento
          </h4>

          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => setPaymentMethod('pix')}
              className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1.5 transition-all ${
                paymentMethod === 'pix'
                  ? 'border-[#0052FF] bg-blue-50/50 text-[#0052FF] ring-1 ring-[#0052FF]'
                  : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100'
              }`}
            >
              <QrCode className="w-5 h-5" />
              <span className="text-[11px] font-bold">PIX</span>
              <span className="text-[9px] text-emerald-600 font-semibold">Instantâneo</span>
            </button>

            <button
              type="button"
              onClick={() => setPaymentMethod('card')}
              className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1.5 transition-all ${
                paymentMethod === 'card'
                  ? 'border-[#0052FF] bg-blue-50/50 text-[#0052FF] ring-1 ring-[#0052FF]'
                  : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100'
              }`}
            >
              <CreditCard className="w-5 h-5" />
              <span className="text-[11px] font-bold">Cartão</span>
              <span className="text-[9px] text-slate-400">Até 3x</span>
            </button>

            <button
              type="button"
              onClick={() => setPaymentMethod('cash')}
              className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1.5 transition-all ${
                paymentMethod === 'cash'
                  ? 'border-[#0052FF] bg-blue-50/50 text-[#0052FF] ring-1 ring-[#0052FF]'
                  : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Banknote className="w-5 h-5" />
              <span className="text-[11px] font-bold">Dinheiro</span>
              <span className="text-[9px] text-slate-400">No local</span>
            </button>
          </div>
        </div>

        {/* Section: Observações */}
        <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-xs space-y-2">
          <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
            Observações (opcional)
          </h4>
          <textarea
            rows={2}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Ex: pontos de atenção, preferências, animais de estimação..."
            className="w-full p-3 bg-slate-50 border border-slate-200/80 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0052FF]/20 focus:bg-white resize-none"
          />
        </div>

        {/* Protection guarantee banner */}
        <div className="p-3 rounded-xl bg-blue-50 border border-blue-100 flex items-center gap-2.5 text-xs text-blue-900">
          <ShieldCheck className="w-4 h-4 text-[#0052FF] flex-shrink-0" />
          <span>
            <strong>Garantia OBBI:</strong> Seu pagamento fica protegido até a conclusão do serviço.
          </span>
        </div>
      </div>

      {/* Sticky Bottom Summary & Confirm Button */}
      <div className="p-4 bg-white border-t border-slate-200/80 shadow-lg">
        <div className="flex items-center justify-between mb-3 text-xs">
          <span className="text-slate-500">Valor total a pagar:</span>
          <span className="text-lg font-black text-[#0052FF]">
            R$ {selectedProfessional.price.toFixed(2).replace('.', ',')}
          </span>
        </div>

        <button
          onClick={handleConfirm}
          disabled={isSubmitting}
          className="w-full py-3.5 px-6 rounded-xl bg-[#0052FF] text-white font-bold text-sm shadow-md shadow-blue-500/25 hover:bg-blue-600 active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75"
        >
          {isSubmitting ? (
            <span>Processando agendamento...</span>
          ) : (
            <>
              <CheckCircle2 className="w-4 h-4" />
              <span>Confirmar contratação</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
