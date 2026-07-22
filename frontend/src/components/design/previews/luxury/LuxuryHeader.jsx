import React from "react";

export const LuxuryHeader = () => {
  return (
    <header className="w-full bg-[#F9F8F6] border-b border-[#1A1A1A]/20 sticky top-0 z-40 font-['Inter']">
      <div className="max-w-[1600px] mx-auto px-8 h-20 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <span className="font-['Playfair_Display'] text-2xl font-bold tracking-tight text-[#1A1A1A]">Maison & Co.</span>
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#D4AF37] font-semibold">EDITION 2026</span>
        </div>
        <nav className="hidden md:flex items-center space-x-10 text-xs uppercase tracking-[0.25em] text-[#1A1A1A] font-medium">
          <a href="#features" className="hover:text-[#D4AF37] transition-colors duration-500">Collection</a>
          <a href="#pricing" className="hover:text-[#D4AF37] transition-colors duration-500">Membership</a>
          <a href="#showcase" className="hover:text-[#D4AF37] transition-colors duration-500">Atelier</a>
        </nav>
        <button className="relative group overflow-hidden px-7 py-3 bg-[#1A1A1A] text-white text-xs uppercase tracking-[0.2em] font-medium transition-all duration-500">
          <span className="relative z-10">Request Access</span>
          <span className="absolute inset-0 bg-[#D4AF37] -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out"></span>
        </button>
      </div>
    </header>
  );
};
