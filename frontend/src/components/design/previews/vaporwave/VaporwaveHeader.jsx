import React from "react";

export const VaporwaveHeader = () => {
  return (
    <header className="w-full bg-[#090014] border-b-2 border-b-[#00FFFF] sticky top-0 z-40 font-['Orbitron',sans-serif] text-[#E0E0E0]">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 bg-gradient-to-tr from-[#FF00FF] to-[#00FFFF] text-black font-black flex items-center justify-center text-sm shadow-[0_0_15px_#FF00FF]">
            VW
          </div>
          <span className="font-black text-xl uppercase tracking-widest bg-gradient-to-r from-[#FF9900] via-[#FF00FF] to-[#00FFFF] bg-clip-text text-transparent drop-shadow-[0_0_10px_rgba(255,0,255,0.6)]">OUTRUN_88</span>
        </div>
        <nav className="hidden md:flex items-center space-x-8 font-mono text-xs uppercase tracking-widest text-[#E0E0E0]">
          <a href="#features" className="hover:text-[#00FFFF] hover:drop-shadow-[0_0_8px_#00FFFF] transition-all">01//GRID</a>
          <a href="#pricing" className="hover:text-[#FF00FF] hover:drop-shadow-[0_0_8px_#FF00FF] transition-all">02//SUNSET</a>
          <a href="#showcase" className="hover:text-[#FF9900] hover:drop-shadow-[0_0_8px_#FF9900] transition-all">03//CRT</a>
        </nav>
        <button className="-skew-x-12 transform border-2 border-[#00FFFF] bg-transparent text-[#00FFFF] px-5 py-2 font-mono font-bold text-xs uppercase tracking-wider hover:skew-x-0 hover:bg-[#00FFFF] hover:text-black hover:shadow-[0_0_20px_#00FFFF] transition-all">
          <span className="inline-block skew-x-12 transform">LAUNCH SYNTH</span>
        </button>
      </div>
    </header>
  );
};
