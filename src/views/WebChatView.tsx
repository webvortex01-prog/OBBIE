import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import {
  Send,
  Phone,
  Video,
  Smile,
  Paperclip,
  Calendar,
  CreditCard,
  CheckCheck,
  Check,
  Search,
  MoreVertical,
  ArrowLeft
} from 'lucide-react';

export const WebChatView: React.FC = () => {
  const {
    professionals,
    selectedProfessional,
    selectProfessionalById,
    chatMessages,
    sendMessage,
    activeChatProfessionalId,
    setActiveChatProfessionalId,
    openCallModal,
    navigateTo
  } = useApp();

  const [inputText, setInputText] = useState('');
  const [searchContact, setSearchContact] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const activePro =
    professionals.find((p) => p.id === activeChatProfessionalId) || selectedProfessional;

  const currentThread = chatMessages[activeChatProfessionalId] || [];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [currentThread]);

  const handleSend = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputText.trim()) return;
    sendMessage(activeChatProfessionalId, inputText);
    setInputText('');
  };

  const handleSelectContact = (id: string) => {
    setActiveChatProfessionalId(id);
    selectProfessionalById(id);
  };

  return (
    <div className="bg-slate-100 min-h-[calc(100vh-112px)] flex items-stretch">
      <div className="max-w-7xl mx-auto w-full my-4 px-4 sm:px-6 lg:px-8 flex-1 flex flex-col">
        {/* Main Messenger Box */}
        <div className="bg-white rounded-3xl shadow-xl border border-slate-200/80 flex-1 flex overflow-hidden max-h-[82vh]">
          {/* Left Column: Conversations List (35%) */}
          <div className="w-full sm:w-80 lg:w-96 border-r border-slate-200 flex flex-col bg-slate-50/50">
            {/* Header */}
            <div className="p-4 bg-white border-b border-slate-200">
              <h2 className="text-base font-black text-slate-900">Minhas Conversas</h2>
              <div className="relative mt-2">
                <Search className="absolute left-3 top-2.5 w-3.5 h-3.5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Buscar contato ou conversa..."
                  value={searchContact}
                  onChange={(e) => setSearchContact(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-slate-100 border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-[#0052FF]"
                />
              </div>
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto divide-y divide-slate-100">
              {professionals.map((prof) => {
                const isSelected = prof.id === activeChatProfessionalId;
                const msgs = chatMessages[prof.id] || [];
                const lastMsg = msgs[msgs.length - 1];

                return (
                  <button
                    key={prof.id}
                    onClick={() => handleSelectContact(prof.id)}
                    className={`w-full p-4 flex items-center gap-3 text-left transition-colors cursor-pointer ${
                      isSelected ? 'bg-blue-50/80 border-r-4 border-r-[#0052FF]' : 'hover:bg-white'
                    }`}
                  >
                    <div className="relative flex-shrink-0">
                      <img
                        src={prof.avatar}
                        alt={prof.name}
                        className="w-12 h-12 rounded-full object-cover ring-2 ring-white"
                      />
                      <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h4 className="text-xs font-bold text-slate-900 truncate">{prof.name}</h4>
                        <span className="text-[10px] text-slate-400">
                          {lastMsg ? lastMsg.time : '12:00'}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 font-medium truncate">{prof.title}</p>
                      <p className="text-[11px] text-slate-400 truncate mt-0.5">
                        {lastMsg ? lastMsg.text : 'Iniciar conversa...'}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Active Conversation (65%) */}
          <div className="flex-1 flex flex-col bg-[#F3F6FB] min-w-0">
            {/* Chat Top Bar */}
            <div className="px-6 py-3.5 bg-white border-b border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <img
                    src={activePro.avatar}
                    alt={activePro.name}
                    className="w-10 h-10 rounded-full object-cover ring-2 ring-slate-100"
                  />
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-white" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">{activePro.name}</h3>
                  <div className="flex items-center gap-2 text-[11px]">
                    <span className="text-emerald-600 font-semibold">Online agora</span>
                    <span className="text-slate-300">•</span>
                    <span className="text-slate-400">{activePro.title}</span>
                  </div>
                </div>
              </div>

              {/* Call buttons & Direct Booking */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => openCallModal('voice', activePro)}
                  className="p-2.5 rounded-xl bg-slate-50 hover:bg-blue-50 text-slate-600 hover:text-[#0052FF] transition-colors cursor-pointer"
                  title="Chamada de Voz"
                >
                  <Phone className="w-4 h-4" />
                </button>

                <button
                  onClick={() => openCallModal('video', activePro)}
                  className="p-2.5 rounded-xl bg-slate-50 hover:bg-blue-50 text-slate-600 hover:text-[#0052FF] transition-colors cursor-pointer"
                  title="Chamada de Vídeo HD"
                >
                  <Video className="w-4 h-4" />
                </button>

                <button
                  onClick={() => {
                    selectProfessionalById(activePro.id);
                    navigateTo('booking');
                  }}
                  className="ml-2 px-3.5 py-2 rounded-xl bg-[#0052FF] text-white text-xs font-bold hover:bg-blue-600 transition-colors shadow-xs flex items-center gap-1.5 cursor-pointer"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Agendar Serviço</span>
                </button>
              </div>
            </div>

            {/* Messages Thread (Screen 8 messages) */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              <div className="flex justify-center mb-4">
                <span className="px-3.5 py-1 rounded-full bg-white text-[11px] font-semibold text-slate-500 shadow-2xs border border-slate-200/60">
                  Hoje • Conversa protegida pelo OBBI
                </span>
              </div>

              {currentThread.map((msg) => {
                const isUser = msg.sender === 'user';
                return (
                  <div
                    key={msg.id}
                    className={`flex items-end gap-2.5 ${isUser ? 'justify-end' : 'justify-start'}`}
                  >
                    {!isUser && (
                      <img
                        src={activePro.avatar}
                        alt={activePro.name}
                        className="w-8 h-8 rounded-full object-cover flex-shrink-0 mb-1"
                      />
                    )}

                    <div
                      className={`max-w-md rounded-2xl px-4 py-3 text-xs sm:text-sm shadow-xs ${
                        isUser
                          ? 'bg-[#0052FF] text-white rounded-br-xs'
                          : 'bg-white text-slate-800 rounded-bl-xs border border-slate-100'
                      }`}
                    >
                      <p className="leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                      <div
                        className={`flex items-center justify-end gap-1 mt-1 text-[10px] ${
                          isUser ? 'text-blue-100' : 'text-slate-400'
                        }`}
                      >
                        <span>{msg.time}</span>
                        {isUser && (
                          <span>
                            {msg.status === 'read' ? (
                              <CheckCheck className="w-3.5 h-3.5 text-blue-200" />
                            ) : (
                              <Check className="w-3.5 h-3.5 text-blue-300" />
                            )}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick action bar */}
            <div className="px-6 py-2 bg-white/80 border-t border-slate-200 flex items-center gap-2 overflow-x-auto no-scrollbar">
              <button
                onClick={() => {
                  selectProfessionalById(activePro.id);
                  navigateTo('booking');
                }}
                className="px-3 py-1 rounded-full bg-blue-50 text-[#0052FF] text-xs font-bold border border-blue-200 hover:bg-blue-100 transition-colors flex items-center gap-1 cursor-pointer whitespace-nowrap"
              >
                <Calendar className="w-3 h-3" />
                <span>Confirmar Agendamento</span>
              </button>

              <button
                onClick={() => {
                  sendMessage(activeChatProfessionalId, 'Pode me enviar o orçamento fechado para confirmar?');
                }}
                className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-medium hover:bg-slate-200 transition-colors cursor-pointer whitespace-nowrap"
              >
                Pedir orçamento fechado
              </button>

              <button
                onClick={() => {
                  sendMessage(activeChatProfessionalId, 'Qual a chave PIX para adiantamento?');
                }}
                className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-medium hover:bg-slate-200 transition-colors cursor-pointer whitespace-nowrap"
              >
                Chave PIX
              </button>
            </div>

            {/* Input Bar */}
            <form onSubmit={handleSend} className="p-4 bg-white border-t border-slate-200 flex items-center gap-3">
              <button
                type="button"
                onClick={() => setInputText((p) => p + ' 😊')}
                className="p-2 text-slate-400 hover:text-slate-600 rounded-xl hover:bg-slate-100 cursor-pointer"
              >
                <Smile className="w-5 h-5" />
              </button>

              <div className="flex-1 relative">
                <input
                  type="text"
                  placeholder={`Enviar mensagem para ${activePro.name}...`}
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-2xl bg-slate-100 border border-slate-200 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0052FF]/20 focus:bg-white"
                />
              </div>

              <button
                type="submit"
                disabled={!inputText.trim()}
                className="p-2.5 rounded-2xl bg-[#0052FF] text-white hover:bg-blue-600 disabled:opacity-50 transition-colors cursor-pointer flex-shrink-0"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
