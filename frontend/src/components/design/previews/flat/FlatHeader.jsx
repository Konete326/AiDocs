import React from "react";

export const FlatHeader = () => {
  return (
    <header className="w-full bg-white border-b border-gray-200 sticky top-0 z-40 font-['Outfit'] text-gray-900 shadow-none">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 bg-[#3B82F6] text-white font-extrabold flex items-center justify-center text-lg rounded-md shadow-none">
            F
          </div>
          <span className="font-extrabold text-xl tracking-tight text-gray-900">FlatStudio</span>
        </div>
        <nav className="hidden md:flex items-center space-x-8 text-xs font-semibold">
          <a href="#features" className="hover:text-[#3B82F6] transition-colors">Features</a>
          <a href="#pricing" className="hover:text-[#3B82F6] transition-colors">Pricing</a>
          <a href="#showcase" className="hover:text-[#3B82F6] transition-colors">Showcase</a>
        </nav>
        <button className="px-5 py-2.5 bg-[#3B82F6] hover:bg-blue-600 text-white font-semibold text-xs rounded-md shadow-none hover:scale-105 transition-all">
          Get Started
        </button>
      </div>
    </header>
  );
};
