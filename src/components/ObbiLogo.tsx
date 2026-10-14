import React from 'react';

interface ObbiLogoProps {
  variant?: 'white' | 'blue' | 'dark';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showTagline?: boolean;
  className?: string;
}

export const ObbiLogo: React.FC<ObbiLogoProps> = ({
  variant = 'blue',
  size = 'md',
  showTagline = false,
  className = ''
}) => {
  const isWhite = variant === 'white';
  const textColor = isWhite ? 'text-white' : 'text-[#0052FF]';
  const iconBg = isWhite ? 'bg-white text-[#0052FF]' : 'bg-[#0052FF] text-white';
  const taglineColor = isWhite ? 'text-blue-100' : 'text-slate-600';

  const sizeClasses = {
    sm: { text: 'text-xl font-black tracking-tight', icon: 'w-6 h-6 text-xs' },
    md: { text: 'text-2xl font-black tracking-tight', icon: 'w-8 h-8 text-sm' },
    lg: { text: 'text-4xl font-black tracking-tight', icon: 'w-11 h-11 text-lg' },
    xl: { text: 'text-5xl font-black tracking-tight', icon: 'w-14 h-14 text-xl' }
  }[size];

  return (
    <div className={`inline-flex flex-col items-center select-none ${className}`}>
      <div className={`flex items-center gap-1.5 ${textColor} ${sizeClasses.text}`}>
        {/* Stylized O with handshake / connected nodes glyph */}
        <div className={`relative flex items-center justify-center rounded-xl font-extrabold ${iconBg} ${sizeClasses.icon} shadow-sm overflow-hidden`}>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-3/4 h-3/4"
          >
            <circle cx="12" cy="12" r="8" />
            <path d="M12 8v8" />
            <path d="M8 12h8" />
          </svg>
        </div>
        <span className="font-extrabold tracking-tighter">BBI</span>
      </div>
      {showTagline && (
        <span
          className={`text-[9px] sm:text-[10px] tracking-[0.2em] font-bold uppercase mt-1 text-center ${taglineColor}`}
        >
          Serviços Que Conectam Pessoas
        </span>
      )}
    </div>
  );
};
