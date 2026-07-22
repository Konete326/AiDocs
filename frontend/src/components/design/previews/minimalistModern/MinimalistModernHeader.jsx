import React from "react";

export const MinimalistModernHeader = () => {
  return (
    <header className="w-full bg-[#FAFAFA] border-b border-slate-200 sticky top-0 z-40 font-['Inter']">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-r from-[#0052FF] to-[#4D7CFF] flex items-center justify-center text-white font-['Calistoga'] text-lg shadow-md">
            M
          </div>
          <span className="font-['Calistoga'] text-xl text-[#0F172A]">Pulse Modern</span>
        </div>
        <nav className="hidden md:flex items-center space-x-8 text-xs font-semibold text-slate-600">
          <a href="#features" className="hover:text-[#0052FF] transition-colors">Features</a>
          <a href="#pricing" className="hover:text-[#0052FF] transition-colors">Pricing</a>
          <a href="#showcase" className="hover:text-[#0052FF] transition-colors">Components</a>
        </nav>
        <button className="px-5 py-2.5 bg-gradient-to-r from-[#0052FF] to-[#4D7CFF] text-white rounded-xl font-medium text-xs shadow-md shadow-blue-500/20 hover:-translate-y-0.5 transition-all">
          Get Started
        </button>
      </div>
    </header>
  );
};
