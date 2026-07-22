import React from "react";

export const AcademiaHeader = () => {
  return (
    <header className="w-full bg-[#1C1714] border-b border-[#4A3F35] sticky top-0 z-40 font-['Cinzel',serif] text-[#E8DFD4]">
      <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 border border-[#C9A962] bg-[#251E19] flex items-center justify-center font-bold text-sm text-[#C9A962] rounded-[4px]">
            A
          </div>
          <span className="font-bold text-xl uppercase tracking-[0.25em] text-[#C9A962]">ATHENAEUM</span>
        </div>
        <nav className="hidden md:flex items-center space-x-8 text-xs uppercase tracking-[0.25em] text-[#9C8B7A]">
          <a href="#features" className="hover:text-[#C9A962] transition-colors">VOLUME I</a>
          <a href="#pricing" className="hover:text-[#C9A962] transition-colors">VOLUME II</a>
          <a href="#showcase" className="hover:text-[#C9A962] transition-colors">VOLUME III</a>
        </nav>
        <button className="px-6 py-2.5 bg-gradient-to-b from-[#D4B872] via-[#C9A962] to-[#B8953F] text-[#1C1714] font-bold text-xs uppercase tracking-[0.2em] rounded-[4px] hover:brightness-110 transition-all shadow-md">
          ENTER LIBRARY
        </button>
      </div>
    </header>
  );
};
