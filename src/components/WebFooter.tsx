import React from 'react';
import { useApp } from '../context/AppContext';
import { ObbiLogo } from './ObbiLogo';
import {
  Briefcase,
  ShoppingBag,
  ShieldCheck,
  Zap,
  Heart,
  Instagram,
  Facebook,
  Linkedin,
  PhoneCall,
  Mail
} from 'lucide-react';

export const WebFooter: React.FC = () => {
  const { categories, selectCategoryById, navigateTo } = useApp();

  return (
    <footer className="bg-[#040D1E] text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Value Proposition 4 Pillars (from image) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pb-12 border-b border-slate-800">
          <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-white/5 border border-white/5">
            <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-[#0052FF] flex items-center justify-center flex-shrink-0">
              <Briefcase className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Mais oportunidades</h4>
              <p className="text-xs text-slate-400 mt-0.5">para quem precisa trabalhar e conquistar renda</p>
            </div>
          </div>

          <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-white/5 border border-white/5">
            <div className="w-10 h-10 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center flex-shrink-0">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Mais praticidade</h4>
              <p className="text-xs text-slate-400 mt-0.5">para quem precisa de um serviço ágil e de qualidade</p>
            </div>
          </div>

          <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-white/5 border border-white/5">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center flex-shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Segurança e confiança</h4>
              <p className="text-xs text-slate-400 mt-0.5">em todas as contratações com a Garantia OBBI</p>
            </div>
          </div>

          <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-white/5 border border-white/5">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center flex-shrink-0">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Rápido, fácil e direto</h4>
              <p className="text-xs text-slate-400 mt-0.5">pelo site e aplicativo sem burocracia</p>
            </div>
          </div>
        </div>

        {/* Brand & Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 py-12">
          {/* Brand Column */}
          <div className="md:col-span-2 space-y-4">
            <ObbiLogo variant="white" size="md" showTagline={true} />
            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              O OBBI é o ecossistema brasileiro de serviços que conecta quem precisa de soluções práticas aos profissionais mais qualificados e bem avaliados da região.
            </p>
            <div className="pt-2">
              <span className="text-base font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-300 italic">
                Juntos geramos mais!
              </span>
            </div>
          </div>

          {/* Categorias Populares */}
          <div className="space-y-3">
            <h5 className="text-xs font-bold text-white uppercase tracking-wider">Categorias</h5>
            <ul className="space-y-2 text-xs text-slate-400">
              {categories.slice(0, 5).map((cat) => (
                <li key={cat.id}>
                  <button
                    onClick={() => {
                      selectCategoryById(cat.id);
                      navigateTo('category_listings');
                    }}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    {cat.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Para Profissionais */}
          <div className="space-y-3">
            <h5 className="text-xs font-bold text-white uppercase tracking-wider">Trabalhe Conosco</h5>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button
                  onClick={() => navigateTo('worker_profile')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Perfil do Profissional
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('wallet')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Como Receber com PIX
                </button>
              </li>
              <li>
                <span className="text-slate-500">Central de Segurança</span>
              </li>
              <li>
                <span className="text-slate-500">Garantia OBBI Protege</span>
              </li>
            </ul>
          </div>

          {/* Atendimento e Suporte */}
          <div className="space-y-3">
            <h5 className="text-xs font-bold text-white uppercase tracking-wider">Suporte</h5>
            <div className="space-y-2 text-xs text-slate-400">
              <p className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-blue-400" />
                <span>suporte@obbi.com.br</span>
              </p>
              <p className="flex items-center gap-2">
                <PhoneCall className="w-3.5 h-3.5 text-emerald-400" />
                <span>0800 123 4567</span>
              </p>
              <p className="text-[11px] text-slate-500 pt-1">
                Atendimento de Segunda a Sábado das 08h às 20h
              </p>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} OBBI Serviços Que Conectam Pessoas. Todos os direitos reservados.</p>
          <div className="flex items-center gap-4">
            <span className="hover:text-slate-400 cursor-pointer">Termos de Uso</span>
            <span>·</span>
            <span className="hover:text-slate-400 cursor-pointer">Privacidade</span>
            <span>·</span>
            <span className="hover:text-slate-400 cursor-pointer">Código de Conduta</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
