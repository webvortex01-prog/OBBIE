import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { StatusBar, Header } from '../components/Header';
import {
  Send,
  Smile,
  Mic,
  Paperclip,
  Calendar,
  CheckCheck,
  Check,
  CreditCard
} from 'lucide-react';

export const ChatScreen: React.FC = () => {
  const {
    selectedProfessional,
    chatMessages,
    sendMessage,
    navigateTo,
    activeChatProfessionalId
  } = useApp();

  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const messages = chatMessages[activeChatProfessionalId] || [];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputText.trim()) return;
    sendMessage(activeChatProfessionalId, inputText);
    setInputText('');
  };

  return (
    <div className="flex flex-col h-full bg-[#EBF0F8] select-none">
      <StatusBar />
      <Header />

      {/* Date badge */}
      <div className="flex justify-center my-2">
        <span className="px-3 py-1 bg-white/70 backdrop-blur-xs rounded-full text-[10px] font-semibold text-slate-500 shadow-2xs">
          Hoje
        </span>
      </div>

      {/* Messages Thread (Screen 8) */}
      <div className="flex-1 overflow-y-auto px-4 py-2 space-y-3">
        {messages.map((msg) => {
          const isUser = msg.sender === 'user';
          return (
            <div
              key={msg.id}
              className={`flex items-end gap-2 ${isUser ? 'justify-end' : 'justify-start'}`}
            >
              {!isUser && (
                <img
                  src={selectedProfessional.avatar}
                  alt={selectedProfessional.name}
                  className="w-7 h-7 rounded-full object-cover flex-shrink-0 mb-1 ring-1 ring-white"
                />
              )}

              <div
                className={`max-w-[78%] rounded-2xl px-4 py-2.5 text-xs shadow-xs relative ${
                  isUser
                    ? 'bg-[#0052FF] text-white rounded-br-xs'
                    : 'bg-white text-slate-800 rounded-bl-xs'
                }`}
              >
                <p className="leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                <div
                  className={`flex items-center justify-end gap-1 mt-1 text-[9px] ${
                    isUser ? 'text-blue-100' : 'text-slate-400'
                  }`}
                >
                  <span>{msg.time}</span>
                  {isUser && (
                    <span>
                      {msg.status === 'read' ? (
                        <CheckCheck className="w-3 h-3 text-blue-200" />
                      ) : (
                        <Check className="w-3 h-3 text-blue-300" />
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

      {/* Quick contextual chips */}
      <div className="px-3 py-1 bg-white/60 backdrop-blur-xs border-t border-slate-200/50 flex items-center gap-2 overflow-x-auto no-scrollbar">
        <button
          onClick={() => navigateTo('booking')}
          className="flex items-center gap-1.5 px-3 py-1 bg-white rounded-full text-[11px] font-bold text-[#0052FF] shadow-2xs border border-blue-100 whitespace-nowrap active:scale-95"
        >
          <Calendar className="w-3 h-3" />
          <span>Agendar serviço direto</span>
        </button>
        <button
          onClick={() => {
            sendMessage(
              activeChatProfessionalId,
              'Pode me passar a chave PIX ou o valor confirmado?'
            );
          }}
          className="flex items-center gap-1.5 px-3 py-1 bg-white rounded-full text-[11px] font-medium text-slate-700 shadow-2xs border border-slate-200/60 whitespace-nowrap active:scale-95"
        >
          <CreditCard className="w-3 h-3 text-emerald-600" />
          <span>Pedir chave PIX</span>
        </button>
      </div>

      {/* Message Input Bar (Screen 8) */}
      <form
        onSubmit={handleSend}
        className="p-3 bg-white border-t border-slate-200/80 flex items-center gap-2"
      >
        <button
          type="button"
          onClick={() => setInputText((prev) => prev + ' 😊')}
          className="p-1.5 text-slate-400 hover:text-slate-600 rounded-full"
          aria-label="Adicionar emoji"
        >
          <Smile className="w-5 h-5" />
        </button>

        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="Digite uma mensagem..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="w-full pl-3 pr-8 py-2 rounded-xl bg-slate-100/90 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0052FF]/20 focus:bg-white"
          />
          <button
            type="button"
            onClick={() => {
              sendMessage(activeChatProfessionalId, '📍 Localização compartilhada: Av. Paulista, 1000');
            }}
            className="absolute right-2 top-2 text-slate-400 hover:text-slate-600"
            title="Anexar localização ou arquivo"
          >
            <Paperclip className="w-4 h-4" />
          </button>
        </div>

        {inputText.trim() ? (
          <button
            type="submit"
            className="w-9 h-9 rounded-full bg-[#0052FF] text-white flex items-center justify-center shadow-xs hover:bg-blue-600 active:scale-95 transition-all"
            aria-label="Enviar mensagem"
          >
            <Send className="w-4 h-4" />
          </button>
        ) : (
          <button
            type="button"
            onClick={() => {
              sendMessage(activeChatProfessionalId, '🎙️ Áudio (0:12)');
            }}
            className="w-9 h-9 rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 flex items-center justify-center active:scale-95 transition-all"
            aria-label="Gravar áudio"
          >
            <Mic className="w-4 h-4" />
          </button>
        )}
      </form>
    </div>
  );
};
