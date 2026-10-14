import React from 'react';
import { useApp } from '../context/AppContext';
import { ObbiLogo } from '../components/ObbiLogo';
import { Sparkles, Wrench, Hammer, Briefcase, ArrowRight, ShieldCheck, Zap } from 'lucide-react';

export const SplashScreen: React.FC = () => {
  const { navigateTo } = useApp();

  return (
    <div className="relative flex flex-col justify-between min-h-full bg-gradient-to-b from-[#0052FF] via-[#0047E0] to-[#003BBF] text-white p-7 select-none overflow-hidden">
      {/* Background soft glow circles */}
      <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute bottom-10 -left-20 w-64 h-64 bg-blue-400/20 rounded-full blur-2xl pointer-events-none" />

      {/* Top branding section */}
      <div className="pt-16 flex flex-col items-center text-center z-10">
        <ObbiLogo variant="white" size="xl" showTagline={true} />
      </div>

      {/* Middle value propositions (Exact text from screen 1) */}
      <div className="space-y-6 my-auto z-10">
        <div className="bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/15 shadow-lg transform hover:scale-[1.02] transition-transform">
          <div className="flex items-center gap-3 mb-1">
            <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center text-white">
              <Sparkles className="w-4 h-4" />
            </div>
            <h3 className="font-bold text-lg text-white">Precisa de um serviço?</h3>
          </div>
          <p className="text-blue-100 text-sm ml-11">Aqui você encontra profissionais qualificados e avaliados pertinho de você.</p>
        </div>

        <div className="bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/15 shadow-lg transform hover:scale-[1.02] transition-transform">
          <div className="flex items-center gap-3 mb-1">
            <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center text-white">
              <Briefcase className="w-4 h-4" />
            </div>
            <h3 className="font-bold text-lg text-white">Tem um talento?</h3>
          </div>
          <p className="text-blue-100 text-sm ml-11">Aqui você trabalha, conquista novos clientes e recebe de forma rápida e segura.</p>
        </div>

        {/* Action Button */}
        <div className="pt-2">
          <button
            onClick={() => navigateTo('onboarding')}
            className="w-full py-4 px-6 rounded-2xl bg-white text-[#0052FF] font-bold text-base shadow-xl hover:bg-blue-50 active:scale-98 transition-all flex items-center justify-center gap-2 group cursor-pointer"
          >
            <span>Começar agora</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      {/* Bottom icons strip (cleaning spray, wrench, hammer, drill, bag) */}
      <div className="pt-6 pb-2 z-10 border-t border-white/15">
        <div className="flex items-center justify-around text-blue-200/90">
          <div className="flex flex-col items-center">
            <Sparkles className="w-6 h-6 stroke-[1.8]" />
            <span className="text-[10px] mt-1 text-blue-100 font-medium">Limpeza</span>
          </div>
          <div className="flex flex-col items-center">
            <Wrench className="w-6 h-6 stroke-[1.8]" />
            <span className="text-[10px] mt-1 text-blue-100 font-medium">Reparos</span>
          </div>
          <div className="flex flex-col items-center">
            <Hammer className="w-6 h-6 stroke-[1.8]" />
            <span className="text-[10px] mt-1 text-blue-100 font-medium">Obras</span>
          </div>
          <div className="flex flex-col items-center">
            <Zap className="w-6 h-6 stroke-[1.8]" />
            <span className="text-[10px] mt-1 text-blue-100 font-medium">Elétrica</span>
          </div>
          <div className="flex flex-col items-center">
            <ShieldCheck className="w-6 h-6 stroke-[1.8]" />
            <span className="text-[10px] mt-1 text-blue-100 font-medium">Segurança</span>
          </div>
        </div>
      </div>
    </div>
  );
};
