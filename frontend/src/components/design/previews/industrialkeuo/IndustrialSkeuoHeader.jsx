import React from "react";

export const IndustrialSkeuoHeader = () => {
  return (
    <header className="w-full bg-[#e0e5ec] border-b border-[#a3b1c6] sticky top-0 z-40 font-['Inter',sans-serif] text-[#2d3436]">
      <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-[#e0e5ec] shadow-[6px_6px_12px_#babecc,-6px_-6px_12px_#ffffff] text-[#ff4757] font-bold flex items-center justify-center text-lg border border-white/50">
            OP-1
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-xl tracking-tight text-[#2d3436] uppercase">BRAUN_SYS</span>
            <span className="font-mono text-[9px] text-[#4a5568] tracking-widest uppercase">MODEL OP-2026 // STEREO</span>
          </div>
        </div>
        <nav className="hidden md:flex items-center space-x-8 font-mono text-xs font-bold uppercase tracking-widest text-[#4a5568]">
          <a href="#features" className="hover:text-[#ff4757] transition-colors">PANELS</a>
          <a href="#pricing" className="hover:text-[#ff4757] transition-colors">MODULES</a>
          <a href="#showcase" className="hover:text-[#ff4757] transition-colors">HARDWARE</a>
        </nav>
        <button className="px-6 py-3 bg-[#ff4757] text-white font-mono font-bold text-xs uppercase tracking-widest rounded-lg shadow-[4px_4px_8px_rgba(166,50,60,0.4),-4px_-4px_8px_rgba(255,100,110,0.4)] active:translate-y-[2px] active:shadow-[inset_4px_4px_8px_rgba(0,0,0,0.3)] transition-all">
          ENGAGE CONTROLS
        </button>
      </div>
    </header>
  );
};
