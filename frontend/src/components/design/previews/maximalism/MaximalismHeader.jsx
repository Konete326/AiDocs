import React from "react";

export const MaximalismHeader = () => {
  return (
    <header className="w-full bg-[#0D0D1A] border-b-4 border-[#FF3AF2] sticky top-0 z-40 font-['Outfit',sans-serif] text-white">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center space-x-3 -rotate-1">
          <div className="w-10 h-10 rounded-full bg-[#FF3AF2] border-4 border-[#FFE600] text-[#0D0D1A] font-black flex items-center justify-center text-xl shadow-[4px_4px_0px_#00F5D4]">
            ⚡
          </div>
          <span className="font-black text-2xl uppercase tracking-tighter text-white [text-shadow:2px_2px_0_#7B2FFF,4px_4px_0_#FF3AF2]">MAX_BOOM</span>
        </div>
        <nav className="hidden md:flex items-center space-x-8 font-mono text-xs font-black uppercase tracking-widest text-[#00F5D4]">
          <a href="#features" className="hover:text-[#FFE600] hover:scale-110 transition-transform">01//OVERLOAD</a>
          <a href="#pricing" className="hover:text-[#FF3AF2] hover:scale-110 transition-transform">02//DOPAMINE</a>
          <a href="#showcase" className="hover:text-[#FF6B35] hover:scale-110 transition-transform">03//HYPERPOP</a>
        </nav>
        <button className="px-8 py-3.5 bg-gradient-to-r from-[#FF3AF2] via-[#7B2FFF] to-[#00F5D4] border-4 border-[#FFE600] text-white font-black text-xs uppercase tracking-widest rounded-full shadow-[4px_4px_0px_#00F5D4] hover:scale-110 active:scale-95 transition-all">
          EXPLODE JOY 🚀
        </button>
      </div>
    </header>
  );
};
