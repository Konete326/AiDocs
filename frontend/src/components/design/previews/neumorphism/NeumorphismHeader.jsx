import React from "react";

export const NeumorphismHeader = () => {
  return (
    <header className="w-full bg-[#E0E5EC] sticky top-0 z-40 font-['Plus_Jakarta_Sans',sans-serif] text-[#3D4852]">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-2xl bg-[#E0E5EC] shadow-[5px_5px_10px_rgb(163,177,198,0.6),-5px_-5px_10px_rgba(255,255,255,0.5)] text-[#6C63FF] font-extrabold flex items-center justify-center text-lg">
            N
          </div>
          <span className="font-extrabold text-xl tracking-tight text-[#3D4852]">SOFT_UI</span>
        </div>
        <nav className="hidden md:flex items-center space-x-8 font-['DM_Sans'] text-xs font-semibold text-[#6B7280]">
          <a href="#features" className="hover:text-[#6C63FF] transition-colors">DEPTH</a>
          <a href="#pricing" className="hover:text-[#6C63FF] transition-colors">WELLS</a>
          <a href="#showcase" className="hover:text-[#6C63FF] transition-colors">SURFACE</a>
        </nav>
        <button className="px-6 py-3 bg-[#E0E5EC] text-[#6C63FF] font-['DM_Sans'] font-bold text-xs uppercase tracking-wider rounded-2xl shadow-[5px_5px_10px_rgb(163,177,198,0.6),-5px_-5px_10px_rgba(255,255,255,0.5)] hover:-translate-y-0.5 active:shadow-[inset_3px_3px_6px_rgb(163,177,198,0.6),inset_-3px_-3px_6px_rgba(255,255,255,0.5)] transition-all">
          TOUCH SURFACE
        </button>
      </div>
    </header>
  );
};
