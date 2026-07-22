import React from "react";
import { Terminal, Cpu } from "lucide-react";

export const CyberpunkHero = () => {
  return (
    <section className="bg-[#0a0a0f] border-b border-[#00ff88]/30 py-24 font-['Orbitron',sans-serif] text-[#e0e0e0] relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <div className="inline-flex items-center space-x-2 bg-[#12121a] border border-[#ff00ff] px-4 py-1.5 text-xs font-mono text-[#ff00ff] shadow-[0_0_10px_#ff00ff40] mb-8">
          <Terminal size={14} />
          <span>SYS_OVERRIDE // HIGH-TECH LOW-LIFE</span>
        </div>
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-widest text-[#e0e0e0] leading-none mb-8">
          HIGH-TECH <span className="text-[#00ff88] drop-shadow-[0_0_15px_#00ff88]">NOIR</span> DYSTOPIA.
        </h1>
        <p className="font-['JetBrains_Mono',monospace] text-base md:text-lg text-[#6b7280] max-w-xl leading-relaxed mb-10">
          Electric Green Matrix (#00ff88), Magenta (#ff00ff), Cyan (#00d4ff), chromatic aberration, CRT scanlines, and 45° chamfer cutouts.
        </p>
        <div className="flex flex-wrap gap-4 font-mono text-xs uppercase tracking-widest">
          <button className="px-8 py-4 bg-[#00ff88] text-[#0a0a0f] font-black border border-[#00ff88] shadow-[0_0_20px_#00ff88] hover:bg-[#ff00ff] hover:text-white transition-all flex items-center space-x-2">
            <Cpu size={16} />
            <span>JACK INTO MAINFRAME</span>
          </button>
          <button className="px-8 py-4 bg-[#12121a] text-[#00d4ff] border border-[#00d4ff] shadow-[0_0_10px_#00d4ff40] hover:bg-[#00d4ff] hover:text-[#0a0a0f] transition-all">
            VIEW SIGNAL HUD
          </button>
        </div>
      </div>
    </section>
  );
};
