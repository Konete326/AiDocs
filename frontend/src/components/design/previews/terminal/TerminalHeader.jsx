import React from "react";

export const TerminalHeader = () => {
  return (
    <header className="w-full bg-[#0a0a0a] border-b-2 border-[#1f521f] sticky top-0 z-40 font-['JetBrains_Mono',monospace] text-[#33ff00]">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-2 font-bold text-sm">
          <span className="text-[#ffb000]">root@cyber-system</span>
          <span className="text-[#1f521f]">:</span>
          <span>~#</span>
        </div>
        <nav className="hidden md:flex items-center space-x-8 text-xs font-bold uppercase tracking-wider">
          <a href="#features" className="hover:bg-[#33ff00] hover:text-black px-2 py-1">[ FEATURES ]</a>
          <a href="#pricing" className="hover:bg-[#33ff00] hover:text-black px-2 py-1">[ PRICING ]</a>
          <a href="#showcase" className="hover:bg-[#33ff00] hover:text-black px-2 py-1">[ SHELL_CLI ]</a>
        </nav>
        <button className="px-4 py-2 bg-[#33ff00] text-black font-bold text-xs uppercase hover:bg-[#ffb000]">
          [ INITIALIZE_SESSION ]
        </button>
      </div>
    </header>
  );
};
