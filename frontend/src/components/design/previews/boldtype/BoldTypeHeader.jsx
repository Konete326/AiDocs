import React from "react";

export const BoldTypeHeader = () => {
  return (
    <header className="w-full bg-[#0A0A0A] border-b border-[#262626] sticky top-0 z-40 font-['Inter_Tight',sans-serif] text-[#FAFAFA]">
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <span className="font-extrabold text-xl tracking-tighter text-[#FAFAFA]">TYPE_HERO</span>
          <span className="w-2 h-2 bg-[#FF3D00]"></span>
        </div>
        <nav className="hidden md:flex items-center space-x-8 text-xs font-semibold uppercase tracking-widest text-[#737373]">
          <a href="#features" className="hover:text-[#FAFAFA] transition-colors">Manifesto</a>
          <a href="#pricing" className="hover:text-[#FAFAFA] transition-colors">Pricing</a>
          <a href="#showcase" className="hover:text-[#FAFAFA] transition-colors">Components</a>
        </nav>
        <button className="relative group text-[#FF3D00] text-xs font-bold uppercase tracking-wider py-2">
          <span>GET STARTED</span>
          <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#FF3D00] group-hover:scale-x-110 transition-transform"></span>
        </button>
      </div>
    </header>
  );
};
