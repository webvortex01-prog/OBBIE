import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { StatusBar, Header } from '../components/Header';
import { BottomNav } from '../components/BottomNav';
import {
  Wallet,
  ArrowUpRight,
  ArrowDownLeft,
  QrCode,
  CreditCard,
  Plus,
  ShieldCheck
} from 'lucide-react';

export const WalletScreen: React.FC = () => {
  const { currentUser, updateUserBalance, showToast } = useApp();
  const [depositAmount, setDepositAmount] = useState('');
  const [showDepositModal, setShowDepositModal] = useState(false);

  const handleDeposit = () => {
    const val = parseFloat(depositAmount.replace(',', '.'));
    if (isNaN(val) || val <= 0) {
      showToast('Digite um valor válido.');
      return;
    }
    updateUserBalance(val);
    showToast(`R$ ${val.toFixed(2)} adicionados via PIX com sucesso!`);
    setDepositAmount('');
    setShowDepositModal(false);
  };

  return (
    <div className="flex flex-col h-full bg-[#F8FAFC] select-none">
      <StatusBar />
      <Header title="Carteira" showBack={true} />

      <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
        {/* Balance Card */}
        <div className="rounded-2xl bg-gradient-to-tr from-[#0052FF] to-[#1E6BFF] text-white p-5 shadow-lg shadow-blue-500/20 relative overflow-hidden">
          <div className="relative z-10">
            <span className="text-xs text-blue-100 font-medium">Saldo disponível</span>
            <div className="text-3xl font-black mt-1">
              R$ {currentUser.balance.toFixed(2).replace('.', ',')}
            </div>

            <div className="flex items-center gap-2 mt-5">
              <button
                onClick={() => setShowDepositModal(true)}
                className="flex-1 py-2.5 px-4 rounded-xl bg-white text-[#0052FF] font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs hover:bg-blue-50 active:scale-95 transition-all cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Adicionar saldo</span>
              </button>

              <button
                onClick={() => showToast('Chave PIX copiada para recebimento!')}
                className="flex-1 py-2.5 px-4 rounded-xl bg-white/20 text-white font-bold text-xs flex items-center justify-center gap-1.5 hover:bg-white/30 active:scale-95 transition-all cursor-pointer"
              >
                <QrCode className="w-4 h-4" />
                <span>Receber PIX</span>
              </button>
            </div>
          </div>
        </div>

        {/* Protection Note */}
        <div className="p-3.5 bg-emerald-50 rounded-xl border border-emerald-100 flex items-center gap-2.5 text-xs text-emerald-800">
          <ShieldCheck className="w-5 h-5 text-emerald-600 flex-shrink-0" />
          <span>Seu saldo fica seguro com a garantia bancária e rendimento diário.</span>
        </div>

        {/* Recent Transactions */}
        <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-xs">
          <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
            Últimas movimentações
          </h4>

          <div className="space-y-3">
            <div className="flex items-center justify-between py-2 border-b border-slate-50">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
                <div>
                  <h5 className="text-xs font-bold text-slate-800">Pagamento - Ana Souza</h5>
                  <span className="text-[10px] text-slate-400">14/10/2026 • Faxina residencial</span>
                </div>
              </div>
              <span className="text-xs font-bold text-rose-600">- R$ 80,00</span>
            </div>

            <div className="flex items-center justify-between py-2 border-b border-slate-50">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <ArrowDownLeft className="w-4 h-4" />
                </div>
                <div>
                  <h5 className="text-xs font-bold text-slate-800">Depósito PIX Recebido</h5>
                  <span className="text-[10px] text-slate-400">11/10/2026 • Banco Inter</span>
                </div>
              </div>
              <span className="text-xs font-bold text-emerald-600">+ R$ 200,00</span>
            </div>

            <div className="flex items-center justify-between py-2">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
                  <CreditCard className="w-4 h-4" />
                </div>
                <div>
                  <h5 className="text-xs font-bold text-slate-800">Cashback OBBI</h5>
                  <span className="text-[10px] text-slate-400">05/10/2026 • Promoção</span>
                </div>
              </div>
              <span className="text-xs font-bold text-emerald-600">+ R$ 15,00</span>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de Depósito */}
      {showDepositModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/50" onClick={() => setShowDepositModal(false)} />
          <div className="relative bg-white rounded-2xl p-5 w-full max-w-xs shadow-xl z-10 space-y-4">
            <h3 className="text-sm font-bold text-slate-900">Adicionar saldo via PIX</h3>
            <p className="text-xs text-slate-500">
              Digite o valor que deseja adicionar à sua carteira:
            </p>

            <div className="relative">
              <span className="absolute left-3 top-2.5 text-xs font-bold text-slate-400">R$</span>
              <input
                type="number"
                placeholder="50,00"
                value={depositAmount}
                onChange={(e) => setDepositAmount(e.target.value)}
                className="w-full pl-9 pr-3 py-2 border rounded-xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-[#0052FF]"
              />
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setShowDepositModal(false)}
                className="flex-1 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl"
              >
                Cancelar
              </button>
              <button
                onClick={handleDeposit}
                className="flex-1 py-2 text-xs font-bold text-white bg-[#0052FF] hover:bg-blue-600 rounded-xl shadow-xs"
              >
                Confirmar PIX
              </button>
            </div>
          </div>
        </div>
      )}

      <BottomNav />
    </div>
  );
};
