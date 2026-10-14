import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Wallet,
  ArrowUpRight,
  ArrowDownLeft,
  QrCode,
  Plus,
  ShieldCheck,
  CreditCard,
  Copy,
  CheckCircle2
} from 'lucide-react';

export const WebWalletView: React.FC = () => {
  const { currentUser, updateUserBalance, showToast } = useApp();
  const [depositAmount, setDepositAmount] = useState('100');
  const [showPixModal, setShowPixModal] = useState(false);

  const handleConfirmDeposit = () => {
    const val = parseFloat(depositAmount.replace(',', '.'));
    if (isNaN(val) || val <= 0) {
      showToast('Digite um valor válido.');
      return;
    }
    updateUserBalance(val);
    setShowPixModal(false);
    showToast(`R$ ${val.toFixed(2)} adicionados via PIX com sucesso!`);
  };

  const copyPixKey = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText('pix-obbi-financeiro-gustavo-2026@obbi.com.br');
    }
    showToast('Chave PIX copiada para a área de transferência!');
  };

  return (
    <div className="bg-slate-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Carteira Digital OBBI
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Gerencie seu saldo, adicione fundos via PIX e consulte comprovantes de pagamento
          </p>
        </div>

        {/* 2-Column Grid: Balance & Quick Deposit */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Balance Card (Gradient Blue) */}
          <div className="lg:col-span-2 bg-gradient-to-tr from-[#0052FF] via-[#0A47D0] to-[#042878] rounded-3xl p-8 text-white shadow-xl relative overflow-hidden flex flex-col justify-between min-h-[220px]">
            <div className="relative z-10 flex items-start justify-between">
              <div>
                <span className="text-xs font-semibold text-blue-200 uppercase tracking-wider block">
                  Saldo em Conta
                </span>
                <div className="text-4xl sm:text-5xl font-black mt-2 tracking-tight">
                  R$ {currentUser.balance.toFixed(2).replace('.', ',')}
                </div>
              </div>

              <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-xs flex items-center justify-center">
                <Wallet className="w-6 h-6 text-white" />
              </div>
            </div>

            <div className="relative z-10 flex flex-wrap items-center gap-3 mt-8">
              <button
                onClick={() => setShowPixModal(true)}
                className="px-5 py-3 rounded-xl bg-white text-[#0052FF] font-bold text-xs hover:bg-blue-50 active:scale-95 transition-all shadow-md flex items-center gap-2 cursor-pointer"
              >
                <Plus className="w-4 h-4 stroke-[2.5]" />
                <span>Adicionar Saldo com PIX</span>
              </button>

              <button
                onClick={copyPixKey}
                className="px-4 py-3 rounded-xl bg-white/15 hover:bg-white/25 text-white font-bold text-xs transition-colors flex items-center gap-2 cursor-pointer"
              >
                <QrCode className="w-4 h-4" />
                <span>Copiar Chave PIX</span>
              </button>
            </div>
          </div>

          {/* Protection Card */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">Garantia Financeira OBBI</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Ao contratar um profissional, o valor permanece seguro na sua carteira até você autorizar a liberação após o término do serviço.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-400">Rendimento diário:</span>
              <strong className="text-emerald-600 font-bold">100% do CDI</strong>
            </div>
          </div>
        </div>

        {/* Transactions Table */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-4">
          <h2 className="text-lg font-black text-slate-900">Histórico de Transações</h2>

          <div className="divide-y divide-slate-100">
            <div className="py-4 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center">
                  <ArrowUpRight className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Pagamento de Serviço — Ana Souza</h4>
                  <span className="text-[11px] text-slate-400">14/10/2026 às 09:30 • Faxina Residencial</span>
                </div>
              </div>
              <span className="text-sm font-black text-rose-600">- R$ 80,00</span>
            </div>

            <div className="py-4 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <ArrowDownLeft className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Depósito PIX Recebido</h4>
                  <span className="text-[11px] text-slate-400">11/10/2026 às 14:15 • Banco Inter</span>
                </div>
              </div>
              <span className="text-sm font-black text-emerald-600">+ R$ 200,00</span>
            </div>

            <div className="py-4 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-2xl bg-blue-50 text-[#0052FF] flex items-center justify-center">
                  <CreditCard className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Cashback Promocional OBBI</h4>
                  <span className="text-[11px] text-slate-400">05/10/2026 às 18:00 • Campanha Novos Usuários</span>
                </div>
              </div>
              <span className="text-sm font-black text-emerald-600">+ R$ 15,00</span>
            </div>
          </div>
        </div>
      </div>

      {/* Modal PIX */}
      {showPixModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full space-y-4 shadow-2xl text-center">
            <h3 className="text-base font-bold text-slate-900">Adicionar Saldo via PIX</h3>
            <p className="text-xs text-slate-500">
              Digite o valor que deseja transferir para a sua conta OBBI:
            </p>

            <div className="relative">
              <span className="absolute left-3 top-2.5 font-bold text-slate-400 text-sm">R$</span>
              <input
                type="number"
                value={depositAmount}
                onChange={(e) => setDepositAmount(e.target.value)}
                className="w-full pl-10 pr-3 py-2 rounded-xl border border-slate-200 text-lg font-black text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0052FF]"
              />
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-center">
              <QrCode className="w-24 h-24 text-slate-800" />
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setShowPixModal(false)}
                className="flex-1 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50"
              >
                Cancelar
              </button>
              <button
                onClick={handleConfirmDeposit}
                className="flex-1 py-2.5 rounded-xl bg-[#0052FF] text-white text-xs font-bold hover:bg-blue-600"
              >
                Confirmar PIX
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
