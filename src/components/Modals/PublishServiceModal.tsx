import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Sparkles, CheckCircle2, DollarSign, MapPin, Tag } from 'lucide-react';

export const PublishServiceModal: React.FC = () => {
  const { publishModalOpen, setPublishModalOpen, showToast, categories } = useApp();
  const [mode, setMode] = useState<'request' | 'offer'>('request');
  const [title, setTitle] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(categories[0]?.id || 'faxina');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');

  if (!publishModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      showToast('Por favor, informe o título do serviço.');
      return;
    }

    showToast(
      mode === 'request'
        ? 'Solicitação de serviço publicada com sucesso! Profissionais próximos serão notificados.'
        : 'Novo serviço anunciado no seu perfil profissional com sucesso!'
    );
    setPublishModalOpen(false);
    setTitle('');
    setPrice('');
    setDescription('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={() => setPublishModalOpen(false)}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-md bg-white rounded-t-3xl sm:rounded-2xl p-6 shadow-2xl z-10 animate-in slide-in-from-bottom duration-200">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-blue-50 text-[#0052FF] flex items-center justify-center font-bold">
              +
            </div>
            <h3 className="font-extrabold text-slate-900 text-base">
              {mode === 'request' ? 'Pedir um Orçamento' : 'Anunciar Novo Serviço'}
            </h3>
          </div>

          <button
            onClick={() => setPublishModalOpen(false)}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100"
            aria-label="Fechar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Mode selector pills */}
        <div className="flex bg-slate-100 p-1 rounded-xl my-4 text-xs font-bold">
          <button
            type="button"
            onClick={() => setMode('request')}
            className={`flex-1 py-2 rounded-lg transition-all ${
              mode === 'request'
                ? 'bg-white text-[#0052FF] shadow-xs'
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            Preciso de um serviço
          </button>
          <button
            type="button"
            onClick={() => setMode('offer')}
            className={`flex-1 py-2 rounded-lg transition-all ${
              mode === 'offer'
                ? 'bg-white text-[#0052FF] shadow-xs'
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            Quero oferecer um serviço
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
          <div>
            <label className="block text-slate-600 font-bold mb-1">
              {mode === 'request' ? 'O que você precisa?' : 'Nome do serviço prestado'}
            </label>
            <input
              type="text"
              required
              placeholder={mode === 'request' ? 'Ex: Faxina residencial completa com foco na cozinha' : 'Ex: Troca de fiação e reparo de chuveiro'}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0052FF]"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-600 font-bold mb-1">Categoria</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0052FF]"
              >
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-slate-600 font-bold mb-1">
                {mode === 'request' ? 'Orçamento sugerido' : 'Valor cobrado'}
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-slate-400 font-bold">R$</span>
                <input
                  type="number"
                  placeholder="80,00"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0052FF]"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-slate-600 font-bold mb-1">Detalhes e observações</label>
            <textarea
              rows={3}
              placeholder="Descreva detalhes como urgência, tamanho do imóvel ou materiais..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-3 rounded-xl border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0052FF] resize-none"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3.5 px-4 rounded-xl bg-[#0052FF] text-white font-bold text-sm shadow-md hover:bg-blue-600 active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>{mode === 'request' ? 'Publicar Pedido' : 'Anunciar Serviço'}</span>
          </button>
        </form>
      </div>
    </div>
  );
};
