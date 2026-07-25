import React from "react";

export const VaporwaveFooter = () => {
  return (
    <footer className="bg-[#090014] border-t-2 border-t-[#FF00FF] py-16 font-['Orbitron',sans-serif] text-[#E0E0E0]">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-4 gap-8 mb-12">
        <div>
          <div className="font-black text-2xl uppercase tracking-widest text-[#FF00FF] mb-4">OUTRUN_88</div>
          <p className="font-mono text-xs text-[#E0E0E0]/70 leading-relaxed">
            Digital nostalgia meets neon future—a synthetic reality drenched in 1980s retro-futuristic excess.
          </p>
        </div>
        <div>
          <div className="font-mono text-xs uppercase tracking-widest text-[#00FFFF] mb-4">// NODES</div>
          <ul className="space-y-2 font-mono text-xs text-[#E0E0E0]/70 uppercase">
            <li><a href="#features" className="hover:text-[#00FFFF]">01//Grid</a></li>
            <li><a href="#pricing" className="hover:text-[#00FFFF]">02//Sunset</a></li>
          </ul>
        </div>
        <div>
          <div className="font-mono text-xs uppercase tracking-widest text-[#FF9900] mb-4">// SUITE</div>
          <ul className="space-y-2 font-mono text-xs text-[#E0E0E0]/70 uppercase">
            <li><a href="#showcase" className="hover:text-[#FF9900]">03//CRT</a></li>
            <li><a href="#pricing" className="hover:text-[#FF9900]">04//Tokens</a></li>
          </ul>
        </div>
        <div>
          <div className="font-mono text-xs uppercase tracking-widest text-[#FF00FF] mb-4">// STATUS</div>
          <p className="font-mono text-xs text-[#00FFFF]">SYNTH_ONLINE // 2088</p>
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-6 pt-6 border-t border-[#2D1B4E] font-mono text-[10px] uppercase text-[#E0E0E0]/60 flex justify-between">
        <span>© 2088 VAPORWAVE OUTRUN SYSTEM</span>
        <span>HOT MAGENTA #FF00FF</span>
      </div>
    </footer>
  );
};
