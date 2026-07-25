import React from "react";

export const CyberpunkHeader = () => {
  return (
    <header className="w-full bg-[#0a0a0f] border-b border-[#00ff88]/40 sticky top-0 z-40 font-['Orbitron',sans-serif] text-[#e0e0e0]">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-[#00ff88] text-[#0a0a0f] font-black flex items-center justify-center text-sm shadow-[0_0_10px_#00ff88]">
            CP
          </div>
          <span className="font-black text-xl uppercase tracking-widest text-[#00ff88]">NEON_GRID</span>
        </div>
        <nav className="hidden md:flex items-center space-x-8 text-xs font-mono uppercase tracking-[0.2em] text-[#e0e0e0]">
          <a href="#features" className="hover:text-[#ff00ff] hover:drop-shadow-[0_0_5px_#ff00ff] transition-all">01//HACK</a>
          <a href="#pricing" className="hover:text-[#00d4ff] hover:drop-shadow-[0_0_5px_#00d4ff] transition-all">02//ACCESS</a>
          <a href="#showcase" className="hover:text-[#00ff88] hover:drop-shadow-[0_0_5px_#00ff88] transition-all">03//TERMINAL</a>
        </nav>
        <button className="px-5 py-2.5 bg-[#00ff88] text-[#0a0a0f] font-black text-xs uppercase tracking-widest hover:bg-[#ff00ff] hover:text-white shadow-[0_0_15px_#00ff88] transition-all">
          EXECUTE_PULSE
        </button>
      </div>
    </header>
  );
};
