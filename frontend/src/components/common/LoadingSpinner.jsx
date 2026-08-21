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
    <div className={`flex flex-col items-center justify-center gap-3 ${className}`}>
      <div className="relative flex items-center justify-center">
        <div
          className={`absolute rounded-full border-2 border-[#6C63FF]/20 border-t-[#6C63FF] animate-spin ${
            isLg ? 'w-14 h-14' : 'w-10 h-10'
          }`}
        />
        <div
          className={`absolute rounded-full bg-[#E0E5EC] shadow-[inset_2px_2px_4px_rgba(163,177,198,0.5),inset_-2px_-2px_4px_rgba(255,255,255,0.5)] ${
            isLg ? 'w-12 h-12' : 'w-8 h-8'
          }`}
        />
        <div
          className={`relative z-10 bg-[#E0E5EC] rounded-xl shadow-[3px_3px_6px_rgba(163,177,198,0.5),-3px_-3px_6px_rgba(255,255,255,0.5)] flex items-center justify-center transition-all ${
            isLg ? 'w-9 h-9 p-1.5' : 'w-7 h-7 p-1'
          }`}
        >
          <img
            src={logo}
            alt="ClarifyAI"
            className={`${isLg ? 'h-5' : 'h-3.5'} w-auto object-contain filter drop-shadow-sm`}
          />
        </div>
      </div>

      {label && (
        <span className={`font-bold tracking-wider text-[#3D4852] uppercase ${isLg ? 'text-xs' : 'text-[10px]'}`}>
          {label}
        </span>
      )}
    </div>
  );
}
