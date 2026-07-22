import React from "react";

export const BauhausHeader = () => {
  return (
    <header className="w-full bg-[#F0F0F0] border-b-4 border-[#121212] sticky top-0 z-40 font-['Outfit']">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-1">
            <div className="w-4 h-4 rounded-full bg-[#D02020] border-2 border-[#121212]"></div>
            <div className="w-4 h-4 bg-[#1040C0] border-2 border-[#121212]"></div>
            <div className="w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-b-[14px] border-b-[#F0C020]"></div>
          </div>
          <span className="font-black text-2xl tracking-tighter uppercase text-[#121212]">BAUHAUS</span>
        </div>
        <nav className="hidden md:flex items-center space-x-8 font-bold text-xs uppercase tracking-widest text-[#121212]">
          <a href="#features" className="hover:text-[#D02020]">Features</a>
          <a href="#pricing" className="hover:text-[#1040C0]">Pricing</a>
          <a href="#showcase" className="hover:text-[#F0C020]">Components</a>
        </nav>
        <div className="flex items-center space-x-4">
          <button className="px-5 py-2.5 bg-[#D02020] text-white font-bold text-xs uppercase tracking-wider border-2 border-[#121212] shadow-[4px_4px_0px_0px_#121212] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all">
            Join Studio
          </button>
        </div>
      </div>
    </header>
  );
};
