import React from "react";

export const SwissHeader = () => {
  return (
    <header className="w-full bg-white border-b-4 border-black sticky top-0 z-40 font-['Inter'] text-black">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-[#FF3000] text-white font-black flex items-center justify-center text-sm border-2 border-black">
            SW
          </div>
          <span className="font-black text-2xl uppercase tracking-tighter text-black">HELVETICA 1957</span>
        </div>
        <nav className="hidden md:flex items-center space-x-8 font-bold text-xs uppercase tracking-widest">
          <a href="#features" className="hover:text-[#FF3000] transition-colors font-black">01. SYSTEM</a>
          <a href="#pricing" className="hover:text-[#FF3000] transition-colors font-black">02. METHOD</a>
          <a href="#showcase" className="hover:text-[#FF3000] transition-colors font-black">03. COMPONENT</a>
        </nav>
        <button className="px-6 py-3 bg-[#FF3000] text-white font-black text-xs uppercase tracking-widest border-2 border-black hover:bg-black transition-colors">
          INITIATE GRID
        </button>
      </div>
    </header>
  );
};
