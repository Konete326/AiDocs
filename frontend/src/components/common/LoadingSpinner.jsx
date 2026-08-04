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
    <div className={`flex flex-col items-center justify-center gap-4 ${className}`}>
      <div className="relative flex items-center justify-center">
        <div className={`absolute rounded-full border-3 border-[#6C63FF]/25 border-t-[#6C63FF] animate-spin ${isLg ? 'w-28 h-28' : 'w-12 h-12'}`} />
        <div className={`absolute rounded-full bg-[#E0E5EC] shadow-[inset_4px_4px_8px_rgba(163,177,198,0.6),inset_-4px_-4px_8px_rgba(255,255,255,0.5)] ${isLg ? 'w-24 h-24' : 'w-10 h-10'}`} />
        <div className={`relative z-10 bg-[#E0E5EC] rounded-2xl shadow-[5px_5px_10px_rgba(163,177,198,0.6),-5px_-5px_10px_rgba(255,255,255,0.5)] flex items-center justify-center transition-all ${isLg ? 'p-4 sm:p-5' : 'p-2'}`}>
          <img
            src={logo}
            alt="ClarifyAI Logo"
            className={`${isLg ? 'h-10 sm:h-12' : 'h-5'} w-auto object-contain animate-pulse filter drop-shadow-sm`}
          />
        </div>
      </div>

      {label && (
        <span className={`font-extrabold tracking-widest text-[#3D4852] uppercase animate-pulse ${isLg ? 'text-xs' : 'text-[10px]'}`}>
          {label}
        </span>
      )}
    </div>
  );
}
