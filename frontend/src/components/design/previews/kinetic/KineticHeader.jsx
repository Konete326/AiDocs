import React from "react";

export const KineticHeader = () => {
  return (
    <header className="w-full bg-[#09090B] border-b-2 border-[#3F3F46] sticky top-0 z-40 font-['Space_Grotesk'] text-[#FAFAFA]">
      <div className="max-w-[95vw] mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-[#DFE104] text-black font-extrabold flex items-center justify-center text-lg">
            K
          </div>
          <span className="font-extrabold text-2xl uppercase tracking-tighter text-[#FAFAFA]">KINETIC_TYPE</span>
        </div>
        <nav className="hidden md:flex items-center space-x-8 text-xs font-bold uppercase tracking-widest">
          <a href="#features" className="hover:text-[#DFE104] transition-colors">MOTION</a>
          <a href="#pricing" className="hover:text-[#DFE104] transition-colors">PLANS</a>
          <a href="#showcase" className="hover:text-[#DFE104] transition-colors">SHOWCASE</a>
        </nav>
        <button className="px-6 py-2.5 bg-[#DFE104] text-black font-extrabold text-xs uppercase tracking-tight hover:scale-105 transition-transform">
          GET STARTED
        </button>
      </div>
    </header>
  );
};
