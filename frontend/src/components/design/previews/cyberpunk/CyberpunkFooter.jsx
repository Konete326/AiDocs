import React from "react";

export const CyberpunkFooter = () => {
  return (
    <footer className="bg-[#0a0a0f] border-t border-[#00ff88]/30 py-16 font-['Orbitron',sans-serif] text-[#e0e0e0]">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-4 gap-8 mb-12">
        <div>
          <div className="font-black text-2xl uppercase tracking-widest text-[#00ff88] mb-4">NEON_GRID</div>
          <p className="font-mono text-xs text-[#6b7280] leading-relaxed">
            High-Tech, Low-Life digital dystopia with Matrix green glows and CRT scanlines.
          </p>
        </div>
        <div>
          <div className="font-mono text-xs uppercase tracking-widest text-[#ff00ff] mb-4">// NODES</div>
          <ul className="space-y-2 font-mono text-xs text-[#6b7280] uppercase">
            <li><a href="#features" className="hover:text-[#00ff88]">01//Hack</a></li>
            <li><a href="#pricing" className="hover:text-[#00ff88]">02//Access</a></li>
          </ul>
        </div>
        <div>
          <div className="font-mono text-xs uppercase tracking-widest text-[#00d4ff] mb-4">// FEED</div>
          <ul className="space-y-2 font-mono text-xs text-[#6b7280] uppercase">
            <li><a href="#showcase" className="hover:text-[#00ff88]">03//Terminal</a></li>
            <li><a href="#pricing" className="hover:text-[#00ff88]">04//Tokens</a></li>
          </ul>
        </div>
        <div>
          <div className="font-mono text-xs uppercase tracking-widest text-[#00ff88] mb-4">// STATUS</div>
          <p className="font-mono text-xs text-[#00ff88]">SYSTEM_ONLINE // 2026</p>
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-6 pt-6 border-t border-[#2a2a3a] font-mono text-[10px] uppercase text-[#6b7280] flex justify-between">
        <span>© 2026 CYBERPUNK GLITCH SYSTEM</span>
        <span>RGB CHROMATIC SPLIT</span>
      </div>
    </footer>
  );
};
