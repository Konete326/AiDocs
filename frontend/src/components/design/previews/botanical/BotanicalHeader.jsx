import React from "react";

export const BotanicalHeader = () => {
  return (
    <header className="w-full bg-[#F9F8F4] border-b border-[#E6E2DA] sticky top-0 z-40 font-['Playfair_Display',serif] text-[#2D3A31]">
      <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-full bg-[#8C9A84] text-white font-medium flex items-center justify-center text-sm">
            🌿
          </div>
          <span className="font-semibold text-xl tracking-tight text-[#2D3A31]">BotanICA</span>
        </div>
        <nav className="hidden md:flex items-center space-x-8 font-['Source_Sans_3'] text-xs font-semibold uppercase tracking-widest text-[#2D3A31]/70">
          <a href="#features" className="hover:text-[#8C9A84] transition-colors">ORGANIC</a>
          <a href="#pricing" className="hover:text-[#C27B66] transition-colors">WELLNESS</a>
          <a href="#showcase" className="hover:text-[#8C9A84] transition-colors">ATELIER</a>
        </nav>
        <button className="px-7 py-3 bg-[#2D3A31] text-white font-['Source_Sans_3'] font-semibold text-xs uppercase tracking-widest rounded-full hover:bg-[#C27B66] transition-colors shadow-sm">
          BEGIN FLOURISH
        </button>
      </div>
    </header>
  );
};
