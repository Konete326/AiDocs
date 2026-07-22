import React from "react";
import { Zap, Radio } from "lucide-react";

export const VaporwaveHero = () => {
  return (
    <section className="bg-[#090014] border-b-2 border-b-[#FF00FF] py-24 font-['Orbitron',sans-serif] text-[#E0E0E0] relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <div className="inline-flex items-center space-x-2 bg-[#1a103c] border border-[#FF00FF] px-4 py-1.5 text-xs font-mono text-[#00FFFF] shadow-[0_0_15px_rgba(255,0,255,0.4)] mb-8">
          <Radio size={14} className="animate-pulse text-[#FF00FF]" />
          <span>SYNTHETIC REALITY // RETRO-FUTURISTIC EXCESS</span>
        </div>
        <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tight leading-none mb-8">
          NEON <span className="bg-gradient-to-r from-[#FF9900] via-[#FF00FF] to-[#00FFFF] bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(255,0,255,0.6)]">SUNSET</span> HIGHWAY 2088.
        </h1>
        <p className="font-['Share_Tech_Mono',monospace] text-base md:text-lg text-[#E0E0E0]/80 max-w-xl leading-relaxed mb-10">
          Hot Magenta (#FF00FF), Electric Cyan (#00FFFF), Sunset Orange (#FF9900), skewed containers (-skew-x-12), receding perspective grid floors, and CRT scanlines.
        </p>
        <div className="flex flex-wrap gap-4 font-mono text-xs uppercase tracking-widest">
          <button className="-skew-x-12 transform border-2 border-[#FF00FF] bg-[#FF00FF] text-white px-8 py-4 font-bold shadow-[0_0_20px_#FF00FF] hover:skew-x-0 hover:bg-[#00FFFF] hover:border-[#00FFFF] hover:text-black hover:shadow-[0_0_25px_#00FFFF] transition-all flex items-center space-x-2">
            <Zap size={16} />
            <span className="inline-block skew-x-12 transform">ENTER THE GRID</span>
          </button>
          <button className="-skew-x-12 transform border-2 border-[#00FFFF] bg-transparent text-[#00FFFF] px-8 py-4 font-bold hover:skew-x-0 hover:bg-[#00FFFF] hover:text-black hover:shadow-[0_0_20px_#00FFFF] transition-all">
            <span className="inline-block skew-x-12 transform">VIEW CRT CANVAS</span>
          </button>
        </div>
      </div>
    </section>
  );
};
