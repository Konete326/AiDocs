import React from "react";

export const NeoBrutalismHeader = () => {
  return (
    <header className="w-full bg-[#FFFDF5] border-b-4 border-black sticky top-0 z-40 font-['Space_Grotesk'] text-black">
      <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="bg-[#FFD93D] border-4 border-black px-3 py-1 font-black text-xl shadow-[4px_4px_0px_0px_#000] -rotate-2">
            NEO
          </div>
          <span className="font-black text-2xl uppercase tracking-tighter">PUNK_WEB</span>
        </div>
        <nav className="hidden md:flex items-center space-x-8 text-xs font-bold uppercase tracking-widest">
          <a href="#features" className="hover:bg-[#FFD93D] px-2 py-1 border-2 border-transparent hover:border-black transition-all">STICKERS</a>
          <a href="#pricing" className="hover:bg-[#FF6B6B] hover:text-white px-2 py-1 border-2 border-transparent hover:border-black transition-all">PLANS</a>
          <a href="#showcase" className="hover:bg-[#C4B5FD] px-2 py-1 border-2 border-transparent hover:border-black transition-all">SHOWCASE</a>
        </nav>
        <button className="px-6 py-3 bg-[#FF6B6B] text-white font-black text-xs uppercase tracking-wide border-4 border-black shadow-[4px_4px_0px_0px_#000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all">
          LAUNCH APP!
        </button>
      </div>
    </header>
  );
};
