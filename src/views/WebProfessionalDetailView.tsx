import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Star,
  MapPin,
  Calendar,
  CreditCard,
  Clock,
  MessageSquare,
  ShieldCheck,
  CheckCircle2,
  Share2,
  Heart,
  QrCode,
  Banknote,
  ChevronDown,
  ArrowLeft
} from 'lucide-react';

export const WebProfessionalDetailView: React.FC = () => {
  const {
    selectedProfessional,
    navigateTo,
    addBooking,
    currentUser,
    setPaymentSuccessBooking,
    setActiveChatProfessionalId,
    isFavorite,
    toggleFavorite,
    showToast
  } = useApp();

  const [selectedDate, setSelectedDate] = useState('17/10/2026 (Sexta-feira)');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('08:00 às 12:00 (Manhã)');
  const [address, setAddress] = useState(currentUser.address || 'Av. Paulista, 1000 - Apto 42, São Paulo - SP');
  const [paymentMethod, setPaymentMethod] = useState<'pix' | 'card' | 'cash'>('pix');
  const [selectedServiceId, setSelectedServiceId] = useState(selectedProfessional.services[0]?.id || '');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const selectedService =
    selectedProfessional.services.find((s) => s.id === selectedServiceId) ||
    selectedProfessional.services[0];

  const currentPrice = selectedService ? selectedService.price : selectedProfessional.price;

  const handleBooking = () => {
    if (!address.trim()) {
      showToast('Por favor, digite o endereço completo do serviço.');
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

      const booking = addBooking({
        professionalId: selectedProfessional.id,
        professionalName: selectedProfessional.name,
        professionalAvatar: selectedProfessional.avatar,
        professionalTitle: selectedProfessional.title,
        serviceName: selectedService?.name || 'Serviço Profissional',
        date: selectedDate,
        timeSlot: selectedTimeSlot,
        address: address.trim(),
        paymentMethod: paymentLabel,
        notes: notes.trim() || undefined,
        price: currentPrice,
        status: 'confirmado'
      });

      setIsSubmitting(false);
      setPaymentSuccessBooking(booking);
    }, 600);
  };

  const handleChat = () => {
    setActiveChatProfessionalId(selectedProfessional.id);
    navigateTo('chat');
  };

  return (
    <div className="bg-slate-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back and Breadcrumb */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => navigateTo('category_listings')}
            className="flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-[#0052FF] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Voltar para listagem de profissionais</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                if (navigator.clipboard) navigator.clipboard.writeText(window.location.href);
                showToast('Link do perfil copiado com sucesso!');
              }}
              className="px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-100 flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Compartilhar</span>
            </button>

            <button
              onClick={() => toggleFavorite(selectedProfessional.id)}
              className="px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-100 flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Heart
                className={`w-3.5 h-3.5 ${
                  isFavorite(selectedProfessional.id) ? 'fill-red-500 text-red-500' : 'text-slate-600'
                }`}
              />
              <span>{isFavorite(selectedProfessional.id) ? 'Salvo' : 'Favoritar'}</span>
            </button>
          </div>
        </div>

        {/* 2-Column Layout: Left (Profile & Reviews) / Right (Sticky Booking Widget) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column (8 cols): Banner, Profile, Bio, Services, Reviews */}
          <div className="lg:col-span-8 space-y-8">
            {/* Main Header Card */}
            <div className="bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-xs">
              <div className="relative h-64 w-full bg-slate-200">
                <img
                  src={selectedProfessional.coverImage}
                  alt={selectedProfessional.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              </div>

              <div className="p-6 sm:p-8 relative">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between -mt-16 sm:-mt-20 gap-4 mb-6">
                  <div className="flex items-end gap-4">
                    <div className="relative">
                      <img
                        src={selectedProfessional.avatar}
                        alt={selectedProfessional.name}
                        className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover ring-4 ring-white shadow-xl"
                      />
                      {selectedProfessional.verified && (
                        <span className="absolute bottom-1 right-1 w-6 h-6 bg-[#0052FF] text-white rounded-full flex items-center justify-center text-xs font-bold ring-2 ring-white">
                          ✓
                        </span>
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
                          {selectedProfessional.name}
                        </h1>
                        <span className="px-2.5 py-0.5 rounded-md bg-blue-50 text-[#0052FF] font-bold text-xs">
                          Profissional Verificada
                        </span>
                      </div>
                      <p className="text-sm font-semibold text-slate-500">{selectedProfessional.title}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 bg-slate-50 p-3 rounded-2xl border border-slate-100">
                    <div className="flex items-center gap-1.5 text-amber-600 font-bold text-sm">
                      <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                      <span>{selectedProfessional.rating.toFixed(1)}</span>
                      <span className="text-slate-400 font-normal text-xs">
                        ({selectedProfessional.reviewsCount} avaliações)
                      </span>
                    </div>
                    <span className="text-slate-300">•</span>
                    <div className="flex items-center gap-1 text-slate-600 text-xs font-medium">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      <span>A {selectedProfessional.distanceKm} km</span>
                    </div>
                  </div>
                </div>

                {/* Bio text (Exact from screenshot) */}
                <div className="space-y-3 pt-2">
                  <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                    Sobre a Profissional
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed max-w-3xl">
                    {selectedProfessional.bio}
                  </p>
                </div>

                {/* 3 Key Badges */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6 pt-6 border-t border-slate-100">
                  <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-100 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-[#0052FF] flex items-center justify-center">
                      <Calendar className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[11px] text-slate-500 block font-medium">Experiência comprovada</span>
                      <strong className="text-sm text-slate-800 font-bold">
                        {selectedProfessional.experienceYears} anos no mercado
                      </strong>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-100 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-600 flex items-center justify-center">
                      <CreditCard className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[11px] text-slate-500 block font-medium">Formas de pagamento</span>
                      <strong className="text-sm text-slate-800 font-bold">Aceita PIX e Cartão</strong>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-indigo-50/60 border border-indigo-100 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-600 flex items-center justify-center">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[11px] text-slate-500 block font-medium">Dias disponíveis</span>
                      <strong className="text-sm text-slate-800 font-bold">{selectedProfessional.availableDays}</strong>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Services Offered Table */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-4">
              <h3 className="text-base font-bold text-slate-900">Serviços Oferecidos por {selectedProfessional.name}</h3>

              <div className="space-y-3">
                {selectedProfessional.services.map((svc) => (
                  <div
                    key={svc.id}
                    onClick={() => setSelectedServiceId(svc.id)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-4 ${
                      selectedServiceId === svc.id
                        ? 'border-[#0052FF] bg-blue-50/50 shadow-xs ring-1 ring-[#0052FF]'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">{svc.name}</h4>
                      <p className="text-xs text-slate-500 mt-0.5">{svc.description}</p>
                    </div>

                    <div className="text-right flex-shrink-0">
                      <span className="text-base font-black text-[#0052FF]">
                        R$ {svc.price.toFixed(2).replace('.', ',')}
                      </span>
                      <span className="text-[11px] text-slate-400 block">{svc.priceUnit}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Avaliações dos Clientes (Screen 6 Reviews) */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div>
                  <h3 className="text-base font-bold text-slate-900">Avaliações dos Clientes</h3>
                  <p className="text-xs text-slate-500 mt-0.5">Nota média calculada com base em 124 atendimentos reais</p>
                </div>
                <div className="flex items-center gap-2 bg-amber-50 px-3 py-1.5 rounded-xl border border-amber-100 text-amber-700 font-bold text-sm">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span>{selectedProfessional.rating.toFixed(1)} / 5.0</span>
                </div>
              </div>

              <div className="space-y-4">
                {selectedProfessional.reviews.map((rev) => (
                  <div key={rev.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <img
                          src={rev.authorAvatar}
                          alt={rev.authorName}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <div>
                          <h4 className="text-xs font-bold text-slate-900">{rev.authorName}</h4>
                          <span className="text-[10px] text-slate-400">{rev.date} • Contratação Verificada</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-1 text-xs font-bold text-amber-500">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        <span>{rev.rating.toFixed(1)}</span>
                      </div>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed italic pl-13">
                      "{rev.comment}"
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column (4 cols): Sticky Checkout / Booking Widget */}
          <div className="lg:col-span-4 sticky top-24 space-y-4">
            <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xl space-y-5">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Valor Total</span>
                  <div className="text-3xl font-black text-[#0052FF]">
                    R$ {currentPrice.toFixed(2).replace('.', ',')}
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold">
                  Preço Garantido
                </span>
              </div>

              {/* Data e Horário */}
              <div className="space-y-3">
                <label className="text-xs font-bold text-slate-900 block">Data e Horário</label>
                <div className="relative">
                  <select
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-medium text-slate-800 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-[#0052FF] cursor-pointer"
                  >
                    <option value="Hoje - 14/10/2026">Hoje - 14/10/2026</option>
                    <option value="Amanhã - 15/10/2026">Amanhã - 15/10/2026</option>
                    <option value="17/10/2026 (Sexta-feira)">17/10/2026 (Sexta-feira)</option>
                    <option value="18/10/2026 (Sábado)">18/10/2026 (Sábado)</option>
                    <option value="20/10/2026 (Segunda-feira)">20/10/2026 (Segunda-feira)</option>
                  </select>
                </div>

                <div className="relative">
                  <select
                    value={selectedTimeSlot}
                    onChange={(e) => setSelectedTimeSlot(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-medium text-slate-800 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-[#0052FF] cursor-pointer"
                  >
                    <option value="08:00 às 12:00 (Manhã)">08:00 às 12:00 (Manhã)</option>
                    <option value="13:00 às 17:00 (Tarde)">13:00 às 17:00 (Tarde)</option>
                    <option value="08:00 às 17:00 (Integral)">08:00 às 17:00 (Integral)</option>
                  </select>
                </div>
              </div>

              {/* Endereço */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-900 block">Endereço de Atendimento</label>
                <textarea
                  rows={2}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Rua, número, complemento, bairro..."
                  className="w-full p-3 rounded-xl border border-slate-200 text-xs text-slate-800 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-[#0052FF] resize-none"
                />
                <span className="text-[10px] text-slate-400 block">Você poderá ajustar com o profissional depois.</span>
              </div>

              {/* Forma de Pagamento */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-900 block">Forma de Pagamento</label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('pix')}
                    className={`py-2 px-1 rounded-xl border flex flex-col items-center justify-center text-center cursor-pointer transition-all ${
                      paymentMethod === 'pix'
                        ? 'border-[#0052FF] bg-blue-50 text-[#0052FF] font-bold'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <QrCode className="w-4 h-4 mb-1" />
                    <span className="text-[11px]">PIX</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`py-2 px-1 rounded-xl border flex flex-col items-center justify-center text-center cursor-pointer transition-all ${
                      paymentMethod === 'card'
                        ? 'border-[#0052FF] bg-blue-50 text-[#0052FF] font-bold'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <CreditCard className="w-4 h-4 mb-1" />
                    <span className="text-[11px]">Cartão</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('cash')}
                    className={`py-2 px-1 rounded-xl border flex flex-col items-center justify-center text-center cursor-pointer transition-all ${
                      paymentMethod === 'cash'
                        ? 'border-[#0052FF] bg-blue-50 text-[#0052FF] font-bold'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <Banknote className="w-4 h-4 mb-1" />
                    <span className="text-[11px]">Dinheiro</span>
                  </button>
                </div>
              </div>

              {/* Proteção OBBI */}
              <div className="p-3 rounded-2xl bg-blue-50 border border-blue-100 flex items-center gap-2 text-xs text-blue-900">
                <ShieldCheck className="w-4 h-4 text-[#0052FF] flex-shrink-0" />
                <span className="text-[11px]">
                  <strong>Garantia OBBI:</strong> Seu dinheiro protegido até o serviço ser finalizado.
                </span>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-2">
                <button
                  onClick={handleBooking}
                  disabled={isSubmitting}
                  className="w-full py-3.5 px-4 rounded-xl bg-[#0052FF] text-white font-bold text-sm shadow-md hover:bg-blue-600 active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75"
                >
                  {isSubmitting ? (
                    <span>Processando agendamento...</span>
                  ) : (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Confirmar Contratação Agora</span>
                    </>
                  )}
                </button>

                <button
                  onClick={handleChat}
                  className="w-full py-3 px-4 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 font-bold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4 text-[#0052FF]" />
                  <span>Tirar Dúvidas no Chat Primeiro</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
