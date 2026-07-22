import React from "react";

export const LinearHeader = () => {
  return (
    <header className="w-full bg-[#050506]/90 backdrop-blur-xl border-b border-white/[0.06] sticky top-0 z-40 font-['Inter']">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-[#5E6AD2] to-indigo-400 flex items-center justify-center text-white font-bold text-xs shadow-[0_0_12px_rgba(94,106,210,0.4)]">
            L
          </div>
          <span className="font-semibold text-sm tracking-tight text-[#EDEDEF]">Linear OS</span>
        </div>
        <nav className="hidden md:flex items-center space-x-8 text-xs font-medium text-[#8A8F98]">
          <a href="#features" className="hover:text-white transition-colors">Features</a>
          <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
          <a href="#showcase" className="hover:text-white transition-colors">Components</a>
        </nav>
        <div className="flex items-center space-x-3 text-xs">
          <button className="px-4 py-2 text-white hover:text-white/80 transition-colors font-medium cursor-pointer">Log in</button>
          <button className="px-4 py-2 bg-[#5E6AD2] hover:bg-[#6872D9] text-white rounded-lg font-medium shadow-[0_0_20px_rgba(94,106,210,0.3)] transition-all cursor-pointer">
            Get Started
          </button>
        </div>
      </div>
    </header>
  );
};
