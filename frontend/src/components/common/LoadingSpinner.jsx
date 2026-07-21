import React from 'react';
import logo from '../../assets/logo.png';

export default function LoadingSpinner({ size = 'md', className = '' }) {
  if (size === 'sm') {
    return (
      <div className={`relative inline-flex items-center justify-center w-5 h-5 ${className}`}>
        <div className="absolute inset-0 rounded-full border border-white/20 border-t-white animate-spin" />
        <img src={logo} alt="" className="w-2.5 h-2.5 rounded-full object-cover opacity-90" />
      </div>
    );
  }

  const containerSizes = {
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-20 h-20'
  };

  const logoSizes = {
    md: 'w-5 h-5',
    lg: 'w-7 h-7',
    xl: 'w-9 h-9'
  };

  return (
    <div className={`relative flex items-center justify-center ${containerSizes[size] || containerSizes.md} ${className}`}>
      <div className="absolute inset-0 rounded-full border border-[#6C63FF] animate-ping opacity-30" style={{ animationDuration: '1.8s' }} />
      <div className="absolute inset-[12%] rounded-full border border-white/20 bg-white/5 animate-pulse" />
      <div className="absolute inset-[25%] rounded-full border border-[#6C63FF] bg-[#6C63FF] shadow-[0_0_12px_rgba(108,99,255,0.4)] opacity-40 animate-pulse" style={{ animationDelay: '0.2s' }} />
      
      <div className="relative z-10 rounded-full p-1 bg-black/40 backdrop-blur-md border border-white/20 shadow-md flex items-center justify-center">
        <img src={logo} alt="Loading..." className={`${logoSizes[size] || logoSizes.md} rounded-full object-cover animate-pulse`} />
      </div>
    </div>
  );
}
