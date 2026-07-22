import React from "react";

export const ClaymorphismHeader = () => {
  return (
    <header className="w-full bg-[#F4F1FA] border-b border-[#332F3A]/10 sticky top-0 z-40 font-['Nunito',sans-serif] text-[#332F3A]">
      <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#A78BFA] to-[#7C3AED] text-white font-black flex items-center justify-center text-lg shadow-[6px_6px_12px_rgba(160,150,180,0.3),-4px_-4px_10px_rgba(255,255,255,0.9)]">
            C
          </div>
          <span className="font-black text-2xl tracking-tight text-[#332F3A]">ClayCraft</span>
        </div>
        <nav className="hidden md:flex items-center space-x-8 text-sm font-bold text-[#635F69]">
          <a href="#features" className="hover:text-[#7C3AED] transition-colors">Tactile</a>
          <a href="#pricing" className="hover:text-[#DB2777] transition-colors">Pricing</a>
          <a href="#showcase" className="hover:text-[#0EA5E9] transition-colors">Components</a>
        </nav>
        <button className="px-7 py-3 bg-gradient-to-br from-[#A78BFA] to-[#7C3AED] text-white font-black text-xs uppercase tracking-wider rounded-[20px] shadow-[8px_8px_16px_rgba(124,58,237,0.3),-6px_-6px_12px_rgba(255,255,255,0.9)] hover:-translate-y-1 active:scale-[0.92] transition-all">
          SQUISH ME
        </button>
      </div>
    </header>
  );
};
