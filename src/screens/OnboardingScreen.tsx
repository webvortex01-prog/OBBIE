import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { StatusBar } from '../components/Header';
import { Sparkles, Wrench, Droplet, Zap, ArrowRight, Shield, Check } from 'lucide-react';

export const OnboardingScreen: React.FC = () => {
  const { navigateTo } = useApp();
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: 'Encontre qualquer serviço ou profissional',
      subtitle: 'Do pequeno serviço do dia a dia ao trabalho especializado. Tudo em um só lugar.',
      image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=80',
      floatingIcons: [
        { icon: Droplet, label: 'Encanador', color: 'bg-cyan-500 text-white', pos: 'top-2 left-3' },
        { icon: Sparkles, label: 'Faxina', color: 'bg-blue-600 text-white', pos: 'top-8 right-2' },
        { icon: Wrench, label: 'Reparos', color: 'bg-amber-500 text-white', pos: 'bottom-6 left-2' },
        { icon: Zap, label: 'Elétrica', color: 'bg-indigo-600 text-white', pos: 'bottom-12 right-3' }
      ]
    },
    {
      title: 'Agende em poucos cliques com total segurança',
      subtitle: 'Escolha data, horário e pague pelo app com proteção garantida para o seu dinheiro.',
      image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=600&q=80',
      floatingIcons: [
        { icon: Shield, label: '100% Seguro', color: 'bg-emerald-500 text-white', pos: 'top-4 right-4' },
        { icon: Check, label: 'Garantia OBBI', color: 'bg-blue-600 text-white', pos: 'bottom-8 left-4' }
      ]
    },
    {
      title: 'Converse direto com o profissional',
      subtitle: 'Tire dúvidas, combine detalhes em tempo real pelo chat e receba orçamentos personalizados.',
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80',
      floatingIcons: [
        { icon: Sparkles, label: 'Chat Direto', color: 'bg-indigo-600 text-white', pos: 'top-6 left-4' }
      ]
    }
  ];

  const slide = slides[currentSlide];

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide((prev) => prev + 1);
    } else {
      navigateTo('home');
    }
  };

  return (
    <div className="flex flex-col justify-between min-h-full bg-white select-none">
      <StatusBar />

      {/* Main Illustration Area with Worker & Floating Badges */}
      <div className="relative px-6 pt-6 pb-2 flex flex-col items-center justify-center flex-1">
        <div className="relative w-64 h-64 sm:w-72 sm:h-72 flex items-center justify-center">
          {/* Circular background halo */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-blue-100 to-indigo-50 border-4 border-blue-50" />

          {/* Central worker photo */}
          <div className="relative w-52 h-52 sm:w-56 sm:h-56 rounded-full overflow-hidden shadow-xl ring-4 ring-white">
            <img
              src={slide.image}
              alt="Profissional OBBI"
              className="w-full h-full object-cover object-top"
            />
          </div>

          {/* Floating Category Badges */}
          {slide.floatingIcons.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className={`absolute ${item.pos} z-10 flex items-center gap-1.5 px-3 py-1.5 rounded-full ${item.color} shadow-lg text-xs font-semibold animate-pulse`}
                style={{ animationDuration: `${2.5 + idx * 0.5}s` }}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{item.label}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Content & Action Area */}
      <div className="px-6 pb-8 pt-4 text-center">
        <h2 className="text-2xl font-black text-slate-900 tracking-tight leading-tight">
          {slide.title}
        </h2>
        <p className="mt-3 text-sm text-slate-500 leading-relaxed max-w-xs mx-auto">
          {slide.subtitle}
        </p>

        {/* Carousel Dots */}
        <div className="flex items-center justify-center gap-2 my-6">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`h-2 rounded-full transition-all duration-300 ${
                currentSlide === idx ? 'w-7 bg-[#0052FF]' : 'w-2 bg-slate-200'
              }`}
              aria-label={`Slide ${idx + 1}`}
            />
          ))}
        </div>

        {/* Actions */}
        <div className="space-y-3 max-w-xs mx-auto">
          <button
            onClick={handleNext}
            className="w-full py-3.5 px-6 rounded-xl bg-[#0052FF] text-white font-bold text-sm shadow-md shadow-blue-500/25 hover:bg-blue-600 active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>{currentSlide === slides.length - 1 ? 'Começar' : 'Próximo'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => navigateTo('home')}
            className="w-full py-2 text-xs text-slate-500 hover:text-slate-800 transition-colors"
          >
            Já tem uma conta? <strong className="text-[#0052FF] font-bold">Entrar</strong>
          </button>
        </div>
      </div>
    </div>
  );
};
