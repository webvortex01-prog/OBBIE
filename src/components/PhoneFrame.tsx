import React from 'react';

interface PhoneFrameProps {
  children: React.ReactNode;
}

export const PhoneFrame: React.FC<PhoneFrameProps> = ({ children }) => {
  return (
    <div className="relative mx-auto my-auto w-[375px] h-[812px] max-w-full max-h-[92vh] bg-black rounded-[48px] p-3 shadow-2xl ring-1 ring-slate-800/20 select-none flex flex-col">
      {/* Phone outer hardware buttons */}
      <div className="absolute -left-[3px] top-24 w-[3px] h-8 bg-slate-700 rounded-l-sm" />
      <div className="absolute -left-[3px] top-36 w-[3px] h-12 bg-slate-700 rounded-l-sm" />
      <div className="absolute -left-[3px] top-52 w-[3px] h-12 bg-slate-700 rounded-l-sm" />
      <div className="absolute -right-[3px] top-32 w-[3px] h-16 bg-slate-700 rounded-r-sm" />

      {/* Screen container */}
      <div className="relative flex-1 bg-white rounded-[38px] overflow-hidden flex flex-col">
        {/* Dynamic Island / Speaker Notch */}
        <div className="absolute top-2.5 left-1/2 -translate-x-1/2 z-50 w-24 h-5 bg-black rounded-full flex items-center justify-end pr-2 pointer-events-none">
          <div className="w-2.5 h-2.5 rounded-full bg-slate-900 ring-1 ring-slate-800" />
        </div>

        {/* Inner App Content */}
        <div className="flex-1 flex flex-col overflow-hidden relative">
          {children}
        </div>

        {/* Home Indicator Bar */}
        <div className="absolute bottom-1 left-1/2 -translate-x-1/2 z-50 w-32 h-1 bg-slate-300 rounded-full pointer-events-none" />
      </div>
    </div>
  );
};
