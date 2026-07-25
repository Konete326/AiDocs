import React from "react";

export const OrganicNaturalHeader = () => {
  return (
    <header className="w-full bg-[#FDFCF8] border-b border-[#DED8CF]/50 sticky top-0 z-40 font-['Fraunces',serif] text-[#2C2C24]">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-[#5D7052] text-[#F3F4F1] font-bold flex items-center justify-center text-lg shadow-[0_4px_20px_-2px_rgba(93,112,82,0.15)]">
            🍃
          </div>
          <span className="font-bold text-xl tracking-tight text-[#2C2C24]">WabiSabi</span>
        </div>
        <nav className="hidden md:flex items-center space-x-8 font-['Nunito'] text-sm font-bold text-[#78786C]">
          <a href="#features" className="hover:text-[#5D7052] transition-colors">EARTH</a>
          <a href="#pricing" className="hover:text-[#C18C5D] transition-colors">CLAY</a>
          <a href="#showcase" className="hover:text-[#5D7052] transition-colors">HERITAGE</a>
        </nav>
        <button className="px-8 py-3 bg-[#5D7052] text-[#F3F4F1] font-['Nunito'] font-bold text-xs uppercase tracking-wider rounded-full shadow-[0_4px_20px_-2px_rgba(93,112,82,0.15)] hover:scale-105 active:scale-95 transition-all">
          FLOURISH
        </button>
      </div>
    </header>
  );
};
