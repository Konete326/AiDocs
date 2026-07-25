import React from "react";

export const MinDarkHeader = () => {
  return (
    <header className="w-full bg-[#0A0A0F]/80 backdrop-blur-md border-b border-white/10 sticky top-0 z-40 font-['Space_Grotesk'] text-[#FAFAFA]">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-lg bg-[#F59E0B] text-[#0A0A0F] font-bold flex items-center justify-center text-sm shadow-[0_0_20px_rgba(245,158,11,0.4)]">
            M
          </div>
          <span className="font-bold text-lg tracking-tight text-[#FAFAFA]">NOCTURNE</span>
        </div>
        <nav className="hidden md:flex items-center space-x-8 text-xs font-['Inter'] font-medium text-[#71717A]">
          <a href="#features" className="hover:text-[#FAFAFA] transition-colors">Atmosphere</a>
          <a href="#pricing" className="hover:text-[#FAFAFA] transition-colors">Pricing</a>
          <a href="#showcase" className="hover:text-[#FAFAFA] transition-colors">Components</a>
        </nav>
        <button className="px-5 py-2.5 bg-[#F59E0B] hover:bg-[#F59E0B]/90 text-[#0A0A0F] font-['Inter'] font-medium text-xs rounded-lg shadow-[0_0_20px_rgba(245,158,11,0.3)] active:scale-[0.98] transition-all">
          Experience Dark
        </button>
      </div>
    </header>
  );
};
