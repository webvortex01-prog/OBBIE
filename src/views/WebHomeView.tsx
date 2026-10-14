import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CategoryIcon } from '../components/CategoryIcon';
import {
  Search,
  MapPin,
  Star,
  ShieldCheck,
  ArrowRight,
  CheckCircle2,
  Calendar,
  MessageSquare,
  Sparkles,
  Users,
  Award,
  ChevronRight,
  CreditCard
} from 'lucide-react';

export const WebHomeView: React.FC = () => {
  const {
    categories,
    professionals,
    selectCategoryById,
    selectProfessionalById,
    navigateTo,
    globalSearchQuery,
    setGlobalSearchQuery,
    setPublishModalOpen,
    setActiveChatProfessionalId
  } = useApp();

  const [selectedCity, setSelectedCity] = useState('São Paulo - SP');

  const handleCategoryClick = (catId: string) => {
    selectCategoryById(catId);
    navigateTo('category_listings');
  };

  const handleProClick = (proId: string) => {
    selectProfessionalById(proId);
    navigateTo('professional_profile');
  };

  const handleChatClick = (proId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    selectProfessionalById(proId);
    setActiveChatProfessionalId(proId);
    navigateTo('chat');
  };

  const handleBookClick = (proId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    selectProfessionalById(proId);
    navigateTo('booking');
  };

  return (
    <div className="bg-slate-50 min-h-screen text-slate-800">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#040D1E] via-[#071739] to-[#0A2255] text-white pt-12 pb-20 lg:pt-20 lg:pb-28">
        {/* Glow ambient background effects */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#0052FF]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-blue-400/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Headlines & Search Widget */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/15 border border-blue-400/30 text-blue-300 text-xs font-bold tracking-wide">
                <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                <span>OBBI: SERVIÇOS QUE CONECTAM PESSOAS</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight text-white">
                Encontre qualquer serviço ou profissional perto de você.
              </h1>

              <p className="text-sm sm:text-base text-slate-300 max-w-xl leading-relaxed">
                Do pequeno serviço do dia a dia ao trabalho especializado. Tudo em um só lugar com garantia, rapidez e pagamento seguro via PIX.
              </p>

              {/* Comprehensive Search Box (Desktop) */}
              <div className="bg-white rounded-2xl p-2.5 shadow-2xl text-slate-800 border border-slate-100 flex flex-col md:flex-row items-stretch gap-2">
                <div className="flex-1 flex items-center gap-2.5 px-3 py-2 border-b md:border-b-0 md:border-r border-slate-100">
                  <Search className="w-5 h-5 text-slate-400 flex-shrink-0" />
                  <input
                    type="text"
                    placeholder="Qual serviço você precisa? (ex: Faxina, Elétrica)"
                    value={globalSearchQuery}
                    onChange={(e) => setGlobalSearchQuery(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') navigateTo('category_listings');
                    }}
                    className="w-full text-xs sm:text-sm font-medium text-slate-800 placeholder-slate-400 focus:outline-none"
                  />
                </div>

                <div className="flex items-center gap-2 px-3 py-2 border-b md:border-b-0 md:border-r border-slate-100 min-w-[170px]">
                  <MapPin className="w-4 h-4 text-[#0052FF] flex-shrink-0" />
                  <select
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                    className="w-full text-xs font-semibold text-slate-700 bg-transparent focus:outline-none cursor-pointer"
                  >
                    <option value="São Paulo - SP">São Paulo - SP</option>
                    <option value="Rio de Janeiro - RJ">Rio de Janeiro - RJ</option>
                    <option value="Belo Horizonte - MG">Belo Horizonte - MG</option>
                    <option value="Curitiba - PR">Curitiba - PR</option>
                  </select>
                </div>

                <button
                  onClick={() => navigateTo('category_listings')}
                  className="px-6 py-3.5 rounded-xl bg-[#0052FF] text-white font-bold text-xs sm:text-sm hover:bg-blue-600 active:scale-95 transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer flex-shrink-0"
                >
                  <span>Buscar Profissionais</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* Quick tags */}
              <div className="flex flex-wrap items-center gap-2 pt-1 text-xs text-slate-300">
                <span className="font-semibold text-slate-400">Populares:</span>
                {['Faxina Residencial', 'Eletricista', 'Encanador', 'Jardinagem', 'Pintura'].map((tag) => (
                  <button
                    key={tag}
                    onClick={() => {
                      setGlobalSearchQuery(tag);
                      navigateTo('category_listings');
                    }}
                    className="px-3 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-slate-200 transition-colors cursor-pointer text-[11px] font-medium"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Right Column: Interactive Featured Card matching the Mobile Hero */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-md">
                {/* Background decorative ring */}
                <div className="absolute -inset-1.5 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-3xl blur-lg opacity-30" />

                <div className="relative bg-slate-900/90 backdrop-blur-xl rounded-3xl border border-white/15 p-6 shadow-2xl text-white">
                  <div className="flex items-center justify-between pb-4 border-b border-white/10">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <img
                          src={professionals[0].avatar}
                          alt={professionals[0].name}
                          className="w-14 h-14 rounded-full object-cover ring-2 ring-[#0052FF]"
                        />
                        <span className="absolute bottom-0 right-0 w-4 h-4 bg-emerald-500 rounded-full border-2 border-slate-900" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold text-base text-white">{professionals[0].name}</h3>
                          <span className="px-2 py-0.5 rounded-md bg-blue-500/20 text-blue-300 text-[10px] font-bold">
                            Verificada
                          </span>
                        </div>
                        <p className="text-xs text-slate-400">{professionals[0].title}</p>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="flex items-center gap-1 text-amber-400 font-bold text-xs">
                        <Star className="w-3.5 h-3.5 fill-amber-400" />
                        <span>{professionals[0].rating.toFixed(1)}</span>
                      </div>
                      <span className="text-[10px] text-slate-400">(124 avaliações)</span>
                    </div>
                  </div>

                  <p className="mt-4 text-xs text-slate-300 leading-relaxed italic">
                    "{professionals[0].bio}"
                  </p>

                  <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-white/10 text-center text-xs">
                    <div className="bg-white/5 p-2 rounded-xl">
                      <span className="text-slate-400 text-[10px] block">Distância</span>
                      <strong className="text-white font-bold">{professionals[0].distanceKm} km</strong>
                    </div>
                    <div className="bg-white/5 p-2 rounded-xl">
                      <span className="text-slate-400 text-[10px] block">Diária</span>
                      <strong className="text-blue-400 font-bold">R$ {professionals[0].price.toFixed(0)}</strong>
                    </div>
                    <div className="bg-white/5 p-2 rounded-xl">
                      <span className="text-slate-400 text-[10px] block">Aceita</span>
                      <strong className="text-emerald-400 font-bold">PIX e Cartão</strong>
                    </div>
                  </div>

                  <div className="mt-5 flex gap-2">
                    <button
                      onClick={(e) => handleBookClick(professionals[0].id, e)}
                      className="flex-1 py-3 rounded-xl bg-[#0052FF] text-white font-bold text-xs hover:bg-blue-600 transition-colors shadow-md flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Calendar className="w-4 h-4" />
                      <span>Agendar Serviço</span>
                    </button>
                    <button
                      onClick={(e) => handleChatClick(professionals[0].id, e)}
                      className="px-4 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                      title="Conversar no Chat"
                    >
                      <MessageSquare className="w-4 h-4 text-blue-400" />
                      <span>Chat</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. CATEGORIAS EM DESTAQUE (Grid com as 8 categorias do mockup) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20">
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-100">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                Categorias em Destaque
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Encontre o especialista ideal para qualquer demanda da sua casa ou empresa
              </p>
            </div>

            <button
              onClick={() => navigateTo('category_listings')}
              className="text-xs sm:text-sm font-bold text-[#0052FF] hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>Ver todas as categorias</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleCategoryClick(cat.id)}
                className="flex flex-col items-center p-3.5 rounded-2xl border border-slate-100 hover:border-blue-200 hover:shadow-md hover:scale-105 transition-all text-center group cursor-pointer bg-slate-50/50"
              >
                <div
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 mb-2 ${cat.iconBgColor}`}
                >
                  <CategoryIcon name={cat.iconName} className="w-6 h-6" />
                </div>
                <h4 className="text-xs font-bold text-slate-800 group-hover:text-[#0052FF] transition-colors line-clamp-1">
                  {cat.name}
                </h4>
                <span className="text-[10px] text-slate-400 mt-0.5 line-clamp-1">
                  {cat.subcategories[1] || 'Serviços'}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 3. PROFISSIONAIS EM DESTAQUE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-1 text-xs font-bold text-[#0052FF] uppercase tracking-wider mb-1">
              <Award className="w-3.5 h-3.5" />
              <span>Profissionais Avaliados</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Os Mais Bem Avaliados na sua Região
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Contrate com segurança, converse no chat e pague somente após o serviço realizado
            </p>
          </div>

          <button
            onClick={() => navigateTo('category_listings')}
            className="self-start md:self-auto px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <span>Ver todos os profissionais</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Professional Cards Grid (Desktop 3 columns) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {professionals.map((prof) => (
            <div
              key={prof.id}
              onClick={() => handleProClick(prof.id)}
              className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl hover:border-blue-200 transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div>
                {/* Cover Image */}
                <div className="relative h-40 w-full overflow-hidden bg-slate-100">
                  <img
                    src={prof.coverImage}
                    alt={prof.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

                  {/* Rating badge */}
                  <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-xs text-xs font-bold text-slate-800 flex items-center gap-1 shadow-xs">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>{prof.rating.toFixed(1)}</span>
                    <span className="text-slate-400 font-normal">({prof.reviewsCount})</span>
                  </div>

                  {/* Distance */}
                  <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-xs text-xs font-semibold text-white flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-blue-300" />
                    <span>A {prof.distanceKm} km de você</span>
                  </div>
                </div>

                {/* Profile Header Details */}
                <div className="p-5">
                  <div className="flex items-start gap-3.5">
                    <div className="relative -mt-9">
                      <img
                        src={prof.avatar}
                        alt={prof.name}
                        className="w-14 h-14 rounded-full object-cover ring-4 ring-white shadow-md"
                      />
                      {prof.verified && (
                        <span className="absolute bottom-0 right-0 w-4 h-4 bg-[#0052FF] text-white rounded-full flex items-center justify-center text-[9px] font-bold ring-2 ring-white">
                          ✓
                        </span>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="text-base font-extrabold text-slate-900 group-hover:text-[#0052FF] transition-colors truncate">
                        {prof.name}
                      </h3>
                      <p className="text-xs text-slate-500 font-medium truncate">{prof.title}</p>
                    </div>
                  </div>

                  <p className="mt-3 text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {prof.bio}
                  </p>

                  {/* Tags */}
                  <div className="flex items-center gap-2 mt-4 text-[11px] text-slate-500">
                    <span className="px-2 py-1 rounded-md bg-slate-50 border border-slate-100">
                      {prof.experienceYears} anos de exp.
                    </span>
                    <span className="px-2 py-1 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-100 font-medium">
                      PIX e Cartão
                    </span>
                    <span className="px-2 py-1 rounded-md bg-slate-50 border border-slate-100">
                      {prof.availableDays}
                    </span>
                  </div>
                </div>
              </div>

              {/* Card Footer with Price and Buttons */}
              <div className="p-5 pt-3 border-t border-slate-100 bg-slate-50/60 flex items-center justify-between gap-3">
                <div>
                  <span className="text-[10px] text-slate-400 block font-medium">A partir de</span>
                  <div className="text-base font-black text-[#0052FF]">
                    R$ {prof.price.toFixed(2).replace('.', ',')}
                    <span className="text-[10px] text-slate-500 font-normal ml-1">
                      /{prof.priceUnit.replace('por ', '')}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => handleChatClick(prof.id, e)}
                    className="p-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 hover:text-[#0052FF] hover:border-blue-200 transition-colors cursor-pointer"
                    title="Conversar no Chat"
                  >
                    <MessageSquare className="w-4 h-4" />
                  </button>

                  <button
                    onClick={(e) => handleBookClick(prof.id, e)}
                    className="px-4 py-2.5 rounded-xl bg-[#0052FF] text-white text-xs font-bold hover:bg-blue-600 transition-colors shadow-xs cursor-pointer"
                  >
                    Contratar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. COMO FUNCIONA O OBBI */}
      <section className="bg-white py-16 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Como Funciona o OBBI
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-2">
              Contratar um serviço nunca foi tão seguro, rápido e transparente.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            <div className="flex flex-col items-center text-center p-6 rounded-3xl bg-slate-50 border border-slate-100">
              <div className="w-16 h-16 rounded-2xl bg-blue-100 text-[#0052FF] font-black text-xl flex items-center justify-center mb-4">
                01
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">
                Escolha o serviço ou profissional
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Navegue pelas categorias ou busque diretamente o serviço desejado, conferindo avaliações e fotos de trabalhos anteriores.
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-6 rounded-3xl bg-slate-50 border border-slate-100">
              <div className="w-16 h-16 rounded-2xl bg-indigo-100 text-indigo-600 font-black text-xl flex items-center justify-center mb-4">
                02
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">
                Combine tudo pelo Chat em tempo real
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Tire dúvidas, envie fotos do local, defina o dia e horário e receba orçamentos personalizados sem expor seu telefone.
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-6 rounded-3xl bg-slate-50 border border-slate-100">
              <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-600 font-black text-xl flex items-center justify-center mb-4">
                03
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">
                Pagamento 100% Protegido via PIX
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                O valor fica retido no aplicativo e só é liberado para o profissional após você confirmar que o serviço foi concluído com perfeição.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. AVALIAÇÕES DE CLIENTES REAIS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Quem Usa o OBBI Recomenda
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-2">
            Veja o que clientes reais dizem sobre a pontualidade e dedicação dos profissionais.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-1 text-amber-400 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <p className="text-xs text-slate-700 leading-relaxed italic">
                "Excelente profissional! Muito atenciosa e caprichosa. Contratei a Ana Souza para faxina geral e meu apartamento ficou impecável. Super recomendo!"
              </p>
            </div>
            <div className="flex items-center gap-3 mt-6 pt-4 border-t border-slate-100">
              <img
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80"
                alt="Mariana Costa"
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <h4 className="text-xs font-bold text-slate-900">Mariana Costa</h4>
                <span className="text-[10px] text-slate-400">Cliente • São Paulo - SP</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-1 text-amber-400 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <p className="text-xs text-slate-700 leading-relaxed italic">
                "O Carlos Lima veio consertar o vazamento no encanamento do banheiro. Chegou em 25 minutos, resolveu o problema e o preço foi super justo. Sensacional!"
              </p>
            </div>
            <div className="flex items-center gap-3 mt-6 pt-4 border-t border-slate-100">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80"
                alt="Rodrigo Albuquerque"
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <h4 className="text-xs font-bold text-slate-900">Rodrigo Albuquerque</h4>
                <span className="text-[10px] text-slate-400">Cliente • Bela Vista</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-1 text-amber-400 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <p className="text-xs text-slate-700 leading-relaxed italic">
                "A facilidade de pagar pelo PIX com garantia é o maior diferencial. Nunca mais tive medo de contratar prestador de serviço na internet."
              </p>
            </div>
            <div className="flex items-center gap-3 mt-6 pt-4 border-t border-slate-100">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
                alt="Carla Nogueira"
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <h4 className="text-xs font-bold text-slate-900">Carla Nogueira</h4>
                <span className="text-[10px] text-slate-400">Cliente • Pinheiros</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. BANNER PARA PROFISSIONAIS / TRABALHE NO OBBI */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="rounded-3xl bg-gradient-to-r from-[#0052FF] to-[#0D47A1] text-white p-8 sm:p-12 shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-xl space-y-3">
            <span className="px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold uppercase tracking-wider">
              Para Autônomos e Profissionais
            </span>
            <h2 className="text-2xl sm:text-3xl font-black">
              Você tem um talento? Aqui você conquista clientes todos os dias.
            </h2>
            <p className="text-xs sm:text-sm text-blue-100 leading-relaxed">
              Receba chamados direto no seu celular, defina seus próprios preços e receba seus pagamentos com segurança no mesmo dia via PIX.
            </p>
          </div>

          <button
            onClick={() => setPublishModalOpen(true)}
            className="px-8 py-4 rounded-2xl bg-white text-[#0052FF] font-extrabold text-sm hover:bg-blue-50 active:scale-95 transition-all shadow-lg flex-shrink-0 cursor-pointer"
          >
            Quero Ser um Profissional OBBI
          </button>
        </div>
      </section>
    </div>
  );
};
