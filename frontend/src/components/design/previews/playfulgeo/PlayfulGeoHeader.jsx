import React from "react";

export const PlayfulGeoHeader = () => {
  return (
    <header className="w-full bg-[#FFFDF5] border-b-2 border-[#1E293B] sticky top-0 z-40 font-['Outfit',sans-serif] text-[#1E293B]">
      <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-[#8B5CF6] border-2 border-[#1E293B] rounded-full text-white font-extrabold flex items-center justify-center text-lg shadow-[3px_3px_0px_0px_#1E293B]">
            P
          </div>
          <span className="font-extrabold text-2xl tracking-tight text-[#1E293B]">POP_GEO</span>
        </div>
        <nav className="hidden md:flex items-center space-x-8 text-sm font-bold uppercase tracking-wider">
          <a href="#features" className="hover:text-[#8B5CF6] transition-colors">STICKERS</a>
          <a href="#pricing" className="hover:text-[#F472B6] transition-colors">PRICING</a>
          <a href="#showcase" className="hover:text-[#34D399] transition-colors">COMPONENTS</a>
        </nav>
        <button className="px-6 py-3 bg-[#8B5CF6] text-white font-extrabold text-xs uppercase tracking-wider rounded-full border-2 border-[#1E293B] shadow-[4px_4px_0px_0px_#1E293B] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_#1E293B] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0px_0px_#1E293B] transition-all">
          GET STARTED
        </button>
      </div>
    </header>
  );
};
