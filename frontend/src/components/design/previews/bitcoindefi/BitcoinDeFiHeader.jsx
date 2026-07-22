import React from "react";

export const BitcoinDeFiHeader = () => {
  return (
    <header className="w-full bg-[#08080C]/90 backdrop-blur-md border-b border-[#F7931A]/30 sticky top-0 z-40 font-mono text-[#F4F4F6]">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#F7931A] to-[#FFD700] text-[#08080C] font-bold flex items-center justify-center text-base shadow-[0_0_12px_rgba(247,147,26,0.5)]">
            ₿
          </div>
          <span className="font-bold text-lg tracking-wider text-white">BTC_VAULT</span>
        </div>
        <nav className="hidden md:flex items-center space-x-8 text-xs uppercase tracking-widest text-[#A0A0B0]">
          <a href="#features" className="hover:text-[#F7931A] transition-colors">Protocol</a>
          <a href="#pricing" className="hover:text-[#FFD700] transition-colors">Yield</a>
          <a href="#showcase" className="hover:text-[#F7931A] transition-colors">Nodes</a>
        </nav>
        <button className="px-5 py-2.5 bg-gradient-to-r from-[#F7931A] to-[#FFD700] text-[#08080C] font-bold text-xs uppercase tracking-wider rounded-xl shadow-[0_0_15px_rgba(247,147,26,0.4)] hover:brightness-110 active:scale-95 transition-all">
          CONNECT WALLET
        </button>
      </div>
    </header>
  );
};
