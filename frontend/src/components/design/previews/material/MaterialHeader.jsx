import React from "react";

export const MaterialHeader = () => {
  return (
    <header className="w-full bg-[#FFFBFE] border-b border-[#E7E0EC] sticky top-0 z-40 font-['Roboto'] text-[#1C1B1F]">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 bg-[#6750A4] text-white font-medium flex items-center justify-center text-lg rounded-full">
            M
          </div>
          <span className="font-medium text-xl text-[#1C1B1F]">Material You</span>
        </div>
        <nav className="hidden md:flex items-center space-x-8 text-sm font-medium text-[#49454F]">
          <a href="#features" className="hover:text-[#6750A4] transition-colors">Features</a>
          <a href="#pricing" className="hover:text-[#6750A4] transition-colors">Pricing</a>
          <a href="#showcase" className="hover:text-[#6750A4] transition-colors">Components</a>
        </nav>
        <button className="px-6 py-2.5 bg-[#6750A4] hover:bg-[#6750A4]/90 text-white font-medium text-xs rounded-full shadow-sm active:scale-95 transition-all">
          Explore System
        </button>
      </div>
    </header>
  );
};
