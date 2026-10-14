import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { PhoneOff, Mic, MicOff, Video, VideoOff, Volume2 } from 'lucide-react';

export const CallModal: React.FC = () => {
  const { activeCallModal, closeCallModal } = useApp();
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoMuted, setIsVideoMuted] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (activeCallModal.isOpen) {
      setDuration(0);
      timer = setInterval(() => {
        setDuration((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [activeCallModal.isOpen]);

  if (!activeCallModal.isOpen || !activeCallModal.professional) return null;

  const { professional, type } = activeCallModal;

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md text-white select-none animate-in fade-in duration-200">
      <div className="relative w-full max-w-sm flex flex-col items-center text-center p-6 space-y-6">
        {type === 'video' && !isVideoMuted ? (
          <div className="relative w-44 h-56 rounded-3xl overflow-hidden ring-4 ring-blue-500/40 shadow-2xl">
            <img
              src={professional.avatar}
              alt={professional.name}
              className="w-full h-full object-cover scale-105"
            />
            <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded-full bg-black/60 text-[10px] font-semibold text-emerald-400">
              HD Conectado
            </div>
          </div>
        ) : (
          <div className="relative flex flex-col items-center">
            <div className="w-28 h-28 rounded-full overflow-hidden ring-4 ring-blue-500/50 shadow-2xl animate-pulse">
              <img
                src={professional.avatar}
                alt={professional.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        )}

        <div>
          <h3 className="text-xl font-black text-white">{professional.name}</h3>
          <p className="text-xs text-blue-300 font-medium mt-1">
            {type === 'video' ? 'Chamada de Vídeo OBBI' : 'Chamada de Voz OBBI'}
          </p>
          <span className="text-sm font-mono text-slate-300 mt-2 block font-semibold">
            {formatTime(duration)}
          </span>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-4 pt-4">
          <button
            onClick={() => setIsMuted((p) => !p)}
            className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
              isMuted ? 'bg-red-500 text-white' : 'bg-white/20 text-white hover:bg-white/30'
            }`}
            aria-label="Silenciar microfone"
          >
            {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
          </button>

          {type === 'video' && (
            <button
              onClick={() => setIsVideoMuted((p) => !p)}
              className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
                isVideoMuted ? 'bg-red-500 text-white' : 'bg-white/20 text-white hover:bg-white/30'
              }`}
              aria-label="Alternar vídeo"
            >
              {isVideoMuted ? <VideoOff className="w-5 h-5" /> : <Video className="w-5 h-5" />}
            </button>
          )}

          <button
            onClick={closeCallModal}
            className="w-14 h-14 rounded-full bg-red-600 hover:bg-red-700 text-white flex items-center justify-center shadow-lg shadow-red-500/40 active:scale-95 transition-transform"
            aria-label="Encerrar chamada"
          >
            <PhoneOff className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
};
