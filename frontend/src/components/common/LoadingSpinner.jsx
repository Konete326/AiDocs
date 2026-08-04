import React from 'react';
import logo from '../../assets/logo.png';

export default function LoadingSpinner({ size = 'md', className = '', label }) {
  if (size === 'sm') {
    return (
      <div className={`inline-flex items-center justify-center ${className}`}>
        <div className="w-4 h-4 rounded-full border-2 border-[#6C63FF]/30 border-t-[#6C63FF] animate-spin" />
      </div>
    );
  }

  const isLg = size === 'lg' || size === 'xl';

  return (
    <div className={`flex flex-col items-center justify-center gap-6 ${className}`}>
      <div className="relative flex items-center justify-center">
        <div className={`absolute rounded-full border-4 border-[#6C63FF]/20 border-t-[#6C63FF] animate-spin ${isLg ? 'w-48 h-48' : 'w-24 h-24'}`} />
        <div className={`absolute rounded-full bg-[#E0E5EC] shadow-[inset_6px_6px_10px_rgba(163,177,198,0.6),inset_-6px_-6px_10px_rgba(255,255,255,0.5)] ${isLg ? 'w-40 h-40' : 'w-20 h-20'}`} />
        <div className={`relative z-10 bg-[#E0E5EC] rounded-[32px] shadow-[9px_9px_16px_rgba(163,177,198,0.6),-9px_-9px_16px_rgba(255,255,255,0.5)] flex items-center justify-center transition-all ${isLg ? 'p-6 sm:p-8' : 'p-3'}`}>
          <img
            src={logo}
            alt="ClarifyAI Logo"
            className={`${isLg ? 'h-20 sm:h-24' : 'h-10'} w-auto object-contain animate-pulse filter drop-shadow-md`}
          />
        </div>
      </div>

      {label && (
        <span className="text-xs font-extrabold tracking-widest text-[#3D4852] uppercase animate-pulse">
          {label}
        </span>
      )}
    </div>
  );
}
