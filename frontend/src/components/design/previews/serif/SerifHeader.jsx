import React from "react";

export const SerifHeader = () => {
  return (
    <header className="w-full bg-[#FAFAF8] border-b border-[#E8E4DF] sticky top-0 z-40 font-['Playfair_Display',serif] text-[#1A1A1A]">
      <div className="max-w-5xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <span className="font-semibold text-2xl tracking-tight text-[#1A1A1A]">VERITAS</span>
          <span className="w-1.5 h-1.5 bg-[#B8860B] rounded-full"></span>
        </div>
        <nav className="hidden md:flex items-center space-x-8 font-['IBM_Plex_Mono',monospace] text-xs font-medium uppercase tracking-[0.15em] text-[#6B6B6B]">
          <a href="#features" className="hover:text-[#B8860B] transition-colors">ESSAYS</a>
          <a href="#pricing" className="hover:text-[#B8860B] transition-colors">EDITIONS</a>
          <a href="#showcase" className="hover:text-[#B8860B] transition-colors">LIBRARY</a>
        </nav>
        <button className="px-6 py-2.5 bg-[#B8860B] text-white font-['Source_Sans_3'] font-medium text-xs rounded-md shadow-sm hover:bg-[#D4A84B] transition-all">
          SUBSCRIBE
        </button>
      </div>
    </header>
  );
};
